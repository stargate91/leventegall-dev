import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StructuredData from "./StructuredData";
import { siteConfig } from "@/config/site";

interface SchemaItem {
  "@type": string;
  url?: string;
  name?: string;
  inLanguage?: string[];
  review?: unknown[];
  aggregateRating?: unknown;
  address?: { addressCountry?: string };
  image?: string;
}

describe("StructuredData Component", () => {
  it("renders valid English Schema.org JSON-LD graph without self-serving reviews", () => {
    const { container } = render(<StructuredData locale="en" />);
    const script = container.querySelector("script[type=\"application/ld+json\"]");
    expect(script).not.toBeNull();

    const data = JSON.parse(script?.textContent || "{}");
    expect(data["@context"]).toBe("https://schema.org");
    expect(Array.isArray(data["@graph"])).toBe(true);

    const graph = data["@graph"] as SchemaItem[];
    const profilePage = graph.find((item) => item["@type"] === "ProfilePage");
    expect(profilePage).toBeDefined();
    expect(profilePage?.url).toBe(siteConfig.url);
    expect(profilePage?.inLanguage).toContain("en");

    const person = graph.find((item) => item["@type"] === "Person");
    expect(person).toBeDefined();
    expect(person?.image).toBe(`${siteConfig.url}/icon-512.png`);

    const service = graph.find((item) => item["@type"] === "ProfessionalService");
    expect(service).toBeDefined();
    expect(service?.image).toBe(`${siteConfig.url}/icon-512.png`);
    expect(service?.address?.addressCountry).toBe("HU");
    // Self-serving reviews removed per Google Search Central LocalBusiness update
    expect(service?.review).toBeUndefined();
    expect(service?.aggregateRating).toBeUndefined();
  });

  it("renders localized Hungarian Schema.org JSON-LD graph with /hu URLs", () => {
    const { container } = render(<StructuredData locale="hu" />);
    const script = container.querySelector("script[type=\"application/ld+json\"]");
    expect(script).not.toBeNull();

    const data = JSON.parse(script?.textContent || "{}");
    const graph = data["@graph"] as SchemaItem[];
    const profilePage = graph.find((item) => item["@type"] === "ProfilePage");
    expect(profilePage).toBeDefined();
    expect(profilePage?.url).toBe(`${siteConfig.url}/hu`);
    expect(profilePage?.name).toContain("Portfólió");

    const service = graph.find((item) => item["@type"] === "ProfessionalService");
    expect(service).toBeDefined();
    expect(service?.name).toContain("Architektúra");
    expect(service?.review).toBeUndefined();
    expect(service?.aggregateRating).toBeUndefined();
  });
});

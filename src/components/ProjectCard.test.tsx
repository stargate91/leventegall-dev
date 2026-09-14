import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ProjectCard from "./ProjectCard";
import { LocaleProvider } from "@/locales";
import { en } from "@/locales/en";
import { hu } from "@/locales/hu";

describe("ProjectCard Component", () => {
  it("renders all portfolio projects including Swaya and Nova in English", () => {
    render(
      <LocaleProvider initialLocale="en">
        <ProjectCard />
      </LocaleProvider>,
    );

    // Section title
    expect(screen.getByRole("heading", { name: /Featured Work & Projects/i })).toBeInTheDocument();

    // Projects rendered
    expect(screen.getByText(en.projects.items.swaya.title)).toBeInTheDocument();
    expect(screen.getByText(en.projects.items.nova.title)).toBeInTheDocument();
    expect(screen.getByText(en.projects.items.pillPlayer.title)).toBeInTheDocument();

    // Nova elements
    expect(screen.getByText(en.projects.items.nova.badge)).toBeInTheDocument();
    const websiteLinks = screen.getAllByRole("link", { name: new RegExp(en.projects.labels.visitWebsite, "i") });
    expect(websiteLinks).toHaveLength(3);
    expect(websiteLinks[0]).toHaveAttribute("href", "https://swaya.xyz/");
    expect(websiteLinks[1]).toHaveAttribute("href", "https://novafeeds.xyz/");
    expect(websiteLinks[2]).toHaveAttribute("href", "https://www.npmjs.com/package/@stargate91/pill-player");
  });

  it("renders all portfolio projects in Hungarian", () => {
    render(
      <LocaleProvider initialLocale="hu">
        <ProjectCard />
      </LocaleProvider>,
    );

    expect(screen.getByText(hu.projects.items.swaya.title)).toBeInTheDocument();
    expect(screen.getByText(hu.projects.items.nova.title)).toBeInTheDocument();
    expect(screen.getByText(hu.projects.items.nova.badge)).toBeInTheDocument();
    expect(screen.getByText(hu.projects.items.pillPlayer.title)).toBeInTheDocument();
    expect(screen.getByText(hu.projects.items.pillPlayer.badge)).toBeInTheDocument();
  });
});

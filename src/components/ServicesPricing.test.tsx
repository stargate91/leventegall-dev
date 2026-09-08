import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ServicesPricing from "./ServicesPricing";

describe("ServicesPricing Component", () => {
  it("renders all service categories with descriptions and without pricing", () => {
    render(<ServicesPricing />);

    expect(screen.getByRole("heading", { name: "Brand Naming & Slogans" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Full-Stack & Web Development" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Discord Bot Development" })).toBeInTheDocument();

    expect(screen.getByText(/01 \/\/ BRANDING/i)).toBeInTheDocument();
    expect(screen.getByText(/02 \/\/ SOFTWARE & WEB/i)).toBeInTheDocument();
    expect(screen.getByText(/03 \/\/ DISCORD BOTS/i)).toBeInTheDocument();

    // Verify no pricing text or dollar amounts are present
    expect(screen.queryByText(/\$/)).not.toBeInTheDocument();
    expect(screen.queryByText(/From \$/i)).not.toBeInTheDocument();
  });

  it("renders unified consultation callout with link to contact section", () => {
    render(<ServicesPricing />);

    const calloutButton = screen.getByRole("link", { name: /Discuss Your Project/i });
    expect(calloutButton).toBeInTheDocument();
    expect(calloutButton).toHaveAttribute("href", "#contact");
  });
});

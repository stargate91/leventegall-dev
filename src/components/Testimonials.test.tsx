import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Testimonials from "./Testimonials";

describe("Testimonials Component", () => {
  it("renders the section header", () => {
    render(<Testimonials />);

    expect(screen.getByText(/Client Reviews & Track Record/i)).toBeInTheDocument();
    expect(screen.getByText(/Client Feedback/i)).toBeInTheDocument();
  });

  it("renders the verified client testimonials with quotes, avatars, and author metadata", () => {
    render(<Testimonials />);

    expect(screen.getByText("Silur")).toBeInTheDocument();
    expect(screen.getByText("Tan Do")).toBeInTheDocument();
    expect(screen.getByText("Aldo Scardovi")).toBeInTheDocument();
    expect(screen.getByText("Mischa Sigtermans")).toBeInTheDocument();

    expect(screen.getByText(/Just Silur • UAE/i)).toBeInTheDocument();
    expect(screen.getByText(/Visual Designer & Illustrator • United Kingdom/i)).toBeInTheDocument();
    expect(screen.getByText(/Independent Financial Advisor • Italy/i)).toBeInTheDocument();
    expect(screen.getByText(/Stagent \| Break of Dawn • Netherlands/i)).toBeInTheDocument();

    expect(screen.getByText(/Levente didn't only prove his adaptability/i)).toBeInTheDocument();
    expect(screen.getByText(/He is really helpful and professional/i)).toBeInTheDocument();
    expect(screen.getByText(/Working with Lev was perfect!/i)).toBeInTheDocument();
    expect(screen.getByText(/Lev came up with really good names/i)).toBeInTheDocument();

    const avatarImages = screen.getAllByRole("img");
    const avatarSources = avatarImages.map((img) => img.querySelector("img")?.getAttribute("src"));
    expect(avatarSources).toContain("/testimonials/silur.webp");
    expect(avatarSources).toContain("/testimonials/tan-do.webp");
    expect(avatarSources).toContain("/testimonials/aldo-scardovi.webp");
    expect(avatarSources).toContain("/testimonials/mischa-sigtermans.webp");
  });

  it("supports carousel navigation and dynamically disables boundary buttons", () => {
    render(<Testimonials />);

    const viewport = screen.getByRole("region", { name: /Client reviews carousel/i });
    const prevButton = screen.getByRole("button", { name: /Previous reviews/i });
    const nextButton = screen.getByRole("button", { name: /Next reviews/i });

    // Mock layout dimensions for jsdom scroll container
    Object.defineProperty(viewport, "clientWidth", { configurable: true, value: 500 });
    Object.defineProperty(viewport, "scrollWidth", { configurable: true, value: 1000 });
    Object.defineProperty(viewport, "scrollLeft", { configurable: true, writable: true, value: 0 });

    // Initial state: at start
    fireEvent.scroll(viewport);
    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeEnabled();

    // Scroll to middle
    viewport.scrollLeft = 250;
    fireEvent.scroll(viewport);
    expect(prevButton).toBeEnabled();
    expect(nextButton).toBeEnabled();

    // Scroll to end
    viewport.scrollLeft = 500;
    fireEvent.scroll(viewport);
    expect(prevButton).toBeEnabled();
    expect(nextButton).toBeDisabled();

    // Scroll back to start
    viewport.scrollLeft = 0;
    fireEvent.scroll(viewport);
    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeEnabled();
  });
});

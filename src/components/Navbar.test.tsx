import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Navbar from "./Navbar";
import { LocaleProvider } from "@/locales";

describe("Navbar Component", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders brand signifier and navigation links in English and Hungarian", () => {
    const { unmount } = render(
      <LocaleProvider initialLocale="en">
        <Navbar />
      </LocaleProvider>,
    );

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getAllByText(/LEVENTE GALL/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/JOURNEY/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/PROJECTS/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/migrating the Swaya media manager backend/i)).toBeInTheDocument();

    unmount();

    render(
      <LocaleProvider initialLocale="hu">
        <Navbar />
      </LocaleProvider>,
    );

    expect(screen.getAllByText(/GÁLL LEVENTE/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/RÓLAM/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Swaya media manager backendjét írom át/i)).toBeInTheDocument();
  });

  it("renders all 6 section navigation links with correct IDs and hrefs", () => {
    render(
      <LocaleProvider initialLocale="en">
        <Navbar />
      </LocaleProvider>,
    );

    const trajectoryLink = screen.getByRole("link", { name: /Journey/i });
    expect(trajectoryLink).toHaveAttribute("href", "#trajectory");

    const projectsLink = screen.getByRole("link", { name: /Projects/i });
    expect(projectsLink).toHaveAttribute("href", "#projects");

    const skillsLink = screen.getByRole("link", { name: /Skills/i });
    expect(skillsLink).toHaveAttribute("href", "#skills");

    const servicesLink = screen.getByRole("link", { name: /Services/i });
    expect(servicesLink).toHaveAttribute("href", "#services");

    const clientsLink = screen.getByRole("link", { name: /Clients/i });
    expect(clientsLink).toHaveAttribute("href", "#reviews");

    const contactLink = screen.getByRole("link", { name: /Contact/i });
    expect(contactLink).toHaveAttribute("href", "#contact");
  });

  it("adds scrolled class when window is scrolled past threshold", () => {
    render(
      <LocaleProvider initialLocale="en">
        <Navbar />
      </LocaleProvider>,
    );

    const header = screen.getByRole("banner");

    Object.defineProperty(window, "scrollY", { value: 50, writable: true });
    fireEvent.scroll(window);

    expect(header.className).toContain("scrolled");
  });

  it("renders social icon action links with valid targets in footer", () => {
    render(
      <LocaleProvider initialLocale="en">
        <Navbar />
      </LocaleProvider>,
    );

    const githubLink = screen.getByRole("link", { name: /GitHub Profile/i });
    expect(githubLink).toHaveAttribute("href", expect.stringContaining("github.com"));

    const linkedinLink = screen.getByRole("link", { name: /LinkedIn Profile/i });
    expect(linkedinLink).toHaveAttribute("href", expect.stringContaining("linkedin.com"));

    const emailLink = screen.getByRole("link", { name: /Email Transmission/i });
    expect(emailLink).toHaveAttribute("href", expect.stringContaining("mailto:"));
  });
});

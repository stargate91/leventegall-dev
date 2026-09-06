import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Navbar from "./Navbar";
import { LocaleProvider } from "@/locales";

describe("Navbar Component", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders brand signifier and navigation links", () => {
    render(
      <LocaleProvider initialLocale="en">
        <Navbar />
      </LocaleProvider>,
    );

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByText(/LEVENTE GÁLL/i)).toBeInTheDocument();
    expect(screen.getAllByText(/JOURNEY/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/PROJECTS/i).length).toBeGreaterThan(0);
  });

  it("toggles mobile menu drawer when mobile menu button is clicked", () => {
    render(
      <LocaleProvider initialLocale="en">
        <Navbar />
      </LocaleProvider>,
    );

    const toggleBtn = screen.getByRole("button", { name: /Toggle Navigation Menu/i });
    expect(screen.queryByRole("dialog", { name: /Mobile Navigation Menu/i })).not.toBeInTheDocument();

    fireEvent.click(toggleBtn);
    expect(screen.getByRole("dialog", { name: /Mobile Navigation Menu/i })).toBeInTheDocument();

    fireEvent.click(toggleBtn);
    expect(screen.queryByRole("dialog", { name: /Mobile Navigation Menu/i })).not.toBeInTheDocument();
  });

  it("closes mobile drawer and returns focus on Escape key", () => {
    render(
      <LocaleProvider initialLocale="en">
        <Navbar />
      </LocaleProvider>,
    );

    const toggleBtn = screen.getByRole("button", { name: /Toggle Navigation Menu/i });
    fireEvent.click(toggleBtn);

    expect(screen.getByRole("dialog", { name: /Mobile Navigation Menu/i })).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("dialog", { name: /Mobile Navigation Menu/i })).not.toBeInTheDocument();
  });

  it("traps focus inside mobile drawer with Tab key", () => {
    render(
      <LocaleProvider initialLocale="en">
        <Navbar />
      </LocaleProvider>,
    );

    const toggleBtn = screen.getByRole("button", { name: /Toggle Navigation Menu/i });
    fireEvent.click(toggleBtn);

    const drawer = screen.getByRole("dialog", { name: /Mobile Navigation Menu/i });
    const interactiveItems = drawer.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
    expect(interactiveItems.length).toBeGreaterThan(1);

    const firstItem = interactiveItems[0];
    const lastItem = interactiveItems[interactiveItems.length - 1];

    // Simulate focus on last item and pressing Tab
    lastItem?.focus();
    fireEvent.keyDown(window, { key: "Tab", shiftKey: false });

    // Simulate focus on first item and pressing Shift+Tab
    firstItem?.focus();
    fireEvent.keyDown(window, { key: "Tab", shiftKey: true });
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
});

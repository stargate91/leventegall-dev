import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import LanguageSwitcher from "./LanguageSwitcher";
import { LocaleProvider, useLocale } from "@/locales";

const mockPathname = vi.fn(() => "/");

vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname(),
}));

function TestWrapper() {
  const { dict } = useLocale();
  return (
    <div>
      <LanguageSwitcher />
      <span data-testid="nav-skills">{dict.nav.skills}</span>
    </div>
  );
}

describe("LanguageSwitcher Component", () => {
  beforeEach(() => {
    mockPathname.mockReturnValue("/");
    document.cookie = "NEXT_LOCALE=; path=/; max-age=0";
    document.documentElement.lang = "en";
  });

  it("renders language links with crawlable hrefs and accessible attributes", () => {
    render(
      <LocaleProvider initialLocale="en">
        <TestWrapper />
      </LocaleProvider>,
    );

    const enLink = screen.getByRole("link", { name: /Switch language to English/i });
    const huLink = screen.getByRole("link", { name: /Switch language to Hungarian/i });

    expect(enLink).toHaveAttribute("href", "/");
    expect(huLink).toHaveAttribute("href", "/hu");
    expect(enLink).toHaveAttribute("hrefLang", "en");
    expect(huLink).toHaveAttribute("hrefLang", "hu");
    expect(enLink).toHaveAttribute("aria-current", "page");
    expect(huLink).not.toHaveAttribute("aria-current");
    expect(screen.getByTestId("nav-skills")).toHaveTextContent("SKILLS");
  });

  it("switches language on link click and re-renders text dynamically", () => {
    render(
      <LocaleProvider initialLocale="en">
        <TestWrapper />
      </LocaleProvider>,
    );

    const huLink = screen.getByRole("link", { name: /Switch language to Hungarian/i });
    fireEvent.click(huLink);

    expect(huLink).toHaveAttribute("aria-current", "page");
    expect(screen.getByTestId("nav-skills")).toHaveTextContent("STACK");

    const enLink = screen.getByRole("link", { name: /Switch language to English/i });
    fireEvent.click(enLink);

    expect(enLink).toHaveAttribute("aria-current", "page");
    expect(screen.getByTestId("nav-skills")).toHaveTextContent("SKILLS");
  });

  it("indicates English-only availability when located on untranslated routes", () => {
    mockPathname.mockReturnValue("/projects/swaya");

    render(
      <LocaleProvider initialLocale="en">
        <TestWrapper />
      </LocaleProvider>,
    );

    const huLink = screen.getByRole("link", { name: /English only/i });
    expect(huLink).toHaveAttribute(
      "title",
      "This case study is available in English only. Navigates to the Hungarian home page.",
    );
    expect(huLink).toHaveAttribute("href", "/hu");
  });
});

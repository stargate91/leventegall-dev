import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import LanguageSwitcher from "./LanguageSwitcher";
import { LocaleProvider, useLocale } from "@/locales";

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
    document.cookie = "NEXT_LOCALE=; path=/; max-age=0";
    document.documentElement.lang = "en";
  });

  it("renders language buttons with accessible attributes", () => {
    render(
      <LocaleProvider initialLocale="en">
        <TestWrapper />
      </LocaleProvider>,
    );

    const enBtn = screen.getByRole("button", { name: /Switch language to English/i });
    const huBtn = screen.getByRole("button", { name: /Switch language to Hungarian/i });

    expect(enBtn).toHaveAttribute("aria-pressed", "true");
    expect(huBtn).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByTestId("nav-skills")).toHaveTextContent("SKILLS");
  });

  it("switches language on button click and re-renders text dynamically", () => {
    render(
      <LocaleProvider initialLocale="en">
        <TestWrapper />
      </LocaleProvider>,
    );

    const huBtn = screen.getByRole("button", { name: /Switch language to Hungarian/i });
    fireEvent.click(huBtn);

    expect(huBtn).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByTestId("nav-skills")).toHaveTextContent("STACK");

    const enBtn = screen.getByRole("button", { name: /Switch language to English/i });
    fireEvent.click(enBtn);

    expect(enBtn).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByTestId("nav-skills")).toHaveTextContent("SKILLS");
  });
});

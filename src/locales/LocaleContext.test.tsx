import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { LocaleProvider, useLocale, getDictionary } from "./index";

function TestConsumer() {
  const { locale, setLocale, dict } = useLocale();
  return (
    <div>
      <span data-testid="current-locale">{locale}</span>
      <span data-testid="nav-journey">{dict.nav.journey}</span>
      <button onClick={() => setLocale("hu")}>Switch to HU</button>
      <button onClick={() => setLocale("en")}>Switch to EN</button>
    </div>
  );
}

describe("LocaleContext & Provider", () => {
  beforeEach(() => {
    document.cookie = "NEXT_LOCALE=; path=/; max-age=0";
    document.documentElement.lang = "en";
  });

  it("returns default english dictionary outside provider as fallback", () => {
    render(<TestConsumer />);
    expect(screen.getByTestId("current-locale")).toHaveTextContent("en");
    expect(screen.getByTestId("nav-journey")).toHaveTextContent("JOURNEY");
  });

  it("switches language to Hungarian and updates dictionary and cookies", () => {
    render(
      <LocaleProvider initialLocale="en">
        <TestConsumer />
      </LocaleProvider>,
    );

    expect(screen.getByTestId("current-locale")).toHaveTextContent("en");
    expect(screen.getByTestId("nav-journey")).toHaveTextContent("JOURNEY");

    fireEvent.click(screen.getByRole("button", { name: "Switch to HU" }));

    expect(screen.getByTestId("current-locale")).toHaveTextContent("hu");
    expect(screen.getByTestId("nav-journey")).toHaveTextContent("PÁLYAÍV");
    expect(document.documentElement.lang).toBe("hu");
    expect(document.cookie).toContain("NEXT_LOCALE=hu");
  });

  it("retrieves dictionary for given locale via getDictionary", () => {
    const enDict = getDictionary("en");
    const huDict = getDictionary("hu");

    expect(enDict.nav.journey).toBe("JOURNEY");
    expect(huDict.nav.journey).toBe("PÁLYAÍV");
  });
});

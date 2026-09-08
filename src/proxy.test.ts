import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { proxy } from "./proxy";

describe("Locale Proxy", () => {
  it("skips static assets and internal next paths", () => {
    const request = new NextRequest("https://example.com/_next/static/chunks/main.js");
    const response = proxy(request);
    expect(response.headers.get("x-locale")).toBeNull();
  });

  it("reads locale from NEXT_LOCALE cookie if present", () => {
    const request = new NextRequest("https://example.com/", {
      headers: {
        cookie: "NEXT_LOCALE=hu",
      },
    });

    const response = proxy(request);
    expect(response.headers.get("x-locale")).toBe("hu");
  });

  it("detects Hungarian locale from Accept-Language header when no cookie exists", () => {
    const request = new NextRequest("https://example.com/", {
      headers: {
        "accept-language": "hu-HU,hu;q=0.9,en-US;q=0.8,en;q=0.7",
      },
    });

    const response = proxy(request);
    expect(response.headers.get("x-locale")).toBe("hu");
    const setCookie = response.headers.get("set-cookie");
    expect(setCookie).toContain("NEXT_LOCALE=hu");
  });

  it("defaults to English when Accept-Language is not Hungarian and sets cookie", () => {
    const request = new NextRequest("https://example.com/", {
      headers: {
        "accept-language": "en-US,en;q=0.9,de;q=0.8",
      },
    });

    const response = proxy(request);
    expect(response.headers.get("x-locale")).toBe("en");
    const setCookie = response.headers.get("set-cookie");
    expect(setCookie).toContain("NEXT_LOCALE=en");
  });
});

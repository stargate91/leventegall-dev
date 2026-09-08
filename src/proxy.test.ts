import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { proxy } from "./proxy";

describe("Locale Proxy", () => {
  it("skips static assets and internal next paths", () => {
    const request = new NextRequest("https://example.com/_next/static/chunks/main.js");
    const response = proxy(request);
    expect(response.headers.get("x-locale")).toBeNull();
  });

  it("resolves Hungarian locale on /hu and syncs NEXT_LOCALE cookie", () => {
    const request = new NextRequest("https://example.com/hu");
    const response = proxy(request);

    expect(response.headers.get("x-locale")).toBe("hu");
    const setCookie = response.headers.get("set-cookie");
    expect(setCookie).toContain("NEXT_LOCALE=hu");
  });

  it("resolves English locale on root / and syncs NEXT_LOCALE cookie", () => {
    const request = new NextRequest("https://example.com/");
    const response = proxy(request);

    expect(response.headers.get("x-locale")).toBe("en");
    const setCookie = response.headers.get("set-cookie");
    expect(setCookie).toContain("NEXT_LOCALE=en");
  });

  it("does not emit duplicate set-cookie if NEXT_LOCALE cookie already matches the path locale", () => {
    const request = new NextRequest("https://example.com/hu", {
      headers: {
        cookie: "NEXT_LOCALE=hu",
      },
    });

    const response = proxy(request);
    expect(response.headers.get("x-locale")).toBe("hu");
    expect(response.headers.get("set-cookie")).toBeNull();
  });

  it("does not issue 308 redirects for untranslated /hu/* subpaths, allowing true 404 resolution", () => {
    const request = new NextRequest("https://example.com/hu/projects/swaya");
    const response = proxy(request);

    // Must NOT return 308 permanent redirect (prevents Googlebot Soft-404 and canonical mismatch)
    expect(response.status).not.toBe(308);
    expect(response.headers.get("location")).toBeNull();
    // Passes through to Next.js App Router to render not-found.tsx
    expect(response.headers.get("x-locale")).toBe("hu");
  });
});

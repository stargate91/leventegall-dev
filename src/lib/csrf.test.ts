import { describe, it, expect } from "vitest";
import { validateOrigin } from "./csrf";
import { siteConfig } from "@/config/site";

describe("CSRF Origin Validation", () => {
  it("allows requests from canonical site URL origin", () => {
    const canonicalOrigin = new URL(siteConfig.url).origin;
    const req = new Request("https://leventegall.dev/api/contact", {
      method: "POST",
      headers: { origin: canonicalOrigin },
    });
    expect(validateOrigin(req)).toBe(true);
  });

  it("allows requests from localhost dev servers", () => {
    const reqLocal = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { origin: "http://localhost:3000" },
    });
    expect(validateOrigin(reqLocal)).toBe(true);
  });

  it("rejects unauthorized cross-site origins", () => {
    const reqMalicious = new Request("https://leventegall.dev/api/contact", {
      method: "POST",
      headers: { origin: "https://evil-hacker-site.com" },
    });
    expect(validateOrigin(reqMalicious)).toBe(false);
  });

  it("allows requests without origin/referer if host matches", () => {
    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { host: "localhost:3000" },
    });
    expect(validateOrigin(req)).toBe(true);
  });
});

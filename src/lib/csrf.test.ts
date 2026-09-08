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

  it("allows requests without origin/referer if host matches canonical or local host", () => {
    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { host: "localhost:3000" },
    });
    expect(validateOrigin(req)).toBe(true);
  });

  it("rejects requests without origin/referer if host is unknown/unauthorized", () => {
    const req = new Request("http://evil.com/api/contact", {
      method: "POST",
      headers: { host: "evil-spoofed-host.com" },
    });
    expect(validateOrigin(req)).toBe(false);
  });

  it("rejects explicit cross-site fetch requests via Sec-Fetch-Site header", () => {
    const req = new Request("https://leventegall.dev/api/contact", {
      method: "POST",
      headers: {
        origin: "https://leventegall.dev",
        "sec-fetch-site": "cross-site",
      },
    });
    expect(validateOrigin(req)).toBe(false);
  });

  it("allows valid referer origin and rejects malicious referer", () => {
    const reqValidReferer = new Request("https://leventegall.dev/api/contact", {
      method: "POST",
      headers: { referer: "https://leventegall.dev/contact#form" },
    });
    expect(validateOrigin(reqValidReferer)).toBe(true);

    const reqInvalidReferer = new Request("https://leventegall.dev/api/contact", {
      method: "POST",
      headers: { referer: "https://attacker.com/malicious-page" },
    });
    expect(validateOrigin(reqInvalidReferer)).toBe(false);
  });

  it("rejects malicious origin even if host header is spoofed to match attacker origin", () => {
    const reqSpoofed = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        host: "evil-attacker.com",
        origin: "https://evil-attacker.com",
      },
    });
    expect(validateOrigin(reqSpoofed)).toBe(false);
  });
});

import { describe, it, expect } from "vitest";
import nextConfig from "../next.config";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { metadata as enMetadata } from "@/app/(en)/layout";
import { metadata as huMetadata } from "@/app/hu/layout";
import { metadata as notFoundMetadata } from "@/app/not-found";
import { metadata as swayaMetadata } from "@/app/(en)/projects/swaya/page";
import { siteConfig } from "@/config/site";

describe("Automated SEO Verification Suite", () => {
  describe("robots.txt configuration", () => {
    it("declares RFC 9309 compliant directives and sitemap URL without obsolete host or redundant rules", () => {
      const robotsConfig = robots();

      expect(robotsConfig.sitemap).toBe(`${siteConfig.url}/sitemap.xml`);
      expect(robotsConfig.host).toBeUndefined();

      const rules = Array.isArray(robotsConfig.rules)
        ? robotsConfig.rules
        : [robotsConfig.rules];

      // Wildcard crawler rule covering all crawlers
      const generalRule = rules.find((r) => r.userAgent === "*");
      expect(generalRule).toBeDefined();
      expect(generalRule?.allow).toBe("/");
      expect(generalRule?.disallow).toContain("/api");
      expect(generalRule?.disallow).toContain("/api/");

      // No redundant crawler rule groups
      expect(rules).toHaveLength(1);
    });
  });

  describe("sitemap.xml configuration", () => {
    it("generates deterministic entries without trailing slashes and with valid timestamps", () => {
      const entries = sitemap();

      expect(entries.length).toBeGreaterThanOrEqual(3);

      const urls = entries.map((e) => e.url);
      expect(urls).toContain(siteConfig.url);
      expect(urls).toContain(`${siteConfig.url}/hu`);
      expect(urls).toContain(`${siteConfig.url}/projects/swaya`);

      // Verify no trailing slashes on sub-paths
      entries.forEach((entry) => {
        if (entry.url !== siteConfig.url) {
          expect(entry.url.endsWith("/")).toBe(false);
        }
        expect(entry.lastModified).toBeInstanceOf(Date);
        expect((entry.lastModified as Date).getTime()).not.toBeNaN();
      });

      // Reciprocal hreflang in root entry
      const rootEntry = entries.find((e) => e.url === siteConfig.url);
      expect(rootEntry?.alternates?.languages).toEqual({
        en: siteConfig.url,
        hu: `${siteConfig.url}/hu`,
        "x-default": siteConfig.url,
      });

      // Reciprocal hreflang in Hungarian entry
      const huEntry = entries.find((e) => e.url === `${siteConfig.url}/hu`);
      expect(huEntry?.alternates?.languages).toEqual({
        en: siteConfig.url,
        hu: `${siteConfig.url}/hu`,
        "x-default": siteConfig.url,
      });

      // Canonical and x-default declaration in Swaya project entry
      const swayaEntry = entries.find((e) => e.url === `${siteConfig.url}/projects/swaya`);
      expect(swayaEntry?.alternates?.languages).toEqual({
        en: `${siteConfig.url}/projects/swaya`,
        "x-default": `${siteConfig.url}/projects/swaya`,
      });
    });
  });

  describe("Metadata canonical and hreflang consistency", () => {
    it("matches canonical and alternate URLs across layouts without trailing slashes", () => {
      // English Layout
      expect(enMetadata.alternates?.canonical).toBe(siteConfig.url);
      expect(enMetadata.alternates?.languages?.en).toBe(siteConfig.url);
      expect(enMetadata.alternates?.languages?.hu).toBe(`${siteConfig.url}/hu`);
      expect(enMetadata.referrer).toBe("strict-origin-when-cross-origin");

      // Hungarian Layout
      expect(huMetadata.alternates?.canonical).toBe(`${siteConfig.url}/hu`);
      expect(huMetadata.alternates?.languages?.en).toBe(siteConfig.url);
      expect(huMetadata.alternates?.languages?.hu).toBe(`${siteConfig.url}/hu`);
      expect(huMetadata.referrer).toBe("strict-origin-when-cross-origin");

      // Swaya Case Study Page
      expect(swayaMetadata.alternates?.canonical).toBe(`${siteConfig.url}/projects/swaya`);
      expect(swayaMetadata.alternates?.languages?.en).toBe(`${siteConfig.url}/projects/swaya`);
      expect(swayaMetadata.alternates?.languages?.["x-default"]).toBe(`${siteConfig.url}/projects/swaya`);
      expect(swayaMetadata.openGraph?.alternateLocale).toBeUndefined();

      // Swaya OpenGraph article protocol compliance
      const swayaOg = swayaMetadata.openGraph as {
        type?: string;
        publishedTime?: string;
        authors?: string[];
        section?: string;
        tags?: string[];
      };
      expect(swayaOg?.type).toBe("article");
      expect(swayaOg.publishedTime).toBe("2026-03-01T00:00:00.000Z");
      expect(swayaOg.authors).toContain(siteConfig.author);
      expect(swayaOg.section).toBe("Software Engineering");
      expect(swayaOg.tags).toContain("FastAPI");
    });

    it("verifies Social OpenGraph and Twitter images are explicitly declared", () => {
      // English layout social cards
      const enOgImages = enMetadata.openGraph?.images as Array<{ url: string }> | undefined;
      expect(enOgImages?.[0]?.url).toBe(`${siteConfig.url}/opengraph-image`);

      // Hungarian layout localized social cards
      const huOgImages = huMetadata.openGraph?.images as Array<{ url: string }> | undefined;
      expect(huOgImages?.[0]?.url).toBe(`${siteConfig.url}/hu/opengraph-image`);

      const huTwitterImages = huMetadata.twitter?.images as Array<{ url: string }> | undefined;
      expect(huTwitterImages?.[0]?.url).toBe(`${siteConfig.url}/hu/opengraph-image`);
    });
  });

  describe("Error page isolation & Soft-404 prevention", () => {
    it("ensures 404 Not Found has noindex and does not inherit a homepage canonical", () => {
      // Robots directive must disallow indexing
      expect(notFoundMetadata.robots).toMatchObject({
        index: false,
        follow: false,
      });

      // Alternates must NOT point to home
      expect(notFoundMetadata.alternates).toBeUndefined();
    });
  });

  describe("Crawl and discovery Cache-Control headers in next.config.ts", () => {
    it("defines explicit Cache-Control headers for robots.txt, sitemap.xml, and manifest.webmanifest", async () => {
      const headersConfig = typeof nextConfig.headers === "function" ? await nextConfig.headers() : [];
      const robotsHeader = headersConfig.find((h) => h.source === "/robots.txt");
      const sitemapHeader = headersConfig.find((h) => h.source === "/sitemap.xml");
      const manifestHeader = headersConfig.find((h) => h.source === "/manifest.webmanifest");

      expect(robotsHeader?.headers).toContainEqual({
        key: "Cache-Control",
        value: "public, max-age=86400, stale-while-revalidate=86400",
      });
      expect(sitemapHeader?.headers).toContainEqual({
        key: "Cache-Control",
        value: "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
      });
      expect(manifestHeader?.headers).toContainEqual({
        key: "Cache-Control",
        value: "public, max-age=86400, stale-while-revalidate=86400",
      });
    });
  });
});

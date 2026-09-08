import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Deterministic deployment / content timestamp preventing Googlebot cache invalidation
  const lastModified = new Date("2026-09-08T00:00:00.000Z");

  return [
    {
      url: `${siteConfig.url}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          en: `${siteConfig.url}/`,
          hu: `${siteConfig.url}/hu`,
        },
      },
    },
    {
      url: `${siteConfig.url}/hu`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${siteConfig.url}/`,
          hu: `${siteConfig.url}/hu`,
        },
      },
    },
    {
      url: `${siteConfig.url}/projects/swaya`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}

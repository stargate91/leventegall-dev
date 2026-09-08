import { execSync } from "node:child_process";
import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

function getLatestCommitDate(): Date {
  const envDate =
    process.env.VERCEL_GIT_COMMIT_DATE ||
    process.env.NEXT_PUBLIC_BUILD_DATE ||
    process.env.BUILD_DATE;
  if (envDate) {
    const parsed = new Date(envDate);
    if (!isNaN(parsed.getTime())) {
      return parsed;
    }
  }

  try {
    const gitOutput = execSync("git log -1 --format=%cI", {
      encoding: "utf-8",
      stdio: ["ignore", "pipe", "ignore"],
      timeout: 1500,
    }).trim();

    if (gitOutput) {
      const parsed = new Date(gitOutput);
      if (!isNaN(parsed.getTime())) {
        return parsed;
      }
    }
  } catch {
    // Graceful fallback if git is unavailable in execution environment (e.g. Docker container without .git)
  }

  // Fallback to current build timestamp so Docker and CI builds never freeze on a stale hardcoded date
  return new Date();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = getLatestCommitDate();

  return [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          en: siteConfig.url,
          hu: `${siteConfig.url}/hu`,
          "x-default": siteConfig.url,
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
          en: siteConfig.url,
          hu: `${siteConfig.url}/hu`,
          "x-default": siteConfig.url,
        },
      },
    },
    {
      url: `${siteConfig.url}/projects/swaya`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${siteConfig.url}/projects/swaya`,
          "x-default": `${siteConfig.url}/projects/swaya`,
        },
      },
    },
  ];
}

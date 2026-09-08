import SwayaCaseStudyContent from "./SwayaCaseStudyContent";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Swaya Media Manager Case Study | Levente Gáll",
  description:
    "Engineering case study of Swaya: a high-performance desktop media manager built with Python, FastAPI, Electron, React, SQLite, and MPV IPC.",
  keywords: [
    "Swaya",
    "Swaya Media Manager",
    "FastAPI Desktop App",
    "Electron Python",
    "React Desktop App",
    "SQLite Database Architecture",
    "Media Indexer Architecture",
    "Levente Gáll",
  ],
  alternates: {
    canonical: `${siteConfig.url}/projects/swaya`,
  },
  openGraph: {
    type: "article",
    locale: "en_US",
    alternateLocale: ["hu_HU"],
    url: `${siteConfig.url}/projects/swaya`,
    title: "Swaya Media Manager • Architectural Case Study",
    description:
      "Full-stack desktop media management application engineered with Python, FastAPI, Electron, and React.",
    siteName: "Levente Gáll Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swaya Media Manager • Architectural Case Study",
    description:
      "Full-stack desktop media manager engineered with Python, FastAPI, Electron, and React.",
    creator: "@stargate91",
  },
};

export default function SwayaCaseStudyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Projects",
            item: `${siteConfig.url}/#projects`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Swaya Media Manager",
            item: `${siteConfig.url}/projects/swaya`,
          },
        ],
      },
      {
        "@type": "SoftwareApplication",
        name: "Swaya Media Manager",
        operatingSystem: "Windows, macOS, Linux",
        applicationCategory: "MultimediaApplication",
        url: "https://swaya.xyz/",
        author: {
          "@type": "Person",
          name: siteConfig.author,
          url: siteConfig.url,
        },
        description:
          "High-performance desktop media manager engineered with Python, FastAPI, Electron, and React.",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SwayaCaseStudyContent />
    </>
  );
}

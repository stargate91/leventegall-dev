import SwayaCaseStudyContent from "./SwayaCaseStudyContent";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Swaya Media Manager Case Study",
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
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: `${siteConfig.url}/projects/swaya`,
    languages: {
      en: `${siteConfig.url}/projects/swaya`,
      "x-default": `${siteConfig.url}/projects/swaya`,
    },
  },
  openGraph: {
    type: "article",
    publishedTime: "2026-03-01T00:00:00.000Z",
    modifiedTime: "2026-09-08T00:00:00.000Z",
    authors: [siteConfig.author],
    section: "Software Engineering",
    tags: [
      "Swaya",
      "FastAPI",
      "Electron",
      "Python",
      "React",
      "SQLite",
      "Desktop App Architecture",
    ],
    locale: "en_US",
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
            name: "Swaya Case Study",
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
        softwareVersion: "1.0.0",
        image: `${siteConfig.url}/projects/swaya/library.webp`,
        screenshot: `${siteConfig.url}/projects/swaya/library.webp`,
        author: {
          "@type": "Person",
          name: siteConfig.author,
          url: siteConfig.url,
        },
        description:
          "High-performance desktop media manager engineered with Python, FastAPI, Electron, and React.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
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

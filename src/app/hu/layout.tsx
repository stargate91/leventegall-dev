import type { Metadata, Viewport } from "next";
import RootShell from "@/components/layout/RootShell";
import { siteConfig } from "@/config/site";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#05070b",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  referrer: "strict-origin-when-cross-origin",
  title: {
    default: "Levente Gáll • Full-Stack Fejlesztő",
    template: "%s | Gáll Levente",
  },
  description:
    "Full-stack fejlesztő: webalkalmazások, backendek és automatizálás Python, FastAPI, React, Next.js és TypeScript alapokon. Fizikusi háttér és nemzetközi ügyféltapasztalat.",
  keywords: [
    "Levente Gáll",
    "Gáll Levente",
    "Full-Stack Fejlesztő",
    "Python Fejlesztő",
    "FastAPI",
    "React",
    "Next.js",
    "TypeScript",
    "Budapest",
    "ELTE Fizika",
  ],
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  alternates: {
    canonical: `${siteConfig.url}/hu`,
    languages: {
      en: siteConfig.url,
      hu: `${siteConfig.url}/hu`,
      "x-default": siteConfig.url,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    images: [{ url: `${siteConfig.url}/hu/opengraph-image` }],
    type: "website",
    locale: "hu_HU",
    alternateLocale: ["en_US"],
    url: `${siteConfig.url}/hu`,
    title: "Levente Gáll • Full-Stack Fejlesztő",
    description:
      "Full-stack fejlesztő: webalkalmazások, backendek és automatizálás Python, FastAPI, React, Next.js és TypeScript alapokon. Fizikusi háttér és nemzetközi ügyféltapasztalat.",
    siteName: "Levente Gáll Portfólió",
  },
  twitter: {
    images: [{ url: `${siteConfig.url}/hu/opengraph-image` }],
    card: "summary_large_image",
    title: "Levente Gáll • Full-Stack Fejlesztő",
    description:
      "Full-stack fejlesztő: webalkalmazások, backendek és automatizálás Python, FastAPI, React, Next.js és TypeScript alapokon. Fizikusi háttér és nemzetközi ügyféltapasztalat.",
    creator: "@stargate91",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "lt4P2iWw1-_j9exmD7klXqrIuJ2IXpXr--5i0P_M4jk",
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || "321fca12f1a92891",
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION || "11F8A467FA3C48BE70348023E354FCA3",
    },
  },
};

export default function HungarianLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootShell lang="hu">{children}</RootShell>;
}

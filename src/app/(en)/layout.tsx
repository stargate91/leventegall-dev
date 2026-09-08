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
    default: siteConfig.title,
    template: "%s | Levente Gáll",
  },
  description: siteConfig.description,
  keywords: [
    "Levente Gáll",
    "Gáll Levente",
    "Full-Stack Developer",
    "Full-Stack Fejlesztő",
    "Brand Strategist",
    "Márkastratéga",
    "Python Developer",
    "Python Fejlesztő",
    "FastAPI",
    "React",
    "Next.js",
    "TypeScript",
    "Brand Naming",
    "Névadás",
    "Copywriting",
    "Szövegírás",
    "Budapest",
    "ELTE Physics",
    "ELTE Fizika",
  ],
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  alternates: {
    canonical: siteConfig.url,
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
    type: "website",
    locale: "en_US",
    alternateLocale: ["hu_HU"],
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: "Levente Gáll Portfolio",
    images: [
      {
        url: `${siteConfig.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Levente Gáll - Full-Stack Developer & Brand Strategist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: "@stargate91",
    images: [
      {
        url: `${siteConfig.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Levente Gáll - Full-Stack Developer & Brand Strategist",
      },
    ],
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

export default function EnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootShell lang="en">{children}</RootShell>;
}

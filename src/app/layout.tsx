import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import type { Metadata, Viewport } from "next";
import StructuredData from "@/components/StructuredData";
import { siteConfig } from "@/config/site";
import "@/styles/tokens/colors.css";
import "@/styles/tokens/spacing.css";
import "@/styles/tokens/typography.css";
import "@/styles/tokens/borders.css";
import "@/styles/base/reset.css";
import "@/styles/base/typography.css";
import "@/styles/base/layout.css";
import "@/styles/base/scrollbar.css";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#05070b",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s | Levente Gáll",
  },
  description: siteConfig.description,
  keywords: [
    "Levente Gáll",
    "Gáll Levente",
    "Full-Stack Developer",
    "Brand Strategist",
    "Python Developer",
    "FastAPI",
    "React",
    "Next.js",
    "TypeScript",
    "Brand Naming",
    "Copywriting",
    "Budapest",
    "ELTE Physics",
  ],
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: "Levente Gáll Portfolio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Levente Gáll — Full-Stack Developer & Brand Strategist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: "@stargate91",
    images: ["/opengraph-image"],
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <StructuredData />
      </head>
      <body>
        <div className="cosmic-mesh-bg" aria-hidden="true" />
        <div className="cosmic-grid-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}

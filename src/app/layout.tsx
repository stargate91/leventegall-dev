import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import type { Metadata, Viewport } from "next";
import StructuredData from "@/components/StructuredData";
import AudioPlayer from "@/components/AudioPlayer";
import { siteConfig } from "@/config/site";
import { LocaleProvider } from "@/locales";
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
      "en-US": `${siteConfig.url}/`,
      "hu-HU": `${siteConfig.url}/hu`,
      "x-default": `${siteConfig.url}/`,
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
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: "@stargate91",
    images: [
      {
        url: "/opengraph-image",
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
      <body>
        <StructuredData />
        <div className="cosmic-mesh-bg" aria-hidden="true" />
        <div className="cosmic-grid-overlay" aria-hidden="true" />
        <LocaleProvider>
          {children}
          <AudioPlayer />
        </LocaleProvider>
      </body>
    </html>
  );
}

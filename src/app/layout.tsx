import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
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
  title: "Creative Developer & Brand Strategist | Celestial Engineering & Verbal Identity",
  description:
    "Portfolio of a Full-Stack Creative Developer & Brand Strategist. Merging deep-space code architecture with Fiverr-proven naming, slogans, and product psychology.",
  keywords: [
    "Creative Developer",
    "Brand Strategist",
    "Full-Stack Developer",
    "Naming Specialist",
    "Slogan Writer",
    "Next.js",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "Creative Developer" }],
  openGraph: {
    title: "Creative Developer & Brand Strategist",
    description:
      "Where modern full-stack web architecture meets high-converting brand naming and verbal identity.",
    type: "website",
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
        <div className="cosmic-mesh-bg" aria-hidden="true" />
        <div className="cosmic-grid-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}

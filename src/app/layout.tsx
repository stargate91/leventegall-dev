import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import type { Metadata, Viewport } from "next";
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
  title: "Gáll Levente | Full-Stack Developer & Brand Strategist",
  description:
    "Portfolio of Levente Gáll. Full-stack software architecture (Python, FastAPI, React, TypeScript) backed by an ELTE Physics background and 1,100+ branding missions on Fiverr.",
  keywords: [
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
  ],
  authors: [{ name: "Gáll Levente" }],
  openGraph: {
    title: "Gáll Levente | Full-Stack Developer & Brand Strategist",
    description:
      "Full-stack software architecture meets high-converting brand naming and product psychology.",
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

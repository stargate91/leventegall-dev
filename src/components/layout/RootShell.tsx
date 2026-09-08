import React from "react";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "@/styles/tokens/colors.css";
import "@/styles/tokens/spacing.css";
import "@/styles/tokens/typography.css";
import "@/styles/tokens/borders.css";
import "@/styles/base/reset.css";
import "@/styles/base/typography.css";
import "@/styles/base/layout.css";
import "@/styles/base/scrollbar.css";
import "@/app/globals.css";
import type { Locale } from "@/locales/dictionary.types";
import AudioPlayer from "@/components/AudioPlayer";
import { LocaleProvider } from "@/locales";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-space",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jetbrains",
  display: "swap",
});

interface RootShellProps {
  lang: Locale;
  children: React.ReactNode;
}

export default function RootShell({ lang, children }: RootShellProps) {
  return (
    <html
      lang={lang}
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <div className="cosmic-mesh-bg" aria-hidden="true" />
        <div className="cosmic-grid-overlay" aria-hidden="true" />
        <LocaleProvider initialLocale={lang}>
          {children}
          <AudioPlayer />
        </LocaleProvider>
      </body>
    </html>
  );
}

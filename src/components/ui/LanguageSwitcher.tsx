"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./LanguageSwitcher.module.css";
import { useLocale } from "@/locales";

export interface LanguageSwitcherProps {
  className?: string | undefined;
}

export default function LanguageSwitcher({ className = "" }: LanguageSwitcherProps) {
  const { locale, setLocale } = useLocale();
  const pathname = usePathname();
  const isUntranslatedSubpage = Boolean(pathname?.startsWith("/projects"));

  return (
    <div
      role="group"
      aria-label="Language selection"
      className={`${styles.switcher} ${className}`.trim()}
    >
      <Link
        href="/"
        hrefLang="en"
        aria-current={locale === "en" ? "page" : undefined}
        onClick={() => setLocale("en")}
        className={`${styles.langBtn} ${locale === "en" ? styles.active : ""}`}
      >
        EN
        <span className="sr-only"> Switch language to English</span>
      </Link>

      <div className={styles.divider} aria-hidden="true" />

      <Link
        href="/hu"
        hrefLang="hu"
        aria-current={locale === "hu" ? "page" : undefined}
        onClick={() => setLocale("hu")}
        title={
          isUntranslatedSubpage
            ? "This case study is available in English only. Navigates to the Hungarian home page."
            : "Switch language to Hungarian"
        }
        className={`${styles.langBtn} ${locale === "hu" ? styles.active : ""}`}
      >
        HU
        <span className="sr-only">
          {isUntranslatedSubpage
            ? " Switch to Hungarian home page (this case study is available in English only)"
            : " Switch language to Hungarian"}
        </span>
      </Link>
    </div>
  );
}

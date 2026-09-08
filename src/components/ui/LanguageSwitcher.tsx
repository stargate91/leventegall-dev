"use client";

import React from "react";
import styles from "./LanguageSwitcher.module.css";
import { useLocale } from "@/locales";

export interface LanguageSwitcherProps {
  className?: string | undefined;
}

export default function LanguageSwitcher({ className = "" }: LanguageSwitcherProps) {
  const { locale, setLocale } = useLocale();

  return (
    <div
      role="group"
      aria-label="Language selection"
      className={`${styles.switcher} ${className}`.trim()}
    >
      <button
        type="button"
        aria-pressed={locale === "en"}
        onClick={() => setLocale("en")}
        className={`${styles.langBtn} ${locale === "en" ? styles.active : ""}`}
      >
        EN
        <span className="sr-only"> Switch language to English</span>
      </button>

      <div className={styles.divider} aria-hidden="true" />

      <button
        type="button"
        aria-pressed={locale === "hu"}
        onClick={() => setLocale("hu")}
        className={`${styles.langBtn} ${locale === "hu" ? styles.active : ""}`}
      >
        HU
        <span className="sr-only"> Switch language to Hungarian</span>
      </button>
    </div>
  );
}

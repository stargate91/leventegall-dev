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
        aria-label="Switch language to English"
        onClick={() => setLocale("en")}
        className={`${styles.langBtn} ${locale === "en" ? styles.active : ""}`}
      >
        EN
      </button>

      <div className={styles.divider} aria-hidden="true" />

      <button
        type="button"
        aria-pressed={locale === "hu"}
        aria-label="Switch language to Hungarian"
        onClick={() => setLocale("hu")}
        className={`${styles.langBtn} ${locale === "hu" ? styles.active : ""}`}
      >
        HU
      </button>
    </div>
  );
}

"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { getDictionary } from "./index";
import type { Dictionary, Locale } from "./dictionary.types";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (nextLocale: Locale) => void;
  dict: Dictionary;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  children,
  initialLocale = "en",
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    setLocaleState(initialLocale);
  }, [initialLocale]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const match = document.cookie.match(/(?:^|;\s*)NEXT_LOCALE=([^;]+)/);
      const cookieLocale = match?.[1] as Locale | undefined;
      if (cookieLocale && (cookieLocale === "en" || cookieLocale === "hu") && !initialLocale) {
        setLocaleState(cookieLocale);
        document.documentElement.lang = cookieLocale;
      }
    }
  }, [initialLocale]);

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
    if (typeof document !== "undefined") {
      document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
      document.documentElement.lang = nextLocale;
    }
  }, []);

  const dict = useMemo(() => getDictionary(locale), [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      dict,
    }),
    [locale, setLocale, dict],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext);
  if (!context) {
    return {
      locale: "en",
      setLocale: () => {},
      dict: getDictionary("en"),
    };
  }
  return context;
}

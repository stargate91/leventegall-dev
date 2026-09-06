import { en } from "./en";
import { hu } from "./hu";
import type { Dictionary, Locale } from "./dictionary.types";

export const dictionaries: Record<Locale, Dictionary> = {
  en,
  hu,
};

export function getDictionary(locale: Locale = "en"): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}

export * from "./dictionary.types";
export * from "./LocaleContext";

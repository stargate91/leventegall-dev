import { en } from "./en";
import type { Dictionary } from "./dictionary.types";

export type Locale = "en";

export const dictionaries: Record<Locale, Dictionary> = {
  en,
};

export function getDictionary(locale: Locale = "en"): Dictionary {
  return dictionaries[locale] || dictionaries.en;
}

export * from "./dictionary.types";

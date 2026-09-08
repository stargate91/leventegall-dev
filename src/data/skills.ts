import type { Dictionary } from "@/locales";
import type { SkillCategoryLocale } from "@/locales/dictionary.types";

export type SkillCategory = SkillCategoryLocale;

export function getSkillCategories(dict: Dictionary): SkillCategory[] {
  return dict.skills.categories;
}

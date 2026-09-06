import type { Dictionary } from "@/locales";

export interface SkillItem {
  name: string;
  level: number;
  status: string;
}

export interface ClientFeedback {
  id: string;
  quote: string;
  client: string;
  stars: number;
}

const engineeringLevels: readonly number[] = [96, 93, 94, 90, 89, 95];
const brandingLevels: readonly number[] = [98, 96, 92, 95, 96, 92];

export function getEngineeringSkills(dict: Dictionary): SkillItem[] {
  return dict.skills.engineeringList.map((item, index) => ({
    name: item.name,
    level: engineeringLevels[index] ?? 90,
    status: item.status,
  }));
}

export function getBrandingSkills(dict: Dictionary): SkillItem[] {
  return dict.skills.brandingList.map((item, index) => ({
    name: item.name,
    level: brandingLevels[index] ?? 90,
    status: item.status,
  }));
}

export function getFiverrFeedback(dict: Dictionary): ClientFeedback[] {
  return dict.skills.feedback.map((item) => ({
    id: item.id,
    quote: item.quote,
    client: item.client,
    stars: 5,
  }));
}

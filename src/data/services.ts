import type { Dictionary } from "@/locales";

export interface PackageTier {
  id: string;
  name: string;
  codename: string;
  description: string;
  isPopular?: boolean | undefined;
}

export interface ServiceOption {
  value: string;
  label: string;
}

export function getPackageTiers(dict: Dictionary): PackageTier[] {
  return [
    {
      id: "development",
      name: dict.services.tiers.development.name,
      codename: dict.services.tiers.development.codename,
      isPopular: true,
      description: dict.services.tiers.development.description,
    },
    {
      id: "automation",
      name: dict.services.tiers.automation.name,
      codename: dict.services.tiers.automation.codename,
      description: dict.services.tiers.automation.description,
    },
    {
      id: "discord-bot",
      name: dict.services.tiers.discordBot.name,
      codename: dict.services.tiers.discordBot.codename,
      description: dict.services.tiers.discordBot.description,
    },
  ];
}

export function getContactTierOptions(dict: Dictionary): ServiceOption[] {
  return dict.services.contactTierOptions;
}

export function getTimelineOptions(dict: Dictionary): ServiceOption[] {
  return dict.services.timelineOptions;
}

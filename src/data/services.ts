import type { Dictionary } from "@/locales";

export interface PackageTier {
  id: string;
  name: string;
  badge: string;
  codename: string;
  priceEstimate: string;
  duration: string;
  isPopular?: boolean;
  description: string;
  features: string[];
}

export interface ServiceOption {
  value: string;
  label: string;
}

export function getPackageTiers(dict: Dictionary): PackageTier[] {
  return [
    {
      id: "naming",
      name: dict.services.tiers.naming.name,
      badge: dict.services.tiers.naming.badge,
      codename: dict.services.tiers.naming.codename,
      priceEstimate: dict.services.tiers.naming.priceEstimate,
      duration: dict.services.tiers.naming.duration,
      description: dict.services.tiers.naming.description,
      features: dict.services.tiers.naming.features,
    },
    {
      id: "full-orbit",
      name: dict.services.tiers.fullOrbit.name,
      badge: dict.services.tiers.fullOrbit.badge,
      codename: dict.services.tiers.fullOrbit.codename,
      priceEstimate: dict.services.tiers.fullOrbit.priceEstimate,
      duration: dict.services.tiers.fullOrbit.duration,
      isPopular: true,
      description: dict.services.tiers.fullOrbit.description,
      features: dict.services.tiers.fullOrbit.features,
    },
    {
      id: "web-dev",
      name: dict.services.tiers.webDev.name,
      badge: dict.services.tiers.webDev.badge,
      codename: dict.services.tiers.webDev.codename,
      priceEstimate: dict.services.tiers.webDev.priceEstimate,
      duration: dict.services.tiers.webDev.duration,
      description: dict.services.tiers.webDev.description,
      features: dict.services.tiers.webDev.features,
    },
  ];
}

export function getContactTierOptions(dict: Dictionary): ServiceOption[] {
  return dict.services.contactTierOptions;
}

export function getTimelineOptions(dict: Dictionary): ServiceOption[] {
  return dict.services.timelineOptions;
}

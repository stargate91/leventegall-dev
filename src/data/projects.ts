import type { Dictionary } from "@/locales";

export interface ImpactMetric {
  label: string;
  value: string;
}

export type ProjectDemoType = "swaya" | "iris" | "branding";

export interface ProjectData {
  id: string;
  badge: string;
  title: string;
  codename: string;
  tagline: string;
  description: string;
  githubUrl: string;
  role: string;
  duration: string;
  stack: string[];
  challenge: string;
  solution: string;
  impactMetrics: ImpactMetric[];
  demoType: ProjectDemoType;
}

export interface BrandingTagline {
  id: string;
  text: string;
  focus: string;
}

export function getBrandingTaglines(dict: Dictionary): BrandingTagline[] {
  return dict.projects.brandingTaglines;
}

export function getProjectsData(dict: Dictionary): ProjectData[] {
  return [
    {
      id: "swaya",
      badge: dict.projects.items.swaya.badge,
      title: dict.projects.items.swaya.title,
      codename: dict.projects.items.swaya.codename,
      tagline: dict.projects.items.swaya.tagline,
      description: dict.projects.items.swaya.description,
      githubUrl: "https://github.com/stargate91/Swaya",
      role: dict.projects.items.swaya.role,
      duration: dict.projects.items.swaya.duration,
      stack: [
        "FastAPI",
        "Python",
        "React (Vite)",
        "Electron",
        "SQLAlchemy 2.0",
        "SQLite",
        "Alembic",
        "TanStack Query",
        "Zustand",
      ],
      challenge: dict.projects.items.swaya.challenge,
      solution: dict.projects.items.swaya.solution,
      impactMetrics: dict.projects.items.swaya.impactMetrics,
      demoType: "swaya",
    },
    {
      id: "iris",
      badge: dict.projects.items.iris.badge,
      title: dict.projects.items.iris.title,
      codename: dict.projects.items.iris.codename,
      tagline: dict.projects.items.iris.tagline,
      description: dict.projects.items.iris.description,
      githubUrl: "https://github.com/stargate91/discord-activity-watcher-bot",
      role: dict.projects.items.iris.role,
      duration: dict.projects.items.iris.duration,
      stack: [
        "Python",
        "Asyncio",
        "discord.py",
        "SQLite",
        "Pillow Image Processing",
        "HU/EN Localization",
      ],
      challenge: dict.projects.items.iris.challenge,
      solution: dict.projects.items.iris.solution,
      impactMetrics: dict.projects.items.iris.impactMetrics,
      demoType: "iris",
    },
    {
      id: "aetheria",
      badge: dict.projects.items.aetheria.badge,
      title: dict.projects.items.aetheria.title,
      codename: dict.projects.items.aetheria.codename,
      tagline: dict.projects.items.aetheria.tagline,
      description: dict.projects.items.aetheria.description,
      githubUrl: "https://github.com/stargate91",
      role: dict.projects.items.aetheria.role,
      duration: dict.projects.items.aetheria.duration,
      stack: [
        "Brand Naming",
        "Copywriting",
        "Next.js 16",
        "TypeScript",
        "Vanilla CSS",
        "Stripe Ready",
      ],
      challenge: dict.projects.items.aetheria.challenge,
      solution: dict.projects.items.aetheria.solution,
      impactMetrics: dict.projects.items.aetheria.impactMetrics,
      demoType: "branding",
    },
  ];
}

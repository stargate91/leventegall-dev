import type { Dictionary } from "@/locales";

export interface ImpactMetric {
  label: string;
  value: string;
}

export interface ProjectScreenshot {
  id: string;
  src: string;
  title: string;
}

export interface ProjectData {
  id: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  liveUrl?: string | undefined;
  stack: string[];
  primaryStack: string[];
  impactMetrics: ImpactMetric[];
  screenshots?: ProjectScreenshot[] | undefined;
}

export function getProjectsData(dict: Dictionary): ProjectData[] {
  return [
    {
      id: "swaya",
      badge: dict.projects.items.swaya.badge,
      title: dict.projects.items.swaya.title,
      tagline: dict.projects.items.swaya.tagline,
      description: dict.projects.items.swaya.description,
      liveUrl: "https://swaya.xyz/",
      stack: [
        "FastAPI",
        "Python",
        "Electron",
        "React",
        "Vite",
        "JavaScript",
        "SQLAlchemy",
        "SQLite",
        "Alembic",
        "TanStack Query",
        "Zustand",
        "MPV IPC",
      ],
      primaryStack: ["FastAPI", "Python", "Electron", "React", "SQLite"],
      impactMetrics: dict.projects.items.swaya.impactMetrics,
      screenshots: [
        {
          id: "organizer",
          src: "/projects/swaya/organizer.webp",
          title: dict.projects.simulators.swayaOrganizerShot,
        },
        {
          id: "library",
          src: "/projects/swaya/library.webp",
          title: dict.projects.simulators.swayaLibraryShot,
        },
        {
          id: "detail",
          src: "/projects/swaya/detail.webp",
          title: dict.projects.simulators.swayaDetailShot,
        },
      ],
    },
    {
      id: "nova",
      badge: dict.projects.items.nova.badge,
      title: dict.projects.items.nova.title,
      tagline: dict.projects.items.nova.tagline,
      description: dict.projects.items.nova.description,
      liveUrl: "https://novafeeds.xyz/",
      stack: [
        "Python",
        "FastAPI",
        "Discord.py",
        "React",
        "TypeScript",
        "Vite",
        "PostgreSQL",
        "Redis",
        "SQLAlchemy",
        "Alembic",
        "Docker",
      ],
      primaryStack: ["Python", "FastAPI", "React", "PostgreSQL", "Redis"],
      impactMetrics: dict.projects.items.nova.impactMetrics,
      screenshots: [
        {
          id: "landing",
          src: "/projects/nova/landing.webp",
          title: dict.projects.simulators.novaDashboardShot,
        },
        {
          id: "settings",
          src: "/projects/nova/settings.webp",
          title: dict.projects.simulators.novaFeedsShot,
        },
        {
          id: "discord",
          src: "/projects/nova/discord-alert.webp",
          title: dict.projects.simulators.novaBotShot,
        },
      ],
    },
    {
      id: "pill-player",
      badge: dict.projects.items.pillPlayer.badge,
      title: dict.projects.items.pillPlayer.title,
      tagline: dict.projects.items.pillPlayer.tagline,
      description: dict.projects.items.pillPlayer.description,
      liveUrl: "https://www.npmjs.com/package/@stargate91/pill-player",
      stack: [
        "React",
        "TypeScript",
        "Web Audio API",
        "tsup",
        "Vite",
        "UnoCSS",
        "npm Package",
      ],
      primaryStack: ["React", "TypeScript", "Web Audio API", "tsup"],
      impactMetrics: dict.projects.items.pillPlayer.impactMetrics,
      screenshots: [
        {
          id: "preview",
          src: "/projects/pill-player/preview.webp",
          title: dict.projects.simulators.pillPlayerShot,
        },
      ],
    },
  ];
}

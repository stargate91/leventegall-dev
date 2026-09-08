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
  githubUrl?: string | undefined;
  liveUrl?: string | undefined;
  stack: string[];
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
  ];
}

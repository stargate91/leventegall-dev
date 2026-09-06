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
  text: string;
  focus: string;
}

export const brandingTaglines: BrandingTagline[] = [
  { text: "Engineered for clarity. Built for daily resilience.", focus: "Modern / Minimal" },
  { text: "Where precision hardware meets intuitive software.", focus: "Technical / Direct" },
  { text: "Quiet performance. Uncompromising quality.", focus: "Premium / Understated" },
];

export const projectsData: ProjectData[] = [
  {
    id: "swaya",
    badge: "FEATURED PROJECT 01 // DESKTOP & API",
    title: "Swaya Media & Library Ecosystem",
    codename: "FASTAPI + REACT + ELECTRON",
    tagline: "4-iteration evolution from PyQt6 to asynchronous FastAPI, React, Electron & SQLAlchemy 2.0.",
    description:
      "A desktop media and library organizer evolved over four distinct iterations. It pairs an asynchronous FastAPI Python backend with a reactive React frontend packaged in Electron, featuring automated TMDB/OMDb metadata matching, SQLite caching, and background task queues.",
    githubUrl: "https://github.com/stargate91/Swaya",
    role: "Lead Architect & Developer",
    duration: "4 Architecture Iterations",
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
    challenge:
      "Handling high-volume metadata lookups, multi-threaded filesystem indexing, and database migrations without freezing the desktop user interface.",
    solution:
      "Separated the app into a clean layered architecture (Domain-Driven Design) with an asynchronous background worker queue, SQLAlchemy 2.0 migrations, and in-memory TTL caching.",
    impactMetrics: [
      { label: "Evolution History", value: "4 Iterations" },
      { label: "API Response Time", value: "< 15ms (Cached)" },
      { label: "Architecture", value: "Layered DDD" },
    ],
    demoType: "swaya",
  },
  {
    id: "iris",
    badge: "FEATURED PROJECT 02 // EVENT STREAM",
    title: "Iris Activity & Telemetry Bot",
    codename: "PYTHON ASYNCIO + PILLOW",
    tagline: "Real-time Discord activity tracker with dynamic image generation and ranking algorithms.",
    description:
      "An event-driven Discord bot built with Python and asyncio. It monitors server engagement across voice channels, stream sessions, and messages, dynamically composites customized visual profile cards on-the-fly with Pillow, and assigns automated weekly ranks.",
    githubUrl: "https://github.com/stargate91/discord-activity-watcher-bot",
    role: "Backend & Bot Developer",
    duration: "Active Open Source",
    stack: [
      "Python",
      "Asyncio",
      "discord.py",
      "SQLite",
      "Pillow Image Processing",
      "HU/EN Localization",
    ],
    challenge:
      "Tracking high-frequency multi-channel event streams in real time while rendering high-resolution profile images without blocking the main event loop.",
    solution:
      "Utilized Python asyncio task pipelines, optimized in-memory Pillow image buffers, and an indexed SQLite database for fast ranking queries.",
    impactMetrics: [
      { label: "Event Pipeline", value: "Async Task Loop" },
      { label: "Card Render Time", value: "Sub-50ms Buffer" },
      { label: "Localization", value: "English & Hungarian" },
    ],
    demoType: "iris",
  },
  {
    id: "aetheria",
    badge: "FEATURED PROJECT 03 // BRAND + WEB",
    title: "Aetheria Platform Concept",
    codename: "BRAND NAMING + NEXT.JS",
    tagline: "A showcase of how brand strategy, positioning copy, and clean web engineering come together.",
    description:
      "A concept demonstrating end-to-end product creation: from phonetic brand naming, domain vetting, and conversion-focused copywriting to a responsive, accessible Next.js 16 web application built with TypeScript and modern CSS.",
    githubUrl: "https://github.com/stargate91",
    role: "Brand Strategist & Full-Stack Developer",
    duration: "Prototype Showcase",
    stack: [
      "Brand Naming",
      "Copywriting",
      "Next.js 16",
      "TypeScript",
      "Vanilla CSS",
      "Stripe Ready",
    ],
    challenge:
      "Creating a distinctive, legally viable brand name and clear value proposition while delivering a sub-second page load web experience.",
    solution:
      "Applied proven Fiverr naming frameworks, phonetic clearance checks, and built a lightweight Next.js front-end with zero third-party bundle bloat.",
    impactMetrics: [
      { label: "Fiverr Methodology", value: "1,100+ Lineage" },
      { label: "Performance", value: "99+ Lighthouse" },
      { label: "Domain Clearance", value: "100% Vetted" },
    ],
    demoType: "branding",
  },
];

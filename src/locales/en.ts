import type { Dictionary } from "./dictionary.types";

export const en: Dictionary = {
  brandName: "LEVENTE GALL // STARGATE91",
  personName: "Levente Gall",
  nav: {
    journey: "JOURNEY",
    projects: "PROJECTS",
    skills: "SKILLS",
    services: "SERVICES",
    clients: "CLIENTS",
    contact: "CONTACT",
    available: "Available",
    sidebarBio: "Currently expanding my full-stack depth while migrating the Swaya media manager backend from Python to TypeScript.",
  },
  sections: {
    about: "01 // ABOUT ME",
    projects: "02 // FEATURED PROJECTS",
    skills: "03 // SKILLS & TECH STACK",
    services: "04 // HOW I CAN HELP",
    reviews: "05 // TESTIMONIALS",
    contact: "06 // CONTACT",
  },
  hero: {
    titleMain: "Hi, I’m Levente Gáll.",
    titleGradient: "I build software & brands.",
    description:
      "Full-stack development, an ELTE physics background, and independent brand naming & taglines.",
    stats: {
      fiverrValue: "1,100+ Clients\n4.8★ Rating",
      fiverrLabel: "Brand Naming & Slogans on Fiverr",
      stackValue: "Full-Stack\nDevelopment",
      stackLabel: "FastAPI, Python, React & TypeScript",
      physicsValue: "Analytical Physics\nMindset",
      physicsLabel: "ELTE Physics & Astronomy",
    },
  },
  story: {
    subtitle: "Background & Journey",
    title: "Where Physics, Branding & Code Meet",
    description: "How an analytical mindset, 5 years of client-tested marketing on Fiverr, and full-stack software development come together.",
    timeline: [
      {
        sol: "CHAPTER 01",
        date: "2014 – 2019",
        title: "Physics & Astronomy Studies (ELTE)",
        desc: "I first got into programming while studying Physics and Astronomy at Eötvös Loránd University (ELTE). That's where I wrote my first code in C and started using Python for numerical methods, data analysis, and simulations. It gave me a solid mathematical foundation and taught me how to break down complex problems step by step.",
        metrics: [
          "ELTE Physics & Astronomy",
          "First Programming in C",
          "Python & Numerical Methods",
        ],
      },
      {
        sol: "CHAPTER 02",
        date: "2021 – 2026",
        title: "Startup Naming & Slogans (Fiverr)",
        desc: "Over 5 years, I built a top-rated freelance branding practice on Fiverr, helping more than 1,100 international founders find the right name and message for their startups. It taught me how people actually think, choose, and buy. Clear naming and sharp copywriting aren't decoration - they're how you earn attention in a crowded market.",
        metrics: [
          "1,100+ Orders Delivered",
          "400+ 5-Star Reviews (4.8★)",
          "Brand Naming & Slogans",
        ],
      },
      {
        sol: "CHAPTER 03",
        date: "2023 – PRESENT",
        title: "Backend Architecture & Modern Frontends",
        desc: "Great branding falls flat without a reliable product, and clean code is wasted if the messaging is confusing. I build robust backends with FastAPI and Python, paired with modern, responsive React and TypeScript frontends. Having one person oversee both means zero handoff friction and a product that feels cohesive from the first headline to the final API call.",
        metrics: [
          "FastAPI & Python Architecture",
          "React & Next.js Platforms",
          "End-to-End System Delivery",
        ],
      },
    ],
  },
  projects: {
    subtitle: "Selected Projects",
    title: "Featured Work & Projects",
    description: "Real-world software and systems built from architectural design to polished, working products.",
    labels: {
      appOverview: "APP OVERVIEW",
      viewGithub: "View Code on GitHub",
      visitWebsite: "Visit Product Website",
      discussWork: "Discuss Similar Work",
      caseStudy: "Case Study",
      expandScreenshot: "Click to expand screenshot",
      closeLightbox: "Close viewer",
    },
    simulators: {
      swayaOrganizerShot: "Media Organizer & Renaming Pipeline",
      swayaLibraryShot: "Media Library & Poster Grid",
      swayaDetailShot: "Media Details & Metadata Inspector",
    },
    items: {
      swaya: {
        badge: "FEATURED PROJECT • COMMERCIAL DESKTOP SUITE",
        title: "Swaya Media & Library Ecosystem",
        tagline: "High-performance desktop media manager & automated metadata pipeline running on Windows & Linux.",
        description:
          "A commercial desktop media management ecosystem built as a client-server hybrid. Pairs a high-throughput Python FastAPI backend with an Electron & React frontend, featuring multi-source metadata pairing (TMDb, OMDb, StashDB, ThePornDB, FansDB), customizable renaming templates, dual SFW/NSFW privacy modes with server-side blurring, and synchronized MPV video playback.",
        impactMetrics: [
          { label: "Architecture", value: "Modular Monolith" },
          { label: "Data Providers", value: "5+ Metadata APIs" },
          { label: "Distribution", value: "Portable .EXE" },
        ],
      },
    },
  },
  skills: {
    subtitle: "Core Competencies",
    title: "Skills & Technical Capabilities",
    description: "An overview of my core engineering toolkit and the technologies I use in my daily work.",
    categories: [
      {
        id: "languages",
        title: "Languages",
        description: "Primary programming languages from business logic and systems to frontend interfaces.",
        skills: ["Python", "TypeScript", "JavaScript", "C", "SQL", "HTML / CSS"],
      },
      {
        id: "backend",
        title: "Backend",
        description: "High-throughput, asynchronous API services and background daemons with modular architecture.",
        skills: ["FastAPI", "Node.js", "REST APIs"],
      },
      {
        id: "frontend",
        title: "Frontend",
        description: "Reactive, type-safe, and responsive user interfaces built with modern web frameworks.",
        skills: ["React 18 / 19", "Next.js", "Vite", "Vanilla CSS", "Zustand", "TanStack Query", "React Router", "Radix UI"],
      },
      {
        id: "database",
        title: "Database",
        description: "Relational and in-memory persistence, WAL-mode embedded storage, and type-safe ORMs.",
        skills: ["PostgreSQL", "SQLite", "Redis", "SQLAlchemy", "Drizzle ORM", "Alembic"],
      },
      {
        id: "devops",
        title: "DevOps & Tooling",
        description: "Code consistency, strict static analysis, and automated test pipelines for reliable delivery.",
        skills: ["Git", "ESLint", "Stylelint", "Vitest", "Playwright", "Pytest", "Ruff"],
      },
      {
        id: "desktop",
        title: "Desktop & Native",
        description: "Multi-process desktop interfaces with Electron, native IPC communication, and hardware control.",
        skills: ["Electron", "MPV IPC"],
      },
      {
        id: "mathematics",
        title: "Mathematics & Modeling",
        description: "University physics background, numerical modeling, and scientific visualization.",
        skills: [
          "Analysis",
          "Differential Equations",
          "Probability Theory",
          "Vector Calculus",
          "Complex Analysis",
          "MATLAB",
          "Jupyter Notebook",
          "Gnuplot",
          "LaTeX",
        ],
      },
      {
        id: "branding",
        title: "Verbal Branding & Creative",
        description: "5 years experience, 1,100+ Fiverr projects: phonetic brand naming, taglines, and marketing visuals.",
        skills: [
          "Brand Naming",
          "Slogan & Taglines",
          "Phonetic Analysis",
          "USPTO / EUIPO Screening",
          ".com Audit",
          "UVP Copywriting",
          "Canva",
          "Photoshop",
        ],
      },
    ],
  },
  services: {
    subtitle: "Capabilities & Solutions",
    title: "How Can I Help You?",
    description:
      "Whether you are launching a new startup, need a scalable full-stack web application, or want a custom event-driven Discord bot - let's build something exceptional together.",
    recommendedBadge: "FEATURED",
    customCalloutTitle: "HAVE A CUSTOM OR HYBRID REQUIREMENT?",
    customCalloutDesc:
      "Need a combination of brand strategy, a custom Discord bot, and a high-performance web platform? Let's discuss a tailored solution for your exact workflow.",
    customCalloutButton: "Discuss Your Project",
    tiers: {
      branding: {
        name: "Brand Naming & Slogans",
        codename: "01 // BRANDING",
        description:
          "Trademark-cleared brand names, high-impact slogans, and clear value positioning to help your startup stand out and earn immediate trust.",
      },
      development: {
        name: "Full-Stack & Web Development",
        codename: "02 // SOFTWARE & WEB",
        description:
          "Scalable web applications, backend APIs, and custom software systems engineered with clean architecture, responsive interfaces, and reliable databases.",
      },
      discordBot: {
        name: "Discord Bot Development",
        codename: "03 // DISCORD BOTS",
        description:
          "Custom event-driven bots featuring real-time activity tracking, automated moderation, ranking engines, and custom web dashboards upon request.",
      },
    },
    contactTierOptions: [
      { value: "branding", label: "Brand Naming & Slogans" },
      { value: "development", label: "Full-Stack & Web Development" },
      { value: "discord-bot", label: "Discord Bot Development" },
      { value: "custom", label: "Custom Project / Consultation" },
    ],
    timelineOptions: [
      { value: "immediate", label: "Fast Turnaround (Under 2 weeks)" },
      { value: "2-3-weeks", label: "Standard Timeline (2-4 weeks)" },
      { value: "flexible", label: "Flexible Timeline (1-2 months)" },
    ],
  },
  testimonials: {
    subtitle: "Client Feedback",
    title: "What Founders Say About Working With Me",
    labels: {
      prev: "Previous reviews",
      next: "Next reviews",
      carousel: "Client reviews carousel",
    },
    feedback: [
      {
        id: "feedback-silur",
        quote:
          "Levente didn't only prove his adaptability to the ever-changing environment of the post-AI tech industry but his complimentary skills in marketing and data science helped our firm balance user-facing decisions.",
        author: "Silur",
        role: "Just Silur",
        location: "UAE",
        initials: "S",
        avatar: "/testimonials/silur.webp",
      },
      {
        id: "feedback-tan-do",
        quote:
          "He is really helpful and professional. When I first purchase the gig, I didn't have any idea how to brief in what I want for the names, but with the help of his, I was able to clear things up and have a better understanding of my own request.",
        author: "Tan Do",
        role: "Visual Designer & Illustrator",
        location: "United Kingdom",
        initials: "TD",
        avatar: "/testimonials/tan-do.webp",
      },
      {
        id: "feedback-aldo-scardovi",
        quote:
          "Working with Lev was perfect! He is a great professional and very kind, with very good communication and quality. It was a pleasure to work with him.",
        author: "Aldo Scardovi",
        role: "Independent Financial Advisor",
        location: "Italy",
        initials: "AS",
        avatar: "/testimonials/aldo-scardovi.webp",
      },
      {
        id: "feedback-mischa-sigtermans",
        quote:
          "Lev came up with really good names. He knew how to move his skills in a specific genre. When I asked him to clarify on the names, he took a moment to briefly explain his names. This helped a lot with the whole process. Lev also helped us with our own ideas and provided us with lots of feedback. Would highly recommend!",
        author: "Mischa Sigtermans",
        role: "Stagent | Break of Dawn",
        location: "Netherlands",
        initials: "MS",
        avatar: "/testimonials/mischa-sigtermans.webp",
      },
    ],
  },
  contact: {
    subtitle: "Project Inquiry",
    title: "Let's Talk About Your Project",
    description: "Have an idea in mind, need a strong brand name, or want to build a dependable full-stack web application? Send me a message and I'll get back to you within 24 hours.",
    fields: {
      name: "Your Name *",
      namePlaceholder: "e.g. Alex Miller",
      email: "Your Email Address *",
      emailPlaceholder: "alex@startup.com",
      tier: "Project Scope / Service",
      timeline: "Expected Timeline",
      brief: "Project Details & Goals *",
      briefPlaceholder: "Tell me a bit about your product, your goals, or what kind of brand identity or software system you're looking to build...",
    },
    errors: {
      nameRequired: "Please enter your name.",
      emailRequired: "Please enter your email address.",
      emailInvalid: "Please enter a valid email address (e.g. alex@startup.com).",
      briefRequired: "Please describe your project goals or scope.",
      transmissionFailedTitle: "Something went wrong",
      transmissionFailed: "Something went wrong while sending your message. Please try again or email me directly.",
    },
    success: {
      title: "Message Sent Successfully",
      desc: "Thanks for reaching out! I've received your message and will review your project details and get back to you shortly.",
      button: "Send Another Message",
    },
    submitButton: "Send Message",
    transmittingButton: "Sending...",
    infoColumn: {
      directEmailTag: "DIRECT EMAIL",
      directEmailTitle: "Prefer to email directly?",
      directEmailDesc: "Feel free to send me a direct email anytime. I usually reply within a few hours during business days.",
      atAGlanceTag: "AT A GLANCE",
      backendLabel: "Core Backend:",
      backendValue: "Python / FastAPI / SQL",
      frontendLabel: "Frontend Stack:",
      frontendValue: "React / Next.js / TypeScript",
      personalLabel: "Personal / Music:",
      personalValue: "Drum & Bass & Techno DJ Sets",
      physicsLabel: "Academic Background:",
      physicsValue: "Physics & Astronomy (ELTE)",
    },
  },
  footer: {
    subTitle: "FULL-STACK DEVELOPER & BRAND STRATEGIST",
  },
  audioPlayer: {
    badge: "Music Player",
    subtitle: "Personal Drum & Bass & Techno mix sets",
    openPlayer: "Open music player",
    closePlayer: "Close music player",
    play: "Play",
    pause: "Pause",
    mute: "Mute",
    unmute: "Unmute",
    listenOnMixcloud: "Listen on Mixcloud",
    frequenciesActive: "Playing",
    frequenciesStandby: "Paused",
    prevTrack: "Previous track",
    nextTrack: "Next track",
    selectTrack: "Tracklist",
    directPlayHint: "Click player to start playback directly",
  },
  error: {
    title: "Something Went Wrong",
    description: "An unexpected error occurred while loading this page. Please try again, or head back to the homepage.",
    errorReference: "Error Reference",
    tryAgain: "Try Again",
    backHome: "Back to Home",
  },
  notFound: {
    badge: "// TELEMETRY: SECTOR UNCHARTED",
    title: "SIGNAL LOST IN DEEP SPACE",
    description: "The coordinates you attempted to navigate do not correspond to any known orbital trajectory or active telemetry sector.",
    returnOrbit: "Return to Orbit",
    directUplink: "Direct Uplink",
  },
  swayaCaseStudy: {
    breadcrumbs: {
      home: "Home",
      projects: "Projects",
      caseStudy: "Swaya Case Study",
    },
    hero: {
      badge: "PRODUCTION ARTIFACT",
      telemetry: "DESKTOP SYSTEM ARCHITECTURE",
      title: "Swaya Media Manager",
      tagline: "FastAPI & Electron Desktop Architecture for Local Media Management",
      description:
        "Swaya is a desktop media management application built as a client-server hybrid. It pairs a local Python FastAPI backend with an Electron and React frontend, featuring multi-source metadata scraping, customizable file renaming, and integrated MPV video playback.",
      metrics: {
        latencyValue: "Modular Monolith",
        latencyLabel: "Architecture Pattern",
        filesValue: "5+ Providers",
        filesLabel: "Metadata Scraping APIs",
        privacyValue: "100% Offline",
        privacyLabel: "Local Privacy & Storage",
      },
      visitWebsite: "Visit Live Website",
      backToOverview: "Back to Overview",
    },
    gallery: {
      title: "System Interface & Interactive Previews",
      subtitle: "Multi-pane library virtualization, fast search indexing, and synchronized video playback.",
      previewCaption: "Swaya Media Manager Interface",
    },
    architecture: {
      title: "Key Architectural Highlights",
      subtitle: "Engineered for instantaneous local execution, atomic database writes, and zero UI thread latency.",
      cards: {
        hybridCore: {
          title: "Hybrid Client-Server Desktop Core",
          description:
            "Combines an Electron desktop container with an internal Python FastAPI ASGI daemon communicating over local loopback with token authentication (X-API-Token). This completely decouples disk-heavy filesystem I/O, scraping, and database indexing from the React UI thread, ensuring fluid 60fps responsiveness.",
        },
        organizer: {
          title: "Intelligent Renaming & Organization Pipeline",
          description:
            "Automated media ingestion powered by GuessIt regex intelligence and custom syntax templates ({studio} - {date} - {performers} - {title}). Features industry presets (Plex, Jellyfin), extras detection (.srt, .nfo), collision handling policies, and transactional ActionBatches with audit logs for safe rollbacks.",
        },
        privacy: {
          title: "Dual-Mode Privacy & Image Processing",
          description:
            "Enables seamless toggling between mainstream (SFW) and specialized adult (NSFW) media sessions directly from the window titlebar. Employs a server-side Pillow image proxy with dynamic Gaussian blurring, 18+ content filters, and automatic navigation protection that guards against accidental exposure.",
        },
        player: {
          title: "Synchronized MPV IPC Playback Engine",
          description:
            "Low-level inter-process communication using raw JSON-RPC sockets over Node net.Socket to control an embedded MPV player. Enables precision sub-second frame seeking, hardware-accelerated video decoding, instant lossless snapshot capture, and continuous watch progress synchronization back to SQLite.",
        },
      },
    },
    telemetry: {
      title: "Technical Telemetry & System Specifications",
      subtitle: "Detailed engineering parameters and implementation stack.",
      specs: [
        {
          key: "Architecture Pattern",
          value: "Modular Monolith - Local Python FastAPI daemon paired with Electron & React",
        },
        {
          key: "Frontend Stack & Virtualization",
          value: "React 19, Electron 42, Vite 8, TanStack Query v5, TanStack Virtual (virtualized library grid), Zustand 5 (persistent stores)",
        },
        {
          key: "Database & Persistence",
          value: "Embedded SQLite in Write-Ahead Logging (WAL) mode, SQLAlchemy ORM, automatic Alembic startup migrations, custom composite indexes",
        },
        {
          key: "Metadata Scraper Pipeline",
          value: "Multi-provider integration (TMDb, OMDb, StashDB GraphQL, ThePornDB, FansDB) + GuessIt intelligent filename parser",
        },
        {
          key: "IPC & Inter-Process Protocols",
          value: "Electron typed contextBridge (window.electronAPI) + Raw JSON-RPC over Named Pipes / Unix Domain Sockets (MPV)",
        },
        {
          key: "Task & Concurrency Model",
          value: "Asyncio event loop + Multi-worker TaskManager with worker cancellation + ThreadPoolExecutor for CPU-bound hashing",
        },
        {
          key: "Filesystem Event Monitoring",
          value: "Watchdog real-time folder change monitoring + 4 configurable collision policies (Keep Both, Replace, Overwrite, Skip)",
        },
        {
          key: "Binary Distribution & Security",
          value: "Electron Builder + PyInstaller standalone portable bundling • 100% offline air-gapped execution, zero external analytics",
        },
      ],
    },
    cta: {
      title: "Ready to Build High-Performance Architecture?",
      description:
        "Whether you need low-latency desktop applications, high-throughput backend services, or modern web platforms, let's engineer something extraordinary together.",
      discussButton: "Discuss a Project",
      exploreButton: "Explore All Projects",
    },
  },
};

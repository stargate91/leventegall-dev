"use client";

import { useState } from "react";
import { Layers, ArrowRight } from "lucide-react";
import styles from "./ProjectCard.module.css";
import {
  SectionHeader,
  HudCard,
  TelemetryBadge,
  Button,
  Tabs,
  Stat,
  ProgressBar,
  TerminalBox,
  TagList,
  Callout,
  Inline,
  Stack,
  Grid,
} from "@/components/ui";

interface ProjectData {
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
  impactMetrics: { label: string; value: string }[];
  demoType: "swaya" | "iris" | "branding";
}

export default function ProjectCard() {
  const [activeTab, setActiveTab] = useState<Record<string, "overview" | "architecture" | "interactive">>({
    swaya: "interactive",
    iris: "interactive",
    aetheria: "interactive",
  });

  // Swaya Simulator State
  const [swayaTaskStatus, setSwayaTaskStatus] = useState<"IDLE" | "SCANNING" | "ENRICHING" | "COMPLETED">("ENRICHING");
  const [swayaProgress, setSwayaProgress] = useState(68);

  // Iris Simulator State
  const [irisEventLog, setIrisEventLog] = useState([
    { time: "10:04:12", user: "User_Alex", action: "VOICE_CHANNEL_ACTIVE", pts: "+25 XP" },
    { time: "10:04:18", user: "Member_Dave", action: "PROFILE_CARD_RENDER", pts: "SUCCESS" },
    { time: "10:04:25", user: "Elena_V", action: "WEEKLY_RANK_AWARDED", pts: "TIER 01" },
  ]);

  // Aetheria Tagline State
  const [selectedTaglineIndex, setSelectedTaglineIndex] = useState(0);
  const taglines = [
    { text: "Engineered for clarity. Built for daily resilience.", focus: "Modern / Minimal" },
    { text: "Where precision hardware meets intuitive software.", focus: "Technical / Direct" },
    { text: "Quiet performance. Uncompromising quality.", focus: "Premium / Understated" },
  ];

  const projects: ProjectData[] = [
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
      stack: ["FastAPI", "Python", "React (Vite)", "Electron", "SQLAlchemy 2.0", "SQLite", "Alembic", "TanStack Query", "Zustand"],
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
      stack: ["Python", "Asyncio", "discord.py", "SQLite", "Pillow Image Processing", "HU/EN Localization"],
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
      stack: ["Brand Naming", "Copywriting", "Next.js 16", "TypeScript", "Vanilla CSS", "Stripe Ready"],
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

  return (
    <div className="section-container">
      {/* Header */}
      <SectionHeader
        subtitle="Selected Projects"
        subtitleIcon={<Layers size={14} />}
        title="Featured Systems & Case Studies"
        description="A look into how I architect backend services, desktop tools, and full-stack web applications."
      />

      {/* Projects List */}
      <Stack gap="xl" className={styles.projectList}>
        {projects.map((project) => {
          const currTab = activeTab[project.id] || "interactive";

          return (
            <HudCard
              key={project.id}
              id={`project-${project.id}`}
              variant="surface"
              className={styles.projectCard}
            >
              {/* Top Meta Bar */}
              <div className={styles.topBar}>
                <TelemetryBadge variant="cyan">
                  {project.badge}
                </TelemetryBadge>

                {/* Sub-Tabs Primitive */}
                <Tabs
                  value={currTab}
                  onChange={(val) =>
                    setActiveTab((prev) => ({
                      ...prev,
                      [project.id]: val as "overview" | "architecture" | "interactive",
                    }))
                  }
                  items={[
                    { id: "interactive", label: "⚡ Live Demo" },
                    { id: "overview", label: "Overview" },
                    { id: "architecture", label: "Architecture" },
                  ]}
                />
              </div>

              {/* Main Two-Column Layout */}
              <div className={styles.mainGrid}>
                {/* Left Column */}
                <Stack gap="md">
                  <div>
                    <div className="font-telemetry">
                      STACK // {project.codename}
                    </div>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <div className={styles.projectTagline}>{project.tagline}</div>
                  </div>

                  {currTab === "overview" && (
                    <Stack gap="md">
                      <p className={styles.projectDesc}>{project.description}</p>
                      <Grid cols={2} gap="md" className={styles.metaGrid}>
                        <Stat variant="card" label="ROLE" value={project.role} />
                        <Stat variant="card" label="TIMELINE" value={project.duration} />
                      </Grid>
                    </Stack>
                  )}

                  {currTab === "architecture" && (
                    <Stack gap="md">
                      <Callout title="// THE CHALLENGE" variant="dark">
                        {project.challenge}
                      </Callout>

                      <Callout title="// THE SOLUTION" variant="cyan">
                        {project.solution}
                      </Callout>
                    </Stack>
                  )}

                  {currTab === "interactive" && (
                    <p className={styles.projectDesc}>{project.description}</p>
                  )}

                  {/* Technology TagList Primitive */}
                  <TagList items={project.stack} variant="subtle" size="sm" className={styles.stackList} />

                  {/* Impact Metrics Grid */}
                  <Grid cols={3} gap="sm" className={styles.metricsGrid}>
                    {project.impactMetrics.map((metric) => (
                      <Stat
                        key={metric.label}
                        variant="card"
                        value={metric.value}
                        label={metric.label}
                      />
                    ))}
                  </Grid>

                  {/* Links */}
                  <Inline gap="md">
                    <Button
                      variant="primary"
                      size="sm"
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      iconRight={<ArrowRight size={14} />}
                    >
                      View Code on GitHub
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      href="#contact"
                    >
                      Discuss Similar Work
                    </Button>
                  </Inline>
                </Stack>

                {/* Right Column: Interactive Simulators */}
                <div>
                  {project.demoType === "swaya" && (
                    <TerminalBox
                      title="FASTAPI TASK QUEUE"
                      status={swayaTaskStatus}
                      statusColor="cyan"
                      actions={
                        <Inline gap="sm">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => {
                              setSwayaProgress(25);
                              setSwayaTaskStatus("ENRICHING");
                            }}
                          >
                            Reset
                          </Button>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => {
                              setSwayaProgress(Math.min(100, swayaProgress + 15));
                              if (swayaProgress + 15 >= 100) {setSwayaTaskStatus("COMPLETED");}
                            }}
                          >
                            + Step Queue
                          </Button>
                        </Inline>
                      }
                    >
                      <Stack gap="md">
                        <ProgressBar
                          label="TMDB Metadata Enrichment:"
                          tag={`[ ${swayaProgress}% ]`}
                          value={swayaProgress}
                          variant="cyan"
                        />
                        <div className={styles.logDetail}>
                          <div>• TMDB API Sync: Interstellar (2014) [200 OK]</div>
                          <div>• SQLAlchemy Session: 42 records committed</div>
                          <div>• Alembic Schema: Migration v4.2 in sync</div>
                        </div>
                      </Stack>
                    </TerminalBox>
                  )}

                  {project.demoType === "iris" && (
                    <TerminalBox
                      title="DISCORD ACTIVITY STREAM"
                      status="ACTIVE"
                      statusColor="green"
                      actions={
                        <Button
                          variant="primary"
                          size="sm"
                          fullWidth
                          onClick={() => {
                            const actions = ["VOICE_ACTIVE", "SPOTIFY_STREAM", "PILLOW_RENDER", "WEEKLY_RANK"];
                            const randomAction = actions[Math.floor(Math.random() * actions.length)];
                            const names = ["Alex", "Sarah", "David", "Mira", "Tom"];
                            const randomName = names[Math.floor(Math.random() * names.length)];
                            const newLog = {
                              time: new Date().toTimeString().slice(0, 8),
                              user: `User_${randomName}`,
                              action: randomAction,
                              pts: "+15 XP",
                            };
                            setIrisEventLog((prev) => [newLog, prev[0], prev[1]]);
                          }}
                        >
                          ⚡ Emulate Discord Event
                        </Button>
                      }
                    >
                      <Stack gap="xs">
                        {irisEventLog.map((ev, i) => (
                          <div key={i} className={styles.irisRow}>
                            <span className={styles.irisTime}>{ev.time}</span>
                            <span className={styles.irisUser}>{ev.user}</span>
                            <span className={styles.irisAction}>{ev.action}</span>
                            <span className={styles.irisPts}>{ev.pts}</span>
                          </div>
                        ))}
                      </Stack>
                    </TerminalBox>
                  )}

                  {project.demoType === "branding" && (
                    <TerminalBox title="AETHERIA BRAND MATRIX" status="PHONETIC [OK]">
                      <Stack gap="md">
                        <div className={styles.aetheriaCard}>
                          <div className={styles.aetheriaTitle}>
                            AETHERIA
                          </div>
                          <div className={styles.aetheriaSub}>
                            Phonetic: [eɪˈθɪəri.ə] • Origins: Aether + -ia
                          </div>
                        </div>

                        <Stack gap="xs">
                          {taglines.map((t, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setSelectedTaglineIndex(i)}
                              className={`${styles.taglineBtn} ${selectedTaglineIndex === i ? styles.taglineBtnActive : ""}`}
                            >
                              <div className={styles.taglineText}>
                                &ldquo;{t.text}&rdquo;
                              </div>
                            </button>
                          ))}
                        </Stack>
                      </Stack>
                    </TerminalBox>
                  )}
                </div>
              </div>
            </HudCard>
          );
        })}
      </Stack>
    </div>
  );
}

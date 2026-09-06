"use client";

import { useState } from "react";
import {
  ExternalLink,
  Terminal,
  Layers,
  Sparkles,
  Zap,
  Check,
  ChevronRight,
  Eye,
  Sliders,
  Maximize2
} from "lucide-react";

interface ProjectData {
  id: string;
  badge: string;
  title: string;
  codename: string;
  tagline: string;
  description: string;
  accentColor: string;
  borderColor: string;
  glowColor: string;
  role: string;
  duration: string;
  stack: string[];
  challenge: string;
  solution: string;
  impactMetrics: { label: string; value: string }[];
  demoType: "dashboard" | "branding";
}

export default function ProjectCard() {
  const [activeTab, setActiveTab] = useState<Record<string, "overview" | "architecture" | "interactive">>({
    novapulse: "overview",
    aetheria: "overview",
  });

  // Interactive demo states for project 1
  const [streamSpeed, setStreamSpeed] = useState(1);
  const [systemOnline, setSystemOnline] = useState(true);

  // Interactive demo states for project 2
  const [selectedTaglineIndex, setSelectedTaglineIndex] = useState(0);

  const taglines = [
    { text: "Sculpted in vacuum. Engineered for eternity.", focus: "Luxury / Scientific" },
    { text: "Beyond the threshold of biological noise.", focus: "Modern / Minimal" },
    { text: "Clarity at the speed of starlight.", focus: "Dynamic / Direct" },
  ];

  const projects: ProjectData[] = [
    {
      id: "novapulse",
      badge: "MISSION ARTIFACT 01 // FULL-STACK DEV",
      title: "NovaPulse Observability Engine",
      codename: "DEEP-SPACE DATA TELEMETRY",
      tagline: "High-density real-time visualization platform with sub-second latency.",
      description:
        "Engineered to solve the clutter of enterprise data feeds. NovaPulse delivers a high-contrast, military/aerospace-inspired telemetry dashboard capable of rendering live events with fluid micro-animations and zero dropped frames.",
      accentColor: "var(--cyan-tron)",
      borderColor: "var(--border-cyan)",
      glowColor: "var(--cyan-glow)",
      role: "Lead Architect & UI Engineer",
      duration: "4 Weeks Orbit",
      stack: ["Next.js App Router", "TypeScript", "HTML5 Canvas", "Tailored CSS", "REST Streams"],
      challenge:
        "Rendering thousands of metric data points without CPU lag or battery drain on mobile devices.",
      solution:
        "Implemented lightweight custom Canvas render routines combined with Next.js SSR and memoized state selectors.",
      impactMetrics: [
        { label: "Render Framerate", value: "60 FPS Constant" },
        { label: "Lighthouse Performance", value: "99 / 100" },
        { label: "Bundle Overhead", value: "< 42 KB Gzip" },
      ],
      demoType: "dashboard",
    },
    {
      id: "aetheria",
      badge: "MISSION ARTIFACT 02 // BRANDING + DEV",
      title: "Aetheria Kinetic Identity & Commerce",
      codename: "VERBAL IDENTITY & PLATFORM",
      tagline: "From phonetic brand naming and slogan architecture to a deployed Next.js flagship.",
      description:
        "The complete synthesis of my Fiverr branding expertise and full-stack development. Built for a premium biometric wellness device: conceived the name 'Aetheria', authored the brand manifesto, and developed the web platform with future-ready checkout architecture.",
      accentColor: "var(--cyan-tron)",
      borderColor: "var(--border-cyan)",
      glowColor: "var(--cyan-glow)",
      role: "Brand Strategist & Full-Stack Developer",
      duration: "3 Weeks Orbit",
      stack: ["Brand Naming", "Copywriting", "Next.js", "TypeScript", "Stripe Readiness"],
      challenge:
        "Finding an available international domain (.com/global) and building a brand story that commands premium pricing.",
      solution:
        "Exhaustive trademark clearance, linguistic phonetic scoring, and crafting an editorial landing page with high-conversion purchase funnels.",
      impactMetrics: [
        { label: "Brand Recall Score", value: "Top Decile" },
        { label: "Checkout Readiness", value: "100% Modular" },
        { label: "Client Satisfaction", value: "5.0 ★ Rating" },
      ],
      demoType: "branding",
    },
  ];

  return (
    <section id="projects" style={{ position: "relative" }}>
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-subtitle">
            <Layers size={14} />
            <span>Mission Artifacts // Case Studies</span>
          </div>
          <h2 className="section-title">Engineered Case Studies</h2>
          <p className="section-desc">
            Deep technical and brand architectures built with uncompromising standards. 
            Quality and end-to-end execution prioritized over superficial volume.
          </p>
        </div>

        {/* Projects List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
          {projects.map((p) => {
            const currentTab = activeTab[p.id] || "overview";

            return (
              <div
                key={p.id}
                id={`project-${p.id}`}
                className="glass-panel hud-card"
                style={{
                  padding: "clamp(1.5rem, 3vw, 2.5rem)",
                  background: "rgba(10, 14, 24, 0.8)",
                  borderColor: p.borderColor,
                  boxShadow: `0 20px 50px -15px rgba(0, 0, 0, 0.9), 0 0 25px ${p.glowColor}`,
                }}
              >
                {/* Top Meta Bar */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "1rem",
                    borderBottom: "1px solid var(--border-subtle)",
                    paddingBottom: "1.25rem",
                    marginBottom: "1.75rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span
                      className="telemetry-badge"
                      style={{
                        borderColor: p.borderColor,
                        color: p.accentColor,
                        background: "rgba(255, 255, 255, 0.03)",
                      }}
                    >
                      <span
                        className="beacon-dot"
                        style={{ backgroundColor: p.accentColor, boxShadow: `0 0 8px ${p.accentColor}` }}
                      />
                      {p.badge}
                    </span>
                    <span className="font-telemetry" style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      // {p.codename}
                    </span>
                  </div>

                  {/* Tab Selector */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      background: "rgba(255, 255, 255, 0.04)",
                      padding: "0.25rem",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border-subtle)",
                      gap: "0.25rem",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveTab({ ...activeTab, [p.id]: "overview" })}
                      style={{
                        background: currentTab === "overview" ? "rgba(255, 255, 255, 0.12)" : "transparent",
                        border: "none",
                        color: currentTab === "overview" ? "#ffffff" : "var(--text-secondary)",
                        padding: "0.35rem 0.75rem",
                        borderRadius: "var(--radius-sm)",
                        fontSize: "0.78rem",
                        fontFamily: "var(--font-jetbrains)",
                        cursor: "pointer",
                        transition: "all var(--transition-fast)",
                      }}
                    >
                      Overview
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab({ ...activeTab, [p.id]: "architecture" })}
                      style={{
                        background: currentTab === "architecture" ? "rgba(255, 255, 255, 0.12)" : "transparent",
                        border: "none",
                        color: currentTab === "architecture" ? "#ffffff" : "var(--text-secondary)",
                        padding: "0.35rem 0.75rem",
                        borderRadius: "var(--radius-sm)",
                        fontSize: "0.78rem",
                        fontFamily: "var(--font-jetbrains)",
                        cursor: "pointer",
                        transition: "all var(--transition-fast)",
                      }}
                    >
                      Architecture
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab({ ...activeTab, [p.id]: "interactive" })}
                      style={{
                        background: currentTab === "interactive" ? p.accentColor : "transparent",
                        border: "none",
                        color: currentTab === "interactive" ? "#05070b" : p.accentColor,
                        fontWeight: currentTab === "interactive" ? 700 : 500,
                        padding: "0.35rem 0.75rem",
                        borderRadius: "var(--radius-sm)",
                        fontSize: "0.78rem",
                        fontFamily: "var(--font-jetbrains)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.35rem",
                        transition: "all var(--transition-fast)",
                      }}
                    >
                      <Sparkles size={12} />
                      Live Simulation
                    </button>
                  </div>
                </div>

                {/* Content Grid */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                    gap: "2.5rem",
                    alignItems: "start",
                  }}
                >
                  {/* Left Column: Details */}
                  <div>
                    <h3
                      className="font-heading"
                      style={{
                        fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
                        fontWeight: 700,
                        color: "#ffffff",
                        lineHeight: 1.2,
                        marginBottom: "0.5rem",
                      }}
                    >
                      {p.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "1.05rem",
                        color: p.accentColor,
                        marginBottom: "1.25rem",
                        fontWeight: 500,
                      }}
                    >
                      {p.tagline}
                    </p>

                    {currentTab === "overview" && (
                      <div>
                        <p
                          style={{
                            color: "var(--text-secondary)",
                            fontSize: "0.95rem",
                            lineHeight: 1.7,
                            marginBottom: "1.5rem",
                          }}
                        >
                          {p.description}
                        </p>

                        {/* Tech Stack Pills */}
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.75rem" }}>
                          {p.stack.map((item) => (
                            <span
                              key={item}
                              className="font-telemetry"
                              style={{
                                fontSize: "0.75rem",
                                padding: "0.3rem 0.65rem",
                                borderRadius: "var(--radius-sm)",
                                background: "rgba(255, 255, 255, 0.05)",
                                border: "1px solid var(--border-subtle)",
                                color: "var(--text-primary)",
                              }}
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {currentTab === "architecture" && (
                      <div
                        style={{
                          background: "rgba(0, 0, 0, 0.4)",
                          padding: "1.25rem",
                          borderRadius: "var(--radius-md)",
                          border: "1px solid var(--border-subtle)",
                          marginBottom: "1.5rem",
                        }}
                      >
                        <div style={{ marginBottom: "1rem" }}>
                          <div
                            className="font-telemetry"
                            style={{ fontSize: "0.75rem", color: "var(--amber-core)", marginBottom: "0.25rem" }}
                          >
                            [ THE ENGINEERING CHALLENGE ]
                          </div>
                          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                            {p.challenge}
                          </p>
                        </div>
                        <div>
                          <div
                            className="font-telemetry"
                            style={{ fontSize: "0.75rem", color: "var(--cyan-tron)", marginBottom: "0.25rem" }}
                          >
                            [ THE APPLIED SOLUTION ]
                          </div>
                          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                            {p.solution}
                          </p>
                        </div>
                      </div>
                    )}

                    {currentTab === "interactive" && (
                      <div
                        style={{
                          background: "rgba(0, 0, 0, 0.4)",
                          padding: "1.25rem",
                          borderRadius: "var(--radius-md)",
                          border: `1px solid ${p.borderColor}`,
                          marginBottom: "1.5rem",
                        }}
                      >
                        <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                          Test the interactive parameters in the right console to observe live reactive state updates.
                        </p>
                      </div>
                    )}

                    {/* Metrics Strip */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "1rem",
                        borderTop: "1px solid var(--border-subtle)",
                        paddingTop: "1.25rem",
                      }}
                    >
                      {p.impactMetrics.map((m) => (
                        <div key={m.label}>
                          <div
                            className="font-telemetry"
                            style={{
                              fontSize: "1.1rem",
                              fontWeight: 700,
                              color: "#ffffff",
                              lineHeight: 1.1,
                            }}
                          >
                            {m.value}
                          </div>
                          <div
                            style={{
                              fontSize: "0.72rem",
                              color: "var(--text-muted)",
                              marginTop: "0.25rem",
                            }}
                          >
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Live Interactive Sci-Fi Simulator */}
                  <div
                    className="glass-panel hud-card"
                    style={{
                      background: "rgba(7, 10, 18, 0.95)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "var(--radius-md)",
                      overflow: "hidden",
                    }}
                  >
                    {/* Console Header */}
                    <div
                      style={{
                        padding: "0.75rem 1rem",
                        background: "rgba(255, 255, 255, 0.03)",
                        borderBottom: "1px solid var(--border-subtle)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ef4444" }} />
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#f59e0b" }} />
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981" }} />
                        <span
                          className="font-telemetry"
                          style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginLeft: "0.5rem" }}
                        >
                          telemetry://{p.id}.runtime
                        </span>
                      </div>
                      <span className="font-telemetry" style={{ fontSize: "0.68rem", color: p.accentColor }}>
                        SIMULATOR ACTIVE
                      </span>
                    </div>

                    {/* Console Interactive Body */}
                    <div style={{ padding: "1.5rem" }}>
                      {p.demoType === "dashboard" ? (
                        <div>
                          {/* Telemetry Stream Simulation */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              marginBottom: "1rem",
                            }}
                          >
                            <span className="font-telemetry" style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                              STREAM STATUS:
                            </span>
                            <button
                              type="button"
                              onClick={() => setSystemOnline(!systemOnline)}
                              className="telemetry-badge"
                              style={{
                                cursor: "pointer",
                                borderColor: systemOnline ? "var(--phosphor-green)" : "#ef4444",
                                color: systemOnline ? "var(--phosphor-green)" : "#ef4444",
                              }}
                            >
                              <span
                                className="beacon-dot"
                                style={{ backgroundColor: systemOnline ? "var(--phosphor-green)" : "#ef4444" }}
                              />
                              {systemOnline ? "TRANSMITTING" : "PAUSED"}
                            </button>
                          </div>

                          {/* Mock Data Waveform */}
                          <div
                            style={{
                              height: "120px",
                              background: "rgba(0, 0, 0, 0.6)",
                              borderRadius: "var(--radius-sm)",
                              border: "1px solid var(--border-subtle)",
                              position: "relative",
                              overflow: "hidden",
                              display: "flex",
                              alignItems: "flex-end",
                              padding: "0 0.5rem 0.5rem",
                              gap: "4px",
                            }}
                          >
                            {Array.from({ length: 24 }).map((_, idx) => {
                              const heightPercent = systemOnline
                                ? Math.round(20 + Math.sin((idx + streamSpeed * 2) * 0.8) * 35 + Math.cos(idx * 1.2) * 25)
                                : 8;
                              const clampedHeight = Math.max(8, Math.min(95, heightPercent));
                              return (
                                <div
                                  key={idx}
                                  style={{
                                    flex: 1,
                                    height: `${clampedHeight}%`,
                                    background:
                                      idx % 3 === 0
                                        ? "var(--cyan-tron)"
                                        : "linear-gradient(180deg, rgba(0, 229, 255, 0.8) 0%, rgba(59, 130, 246, 0.2) 100%)",
                                    borderRadius: "1px",
                                    transition: "height 0.3s ease",
                                  }}
                                />
                              );
                            })}
                          </div>

                          {/* Interactive Speed Controller */}
                          <div
                            style={{
                              marginTop: "1.25rem",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <span className="font-telemetry" style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                              Telemetry Frequency:
                            </span>
                            <div style={{ display: "flex", gap: "0.5rem" }}>
                              {[1, 2, 4].map((spd) => (
                                <button
                                  key={spd}
                                  type="button"
                                  onClick={() => setStreamSpeed(spd)}
                                  style={{
                                    background: streamSpeed === spd ? "var(--cyan-tron)" : "rgba(255, 255, 255, 0.05)",
                                    color: streamSpeed === spd ? "#05070b" : "var(--text-secondary)",
                                    border: "1px solid var(--border-subtle)",
                                    borderRadius: "var(--radius-sm)",
                                    padding: "0.2rem 0.6rem",
                                    fontSize: "0.72rem",
                                    fontFamily: "var(--font-jetbrains)",
                                    cursor: "pointer",
                                  }}
                                >
                                  {spd}x Hz
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          {/* Aetheria Branding Simulator */}
                          <div
                            style={{
                              padding: "1rem",
                              background: "rgba(0, 0, 0, 0.5)",
                              borderRadius: "var(--radius-sm)",
                              border: "1px solid rgba(0, 229, 255, 0.3)",
                              marginBottom: "1.25rem",
                            }}
                          >
                            <div
                              className="font-telemetry"
                              style={{ fontSize: "0.7rem", color: "var(--cyan-tron)", marginBottom: "0.35rem" }}
                            >
                              PHONETIC VETTING // [eɪˈθɪəri.ə]
                            </div>
                            <div
                              className="font-heading"
                              style={{ fontSize: "1.6rem", fontWeight: 700, color: "#ffffff", letterSpacing: "0.08em" }}
                            >
                              AETHERIA
                            </div>
                            <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "0.35rem" }}>
                              Etymology: Aether (Pure upper celestial air) + -ia (Domain/Entity).
                            </div>
                          </div>

                          {/* Interactive Tagline Switcher */}
                          <div style={{ marginBottom: "1rem" }}>
                            <div
                              className="font-telemetry"
                              style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}
                            >
                              SELECT VERBAL IDENTITY MATRIX:
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                              {taglines.map((t, i) => (
                                <button
                                  key={i}
                                  type="button"
                                  onClick={() => setSelectedTaglineIndex(i)}
                                  style={{
                                    textAlign: "left",
                                    padding: "0.6rem 0.85rem",
                                    borderRadius: "var(--radius-sm)",
                                    background:
                                      selectedTaglineIndex === i
                                        ? "rgba(0, 229, 255, 0.15)"
                                        : "rgba(255, 255, 255, 0.02)",
                                    border:
                                      selectedTaglineIndex === i
                                        ? "1px solid var(--cyan-tron)"
                                        : "1px solid var(--border-subtle)",
                                    cursor: "pointer",
                                    transition: "all var(--transition-fast)",
                                  }}
                                >
                                  <div
                                    style={{
                                      fontSize: "0.85rem",
                                      color: selectedTaglineIndex === i ? "#ffffff" : "var(--text-secondary)",
                                      fontStyle: "italic",
                                    }}
                                  >
                                    &ldquo;{t.text}&rdquo;
                                  </div>
                                  <div
                                    className="font-telemetry"
                                    style={{
                                      fontSize: "0.68rem",
                                      color: selectedTaglineIndex === i ? "var(--cyan-tron)" : "var(--text-dim)",
                                      marginTop: "0.25rem",
                                    }}
                                  >
                                    Target Angle: {t.focus}
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { Feather, Cpu, Compass, CheckCircle, Award, Terminal } from "lucide-react";

export default function AboutStory() {
  const logEntries = [
    {
      sol: "LOG 01 // FREQUENCY DISCOVERY",
      date: "FIVERR TRACK RECORD",
      title: "The Linguistics of Gravity: Naming & Verbal Identity",
      icon: Feather,
      desc: "Before writing full-stack code, I honed the craft of brand naming and high-converting slogan architecture on Fiverr. Delivering for global founders taught me that a product without a sharp verbal hook is invisible. Naming is pure cognitive compression: distilling an entire vision into phonetic resonance, trademark viabilities, and memorable emotional impact.",
      metrics: [
        "100% 5-Star Feedback",
        "Global US/EU Clients",
        "Phonetic & Trademark Vetting",
      ],
    },
    {
      sol: "LOG 02 // PROPULSION MATRIX",
      date: "ENGINEERING EXPANSION",
      title: "Code Architecture: Next.js, TypeScript & React",
      icon: Cpu,
      desc: "A brilliant name demands an equally sublime digital home. I expanded into modern full-stack web engineering, specializing in React 19, Next.js App Router, TypeScript, and high-performance styling. I treat web architecture like aerospace engineering: zero bloat, semantic precision, sub-second load times, and intuitive ergonomics.",
      metrics: [
        "Strict TypeScript Types",
        "SSR & API Orchestration",
        "Self-Hosted / Standalone Builds",
      ],
    },
    {
      sol: "LOG 03 // THE SINGULARITY",
      date: "T-SHAPED VECTOR",
      title: "The T-Shaped Advantage: Zero Disconnect",
      icon: Compass,
      desc: "Traditional product creation is broken: copywriters pass vague slogans to designers, who hand non-functional Figma files to developers, resulting in diluted compromises. With my integrated skill set, you get an end-to-end orbit: from the initial naming brainstorm and brand manifesto to clean, deployed production code.",
      metrics: [
        "One Unified Vision",
        "Faster Time-to-Orbit",
        "High-Conversion DNA",
      ],
    },
  ];

  return (
    <section id="trajectory" style={{ position: "relative" }}>
      <div className="section-container">
        {/* Header */}
        <div className="section-header">
          <div className="section-subtitle">
            <Terminal size={14} />
            <span>Telemetry Archive // Trajectory Analysis</span>
          </div>
          <h2 className="section-title">
            From Verbal Linguistics to Code Architecture
          </h2>
          <p className="section-desc">
            How deep-seated client psychology from Fiverr branding evolved into
            an uncompromised full-stack engineering capability.
          </p>
        </div>

        {/* Timeline Log Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
            position: "relative",
          }}
        >
          {logEntries.map((log) => {
            const Icon = log.icon;
            return (
              <div
                key={log.sol}
                className="glass-panel hud-card"
                style={{
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderColor: "rgba(0, 229, 255, 0.25)",
                }}
              >
                <div>
                  {/* Sol Meta Badge */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "1.25rem",
                    }}
                  >
                    <span
                      className="font-telemetry"
                      style={{
                        fontSize: "0.72rem",
                        color: "var(--cyan-tron)",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {log.sol}
                    </span>
                    <span
                      className="telemetry-badge"
                      style={{
                        fontSize: "0.65rem",
                        padding: "0.2rem 0.6rem",
                      }}
                    >
                      {log.date}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.85rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <div
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "var(--radius-sm)",
                        background: "rgba(0, 229, 255, 0.1)",
                        border: "1px solid var(--border-cyan)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--cyan-tron)",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={20} />
                    </div>
                    <h3
                      className="font-heading"
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: 600,
                        color: "#ffffff",
                        lineHeight: 1.25,
                      }}
                    >
                      {log.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: "0.92rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.65,
                      marginBottom: "1.5rem",
                    }}
                  >
                    {log.desc}
                  </p>
                </div>

                {/* Key Metrics / Highlights */}
                <div
                  style={{
                    borderTop: "1px solid var(--border-subtle)",
                    paddingTop: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  {log.metrics.map((metric) => (
                    <div
                      key={metric}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontSize: "0.8rem",
                        color: "var(--text-primary)",
                      }}
                    >
                      <CheckCircle size={14} style={{ color: "var(--cyan-tron)" }} />
                      <span className="font-telemetry">{metric}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* The Fiverr Badge of Honor */}
        <div
          className="glass-panel"
          style={{
            marginTop: "2.5rem",
            padding: "1.5rem 2rem",
            background: "rgba(0, 229, 255, 0.04)",
            border: "1px solid rgba(0, 229, 255, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.25rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "rgba(0, 229, 255, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--cyan-tron)",
                border: "1px solid var(--cyan-tron)",
                boxShadow: "0 0 10px rgba(0, 229, 255, 0.2)",
              }}
            >
              <Award size={22} />
            </div>
            <div>
              <div
                className="font-heading"
                style={{ fontWeight: 600, color: "#ffffff", fontSize: "1.05rem" }}
              >
                Proven Client Reliability on Fiverr
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                Delivering high-stakes naming and marketing slogans with a 100% on-time delivery record.
              </div>
            </div>
          </div>
          <div
            className="telemetry-badge"
            style={{ fontSize: "0.75rem", padding: "0.4rem 0.9rem" }}
          >
            <span className="beacon-dot" />
            <span>FIVERR VERIFIED SELLER</span>
          </div>
        </div>
      </div>
    </section>
  );
}

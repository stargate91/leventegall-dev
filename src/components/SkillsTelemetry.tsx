"use client";

import { Terminal, Cpu, PenTool, Globe, Star, ShieldCheck, Zap } from "lucide-react";

export default function SkillsTelemetry() {
  const engineeringSkills = [
    { name: "Next.js (App Router / SSR)", level: 95, status: "CORE RUNTIME" },
    { name: "TypeScript (Strict Types)", level: 92, status: "HIGH FIDELITY" },
    { name: "React 19 & Concurrent Architecture", level: 94, status: "OPTIMIZED" },
    { name: "Vanilla CSS & Modern Token Systems", level: 96, status: "ZERO BLOAT" },
    { name: "API Architecture & Webhooks (Stripe)", level: 88, status: "SECURE" },
    { name: "Self-Hosting & Docker Containers", level: 85, status: "DEPLOYED" },
  ];

  const brandingSkills = [
    { name: "Brand Naming & Phonetics", level: 98, status: "FIVERR VERIFIED" },
    { name: "High-Conversion Slogans & Taglines", level: 96, status: "BATTLE-TESTED" },
    { name: "Domain & Trademark Clearance Strategy", level: 90, status: "VETTED" },
    { name: "Verbal Identity & Brand Architecture", level: 92, status: "STRATEGIC" },
    { name: "Client Psychology & Empathy", level: 95, status: "PROVEN" },
    { name: "Conversion Copywriting & Landing Flow", level: 91, status: "MEASURED" },
  ];

  const fiverrFeedback = [
    {
      quote:
        "The names delivered weren't just creative—they felt instantly legitimate and established. Found the perfect domain and our team was stunned.",
      client: "Fintech Startup Founder (US)",
      stars: 5,
    },
    {
      quote:
        "Remarkable communication and speed. The slogan nailed our brand essence in literally five words. Worth every penny.",
      client: "SaaS Platform Director (UK)",
      stars: 5,
    },
  ];

  return (
    <section id="skills" style={{ position: "relative" }}>
      <div className="section-container">
        {/* Header */}
        <div className="section-header">
          <div className="section-subtitle">
            <Terminal size={14} />
            <span>Diagnostics // Capability Matrix</span>
          </div>
          <h2 className="section-title">Telemetry & Competence Vectors</h2>
          <p className="section-desc">
            An exact, uninflated calibration of technical engineering capabilities
            paired with proven verbal branding discipline.
          </p>
        </div>

        {/* Dual Matrix Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2.5rem",
            marginBottom: "3rem",
          }}
        >
          {/* Engineering Vector */}
          <div
            className="glass-panel hud-card"
            style={{
              padding: "2rem",
              background: "rgba(10, 14, 24, 0.75)",
              border: "1px solid rgba(0, 229, 255, 0.25)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.85rem",
                marginBottom: "1.75rem",
                borderBottom: "1px solid var(--border-subtle)",
                paddingBottom: "1rem",
              }}
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "var(--radius-sm)",
                  background: "rgba(0, 229, 255, 0.12)",
                  border: "1px solid var(--cyan-tron)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--cyan-tron)",
                }}
              >
                <Cpu size={20} />
              </div>
              <div>
                <h3 className="font-heading" style={{ fontSize: "1.2rem", fontWeight: 700, color: "#ffffff" }}>
                  Engineering Propulsion
                </h3>
                <div className="font-telemetry" style={{ fontSize: "0.7rem", color: "var(--cyan-tron)" }}>
                  SUBSYSTEM: FRONTEND & BACKEND ARCHITECTURE
                </div>
              </div>
            </div>

            {/* Skill Bars */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {engineeringSkills.map((s) => (
                <div key={s.name}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "0.4rem",
                    }}
                  >
                    <span style={{ fontSize: "0.88rem", color: "var(--text-primary)", fontWeight: 500 }}>
                      {s.name}
                    </span>
                    <span
                      className="font-telemetry"
                      style={{ fontSize: "0.7rem", color: "var(--cyan-tron)", letterSpacing: "0.05em" }}
                    >
                      {s.status}
                    </span>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "5px",
                      background: "rgba(255, 255, 255, 0.06)",
                      borderRadius: "var(--radius-full)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${s.level}%`,
                        height: "100%",
                        background: "linear-gradient(90deg, #0284c7 0%, #00e5ff 100%)",
                        boxShadow: "0 0 10px var(--cyan-glow)",
                        borderRadius: "var(--radius-full)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Branding Vector */}
          <div
            className="glass-panel hud-card"
            style={{
              padding: "2rem",
              background: "rgba(10, 14, 24, 0.75)",
              border: "1px solid rgba(0, 229, 255, 0.25)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.85rem",
                marginBottom: "1.75rem",
                borderBottom: "1px solid var(--border-subtle)",
                paddingBottom: "1rem",
              }}
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "var(--radius-sm)",
                  background: "rgba(0, 229, 255, 0.12)",
                  border: "1px solid var(--cyan-tron)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--cyan-tron)",
                }}
              >
                <PenTool size={20} />
              </div>
              <div>
                <h3 className="font-heading" style={{ fontSize: "1.2rem", fontWeight: 700, color: "#ffffff" }}>
                  Verbal Gravity & Brand Strategy
                </h3>
                <div className="font-telemetry" style={{ fontSize: "0.7rem", color: "var(--cyan-tron)" }}>
                  SUBSYSTEM: COGNITIVE IDENTITY & CONVERSION
                </div>
              </div>
            </div>

            {/* Skill Bars */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {brandingSkills.map((s) => (
                <div key={s.name}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "0.4rem",
                    }}
                  >
                    <span style={{ fontSize: "0.88rem", color: "var(--text-primary)", fontWeight: 500 }}>
                      {s.name}
                    </span>
                    <span
                      className="font-telemetry"
                      style={{ fontSize: "0.7rem", color: "var(--cyan-tron)", letterSpacing: "0.05em" }}
                    >
                      {s.status}
                    </span>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "5px",
                      background: "rgba(255, 255, 255, 0.06)",
                      borderRadius: "var(--radius-full)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${s.level}%`,
                        height: "100%",
                        background: "linear-gradient(90deg, #0284c7 0%, #00e5ff 100%)",
                        boxShadow: "0 0 10px var(--cyan-glow)",
                        borderRadius: "var(--radius-full)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fiverr Social Proof Quotes */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {fiverrFeedback.map((fb, idx) => (
            <div
              key={idx}
              className="glass-panel"
              style={{
                padding: "1.5rem",
                background: "rgba(10, 15, 25, 0.6)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <div style={{ display: "flex", gap: "0.25rem", marginBottom: "0.75rem" }}>
                {Array.from({ length: fb.stars }).map((_, s) => (
                  <Star key={s} size={14} fill="#00e5ff" color="#00e5ff" />
                ))}
              </div>
              <p
                style={{
                  fontSize: "0.88rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                  fontStyle: "italic",
                  marginBottom: "1rem",
                }}
              >
                &ldquo;{fb.quote}&rdquo;
              </p>
              <div
                className="font-telemetry"
                style={{
                  fontSize: "0.75rem",
                  color: "var(--text-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>{fb.client}</span>
                <span style={{ color: "var(--cyan-tron)" }}>VERIFIED CLIENT</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Code2, Orbit, ShieldCheck, Zap } from "lucide-react";

export default function Hero() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setCoords({
        x: Number(((e.clientX / innerWidth) * 2 - 1).toFixed(2)),
        y: Number(((e.clientY / innerHeight) * 2 - 1).toFixed(2)),
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "7.5rem",
        paddingBottom: "4rem",
        overflow: "hidden",
      }}
    >
      {/* Background Tron Luminescent Core Glow */}
      <div
        style={{
          position: "absolute",
          top: "35%",
          left: "50%",
          transform: `translate(-50%, -50%) translate(${coords.x * 20}px, ${coords.y * 20}px)`,
          width: "min(650px, 90vw)",
          height: "min(650px, 90vw)",
          background:
            "radial-gradient(circle, rgba(0, 229, 255, 0.15) 0%, rgba(2, 132, 199, 0.08) 45%, rgba(0, 229, 255, 0.03) 65%, transparent 75%)",
          borderRadius: "50%",
          filter: "blur(45px)",
          pointerEvents: "none",
          transition: "transform 0.2s ease-out",
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* Stargate / Tron Orbital Ring Accents */}
      <div
        className="portal-ring"
        style={{
          width: "min(780px, 95vw)",
          height: "min(780px, 95vw)",
          top: "calc(35% - min(390px, 47.5vw))",
          left: "calc(50% - min(390px, 47.5vw))",
          opacity: 0.6,
        }}
        aria-hidden="true"
      />
      <div
        className="portal-ring"
        style={{
          width: "min(520px, 75vw)",
          height: "min(520px, 75vw)",
          top: "calc(35% - min(260px, 37.5vw))",
          left: "calc(50% - min(260px, 37.5vw))",
          animationDirection: "reverse",
          animationDuration: "55s",
          borderColor: "rgba(0, 229, 255, 0.2)",
          opacity: 0.5,
        }}
        aria-hidden="true"
      />

      <div
        className="section-container"
        style={{
          textAlign: "center",
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Top HUD Telemetry Pill */}
        <div
          className="telemetry-badge hud-card"
          style={{
            marginBottom: "1.75rem",
            padding: "0.4rem 1rem",
            background: "rgba(10, 15, 26, 0.8)",
            boxShadow: "0 0 20px rgba(0, 229, 255, 0.2)",
          }}
        >
          <span className="beacon-dot" />
          <span>MISSION CONTROL // CLASSIFIED: T-SHAPED VECTOR</span>
          <span style={{ opacity: 0.3 }}>|</span>
          <span style={{ color: "var(--text-muted)" }}>
            ROT: [{coords.x}, {coords.y}]
          </span>
        </div>

        {/* Hero Title with Tron Typography */}
        <h1
          className="font-heading"
          style={{
            fontSize: "clamp(2.5rem, 6.5vw, 5.2rem)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            maxWidth: "960px",
            marginBottom: "1.5rem",
          }}
        >
          <span
            style={{
              display: "block",
              color: "#ffffff",
              textShadow: "0 0 30px rgba(255, 255, 255, 0.2)",
            }}
          >
            CODE ARCHITECTURE.
          </span>
          <span
            style={{
              display: "block",
              background:
                "linear-gradient(135deg, #ffffff 0%, #00e5ff 45%, #0284c7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 35px rgba(0, 229, 255, 0.4))",
            }}
          >
            GRAVITATIONAL BRANDING.
          </span>
        </h1>

        {/* Narrative / Subtitle */}
        <p
          style={{
            fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
            color: "var(--text-secondary)",
            maxWidth: "760px",
            margin: "0 auto 2.5rem",
            lineHeight: 1.7,
            fontWeight: 400,
          }}
        >
          I am a <strong style={{ color: "#ffffff" }}>Creative Developer</strong> and{" "}
          <strong style={{ color: "var(--cyan-tron)" }}>Brand Strategist</strong>. 
          I bridge the gap between rigorous full-stack software engineering and 
          the psychological gravity of high-converting verbal identity—honed through 
          verified 5-star brand naming and copywriting on Fiverr.
        </p>

        {/* Call to Actions */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            flexWrap: "wrap",
            marginBottom: "3.5rem",
          }}
        >
          <a
            href="#projects"
            id="hero-cta-projects"
            className="btn-cosmic-primary"
          >
            <span>Explore Mission Artifacts</span>
            <ArrowRight size={16} />
          </a>
          <a
            href="#services"
            id="hero-cta-packages"
            className="btn-cosmic-secondary"
          >
            <Orbit size={16} style={{ color: "var(--cyan-tron)" }} />
            <span>Mission Packages & Tiers</span>
          </a>
        </div>

        {/* Tron HUD Telemetry Strip */}
        <div
          className="glass-panel hud-card"
          style={{
            width: "100%",
            maxWidth: "980px",
            padding: "1.25rem 1.75rem",
            background: "rgba(10, 14, 24, 0.85)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.5rem",
            textAlign: "left",
            border: "1px solid rgba(0, 229, 255, 0.3)",
            boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.9), 0 0 20px rgba(0, 229, 255, 0.1)",
          }}
        >
          {/* Stat 1 */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem" }}>
            <div
              style={{
                padding: "0.5rem",
                borderRadius: "var(--radius-sm)",
                background: "rgba(0, 229, 255, 0.12)",
                border: "1px solid rgba(0, 229, 255, 0.35)",
                color: "var(--cyan-tron)",
              }}
            >
              <Zap size={20} />
            </div>
            <div>
              <div
                className="font-telemetry"
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "#ffffff",
                  lineHeight: 1.1,
                }}
              >
                5.0 / 5.0 ★
              </div>
              <div
                style={{
                  fontSize: "0.78rem",
                  color: "var(--text-secondary)",
                  marginTop: "0.2rem",
                }}
              >
                Fiverr Verified Track Record
              </div>
            </div>
          </div>

          {/* Stat 2 */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem" }}>
            <div
              style={{
                padding: "0.5rem",
                borderRadius: "var(--radius-sm)",
                background: "rgba(0, 229, 255, 0.12)",
                border: "1px solid rgba(0, 229, 255, 0.35)",
                color: "var(--cyan-tron)",
              }}
            >
              <Code2 size={20} />
            </div>
            <div>
              <div
                className="font-telemetry"
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "#ffffff",
                  lineHeight: 1.1,
                }}
              >
                React 19 & Next.js
              </div>
              <div
                style={{
                  fontSize: "0.78rem",
                  color: "var(--text-secondary)",
                  marginTop: "0.2rem",
                }}
              >
                TypeScript & Modern Systems
              </div>
            </div>
          </div>

          {/* Stat 3 */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem" }}>
            <div
              style={{
                padding: "0.5rem",
                borderRadius: "var(--radius-sm)",
                background: "rgba(0, 229, 255, 0.12)",
                border: "1px solid rgba(0, 229, 255, 0.35)",
                color: "var(--cyan-tron)",
              }}
            >
              <ShieldCheck size={20} />
            </div>
            <div>
              <div
                className="font-telemetry"
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "#ffffff",
                  lineHeight: 1.1,
                }}
              >
                Zero Separation
              </div>
              <div
                style={{
                  fontSize: "0.78rem",
                  color: "var(--text-secondary)",
                  marginTop: "0.2rem",
                }}
              >
                Name, Story & Code Synchronized
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

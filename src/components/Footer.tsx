"use client";

import { ArrowUp, Compass, ExternalLink } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      style={{
        borderTop: "none",
        background: "transparent",
        position: "relative",
        zIndex: 10,
        padding: "2.5rem 1.5rem 3rem",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Top Row: Brand & Scroll to Top */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
            marginBottom: "2.5rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "var(--radius-sm)",
                background: "rgba(0, 229, 255, 0.15)",
                border: "1px solid rgba(0, 229, 255, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--cyan-tron)",
              }}
            >
              <Compass size={16} />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-space)",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "#ffffff",
                }}
              >
                COSMIC<span style={{ color: "var(--cyan-tron)" }}>//</span>DEV
              </div>
              <div
                className="font-telemetry"
                style={{
                  fontSize: "0.68rem",
                  color: "var(--text-muted)",
                }}
              >
                CREATIVE DEVELOPER & BRAND STRATEGIST
              </div>
            </div>
          </div>

          <button
            type="button"
            id="btn-return-to-orbit"
            onClick={scrollToTop}
            className="btn-cosmic-secondary"
            style={{
              padding: "0.45rem 0.9rem",
              fontSize: "0.78rem",
              fontFamily: "var(--font-jetbrains)",
            }}
          >
            <ArrowUp size={14} />
            <span>RETURN TO ORBIT</span>
          </button>
        </div>

        {/* Middle Row: Quote & Links */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
            borderTop: "1px solid rgba(255, 255, 255, 0.05)",
            paddingTop: "2rem",
            marginBottom: "2rem",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "0.88rem",
                color: "var(--text-secondary)",
                lineHeight: 1.6,
                fontStyle: "italic",
                maxWidth: "420px",
              }}
            >
              &ldquo;For small creatures such as we the vastness is bearable only through love—and impeccable architecture.&rdquo;
            </p>
            <div
              className="font-telemetry"
              style={{
                fontSize: "0.7rem",
                color: "var(--cyan-tron)",
                marginTop: "0.5rem",
              }}
            >
              // IN HOMAGE TO COSMOS & INTERSTELLAR
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
              fontSize: "0.85rem",
            }}
          >
            <div
              className="font-telemetry"
              style={{
                fontSize: "0.72rem",
                color: "var(--cyan-tron)",
                marginBottom: "0.25rem",
                letterSpacing: "0.08em",
              }}
            >
              EXTERNAL TRANSMISSION ARRAYS
            </div>
            <a
              href="https://fiverr.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--text-secondary)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                transition: "color var(--transition-fast)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cyan-tron)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              <span>Fiverr Profile (5.0★ Verified Reviews)</span>
              <ExternalLink size={12} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--text-secondary)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                transition: "color var(--transition-fast)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cyan-tron)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              <span>GitHub Repositories & Open Artifacts</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Bottom Bar: Telemetry & Copyright */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            borderTop: "1px solid rgba(255, 255, 255, 0.04)",
            paddingTop: "1.5rem",
          }}
        >
          <div className="font-telemetry">
            SOL 1,420 • CRAFTED WITH NEXT.JS 16 & DEEP SPACE VANILLA CSS
          </div>
          <div className="font-telemetry">
            STATUS: STANDALONE SELF-HOSTED READY // ALL SYSTEMS NOMINAL
          </div>
        </div>
      </div>
    </footer>
  );
}

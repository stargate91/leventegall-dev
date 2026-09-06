"use client";

import { useState, useEffect } from "react";
import { Terminal, Shield, Menu, X, Compass, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toUTCString().slice(17, 25) + " UTC"
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(timer);
    };
  }, []);

  const navLinks = [
    { label: "Trajectory", href: "#trajectory", index: "01" },
    { label: "Artifacts", href: "#projects", index: "02" },
    { label: "Telemetry", href: "#skills", index: "03" },
    { label: "Payloads", href: "#services", index: "04" },
    { label: "Uplink", href: "#contact", index: "05" },
  ];

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: scrolled ? "0.75rem 1.5rem" : "1.25rem 1.5rem",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div
        className="glass-panel"
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0.6rem 1.25rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderColor: scrolled ? "rgba(0, 229, 255, 0.25)" : "var(--border-subtle)",
          boxShadow: scrolled ? "0 10px 35px rgba(0, 0, 0, 0.7), 0 0 15px rgba(0, 229, 255, 0.08)" : "none",
        }}
      >
        {/* Brand / Logo */}
        <a
          href="#"
          id="nav-logo"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            textDecoration: "none",
            color: "#ffffff",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "var(--radius-sm)",
              background: "linear-gradient(135deg, rgba(0, 229, 255, 0.2) 0%, rgba(245, 158, 11, 0.2) 100%)",
              border: "1px solid rgba(0, 229, 255, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 12px var(--cyan-glow)",
            }}
          >
            <Compass size={18} style={{ color: "var(--cyan-tron)" }} />
          </div>
          <div>
            <div
              style={{
                fontFamily: "var(--font-space)",
                fontWeight: 700,
                fontSize: "1rem",
                letterSpacing: "0.02em",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              <span>COSMIC</span>
              <span style={{ color: "var(--cyan-tron)" }}>//</span>
              <span style={{ color: "var(--text-secondary)", fontWeight: 400 }}>DEV</span>
            </div>
            <div
              className="font-telemetry"
              style={{
                fontSize: "0.65rem",
                color: "var(--text-muted)",
                lineHeight: 1,
              }}
            >
              LOC: 47.49°N, 19.04°E
            </div>
          </div>
        </a>

        {/* Telemetry Status Strip (Desktop) */}
        <div
          className="telemetry-badge telemetry-badge-green"
          style={{
            display: "none",
            fontSize: "0.7rem",
          }}
          id="nav-telemetry-status"
        >
          <span className="beacon-dot beacon-dot-green" />
          <span>STATUS: NOMINAL</span>
          <span style={{ opacity: 0.3 }}>|</span>
          <span suppressHydrationWarning>{currentTime || "SYNCING..."}</span>
        </div>

        {/* Navigation Links (Desktop) */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.75rem",
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              id={`nav-link-${link.label.toLowerCase()}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                textDecoration: "none",
                color: "var(--text-secondary)",
                fontSize: "0.85rem",
                fontFamily: "var(--font-jetbrains)",
                transition: "color var(--transition-fast)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--cyan-tron)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-secondary)";
              }}
            >
              <span style={{ color: "var(--text-dim)", fontSize: "0.7rem" }}>
                {link.index}
              </span>
              <span>{link.label}</span>
            </a>
          ))}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <a
            href="#contact"
            id="nav-cta-btn"
            className="btn-cosmic-primary"
            style={{
              padding: "0.5rem 1.15rem",
              fontSize: "0.82rem",
            }}
          >
            <span>Transmit Signal</span>
            <ArrowUpRight size={14} />
          </a>

          <button
            type="button"
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: "transparent",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-sm)",
              padding: "0.45rem",
              color: "var(--text-primary)",
              cursor: "pointer",
              display: "none",
            }}
            className="mobile-toggle-btn"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="glass-panel"
          style={{
            maxWidth: "1280px",
            margin: "0.5rem auto 0",
            padding: "1.25rem",
            borderColor: "rgba(0, 229, 255, 0.3)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.6rem 0.5rem",
                  textDecoration: "none",
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-space)",
                  borderBottom: "1px solid var(--border-subtle)",
                }}
              >
                <span>{link.label}</span>
                <span className="font-telemetry" style={{ color: "var(--cyan-tron)", fontSize: "0.75rem" }}>
                  {link.index}
                </span>
              </a>
            ))}
            <div
              className="font-telemetry"
              style={{
                fontSize: "0.75rem",
                color: "var(--phosphor-green)",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginTop: "0.5rem",
              }}
            >
              <span className="beacon-dot beacon-dot-green" />
              SYSTEMS OPERATIONAL // {currentTime}
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @media (min-width: 900px) {
          #nav-telemetry-status {
            display: inline-flex !important;
          }
        }
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle-btn {
            display: inline-flex !important;
          }
        }
      `}</style>
    </header>
  );
}

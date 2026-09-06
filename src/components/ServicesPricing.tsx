"use client";

import { useState } from "react";
import { Check, ArrowRight, ShieldCheck, Zap, Sparkles, Orbit, Terminal } from "lucide-react";

export interface PackageTier {
  id: string;
  name: string;
  badge: string;
  codename: string;
  priceEstimate: string;
  duration: string;
  isPopular?: boolean;
  description: string;
  features: string[];
  accentColor: string;
  borderColor: string;
}

export default function ServicesPricing() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const tiers: PackageTier[] = [
    {
      id: "naming",
      name: "Orbital Identity",
      badge: "VERBAL ARCHITECTURE",
      codename: "TIER 01 // NAMING & SLOGANS",
      priceEstimate: "From $490",
      duration: "5-7 Days Orbit",
      description:
        "Ideal for new ventures or rebrands. Leverage my proven Fiverr naming methodology to birth a legally viable, phonetically memorable brand name and slogan.",
      features: [
        "10+ Original Vetted Name Concepts",
        "Phonetic & Pronunciation Analysis",
        "International Domain (.com) Clearance",
        "Preliminary Trademark Screening",
        "3 Punchy Slogans & Taglines",
        "Brand Narrative & Positioning Manifesto",
        "Fiverr-Tested Revisions Included",
      ],
      accentColor: "var(--cyan-tron)",
      borderColor: "var(--border-cyan)",
    },
    {
      id: "full-orbit",
      name: "Full-Orbit Launch",
      badge: "MOST POPULAR // END-TO-END",
      codename: "TIER 02 // COMPLETE SYNTHESIS",
      priceEstimate: "From $1,850",
      duration: "2-3 Weeks Orbit",
      isPopular: true,
      description:
        "The complete T-shaped synthesis. Zero disconnect between your brand name, voice, and web application. One mind orchestrating your entire launch.",
      features: [
        "Everything in Orbital Identity (Naming + Slogans)",
        "Bespoke Next.js & TypeScript Web Platform",
        "Custom Sci-Fi / High-Contrast CSS Design System",
        "Stripe / Payment Gateway Architecture",
        "Sub-second Lighthouse Performance (95+)",
        "Self-Hosting Ready (Docker & Standalone Builds)",
        "1-on-1 Direct Technical & Brand Consultation",
      ],
      accentColor: "var(--cyan-tron)",
      borderColor: "var(--border-cyan)",
    },
    {
      id: "web-dev",
      name: "Deep-Space Engine",
      badge: "WEB ENGINEERING",
      codename: "TIER 03 // FULL-STACK APPS",
      priceEstimate: "From $1,450",
      duration: "10-14 Days Orbit",
      description:
        "For teams with an existing brand identity that need an elite, blazing fast, scalable web experience built with modern Next.js and TypeScript.",
      features: [
        "Next.js App Router & TypeScript Architecture",
        "Vanilla CSS Design Tokens (Zero Framework Bloat)",
        "High-Converting Responsive UI/UX Layouts",
        "API Routes, Contact Submissions & Webhooks",
        "Full Standalone Server Deployment Scripts",
        "SEO Meta-Architecture & Dynamic Social Cards",
        "Code Ownership & Clean Documentation",
      ],
      accentColor: "var(--cyan-tron)",
      borderColor: "var(--border-cyan)",
    },
  ];

  const handleSelectPackage = (tierId: string) => {
    setSelectedTier(tierId);
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      const selectElem = document.getElementById("contact-tier-select") as HTMLSelectElement | null;
      if (selectElem) {
        selectElem.value = tierId;
      }
    }
  };

  return (
    <section id="services" style={{ position: "relative" }}>
      <div className="section-container">
        {/* Header */}
        <div className="section-header">
          <div className="section-subtitle">
            <Orbit size={14} />
            <span>Missions & Payloads // Services & Packages</span>
          </div>
          <h2 className="section-title">Standardized Mission Payloads</h2>
          <p className="section-desc">
            Transparent, high-velocity engagements. Whether you need an unforgettable
            brand name, a bespoke Next.js web application, or the full unified launch.
          </p>
        </div>

        {/* Packages Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
            alignItems: "stretch",
          }}
        >
          {tiers.map((tier) => (
            <div
              key={tier.id}
              id={`tier-${tier.id}`}
              className="glass-panel hud-card"
              style={{
                padding: "2.25rem 2rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                background: tier.isPopular ? "rgba(18, 28, 48, 0.9)" : "rgba(10, 14, 24, 0.75)",
                borderColor: tier.isPopular ? "var(--cyan-tron)" : "rgba(0, 229, 255, 0.25)",
                boxShadow: tier.isPopular ? "0 20px 45px -10px rgba(0, 229, 255, 0.3)" : "none",
                position: "relative",
              }}
            >
              {/* Popular Flag */}
              {tier.isPopular && (
                <div
                  style={{
                    position: "absolute",
                    top: "-12px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "var(--cyan-tron)",
                    color: "#05070b",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    fontFamily: "var(--font-jetbrains)",
                    padding: "0.25rem 0.85rem",
                    borderRadius: "var(--radius-full)",
                    boxShadow: "0 0 15px var(--cyan-glow)",
                    letterSpacing: "0.08em",
                    whiteSpace: "nowrap",
                  }}
                >
                  RECOMMENDED FLIGHT PLAN
                </div>
              )}

              <div>
                {/* Codename */}
                <div
                  className="font-telemetry"
                  style={{
                    fontSize: "0.72rem",
                    color: tier.accentColor,
                    marginBottom: "0.5rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  {tier.codename}
                </div>

                <h3
                  className="font-heading"
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    color: "#ffffff",
                    marginBottom: "0.5rem",
                  }}
                >
                  {tier.name}
                </h3>

                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                    marginBottom: "1.5rem",
                    minHeight: "58px",
                  }}
                >
                  {tier.description}
                </p>

                {/* Pricing & Duration Banner */}
                <div
                  style={{
                    padding: "1rem",
                    borderRadius: "var(--radius-sm)",
                    background: "rgba(0, 229, 255, 0.04)",
                    border: "1px solid rgba(0, 229, 255, 0.2)",
                    marginBottom: "1.75rem",
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <span
                      className="font-telemetry"
                      style={{ fontSize: "1.6rem", fontWeight: 700, color: "#ffffff" }}
                    >
                      {tier.priceEstimate}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginLeft: "0.3rem" }}>
                      / flat
                    </span>
                  </div>
                  <span
                    className="telemetry-badge"
                    style={{ fontSize: "0.7rem", padding: "0.2rem 0.6rem" }}
                  >
                    {tier.duration}
                  </span>
                </div>

                {/* Features List */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
                  {tier.features.map((feature) => (
                    <div
                      key={feature}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.6rem",
                        fontSize: "0.85rem",
                        color: "var(--text-primary)",
                      }}
                    >
                      <div
                        style={{
                          marginTop: "2px",
                          color: "var(--cyan-tron)",
                          flexShrink: 0,
                        }}
                      >
                        <Check size={16} />
                      </div>
                      <span style={{ lineHeight: 1.5 }}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                id={`btn-select-tier-${tier.id}`}
                onClick={() => handleSelectPackage(tier.id)}
                className={tier.isPopular ? "btn-cosmic-primary" : "btn-cosmic-secondary"}
                style={{
                  width: "100%",
                  cursor: "pointer",
                }}
              >
                <span>Initiate Flight Plan</span>
                <ArrowRight size={15} />
              </button>
            </div>
          ))}
        </div>

        {/* Self-Hosting & Future Payment Architecture Note */}
        <div
          className="glass-panel"
          style={{
            marginTop: "3rem",
            padding: "1.5rem 2rem",
            background: "rgba(10, 15, 25, 0.6)",
            border: "1px dashed rgba(0, 229, 255, 0.25)",
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
                borderRadius: "var(--radius-sm)",
                background: "rgba(0, 229, 255, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--cyan-tron)",
              }}
            >
              <Terminal size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 600, color: "#ffffff", fontSize: "0.95rem" }}>
                Architecture Status: Automated Checkout & Self-Hosted Ready
              </div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                Built on Next.js 16 App Router with pre-wired API routes (`/api/checkout`, `/api/contact`)
                and lightweight Docker standalone configuration for home/VPS server deployment.
              </div>
            </div>
          </div>
          <a
            href="#contact"
            className="telemetry-badge"
            style={{ textDecoration: "none", cursor: "pointer" }}
          >
            CUSTOM REQUEST? LET&apos;S TALK
          </a>
        </div>
      </div>
    </section>
  );
}

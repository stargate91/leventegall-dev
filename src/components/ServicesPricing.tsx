"use client";

import { ArrowRight, Orbit, Terminal } from "lucide-react";
import styles from "./ServicesPricing.module.css";
import {
  SectionHeader,
  HudCard,
  Button,
  TelemetryBadge,
  CheckList,
  Callout,
  Grid,
  Stack,
  Inline,
} from "@/components/ui";

interface PackageTier {
  id: string;
  name: string;
  badge: string;
  codename: string;
  priceEstimate: string;
  duration: string;
  isPopular?: boolean;
  description: string;
  features: string[];
}

export default function ServicesPricing() {
  const tiers: PackageTier[] = [
    {
      id: "naming",
      name: "Brand Naming & Identity",
      badge: "VERBAL BRANDING",
      codename: "TIER 01 // NAMING & POSITIONING",
      priceEstimate: "From $490",
      duration: "5-7 Days",
      description:
        "Ideal for startups, new products, or rebrands. Leverage my proven Fiverr methodology to develop a memorable, trademark-cleared brand name and positioning story.",
      features: [
        "10+ Original Vetted Name Concepts",
        "Pronunciation & Phonetic Analysis",
        "International .com Domain Clearance",
        "Preliminary Trademark Screening",
        "3 High-Impact Slogans & Taglines",
        "Brand Story & Positioning Brief",
        "Direct Revisions & Consultation",
      ],
    },
    {
      id: "full-orbit",
      name: "Complete Product Launch",
      badge: "MOST POPULAR // FULL STACK",
      codename: "TIER 02 // BRAND + NEXT.JS APP",
      priceEstimate: "From $1,850",
      duration: "2-3 Weeks",
      isPopular: true,
      description:
        "The end-to-end launch package. A unified process combining your brand identity, messaging, and a custom, high-performance web application.",
      features: [
        "Everything in Brand Naming & Identity",
        "Custom Next.js & TypeScript Web Application",
        "Fast, Responsive & Accessible UI Design",
        "Stripe / Payment Gateway Integration",
        "Top-Tier Performance (95+ Lighthouse)",
        "Self-Hosting Ready (Docker & Node Standalone)",
        "1-on-1 Direct Technical & Brand Guidance",
      ],
    },
    {
      id: "web-dev",
      name: "Full-Stack Development",
      badge: "SOFTWARE ENGINEERING",
      codename: "TIER 03 // WEB APPS & APIS",
      priceEstimate: "From $1,450",
      duration: "10-14 Days",
      description:
        "For teams with an existing brand who need clean, reliable software. From backend APIs and databases to interactive frontends built with FastAPI, Python, and React.",
      features: [
        "FastAPI / Python Backend & REST APIs",
        "React, Next.js & TypeScript Frontends",
        "Database Architecture (PostgreSQL / SQLite)",
        "Clean, Maintainable Code & Documentation",
        "Docker & Deployment Configuration",
        "SEO Meta Tags & Dynamic Open Graph Cards",
        "Full Source Code Ownership",
      ],
    },
  ];

  const handleSelectPackage = (tierId: string) => {
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
    <div className="section-container">
      {/* Header */}
      <SectionHeader
        subtitle="Services & Packages"
        subtitleIcon={<Orbit size={14} />}
        title="Transparent Services & Working Together"
        description="Whether you need a distinct brand name, a custom full-stack web application, or a complete product launch from scratch."
      />

      {/* Packages Grid */}
      <Grid cols={3} gap="lg" className={styles.tiersGrid}>
        {tiers.map((tier) => (
          <HudCard
            key={tier.id}
            id={`tier-${tier.id}`}
            variant={tier.isPopular ? "elevated" : "surface"}
            className={styles.tierCard}
          >
            {tier.isPopular && (
              <div className={styles.popularBadge}>RECOMMENDED PACKAGE</div>
            )}

            <Stack gap="md" justify="space-between" className={styles.cardInner}>
              <div>
                <div className={styles.tierCodename}>{tier.codename}</div>
                <h3 className={styles.tierName}>{tier.name}</h3>
                <p className={styles.tierDesc}>{tier.description}</p>

                {/* Pricing & Duration Banner */}
                <Inline justify="space-between" align="center" className={styles.pricingBanner}>
                  <div>
                    <span className={styles.priceValue}>{tier.priceEstimate}</span>
                    <span className={styles.pricePeriod}>/ flat</span>
                  </div>
                  <TelemetryBadge variant="cyan" className={styles.durationBadge}>
                    {tier.duration}
                  </TelemetryBadge>
                </Inline>

                {/* Features List Primitive */}
                <CheckList items={tier.features} size="sm" gap="sm" className={styles.featuresList} />
              </div>

              {/* Action Button */}
              <Button
                type="button"
                variant={tier.isPopular ? "primary" : "secondary"}
                size="md"
                fullWidth
                id={`btn-select-tier-${tier.id}`}
                onClick={() => handleSelectPackage(tier.id)}
                iconRight={<ArrowRight size={15} />}
              >
                Get Started with This Package
              </Button>
            </Stack>
          </HudCard>
        ))}
      </Grid>

      {/* Architecture Notice Primitive */}
      <Callout
        variant="notice"
        icon={<Terminal size={20} className={styles.terminalIcon} />}
        title="Need a Custom Project or Architecture?"
        action={
          <TelemetryBadge variant="cyan" className={styles.scopeBadge}>
            CUSTOM SCOPE? REACH OUT BELOW
          </TelemetryBadge>
        }
        className={styles.checkoutNotice}
      >
        Have unique requirements or need a tailored backend API, automation tool, or desktop application? Let&apos;s discuss your timeline and scope.
      </Callout>
    </div>
  );
}

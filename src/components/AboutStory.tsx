"use client";

import { Atom, Award, CheckCircle, Cpu, Feather, Terminal } from "lucide-react";
import styles from "./AboutStory.module.css";
import {
  SectionHeader,
  HudCard,
  TelemetryBadge,
  Grid,
  Stack,
  Inline,
  Text,
  Tooltip,
} from "@/components/ui";

export default function AboutStory() {
  const logEntries = [
    {
      sol: "CHAPTER 01",
      date: "ELTE PHYSICS BACKGROUND",
      title: "Analytical Thinking & Problem Solving",
      icon: Atom,
      desc: "Studying Physics and Astronomy at Eötvös Loránd University gave me a strong foundation in math, calculus, and first-principles thinking. When architecting software, I don't just glue third-party packages together—I think in terms of state transitions, edge cases, and building predictable, maintainable systems.",
      metrics: [
        "ELTE Physics & Astronomy Studies",
        "Calculus & Mathematical Logic",
        "Systematic Problem Solving",
      ],
    },
    {
      sol: "CHAPTER 02",
      date: "5 YEARS ON FIVERR",
      title: "Human Psychology & High-Converting Copy",
      icon: Feather,
      desc: "Over 5 years, I built a top-rated freelance branding practice on Fiverr, helping more than 1,100 international founders find the right name and message for their startups. It taught me how people actually think, choose, and buy. Clear naming and sharp copywriting aren't decoration—they're how you earn attention in a crowded market.",
      metrics: [
        "1,100+ Completed Projects",
        "400+ Verified 5-Star Reviews",
        "Brand Naming, Slogans & Copy",
      ],
    },
    {
      sol: "CHAPTER 03",
      date: "FULL-STACK DEVELOPMENT",
      title: "Clean Backend Architecture & Modern Frontends",
      icon: Cpu,
      desc: "Great branding falls flat without a reliable product, and clean code is wasted if the messaging is confusing. I build robust backends with FastAPI and Python, paired with modern, responsive React and TypeScript frontends. Having one person oversee both means zero handoff friction and a product that feels cohesive from the first headline to the final API call.",
      metrics: [
        "FastAPI, Python & Domain-Driven Design",
        "React, Next.js & TypeScript Frontends",
        "Unified Vision from Concept to Code",
      ],
    },
  ];

  return (
    <div className="section-container">
      {/* Header */}
      <SectionHeader
        subtitle="Background & Journey"
        subtitleIcon={<Terminal size={14} />}
        title="Where Physics, Branding & Code Meet"
        description="How an analytical mindset, 5 years of client-tested marketing on Fiverr, and full-stack software development come together."
      />

      {/* Timeline Log Grid */}
      <Grid cols={3} gap="md" className={styles.grid}>
        {logEntries.map((log) => {
          const Icon = log.icon;
          return (
            <HudCard
              key={log.sol}
              variant="surfaceDeck"
              className={styles.logCard}
            >
              <Stack gap="sm">
                {/* Meta Badge */}
                <Inline justify="space-between" className={styles.logMeta}>
                  <Text font="mono" size="2xs" tone="cyan" weight="semibold" className={styles.logSol}>
                    {log.sol}
                  </Text>
                  <TelemetryBadge variant="cyan" className={styles.metaBadge}>
                    {log.date}
                  </TelemetryBadge>
                </Inline>

                {/* Icon & Title */}
                <div className={styles.logHeader}>
                  <div className={styles.iconWrapper}>
                    <Icon size={20} />
                  </div>
                  <Text as="h3" font="heading" size="lg" weight="bold" tone="primary" className={styles.logTitle}>
                    {log.title}
                  </Text>
                </div>

                {/* Description */}
                <Text as="p" size="sm" tone="secondary" leading="relaxed" className={styles.logDesc}>
                  {log.desc}
                </Text>
              </Stack>

              {/* Key Metrics / Highlights */}
              <Stack gap="xs" className={styles.metricsList}>
                {log.metrics.map((metric) => (
                  <Inline key={metric} gap="xs" align="center" className={styles.metricItem}>
                    <CheckCircle size={14} className={styles.checkIcon} />
                    <Text as="span" font="mono" size="xs" tone="secondary">
                      {metric}
                    </Text>
                  </Inline>
                ))}
              </Stack>
            </HudCard>
          );
        })}
      </Grid>

      {/* The Fiverr Badge of Honor */}
      <div className={styles.fiverrBanner}>
        <Inline gap="md" align="center" className={styles.fiverrLeft}>
          <div className={styles.fiverrIcon}>
            <Award size={22} />
          </div>
          <div>
            <Text font="heading" size="base" weight="bold" tone="primary" className={styles.fiverrTitle}>
              Proven Track Record on Fiverr: 1,100+ Clients &amp; 400+ 5-Star Reviews
            </Text>
            <Text size="sm" tone="secondary" className={styles.fiverrDesc}>
              5 years of continuous international client delivery, brand naming, and conversion copy with a 100% on-time completion rate.
            </Text>
          </div>
        </Inline>

        <Tooltip
          content="// TOP 1% SELLER • 1,100+ MISSIONS • 100% ON-TIME DISPATCH"
          side="top"
          variant="cyan"
        >
          <TelemetryBadge
            variant="cyan"
            className={styles.fiverrBadge}
          >
            [ 5.0★ TOP-RATED SELLER ]
          </TelemetryBadge>
        </Tooltip>
      </div>
    </div>
  );
}

"use client";

import { Terminal, Cpu, PenTool } from "lucide-react";
import styles from "./SkillsTelemetry.module.css";
import {
  SectionHeader,
  HudCard,
  Grid,
  Stack,
  ProgressBar,
  Testimonial,
  Text,
} from "@/components/ui";

export default function SkillsTelemetry() {
  const engineeringSkills = [
    { name: "Python (FastAPI, Asyncio, Flask)", level: 96, status: "PRIMARY BACKEND" },
    { name: "React, Next.js & TypeScript (Vite, Zustand)", level: 93, status: "MODERN FRONTEND" },
    { name: "SQL (PostgreSQL, SQLite, SQLAlchemy 2.0)", level: 94, status: "DATABASE & ORM" },
    { name: "Desktop & Systems (Electron, PyQt6, REST)", level: 90, status: "GUI & APIS" },
    { name: "Media & Automation (FFmpeg, Pillow, ETL)", level: 89, status: "DATA PIPELINES" },
    { name: "Analytical Thinking & Mathematics (ELTE)", level: 95, status: "LOGIC & MODELING" },
  ];

  const brandingSkills = [
    { name: "Brand Naming & Linguistic Testing", level: 98, status: "1,100+ CLIENTS" },
    { name: "High-Converting Slogans & Taglines", level: 96, status: "400+ 5.0★ REVIEWS" },
    { name: "Domain (.com) & Trademark Clearance", level: 92, status: "VETTED CONCEPTS" },
    { name: "Brand Positioning & Value Proposition", level: 95, status: "MARKET FIT" },
    { name: "International Client Communication", level: 96, status: "FLUENT ENGLISH" },
    { name: "Landing Page Copywriting & Conversion Flow", level: 92, status: "USER FOCUSED" },
  ];

  const fiverrFeedback = [
    {
      quote:
        "The names delivered weren't just creative—they felt instantly legitimate, memorable, and right on point. Found the perfect domain and our team was thrilled.",
      client: "Fintech Startup Founder (United States)",
      stars: 5,
    },
    {
      quote:
        "Clear communication, fast turnaround, and brilliant work. The tagline captured our entire product in five words. Over 1,100 completed orders speak for themselves.",
      client: "SaaS Platform Director (United Kingdom)",
      stars: 5,
    },
  ];

  return (
    <div className="section-container">
      {/* Header */}
      <SectionHeader
        subtitle="Core Competencies"
        subtitleIcon={<Terminal size={14} />}
        title="Skills & Technical Capabilities"
        description="A realistic overview of my core programming stack alongside 5 years of verified branding experience."
      />

      {/* Dual Matrix Grid */}
      <Grid cols={2} gap="lg" className={styles.matrixGrid}>
        {/* Engineering Vector */}
        <HudCard variant="surfaceDeck" className={styles.vectorCard}>
          <div className={styles.vectorHeader}>
            <div className={styles.vectorIcon}>
              <Cpu size={20} />
            </div>
            <div>
              <Text as="h3" font="heading" size="lg" weight="bold" tone="primary" className={styles.vectorTitle}>
                Software Engineering &amp; Systems
              </Text>
              <Text font="mono" size="2xs" tone="cyan" className={styles.vectorSub}>
                BACKEND, FRONTEND &amp; DATABASE ARCHITECTURE
              </Text>
            </div>
          </div>

          {/* Skill Bars */}
          <Stack gap="md">
            {engineeringSkills.map((s) => (
              <ProgressBar
                key={s.name}
                label={s.name}
                tag={s.status}
                value={s.level}
                variant="cyan"
              />
            ))}
          </Stack>
        </HudCard>

        {/* Branding Vector */}
        <HudCard variant="surfaceDeck" className={styles.vectorCard}>
          <div className={styles.vectorHeader}>
            <div className={styles.vectorIcon}>
              <PenTool size={20} />
            </div>
            <div>
              <Text as="h3" font="heading" size="lg" weight="bold" tone="primary" className={styles.vectorTitle}>
                Brand Strategy &amp; Copywriting
              </Text>
              <Text font="mono" size="2xs" tone="cyan" className={styles.vectorSub}>
                1,100+ CLIENTS • 400+ 5-STAR REVIEWS ON FIVERR
              </Text>
            </div>
          </div>

          {/* Skill Bars */}
          <Stack gap="md">
            {brandingSkills.map((s) => (
              <ProgressBar
                key={s.name}
                label={s.name}
                tag={s.status}
                value={s.level}
                variant="cyan"
              />
            ))}
          </Stack>
        </HudCard>
      </Grid>

      {/* Fiverr Social Proof Quotes */}
      <Grid cols={2} gap="md" className={styles.feedbackGrid}>
        {fiverrFeedback.map((fb, idx) => (
          <Testimonial
            key={idx}
            stars={fb.stars}
            quote={fb.quote}
            author={fb.client}
            badge="VERIFIED FIVERR CLIENT"
          />
        ))}
      </Grid>
    </div>
  );
}

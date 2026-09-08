"use client";

import React from "react";
import { Certificate, Launch } from "@carbon/icons-react";
import styles from "./Testimonials.module.css";
import {
  SectionHeader,
  Grid,
  Testimonial,
  TelemetryBadge,
} from "@/components/ui";
import { getFiverrFeedback } from "@/data/testimonials";
import { useLocale } from "@/locales";

export default function Testimonials() {
  const { dict } = useLocale();
  const feedback = getFiverrFeedback(dict);

  return (
    <div className="section-container">
      {/* Section Header */}
      <SectionHeader
        subtitle={dict.testimonials.subtitle}
        subtitleIcon={<Certificate size={14} />}
        title={dict.testimonials.title}
        description={dict.testimonials.description}
      />

      {/* Social Proof Rating Badge */}
      <div className={styles.badgeRow}>
        <TelemetryBadge variant="cyan" beacon>
          {dict.testimonials.ratingBadge}
        </TelemetryBadge>
      </div>

      {/* Verified Testimonial Cards */}
      <Grid cols={2} gap="md" className={styles.feedbackGrid}>
        {feedback.map((fb) => (
          <Testimonial
            key={fb.id}
            stars={fb.stars}
            quote={fb.quote}
            author={fb.client}
            badge={dict.testimonials.verifiedBadge}
          />
        ))}
      </Grid>

      {/* Verified Fiverr Profile Link */}
      <div className={styles.verifyRow}>
        <a
          href="https://www.fiverr.com/stargate91"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.verifyLink}
        >
          <span>{dict.testimonials.verifyFiverrLink}</span>
          <Launch size={13} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

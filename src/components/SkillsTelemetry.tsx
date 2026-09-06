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
import { getEngineeringSkills, getBrandingSkills, getFiverrFeedback } from "@/data/skills";
import { useLocale } from "@/locales";

export default function SkillsTelemetry() {
  const { dict } = useLocale();
  const engineeringSkills = getEngineeringSkills(dict);
  const brandingSkills = getBrandingSkills(dict);
  const fiverrFeedback = getFiverrFeedback(dict);

  return (

    <div className="section-container">
      {/* Header */}
      <SectionHeader
        subtitle={dict.skills.subtitle}
        subtitleIcon={<Terminal size={14} />}
        title={dict.skills.title}
        description={dict.skills.description}
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
                {dict.skills.engineeringTitle}
              </Text>
              <Text font="mono" size="2xs" tone="cyan" className={styles.vectorSub}>
                {dict.skills.engineeringSub}
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
                {dict.skills.brandingTitle}
              </Text>
              <Text font="mono" size="2xs" tone="cyan" className={styles.vectorSub}>
                {dict.skills.brandingSub}
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
        {fiverrFeedback.map((fb) => (
          <Testimonial
            key={fb.id}
            stars={fb.stars}
            quote={fb.quote}
            author={fb.client}
            badge={dict.skills.verifiedBadge}
          />
        ))}
      </Grid>
    </div>
  );
}

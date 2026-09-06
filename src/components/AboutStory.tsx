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
import { getTimelineEntries } from "@/data/timeline";
import { useLocale } from "@/locales";

const iconMap = {
  Atom,
  Feather,
  Cpu,
};

export default function AboutStory() {
  const { dict } = useLocale();
  const timelineEntries = getTimelineEntries(dict);

  return (

    <div className="section-container">
      {/* Header */}
      <SectionHeader
        subtitle={dict.story.subtitle}
        subtitleIcon={<Terminal size={14} />}
        title={dict.story.title}
        description={dict.story.description}
      />

      {/* Timeline Log Grid */}
      <Grid cols={3} gap="md" className={styles.grid}>
        {timelineEntries.map((log) => {
          const Icon = iconMap[log.iconName];
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
              {dict.story.fiverrBannerTitle}
            </Text>
            <Text size="sm" tone="secondary" className={styles.fiverrDesc}>
              {dict.story.fiverrBannerDesc}
            </Text>
          </div>
        </Inline>

        <Tooltip
          content={dict.story.fiverrTooltip}
          side="top"
          variant="cyan"
        >
          <TelemetryBadge
            variant="cyan"
            className={styles.fiverrBadge}
          >
            {dict.story.fiverrBadge}
          </TelemetryBadge>
        </Tooltip>
      </div>
    </div>
  );
}

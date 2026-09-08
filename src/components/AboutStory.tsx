"use client";

import { Calculation, CheckmarkFilled, Chip, Pen, Terminal } from "@carbon/icons-react";
import styles from "./AboutStory.module.css";
import {
  SectionHeader,
  HudCard,
  TelemetryBadge,
  Stack,
  Inline,
  Text,
} from "@/components/ui";
import { getTimelineEntries } from "@/data/timeline";
import { useLocale } from "@/locales";

const iconMap = {
  Atom: Calculation,
  Feather: Pen,
  Cpu: Chip,
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

      {/* Trajectory Pipeline Bar */}
      <div className={styles.pipelineWrapper} aria-hidden="true">
        <div className={styles.pipelineTrack}>
          <div className={styles.pipelineLine} />
          {timelineEntries.map((log, index) => (
            <div key={log.sol} className={styles.pipelineNode}>
              <span className={styles.nodeIndex}>0{index + 1}</span>
              <span className={styles.nodeLabel}>{log.sol}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Log Grid */}
      <div className={styles.grid}>
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
                <div className={styles.logMeta}>
                  <TelemetryBadge variant="cyan" className={styles.metaBadge}>
                    {log.date}
                  </TelemetryBadge>
                </div>

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
                    <CheckmarkFilled size={14} className={styles.checkIcon} />
                    <Text as="span" font="mono" size="xs" tone="secondary">
                      {metric}
                    </Text>
                  </Inline>
                ))}
              </Stack>
            </HudCard>
          );
        })}
      </div>
    </div>
  );
}

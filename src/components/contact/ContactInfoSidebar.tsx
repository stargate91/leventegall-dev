"use client";

import styles from "../ContactForm.module.css";
import { HudCard, TelemetryBadge, CopySnippet, Stat, Stack, Text } from "@/components/ui";
import { siteConfig } from "@/config/site";
import { useLocale } from "@/locales";

export default function ContactInfoSidebar() {
  const { dict } = useLocale();
  const directEmail = siteConfig.email;

  return (
    <div className={styles.infoColumn}>
      {/* Direct Transmission Card */}
      <HudCard variant="surface" corners={false} className={`${styles.infoCard} ${styles.emailCard}`}>
        <div>
          <TelemetryBadge variant="cyan" className={styles.infoCardTag}>
            {dict.contact.infoColumn.directEmailTag}
          </TelemetryBadge>
          <Text as="h4" font="heading" size="lg" weight="semibold" tone="primary" className={styles.infoCardTitle}>
            {dict.contact.infoColumn.directEmailTitle}
          </Text>
          <Text as="p" size="sm" tone="secondary" leading="relaxed" className={styles.infoCardDesc}>
            {dict.contact.infoColumn.directEmailDesc}
          </Text>
        </div>

        <CopySnippet text={directEmail} label="COPY" copiedLabel="COPIED" />
      </HudCard>

      {/* Key Facts & Status Card */}
      <HudCard variant="surface" corners={false} className={styles.infoCard}>
        <TelemetryBadge variant="cyan" className={styles.infoCardTag}>
          {dict.contact.infoColumn.atAGlanceTag}
        </TelemetryBadge>
        <Stack gap="none">
          <Stat variant="row" label={dict.contact.infoColumn.backendLabel} value={dict.contact.infoColumn.backendValue} />
          <Stat variant="row" label={dict.contact.infoColumn.frontendLabel} value={dict.contact.infoColumn.frontendValue} />
          <Stat variant="row" label={dict.contact.infoColumn.personalLabel} value={dict.contact.infoColumn.personalValue} />
          <Stat variant="row" label={dict.contact.infoColumn.physicsLabel} value={dict.contact.infoColumn.physicsValue} />
        </Stack>
      </HudCard>
    </div>
  );
}

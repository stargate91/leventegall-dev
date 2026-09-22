"use client";

import { Terminal, Code } from "@carbon/icons-react";
import styles from "./ServicesPricing.module.css";
import ServiceIllustration from "./ServiceIllustration";
import {
  SectionHeader,
  HudCard,
  Button,
  Callout,
  Grid,
  Text,
} from "@/components/ui";
import { getPackageTiers } from "@/data/services";
import { useLocale } from "@/locales";

function DiscordIcon({ size = 16, className }: { size?: number | undefined; className?: string | undefined }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

function getServiceIcon(id: string) {
  switch (id) {
    case "automation":
      return <Terminal size={18} />;
    case "development":
      return <Code size={18} />;
    case "discord-bot":
      return <DiscordIcon size={18} />;
    default:
      return <Terminal size={18} />;
  }
}

export default function ServicesPricing() {
  const { dict } = useLocale();
  const packageTiers = getPackageTiers(dict);

  return (
    <div className="section-container">
      {/* Header */}
      <SectionHeader
        subtitle={dict.services.subtitle}
        subtitleIcon={<Terminal size={14} />}
        title={dict.services.title}
        description={dict.services.description}
      />

      {/* Services Grid (Clean HUD Cards) */}
      <Grid cols={3} gap="md" className={styles.grid}>
        {packageTiers.map((tier) => (
          <HudCard
            key={tier.id}
            variant={tier.isPopular ? "elevated" : "surface"}
            corners={tier.isPopular}
            className={`${styles.card} ${tier.isPopular ? styles.popularCard : ""}`}
          >
            <ServiceIllustration kind={tier.id} />
            <div className={styles.cardContent}>
              <div className={styles.headerZone}>
                <div className={styles.metaRow}>
                  <Text font="mono" size="2xs" tone="cyan" weight="semibold" className={styles.tierCodename}>
                    {tier.codename}
                  </Text>
                  <span className={styles.serviceIcon} aria-hidden="true">
                    {getServiceIcon(tier.id)}
                  </span>
                </div>

                <Text as="h3" font="heading" size="lg" weight="bold" tone="primary" className={styles.tierName}>
                  {tier.name}
                </Text>
              </div>

              {/* Description */}
              <Text as="p" size="sm" tone="secondary" leading="relaxed" className={styles.tierDesc}>
                {tier.description}
              </Text>
            </div>
          </HudCard>
        ))}
      </Grid>

      {/* Unified Project Consultation Callout */}
      <Callout
        variant="cyan"
        title={dict.services.customCalloutTitle}
        action={
          <Button variant="primary" size="sm" href="#contact">
            {dict.services.customCalloutButton}
          </Button>
        }
        className={styles.consultCallout}
      >
        {dict.services.customCalloutDesc}
      </Callout>
    </div>
  );
}

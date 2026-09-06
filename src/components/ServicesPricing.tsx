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
} from "@/components/ui";
import { packageTiers } from "@/data/services";
import { getDictionary } from "@/locales";

export default function ServicesPricing() {
  const dict = getDictionary("en");

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
        subtitle={dict.services.subtitle}
        subtitleIcon={<Terminal size={14} />}
        title={dict.services.title}
        description={dict.services.description}
      />

      {/* Pricing Cards Grid */}
      <Grid cols={3} gap="md" className={styles.grid}>
        {packageTiers.map((tier) => (
          <HudCard
            key={tier.id}
            variant={tier.isPopular ? "surface" : "surfaceDeck"}
            corners={tier.isPopular}
            className={`${styles.pricingCard} ${tier.isPopular ? styles.popularCard : ""}`}
          >
            {tier.isPopular && (
              <TelemetryBadge variant="cyan" beacon className={styles.popularBadge}>
                {dict.services.recommendedBadge}
              </TelemetryBadge>
            )}

            <Stack gap="md" className={styles.cardInner}>
              {/* Top Row: Codename & Badge */}
              <div className={styles.topRow}>
                <div className={styles.tierCodename}>{tier.codename}</div>
                <h3 className={styles.tierName}>{tier.name}</h3>
                <div className={styles.tierBadge}>{tier.badge}</div>
              </div>

              {/* Price & Duration */}
              <div className={styles.priceRow}>
                <div className={styles.price}>{tier.priceEstimate}</div>
                <div className={styles.duration}>• {tier.duration} Delivery</div>
              </div>

              {/* Description */}
              <p className={styles.tierDesc}>{tier.description}</p>

              {/* Features Checklist */}
              <div className={styles.featuresSection}>
                <div className={styles.featuresHeading}>{dict.services.includedHeading}</div>
                <CheckList
                  items={tier.features}
                  size="sm"
                  gap="xs"
                />
              </div>

              {/* Action CTA Button */}
              <div className={styles.buttonWrapper}>
                <Button
                  variant={tier.isPopular ? "primary" : "secondary"}
                  size="md"
                  fullWidth
                  onClick={() => handleSelectPackage(tier.id)}
                  iconRight={<ArrowRight size={14} />}
                >
                  {dict.services.selectButton}
                </Button>
              </div>
            </Stack>
          </HudCard>
        ))}
      </Grid>

      {/* Bottom Consultation Callout */}
      <Callout
        variant="cyan"
        icon={<Orbit size={18} />}
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

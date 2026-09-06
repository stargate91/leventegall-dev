"use client";

import { ArrowUp, Compass, ExternalLink } from "lucide-react";
import styles from "./Footer.module.css";
import Button from "@/components/ui/Button";
import { Text } from "@/components/ui";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/locales";

export default function Footer() {
  const dict = getDictionary("en");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Top Row: Brand & Scroll to Top */}
        <div className={styles.topRow}>
          <div className={styles.brandWrapper}>
            <div className={styles.brandIcon}>
              <Compass size={20} />
            </div>
            <div>
              <Text font="heading" size="sm" weight="bold" tone="primary" uppercase>
                {siteConfig.name}
              </Text>
              <Text font="mono" size="2xs" tone="cyan">
                {dict.footer.subTitle}
              </Text>
            </div>
          </div>

          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={scrollToTop}
            iconLeft={<ArrowUp size={14} />}
          >
            {dict.footer.returnToOrbit}
          </Button>
        </div>

        {/* Middle Row: Quote & Links */}
        <div className={styles.middleRow}>
          <div>
            <Text
              as="p"
              font="body"
              size="sm"
              tone="primary"
              italic
              leading="relaxed"
              className={styles.quoteText}
            >
              &ldquo;The Grid. A digital frontier. I kept dreaming of a world I thought I&apos;d never see. And then, one day... I got in.&rdquo;
            </Text>
            <Text font="mono" size="2xs" tone="cyan" className={styles.quoteSub}>
              {dict.footer.quoteSub}
            </Text>
          </div>

          <div className={styles.linksColumn}>
            <Text font="mono" size="2xs" tone="secondary" uppercase weight="semibold" className={styles.linksHeading}>
              {dict.footer.transmissionHeading}
            </Text>
            <a
              href={siteConfig.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkItem}
            >
              <Text as="span" size="xs" tone="secondary">
                {dict.footer.githubLabel}
              </Text>
              <ExternalLink size={12} />
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className={styles.linkItem}
            >
              <Text as="span" size="xs" tone="secondary">
                {dict.footer.directCommsLabel} {siteConfig.email}
              </Text>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Bottom Row: Telemetry */}
        <div className={styles.bottomRow}>
          <Text font="mono" size="2xs" tone="muted">
            {siteConfig.coordinates.city.toUpperCase()} [{siteConfig.coordinates.coords}] • {dict.footer.craftedWith}
          </Text>
          <Text font="mono" size="2xs" tone="cyan">
            {dict.footer.statusLabel} {siteConfig.telemetry.missionsDelivered} MISSIONS DELIVERED // {siteConfig.telemetry.systemStatus}
          </Text>
        </div>
      </div>
    </footer>
  );
}

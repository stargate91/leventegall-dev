"use client";

import { ArrowUp, Compass, ExternalLink } from "lucide-react";
import styles from "./Footer.module.css";
import Button from "@/components/ui/Button";
import { Text } from "@/components/ui";

export default function Footer() {
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
                LEVENTE GÁLL // STARGATE91
              </Text>
              <Text font="mono" size="2xs" tone="cyan">
                FULL-STACK ARCHITECT &amp; BRAND STRATEGIST
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
            RETURN TO ORBIT
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
              // IN HOMAGE TO COSMOS &amp; INTERSTELLAR
            </Text>
          </div>

          <div className={styles.linksColumn}>
            <Text font="mono" size="2xs" tone="secondary" uppercase weight="semibold" className={styles.linksHeading}>
              TRANSMISSION &amp; REPOSITORY ARRAYS
            </Text>
            <a
              href="https://github.com/stargate91"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkItem}
            >
              <Text as="span" size="xs" tone="secondary">
                GitHub (github.com/stargate91)
              </Text>
              <ExternalLink size={12} />
            </a>
            <a
              href="mailto:leventegall@proton.me"
              className={styles.linkItem}
            >
              <Text as="span" size="xs" tone="secondary">
                Direct Comms: leventegall@proton.me
              </Text>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Bottom Row: Telemetry */}
        <div className={styles.bottomRow}>
          <Text font="mono" size="2xs" tone="muted">
            BUDAPEST [47.49°N, 19.04°E] • CRAFTED WITH NEXT.JS 16 &amp; TRON VANILLA CSS
          </Text>
          <Text font="mono" size="2xs" tone="cyan">
            STATUS: 1,100+ MISSIONS DELIVERED // ALL SYSTEMS NOMINAL
          </Text>
        </div>
      </div>
    </footer>
  );
}

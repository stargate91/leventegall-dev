import { Warning, ArrowLeft, Connect } from "@carbon/icons-react";
import styles from "./not-found.module.css";
import type { Metadata } from "next";
import {
  HudCard,
  Button,
  TelemetryBadge,
  Stack,
  Text,
} from "@/components/ui";
import { getDictionary, LocaleProvider } from "@/locales";

import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "404 - Transmission Lost",
  description: "Coordinates out of bounds. The requested orbital resource does not exist.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function NotFound() {
  const dict = getDictionary("en");

  return (
    <LocaleProvider initialLocale="en">
      <div className="cosmic-mesh-bg" aria-hidden="true" />
      <div className="cosmic-grid-overlay" aria-hidden="true" />
      <main className={styles.container}>

        <HudCard variant="surface" className={styles.card}>
          <Stack gap="lg" align="center" className={styles.content}>
            <TelemetryBadge variant="cyan" beacon>
              {dict.notFound.badge}
            </TelemetryBadge>

            <div className={styles.glyphWrapper}>
              <Warning size={48} className={styles.glyphIcon} />
            </div>

            <div className={styles.headingGroup}>
              <Text font="mono" size="4xl" weight="bold" tone="cyan" className={styles.errorCode}>
                404
              </Text>
              <Text as="h1" font="heading" size="2xl" weight="bold" tone="primary" uppercase>
                {dict.notFound.title}
              </Text>
              <Text as="p" size="sm" tone="secondary" className={styles.description}>
                {dict.notFound.description}
              </Text>
            </div>

            <div className={styles.actions}>
              <Button
                variant="primary"
                size="md"
                href="/"
                iconLeft={<ArrowLeft size={16} />}
              >
                {dict.notFound.returnOrbit}
              </Button>
              <Button
                variant="secondary"
                size="md"
                href="/#contact"
                iconLeft={<Connect size={16} />}
              >
                {dict.notFound.directUplink}
              </Button>
            </div>
          </Stack>
        </HudCard>
      </main>
    </LocaleProvider>
  );
}

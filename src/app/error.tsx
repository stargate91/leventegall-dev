"use client";

import { useEffect } from "react";
import { WarningAlt, Restart, Home } from "@carbon/icons-react";
import styles from "./error.module.css";
import {
  HudCard,
  Button,
  TelemetryBadge,
  Stack,
  Text,
} from "@/components/ui";

import { logger } from "@/lib/logger";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    logger.error("Orbital telemetry exception caught by error boundary", {
      context: { digest: error.digest, message: error.message },
      error,
    });
  }, [error]);

  return (
    <main className={styles.container}>
      <div className="cosmic-mesh-bg" aria-hidden="true" />
      <div className="cosmic-grid-overlay" aria-hidden="true" />

      <HudCard variant="surface" className={styles.card}>
        <Stack gap="lg" align="center" className={styles.content}>
          <TelemetryBadge variant="subtle">
            SOMETHING WENT WRONG
          </TelemetryBadge>

          <div className={styles.glyphWrapper}>
            <WarningAlt size={40} className={styles.glyphIcon} />
          </div>

          <div className={styles.headingGroup}>
            <Text as="h1" font="heading" size="2xl" weight="bold" tone="primary">
              Something Went Wrong
            </Text>
            <Text as="p" size="sm" tone="secondary" className={styles.description}>
              An unexpected error occurred while loading this page. Please try again, or head back to the homepage.
            </Text>
            {error.digest && (
              <Text font="mono" size="2xs" tone="cyan" className={styles.digest}>
                [ Error Reference: {error.digest} ]
              </Text>
            )}
          </div>

          <div className={styles.actions}>
            <Button
              variant="primary"
              size="md"
              onClick={() => reset()}
              iconLeft={<Restart size={16} />}
            >
              Try Again
            </Button>
            <Button
              variant="secondary"
              size="md"
              href="/"
              iconLeft={<Home size={16} />}
            >
              Back to Home
            </Button>
          </div>
        </Stack>
      </HudCard>
    </main>
  );
}

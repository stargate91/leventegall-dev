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
          <TelemetryBadge variant="subtle" beacon beaconColor="amber">
            // ANOMALY DETECTED: SUBSYSTEM EXCEPTION
          </TelemetryBadge>

          <div className={styles.glyphWrapper}>
            <WarningAlt size={48} className={styles.glyphIcon} />
          </div>

          <div className={styles.headingGroup}>
            <Text as="h1" font="heading" size="2xl" weight="bold" tone="primary" uppercase>
              SYSTEM MALFUNCTION
            </Text>
            <Text as="p" size="sm" tone="secondary" className={styles.description}>
              An unexpected anomaly occurred during state execution. Diagnostic logs have been recorded for inspection.
            </Text>
            {error.digest && (
              <Text font="mono" size="2xs" tone="cyan" className={styles.digest}>
                [ TRACE_DIGEST: {error.digest} ]
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
              Reboot Subsystem
            </Button>
            <Button
              variant="secondary"
              size="md"
              href="/"
              iconLeft={<Home size={16} />}
            >
              Return Home
            </Button>
          </div>
        </Stack>
      </HudCard>
    </main>
  );
}

import { AlertOctagon, ArrowLeft, Orbit } from "lucide-react";
import styles from "./not-found.module.css";
import {
  HudCard,
  Button,
  TelemetryBadge,
  Stack,
  Text,
} from "@/components/ui";

export default function NotFound() {
  return (
    <main className={styles.container}>
      <div className="cosmic-mesh-bg" aria-hidden="true" />
      <div className="cosmic-grid-overlay" aria-hidden="true" />

      <HudCard variant="surface" className={styles.card}>
        <Stack gap="lg" align="center" className={styles.content}>
          <TelemetryBadge variant="cyan" beacon>
            // TELEMETRY: SECTOR UNCHARTED
          </TelemetryBadge>

          <div className={styles.glyphWrapper}>
            <AlertOctagon size={48} className={styles.glyphIcon} />
          </div>

          <div className={styles.headingGroup}>
            <Text font="mono" size="4xl" weight="bold" tone="cyan" className={styles.errorCode}>
              404
            </Text>
            <Text as="h1" font="heading" size="2xl" weight="bold" tone="primary" uppercase>
              SIGNAL LOST IN DEEP SPACE
            </Text>
            <Text as="p" size="sm" tone="secondary" className={styles.description}>
              The coordinates you attempted to navigate do not correspond to any known orbital trajectory or active telemetry sector.
            </Text>
          </div>

          <div className={styles.actions}>
            <Button
              variant="primary"
              size="md"
              href="/"
              iconLeft={<ArrowLeft size={16} />}
            >
              Return to Orbit
            </Button>
            <Button
              variant="secondary"
              size="md"
              href="/#contact"
              iconLeft={<Orbit size={16} />}
            >
              Direct Uplink
            </Button>
          </div>
        </Stack>
      </HudCard>
    </main>
  );
}

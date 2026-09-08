"use client";

import { CheckmarkFilled } from "@carbon/icons-react";
import styles from "../ContactForm.module.css";
import { Button, Text } from "@/components/ui";
import { useLocale } from "@/locales";

interface ContactSuccessViewProps {
  telemetryId: string;
  onReset: () => void;
}

export default function ContactSuccessView({
  telemetryId,
  onReset,
}: ContactSuccessViewProps) {
  const { dict } = useLocale();

  return (
    <div role="status" aria-live="polite" className={styles.successWrapper}>
      <div className={styles.successIcon}>
        <CheckmarkFilled size={30} />
      </div>
      <Text as="h3" font="heading" size="2xl" weight="bold" tone="primary" className={styles.successTitle}>
        {dict.contact.success.title}
      </Text>
      <Text as="p" font="mono" size="sm" tone="cyan" className={styles.successTelemetry}>
        [ Reference ID: {telemetryId} ]
      </Text>
      <Text as="p" size="sm" tone="secondary" leading="relaxed" className={styles.successDesc}>
        {dict.contact.success.desc}
      </Text>
      <Button variant="secondary" size="md" onClick={onReset}>
        {dict.contact.success.button}
      </Button>
    </div>
  );
}

"use client";

import { useState } from "react";
import styles from "../ProjectCard.module.css";
import {
  TerminalBox,
  ProgressBar,
  Button,
  Inline,
  Stack,
  Text,
} from "@/components/ui";
import { useLocale } from "@/locales";

export default function SwayaSimulator() {
  const [swayaTaskStatus, setSwayaTaskStatus] = useState<"IDLE" | "SCANNING" | "ENRICHING" | "COMPLETED">("ENRICHING");
  const [swayaProgress, setSwayaProgress] = useState(68);
  const { dict } = useLocale();

  const handleReset = () => {
    setSwayaProgress(25);
    setSwayaTaskStatus("ENRICHING");
  };

  const handleStep = () => {
    const nextProgress = Math.min(100, swayaProgress + 15);
    setSwayaProgress(nextProgress);
    if (nextProgress >= 100) {
      setSwayaTaskStatus("COMPLETED");
    }
  };

  return (
    <TerminalBox
      title={dict.projects.simulators.swayaTitle}
      status={swayaTaskStatus}
      statusColor="cyan"
      actions={
        <Inline gap="sm">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleReset}
          >
            {dict.projects.simulators.swayaReset}
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleStep}
          >
            {dict.projects.simulators.swayaStep}
          </Button>
        </Inline>
      }
    >
      <Stack gap="md">
        <ProgressBar
          label={dict.projects.simulators.swayaTag}
          tag={`[ ${swayaProgress}% ]`}
          value={swayaProgress}
          variant="cyan"
        />
        <Stack gap="xs" className={styles.logDetail}>
          <Text font="mono" size="xs" tone="secondary" leading="relaxed">
            {dict.projects.simulators.swayaLog1}
          </Text>
          <Text font="mono" size="xs" tone="secondary" leading="relaxed">
            {dict.projects.simulators.swayaLog2}
          </Text>
          <Text font="mono" size="xs" tone="secondary" leading="relaxed">
            {dict.projects.simulators.swayaLog3}
          </Text>
        </Stack>
      </Stack>
    </TerminalBox>
  );
}

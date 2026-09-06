"use client";

import { useState } from "react";
import styles from "../ProjectCard.module.css";
import {
  TerminalBox,
  ProgressBar,
  Button,
  Inline,
  Stack,
} from "@/components/ui";
import { getDictionary } from "@/locales";

export default function SwayaSimulator() {
  const [swayaTaskStatus, setSwayaTaskStatus] = useState<"IDLE" | "SCANNING" | "ENRICHING" | "COMPLETED">("ENRICHING");
  const [swayaProgress, setSwayaProgress] = useState(68);
  const dict = getDictionary("en");

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
        <div className={styles.logDetail}>
          <div>{dict.projects.simulators.swayaLog1}</div>
          <div>{dict.projects.simulators.swayaLog2}</div>
          <div>{dict.projects.simulators.swayaLog3}</div>
        </div>
      </Stack>
    </TerminalBox>
  );
}

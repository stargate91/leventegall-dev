"use client";

import { useState } from "react";
import styles from "../ProjectCard.module.css";
import {
  TerminalBox,
  Button,
  Stack,
  Text,
} from "@/components/ui";
import { getBrandingTaglines } from "@/data/projects";
import { useLocale } from "@/locales";

export default function AetheriaSimulator() {
  const [selectedTaglineIndex, setSelectedTaglineIndex] = useState(0);
  const { dict } = useLocale();
  const brandingTaglines = getBrandingTaglines(dict);

  return (
    <TerminalBox
      title={dict.projects.simulators.aetheriaTitle}
      status={dict.projects.simulators.aetheriaStatus}
    >
      <Stack gap="md">
        <div className={styles.aetheriaCard}>
          <Text font="heading" size="xl" weight="bold" tone="primary" className={styles.aetheriaTitle}>
            AETHERIA
          </Text>
          <Text size="xs" tone="secondary" className={styles.aetheriaSub}>
            {dict.projects.simulators.aetheriaPhonetic}
          </Text>
        </div>

        <Stack gap="xs">
          {brandingTaglines.map((t, i) => (
            <Button
              key={t.id}
              variant={selectedTaglineIndex === i ? "telemetry" : "ghost"}
              size="sm"
              fullWidth
              onClick={() => setSelectedTaglineIndex(i)}
            >
              &ldquo;{t.text}&rdquo;
            </Button>
          ))}
        </Stack>
      </Stack>
    </TerminalBox>
  );
}

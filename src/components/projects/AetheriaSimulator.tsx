"use client";

import { useState } from "react";
import styles from "../ProjectCard.module.css";
import {
  TerminalBox,
  Button,
  Stack,
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
          <div className={styles.aetheriaTitle}>
            AETHERIA
          </div>
          <div className={styles.aetheriaSub}>
            {dict.projects.simulators.aetheriaPhonetic}
          </div>
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

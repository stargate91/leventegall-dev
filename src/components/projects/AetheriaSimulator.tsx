"use client";

import { useState } from "react";
import styles from "../ProjectCard.module.css";
import {
  TerminalBox,
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
            <button
              key={t.id}
              type="button"
              onClick={() => setSelectedTaglineIndex(i)}
              className={`${styles.taglineBtn} ${selectedTaglineIndex === i ? styles.taglineBtnActive : ""}`}
            >
              <div className={styles.taglineText}>
                &ldquo;{t.text}&rdquo;
              </div>
            </button>
          ))}
        </Stack>
      </Stack>
    </TerminalBox>
  );
}

"use client";

import { useState } from "react";
import styles from "../ProjectCard.module.css";
import {
  TerminalBox,
  Button,
  Stack,
  Text,
} from "@/components/ui";
import { useLocale } from "@/locales";

interface IrisEvent {
  id: string;
  time: string;
  user: string;
  action: string;
  pts: string;
}

export default function IrisSimulator() {
  const { dict } = useLocale();
  const [irisEventLog, setIrisEventLog] = useState<IrisEvent[]>([
    { id: "iris-ev-1", time: "10:04:12", user: "User_Alex", action: "VOICE_CHANNEL_ACTIVE", pts: "+25 XP" },
    { id: "iris-ev-2", time: "10:04:18", user: "Member_Dave", action: "PROFILE_CARD_RENDER", pts: "SUCCESS" },
    { id: "iris-ev-3", time: "10:04:25", user: "Elena_V", action: "WEEKLY_RANK_AWARDED", pts: "TIER 01" },
  ]);

  const handleEmulateEvent = () => {
    const actions = ["VOICE_ACTIVE", "SPOTIFY_STREAM", "PILLOW_RENDER", "WEEKLY_RANK"] as const;
    const randomAction = actions[Math.floor(Math.random() * actions.length)] ?? "VOICE_ACTIVE";
    const names = ["Alex", "Sarah", "David", "Mira", "Tom"] as const;
    const randomName = names[Math.floor(Math.random() * names.length)] ?? "Alex";
    const newLog: IrisEvent = {
      id: `iris-ev-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      time: new Date().toTimeString().slice(0, 8),
      user: `User_${randomName}`,
      action: randomAction,
      pts: "+15 XP",
    };
    setIrisEventLog((prev) => [newLog, ...prev.slice(0, 2)]);
  };

  return (
    <TerminalBox
      title={dict.projects.simulators.irisTitle}
      status="ACTIVE"
      statusColor="green"
      actions={
        <Button
          variant="primary"
          size="sm"
          fullWidth
          onClick={handleEmulateEvent}
        >
          {dict.projects.simulators.irisEmulate}
        </Button>
      }
    >
      <Stack gap="xs">
        {irisEventLog.map((ev) => (
          <div key={ev.id} className={styles.irisRow}>
            <Text as="span" font="mono" size="xs" tone="muted" className={styles.irisTime}>
              {ev.time}
            </Text>
            <Text as="span" font="mono" size="xs" tone="primary" className={styles.irisUser}>
              {ev.user}
            </Text>
            <Text as="span" font="mono" size="xs" tone="cyan" className={styles.irisAction}>
              {ev.action}
            </Text>
            <Text as="span" font="mono" size="xs" tone="success" className={styles.irisPts}>
              {ev.pts}
            </Text>
          </div>
        ))}
      </Stack>
    </TerminalBox>
  );
}

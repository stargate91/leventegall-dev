"use client";

import { useState } from "react";
import styles from "../ProjectCard.module.css";
import {
  TerminalBox,
  Button,
  Stack,
} from "@/components/ui";
import { getDictionary } from "@/locales";

interface IrisEvent {
  time: string;
  user: string;
  action: string;
  pts: string;
}

export default function IrisSimulator() {
  const dict = getDictionary("en");
  const [irisEventLog, setIrisEventLog] = useState<IrisEvent[]>([
    { time: "10:04:12", user: "User_Alex", action: "VOICE_CHANNEL_ACTIVE", pts: "+25 XP" },
    { time: "10:04:18", user: "Member_Dave", action: "PROFILE_CARD_RENDER", pts: "SUCCESS" },
    { time: "10:04:25", user: "Elena_V", action: "WEEKLY_RANK_AWARDED", pts: "TIER 01" },
  ]);

  const handleEmulateEvent = () => {
    const actions = ["VOICE_ACTIVE", "SPOTIFY_STREAM", "PILLOW_RENDER", "WEEKLY_RANK"];
    const randomAction = actions[Math.floor(Math.random() * actions.length)];
    const names = ["Alex", "Sarah", "David", "Mira", "Tom"];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const newLog: IrisEvent = {
      time: new Date().toTimeString().slice(0, 8),
      user: `User_${randomName}`,
      action: randomAction,
      pts: "+15 XP",
    };
    setIrisEventLog((prev) => [newLog, prev[0], prev[1]]);
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
        {irisEventLog.map((ev, i) => (
          <div key={i} className={styles.irisRow}>
            <span className={styles.irisTime}>{ev.time}</span>
            <span className={styles.irisUser}>{ev.user}</span>
            <span className={styles.irisAction}>{ev.action}</span>
            <span className={styles.irisPts}>{ev.pts}</span>
          </div>
        ))}
      </Stack>
    </TerminalBox>
  );
}

"use client";

import { Play, Pause } from "@carbon/icons-react";
import styles from "../AudioPlayer.module.css";
import type { AudioTrack } from "@/config/site";
import { useLocale } from "@/locales";

interface AudioTriggerPillProps {
  isOpen: boolean;
  isPlaying: boolean;
  currentTrack?: AudioTrack | undefined;
  onToggleOpen: () => void;
}

export default function AudioTriggerPill({
  isOpen,
  isPlaying,
  currentTrack,
  onToggleOpen,
}: AudioTriggerPillProps) {
  const { dict } = useLocale();

  return (
    <button
      type="button"
      data-testid="audio-player-pill"
      className={styles.floatingPill}
      onClick={onToggleOpen}
      aria-expanded={isOpen}
      aria-label={isOpen ? dict.audioPlayer.closePlayer : dict.audioPlayer.openPlayer}
    >
      <span className={styles.pillEqualizer} aria-hidden="true">
        <span className={styles.equalizerBar} />
        <span className={styles.equalizerBar} />
        <span className={styles.equalizerBar} />
        <span className={styles.equalizerBar} />
      </span>

      <span className={styles.pillLabel}>
        <span className={styles.pillCode}>{currentTrack?.code}</span>
        <span className={styles.pillBpm}>• {currentTrack?.bpm}</span>
      </span>

      <span className={styles.pillPlayIcon} aria-hidden="true">
        {isPlaying ? <Pause size={12} /> : <Play size={12} />}
      </span>
    </button>
  );
}

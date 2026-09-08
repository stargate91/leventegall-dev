"use client";

import styles from "../AudioPlayer.module.css";
import type { AudioTrack } from "@/config/site";
import { useLocale } from "@/locales";

interface AudioPlaylistProps {
  tracks: AudioTrack[];
  currentTrackIndex: number;
  onSelectTrack: (index: number) => void;
}

export default function AudioPlaylist({
  tracks,
  currentTrackIndex,
  onSelectTrack,
}: AudioPlaylistProps) {
  const { dict } = useLocale();

  return (
    <div className={styles.playlistWrapper}>
      <div className={styles.playlistHeader}>
        <span>{dict.audioPlayer.selectTrack}</span>
        <span>{currentTrackIndex + 1} / {tracks.length}</span>
      </div>

      <div className={styles.playlistList} role="listbox" aria-label={dict.audioPlayer.selectTrack}>
        {tracks.map((track, idx) => {
          const isSelected = idx === currentTrackIndex;

          return (
            <button
              key={track.id}
              type="button"
              role="option"
              aria-selected={isSelected}
              className={`${styles.trackItem} ${isSelected ? styles.activeTrackItem : ""}`}
              onClick={() => onSelectTrack(idx)}
            >
              <div className={styles.trackItemLeft}>
                <span className={styles.trackItemCode}>{track.code}</span>
                <span className={styles.trackItemTitle}>{track.title}</span>
              </div>
              <div className={styles.trackItemRight}>
                <span>{track.bpm}</span>
                <span>{track.duration}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

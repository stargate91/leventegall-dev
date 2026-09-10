"use client";

import styles from "../AudioPlayer.module.css";
import { useLocale } from "@/locales";

interface SpectrumVisualizerProps {
  isPlaying: boolean;
}

export default function SpectrumVisualizer({ isPlaying }: SpectrumVisualizerProps) {
  const { dict } = useLocale();

  return (
    <div
      className={styles.expandedVisualizer}
      aria-hidden="true"
    >
      <div className={styles.visualizerHeader}>
        <span className={styles.visualizerTelemetry}>
          SPECTRUM ANALYZER <span className={styles.visualizerBands}>// 16-BAND DSP</span>
        </span>
        <span className={styles.visualizerStatus}>
          <span className={`${styles.statusLed} ${isPlaying ? styles.statusLedActive : ""}`} />
          {isPlaying ? dict.audioPlayer.frequenciesActive : dict.audioPlayer.frequenciesStandby}
        </span>
      </div>

      <div className={styles.visualizerStage}>
        <div className={styles.visualizerGrid}>
          <span className={styles.gridLine} />
          <span className={styles.gridLine} />
          <span className={styles.gridLine} />
        </div>

        <div className={styles.visualizerBars}>
          {Array.from({ length: 16 }, (_, i) => `bar-${i}`).map((barId) => (
            <div key={barId} className={styles.spectrumBarCol}>
              <span className={styles.spectrumBar} />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.frequencyScale}>
        <span>32Hz</span>
        <span>125Hz</span>
        <span>500Hz</span>
        <span>2kHz</span>
        <span>8kHz</span>
        <span>16kHz</span>
      </div>
    </div>
  );
}

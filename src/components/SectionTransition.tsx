import React from "react";
import styles from "./SectionTransition.module.css";

export type TransitionVariant =
  | "bulkhead"
  | "chamferGate"
  | "matrixDivider"
  | "energySeam"
  | "dockingLip"
  | "tron"
  | "chevron";

interface SectionTransitionProps {
  variant: TransitionVariant;
  position: "top" | "bottom";
  fromDeck?: "tone-a" | "tone-b";
  toDeck?: "tone-a" | "tone-b";
  color?: string;
  fillColor?: string;
  height?: number;
  glowColor?: string;
  accentColor?: string;
}

export default function SectionTransition({
  variant,
  position,
  fromDeck = "tone-a",
  toDeck = "tone-b",
  color,
  fillColor: explicitFill,
}: SectionTransitionProps) {
  const containerClass = position === "top" ? styles.containerTop : styles.containerBottom;
  const fillColor = explicitFill || (toDeck === "tone-b" ? "var(--tone-b)" : "var(--tone-a)");
  const fromFill = explicitFill || (fromDeck === "tone-b" ? "var(--tone-b)" : "var(--tone-a)");
  const laser = color || "var(--cyan-tron)";
  const accent = "var(--cyan-core)";

  if (variant === "bulkhead" || variant === "tron") {
    if (position === "top") {
      return (
        <div className={containerClass} aria-hidden="true">
          <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className={styles.svg}>
            <path d="M 0 90 L 0 50 L 360 50 L 460 10 L 980 10 L 1080 50 L 1440 50 L 1440 90 Z" fill={fillColor} />
            <path d="M 0 50 L 360 50 L 460 10 L 980 10 L 1080 50 L 1440 50" fill="none" stroke={laser} strokeWidth="2.5" className={styles.laserGlow} />
            <circle cx="460" cy="10" r="4" fill="var(--color-white)" />
            <circle cx="980" cy="10" r="4" fill="var(--color-white)" />
            <rect x="690" y="6" width="60" height="8" rx="2" fill={accent} />
          </svg>
        </div>
      );
    } else {
      return (
        <div className={containerClass} aria-hidden="true">
          <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className={styles.svg}>
            <path d="M 0 0 L 0 40 L 360 40 L 460 80 L 980 80 L 1080 40 L 1440 40 L 1440 0 Z" fill={fromFill} />
            <path d="M 0 40 L 360 40 L 460 80 L 980 80 L 1080 40 L 1440 40" fill="none" stroke={laser} strokeWidth="2.5" className={styles.laserGlow} />
            <circle cx="460" cy="80" r="4" fill="var(--color-white)" />
            <circle cx="980" cy="80" r="4" fill="var(--color-white)" />
            <rect x="690" y="76" width="60" height="8" rx="2" fill={accent} />
          </svg>
        </div>
      );
    }
  }

  if (variant === "chamferGate" || variant === "chevron") {
    if (position === "top") {
      return (
        <div className={containerClass} aria-hidden="true">
          <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className={styles.svg}>
            <path d="M 0 90 L 0 30 L 220 30 L 280 70 L 1160 70 L 1220 30 L 1440 30 L 1440 90 Z" fill={fillColor} />
            <path d="M 0 30 L 220 30 L 280 70 L 1160 70 L 1220 30 L 1440 30" fill="none" stroke={laser} strokeWidth="2.5" className={styles.laserGlowLarge} />
            <circle cx="280" cy="70" r="4" fill="var(--color-white)" />
            <circle cx="1160" cy="70" r="4" fill="var(--color-white)" />
            <line x1="660" y1="70" x2="780" y2="70" stroke="var(--color-white)" strokeWidth="3" />
          </svg>
        </div>
      );
    } else {
      return (
        <div className={containerClass} aria-hidden="true">
          <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className={styles.svg}>
            <path d="M 0 0 L 0 60 L 220 60 L 280 20 L 1160 20 L 1220 60 L 1440 60 L 1440 0 Z" fill={fromFill} />
            <path d="M 0 60 L 220 60 L 280 20 L 1160 20 L 1220 60 L 1440 60" fill="none" stroke={laser} strokeWidth="2.5" className={styles.laserGlowLarge} />
            <circle cx="280" cy="20" r="4" fill="var(--color-white)" />
            <circle cx="1160" cy="20" r="4" fill="var(--color-white)" />
            <line x1="660" y1="20" x2="780" y2="20" stroke="var(--color-white)" strokeWidth="3" />
          </svg>
        </div>
      );
    }
  }

  if (variant === "matrixDivider") {
    if (position === "top") {
      return (
        <div className={containerClass} aria-hidden="true">
          <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className={styles.svg}>
            <path d="M 0 90 L 0 65 L 480 65 L 560 25 L 880 25 L 960 65 L 1440 65 L 1440 90 Z" fill={fillColor} />
            <path d="M 0 65 L 480 65 L 560 25 L 880 25 L 960 65 L 1440 65" fill="none" stroke={laser} strokeWidth="2.5" className={styles.laserGlowLarge} />
            <circle cx="560" cy="25" r="4" fill="var(--color-white)" />
            <circle cx="880" cy="25" r="4" fill="var(--color-white)" />
          </svg>
        </div>
      );
    } else {
      return (
        <div className={containerClass} aria-hidden="true">
          <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className={styles.svg}>
            <path d="M 0 0 L 0 25 L 480 25 L 560 65 L 880 65 L 960 25 L 1440 25 L 1440 0 Z" fill={fromFill} />
            <path d="M 0 25 L 480 25 L 560 65 L 880 65 L 960 25 L 1440 25" fill="none" stroke={laser} strokeWidth="2.5" className={styles.laserGlowLarge} />
            <circle cx="560" cy="65" r="4" fill="var(--color-white)" />
            <circle cx="880" cy="65" r="4" fill="var(--color-white)" />
          </svg>
        </div>
      );
    }
  }

  if (variant === "energySeam") {
    if (position === "top") {
      return (
        <div className={containerClass} aria-hidden="true">
          <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className={styles.svg}>
            <path d="M 0 90 L 0 45 L 720 15 L 1440 45 L 1440 90 Z" fill={fillColor} />
            <path d="M 0 45 L 720 15 L 1440 45" fill="none" stroke={laser} strokeWidth="2.5" className={styles.laserGlowXLarge} />
            <circle cx="720" cy="15" r="5" fill="var(--color-white)" />
          </svg>
        </div>
      );
    } else {
      return (
        <div className={containerClass} aria-hidden="true">
          <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className={styles.svg}>
            <path d="M 0 0 L 0 45 L 720 75 L 1440 45 L 1440 0 Z" fill={fromFill} />
            <path d="M 0 45 L 720 75 L 1440 45" fill="none" stroke={laser} strokeWidth="2.5" className={styles.laserGlowXLarge} />
            <circle cx="720" cy="75" r="5" fill="var(--color-white)" />
          </svg>
        </div>
      );
    }
  }

  // Default: dockingLip
  if (position === "top") {
    return (
      <div className={containerClass} aria-hidden="true">
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className={styles.svg}>
          <path d="M 0 90 L 0 40 L 1440 40 L 1440 90 Z" fill={fillColor} />
          <line x1="0" y1="40" x2="1440" y2="40" stroke={laser} strokeWidth="2" className={styles.laserGlow} />
        </svg>
      </div>
    );
  } else {
    return (
      <div className={containerClass} aria-hidden="true">
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className={styles.svg}>
          <path d="M 0 0 L 0 50 L 1440 50 L 1440 0 Z" fill={fromFill} />
          <line x1="0" y1="50" x2="1440" y2="50" stroke={laser} strokeWidth="2" className={styles.laserGlow} />
        </svg>
      </div>
    );
  }
}

import React from "react";
import styles from "./DeckDivider.module.css";

interface DeckDividerProps {
  label?: string | undefined;
  maxWidth?: string | undefined;
  margin?: string | undefined;
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
}

/**
 * DeckDivider renders an ultra-precise retrowave laser seam
 * with a center glowing HUD telemetry indicator pip or label.
 */
export default function DeckDivider({
  label,
  maxWidth = "1040px",
  margin = "0 auto",
  className = "",
  style,
}: DeckDividerProps) {
  return (
    <div
      className={`${styles.divider} ${className}`}
      style={{ maxWidth, margin, ...style }}
      aria-hidden="true"
    >
      {label ? (
        <div className={styles.labelWrapper}>
          <span className={styles.labelDot} />
          <span>{label}</span>
        </div>
      ) : (
        <div className={styles.pip} />
      )}
    </div>
  );
}

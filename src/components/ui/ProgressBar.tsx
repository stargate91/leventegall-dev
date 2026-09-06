import React from "react";
import styles from "./ProgressBar.module.css";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  label?: string;
  tag?: string;
  variant?: "cyan" | "green" | "gradient";
  showPercentage?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function ProgressBar({
  value,
  max = 100,
  label,
  tag,
  variant = "cyan",
  showPercentage = false,
  className = "",
  style,
  ...props
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={`${styles.wrapper} ${className}`} style={style} {...props}>
      {(label || tag || showPercentage) && (
        <div className={styles.topRow}>
          {label && <span className={styles.label}>{label}</span>}
          {tag && <span className={styles.tag}>{tag}</span>}
          {showPercentage && !tag && (
            <span className={styles.tag}>{Math.round(percentage)}%</span>
          )}
        </div>
      )}

      <div className={styles.track}>
        <div
          className={`${styles.fill} ${styles[`variant-${variant}`] || ""}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

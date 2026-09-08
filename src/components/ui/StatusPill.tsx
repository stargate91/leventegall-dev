import React from "react";
import styles from "./StatusPill.module.css";
import BeaconDot from "./BeaconDot";
import type { BeaconDotProps } from "./BeaconDot";

export interface StatusPillProps {
  label?: React.ReactNode;
  subLabel?: React.ReactNode;
  items?: React.ReactNode[];
  icon?: React.ReactNode;
  beacon?: boolean;
  beaconColor?: BeaconDotProps["color"];
  beaconSize?: BeaconDotProps["size"];
  size?: "sm" | "md";
  variant?: "surface" | "glass" | "subtle";
  separator?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * StatusPill UI Primitive
 * Displays live status telemetry with optional pulsing beacon dot, icon, and location metadata.
 */
export default function StatusPill({
  label,
  subLabel,
  items,
  icon,
  beacon = false,
  beaconColor = "blue",
  beaconSize = "sm",
  size = "sm",
  variant = "surface",
  separator = "•",
  className = "",
  style,
}: StatusPillProps) {
  const sizeClass = size === "md" ? styles.sizeMd : styles.sizeSm;
  const variantClass = styles[variant] ?? styles.surface;

  const contentItems = items ?? [label, subLabel].filter(Boolean);

  return (
    <div
      className={`${styles.pill} ${sizeClass} ${variantClass} ${className}`.trim()}
      style={style}
    >
      {icon ? (
        <span className={styles.icon}>{icon}</span>
      ) : beacon ? (
        <BeaconDot color={beaconColor} size={beaconSize} />
      ) : null}

      {contentItems.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className={styles.separator}>{separator}</span>}
          <span className={index === 0 ? styles.labelText : styles.subLabelText}>
            {item}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
}

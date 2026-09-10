import React from "react";
import styles from "./BeaconDot.module.css";

export interface BeaconDotProps {
  color?: "accent" | "blue" | "cyan" | "amber" | "green" | "red";
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: React.CSSProperties;
}

export default function BeaconDot({
  color = "accent",
  size = "md",
  className = "",
  style,
}: BeaconDotProps) {
  return (
    <span
      className={`${styles.beacon} ${styles[size]} ${styles[color]} ${className}`.trim()}
      style={style}
      aria-hidden="true"
    />
  );
}

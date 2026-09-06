import React from "react";
import styles from "./BeaconDot.module.css";

export interface BeaconDotProps {
  color?: "cyan" | "green" | "red" | "amber";
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: React.CSSProperties;
}

export default function BeaconDot({
  color = "cyan",
  size = "md",
  className = "",
  style,
}: BeaconDotProps) {
  return (
    <span
      className={`${styles.beacon} ${styles[size]} ${styles[color]} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}

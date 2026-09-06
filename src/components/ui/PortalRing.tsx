import React from "react";
import styles from "./PortalRing.module.css";

export interface PortalRingProps {
  size: string;
  top?: string;
  left?: string;
  reverse?: boolean;
  duration?: string;
  opacity?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function PortalRing({
  size,
  top,
  left,
  reverse = false,
  duration,
  opacity = 0.6,
  className = "",
  style,
}: PortalRingProps) {
  return (
    <div
      className={`${styles.ring} ${reverse ? styles.reverse : ""} ${className}`}
      style={{
        width: size,
        height: size,
        top,
        left,
        opacity,
        ...(duration ? { animationDuration: duration } : {}),
        ...style,
      }}
      aria-hidden="true"
    />
  );
}

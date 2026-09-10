import React from "react";
import styles from "./TelemetryBadge.module.css";
import BeaconDot from "./BeaconDot";

export type TelemetryBadgeVariant = "accent" | "cyan" | "amber" | "subtle" | "solidAccent" | "solidCyan";

export interface TelemetryBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: TelemetryBadgeVariant | undefined;
  beacon?: boolean | undefined;
  beaconColor?: "accent" | "cyan" | "amber" | "green" | "red" | undefined;
  icon?: React.ReactNode | undefined;
  children: React.ReactNode;
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
}

export default function TelemetryBadge({
  variant = "accent",
  beacon = false,
  beaconColor = "accent",
  icon,
  children,
  className = "",
  style,
  ...props
}: TelemetryBadgeProps) {
  return (
    <div
      className={`${styles.badge} ${styles[variant]} ${className}`}
      style={style}
      {...props}
    >
      {beacon && <BeaconDot color={beaconColor} size="sm" />}
      {icon && <span className={styles.iconWrapper}>{icon}</span>}
      <span>{children}</span>
    </div>
  );
}

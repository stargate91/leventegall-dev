import React from "react";
import styles from "./TelemetryBadge.module.css";
import BeaconDot from "./BeaconDot";

export type TelemetryBadgeVariant = "cyan" | "pink" | "purple" | "amber" | "subtle" | "solidCyan" | "solidPink";

export interface TelemetryBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: TelemetryBadgeVariant | undefined;
  beacon?: boolean | undefined;
  beaconColor?: "cyan" | "pink" | "amber" | "green" | "red" | undefined;
  icon?: React.ReactNode | undefined;
  children: React.ReactNode;
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
}

export default function TelemetryBadge({
  variant = "cyan",
  beacon = false,
  beaconColor = "cyan",
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

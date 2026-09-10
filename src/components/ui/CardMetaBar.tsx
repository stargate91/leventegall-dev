import React from "react";
import styles from "./CardMetaBar.module.css";
import TelemetryBadge from "./TelemetryBadge";
import type { TelemetryBadgeVariant } from "./TelemetryBadge";

export interface CardMetaBarProps {
  badge?: React.ReactNode;
  badgeVariant?: TelemetryBadgeVariant;
  telemetry?: string;
  right?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function CardMetaBar({
  badge,
  badgeVariant = "cyan",
  telemetry,
  right,
  className = "",
  style,
}: CardMetaBarProps) {
  const renderBadge = () => {
    if (!badge) {return null;}
    if (typeof badge === "string") {
      return <TelemetryBadge variant={badgeVariant}>{badge}</TelemetryBadge>;
    }
    return badge;
  };

  const renderRight = () => {
    if (right) {return right;}
    if (telemetry) {
      return (
        <div className={styles.telemetryText}>
          <span className={styles.prefix}>//</span>
          <span>{telemetry}</span>
        </div>
      );
    }
    return null;
  };

  const badgeContent = renderBadge();
  const rightContent = renderRight();

  return (
    <div className={`${styles.metaBar} ${className}`.trim()} style={style}>
      {badgeContent && <div className={styles.badgeWrapper}>{badgeContent}</div>}
      {rightContent && <div className={styles.rightWrapper}>{rightContent}</div>}
    </div>
  );
}

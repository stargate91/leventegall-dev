import React from "react";
import styles from "./Stat.module.css";
import Text from "./Text";

export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  value: React.ReactNode;
  label: React.ReactNode;
  variant?: "default" | "card" | "row";
  className?: string;
  style?: React.CSSProperties;
}

export default function Stat({
  icon,
  value,
  label,
  variant = "default",
  className = "",
  style,
  ...props
}: StatProps) {
  if (variant === "row") {
    return (
      <div className={`${styles.statRow} ${className}`} style={style} {...props}>
        <Text as="span" size="sm" tone="secondary" className={styles.rowLabel}>
          {label}
        </Text>
        <Text as="span" font="mono" size="sm" weight="bold" tone="primary" className={styles.rowValue}>
          {value}
        </Text>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div className={`${styles.statCard} ${className}`} style={style} {...props}>
        {icon && <div className={styles.iconWrapper}>{icon}</div>}
        <Text font="mono" size="xl" weight="bold" tone="primary" className={styles.value}>
          {value}
        </Text>
        <Text size="xs" tone="secondary" className={styles.label}>
          {label}
        </Text>
      </div>
    );
  }

  return (
    <div className={`${styles.statItem} ${className}`} style={style} {...props}>
      {icon && <div className={styles.iconWrapper}>{icon}</div>}
      <div className={styles.content}>
        <Text font="mono" size="base" weight="bold" tone="primary" className={styles.value}>
          {value}
        </Text>
        <Text size="xs" tone="secondary" className={styles.label}>
          {label}
        </Text>
      </div>
    </div>
  );
}

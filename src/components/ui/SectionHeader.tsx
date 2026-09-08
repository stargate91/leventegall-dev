import React from "react";
import styles from "./SectionHeader.module.css";
import Text from "./Text";

export interface SectionHeaderProps {
  subtitle: string;
  subtitleIcon?: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function SectionHeader({
  subtitle,
  subtitleIcon,
  title,
  description,
  className = "",
  style,
}: SectionHeaderProps) {
  return (
    <header className={`${styles.header} ${className}`} style={style}>
      <div className={styles.subtitle}>
        {subtitleIcon && <span className={styles.subtitleIcon}>{subtitleIcon}</span>}
        <Text as="span" font="mono" size="xs" tone="cyan" weight="semibold" className={styles.subtitleText}>
          {subtitle}
        </Text>
      </div>
      <Text as="h2" font="heading" size="3xl" weight="bold" tone="primary" className={styles.title}>
        {title}
      </Text>
      {description && (
        <Text as="p" size="base" tone="secondary" leading="relaxed" className={styles.description}>
          {description}
        </Text>
      )}
    </header>
  );
}

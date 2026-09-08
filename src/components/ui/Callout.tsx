import React from "react";
import styles from "./Callout.module.css";
import Text from "./Text";

export interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string | undefined;
  variant?: "dark" | "cyan" | "notice" | undefined;
  icon?: React.ReactNode | undefined;
  action?: React.ReactNode | undefined;
  children: React.ReactNode;
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
}

export default function Callout({
  title,
  variant = "dark",
  icon,
  action,
  children,
  className = "",
  style,
  ...props
}: CalloutProps) {
  return (
    <div
      className={`${styles.callout} ${styles[`variant-${variant}`]} ${className}`}
      style={style}
      {...props}
    >
      <div className={styles.textContainer}>
        {title && (
          <div className={styles.titleRow}>
            {icon && <span>{icon}</span>}
            <Text font="mono" size="xs" weight="bold" tone={variant === "cyan" ? "cyan" : "primary"} uppercase className={styles.title}>
              {title}
            </Text>
          </div>
        )}
        <div className={styles.content}>{children}</div>
      </div>
      {action && <div className={styles.actionContainer}>{action}</div>}
    </div>
  );
}

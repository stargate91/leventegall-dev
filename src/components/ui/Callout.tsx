import React from "react";
import styles from "./Callout.module.css";
import Text from "./Text";

export interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  variant?: "dark" | "cyan" | "notice";
  icon?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
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
      <div>
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
      {action && <div>{action}</div>}
    </div>
  );
}

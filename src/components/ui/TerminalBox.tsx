import React from "react";
import { Terminal } from "lucide-react";
import styles from "./TerminalBox.module.css";

export interface TerminalBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  status?: string;
  statusColor?: "cyan" | "green" | "amber";
  icon?: React.ReactNode;
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function TerminalBox({
  title,
  status,
  statusColor = "cyan",
  icon,
  children,
  actions,
  className = "",
  style,
  ...props
}: TerminalBoxProps) {
  return (
    <div className={`${styles.container} ${className}`} style={style} {...props}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={`${styles.statusDot} ${styles[`status-${statusColor}`] || ""}`} />
          <span className={styles.title}>{title}</span>
        </div>
        <div className={styles.headerRight}>
          {status && <span className={styles.statusText}>[ {status} ]</span>}
          {icon || <Terminal size={14} className={styles.terminalIcon} />}
        </div>
      </div>

      <div className={styles.body}>{children}</div>

      {actions && <div className={styles.footer}>{actions}</div>}
    </div>
  );
}

import React from "react";
import styles from "./Button.module.css";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "telemetry";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
}

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  iconLeft,
  iconRight,
  href,
  target,
  rel,
  children,
  className = "",
  style,
  ...props
}: ButtonProps) {
  const classes = `
    ${styles.button}
    ${styles[variant]}
    ${styles[size]}
    ${fullWidth ? styles.fullWidth : ""}
    ${className}
  `.trim();

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={classes} style={style}>
        {iconLeft && <span className={styles.iconWrapper}>{iconLeft}</span>}
        <span>{children}</span>
        {iconRight && <span className={styles.iconWrapper}>{iconRight}</span>}
      </a>
    );
  }

  return (
    <button className={classes} style={style} {...props}>
      {iconLeft && <span className={styles.iconWrapper}>{iconLeft}</span>}
      <span>{children}</span>
      {iconRight && <span className={styles.iconWrapper}>{iconRight}</span>}
    </button>
  );
}

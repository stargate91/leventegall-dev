import React from "react";
import styles from "./Inline.module.css";

export type InlineGap = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type InlineAlign = "start" | "center" | "end" | "baseline";
export type InlineJustify = "start" | "center" | "end" | "space-between" | "space-around";

export interface InlineProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  gap?: InlineGap;
  align?: InlineAlign;
  justify?: InlineJustify;
  wrap?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function Inline({
  as: Component = "div",
  gap = "md",
  align = "center",
  justify = "start",
  wrap = true,
  fullWidth = false,
  children,
  className = "",
  style,
  ...props
}: InlineProps) {
  const classes = `
    ${styles.inline}
    ${wrap ? styles.wrap : styles.noWrap}
    ${styles[`gap-${gap}`] || ""}
    ${styles[`align-${align}`] || ""}
    ${styles[`justify-${justify}`] || ""}
    ${fullWidth ? styles.fullWidth : ""}
    ${className}
  `.trim();

  return (
    <Component className={classes} style={style} {...props}>
      {children}
    </Component>
  );
}

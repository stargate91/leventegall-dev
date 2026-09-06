import React from "react";
import styles from "./Inline.module.css";

export type InlineGap = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type InlineAlign = "start" | "center" | "end" | "baseline";
export type InlineJustify = "start" | "center" | "end" | "space-between" | "space-around";

export interface InlineProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType | undefined;
  gap?: InlineGap | undefined;
  align?: InlineAlign | undefined;
  justify?: InlineJustify | undefined;
  wrap?: boolean | undefined;
  fullWidth?: boolean | undefined;
  children: React.ReactNode;
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
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

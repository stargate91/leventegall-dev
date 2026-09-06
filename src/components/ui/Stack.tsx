import React from "react";
import styles from "./Stack.module.css";

export type StackGap = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type StackAlign = "start" | "center" | "end" | "stretch";
export type StackJustify = "start" | "center" | "end" | "space-between";

export interface StackProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  gap?: StackGap;
  align?: StackAlign;
  justify?: StackJustify;
  divider?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function Stack({
  as: Component = "div",
  gap = "md",
  align = "stretch",
  justify = "start",
  divider = false,
  fullWidth = false,
  children,
  className = "",
  style,
  ...props
}: StackProps) {
  const classes = `
    ${styles.stack}
    ${styles[`gap-${gap}`] || ""}
    ${styles[`align-${align}`] || ""}
    ${styles[`justify-${justify}`] || ""}
    ${fullWidth ? styles.fullWidth : ""}
    ${className}
  `.trim();

  if (divider) {
    const childrenArray = React.Children.toArray(children).filter(Boolean);
    return (
      <Component className={classes} style={style} {...props}>
        {childrenArray.map((child, index) => (
          <React.Fragment key={index}>
            {child}
            {index < childrenArray.length - 1 && <hr className={styles.divider} />}
          </React.Fragment>
        ))}
      </Component>
    );
  }

  return (
    <Component className={classes} style={style} {...props}>
      {children}
    </Component>
  );
}

import React from "react";
import styles from "./Stack.module.css";

export type StackGap = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type StackAlign = "start" | "center" | "end" | "stretch";
export type StackJustify = "start" | "center" | "end" | "space-between";

export interface StackProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType | undefined;
  gap?: StackGap | undefined;
  align?: StackAlign | undefined;
  justify?: StackJustify | undefined;
  divider?: boolean | undefined;
  fullWidth?: boolean | undefined;
  children: React.ReactNode;
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
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
        {childrenArray.map((child, index) => {
          const key =
            React.isValidElement(child) && child.key !== null && child.key !== undefined
              ? child.key
              : `stack-item-${index}`;
          return (
            <React.Fragment key={key}>
              {child}
              {index < childrenArray.length - 1 && <hr className={styles.divider} />}
            </React.Fragment>
          );
        })}
      </Component>
    );
  }

  return (
    <Component className={classes} style={style} {...props}>
      {children}
    </Component>
  );
}

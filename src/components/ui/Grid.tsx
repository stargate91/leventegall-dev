import React from "react";
import styles from "./Grid.module.css";

export type GridCols = 1 | 2 | 3 | 4 | "auto-fit-240" | "auto-fit-300" | "auto-fit-320";
export type GridGap = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type GridAlign = "start" | "center" | "end" | "stretch";

export interface GridProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  cols?: GridCols;
  gap?: GridGap;
  align?: GridAlign;
  templateColumns?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function Grid({
  as: Component = "div",
  cols = "auto-fit-320",
  gap = "lg",
  align = "stretch",
  templateColumns,
  children,
  className = "",
  style,
  ...props
}: GridProps) {
  const isCustomTemplate = Boolean(templateColumns);

  const classes = `
    ${styles.grid}
    ${!isCustomTemplate ? styles[`cols-${cols}`] || "" : ""}
    ${styles[`gap-${gap}`] || ""}
    ${styles[`align-${align}`] || ""}
    ${className}
  `.trim();

  const customStyle: React.CSSProperties = {
    ...(templateColumns ? { gridTemplateColumns: templateColumns } : {}),
    ...style,
  };

  return (
    <Component className={classes} style={customStyle} {...props}>
      {children}
    </Component>
  );
}

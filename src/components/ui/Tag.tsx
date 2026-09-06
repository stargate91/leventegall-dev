import React from "react";
import styles from "./Tag.module.css";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "subtle" | "cyan" | "outline";
  size?: "sm" | "md";
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

function Tag({
  variant = "subtle",
  size = "sm",
  icon,
  children,
  className = "",
  style,
  ...props
}: TagProps) {
  return (
    <span
      className={`${styles.tag} ${styles[`variant-${variant}`]} ${styles[`size-${size}`]} ${className}`}
      style={style}
      {...props}
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </span>
  );
}

export interface TagListProps extends React.HTMLAttributes<HTMLDivElement> {
  items: string[];
  variant?: "subtle" | "cyan" | "outline";
  size?: "sm" | "md";
  className?: string;
  style?: React.CSSProperties;
}

export function TagList({
  items,
  variant = "subtle",
  size = "sm",
  className = "",
  style,
  ...props
}: TagListProps) {
  return (
    <div className={`${styles.tagList} ${className}`} style={style} {...props}>
      {items.map((item) => (
        <Tag key={item} variant={variant} size={size}>
          {item}
        </Tag>
      ))}
    </div>
  );
}

export default Tag;

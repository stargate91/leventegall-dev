import React from "react";
import styles from "./Tag.module.css";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "subtle" | "cyan" | "outline" | undefined;
  size?: "sm" | "md" | undefined;
  icon?: React.ReactNode | undefined;
  children: React.ReactNode;
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
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
  variant?: "subtle" | "cyan" | "outline" | undefined;
  size?: "sm" | "md" | undefined;
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
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

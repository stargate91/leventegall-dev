import React from "react";
import { Check } from "lucide-react";
import styles from "./CheckList.module.css";

export interface CheckItemProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md";
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function CheckItem({
  size = "md",
  icon,
  children,
  className = "",
  style,
  ...props
}: CheckItemProps) {
  return (
    <div
      className={`${styles.checkItem} ${styles[`size-${size}`]} ${className}`}
      style={style}
      {...props}
    >
      <div className={styles.iconWrapper}>
        {icon || <Check size={size === "sm" ? 14 : 16} />}
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

export interface CheckListProps extends React.HTMLAttributes<HTMLDivElement> {
  items: React.ReactNode[];
  size?: "sm" | "md";
  gap?: "xs" | "sm" | "md";
  className?: string;
  style?: React.CSSProperties;
}

function CheckList({
  items,
  size = "md",
  gap = "sm",
  className = "",
  style,
  ...props
}: CheckListProps) {
  return (
    <div
      className={`${styles.checkList} ${styles[`gap-${gap}`]} ${className}`}
      style={style}
      {...props}
    >
      {items.map((item, index) => {
        const key =
          typeof item === "string" || typeof item === "number"
            ? String(item)
            : React.isValidElement(item) && item.key !== null && item.key !== undefined
              ? String(item.key)
              : `chk-${index}`;
        return (
          <CheckItem key={key} size={size}>
            {item}
          </CheckItem>
        );
      })}
    </div>
  );
}

export default CheckList;

"use client";

import React from "react";
import styles from "./SegmentedControl.module.css";

export interface SegmentedControlOption<T extends string = string> {
  value: T;
  label: React.ReactNode;
  icon?: React.ReactNode;
  ariaLabel?: string;
}

export interface SegmentedControlProps<T extends string = string> {
  options: SegmentedControlOption<T>[];
  value: T;
  onChange: (value: T) => void;
  size?: "sm" | "md";
  fullWidth?: boolean;
  className?: string;
  ariaLabel?: string;
  style?: React.CSSProperties;
}

/**
 * SegmentedControl UI Primitive
 * Highly accessible, tokenized button-group segmented pill control.
 */
export default function SegmentedControl<T extends string = string>({
  options,
  value,
  onChange,
  size = "sm",
  fullWidth = false,
  className = "",
  ariaLabel,
  style,
}: SegmentedControlProps<T>) {
  const sizeClass = size === "md" ? styles.sizeMd : styles.sizeSm;
  const widthClass = fullWidth ? styles.fullWidth : "";

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={`${styles.container} ${sizeClass} ${widthClass} ${className}`.trim()}
      style={style}
    >
      {options.map((option) => {
        const isSelected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={option.ariaLabel}
            onClick={() => onChange(option.value)}
            className={`${styles.item} ${isSelected ? styles.active : ""}`}
          >
            {option.icon && <span className={styles.icon}>{option.icon}</span>}
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}

import React from "react";
import styles from "./Input.module.css";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  telemetryTag?: string;
  hint?: string;
  error?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  containerClassName?: string;
}

export default function Input({
  id,
  label,
  telemetryTag,
  hint,
  error,
  iconLeft,
  iconRight,
  containerClassName = "",
  className = "",
  style,
  ...props
}: InputProps) {
  const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);

  return (
    <div className={`${styles.wrapper} ${containerClassName}`} style={style}>
      {label && (
        <div className={styles.labelRow}>
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
          {telemetryTag && <span className={styles.telemetryTag}>{telemetryTag}</span>}
        </div>
      )}

      <div className={styles.inputContainer}>
        {iconLeft && <div className={styles.iconLeft}>{iconLeft}</div>}
        <input
          id={inputId}
          className={`
            ${styles.input}
            ${iconLeft ? styles.withIconLeft : ""}
            ${iconRight ? styles.withIconRight : ""}
            ${error ? styles.inputError : ""}
            ${className}
          `.trim()}
          {...props}
        />
        {iconRight && <div className={styles.iconRight}>{iconRight}</div>}
      </div>

      {error && <div className={styles.errorText}>{error}</div>}
      {hint && !error && <div className={styles.hintText}>{hint}</div>}
    </div>
  );
}

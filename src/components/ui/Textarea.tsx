import React from "react";
import styles from "./Textarea.module.css";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  telemetryTag?: string;
  hint?: string;
  error?: string;
  containerClassName?: string;
}

export default function Textarea({
  id,
  label,
  telemetryTag,
  hint,
  error,
  containerClassName = "",
  className = "",
  style,
  ...props
}: TextareaProps) {
  const textareaId = id || (label ? `textarea-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);

  return (
    <div className={`${styles.wrapper} ${containerClassName}`} style={style}>
      {label && (
        <div className={styles.labelRow}>
          <label htmlFor={textareaId} className={styles.label}>
            {label}
          </label>
          {telemetryTag && <span className={styles.telemetryTag}>{telemetryTag}</span>}
        </div>
      )}

      <textarea
        id={textareaId}
        className={`
          ${styles.textarea}
          ${error ? styles.textareaError : ""}
          ${className}
        `.trim()}
        {...props}
      />

      {error && <div className={styles.errorText}>{error}</div>}
      {hint && !error && <div className={styles.hintText}>{hint}</div>}
    </div>
  );
}

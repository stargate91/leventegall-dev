import React from "react";
import styles from "./Textarea.module.css";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string | undefined;
  telemetryTag?: string | undefined;
  hint?: string | undefined;
  error?: string | undefined;
  containerClassName?: string | undefined;
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
  const errorId = error && textareaId ? `${textareaId}-error` : undefined;

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
        aria-invalid={Boolean(error)}
        aria-describedby={errorId || props["aria-describedby"]}
        className={`
          ${styles.textarea}
          ${error ? styles.textareaError : ""}
          ${className}
        `.trim()}
        {...props}
      />

      {error && (
        <div id={errorId} role="alert" className={styles.errorText}>
          {error}
        </div>
      )}
      {hint && !error && <div className={styles.hintText}>{hint}</div>}
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Copy, Checkmark } from "@carbon/icons-react";
import styles from "./CopySnippet.module.css";
import Tooltip from "./Tooltip";

export interface CopySnippetProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function CopySnippet({
  text,
  label = "COPY",
  copiedLabel = "COPIED",
  className = "",
  style,
  ...props
}: CopySnippetProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`${styles.copyBox} ${className}`} style={style} {...props}>
      <span className={styles.text}>{text}</span>
      <Tooltip content={copied ? "Copied to clipboard!" : "Copy to clipboard"} side="top">
        <button
          type="button"
          onClick={handleCopy}
          className={`${styles.copyBtn} ${copied ? styles.copied : ""}`}
        >
          {copied ? <Checkmark size={14} /> : <Copy size={14} />}
          <span>{copied ? copiedLabel : label}</span>
        </button>
      </Tooltip>
    </div>
  );
}

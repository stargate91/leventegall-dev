import React from "react";
import styles from "./HudCard.module.css";

export interface HudCardProps {
  id?: string;
  variant?: "surface" | "surfaceDeck" | "elevated" | "transparent";
  corners?: boolean;
  glowHover?: boolean;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function HudCard({
  id,
  variant = "surface",
  corners = true,
  glowHover = true,
  children,
  className = "",
  style,
}: HudCardProps) {
  const classes = `
    ${styles.card}
    ${styles[variant]}
    ${corners ? styles.corners : ""}
    ${glowHover ? styles.glowHover : ""}
    ${className}
  `.trim();

  return (
    <div id={id} className={classes} style={style}>
      {children}
    </div>
  );
}

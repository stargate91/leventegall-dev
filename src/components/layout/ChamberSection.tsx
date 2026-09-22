import React from "react";
import styles from "./ChamberSection.module.css";
import type { TransitionVariant } from "@/components/SectionTransition";
import SectionTransition from "@/components/SectionTransition";

interface ChamberSectionProps {
  id?: string;
  tone: "grid" | "deck" | "soft";
  topTransition?: TransitionVariant;
  bottomTransition?: TransitionVariant;
  transitionHeight?: number;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  bodyClassName?: string;
  bodyStyle?: React.CSSProperties;
}

export default function ChamberSection({
  id,
  tone,
  topTransition,
  bottomTransition,
  transitionHeight = 90,
  children,
  className = "",
  style,
  bodyClassName = "",
  bodyStyle,
}: ChamberSectionProps) {
  if (tone === "deck") {
    return (
      <section
        id={id}
        className={`${styles.chamberDeckModule} ${className}`}
        style={style}
      >
        {/* Top Geometric Shape Cap */}
        {topTransition && (
          <SectionTransition
            position="top"
            variant={topTransition}
            fillColor="var(--tone-b)"
            height={transitionHeight}
          />
        )}

        {/* Deck Chamber Body */}
        <div className={`${styles.chamberDeckBody} ${bodyClassName}`} style={bodyStyle}>
          {children}
        </div>

        {/* Bottom Inverted Geometric Shape Cap */}
        {bottomTransition && (
          <SectionTransition
            position="bottom"
            variant={bottomTransition}
            fillColor="var(--tone-b)"
            height={transitionHeight}
          />
        )}
      </section>
    );
  }

  // tone === "grid" (Transparent layer over the living Tron 3D Vector Grid)
  return (
    <section
      id={id}
      className={`${styles.chamberToneA} ${tone === "soft" ? styles.soft : ""} ${className}`}
      style={style}
    >
      {children}
    </section>
  );
}

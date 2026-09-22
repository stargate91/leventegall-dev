"use client";

import { useEffect, useRef } from "react";
import { Code, Calculation, Flash } from "@carbon/icons-react";
import styles from "./Hero.module.css";
import {
  HudCard,
  Stat,
  Text,
} from "@/components/ui";
import { useLocale } from "@/locales";

export default function Hero() {
  const glowRef = useRef<HTMLDivElement>(null);
  const { dict } = useLocale();

  useEffect(() => {
    // Only bind mouse tracking on devices with a fine pointer (desktop mouse)
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    let rafId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId !== null) {
        return;
      }

      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        if (!glowRef.current) {
          return;
        }
        const { innerWidth, innerHeight } = window;
        const x = (((e.clientX / innerWidth) * 2 - 1) * 20).toFixed(2);
        const y = (((e.clientY / innerHeight) * 2 - 1) * 20).toFixed(2);
        glowRef.current.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <div className={styles.hero}>
      {/* Background Luminescent Core Glow */}
      <div
        ref={glowRef}
        className={styles.coreGlow}
        aria-hidden="true"
      />

      {/* Organic Borderless Dark Ambient Glow Behind Text */}
      <div className={styles.textBackdropGlow} aria-hidden="true" />

      <div className={`section-container ${styles.content}`}>
        {/* Hero Title */}
        <h1 className={styles.title}>
          <span className={styles.titleMain}>{dict.hero.titleMain}</span>
          <span className={styles.titleGradient}>{dict.hero.titleGradient}</span>
        </h1>

        {/* Human, Concise Narrative */}
        <Text
          as="p"
          tone="secondary"
          size="lg"
          leading="relaxed"
          className={styles.description}
        >
          {dict.hero.description}
        </Text>

        {/* Key Credibility Numbers Strip */}
        <HudCard variant="surface" className={styles.telemetryStrip}>
          <Stat
            icon={<Code size={20} />}
            value={dict.hero.stats.stackValue}
            label={dict.hero.stats.stackLabel}
          />

          <Stat
            icon={<Calculation size={20} />}
            value={dict.hero.stats.physicsValue}
            label={dict.hero.stats.physicsLabel}
          />

          <Stat
            icon={<Flash size={20} />}
            value={dict.hero.stats.fiverrValue}
            label={dict.hero.stats.fiverrLabel}
          />
        </HudCard>
      </div>
    </div>
  );
}

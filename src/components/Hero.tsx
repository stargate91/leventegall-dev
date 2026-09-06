"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Code2, Orbit, Atom, Zap } from "lucide-react";
import styles from "./Hero.module.css";
import {
  Button,
  HudCard,
  TelemetryBadge,
  Stat,
  Inline,
  Text,
  Tooltip,
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
    <section id="hero" className={styles.hero}>
      {/* Background Tron Luminescent Core Glow */}
      <div
        ref={glowRef}
        className={styles.coreGlow}
        aria-hidden="true"
      />

      {/* Tron Light Ribbon Laser Horizon Trails */}
      <div className={styles.lightRibbonContainer} aria-hidden="true">
        <div className={styles.ribbonPrimary}>
          <div className={styles.photonPulsePrimary} />
        </div>
      </div>

      <div className={`section-container ${styles.content}`}>
        {/* Top Tag */}
        <Tooltip content={dict.hero.badgeTooltip} side="bottom" variant="cyan">
          <TelemetryBadge
            variant="cyan"
            beacon={false}
            className={styles.hudPill}
          >
            <Text as="span" font="mono" tone="cyan" weight="bold" className={styles.tronGlyph}>
              {dict.hero.badgeGlyph}
            </Text>
            <Text as="span" font="mono" size="xs" tone="primary">
              {dict.hero.badgeText}
            </Text>
          </TelemetryBadge>
        </Tooltip>

        {/* Hero Title */}
        <h1 className={styles.title}>
          <span className={styles.titleMain}>{dict.hero.titleMain}</span>
          <span className={styles.titleGradient}>{dict.hero.titleGradient}</span>
        </h1>

        {/* Grounded, Human Narrative */}
        <Text
          as="p"
          tone="secondary"
          size="lg"
          leading="relaxed"
          className={styles.description}
        >
          {dict.hero.descriptionLead}{" "}
          <Text as="strong" tone="primary" weight="bold">
            {dict.hero.descriptionPhysics}
          </Text>{" "}
          and over{" "}
          <Text as="strong" tone="cyan" weight="bold">
            {dict.hero.descriptionFiverr}
          </Text>
          {dict.hero.descriptionTail}
        </Text>

        {/* Call to Actions */}
        <Inline gap="md" justify="center" className={styles.buttonGroup}>
          <Button
            variant="primary"
            size="md"
            href="#projects"
            id="hero-cta-projects"
            iconRight={<ArrowRight size={16} />}
          >
            {dict.hero.ctaProjects}
          </Button>

          <Button
            variant="secondary"
            size="md"
            href="#services"
            id="hero-cta-packages"
            iconLeft={<Orbit size={16} />}
          >
            {dict.hero.ctaServices}
          </Button>
        </Inline>

        {/* Highlights Strip */}
        <HudCard variant="surface" className={styles.telemetryStrip}>
          <Stat
            icon={<Zap size={20} />}
            value={dict.hero.stats.fiverrValue}
            label={dict.hero.stats.fiverrLabel}
          />

          <Stat
            icon={<Code2 size={20} />}
            value={dict.hero.stats.stackValue}
            label={dict.hero.stats.stackLabel}
          />

          <Stat
            icon={<Atom size={20} />}
            value={dict.hero.stats.physicsValue}
            label={dict.hero.stats.physicsLabel}
          />
        </HudCard>
      </div>
    </section>
  );
}

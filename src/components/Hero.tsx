"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Code2, Orbit, Atom, Zap } from "lucide-react";
import styles from "./Hero.module.css";
import {
  Button,
  HudCard,
  TelemetryBadge,
  Stat,
  Inline,
  Text,
} from "@/components/ui";

export default function Hero() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setCoords({
        x: Number(((e.clientX / innerWidth) * 2 - 1).toFixed(2)),
        y: Number(((e.clientY / innerHeight) * 2 - 1).toFixed(2)),
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section id="hero" className={styles.hero}>
      {/* Background Tron Luminescent Core Glow */}
      <div
        className={styles.coreGlow}
        style={{
          transform: `translate(-50%, -50%) translate(${coords.x * 20}px, ${coords.y * 20}px)`,
        }}
        aria-hidden="true"
      />

      {/* Tron Light Ribbon Laser Horizon Trails */}
      <div className={styles.lightRibbonContainer} aria-hidden="true">
        <div className={styles.ribbonPrimary}>
          <div className={styles.photonPulsePrimary} />
        </div>
        <div className={styles.ribbonSecondary}>
          <div className={styles.photonPulseSecondary} />
        </div>
      </div>

      <div className={`section-container ${styles.content}`}>
        {/* Top Tag */}
        <TelemetryBadge
          variant="cyan"
          beacon={false}
          className={styles.hudPill}
        >
          <Text as="span" font="mono" tone="cyan" weight="bold" className={styles.tronGlyph}>
            [ // ]
          </Text>
          <Text as="span" font="mono" size="xs" tone="primary">
            LEVENTE GÁLL • FULL-STACK DEVELOPER &amp; BRAND STRATEGIST
          </Text>
        </TelemetryBadge>

        {/* Hero Title */}
        <h1 className={styles.title}>
          <span className={styles.titleMain}>CLEAN CODE ARCHITECTURE.</span>
          <span className={styles.titleGradient}>SHARP BRAND IDENTITY.</span>
        </h1>

        {/* Grounded, Human Narrative */}
        <Text
          as="p"
          tone="secondary"
          size="lg"
          leading="relaxed"
          className={styles.description}
        >
          I build robust full-stack web applications and help startups find their voice.
          With a background in{" "}
          <Text as="strong" tone="primary" weight="bold">
            Physics at ELTE
          </Text>{" "}
          and over{" "}
          <Text as="strong" tone="cyan" weight="bold">
            1,100 clients served on Fiverr
          </Text>
          , I connect dependable backend systems (Python, FastAPI, React) with clear, high-converting messaging that people actually remember.
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
            View Projects &amp; Code
          </Button>

          <Button
            variant="secondary"
            size="md"
            href="#services"
            id="hero-cta-packages"
            iconLeft={<Orbit size={16} />}
          >
            Services &amp; Working Together
          </Button>
        </Inline>

        {/* Highlights Strip */}
        <HudCard variant="surface" className={styles.telemetryStrip}>
          <Stat
            icon={<Zap size={20} />}
            value="1,100+ Clients • 5.0★"
            label="400+ Verified 5-Star Reviews on Fiverr"
          />

          <Stat
            icon={<Code2 size={20} />}
            value="Full-Stack Development"
            label="FastAPI, Python, React &amp; TypeScript"
          />

          <Stat
            icon={<Atom size={20} />}
            value="Analytical Physics Mindset"
            label="ELTE Physics / Problem Solving"
          />
        </HudCard>
      </div>
    </section>
  );
}

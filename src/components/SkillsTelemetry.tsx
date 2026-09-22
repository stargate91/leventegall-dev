"use client";

import React from "react";
import {
  Code,
  DataBase,
  ApplicationWeb,
  DataStructured,
  Tools,
  Screen,
  Calculation,
  Pen,
  Terminal,
  LogoPython,
  LogoReact,
} from "@carbon/icons-react";
import styles from "./SkillsTelemetry.module.css";
import {
  SectionHeader,
  HudCard,
  TagList,
  Text,
} from "@/components/ui";
import { getSkillCategories } from "@/data/skills";
import { useLocale } from "@/locales";

function getCategoryIcon(id: string) {
  switch (id) {
    case "languages":
      return <Code size={18} aria-hidden="true" />;
    case "backend":
      return <DataBase size={18} aria-hidden="true" />;
    case "frontend":
      return <ApplicationWeb size={18} aria-hidden="true" />;
    case "database":
      return <DataStructured size={18} aria-hidden="true" />;
    case "devops":
      return <Tools size={18} aria-hidden="true" />;
    case "desktop":
      return <Screen size={18} aria-hidden="true" />;
    case "mathematics":
      return <Calculation size={18} aria-hidden="true" />;
    case "branding":
      return <Pen size={18} aria-hidden="true" />;
    default:
      return <Code size={18} aria-hidden="true" />;
  }
}

export default function SkillsTelemetry() {
  const { dict } = useLocale();
  const allCategories = getSkillCategories(dict);
  const categories = [
    ...allCategories.filter((cat) => cat.id === "backend" || cat.id === "frontend"),
    ...allCategories.filter((cat) => cat.id !== "backend" && cat.id !== "frontend"),
  ];

  return (
    <div className={`section-container ${styles.section}`}>
      {/* Section Header */}
      <SectionHeader
        subtitle={dict.skills.subtitle}
        subtitleIcon={<Terminal size={14} />}
        title={dict.skills.title}
        description={dict.skills.description}
      />

      {/* Categories Grid */}
      <div className={styles.categoriesGrid} data-testid="skills-categories-grid">
        {categories.map((cat) => (
          <HudCard
            key={cat.id}
            className={`${styles.categoryCard} ${cat.id === "backend" || cat.id === "frontend" ? styles.featured : ""}`}
            corners={cat.id === "backend" || cat.id === "frontend"}
          >
            {(cat.id === "backend" || cat.id === "frontend") && (
              <div className={styles.technologyMarks}>
                {cat.id === "backend" ? (
                  <LogoPython size={44} role="img" aria-label="Python" />
                ) : (
                  <>
                    <LogoReact size={44} role="img" aria-label="React" />
                    <span className={styles.typeScriptMark} role="img" aria-label="TypeScript">TS</span>
                  </>
                )}
              </div>
            )}
            <div className={styles.cardHeader}>
              <div className={styles.iconBox}>
                {getCategoryIcon(cat.id)}
              </div>
              <div className={styles.headerInfo}>
                <Text as="h3" font="heading" size="base" weight="bold" tone="primary" className={styles.categoryTitle}>
                  {cat.title}
                </Text>
                <Text as="p" size="sm" tone="secondary" leading="relaxed" className={styles.categoryDesc}>
                  {cat.description}
                </Text>
              </div>
            </div>

            <div className={styles.cardDivider} aria-hidden="true" />

            <div className={styles.cardBody}>
              <TagList items={cat.skills} variant="cyan" size="sm" />
            </div>
          </HudCard>
        ))}
      </div>
    </div>
  );
}

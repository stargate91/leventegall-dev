"use client";

import React from "react";
import {
  Code,
  DataBase,
  ApplicationWeb,
  DataStructured,
  Tools,
  Screen,
  Pen,
  Terminal,
} from "@carbon/icons-react";
import styles from "./SkillsTelemetry.module.css";
import {
  SectionHeader,
  HudCard,
  TagList,
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
    case "branding":
      return <Pen size={18} aria-hidden="true" />;
    default:
      return <Code size={18} aria-hidden="true" />;
  }
}

export default function SkillsTelemetry() {
  const { dict } = useLocale();
  const categories = getSkillCategories(dict);

  return (
    <div className="section-container">
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
            className={styles.categoryCard}
          >
            <div className={styles.cardHeader}>
              <div className={styles.iconBox}>
                {getCategoryIcon(cat.id)}
              </div>
              <div className={styles.headerInfo}>
                <h3 className={styles.categoryTitle}>{cat.title}</h3>
                <p className={styles.categoryDesc}>{cat.description}</p>
              </div>
            </div>

            <div className={styles.cardDivider} />

            <div className={styles.cardBody}>
              <TagList items={cat.skills} variant="cyan" size="sm" />
            </div>
          </HudCard>
        ))}
      </div>
    </div>
  );
}

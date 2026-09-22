"use client";

import { Launch } from "@carbon/icons-react";
import styles from "./ProjectItemCard.module.css";
import ProjectGallery from "./ProjectGallery";
import type { ProjectData } from "@/data/projects";
import {
  HudCard,
  CardMetaBar,
  Button,
  Stat,
  TagList,
  Inline,
  Stack,
  Grid,
  Text,
} from "@/components/ui";
import { useLocale } from "@/locales";

interface ProjectItemCardProps {
  project: ProjectData;
}

export default function ProjectItemCard({ project }: ProjectItemCardProps) {
  const { dict } = useLocale();
  const featured = project.id === "swaya";
  const displayName = project.id === "pill-player" ? "Pill Player" : project.id === "nova" ? "Nova" : "Swaya";
  const summary = project.id === "nova"
    ? dict.projects.novaSummary
    : project.id === "pill-player"
      ? dict.projects.pillPlayerSummary
      : project.description;

  return (
    <HudCard
      id={`project-${project.id}`}
      variant="surface"
      className={`${styles.projectCard} ${featured ? styles.featured : ""} ${project.id === "nova" ? styles.nova : ""}`}
    >
      {/* Modular Top Meta Bar */}
      <CardMetaBar
        badge={project.badge}
        telemetry={dict.projects.labels.appOverview}
      />

      {/* Main Two-Column Layout */}
      <div className={styles.mainGrid}>
        {/* Left Column: Authentic Info, Description, Stack & Metrics */}
        <Stack gap="md">
          <div>
            <Text as="h3" font="heading" size="2xl" weight="bold" tone="primary" className={styles.projectTitle}>
              {displayName}
            </Text>
            <Text size="sm" weight="medium" tone="cyan" className={styles.projectTagline}>
              {project.tagline}
            </Text>
          </div>

          <Text as="p" size="sm" tone="secondary" leading="relaxed" className={styles.projectDesc}>
            {featured ? dict.projects.featuredOutcome : summary}
          </Text>

          {/* Technology TagList Primitive */}
          <TagList items={project.primaryStack} variant="subtle" size="sm" className={styles.stackList} />

          {/* Impact Metrics Grid */}
          <Grid cols={3} gap="sm" className={styles.metricsGrid}>
            {project.impactMetrics.map((metric) => (
              <Stat
                key={metric.label}
                variant="card"
                value={metric.value}
                label={metric.label}
              />
            ))}
          </Grid>

          {/* Links */}
          <Inline gap="md" className={styles.projectActions}>
            {project.liveUrl && (
              <Button
                variant="primary"
                size="sm"
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                iconRight={<Launch size={14} />}
              >
                {dict.projects.labels.visitWebsite}
              </Button>
            )}
            {project.id === "swaya" && (
              <Button
                variant="secondary"
                size="sm"
                href="/projects/swaya"
              >
                {dict.projects.labels.caseStudy}
              </Button>
            )}
            <Button
              variant="secondary"
              size="sm"
              href="#contact"
            >
              {dict.projects.labels.discussWork}
            </Button>
          </Inline>
        </Stack>

        {/* Right Column: Previews & Gallery */}
        <div className={styles.galleryColumn}>
          {project.screenshots && project.screenshots.length > 0 && (
            <ProjectGallery
              items={project.screenshots}
              layout={featured ? "showcase" : "featured"}
              priorityFirst={false}
              previewCaption={`${project.title} Preview`}
            />
          )}
        </div>
      </div>
    </HudCard>
  );
}

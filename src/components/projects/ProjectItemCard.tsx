"use client";

import { ArrowRight, Launch } from "@carbon/icons-react";
import styles from "./ProjectItemCard.module.css";
import ProjectGallery from "./ProjectGallery";
import type { ProjectData } from "@/data/projects";
import {
  HudCard,
  TelemetryBadge,
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

  return (
    <HudCard
      id={`project-${project.id}`}
      variant="surface"
      className={styles.projectCard}
    >
      {/* Top Meta Bar */}
      <div className={styles.topBar}>
        <TelemetryBadge variant="cyan">
          {project.badge}
        </TelemetryBadge>

        <div className={styles.overviewText}>
          <span className={styles.overviewPrefix}>//</span>
          <span>{dict.projects.labels.appOverview}</span>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className={styles.mainGrid}>
        {/* Left Column: Authentic Info, Description, Stack & Metrics */}
        <Stack gap="md">
          <div>
            <Text as="h3" font="heading" size="2xl" weight="bold" tone="primary" className={styles.projectTitle}>
              {project.title}
            </Text>
            <Text size="sm" weight="medium" tone="cyan" className={styles.projectTagline}>
              {project.tagline}
            </Text>
          </div>

          <Text as="p" size="sm" tone="secondary" leading="relaxed" className={styles.projectDesc}>
            {project.description}
          </Text>

          {/* Technology TagList Primitive */}
          <TagList items={project.stack} variant="subtle" size="sm" className={styles.stackList} />

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
          <Inline gap="md">
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
            {project.githubUrl && (
              <Button
                variant={project.liveUrl ? "secondary" : "primary"}
                size="sm"
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                iconRight={<ArrowRight size={14} />}
              >
                {dict.projects.labels.viewGithub}
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
              previewCaption={`${project.title} Preview`}
            />
          )}
        </div>
      </div>
    </HudCard>
  );
}

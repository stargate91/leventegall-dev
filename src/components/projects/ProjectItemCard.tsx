"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { ArrowRight } from "@carbon/icons-react";
import styles from "../ProjectCard.module.css";
import type { ProjectData } from "@/data/projects";

const SwayaSimulator = dynamic(() => import("./SwayaSimulator"), {
  loading: () => <div className={styles.simulatorSkeleton}>[ INITIALIZING FASTAPI TASK QUEUE... ]</div>,
});
const IrisSimulator = dynamic(() => import("./IrisSimulator"), {
  loading: () => <div className={styles.simulatorSkeleton}>[ CONNECTING DISCORD STREAM... ]</div>,
});
const AetheriaSimulator = dynamic(() => import("./AetheriaSimulator"), {
  loading: () => <div className={styles.simulatorSkeleton}>[ LOADING BRAND MATRIX ENGINE... ]</div>,
});
import {
  HudCard,
  TelemetryBadge,
  Button,
  SegmentedControl,
  Stat,
  TagList,
  Callout,
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
  const [currTab, setCurrTab] = useState<"overview" | "architecture" | "interactive">("interactive");
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

        {/* Standard SegmentedControl UI Primitive */}
        <SegmentedControl<"interactive" | "overview" | "architecture">
          value={currTab}
          onChange={(val) => setCurrTab(val)}
          options={[
            { value: "interactive", label: dict.projects.tabs.interactive },
            { value: "overview", label: dict.projects.tabs.overview },
            { value: "architecture", label: dict.projects.tabs.architecture },
          ]}
          size="sm"
        />
      </div>

      {/* Main Two-Column Layout */}
      <div className={styles.mainGrid}>
        {/* Left Column */}
        <Stack gap="md">
          <div>
            <Text font="mono" size="2xs" tone="cyan" weight="semibold" className="font-telemetry">
              {dict.projects.labels.stack} {project.codename}
            </Text>
            <Text as="h3" font="heading" size="2xl" weight="bold" tone="primary" className={styles.projectTitle}>
              {project.title}
            </Text>
            <Text size="sm" weight="medium" tone="cyan" className={styles.projectTagline}>
              {project.tagline}
            </Text>
          </div>

          {currTab === "overview" && (
            <Stack gap="md">
              <Text as="p" size="sm" tone="secondary" leading="relaxed" className={styles.projectDesc}>
                {project.description}
              </Text>
              <Grid cols={2} gap="md" className={styles.metaGrid}>
                <Stat variant="card" label={dict.projects.labels.role} value={project.role} />
                <Stat variant="card" label={dict.projects.labels.timeline} value={project.duration} />
              </Grid>
            </Stack>
          )}

          {currTab === "architecture" && (
            <Stack gap="md">
              <Callout title={dict.projects.labels.challenge} variant="dark">
                {project.challenge}
              </Callout>

              <Callout title={dict.projects.labels.solution} variant="cyan">
                {project.solution}
              </Callout>
            </Stack>
          )}

          {currTab === "interactive" && (
            <Text as="p" size="sm" tone="secondary" leading="relaxed" className={styles.projectDesc}>
              {project.description}
            </Text>
          )}

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
            <Button
              variant="primary"
              size="sm"
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              iconRight={<ArrowRight size={14} />}
            >
              {dict.projects.labels.viewGithub}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              href="#contact"
            >
              {dict.projects.labels.discussWork}
            </Button>
          </Inline>
        </Stack>

        {/* Right Column: Interactive Simulators */}
        <div>
          {project.demoType === "swaya" && <SwayaSimulator />}
          {project.demoType === "iris" && <IrisSimulator />}
          {project.demoType === "branding" && <AetheriaSimulator />}
        </div>
      </div>
    </HudCard>
  );
}

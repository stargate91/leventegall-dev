"use client";

import { Layers } from "@carbon/icons-react";
import styles from "./ProjectCard.module.css";
import ProjectItemCard from "./projects/ProjectItemCard";
import { SectionHeader, Stack } from "@/components/ui";
import { getProjectsData } from "@/data/projects";
import { useLocale } from "@/locales";

export default function ProjectCard() {
  const { dict } = useLocale();
  const projectsData = getProjectsData(dict);

  return (
    <div className="section-container">
      {/* Header */}
      <SectionHeader
        subtitle={dict.projects.subtitle}
        subtitleIcon={<Layers size={14} />}
        title={dict.projects.title}
        description={dict.projects.description}
      />

      {/* Projects List */}
      <Stack gap="xl" className={styles.projectList}>
        {projectsData.map((project) => (
          <ProjectItemCard key={project.id} project={project} />
        ))}
      </Stack>
    </div>
  );
}

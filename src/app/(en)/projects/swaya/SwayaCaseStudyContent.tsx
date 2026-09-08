"use client";

import Link from "next/link";
import {
  Launch,
  ArrowLeft,
  Code,
  Folders,
  ViewOff,
  Play,
} from "@carbon/icons-react";
import styles from "./page.module.css";
import PageLayout from "@/components/layout/PageLayout";
import ProjectGallery from "@/components/projects/ProjectGallery";
import {
  HudCard,
  CardMetaBar,
  TelemetryBadge,
  Button,
  TagList,
  Stat,
  Grid,
  Text,
} from "@/components/ui";
import { useLocale } from "@/locales";

export default function SwayaCaseStudyContent() {
  const { dict } = useLocale();
  const cs = dict.swayaCaseStudy;

  const stack = [
    "FastAPI",
    "Python",
    "Electron",
    "React",
    "Vite",
    "JavaScript",
    "SQLAlchemy",
    "SQLite",
    "Alembic",
    "TanStack Query",
    "Zustand",
    "MPV IPC",
  ];

  const screenshots = [
    {
      id: "organizer",
      src: "/projects/swaya/organizer.webp",
      title: dict.projects.simulators.swayaOrganizerShot,
    },
    {
      id: "library",
      src: "/projects/swaya/library.webp",
      title: dict.projects.simulators.swayaLibraryShot,
    },
    {
      id: "detail",
      src: "/projects/swaya/detail.webp",
      title: dict.projects.simulators.swayaDetailShot,
    },
  ];

  return (
    <PageLayout>
      <div className={styles.container}>
        {/* Semantic Breadcrumbs Bar */}
        <nav aria-label="Breadcrumbs" className={styles.breadcrumbs}>
          <Link href="/" className={styles.breadcrumbLink}>
            {cs.breadcrumbs.home}
          </Link>
          <span className={styles.breadcrumbSep}>/</span>
          <Link href="/#projects" className={styles.breadcrumbLink}>
            {cs.breadcrumbs.projects}
          </Link>
          <span className={styles.breadcrumbSep}>/</span>
          <span className={styles.breadcrumbCurrent}>{cs.breadcrumbs.caseStudy}</span>
        </nav>

        {/* Case Study Hero Card */}
        <HudCard variant="surface" corners className={styles.heroCard}>
          <CardMetaBar
            badge={
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                <TelemetryBadge variant="cyan">{cs.hero.badge}</TelemetryBadge>
                <TelemetryBadge variant="amber">
                  ENGLISH ONLY
                </TelemetryBadge>
              </div>
            }
            telemetry={cs.hero.telemetry}
          />

          <h1 className={styles.heroTitle}>{cs.hero.title}</h1>

          <div className={styles.heroTagline}>{cs.hero.tagline}</div>

          <p className={styles.heroDesc}>{cs.hero.description}</p>

          <TagList items={stack} variant="subtle" size="sm" />

          {/* Impact Metrics Grid */}
          <Grid cols={3} gap="md" className={styles.metricsGrid}>
            <Stat variant="card" value={cs.hero.metrics.latencyValue} label={cs.hero.metrics.latencyLabel} />
            <Stat variant="card" value={cs.hero.metrics.filesValue} label={cs.hero.metrics.filesLabel} />
            <Stat variant="card" value={cs.hero.metrics.privacyValue} label={cs.hero.metrics.privacyLabel} />
          </Grid>

          <div className={styles.actionsRow}>
            <Button
              variant="primary"
              size="sm"
              href="https://swaya.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              iconRight={<Launch size={14} />}
            >
              {cs.hero.visitWebsite}
            </Button>
            <Button variant="secondary" size="sm" href="/" iconLeft={<ArrowLeft size={14} />}>
              {cs.hero.backToOverview}
            </Button>
          </div>
        </HudCard>

        {/* Screenshots & Interactive Gallery */}
        <HudCard variant="surface" corners className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{cs.gallery.title}</h2>
            <p className={styles.sectionSubtitle}>{cs.gallery.subtitle}</p>
          </div>

          <ProjectGallery
            items={screenshots}
            layout="grid"
            previewCaption={cs.gallery.previewCaption}
          />
        </HudCard>

        {/* Architecture Deep Dive Section */}
        <HudCard variant="surface" corners className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{cs.architecture.title}</h2>
            <p className={styles.sectionSubtitle}>{cs.architecture.subtitle}</p>
          </div>

          <div className={styles.archGrid}>
            <div className={styles.archCard}>
              <div className={styles.archTitleRow}>
                <Code size={18} />
                <Text as="h3" font="heading" size="base" weight="bold" tone="cyan">
                  {cs.architecture.cards.hybridCore.title}
                </Text>
              </div>
              <Text size="sm" tone="secondary" leading="relaxed">
                {cs.architecture.cards.hybridCore.description}
              </Text>
            </div>

            <div className={styles.archCard}>
              <div className={styles.archTitleRow}>
                <Folders size={18} />
                <Text as="h3" font="heading" size="base" weight="bold" tone="cyan">
                  {cs.architecture.cards.organizer.title}
                </Text>
              </div>
              <Text size="sm" tone="secondary" leading="relaxed">
                {cs.architecture.cards.organizer.description}
              </Text>
            </div>

            <div className={styles.archCard}>
              <div className={styles.archTitleRow}>
                <ViewOff size={18} />
                <Text as="h3" font="heading" size="base" weight="bold" tone="cyan">
                  {cs.architecture.cards.privacy.title}
                </Text>
              </div>
              <Text size="sm" tone="secondary" leading="relaxed">
                {cs.architecture.cards.privacy.description}
              </Text>
            </div>

            <div className={styles.archCard}>
              <div className={styles.archTitleRow}>
                <Play size={18} />
                <Text as="h3" font="heading" size="base" weight="bold" tone="cyan">
                  {cs.architecture.cards.player.title}
                </Text>
              </div>
              <Text size="sm" tone="secondary" leading="relaxed">
                {cs.architecture.cards.player.description}
              </Text>
            </div>
          </div>
        </HudCard>

        {/* Technical Telemetry & Specifications */}
        <HudCard variant="surface" corners className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{cs.telemetry.title}</h2>
            <p className={styles.sectionSubtitle}>{cs.telemetry.subtitle}</p>
          </div>

          <table className={styles.specsTable}>
            <tbody>
              {cs.telemetry.specs.map((item) => (
                <tr key={item.key} className={styles.specsRow}>
                  <td className={styles.specsKey}>{item.key}</td>
                  <td className={styles.specsValue}>{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </HudCard>

        {/* Bottom CTA Card */}
        <HudCard variant="surface" corners className={styles.ctaCard}>
          <Text as="h2" font="heading" size="xl" weight="bold" tone="primary">
            {cs.cta.title}
          </Text>
          <Text size="sm" tone="secondary" style={{ maxWidth: "600px" }}>
            {cs.cta.description}
          </Text>
          <div className={styles.ctaButtons}>
            <Button variant="primary" size="sm" href="/#contact">
              {cs.cta.discussButton}
            </Button>
            <Button variant="secondary" size="sm" href="/#projects">
              {cs.cta.exploreButton}
            </Button>
          </div>
        </HudCard>
      </div>
    </PageLayout>
  );
}

import PageLayout from "@/components/layout/PageLayout";
import ChamberSection from "@/components/layout/ChamberSection";
import DeckDivider from "@/components/layout/DeckDivider";

import Hero from "@/components/Hero";
import AboutStory from "@/components/AboutStory";
import ProjectCard from "@/components/ProjectCard";
import SkillsTelemetry from "@/components/SkillsTelemetry";
import ServicesPricing from "@/components/ServicesPricing";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";

export const dynamic = "force-static";

export default function Home() {
  return (
    <PageLayout>
      {/* ============================================================
          CHAMBER 01: HERO
          ============================================================ */}
      <ChamberSection id="hero" tone="grid">
        <Hero />
      </ChamberSection>

      <DeckDivider label="01 // TRAJECTORY" />

      {/* ============================================================
          CHAMBER 02: TRAJECTORY & STORY
          ============================================================ */}
      <ChamberSection id="trajectory" tone="grid">
        <AboutStory />
      </ChamberSection>

      <DeckDivider label="02 // PROJECTS & CODE" />

      {/* ============================================================
          CHAMBER 03: MISSION ARTIFACTS / PROJECTS
          ============================================================ */}
      <ChamberSection id="projects" tone="grid">
        <ProjectCard />
      </ChamberSection>

      <DeckDivider label="03 // SKILLS & TELEMETRY" />

      {/* ============================================================
          CHAMBER 04: TELEMETRY & CAPABILITIES
          ============================================================ */}
      <ChamberSection id="skills" tone="grid">
        <SkillsTelemetry />
      </ChamberSection>

      <DeckDivider label="04 // SERVICES & PACKAGES" />

      {/* ============================================================
          CHAMBER 05: PAYLOADS & PACKAGES
          ============================================================ */}
      <ChamberSection id="services" tone="grid">
        <ServicesPricing />
      </ChamberSection>

      <DeckDivider label="05 // CLIENT VERIFICATION" />

      {/* ============================================================
          CHAMBER 06: CLIENT TESTIMONIALS & REPUTATION
          ============================================================ */}
      <ChamberSection id="reviews" tone="grid">
        <Testimonials />
      </ChamberSection>

      <DeckDivider label="06 // DIRECT TRANSMISSION" />

      {/* ============================================================
          CHAMBER 07: DIRECT TRANSMISSION
          ============================================================ */}
      <ChamberSection id="contact" tone="grid">
        <ContactForm />
      </ChamberSection>
    </PageLayout>
  );
}

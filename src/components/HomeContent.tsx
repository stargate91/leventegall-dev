"use client";

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
import { useLocale } from "@/locales";

export default function HomeContent() {
  const { dict } = useLocale();

  return (
    <PageLayout>
      {/* ============================================================
          CHAMBER 01: HERO
          ============================================================ */}
      <ChamberSection id="hero" tone="grid">
        <Hero />
      </ChamberSection>

      <DeckDivider label={dict.sections.about} />

      {/* ============================================================
          CHAMBER 02: JOURNEY & STORY
          ============================================================ */}
      <ChamberSection id="journey" tone="grid">
        <span id="trajectory" className="sr-only" aria-hidden="true" />
        <AboutStory />
      </ChamberSection>

      <DeckDivider label={dict.sections.projects} />

      {/* ============================================================
          CHAMBER 03: MISSION ARTIFACTS / PROJECTS
          ============================================================ */}
      <ChamberSection id="projects" tone="grid">
        <ProjectCard />
      </ChamberSection>

      <DeckDivider label={dict.sections.skills} />

      {/* ============================================================
          CHAMBER 04: TELEMETRY & CAPABILITIES
          ============================================================ */}
      <ChamberSection id="skills" tone="grid">
        <SkillsTelemetry />
      </ChamberSection>

      <DeckDivider label={dict.sections.services} />

      {/* ============================================================
          CHAMBER 05: PAYLOADS & PACKAGES
          ============================================================ */}
      <ChamberSection id="services" tone="grid">
        <ServicesPricing />
      </ChamberSection>

      <DeckDivider label={dict.sections.reviews} />

      {/* ============================================================
          CHAMBER 06: CLIENT TESTIMONIALS & REPUTATION
          ============================================================ */}
      <ChamberSection id="clients" tone="grid">
        <span id="reviews" className="sr-only" aria-hidden="true" />
        <Testimonials />
      </ChamberSection>

      <DeckDivider label={dict.sections.contact} />

      {/* ============================================================
          CHAMBER 07: DIRECT TRANSMISSION
          ============================================================ */}
      <ChamberSection id="contact" tone="grid">
        <ContactForm />
      </ChamberSection>
    </PageLayout>
  );
}

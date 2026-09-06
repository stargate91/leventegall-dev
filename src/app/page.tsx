import PageLayout from "@/components/layout/PageLayout";
import ChamberSection from "@/components/layout/ChamberSection";
import DeckDivider from "@/components/layout/DeckDivider";

import Hero from "@/components/Hero";
import AboutStory from "@/components/AboutStory";
import ProjectCard from "@/components/ProjectCard";
import SkillsTelemetry from "@/components/SkillsTelemetry";
import ServicesPricing from "@/components/ServicesPricing";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export const dynamic = "force-static";

export default function Home() {

  return (
    <PageLayout>
      {/* ============================================================
          CHAMBER 01: HERO (Tone: 3D Tron Grid)
          ============================================================ */}
      <ChamberSection id="hero" tone="grid">
        <Hero />
      </ChamberSection>

      {/* ============================================================
          CHAMBER 02: TRAJECTORY & STORY (Tone: Deck, Shape: Tron 45°)
          ============================================================ */}
      <ChamberSection
        id="trajectory"
        tone="deck"
        topTransition="tron"
        bottomTransition="tron"
      >
        <AboutStory />
      </ChamberSection>

      {/* ============================================================
          CHAMBER 03: MISSION ARTIFACTS / PROJECTS (Tone: 3D Tron Grid)
          ============================================================ */}
      <ChamberSection id="projects" tone="grid">
        <ProjectCard />
      </ChamberSection>

      {/* ============================================================
          CHAMBER 04: TELEMETRY & CAPABILITIES (Tone: Deck, Shape: Chevron)
          ============================================================ */}
      <ChamberSection
        id="skills"
        tone="deck"
        topTransition="chevron"
        bottomTransition="chevron"
      >
        <SkillsTelemetry />
      </ChamberSection>

      {/* ============================================================
          CHAMBER 05: PAYLOADS & PACKAGES (Tone: 3D Tron Grid)
          ============================================================ */}
      <ChamberSection id="services" tone="grid">
        <ServicesPricing />
      </ChamberSection>

      {/* ============================================================
          CHAMBER 06: DEEP SPACE UPLINK & INTEGRATED ORBITAL FOOTER
          ============================================================ */}
      <ChamberSection
        id="contact"
        tone="deck"
        topTransition="bulkhead"
      >
        <ContactForm />
        <DeckDivider />
        <Footer />
      </ChamberSection>
    </PageLayout>
  );
}

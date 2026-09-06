import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutStory from "@/components/AboutStory";
import ProjectCard from "@/components/ProjectCard";
import SkillsTelemetry from "@/components/SkillsTelemetry";
import ServicesPricing from "@/components/ServicesPricing";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import SectionTransition from "@/components/SectionTransition";
import TronGridBackground from "@/components/TronGridBackground";

export default function Home() {
  return (
    <main
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "var(--tone-a)",
      }}
    >
      {/* Tron 3D Vector Grid Background */}
      <TronGridBackground />

      {/* Persistent Navigation Header with Live Status Telemetry */}
      <Navbar />

      {/* ============================================================
          CHAMBER 01: HERO (Tone A: Deep Space Void #05070b)
          ============================================================ */}
      <div className="chamber-tone-a">
        <Hero />
      </div>

      {/* ============================================================
          CHAMBER 02: TRAJECTORY & STORY (Tone B: Deck Slate #0f1626)
          Shape: Tron: Legacy 45° Dual Circuit Chamfer
          ============================================================ */}
      <div className="chamber-b-module">
        {/* Top Tron Circuit Shape Cap */}
        <SectionTransition
          position="top"
          variant="tron"
          fillColor="var(--tone-b)"
          height={90}
        />

        {/* Chamber Body */}
        <div className="chamber-b-body">
          <AboutStory />
        </div>

        {/* Bottom Inverted Tron Circuit Shape Cap */}
        <SectionTransition
          position="bottom"
          variant="tron"
          fillColor="var(--tone-b)"
          height={90}
        />
      </div>

      {/* ============================================================
          CHAMBER 03: MISSION ARTIFACTS / PROJECTS (Tone A: Void #05070b)
          ============================================================ */}
      <div className="chamber-tone-a">
        <ProjectCard />
      </div>

      {/* ============================================================
          CHAMBER 04: TELEMETRY & CAPABILITIES (Tone B: Deck Slate #0f1626)
          Shape: Stargate Chevron Ring Lock
          ============================================================ */}
      <div className="chamber-b-module">
        {/* Top Stargate Chevron Shape Cap */}
        <SectionTransition
          position="top"
          variant="chevron"
          fillColor="var(--tone-b)"
          height={90}
        />

        {/* Chamber Body */}
        <div className="chamber-b-body">
          <SkillsTelemetry />
        </div>

        {/* Bottom Inverted Stargate Chevron Shape Cap */}
        <SectionTransition
          position="bottom"
          variant="chevron"
          fillColor="var(--tone-b)"
          height={90}
        />
      </div>

      {/* ============================================================
          CHAMBER 05: PAYLOADS & MISSIONS / PACKAGES (Tone A: Void #05070b)
          ============================================================ */}
      <div className="chamber-tone-a">
        <ServicesPricing />
      </div>

      {/* ============================================================
          CHAMBER 06: DEEP SPACE UPLINK & INTEGRATED ORBITAL FOOTER
          Shape: Top Bulkhead Airlock -> Solid Blue Deck + Grid to bottom
          ============================================================ */}
      <div className="chamber-b-module">
        {/* Top Airlock Bulkhead Shape Cap */}
        <SectionTransition
          position="top"
          variant="bulkhead"
          fillColor="var(--tone-b)"
          height={90}
        />

        {/* Unified Chamber Body: Contact Console + Direct Footer Dock */}
        <div className="chamber-b-body">
          <ContactForm />

          {/* Tron Laser Seam Divider */}
          <div
            style={{
              height: "1px",
              maxWidth: "1200px",
              margin: "0 auto",
              background:
                "linear-gradient(90deg, transparent 0%, rgba(0, 229, 255, 0.4) 20%, #00e5ff 50%, rgba(0, 229, 255, 0.4) 80%, transparent 100%)",
              boxShadow: "0 0 15px rgba(0, 229, 255, 0.4)",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-3px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "48px",
                height: "7px",
                borderRadius: "2px",
                background: "var(--cyan-tron)",
                boxShadow: "0 0 12px var(--cyan-glow)",
              }}
            />
          </div>

          {/* Integrated Footer extending blue deck + grid to the bottom */}
          <Footer />
        </div>
      </div>
    </main>
  );
}

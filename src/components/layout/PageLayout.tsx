import React from "react";
import Navbar from "@/components/Navbar";
import TronGridBackground from "@/components/TronGridBackground";
import { LocaleProvider } from "@/locales";

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
}

/**
 * PageLayout encapsulates the global viewport frame, fixed Tron Grid background,
 * persistent navigation telemetry header, and structural semantics.
 */
export default function PageLayout({ children, className = "", style }: PageLayoutProps) {
  return (
    <LocaleProvider>
      <main
        id="main-content"
        className={`page-layout ${className}`}
        tabIndex={-1}
        style={{
          position: "relative",
          minHeight: "100vh",
          backgroundColor: "var(--tone-a)",
          overflowX: "hidden",
          ...style,
        }}
      >
        {/* Accessibility: Skip Navigation Link */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        {/* Background GPU-Accelerated Tron 3D Vector Grid */}
        <TronGridBackground />

        {/* Persistent Navigation Header with Live Status Telemetry */}
        <Navbar />

        {/* Main Page Chambers */}
        {children}
      </main>
    </LocaleProvider>
  );
}

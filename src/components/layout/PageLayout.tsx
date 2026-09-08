import React from "react";
import styles from "./PageLayout.module.css";
import Navbar from "@/components/Navbar";
import AudioPlayer from "@/components/AudioPlayer";
import TronGridBackground from "@/components/TronGridBackground";

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
}

/**
 * PageLayout establishes a 2-Column Split Architecture on desktop:
 * - Left Sticky Sidebar (Navbar): Full height, containing identity, live telemetry, and navigation.
 * - Right Scrollable Column: Contains all section chambers and interactive simulations.
 */
export default function PageLayout({ children, className = "", style }: PageLayoutProps) {
  return (
    <div
      id="main-content"
      className={`page-layout ${styles.layoutWrapper} ${className}`}
      style={style}
    >
      {/* Accessibility: Skip Navigation Link */}
      <a href="#primary-content" className="skip-link">
        Skip to main content
      </a>

      {/* Background GPU-Accelerated Tron 3D Vector Grid */}
      <TronGridBackground />

      {/* 2-Column Framework: Left Sticky Sidebar */}
      <aside className={styles.sidebarColumn}>
        <Navbar />
      </aside>

      {/* 2-Column Framework: Right Scrollable Content Chamber */}
      <main id="primary-content" className={styles.contentColumn} tabIndex={-1}>
        {children}
      </main>

      {/* Orbital Audio Telemetry Console */}
      <AudioPlayer />
    </div>
  );
}

"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import TronGridBackground from "@/components/TronGridBackground";

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * PageLayout encapsulates the global viewport frame, fixed Tron Grid background,
 * persistent navigation telemetry header, and structural semantics.
 */
export default function PageLayout({ children, className = "", style }: PageLayoutProps) {
  return (
    <main
      className={`page-layout ${className}`}
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "var(--tone-a)",
        overflowX: "hidden",
        ...style,
      }}
    >
      {/* Background GPU-Accelerated Tron 3D Vector Grid */}
      <TronGridBackground />

      {/* Persistent Navigation Header with Live Status Telemetry */}
      <Navbar />

      {/* Main Page Chambers */}
      {children}
    </main>
  );
}

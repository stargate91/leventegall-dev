"use client";

import React from "react";

export default function TronGridBackground() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
        backgroundColor: "#04060a",
      }}
      aria-hidden="true"
    >
      {/* Tron Horizon Core Glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "120vw",
          height: "450px",
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(0, 229, 255, 0.1) 0%, rgba(2, 132, 199, 0.04) 40%, transparent 75%)",
          filter: "blur(60px)",
        }}
      />

      {/* Main Perspective Floor (The Grid) */}
      <div
        style={{
          position: "absolute",
          bottom: "-40%",
          left: "-50%",
          width: "200%",
          height: "120%",
          transform: "perspective(400px) rotateX(60deg)",
          transformOrigin: "center top",
          backgroundImage: `
            linear-gradient(to right, rgba(0, 229, 255, 0.16) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 229, 255, 0.16) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 20%, rgba(0,0,0,1) 70%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 20%, rgba(0,0,0,1) 70%, transparent 100%)",
        }}
      />

      {/* Top Cyber Matrix Ceiling */}
      <div
        style={{
          position: "absolute",
          top: "-40%",
          left: "-50%",
          width: "200%",
          height: "100%",
          transform: "perspective(400px) rotateX(-60deg)",
          transformOrigin: "center bottom",
          backgroundImage: `
            linear-gradient(to right, rgba(0, 229, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 229, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage:
            "linear-gradient(to top, transparent 0%, rgba(0,0,0,0.5) 25%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, transparent 0%, rgba(0,0,0,0.5) 25%, transparent 100%)",
        }}
      />

      {/* Full-Bleed Orthogonal Vector Grid (Fills Hero, Projects, Packages completely) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(0, 229, 255, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 229, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Tron Grid Center Axis Beam */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "50%",
          width: "1px",
          transform: "translateX(-50%)",
          background:
            "linear-gradient(180deg, transparent 0%, rgba(0, 229, 255, 0.15) 30%, rgba(0, 229, 255, 0.3) 50%, rgba(0, 229, 255, 0.15) 70%, transparent 100%)",
          boxShadow: "0 0 15px rgba(0, 229, 255, 0.2)",
        }}
      />
    </div>
  );
}

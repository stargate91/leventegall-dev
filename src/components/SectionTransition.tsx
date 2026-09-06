import React from "react";

export type TransitionVariant =
  | "bulkhead"  // Alien / Nostromo Hexagonal Airlock Bulkhead
  | "chevron"   // Stargate Chevron Ring Lock
  | "tron"      // Tron: Legacy 45° Circuit Chamfer
  | "portal"    // Interstellar / Cosmos Deep Curved Event Horizon
  | "monolith"; // Blade Runner 2049 / Gattaca Asymmetric Brutalist Slab

interface SectionTransitionProps {
  position: "top" | "bottom";
  variant: TransitionVariant;
  fillColor?: string; // The color of Chamber B (#131b2e)
  glowColor?: "cyan" | "amber" | "green" | "subtle";
  height?: number;
}

export default function SectionTransition({
  position,
  variant,
  fillColor = "var(--tone-b)",
  height = 90,
}: SectionTransitionProps) {
  // Pure unified Tron: Legacy Electric Cyan
  const laser = "rgba(0, 229, 255, 0.95)";
  const glow = "rgba(0, 229, 255, 0.6)";
  const accent = "#38bdf8";

  const containerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: `${height}px`,
    display: "block",
    pointerEvents: "none",
    zIndex: 5,
    marginBottom: position === "top" ? "-1px" : "0",
    marginTop: position === "bottom" ? "-1px" : "0",
  };

  // =========================================================================
  // 1. BULKHEAD: Hexagonal Airlock Bulkhead
  // =========================================================================
  if (variant === "bulkhead") {
    if (position === "top") {
      return (
        <div style={containerStyle} aria-hidden="true">
          <svg
            viewBox="0 0 1440 90"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "100%" }}
          >
            <path
              d="M 0 90 L 0 50 L 360 50 L 460 10 L 980 10 L 1080 50 L 1440 50 L 1440 90 Z"
              fill={fillColor}
            />
            <path
              d="M 0 50 L 360 50 L 460 10 L 980 10 L 1080 50 L 1440 50"
              fill="none"
              stroke={laser}
              strokeWidth="2.5"
              style={{ filter: `drop-shadow(0 0 10px ${glow})` }}
            />
            <circle cx="460" cy="10" r="4" fill="#ffffff" />
            <circle cx="980" cy="10" r="4" fill="#ffffff" />
            <rect x="690" y="6" width="60" height="8" rx="2" fill={accent} />
          </svg>
        </div>
      );
    } else {
      return (
        <div style={containerStyle} aria-hidden="true">
          <svg
            viewBox="0 0 1440 90"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "100%" }}
          >
            <path
              d="M 0 0 L 0 40 L 360 40 L 460 80 L 980 80 L 1080 40 L 1440 40 L 1440 0 Z"
              fill={fillColor}
            />
            <path
              d="M 0 40 L 360 40 L 460 80 L 980 80 L 1080 40 L 1440 40"
              fill="none"
              stroke={laser}
              strokeWidth="2.5"
              style={{ filter: `drop-shadow(0 0 10px ${glow})` }}
            />
            <circle cx="460" cy="80" r="4" fill="#ffffff" />
            <circle cx="980" cy="80" r="4" fill="#ffffff" />
            <rect x="690" y="76" width="60" height="8" rx="2" fill={accent} />
          </svg>
        </div>
      );
    }
  }

  // =========================================================================
  // 2. TRON: 45° Dual Circuit Chamfer & Glowing Tracks
  // =========================================================================
  if (variant === "tron") {
    if (position === "top") {
      return (
        <div style={containerStyle} aria-hidden="true">
          <svg
            viewBox="0 0 1440 90"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "100%" }}
          >
            <path
              d="M 0 90 L 0 60 L 220 60 L 290 12 L 1150 12 L 1220 60 L 1440 60 L 1440 90 Z"
              fill={fillColor}
            />
            <path
              d="M 0 60 L 220 60 L 290 12 L 1150 12 L 1220 60 L 1440 60"
              fill="none"
              stroke={laser}
              strokeWidth="2.5"
              style={{ filter: `drop-shadow(0 0 12px ${glow})` }}
            />
            <path
              d="M 310 20 L 1130 20"
              fill="none"
              stroke={glow}
              strokeWidth="1.5"
              strokeDasharray="14 8"
            />
            <circle cx="290" cy="12" r="4" fill="#ffffff" />
            <circle cx="1150" cy="12" r="4" fill="#ffffff" />
          </svg>
        </div>
      );
    } else {
      return (
        <div style={containerStyle} aria-hidden="true">
          <svg
            viewBox="0 0 1440 90"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "100%" }}
          >
            <path
              d="M 0 0 L 0 30 L 220 30 L 290 78 L 1150 78 L 1220 30 L 1440 30 L 1440 0 Z"
              fill={fillColor}
            />
            <path
              d="M 0 30 L 220 30 L 290 78 L 1150 78 L 1220 30 L 1440 30"
              fill="none"
              stroke={laser}
              strokeWidth="2.5"
              style={{ filter: `drop-shadow(0 0 12px ${glow})` }}
            />
            <path
              d="M 310 70 L 1130 70"
              fill="none"
              stroke={glow}
              strokeWidth="1.5"
              strokeDasharray="14 8"
            />
            <circle cx="290" cy="78" r="4" fill="#ffffff" />
            <circle cx="1150" cy="78" r="4" fill="#ffffff" />
          </svg>
        </div>
      );
    }
  }

  // =========================================================================
  // 3. CHEVRON: Stargate Chevron V-Lock
  // =========================================================================
  if (variant === "chevron") {
    if (position === "top") {
      return (
        <div style={containerStyle} aria-hidden="true">
          <svg
            viewBox="0 0 1440 90"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "100%" }}
          >
            <path
              d="M 0 90 L 0 65 L 620 65 L 720 12 L 820 65 L 1440 65 L 1440 90 Z"
              fill={fillColor}
            />
            <path
              d="M 0 65 L 620 65 L 720 12 L 820 65 L 1440 65"
              fill="none"
              stroke={laser}
              strokeWidth="2.5"
              style={{ filter: `drop-shadow(0 0 12px ${glow})` }}
            />
            <circle cx="720" cy="12" r="5" fill="#ffffff" />
            <path d="M 660 65 L 720 30 L 780 65" fill="none" stroke={glow} strokeWidth="1.5" />
          </svg>
        </div>
      );
    } else {
      return (
        <div style={containerStyle} aria-hidden="true">
          <svg
            viewBox="0 0 1440 90"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "100%" }}
          >
            <path
              d="M 0 0 L 0 25 L 620 25 L 720 78 L 820 25 L 1440 25 L 1440 0 Z"
              fill={fillColor}
            />
            <path
              d="M 0 25 L 620 25 L 720 78 L 820 25 L 1440 25"
              fill="none"
              stroke={laser}
              strokeWidth="2.5"
              style={{ filter: `drop-shadow(0 0 12px ${glow})` }}
            />
            <circle cx="720" cy="78" r="5" fill="#ffffff" />
            <path d="M 660 25 L 720 60 L 780 25" fill="none" stroke={glow} strokeWidth="1.5" />
          </svg>
        </div>
      );
    }
  }

  // =========================================================================
  // 4. PORTAL: Interstellar Deep Event Horizon Arc
  // =========================================================================
  if (variant === "portal") {
    if (position === "top") {
      return (
        <div style={containerStyle} aria-hidden="true">
          <svg
            viewBox="0 0 1440 90"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "100%" }}
          >
            <path d="M 0 90 L 0 70 Q 720 8 1440 70 L 1440 90 Z" fill={fillColor} />
            <path
              d="M 0 70 Q 720 8 1440 70"
              fill="none"
              stroke={laser}
              strokeWidth="3"
              style={{ filter: `drop-shadow(0 0 15px ${glow})` }}
            />
          </svg>
        </div>
      );
    } else {
      return (
        <div style={containerStyle} aria-hidden="true">
          <svg
            viewBox="0 0 1440 90"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "100%" }}
          >
            <path d="M 0 0 L 0 20 Q 720 82 1440 20 L 1440 0 Z" fill={fillColor} />
            <path
              d="M 0 20 Q 720 82 1440 20"
              fill="none"
              stroke={laser}
              strokeWidth="3"
              style={{ filter: `drop-shadow(0 0 15px ${glow})` }}
            />
          </svg>
        </div>
      );
    }
  }

  // =========================================================================
  // 5. MONOLITH: Blade Runner 2049 / Gattaca Asymmetric Diagonal Slab
  // =========================================================================
  if (variant === "monolith") {
    if (position === "top") {
      return (
        <div style={containerStyle} aria-hidden="true">
          <svg
            viewBox="0 0 1440 90"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "100%" }}
          >
            <path d="M 0 90 L 0 75 L 1440 15 L 1440 90 Z" fill={fillColor} />
            <path
              d="M 0 75 L 1440 15"
              fill="none"
              stroke={laser}
              strokeWidth="2.5"
              style={{ filter: `drop-shadow(0 0 10px ${glow})` }}
            />
            <circle cx="20" cy="74" r="4" fill="#ffffff" />
            <circle cx="1420" cy="16" r="4" fill="#ffffff" />
          </svg>
        </div>
      );
    } else {
      return (
        <div style={containerStyle} aria-hidden="true">
          <svg
            viewBox="0 0 1440 90"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "100%" }}
          >
            <path d="M 0 0 L 0 15 L 1440 75 L 1440 0 Z" fill={fillColor} />
            <path
              d="M 0 15 L 1440 75"
              fill="none"
              stroke={laser}
              strokeWidth="2.5"
              style={{ filter: `drop-shadow(0 0 10px ${glow})` }}
            />
            <circle cx="20" cy="16" r="4" fill="#ffffff" />
            <circle cx="1420" cy="74" r="4" fill="#ffffff" />
          </svg>
        </div>
      );
    }
  }

  return null;
}

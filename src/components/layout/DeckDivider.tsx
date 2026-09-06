import React from "react";

interface DeckDividerProps {
  maxWidth?: string;
  margin?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * DeckDivider renders an ultra-precise Tron luminescent laser seam
 * with a center glowing HUD telemetry indicator pip for sub-section separation.
 */
export default function DeckDivider({
  maxWidth = "1200px",
  margin = "0 auto",
  className = "",
  style,
}: DeckDividerProps) {
  return (
    <div
      className={`deck-divider ${className}`}
      style={{
        height: "1px",
        maxWidth,
        margin,
        background:
          "linear-gradient(90deg, transparent 0%, rgba(0, 229, 255, 0.4) 20%, #00e5ff 50%, rgba(0, 229, 255, 0.4) 80%, transparent 100%)",
        boxShadow: "0 0 15px rgba(0, 229, 255, 0.4)",
        position: "relative",
        zIndex: 5,
        ...style,
      }}
      aria-hidden="true"
    >
      {/* Center HUD Indicator Pip */}
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
  );
}

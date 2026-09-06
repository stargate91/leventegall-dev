import { ImageResponse } from "next/og";

export const alt = "Levente Gáll — Full-Stack Architect & Brand Strategist";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#04060a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
          border: "2px solid rgba(0, 240, 255, 0.3)",
        }}
      >
        {/* Top Header Tag */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              color: "#00f0ff",
              fontSize: "20px",
              fontWeight: "bold",
              letterSpacing: "4px",
            }}
          >
            [ // ] LEVENTE GÁLL • BUDAPEST GRID
          </div>
          <div
            style={{
              background: "rgba(0, 240, 255, 0.15)",
              border: "1px solid #00f0ff",
              color: "#00f0ff",
              padding: "6px 16px",
              borderRadius: "4px",
              fontSize: "14px",
              letterSpacing: "2px",
            }}
          >
            5.0 TOP-RATED • 1,100+ CLIENTS
          </div>
        </div>

        {/* Main Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          <div
            style={{
              fontSize: "56px",
              fontWeight: "900",
              color: "#f8fafc",
              lineHeight: 1.1,
              letterSpacing: "-1px",
            }}
          >
            CLEAN CODE ARCHITECTURE.
          </div>
          <div
            style={{
              fontSize: "56px",
              fontWeight: "900",
              color: "#00f0ff",
              lineHeight: 1.1,
              letterSpacing: "-1px",
            }}
          >
            SHARP BRAND IDENTITY.
          </div>
          <div
            style={{
              fontSize: "22px",
              color: "#94a3b8",
              marginTop: "8px",
              lineHeight: 1.4,
            }}
          >
            ELTE Physics Background • Full-Stack Systems (Python, FastAPI, React, TypeScript) • 5 Years Verified Fiverr Branding
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(0, 240, 255, 0.2)",
            paddingTop: "20px",
          }}
        >
          <div style={{ color: "#64748b", fontSize: "16px", letterSpacing: "1px" }}>
            github.com/stargate91 • leventegall.dev
          </div>
          <div style={{ color: "#00f0ff", fontSize: "16px", fontWeight: "bold", letterSpacing: "2px" }}>
            ORBITAL COMMS ACTIVE // 2026
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}

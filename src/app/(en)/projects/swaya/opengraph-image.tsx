import { ImageResponse } from "next/og";

export const alt = "Swaya Media Manager • Architectural Case Study";
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
            [ // ] ARCHITECTURAL CASE STUDY
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
            DESKTOP APPLICATION
          </div>
        </div>

        {/* Main Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontSize: "64px",
              fontWeight: "900",
              color: "#f8fafc",
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
            }}
          >
            SWAYA MEDIA MANAGER
          </div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "#00f0ff",
              lineHeight: 1.2,
              letterSpacing: "-0.5px",
            }}
          >
            High-Performance Desktop Media Manager with SQLite, MPV IPC & Async Indexing
          </div>
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "8px",
            }}
          >
            {["Python", "FastAPI", "Electron", "React", "SQLite", "MPV IPC"].map((tech) => (
              <div
                key={tech}
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#cbd5e1",
                  padding: "4px 12px",
                  borderRadius: "4px",
                  fontSize: "16px",
                  fontFamily: "monospace",
                }}
              >
                {tech}
              </div>
            ))}
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
            leventegall.dev/projects/swaya • by Levente Gáll
          </div>
          <div style={{ color: "#00f0ff", fontSize: "16px", fontWeight: "bold", letterSpacing: "2px" }}>
            ENGINEERING REPORT // 2026
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}

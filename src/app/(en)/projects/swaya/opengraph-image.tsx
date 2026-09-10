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
          background: "#0c1017",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(55, 148, 255, 0.16) 0%, transparent 55%), radial-gradient(circle at 15% 85%, rgba(0, 120, 212, 0.12) 0%, transparent 50%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
          border: "1px solid rgba(55, 148, 255, 0.28)",
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
              color: "#3794ff",
              fontSize: "18px",
              fontWeight: 600,
              letterSpacing: "3px",
              fontFamily: "monospace",
            }}
          >
            FEATURED PROJECT // CASE STUDY
          </div>
          <div
            style={{
              background: "rgba(55, 148, 255, 0.12)",
              border: "1px solid rgba(55, 148, 255, 0.35)",
              color: "#9cdcfe",
              padding: "6px 16px",
              borderRadius: "4px",
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "1.5px",
              fontFamily: "monospace",
            }}
          >
            COMMERCIAL DESKTOP SUITE
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
              fontSize: "60px",
              fontWeight: 800,
              color: "#f8fafc",
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
            }}
          >
            SWAYA MEDIA MANAGER
          </div>
          <div
            style={{
              fontSize: "26px",
              fontWeight: 600,
              color: "#3794ff",
              lineHeight: 1.25,
              letterSpacing: "-0.5px",
            }}
          >
            High-Performance Desktop Media Manager with SQLite, MPV IPC & Async Indexing
          </div>
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "8px",
            }}
          >
            {["Python", "FastAPI", "Electron", "React", "SQLite", "MPV IPC"].map((tech) => (
              <div
                key={tech}
                style={{
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(55, 148, 255, 0.25)",
                  color: "#cbd5e1",
                  padding: "4px 14px",
                  borderRadius: "4px",
                  fontSize: "15px",
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
            borderTop: "1px solid rgba(55, 148, 255, 0.2)",
            paddingTop: "20px",
          }}
        >
          <div
            style={{
              color: "#64748b",
              fontSize: "16px",
              letterSpacing: "1px",
              fontFamily: "monospace",
            }}
          >
            leventegall.dev/projects/swaya • by Levente Gáll
          </div>
          <div
            style={{
              color: "#3794ff",
              fontSize: "15px",
              fontWeight: 600,
              letterSpacing: "2px",
              fontFamily: "monospace",
            }}
          >
            DESKTOP APPLICATION // 2026
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}

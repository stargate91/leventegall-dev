import { ImageResponse } from "next/og";

export const alt = "Gáll Levente • Full-Stack Fejlesztő & Márkastratéga";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function HungarianImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0c1017",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(55, 148, 255, 0.15) 0%, transparent 55%), radial-gradient(circle at 15% 85%, rgba(0, 120, 212, 0.1) 0%, transparent 50%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
          border: "1px solid rgba(55, 148, 255, 0.25)",
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
            GÁLL LEVENTE // PORTFÓLIÓ
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
            4.8 ÉRTÉKELÉS • 1 100+ ÜGYFÉL
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
              fontWeight: 800,
              color: "#f8fafc",
              lineHeight: 1.15,
              letterSpacing: "-1px",
            }}
          >
            Szia, Gáll Levente vagyok.
          </div>
          <div
            style={{
              fontSize: "56px",
              fontWeight: 800,
              color: "#3794ff",
              lineHeight: 1.15,
              letterSpacing: "-1px",
            }}
          >
            Szoftvereket és márkákat építek.
          </div>
          <div
            style={{
              fontSize: "22px",
              color: "#94a3b8",
              marginTop: "8px",
              lineHeight: 1.45,
            }}
          >
            Full-Stack Fejlesztés (Python, FastAPI, React, Next.js) • ELTE Fizikus Szemlélet • Márkanévadás & Szlogenek
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
            github.com/stargate91 • leventegall.dev/hu
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
            BUDAPEST // ELÉRHETŐ PROJEKTEKRE
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}

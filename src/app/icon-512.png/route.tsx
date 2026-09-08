import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#05070b",
          borderRadius: "102px",
          border: "22px solid #00f0ff",
        }}
      >
        <div
          style={{
            fontSize: "320px",
            fontWeight: "900",
            fontFamily: "system-ui, -apple-system, sans-serif",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 1,
            marginLeft: "-16px",
          }}
        >
          L
        </div>
      </div>
    ),
    {
      width: 512,
      height: 512,
    },
  );
}

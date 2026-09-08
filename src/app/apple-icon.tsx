import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#181818",
          borderRadius: "36px",
          border: "8px solid #0078d4",
        }}
      >
        <div
          style={{
            fontSize: "116px",
            fontWeight: "900",
            fontFamily: "system-ui, -apple-system, sans-serif",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 1,
            marginLeft: "-6px",
          }}
        >
          L
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}

import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: "7px",
          border: "2px solid #00f0ff",
        }}
      >
        <div
          style={{
            fontSize: "20px",
            fontWeight: "900",
            fontFamily: "system-ui, -apple-system, sans-serif",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 1,
            marginLeft: "-1px",
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

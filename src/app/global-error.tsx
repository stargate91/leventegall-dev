"use client";

import { useEffect } from "react";
import { WarningAlt, Restart } from "@carbon/icons-react";
import { logger } from "@/lib/logger";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    logger.error("Critical root anomaly caught by global-error boundary", {
      context: { digest: error.digest, message: error.message },
      error,
    });
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          background: "#04060a",
          color: "#f8fafc",
          fontFamily: "system-ui, -apple-system, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            maxWidth: "500px",
            padding: "32px",
            background: "rgba(10, 15, 25, 0.9)",
            border: "1px solid #00f0ff",
            borderRadius: "8px",
            textAlign: "center",
            boxShadow: "0 0 30px rgba(0, 240, 255, 0.15)",
          }}
        >
          <div
            style={{
              color: "#ff7b00",
              marginBottom: "16px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <WarningAlt size={48} />
          </div>
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              letterSpacing: "2px",
              textTransform: "uppercase",
              margin: "0 0 12px 0",
              color: "#00f0ff",
            }}
          >
            Critical Root Anomaly
          </h1>
          <p style={{ fontSize: "14px", color: "#94a3b8", lineHeight: "1.6", margin: "0 0 24px 0" }}>
            The root rendering matrix encountered an unrecoverable state error.
          </p>
          {error.digest && (
            <div
              style={{
                fontFamily: "monospace",
                fontSize: "12px",
                color: "#00f0ff",
                marginBottom: "24px",
              }}
            >
              [ DIGEST: {error.digest} ]
            </div>
          )}
          <button
            type="button"
            onClick={() => reset()}
            style={{
              background: "#00f0ff",
              color: "#04060a",
              border: "none",
              padding: "10px 24px",
              fontSize: "14px",
              fontWeight: "bold",
              borderRadius: "4px",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Restart size={16} />
            Reinitialize System
          </button>
        </div>
      </body>
    </html>
  );
}

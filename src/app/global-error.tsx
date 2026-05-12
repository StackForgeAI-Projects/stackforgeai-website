"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[global error]", error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ background: "#0b1117", color: "#e6ecef", fontFamily: "sans-serif" }}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div style={{ maxWidth: 480, textAlign: "center" }}>
            <h1 style={{ fontSize: 32, marginBottom: 12 }}>Critical error</h1>
            <p style={{ marginBottom: 24 }}>
              The site failed to load. Please refresh — if the problem persists, email{" "}
              <a href="mailto:hello@stackforgeai.africa" style={{ color: "#22c55e" }}>
                hello@stackforgeai.africa
              </a>
              .
            </p>
            <button
              type="button"
              onClick={reset}
              style={{
                background: "#22c55e",
                color: "#0b1117",
                padding: "0.75rem 1.5rem",
                borderRadius: 999,
                border: "none",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Reload
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

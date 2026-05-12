import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "StackForgeAI — Intelligent software for Africa's institutions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 64,
        background:
          "radial-gradient(ellipse at top left, rgba(34,197,94,0.32), transparent 55%), radial-gradient(ellipse at bottom right, rgba(11, 134, 192, 0.28), transparent 60%), linear-gradient(180deg, #0b1117, #0f1822)",
        color: "#e6ecef",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 12,
            background: "linear-gradient(135deg, #4ade80, #16a34a)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#0b1117",
            fontSize: 32,
            fontWeight: 800,
          }}
        >
          S
        </div>
        <div style={{ fontSize: 28, fontWeight: 600 }}>
          StackForge<span style={{ color: "#4ade80" }}>AI</span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            fontSize: 14,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#4ade80",
            fontFamily: "monospace",
          }}
        >
          {"// intelligent software for Africa's institutions"}
        </div>
        <div
          style={{
            fontSize: 72,
            lineHeight: 1.05,
            fontWeight: 600,
            letterSpacing: -1.5,
          }}
        >
          Engineering Africa&apos;s{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #4ade80, #16a34a)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            digital backbone
          </span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 22,
          color: "#94a3b8",
        }}
      >
        <span>Kigali, Rwanda 🇷🇼</span>
        <span style={{ color: "#4ade80" }}>stackforgeai.africa</span>
      </div>
    </div>,
    size,
  );
}

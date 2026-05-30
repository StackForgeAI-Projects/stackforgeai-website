import type { CSSProperties } from "react";

/** Shared pinned nav bar background for homepage and StackFix headers. */
export const siteNavScrolledBarStyle: CSSProperties = {
  background: "linear-gradient(135deg, oklch(0.32 0.10 150 / 0.94), oklch(0.26 0.08 155 / 0.94))",
  backdropFilter: "blur(20px) saturate(160%)",
  WebkitBackdropFilter: "blur(20px) saturate(160%)",
};

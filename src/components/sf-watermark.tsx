"use client";

import { cn } from "@/lib/utils";

type Props = {
  /** Override placement; defaults to fill parent. */
  className?: string;
  /** Rotation in degrees. */
  rotate?: number;
  /** 0..1; default 0.07 — very subtle. */
  opacity?: number;
  /** Background size in CSS (default scales generously). */
  size?: string;
  /** Anchor point for the mark; default centered. */
  position?: string;
};

/**
 * One large StackForgeAI brand mark, positioned absolutely as a decorative
 * background watermark. Drop inside any `position: relative` parent.
 * Always `aria-hidden` and `pointer-events-none`.
 */
export function SfWatermark({
  className,
  rotate = -12,
  opacity = 0.07,
  size = "min(820px, 70vw)",
  position = "center",
}: Props) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden select-none", className)}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/sf-bg-logo.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: position,
          backgroundSize: `${size} auto`,
          opacity,
          transform: `rotate(${rotate}deg) scale(1.15)`,
          transformOrigin: "center",
          maskImage: "radial-gradient(ellipse 75% 95% at 50% 50%, black 25%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 95% at 50% 50%, black 25%, transparent 85%)",
        }}
      />
    </div>
  );
}

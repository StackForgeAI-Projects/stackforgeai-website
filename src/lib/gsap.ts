"use client";

/**
 * Centralised GSAP runtime — registers plugins once on the client and exposes
 * a guarded `prefersReducedMotion` helper used by every animated section.
 *
 * SOP §4.1: register only on client, use useGSAP() for cleanup, respect
 * prefers-reduced-motion via gsap.matchMedia().
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;
if (typeof window !== "undefined" && !registered) {
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

gsap.defaults({
  ease: "power3.out",
  duration: 0.9,
});

export { gsap, ScrollTrigger };

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

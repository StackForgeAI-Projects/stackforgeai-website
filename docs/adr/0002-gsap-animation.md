# ADR 0002 — GSAP + `useGSAP` for all animation

- **Status:** Accepted
- **Date:** 2026-05-11

## Context

The site needs scroll-linked entrance animations, a marquee, parallax cards, hover blooms, and stagger reveals — all at 60 fps on entry-level Android devices in the Rwandan market (SOP §4.3).

## Decision

Use **GSAP 3 + ScrollTrigger**, always inside `useGSAP({ scope: ref })` from `@gsap/react`. Animate only `transform` and `opacity`. Honour `prefers-reduced-motion` via `prefersReducedMotion()` helper at the top of every animated effect.

## Consequences

**+** Production-grade animation perf, timeline support, `gsap.context()` cleanup handled by `useGSAP`.
**+** Smaller bundle than Framer Motion + Lenis for our use case.
**−** Larger learning curve than CSS-only animations for new contributors → mitigated by the GSAP-rules section in `CONTRIBUTING.md` and ADR-checked PRs.

## Alternatives considered

- **Framer Motion** — rejected: harder to coordinate scroll-driven multi-element timelines, larger gzip when fully exploited.
- **CSS-only `@keyframes` + IntersectionObserver** — rejected: insufficient control over staggers and scroll-progress-driven effects.

# ADR 0005 — Tailwind 4 + oklch design tokens in `@theme inline`

- **Status:** Accepted
- **Date:** 2026-05-11

## Decision

Use **Tailwind CSS 4** with the new `@import "tailwindcss";` + `@theme inline { ... }` pattern in `src/app/globals.css`. All design tokens (colours, radii, fonts, animations) live in CSS variables and are exposed to Tailwind via the `@theme` block. **No `tailwind.config.ts`** — Tailwind 4 inherits the theme entirely from CSS.

## Why

- Tailwind 4 is significantly faster (Oxide engine) and shipping in stable.
- `oklch()` gives perceptually uniform colour interpolation — important for the green-gradient text and glow effects.
- Single source of truth for tokens in CSS — easier for designers to read.
- Naturally compatible with React Server Components (no JS config evaluation at runtime).

## Trade-offs

- Some Tailwind 3 plugins (e.g. `@tailwindcss/typography`) aren't yet first-class on v4 — we don't need them.
- shadcn/ui CLI tooling still assumes a v3 config in some commands — components have been copied in directly and updated to use our design tokens.

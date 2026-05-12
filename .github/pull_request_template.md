<!-- PR title MUST follow Conventional Commits: type(scope): summary -->

## What changed

<!-- 1–3 bullets describing the change -->

## Why

<!-- Context — why this change is needed -->

## How to test

- [ ] Manual: …
- [ ] Automated: `pnpm test:unit` / `pnpm test:e2e`

## Screenshots / recordings (for UI changes)

<!-- before / after -->

## Checklist (SOP-06 · Definition of Done)

- [ ] `pnpm lint` passes
- [ ] `pnpm typecheck` passes
- [ ] `pnpm test:unit` passes
- [ ] Works in Chrome, Firefox, Safari, Edge
- [ ] Works at 375px (mobile) and 768px (tablet)
- [ ] GSAP animations cleaned up on unmount
- [ ] WCAG 2.1 AA — no critical axe violations
- [ ] No secrets in client bundle
- [ ] PR description filled in above

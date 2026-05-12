# Contributing to StackForgeAI Website

Thank you for contributing. Please follow the StackForgeAI Engineering SOP (`docs/SOP.md`).

## Setup

```bash
corepack enable pnpm
git clone git@github.com:StackForgeAI-Projects/stackforgeai-website.git
cd stackforgeai-website
pnpm install
cp .env.example .env.local
pnpm dev
```

## Workflow

1. Branch from `develop`: `git switch -c feature/<slug>` (or `fix/<slug>`)
2. Write code following the [Definition of Done](./README.md#definition-of-done-sop-5--sop-06)
3. Commit using **Conventional Commits** (commitlint enforces this):
   - `feat(hero): add GSAP text reveal`
   - `fix(contact): validate empty company field`
   - `chore(deps): bump gsap to 3.14`
   - `security(headers): tighten CSP for calendly frame`
4. Push and open a PR against `develop` (or `main` for hotfixes)
5. PR title also follows Conventional Commits
6. Fill in the PR template completely
7. Wait for: green CI · ≥1 review · CODEOWNERS approval if relevant
8. **Squash & merge**, then delete the branch

## Code style

- Prettier formats on save & pre-commit
- ESLint with `next/core-web-vitals`, `next/typescript`, `jsx-a11y` recommended
- TypeScript **strict** + `noUncheckedIndexedAccess`
- Tailwind utility classes ordered by `prettier-plugin-tailwindcss`
- No `// @ts-ignore` — use `@ts-expect-error` with explanation
- No `console.log` in committed code (use `console.warn`/`error` only for genuine warnings)

## GSAP rules (SOP §4.3)

- Animate **only** `transform` / `opacity` — never `width` / `height` / `top` / `left`
- Always use `useGSAP({ scope })` — no bare `useEffect` for GSAP
- Check `prefersReducedMotion()` and bail out of decorative loops
- Use `data-*` selectors inside the scoped ref, never global IDs
- Apply `gpu` utility class to elements that animate continuously

## Tests

- Unit tests: colocate as `src/**/*.test.ts` or place in `tests/unit/`
- E2E: `tests/e2e/<feature>.spec.ts`
- Run locally: `pnpm test` & `pnpm test:e2e`

## Reporting security issues

See [`SECURITY.md`](./SECURITY.md). **Do not file public issues for vulnerabilities.**

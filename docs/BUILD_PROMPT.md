# StackForgeAI Website — Master Build Prompt

> Use this single prompt with any capable senior AI coding assistant (Claude Opus / GPT-5 / Gemini Pro) to **fully reproduce this codebase from scratch**. It references the [Tech Stack SOP](./SOP.md) as the source of truth and bakes in security-first principles, the full SDLC, and pixel-perfect parity with the Lovable design at <https://stackforgeai.lovable.app/>.

---

## How to use

1. Have the SOP (`docs/SOP.md`) and the Lovable design directory available to the assistant.
2. Paste the **PROMPT** below verbatim.
3. Provide the assistant with `git@github.com:StackForgeAI-Projects/stackforgeai-website.git` empty repo.
4. Allow the assistant to install dependencies and run `pnpm build` / `pnpm typecheck` / `pnpm lint` to self-verify.

---

## PROMPT (paste this verbatim)

> You are a senior staff engineer building the **production marketing website for StackForgeAI** — an AI/software company based in Kigali, Rwanda. The brief, the technology stack, the SDLC, and the security baseline are all defined in the attached **`StackForgeAI_TechStack_SOP.docx`** ("the SOP"). The SOP is the single source of truth — when in doubt, defer to it.
>
> ### 0. Inputs you have
>
> - **The SOP** — sections 1–10 cover scope, stack, architecture, GSAP, dev SOPs, project flow, QA, deployment, security, maintenance.
> - **The live Lovable prototype** at <https://stackforgeai.lovable.app/> and its full source export at `./stackforgeai-main/` (TanStack Start + Vite + React 19 + Tailwind 4 + GSAP 3 + i18n EN/RW). Treat this as the **visual + content source of truth** — pixel-perfect parity is required. Read every file before writing anything.
> - **Brand tokens** (Naval-black + Electric green):
>   - Background `oklch(0.18 0.025 240)` / Surface `oklch(0.22 0.028 240)`
>   - Foreground `oklch(0.97 0.01 200)` / Muted `oklch(0.72 0.02 220)`
>   - Primary (electric green) `oklch(0.88 0.27 145)`
>   - Gradient text: `linear-gradient(135deg, oklch(0.92 0.30 142), oklch(0.62 0.22 148))`
>   - Fonts: **Space Grotesk** (display) · **Inter** (sans) · **JetBrains Mono** (mono)
>   - Custom utilities: `.glass`, `.glow-green`, `.glow-green-lg`, `.text-gradient-green`, `.bg-grid`, `.bg-noise`, `.ring-green`, `.animate-marquee`, `.animate-pulse-glow`, `.animate-float-slow`, `.animate-orbit`
>
> ### 1. Tech stack (SOP §2 — non-negotiable)
>
> - **Next.js 15** (App Router, RSC, ISR/SSG), TypeScript 5 strict mode, Tailwind CSS 4, GSAP 3 + ScrollTrigger via `@gsap/react useGSAP`, shadcn/ui (new-york), Radix UI, React Hook Form + Zod, Resend + React Email, Brevo (newsletter, double-opt-in), Upstash Redis `@upstash/ratelimit`, Sentry (`@sentry/nextjs`), Vercel Analytics + Speed Insights, **pnpm** package manager, Vitest + Playwright + axe-core, Lighthouse CI, ESLint 9 flat config, Prettier, Husky + lint-staged + commitlint (Conventional Commits).
>
> ### 2. Migration from Lovable
>
> The Lovable source uses TanStack Start (Vite). **Migrate to Next.js 15 App Router** per SOP §2.1. Specifically:
>
> - Every section component in `stackforgeai-main/src/components/site/` (`Hero`, `Nav`, `About`, `Products`, `Services`, `Impact`, `Testimonials`, `Contact`, `Footer`) must be ported 1:1 to `src/components/sections/<name>.tsx` (mark all `"use client"` and replace `useEffect + gsap.context` with `useGSAP({ scope: ref })`).
> - The i18n provider in `stackforgeai-main/src/lib/i18n.tsx` (EN + RW dictionaries) → port to `src/lib/i18n.tsx` as a client context. Preserve every translation key.
> - `<img src>` → `<Image>` from `next/image`. Move JPGs into `public/images/`.
> - Inline `useEffect(() => gsap.context(...))` → `useGSAP(() => { ... }, { scope: ref })`. **Always check `prefersReducedMotion()` and bail before starting decorative loops.**
> - The Lovable site uses `<a href="#section">` anchor scrolls — preserve those and add `scroll-behavior: smooth` plus `:focus-visible` rings for a11y.
>
> ### 3. Pages
>
> - `/` (single-page composition of Nav + Hero + About + Products + Services + Impact + Testimonials + Contact + Footer)
> - `/privacy` — GDPR + Rwanda Law 058/2021 compliant copy
> - `/terms` — governed by Republic of Rwanda
> - `404`, `error.tsx`, `global-error.tsx`
> - `sitemap.ts`, `robots.ts`, `manifest.ts`, dynamic `opengraph-image.tsx`
>
> ### 4. API routes
>
> - `POST /api/contact` — Zod validation, honeypot field, Upstash rate-limit (5/IP/hour), Origin-header CSRF check, Resend → `hello@stackforgeai.africa` using a React Email template, structured logs, typed JSON responses (`200`, `400`, `403`, `405`, `422`, `429`, `500`).
> - `POST /api/newsletter` — Zod email validation, honeypot, rate-limit (10/IP/hour), Brevo double-opt-in API call, treat duplicates as success.
>
> ### 5. Security (SOP §9 — mandatory)
>
> - CSP, HSTS (preload), X-Frame-Options DENY, X-Content-Type-Options, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy (camera/mic/geo/cohort denied), COOP/CORP same-origin — all set in `next.config.ts`. CSP must allow `va.vercel-scripts.com`, `*.sentry.io`, `*.calendly.com`, `api.resend.com`, `api.brevo.com`, `*.upstash.io`.
> - HTTPS upgrade in `middleware.ts`. Inject `x-request-id` per request.
> - Zod-validate `process.env` via `src/lib/env.ts` (lazy, fails loud in prod).
> - No secrets in client bundle. Every `NEXT_PUBLIC_*` var is non-secret by construction.
> - `pnpm audit --prod --audit-level=high` runs in CI.
> - CodeQL security-extended weekly + on every PR.
> - Sentry PII scrubbing (`beforeSend` strips email / ip_address / cookies).
> - Honeypot fields on both forms.
>
> ### 6. Accessibility (SOP §7, WCAG 2.1 AA)
>
> - Skip-to-content link, semantic landmarks (`header`, `main`, `nav`, `footer`), `aria-label`s on icon-only buttons, `:focus-visible` rings, `aria-live` regions for form errors, `prefers-reduced-motion` honored everywhere, all images have meaningful `alt`, colour contrast verified, keyboard navigation tested in Playwright.
>
> ### 7. Performance (SOP §7.2 Lighthouse budget)
>
> - Performance ≥ 90, A11y ≥ 95, Best Practices ≥ 95, SEO ≥ 90 — enforced in CI via `lighthouserc.json`.
> - LCP < 2.5 s, CLS < 0.1, INP < 200 ms.
> - `next/image` with AVIF + WebP for all photos. `next/font` (Inter, Space Grotesk, JetBrains Mono) — zero CLS.
> - Optimised package imports (lucide-react, gsap, @gsap/react) via `next.config.experimental.optimizePackageImports`.
>
> ### 8. Testing (SOP §7.1)
>
> - Vitest + @testing-library/react for Zod schemas, utils, i18n
> - Playwright + axe-core for E2E: landing renders, anchor nav, language switch persists, contact-form validates, no critical a11y violations
> - Coverage threshold 70% lines/branches/functions/statements in `vitest.config.ts`
>
> ### 9. CI/CD (SOP §8.1)
>
> GitHub Actions: `lint → typecheck → unit → build → lighthouse-ci → e2e → deploy`. Preview deploys on every PR, production on `main`. CodeQL weekly. Dependabot grouped weekly (next/react/radix/gsap/sentry/testing).
>
> ### 10. Deployment (SOP §8.2 + DEPLOYMENT.md)
>
> Hosting: **Vercel** (`fra1` + `cdg1` regions for African edge). DNS: domain on **Namecheap**, nameservers point to **Cloudflare** (proxy ON for apex+www, OFF for MX/SPF/DKIM/DMARC). Email: **SiteGround** for `hello@stackforgeai.africa`. Combined SPF: `v=spf1 include:_spf.siteground.biz include:resend.com ~all`. DMARC policy `quarantine`. Resend domain verification for outbound transactional email.
>
> ### 11. Branch + commit (SOP §5)
>
> `main` (protected) ← `release/*` ← `develop` ← `feature/*` · `fix/*` · `hotfix/*`. **Conventional Commits enforced by commitlint**. Squash & merge only. No merges Friday after 15:00. Husky pre-commit runs `lint-staged` (eslint --fix + prettier --write).
>
> ### 12. Definition of Done (SOP §5 / SOP-06)
>
> A task is done only when **all** are true:
> 1. Works in latest Chrome, Firefox, Safari, Edge.
> 2. Works at 375 px and 768 px.
> 3. All GSAP animations cleaned up on unmount (`useGSAP({ scope })`).
> 4. Lighthouse: Perf ≥ 90 · A11y ≥ 95 · Best Practices ≥ 95 · SEO ≥ 90.
> 5. No TS errors (strict) and no ESLint errors/warnings.
> 6. Unit and/or E2E tests written and passing.
> 7. Code reviewed and CI green.
> 8. Verified on a Vercel Preview deployment.
> 9. Stakeholder sign-off for user-facing changes.
>
> ### 13. Output expectations
>
> - Write **complete** files — no placeholders, no `// TODO`, no `…etc.` Every file must compile.
> - Run `pnpm typecheck` + `pnpm lint` + `pnpm build` and fix every error before declaring done.
> - Produce: full source tree, complete `package.json`, complete `next.config.ts`, complete CI workflows, complete `.env.example`, full README + CONTRIBUTING + SECURITY + DEPLOYMENT + ADRs.
> - Do **not** break any animation present in the Lovable source. Pixel-perfect parity. Same data tokens (`data-hero-anim`, `data-bloom`, `data-float-card`, `data-parallax`, `data-about`, `data-product`, `data-service`, `data-impact`, `data-tm`, `data-contact`).
>
> ### 14. Constraints
>
> - **Do not** introduce CMS, auth, database, payments, or i18n routes (`/en`, `/rw`). The language toggle is client-side state.
> - **Do not** replace shadcn/ui with Material UI or Chakra.
> - **Do not** animate `width`, `height`, `top`, `left`, or any property that triggers reflow. Only `transform` + `opacity`.
> - **Do not** ship secrets in the client bundle.
> - **Do not** disable strict mode, `noUncheckedIndexedAccess`, or any ESLint rule without justification in the PR.
>
> Build it.

---

## Reference manifest (what success looks like)

When the prompt above is executed correctly, the resulting repo should contain at minimum:

```
.github/                  (workflows + dependabot + templates)
.husky/                   (pre-commit + commit-msg hooks)
docs/                     (SOP + DEPLOYMENT + BUILD_PROMPT + architecture + runbook + adr/)
public/                   (logo, images/, favicons)
src/
├── app/                  (layout, page, api/contact, api/newsletter, privacy, terms, 404, error, sitemap, robots, manifest, opengraph-image)
├── components/           (nav, footer, providers, sections/*, ui/*)
├── emails/               (React Email templates)
├── hooks/                (use-mobile, use-prefers-reduced-motion)
├── lib/                  (utils, i18n, gsap, seo, env, rate-limit, email, site, contact-schema)
tests/                    (unit + e2e + setup.ts)
middleware.ts
next.config.ts
sentry.{client,server,edge}.config.ts
instrumentation.ts
vitest.config.ts
playwright.config.ts
lighthouserc.json
vercel.json
package.json + pnpm-lock.yaml
```

The site at `localhost:3000` must visually match <https://stackforgeai.lovable.app/> at all breakpoints with no console errors, no hydration mismatches, and Lighthouse scores meeting the SOP budget.

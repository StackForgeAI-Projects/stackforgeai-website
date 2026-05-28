# StackForgeAI Tech Stack & SOP

This file is a verbatim text copy of **`StackForgeAI_TechStack_SOP.docx`** v1.0 (May 2026), kept in-repo so contributors don't need access to the original .docx. The canonical source is the .docx; this is the implementation reference.

> **Read first:** every PR must satisfy this SOP. When a rule here conflicts with a project convention, the SOP wins.

---

## 1 · Website Analysis & Scope

### 1.1 Sections identified

| Section | Content |
| --- | --- |
| Hero / Above the fold | Brand headline, CTA buttons, animated ticker, trust badges |
| About | Company mission, origin story |
| Products | StackFix, StackEDU, Rwanda Directory — feature cards with tags |
| Services | Three service pillars with numbered callouts |
| Community Impact | Photo gallery, programme stats |
| Testimonials | Three client quotes with avatars |
| Contact | Form (name, email, company, message), Calendly embed, social links |
| Footer | Navigation, newsletter subscription, legal links |

### 1.2 Current tech debt being eliminated

- Lovable origin (no production-grade source control)
- No custom domain or SSL on Lovable
- No real form backend
- No analytics, sitemap, structured data
- WhatsApp placeholder
- No GSAP / scroll animations
- No working newsletter

---

## 2 · Recommended technology stack

See **`README.md`** for the implemented mapping. Every choice in §2 of the SOP is present in this codebase.

---

## 3 · Architecture overview

See **`docs/architecture.md`**.

---

## 4 · GSAP animation integration

Per-section animation mapping is implemented exactly as specified. See `src/lib/gsap.ts` and `src/components/sections/*`.

### 4.3 Performance rules (enforced in code review)

1. Animate only `transform` and `opacity`.
2. `will-change: transform` (via `.gpu` utility) only on actively-animating elements.
3. Kill ScrollTrigger instances in `useGSAP` cleanup.
4. `gsap.matchMedia()` / `prefersReducedMotion()` honored everywhere.
5. Lazy-load ScrollSmoother (not bundled by default).
6. 60 fps target on low-end Android (Cloudflare cache + minimal JS bundle).

---

## 5 · Standard Development SOP

### SOP-01 Environment setup

```bash
corepack enable pnpm
git clone git@github.com:StackForgeAI-Projects/stackforgeai-website.git
pnpm install
cp .env.example .env.local
pnpm prepare         # husky hooks
pnpm dev             # frees :3000 then Next + Turbopack → http://localhost:3000
pnpm test            # all green before any work begins
```

### SOP-02 Branch strategy

| Branch | Purpose |
| --- | --- |
| `main` | Production. Protected. No direct pushes. |
| `develop` | Integration base for features |
| `feature/<slug>` | New features (branch from `develop`) |
| `fix/<slug>` | Bug fixes (branch from `develop` or `main` for hotfix) |
| `release/v1.x` | Release candidate from `develop` |
| `hotfix/<slug>` | Critical bug — merge to both `main` and `develop` |

### SOP-03 Commit standards (Conventional Commits, enforced by commitlint)

```
feat(hero): add GSAP text reveal animation on headline
fix(contact): handle empty company field in form validation
chore(deps): upgrade GSAP to 3.13.0
docs(readme): update local dev setup instructions
perf(images): convert impact photos to WebP format
test(contact): add Playwright e2e for form submission
security(headers): tighten CSP frame-src for calendly
```

### SOP-04 Pull request process

1. Create PR against `develop` (or `main` for hotfix) — PR template required.
2. PR title follows Conventional Commits.
3. Body: What/Why/Screenshots/Testing steps.
4. CI gates: Lint → Typecheck → Unit → Build → Lighthouse → E2E.
5. ≥1 reviewer approval.
6. **No PR merges Friday after 15:00.**
7. **Squash & Merge only.**
8. Delete branch after merge.

### SOP-05 Code review standards

- Reviewers check: functionality, a11y, perf impact, TS strictness, GSAP cleanup.
- No "LGTM" without specific comment.
- Author cannot merge their own PR without team-lead exception.
- Maximum review turnaround: 1 business day.

### SOP-06 Definition of Done

See [`README.md`](../README.md#definition-of-done-sop-06) and [`docs/GIT_WORKFLOW.md`](./GIT_WORKFLOW.md).

---

## 6 · Standard Project Flow — see `docs/DEPLOYMENT.md` §0–§7

---

## 7 · QA & testing cycle

| Layer | Tool | Command |
| --- | --- | --- |
| Unit | Vitest + @testing-library/react | `pnpm test:unit` |
| Integration | Vitest + MSW (when added) | `pnpm test` |
| E2E | Playwright | `pnpm test:e2e` |
| Visual | Playwright screenshots | `pnpm test:e2e` (in `tests/e2e/visual.spec.ts` once added) |
| Performance | Lighthouse CI | `pnpm lhci` |
| Accessibility | axe-core in Playwright | embedded in e2e |

### Lighthouse budget (CI-enforced)

| Metric | Threshold |
| --- | --- |
| Performance | ≥ 90 |
| Accessibility | ≥ 95 |
| Best Practices | ≥ 95 |
| SEO | ≥ 90 |
| LCP | < 2.5 s |
| CLS | < 0.1 |
| INP / TBT | < 200 ms |

---

## 8 · Deployment & DevOps pipeline

See `docs/DEPLOYMENT.md` and `.github/workflows/ci.yml`.

---

## 9 · Security standards

See `SECURITY.md`, `next.config.ts`, `middleware.ts`, and ADR 0001–0005.

### 9.2 GDPR / privacy

- Vercel Analytics is cookieless — no consent banner required.
- Newsletter is double-opt-in (Brevo template).
- Contact data is forwarded to Resend (EU data centres) and not stored in a database.
- `/privacy` page enumerates retention, sub-processors, and data-subject rights.
- Calendly handles its own data-compliance — links to their policy.

---

## 10 · Maintenance & handoff

See `docs/runbook.md`.

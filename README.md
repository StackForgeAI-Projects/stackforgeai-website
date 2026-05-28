# stackforgeai-website

Official repository for the StackForge AI marketing site (**stackforgeai.africa**).

## Local development

Use **pnpm** (see `engines` / `packageManager` in `package.json`).

```bash
pnpm install
cp .env.example .env.local   # fill in secrets locally
pnpm dev                     # http://localhost:3000
```

The dev script frees port **3000** then starts Next.js with Turbopack. If you see Internal Server Error, restart with `pnpm dev` or `rm -rf .next && pnpm dev` — see troubleshooting in git history / `docs/runbook.md`.

Production check: `pnpm build && pnpm start`.

## Git workflow (Pull Requests → production)

**Never push directly to `main`.** Use Pull Requests so you can review code and the Vercel preview before anything goes live.

1. Branch from `develop`: `git switch -c feature/my-change`
2. Push and open a PR
3. Review CI + **Vercel Preview URL** on the PR
4. Approve → **Squash & merge**
5. Merge to `main` triggers the **production** Vercel deploy

Full runbook: [`docs/GIT_WORKFLOW.md`](docs/GIT_WORKFLOW.md).  
Repo admins: `./scripts/configure-branch-protection.sh` (one-time).

## Definition of Done (SOP-06)

Before merge, confirm:

- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm test:unit`, and `pnpm build` pass
- [ ] UI verified on mobile (375px) and tablet (768px) if applicable
- [ ] GSAP animations respect `prefers-reduced-motion` and clean up on unmount
- [ ] No secrets in client bundle; env vars documented in `.env.example`
- [ ] PR template and reviewer checklist completed

See also [`docs/SOP.md`](docs/SOP.md) and [`CONTRIBUTING.md`](CONTRIBUTING.md).

## Docs

| Doc | Purpose |
| --- | --- |
| [`docs/GIT_WORKFLOW.md`](docs/GIT_WORKFLOW.md) | PR → preview → approve → merge → production |
| [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) | Vercel, DNS, env vars, launch checklist |
| [`docs/EMAIL_DELIVERABILITY.md`](docs/EMAIL_DELIVERABILITY.md) | Contact form inbox placement |
| [`docs/SOP.md`](docs/SOP.md) | Engineering standard operating procedures |
| [`docs/runbook.md`](docs/runbook.md) | Rollbacks, key rotation, ops tasks |

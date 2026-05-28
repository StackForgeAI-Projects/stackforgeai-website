# Git workflow — Pull Requests before production

Production at **stackforgeai.africa** must **never** update from a direct push to `main`. Changes go through a **Pull Request (PR)**: you review the diff and Vercel preview, approve, merge, then Vercel deploys production.

---

## The flow (what you asked for)

| Step | What happens | Where |
| --- | --- | --- |
| 1 | Engineer branches from `develop`, commits, pushes | GitHub |
| 2 | Opens a **Pull Request** into `develop` (or `main` for hotfix) | GitHub → Pull requests |
| 3 | **CI runs** (lint, typecheck, tests, build; E2E + Lighthouse on PR) | GitHub Actions |
| 4 | **Vercel Preview** URL is posted on the PR — open it and verify behaviour | Vercel bot comment |
| 5 | **You review + approve** the PR (≥1 approval, CODEOWNERS if applicable) | GitHub |
| 6 | **Squash & merge** (SOP — no direct push to `main`) | GitHub |
| 7 | Merge lands on `main` → **Vercel production deploy** starts automatically | Vercel |

Direct `git push origin main` is **blocked** once branch protection is enabled (see below).

---

## Branch roles

| Branch | Purpose | Vercel |
| --- | --- | --- |
| `main` | Production source of truth | **Production** deploy on merge only |
| `develop` | Integration / staging | **Preview** deploy on every push |
| `feature/*`, `fix/*` | Short-lived work | Preview via PR |

---

## One-time GitHub setup (repo admin)

Run from a machine with [`gh`](https://cli.github.com/) authenticated as an admin:

```bash
./scripts/configure-branch-protection.sh
```

This configures `main` and `develop` to:

- Require a pull request before merging
- Require **1 approving review** (CODEOWNERS where defined)
- Require CI jobs **Lint · Typecheck · Test** and **Build**
- Block force-push and branch deletion
- Apply rules to administrators (`enforce_admins`)

### Bootstrap `develop` (if missing)

```bash
./scripts/bootstrap-develop-branch.sh
```

### Vercel project settings (dashboard)

1. **Settings → Git → Production Branch:** `main`
2. **Settings → Git → Deploy Hooks:** optional backup hook (store URL as `VERCEL_DEPLOY_HOOK_URL` if using manual release workflow)
3. **Settings → Git:** ensure **Preview Deployments** are enabled for pull requests
4. Confirm `vercel.json` matches: production on `main`, previews on `develop` and PRs

Do **not** disable the GitHub integration; production should deploy **only when merges land on `main`**, not when someone bypasses protection.

---

## Optional: manual production gate (extra step after merge)

If you want a **second human click** after merge before traffic switches:

1. Vercel → **Settings → Deployment Protection** → enable **Approval for Production** (Pro plan), **or**
2. Set `"main": false` in `vercel.json` `git.deploymentEnabled` and use **Promote to Production** in the Vercel dashboard for the PR preview you already tested.

Default in this repo: **merge to `main` = production deploy** (PR approval is the gate).

---

## Hotfixes

1. Branch `hotfix/<slug>` from `main`
2. PR **into `main`** (still requires review + CI)
3. After merge, back-merge `main` → `develop`

---

## Rollback

Vercel → Deployments → previous green build → **Promote to Production** (instant, no git revert required). See `docs/runbook.md`.

---

## Related docs

- `CONTRIBUTING.md` — day-to-day commands
- `docs/SOP.md` §SOP-02–04 — branch + PR policy
- `docs/DEPLOYMENT.md` §1 — GitHub branch protection checklist

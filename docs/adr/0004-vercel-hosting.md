# ADR 0004 — Vercel hosting + Cloudflare DNS

- **Status:** Accepted
- **Date:** 2026-05-11

## Decision

Host on **Vercel** in the `fra1` + `cdg1` regions; DNS managed by **Cloudflare** (free plan, proxied). The Namecheap-registered domain is delegated to Cloudflare nameservers. Email continues to be served by **SiteGround** with DNS-only MX records.

## Why

- Vercel = first-party Next.js platform, zero-config builds, instant preview deploys per PR, free SSL, atomic rollback.
- Frankfurt/Paris edges have the lowest round-trip times to Kigali on the AWS Trans-African backbone.
- Cloudflare proxy gives free DDoS protection, edge caching, and Always-Use-HTTPS without a dedicated WAF appliance.
- SiteGround retained for email because (a) we already have the account, (b) mail hosting on Vercel is not in scope.

## Trade-offs

- Two DNS providers in a real sense (Cloudflare zone → SiteGround mail) — mitigated by documenting the exact records in `docs/DEPLOYMENT.md`.
- Vercel free tier has bandwidth limits — acceptable for a marketing site; upgrade path is one click.

# Security Policy

## Supported versions

The production deployment (`main` branch → stackforgeai.africa) is supported. Older versions are not patched.

## Reporting a vulnerability

**Please do not open a public GitHub issue.**

Email **security@stackforgeai.africa** with:

- A description of the vulnerability
- Steps to reproduce / proof-of-concept (no exploitation on production)
- Your suggested remediation (optional)
- Whether you would like public credit

We commit to:

- Acknowledge receipt within **48 hours**
- Provide an initial severity assessment within **5 business days**
- Patch critical/high issues within **14 days** of reproduction
- Coordinate public disclosure with you once the fix is deployed

## Out of scope

- Reports limited to missing minor headers when functionally equivalent ones are set
- Reports based on test/preview deployments (`*.vercel.app`)
- Automated scanner output without manual verification
- Social engineering / physical attacks

## Security controls in production

- HTTPS-only with HSTS preload
- Content Security Policy (see `next.config.ts`)
- Cross-Origin-Opener-Policy + Cross-Origin-Resource-Policy
- Rate limiting on all form endpoints (5 / hour / IP)
- CSRF protection via Origin header verification
- Honeypot fields on every public form
- Server-side Zod validation of every payload
- Dependency scanning via Dependabot + `pnpm audit` in CI
- CodeQL security-extended scan on every PR + weekly
- No secrets in client bundle — env vars validated at runtime
- PII scrubbed from Sentry events before transmission

# ADR 0003 — Resend + React Email for transactional email

- **Status:** Accepted
- **Date:** 2026-05-11

## Decision

Use **Resend** as the transactional email API and **React Email** for templates. Outbound `From` is `StackForgeAI Contact Form <contact@send.stackforgeai.africa>`; `Reply-To` is the visitor. Inbox is `hello@stackforgeai.africa`.

## Why

- Free tier (3,000 emails/month) covers all contact-form needs comfortably.
- React Email lets us version-control the template, preview locally, and re-use Tailwind-like inline styles.
- EU data residency, GDPR-friendly, no contract minimum.
- Simple SDK (`resend.emails.send`) with one well-typed call.

## Trade-offs

- Requires DKIM + DMARC configuration for `stackforgeai.africa` (handled in `docs/DEPLOYMENT.md` §3.2).
- Brevo is used separately for newsletter — two providers, but each is best-of-breed for its specific job.

# Architecture Overview

## Rendering model

| Route                      | Mode                                | Reason                       |
| -------------------------- | ----------------------------------- | ---------------------------- |
| `/`                        | SSG with client GSAP enhancement    | Zero server cost, fast TTFB  |
| `/privacy`, `/terms`       | SSG                                 | Static legal content         |
| `/api/contact`             | Node runtime, dynamic               | Resend SDK + Upstash         |
| `/api/newsletter`          | Node runtime, dynamic               | Brevo API + Upstash          |
| `/opengraph-image`         | Edge runtime, dynamic at build      | `next/og` Image Response     |
| `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` | Static (generated from `app/{sitemap,robots,manifest}.ts`) | Crawler hygiene |

## Data flow — contact form

```
User → React Hook Form (Zod onBlur)
     → POST /api/contact
        → middleware.ts (HTTPS upgrade, request-id)
        → next.config.ts headers() (CSP/HSTS)
        → route.ts:
             ├─ Origin/Referer check (CSRF)
             ├─ Upstash ratelimit(ip, 5/h)
             ├─ Zod parse + honeypot check
             ├─ sendContactEmail (Resend)
             │     └─ ContactNotificationEmail (React Email)
             └─ structured JSON response
     ← Toaster (Sonner) success/error
```

## Data flow — newsletter

```
Footer form → POST /api/newsletter
            → Upstash ratelimit(ip, 10/h)
            → Zod parse + honeypot
            → Brevo /v3/contacts/doubleOptinConfirmation
            → 204 / 400 (duplicate → treat as success) / 5xx
```

## Layered security

1. **Edge** — Cloudflare proxy (DDoS, bot management, TLS termination), Vercel edge anycast.
2. **HTTP** — middleware enforces HTTPS, injects request-id. `next.config.ts` emits CSP / HSTS / X-Frame / Referrer / Permissions / COOP / CORP on every response.
3. **API** — Origin check, IP-bound rate limit, honeypot, Zod schema validation, PII-scrubbed structured logs.
4. **App** — TypeScript strict, ESLint `next/core-web-vitals` + `jsx-a11y`, no client-side secrets, Sentry PII scrubbing.
5. **Build** — `pnpm audit --prod --audit-level=high`, CodeQL security-extended, Dependabot grouped weekly.
6. **Runtime monitoring** — Sentry inbox, Vercel Analytics + Speed Insights, Lighthouse CI budget per PR.

## State management

- Language: client React Context (`LanguageProvider`) backed by a single `localStorage` key (`stackforgeai.lang`). No global state library.
- Form state: React Hook Form (per-form local).
- Toasts: Sonner (event bus).
- Animations: GSAP context per section, scoped via `useGSAP({ scope })`.

## Folder map → see `README.md`

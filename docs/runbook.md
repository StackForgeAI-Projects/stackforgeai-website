# Runbook — Common Ops Tasks

## Rollback a bad production deploy

1. Vercel → Project → Deployments
2. Click the last green deployment → **"Promote to Production"**
3. Confirm → done (no DNS/cert changes; instant)
4. Open a tracking issue with the failing deployment URL and Sentry digest

## Add or update a product card

Edit `src/components/sections/products.tsx`:

```ts
const products: Product[] = [
  { name: "NewProduct", descKey: "products.newproduct.desc", statusKey: "products.liveNow", statusVariant: "live", illustration: "repair", cta: true, href: "https://example.com" },
  // ...
];
```

Then add translation keys to `src/lib/i18n.tsx` in both `en` and `rw` dictionaries.

## Update a testimonial

Edit `src/components/sections/testimonials.tsx` `items` array and the corresponding `tm.q*` keys in `src/lib/i18n.tsx`.

## Rotate the Resend API key

1. Resend → API Keys → create new key, revoke old
2. Vercel → Project → Settings → Environment Variables → update `RESEND_API_KEY` in **Production** and **Preview**
3. Redeploy production

## Add a new env variable

1. Add to `.env.example` with a sample value and short comment
2. Add Zod entry in `src/lib/env.ts` (server or client schema)
3. Add to Vercel UI (Production + Preview)
4. Document the var in `README.md` under "Environment variables"

## Investigate a Sentry alert

1. Open the issue in Sentry
2. Find the offending file/line in the stack trace
3. Replicate locally with `pnpm dev` (if user-input-driven, copy the breadcrumb input)
4. Fix on a `fix/<slug>` branch, write a regression test, PR to `develop`

## Run dependency security review

```bash
pnpm audit --prod --audit-level=high   # fail fast
pnpm outdated                          # see what's behind
pnpm update --interactive              # bump
pnpm typecheck && pnpm lint && pnpm test && pnpm build
```

Open a `chore(deps): monthly bump` PR.

## DNS check

```bash
dig stackforgeai.africa +short            # should resolve to Cloudflare/Vercel IPs
dig MX stackforgeai.africa +short         # SiteGround MX
dig TXT stackforgeai.africa +short        # combined SPF
dig TXT _dmarc.stackforgeai.africa +short
curl -I https://stackforgeai.africa       # 200 + HSTS + CSP headers
```

## TLS / cert renewal

Vercel manages certs automatically when the domain is connected. Cloudflare manages the edge certs. **Action required: none** unless either reports a renewal failure (Sentry alert + email).

## Domain renewal

Namecheap will auto-renew if the card on file is valid. Action: confirm renewal annually in October (current expiry month — update if different).

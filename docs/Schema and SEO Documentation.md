# Schema & SEO documentation — StackForgeAI (`stackforgeai.africa`)

This document describes how structured data (Schema.org JSON-LD), meta tags, and Search Console verification are implemented. It is the single reference for updating SEO without breaking builds or rich-result eligibility.

---

## 1. Goals

- Make entity and service meaning explicit to Google and other crawlers (Organization, WebSite, WebPage, services, products).
- Align copy with **Rwanda** and **Kigali** commercial intent for software, AI, ICT, and digital transformation—without keyword stuffing visible UI copy (keywords live primarily in `keywords`, schema `knowsAbout`, and dedicated meta descriptions).
- Keep one canonical site URL via `metadataBase`, `alternates.canonical`, and `robots.txt` / `sitemap.xml`.

---

## 2. Where things live

| Concern | Location |
|--------|-----------|
| Site URLs, keywords, homepage SEO title/description | `src/lib/site.ts` |
| Default metadata builder, Search Console token helper, `buildHomeMetadata()` | `src/lib/seo.ts` |
| JSON-LD `@graph` builders | `src/lib/schema.ts` |
| Global meta + root `@graph` scripts | `src/app/layout.tsx` |
| Homepage meta override + homepage `@graph` | `src/app/page.tsx` |
| Legal/static pages meta | `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`, … |
| Sitemap | `src/app/sitemap.ts` |
| Robots | `src/app/robots.ts` |
| GA4 (`gtag.js`) | `src/components/google-analytics.tsx`, CSP in `next.config.ts` |

---

## 3. Google Search Console verification

The site verification meta is emitted through **Next.js Metadata API** (same effect as a raw `<meta name="google-site-verification" … />`).

- **Default token** is defined in `src/lib/seo.ts` as `GOOGLE_SITE_VERIFICATION` (public string—verification tokens are not secret).
- **Optional override:** set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in Vercel / `.env.local` to rotate the token without a code deploy.

After deploying, finish verification in **Google Search Console** using the **HTML tag** method.

---

## 4. Metadata (titles, descriptions, Open Graph)

- **`buildMetadata()`** (`src/lib/seo.ts`): default for the whole app when used from `layout.tsx`. Supports `absoluteTitle` so the homepage can use a single polished title without appending `· StackForgeAI`.
- **`buildHomeMetadata()`**: Rwanda/Kigali–focused **title** and **meta description** sourced from `siteConfig.seo.home` in `src/lib/site.ts`.
- **Open Graph**: `locale` / `alternateLocale` hint EN + RW audiences; image path from `siteConfig.ogImage`.
- **Twitter**: `summary_large_image` card (no fictitious `@handle`).

Canonical URL uses `absoluteUrl()` + `NEXT_PUBLIC_SITE_URL` (see `src/lib/utils.ts`).

---

## 5. Structured data (JSON-LD)

### 5.1 Root graph (`layout.tsx`)

`rootStructuredDataGraph()` (`src/lib/schema.ts`) outputs one `<script type="application/ld+json">` with:

- **`Organization`** (`@id`: `{origin}/#organization`): name, URL, logo, description, address (Kigali, RW), geo coordinates, contact points (email + phone), `sameAs` (GitHub), `knowsAbout`, `areaServed`, **`hasOfferCatalog`** (three core services matching the marketing site).
- **`WebSite`** (`@id`: `{origin}/#website`): site URL, languages `en` / `rw`, `publisher` → Organization `@id`.

Stable `@id` fragments allow other nodes to reference the same entities without duplication errors.

### 5.2 Homepage graph (`page.tsx`)

`homeStructuredDataGraph()` adds:

- **`WebPage`** (`@id`: `{origin}/#webpage`): URL `/`, title/description from `siteConfig.seo.home`, `isPartOf` → WebSite, `about` → Organization, `primaryImageOfPage` → OG image.
- **`SoftwareApplication`** nodes for **StackFix**, **StackEDU**, and **Rwanda Directory** (links from `siteConfig.links`), each with `provider` → Organization.

### 5.3 Validation

After deploy, test with:

- [Rich Results Test](https://search.google.com/test/rich-results)
- [Schema Markup Validator](https://validator.schema.org/) (paste rendered JSON-LD from “View page source”)

Fix any reported errors before relying on rich snippets.

---

## 6. Keywords & Rwanda / Kigali focus

High-intent phrases used for **`keywords` meta** and as seeds for **`knowsAbout`** include variations such as:

- Software / web / mobile development **Rwanda** · **Kigali**
- **AI** / machine learning / digital transformation **Rwanda**
- Enterprise / government **software** · **ICT** Rwanda
- Education / **edtech** Rwanda

**Important:** Google largely ignores the legacy `keywords` meta for ranking; it is kept for completeness and internal consistency. **Primary ranking signals** are: useful content, strong titles/descriptions, internal linking, Core Web Vitals, backlinks, and correct structured data—not repeating keywords in visible text unnaturally.

When updating copy, prefer natural language; adjust `siteConfig.seo.home` and `keywords` together.

---

## 7. Operational checklist

1. **`NEXT_PUBLIC_SITE_URL`** = `https://stackforgeai.africa` (or your canonical host) in production.
2. Submit **`/sitemap.xml`** in Search Console.
3. Confirm **`robots.txt`** allows `/` and blocks `/api/` where appropriate.
4. After DNS/email changes, re-check SPF/DKIM/DMARC separately from SEO (transactional mail).

---

## 8. Google Analytics 4 (Google tag / `gtag.js`)

This is **not** [Google Tag Manager](https://tagmanager.google.com/) (a separate container product). Google’s installer loads **`https://www.googletagmanager.com/gtag/js?id=G-…`** — that URL is normal for **GA4**.

| Item | Location |
|------|-----------|
| GA4 snippet | `src/components/google-analytics.tsx` (`GoogleAnalyticsTag`) |
| Wired globally | `src/app/layout.tsx` (fires on every route) |
| Measurement ID | `NEXT_PUBLIC_GA_MEASUREMENT_ID` in `.env.example` / Vercel |
| CSP allowlist | `next.config.ts` (`script-src`, `connect-src` for Google Analytics / Tag Manager hosts) |

The ID must match `G-[A-Za-z0-9]+`. Leave unset or invalid on **preview** deployments if you do not want traffic mixed into the production GA4 property.

**EEA users:** configure [Consent Mode](https://support.google.com/analytics/answer/9976101) if you run ads or need GDPR-aligned defaults.

---

## 9. Safe change guidelines

- Do **not** invent `legalName`, founding dates, or awards unless verified—misleading structured data can violate Google spam policies.
- When adding new product pages, prefer **dedicated URLs** later with their own `WebPage` + `Product`/`SoftwareApplication` schema instead of overloading the homepage graph.
- Keep JSON-LD **in sync** with visible claims (services, locations, contact).

---

## 10. Related files

- `docs/DEPLOYMENT.md` — DNS, Vercel env, Resend, broader launch checklist.
- `SECURITY.md` — headers and CSP (may affect third-party SEO tools; avoid weakening CSP for vanity pixels).

---

*Last updated: aligned with App Router metadata + JSON-LD implementation in `src/lib/seo.ts` and `src/lib/schema.ts`.*

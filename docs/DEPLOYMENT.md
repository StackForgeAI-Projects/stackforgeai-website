# Deployment Guide — StackForgeAI Website

End-to-end runbook for taking this repository to production at **stackforgeai.africa**. Covers Vercel project setup, Namecheap → Cloudflare DNS migration, SiteGround email hosting (MX/SPF/DKIM/DMARC), Resend domain verification, and Sentry/Upstash provisioning.

> Estimated time end-to-end: **2.5–4 hours** (most of it DNS propagation).

---

## 0 · Prerequisites — you should already have

| Asset                | Status                                                                |
| -------------------- | --------------------------------------------------------------------- |
| Domain               | `stackforgeai.africa` registered at **Namecheap** ✅                     |
| Email hosting        | **SiteGround** account ready for `hello@stackforgeai.africa` ✅          |
| GitHub repo          | `git@github.com:StackForgeAI-Projects/stackforgeai-website.git` ✅    |
| Local clone          | `pnpm install && pnpm dev` working ✅                                 |
| `.env.local`         | Populated from `.env.example`                                         |

---

## 1 · Push the repo

```bash
cd "/Users/user/Documents/StackForge AI/Website/stackforgeai"
git init
git checkout -b main
git remote add origin git@github.com:StackForgeAI-Projects/stackforgeai-website.git
git add .
git commit -m "feat(initial): production scaffold per SOP v1.0"
git push -u origin main

# Create the long-lived develop branch
git checkout -b develop
git push -u origin develop
```

In GitHub → Settings → Branches:

- Protect `main`: require PR, require 1 approving review, require status checks
  (`quality`, `build`), include administrators.
- Protect `develop`: require PR, require status checks (`quality`, `build`).
- Settings → Code security → enable **Dependabot alerts**, **Dependabot security updates**, and **CodeQL** (already wired by `.github/workflows/codeql.yml`).

---

## 2 · Provision third-party services

### 2.1 Vercel

1. <https://vercel.com/new> → Import the GitHub repo `stackforgeai-website`.
2. Framework preset: **Next.js** (auto-detected from `vercel.json`).
3. Root directory: leave default (`.`).
4. Build command / install command / output: leave defaults (already set in `vercel.json`).
5. Click **Deploy** — the first deploy will succeed against a free `*.vercel.app` URL.

### 2.2 Resend (transactional email)

1. <https://resend.com> → create org → API Keys → create new key. Copy as `RESEND_API_KEY`.
2. Domains → Add domain → `stackforgeai.africa`.
3. Resend will give you 3 DNS records (MX + SPF + DKIM) — save them, we'll add them in Cloudflare in §3.

### 2.3 Brevo (newsletter)

1. <https://brevo.com> → create account.
2. Contacts → Lists → create a list named `StackForgeAI Newsletter`. Note the numeric ID → `BREVO_LIST_ID`.
3. Email Templates → create a **double-opt-in confirmation** template. Note the template ID → `BREVO_DOUBLE_OPT_IN_TEMPLATE_ID`.
4. SMTP & API → API Keys → generate `xkeysib-…` → `BREVO_API_KEY`.

### 2.4 Upstash (rate limiting)

1. <https://upstash.com> → Redis → create database. Region: `eu-west-1` (closest to Vercel `fra1`).
2. Copy the **REST URL** and **REST TOKEN** → `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`.

### 2.5 Sentry (error monitoring)

1. <https://sentry.io> → Projects → Create → **Next.js**. Name `stackforgeai-website`.
2. Copy the DSN → `NEXT_PUBLIC_SENTRY_DSN`.
3. Auth tokens → create org-scoped token with `project:releases` + `org:read` → `SENTRY_AUTH_TOKEN`.
4. `SENTRY_ORG` = your org slug · `SENTRY_PROJECT` = `stackforgeai-website`.

### 2.6 Cloudflare (DNS + DDoS proxy)

1. <https://dash.cloudflare.com> → Add site → enter `stackforgeai.africa` → Free plan.
2. Cloudflare will scan Namecheap's default zone. Review the imported records — delete anything unrelated (parked-domain CNAMEs, etc.).
3. Cloudflare gives you 2 nameservers — copy them, we'll point Namecheap to them in §3.1.

---

## 3 · Configure DNS

### 3.1 Switch Namecheap to Cloudflare nameservers

In Namecheap: Dashboard → Domain List → **Manage** `stackforgeai.africa`:

- **Nameservers** section → choose **Custom DNS**
- Paste both Cloudflare nameservers (`xxx.ns.cloudflare.com` and `yyy.ns.cloudflare.com`)
- **Save**

Propagation: 10 min – 2 h. Verify with `dig NS stackforgeai.africa +short`. Cloudflare dashboard will confirm "Active" once it sees the switch.

### 3.2 Add the records in Cloudflare

In Cloudflare DNS for `stackforgeai.africa`, create the following. **Proxy status:**

- 🟧 **Proxied** for `@` and `www` (Cloudflare DDoS + caching)
- ⬜ **DNS only** for MX, TXT, mail records (must reach SiteGround unmodified)

| Type  | Name           | Content                                                  | Proxy | TTL  | Notes                                |
| ----- | -------------- | -------------------------------------------------------- | ----- | ---- | ------------------------------------ |
| A     | `@`            | `76.76.21.21`                                            | 🟧    | Auto | Vercel anycast IP                    |
| CNAME | `www`          | `cname.vercel-dns.com`                                   | 🟧    | Auto | Vercel-managed CNAME                 |
| MX    | `@`            | `mailservice.siteground.biz` (priority 10)               | ⬜    | Auto | Get exact host from SiteGround panel |
| TXT   | `@`            | `v=spf1 include:_spf.siteground.biz include:resend.com ~all` | ⬜    | Auto | Combined SPF (SiteGround + Resend) |
| TXT   | `_dmarc`       | `v=DMARC1; p=quarantine; rua=mailto:postmaster@stackforgeai.africa; pct=100; adkim=s; aspf=s` | ⬜ | Auto | DMARC policy |
| CNAME | `s1._domainkey`| `s1.domainkey.siteground.biz`                            | ⬜    | Auto | SiteGround DKIM (verify in SG panel) |
| CNAME | `s2._domainkey`| `s2.domainkey.siteground.biz`                            | ⬜    | Auto | SiteGround DKIM #2                   |
| TXT   | `resend._domainkey` | `<value from Resend dashboard>`                     | ⬜    | Auto | Resend DKIM                          |
| CNAME | `send`         | `feedback-smtp.eu-west-1.amazonses.com`                  | ⬜    | Auto | Resend bounce/feedback (if used)     |

> ℹ️ **Exact SiteGround MX hostname** depends on your SiteGround plan/region. In SiteGround → Site Tools → Email → Accounts → External Configuration, copy the displayed MX/SPF/DKIM values and replace the placeholders above.

### 3.3 Cloudflare → SSL/TLS settings

- **Overview → SSL/TLS encryption mode:** **Full (strict)**
- **Edge Certificates → Always Use HTTPS:** ON
- **Edge Certificates → Automatic HTTPS Rewrites:** ON
- **Edge Certificates → Minimum TLS Version:** 1.2
- **Edge Certificates → HSTS:** Enable, max-age 12 months, include subdomains, preload (only flip preload once you're confident)

---

## 4 · Connect the domain to Vercel

Vercel → Project → Settings → **Domains** → Add → `stackforgeai.africa` and `www.stackforgeai.africa`.

Vercel will report "Pending verification" until DNS sees its records — usually 30–60 s after Cloudflare changes propagate. When green:

- Set the **canonical** to `stackforgeai.africa` (apex)
- Set **`www.stackforgeai.africa`** to redirect to apex
- Click **Refresh** on each to issue the Vercel-managed cert (works because Cloudflare is in **Full strict** + Vercel IP `76.76.21.21` answers behind the proxy).

---

## 5 · Email setup (SiteGround)

In SiteGround Site Tools → Email → Accounts:

1. **Create** the inbox `hello@stackforgeai.africa` (and `security@`, `postmaster@`).
2. Mailbox quota: 5 GB minimum.
3. Verify webmail works: <https://webmail.stackforgeai.africa> (SG provides the URL).

### 5.1 Verify deliverability

After DNS propagation (30 min – 4 h), run:

```bash
dig MX stackforgeai.africa +short
dig TXT stackforgeai.africa +short      # should show your SPF
dig TXT _dmarc.stackforgeai.africa +short
```

Send a test email to <check-auth@verifier.port25.com> from `hello@stackforgeai.africa` and confirm: SPF=pass, DKIM=pass, DMARC=pass. Also check at <https://mxtoolbox.com/SuperTool.aspx?action=mx%3astackforgeai.africa>.

### 5.2 Verify Resend domain

Resend → Domains → `stackforgeai.africa` → click **Verify**. Once green, Resend will accept `From: StackForgeAI <hello@stackforgeai.africa>`.

---

## 6 · Vercel environment variables

Vercel → Project → Settings → **Environment Variables**. Add **all of these** at minimum, scoped to **Production** and **Preview** (and **Development** for local-via-Vercel-CLI workflows):

| Key                                  | Production                                    | Preview / Dev                      |
| ------------------------------------ | --------------------------------------------- | ---------------------------------- |
| `NEXT_PUBLIC_SITE_URL`               | `https://stackforgeai.africa`                    | `https://staging.stackforgeai.africa` |
| `NEXT_PUBLIC_SITE_NAME`              | `StackForgeAI`                                | `StackForgeAI Preview`             |
| `RESEND_API_KEY`                     | from Resend                                   | same                               |
| `CONTACT_FROM_EMAIL`                 | `StackForgeAI <hello@stackforgeai.africa>`       | same                               |
| `CONTACT_TO_EMAIL`                   | `hello@stackforgeai.africa`                      | dev inbox                          |
| `BREVO_API_KEY`                      | from Brevo                                    | (optional)                         |
| `BREVO_LIST_ID`                      | numeric ID                                    | same                               |
| `BREVO_DOUBLE_OPT_IN_TEMPLATE_ID`    | numeric ID                                    | same                               |
| `UPSTASH_REDIS_REST_URL`             | from Upstash                                  | same                               |
| `UPSTASH_REDIS_REST_TOKEN`           | from Upstash                                  | same                               |
| `NEXT_PUBLIC_SENTRY_DSN`             | from Sentry                                   | same                               |
| `SENTRY_AUTH_TOKEN`                  | from Sentry                                   | same                               |
| `SENTRY_ORG`                         | `stackforgeai`                                | same                               |
| `SENTRY_PROJECT`                     | `stackforgeai-website`                        | same                               |
| `NEXT_PUBLIC_CALENDLY_URL`           | `https://calendly.com/stackforgeai/demo`      | same                               |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`        | `+250788XXXXXX`                               | same                               |
| `NEXT_PUBLIC_WHATSAPP_DISPLAY`       | `+250 788 XXX XXX`                            | same                               |

After adding/changing any variable, **Redeploy** the production deployment.

---

## 7 · Final pre-launch checklist (SOP-06 + Phase 6)

- [ ] `pnpm build` succeeds locally with production env vars
- [ ] Domain `stackforgeai.africa` → 200 status, valid TLS, redirect from `www`
- [ ] Lighthouse mobile + desktop ≥ 90 / 95 / 95 / 90
- [ ] Contact form: submit a real test, confirm it arrives at `hello@stackforgeai.africa`
- [ ] Newsletter form: submit, confirm Brevo sends double-opt-in email
- [ ] Rate limit verified (submit 6 contacts quickly → 6th returns 429)
- [ ] `/sitemap.xml` and `/robots.txt` render and contain correct host
- [ ] OG image renders at `/opengraph-image` (paste URL into <https://opengraph.xyz>)
- [ ] Sentry test event captured (Sentry → Issues → fire a test exception)
- [ ] Vercel Analytics shows events
- [ ] DNS: SPF / DKIM / DMARC all pass on test send
- [ ] Submit `https://stackforgeai.africa/sitemap.xml` to Google Search Console
- [ ] Verify domain ownership in Search Console + Bing Webmaster
- [ ] Page passes <https://securityheaders.com> with A+ (CSP, HSTS, X-Frame, Referrer)
- [ ] Page passes <https://observatory.mozilla.org> with A or A+

---

## 8 · Post-launch ops (SOP §10)

- Monitor Sentry inbox daily for first 7 days
- Watch Vercel Analytics → Core Web Vitals weekly
- Run `pnpm update --interactive` monthly; PR a `chore(deps): monthly bump`
- Run `pnpm audit` weekly via Dependabot summary
- Quarterly: full Lighthouse audit + accessibility regression sweep
- Annually: SSL/cert review + domain renewal sanity check

---

## 9 · Rollback procedure

If something breaks in production:

1. Vercel → Deployments → click the previous green deployment → **Promote to Production**
   *(this is instant — DNS / certs unaffected)*
2. Open an incident issue with the failing deployment URL and Sentry digest
3. Revert the offending PR on `main`, fix, re-deploy via the normal flow

Rollback is fully reversible — there are no data migrations to undo.

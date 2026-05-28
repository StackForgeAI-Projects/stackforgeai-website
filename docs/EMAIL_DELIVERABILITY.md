# Contact form email deliverability

Contact submissions use **Resend** (`POST /api/contact` → `sendContactEmail`). If mail arrives in **junk** instead of **inbox**, fix **DNS** and **env vars** — the app cannot override a failing SPF/DKIM/DMARC check at the mailbox.

---

## Root cause (typical)

| Issue | Why it hurts |
| --- | --- |
| **Same From and To** (`hello@` → `hello@` via Resend) | SiteGround/antispam treats it as spoofed “self-mail” from an external relay. |
| **SPF missing Resend** on apex | Live SPF often only authorises SiteGround; Resend sends from Amazon SES IPs → SPF fail/softfail. |
| **HTML-only** | Multipart plain+HTML scores better with filters. |
| **Weak Reply-To** | Bare email without display name reduces trust in some clients. |

Verified on `stackforgeai.africa` (May 2026):

- MX → SiteGround antispam (`mailspamprotection.com`)
- Apex SPF → SiteGround only (`dnssmarthost.net`), **no** `include:resend.com`
- `send.stackforgeai.africa` TXT → `v=spf1 include:amazonses.com ~all` (Resend path)
- Apex `resend._domainkey` → present (Resend DKIM)
- DMARC → `p=none` (Brevo reporting)

---

## Required configuration

### 1 · Vercel / `.env.local`

```env
CONTACT_FROM_EMAIL="StackForgeAI Contact Form <contact@send.stackforgeai.africa>"
CONTACT_TO_EMAIL=hello@stackforgeai.africa
RESEND_API_KEY=re_...
```

**From must not equal To.** After changing env on Vercel, **redeploy production**.

### 2 · Resend dashboard

1. Domains → `stackforgeai.africa` → **Verified** (green).
2. Confirm **send** subdomain records exist (SPF `include:amazonses.com`, feedback CNAME if shown).
3. Resend → API Keys → key matches `RESEND_API_KEY`.

### 3 · DNS (Cloudflare / SiteGround DNS)

**Apex SPF** — merge SiteGround + Resend (single TXT on `@`):

```txt
v=spf1 include:stackforgeai.africa.spf.auto.dnssmarthost.net include:resend.com ~all
```

Keep existing Brevo verification TXT as a **separate** record if required.

**`send` subdomain** (already used by Resend):

```txt
send    TXT    v=spf1 include:amazonses.com ~all
```

**Resend DKIM** (apex):

```txt
resend._domainkey    TXT    <from Resend dashboard>
```

**DMARC** (recommended after SPF/DKIM pass):

```txt
_dmarc    TXT    v=DMARC1; p=quarantine; rua=mailto:postmaster@stackforgeai.africa; pct=100; adkim=s; aspf=s
```

Do **not** proxy MX/TXT mail records through Cloudflare orange cloud — DNS only.

---

## Verify (before closing a deliverability ticket)

```bash
dig MX stackforgeai.africa +short
dig TXT stackforgeai.africa +short
dig TXT send.stackforgeai.africa +short
dig TXT resend._domainkey.stackforgeai.africa +short
dig TXT _dmarc.stackforgeai.africa +short
```

1. Submit the live contact form once.
2. In SiteGround webmail, open the message → **View headers**.
3. Confirm **SPF: pass**, **DKIM: pass**, **DMARC: pass** (or none with aligned DKIM).
4. Move one test from junk to inbox and mark **Not spam** (trains the filter once auth is fixed).

Optional: send a test to [mail-tester.com](https://www.mail-tester.com) using the same From address.

---

## Application behaviour (code)

- **From:** `contact@send.stackforgeai.africa` (transactional subdomain)
- **To:** `hello@stackforgeai.africa` (monitored inbox)
- **Reply-To:** visitor `Name <email@domain>` (reply goes to the enquirer)
- **Multipart:** HTML (React Email) + plain text
- **Subject:** `[Website Contact] Enquiry from {name}`
- Logs a warning if From and To resolve to the same address

See `src/lib/email.ts` and `src/lib/contact-email-content.ts`.

---

## SiteGround inbox rule (optional)

After DNS is correct, add a filter: **From contains** `send.stackforgeai.africa` → move to Inbox. Remove once placement is stable.

---

## Rollback

If Resend is down, form returns 500; there is no silent drop. Promote previous Vercel deployment and fix DNS before retrying.

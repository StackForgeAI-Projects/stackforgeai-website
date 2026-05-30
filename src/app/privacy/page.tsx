import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How StackForgeAI collects, uses, and protects your data. GDPR and Rwanda Data Protection compliant.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main id="main" className="pt-32 pb-24">
        <article className="prose-styles mx-auto max-w-3xl px-6">
          <p className="text-primary font-mono text-xs tracking-widest uppercase">{"// legal"}</p>
          <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight lg:text-5xl">
            Privacy <span className="text-gradient-green">Policy</span>
          </h1>
          <p className="text-muted-foreground mt-4 text-sm">
            Last updated: <time dateTime="2026-05-11">11 May 2026</time>
          </p>

          <section className="text-muted-foreground mt-12 space-y-5 text-base leading-relaxed">
            <p>
              StackForgeAI (&ldquo;we&rdquo;, &ldquo;us&rdquo;) operates this website at{" "}
              <Link href="/" className="text-primary">
                {siteConfig.domain}
              </Link>
              . This policy explains what personal data we collect, why we collect it, how we
              protect it, and your rights under Rwanda&rsquo;s Law No. 058/2021 of 13/10/2021 and
              the EU GDPR.
            </p>
            <h2 className="font-display text-foreground pt-4 text-2xl">1. Data we collect</h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong className="text-foreground">Contact form:</strong> your name, email address,
                optional company name, and the message you submit.
              </li>
              <li>
                <strong className="text-foreground">Newsletter:</strong> email address (with double
                opt-in confirmation).
              </li>
              <li>
                <strong className="text-foreground">Analytics:</strong> aggregated, anonymised
                page-view counts via Vercel Analytics — no cookies, no cross-site tracking.
              </li>
              <li>
                <strong className="text-foreground">Server logs:</strong> request IP and user-agent
                retained for security/abuse prevention (30 days).
              </li>
            </ul>
            <h2 className="font-display text-foreground pt-4 text-2xl">2. How we use it</h2>
            <p>
              Contact-form submissions are emailed to <code>hello@stackforgeai.africa</code> via
              Resend. We use the data solely to respond to your enquiry. We do not sell, share, or
              rent your data to any third party.
            </p>
            <h2 className="font-display text-foreground pt-4 text-2xl">3. Sub-processors</h2>
            <p>
              We rely on Vercel (hosting), Resend (email delivery), Brevo (newsletter), Upstash
              (rate limiting), Cloudflare (DNS &amp; CDN), and Sentry (error monitoring). Each is
              bound by GDPR-equivalent processing terms.
            </p>
            <h2 className="font-display text-foreground pt-4 text-2xl">4. Your rights</h2>
            <p>
              You can request access, correction, deletion, or portability of your personal data at
              any time by emailing{" "}
              <a className="text-primary" href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>
              . We respond within 30 calendar days.
            </p>
            <h2 className="font-display text-foreground pt-4 text-2xl">5. Cookies</h2>
            <p>
              We do not use tracking cookies. The site stores a single non-tracking{" "}
              <code>localStorage</code> key (<code>stackforgeai.lang</code>) to remember your
              language preference. When you choose Kinyarwanda, page translation is provided by
              Google Translate (their servers may process page text per their privacy policy).
            </p>
            <h2 className="font-display text-foreground pt-4 text-2xl">6. Contact</h2>
            <p>
              StackForgeAI · Kigali, Rwanda 🇷🇼 ·{" "}
              <a className="text-primary" href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description: "Terms and conditions governing your use of the StackForgeAI website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main id="main" className="pt-32 pb-24">
        <article className="mx-auto max-w-3xl px-6">
          <p className="text-primary font-mono text-xs tracking-widest uppercase">{"// legal"}</p>
          <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight lg:text-5xl">
            Terms of <span className="text-gradient-green">Service</span>
          </h1>
          <p className="text-muted-foreground mt-4 text-sm">
            Last updated: <time dateTime="2026-05-11">11 May 2026</time>
          </p>
          <section className="text-muted-foreground mt-12 space-y-5 text-base leading-relaxed">
            <p>
              By accessing or using{" "}
              <Link href="/" className="text-primary">
                {siteConfig.domain}
              </Link>{" "}
              you agree to these terms. If you do not agree, please do not use the site.
            </p>
            <h2 className="font-display text-foreground pt-4 text-2xl">1. Acceptable use</h2>
            <p>
              You may not attempt to gain unauthorised access, run automated scrapers without prior
              written consent, or submit unlawful content via any form.
            </p>
            <h2 className="font-display text-foreground pt-4 text-2xl">2. Intellectual property</h2>
            <p>
              All content, branding, code, and design on this site are © StackForgeAI Ltd. unless
              otherwise stated. The product names StackFix, StackEDU, and Rwanda Directory are
              trademarks of StackForgeAI.
            </p>
            <h2 className="font-display text-foreground pt-4 text-2xl">3. No warranty</h2>
            <p>
              The site is provided &ldquo;as is&rdquo; without warranty of any kind. We do not
              guarantee uninterrupted availability.
            </p>
            <h2 className="font-display text-foreground pt-4 text-2xl">4. Liability</h2>
            <p>
              To the maximum extent permitted by law, StackForgeAI is not liable for indirect,
              incidental, or consequential damages arising from your use of the site.
            </p>
            <h2 className="font-display text-foreground pt-4 text-2xl">5. Governing law</h2>
            <p>
              These terms are governed by the laws of the Republic of Rwanda. Disputes will be
              resolved in the courts of Kigali.
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

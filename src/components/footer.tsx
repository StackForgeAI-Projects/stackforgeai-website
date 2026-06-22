"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { siteConfig, PRODUCT_SECTION_IDS } from "@/lib/site";
import { newsletterSchema } from "@/lib/contact-schema";
import { FormAlert } from "@/components/ui/form-alert";

export function Footer() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState(""); // honeypot
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState<{ variant: "success" | "error"; message: string } | null>(
    null,
  );
  const { t } = useLang();

  const companySections = siteConfig.nav
    .filter((s) => s.href !== "#products")
    .map((s) => ({ href: s.href, label: t(s.labelKey) }));

  const productLinks = [
    {
      href: siteConfig.links.stackfix,
      labelKey: "footer.product.stackfix" as const,
      external: true,
    },
    {
      href: `/#${PRODUCT_SECTION_IDS.stackedu}`,
      labelKey: "footer.product.stackedu" as const,
      external: false,
    },
    {
      href: `/#${PRODUCT_SECTION_IDS.directory}`,
      labelKey: "footer.product.directory" as const,
      external: false,
    },
  ];

  const onSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAlert(null);
    const parsed = newsletterSchema.safeParse({ email, fullName });
    if (!parsed.success) {
      setAlert({
        variant: "error",
        message: parsed.error.errors[0]?.message ?? "Please enter a valid email",
      });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (res.status === 429) {
        setAlert({
          variant: "error",
          message: body.error ?? "Too many requests. Try again later.",
        });
        return;
      }
      if (!res.ok) {
        setAlert({ variant: "error", message: body.error ?? "Subscription failed" });
        return;
      }
      setEmail("");
      setAlert({ variant: "success", message: t("footer.subscribed.detail") });
    } catch {
      setAlert({ variant: "error", message: "Subscription failed. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="border-border/60 bg-surface/30 relative overflow-hidden border-t pt-20 pb-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, oklch(0.88 0.27 145 / 0.5), transparent 70%)",
        }}
      />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <Link
            href="#top"
            aria-label={`${siteConfig.name} home`}
            className="group inline-flex items-center"
          >
            <Image
              src="/logo.png"
              alt="StackForgeAI"
              width={947}
              height={157}
              className="h-7 w-auto object-contain transition-transform duration-300 select-none group-hover:scale-[1.04] md:h-8"
              draggable={false}
            />
          </Link>
          <p className="text-muted-foreground mt-5 max-w-sm text-base leading-relaxed">
            {t("footer.tagline")}
          </p>
          <p className="text-muted-foreground mt-4 text-base">{t("footer.location")}</p>
        </div>

        <div className="lg:col-span-2">
          <div className="text-primary font-mono text-xs tracking-widest uppercase">
            {t("footer.company")}
          </div>
          <ul className="mt-5 space-y-3">
            {companySections.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <div className="text-primary font-mono text-xs tracking-widest uppercase">
            {t("footer.products")}
          </div>
          <ul className="mt-5 space-y-3">
            {productLinks.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  target={p.external ? "_blank" : undefined}
                  rel={p.external ? "noopener noreferrer" : undefined}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {t(p.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5">
          <div className="text-primary font-mono text-xs tracking-widest uppercase">
            {t("footer.newsletter")}
          </div>
          <p className="text-muted-foreground mt-5 text-base leading-relaxed">
            {t("footer.newsletter.desc")}
          </p>
          <form onSubmit={onSubscribe} className="mt-5 flex flex-col gap-3 sm:flex-row">
            {/* Honeypot */}
            <input
              type="text"
              autoComplete="off"
              tabIndex={-1}
              aria-hidden
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
            />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("footer.email.placeholder")}
              aria-label="Email address"
              autoComplete="email"
              className="bg-surface/60 border-border text-foreground placeholder:text-muted-foreground/50 focus:ring-primary/50 focus:border-primary/50 flex-1 rounded-full border px-5 py-3 text-sm transition focus:ring-2 focus:outline-none"
            />
            <button
              type="submit"
              disabled={submitting}
              className="btn-press group bg-primary text-primary-foreground glow-green focus-visible:ring-primary/70 focus-visible:ring-offset-background inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {submitting ? (
                "…"
              ) : (
                <>
                  {t("footer.subscribe")}
                  <span aria-hidden className="btn-arrow">
                    →
                  </span>
                </>
              )}
            </button>
          </form>
          {alert ? (
            <FormAlert
              variant={alert.variant}
              message={alert.message}
              onDismiss={() => setAlert(null)}
              className="max-w-xl"
            />
          ) : null}
        </div>
      </div>

      <div className="border-border/60 text-muted-foreground/70 relative mx-auto mt-16 flex max-w-7xl flex-col items-center justify-between gap-4 border-t px-6 pt-6 text-xs sm:flex-row">
        <div>{t("footer.copyright")}</div>
        <div className="flex items-center gap-5">
          <Link href="/privacy" className="hover:text-foreground transition">
            {t("footer.privacy")}
          </Link>
          <span>·</span>
          <Link href="/terms" className="hover:text-foreground transition">
            {t("footer.terms")}
          </Link>
        </div>
      </div>
    </footer>
  );
}

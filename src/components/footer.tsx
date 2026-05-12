"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { useLang } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import { newsletterSchema } from "@/lib/contact-schema";

export function Footer() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState(""); // honeypot
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { t } = useLang();

  const sections = siteConfig.nav.map((s) => ({ href: s.href, label: t(s.labelKey) }));

  const onSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsed = newsletterSchema.safeParse({ email, fullName });
    if (!parsed.success) {
      toast.error(parsed.error.errors[0]?.message ?? "Invalid email");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (res.status === 429) {
        toast.error("Too many requests. Try again later.");
        return;
      }
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error ?? "Subscription failed");
      }
      setSubscribed(true);
      toast.success(t("footer.subscribed"));
      setEmail("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Subscription failed");
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
        <div className="lg:col-span-4">
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
          <p className="text-muted-foreground mt-5 max-w-sm text-sm leading-relaxed">
            {t("footer.tagline")}
          </p>
          <p className="text-muted-foreground mt-4 text-sm">{t("footer.location")}</p>
        </div>

        <div className="lg:col-span-3">
          <div className="text-primary font-mono text-xs tracking-widest uppercase">
            {t("footer.navigate")}
          </div>
          <ul className="mt-5 space-y-3">
            {sections.map((s) => (
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

        <div className="lg:col-span-5">
          <div className="text-primary font-mono text-xs tracking-widest uppercase">
            {t("footer.newsletter")}
          </div>
          <p className="text-muted-foreground mt-5 text-sm leading-relaxed">
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
              disabled={submitting || subscribed}
              className="btn-press group bg-primary text-primary-foreground glow-green focus-visible:ring-primary/70 focus-visible:ring-offset-background inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {subscribed ? (
                t("footer.subscribed")
              ) : submitting ? (
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

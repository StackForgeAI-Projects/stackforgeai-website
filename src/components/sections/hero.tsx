"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";

const TICKER_ITEMS = [
  "AI Systems",
  "Education Platforms",
  "Government Tech",
  "Custom Software",
  "Web Applications",
  "Automation",
  "Data Infrastructure",
  "Africa-first",
] as const;

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const { t } = useLang();

  useGSAP(
    () => {
      const reduce = prefersReducedMotion();
      gsap.set("[data-hero-anim]", { autoAlpha: 1 });

      if (reduce) return;

      gsap.from("[data-hero-anim]", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.15,
      });
      gsap.to("[data-bloom]", {
        scale: 1.08,
        opacity: 0.85,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to("[data-float-card]", {
        y: -12,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.4,
      });

      const onMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 18;
        const y = (e.clientY / window.innerHeight - 0.5) * 18;
        gsap.to("[data-parallax]", { x, y, duration: 1.4, ease: "power2.out" });
      };
      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    },
    { scope: root },
  );

  return (
    <section
      id="top"
      ref={root}
      className="bg-background relative min-h-screen overflow-hidden pt-28 pb-20 sm:pb-24 lg:pb-32"
    >
      {/* Dotted world map background */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(circle, oklch(0.97 0.01 200 / 0.9) 1px, transparent 1.4px)",
          backgroundSize: "14px 14px",
          maskImage: "radial-gradient(ellipse 70% 55% at 50% 40%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 55% at 50% 40%, black 30%, transparent 75%)",
        }}
        aria-hidden
      />

      {/* Decorative continent silhouette */}
      <svg
        className="pointer-events-none absolute inset-x-0 top-20 mx-auto opacity-[0.08]"
        viewBox="0 0 1200 500"
        width="100%"
        height="500"
        fill="oklch(0.97 0.01 200)"
        aria-hidden
      >
        <path d="M180 180c30-40 90-50 140-30s80 20 130 5 90 0 110 30 60 30 110 10 110 10 90 50-40 80-100 70-110-20-160 0-110 60-180 50-100-50-140-90-30-65 0-95z" />
      </svg>

      {/* Bottom green bloom */}
      <div
        data-bloom
        aria-hidden
        className="gpu pointer-events-none absolute -bottom-40 left-1/2 h-[700px] w-[1100px] -translate-x-1/2 rounded-[100%] opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.88 0.27 145 / 0.55) 0%, oklch(0.88 0.27 145 / 0.25) 35%, transparent 70%)",
        }}
      />
      {/* Side teal accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full opacity-40 blur-3xl"
        style={{
          background: "radial-gradient(circle, oklch(0.55 0.18 200 / 0.5), transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <div
          data-hero-anim
          className="glass text-muted-foreground inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
            <span className="bg-primary relative inline-flex h-2 w-2 rounded-full" />
          </span>
          {t("hero.badge")}
        </div>

        <h1
          data-hero-anim
          className="font-display mx-auto mt-8 max-w-5xl text-5xl leading-[1.02] font-semibold tracking-tight sm:text-6xl lg:text-7xl xl:text-[88px]"
        >
          {t("hero.title.1")} <span className="text-gradient-green">{t("hero.title.2")}</span>{" "}
          {t("hero.title.3")}
        </h1>

        <p
          data-hero-anim
          className="text-muted-foreground mx-auto mt-8 max-w-2xl text-base leading-relaxed sm:text-lg"
        >
          {t("hero.subtitle")}
        </p>

        <div data-hero-anim className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#products"
            className="btn-press group bg-primary text-primary-foreground glow-green-lg focus-visible:ring-primary/70 focus-visible:ring-offset-background relative inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            {t("hero.cta.products")}
            <span aria-hidden className="btn-arrow">
              →
            </span>
          </a>
          <a
            href="#contact"
            className="btn-press btn-ghost-hover border-border bg-surface/50 text-foreground focus-visible:ring-primary/70 focus-visible:ring-offset-background inline-flex items-center gap-2 rounded-full border px-7 py-3.5 font-medium backdrop-blur focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            {t("hero.cta.contact")}
            <span aria-hidden className="btn-arrow opacity-70">
              →
            </span>
          </a>
        </div>

        {/* Floating glass cards (parallax) */}
        <div data-parallax className="relative mx-auto mt-20 hidden h-48 max-w-4xl md:block">
          <div
            data-hero-anim
            data-float-card
            className="glass gpu absolute top-4 left-0 w-56 rounded-2xl p-4 text-left"
          >
            <div className="text-muted-foreground text-xs">{t("hero.card.mission")}</div>
            <div className="font-display mt-1 text-lg leading-tight font-semibold">
              {t("hero.card.builtFor")}
            </div>
            <div className="mt-3 flex h-8 items-end gap-1">
              {[25, 40, 55, 70, 85, 95].map((h, i) => (
                <div
                  key={i}
                  className="bg-primary/80 w-2.5 rounded-sm"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          <div
            data-hero-anim
            data-float-card
            className="glass ring-green gpu absolute top-0 left-1/2 w-72 -translate-x-1/2 rounded-2xl p-5 text-left"
          >
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 border-primary/40 text-primary flex h-10 w-10 items-center justify-center rounded-xl border">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden
                >
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-medium">{t("hero.card.products")}</div>
                <div className="text-muted-foreground text-xs">{t("hero.card.deployed")}</div>
              </div>
            </div>
            <div className="bg-surface mt-3 h-1.5 overflow-hidden rounded-full">
              <div className="bg-primary h-full rounded-full" style={{ width: "78%" }} />
            </div>
          </div>

          <div
            data-hero-anim
            data-float-card
            className="glass gpu absolute top-6 right-0 w-52 rounded-2xl p-4 text-left"
          >
            <div className="flex items-center gap-2">
              <div className="bg-primary/20 text-primary flex h-8 w-8 items-center justify-center rounded-lg">
                ✓
              </div>
              <div>
                <div className="text-sm font-medium">{t("hero.card.security")}</div>
                <div className="text-muted-foreground text-xs">{t("hero.card.standard")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="border-border/60 bg-surface/30 relative mt-16 overflow-hidden border-y">
        <div className="animate-marquee flex py-5 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, k) => (
            <div
              key={k}
              className="text-muted-foreground/70 flex shrink-0 items-center gap-12 px-6"
              aria-hidden={k === 1}
            >
              {TICKER_ITEMS.map((item) => (
                <span key={item} className="font-display flex items-center gap-12 text-xl">
                  {item}
                  <span className="bg-primary h-1.5 w-1.5 rounded-full" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

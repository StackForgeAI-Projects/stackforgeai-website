"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";

const serviceMeta = [
  {
    n: "01",
    titleKey: "services.web.title",
    descKey: "services.web.desc",
    icon: (
      <svg
        viewBox="0 0 48 48"
        className="h-10 w-10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden
      >
        <rect x="4" y="8" width="40" height="32" rx="3" />
        <path d="M4 16h40M10 24h12M10 30h20" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    n: "02",
    titleKey: "services.ai.title",
    descKey: "services.ai.desc",
    icon: (
      <svg
        viewBox="0 0 48 48"
        className="h-10 w-10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden
      >
        <circle cx="24" cy="24" r="8" />
        <path
          d="M24 4v6M24 38v6M4 24h6M38 24h6M10 10l4 4M34 34l4 4M10 38l4-4M34 14l4-4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    n: "03",
    titleKey: "services.support.title",
    descKey: "services.support.desc",
    icon: (
      <svg
        viewBox="0 0 48 48"
        className="h-10 w-10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M30 6l12 12-6 6-4-4-18 18-8-8 18-18-4-4 6-6z" />
        <path d="M30 6l-4 4 8 8 4-4" />
        <path d="M14 30l4 4" />
      </svg>
    ),
  },
];

export function Services() {
  const ref = useRef<HTMLElement>(null);
  const { t } = useLang();

  useGSAP(
    () => {
      gsap.set("[data-service]", { autoAlpha: 1 });
      if (prefersReducedMotion()) return;
      gsap.from("[data-service]", {
        x: -60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });
    },
    { scope: ref },
  );

  return (
    <section id="services" ref={ref} className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
      <div
        aria-hidden
        className="absolute top-1/2 -left-40 h-[500px] w-[500px] -translate-y-1/2 rounded-full opacity-25 blur-3xl"
        style={{
          background: "radial-gradient(circle, oklch(0.88 0.27 145 / 0.5), transparent 70%)",
        }}
      />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12">
        <div className="self-start lg:sticky lg:top-32 lg:col-span-4">
          <div className="text-primary font-mono text-sm tracking-widest uppercase">
            {t("services.kicker")}
          </div>
          <h2 className="font-display mt-4 text-4xl font-semibold tracking-tight lg:text-5xl">
            {t("services.title.1")}{" "}
            <span className="text-gradient-green">{t("services.title.2")}</span>.
          </h2>
          <p className="text-muted-foreground mt-6 text-base">{t("services.intro")}</p>
        </div>
        <div className="space-y-5 lg:col-span-8">
          {serviceMeta.map((s) => (
            <div
              key={s.n}
              data-service
              className="group glass hover:bg-surface/80 relative overflow-hidden rounded-3xl p-8 transition-colors lg:flex lg:gap-6"
            >
              <div
                aria-hidden
                className="absolute -right-20 -bottom-20 h-56 w-56 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-60"
                style={{
                  background:
                    "radial-gradient(circle, oklch(0.88 0.27 145 / 0.5), transparent 70%)",
                }}
              />
              {/* Mobile: icon left + number right on one row */}
              <div className="flex items-center justify-between gap-4 lg:hidden">
                <div className="relative">
                  <div
                    aria-hidden
                    className="bg-primary/20 animate-pulse-glow absolute inset-0 rounded-2xl blur-xl"
                  />
                  <div className="border-primary/30 bg-primary/10 text-primary relative flex h-16 w-16 items-center justify-center rounded-2xl border">
                    {s.icon}
                  </div>
                </div>
                <span className="text-muted-foreground font-mono text-sm">{s.n}</span>
              </div>

              {/* Desktop: icon as a left column */}
              <div className="relative hidden flex-shrink-0 lg:block">
                <div
                  aria-hidden
                  className="bg-primary/20 animate-pulse-glow absolute inset-0 rounded-2xl blur-xl"
                />
                <div className="border-primary/30 bg-primary/10 text-primary relative flex h-16 w-16 items-center justify-center rounded-2xl border">
                  {s.icon}
                </div>
              </div>

              <div className="mt-5 lg:mt-0 lg:flex-1">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-display text-foreground text-2xl font-semibold">
                    {t(s.titleKey)}
                  </h3>
                  {/* Number visible only on desktop here; mobile shows it in the top row */}
                  <span className="text-muted-foreground hidden font-mono text-sm lg:inline">
                    {s.n}
                  </span>
                </div>
                <p className="text-muted-foreground mt-3 text-base leading-relaxed">
                  {t(s.descKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

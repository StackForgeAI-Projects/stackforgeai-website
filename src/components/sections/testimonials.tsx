"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";

const items = [
  {
    quoteKey: "tm.q1",
    name: "Aline M.",
    role: "Operations Lead, Kigali Repair Co.",
    initials: "AM",
  },
  {
    quoteKey: "tm.q2",
    name: "Jean-Paul K.",
    role: "Director, Higher Ed Institute",
    initials: "JK",
  },
  { quoteKey: "tm.q3", name: "Diane U.", role: "Founder, Rwanda SME Network", initials: "DU" },
];

export function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const { t } = useLang();

  useGSAP(
    () => {
      gsap.set("[data-tm]", { autoAlpha: 1 });
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-tm]",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="bg-surface/40 relative py-20 sm:py-24 lg:py-32"
      aria-label="Testimonials"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <div className="text-primary font-mono text-sm tracking-widest uppercase">
            {t("tm.kicker")}
          </div>
          <h2 className="font-display mt-4 text-4xl font-semibold tracking-tight lg:text-5xl">
            {t("tm.title.1")} <span className="text-gradient-green">{t("tm.title.2")}</span>.
          </h2>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {items.map((tm, i) => (
            <figure
              key={i}
              data-tm
              className="glass flex flex-col justify-between rounded-3xl p-8 transition hover:-translate-y-1"
            >
              <svg
                className="text-primary/60 h-8 w-8"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M7 7h4v4H7v4a4 4 0 004-4V7zm6 0h4v4h-4v4a4 4 0 004-4V7z" />
              </svg>
              <blockquote className="text-foreground mt-6 text-base leading-relaxed">
                &ldquo;{t(tm.quoteKey)}&rdquo;
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3">
                <div
                  aria-hidden
                  className="bg-primary/15 border-primary/30 text-primary flex h-11 w-11 items-center justify-center rounded-full border font-semibold"
                >
                  {tm.initials}
                </div>
                <div>
                  <div className="text-foreground font-medium">{tm.name}</div>
                  <div className="text-muted-foreground text-sm">{tm.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";

export function Impact() {
  const ref = useRef<HTMLElement>(null);
  const { t } = useLang();

  useGSAP(
    () => {
      gsap.set("[data-impact]", { autoAlpha: 1 });
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-impact]",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <section id="impact" ref={ref} className="relative py-20 sm:py-24 lg:py-32">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="glass relative overflow-hidden rounded-[2.5rem] p-10 lg:p-16">
          <div
            aria-hidden
            className="absolute inset-0 opacity-90"
            style={{
              background:
                "radial-gradient(at top left, oklch(0.88 0.27 145 / 0.25), transparent 50%), radial-gradient(at bottom right, oklch(0.55 0.20 220 / 0.25), transparent 50%)",
            }}
          />
          <div aria-hidden className="bg-grid absolute inset-0 opacity-30" />

          <div className="relative grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div data-impact className="text-primary font-mono text-sm tracking-widest uppercase">
                {t("impact.kicker")}
              </div>
              <h2
                data-impact
                className="font-display mt-4 text-4xl font-semibold tracking-tight lg:text-5xl"
              >
                {t("impact.title.1")}{" "}
                <span className="text-gradient-green">{t("impact.title.2")}</span>{" "}
                {t("impact.title.3")}
              </h2>
              <p
                data-impact
                className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed"
              >
                {t("impact.p1")}
              </p>
              <p data-impact className="text-muted-foreground mt-4 max-w-2xl leading-relaxed">
                {t("impact.p2")}
              </p>
              <a
                data-impact
                href="#contact"
                className="btn-press group bg-primary text-primary-foreground glow-green focus-visible:ring-primary/70 focus-visible:ring-offset-background mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              >
                {t("impact.cta")}{" "}
                <span aria-hidden className="btn-arrow">
                  →
                </span>
              </a>
            </div>

            <div className="relative h-[480px] lg:col-span-6">
              <div
                data-impact
                className="border-border/60 absolute top-0 left-0 w-[58%] rotate-[-3deg] overflow-hidden rounded-2xl border shadow-2xl"
              >
                <Image
                  src="/images/impact-1.jpg"
                  alt={t("impact.img1.alt")}
                  width={1280}
                  height={854}
                  sizes="(max-width: 1024px) 60vw, 30vw"
                  className="h-56 w-full object-cover"
                />
              </div>
              <div
                data-impact
                className="border-primary/30 ring-green absolute top-16 right-0 w-[55%] rotate-[4deg] overflow-hidden rounded-2xl border shadow-2xl"
              >
                <Image
                  src="/images/impact-2.jpg"
                  alt={t("impact.img2.alt")}
                  width={2160}
                  height={1440}
                  sizes="(max-width: 1024px) 60vw, 30vw"
                  className="h-52 w-full object-cover"
                />
              </div>
              <div
                data-impact
                className="border-border/60 absolute bottom-0 left-8 w-[64%] rotate-[2deg] overflow-hidden rounded-2xl border shadow-2xl"
              >
                <Image
                  src="/images/impact-3.jpg"
                  alt={t("impact.img3.alt")}
                  width={1024}
                  height={1024}
                  sizes="(max-width: 1024px) 60vw, 30vw"
                  className="h-56 w-full object-cover"
                />
              </div>

              <div
                data-impact
                className="glass absolute right-2 bottom-6 flex items-center gap-3 rounded-2xl px-4 py-3"
              >
                <div
                  aria-hidden
                  className="bg-primary/20 border-primary/40 text-primary flex h-9 w-9 items-center justify-center rounded-full border text-lg"
                >
                  ♥
                </div>
                <div className="text-left">
                  <div className="text-muted-foreground text-xs">{t("impact.badge.title")}</div>
                  <div className="text-sm font-medium">{t("impact.badge.subtitle")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

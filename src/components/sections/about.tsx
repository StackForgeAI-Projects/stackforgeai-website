"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";

export function About() {
  const ref = useRef<HTMLElement>(null);
  const { t } = useLang();

  useGSAP(
    () => {
      gsap.set("[data-about]", { autoAlpha: 1 });
      if (prefersReducedMotion()) return;
      gsap.from("[data-about]", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    },
    { scope: ref },
  );

  return (
    <section id="about" ref={ref} className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
      <div
        aria-hidden
        className="absolute -top-32 right-0 h-[500px] w-[500px] rounded-full opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(circle, oklch(0.88 0.27 145 / 0.4), transparent 70%)",
        }}
      />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div data-about className="text-primary font-mono text-sm tracking-widest uppercase">
            {t("about.kicker")}
          </div>
          <h2
            data-about
            className="font-display mt-4 text-4xl font-semibold tracking-tight lg:text-5xl"
          >
            {t("about.title.1")} <span className="text-gradient-green">{t("about.title.2")}</span>.
          </h2>
        </div>
        <div className="text-muted-foreground space-y-6 text-base leading-relaxed lg:col-span-7">
          <p data-about>{t("about.p1")}</p>
          <p data-about>{t("about.p2")}</p>
        </div>
      </div>
    </section>
  );
}

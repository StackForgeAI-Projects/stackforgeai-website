"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type StatusVariant = "live" | "dev" | "soon";
type IllustrationKind = "repair" | "education" | "directory";
type Product = {
  name: string;
  descKey: string;
  statusKey: string;
  statusVariant: StatusVariant;
  illustration: IllustrationKind;
  cta?: boolean;
  href?: string;
};

const products: Product[] = [
  {
    name: "StackFix",
    descKey: "products.stackfix.desc",
    statusKey: "products.liveNow",
    statusVariant: "live",
    illustration: "repair",
    cta: true,
    href: siteConfig.links.stackfix,
  },
  {
    name: "StackEDU",
    descKey: "products.stackedu.desc",
    statusKey: "products.inDev",
    statusVariant: "dev",
    illustration: "education",
    cta: true,
  },
  {
    name: "Rwanda Directory",
    descKey: "products.directory.desc",
    statusKey: "products.comingSoon",
    statusVariant: "soon",
    illustration: "directory",
  },
];

const statusStyles: Record<StatusVariant, string> = {
  live: "text-primary border-primary/50 bg-primary/10",
  dev: "text-amber-300 border-amber-300/50 bg-amber-300/10",
  soon: "text-primary border-primary/40",
};

export function Products() {
  const ref = useRef<HTMLElement>(null);
  const { t } = useLang();

  useGSAP(
    () => {
      gsap.set("[data-product]", { autoAlpha: 1 });
      if (prefersReducedMotion()) return;
      gsap.from("[data-product]", {
        y: 80,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
    },
    { scope: ref },
  );

  return (
    <section id="products" ref={ref} className="bg-surface/40 relative py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <div className="text-primary font-mono text-sm tracking-widest uppercase">
            {t("products.kicker")}
          </div>
          <h2 className="font-display mt-4 text-4xl font-semibold tracking-tight lg:text-5xl">
            {t("products.title.1")}{" "}
            <span className="text-gradient-green">{t("products.title.2")}</span>.
          </h2>
        </div>

        <div className="mt-20 space-y-10">
          {products.map((p, idx) => {
            const reverse = idx % 2 === 1;
            return (
              <article
                key={p.name}
                data-product
                className="group border-border/60 hover:border-primary/40 relative overflow-hidden rounded-3xl border bg-[oklch(0.20_0.025_240)] transition-colors"
              >
                <div
                  className={cn(
                    "grid gap-0 lg:grid-cols-2",
                    reverse && "lg:[&>*:first-child]:order-2",
                  )}
                >
                  <div className="flex flex-col justify-center p-8 lg:p-12">
                    <span
                      className={cn(
                        "self-start rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-wider uppercase",
                        statusStyles[p.statusVariant],
                      )}
                    >
                      {t(p.statusKey)}
                    </span>
                    <h3 className="font-display text-foreground mt-3 text-3xl font-semibold lg:text-4xl">
                      {p.name}
                    </h3>
                    <p className="text-muted-foreground mt-5 max-w-md text-base leading-relaxed">
                      {t(p.descKey)}
                    </p>
                    {p.cta && p.statusVariant === "dev" ? (
                      <button
                        type="button"
                        disabled
                        aria-disabled="true"
                        className="text-muted-foreground/60 border-border/60 mt-6 inline-flex w-fit cursor-not-allowed items-center gap-2 rounded-full border px-4 py-2 font-mono text-sm tracking-wider uppercase"
                      >
                        {t("products.tryNow")}
                        <ArrowRight />
                      </button>
                    ) : p.cta ? (
                      <a
                        href={p.href ?? "#contact"}
                        target={p.href ? "_blank" : undefined}
                        rel={p.href ? "noopener noreferrer" : undefined}
                        className="text-primary focus-visible:ring-primary/60 focus-visible:ring-offset-background mt-6 inline-flex w-fit items-center gap-2 rounded-full font-mono text-sm tracking-wider uppercase transition-all hover:gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                      >
                        {t("products.tryNow")}
                        <ArrowRight />
                      </a>
                    ) : null}
                  </div>

                  <div className="relative min-h-[420px] overflow-hidden py-10 sm:min-h-[460px] sm:py-12 lg:min-h-[420px] lg:py-0">
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(ellipse 70% 80% at 50% 60%, oklch(0.88 0.27 145 / 0.15), transparent 65%)",
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <Illustration kind={p.illustration} />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ArrowRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden
    >
      <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BrowserChrome({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div className="border-primary/30 relative w-full max-w-md overflow-hidden rounded-2xl border bg-[oklch(0.16_0.025_240)] shadow-[0_0_60px_oklch(0.88_0.27_145/0.25)]">
      <div className="border-border/60 flex items-center gap-1.5 border-b bg-[oklch(0.18_0.025_240)] px-4 py-3">
        <span className="bg-muted-foreground/30 h-2.5 w-2.5 rounded-full" />
        <span className="bg-muted-foreground/30 h-2.5 w-2.5 rounded-full" />
        <span className="bg-muted-foreground/30 h-2.5 w-2.5 rounded-full" />
        {label && (
          <span className="text-muted-foreground ml-3 truncate font-mono text-[10px]">{label}</span>
        )}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function Bar({
  w = "w-full",
  h = "h-2",
  className = "",
}: {
  w?: string;
  h?: string;
  className?: string;
}) {
  return <div className={cn(w, h, "bg-muted-foreground/20 rounded-full", className)} />;
}

function Illustration({ kind }: { kind: IllustrationKind }) {
  if (kind === "repair") {
    return (
      <BrowserChrome label="stackfix.app/dashboard">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Bar w="w-24" h="h-3" />
            <div className="h-6 w-16 rounded-md bg-gradient-to-r from-[var(--green-bright)] to-[var(--green-deep)] shadow-[0_0_20px_oklch(0.88_0.27_145/0.6)]" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="border-border/60 space-y-1.5 rounded-lg border p-2">
                <div className="bg-primary/20 flex h-6 w-6 items-center justify-center rounded-md">
                  <svg
                    viewBox="0 0 24 24"
                    className="text-primary h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-hidden
                  >
                    <path
                      d="M14.7 6.3a4 4 0 105.66 5.66l-1.42 1.42-2.83-2.83 1.42-1.42a4 4 0 00-2.83-2.83zM4 20l8-8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <Bar w="w-full" h="h-1.5" />
                <Bar w="w-2/3" h="h-1.5" />
              </div>
            ))}
          </div>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                "flex items-center gap-3 rounded-lg border p-2.5",
                i === 0
                  ? "border-primary/50 bg-primary/5 shadow-[0_0_20px_oklch(0.88_0.27_145/0.25)]"
                  : "border-border/60",
              )}
            >
              <div
                className={cn(
                  "h-2 w-2 rounded-full",
                  i === 0
                    ? "bg-primary shadow-[0_0_10px_oklch(0.88_0.27_145)]"
                    : "bg-muted-foreground/40",
                )}
              />
              <Bar w="w-1/2" h="h-2" />
              <div className="ml-auto">
                <Bar w="w-10" h="h-2" />
              </div>
            </div>
          ))}
        </div>
      </BrowserChrome>
    );
  }

  if (kind === "education") {
    return (
      <BrowserChrome label="stackedu.app/dashboard">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--green-bright)] to-[var(--green-deep)] shadow-[0_0_25px_oklch(0.88_0.27_145/0.6)]">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 text-[oklch(0.16_0.025_240)]"
                fill="currentColor"
                aria-hidden
              >
                <path d="M12 3 1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17z" />
              </svg>
            </div>
            <div className="flex-1 space-y-1.5">
              <Bar w="w-32" h="h-2.5" />
              <Bar w="w-20" h="h-1.5" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[92, 88, 95, 81].map((score, i) => (
              <div key={i} className="border-border/60 space-y-1.5 rounded-lg border p-2.5">
                <div className="flex items-center justify-between">
                  <Bar w="w-12" h="h-1.5" />
                  <span className="text-primary font-mono text-[9px]">A{i + 1}</span>
                </div>
                <div className="font-display text-primary text-lg">{score}%</div>
                <div className="bg-border/60 h-1 overflow-hidden rounded-full">
                  <div
                    className="h-full bg-gradient-to-r from-[var(--green-bright)] to-[var(--green-deep)]"
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </BrowserChrome>
    );
  }

  const businesses = [
    { name: "Kigali Coffee Co.", highlight: false },
    { name: "Your Business", highlight: true },
    { name: "Akagera Logistics", highlight: false },
  ];
  return (
    <BrowserChrome label="kgl.directory">
      <div className="space-y-3">
        <div className="border-border/60 flex items-center gap-2 rounded-lg border px-3 py-2">
          <svg
            viewBox="0 0 24 24"
            className="text-muted-foreground h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <Bar w="w-24" h="h-1.5" />
        </div>
        {businesses.map((b, i) => (
          <div
            key={i}
            className={cn(
              "flex items-center gap-3 rounded-xl border p-3 transition-all",
              b.highlight
                ? "border-primary/60 bg-primary/10 scale-[1.03] shadow-[0_0_30px_oklch(0.88_0.27_145/0.35)]"
                : "border-border/60 opacity-60",
            )}
          >
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                b.highlight
                  ? "bg-gradient-to-br from-[var(--green-bright)] to-[var(--green-deep)]"
                  : "bg-muted-foreground/20",
              )}
            >
              <svg
                viewBox="0 0 24 24"
                className={cn(
                  "h-5 w-5",
                  b.highlight ? "text-[oklch(0.16_0.025_240)]" : "text-muted-foreground",
                )}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path d="M3 21V7l9-4 9 4v14" />
                <path d="M9 21V12h6v9" />
              </svg>
            </div>
            <div className="flex-1 space-y-1.5">
              {b.highlight ? (
                <div className="font-display text-foreground text-sm font-semibold">{b.name}</div>
              ) : (
                <Bar w="w-28" h="h-2" />
              )}
              <Bar w={b.highlight ? "w-20" : "w-16"} h="h-1.5" />
            </div>
            {b.highlight && (
              <span className="text-primary border-primary/50 rounded-full border px-2 py-0.5 font-mono text-[9px] tracking-wider uppercase">
                Featured
              </span>
            )}
          </div>
        ))}
      </div>
    </BrowserChrome>
  );
}

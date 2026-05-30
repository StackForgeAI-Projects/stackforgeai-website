"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { ArrowRight, Globe } from "lucide-react";
import { useStackfixLang, type StackfixLang } from "@/lib/stackfix-i18n";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { BrandMark } from "./brand-mark";

const scrolledBarStyle: CSSProperties = {
  background: "linear-gradient(135deg, oklch(0.32 0.10 150 / 0.94), oklch(0.26 0.08 155 / 0.94))",
  backdropFilter: "blur(20px) saturate(160%)",
  WebkitBackdropFilter: "blur(20px) saturate(160%)",
};

function LangSwitch({ scrolled }: { scrolled: boolean }) {
  const { lang, setLang } = useStackfixLang();
  const labels: Record<StackfixLang, string> = { en: "English", fr: "Français", rw: "Kinyarwanda" };
  const short: Record<StackfixLang, string> = { en: "EN", fr: "FR", rw: "RW" };
  const [open, setOpen] = useState(false);

  return (
    <div className="relative hidden md:block">
      <button
        onClick={() => setOpen((o) => !o)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        aria-label="Change language"
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs transition-colors",
          scrolled
            ? "border-white/30 text-white hover:bg-white/10"
            : "border-border/60 text-muted-foreground hover:text-foreground",
        )}
      >
        <Globe className="h-3.5 w-3.5" />
        {short[lang]}
      </button>
      {open && (
        <ul
          role="listbox"
          className="glass absolute right-0 z-50 mt-2 min-w-[160px] rounded-xl p-1 text-sm"
        >
          {(Object.keys(labels) as StackfixLang[]).map((l) => (
            <li key={l}>
              <button
                role="option"
                aria-selected={lang === l}
                onMouseDown={(e) => {
                  e.preventDefault();
                  setLang(l);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-colors ${
                  lang === l
                    ? "bg-brand/15 text-foreground"
                    : "text-muted-foreground hover:bg-surface hover:text-foreground"
                }`}
              >
                <span>{labels[l]}</span>
                <span className="text-muted-foreground text-xs">{short[l]}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Nav() {
  const { t } = useStackfixLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-[padding] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none",
          scrolled ? "pt-0" : "px-4 pt-5 sm:px-6",
        )}
      >
        <div className={cn(!scrolled && "mx-auto max-w-7xl")}>
          <nav
            className={cn(
              "flex items-center justify-between transition-[margin,border-radius,box-shadow,padding] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none",
              scrolled
                ? "border-brand/50 w-full rounded-t-none rounded-b-3xl border-b px-0 py-3 shadow-[0_16px_48px_-20px_oklch(0_0_0/0.55)]"
                : "glass rounded-full py-2 pr-2 pl-5",
            )}
            style={scrolled ? scrolledBarStyle : undefined}
          >
            <div
              className={cn(
                "flex w-full items-center justify-between gap-3 md:gap-4",
                scrolled && "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
              )}
            >
              <Link
                href="/"
                className="group flex shrink-0 items-center"
                aria-label={`${siteConfig.name} home`}
              >
                <BrandMark className="transition-transform duration-300 select-none group-hover:scale-[1.04]" />
              </Link>

              <ul
                className={cn(
                  "hidden items-center gap-7 text-sm md:flex",
                  scrolled ? "text-white/85" : "text-muted-foreground",
                )}
              >
                {t.nav.links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className={cn(
                        "transition-colors",
                        scrolled ? "hover:text-white" : "hover:text-foreground",
                      )}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="flex shrink-0 items-center gap-2">
                <LangSwitch scrolled={scrolled} />
                <a
                  href="#contact"
                  className={cn(
                    "btn-brand inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold",
                    scrolled &&
                      "bg-background text-foreground hover:bg-brand hover:text-brand-foreground shadow-[0_0_30px_-6px_oklch(0_0_0/0.5)]",
                  )}
                >
                  {t.nav.cta} <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

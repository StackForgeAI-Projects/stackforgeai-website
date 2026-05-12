"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Check, Globe, Menu } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { useLang, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const langs: { code: Lang; label: string; full: string }[] = [
  { code: "en", label: "ENG", full: "English" },
  { code: "rw", label: "RWA", full: "Kinyarwanda" },
];

export function Nav() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!langMenuRef.current?.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const links = siteConfig.nav.map((l) => ({ href: l.href, label: t(l.labelKey) }));
  const current = langs.find((l) => l.code === lang)!;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 pt-5 sm:px-6">
        <div
          className={cn(
            "flex items-center justify-between rounded-full py-2 pr-2 pl-4 transition-all duration-500 sm:pl-5",
            scrolled
              ? "border-primary/40 border shadow-[0_8px_40px_-12px_oklch(0.88_0.27_145/0.45)]"
              : "glass",
          )}
          style={
            scrolled
              ? {
                  background:
                    "linear-gradient(135deg, oklch(0.32 0.10 150 / 0.92), oklch(0.26 0.08 155 / 0.92))",
                  backdropFilter: "blur(18px) saturate(160%)",
                  WebkitBackdropFilter: "blur(18px) saturate(160%)",
                }
              : undefined
          }
        >
          <Link
            href="/"
            scroll
            className="group flex items-center"
            aria-label={`${siteConfig.name} home`}
          >
            <Image
              src="/logo.png"
              alt="StackForgeAI"
              width={947}
              height={157}
              priority
              className="h-5 w-auto object-contain transition-transform duration-300 select-none group-hover:scale-[1.04] md:h-6"
              draggable={false}
            />
          </Link>

          <nav
            className={cn(
              "hidden items-center gap-7 text-sm transition-colors md:flex",
              scrolled ? "text-white/85" : "text-muted-foreground",
            )}
            aria-label="Primary"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={cn(
                  "transition-colors",
                  scrolled ? "hover:text-white" : "hover:text-foreground",
                )}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div ref={langMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setLangOpen((o) => !o)}
                aria-label="Change language"
                aria-haspopup="menu"
                aria-expanded={langOpen}
                className={cn(
                  "focus-visible:ring-primary/60 inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-medium transition focus:outline-none focus-visible:ring-2",
                  scrolled
                    ? "border-white/30 text-white hover:bg-white/10"
                    : "border-border text-foreground hover:bg-surface/60",
                )}
              >
                <Globe className="h-4 w-4" aria-hidden />
                <span className="font-mono tracking-wider">{current.label}</span>
              </button>
              {langOpen && (
                <div
                  role="menu"
                  className="border-border bg-surface/95 absolute right-0 z-50 mt-2 w-44 rounded-2xl border p-1.5 shadow-xl backdrop-blur-md"
                >
                  {langs.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      role="menuitemradio"
                      aria-checked={lang === l.code}
                      onClick={() => {
                        setLang(l.code);
                        setLangOpen(false);
                      }}
                      className="text-foreground hover:bg-primary/15 focus-visible:bg-primary/15 flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-sm transition focus:outline-none"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-primary font-mono text-xs">{l.label}</span>
                        <span>{l.full}</span>
                      </span>
                      {lang === l.code && <Check className="text-primary h-4 w-4" aria-hidden />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a
              href="#contact"
              className={cn(
                "btn-press group focus-visible:ring-primary/60 hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 sm:inline-flex",
                scrolled
                  ? "bg-background text-foreground hover:bg-primary hover:text-primary-foreground shadow-[0_0_30px_-6px_oklch(0_0_0/0.5)]"
                  : "bg-primary text-primary-foreground shadow-[0_0_30px_-6px_oklch(0.88_0.27_145/0.55)] hover:opacity-95",
              )}
            >
              {t("nav.cta")}
              <span aria-hidden className="btn-arrow">
                →
              </span>
            </a>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label={t("nav.menu.open")}
                  className={cn(
                    "focus-visible:ring-primary/60 inline-flex items-center justify-center rounded-full border p-2 transition focus:outline-none focus-visible:ring-2 md:hidden",
                    scrolled
                      ? "border-white/30 text-white hover:bg-white/10"
                      : "border-border text-foreground hover:bg-surface/60",
                  )}
                >
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent>
                <SheetTitle>{siteConfig.name}</SheetTitle>
                <nav className="mt-10 flex flex-col gap-1" aria-label="Mobile primary">
                  {links.map((l) => (
                    <SheetClose asChild key={l.href}>
                      <a
                        href={l.href}
                        className="text-foreground hover:bg-primary/10 hover:text-primary block rounded-xl px-4 py-3 text-base transition"
                      >
                        {l.label}
                      </a>
                    </SheetClose>
                  ))}
                </nav>
                <SheetClose asChild>
                  <a
                    href="#contact"
                    className="btn-press group bg-primary text-primary-foreground glow-green mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 font-medium"
                  >
                    {t("nav.cta")}
                    <span aria-hidden className="btn-arrow">
                      →
                    </span>
                  </a>
                </SheetClose>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

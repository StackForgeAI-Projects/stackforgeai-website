"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { dicts, type DictKey, type Lang } from "@/lib/i18n/dicts";

export type { Lang } from "@/lib/i18n/dicts";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: DictKey | string) => string;
};

const LanguageContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "stackforgeai.lang";
const VALID_LANGS = new Set<Lang>(["en", "fr", "rw"]);

function isLang(value: string | null): value is Lang {
  return value !== null && VALID_LANGS.has(value as Lang);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (isLang(saved)) setLangState(saved);
    } catch {
      // localStorage blocked — fall back to default
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || typeof document === "undefined") return;
    document.documentElement.lang = lang;
  }, [hydrated, lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, l);
        document.documentElement.lang = l;
      }
    } catch {
      // ignore
    }
  };

  const t = (key: DictKey | string) => dicts[lang][key] ?? dicts.en[key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}

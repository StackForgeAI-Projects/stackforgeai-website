"use client";

import { useEffect } from "react";
import { bootstrapGoogleTranslate, resetGoogleTranslate } from "@/lib/google-translate";

/**
 * Mount point for Google Translate. The widget UI is hidden in globals.css;
 * language is driven from the nav via googtrans cookie + reload.
 */
export function GoogleTranslateRoot() {
  useEffect(() => {
    let cancelled = false;

    void bootstrapGoogleTranslate().catch((err: unknown) => {
      if (cancelled) return;
      const message = err instanceof Error ? err.message : String(err);
      console.warn("[google-translate]", message);
    });

    return () => {
      cancelled = true;
      resetGoogleTranslate();
    };
  }, []);

  return (
    <div
      id="google_translate_element"
      className="google-translate-root notranslate"
      aria-hidden
      suppressHydrationWarning
    />
  );
}

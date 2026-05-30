import type { TranslateTarget } from "@/lib/google-translate-types";

const SCRIPT_ID = "google-translate-script";
const ELEMENT_ID = "google_translate_element";
const COMBO_SELECTOR = ".goog-te-combo";

let readyPromise: Promise<void> | null = null;

/** Reset cached init state (React Strict Mode remount). */
export function resetGoogleTranslate(): void {
  readyPromise = null;
}

export function desiredGoogTransCookie(lang: TranslateTarget): string {
  return lang === "en" ? "" : `/en/${lang}`;
}

export function readGoogTransCookie(): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]*)/);
  return match?.[1] ? decodeURIComponent(match[1]) : "";
}

export function writeGoogTransCookie(lang: TranslateTarget): void {
  if (typeof document === "undefined") return;

  const host = window.location.hostname;
  const clear = "googtrans=; Max-Age=0; path=/";

  if (lang === "en") {
    document.cookie = clear;
    if (host.includes(".")) {
      document.cookie = `${clear}; domain=.${host.replace(/^www\./, "")}`;
    }
    return;
  }

  const value = `/en/${lang}`;
  document.cookie = `googtrans=${value}; path=/`;
  if (host.includes(".")) {
    document.cookie = `googtrans=${value}; path=/; domain=.${host.replace(/^www\./, "")}`;
  }
}

/** Google adds these classes when the page has been machine-translated. */
export function isPageTranslated(): boolean {
  if (typeof document === "undefined") return false;
  const root = document.documentElement;
  const body = document.body;
  return (
    root.classList.contains("translated-ltr") ||
    root.classList.contains("translated-rtl") ||
    body.classList.contains("translated-ltr") ||
    body.classList.contains("translated-rtl")
  );
}

export function isTranslationSynced(lang: TranslateTarget): boolean {
  const cookie = readGoogTransCookie();
  const expected = desiredGoogTransCookie(lang);

  if (lang === "en") {
    return !cookie && !isPageTranslated();
  }

  return cookie === expected && isPageTranslated();
}

function waitForMountElement(timeoutMs = 8_000): Promise<HTMLElement> {
  return new Promise((resolve, reject) => {
    const existing = document.getElementById(ELEMENT_ID);
    if (existing) {
      resolve(existing);
      return;
    }

    const started = Date.now();
    const tick = () => {
      const el = document.getElementById(ELEMENT_ID);
      if (el) {
        resolve(el);
        return;
      }
      if (Date.now() - started > timeoutMs) {
        reject(new Error("Google Translate mount element not found"));
        return;
      }
      window.requestAnimationFrame(tick);
    };
    tick();
  });
}

function loadGoogleTranslateScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.google?.translate?.TranslateElement) {
      resolve();
      return;
    }

    const finish = () => {
      if (window.google?.translate?.TranslateElement) resolve();
      else reject(new Error("Google Translate API unavailable"));
    };

    if (document.getElementById(SCRIPT_ID)) {
      window.googleTranslateElementInit = finish;
      const started = Date.now();
      const poll = () => {
        if (window.google?.translate?.TranslateElement) {
          finish();
          return;
        }
        if (Date.now() - started > 15_000) {
          reject(new Error("Google Translate script did not load"));
          return;
        }
        window.setTimeout(poll, 50);
      };
      poll();
      return;
    }

    window.googleTranslateElementInit = finish;

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    script.onerror = () => reject(new Error("Failed to load Google Translate script"));
    document.body.appendChild(script);
  });
}

function renderWidget(): void {
  const mount = document.getElementById(ELEMENT_ID);
  if (!mount) {
    throw new Error("Google Translate mount element not found");
  }

  if (mount.querySelector(COMBO_SELECTOR)) return;

  mount.innerHTML = "";

  const TranslateElement = window.google?.translate?.TranslateElement;
  if (!TranslateElement) {
    throw new Error("Google Translate API unavailable");
  }

  new TranslateElement(
    {
      pageLanguage: "en",
      includedLanguages: "en,rw",
      autoDisplay: false,
      layout: TranslateElement.InlineLayout.SIMPLE,
    },
    ELEMENT_ID,
  );
}

/** Loads the Google Translate widget once per page. */
export function bootstrapGoogleTranslate(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  readyPromise ??= waitForMountElement()
    .then(() => loadGoogleTranslateScript())
    .then(() => {
      renderWidget();
    })
    .catch((err) => {
      readyPromise = null;
      throw err instanceof Error ? err : new Error(String(err));
    });

  return readyPromise;
}

/**
 * On first load: align cookie with stored preference (single reload if mismatched).
 * Widget bootstrap then applies translation from the cookie automatically.
 */
export function syncCookieWithStoredLang(lang: TranslateTarget): void {
  if (typeof window === "undefined") return;

  const cookie = readGoogTransCookie();
  const expected = desiredGoogTransCookie(lang);

  if (cookie === expected) return;

  writeGoogTransCookie(lang);
  window.location.reload();
}

/**
 * User-initiated switch: persist cookie and reload immediately.
 * Reload is faster and more reliable than the hidden combo in Next.js.
 */
export function applyGoogleTranslateLang(lang: TranslateTarget): void {
  if (typeof window === "undefined") return;
  if (isTranslationSynced(lang)) return;

  writeGoogTransCookie(lang);
  window.location.reload();
}

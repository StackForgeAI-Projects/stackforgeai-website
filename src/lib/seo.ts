import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { stackeduSeoKeywords, stackforgenextSeoKeywords } from "@/lib/seo-keywords";
import { absoluteUrl } from "@/lib/utils";

/** Public Search Console verification token (also safe to override via env). */
export const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "1rCIS0Rb2RMxaG4jp0pH8r6lPo2IkA3hrqQEiNrc8-k";

interface SeoOptions {
  /** When true, `title` is used as the full document title (no `· StackForgeAI` suffix). */
  absoluteTitle?: boolean;
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}

export function buildMetadata(opts: SeoOptions = {}): Metadata {
  const title =
    opts.absoluteTitle && opts.title
      ? opts.title
      : opts.title
        ? `${opts.title} · ${siteConfig.name}`
        : siteConfig.fullName;
  const description = opts.description ?? siteConfig.description;
  const url = absoluteUrl(opts.path ?? "/");
  const ogImage = opts.image ?? siteConfig.ogImage;

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    keywords: [...siteConfig.keywords],
    authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
    creator: siteConfig.author.name,
    publisher: siteConfig.author.name,
    applicationName: siteConfig.name,
    referrer: "origin-when-cross-origin",
    robots: opts.noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    verification: {
      google: GOOGLE_SITE_VERIFICATION,
    },
    alternates: {
      canonical: url,
      languages: {
        en: url,
        "en-GB": url,
        "en-US": url,
        "rw-RW": url,
        "fr-FR": url,
        "de-DE": url,
        "nl-NL": url,
      },
      types: {
        "text/plain": [{ url: "/llms.txt", title: "LLMs.txt" }],
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.fullName,
        },
      ],
      locale: "en_GB",
      alternateLocale: ["en_US", "rw_RW", "fr_FR", "de_DE", "nl_NL"],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    icons: {
      icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
      apple: [{ url: "/apple-icon.png" }],
    },
    category: "technology",
  };
}

/** Homepage metadata: Rwanda/Kigali–focused title & description, canonical `/`. */
export function buildHomeMetadata(): Metadata {
  return buildMetadata({
    absoluteTitle: true,
    title: siteConfig.seo.home.title,
    description: siteConfig.seo.home.description,
    path: "/",
  });
}

/**
 * StackEDU page metadata (LMS & student portal). Ready for the `/stackedu` page —
 * pass a different `path`/`image` here when the page ships.
 */
export function buildStackeduMetadata(): Metadata {
  const meta = buildMetadata({
    absoluteTitle: true,
    title: siteConfig.seo.stackedu.title,
    description: siteConfig.seo.stackedu.description,
    path: "/stackedu",
  });

  return { ...meta, keywords: [...stackeduSeoKeywords] };
}

/**
 * StackForgeNext page metadata (free tech training for African students).
 * Ready for the `/stackforgenext` page.
 */
export function buildStackforgenextMetadata(): Metadata {
  const meta = buildMetadata({
    absoluteTitle: true,
    title: siteConfig.seo.stackforgenext.title,
    description: siteConfig.seo.stackforgenext.description,
    path: "/stackforgenext",
  });

  return { ...meta, keywords: [...stackforgenextSeoKeywords] };
}

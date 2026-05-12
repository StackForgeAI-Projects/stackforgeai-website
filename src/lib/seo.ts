import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { absoluteUrl } from "@/lib/utils";

interface SeoOptions {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}

export function buildMetadata(opts: SeoOptions = {}): Metadata {
  const title = opts.title ? `${opts.title} · ${siteConfig.name}` : siteConfig.fullName;
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
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    alternates: {
      canonical: url,
      languages: { en: url, rw: url },
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
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: "@stackforgeai",
    },
    icons: {
      icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
      apple: [{ url: "/apple-icon.png" }],
    },
    category: "technology",
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: "StackForgeAI Ltd.",
    url: siteConfig.url,
    logo: absoluteUrl("/logo.png"),
    description: siteConfig.description,
    foundingDate: "2025",
    foundingLocation: { "@type": "Place", name: "Kigali, Rwanda" },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kigali",
      addressCountry: "RW",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.contact.email,
      contactType: "customer support",
      areaServed: ["RW", "AF"],
      availableLanguage: ["en", "rw"],
    },
    sameAs: [siteConfig.links.github],
  } as const;
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: ["en", "rw"],
    publisher: { "@type": "Organization", name: siteConfig.name },
  } as const;
}

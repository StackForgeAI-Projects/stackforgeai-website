import { siteConfig } from "@/lib/site";
import { absoluteUrl } from "@/lib/utils";

/** Stable fragment IDs for JSON-LD `@graph` linking (same origin). */
function baseUrl(): string {
  return siteConfig.url.replace(/\/$/, "");
}

/**
 * Root structured data: Organization + WebSite in one `@graph`.
 * Render once in `layout.tsx` so every page inherits entity context.
 */
export function rootStructuredDataGraph(): Record<string, unknown> {
  const root = baseUrl();
  const orgId = `${root}/#organization`;
  const webId = `${root}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: siteConfig.name,
        url: root,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/logo.png"),
          contentUrl: absoluteUrl("/logo.png"),
        },
        description: siteConfig.description,
        slogan: siteConfig.fullName,
        foundingLocation: {
          "@type": "Place",
          name: "Kigali, Rwanda",
          geo: {
            "@type": "GeoCoordinates",
            latitude: -1.9536,
            longitude: 30.0606,
          },
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kigali",
          addressRegion: "Kigali City",
          addressCountry: "RW",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer service",
            email: siteConfig.contact.email,
            telephone: siteConfig.contact.phone.replace(/\s/g, ""),
            areaServed: ["RW", "Africa"],
            availableLanguage: ["English", "Kinyarwanda"],
          },
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: siteConfig.contact.email,
            telephone: siteConfig.contact.phone.replace(/\s/g, ""),
            url: `${root}/#contact`,
          },
        ],
        sameAs: [siteConfig.links.github],
        knowsAbout: [
          "Software engineering",
          "Artificial intelligence",
          "Machine learning systems",
          "Web application development",
          "Mobile application development",
          "Digital transformation",
          "Government technology",
          "Educational technology",
          "Cloud infrastructure",
          "Business process automation",
          "Rwanda ICT sector",
          "Kigali technology ecosystem",
        ],
        areaServed: [
          { "@type": "Country", name: "Rwanda" },
          { "@type": "City", name: "Kigali" },
          { "@type": "Place", name: "Africa" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Professional services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Custom Web & Mobile Development",
                description:
                  "Design and delivery of scalable websites and web applications for institutions and businesses.",
                areaServed: "Rwanda",
                provider: { "@id": orgId },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "AI Products & Custom Software",
                description:
                  "Intelligent systems and automation tailored to organizational workflows.",
                areaServed: "Rwanda",
                provider: { "@id": orgId },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Maintenance & Ongoing Support",
                description:
                  "Continuous improvements, monitoring, and reliability for production systems.",
                areaServed: "Rwanda",
                provider: { "@id": orgId },
              },
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": webId,
        url: root,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: ["en", "rw"],
        publisher: { "@id": orgId },
      },
    ],
  };
}

/** Homepage-only `WebPage` + `SoftwareApplication` highlights for rich context. */
export function homeStructuredDataGraph(): Record<string, unknown> {
  const root = baseUrl();
  const webId = `${root}/#website`;
  const orgId = `${root}/#organization`;
  const pageId = `${root}/#webpage`;

  const products: Record<string, unknown>[] = [
    {
      "@type": "SoftwareApplication",
      name: "StackFix",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: siteConfig.links.stackfix,
      provider: { "@id": orgId },
    },
    {
      "@type": "SoftwareApplication",
      name: "StackEDU",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
      url: siteConfig.links.stackedu,
      provider: { "@id": orgId },
    },
    {
      "@type": "SoftwareApplication",
      name: "Rwanda Directory",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: siteConfig.links.directory,
      provider: { "@id": orgId },
    },
  ];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": pageId,
        url: `${root}/`,
        name: siteConfig.seo.home.title,
        description: siteConfig.seo.home.description,
        isPartOf: { "@id": webId },
        about: { "@id": orgId },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: absoluteUrl(siteConfig.ogImage),
        },
        inLanguage: ["en", "rw"],
      },
      ...products,
    ],
  };
}

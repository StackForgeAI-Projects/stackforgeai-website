import { siteConfig } from "@/lib/site";
import {
  schemaAreaServedCountries,
  schemaKnowsAbout,
  stackfixSchemaKnowsAbout,
  stackfixSeoKeywords,
} from "@/lib/seo-keywords";
import { absoluteUrl } from "@/lib/utils";

/** Stable fragment IDs for JSON-LD `@graph` linking (same origin). */
function baseUrl(): string {
  return siteConfig.url.replace(/\/$/, "");
}

const PRODUCT_DEFINITIONS = [
  {
    id: "stackfix",
    name: "StackFix",
    description:
      "Repair and field-service management — track service requests, assign technicians, and improve operational efficiency.",
    applicationCategory: "BusinessApplication",
    url: absoluteUrl(siteConfig.links.stackfix),
    audience: ["Businesses", "Workshops", "Field service teams"],
  },
  {
    id: "stackedu",
    name: "StackEDU",
    description:
      "Centralized education management for tertiary institutions — student data, academic records, and administrative workflows.",
    applicationCategory: "EducationalApplication",
    url: siteConfig.links.stackedu,
    audience: ["Universities", "Colleges", "Training institutes", "Schools"],
  },
  {
    id: "directory",
    name: "Rwanda Directory",
    description:
      "Digital directory of registered businesses across Rwanda, categorized by industry for discovery and visibility.",
    applicationCategory: "BusinessApplication",
    url: siteConfig.links.directory,
    audience: ["SMEs", "Businesses", "Marketplaces"],
  },
] as const;

const SERVICE_DEFINITIONS = [
  {
    name: "Custom Web & Mobile Development",
    description:
      "Design and delivery of modern, scalable websites and web applications for institutions and businesses in Africa and Europe.",
  },
  {
    name: "AI Products & Custom Software",
    description:
      "Intelligent systems, automation, and LLM integrations tailored to organizational workflows.",
  },
  {
    name: "Maintenance & Ongoing Support",
    description: "Continuous improvements, monitoring, and reliability for production systems.",
  },
] as const;

const FAQ_ENTRIES = [
  {
    question: "What is StackForgeAI?",
    answer:
      "StackForgeAI is an AI and software company based in Kigali, Rwanda. We build products like StackFix and StackEDU and deliver custom web, mobile, and automation systems for African institutions and European enterprise partners.",
  },
  {
    question: "Which products does StackForgeAI offer?",
    answer:
      "StackFix (repair management), StackEDU (tertiary education management), and Rwanda Directory (business discovery). We also offer custom software development and AI consulting.",
  },
  {
    question: "Who does StackForgeAI serve?",
    answer:
      "Schools, universities, workshops, SMEs, enterprises, and government agencies across Africa — with European organizations as a primary partner audience for custom delivery and digital transformation.",
  },
  {
    question: "Where is StackForgeAI located?",
    answer: "Headquartered in Kigali, Rwanda, serving clients across Africa and Europe.",
  },
  {
    question: "How can I contact StackForgeAI?",
    answer: `Email ${siteConfig.contact.email}, call ${siteConfig.contact.phoneDisplay}, or book a demo at ${siteConfig.links.calendly}.`,
  },
] as const;

function areaServedGraph(): Record<string, unknown>[] {
  return [
    { "@type": "Place", name: "Africa" },
    { "@type": "Place", name: "Europe" },
    { "@type": "City", name: "Kigali" },
    { "@type": "Country", name: "Rwanda" },
    ...schemaAreaServedCountries.map((code) => ({
      "@type": "Country",
      identifier: code,
    })),
  ];
}

function productNodes(orgId: string): Record<string, unknown>[] {
  return PRODUCT_DEFINITIONS.map((product) => ({
    "@type": "SoftwareApplication",
    "@id": `${baseUrl()}/#product-${product.id}`,
    name: product.name,
    description: product.description,
    applicationCategory: product.applicationCategory,
    operatingSystem: "Web",
    url: product.id === "stackfix" ? absoluteUrl(siteConfig.links.stackfix) : product.url,
    provider: { "@id": orgId },
    audience: {
      "@type": "Audience",
      audienceType: product.audience.join(", "),
    },
    areaServed: areaServedGraph(),
  }));
}

function serviceOfferCatalog(orgId: string): Record<string, unknown> {
  return {
    "@type": "OfferCatalog",
    name: "Professional services",
    itemListElement: SERVICE_DEFINITIONS.map((service, index) => ({
      "@type": "Offer",
      position: index + 1,
      itemOffered: {
        "@type": "Service",
        name: service.name,
        description: service.description,
        areaServed: areaServedGraph(),
        provider: { "@id": orgId },
        serviceType: service.name,
      },
    })),
  };
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
        "@type": ["Organization", "ProfessionalService"],
        "@id": orgId,
        name: siteConfig.name,
        url: root,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/logo.png"),
          contentUrl: absoluteUrl("/logo.png"),
        },
        image: absoluteUrl(siteConfig.ogImage),
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
            areaServed: [...schemaAreaServedCountries],
            availableLanguage: ["English", "Kinyarwanda", "French", "German"],
          },
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: siteConfig.contact.email,
            telephone: siteConfig.contact.phone.replace(/\s/g, ""),
            url: `${root}/#contact`,
            areaServed: [...schemaAreaServedCountries],
          },
        ],
        sameAs: [siteConfig.links.github, siteConfig.links.calendly],
        knowsAbout: schemaKnowsAbout,
        areaServed: areaServedGraph(),
        hasOfferCatalog: serviceOfferCatalog(orgId),
        makesOffer: PRODUCT_DEFINITIONS.map((product) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "SoftwareApplication",
            name: product.name,
            url: product.id === "stackfix" ? absoluteUrl(siteConfig.links.stackfix) : product.url,
            description: product.description,
          },
        })),
      },
      {
        "@type": "WebSite",
        "@id": webId,
        url: root,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: ["en", "rw", "fr", "de"],
        publisher: { "@id": orgId },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${root}/?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      ...productNodes(orgId),
    ],
  };
}

/** Homepage-only WebPage, FAQPage, and ItemList for rich search/AI context. */
export function homeStructuredDataGraph(): Record<string, unknown> {
  const root = baseUrl();
  const webId = `${root}/#website`;
  const orgId = `${root}/#organization`;
  const pageId = `${root}/#webpage`;
  const faqId = `${root}/#faq`;

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
        inLanguage: ["en", "rw", "fr", "de"],
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["#about", "#products", "#services", "#contact"],
        },
      },
      {
        "@type": "FAQPage",
        "@id": faqId,
        mainEntity: FAQ_ENTRIES.map((entry) => ({
          "@type": "Question",
          name: entry.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: entry.answer,
          },
        })),
      },
      {
        "@type": "ItemList",
        name: "StackForgeAI Products",
        itemListElement: PRODUCT_DEFINITIONS.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "SoftwareApplication",
            "@id": `${root}/#product-${product.id}`,
            name: product.name,
            url: product.id === "stackfix" ? absoluteUrl(siteConfig.links.stackfix) : product.url,
            description: product.description,
          },
        })),
      },
    ],
  };
}

/** StackFix landing page WebPage + SoftwareApplication + FAQ + Breadcrumb JSON-LD. */
export function stackfixStructuredDataGraph(): Record<string, unknown> {
  const root = baseUrl();
  const orgId = `${root}/#organization`;
  const webId = `${root}/#website`;
  const pageId = `${root}/stackfix#webpage`;
  const productId = `${root}/stackfix#software`;
  const faqId = `${root}/stackfix#faq`;
  const breadcrumbId = `${root}/stackfix#breadcrumb`;
  const stackfixUrl = absoluteUrl("/stackfix");
  const dashboardImage = absoluteUrl("/stackfix/stackfix-dashboard.png");
  const mobileImage = absoluteUrl("/stackfix/stackfix-mobile.png");

  const stackfixFaq = [
    {
      question: "What is StackFix?",
      answer:
        "StackFix is a repair management app for workshops and service centers. Track repair tickets, assign technicians, send customer updates, and accept Mobile Money payments from one platform.",
    },
    {
      question: "Is StackFix a repair app in Rwanda?",
      answer:
        "Yes. StackFix is built for repair shops in Rwanda — including Kigali electronics workshops, phone repair stores, and authorized service centers — with RWF pricing, MoMo USSD support, and local language options.",
    },
    {
      question: "Does StackFix work as a repair app in Africa?",
      answer:
        "StackFix is designed for repair businesses across Africa: multi-language support, Mobile Money readiness, and workflows tuned for high-volume device repair and field service teams on the continent.",
    },
    {
      question: "Who is StackFix for?",
      answer:
        "Electronics repair shops, phone and laptop service centers, authorized resellers, and multi-location workshops that need tickets, technician management, invoicing, and customer notifications in one system.",
    },
    {
      question: "How do I get a StackFix demo?",
      answer: `Book a free walkthrough at ${stackfixUrl}#contact or email ${siteConfig.contact.email}.`,
    },
  ] as const;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "StackForgeAI",
            item: root,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "StackFix",
            item: stackfixUrl,
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": pageId,
        url: stackfixUrl,
        name: siteConfig.seo.stackfix.title,
        description: siteConfig.seo.stackfix.description,
        isPartOf: { "@id": webId },
        about: { "@id": productId },
        publisher: { "@id": orgId },
        breadcrumb: { "@id": breadcrumbId },
        inLanguage: ["en", "rw", "fr"],
        keywords: stackfixSeoKeywords.join(", "),
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: dashboardImage,
          width: 1024,
          height: 586,
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": productId,
        name: "StackFix",
        alternateName: ["StackFix repair app", "StackFix Rwanda", "StackFix Africa"],
        description: siteConfig.seo.stackfix.description,
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "Repair management software",
        operatingSystem: "Web, iOS, Android",
        url: stackfixUrl,
        downloadUrl: siteConfig.links.stackfixApp,
        provider: { "@id": orgId },
        featureList: [
          "Repair ticket management",
          "Technician assignment and tracking",
          "Mobile Money and MoMo USSD payments",
          "Customer SMS and WhatsApp notifications",
          "Invoicing and RRA-ready exports",
          "AI-assisted device diagnostics",
          "Multi-location workshop support",
        ],
        screenshot: [
          { "@type": "ImageObject", url: dashboardImage, caption: "StackFix dashboard" },
          { "@type": "ImageObject", url: mobileImage, caption: "StackFix mobile repair tickets" },
        ],
        keywords: stackfixSeoKeywords.join(", "),
        knowsAbout: stackfixSchemaKnowsAbout,
        audience: {
          "@type": "Audience",
          audienceType:
            "Repair shops, electronics service centers, phone repair businesses, workshops in Rwanda and Africa",
        },
        areaServed: [
          { "@type": "Place", name: "Africa" },
          { "@type": "Country", name: "Rwanda", identifier: "RW" },
          { "@type": "City", name: "Kigali" },
          ...schemaAreaServedCountries.slice(0, 12).map((code) => ({
            "@type": "Country",
            identifier: code,
          })),
        ],
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "RWF",
          lowPrice: "19000",
          highPrice: "89000",
          offerCount: 3,
          availability: "https://schema.org/InStock",
          url: `${stackfixUrl}#pricing`,
        },
      },
      {
        "@type": "FAQPage",
        "@id": faqId,
        isPartOf: { "@id": pageId },
        mainEntity: stackfixFaq.map((entry) => ({
          "@type": "Question",
          name: entry.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: entry.answer,
          },
        })),
      },
    ],
  };
}

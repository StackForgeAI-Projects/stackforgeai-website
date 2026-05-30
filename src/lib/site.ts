import { seoKeywords } from "@/lib/seo-keywords";

export const siteConfig = {
  name: "StackForgeAI",
  fullName: "StackForgeAI | Intelligent Software for Africa's Institutions & European Partners",
  domain: "stackforgeai.africa",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://stackforgeai.africa",
  description:
    "StackForgeAI builds AI-powered software for African schools, universities, workshops, businesses, and governments, and partners with European enterprises on custom web, mobile, and automation systems from Kigali, Rwanda.",
  keywords: seoKeywords,
  seo: {
    home: {
      title: "StackForgeAI | AI & Software for Africa | StackFix, StackEDU | Europe Partners",
      description:
        "Africa-first AI and software company in Kigali: StackFix repair management, StackEDU for universities, Rwanda Directory, plus custom development for schools, workshops, SMEs, and European enterprise partners.",
    },
    stackfix: {
      title: "StackFix | Repair App in Rwanda & Africa | Workshop & Ticket Management",
      description:
        "StackFix is the repair app built for Rwanda and Africa. Manage repair tickets, technicians, invoices and Mobile Money payments from one platform, for electronics shops, service centers and workshops in Kigali and across the continent.",
    },
  },
  author: {
    name: "StackForgeAI",
    email: "hello@stackforgeai.africa",
    url: "https://stackforgeai.africa",
  },
  contact: {
    email: "hello@stackforgeai.africa",
    phone: process.env.NEXT_PUBLIC_PHONE_NUMBER ?? "+250799486531",
    phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "+250 799 486 531",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "+250799486531",
    whatsappDisplay: process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY ?? "+250 799 486 531",
    location: "Kigali, Rwanda",
  },
  links: {
    calendly: process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/stackforgeai/demo",
    stackfix: "/stackfix",
    stackfixApp: "https://stackfix.app/dashboard",
    stackedu: "https://stackedu.app/dashboard",
    directory: "https://kgl.directory",
    github: "https://github.com/StackForgeAI-Projects",
  },
  nav: [
    { href: "#about", labelKey: "nav.about" },
    { href: "#products", labelKey: "nav.products" },
    { href: "#services", labelKey: "nav.services" },
    { href: "#impact", labelKey: "nav.impact" },
    { href: "#contact", labelKey: "nav.contact" },
  ] as const,
  ogImage: "/og-image.png",
} as const;

/**
 * DOM ids on homepage product cards (`#products` section). Footer uses `/#…` so anchors work from any route.
 */
export const PRODUCT_SECTION_IDS = {
  stackfix: "product-stackfix",
  stackedu: "product-stackedu",
  directory: "product-rwanda-directory",
} as const;

export type SiteConfig = typeof siteConfig;

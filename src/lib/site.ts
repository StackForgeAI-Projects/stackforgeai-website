import { seoKeywords } from "@/lib/seo-keywords";

export const siteConfig = {
  name: "StackForgeAI",
  fullName: "StackForgeAI | Intelligent Software for Africa's Institutions & European Partners",
  domain: "stackforgeai.africa",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://stackforgeai.africa",
  description:
    "StackForgeAI builds AI-powered software for African schools, universities, workshops, businesses, and governments — StackFix repair management, the StackEDU learning management system (LMS), Rwanda Directory, and StackForgeNext free tech training for students — and partners with European enterprises on custom web, mobile, and automation systems from Kigali, Rwanda.",
  keywords: seoKeywords,
  seo: {
    home: {
      title: "StackForgeAI | AI & Software for Africa | StackFix, StackEDU LMS, StackForgeNext",
      description:
        "Africa-first AI and software company in Kigali: StackFix repair management, the StackEDU LMS for universities, StackForgeNext free tech training for students, Rwanda Directory, plus custom web, mobile, and AI development for institutions and European enterprise partners.",
    },
    stackedu: {
      title: "StackEDU | LMS & Student Portal for Universities in Rwanda & Africa",
      description:
        "StackEDU is the learning management system and student portal for higher institutions in Rwanda and Africa. Manage courses, enrollment, grading, academic records, and online learning for universities, colleges, and TVET institutes from one educational portal.",
    },
    stackforgenext: {
      title: "StackForgeNext | Free Tech Training for African Students | StackForgeAI",
      description:
        "StackForgeNext is StackForgeAI's free software engineering and AI training program for African students. Learn to code, build real products, and grow tech careers through scholarships, bootcamps, and mentorship across Rwanda and Africa.",
    },
    training: {
      title: "Free Tech Training & Scholarships for African Students | StackForgeAI",
      description:
        "Free, scholarship-backed technology training for African students: software engineering, AI, and digital skills. StackForgeAI invests in the next generation of African tech talent from Kigali, Rwanda.",
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
    stackfix: "https://stackfix.app",
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

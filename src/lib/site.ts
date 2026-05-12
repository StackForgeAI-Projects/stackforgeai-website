export const siteConfig = {
  name: "StackForgeAI",
  fullName: "StackForgeAI — Intelligent Software for Africa's Institutions",
  domain: "stackforgeai.africa",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://stackforgeai.africa",
  description:
    "StackForgeAI builds AI-powered systems, platforms, and digital infrastructure for governments, universities, and businesses, from Rwanda to the rest of the continent.",
  keywords: [
    "AI",
    "Africa",
    "Rwanda",
    "Software development",
    "Digital infrastructure",
    "AI Systems",
    "Education Platforms",
    "Government Tech",
    "Custom Software",
    "Web Applications",
    "Automation",
    "Kigali",
  ],
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
    stackfix: "https://stackfix.app/dashboard",
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

export type SiteConfig = typeof siteConfig;

/**
 * SEO keyword corpus for StackForgeAI — products, services, Africa institutions,
 * and European enterprise markets. Used by `siteConfig.keywords` and llms files.
 */
const brand = [
  "StackForgeAI",
  "StackForge AI",
  "stackforgeai.africa",
  "StackForge software",
  "StackForge AI company",
];

const products = [
  "StackFix",
  "StackFix repair management",
  "repair management system Africa",
  "field service management Africa",
  "technician workflow software",
  "StackEDU",
  "StackEDU education platform",
  "tertiary education management Rwanda",
  "university management system Africa",
  "student information system Africa",
  "Rwanda Directory",
  "Rwanda business directory",
  "Kigali business directory",
  "digital business directory Africa",
];

const services = [
  "custom software development",
  "custom web development",
  "mobile app development",
  "AI software development",
  "machine learning solutions",
  "digital transformation consulting",
  "enterprise software development",
  "SaaS development Africa",
  "cloud solutions Africa",
  "business automation software",
  "software maintenance and support",
  "API development",
  "system integration",
];

const africaAudiences = [
  "software for schools Africa",
  "software for universities Africa",
  "software for workshops Africa",
  "software for SMEs Africa",
  "software for businesses Africa",
  "software for governments Africa",
  "edtech Africa",
  "govtech Africa",
  "fintech Africa software",
  "healthtech Africa",
  "ICT solutions Africa",
  "digital infrastructure Africa",
  "technology training workshops Africa",
  "coding bootcamp software Africa",
  "vocational training platform Africa",
];

const africaGeo = [
  "software development Rwanda",
  "software company Kigali",
  "AI company Rwanda",
  "AI solutions Rwanda",
  "web development Kigali",
  "web development Rwanda",
  "mobile app development Rwanda",
  "digital transformation Rwanda",
  "enterprise software Rwanda",
  "government software Rwanda",
  "Rwanda tech startup",
  "Kigali software engineers",
  "East Africa software company",
  "Pan-African technology",
  "Africa software engineering",
  "leading AI company Africa",
  "top software company Africa",
];

const europeGeo = [
  "software development Europe",
  "AI company Europe",
  "custom software Europe",
  "digital transformation Europe",
  "enterprise software Europe",
  "web development UK",
  "web development Germany",
  "web development France",
  "web development Netherlands",
  "AI consulting Europe",
  "offshore development Africa Europe",
  "Africa Europe technology partner",
  "Rwanda Europe software partnership",
];

const aiDiscovery = [
  "AI-powered software Africa",
  "intelligent automation platform",
  "AI systems for institutions",
  "machine learning Rwanda",
  "artificial intelligence Kigali",
  "AI for education",
  "AI for government",
  "AI for business operations",
  "LLM integration services",
  "AI chatbot development",
];

/** StackFix landing page — Rwanda & Africa repair-app discovery. */
export const stackfixSeoKeywords: string[] = [
  ...new Set([
    "StackFix",
    "StackFix repair app",
    "repair app in Africa",
    "repair app in Rwanda",
    "repair management app Rwanda",
    "repair shop software Africa",
    "repair shop software Rwanda",
    "workshop management system Rwanda",
    "electronics repair software Africa",
    "phone repair shop app Rwanda",
    "Mobile Money repair payments",
    "MTN MoMo repair shop",
    "technician management software Africa",
    "repair ticket system Rwanda",
    "field service management Africa",
    "repair business software Kigali",
    "repair shop POS Rwanda",
    "AI repair diagnostics Africa",
    "StackForgeAI StackFix",
  ]),
];

export const stackfixSchemaKnowsAbout: string[] = [
  "Repair shop management",
  "Electronics repair workflows",
  "Mobile Money payments for businesses",
  "Technician scheduling",
  "Repair ticket tracking",
  "Rwanda repair industry",
  "Pan-African field service software",
];

/** Deduplicated keyword list for metadata and structured-data context. */
export const seoKeywords: string[] = [
  ...new Set([
    ...brand,
    ...products,
    ...services,
    ...africaAudiences,
    ...africaGeo,
    ...europeGeo,
    ...aiDiscovery,
  ]),
];

export const schemaKnowsAbout: string[] = [
  ...new Set([
    "Software engineering",
    "Artificial intelligence",
    "Machine learning systems",
    "Large language model integration",
    "Web application development",
    "Mobile application development",
    "Digital transformation",
    "Government technology",
    "Educational technology",
    "Cloud infrastructure",
    "Business process automation",
    "Repair and field service management",
    "Student information systems",
    "Business directory platforms",
    "Rwanda ICT sector",
    "Kigali technology ecosystem",
    "Pan-African digital infrastructure",
    "European enterprise software delivery",
    "School and university software",
    "Workshop and vocational training platforms",
    "SME and enterprise automation",
  ]),
];

/** ISO 3166-1 alpha-2 codes — Africa focus with European primary markets. */
export const schemaAreaServedCountries = [
  "RW",
  "KE",
  "UG",
  "TZ",
  "ET",
  "NG",
  "GH",
  "ZA",
  "SN",
  "CI",
  "EG",
  "MA",
  "GB",
  "DE",
  "FR",
  "NL",
  "BE",
  "IE",
  "SE",
  "NO",
  "DK",
  "FI",
  "ES",
  "IT",
  "PT",
  "CH",
  "AT",
  "PL",
] as const;

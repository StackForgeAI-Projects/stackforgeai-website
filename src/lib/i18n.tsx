"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "rw";

type Dict = Record<string, string>;

/* ── English ─────────────────────────────────────────────── */
const en: Dict = {
  // Nav
  "nav.about": "About",
  "nav.products": "Products",
  "nav.services": "Services",
  "nav.impact": "Impact",
  "nav.contact": "Contact",
  "nav.cta": "Talk to us",
  "nav.menu.open": "Open menu",
  "nav.menu.close": "Close menu",

  // Hero
  "hero.badge": "Engineering Africa's AI Infrastructure · Kigali, Rwanda",
  "hero.title.1": "Building Solutions That",
  "hero.title.2": "Power",
  "hero.title.3": "Africa's Digital Growth",
  "hero.subtitle":
    "StackForgeAI builds AI-powered systems, platforms, and digital infrastructure for governments, universities, and businesses, from Rwanda to the rest of the continent.",
  "hero.cta.products": "See our products",
  "hero.cta.contact": "Talk to us",
  "hero.card.mission": "Mission-driven",
  "hero.card.builtFor": "Built for Africa",
  "hero.card.products": "Multiple products",
  "hero.card.deployed": "Deployed and in pipeline",
  "hero.card.security": "Enterprise-grade security",
  "hero.card.standard": "Built to institutional standard",

  // About
  "about.kicker": "// about",
  "about.title.1": "Engineering Africa's",
  "about.title.2": "digital backbone",
  "about.p1":
    "StackForgeAI is a technology company focused on building scalable digital systems and AI-powered solutions for organizations across Africa. We work with institutions and businesses to design, develop, and deploy tools that improve operations, increase efficiency, and unlock new opportunities for growth.",
  "about.p2":
    "Founded in Kigali, we are rooted in Rwanda's growing tech ecosystem and driven by a bold mission to build intelligent systems that strengthen institutions and power Africa's digital future. Every product we ship is built with precision, purpose, and a deep understanding of the African context it serves.",

  // Products
  "products.kicker": "// products",
  "products.title.1": "Products we've built that you can",
  "products.title.2": "start using",
  "products.comingSoon": "Coming soon",
  "products.liveNow": "Live now",
  "products.inDev": "In development",
  "products.tryNow": "Try it now",
  "products.stackfix.desc":
    "A robust repair management system that helps businesses manage workflows from start to finish; tracking service requests, managing technicians, and improving operational efficiency.",
  "products.stackedu.desc":
    "A centralized educational management system for tertiary institutions in Rwanda to manage student data, academic records, and administrative processes.",
  "products.directory.desc":
    "A digital directory of registered businesses across Rwanda, categorized by industry to improve visibility, accessibility, and discovery.",

  // Services
  "services.kicker": "// services",
  "services.title.1": "What we",
  "services.title.2": "do",
  "services.intro":
    "From idea to deployment to scale, we build the systems that move your organization forward.",
  "services.web.title": "Custom Web & Mobile Development",
  "services.web.desc":
    "We design and build modern, scalable websites and web applications tailored to your business needs.",
  "services.ai.title": "AI Products & Custom Software",
  "services.ai.desc":
    "We develop intelligent systems and automation tools that help organizations operate smarter and faster.",
  "services.support.title": "Maintenance & Ongoing Support",
  "services.support.desc":
    "We provide continuous support, updates, and improvements to ensure your systems remain reliable and efficient.",

  // Impact
  "impact.kicker": "// community impact",
  "impact.title.1": "Building",
  "impact.title.2": "great software",
  "impact.title.3": "starts with building great people.",
  "impact.p1":
    "StackForgeAI partners with schools, universities, and community organizations across Rwanda to provide free tech training and digital skills development to youth in Rwanda.",
  "impact.p2": "We're committed to growing the local tech ecosystem alongside our business.",
  "impact.cta": "Partner with us",
  "impact.badge.title": "Free programs",
  "impact.badge.subtitle": "Across Rwanda",
  "impact.img1.alt": "Rwandan students learning to code in a classroom",
  "impact.img2.alt": "Mentor teaching students at a community workshop",
  "impact.img3.alt": "Group of young Rwandan students with laptops",

  // Testimonials
  "tm.kicker": "// testimonials",
  "tm.title.1": "What our clients",
  "tm.title.2": "say",
  "tm.q1":
    "StackForgeAI helped us streamline our operations with a system that actually fits how we work.",
  "tm.q2":
    "Their ability to understand our needs and translate them into a working product was impressive.",
  "tm.q3": "Reliable, thoughtful, and highly skilled. The team delivered beyond expectations.",

  // Contact
  "contact.kicker": "// contact",
  "contact.title.1": "Ready to",
  "contact.title.2": "build",
  "contact.title.3": "with us?",
  "contact.p1": "Let's discuss your project and how we can help you build something impactful.",
  "contact.p2.1": "Have an enquiry about any of our products?",
  "contact.p2.cta": "Book a call",
  "contact.p2.2": "to schedule a free product demo walkthrough.",
  "contact.field.name": "Name",
  "contact.field.email": "Email",
  "contact.field.company": "Company",
  "contact.field.message": "Message",
  "contact.field.placeholder": "Tell us about your project...",
  "contact.tab.talk": "Talk to us",
  "contact.tab.message": "Send message",
  "contact.tab.cal.fallback": "Loading scheduler…",
  "contact.send": "Send message",
  "contact.sent": "Message sent ✓",
  "contact.sending": "Sending…",
  "contact.error": "Something went wrong. Please try again.",
  "contact.error.network": "Network error. Please check your connection.",
  "contact.error.required": "This field is required",
  "contact.error.email": "Please enter a valid email",
  "contact.error.message.short": "Message must be at least 10 characters",

  // Footer
  "footer.tagline":
    "Building intelligent systems that strengthen institutions and power Africa's digital future.",
  "footer.location": "Kigali, Rwanda 🇷🇼",
  "footer.navigate": "Navigate",
  "footer.newsletter": "Newsletter",
  "footer.newsletter.desc":
    "Be the first to receive updates about our products, services and job vacancies.",
  "footer.subscribe": "Subscribe",
  "footer.subscribed": "Subscribed ✓",
  "footer.email.placeholder": "you@company.com",
  "footer.copyright": "© 2026 StackForgeAI. All rights reserved.",
  "footer.privacy": "Privacy",
  "footer.terms": "Terms",

  // System
  "skip.content": "Skip to main content",
};

/* ── Kinyarwanda ─────────────────────────────────────────── */
const rw: Dict = {
  // Nav
  "nav.about": "Abo Turi Bo",
  "nav.products": "Ibicuruzwa",
  "nav.services": "Serivisi",
  "nav.impact": "Ingaruka",
  "nav.contact": "Twandikire",
  "nav.cta": "Tuvugishe",
  "nav.menu.open": "Fungura menu",
  "nav.menu.close": "Funga menu",

  // Hero
  "hero.badge": "Twubaka Ikoranabuhanga rya AI muri Afurika · Kigali, U Rwanda",
  // Hero title is rendered as: [1] [2 green] [3] — must read naturally in that order.
  // Mirrors EN: "Building solutions that **power** Africa's digital growth."
  "hero.title.1": "Twubaka Ibisubizo",
  "hero.title.2": "Biteza imbere ku",
  "hero.title.3": "Iterambere ry'ikoranabuhanga rya Afurika",
  "hero.subtitle":
    "StackForgeAI yubaka sisitemu zikoresha AI, ibikorwa remezo by'ikoranabuhanga ku butegetsi, kaminuza, n'ubucuruzi, kuva mu Rwanda kugera muri Afurika yose.",
  "hero.cta.products": "Reba ibicuruzwa byacu",
  "hero.cta.contact": "Tuvugishe",
  "hero.card.mission": "Iyobowe n'Intego",
  "hero.card.builtFor": "Yubatswe kuri Afurika",
  "hero.card.products": "Ibicuruzwa byinshi",
  "hero.card.deployed": "Bimaze gukoreshwa kandi biteganyijwe",
  "hero.card.security": "Umutekano w'urwego rwo hejuru",
  "hero.card.standard": "Wubatswe ku rwego rw'inzego",

  // About
  "about.kicker": "// abo turi bo",
  "about.title.1": "Twubaka",
  "about.title.2": "umugongo w'ikoranabuhanga",
  "about.p1":
    "StackForgeAI ni isosiyete y'ikoranabuhanga ihugiye mu kubaka sisitemu zigezweho n'ibisubizo bishingiye kuri AI ku miryango muri Afurika. Dukorana n'inzego n'ubucuruzi mu gushushanya, gukora, no gushyira mu bikorwa ibikoresho byongera ubushobozi, ubunyangamugayo, n'amahirwe mashya yo gukura.",
  "about.p2":
    "Twashinzwe i Kigali, dushinze imizi mu rwego rw'ikoranabuhanga rurimo gukura mu Rwanda kandi tuyobowe n'intego yo kubaka sisitemu zihebuje zikomeza inzego kandi zigatera imbere ejo hazaza h'ikoranabuhanga muri Afurika. Buri kintu dukora cyubakwa neza, kifite intego, kandi tukamenya neza imiterere ya Afurika ikorerwamo.",

  // Products
  "products.kicker": "// ibicuruzwa",
  "products.title.1": "Ibicuruzwa twubatse mushobora",
  "products.title.2": "gutangira gukoresha",
  "products.comingSoon": "Biraza vuba",
  "products.liveNow": "Iraboneka",
  "products.inDev": "Iri mu iterambere",
  "products.tryNow": "Yigerageze nonaha",
  "products.stackfix.desc":
    "Sisitemu ikomeye yo gucunga gukosora ifasha ubucuruzi gucunga imikorere kuva ku ntangiriro kugeza ku iherezo; gukurikirana ibyifuzo bya serivisi, gucunga abatekinisiye, no kunoza imikorere.",
  "products.stackedu.desc":
    "Sisitemu yunze ubumwe yo gucunga uburezi mu mashuri makuru mu Rwanda yo gucunga amakuru y'abanyeshuri, inyandiko z'amasomo, n'ibikorwa byo mu biro.",
  "products.directory.desc":
    "Ububiko bw'ikoranabuhanga bw'ubucuruzi bwanditse mu Rwanda, bushyizwe mu byiciro bitewe n'inganda kugira ngo bwiyongere mu kugaragara, kuboneka, no kumenyekana.",

  // Services
  "services.kicker": "// serivisi",
  "services.title.1": "Icyo",
  "services.title.2": "dukora",
  "services.intro":
    "Kuva ku gitekerezo kugeza ku gushyira mu bikorwa no kwagura, twubaka sisitemu zitera imbere umuryango wawe.",
  "services.web.title": "Iterambere ry'Urubuga rwihariye na Mobayile",
  "services.web.desc":
    "Twubaka kandi tugashushanya imbuga zigezweho hamwe na porogaramu z'urubuga zihuye n'ibyo ubucuruzi bwawe bukeneye.",
  "services.ai.title": "Ibicuruzwa bya AI na Porogaramu Zihariye",
  "services.ai.desc":
    "Twubaka sisitemu zihebuje n'ibikoresho by'ikoranabuhanga bifasha imiryango gukora neza kandi vuba.",
  "services.support.title": "Ubufasha n'Ubuvugizi Buhoraho",
  "services.support.desc":
    "Dutanga ubufasha buhoraho, ivugurura, n'iterambere kugira ngo sisitemu zanyu zikomeze kuba zifite icyizere kandi zikora neza.",

  // Impact
  "impact.kicker": "// ingaruka mu muryango",
  "impact.title.1": "Kubaka",
  "impact.title.2": "porogaramu nziza",
  "impact.title.3": "bitangirira ku kubaka abantu beza.",
  "impact.p1":
    "StackForgeAI ifatanya n'amashuri, kaminuza, n'imiryango y'abaturage mu Rwanda mu gutanga amahugurwa y'ikoranabuhanga ku buntu n'iterambere ry'ubumenyi bw'ikoranabuhanga ku rubyiruko rw'u Rwanda.",
  "impact.p2":
    "Twiyemeje gukuza urwego rw'ikoranabuhanga rwo mu gihugu rufatanije n'ubucuruzi bwacu.",
  "impact.cta": "Dufatanye",
  "impact.badge.title": "Gahunda z'ubuntu",
  "impact.badge.subtitle": "Mu Rwanda hose",
  "impact.img1.alt": "Abanyeshuri b'Abanyarwanda biga koderera mu ishuri",
  "impact.img2.alt": "Umurezi yigisha abanyeshuri mu nama y'abaturage",
  "impact.img3.alt": "Itsinda ry'urubyiruko rw'Abanyarwanda rufite mudasobwa",

  // Testimonials
  "tm.kicker": "// ibitekerezo",
  "tm.title.1": "Icyo abakiriya bacu",
  "tm.title.2": "bavuga",
  "tm.q1":
    "StackForgeAI yadufashije gukosora imikorere yacu binyuze muri sisitemu ihuye n'uburyo dukora.",
  "tm.q2":
    "Ubushobozi bwabo bwo kumva ibyo dukeneye no kubihindura ku bicuruzwa bikora bwarakomeye cyane.",
  "tm.q3":
    "Bafite icyizere, batekereza neza, kandi bafite ubuhanga buhanitse. Itsinda ryashyize mu bikorwa kurenza ibyo twari twiteze.",

  // Contact
  "contact.kicker": "// twandikire",
  "contact.title.1": "Witeguye",
  "contact.title.2": "kubaka",
  "contact.title.3": "natwe?",
  "contact.p1": "Reka tuganire kuri proje yawe n'uko twagufasha kubaka ikintu gifite ireme.",
  "contact.p2.1": "Ufite ikibazo ku kicuruzwa cyacu icyo aricyo cyose?",
  "contact.p2.cta": "Tugeneraho igihe",
  "contact.p2.2": "kugira ngo wibonere uko ibicuruzwa bikora ku buntu.",
  "contact.field.name": "Izina",
  "contact.field.email": "Imeyili",
  "contact.field.company": "Isosiyete",
  "contact.field.message": "Ubutumwa",
  "contact.field.placeholder": "Tubwire kuri proje yawe...",
  "contact.tab.talk": "Twiganire",
  "contact.tab.message": "Ohereza ubutumwa",
  "contact.tab.cal.fallback": "Kuringaniza kalendari…",
  "contact.send": "Ohereza ubutumwa",
  "contact.sent": "Ubutumwa bwoherejwe ✓",
  "contact.sending": "Yoherezwa…",
  "contact.error": "Hari ikitagenze neza. Ongera ugerageze.",
  "contact.error.network": "Ikibazo cy'umuyoboro. Reba interineti yawe.",
  "contact.error.required": "Iki gice gisabwa",
  "contact.error.email": "Andika imeyili yemewe",
  "contact.error.message.short": "Ubutumwa bugomba kuba bufite byibura inyuguti 10",

  // Footer
  "footer.tagline":
    "Twubaka sisitemu zihebuje zikomeza inzego kandi zigatera imbere ejo hazaza h'ikoranabuhanga muri Afurika.",
  "footer.location": "Kigali, U Rwanda 🇷🇼",
  "footer.navigate": "Genda",
  "footer.newsletter": "Amakuru",
  "footer.newsletter.desc":
    "Ba uwa mbere kubona amakuru ku bicuruzwa byacu, serivisi n'imyanya y'akazi.",
  "footer.subscribe": "Iyandikishe",
  "footer.subscribed": "Wiyandikishije ✓",
  "footer.email.placeholder": "wowe@isosiyete.com",
  "footer.copyright": "© 2026 StackForgeAI. Uburenganzira bwose bwihariwe.",
  "footer.privacy": "Ibanga",
  "footer.terms": "Amabwiriza",

  // System
  "skip.content": "Simbukira ku biri muri ibyibanze",
};

const dictionaries: Record<Lang, Dict> = { en, rw };

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "stackforgeai.lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (saved === "en" || saved === "rw") setLangState(saved);
    } catch {
      // localStorage blocked — fall back to default
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang === "rw" ? "rw" : "en";
    }
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, l);
      }
    } catch {
      // ignore
    }
  };

  const t = (key: string) => dictionaries[lang][key] ?? dictionaries.en[key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}

"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type StackfixLang = "en" | "fr" | "rw";

export const stackfixDict = {
  en: {
    nav: {
      links: [
        { href: "#features", label: "Features" },
        { href: "#product", label: "Product" },
        { href: "#how", label: "How It Works" },
        { href: "#pricing", label: "Pricing" },
        { href: "#contact", label: "Contact" },
      ],
      cta: "Book a Free Demo",
    },
    hero: {
      tag: "A StackForgeAI product · Live in Kigali, Rwanda",
      headlineLine1: "Run your repair shop",
      headlineLine2: "like a tech company.",
      sub: "StackFix is the all-in-one operating system for Rwanda's repair businesses. Tickets, technicians, invoices and Mobile Money — unified in one fast, secure platform you and your team will actually love using.",
      ctaPrimary: "Book a free demo",
      ctaSecondary: "See the product",
      trust: [
        "Enterprise-grade security",
        "4.2h avg turnaround",
        "AI-assisted diagnostics",
        "MoMo USSD *182# ready",
      ],
    },
    marquee: {
      prefix: "Built for teams running",
      items: [
        "Repair Shops",
        "Service Centers",
        "Phone Workshops",
        "Authorized Resellers",
        "Electronics Retailers",
        "IT Service Providers",
        "Field Technicians",
      ],
    },
    features: {
      tag: "Features",
      title: "Everything your workshop needs, in one place.",
      sub: "From the front desk to the repair bench, StackFix replaces spreadsheets, WhatsApp threads and paper receipts with one simple, secure system built for repair businesses in Rwanda.",
      items: [
        {
          title: "Smart Ticketing",
          desc: "Create a repair ticket, add notes and generate an invoice to be sent to the customer in under 60 seconds.",
        },
        {
          title: "Mobile Money Built In",
          desc: "The payment request and invoice is sent directly to your customer through MTN MoMo (*182#) or Airtel Money. Payments received are recorded automatically and you never have to chase a payment again.",
        },
        {
          title: "Technician Workload",
          desc: "Technicians can easily track their own workload, capture AI-assisted diagnostic notes as they go and see how quickly they are completing jobs. No confusion. No missed repairs.",
        },
        {
          title: "StackFix AI Diagnostics",
          desc: "StackFix learns from every repair your shop handles. Before your technician opens a device, AI already surfaces the most likely problem based on the history of similar repairs in your shop.",
        },
        {
          title: "Business Reports and Insights",
          desc: "See your revenue, repair volume and team performance at any time. Download clean reports for your accountant or generate tax-ready invoices in a single click, with no manual calculation needed.",
        },
        {
          title: "Customer Notifications",
          desc: "Every time a repair status changes, StackFix automatically sends your customer a WhatsApp message and an SMS update in English, French or Kinyarwanda. Fewer calls coming in. Faster pickups. Happier customers.",
        },
      ],
    },
    product: {
      tag: "The Product",
      title: "Designed for the bench. Easy at the front desk.",
      sub: "One workspace your technicians, front desk staff and business owner share together. Use it on a computer at the shop or on your phone when you are away from the counter.",
      dashLabel: "Live dashboard · Kigali workshop",
      stats: [
        { label: "Avg turnaround", value: "4.2h" },
        { label: "MoMo settled", value: "RWF 1.2M" },
        { label: "Repeat customers", value: "64%" },
      ],
      mobileTag: "Field-ready mobile",
      mobileTitle: "Manage your shop from anywhere.",
      mobileDesc:
        "Update job statuses, send invoices and collect Mobile Money payments right from your phone. Whether you are at the counter or on the road, your business stays in your pocket.",
      aiTag: "StackFix AI",
      aiTitle: "Like having an extra technician, always on standby.",
      aiDesc: "Our AI suggests possible diagnostic issues related to a device or electronic.",
    },
    how: {
      tag: "How It Works",
      title: "From drop-off to pickup, without the chaos.",
      sub: "Four simple steps that keep every repair moving smoothly, from the moment a customer walks in to the moment they walk out satisfied.",
      steps: [
        {
          n: "01",
          name: "Intake",
          title: "Ticket created in 60 seconds.",
          desc: "Log the device, capture customer details and send a quote instantly. No paper, no lost info.",
        },
        {
          n: "02",
          name: "Repair",
          title: "Customers stay in the loop.",
          desc: "Automatic WhatsApp and SMS updates at every stage. No more calls asking if it is ready.",
        },
        {
          n: "03",
          name: "Payment",
          title: "Collect via Mobile Money in one tap.",
          desc: "Send a MoMo or Airtel request straight from the ticket. Payments reconcile automatically.",
        },
        {
          n: "04",
          name: "Insight",
          title: "Reports you can act on.",
          desc: "Track turnaround, revenue and top repair types. Real numbers to grow with confidence.",
        },
      ],
    },
    why: {
      tag: "Why StackFix",
      title: "Four promises we will not break.",
      sub: "We build and improve StackFix side by side with repair shop owners and technicians across Kigali. So what we ship feels less like software and more like a trusted member of your team.",
      items: [
        {
          tag: "Security",
          title: "Your data stays safe.",
          desc: "Strong encryption, role-based access and daily automatic backups by default.",
        },
        {
          tag: "Trust",
          title: "Built in Kigali for Rwanda.",
          desc: "A registered Rwandan product made by people who understand local repair shops.",
        },
        {
          tag: "Quality",
          title: "Fast and easy every day.",
          desc: "Loads in under a second and simple enough to learn without a manual.",
        },
        {
          tag: "Delivery",
          title: "Live in 48 hours.",
          desc: "We set up your account, move your data and train your team within the week.",
        },
      ],
    },
    testimonials: {
      tag: "Testimonials",
      title: "Loved by shops across Rwanda.",
      items: [
        {
          quote:
            "StackFix replaced three spreadsheets and a WhatsApp group. Our repair turnaround dropped by 40 percent in the first month.",
          name: "Aline M.",
          role: "Operations Lead, Kigali Repair Co.",
          initials: "AM",
        },
        {
          quote:
            "The Mobile Money integration alone was worth the subscription fee. We stopped chasing payments completely.",
          name: "Jean-Paul K.",
          role: "Owner, FixHub Nyarugenge",
          initials: "JK",
        },
        {
          quote:
            "Reliable, thoughtful and seriously fast to set up. The StackForgeAI team delivered beyond what we expected.",
          name: "Diane U.",
          role: "Founder, Rwanda SME Network",
          initials: "DU",
        },
      ],
    },
    contact: {
      tag: "Contact",
      title: "Ready to take your repair business to the next level?",
      body: "Book a free 15-minute walkthrough of StackFix. We will go through the platform using your real shop workflow and show you exactly how it fits your business. No pressure. Just a straightforward conversation.",
      email: "hello@stackforgeai.africa",
      phone: "+250 799 486 531",
      whatsapp: "Call/WhatsApp +250 799 486 531",
      location: "Kigali, Rwanda",
      formTitle: "Book a Demo",
      formSub: "Fill in the form below and we will get back to you within 24 hours.",
      fields: {
        name: "Full name",
        business: "Business name",
        email: "Email",
        phone: "Phone or WhatsApp",
        message: "Tell us about your workshop",
      },
      submit: "Send Message",
    },
    footer: {
      tagline: "The repair management platform built for Rwanda's businesses. Built in Kigali by",
      product: "Product",
      company: "Company",
      reach: "Get in touch",
      rights: "All rights reserved.",
      madeWith: "Made with",
      inKigali: "in Kigali, Rwanda",
    },
  },
  rw: {
    nav: {
      links: [
        { href: "#features", label: "Ibirimo" },
        { href: "#product", label: "Igicuruzwa" },
        { href: "#how", label: "Uko Bikora" },
        { href: "#pricing", label: "Ibiciro" },
        { href: "#contact", label: "Twandikire" },
      ],
      cta: "Saba Demo y'Ubuntu",
    },
    hero: {
      tag: "Igicuruzwa cya StackForgeAI · Kibarizwa i Kigali, u Rwanda",
      headlineLine1: "Yobora atelier yawe yo gusana",
      headlineLine2: "nk'ikigo cy'ikoranabuhanga.",
      sub: "StackFix ni sisitemu yose mu rimwe y'ubucuruzi bwo gusana mu Rwanda. Tike, abakanishi, fagitire na Mobile Money — byose mu rubuga rwihuse, rwizewe rworoshye gukoresha wowe n'itsinda ryawe.",
      ctaPrimary: "Saba demo y'ubuntu",
      ctaSecondary: "Reba igicuruzwa",
      trust: [
        "Umutekano wo ku rwego rw'ikigo",
        "Igihe cy'impuzandengo: 4.2h",
        "Isuzuma rifashijwe na AI",
        "MoMo USSD *182# byiteguye",
      ],
    },
    marquee: {
      prefix: "Cyakorewe amatsinda akora",
      items: [
        "Atelier z'Ubukanishi",
        "Ibigo by'Uburyo",
        "Atelier za Telefone",
        "Abakangurambaga Bemewe",
        "Abacuruzi b'Amashanyarazi",
        "Abatanga Serivisi za IT",
        "Abakanishi Bagenda",
      ],
    },
    features: {
      tag: "Ibirimo",
      title: "Ibyo atelier yawe ikeneye byose, ahantu hamwe.",
      sub: "Kuva ku rubanza rwo hambere kugeza ku meza yo gusanira, StackFix isimbura amatabari, ibiganiro bya WhatsApp n'inyemezabuguzi z'impapuro hifashishijwe sisitemu imwe yoroshye, irinzwe yakorewe ubucuruzi bwo gusana mu Rwanda.",
      items: [
        {
          title: "Tike Z'Ubwenge",
          desc: "Kora tike yo gusana, ongeraho inyandiko maze ukore fagitire yoherezwa umukiriya mu masegonda atari arenze 60.",
        },
        {
          title: "Mobile Money Yashyizwemo",
          desc: "Isaba ry'ubwishyu na fagitire byohererezwa umukiriya wawe binyuze muri MTN MoMo (*182#) cyangwa Airtel Money. Ubwishyu bwakiriwe bwandikwa ku buryo bwikora kandi ntugomba kongera gukurikirana ubwishyu.",
        },
        {
          title: "Umurimo w'Umukanishi",
          desc: "Abakanishi bashobora gukurikirana umurimo wabo, kwandika inyandiko z'isuzuma zifashijwe na AI mu gihe bakora, no kureba uburyo barangiza akazi vuba. Nta kwitiranya. Nta gusanira basibye.",
        },
        {
          title: "Isuzuma rya StackFix AI",
          desc: "StackFix yiga kuri buri kosora atelier yawe ikora. Mbere y'uko umukanishi wawe afungura igikoresho, AI imaze kugaragaza ikibazo gishoboka cyane ishingiye ku mateka y'amakosora asa mu atelier yawe.",
        },
        {
          title: "Raporo n'Ibitekerezo by'Ubucuruzi",
          desc: "Reba inyungu zawe, umubare w'amakosora n'imikorere y'itsinda igihe icyo ari cyo cyose. Manura raporo ziboneye ku mubaritsi wawe cyangwa ukore fagitire ziteguye umusoro mu kanya gato, nta kubara kuri rugero.",
        },
        {
          title: "Amatangazo y'Abakiriya",
          desc: "Igihe cyose imiterere yo gusana ihindutse, StackFix yohereza ku buryo bwikora umukiriya wawe ubutumwa bwa WhatsApp na SMS mu Cyongereza, Igifaransa cyangwa Ikinyarwanda. Guhamagara guke. Gufata vuba. Abakiriya bishimye.",
        },
      ],
    },
    product: {
      tag: "Igicuruzwa",
      title: "Cyakorewe ameza y'akazi. Cyoroshye ku rubanza rwo hambere.",
      sub: "Ahantu hamwe h'akazi abakanishi bawe, abakozi b'imbere n'umuyobozi w'ubucuruzi basangiye. Gikoreshe kuri mudasobwa muri atelier cyangwa kuri telefone igihe uri kure y'akazi.",
      dashLabel: "Dashboard ikora · Atelier ya Kigali",
      stats: [
        { label: "Igihe cy'impuzandengo", value: "4.2h" },
        { label: "MoMo yishyuwe", value: "RWF 1.2M" },
        { label: "Abakiriya basubira", value: "64%" },
      ],
      mobileTag: "Telefone yiteguye ku murima",
      mobileTitle: "Yobora atelier yawe aho uri hose.",
      mobileDesc:
        "Hindura imiterere y'akazi, ohereza fagitire kandi wakire ubwishyu bwa Mobile Money uhereye kuri telefone yawe. Niba uri ku rubanza cyangwa mu nzira, ubucuruzi bwawe buguma mu mufuka.",
      aiTag: "StackFix AI",
      aiTitle: "Nk'aho ufite undi mukanishi, ahora yiteguye.",
      aiDesc:
        "AI yacu igusabira ibibazo bishoboka by'isuzuma bijyanye n'igikoresho cyangwa amashanyarazi.",
    },
    how: {
      tag: "Uko Bikora",
      title: "Kuva ku gushyira kugeza ku gufata, nta kavuyo.",
      sub: "Intambwe enye zoroshye zituma buri kosora rigenda neza, kuva igihe umukiriya yinjiriye kugeza igihe asohoye yishimye.",
      steps: [
        {
          n: "01",
          name: "Kwakira",
          title: "Tike ikorwa mu masegonda 60.",
          desc: "Andika igikoresho, fata amakuru y'umukiriya kandi ohereza igiciro ako kanya. Nta mpapuro, nta makuru atakaye.",
        },
        {
          n: "02",
          name: "Gusana",
          title: "Abakiriya bagumana amakuru.",
          desc: "Ubutumwa bwa WhatsApp na SMS bwikora kuri buri ntambwe. Nta guhamagara kenshi.",
        },
        {
          n: "03",
          name: "Kwishyura",
          title: "Akira Mobile Money mu gikanda kimwe.",
          desc: "Ohereza isaba rya MoMo cyangwa Airtel ako kanya. Ubwishyu bwunganira ku buryo bwikora.",
        },
        {
          n: "04",
          name: "Ubumenyi",
          title: "Raporo ushobora gukurikiza.",
          desc: "Kurikirana igihe, inyungu n'amakosora akorwa kenshi. Imibare nyayo yo gukura.",
        },
      ],
    },
    why: {
      tag: "Kuki StackFix",
      title: "Amasezerano ane tutazigera duca.",
      sub: "Twubaka StackFix iruhande n'abanyiri atelier mu Kigali, byumvikana nk'umuntu wo mu itsinda ryawe.",
      items: [
        {
          tag: "Umutekano",
          title: "Amakuru yawe afite umutekano.",
          desc: "Encryption ikomeye, urwego rw'abakozi rugenzurwa na backups buri munsi.",
        },
        {
          tag: "Icyizere",
          title: "Cyakorewe i Kigali ku Rwanda.",
          desc: "Igicuruzwa nyarwanda cyakozwe n'abasobanukiwe uburyo atelier zikora hano.",
        },
        {
          tag: "Ubuziranenge",
          title: "Byihuse kandi byoroshye.",
          desc: "Yinjira mu gihe gito kandi yoroshye gukoresha nta myitozo.",
        },
        {
          tag: "Gushyira mu Bikorwa",
          title: "Muri murongo mu masaha 48.",
          desc: "Dushyiraho konti yawe, twimura amakuru kandi twigisha itsinda mu cyumweru.",
        },
      ],
    },
    testimonials: {
      tag: "Ubuhamya",
      title: "Bikundwa n'atelier muri u Rwanda.",
      items: [
        {
          quote:
            "StackFix yasimbuye amatabari atatu n'itsinda rya WhatsApp. Igihe cyacu cyo gusana cyaragabanutse 40 ku ijana mu kwezi kwa mbere.",
          name: "Aline M.",
          role: "Umuyobozi w'Imikorere, Kigali Repair Co.",
          initials: "AM",
        },
        {
          quote:
            "Guhuza Mobile Money byonyine byagize agaciro kuruta ikiguzi cy'iyandikisha. Twahagaritse rwose gukurikirana ubwishyu.",
          name: "Jean-Paul K.",
          role: "Nyiri, FixHub Nyarugenge",
          initials: "JK",
        },
        {
          quote:
            "Byizewe, byatekerejweho kandi byihuta cyane gushyiraho. Itsinda rya StackForgeAI ryatanze biruta ibyo twari twiteze.",
          name: "Diane U.",
          role: "Uwashinze, Rwanda SME Network",
          initials: "DU",
        },
      ],
    },
    contact: {
      tag: "Twandikire",
      title: "Witeguye gushyira ubucuruzi bwawe bwo gusana ku rwego rukurikira?",
      body: "Saba demo y'ubuntu y'iminota 15 kuri StackFix. Tuzanyura kuri urubuga dukoresheje uburyo nyabwo bw'atelier yawe maze tukwereke neza uko bikwiranye n'ubucuruzi bwawe. Nta gahato. Ikiganiro cyoroshye.",
      email: "hello@stackforgeai.africa",
      phone: "+250 799 486 531",
      whatsapp: "Hamagara/WhatsApp +250 799 486 531",
      location: "Kigali, u Rwanda",
      formTitle: "Saba Demo",
      formSub: "Uzuza ifishi ikurikira maze tuzakugarukira mu masaha 24.",
      fields: {
        name: "Amazina yose",
        business: "Izina ry'ubucuruzi",
        email: "Imeri",
        phone: "Telefone cyangwa WhatsApp",
        message: "Tubwire kuri atelier yawe",
      },
      submit: "Ohereza Ubutumwa",
    },
    footer: {
      tagline:
        "Urubuga rwo gucunga gusana rwakorewe ubucuruzi bwo mu Rwanda. Cyakorewe i Kigali na",
      product: "Igicuruzwa",
      company: "Sosiyete",
      reach: "Twandikire",
      rights: "Uburenganzira bwose bwihariwe.",
      madeWith: "Cyakozwe n'",
      inKigali: "i Kigali, u Rwanda",
    },
  },
  fr: {
    nav: {
      links: [
        { href: "#features", label: "Fonctionnalités" },
        { href: "#product", label: "Produit" },
        { href: "#how", label: "Comment ça marche" },
        { href: "#pricing", label: "Tarifs" },
        { href: "#contact", label: "Contact" },
      ],
      cta: "Réserver une démo",
    },
    hero: {
      tag: "Un produit StackForgeAI · Disponible à Kigali, Rwanda",
      headlineLine1: "Gérez votre atelier de réparation",
      headlineLine2: "comme une tech company.",
      sub: "StackFix est le système d'exploitation tout-en-un pour les entreprises de réparation au Rwanda. Tickets, techniciens, factures et Mobile Money — unifiés sur une plateforme rapide, sécurisée et agréable à utiliser.",
      ctaPrimary: "Réserver une démo gratuite",
      ctaSecondary: "Voir le produit",
      trust: [
        "Sécurité de niveau entreprise",
        "Délai moyen : 4,2h",
        "Diagnostic assisté par IA",
        "MoMo USSD *182# prêt",
      ],
    },
    marquee: {
      prefix: "Conçu pour les équipes de",
      items: [
        "Ateliers de réparation",
        "Centres de service",
        "Ateliers téléphone",
        "Revendeurs agréés",
        "Détaillants électroniques",
        "Prestataires IT",
        "Techniciens mobiles",
      ],
    },
    features: {
      tag: "Fonctionnalités",
      title: "Tout ce dont votre atelier a besoin, au même endroit.",
      sub: "De l'accueil à l'établi, StackFix remplace les tableurs, les groupes WhatsApp et les reçus papier par un seul système simple et sécurisé.",
      items: [
        {
          title: "Ticketing intelligent",
          desc: "Créez un ticket de réparation, ajoutez des notes et envoyez une facture au client en moins de 60 secondes.",
        },
        {
          title: "Mobile Money intégré",
          desc: "Envoyez la demande de paiement directement via MTN MoMo (*182#) ou Airtel Money. Les paiements sont enregistrés automatiquement.",
        },
        {
          title: "Charge des techniciens",
          desc: "Les techniciens suivent leur charge de travail et ajoutent des notes de diagnostic assistées par IA en temps réel.",
        },
        {
          title: "Diagnostic IA StackFix",
          desc: "StackFix apprend de chaque réparation et propose le problème le plus probable avant même l'ouverture de l'appareil.",
        },
        {
          title: "Rapports & analyses",
          desc: "Suivez vos revenus, volumes et performance d'équipe. Exportez des factures prêtes pour la fiscalité en un clic.",
        },
        {
          title: "Notifications clients",
          desc: "À chaque changement de statut, le client reçoit un message WhatsApp et un SMS en anglais, français ou kinyarwanda.",
        },
      ],
    },
    product: {
      tag: "Le produit",
      title: "Pensé pour l'établi. Simple à l'accueil.",
      sub: "Un espace de travail partagé entre techniciens, accueil et direction. Sur ordinateur ou téléphone.",
      dashLabel: "Tableau de bord en direct · Atelier de Kigali",
      stats: [
        { label: "Temps moyen", value: "4,2h" },
        { label: "MoMo encaissé", value: "RWF 1.2M" },
        { label: "Clients fidèles", value: "64%" },
      ],
      mobileTag: "Mobile sur le terrain",
      mobileTitle: "Gérez votre atelier où que vous soyez.",
      mobileDesc:
        "Mettez à jour les statuts, envoyez les factures et encaissez Mobile Money directement depuis votre téléphone.",
      aiTag: "StackFix AI",
      aiTitle: "Comme un technicien supplémentaire, toujours prêt.",
      aiDesc:
        "Notre IA suggère les diagnostics possibles liés à un appareil ou à un produit électronique.",
    },
    how: {
      tag: "Comment ça marche",
      title: "Du dépôt à la remise, sans le chaos.",
      sub: "Quatre étapes simples pour faire avancer chaque réparation sans accroc.",
      steps: [
        {
          n: "01",
          name: "Accueil",
          title: "Ticket créé en 60 secondes.",
          desc: "Enregistrez l'appareil, les coordonnées et envoyez un devis instantanément. Aucune information perdue.",
        },
        {
          n: "02",
          name: "Réparation",
          title: "Les clients restent informés.",
          desc: "Mises à jour WhatsApp et SMS automatiques à chaque étape. Fini les appels répétés.",
        },
        {
          n: "03",
          name: "Paiement",
          title: "Encaissez Mobile Money en un clic.",
          desc: "Envoyez une demande MoMo ou Airtel depuis le ticket. Réconciliation automatique.",
        },
        {
          n: "04",
          name: "Analyse",
          title: "Des rapports exploitables.",
          desc: "Suivez les délais, revenus et types de réparation. Des chiffres concrets pour grandir.",
        },
      ],
    },
    why: {
      tag: "Pourquoi StackFix",
      title: "Quatre promesses que nous tenons.",
      sub: "Nous construisons StackFix aux côtés des ateliers de Kigali, comme un membre de confiance de votre équipe.",
      items: [
        {
          tag: "Sécurité",
          title: "Vos données restent protégées.",
          desc: "Chiffrement fort, accès par rôle et sauvegardes automatiques quotidiennes.",
        },
        {
          tag: "Confiance",
          title: "Conçu à Kigali pour le Rwanda.",
          desc: "Un produit rwandais créé par ceux qui comprennent les ateliers locaux.",
        },
        {
          tag: "Qualité",
          title: "Rapide et simple au quotidien.",
          desc: "Se charge en moins d'une seconde et s'apprend sans manuel.",
        },
        {
          tag: "Livraison",
          title: "Opérationnel en 48 heures.",
          desc: "Nous configurons votre compte, migrons vos données et formons votre équipe.",
        },
      ],
    },
    testimonials: {
      tag: "Témoignages",
      title: "Adopté par les ateliers du Rwanda.",
      items: [
        {
          quote:
            "StackFix a remplacé trois tableurs et un groupe WhatsApp. Notre délai de réparation a baissé de 40% le premier mois.",
          name: "Aline M.",
          role: "Responsable opérations, Kigali Repair Co.",
          initials: "AM",
        },
        {
          quote:
            "L'intégration Mobile Money à elle seule valait l'abonnement. Nous ne courons plus après les paiements.",
          name: "Jean-Paul K.",
          role: "Propriétaire, FixHub Nyarugenge",
          initials: "JK",
        },
        {
          quote:
            "Fiable, bien pensé et rapide à mettre en place. L'équipe StackForgeAI a dépassé nos attentes.",
          name: "Diane U.",
          role: "Fondatrice, Rwanda SME Network",
          initials: "DU",
        },
      ],
    },
    contact: {
      tag: "Contact",
      title: "Prêt à faire passer votre atelier au niveau supérieur ?",
      body: "Réservez une démo gratuite de 15 minutes adaptée à votre flux de travail. Sans pression, juste une conversation simple.",
      email: "hello@stackforgeai.africa",
      phone: "+250 799 486 531",
      whatsapp: "Appel/WhatsApp +250 799 486 531",
      location: "Kigali, Rwanda",
      formTitle: "Réserver une démo",
      formSub: "Remplissez le formulaire et nous vous répondons sous 24 heures.",
      fields: {
        name: "Nom complet",
        business: "Nom de l'entreprise",
        email: "E-mail",
        phone: "Téléphone ou WhatsApp",
        message: "Parlez-nous de votre atelier",
      },
      submit: "Envoyer le message",
    },
    footer: {
      tagline:
        "La plateforme de gestion des réparations conçue pour les entreprises du Rwanda. Construite à Kigali par",
      product: "Produit",
      company: "Entreprise",
      reach: "Nous contacter",
      rights: "Tous droits réservés.",
      madeWith: "Conçu avec",
      inKigali: "à Kigali, Rwanda",
    },
  },
} as const;

export type StackfixTranslations = (typeof stackfixDict)["en"];

const StackfixLangContext = createContext<{
  lang: StackfixLang;
  setLang: (l: StackfixLang) => void;
  t: StackfixTranslations;
}>({
  lang: "en",
  setLang: () => {},
  t: stackfixDict.en,
});

export function useStackfixLang() {
  return useContext(StackfixLangContext);
}

export function StackfixLangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<StackfixLang>("en");
  const t = stackfixDict[lang] as StackfixTranslations;
  return (
    <StackfixLangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </StackfixLangContext.Provider>
  );
}

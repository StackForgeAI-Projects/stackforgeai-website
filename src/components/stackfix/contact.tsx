"use client";

import type { ComponentType } from "react";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { useStackfixLang } from "@/lib/stackfix-i18n";
import { Field } from "./field";

function ContactLink({
  icon: Icon,
  href,
  label,
}: {
  icon: ComponentType<{ className?: string }>;
  href?: string;
  label: string;
}) {
  const Comp = href ? "a" : "div";

  return (
    <Comp
      {...(href ? { href } : {})}
      className="group text-foreground/90 hover:text-brand flex w-full items-center gap-3 transition-colors"
    >
      <span className="bg-brand/10 text-brand group-hover:bg-brand/20 grid h-9 w-9 place-items-center rounded-lg transition-colors">
        <Icon className="h-4 w-4" />
      </span>
      <span className="text-sm">{label}</span>
    </Comp>
  );
}

export function Contact() {
  const { t } = useStackfixLang();

  return (
    <section id="contact" className="bg-surface/40 border-border/60 border-t py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2">
        <div>
          <p className="text-brand mb-3 text-xs tracking-[0.2em] uppercase">
            {`// ${t.contact.tag.toLowerCase()}`}
          </p>
          <h2 className="text-4xl font-bold tracking-tight md:text-6xl">{t.contact.title}</h2>
          <p className="text-muted-foreground mt-6 max-w-md">{t.contact.body}</p>

          <div className="mt-10 space-y-3">
            <ContactLink icon={Mail} href={`mailto:${t.contact.email}`} label={t.contact.email} />
            <ContactLink icon={Phone} href="tel:+250799486531" label={t.contact.phone} />
            <ContactLink
              icon={WhatsAppIcon}
              href="https://wa.me/250799486531"
              label={t.contact.whatsapp}
            />
            <ContactLink icon={MapPin} label={t.contact.location} />
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            const subject = encodeURIComponent(
              `StackFix demo request — ${data.get("business") || data.get("name")}`,
            );
            const body = encodeURIComponent(
              `Name: ${data.get("name")}\nBusiness: ${data.get("business")}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone")}\n\n${data.get("message")}`,
            );
            window.location.href = `mailto:hello@stackforgeai.africa?subject=${subject}&body=${body}`;
          }}
          className="glass rounded-2xl p-7 md:p-8"
        >
          <h3 className="text-xl font-semibold">{t.contact.formTitle}</h3>
          <p className="text-muted-foreground mt-1 text-sm">{t.contact.formSub}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field name="name" label={t.contact.fields.name} placeholder="Kevin Ganza" required />
            <Field
              name="business"
              label={t.contact.fields.business}
              placeholder="FixHub Nyarugenge"
              required
            />
            <Field
              name="email"
              type="email"
              label={t.contact.fields.email}
              placeholder="you@shop.rw"
              required
            />
            <Field name="phone" label={t.contact.fields.phone} placeholder="+250 …" />
          </div>
          <div className="mt-4">
            <Field
              name="message"
              label={t.contact.fields.message}
              placeholder="How many techs? Where? What hurts most today?"
              textarea
            />
          </div>
          <button
            type="submit"
            className="btn-brand mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
          >
            {t.contact.submit} <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </section>
  );
}

"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGSAP } from "@gsap/react";
import { toast } from "sonner";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SfWatermark } from "@/components/sf-watermark";
import { cn } from "@/lib/utils";

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { t } = useLang();
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", company: "", message: "", website: "" },
    mode: "onBlur",
  });

  useGSAP(
    () => {
      gsap.set("[data-contact]", { autoAlpha: 1 });
      if (prefersReducedMotion()) return;
      gsap.from("[data-contact]", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
    },
    { scope: ref },
  );

  const onSubmit = async (data: ContactInput) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.status === 429) {
        toast.error("Too many requests. Please try again in an hour.");
        return;
      }
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error ?? t("contact.error"));
      }
      setSent(true);
      toast.success(t("contact.sent"));
      reset();
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : t("contact.error.network"));
    }
  };

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
      <SfWatermark rotate={14} opacity={0.05} size="min(900px, 75vw)" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(circle, oklch(0.97 0.01 200 / 0.9) 1px, transparent 1.4px)",
          backgroundSize: "14px 14px",
          maskImage: "radial-gradient(ellipse 70% 55% at 50% 40%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 55% at 50% 40%, black 30%, transparent 75%)",
        }}
      />
      <svg
        className="pointer-events-none absolute inset-x-0 top-20 mx-auto opacity-[0.08]"
        viewBox="0 0 1200 500"
        width="100%"
        height="500"
        fill="oklch(0.97 0.01 200)"
        aria-hidden
      >
        <path d="M180 180c30-40 90-50 140-30s80 20 130 5 90 0 110 30 60 30 110 10 110 10 90 50-40 80-100 70-110-20-160 0-110 60-180 50-100-50-140-90-30-65 0-95z" />
      </svg>
      <div
        aria-hidden
        className="absolute -bottom-32 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(circle, oklch(0.88 0.27 145 / 0.5), transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div data-contact className="text-primary font-mono text-sm tracking-widest uppercase">
            {t("contact.kicker")}
          </div>
          <h2
            data-contact
            className="font-display mt-4 text-4xl font-semibold tracking-tight lg:text-6xl"
          >
            {t("contact.title.1")}{" "}
            <span className="text-gradient-green">{t("contact.title.2")}</span>{" "}
            {t("contact.title.3")}
          </h2>
          <p data-contact className="text-muted-foreground mt-6 text-lg leading-relaxed">
            {t("contact.p1")}
          </p>
          <p data-contact className="text-muted-foreground mt-4 text-base leading-relaxed">
            {t("contact.p2.1")}{" "}
            <a
              href={siteConfig.links.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium underline-offset-4 hover:underline focus:outline-none focus-visible:underline"
            >
              {t("contact.p2.cta")}
            </a>{" "}
            {t("contact.p2.2")}
          </p>
          <div data-contact className="mt-10 space-y-4 text-sm">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="text-foreground hover:text-primary flex items-center gap-3 transition"
            >
              <span
                aria-hidden
                className="glass text-primary flex h-10 w-10 items-center justify-center rounded-xl"
              >
                @
              </span>
              {siteConfig.contact.email}
            </a>
            <a
              href={`tel:${siteConfig.contact.phone.replace(/[^+0-9]/g, "")}`}
              className="text-foreground hover:text-primary flex items-center gap-3 transition"
            >
              <span
                aria-hidden
                className="glass text-primary flex h-10 w-10 items-center justify-center rounded-xl"
              >
                ☎
              </span>
              {siteConfig.contact.phoneDisplay}
            </a>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`WhatsApp ${siteConfig.contact.whatsappDisplay}`}
              className="text-foreground hover:text-primary flex items-center gap-3 transition"
            >
              <span
                aria-hidden
                className="glass text-primary flex h-10 w-10 items-center justify-center rounded-xl"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 3.36L3 21" />
                  <path d="M9 10c.5 2.5 2.5 4.5 5 5l1.5-1.5c.3-.3.7-.4 1-.2l2 .9c.4.2.6.6.5 1A4 4 0 0 1 15 18a9 9 0 0 1-9-9 4 4 0 0 1 2.8-3.9c.4-.1.8.1 1 .5l.9 2c.2.3.1.7-.2 1L9 10z" />
                </svg>
              </span>
              {siteConfig.contact.whatsappDisplay}
            </a>
            <div className="text-foreground flex items-center gap-3">
              <span
                aria-hidden
                className="glass text-primary flex h-10 w-10 items-center justify-center rounded-xl"
              >
                ⌖
              </span>
              {t("footer.location")} · Working globally
            </div>
          </div>
        </div>

        <form
          data-contact
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="glass space-y-5 rounded-3xl p-8 lg:col-span-7 lg:p-10"
          aria-label="Contact form"
        >
          {/* Honeypot — invisible to humans, irresistible to bots */}
          <input
            type="text"
            autoComplete="off"
            tabIndex={-1}
            aria-hidden
            {...register("website")}
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label={t("contact.field.name")}
              error={errors.name?.message}
              inputId="contact-name"
            >
              <Input
                id="contact-name"
                autoComplete="name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "contact-name-err" : undefined}
                placeholder={t("contact.field.name")}
                {...register("name")}
              />
            </Field>
            <Field
              label={t("contact.field.email")}
              error={errors.email?.message}
              inputId="contact-email"
            >
              <Input
                id="contact-email"
                type="email"
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "contact-email-err" : undefined}
                placeholder={t("contact.field.email")}
                {...register("email")}
              />
            </Field>
          </div>
          <Field
            label={t("contact.field.company")}
            error={errors.company?.message}
            inputId="contact-company"
          >
            <Input
              id="contact-company"
              autoComplete="organization"
              aria-invalid={!!errors.company}
              placeholder={t("contact.field.company")}
              {...register("company")}
            />
          </Field>
          <Field
            label={t("contact.field.message")}
            error={errors.message?.message}
            inputId="contact-message"
          >
            <Textarea
              id="contact-message"
              rows={5}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "contact-message-err" : undefined}
              placeholder={t("contact.field.placeholder")}
              {...register("message")}
            />
          </Field>
          <button
            type="submit"
            disabled={isSubmitting || sent}
            className={cn(
              "btn-press group bg-primary text-primary-foreground glow-green focus-visible:ring-primary/70 focus-visible:ring-offset-background inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-3.5 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-70 disabled:hover:translate-y-0 sm:w-auto",
            )}
          >
            {sent ? (
              t("contact.sent")
            ) : isSubmitting ? (
              t("contact.sending")
            ) : (
              <>
                {t("contact.send")}
                <span aria-hidden className="btn-arrow">
                  →
                </span>
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  inputId,
  children,
}: {
  label: string;
  error?: string;
  inputId: string;
  children: React.ReactNode;
}) {
  return (
    <div className="block">
      <Label htmlFor={inputId}>{label}</Label>
      {children}
      {error ? (
        <p id={`${inputId}-err`} role="alert" className="text-destructive mt-1.5 text-xs">
          {error}
        </p>
      ) : null}
    </div>
  );
}

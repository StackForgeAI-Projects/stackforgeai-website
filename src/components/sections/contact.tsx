"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGSAP } from "@gsap/react";
import { toast } from "sonner";
import Cal, { getCalApi } from "@calcom/embed-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { CONTACT_TAB_EVENT, type ContactTab, type ContactTabEvent } from "@/lib/contact-events";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SfWatermark } from "@/components/sf-watermark";
import { cn } from "@/lib/utils";

const CAL_NAMESPACE = "15min";
const CAL_LINK = "stackforgeai/15min";

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { t } = useLang();
  const [tab, setTab] = useState<ContactTab>("talk");

  const showTalkTab = useCallback(() => setTab("talk"), []);

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as ContactTabEvent).detail;
      if (detail === "talk" || detail === "message") setTab(detail);
    };
    window.addEventListener(CONTACT_TAB_EVENT, handler);
    return () => window.removeEventListener(CONTACT_TAB_EVENT, handler);
  }, []);

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
            <button
              type="button"
              onClick={showTalkTab}
              className="text-primary cursor-pointer font-medium underline-offset-4 transition hover:underline focus:outline-none focus-visible:underline"
            >
              {t("contact.p2.cta")}
            </button>{" "}
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

        <div data-contact className="lg:col-span-7">
          <Tabs
            value={tab}
            onValueChange={(value) => setTab(value as ContactTab)}
            className="w-full"
          >
            <TabsList aria-label="Contact options">
              <TabsTrigger value="talk">
                <CalendarIcon />
                {t("contact.tab.talk")}
              </TabsTrigger>
              <TabsTrigger value="message">
                <MailIcon />
                {t("contact.tab.message")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="talk" className="glass overflow-hidden rounded-3xl p-2 sm:p-3">
              <CalEmbed fallbackLabel={t("contact.tab.cal.fallback")} />
            </TabsContent>

            <TabsContent value="message">
              <ContactForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}

function CalEmbed({ fallbackLabel }: { fallbackLabel: string }) {
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const cal = await getCalApi({ namespace: CAL_NAMESPACE });
        if (cancelled) return;

        // Mirror our oklch design tokens onto Cal's CSS variables so the
        // booker visually inherits the StackForgeAI surface, border and
        // typography instead of Cal's default cool-grey palette.
        const darkVars = {
          "cal-brand": "#39ff24",
          "cal-brand-emphasis": "#7dff6b",
          "cal-brand-text": "#040e17",
          "cal-brand-accent": "#39ff24",
          "cal-bg": "oklch(0.22 0.028 240)",
          "cal-bg-emphasis": "oklch(0.30 0.03 240)",
          "cal-bg-muted": "oklch(0.20 0.025 240)",
          "cal-bg-subtle": "oklch(0.26 0.03 240)",
          "cal-bg-info": "oklch(0.22 0.028 240)",
          "cal-bg-success": "oklch(0.30 0.10 150)",
          "cal-bg-attention": "oklch(0.30 0.10 80)",
          "cal-bg-error": "oklch(0.30 0.15 30)",
          "cal-bg-inverted": "oklch(0.97 0.01 200)",
          "cal-bg-primary": "oklch(0.22 0.028 240)",
          "cal-bg-secondary": "oklch(0.26 0.03 240)",
          "cal-bg-tertiary": "oklch(0.30 0.03 240)",
          "cal-border": "oklch(0.32 0.03 240)",
          "cal-border-default": "oklch(0.32 0.03 240)",
          "cal-border-emphasis": "oklch(0.42 0.03 240)",
          "cal-border-subtle": "oklch(0.28 0.028 240)",
          "cal-border-muted": "oklch(0.26 0.028 240)",
          "cal-border-booker": "oklch(0.32 0.03 240)",
          "cal-border-booker-emphasis": "oklch(0.42 0.03 240)",
          "cal-border-focus": "#39ff24",
          "cal-text": "oklch(0.97 0.01 200)",
          "cal-text-emphasis": "oklch(0.99 0.005 200)",
          "cal-text-default": "oklch(0.97 0.01 200)",
          "cal-text-muted": "oklch(0.72 0.02 220)",
          "cal-text-subtle": "oklch(0.60 0.02 220)",
          "cal-text-brand": "#39ff24",
          "cal-text-inverted": "oklch(0.18 0.025 240)",
          // Best-effort font overrides. Cal.com does not officially expose
          // these as themable variables; when supported they swap Cal Sans
          // for our design-system fonts, otherwise they are silently
          // ignored.
          "cal-font-cal": "var(--font-display)",
          "cal-font-sans": "var(--font-sans)",
        } as const;

        cal("ui", {
          theme: "dark",
          cssVarsPerTheme: {
            light: darkVars,
            dark: darkVars,
          },
          hideEventTypeDetails: false,
          layout: "month_view",
        });
      } catch (err) {
        console.error("Cal.com embed init failed", err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      className="relative h-[520px] w-full overflow-auto rounded-2xl sm:h-[560px]"
      role="region"
      aria-label="Booking calendar"
    >
      <div
        aria-hidden
        className="text-muted-foreground pointer-events-none absolute inset-0 flex items-center justify-center text-sm"
      >
        {fallbackLabel}
      </div>
      <Cal
        namespace={CAL_NAMESPACE}
        calLink={CAL_LINK}
        style={{
          width: "100%",
          minHeight: "100%",
          overflow: "auto",
          position: "relative",
          zIndex: 1,
        }}
        config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true", theme: "dark" }}
      />
    </div>
  );
}

function ContactForm() {
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
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="glass space-y-5 rounded-3xl p-8 lg:p-10"
      aria-label="Contact form"
    >
      <input
        type="text"
        autoComplete="off"
        tabIndex={-1}
        aria-hidden
        {...register("website")}
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("contact.field.name")} error={errors.name?.message} inputId="contact-name">
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

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

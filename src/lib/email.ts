import "server-only";
import { Resend } from "resend";
import { serverEnv } from "@/lib/env";
import { ContactNotificationEmail } from "@/emails/contact-notification";
import {
  buildContactPlainText,
  contactFromToMisconfigured,
  formatContactReplyTo,
  type SendContactArgs,
} from "@/lib/contact-email-content";

let cached: Resend | undefined;

export function getResend(): Resend | null {
  const env = serverEnv();
  if (!env.RESEND_API_KEY) return null;
  if (!cached) cached = new Resend(env.RESEND_API_KEY);
  return cached;
}

export type { SendContactArgs };

export async function sendContactEmail(args: SendContactArgs): Promise<{ id?: string }> {
  const resend = getResend();
  const env = serverEnv();

  if (!resend) {
    if (env.NODE_ENV !== "production") {
      console.warn("[email] RESEND_API_KEY missing — skipping send in non-production.", {
        name: args.name,
        email: args.email,
      });
      return { id: "dev-noop" };
    }
    throw new Error("Email transport not configured");
  }

  if (contactFromToMisconfigured(env.CONTACT_FROM_EMAIL, env.CONTACT_TO_EMAIL)) {
    console.warn(
      "[email] CONTACT_FROM_EMAIL and CONTACT_TO_EMAIL are the same address. " +
        "Inbound mail often lands in junk when a mailbox receives mail that appears to be from itself via Resend. " +
        "Use a dedicated sender on send.stackforgeai.africa — see docs/EMAIL_DELIVERABILITY.md.",
    );
  }

  const safeName = args.name.trim() || "Website visitor";
  const subject = `[Website Contact] Enquiry from ${safeName}`;

  const result = await resend.emails.send({
    from: env.CONTACT_FROM_EMAIL,
    to: env.CONTACT_TO_EMAIL,
    replyTo: formatContactReplyTo(args.name, args.email),
    subject,
    react: ContactNotificationEmail({
      name: args.name,
      email: args.email,
      company: args.company,
      message: args.message,
      ip: args.ip,
      userAgent: args.userAgent,
    }),
    text: buildContactPlainText(args),
    tags: [{ name: "category", value: "contact-form" }],
    headers: {
      "X-Entity-Ref-ID": `contact-${Date.now()}`,
      "Auto-Submitted": "auto-generated",
    },
  });

  if (result.error) {
    throw new Error(`Resend send failed: ${result.error.message}`);
  }
  return { id: result.data?.id };
}

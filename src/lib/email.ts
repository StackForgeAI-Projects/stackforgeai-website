import "server-only";
import { Resend } from "resend";
import { serverEnv } from "@/lib/env";
import { ContactNotificationEmail } from "@/emails/contact-notification";

let cached: Resend | undefined;

export function getResend(): Resend | null {
  const env = serverEnv();
  if (!env.RESEND_API_KEY) return null;
  if (!cached) cached = new Resend(env.RESEND_API_KEY);
  return cached;
}

export interface SendContactArgs {
  name: string;
  email: string;
  company?: string;
  message: string;
  ip?: string;
  userAgent?: string;
}

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

  const result = await resend.emails.send({
    from: env.CONTACT_FROM_EMAIL,
    to: env.CONTACT_TO_EMAIL,
    replyTo: args.email,
    subject: `New website enquiry from ${args.name}`,
    react: ContactNotificationEmail({
      name: args.name,
      email: args.email,
      company: args.company,
      message: args.message,
      ip: args.ip,
      userAgent: args.userAgent,
    }),
  });

  if (result.error) {
    throw new Error(`Resend send failed: ${result.error.message}`);
  }
  return { id: result.data?.id };
}

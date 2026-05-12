import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/contact-schema";
import { checkNewsletterRateLimit, getClientIp } from "@/lib/rate-limit";
import { serverEnv } from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BREVO_API = "https://api.brevo.com/v3/contacts/doubleOptinConfirmation";

function jsonError(status: number, error: string, headers: Record<string, string> = {}) {
  return NextResponse.json({ ok: false, error }, { status, headers });
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rate = await checkNewsletterRateLimit(ip);
  if (!rate.success) {
    return jsonError(429, "Too many requests.", {
      "Retry-After": Math.ceil((rate.reset - Date.now()) / 1000).toString(),
    });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError(400, "Invalid JSON payload");
  }
  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(422, parsed.error.errors[0]?.message ?? "Invalid email");
  }
  // Honeypot
  if (parsed.data.fullName && parsed.data.fullName.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const env = serverEnv();
  if (!env.BREVO_API_KEY) {
    if (env.NODE_ENV !== "production") {
      console.warn("[newsletter] BREVO_API_KEY missing — accepting in non-production.", {
        email: parsed.data.email,
      });
      return NextResponse.json({ ok: true, mock: true });
    }
    return jsonError(503, "Newsletter service not configured");
  }

  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://stackforgeai.africa";
    const res = await fetch(BREVO_API, {
      method: "POST",
      headers: {
        "api-key": env.BREVO_API_KEY,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        email: parsed.data.email,
        includeListIds: [env.BREVO_LIST_ID],
        templateId: env.BREVO_DOUBLE_OPT_IN_TEMPLATE_ID,
        redirectionUrl: `${siteUrl}/?subscribed=1`,
      }),
    });
    if (!res.ok && res.status !== 204) {
      const text = await res.text();
      // Treat duplicates as success — don't reveal subscriber state.
      if (res.status === 400 && /duplicate|already/i.test(text)) {
        return NextResponse.json({ ok: true });
      }
      console.error("[newsletter] Brevo error", res.status, text);
      return jsonError(502, "Newsletter provider error");
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[newsletter] unexpected", err);
    return jsonError(500, "Subscription failed");
  }
}

export function GET() {
  return jsonError(405, "Method not allowed");
}

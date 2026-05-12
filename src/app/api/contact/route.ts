import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { checkContactRateLimit, getClientIp } from "@/lib/rate-limit";
import { sendContactEmail } from "@/lib/email";
import { serverEnv } from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_ORIGINS = new Set(
  [
    process.env.NEXT_PUBLIC_SITE_URL,
    "https://stackforgeai.africa",
    "https://www.stackforgeai.africa",
    process.env.NODE_ENV !== "production" ? "http://localhost:3000" : null,
  ].filter(Boolean) as string[],
);

function jsonError(status: number, error: string, headers: Record<string, string> = {}) {
  return NextResponse.json({ ok: false, error }, { status, headers });
}

export async function POST(request: Request) {
  // CSRF: verify Origin / Referer is one we own.
  const origin = request.headers.get("origin") ?? request.headers.get("referer") ?? "";
  if (origin) {
    try {
      const originHost = new URL(origin).origin;
      if (!ALLOWED_ORIGINS.has(originHost)) {
        return jsonError(403, "Forbidden origin");
      }
    } catch {
      return jsonError(400, "Bad origin header");
    }
  }

  const ip = getClientIp(request);
  const rate = await checkContactRateLimit(ip);
  if (!rate.success) {
    return jsonError(429, "Too many requests. Please try again later.", {
      "Retry-After": Math.ceil((rate.reset - Date.now()) / 1000).toString(),
      "X-RateLimit-Limit": rate.limit.toString(),
      "X-RateLimit-Remaining": rate.remaining.toString(),
    });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError(400, "Invalid JSON payload");
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(422, parsed.error.errors[0]?.message ?? "Validation failed");
  }

  // Honeypot triggered — silently accept (bot won't notice) but do nothing.
  if (parsed.data.website && parsed.data.website.length > 0) {
    return NextResponse.json({ ok: true, id: "honeypot" });
  }

  try {
    const result = await sendContactEmail({
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company || undefined,
      message: parsed.data.message,
      ip,
      userAgent: request.headers.get("user-agent") ?? undefined,
    });
    return NextResponse.json({ ok: true, id: result.id });
  } catch (err) {
    console.error("[/api/contact] send failed", {
      err: err instanceof Error ? err.message : String(err),
      env: serverEnv().NODE_ENV,
    });
    return jsonError(500, "Failed to send message. Please try again.");
  }
}

export function GET() {
  return jsonError(405, "Method not allowed");
}

import { NextResponse, type NextRequest } from "next/server";

/**
 * Edge middleware — runs before every request to:
 *   • Strip the `Server` header (info disclosure)
 *   • Enforce HTTPS in production
 *   • Set request-id for traceability
 *
 * Heavy CSP headers are set via next.config.ts `headers()` so they apply to
 * static assets too.
 */
export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const requestId = crypto.randomUUID();
  requestHeaders.set("x-request-id", requestId);

  const proto = request.headers.get("x-forwarded-proto");
  const host = request.headers.get("host") ?? "";
  if (process.env.NODE_ENV === "production" && proto === "http" && !host.startsWith("localhost")) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    return NextResponse.redirect(url, 301);
  }

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("x-request-id", requestId);
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)",
  ],
};

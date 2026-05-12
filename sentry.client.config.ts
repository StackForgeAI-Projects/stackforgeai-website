import * as Sentry from "@sentry/nextjs";

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NEXT_PUBLIC_VERCEL_ENV ?? process.env.NODE_ENV,
    tracesSampleRate: 0.1,
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 1.0,
    sendDefaultPii: false,
    beforeSend(event) {
      // Strip PII from form data if it slips into breadcrumbs.
      if (event.request?.cookies) delete event.request.cookies;
      if (event.user?.email) delete event.user.email;
      if (event.user?.ip_address) delete event.user.ip_address;
      return event;
    },
  });
}

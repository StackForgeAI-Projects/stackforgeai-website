"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Sentry auto-captures via the @sentry/nextjs SDK — we log to console too for dev.
    console.error("[runtime error]", error);
  }, [error]);

  return (
    <main className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="text-primary font-mono text-xs tracking-widest uppercase">{"// error"}</p>
        <h1 className="font-display text-foreground mt-3 text-5xl font-semibold">
          Something <span className="text-gradient-green">went wrong</span>.
        </h1>
        <p className="text-muted-foreground mt-4 text-sm">
          We&rsquo;ve been notified and will look into it shortly.
        </p>
        {error.digest ? (
          <p className="text-muted-foreground/60 mt-2 font-mono text-xs">
            Reference: {error.digest}
          </p>
        ) : null}
        <button
          type="button"
          onClick={reset}
          className="bg-primary text-primary-foreground glow-green mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition hover:scale-[1.02]"
        >
          Try again
        </button>
      </div>
    </main>
  );
}

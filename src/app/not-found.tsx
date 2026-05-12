import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Page not found",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <main id="main" className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="text-primary font-mono text-xs tracking-widest uppercase">{"// 404"}</p>
        <h1 className="font-display text-foreground mt-3 text-7xl font-semibold">
          <span className="text-gradient-green">Page</span> not found
        </h1>
        <p className="text-muted-foreground mt-4 text-sm">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="bg-primary text-primary-foreground glow-green inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition hover:scale-[1.02]"
          >
            Go home <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

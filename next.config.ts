import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const SELF = "'self'";
const isDev = process.env.NODE_ENV === "development";

const cspDirectives: Record<string, string[]> = {
  "default-src": [SELF],
  "script-src": [
    SELF,
    "'unsafe-inline'",
    isDev ? "'unsafe-eval'" : "",
    "https://va.vercel-scripts.com",
    "https://vitals.vercel-insights.com",
    "https://*.calendly.com",
    "https://assets.calendly.com",
    "https://app.cal.com",
    "https://cal.com",
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
  ].filter(Boolean),
  "style-src": [SELF, "'unsafe-inline'", "https://assets.calendly.com", "https://app.cal.com"],
  "img-src": [SELF, "data:", "blob:", "https:"],
  "font-src": [SELF, "data:", "https://app.cal.com"],
  "connect-src": [
    SELF,
    "https://vitals.vercel-insights.com",
    "https://*.sentry.io",
    "https://*.ingest.sentry.io",
    "https://*.ingest.us.sentry.io",
    "https://api.resend.com",
    "https://api.brevo.com",
    "https://*.upstash.io",
    "https://*.calendly.com",
    "https://app.cal.com",
    "https://*.cal.com",
    "https://www.google-analytics.com",
    "https://analytics.google.com",
    "https://*.analytics.google.com",
    "https://www.googletagmanager.com",
    "https://*.googletagmanager.com",
  ],
  "frame-src": [
    SELF,
    "https://calendly.com",
    "https://*.calendly.com",
    "https://app.cal.com",
    "https://cal.com",
  ],
  "frame-ancestors": ["'none'"],
  "form-action": [SELF],
  "base-uri": [SELF],
  "object-src": ["'none'"],
  "upgrade-insecure-requests": [],
};

const csp = Object.entries(cspDirectives)
  .map(([key, value]) => (value.length ? `${key} ${value.join(" ")}` : key))
  .join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "stackforgeai.africa" },
      { protocol: "https", hostname: "www.stackforgeai.africa" },
    ],
  },

  experimental: {
    optimizePackageImports: ["lucide-react", "@gsap/react", "gsap"],
  },

  serverExternalPackages: ["import-in-the-middle", "require-in-the-middle"],

  webpack: (config, { isServer }) => {
    if (isServer) {
      config.ignoreWarnings = [
        ...(config.ignoreWarnings ?? []),
        { module: /node_modules\/@opentelemetry/ },
        { module: /node_modules\/@sentry\/node/ },
        { message: /import-in-the-middle/ },
        { message: /require-in-the-middle/ },
      ];
    }
    return config;
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/api/:path*",
        headers: [{ key: "Cache-Control", value: "no-store, max-age=0" }, ...securityHeaders],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);

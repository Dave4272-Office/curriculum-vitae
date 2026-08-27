import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const contentSecurityPolicy = [
  "default-src 'self'",
  [
    "script-src 'self' 'unsafe-inline'",
    isDev ? "'unsafe-eval'" : "",
    "*.cloudflareinsights.com",
    "www.googletagmanager.com",
  ]
    .filter(Boolean)
    .join(" "),
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: www.googletagmanager.com www.google-analytics.com",
  "font-src 'self'",
  // GA4 page_view already uses www.google-analytics.com; also allow the
  // www.google.com/g/collect fallback. unpkg.com stays closed: this app
  // reports Core Web Vitals via npm web-vitals and dataLayer, not a CDN script.
  "connect-src 'self' www.google-analytics.com *.google-analytics.com www.googletagmanager.com www.google.com/g/collect",
  "media-src 'self'",
  "object-src 'self'",
  "frame-src www.googletagmanager.com",
  "worker-src 'self' blob:",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "upgrade-insecure-requests",
  "base-uri 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
];

const nextConfig: NextConfig = {
  serverExternalPackages: ["@react-pdf/renderer"],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

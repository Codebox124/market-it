import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static pages read /public with fs at build time only; never at runtime.
  // Keep those assets out of the serverless function bundles (they're served
  // from the CDN), otherwise file tracing balloons the functions past 300MB.
  outputFileTracingExcludes: {
    "*": ["public/**"],
  },
  async redirects() {
    return [
      // Portfolio split (2026-11-09): the old combined /marketing page is now
      // separate /branding and /design pages that follow the homepage sections.
      {
        source: "/marketing",
        destination: "/branding",
        permanent: true,
      },
      // Pruned locales (2026-11-08): the site now publishes in EN/ES/FR/PT/ZH only.
      {
        source: "/:lang(id|bn|hk|gu|ja|ko|tl|ur|ru)/blog/:slug*",
        destination: "/en/blog",
        permanent: true,
      },
      {
        source: "/:lang(id|bn|hk|gu|ja|ko|tl|ur|ru)/:path*",
        destination: "/",
        permanent: true,
      },
      {
        // The English homepage lives at the bare domain (2026-11-09).
        source: "/en",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

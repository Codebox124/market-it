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
      // Pruned locales (2026-11-08): the site now publishes in EN/ES/FR/PT/ZH only.
      {
        source: "/:lang(id|bn|hk|gu|hi|ja|ko|ar|tl|ur|ru)/blog/:slug*",
        destination: "/en/blog",
        permanent: true,
      },
      {
        source: "/:lang(id|bn|hk|gu|hi|ja|ko|ar|tl|ur|ru)/:path*",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/",
        destination: "/en",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

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
      {
        source: "/",
        destination: "/en",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

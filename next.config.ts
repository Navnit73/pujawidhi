import type { NextConfig } from "next";

/**
 * Static export for Cloudflare Pages (no Workers/Functions).
 * Redirects -> public/_redirects, headers -> public/_headers (both generated/maintained outside Next).
 */
const nextConfig: NextConfig = {
  output: "export",
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: { inlineCss: true, globalNotFound: true },
  images: { unoptimized: true },
};
export default nextConfig;

import type { NextConfig } from "next";
import redirects from "./data/redirects.json";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: { inlineCss: true, globalNotFound: true },
  images: { formats: ["image/avif", "image/webp"] },
  // 301 every cannibalising variant to its canonical page, in both languages (plan section 3).
  async redirects() {
    return redirects.redirects.flatMap((r) =>
      r.from.flatMap((from) => [
        { source: `/:category/${from}`, destination: `/${r.category}/${r.to}`, statusCode: 301 },
        { source: `/hi/:category/${from}`, destination: `/hi/${r.category}/${r.to}`, statusCode: 301 },
      ]),
    );
  },
  async headers() {
    return [
      { source: "/sw.js", headers: [{ key: "Cache-Control", value: "no-cache" }, { key: "Service-Worker-Allowed", value: "/" }] },
      { source: "/(.*)", headers: [{ key: "X-Content-Type-Options", value: "nosniff" }, { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" }] },
    ];
  },
};
export default nextConfig;

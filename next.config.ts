import type { NextConfig } from "next";

// En-têtes de sécurité appliqués à toutes les réponses.
// HSTS force HTTPS côté navigateur (Vercel redirige déjà HTTP -> HTTPS).
const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.public.blob.vercel-storage.com",
      },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      {
        source: "/services/3d",
        destination: "/services",
        permanent: true,
      },
    ];
  },
  // Serve the new static homepage (public/home.html) at "/".
  // beforeFiles runs before the App Router, so it overrides src/app/page.tsx
  // without deleting it — remove this block to restore the old homepage.
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/home.html" },
        { source: "/portfolio", destination: "/home.html" },
      ],
    };
  },
};

export default nextConfig;

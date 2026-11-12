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
  // Site recentré 100 % photo : les anciennes pages non-photo renvoient vers
  // l'accueil. Redirections temporaires (307) pour rester réversibles ;
  // basculer en `permanent: true` une fois la décision figée (meilleur SEO).
  async redirects() {
    const toHome = [
      "/services",
      "/services/web",
      "/services/ios",
      "/services/3d",
      "/solutions",
      "/skitrack",
      "/choose-skis",
    ];
    return [
      ...toHome.map((source) => ({
        source,
        destination: "/",
        permanent: false,
      })),
      // L'ancienne page /contact est remplacée par la section contact de la home.
      { source: "/contact", destination: "/#contact", permanent: false },
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

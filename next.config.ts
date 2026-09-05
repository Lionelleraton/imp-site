import type { NextConfig } from "next";

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

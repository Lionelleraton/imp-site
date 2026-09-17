import type { MetadataRoute } from "next";

const getBaseUrl = () => {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit && explicit.trim().length > 0) {
    return explicit.replace(/\/+$/, "");
  }

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl && vercelUrl.trim().length > 0) {
    return `https://${vercelUrl.replace(/\/+$/, "")}`;
  }

  return "https://inmotionperformance.com";
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const now = new Date();

  const routes = [
    "/",
    "/portfolio",
    "/services",
    "/services/web",
    "/services/ios",
    "/services/photo",
    "/solutions",
    "/skitrack",
    "/choose-skis",
    "/contact",
    "/mentions-legales",
    "/cgu",
    "/confidentialite",
  ];

  const lowPriority = new Set([
    "/mentions-legales",
    "/cgu",
    "/confidentialite",
  ]);

  return routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: lowPriority.has(path) ? "yearly" : "weekly",
    priority: path === "/" ? 1 : lowPriority.has(path) ? 0.3 : 0.7,
  }));
}

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
    "/services",
    "/services/web",
    "/services/ios",
    "/services/photo",
    "/services/3d",
    "/solutions",
    "/skitrack",
    "/choose-skis",
    "/contact",
  ];

  return routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}

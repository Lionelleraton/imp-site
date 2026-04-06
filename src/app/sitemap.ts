import type { MetadataRoute } from "next";

const getBaseUrl = () => {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  return raw.replace(/\/+$/, "");
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

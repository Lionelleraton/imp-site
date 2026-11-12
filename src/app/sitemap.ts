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

  // Site recentré sur la photographie : on expose en priorité les pages photo.
  const entries: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, freq: "weekly" },
    { path: "/portfolio", priority: 0.9, freq: "weekly" },
    { path: "/tarifs", priority: 0.9, freq: "monthly" },
    { path: "/devis", priority: 0.8, freq: "monthly" },
    { path: "/services/photo", priority: 0.8, freq: "monthly" },
    { path: "/mentions-legales", priority: 0.2, freq: "yearly" },
    { path: "/cgu", priority: 0.2, freq: "yearly" },
    { path: "/confidentialite", priority: 0.2, freq: "yearly" },
  ];

  return entries.map((e) => ({
    url: `${baseUrl}${e.path}`,
    lastModified: now,
    changeFrequency: e.freq,
    priority: e.priority,
  }));
}

import type { MetadataRoute } from "next";
import { SITE_URL } from "./site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  // Site recentré sur la photographie : on expose en priorité les pages photo.
  const entries: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, freq: "weekly" },
    { path: "/portfolio", priority: 0.9, freq: "monthly" },
    { path: "/tarifs", priority: 0.9, freq: "monthly" },
    { path: "/devis", priority: 0.8, freq: "monthly" },
    { path: "/services/photo", priority: 0.8, freq: "monthly" },
    { path: "/mentions-legales", priority: 0.2, freq: "yearly" },
    { path: "/cgu", priority: 0.2, freq: "yearly" },
    { path: "/confidentialite", priority: 0.2, freq: "yearly" },
  ];

  return entries.map((e) => ({
    url: `${SITE_URL}${e.path}`,
    changeFrequency: e.freq,
    priority: e.priority,
  }));
}

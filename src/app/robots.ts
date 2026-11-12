import type { MetadataRoute } from "next";
import { SITE_URL } from "./site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/galleries/", "/services/photo/galerie/admin", "/services/photo/galerie/*"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

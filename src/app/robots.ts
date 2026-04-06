import type { MetadataRoute } from "next";

const getBaseUrl = () => {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  return raw.replace(/\/+$/, "");
};

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

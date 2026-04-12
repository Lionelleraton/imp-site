import { existsSync, readdirSync } from "fs";
import path from "path";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

export const getGalleryImages = (slug: string, folder?: string) => {
  const directory = folder ?? `galleries/${slug}`;
  const dir = path.join(process.cwd(), "public", directory);
  if (!existsSync(dir)) {
    return [] as string[];
  }

  return readdirSync(dir)
    .filter((name) => {
      if (name.startsWith(".")) return false;
      const ext = path.extname(name).toLowerCase();
      return IMAGE_EXTENSIONS.has(ext);
    })
    .sort()
    .map((name) => `/${directory}/${name}`);
};

export const getGalleryDownload = (slug: string, folder?: string) => {
  const directory = folder ?? `galleries/${slug}`;
  const zipPath = path.join(process.cwd(), "public", directory, "download.zip");
  if (!existsSync(zipPath)) {
    return null;
  }
  return `/${directory}/download.zip`;
};

export type PhotoGallery = {
  code: string;
  slug: string;
  title: string;
  description?: string;
  folder?: string;
  manifest?: string;
  images?: string[];
  downloadZip?: string;
};

export const PHOTO_GALLERIES: PhotoGallery[] = [
  {
    code: "GALA-2026",
    slug: "gala-2026",
    title: "Gala 2026",
    description: "Photos officielles - InMotion Performance",
    manifest: "/api/blob/list?prefix=gala-2026/",
  },
];

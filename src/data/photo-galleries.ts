export type PhotoGallery = {
  code: string;
  slug: string;
  title: string;
  description?: string;
  folder?: string;
};

export const PHOTO_GALLERIES: PhotoGallery[] = [
  {
    code: "IMOTION-DEMO",
    slug: "demo",
    title: "Galerie démo InMotion",
    description: "Exemple de galerie privée. Remplace par ta galerie client.",
    folder: "services/photo",
  },
  {
    code: "GALA-2026",
    slug: "gala-2026",
    title: "Gala 2026",
    description: "Photos officielles - InMotion Performance",
    folder: "galleries/Gala-2026",
  },
];

import type { Metadata } from "next";
import Link from "next/link";
import PhotoGallery from "../../PhotoGallery";
import { PHOTO_GALLERIES } from "@/data/photo-galleries";
import { getGalleryDownload, getGalleryImages } from "@/lib/gallery";

type GalleryPageProps = {
  params: { code: string } | Promise<{ code: string }>;
};

export const metadata: Metadata = {
  title: "Galerie privée",
  description: "Accès à votre galerie photo privée.",
  alternates: {
    canonical: "/services/photo/galerie",
  },
};

const normalize = (value: string) => value.replace(/\s+/g, "").toUpperCase();

export default async function GalleryPage({ params }: GalleryPageProps) {
  const resolvedParams = await params;
  const rawCode = decodeURIComponent(resolvedParams.code ?? "");
  const normalized = normalize(rawCode);
  const gallery = PHOTO_GALLERIES.find(
    (item) => normalize(item.code) === normalized
  );

  if (!gallery) {
    return (
      <main className="pb-24">
        <section className="mx-auto w-full max-w-[1200px] px-4 pt-10 sm:px-6 sm:pt-12 xl:px-10">
          <div className="rounded-3xl border border-line bg-white/85 p-8 shadow-[0_18px_50px_rgba(35,48,54,0.1)]">
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60">
              Code invalide
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              Galerie introuvable
            </h1>
            <p className="mt-4 text-sm text-ink/70 sm:text-base">
              Le code saisi ne correspond à aucune galerie. Vérifie le code reçu
              ou contacte-nous si besoin.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/services/photo/galerie"
                className="inline-flex items-center justify-center rounded-full bg-deep px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5"
              >
                Réessayer
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-deep/20 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-deep transition hover:bg-deep/5"
              >
                Contacter l’équipe
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const images = getGalleryImages(gallery.slug, gallery.folder);
  const downloadZip = getGalleryDownload(gallery.slug, gallery.folder);

  return (
    <main className="pb-24">
      <section className="mx-auto w-full max-w-[1400px] px-4 pt-10 sm:px-6 sm:pt-12 xl:px-10">
        <div className="rounded-3xl border border-line bg-white/85 p-8 shadow-[0_18px_50px_rgba(35,48,54,0.1)]">
          <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60">
            Galerie privée
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
            {gallery.title}
          </h1>
          {gallery.description ? (
            <p className="mt-4 text-sm text-ink/70 sm:text-base">
              {gallery.description}
            </p>
          ) : null}
          <div className="mt-6">
            {images.length > 0 ? (
              <PhotoGallery
                images={images}
                unoptimized
                downloadAllUrl={downloadZip ?? undefined}
              />
            ) : (
              <div className="rounded-2xl border border-line bg-white/90 p-6 text-sm text-ink/70">
                Aucune image disponible pour le moment.
              </div>
            )}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/services/photo/galerie"
              className="inline-flex items-center justify-center rounded-full border border-deep/20 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-deep transition hover:bg-deep/5"
            >
              Entrer un autre code
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-deep px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5"
            >
              Besoin d’aide
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

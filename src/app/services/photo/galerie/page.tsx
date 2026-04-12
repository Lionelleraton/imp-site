import type { Metadata } from "next";
import Link from "next/link";
import GalleryAccessClient from "./GalleryAccessClient";

export const metadata: Metadata = {
  title: "Accès galerie photo",
  description:
    "Accédez à votre galerie privée grâce au code fourni après la livraison.",
  alternates: {
    canonical: "/services/photo/galerie",
  },
  openGraph: {
    title: "Accès galerie photo",
    description:
      "Accédez à votre galerie privée grâce au code fourni après la livraison.",
    url: "/services/photo/galerie",
  },
};

export default function GalleryAccessPage() {
  return (
    <main className="pb-24">
      <section className="mx-auto w-full max-w-[1200px] px-4 pt-10 sm:px-6 sm:pt-12 xl:px-10">
        <div className="rounded-3xl border border-line bg-white/85 p-8 shadow-[0_18px_50px_rgba(35,48,54,0.1)]">
          <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60">
            Accès client
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
            Accédez à votre galerie photo privée
          </h1>
          <p className="mt-4 text-sm text-ink/70 sm:text-base">
            Saisissez le code transmis après la livraison pour visualiser et
            télécharger vos images en qualité maximale.
          </p>
          <GalleryAccessClient />
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/services/photo"
              className="inline-flex items-center justify-center rounded-full border border-deep/20 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-deep transition hover:bg-deep/5"
            >
              Retour au service photo
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-deep px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5"
            >
              Besoin d’aide
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

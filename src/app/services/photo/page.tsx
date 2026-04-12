import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { readdirSync } from "fs";
import path from "path";
import PhotoGallery from "./PhotoGallery";

export const metadata: Metadata = {
  title: "Service photo",
  description:
    "Couverture photo terrain pour communication, sponsors et valorisation des événements.",
  alternates: {
    canonical: "/services/photo",
  },
  openGraph: {
    title: "Service photo",
    description:
      "Couverture photo terrain pour communication, sponsors et valorisation des événements.",
    url: "/services/photo",
  },
};

export default function ServicesPhotoPage() {
  const images = (() => {
    try {
      const dir = path.join(process.cwd(), "public/services/photo");
      return readdirSync(dir)
        .filter((name) => !name.startsWith("."))
        .sort()
        .map((name) => `/services/photo/${name}`);
    } catch {
      return [] as string[];
    }
  })();

  const heroImage = images[0] ?? "/hero.png";

  return (
    <main className="pb-24">
      <section className="mx-auto w-full max-w-[1400px] px-4 pt-10 sm:px-6 sm:pt-12 xl:px-10">
        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60 sm:text-[11px] sm:tracking-[0.3em]">
              Service photo
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl md:text-6xl">
              Des images terrain qui servent vraiment la performance
            </h1>
            <p className="mt-4 max-w-2xl text-ink/70">
              On couvre vos événements et sessions terrain avec un regard pro,
              pour livrer des images exploitables immédiatement.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-deep px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white shadow-[0_18px_45px_rgba(36,67,87,0.3)] transition hover:-translate-y-0.5"
              >
                Prendre un RDV
              </Link>
              <Link
                href="/services/photo/galerie"
                className="inline-flex items-center justify-center rounded-full border border-deep/20 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-deep transition hover:bg-deep/5"
              >
                Accès à votre galerie
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-deep/20 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-deep transition hover:bg-deep/5"
              >
                Retour aux services
              </Link>
            </div>
          </div>

          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-line bg-white/80 shadow-[0_26px_70px_rgba(35,48,54,0.18)]">
            <div className="absolute inset-0 bg-gradient-to-br from-deep/10 via-sky/10 to-mist/70" />
            <Image
              src={heroImage}
              alt="Aperçu photo terrain"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 rounded-full bg-white/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-deep">
              Couverture terrain
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-4 pt-12 sm:px-6 sm:pt-14 xl:px-10">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-line bg-white/85 p-6 shadow-[0_18px_50px_rgba(35,48,54,0.1)]">
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60">Qualité</p>
            <h2 className="mt-3 text-lg font-semibold">Images nettes</h2>
            <p className="mt-3 text-sm text-ink/70">
              Des visuels précis pour communication, sponsors et archives.
            </p>
          </div>
          <div className="rounded-3xl border border-line bg-white/85 p-6 shadow-[0_18px_50px_rgba(35,48,54,0.1)]">
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60">Rapidité</p>
            <h2 className="mt-3 text-lg font-semibold">Livraison fluide</h2>
            <p className="mt-3 text-sm text-ink/70">
              Sélection rapide pour garder le momentum.
            </p>
          </div>
          <div className="rounded-3xl border border-line bg-white/85 p-6 shadow-[0_18px_50px_rgba(35,48,54,0.1)]">
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60">Utilité</p>
            <h2 className="mt-3 text-lg font-semibold">Contenus utiles</h2>
            <p className="mt-3 text-sm text-ink/70">
              Des images prêtes pour vos supports et réseaux.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-4 pt-12 sm:px-6 sm:pt-14 xl:px-10">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-line bg-white/85 p-6 shadow-[0_18px_50px_rgba(35,48,54,0.1)]">
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60">
              Ce que nous livrons
            </p>
            <ul className="mt-5 space-y-3 text-sm text-ink/70 sm:text-base">
              <li>Sélection éditée et cohérente.</li>
              <li>Photos optimisées pour web et print.</li>
              <li>Galerie livrée rapidement après l’événement.</li>
              <li>Formats adaptés aux sponsors et partenaires.</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-deep p-6 text-white shadow-[0_22px_60px_rgba(36,67,87,0.35)]">
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/60">
              Process simple
            </p>
            <div className="mt-4 space-y-4 text-sm text-white/80">
              <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/60">
                  Brief express
                </p>
                <p className="mt-2">Objectifs, usages, formats attendus.</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/60">
                  Couverture terrain
                </p>
                <p className="mt-2">Présence discrète, images efficaces.</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/60">
                  Livraison rapide
                </p>
                <p className="mt-2">Galerie claire et exploitable.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-4 pt-12 sm:px-6 sm:pt-14 xl:px-10">
        <div className="rounded-3xl border border-line bg-white/85 p-6 shadow-[0_18px_50px_rgba(35,48,54,0.1)] sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60">
                Galerie
              </p>
              <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
                Quelques exemples terrain
              </h2>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-deep/20 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-deep transition hover:bg-deep/5"
            >
              Demander un devis
            </Link>
          </div>
          <div className="mt-6">
            <PhotoGallery images={images} unoptimized />
          </div>
        </div>
      </section>
    </main>
  );
}

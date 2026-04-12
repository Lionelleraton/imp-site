// ⚠️ AUCUN header/nav ici.
// Le seul header du site doit venir de src/app/layout.tsx via <SiteHeader />.

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { readdirSync } from "fs";
import path from "path";
import PhotoGallery from "./photo/PhotoGallery";

export const metadata: Metadata = {
  title: "Nos services",
  description:
    "Services web, iOS, photo et 3D : des solutions claires, rapides et pensées pour vos usages terrain.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Nos services",
    description:
      "Services web, iOS, photo et 3D : des solutions claires, rapides et pensées pour vos usages terrain.",
    url: "/services",
  },
};

export default function ServicesPage() {
  const photoImages = (() => {
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

  const heroImage = photoImages[0] ?? "/hero.png";

  return (
    <main className="pb-24">
      {/* Hero split */}
      <section className="mx-auto w-full max-w-[1400px] px-4 pt-10 sm:px-6 sm:pt-12 xl:px-10">
        <div className="rounded-3xl border border-line bg-white/80 p-6 shadow-[0_22px_60px_rgba(35,48,54,0.12)] sm:p-8 lg:p-10">
          <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60 sm:text-[11px] sm:tracking-[0.3em]">
                Nos services
              </p>
              <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl md:text-6xl">
                Des services lisibles, pensés pour convertir
              </h1>
              <p className="mt-4 max-w-xl text-ink/70">
                Web, iOS, photo et 3D : on structure chaque projet pour qu’il soit
                clair, rapide à utiliser et directement utile au terrain.
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
                  Voir ma galerie
                </Link>
                <Link
                  href="/solutions"
                  className="inline-flex items-center justify-center rounded-full border border-deep/20 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-deep transition hover:bg-deep/5"
                >
                  Voir nos solutions
                </Link>
              </div>
            </div>

            <div className="relative aspect-[16/9] w-full max-w-[560px] justify-self-start overflow-hidden rounded-3xl border border-line bg-white/80 shadow-[0_26px_70px_rgba(35,48,54,0.16)] lg:justify-self-end">
              <div className="absolute inset-0 bg-gradient-to-br from-deep/10 via-sky/10 to-mist/70" />
              <Image
                src={heroImage}
                alt="Aperçu des services InMotion Performance"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 rounded-full bg-white/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-deep">
                Aperçu services
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 bénéfices */}
      <section className="mx-auto w-full max-w-[1400px] px-4 pt-10 sm:px-6 sm:pt-12 xl:px-10">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-line bg-white/85 p-6 shadow-[0_18px_50px_rgba(35,48,54,0.1)]">
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60">Clarté</p>
            <h2 className="mt-3 text-lg font-semibold">Parcours lisibles</h2>
            <p className="mt-3 text-sm text-ink/70">
              Des écrans qui rendent l’information évidente.
            </p>
          </div>
          <div className="rounded-3xl border border-line bg-white/85 p-6 shadow-[0_18px_50px_rgba(35,48,54,0.1)]">
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60">Conversion</p>
            <h2 className="mt-3 text-lg font-semibold">Actions visibles</h2>
            <p className="mt-3 text-sm text-ink/70">
              Chaque bloc pousse naturellement à la prise de contact.
            </p>
          </div>
          <div className="rounded-3xl border border-line bg-white/85 p-6 shadow-[0_18px_50px_rgba(35,48,54,0.1)]">
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60">Fiabilité</p>
            <h2 className="mt-3 text-lg font-semibold">Livrables utiles</h2>
            <p className="mt-3 text-sm text-ink/70">
              Pensés pour la réalité du terrain et des équipes.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto w-full max-w-[1400px] px-4 pt-12 sm:px-6 sm:pt-14 xl:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60">
              Nos services
            </p>
            <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
              Choisissez la brique adaptée
            </h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-deep/20 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-deep transition hover:bg-deep/5"
          >
            Demander un devis
          </Link>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Link
            href="/services/web"
            className="group relative rounded-3xl border border-line bg-white/85 p-6 shadow-[0_18px_50px_rgba(35,48,54,0.1)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(35,48,54,0.16)]"
          >
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60">Service web</p>
            <h3 className="mt-3 text-lg font-semibold text-ink">
              Sites vitrines, plateformes, dashboards
            </h3>
            <p className="mt-3 text-sm text-ink/70">
              Lisibilité, vitesse, conversion.
            </p>
            <span className="mt-5 inline-flex text-[11px] font-semibold uppercase tracking-[0.2em] text-deep/80">
              Voir la page complète
            </span>
          </Link>

          <Link
            href="/services/ios"
            className="group relative rounded-3xl border border-line bg-white/85 p-6 shadow-[0_18px_50px_rgba(35,48,54,0.1)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(35,48,54,0.16)]"
          >
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60">Service iOS</p>
            <h3 className="mt-3 text-lg font-semibold text-ink">
              Apps terrain offline-first
            </h3>
            <p className="mt-3 text-sm text-ink/70">
              Saisie rapide, synchronisation claire.
            </p>
            <span className="mt-5 inline-flex text-[11px] font-semibold uppercase tracking-[0.2em] text-deep/80">
              Voir la page complète
            </span>
          </Link>

          <Link
            href="/services/photo"
            className="group relative rounded-3xl border border-line bg-white/85 p-6 shadow-[0_18px_50px_rgba(35,48,54,0.1)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(35,48,54,0.16)]"
          >
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60">Service photo</p>
            <h3 className="mt-3 text-lg font-semibold text-ink">
              Images terrain prêtes à l’emploi
            </h3>
            <p className="mt-3 text-sm text-ink/70">
              Communication, sponsors, archives.
            </p>
            <span className="mt-5 inline-flex text-[11px] font-semibold uppercase tracking-[0.2em] text-deep/80">
              Voir la page complète
            </span>
          </Link>

          <Link
            href="/services/3d"
            className="group relative rounded-3xl border border-line bg-white/85 p-6 shadow-[0_18px_50px_rgba(35,48,54,0.1)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(35,48,54,0.16)]"
          >
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60">Service 3D</p>
            <h3 className="mt-3 text-lg font-semibold text-ink">
              Visualisations produits
            </h3>
            <p className="mt-3 text-sm text-ink/70">
              Rendus réalistes, supports premium.
            </p>
            <span className="mt-5 inline-flex text-[11px] font-semibold uppercase tracking-[0.2em] text-deep/80">
              Voir la page complète
            </span>
          </Link>
        </div>
      </section>

      {/* Ce que nous livrons + process */}
      <section className="mx-auto w-full max-w-[1400px] px-4 pt-12 sm:px-6 sm:pt-14 xl:px-10">
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-line bg-white/85 p-6 shadow-[0_18px_50px_rgba(35,48,54,0.1)] sm:p-8">
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60">
              Ce que nous livrons
            </p>
            <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">
              Des livrables concrets et exploitables
            </h2>
            <ul className="mt-5 space-y-3 text-sm text-ink/70 sm:text-base">
              <li>Écrans clairs et hiérarchisés.</li>
              <li>Parcours courts pour actions immédiates.</li>
              <li>Design cohérent avec votre image.</li>
              <li>Livrables prêts à l’usage.</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-line bg-deep p-6 text-white shadow-[0_22px_60px_rgba(36,67,87,0.35)] sm:p-8">
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/60">
              Process en 3 étapes
            </p>
            <div className="mt-5 space-y-4 text-sm text-white/80">
              <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/60">
                  Brief express
                </p>
                <p className="mt-2">
                  Objectifs, contraintes terrain, priorité des décisions.
                </p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/60">
                  Cadrage & design
                </p>
                <p className="mt-2">
                  Vues clés, données prioritaires, structure claire.
                </p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/60">
                  Livraison
                </p>
                <p className="mt-2">
                  Plan d’action précis + livrables exploitables.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galerie photo */}
      <section className="mx-auto w-full max-w-[1400px] px-4 pt-12 sm:px-6 sm:pt-14 xl:px-10">
        <div className="rounded-3xl border border-line bg-white/85 p-6 shadow-[0_18px_50px_rgba(35,48,54,0.1)] sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60">
                Galerie photo
              </p>
              <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
                Exemples terrain
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/services/photo"
                className="inline-flex items-center justify-center rounded-full border border-deep/20 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-deep transition hover:bg-deep/5"
              >
                Voir la galerie complète
              </Link>
              <Link
                href="/services/photo/galerie"
                className="inline-flex items-center justify-center rounded-full bg-deep px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5"
              >
                Accès à votre galerie
              </Link>
            </div>
          </div>
          <div className="mt-6">
            <PhotoGallery images={photoImages} unoptimized />
          </div>
        </div>
      </section>

      {/* Galerie 3D */}
      <section className="mx-auto w-full max-w-[1400px] px-4 pt-12 sm:px-6 sm:pt-14 xl:px-10">
        <div className="rounded-3xl border border-line bg-white/85 p-6 shadow-[0_18px_50px_rgba(35,48,54,0.1)] sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60">
                Galerie 3D
              </p>
              <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
                Emplacements visuels prêts à être alimentés
              </h2>
            </div>
            <Link
              href="/services/3d"
              className="inline-flex items-center justify-center rounded-full border border-deep/20 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-deep transition hover:bg-deep/5"
            >
              Voir le service 3D
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={`placeholder-${index}`}
                className="h-32 rounded-2xl bg-gradient-to-br from-sky/20 via-white/40 to-deep/10"
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto w-full max-w-[1400px] px-4 pt-12 sm:px-6 sm:pt-14 xl:px-10">
        <div className="rounded-3xl border border-line bg-deep p-6 text-white shadow-[0_22px_60px_rgba(36,67,87,0.35)] sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/60">
                CTA
              </p>
              <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
                Prêt à lancer votre projet ?
              </h2>
              <p className="mt-3 text-sm text-white/80">
                Clarification du besoin, démo rapide, plan d’action commun.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-deep transition hover:-translate-y-0.5"
            >
              Réserver un créneau
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

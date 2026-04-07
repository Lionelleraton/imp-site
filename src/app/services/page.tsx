// ⚠️ AUCUN header/nav ici.
// Le seul header du site doit venir de src/app/layout.tsx via <SiteHeader />.

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { readdirSync } from "fs";
import path from "path";

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
  const photoThumbs = (() => {
    try {
      const dir = path.join(process.cwd(), "public/services/photo");
      return readdirSync(dir)
        .filter((name) => !name.startsWith("."))
        .sort()
        .slice(0, 6)
        .map((name) => `/services/photo/${name}`);
    } catch {
      return [];
    }
  })();

  return (
    <main className="pb-24">
      <section className="mx-auto w-full max-w-[1400px] px-4 pt-10 sm:px-6 sm:pt-12 xl:px-10">
        <div className="grid items-end gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60 sm:text-[11px] sm:tracking-[0.3em]">
              Nos services
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl md:text-6xl">
              Des services clairs, pensés pour vos besoins terrain
            </h1>
            <p className="mt-4 max-w-2xl text-ink/70">
              Web, iOS, photo terrain ou 3D : on structure chaque projet pour
              qu’il soit lisible, efficace et directement exploitable.
            </p>
          </div>

          <div className="rounded-3xl border border-line bg-deep p-5 text-white shadow-[0_22px_60px_rgba(36,67,87,0.35)] sm:p-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/60 sm:text-[11px] sm:tracking-[0.3em]">
              Approche
            </p>
            <p className="mt-3 text-lg font-semibold">
              Cadrage simple, livrables clairs, exécution rapide.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <Link
            href="/services/web"
            className="group relative rounded-3xl border border-line bg-white/85 p-6 shadow-[0_18px_50px_rgba(35,48,54,0.1)] transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_26px_70px_rgba(35,48,54,0.16)]"
          >
            <div className="pointer-events-none absolute -right-8 -top-10 h-24 w-24 rounded-full bg-sky/20 blur-2xl transition duration-300 group-hover:scale-110" />
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60 sm:text-[11px] sm:tracking-[0.3em]">
              Besoin d’une solution numérique web ?
            </p>
            <h3 className="mt-3 text-lg font-semibold text-ink">
              Sites vitrines, plateformes internes, tableaux de bord
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink/70 sm:text-base">
              Interfaces claires, rapides, pensées pour vos équipes terrain et
              vos décideurs.
            </p>
            <span className="mt-5 inline-flex text-[11px] font-semibold uppercase tracking-[0.2em] text-deep/80">
              Voir la page complète
            </span>
          </Link>

          <Link
            href="/services/ios"
            className="group relative rounded-3xl border border-line bg-white/85 p-6 shadow-[0_18px_50px_rgba(35,48,54,0.1)] transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_26px_70px_rgba(35,48,54,0.16)]"
          >
            <div className="pointer-events-none absolute -right-8 -top-10 h-24 w-24 rounded-full bg-deep/15 blur-2xl transition duration-300 group-hover:scale-110" />
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60 sm:text-[11px] sm:tracking-[0.3em]">
              Besoin d’une application iOS ?
            </p>
            <h3 className="mt-3 text-lg font-semibold text-ink">
              Apps robustes, hors ligne d’abord
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink/70 sm:text-base">
              Saisie rapide, usages métier spécifiques, fiabilité sur le terrain.
            </p>
            <span className="mt-5 inline-flex text-[11px] font-semibold uppercase tracking-[0.2em] text-deep/80">
              Voir la page complète
            </span>
          </Link>

          <Link
            href="/services/photo"
            className="group relative rounded-3xl border border-line bg-white/85 p-6 shadow-[0_18px_50px_rgba(35,48,54,0.1)] transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_26px_70px_rgba(35,48,54,0.16)]"
          >
            <div className="pointer-events-none absolute -right-8 -top-10 h-24 w-24 rounded-full bg-mist/80 blur-2xl transition duration-300 group-hover:scale-110" />
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60 sm:text-[11px] sm:tracking-[0.3em]">
              Besoin de photographes pour un événement ?
            </p>
            <h3 className="mt-3 text-lg font-semibold text-ink">
              Couverture terrain et contenu exploitable
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink/70 sm:text-base">
              Communication, sponsors, archives d’équipe : on livre des images utiles.
            </p>
            <div className="mt-4">
              <p className="text-[10px] uppercase tracking-[0.25em] text-ink/50">
                Galerie
              </p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {photoThumbs.length > 0
                  ? photoThumbs.map((src) => (
                      <div
                        key={src}
                        className="overflow-hidden rounded-xl border border-white/60"
                      >
                        <Image
                          src={src}
                          alt="Photo terrain"
                          width={320}
                          height={220}
                          className="h-16 w-full object-cover transition duration-300 group-hover:scale-[1.05]"
                        />
                      </div>
                    ))
                  : Array.from({ length: 6 }).map((_, index) => (
                      <div
                        key={`placeholder-${index}`}
                        className="h-16 rounded-xl bg-deep/10 transition duration-300 group-hover:scale-[1.03]"
                      />
                    ))}
              </div>
            </div>
            <span className="mt-5 inline-flex text-[11px] font-semibold uppercase tracking-[0.2em] text-deep/80">
              Voir la page complète
            </span>
          </Link>

          <Link
            href="/services/3d"
            className="group relative rounded-3xl border border-line bg-white/85 p-6 shadow-[0_18px_50px_rgba(35,48,54,0.1)] transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_26px_70px_rgba(35,48,54,0.16)]"
          >
            <div className="pointer-events-none absolute -right-8 -top-10 h-24 w-24 rounded-full bg-sky/20 blur-2xl transition duration-300 group-hover:scale-110" />
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60 sm:text-[11px] sm:tracking-[0.3em]">
              Besoin de solutions 3D ?
            </p>
            <h3 className="mt-3 text-lg font-semibold text-ink">
              Visualisations produits et rendus réalistes
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink/70 sm:text-base">
              Supports marketing, présentations techniques, contenus immersifs.
            </p>
            <div className="mt-4">
              <p className="text-[10px] uppercase tracking-[0.25em] text-ink/50">
                Galerie 3D
              </p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                <div className="h-16 rounded-xl bg-sky/15 transition duration-300 group-hover:scale-[1.03]" />
                <div className="h-16 rounded-xl bg-deep/10 transition duration-300 group-hover:scale-[1.03]" />
                <div className="h-16 rounded-xl bg-mist/70 transition duration-300 group-hover:scale-[1.03]" />
                <div className="h-16 rounded-xl bg-mist/60 transition duration-300 group-hover:scale-[1.03]" />
                <div className="h-16 rounded-xl bg-sky/20 transition duration-300 group-hover:scale-[1.03]" />
                <div className="h-16 rounded-xl bg-deep/15 transition duration-300 group-hover:scale-[1.03]" />
              </div>
            </div>
            <span className="mt-5 inline-flex text-[11px] font-semibold uppercase tracking-[0.2em] text-deep/80">
              Voir la page complète
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}

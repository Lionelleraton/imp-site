import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Service 3D",
  description:
    "Rendus 3D et visuels immersifs pour présenter clairement vos produits.",
  alternates: {
    canonical: "/services/3d",
  },
  openGraph: {
    title: "Service 3D",
    description:
      "Rendus 3D et visuels immersifs pour présenter clairement vos produits.",
    url: "/services/3d",
  },
};

export default function Services3dPage() {
  const heroImage = "/hero.png";

  return (
    <main className="pb-24">
      <section className="mx-auto w-full max-w-[1400px] px-4 pt-10 sm:px-6 sm:pt-12 xl:px-10">
        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60 sm:text-[11px] sm:tracking-[0.3em]">
              Service 3D
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl md:text-6xl">
              Des rendus 3D qui rendent vos produits évidents à comprendre
            </h1>
            <p className="mt-4 max-w-2xl text-ink/70">
              Visualisations réalistes, plans techniques et rendus marketing
              pour expliquer clairement vos innovations.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-deep px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white shadow-[0_18px_45px_rgba(36,67,87,0.3)] transition hover:-translate-y-0.5"
              >
                Prendre un RDV
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
              alt="Aperçu de rendu 3D"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 rounded-full bg-white/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-deep">
              Visualisation 3D
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-4 pt-12 sm:px-6 sm:pt-14 xl:px-10">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-line bg-white/85 p-6 shadow-[0_18px_50px_rgba(35,48,54,0.1)]">
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60">Réalisme</p>
            <h2 className="mt-3 text-lg font-semibold">Rendus précis</h2>
            <p className="mt-3 text-sm text-ink/70">
              Des visuels crédibles qui valorisent vos produits.
            </p>
          </div>
          <div className="rounded-3xl border border-line bg-white/85 p-6 shadow-[0_18px_50px_rgba(35,48,54,0.1)]">
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60">Clarté</p>
            <h2 className="mt-3 text-lg font-semibold">Lecture technique</h2>
            <p className="mt-3 text-sm text-ink/70">
              Expliquez simplement un produit complexe.
            </p>
          </div>
          <div className="rounded-3xl border border-line bg-white/85 p-6 shadow-[0_18px_50px_rgba(35,48,54,0.1)]">
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60">Impact</p>
            <h2 className="mt-3 text-lg font-semibold">Supports premium</h2>
            <p className="mt-3 text-sm text-ink/70">
              Idéal pour marketing, salons et supports internes.
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
              <li>Rendus réalistes et vues détaillées.</li>
              <li>Plans techniques et variantes de coloris.</li>
              <li>Visuels adaptés au web, print et marketing.</li>
              <li>Déclinaisons pour fiches produits et salons.</li>
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
                <p className="mt-2">Objectifs, livrables, formats attendus.</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/60">
                  Modélisation
                </p>
                <p className="mt-2">Rendus précis, ajustements rapides.</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/60">
                  Livraison
                </p>
                <p className="mt-2">Fichiers prêts pour vos supports.</p>
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
                Galerie 3D
              </p>
              <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
                Emplacements visuels à intégrer
              </h2>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-deep/20 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-deep transition hover:bg-deep/5"
            >
              Demander un devis
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
    </main>
  );
}

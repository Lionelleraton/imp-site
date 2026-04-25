import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Service 3D",
  description:
    "Impression 3D de pièces, reproduction et prototypage rapide pour valider vos idées sur le terrain.",
  alternates: {
    canonical: "/services/3d",
  },
  openGraph: {
    title: "Service 3D",
    description:
      "Impression 3D de pièces, reproduction et prototypage rapide pour valider vos idées sur le terrain.",
    url: "/services/3d",
  },
};

const useCases = [
  {
    title: "Reproduction de pièce",
    description: "Remplacement rapide d’un composant cassé ou introuvable.",
  },
  {
    title: "Prototype fonctionnel",
    description: "Validation de forme, d’assemblage et d’usage avant fabrication.",
  },
  {
    title: "Itération terrain",
    description: "Ajustements successifs jusqu’à une pièce stable et exploitable.",
  },
];

export default function Services3dPage() {
  const heroImage = "/services/3d-print.jpg";

  return (
    <main className="pb-24">
      <section className="mx-auto w-full max-w-[1400px] px-4 pt-10 sm:px-6 sm:pt-12 xl:px-10">
        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60 sm:text-[11px] sm:tracking-[0.3em]">
              Service 3D
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl md:text-6xl">
              Impression 3D pour reproduire, tester et valider vos pièces
            </h1>
            <p className="mt-4 max-w-2xl text-ink/70">
              On transforme une idée ou une pièce existante en prototype concret.
              Objectif: tester vite, corriger vite et sécuriser une solution utile.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center rounded-full bg-deep px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white shadow-[0_18px_45px_rgba(36,67,87,0.3)] transition hover:-translate-y-0.5 sm:w-auto"
              >
                Réserver un appel
              </Link>
              <Link
                href="/services"
                className="inline-flex w-full items-center justify-center rounded-full border border-deep/20 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-deep transition hover:bg-deep/5 sm:w-auto"
              >
                Voir tous les services
              </Link>
            </div>
          </div>

          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-line bg-white/80 shadow-[0_26px_70px_rgba(35,48,54,0.18)]">
            <div className="absolute inset-0 bg-gradient-to-br from-deep/10 via-sky/10 to-mist/70" />
            <Image
              src={heroImage}
              alt="Aperçu d'impression 3D"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 rounded-full bg-white/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-deep">
              Impression 3D
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-4 pt-12 sm:px-6 sm:pt-14 xl:px-10">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-line bg-white/85 p-6 shadow-[0_18px_50px_rgba(35,48,54,0.1)]">
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60">Précision</p>
            <h2 className="mt-3 text-lg font-semibold">Pièces reproduites</h2>
            <p className="mt-3 text-sm text-ink/70">
              Reproduction de pièces avec un niveau de détail exploitable.
            </p>
          </div>
          <div className="rounded-3xl border border-line bg-white/85 p-6 shadow-[0_18px_50px_rgba(35,48,54,0.1)]">
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60">Vitesse</p>
            <h2 className="mt-3 text-lg font-semibold">Prototype rapide</h2>
            <p className="mt-3 text-sm text-ink/70">
              Cycle test-correction-validation accéléré pour avancer vite.
            </p>
          </div>
          <div className="rounded-3xl border border-line bg-white/85 p-6 shadow-[0_18px_50px_rgba(35,48,54,0.1)]">
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60">Utilité</p>
            <h2 className="mt-3 text-lg font-semibold">Pièces fonctionnelles</h2>
            <p className="mt-3 text-sm text-ink/70">
              Pièces concrètes pour essais, dépannage ou validation finale.
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
              <li>Reproduction de pièces à partir d’un modèle existant.</li>
              <li>Prototypes imprimés pour tests terrain.</li>
              <li>Ajustements techniques selon les retours d’usage.</li>
              <li>Livraison de pièces prêtes à l’emploi ou à itérer.</li>
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
                <p className="mt-2">Usage visé, contraintes et niveau de précision attendu.</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/60">
                  Impression test
                </p>
                <p className="mt-2">Première sortie, contrôle et ajustements ciblés.</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/60">
                  Livraison
                </p>
                <p className="mt-2">Pièce validée, prête pour usage, tests ou série courte.</p>
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
                Cas d’usage
              </p>
              <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
                Exemples de pièces et prototypes
              </h2>
            </div>
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-full border border-deep/20 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-deep transition hover:bg-deep/5 sm:w-auto"
            >
              Demander un devis 3D
            </Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {useCases.map((item) => (
              <article
                key={item.title}
                className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_10px_30px_rgba(35,48,54,0.08)]"
              >
                <div className="relative h-40">
                  <Image
                    src={heroImage}
                    alt={item.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081019]/75 via-[#081019]/25 to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="text-base font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm text-ink/68">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Service iOS",
  description:
    "Applications iOS terrain, offline-first, rapides et fiables pour les staffs.",
  alternates: {
    canonical: "/services/ios",
  },
  openGraph: {
    title: "Service iOS",
    description:
      "Applications iOS terrain, offline-first, rapides et fiables pour les staffs.",
    url: "/services/ios",
  },
};

export default function ServicesIosPage() {
  const heroImage = "/hero.png";

  return (
    <main className="pb-24">
      <section className="mx-auto w-full max-w-[1400px] px-4 pt-10 sm:px-6 sm:pt-12 xl:px-10">
        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60 sm:text-[11px] sm:tracking-[0.3em]">
              Service iOS
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl md:text-6xl">
              Des apps terrain robustes, pensées pour aller vite
            </h1>
            <p className="mt-4 max-w-2xl text-ink/70">
              Offline-first, saisie rapide, synchronisation claire : on développe
              des applications iOS fiables pour les usages réels sur le terrain.
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
            <div className="absolute inset-0 bg-gradient-to-br from-deep/15 via-sky/10 to-mist/70" />
            <Image
              src={heroImage}
              alt="Aperçu d'une application iOS terrain"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 rounded-full bg-white/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-deep">
              Aperçu service iOS
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-4 pt-12 sm:px-6 sm:pt-14 xl:px-10">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-line bg-white/85 p-6 shadow-[0_18px_50px_rgba(35,48,54,0.1)]">
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60">Offline-first</p>
            <h2 className="mt-3 text-lg font-semibold">Toujours dispo</h2>
            <p className="mt-3 text-sm text-ink/70">
              Les données restent accessibles même sans réseau.
            </p>
          </div>
          <div className="rounded-3xl border border-line bg-white/85 p-6 shadow-[0_18px_50px_rgba(35,48,54,0.1)]">
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60">Rapidité</p>
            <h2 className="mt-3 text-lg font-semibold">Saisie fluide</h2>
            <p className="mt-3 text-sm text-ink/70">
              Des flux courts pour capter l’info sans friction.
            </p>
          </div>
          <div className="rounded-3xl border border-line bg-white/85 p-6 shadow-[0_18px_50px_rgba(35,48,54,0.1)]">
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60">Fiabilité</p>
            <h2 className="mt-3 text-lg font-semibold">Données sécurisées</h2>
            <p className="mt-3 text-sm text-ink/70">
              Synchronisation maîtrisée et sécurité renforcée.
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
              <li>Architecture mobile claire et évolutive.</li>
              <li>Écrans optimisés pour l’usage terrain.</li>
              <li>Synchronisation fiable et logique métier.</li>
              <li>Déploiement App Store et suivi.</li>
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
                <p className="mt-2">Objectifs, flux, contraintes terrain.</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/60">
                  Conception UX/UI
                </p>
                <p className="mt-2">Parcours courts, écrans décisifs.</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/60">
                  Développement & tests
                </p>
                <p className="mt-2">Version fiable, mise en production rapide.</p>
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
                Prêt à lancer
              </p>
              <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
                Une app fiable pour vos équipes terrain
              </h2>
              <p className="mt-3 text-sm text-ink/70">
                On clarifie le besoin et on propose un plan d’action net.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-deep px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5"
            >
              Réserver un créneau
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

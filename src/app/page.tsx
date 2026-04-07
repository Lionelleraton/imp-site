import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Solutions numériques pour le ski nordique",
  description:
    "Applications terrain, recommandations skis et tableaux de bord décisionnels pour le ski nordique.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Solutions numériques pour le ski nordique",
    description:
      "Applications terrain, recommandations skis et tableaux de bord décisionnels pour le ski nordique.",
    url: "/",
  },
};

export default function Home() {
  return (
    <main className="pb-24">
      <section className="mx-auto w-full max-w-[1400px] px-4 pt-8 sm:px-6 sm:pt-10 xl:px-10">
        <div className="relative overflow-hidden rounded-[24px] bg-deep p-6 text-white shadow-[0_40px_90px_rgba(36,67,87,0.35)] sm:rounded-[32px] sm:p-8 md:p-14">
          <div className="pointer-events-none absolute inset-0 rounded-[24px] bg-[url('/hero.png')] bg-cover bg-center opacity-45 sm:rounded-[32px]" />
          <div className="pointer-events-none absolute inset-0 rounded-[24px] bg-gradient-to-br from-deep/60 via-deep/30 to-deep/70 sm:rounded-[32px]" />
          <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-sky/30 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-12 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10">
            <div className="text-white/70">
              <span className="text-[10px] uppercase tracking-[0.3em] sm:text-[11px] sm:tracking-[0.45em]">
                Systèmes de performance, construits sur le terrain
              </span>
            </div>

            <div className="mt-8 max-w-3xl">
              <h1 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-6xl">
                Nos solutions numériques pour le ski nordique.
              </h1>

              <p className="mt-4 text-sm text-white/80 sm:text-base">
                Outils terrain, recommandations skis et tableaux de bord
                décisionnels pour le ski nordique.
              </p>

              <p className="mt-4 text-base text-white/80 sm:mt-6 sm:text-lg">
                InMotion Performance est une structure qui aide les entreprises
                et les particuliers à passer au stade supérieur, grâce à la
                création de solutions digitales et de produits.
              </p>

              <div className="mt-6 text-sm text-white/80">
                <span className="text-[10px] uppercase tracking-[0.25em] text-white/60 sm:text-[11px] sm:tracking-[0.3em]">
                  Ce que nous livrons
                </span>
                <div className="mt-2 flex flex-wrap gap-2 text-[11px] font-semibold sm:text-[12px]">
                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">
                    SkiTrack · Application terrain
                  </span>
                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">
                    Choisir ses skis · Recommandations
                  </span>
                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">
                    Tableaux de bord · Décision
                  </span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-deep shadow-[0_18px_45px_rgba(255,255,255,0.35)] transition hover:-translate-y-0.5 sm:px-8 sm:py-4 sm:text-sm"
                >
                  Prendre un RDV
                </Link>

                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 transition hover:bg-white/10 sm:px-6 sm:text-xs"
                >
                  Découvrir nos services
                </Link>
              </div>

              <div className="mt-6 inline-flex items-center gap-2 text-[11px] text-white/70">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/30">
                  ↓
                </span>
                Faites défiler pour découvrir nos solutions en détail.
              </div>

              <div className="mt-6 flex flex-wrap gap-2 text-[9px] uppercase tracking-[0.25em] text-white/60 sm:text-[10px] sm:tracking-[0.3em]">
                <span className="rounded-full border border-white/20 px-3 py-1">
                  Marques
                </span>
                <span className="rounded-full border border-white/20 px-3 py-1">
                  Clubs haut niveau
                </span>
                <span className="rounded-full border border-white/20 px-3 py-1">
                  Coachs & staffs
                </span>
                <span className="rounded-full border border-white/20 px-3 py-1">
                  Magasins spécialisés
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-4 pt-6 sm:px-6 sm:pt-8 xl:px-10">
        <div className="rounded-[24px] border border-line bg-white/85 p-4 shadow-[0_18px_45px_rgba(35,48,54,0.1)] sm:rounded-[28px] sm:p-6">
          <div className="grid gap-4 text-sm text-ink/70 sm:grid-cols-3 sm:text-base">
            <div className="rounded-2xl border border-line bg-white/90 p-4">
              <p className="text-[10px] uppercase tracking-[0.25em] text-ink/50">
                Gains terrain
              </p>
              <p className="mt-2 text-sm font-semibold text-ink">
                30 secondes vs 4–5 minutes
              </p>
              <p className="mt-2 text-sm text-ink/70">
                Saisie + export instantanés pour les staffs.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-white/90 p-4">
              <p className="text-[10px] uppercase tracking-[0.25em] text-ink/50">
                Développement
              </p>
              <p className="mt-2 text-sm font-semibold text-ink">~300h</p>
              <p className="mt-2 text-sm text-ink/70">
                Un produit terrain robuste, déjà éprouvé.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-white/90 p-4">
              <p className="text-[10px] uppercase tracking-[0.25em] text-ink/50">
                Adoption
              </p>
              <p className="mt-2 text-sm font-semibold text-ink">
                Athlètes & coachs
              </p>
              <p className="mt-2 text-sm text-ink/70">
                Utilisé en ski de fond et biathlon.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto w-full max-w-[1400px] px-4 pt-10 sm:px-6 sm:pt-12 xl:px-10">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-line bg-white/80 p-6 shadow-[0_24px_60px_rgba(35,48,54,0.12)] backdrop-blur sm:p-8">
            <p className="text-[10px] uppercase tracking-[0.25em] text-deep/70 sm:text-[11px] sm:tracking-[0.3em]">
              Pas de bruit. Juste des données.
            </p>
            <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">
              Centraliser, comparer, décider
            </h2>
            <p className="mt-3 max-w-3xl text-ink/70">
              Centraliser et structurer les données terrain, tester et améliorer
              sur le terrain, obtenir des statistiques vraiment utiles.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              <div className="rounded-2xl border border-line bg-white/70 p-5">
                <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60 sm:text-[11px] sm:tracking-[0.3em]">
                  Structurer
                </p>
                <p className="mt-2 text-base font-semibold">
                  Unifier les sources terrain
                </p>
                <p className="mt-2 text-sm text-ink/70">
                  Tests, fartage, météo, feedbacks athlètes.
                </p>
              </div>
              <div className="rounded-2xl border border-line bg-white/70 p-5">
                <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60 sm:text-[11px] sm:tracking-[0.3em]">
                  Comparer
                </p>
                <p className="mt-2 text-base font-semibold">
                  Lire les tendances utiles
                </p>
                <p className="mt-2 text-sm text-ink/70">
                  Conditions, profils, zones, saisonnalité.
                </p>
              </div>
              <div className="rounded-2xl border border-line bg-white/70 p-5">
                <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60 sm:text-[11px] sm:tracking-[0.3em]">
                  Décider
                </p>
                <p className="mt-2 text-base font-semibold">
                  Recommandations actionnables
                </p>
                <p className="mt-2 text-sm text-ink/70">
                  Tableaux de bord clairs pour aligner les équipes.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-line bg-deep p-5 text-white shadow-[0_20px_50px_rgba(36,67,87,0.3)] sm:p-6">
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/60 sm:text-[11px] sm:tracking-[0.3em]">
                Réseau terrain
              </p>
              <p className="mt-4 text-lg font-semibold">
                Un réseau pro (athlètes, coachs, marques) pour faire évoluer les
                outils en continu.
              </p>
            </div>

            <div className="rounded-3xl border border-line bg-white/80 p-5 shadow-[0_18px_40px_rgba(35,48,54,0.1)] sm:p-6">
              <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60 sm:text-[11px] sm:tracking-[0.3em]">
                Expertise terrain
              </p>
              <p className="mt-3 text-base font-semibold">
                Expertise haut niveau + décisions opérationnelles.
              </p>
              <p className="mt-3 text-sm text-ink/70">
                Des solutions numériques construites avec les staffs nordiques.
              </p>
              <Link
                href="/solutions"
                className="mt-5 inline-flex rounded-full border border-deep px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-deep transition hover:bg-deep hover:text-white"
              >
                Voir nos solutions
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-4 pt-10 sm:px-6 sm:pt-12 xl:px-10">
        <div className="rounded-3xl border border-line bg-white/85 p-6 shadow-[0_22px_60px_rgba(35,48,54,0.12)] sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60 sm:text-[11px] sm:tracking-[0.3em]">
                Produit phare
              </p>
              <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">SkiTrack</h2>
              <p className="mt-3 max-w-2xl text-sm text-ink/70">
                Application mobile pour centraliser les tests matériel, suivre la
                performance et générer des tableaux de bord décisionnels.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/skitrack"
                className="inline-flex rounded-full bg-deep px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-deep/90"
              >
                En savoir plus
              </Link>
              <Link
                href="/contact"
                className="inline-flex rounded-full border border-deep px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-deep transition hover:bg-deep hover:text-white"
              >
                Demander une démo
              </Link>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="rounded-2xl border border-line bg-white/70 p-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-ink/60 sm:text-[11px] sm:tracking-[0.25em]">
                Zone de test
              </p>
              <p className="mt-2 text-sm text-ink/70">
                Configuration des tests, conditions, neige et ranking.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-white/70 p-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-ink/60 sm:text-[11px] sm:tracking-[0.25em]">
                Statistiques & analyses
              </p>
              <p className="mt-2 text-sm text-ink/70">
                Comparaisons, impacts et évolutions par séance.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-white/70 p-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-ink/60 sm:text-[11px] sm:tracking-[0.25em]">
                Export rapide
              </p>
              <p className="mt-2 text-sm text-ink/70">
                Données prêtes à partager avec les équipes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-4 pt-10 sm:px-6 sm:pt-12 xl:px-10">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div className="rounded-3xl border border-line bg-white/80 p-5 shadow-[0_18px_50px_rgba(35,48,54,0.1)] sm:p-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60 sm:text-[11px] sm:tracking-[0.3em]">
              Étape 1
            </p>
            <h3 className="mt-3 text-lg font-semibold">Audit terrain</h3>
            <p className="mt-2 text-sm text-ink/70">
              On cartographie vos usages et vos objectifs de performance.
            </p>
          </div>
          <div className="rounded-3xl border border-line bg-white/80 p-5 shadow-[0_18px_50px_rgba(35,48,54,0.1)] sm:p-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60 sm:text-[11px] sm:tracking-[0.3em]">
              Étape 2
            </p>
            <h3 className="mt-3 text-lg font-semibold">Paramétrage</h3>
            <p className="mt-2 text-sm text-ink/70">
              On adapte les outils aux besoins clients et aux équipes terrain.
            </p>
          </div>
          <div className="rounded-3xl border border-line bg-white/80 p-5 shadow-[0_18px_50px_rgba(35,48,54,0.1)] sm:p-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60 sm:text-[11px] sm:tracking-[0.3em]">
              Étape 3
            </p>
            <h3 className="mt-3 text-lg font-semibold">Déploiement</h3>
            <p className="mt-2 text-sm text-ink/70">
              Mise en production et évolution continue des outils.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-4 pt-10 sm:px-6 sm:pt-12 xl:px-10">
        <div className="rounded-3xl border border-line bg-deep p-6 text-white shadow-[0_22px_60px_rgba(36,67,87,0.3)] sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/60 sm:text-[11px] sm:tracking-[0.3em]">
                Besoin d’un outil terrain ?
              </p>
              <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
                Réservons un créneau pour clarifier vos besoins.
              </h2>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-deep shadow-[0_18px_45px_rgba(255,255,255,0.35)] transition hover:-translate-y-0.5 sm:px-8 sm:py-4 sm:text-sm"
            >
              Prendre un RDV
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

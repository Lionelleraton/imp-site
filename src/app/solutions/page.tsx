// ⚠️ AUCUN header/nav ici.
// Le seul header du site doit venir de src/app/layout.tsx via <SiteHeader />.

import Link from "next/link";

export default function SolutionsPage() {
  return (
    <main className="pb-24">
      <section className="mx-auto w-full max-w-[1400px] px-4 pt-10 sm:px-6 sm:pt-12 xl:px-10">
        <div className="grid items-end gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60 sm:text-[11px] sm:tracking-[0.3em]">
              Nos solutions
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl md:text-6xl">
              Des outils pensés pour les acteurs du nordique
            </h1>
            <p className="mt-4 max-w-2xl text-ink/70">
              Marques, fédérations, magasins et staffs : structurez les données
              terrain, alignez les équipes et gagnez en lisibilité sur chaque
              décision critique.
            </p>
          </div>

          <div className="rounded-3xl border border-line bg-deep p-5 text-white shadow-[0_22px_60px_rgba(36,67,87,0.35)] sm:p-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/60 sm:text-[11px] sm:tracking-[0.3em]">
              Mise en place
            </p>
            <p className="mt-3 text-lg font-semibold">
              Cartographier vos usages, importer les historiques, activer les
              tableaux de bord en 2 semaines.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div className="group rounded-3xl border border-line bg-white/80 p-5 shadow-[0_18px_50px_rgba(35,48,54,0.1)] transition hover:-translate-y-1 sm:p-6">
            <div className="h-1 w-12 rounded-full bg-deep" />
            <h3 className="mt-5 text-lg font-semibold">Suivi des tests matériel</h3>
            <ul className="mt-3 space-y-2 text-sm text-ink/70">
              <li>Tests skis / chaussures / bâtons</li>
              <li>Retours athlètes & staffs centralisés</li>
              <li>Historique multi-saisons et comparaisons</li>
            </ul>
          </div>

          <div className="group rounded-3xl border border-line bg-white/80 p-5 shadow-[0_18px_50px_rgba(35,48,54,0.1)] transition hover:-translate-y-1 sm:p-6">
            <div className="h-1 w-12 rounded-full bg-sky" />
            <h3 className="mt-5 text-lg font-semibold">Outils décisionnels</h3>
            <ul className="mt-3 space-y-2 text-sm text-ink/70">
              <li>Comparaisons et filtres (neige, structure, fartage…)</li>
              <li>Tableaux de bord clairs et partageables</li>
              <li>Recommandations actionnables</li>
            </ul>
          </div>

          <div className="group rounded-3xl border border-line bg-white/80 p-5 shadow-[0_18px_50px_rgba(35,48,54,0.1)] transition hover:-translate-y-1 sm:p-6">
            <div className="h-1 w-12 rounded-full bg-mist" />
            <h3 className="mt-5 text-lg font-semibold">Choisir ses skis</h3>
            <ul className="mt-3 space-y-2 text-sm text-ink/70">
              <li>Questionnaire skieur ultra-rapide</li>
              <li>Correspondance instantanée sur le marché</li>
              <li>3 meilleurs résultats expliqués</li>
            </ul>

            <Link
              href="/choose-skis"
              className="mt-6 inline-flex rounded-full bg-deep px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-deep/90"
            >
              Ouvrir le configurateur
            </Link>
          </div>
        </div>

        <div className="mt-10">
          <Link
            href="/contact"
            className="inline-flex rounded-full border border-deep bg-white/70 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-deep transition hover:bg-deep hover:text-white"
          >
            Nous contacter
          </Link>
        </div>

        <div className="mt-12 rounded-3xl border border-line bg-white/85 p-6 shadow-[0_18px_50px_rgba(35,48,54,0.08)] sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60 sm:text-[11px] sm:tracking-[0.3em]">
                Outils déjà développés
              </p>
              <h2 className="mt-3 text-xl font-semibold sm:text-2xl">SkiTrack</h2>
              <p className="mt-2 max-w-2xl text-sm text-ink/70">
                Plateforme terrain pour centraliser les tests matériel, tracer
                les retours athlètes et générer des tableaux de bord décisionnels
                exploitables par les équipes.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-2xl border border-deep/20 bg-deep/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-deep">
                Déjà en production
              </div>
              <Link
                href="/skitrack"
                className="inline-flex rounded-full bg-deep px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-deep/90"
              >
                En savoir plus
              </Link>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="rounded-2xl border border-line bg-white/70 p-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-ink/60 sm:text-[11px] sm:tracking-[0.25em]">
                Data terrain
              </p>
              <p className="mt-2 text-sm text-ink/70">
                Saisie rapide des tests, conditions et feedbacks.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-white/70 p-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-ink/60 sm:text-[11px] sm:tracking-[0.25em]">
                Comparaisons
              </p>
              <p className="mt-2 text-sm text-ink/70">
                Filtres par neige, structure, modèle et saison.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-white/70 p-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-ink/60 sm:text-[11px] sm:tracking-[0.25em]">
                Décision
              </p>
              <p className="mt-2 text-sm text-ink/70">
                Tableaux de bord synthétiques pour aligner les équipes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

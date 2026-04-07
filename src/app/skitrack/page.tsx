import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SkiTrack",
  description:
    "Application mobile terrain pour centraliser les tests matériel et guider les décisions des staffs.",
  alternates: {
    canonical: "/skitrack",
  },
  openGraph: {
    title: "SkiTrack",
    description:
      "Application mobile terrain pour centraliser les tests matériel et guider les décisions des staffs.",
    url: "/skitrack",
  },
};

export default function SkiTrackPage() {
  return (
    <main className="pb-24">
      <section className="mx-auto w-full max-w-[1400px] px-4 pt-10 sm:px-6 sm:pt-12 xl:px-10">
        <div className="grid items-end gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60 sm:text-[11px] sm:tracking-[0.3em]">
              Application mobile
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl md:text-6xl">SkiTrack</h1>
            <p className="mt-4 max-w-2xl text-ink/70">
              Outil terrain pour centraliser les tests matériel, structurer les
              données de performance et accélérer les décisions des staffs.
            </p>
          </div>

          <div className="rounded-3xl border border-line bg-deep p-5 text-white shadow-[0_22px_60px_rgba(36,67,87,0.35)] sm:p-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/60 sm:text-[11px] sm:tracking-[0.3em]">
              Déjà en production
            </p>
            <p className="mt-3 text-lg font-semibold">
              Outils simples, concrets, utilisés sur le terrain.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div className="rounded-3xl border border-line bg-white/85 p-5 shadow-[0_18px_50px_rgba(35,48,54,0.1)] sm:p-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60 sm:text-[11px] sm:tracking-[0.3em]">
              Collecte rapide
            </p>
            <h3 className="mt-3 text-lg font-semibold">Zone de test</h3>
            <p className="mt-2 text-sm text-ink/70">
              Configuration des tests, conditions, neige et ranking des paires.
            </p>
          </div>
          <div className="rounded-3xl border border-line bg-white/85 p-5 shadow-[0_18px_50px_rgba(35,48,54,0.1)] sm:p-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60 sm:text-[11px] sm:tracking-[0.3em]">
              Analyse
            </p>
            <h3 className="mt-3 text-lg font-semibold">Statistiques & impacts</h3>
            <p className="mt-2 text-sm text-ink/70">
              Comparaisons, heatmaps et évolution des performances.
            </p>
          </div>
          <div className="rounded-3xl border border-line bg-white/85 p-5 shadow-[0_18px_50px_rgba(35,48,54,0.1)] sm:p-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60 sm:text-[11px] sm:tracking-[0.3em]">
              Partage
            </p>
            <h3 className="mt-3 text-lg font-semibold">Export & rapports</h3>
            <p className="mt-2 text-sm text-ink/70">
              Export instantané et rapports clairs pour les équipes.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-4 pt-10 sm:px-6 sm:pt-12 xl:px-10">
        <div className="rounded-3xl border border-line bg-white/85 p-6 shadow-[0_22px_60px_rgba(35,48,54,0.12)] sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60 sm:text-[11px] sm:tracking-[0.3em]">
                Preuves terrain
              </p>
              <h2 className="mt-3 text-xl font-semibold sm:text-2xl">
                SkiTrack validé en conditions réelles
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-ink/70">
                Chiffres concrets issus du développement et de l’usage terrain.
              </p>
            </div>
            <span className="rounded-full border border-deep/20 bg-deep/5 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-deep sm:text-[11px] sm:tracking-[0.25em]">
              En production
            </span>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            <div className="rounded-2xl border border-line bg-white/70 p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-ink/60">
                Développement
              </p>
              <p className="mt-3 text-3xl font-semibold">300h</p>
              <p className="mt-2 text-sm text-ink/70">
                Temps de production pour livrer SkiTrack en conditions réelles.
              </p>
              <div className="mt-4 h-2 w-full rounded-full bg-ink/10">
                <div className="h-2 w-[85%] rounded-full bg-deep/70" />
              </div>
            </div>

            <div className="rounded-2xl border border-line bg-white/70 p-5">
              <p className="text-[11px] uppercase tracking-[0.25em] text-ink/60">
                Cadrage
              </p>
              <p className="mt-2 text-sm text-ink/70">
                2 briefs + 1 semaine de cadrage, dossier de validation et contrat
                de production.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-deep text-[10px] font-semibold text-white">
                  1
                </div>
                <div className="h-px flex-1 bg-line" />
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-deep text-[10px] font-semibold text-white">
                  2
                </div>
                <div className="h-px flex-1 bg-line" />
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-deep text-[10px] font-semibold text-white">
                  3
                </div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-[10px] text-ink/60 sm:text-[11px]">
                <span>Brief 30 min</span>
                <span>Brief 1 h</span>
                <span>1 semaine</span>
              </div>
            </div>

            <div className="rounded-2xl border border-line bg-white/70 p-5">
              <p className="text-[11px] uppercase tracking-[0.25em] text-ink/60">
                Gain de temps
              </p>
              <p className="mt-2 text-sm text-ink/70">
                4–5 min de saisie + Excel → <strong>30 s</strong> tout compris.
              </p>
              <div className="mt-4">
                <div className="text-[10px] uppercase tracking-[0.25em] text-ink/60">
                  Avant
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-ink/10">
                  <div className="h-2 w-[85%] rounded-full bg-ink/40" />
                </div>
                <div className="mt-4 text-[10px] uppercase tracking-[0.25em] text-ink/60">
                  Avec SkiTrack
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-ink/10">
                  <div className="h-2 w-[20%] rounded-full bg-sky" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-line bg-white/70 p-5">
              <p className="text-[11px] uppercase tracking-[0.25em] text-ink/60">
                Validation terrain
              </p>
              <p className="mt-2 text-sm text-ink/70">
                Utilisé par athlètes & coachs ski de fond et biathlon, toute
                l’année.
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-deep">
                <span className="rounded-full border border-line bg-deep/5 px-3 py-1">
                  Ski de fond
                </span>
                <span className="rounded-full border border-line bg-deep/5 px-3 py-1">
                  Biathlon
                </span>
                <span className="rounded-full border border-line bg-deep/5 px-3 py-1">
                  Athlètes
                </span>
                <span className="rounded-full border border-line bg-deep/5 px-3 py-1">
                  Coachs
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-line bg-white/70 p-5">
              <p className="text-[11px] uppercase tracking-[0.25em] text-ink/60">
                Évolution continue
              </p>
              <p className="mt-2 text-sm text-ink/70">
                L’app évolue chaque semaine grâce aux retours terrain.
              </p>
              <div className="mt-4 flex items-end gap-2">
                <div className="h-4 w-2 rounded-full bg-ink/20" />
                <div className="h-6 w-2 rounded-full bg-ink/30" />
                <div className="h-5 w-2 rounded-full bg-ink/25" />
                <div className="h-8 w-2 rounded-full bg-deep/50" />
                <div className="h-6 w-2 rounded-full bg-ink/30" />
                <div className="h-9 w-2 rounded-full bg-deep/70" />
                <div className="h-7 w-2 rounded-full bg-ink/35" />
                <div className="h-10 w-2 rounded-full bg-deep" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-4 pt-10 sm:px-6 sm:pt-12 xl:px-10">
        <div className="rounded-3xl border border-line bg-white/85 p-6 shadow-[0_22px_60px_rgba(35,48,54,0.12)] sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60 sm:text-[11px] sm:tracking-[0.3em]">
                Captures
              </p>
              <h2 className="mt-3 text-xl font-semibold sm:text-2xl">Vue terrain</h2>
              <p className="mt-2 max-w-2xl text-sm text-ink/70">
                Une interface mobile claire pour saisir, analyser et partager les
                décisions au bord de la piste.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-line bg-white/80 p-4 shadow-[0_16px_40px_rgba(35,48,54,0.08)]">
              <img
                src="/skitrack/skitrack-shooting-time.png"
                alt="SkiTrack - Progression du temps de tir"
                className="w-full rounded-2xl"
                loading="lazy"
              />
            </div>
            <div className="rounded-3xl border border-line bg-white/80 p-4 shadow-[0_16px_40px_rgba(35,48,54,0.08)]">
              <img
                src="/skitrack/skitrack-test-zone.png"
                alt="SkiTrack - Zone de test"
                className="w-full rounded-2xl"
                loading="lazy"
              />
            </div>
            <div className="rounded-3xl border border-line bg-white/80 p-4 shadow-[0_16px_40px_rgba(35,48,54,0.08)]">
              <img
                src="/skitrack/skitrack-biathlon.png"
                alt="SkiTrack - Statistiques biathlon"
                className="w-full rounded-2xl"
                loading="lazy"
              />
            </div>
            <div className="rounded-3xl border border-line bg-white/80 p-4 shadow-[0_16px_40px_rgba(35,48,54,0.08)]">
              <img
                src="/skitrack/skitrack-appstore.png"
                alt="SkiTrack sur l’App Store"
                className="w-full rounded-2xl"
                loading="lazy"
              />
            </div>
            <div className="rounded-3xl border border-line bg-white/80 p-4 shadow-[0_16px_40px_rgba(35,48,54,0.08)] md:col-span-2">
              <img
                src="/skitrack/skitrack-edit-skis.png"
                alt="SkiTrack - Édition des skis"
                className="w-full rounded-2xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-4 pt-10 sm:px-6 sm:pt-12 xl:px-10">
        <div className="rounded-3xl border border-line bg-deep p-6 text-white shadow-[0_22px_60px_rgba(36,67,87,0.35)] sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/60 sm:text-[11px] sm:tracking-[0.3em]">
                Démo
              </p>
              <h2 className="mt-3 text-xl font-semibold sm:text-2xl">
                Tu veux voir SkiTrack en action ?
              </h2>
              <p className="mt-2 text-sm text-white/80">
                Télécharge-le et profite de 7 jours d’essai gratuit !
              </p>
            </div>
            <a
              href="https://apps.apple.com/fr/app/skitrack-data-performance/id6753818929"
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full bg-white px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-deep transition hover:-translate-y-0.5 sm:text-xs"
            >
              Tester SkiTrack
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

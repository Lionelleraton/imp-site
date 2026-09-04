// ⚠️ AUCUN header/nav ici.
// Le seul header du site doit venir de src/app/layout.tsx via <SiteHeader />.

import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nos solutions",
  description:
    "Des outils numériques pour structurer les données terrain et accélérer les décisions en ski nordique.",
  alternates: {
    canonical: "/solutions",
  },
  openGraph: {
    title: "Nos solutions",
    description:
      "Des outils numériques pour structurer les données terrain et accélérer les décisions en ski nordique.",
    url: "/solutions",
  },
};

const solutionCards = [
  {
    accent: "bg-gradient-to-br from-deep to-sky/60",
    accentLine: "bg-gradient-to-r from-deep to-sky",
    title: "Suivi des tests matériel",
    items: [
      "Tests skis / chaussures / bâtons",
      "Retours athlètes & staffs centralisés",
      "Historique multi-saisons et comparaisons",
    ],
    cta: null,
  },
  {
    accent: "bg-gradient-to-br from-sky/70 to-deep/50",
    accentLine: "bg-gradient-to-r from-sky to-deep/60",
    title: "Outils décisionnels",
    items: [
      "Comparaisons et filtres (neige, structure, fartage…)",
      "Tableaux de bord clairs et partageables",
      "Recommandations actionnables",
    ],
    cta: null,
  },
  {
    accent: "bg-gradient-to-br from-mist/80 to-sky/40",
    accentLine: "bg-gradient-to-r from-mist to-sky/60",
    title: "Choisir ses skis",
    items: [
      "Questionnaire skieur ultra-rapide",
      "Correspondance instantanée sur le marché",
      "3 meilleurs résultats expliqués",
    ],
    cta: { label: "Tester le configurateur", href: "/choose-skis" },
  },
];

const skitrackFeatures = [
  { label: "Data terrain", desc: "Saisie rapide des tests, conditions et feedbacks." },
  { label: "Comparaisons", desc: "Filtres par neige, structure, modèle et saison." },
  { label: "Décision", desc: "Tableaux de bord synthétiques pour aligner les équipes." },
];

function ArrowIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <path d="M5 12h14" strokeLinecap="round" />
      <path d="m13.5 7 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const reveal = (delay: number): CSSProperties => ({ "--reveal-delay": `${delay}ms` } as CSSProperties);

export default function SolutionsPage() {
  return (
    <main className="pb-24">
      {/* ── Hero ── */}
      <section
        className="mx-auto w-full max-w-[1400px] px-4 pt-10 sm:px-6 sm:pt-12 xl:px-10"
        data-reveal
        style={reveal(0)}
      >
        <div className="grid items-end gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-4 h-0.5 w-10 rounded-full bg-gradient-to-r from-deep to-sky" />
            <p className="text-[10px] uppercase tracking-[0.28em] text-ink/50 sm:text-[11px] sm:tracking-[0.32em]">
              Nos solutions
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl md:text-[3.2rem] md:leading-[1.04]">
              Des solutions concrètes pour{" "}
              <span className="text-gradient">décider plus vite</span> sur le terrain
            </h1>
            <p className="mt-4 max-w-2xl text-ink/68">
              Marques, fédérations, magasins et staffs : structurez les données
              terrain, alignez les équipes et transformez vos analyses en décisions
              opérationnelles.
            </p>
          </div>

          {/* Deploy card */}
          <div
            className="relative overflow-hidden rounded-3xl bg-deep p-5 text-white shadow-[0_22px_60px_rgba(36,67,87,0.35)] sm:p-6"
            data-reveal
            style={reveal(80)}
          >
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-sky/18 blur-2xl" />
            <p className="relative text-[10px] uppercase tracking-[0.28em] text-white/55 sm:text-[11px] sm:tracking-[0.32em]">
              Déploiement rapide
            </p>
            <p className="relative mt-3 text-lg font-semibold leading-snug">
              Cartographier vos usages, importer l'historique et activer des
              tableaux de bord actionnables en 2 semaines.
            </p>
            <div className="relative mt-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sky animate-glow-pulse" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50">
                Déjà en production
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Solution cards ── */}
      <section className="mx-auto w-full max-w-[1400px] px-4 pt-8 sm:px-6 xl:px-10">
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {solutionCards.map((card, i) => (
            <div
              key={card.title}
              className="hover-gradient-border group relative overflow-hidden rounded-3xl border border-line bg-white/85 p-5 shadow-[0_18px_50px_rgba(35,48,54,0.1)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_64px_rgba(35,48,54,0.16)] sm:p-6"
              data-reveal
              style={reveal(60 + i * 80)}
            >
              {/* Gradient accent line */}
              <div className={`h-0.5 w-12 rounded-full ${card.accentLine} transition-all duration-300 group-hover:w-16`} />
              <h3 className="mt-5 text-lg font-semibold">{card.title}</h3>
              <ul className="mt-3 space-y-2.5 text-sm text-ink/68">
                {card.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-sky" />
                    {item}
                  </li>
                ))}
              </ul>
              {card.cta && (
                <Link
                  href={card.cta.href}
                  className="btn-shine mt-6 inline-flex items-center gap-2 rounded-full bg-deep px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white shadow-[0_8px_22px_rgba(36,67,87,0.28)] transition hover:-translate-y-0.5"
                >
                  {card.cta.label}
                  <ArrowIcon />
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA line ── */}
      <section
        className="mx-auto w-full max-w-[1400px] px-4 pt-6 sm:px-6 xl:px-10"
        data-reveal
        style={reveal(80)}
      >
        <Link
          href="/contact"
          className="btn-shine inline-flex w-full items-center justify-center gap-2 rounded-full border border-deep bg-white/72 px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-deep transition hover:bg-deep hover:text-white sm:w-auto"
        >
          Parler de votre besoin
          <ArrowIcon />
        </Link>
      </section>

      {/* ── SkiTrack highlight ── */}
      <section
        className="mx-auto w-full max-w-[1400px] px-4 pt-8 sm:px-6 xl:px-10"
        data-reveal
        style={reveal(90)}
      >
        <div className="relative overflow-hidden rounded-3xl border border-line bg-white/90 p-6 shadow-[0_18px_50px_rgba(35,48,54,0.08)] sm:p-8">
          {/* Decorative orb */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-sky/12 blur-3xl" />

          <div className="relative flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-xl">
              <div className="mb-3 h-0.5 w-8 rounded-full bg-gradient-to-r from-deep to-sky" />
              <p className="text-[10px] uppercase tracking-[0.28em] text-ink/48 sm:text-[11px]">
                Outil déjà développé
              </p>
              <h2 className="mt-2 text-xl font-semibold sm:text-2xl">SkiTrack</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink/68">
                Plateforme terrain pour centraliser les tests matériel, tracer
                les retours athlètes et générer des tableaux de bord décisionnels
                exploitables par les équipes.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-2xl border border-deep/18 bg-deep/6 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-deep">
                Déjà en production
              </div>
              <Link
                href="/skitrack"
                className="btn-shine inline-flex items-center gap-2 rounded-full bg-deep px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white shadow-[0_8px_22px_rgba(36,67,87,0.28)] transition hover:-translate-y-0.5"
              >
                En savoir plus
                <ArrowIcon />
              </Link>
            </div>
          </div>

          <div className="relative mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {skitrackFeatures.map((feat, i) => (
              <div
                key={feat.label}
                className="hover-gradient-border rounded-2xl border border-line bg-white/72 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(35,48,54,0.1)]"
                data-reveal
                style={reveal(100 + i * 60)}
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-deep sm:text-[11px]">
                  {feat.label}
                </p>
                <p className="mt-2 text-sm text-ink/68">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

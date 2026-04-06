"use client";

// ⚠️ Rappel : AUCUN header/nav ici.
// Le header global est rendu uniquement via src/app/layout.tsx (<SiteHeader />).

import { useMemo, useState } from "react";
import skiData from "@/data/ski-choose.json";

type Technique = "Classique" | "Skating";

type Niveau = "Débutant" | "Intermédiaire" | "Confirmé" | "Compétiteur";

type Frequence =
  | "Occasionnel"
  | "Régulier"
  | "Intensive"
  | "Compétition";

type TypeSki = "Initiation" | "Plaisir" | "Performance" | "Course";

type But =
  | "Plaisir"
  | "Confort"
  | "Progression technique"
  | "Performance"
  | "Compétition";

type Priorite =
  | "Glisse"
  | "Maniabilité"
  | "Stabilité"
  | "Tolérance"
  | "Dynamisme"
  | "Rigidité"
  | "Accroche";

type Neige = "Froide" | "Universel" | "Humide / printemps";

type PoidsRange = {
  min: number;
  max: number;
};

type SkiChoice = {
  code: string;
  nom: string;
  technique: Technique;
  niveau: Niveau[];
  frequence: Frequence[];
  type: TypeSki[];
  but: But[];
  priorites: Priorite[];
  neige: Neige[];
  prix: number | null;
  tailles: number[];
  poidsRanges?: Record<string, PoidsRange>;
  productUrl?: string;
  imageUrl?: string;
};

const SKI_CHOICES = skiData as SkiChoice[];

const PRIORITES_BASE: Priorite[] = [
  "Glisse",
  "Maniabilité",
  "Stabilité",
  "Tolérance",
  "Dynamisme",
  "Rigidité",
];

const NEIGES: Neige[] = ["Froide", "Universel", "Humide / printemps"];

const STEPS = [
  {
    title: "Profil skieur",
    helper: "Taille et poids.",
  },
  {
    title: "Technique & niveau",
    helper: "Technique et niveau.",
  },
  {
    title: "Type & objectif",
    helper: "Type de ski, objectif principal.",
  },
  {
    title: "Priorités & budget",
    helper: "Priorités, neige, budget.",
  },
];

const BUDGET_MIN = 270;
const BUDGET_MAX = 725;

export default function ChooseSkisPage() {
  const [poids, setPoids] = useState<number | "">(75);
  const [taille, setTaille] = useState<number | "">(170);
  const [technique, setTechnique] = useState<Technique | null>(null);
  const [niveau, setNiveau] = useState<Niveau | null>(null);
  const [typeRecherche, setTypeRecherche] = useState<TypeSki | null>(null);
  const [but, setBut] = useState<But | null>(null);
  const [priorites, setPriorites] = useState<Priorite[]>([]);
  const [neige, setNeige] = useState<Neige | null>(null);
  const [budgetMax, setBudgetMax] = useState<number>(BUDGET_MAX);
  const [step, setStep] = useState(0);

  const prioritesDisponibles = useMemo(() => {
    if (technique === "Classique") {
      return [...PRIORITES_BASE, "Accroche"];
    }
    return PRIORITES_BASE;
  }, [technique]);

  const showNeige = typeRecherche === "Course" && but === "Compétition";

  const togglePriorite = (value: Priorite) => {
    setPriorites((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      }
      if (prev.length >= 2) {
        return prev;
      }
      return [...prev, value];
    });
  };

  const handleTechnique = (value: Technique) => {
    setTechnique(value);
    if (value === "Skating") {
      setPriorites((prev) => prev.filter((item) => item !== "Accroche"));
    }
  };

  const recommendations = useMemo(() => {
    if (!technique) {
      return [];
    }

    const base = SKI_CHOICES.filter((ski) => ski.technique === technique);
    if (base.length === 0) {
      return [];
    }

    const idealLength =
      typeof taille === "number"
        ? taille + (technique === "Skating" ? 10 : 25)
        : null;
    const sizeThreshold = technique === "Skating" ? 10 : 15;

    const scored = base.map((ski) => {
      const tailles = ski.tailles ?? [];
      const poidsRanges = ski.poidsRanges ?? {};

      let bestLength: number | null = null;
      let bestDiff = Number.POSITIVE_INFINITY;
      let sizeMatch = false;
      let weightMatch = false;

      if (
        tailles.length > 0 &&
        (typeof taille === "number" || typeof poids === "number")
      ) {
        tailles.forEach((length) => {
          let localSizeMatch = false;
          let diff = Number.POSITIVE_INFINITY;
          if (typeof taille === "number" && idealLength !== null) {
            diff = Math.abs(length - idealLength);
            localSizeMatch = diff <= sizeThreshold;
          }

          let localWeightMatch = false;
          const range = poidsRanges[String(length)];
          if (typeof poids === "number" && range) {
            localWeightMatch = poids >= range.min && poids <= range.max;
          }

          const isBetter =
            (localWeightMatch && !weightMatch) ||
            (localWeightMatch === weightMatch && diff < bestDiff);

          if (isBetter) {
            bestLength = length;
            bestDiff = diff;
            sizeMatch = localSizeMatch;
            weightMatch = localWeightMatch;
          }
        });
      }

      let fitTier = 0;
      if (sizeMatch && weightMatch) fitTier = 3;
      else if (weightMatch) fitTier = 2;
      else if (sizeMatch) fitTier = 1;

      let score = 0;
      let total = 0;

      const weightSize = 2;
      const weightWeight = 2;
      const weightNiveau = 2;
      const weightType = 3;
      const weightBut = 2;
      const weightPriorite = 1;
      const weightNeige = 1;
      const weightBudget = 1;

      if (typeof taille === "number" && tailles.length > 0) {
        total += weightSize;
        if (sizeMatch) score += weightSize;
      }

      if (typeof poids === "number" && Object.keys(poidsRanges).length > 0) {
        total += weightWeight;
        if (weightMatch) score += weightWeight;
      }

      if (niveau && ski.niveau.length > 0) {
        total += weightNiveau;
        if (ski.niveau.includes(niveau)) score += weightNiveau;
      }

      if (typeRecherche && ski.type.length > 0) {
        total += weightType;
        if (ski.type.includes(typeRecherche)) score += weightType;
      }

      if (but && ski.but.length > 0) {
        total += weightBut;
        if (ski.but.includes(but)) score += weightBut;
      }

      if (priorites.length > 0 && ski.priorites.length > 0) {
        total += priorites.length * weightPriorite;
        score +=
          priorites.filter((p) => ski.priorites.includes(p)).length *
          weightPriorite;
      }

      if (showNeige && neige && ski.neige.length > 0) {
        total += weightNeige;
        if (ski.neige.includes(neige)) score += weightNeige;
      }

      if (ski.prix !== null) {
        total += weightBudget;
        if (ski.prix <= budgetMax) score += weightBudget;
      }

      let neigeRank = 0;
      if (showNeige && neige) {
        const hasNeige = (value: Neige) => ski.neige.includes(value);
        if (neige === "Humide / printemps") {
          neigeRank = hasNeige("Humide / printemps")
            ? 0
            : hasNeige("Universel")
              ? 1
              : hasNeige("Froide")
                ? 2
                : 3;
        } else if (neige === "Froide") {
          neigeRank = hasNeige("Froide")
            ? 0
            : hasNeige("Universel")
              ? 1
              : hasNeige("Humide / printemps")
                ? 2
                : 3;
        } else {
          neigeRank = hasNeige("Universel")
            ? 0
            : hasNeige("Froide")
              ? 1
              : hasNeige("Humide / printemps")
                ? 2
                : 3;
        }
      }

      const matchPercent = total > 0 ? Math.round((score / total) * 100) : 0;
      const criteriaScore = total > 0 ? score / total : 0;

      return {
        ski,
        totalScore: criteriaScore,
        matchPercent,
        bestLength,
        sizeMatch,
        weightMatch,
        fitTier,
        sizeDiff: bestDiff,
        neigeRank,
      };
    });

    scored.sort((a, b) => {
      if (b.fitTier !== a.fitTier) return b.fitTier - a.fitTier;
      if (a.sizeDiff !== b.sizeDiff) return a.sizeDiff - b.sizeDiff;
      if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
      if (showNeige && neige) return a.neigeRank - b.neigeRank;
      return 0;
    });
    return scored.slice(0, 3);
  }, [
    technique,
    niveau,
    typeRecherche,
    but,
    priorites,
    neige,
    budgetMax,
    showNeige,
    taille,
    poids,
  ]);

  const canGoBack = step > 0;
  const canGoNext = step < STEPS.length - 1;
  const progress = ((step + 1) / STEPS.length) * 100;
  const isReady = Boolean(technique && typeRecherche);

  return (
    <main className="pb-24">
      <section className="mx-auto w-full max-w-[1400px] px-4 pt-10 sm:px-6 sm:pt-12 xl:px-10">
        <div className="grid items-end gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60 sm:text-[11px] sm:tracking-[0.3em]">
              Choisir ses skis
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl md:text-6xl">
              Choisir ses skis
            </h1>
            <p className="mt-4 max-w-xl text-ink/70">
              Profil skieur, technique, objectifs et priorités : on sort la paire
              la plus cohérente avec ton usage.
            </p>
          </div>

          <div className="rounded-3xl border border-line bg-white/80 p-5 shadow-[0_18px_50px_rgba(35,48,54,0.1)] sm:p-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60 sm:text-[11px] sm:tracking-[0.3em]">
              Méthode
            </p>
            <p className="mt-3 text-base font-semibold">
              Parcours guidé, une étape à la fois.
            </p>
          </div>
        </div>

        <div className="mt-10">
          {/* FORMULAIRE */}
          <div className="rounded-3xl border border-line bg-white/85 p-5 shadow-[0_18px_50px_rgba(35,48,54,0.1)] sm:p-6">
            <h2 className="text-lg font-semibold">Profil skieur</h2>

            <div className="mt-6 rounded-2xl border border-line bg-white/70 p-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-ink/60 sm:text-[11px] sm:tracking-[0.25em]">
                    Étape {step + 1} / {STEPS.length}
                  </p>
                  <p className="mt-2 text-sm text-ink/70">
                    {STEPS[step].title} · {STEPS[step].helper}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {STEPS.map((item, index) => {
                    const active = step === index;
                    return (
                      <button
                        key={item.title}
                        type="button"
                        onClick={() => setStep(index)}
                        className={
                          "rounded-full px-3 py-1 border text-[10px] font-semibold uppercase tracking-[0.2em] transition " +
                          (active
                            ? "bg-deep text-white border-deep"
                            : "border-line text-ink/60 hover:bg-deep/5")
                        }
                      >
                        {index + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="mt-4 h-1 w-full rounded-full bg-line/60">
                <div
                  className="h-1 rounded-full bg-deep transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {step === 0 && (
              <div className="mt-6 animate-reveal">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium">Taille (cm)</label>
                    <input
                      type="number"
                      value={taille}
                      onChange={(e) =>
                        setTaille(
                          e.target.value === "" ? "" : Number(e.target.value)
                        )
                      }
                      className="mt-1 w-full rounded-xl border border-line bg-white/70 px-3 py-2 text-sm outline-none transition focus:border-sky focus:ring-4 focus:ring-sky/20"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Poids (kg)</label>
                    <input
                      type="number"
                      value={poids}
                      onChange={(e) =>
                        setPoids(
                          e.target.value === "" ? "" : Number(e.target.value)
                        )
                      }
                      className="mt-1 w-full rounded-xl border border-line bg-white/70 px-3 py-2 text-sm outline-none transition focus:border-sky focus:ring-4 focus:ring-sky/20"
                    />
                  </div>
                </div>

              </div>
            )}

            {step === 1 && (
              <div className="mt-6 animate-reveal">
                <div>
                  <label className="text-sm font-medium">Technique pratiquée</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(["Classique", "Skating"] as const).map((item) => {
                      const active = technique === item;
                      return (
                        <button
                          key={item}
                          type="button"
                        onClick={() => handleTechnique(item)}
                          className={
                            "rounded-full px-4 py-1.5 border text-[11px] font-semibold uppercase tracking-[0.2em] transition " +
                            (active
                              ? "bg-deep text-white border-deep"
                              : "border-line text-ink/70 hover:bg-deep/5")
                          }
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="text-sm font-medium">Niveau</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(
                      ["Débutant", "Intermédiaire", "Confirmé", "Compétiteur"] as const
                    ).map((item) => {
                      const active = niveau === item;
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setNiveau(item)}
                          className={
                            "rounded-full px-4 py-1.5 border text-[11px] font-semibold uppercase tracking-[0.2em] transition " +
                            (active
                              ? "bg-deep text-white border-deep"
                              : "border-line text-ink/70 hover:bg-deep/5")
                          }
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

            {step === 2 && (
              <div className="mt-6 animate-reveal">
                <div>
                  <label className="text-sm font-medium">Type de ski</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(["Initiation", "Plaisir", "Performance", "Course"] as const).map(
                      (item) => {
                        const active = typeRecherche === item;
                        return (
                          <button
                            key={item}
                            type="button"
                            onClick={() => setTypeRecherche(item)}
                            className={
                              "rounded-full px-4 py-1.5 border text-[11px] font-semibold uppercase tracking-[0.2em] transition " +
                              (active
                                ? "bg-deep text-white border-deep"
                                : "border-line text-ink/70 hover:bg-deep/5")
                            }
                          >
                            {item}
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="text-sm font-medium">Objectif principal</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(
                      [
                        "Plaisir",
                        "Confort",
                        "Progression technique",
                        "Performance",
                        "Compétition",
                      ] as const
                    ).map((item) => {
                      const active = but === item;
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setBut(item)}
                          className={
                            "rounded-full px-4 py-1.5 border text-[11px] font-semibold uppercase tracking-[0.2em] transition " +
                            (active
                              ? "bg-sky text-deep border-sky"
                              : "border-line text-ink/70 hover:bg-deep/5")
                          }
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="mt-6 animate-reveal">
                <div>
                  <label className="text-sm font-medium">
                    Priorités
                    <span className="text-ink/60 font-normal"> (2 choix max)</span>
                  </label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {prioritesDisponibles.map((item) => {
                      const active = priorites.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => togglePriorite(item)}
                          className={
                            "rounded-full px-4 py-1.5 border text-[11px] font-semibold uppercase tracking-[0.2em] transition " +
                            (active
                              ? "bg-deep text-white border-deep"
                              : "border-line text-ink/70 hover:bg-deep/5")
                          }
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {showNeige && (
                  <div className="mt-4">
                    <label className="text-sm font-medium">Type de neige</label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {NEIGES.map((item) => {
                        const active = neige === item;
                        return (
                          <button
                            key={item}
                            type="button"
                            onClick={() =>
                              setNeige((prev) => (prev === item ? null : item))
                            }
                            className={
                              "rounded-full px-4 py-1.5 border text-[11px] font-semibold uppercase tracking-[0.2em] transition " +
                              (active
                                ? "bg-deep text-white border-deep"
                                : "border-line text-ink/70 hover:bg-deep/5")
                            }
                          >
                            {item}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="mt-4">
                  <label className="text-sm font-medium">Budget maximum</label>
                  <div className="mt-2 flex items-center gap-3">
                    <input
                      type="range"
                      min={BUDGET_MIN}
                      max={BUDGET_MAX}
                      step={5}
                      value={budgetMax}
                      onChange={(e) => setBudgetMax(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="min-w-[72px] rounded-full border border-line bg-white/70 px-3 py-1 text-sm">
                      {budgetMax}€
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-ink/60">
                    Filtre entre {BUDGET_MIN}€ et {BUDGET_MAX}€.
                  </p>
                </div>
              </div>
            )}

            <div className="mt-8 flex items-center justify-between border-t border-line/60 pt-6">
              <button
                type="button"
                onClick={() => setStep((prev) => Math.max(0, prev - 1))}
                disabled={!canGoBack}
                className={
                  "rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition " +
                  (canGoBack
                    ? "border border-deep text-deep hover:bg-deep hover:text-white"
                    : "border border-line text-ink/40")
                }
              >
                Précédent
              </button>
              <span className="text-xs uppercase tracking-[0.3em] text-ink/50">
                Étape {step + 1} sur {STEPS.length}
              </span>
              <button
                type="button"
                onClick={() =>
                  setStep((prev) => Math.min(STEPS.length - 1, prev + 1))
                }
                className={
                  "rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition " +
                  (canGoNext
                    ? "bg-deep text-white hover:bg-deep/90"
                    : "bg-deep/40 text-white/70")
                }
              >
                {canGoNext ? "Suivant" : "Terminé"}
              </button>
            </div>
          </div>

          {/* RESULTATS */}
          <div className="mt-8 rounded-3xl border border-line bg-white/85 p-5 shadow-[0_18px_50px_rgba(35,48,54,0.1)] sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">
                Skis proposés {technique ? `(${technique})` : ""}
              </h2>
              {recommendations.length > 0 && (
                <span className="rounded-full border border-line px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/60">
                  3 meilleurs triés taille/poids + critères
                </span>
              )}
            </div>

            {!isReady ? (
              <p className="mt-4 text-ink/60">
                Sélectionne au minimum la technique et le type de ski pour
                afficher une recommandation.
              </p>
            ) : recommendations.length === 0 ? (
              <p className="mt-4 text-ink/60">
                Aucun ski ne correspond parfaitement à ce profil pour le moment.
              </p>
            ) : (
              <div className="mt-4 space-y-4">
                {recommendations.map((rec, index) => (
                  <div
                    key={rec.ski.code}
                    className="rounded-2xl border border-line bg-white/70 p-4 shadow-[0_10px_30px_rgba(35,48,54,0.08)]"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-center">
                      <div className="flex items-center justify-center rounded-2xl border border-line bg-white/90 p-3 md:h-28 md:w-28">
                        {rec.ski.imageUrl ? (
                          <img
                            src={rec.ski.imageUrl}
                            alt={rec.ski.nom}
                            className="max-h-20 w-auto"
                          />
                        ) : (
                          <div className="text-[10px] uppercase tracking-[0.3em] text-ink/40">
                            Rossignol
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="text-xs uppercase tracking-[0.25em] text-ink/60">
                          {index === 0
                            ? "Meilleure correspondance"
                            : `Correspondance #${index + 1}`}
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-3">
                          <strong className="block text-lg">{rec.ski.nom}</strong>
                          <span className="rounded-full border border-line px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/70">
                            {rec.matchPercent}% correspondance
                          </span>
                        </div>
                        <div className="mt-1 text-sm text-ink/60">
                          {rec.ski.technique}
                          {rec.ski.prix ? ` • ${rec.ski.prix}€` : ""}
                        </div>

                        <div className="mt-3 rounded-xl border border-line/60 bg-white/80 px-3 py-2 text-xs text-ink/70">
                          <span className="uppercase tracking-[0.2em] text-[10px] text-ink/50">
                            Référence
                          </span>
                          <div className="mt-1 flex flex-wrap items-center gap-2">
                            <span className="rounded-full border border-line px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em]">
                              {rec.ski.code}
                            </span>
                            {rec.bestLength && (
                              <span className="text-[10px] uppercase tracking-[0.18em] text-ink/60">
                                Taille conseillée {rec.bestLength} cm
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {rec.ski.priorites.map((p) => (
                            <span
                              key={p}
                              className="text-[10px] uppercase tracking-[0.2em] rounded-full border border-line px-3 py-1"
                            >
                              {p}
                            </span>
                          ))}
                        </div>

                        {rec.ski.neige.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {rec.ski.neige.map((n) => (
                              <span
                                key={n}
                                className="text-[10px] uppercase tracking-[0.2em] rounded-full border border-line/70 px-3 py-1 text-ink/70"
                              >
                                Neige {n}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {rec.ski.productUrl && (
                        <a
                          href={rec.ski.productUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center rounded-full border border-deep px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-deep transition hover:bg-deep hover:text-white"
                        >
                          Voir sur Rossignol
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 rounded-2xl bg-deep/5 p-4 text-sm text-ink/70">
              V1 : filtre + scoring simple. Prochaine étape : intégration complète
              des critères terrain et des stocks.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

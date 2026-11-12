"use client";

import { useMemo, useState } from "react";
import { Space_Mono } from "next/font/google";
import {
  FORMULES,
  computeQuote,
  formatEuro,
  type DevisSelection,
} from "@/lib/devis-pricing";

const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"] });
const mono = spaceMono.className;

type ContactState = {
  name: string;
  structure: string;
  email: string;
  phone: string;
  eventDate: string;
  place: string;
  message: string;
  website: string; // honeypot
};

const INITIAL_CONTACT: ContactState = {
  name: "",
  structure: "",
  email: "",
  phone: "",
  eventDate: "",
  place: "",
  message: "",
  website: "",
};

const INITIAL_SELECTION: DevisSelection = {
  formuleId: "",
  express: false,
  licence: false,
  associatif: false,
  extraHours: 0,
  kmAllerRetour: 0,
};

const fieldClass =
  "mt-1 w-full rounded-xl border border-[rgba(237,241,243,0.14)] bg-[#0F161D] px-3.5 py-3 text-[15px] text-[#EDF1F3] outline-none transition placeholder:text-[#5C6873] focus:border-[#89A9BA] focus:ring-2 focus:ring-[#89A9BA]/25";
const labelClass = "text-[13px] font-medium text-[#C7D0D7]";

// Distances aller-retour indicatives depuis Chamonix (30 km inclus).
const DISTANCE_PRESETS = [
  { label: "Vallée de Chamonix · inclus", km: 0 },
  { label: "Genève · ~160 km", km: 160 },
  { label: "Annecy · ~200 km", km: 200 },
  { label: "Lyon · ~440 km", km: 440 },
];

export default function DevisForm() {
  const [selection, setSelection] = useState<DevisSelection>(INITIAL_SELECTION);
  const [contact, setContact] = useState<ContactState>(INITIAL_CONTACT);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ number: string; total: number } | null>(null);

  const quote = useMemo(() => computeQuote(selection), [selection]);

  const setSel = <K extends keyof DevisSelection>(key: K, value: DevisSelection[K]) =>
    setSelection((prev) => ({ ...prev, [key]: value }));
  const setField = (key: keyof ContactState, value: string) =>
    setContact((prev) => ({ ...prev, [key]: value }));

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    if (!selection.formuleId) {
      setError("Choisissez d'abord une formule.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...contact, selection }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        number?: string;
        total?: number;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Envoi impossible pour le moment.");
        return;
      }
      setSuccess({ number: data.number ?? "", total: data.total ?? quote.total });
      setContact(INITIAL_CONTACT);
      setSelection(INITIAL_SELECTION);
    } catch {
      setError("Erreur réseau. Réessayez dans un instant.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-2xl border border-[#89A9BA]/40 bg-[#121B23] p-8 text-center">
        <p className={`${mono} text-[12px] uppercase tracking-[0.2em] text-[#89A9BA]`}>
          Estimation {success.number}
        </p>
        <h2 className="mt-4 text-[clamp(1.6rem,3.5vw,2.2rem)] font-extrabold uppercase tracking-[-0.02em]">
          Merci, c&apos;est envoyé&nbsp;!
        </h2>
        <p className="mx-auto mt-4 max-w-[46ch] text-[15px] leading-[1.6] text-[#93A0AB]">
          Votre estimation à <strong className="text-[#EDF1F3]">{formatEuro(success.total)}</strong>{" "}
          vous a été envoyée par e-mail. Je reviens vers vous sous 24 h ouvrées pour
          finaliser le devis ensemble.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
      {/* Colonne gauche : sélection */}
      <div className="space-y-10">
        {/* Formules */}
        <fieldset>
          <legend className={`${mono} text-[12px] uppercase tracking-[0.2em] text-[#5C6873]`}>
            1 · Votre formule
          </legend>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {FORMULES.map((f) => {
              const active = selection.formuleId === f.id;
              return (
                <label
                  key={f.id}
                  className={`flex cursor-pointer flex-col rounded-xl border p-4 transition ${
                    active
                      ? "border-[#89A9BA] bg-[#141f29]"
                      : "border-[rgba(237,241,243,0.10)] bg-[#121B23] hover:border-[rgba(237,241,243,0.22)]"
                  }`}
                >
                  <input
                    type="radio"
                    name="formule"
                    className="sr-only"
                    checked={active}
                    onChange={() => setSel("formuleId", f.id)}
                  />
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[15px] font-extrabold uppercase tracking-[-0.01em]">
                      {f.name.split(" — ")[0]}
                    </span>
                    <span className="text-[15px] font-bold text-[#AEC8D6]">
                      {formatEuro(f.price)}
                    </span>
                  </div>
                  <span className={`${mono} mt-1 text-[10px] uppercase tracking-[0.12em] text-[#5C6873]`}>
                    {f.tag}
                  </span>
                  <span className="mt-2 text-[12.5px] leading-[1.5] text-[#93A0AB]">
                    {f.deliver}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* Options */}
        <fieldset>
          <legend className={`${mono} text-[12px] uppercase tracking-[0.2em] text-[#5C6873]`}>
            2 · Options
          </legend>
          <div className="mt-4 space-y-3">
            <OptionToggle
              checked={selection.express}
              onChange={(v) => setSel("express", v)}
              label="Livraison express — 20 photos le soir même"
              price="+100 €"
            />
            <OptionToggle
              checked={selection.licence}
              onChange={(v) => setSel("licence", v)}
              label="Licence publicité / print (ads, catalogue, affichage)"
              price="+30 %"
            />
            <OptionToggle
              checked={selection.associatif}
              onChange={(v) => setSel("associatif", v)}
              label="Tarif associatif — club / comité / association loi 1901"
              price="−15 %"
            />

            {/* Heures supplémentaires — compteur cliquable */}
            <div className="flex items-center justify-between gap-4 rounded-xl border border-[rgba(237,241,243,0.10)] bg-[#121B23] px-4 py-3">
              <div>
                <p className="text-[14px] text-[#C7D0D7]">Heures supplémentaires</p>
                <p className={`${mono} mt-0.5 text-[10px] uppercase tracking-[0.1em] text-[#5C6873]`}>
                  100 € / heure
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Retirer une heure"
                  onClick={() => setSel("extraHours", Math.max(0, (selection.extraHours || 0) - 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(237,241,243,0.2)] text-[18px] text-[#EDF1F3] transition hover:border-[#89A9BA] hover:text-[#AEC8D6]"
                >
                  −
                </button>
                <span className="w-7 text-center text-[16px] font-bold tabular-nums">
                  {selection.extraHours || 0}
                </span>
                <button
                  type="button"
                  aria-label="Ajouter une heure"
                  onClick={() => setSel("extraHours", Math.min(12, (selection.extraHours || 0) + 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(237,241,243,0.2)] text-[18px] text-[#EDF1F3] transition hover:border-[#89A9BA] hover:text-[#AEC8D6]"
                >
                  +
                </button>
              </div>
            </div>

            {/* Déplacement — aller-retour depuis Chamonix, choix cliquables */}
            <div className="rounded-xl border border-[rgba(237,241,243,0.10)] bg-[#121B23] px-4 py-3">
              <p className="text-[14px] text-[#C7D0D7]">
                Déplacement — aller-retour depuis Chamonix
              </p>
              <p className={`${mono} mt-0.5 text-[10px] uppercase tracking-[0.1em] text-[#5C6873]`}>
                30 km inclus, puis 0,50 €/km
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {DISTANCE_PRESETS.map((p) => {
                  const active = (selection.kmAllerRetour || 0) === p.km;
                  return (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => setSel("kmAllerRetour", p.km)}
                      className={`rounded-full border px-3 py-1.5 text-[12px] transition ${
                        active
                          ? "border-[#89A9BA] bg-[#89A9BA] text-[#0B1015]"
                          : "border-[rgba(237,241,243,0.2)] text-[#C7D0D7] hover:border-[#89A9BA]"
                      }`}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
              <div className="mt-3 flex items-center gap-2">
                <input
                  type="number"
                  min={0}
                  max={2000}
                  value={selection.kmAllerRetour || ""}
                  onChange={(e) => setSel("kmAllerRetour", Number(e.target.value))}
                  className="w-32 rounded-lg border border-[rgba(237,241,243,0.14)] bg-[#0F161D] px-3 py-2 text-[14px] text-[#EDF1F3] outline-none transition placeholder:text-[#5C6873] focus:border-[#89A9BA]"
                  placeholder="Autre"
                />
                <span className={`${mono} text-[11px] uppercase tracking-[0.1em] text-[#5C6873]`}>
                  km aller-retour
                </span>
              </div>
            </div>
          </div>
        </fieldset>

        {/* Coordonnées */}
        <fieldset>
          <legend className={`${mono} text-[12px] uppercase tracking-[0.2em] text-[#5C6873]`}>
            3 · Vos coordonnées
          </legend>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="name">Nom <span className="text-[#89A9BA]">*</span></label>
              <input id="name" required minLength={2} maxLength={120} value={contact.name} onChange={(e) => setField("name", e.target.value)} className={fieldClass} placeholder="Nom et prénom" />
            </div>
            <div>
              <label className={labelClass} htmlFor="structure">Structure / marque</label>
              <input id="structure" maxLength={120} value={contact.structure} onChange={(e) => setField("structure", e.target.value)} className={fieldClass} placeholder="Club, marque, événement…" />
            </div>
            <div>
              <label className={labelClass} htmlFor="email">E-mail <span className="text-[#89A9BA]">*</span></label>
              <input id="email" type="email" required maxLength={180} value={contact.email} onChange={(e) => setField("email", e.target.value)} className={fieldClass} placeholder="vous@email.com" />
            </div>
            <div>
              <label className={labelClass} htmlFor="phone">Téléphone</label>
              <input id="phone" type="tel" maxLength={40} value={contact.phone} onChange={(e) => setField("phone", e.target.value)} className={fieldClass} placeholder="+33 6 …" />
            </div>
            <div>
              <label className={labelClass} htmlFor="date">Date souhaitée</label>
              <input id="date" maxLength={60} value={contact.eventDate} onChange={(e) => setField("eventDate", e.target.value)} className={fieldClass} placeholder="ex. 14 février 2027" />
            </div>
            <div>
              <label className={labelClass} htmlFor="place">Lieu</label>
              <input id="place" maxLength={120} value={contact.place} onChange={(e) => setField("place", e.target.value)} className={fieldClass} placeholder="Chamonix, Annecy…" />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="message">Détails du projet</label>
              <textarea id="message" rows={4} maxLength={2000} value={contact.message} onChange={(e) => setField("message", e.target.value)} className={fieldClass} placeholder="Contexte, attentes, nombre de participants…" />
            </div>
            {/* Honeypot */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Site web</label>
              <input id="website" tabIndex={-1} autoComplete="off" value={contact.website} onChange={(e) => setField("website", e.target.value)} />
            </div>
          </div>
        </fieldset>
      </div>

      {/* Colonne droite : récap sticky */}
      <aside className="lg:sticky lg:top-[88px]">
        <div className="rounded-2xl border border-[rgba(237,241,243,0.12)] bg-[#121B23] p-6">
          <h2 className={`${mono} text-[12px] uppercase tracking-[0.2em] text-[#89A9BA]`}>
            Votre estimation
          </h2>
          {quote.valid ? (
            <ul className="mt-4 space-y-2.5">
              {quote.lines.map((l, i) => (
                <li key={i} className="flex items-baseline justify-between gap-3 text-[13.5px]">
                  <span className="text-[#93A0AB]">{l.label}</span>
                  <span className="shrink-0 font-semibold text-[#EDF1F3]">{formatEuro(l.amount)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-[13.5px] text-[#5C6873]">
              Sélectionnez une formule pour voir le montant.
            </p>
          )}

          <div className="mt-5 flex items-baseline justify-between border-t border-[rgba(237,241,243,0.12)] pt-4">
            <span className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#C7D0D7]">Total estimé</span>
            <span className="text-[26px] font-extrabold tracking-[-0.02em]">{formatEuro(quote.total)}</span>
          </div>
          <p className={`${mono} mt-1 text-right text-[10px] uppercase tracking-[0.1em] text-[#5C6873]`}>
            TVA non applicable · estimation
          </p>

          <button
            type="submit"
            disabled={submitting}
            className={`${mono} mt-6 w-full rounded-full bg-[#89A9BA] px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-[#0B1015] transition hover:bg-[#AEC8D6] disabled:cursor-not-allowed disabled:opacity-60`}
          >
            {submitting ? "Envoi…" : "Recevoir mon estimation par e-mail"}
          </button>
          <p className="mt-3 text-[11.5px] leading-[1.5] text-[#5C6873]">
            <strong className="font-semibold text-[#93A0AB]">Estimation indicative, pas un devis définitif.</strong>{" "}
            Le devis final vous est confirmé sous 24 h ouvrées. Remontées, hébergement et
            repas éventuels facturés au réel.
          </p>
          {error ? <p className="mt-3 text-[13px] text-[#ff9b9b]">{error}</p> : null}
        </div>
      </aside>
    </form>
  );
}

function OptionToggle({
  checked,
  onChange,
  label,
  price,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  price: string;
}) {
  return (
    <label
      className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl border px-4 py-3 transition ${
        checked
          ? "border-[#89A9BA] bg-[#141f29]"
          : "border-[rgba(237,241,243,0.10)] bg-[#121B23] hover:border-[rgba(237,241,243,0.22)]"
      }`}
    >
      <span className="flex items-center gap-3">
        <span
          className={`flex h-5 w-5 flex-none items-center justify-center rounded border transition ${
            checked ? "border-[#89A9BA] bg-[#89A9BA] text-[#0B1015]" : "border-[rgba(237,241,243,0.3)]"
          }`}
          aria-hidden="true"
        >
          {checked ? "✓" : ""}
        </span>
        <span className="text-[14px] leading-[1.4] text-[#C7D0D7]">{label}</span>
      </span>
      <span className="shrink-0 text-[14px] font-bold text-[#AEC8D6]">{price}</span>
      <input type="checkbox" className="sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    </label>
  );
}

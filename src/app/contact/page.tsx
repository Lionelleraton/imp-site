// ⚠️ AUCUN header/nav ici.
// Le seul header du site doit venir de src/app/layout.tsx via <SiteHeader />.

import type { Metadata } from "next";

const CALENDLY_URL = "https://calendly.com/lioneljouannaud";
const CALENDLY_EMBED_URL =
  "https://calendly.com/lioneljouannaud?hide_event_type_details=1&hide_gdpr_banner=1&background_color=f0f2f2&text_color=233036&primary_color=244357";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Prendre un rendez-vous pour clarifier vos besoins et activer des solutions terrain adaptées.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact",
    description:
      "Prendre un rendez-vous pour clarifier vos besoins et activer des solutions terrain adaptées.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="pb-24">
      <section className="mx-auto w-full max-w-[1400px] px-4 pt-10 sm:px-6 sm:pt-12 xl:px-10">
        <div className="grid items-start gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60 sm:text-[11px] sm:tracking-[0.3em]">
              Contact
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl md:text-6xl">
              Parlons de vos décisions terrain
            </h1>
            <p className="mt-4 max-w-md text-ink/70">
              Prends RDV afin d’identifier tes problématiques et les solutions
              que l’on peut développer ensemble.
            </p>

            <div className="mt-6 rounded-3xl border border-deep/20 bg-deep p-5 text-white shadow-[0_18px_50px_rgba(36,67,87,0.35)] sm:p-6">
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/70 sm:text-[11px] sm:tracking-[0.3em]">
                Prendre un RDV
              </p>
              <h2 className="mt-3 text-xl font-semibold sm:text-2xl">
                Réserve un créneau en 2 minutes
              </h2>
              <p className="mt-2 text-sm text-white/80">
                Clarification du besoin, démo rapide, établissement d’un plan
                d’action commun.
              </p>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-deep transition hover:-translate-y-0.5"
              >
                Prendre un RDV
              </a>
            </div>

            <div className="mt-6 rounded-3xl border border-line bg-white/80 p-5 shadow-[0_18px_50px_rgba(35,48,54,0.08)] sm:p-6">
              <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60 sm:text-[11px] sm:tracking-[0.3em]">
                Ce que vous recevez
              </p>
              <ul className="mt-3 space-y-2 text-sm text-ink/70">
                <li>
                  Un échange rapide orienté terrain et axé sur{" "}
                  <strong>votre</strong> réalité.
                </li>
                <li>Une démo ciblée selon votre structure et besoin.</li>
                <li>Un plan d’action clair pour avancer.</li>
              </ul>
            </div>

          </div>

          <div className="space-y-6">
            <form className="rounded-3xl border border-line bg-white/85 p-5 shadow-[0_22px_60px_rgba(35,48,54,0.12)] backdrop-blur sm:p-6">
            <div>
              <label className="text-sm font-medium">
                Nom <span className="text-deep">*</span>
              </label>
              <input
                type="text"
                name="name"
                autoComplete="name"
                required
                className="mt-1 w-full rounded-xl border border-line bg-white/70 px-3 py-2 text-sm outline-none transition focus:border-sky focus:ring-4 focus:ring-sky/20"
                placeholder="Ton nom"
              />
            </div>

            <div className="mt-4">
              <label className="text-sm font-medium">
                Email <span className="text-deep">*</span>
              </label>
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                className="mt-1 w-full rounded-xl border border-line bg-white/70 px-3 py-2 text-sm outline-none transition focus:border-sky focus:ring-4 focus:ring-sky/20"
                placeholder="tonmail@email.com"
              />
            </div>

            <div className="mt-4">
              <label className="text-sm font-medium">Téléphone</label>
              <input
                type="tel"
                name="phone"
                autoComplete="tel"
                className="mt-1 w-full rounded-xl border border-line bg-white/70 px-3 py-2 text-sm outline-none transition focus:border-sky focus:ring-4 focus:ring-sky/20"
                placeholder="+33 6 12 34 56 78"
              />
            </div>

            <div className="mt-4">
              <label className="text-sm font-medium">
                Message <span className="text-deep">*</span>
              </label>
              <textarea
                name="message"
                rows={6}
                required
                className="mt-1 w-full rounded-xl border border-line bg-white/70 px-3 py-2 text-sm outline-none transition focus:border-sky focus:ring-4 focus:ring-sky/20"
                placeholder="Explique ton besoin (marque, fédération, magasin, outil, choix des skis, etc.)"
              />
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-deep px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 sm:text-xs"
            >
              Envoyer
            </button>

            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">
              Réponse sous 24h
            </p>

            <p className="mt-4 text-xs text-ink/60">
              * Informations obligatoires.
            </p>
            <p className="mt-2 text-xs text-ink/60">
              (Pour l’instant, ce formulaire est visuel. Si tu veux qu’il envoie
              réellement un email / enregistre dans une base, je te le branche en
              5 minutes.)
            </p>
          </form>

          </div>
        </div>
      </section>
    </main>
  );
}

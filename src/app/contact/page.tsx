// ⚠️ AUCUN header/nav ici.
// Le seul header du site doit venir de src/app/layout.tsx via <SiteHeader />.

import type { Metadata } from "next";
import ContactForm from "./ContactForm";

const CALENDLY_URL = "https://calendly.com/lioneljouannaud";

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
              Parlons de votre projet en 15 minutes
            </h1>
            <p className="mt-4 max-w-md text-ink/70">
              Clarifiez vos objectifs, votre cible et vos priorités. On vous propose
              ensuite un plan d’action concret pour avancer vite.
            </p>

            <div className="mt-6 rounded-3xl border border-deep/20 bg-deep p-5 text-white shadow-[0_18px_50px_rgba(36,67,87,0.35)] sm:p-6">
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/70 sm:text-[11px] sm:tracking-[0.3em]">
                Réserver un appel
              </p>
              <h2 className="mt-3 text-xl font-semibold sm:text-2xl">
                Réservez un créneau en 2 minutes
              </h2>
              <p className="mt-2 text-sm text-white/80">
                Clarification du besoin, cadrage rapide et prochaines étapes claires.
              </p>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-deep transition hover:-translate-y-0.5 sm:w-auto"
              >
                Réserver un appel
              </a>
            </div>

            <div className="mt-6 rounded-3xl border border-line bg-white/80 p-5 shadow-[0_18px_50px_rgba(35,48,54,0.08)] sm:p-6">
              <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60 sm:text-[11px] sm:tracking-[0.3em]">
                Ce que vous recevez
              </p>
              <ul className="mt-3 space-y-2 text-sm text-ink/70">
                <li>
                  Un échange court, centré sur votre contexte réel.
                </li>
                <li>Des recommandations ciblées selon votre structure.</li>
                <li>Un plan d’action clair pour passer à l’exécution.</li>
              </ul>
            </div>

          </div>

          <div className="space-y-6">
            <ContactForm />

          </div>
        </div>
      </section>
    </main>
  );
}

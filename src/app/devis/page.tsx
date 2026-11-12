import type { Metadata } from "next";
import DarkChrome, { spaceMono } from "../components/DarkChrome";
import DevisForm from "../components/DevisForm";

const mono = spaceMono.className;

export const metadata: Metadata = {
  title: "Devis photo en ligne — estimez votre prestation",
  description:
    "Estimez votre devis de photographe sport, outdoor et événementiel en 1 minute : choisissez votre formule et vos options, recevez votre devis par e-mail. Chamonix, Pays du Mont-Blanc, Annecy.",
  alternates: { canonical: "/devis" },
};

export default function DevisPage() {
  return (
    <DarkChrome>
      <main className="mx-auto w-full max-w-[1100px] px-5 pb-24 pt-14 sm:px-6 sm:pt-20">
        <p className={`${mono} text-[12px] uppercase tracking-[0.26em] text-[#89A9BA]`}>
          Simulateur d&apos;estimation · sans engagement
        </p>
        <h1 className="mt-5 text-[clamp(2.2rem,6.5vw,4rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.025em] text-balance">
          Estimez votre devis
        </h1>
        <p className="mt-6 max-w-[62ch] text-[17px] leading-[1.7] text-[#93A0AB]">
          Choisissez votre formule et vos options : le montant se calcule en direct.
          Laissez vos coordonnées et recevez votre estimation par e-mail — je reviens
          vers vous sous 24 h ouvrées pour établir le devis définitif ensemble.
        </p>

        <div
          role="note"
          className="mt-7 flex items-start gap-3 rounded-xl border border-[#89A9BA]/30 bg-[#89A9BA]/10 px-4 py-3.5 text-[14px] leading-[1.55] text-[#C7D0D7]"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="mt-0.5 h-5 w-5 flex-none text-[#89A9BA]"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8h.01M11 12h1v4h1" />
          </svg>
          <span>
            <strong className="font-semibold text-[#EDF1F3]">Ceci est une estimation indicative</strong>, pas un
            devis définitif. Le montant peut varier selon les contraintes réelles (durée,
            déplacement, droits…) ; je confirme toujours le devis final avec vous avant toute réservation.
          </span>
        </div>

        <div className="mt-12">
          <DevisForm />
        </div>
      </main>
    </DarkChrome>
  );
}

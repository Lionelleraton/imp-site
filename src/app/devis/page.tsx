import type { Metadata } from "next";
import DarkChrome, { spaceMono } from "../components/DarkChrome";
import DevisForm from "../components/DevisForm";

const mono = spaceMono.className;

export const metadata: Metadata = {
  title: "Devis photo en ligne, estimez votre prestation",
  description:
    "Estimez votre devis de photographe sport, outdoor et événementiel en 1 minute : choisissez votre formule et vos options, recevez votre devis par e-mail. Chamonix, Pays du Mont-Blanc, Annecy.",
  alternates: { canonical: "/devis" },
};

export default function DevisPage() {
  return (
    <DarkChrome>
      <main className="mx-auto w-full max-w-[1300px] px-[clamp(20px,5vw,64px)] pb-24 pt-14 sm:pt-20">
        <p className={`${mono} text-[12px] uppercase tracking-[0.26em] text-[#B15F38]`}>
          Simulateur d&apos;estimation · sans engagement
        </p>
        <h1 className="mt-5 text-[clamp(2.2rem,6.5vw,4rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.025em] text-balance">
          Estimez votre devis
        </h1>
        <p className="mt-6 max-w-[62ch] text-[17px] leading-[1.7] text-[#5E655D]">
          Choisissez votre formule et vos options : le montant se calcule en direct.
          Laissez vos coordonnées et recevez votre estimation par e-mail. Je reviens
          vers vous sous 24 h ouvrées pour établir le devis définitif ensemble.
        </p>

        <div
          role="note"
          className="mt-7 flex items-start gap-3 rounded-xl border border-[#B15F38]/30 bg-[#B15F38]/10 px-4 py-3.5 text-[14px] leading-[1.55] text-[#44504A]"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="mt-0.5 h-5 w-5 flex-none text-[#B15F38]"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8h.01M11 12h1v4h1" />
          </svg>
          <span>
            <strong className="font-semibold text-[#1F2724]">Ceci est une estimation indicative</strong>, pas un
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

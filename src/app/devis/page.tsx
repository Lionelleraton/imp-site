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
          Devis en ligne · sans engagement
        </p>
        <h1 className="mt-5 text-[clamp(2.2rem,6.5vw,4rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.025em] text-balance">
          Estimez votre devis
        </h1>
        <p className="mt-6 max-w-[62ch] text-[17px] leading-[1.7] text-[#93A0AB]">
          Choisissez votre formule et vos options : le montant se calcule en direct.
          Laissez vos coordonnées et recevez votre devis par e-mail — je reviens vers
          vous sous 24 h ouvrées pour le finaliser.
        </p>

        <div className="mt-12">
          <DevisForm />
        </div>
      </main>
    </DarkChrome>
  );
}

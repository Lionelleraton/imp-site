import type { Metadata } from "next";
import Link from "next/link";
import DarkChrome, { spaceMono } from "../components/DarkChrome";

export const metadata: Metadata = {
  title: "Tarifs photographie · Saison 2026-2027",
  description:
    "Grille tarifaire photographie outdoor & événementielle (sport, montagne, marques) : formules 2h, demi-journée, journée, shooting produits et soirée de marque. Prix nets, options et conditions. Devis en ligne.",
  alternates: { canonical: "/tarifs" },
};

const mono = spaceMono.className;

type Formule = {
  name: string;
  tag: string;
  target: string;
  deliver: string;
  price: string;
  note?: string;
  featured?: boolean;
  badge?: string;
};

const formules: Formule[] = [
  {
    name: "Séance courte",
    tag: "2 h terrain",
    target: "Athlètes, clubs, petites marques",
    deliver: "30 à 40 photos retouchées · livraison sous 72 h",
    price: "300 €",
  },
  {
    name: "Demi-journée",
    tag: "Jusqu'à 4 h",
    target: "Courses, événements, marques",
    deliver: "100 à 150 photos retouchées · livraison sous 72 h",
    price: "450 €",
  },
  {
    name: "Journée",
    tag: "Jusqu'à 8 h",
    target: "Courses, campagnes, grands événements",
    deliver: "250 à 400 photos retouchées · 15 photos livrées le soir même",
    price: "750 €",
  },
  {
    name: "Shooting produits",
    tag: "Demi-journée terrain",
    target: "Marques et équipementiers outdoor",
    deliver: "Produits portés ou utilisés en action · 30 visuels retouchés",
    price: "600 €",
  },
  {
    name: "Soirée de marque",
    tag: "4 h",
    target: "Lancements, soirées partenaires, salons",
    deliver: "≈ 100 photos retouchées · livraison sous 72 h",
    price: "660 €",
    note: "Version 3 h : 540 € TTC",
  },
];

const inclus = [
  "Tri et retouche de chaque photo livrée",
  "Galerie privée en ligne, fichiers HD",
  "Droits pour votre communication : site, réseaux, presse (France, 2 ans)",
];

const options = [
  { label: "Livraison express : 20 photos envoyées le soir même", price: "100 €" },
  { label: "Heure supplémentaire : au-delà de la formule réservée", price: "100 €" },
  { label: "Licence publicité ou print (ads, catalogue, affichage)", price: "+30 %", note: "du prix de la formule" },
  { label: "Déplacement : inclus jusqu'à 30 km, puis aller-retour", price: "0,50 € / km" },
  { label: "Remontées, hébergement, repas : si la mission l'exige", price: "Au réel" },
];

const conditions = [
  {
    heading: "Réservation",
    body: "Votre date est bloquée à réception du devis signé et d'un acompte de 30 %. Le solde est réglé à la livraison des photos.",
  },
  {
    heading: "Météo",
    body: "Si la prise de vue est impossible ou dangereuse, elle est reportée sans frais dans les 3 mois.",
  },
  {
    heading: "Droits",
    body: "Tout usage au-delà de ceux prévus au devis fait l'objet d'une nouvelle licence. Crédit photo obligatoire.",
  },
];

const annulation = [
  { when: "Plus de 30 jours avant", what: "L'acompte vous est remboursé." },
  { when: "Entre 30 et 8 jours avant", what: "L'acompte de 30 % est conservé." },
  { when: "7 jours avant ou moins", what: "50 % du prix total est dû." },
];

export default function TarifsPage() {
  return (
    <DarkChrome>
      <main className="mx-auto w-full max-w-[1100px] px-5 pb-24 pt-14 sm:px-6 sm:pt-20">
        {/* Hero */}
        <p className={`${mono} text-[12px] uppercase tracking-[0.26em] text-[#B15F38]`}>
          Grille tarifaire · Saison 2026–2027 · Pays du Mont-Blanc
        </p>
        <h1 className="mt-5 text-[clamp(2.2rem,6.5vw,4rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.025em] text-balance">
          Tarifs photographie
        </h1>
        <p className="mt-6 max-w-[62ch] text-[17px] leading-[1.7] text-[#5E655D]">
          Photographie outdoor &amp; événementielle, sport, montagne et marques, du
          terrain jusqu&apos;à la soirée. Prix TTC, TVA non applicable (art. 293 B du
          CGI).
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/devis"
            className={`${mono} inline-flex items-center justify-center rounded-full bg-[#B15F38] px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-[#FBF9F3] transition hover:bg-[#C4773F]`}
          >
            Faire mon devis en ligne
          </Link>
          <Link
            href="/#contact"
            className={`${mono} inline-flex items-center justify-center rounded-full border border-[rgba(31,39,36,0.22)] px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-[#1F2724] transition hover:border-[#B15F38] hover:text-[#B15F38]`}
          >
            Me contacter
          </Link>
        </div>

        {/* Formules */}
        <section className="mt-16">
          <h2 className={`${mono} text-[12px] uppercase tracking-[0.2em] text-[#8A8475]`}>
            Les formules
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {formules.map((f) => (
              <article
                key={f.name}
                className={`flex flex-col rounded-2xl border p-6 ${
                  f.featured
                    ? "border-[#B15F38]/60 bg-[#E3DBC8]"
                    : "border-[rgba(31,39,36,0.12)] bg-[#ECE6D7]"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className={`${mono} text-[11px] uppercase tracking-[0.14em] text-[#B15F38]`}>
                    {f.tag}
                  </span>
                  {f.badge ? (
                    <span className={`${mono} rounded-full bg-[#B15F38]/15 px-2.5 py-1 text-[9px] uppercase tracking-[0.14em] text-[#B15F38]`}>
                      {f.badge}
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-3 text-[22px] font-extrabold uppercase leading-[1.05] tracking-[-0.01em]">
                  {f.name}
                </h3>
                <p className="mt-2 text-[13.5px] font-medium text-[#B15F38]">{f.target}</p>
                <p className="mt-3 flex-1 text-[14px] leading-[1.6] text-[#5E655D]">
                  {f.deliver}
                </p>
                <div className="mt-5 border-t border-[rgba(31,39,36,0.12)] pt-4">
                  <p className="text-[30px] font-extrabold leading-none tracking-[-0.02em]">
                    {f.price} <span className="text-[15px] font-semibold text-[#5E655D]">TTC</span>
                  </p>
                  {f.note ? (
                    <p className={`${mono} mt-1.5 text-[11px] uppercase tracking-[0.1em] text-[#8A8475]`}>
                      {f.note}
                    </p>
                  ) : null}
                </div>
              </article>
            ))}

            {/* Carte "inclus" intégrée à la grille */}
            <article className="flex flex-col rounded-2xl border border-[rgba(31,39,36,0.12)] bg-transparent p-6">
              <h3 className={`${mono} text-[11px] uppercase tracking-[0.16em] text-[#B15F38]`}>
                Inclus dans chaque formule
              </h3>
              <ul className="mt-4 space-y-3 text-[14px] leading-[1.55] text-[#5E655D]">
                {inclus.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-[#B15F38]" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        {/* Options */}
        <section className="mt-16">
          <h2 className={`${mono} text-[12px] uppercase tracking-[0.2em] text-[#8A8475]`}>
            Options
          </h2>
          <ul className="mt-6 divide-y divide-[rgba(31,39,36,0.08)] overflow-hidden rounded-2xl border border-[rgba(31,39,36,0.12)] bg-[#ECE6D7]">
            {options.map((opt) => (
              <li
                key={opt.label}
                className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
              >
                <span className="text-[14.5px] leading-[1.5] text-[#44504A]">{opt.label}</span>
                <span className="flex shrink-0 items-baseline gap-2">
                  <span className="text-[16px] font-bold tracking-[-0.01em]">{opt.price}</span>
                  {opt.note ? (
                    <span className={`${mono} text-[10.5px] uppercase tracking-[0.08em] text-[#8A8475]`}>
                      {opt.note}
                    </span>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Tarif associatif */}
        <section className="mt-10 rounded-2xl border border-[#B15F38]/35 bg-[#B15F38]/[0.07] p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div>
            <h2 className="text-[20px] font-extrabold uppercase tracking-[-0.01em]">
              Tarif associatif · −15 %
            </h2>
            <p className="mt-2 text-[14px] text-[#5E655D]">
              Pour les clubs, comités et associations loi 1901.
            </p>
          </div>
          <p className={`${mono} mt-4 text-[11px] uppercase tracking-[0.12em] text-[#8A8475] sm:mt-0 sm:text-right`}>
            Références&nbsp;: Terrex · Comité Mont Blanc Biathlon
          </p>
        </section>

        {/* Conditions */}
        <section className="mt-16">
          <h2 className={`${mono} text-[12px] uppercase tracking-[0.2em] text-[#8A8475]`}>
            Conditions
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {conditions.map((c) => (
              <div
                key={c.heading}
                className="rounded-2xl border border-[rgba(31,39,36,0.12)] bg-[#ECE6D7] p-5"
              >
                <h3 className="text-[16px] font-extrabold uppercase tracking-[-0.01em] text-[#1F2724]">
                  {c.heading}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.65] text-[#5E655D]">{c.body}</p>
              </div>
            ))}
            <div className="rounded-2xl border border-[rgba(31,39,36,0.12)] bg-[#ECE6D7] p-5">
              <h3 className="text-[16px] font-extrabold uppercase tracking-[-0.01em] text-[#1F2724]">
                Annulation de votre part
              </h3>
              <ul className="mt-3 space-y-2.5">
                {annulation.map((a) => (
                  <li key={a.when} className="flex items-baseline justify-between gap-4 text-[13.5px]">
                    <span className="text-[#44504A]">{a.when}</span>
                    <span className="text-right text-[#5E655D]">{a.what}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 rounded-3xl border border-[rgba(31,39,36,0.14)] bg-[#ECE6D7] p-8 text-center sm:p-12">
          <h2 className="text-[clamp(1.8rem,4vw,2.6rem)] font-extrabold uppercase leading-[1.02] tracking-[-0.02em]">
            Estimez votre devis en 1 minute
          </h2>
          <p className="mx-auto mt-4 max-w-[48ch] text-[15.5px] leading-[1.6] text-[#5E655D]">
            Choisissez votre formule et vos options, obtenez le montant, et recevez
            votre devis par e-mail, réponse sous 24 h ouvrées.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/devis"
              className={`${mono} inline-flex items-center justify-center rounded-full bg-[#B15F38] px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-[#FBF9F3] transition hover:bg-[#C4773F]`}
            >
              Faire mon devis
            </Link>
            <a
              href="tel:+33665620084"
              className={`${mono} inline-flex items-center justify-center rounded-full border border-[rgba(31,39,36,0.22)] px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-[#1F2724] transition hover:border-[#B15F38] hover:text-[#B15F38]`}
            >
              +33 6 65 62 00 84
            </a>
          </div>
        </section>
      </main>
    </DarkChrome>
  );
}

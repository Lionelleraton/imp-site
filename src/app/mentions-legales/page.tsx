import type { Metadata } from "next";
import LegalShell, { LegalSection, ToFill } from "../components/LegalShell";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site InMotion Performance : éditeur, hébergeur et informations légales obligatoires.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: true, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <LegalShell
      title="Mentions légales"
      updatedAt="17 septembre 2026"
      intro="Conformément à la loi n°2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN), voici les informations relatives à l'éditeur et à l'hébergeur du présent site."
    >
      <LegalSection heading="Éditeur du site">
        <p>Le site inmotionperformance.com est édité par&nbsp;:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Nom commercial&nbsp;: InMotion Performance</li>
          <li>
            Forme juridique&nbsp;: <ToFill>statut juridique — ex. micro-entreprise, SASU, EURL</ToFill>
          </li>
          <li>
            Responsable de la publication&nbsp;: <ToFill>nom et prénom</ToFill>
          </li>
          <li>
            Adresse&nbsp;: <ToFill>adresse postale complète</ToFill>, Chamonix-Mont-Blanc, France
          </li>
          <li>
            SIRET&nbsp;: <ToFill>numéro SIRET</ToFill>
          </li>
          <li>
            Numéro de TVA intracommunautaire&nbsp;: <ToFill>si applicable</ToFill>
          </li>
          <li>Email&nbsp;: inmotionperformance@icloud.com</li>
          <li>Téléphone&nbsp;: +33 6 65 62 00 84</li>
        </ul>
      </LegalSection>

      <LegalSection heading="Hébergeur">
        <p>Le site est hébergé par&nbsp;:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Vercel Inc.</li>
          <li>340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</li>
          <li>
            Site&nbsp;:{" "}
            <a
              href="https://vercel.com"
              className="font-medium text-deep underline underline-offset-2"
              rel="noopener noreferrer"
              target="_blank"
            >
              vercel.com
            </a>
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="Propriété intellectuelle">
        <p>
          L&apos;ensemble des contenus présents sur ce site (textes, photographies,
          visuels, logos, modélisations 3D, code) est la propriété exclusive d&apos;InMotion
          Performance ou de ses partenaires, sauf mention contraire. Toute reproduction,
          représentation, modification ou exploitation, totale ou partielle, sans
          autorisation écrite préalable est interdite et constitue une contrefaçon
          sanctionnée par le Code de la propriété intellectuelle.
        </p>
        <p>
          Les photographies affichées dans le portfolio et les galeries restent la
          propriété d&apos;InMotion Performance et ne peuvent être téléchargées ou
          réutilisées sans accord.
        </p>
      </LegalSection>

      <LegalSection heading="Responsabilité">
        <p>
          InMotion Performance s&apos;efforce d&apos;assurer l&apos;exactitude des
          informations diffusées sur ce site, sans toutefois pouvoir en garantir
          l&apos;exhaustivité. Les liens vers des sites tiers n&apos;engagent pas la
          responsabilité d&apos;InMotion Performance quant à leur contenu.
        </p>
      </LegalSection>

      <LegalSection heading="Droit applicable">
        <p>
          Les présentes mentions légales sont régies par le droit français. En cas de
          litige, et à défaut de résolution amiable, compétence est attribuée aux
          tribunaux français compétents.
        </p>
      </LegalSection>
    </LegalShell>
  );
}

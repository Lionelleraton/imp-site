import type { Metadata } from "next";
import LegalShell, { LegalSection, ToFill } from "../components/LegalShell";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Comment InMotion Performance collecte, utilise et protège vos données personnelles, conformément au RGPD.",
  alternates: { canonical: "/confidentialite" },
  robots: { index: true, follow: true },
};

export default function ConfidentialitePage() {
  return (
    <LegalShell
      title="Politique de confidentialité"
      updatedAt="17 septembre 2026"
      intro="InMotion Performance accorde une grande importance à la protection de vos données personnelles. Cette politique explique quelles données nous collectons, pourquoi, et quels sont vos droits, conformément au Règlement général sur la protection des données (RGPD) et à la loi Informatique et Libertés."
    >
      <LegalSection heading="Responsable du traitement">
        <p>
          Le responsable du traitement des données est InMotion Performance,{" "}
          <ToFill>statut juridique et adresse</ToFill>, joignable à l&apos;adresse
          inmotionperformance@icloud.com.
        </p>
      </LegalSection>

      <LegalSection heading="Données que nous collectons">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Formulaire de contact</strong>&nbsp;: nom, email, téléphone
            (facultatif) et le contenu de votre message.
          </li>
          <li>
            <strong>Galeries privées</strong>&nbsp;: le code d&apos;accès que vous
            saisissez pour consulter une galerie qui vous est destinée.
          </li>
          <li>
            <strong>Mesure d&apos;audience</strong>&nbsp;: statistiques de visite via
            Google Analytics (dépôt de cookies), collectées uniquement après votre
            consentement via le bandeau.
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="Finalités et bases légales">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Répondre à vos demandes via le formulaire de contact — base légale&nbsp;:
            votre consentement et notre intérêt légitime à traiter votre demande.
          </li>
          <li>
            Donner accès aux galeries photo qui vous concernent — base légale&nbsp;:
            exécution d&apos;une prestation.
          </li>
          <li>
            Améliorer le site grâce à des statistiques anonymes — base légale&nbsp;:
            votre consentement.
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="Destinataires et sous-traitants">
        <p>Vos données peuvent être traitées par les prestataires suivants&nbsp;:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Vercel Inc. — hébergement du site.</li>
          <li>
            Google (Google Ireland Ltd) — mesure d&apos;audience via Google Analytics,
            activée après consentement.
          </li>
          <li>
            Resend — acheminement des emails générés par le formulaire de contact.
          </li>
        </ul>
        <p>
          Nous ne vendons ni ne louons vos données personnelles à des tiers.
        </p>
      </LegalSection>

      <LegalSection heading="Durée de conservation">
        <p>
          Les demandes de contact sont conservées le temps nécessaire au traitement de
          votre demande puis, le cas échéant, pendant la durée de la relation
          commerciale, dans la limite de <ToFill>durée — ex. 3 ans</ToFill> à compter du
          dernier contact. Les statistiques de fréquentation sont anonymes et agrégées.
        </p>
      </LegalSection>

      <LegalSection heading="Cookies et traceurs">
        <p>
          Le site utilise Google Analytics pour mesurer son audience. Ce service dépose
          des cookies et n&apos;est chargé qu&apos;après votre accord via le bandeau de
          consentement&nbsp;; si vous refusez, aucun cookie de mesure d&apos;audience
          n&apos;est déposé. Vous pouvez modifier votre choix à tout moment via le lien
          «&nbsp;Gérer les cookies&nbsp;» en bas de page. Des cookies strictement
          nécessaires peuvent par ailleurs être utilisés pour sécuriser l&apos;accès aux
          galeries privées.
        </p>
      </LegalSection>

      <LegalSection heading="Vos droits">
        <p>
          Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de
          rectification, d&apos;effacement, de limitation, d&apos;opposition et de
          portabilité de vos données. Pour exercer ces droits, écrivez à
          inmotionperformance@icloud.com. Vous pouvez également introduire une
          réclamation auprès de la CNIL (
          <a
            href="https://www.cnil.fr"
            className="font-medium text-deep underline underline-offset-2"
            rel="noopener noreferrer"
            target="_blank"
          >
            www.cnil.fr
          </a>
          ).
        </p>
      </LegalSection>

      <LegalSection heading="Sécurité">
        <p>
          Nous mettons en œuvre des mesures techniques et organisationnelles adaptées
          (HTTPS, secrets stockés côté serveur, accès restreints) pour protéger vos
          données contre tout accès non autorisé.
        </p>
      </LegalSection>
    </LegalShell>
  );
}

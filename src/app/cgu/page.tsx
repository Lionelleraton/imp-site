import type { Metadata } from "next";
import LegalShell, { LegalSection } from "../components/LegalShell";

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation",
  description:
    "Conditions générales d'utilisation du site InMotion Performance : règles d'accès, propriété intellectuelle et responsabilités.",
  alternates: { canonical: "/cgu" },
  robots: { index: true, follow: true },
};

export default function CguPage() {
  return (
    <LegalShell
      title="Conditions générales d'utilisation"
      updatedAt="17 septembre 2026"
      intro="Les présentes conditions générales d'utilisation (CGU) encadrent l'accès et l'usage du site inmotionperformance.com. En naviguant sur le site, vous acceptez ces conditions."
    >
      <LegalSection heading="1. Objet">
        <p>
          Les présentes CGU définissent les modalités de mise à disposition du site et
          des services proposés par InMotion Performance (présentation des services de
          développement web/iOS, photographie, impression 3D, portfolio et galeries),
          ainsi que les conditions d&apos;utilisation par l&apos;internaute.
        </p>
      </LegalSection>

      <LegalSection heading="2. Accès au site">
        <p>
          Le site est accessible gratuitement à tout utilisateur disposant d&apos;un
          accès à Internet. Les frais liés à cet accès (matériel, connexion) sont à la
          charge de l&apos;utilisateur. InMotion Performance s&apos;efforce de maintenir
          le site accessible en continu mais ne saurait être tenue responsable des
          interruptions liées à la maintenance, à l&apos;hébergement ou à des causes
          indépendantes de sa volonté.
        </p>
      </LegalSection>

      <LegalSection heading="3. Galeries privées">
        <p>
          Certaines galeries photo sont protégées par un code d&apos;accès personnel.
          L&apos;utilisateur s&apos;engage à ne pas partager ce code ni à tenter
          d&apos;accéder à des contenus qui ne lui sont pas destinés. Les photographies
          restent la propriété d&apos;InMotion Performance&nbsp;; leur téléchargement,
          lorsqu&apos;il est proposé, est réservé au strict usage convenu avec le client.
        </p>
      </LegalSection>

      <LegalSection heading="4. Propriété intellectuelle">
        <p>
          L&apos;ensemble des éléments du site (contenus, photographies, visuels, code,
          marques) est protégé par le droit de la propriété intellectuelle et demeure la
          propriété d&apos;InMotion Performance. Toute reproduction ou réutilisation sans
          autorisation écrite est interdite.
        </p>
      </LegalSection>

      <LegalSection heading="5. Données personnelles">
        <p>
          Le traitement des données personnelles collectées via le site est détaillé
          dans notre{" "}
          <a
            href="/confidentialite"
            className="font-medium text-deep underline underline-offset-2"
          >
            politique de confidentialité
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="6. Responsabilité">
        <p>
          Les informations présentes sur le site sont fournies à titre indicatif.
          InMotion Performance ne saurait être tenue responsable d&apos;un dommage direct
          ou indirect résultant de l&apos;utilisation du site ou de l&apos;impossibilité
          d&apos;y accéder.
        </p>
      </LegalSection>

      <LegalSection heading="7. Prestations et devis">
        <p>
          Toute prestation (développement, photographie, impression 3D) fait l&apos;objet
          d&apos;un devis et, le cas échéant, de conditions contractuelles spécifiques
          distinctes des présentes CGU. Les modalités commerciales détaillées sont
          précisées au devis.
        </p>
      </LegalSection>

      <LegalSection heading="8. Modification des CGU">
        <p>
          InMotion Performance se réserve le droit de modifier les présentes CGU à tout
          moment. La version applicable est celle en vigueur à la date de votre visite.
        </p>
      </LegalSection>

      <LegalSection heading="9. Droit applicable">
        <p>
          Les présentes CGU sont soumises au droit français. Tout litige relève, à défaut
          d&apos;accord amiable, de la compétence des tribunaux français.
        </p>
      </LegalSection>
    </LegalShell>
  );
}

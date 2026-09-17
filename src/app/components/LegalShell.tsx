import Link from "next/link";
import { Archivo, Space_Mono } from "next/font/google";
import type { ReactNode } from "react";
import CookiePreferencesButton from "./CookiePreferencesButton";

// Typographie de la nouvelle DA (cf. public/home.html) : Archivo + Space Mono.
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"] });

const mono = spaceMono.className;

const legalLinks = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/cgu", label: "CGU" },
  { href: "/confidentialite", label: "Confidentialité" },
];

type LegalShellProps = {
  title: string;
  updatedAt: string;
  intro?: string;
  children: ReactNode;
};

/**
 * Habillage complet (header + contenu + footer) des pages légales,
 * calé sur la nouvelle direction artistique sombre du site (home.html).
 * Le header/footer clairs globaux sont masqués sur ces routes (cf. layout).
 */
export default function LegalShell({
  title,
  updatedAt,
  intro,
  children,
}: LegalShellProps) {
  return (
    <div className={`${archivo.className} min-h-screen bg-[#0B1015] text-[#EDF1F3]`}>
      {/* ── Header sombre ── */}
      <header className="sticky top-0 z-40 border-b border-[rgba(237,241,243,0.10)] bg-[#0B1015]/85 backdrop-blur">
        <div className="mx-auto flex h-[64px] max-w-[1000px] items-center justify-between px-5 sm:px-6">
          <Link
            href="/"
            className="text-[18px] font-extrabold uppercase tracking-[-0.01em] text-[#EDF1F3]"
          >
            InMotion<sup className="ml-0.5 text-[10px] text-[#89A9BA]">®</sup>
          </Link>
          <nav className={`${mono} hidden items-center gap-6 text-[12px] uppercase tracking-[0.13em] sm:flex`}>
            <Link href="/" className="text-[#93A0AB] transition hover:text-[#EDF1F3]">
              Accueil
            </Link>
            <Link
              href="/contact"
              className="text-[#93A0AB] transition hover:text-[#EDF1F3]"
            >
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* ── Contenu ── */}
      <section className="mx-auto w-full max-w-[820px] px-5 pb-24 pt-14 sm:px-6 sm:pt-20">
        <p className={`${mono} text-[12px] uppercase tracking-[0.26em] text-[#89A9BA]`}>
          Informations légales
        </p>
        <h1 className="mt-5 text-[clamp(2rem,6vw,3.4rem)] font-extrabold uppercase leading-[1.02] tracking-[-0.02em] text-balance">
          {title}
        </h1>
        <p className={`${mono} mt-5 text-[12px] uppercase tracking-[0.16em] text-[#5C6873]`}>
          Dernière mise à jour&nbsp;: {updatedAt}
        </p>
        {intro ? (
          <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.75] text-[#93A0AB]">
            {intro}
          </p>
        ) : null}

        <div className="mt-14 space-y-12">{children}</div>

        <div className="mt-16 border-t border-[rgba(237,241,243,0.12)] pt-8">
          <p className={`${mono} text-[13px] text-[#93A0AB]`}>
            Une question sur ce document&nbsp;?{" "}
            <Link
              href="/contact"
              className="text-[#89A9BA] underline underline-offset-4 transition hover:text-[#AEC8D6]"
            >
              Contactez-nous
            </Link>
          </p>
        </div>
      </section>

      {/* ── Footer sombre ── */}
      <footer className="border-t border-[rgba(237,241,243,0.10)] bg-[#0B1015]">
        <div className="mx-auto flex max-w-[1000px] flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-[16px] font-extrabold uppercase tracking-[-0.01em]">
              InMotion<sup className="ml-0.5 text-[9px] text-[#89A9BA]">®</sup>
            </p>
            <p className={`${mono} mt-2 text-[11px] uppercase tracking-[0.13em] text-[#5C6873]`}>
              © {new Date().getFullYear()} InMotion Performance · Chamonix Mont-Blanc
            </p>
          </div>
          <nav className={`${mono} flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] uppercase tracking-[0.13em]`}>
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#93A0AB] transition hover:text-[#EDF1F3]"
              >
                {link.label}
              </Link>
            ))}
            <CookiePreferencesButton className="uppercase tracking-[0.13em] text-[#93A0AB] transition hover:text-[#EDF1F3]" />
          </nav>
        </div>
      </footer>
    </div>
  );
}

/** Section titrée réutilisable pour le contenu légal (DA sombre). */
export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section className="legal-section">
      <h2 className="text-[clamp(1.25rem,2.6vw,1.6rem)] font-extrabold uppercase leading-[1.1] tracking-[-0.01em] text-[#EDF1F3]">
        {heading}
      </h2>
      <div className="mt-4 space-y-4 text-[15.5px] leading-[1.75] text-[#93A0AB] [&_a]:text-[#89A9BA] [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-[#AEC8D6] [&_strong]:font-semibold [&_strong]:text-[#EDF1F3] [&_li::marker]:text-[#5C6873]">
        {children}
      </div>
    </section>
  );
}

/** Marqueur visuel pour les informations que l'éditeur doit compléter. */
export function ToFill({ children }: { children: ReactNode }) {
  return (
    <mark className="rounded bg-[#89A9BA]/20 px-1.5 py-0.5 font-medium text-[#AEC8D6]">
      [À COMPLÉTER : {children}]
    </mark>
  );
}

import Link from "next/link";
import type { ReactNode } from "react";

type LegalShellProps = {
  title: string;
  updatedAt: string;
  intro?: string;
  children: ReactNode;
};

/**
 * Habillage commun aux pages légales (confidentialité, CGU, mentions légales).
 * Garde une mise en page « prose » lisible et cohérente sur tout le site.
 */
export default function LegalShell({
  title,
  updatedAt,
  intro,
  children,
}: LegalShellProps) {
  return (
    <main className="pb-24">
      <section className="mx-auto w-full max-w-[820px] px-4 pt-10 sm:px-6 sm:pt-14">
        <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60 sm:text-[11px] sm:tracking-[0.3em]">
          Informations légales
        </p>
        <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-sm text-ink/60">
          Dernière mise à jour : {updatedAt}
        </p>
        {intro ? (
          <p className="mt-6 text-base leading-relaxed text-ink/75">{intro}</p>
        ) : null}

        <div className="legal-prose mt-10 space-y-8 text-[15px] leading-relaxed text-ink/80">
          {children}
        </div>

        <div className="mt-12 border-t border-line pt-6 text-sm text-ink/60">
          <p>
            Une question sur ce document ?{" "}
            <Link
              href="/contact"
              className="font-medium text-deep underline underline-offset-2"
            >
              Contactez-nous
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}

/** Section titrée réutilisable pour le contenu légal. */
export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-ink sm:text-xl">{heading}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

/** Marqueur visuel pour les informations que l'éditeur doit compléter. */
export function ToFill({ children }: { children: ReactNode }) {
  return (
    <mark className="rounded bg-amber-100 px-1.5 py-0.5 font-medium text-amber-900">
      [À COMPLÉTER : {children}]
    </mark>
  );
}

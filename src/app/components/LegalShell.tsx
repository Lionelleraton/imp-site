import Link from "next/link";
import type { ReactNode } from "react";
import DarkChrome, { spaceMono } from "./DarkChrome";

const mono = spaceMono.className;

type LegalShellProps = {
  title: string;
  updatedAt: string;
  intro?: string;
  children: ReactNode;
};

/**
 * Pages légales (confidentialité, CGU, mentions légales) dans la DA sombre,
 * via le chrome partagé DarkChrome.
 */
export default function LegalShell({
  title,
  updatedAt,
  intro,
  children,
}: LegalShellProps) {
  return (
    <DarkChrome>
      <section className="mx-auto w-full max-w-[820px] px-5 pb-24 pt-14 sm:px-6 sm:pt-20">
        <p className={`${mono} text-[12px] uppercase tracking-[0.26em] text-[#B15F38]`}>
          Informations légales
        </p>
        <h1 className="mt-5 text-[clamp(2rem,6vw,3.4rem)] font-extrabold uppercase leading-[1.02] tracking-[-0.02em] text-balance">
          {title}
        </h1>
        <p className={`${mono} mt-5 text-[12px] uppercase tracking-[0.16em] text-[#8A8475]`}>
          Dernière mise à jour&nbsp;: {updatedAt}
        </p>
        {intro ? (
          <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.75] text-[#5E655D]">
            {intro}
          </p>
        ) : null}

        <div className="mt-14 space-y-12">{children}</div>

        <div className="mt-16 border-t border-[rgba(31,39,36,0.14)] pt-8">
          <p className={`${mono} text-[13px] text-[#5E655D]`}>
            Une question sur ce document&nbsp;?{" "}
            <Link
              href="/contact"
              className="text-[#B15F38] underline underline-offset-4 transition hover:text-[#B15F38]"
            >
              Contactez-nous
            </Link>
          </p>
        </div>
      </section>
    </DarkChrome>
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
      <h2 className="text-[clamp(1.25rem,2.6vw,1.6rem)] font-extrabold uppercase leading-[1.1] tracking-[-0.01em] text-[#1F2724]">
        {heading}
      </h2>
      <div className="mt-4 space-y-4 text-[15.5px] leading-[1.75] text-[#5E655D] [&_a]:text-[#B15F38] [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-[#B15F38] [&_strong]:font-semibold [&_strong]:text-[#1F2724] [&_li::marker]:text-[#8A8475]">
        {children}
      </div>
    </section>
  );
}

/** Marqueur visuel pour les informations que l'éditeur doit compléter. */
export function ToFill({ children }: { children: ReactNode }) {
  return (
    <mark className="rounded bg-[#B15F38]/20 px-1.5 py-0.5 font-medium text-[#B15F38]">
      [À COMPLÉTER : {children}]
    </mark>
  );
}

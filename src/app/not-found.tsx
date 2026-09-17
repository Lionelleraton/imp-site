import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page introuvable",
  description: "La page que vous cherchez n'existe pas ou a été déplacée.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-[820px] flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-deep/80">
        Erreur 404
      </p>
      <h1 className="mt-4 font-display text-5xl font-bold leading-none text-ink sm:text-7xl">
        Page introuvable
      </h1>
      <p className="mt-5 max-w-md text-base leading-relaxed text-ink/70">
        Le lien est peut-être ancien ou la page a été déplacée. Revenez à
        l&apos;accueil pour retrouver le bon chemin.
      </p>

      <Link
        href="/"
        className="mt-9 inline-flex items-center justify-center rounded-full bg-deep px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 hover:bg-deep/90 sm:text-sm"
      >
        Retour à l&apos;accueil
      </Link>

      <nav className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-ink/60">
        <Link href="/services" className="underline underline-offset-2 hover:text-deep">
          Nos services
        </Link>
        <Link href="/solutions" className="underline underline-offset-2 hover:text-deep">
          Nos solutions
        </Link>
        <Link href="/contact" className="underline underline-offset-2 hover:text-deep">
          Contact
        </Link>
      </nav>
    </main>
  );
}

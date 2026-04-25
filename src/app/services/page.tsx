// ⚠️ AUCUN header/nav ici.
// Le seul header du site doit venir de src/app/layout.tsx via <SiteHeader />.

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { readdirSync } from "fs";
import path from "path";
import ServicesExperience from "./ServicesExperience";

export const metadata: Metadata = {
  title: "Nos services",
  description:
    "Développement web/iOS, photo et 3D : des services premium, lisibles et orientés conversion pour les marques, clubs et structures sportives.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Nos services",
    description:
      "Développement web/iOS, photo et 3D : des services premium, lisibles et orientés conversion pour les marques, clubs et structures sportives.",
    url: "/services",
  },
};

export default function ServicesPage() {
  const imageRegex = /\.(png|jpe?g|webp|avif)$/i;

  const photoImages = (() => {
    try {
      const dir = path.join(process.cwd(), "public/services/photo");
      return readdirSync(dir)
        .filter((name) => !name.startsWith(".") && imageRegex.test(name))
        .sort()
        .map((name) => `/services/photo/${name}`);
    } catch {
      return [] as string[];
    }
  })();

  const heroImage = photoImages[0] ?? "/hero.jpg";

  return (
    <main className="pb-24">
      <section className="mx-auto w-full max-w-[1440px] px-4 pt-10 sm:px-6 sm:pt-12 xl:px-10">
        <div className="relative overflow-hidden rounded-[38px] border border-white/10 bg-[#081019] shadow-[0_30px_90px_rgba(8,16,25,0.45)]">
          <Image
            src={heroImage}
            alt="Direction artistique des services InMotion"
            fill
            sizes="100vw"
            className="object-cover opacity-[0.26]"
            priority
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(137,169,186,0.42),transparent_38%),radial-gradient(circle_at_88%_88%,rgba(137,169,186,0.24),transparent_45%),linear-gradient(130deg,rgba(8,16,25,0.95),rgba(11,25,38,0.82))]" />

          <div className="relative z-10 px-6 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
            <p className="text-[11px] uppercase tracking-[0.36em] text-white/55">
              Nos services
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.02] text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Des services pensés pour
              <br className="hidden md:block" />
              convertir, accélérer et décider.
            </h1>
            <p className="mt-6 max-w-2xl text-base text-white/78 sm:text-lg">
              Web, iOS, photo et 3D: chaque service est structuré pour rendre la valeur
              claire en quelques secondes et pousser naturellement à l’action.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/35 bg-transparent px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-white hover:text-ink sm:w-auto"
              >
                Réserver un appel
              </Link>
              <Link
                href="/services/photo/galerie"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/35 bg-transparent px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-white hover:text-ink sm:w-auto"
              >
                Accéder à ma galerie
              </Link>
              <Link
                href="/solutions"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/35 bg-transparent px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-white hover:text-ink sm:w-auto"
              >
                Voir les solutions
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-4 pt-6 sm:px-6 sm:pt-8 xl:px-10">
        <div className="rounded-[38px] border border-line/90 bg-white/96 p-6 shadow-[0_20px_65px_rgba(35,48,54,0.12)] sm:p-8 lg:p-10">
          <ServicesExperience photoImages={photoImages} />
        </div>
      </section>
    </main>
  );
}

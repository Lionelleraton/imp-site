import type { Metadata } from "next";
import Link from "next/link";
import GalleryAccessClient from "./GalleryAccessClient";
import { spaceMono } from "../../../components/DarkChrome";

export const metadata: Metadata = {
  title: "Accès galerie photo",
  description:
    "Accédez à votre galerie privée grâce au code fourni après la livraison.",
  alternates: {
    canonical: "/services/photo/galerie",
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
  openGraph: {
    title: "Accès galerie photo",
    description:
      "Accédez à votre galerie privée grâce au code fourni après la livraison.",
    url: "/services/photo/galerie",
  },
};

export default function GalleryAccessPage() {
  return (
    <main className="mx-auto w-full max-w-[1300px] px-[clamp(20px,5vw,64px)] pb-24 pt-14 sm:pt-20">
      <section className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-start lg:gap-20">
        <div>
          <p className={`${spaceMono.className} text-[12px] uppercase tracking-[0.26em] text-[#B15F38]`}>Espace client · Galerie privée</p>
          <h1 className="mt-5 max-w-[12ch] text-[clamp(2.2rem,6.5vw,4rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.02em]">Vos images, votre histoire.</h1>
          <p className="mt-6 max-w-[50ch] text-[17px] leading-[1.7] text-[#5E655D]">Entrez le code reçu pour retrouver votre galerie privée et télécharger vos photos en qualité maximale.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/portfolio" className={`${spaceMono.className} inline-flex items-center justify-center rounded-full border border-[#1F2724]/20 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[#1F2724] transition hover:border-[#B15F38] hover:text-[#B15F38]`}>Voir le portfolio</Link>
            <Link href="/#contact" className={`${spaceMono.className} inline-flex items-center justify-center rounded-full border border-[#1F2724]/20 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[#1F2724] transition hover:border-[#B15F38] hover:text-[#B15F38]`}>Besoin d’aide ?</Link>
          </div>
        </div>
        <div className="border-t border-[#1F2724]/20 pt-6 lg:mt-1">
          <p className={`${spaceMono.className} text-[11px] uppercase tracking-[0.2em] text-[#B15F38]`}>01 / Accéder à ma galerie</p>
          <GalleryAccessClient />
        </div>
      </section>
    </main>
  );
}

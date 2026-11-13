import type { Metadata } from "next";
import Link from "next/link";
import DarkChrome, { spaceMono } from "../components/DarkChrome";
import PortfolioGrid from "./PortfolioGrid";
import { PORTFOLIO, PORTFOLIO_CATEGORIES } from "@/data/portfolio";
import { SITE_URL } from "../site-url";

const mono = spaceMono.className;

export const metadata: Metadata = {
  title: "Portfolio photographe sport, outdoor et événementiel",
  description:
    "Portfolio de Lionel Jouannaud, photographe sport, outdoor et événementiel à Chamonix, dans le Pays du Mont-Blanc et à Annecy : trail, UTMB, ski, biathlon, marques outdoor et paysages de montagne.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Portfolio photo sport, outdoor et événementiel | InMotion Performance",
    description:
      "Trail, courses, ski, événements de marque et montagne : une sélection de photos prises à Chamonix, dans le Pays du Mont-Blanc et à Annecy.",
    url: "/portfolio",
    type: "website",
    images: [{ url: "/imp-images/hero-champions.jpg", width: 2000, height: 1125 }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: "Portfolio InMotion Performance",
  description:
    "Photographie de sport, d'outdoor et d'événementiel à Chamonix, dans le Pays du Mont-Blanc et à Annecy.",
  url: `${SITE_URL}/portfolio`,
  author: { "@type": "Person", name: "Lionel Jouannaud" },
  image: PORTFOLIO.map((p) => ({
    "@type": "ImageObject",
    contentUrl: `${SITE_URL}${p.src}`,
    name: p.title,
    contentLocation: p.place,
    creator: { "@type": "Person", name: "Lionel Jouannaud" },
    creditText: "Lionel Jouannaud, InMotion Performance",
  })),
};

export default function PortfolioPage() {
  return (
    <DarkChrome>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="mx-auto w-full max-w-[1200px] px-5 pb-24 pt-14 sm:px-6 sm:pt-20">
        <p className={`${mono} text-[12px] uppercase tracking-[0.26em] text-[#B15F38]`}>
          Sport · Outdoor · Événementiel
        </p>
        <h1 className="mt-5 text-[clamp(2.4rem,7vw,4.4rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.025em]">
          Portfolio
        </h1>
        <div className="mt-6 grid gap-4 text-[16.5px] leading-[1.7] text-[#5E655D] lg:grid-cols-2 lg:gap-10">
          <p>
            Une sélection de photos prises sur le terrain, au plus près de l&apos;action :
            trail et courses comme l&apos;UTMB, ski, biathlon, soirées et lancements de marque,
            portraits d&apos;athlètes et grands paysages du massif du Mont-Blanc.
          </p>
          <p>
            Basé entre Chamonix et Annecy, j&apos;interviens dans tout le Pays du Mont-Blanc et en
            Haute-Savoie pour les athlètes, les clubs, les organisateurs d&apos;événements et les
            marques outdoor.
          </p>
        </div>

        <div className="mt-12">
          <PortfolioGrid photos={PORTFOLIO} categories={PORTFOLIO_CATEGORIES} monoClass={mono} />
        </div>

        <section className="mt-16 rounded-3xl border border-[rgba(31,39,36,0.14)] bg-[#ECE6D7] p-8 text-center sm:p-12">
          <h2 className="text-[clamp(1.7rem,4vw,2.5rem)] font-extrabold uppercase leading-[1.02] tracking-[-0.02em]">
            Un projet photo ?
          </h2>
          <p className="mx-auto mt-4 max-w-[48ch] text-[15.5px] leading-[1.6] text-[#5E655D]">
            Course, événement, marque ou shooting produits : estimez votre devis en une minute
            ou écrivez-moi directement.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/devis"
              className={`${mono} inline-flex items-center justify-center rounded-full bg-[#B15F38] px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-[#FBF9F3] transition hover:bg-[#C4773F]`}
            >
              Faire mon devis
            </Link>
            <Link
              href="/#contact"
              className={`${mono} inline-flex items-center justify-center rounded-full border border-[rgba(31,39,36,0.22)] px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-[#1F2724] transition hover:border-[#B15F38] hover:text-[#B15F38]`}
            >
              Me contacter
            </Link>
          </div>
        </section>
      </main>
    </DarkChrome>
  );
}

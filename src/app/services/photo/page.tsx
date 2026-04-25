import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Service photo — InMotion Performance",
  description:
    "Couverture photo terrain, shooting sport et événement. Sony A7C, A7 IV, 70-200 G Master — des images nettes, exploitables immédiatement.",
  alternates: { canonical: "/services/photo" },
  openGraph: {
    title: "Service photo — InMotion Performance",
    description:
      "Couverture photo terrain, shooting sport et événement. Sony A7C, A7 IV, 70-200 G Master — des images nettes, exploitables immédiatement.",
    url: "/services/photo",
  },
};

const equipment = [
  {
    id: "sony-a7c",
    name: "Sony A7C",
    category: "Corps d'appareil",
    detail: "24 Mpx · Plein format",
    image: "/equipment/sony-a7c-photo.jpg",
    href: "https://www.sony.fr/interchangeable-lens-cameras/products/ilce-7c",
  },
  {
    id: "sony-a7iv",
    name: "Sony A7 IV",
    category: "Corps d'appareil",
    detail: "33 Mpx · Plein format",
    image: "/equipment/sony-a7iv-photo.jpg",
    href: "https://www.sony.fr/interchangeable-lens-cameras/products/ilce-7m4",
  },
  {
    id: "sony-70-200",
    name: "70–200 G Master",
    category: "Téléobjectif",
    detail: "f/2.8 · OSS · SEL70200GM",
    image: "/equipment/sony-70-200-photo.jpg",
    href: "https://www.sony.fr/lenses/products/sel70200gm",
  },
  {
    id: "sony-24-105",
    name: "24–105 F4 FE",
    category: "Zoom polyvalent",
    detail: "f/4 · G Lens · SEL24105G",
    image: "/equipment/sony-24-105-photo.jpg",
    href: "https://www.sony.fr/lenses/products/sel24105g",
  },
  {
    id: "sony-16-35",
    name: "16–35 G Master",
    category: "Grand angle",
    detail: "f/2.8 · G Master · SEL1635GM",
    image: "/equipment/sony-16-35-photo.jpg",
    href: "https://www.sony.fr/lenses/products/sel1635gm",
  },
];

const deliverables = [
  "Sélection éditée et cohérente après chaque session",
  "Traitement colorimétrique soigné, prêt à publier",
  "Photos optimisées web et print (formats multiples)",
  "Galerie privée livrée avec accès code client",
  "Formats adaptés réseaux, sponsors et partenaires",
];

const steps = [
  { step: "01", label: "Brief", desc: "Objectifs, moments clés, ambiance souhaitée." },
  { step: "02", label: "Production", desc: "Couverture terrain discrète et efficace." },
  { step: "03", label: "Sélection", desc: "Tri éditorial rigoureux, aucune photo inutile." },
  { step: "04", label: "Livraison", desc: "Galerie en ligne, téléchargement immédiat." },
];

const portfolioPreview = [
  {
    src: "/services/photo/24-DSC03738.JPG",
    alt: "Athlète en action en montagne",
  },
  {
    src: "/services/photo/50-DSC03630.JPG",
    alt: "Scène de course nordique",
  },
  {
    src: "/services/photo/51-DSC03624.JPG",
    alt: "Portrait terrain sportif",
  },
];

export default function ServicesPhotoPage() {
  const heroImage = "/services/photo/24-DSC03738.JPG";

  return (
    <main className="pb-24">

      {/* ── Hero dark ── */}
      <section className="mx-auto w-full max-w-[1440px] px-4 pt-8 sm:px-6 sm:pt-10 xl:px-10">
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#081019]" style={{ minHeight: 520 }}>
          <Image
            src={heroImage}
            alt="Service photo InMotion Performance"
            fill
            sizes="100vw"
            className="object-cover opacity-[0.32]"
            priority
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(137,169,186,0.38),transparent_38%),radial-gradient(circle_at_85%_80%,rgba(137,169,186,0.18),transparent_40%),linear-gradient(140deg,rgba(8,16,25,0.96),rgba(11,25,38,0.78))]" />

          <div className="relative z-10 flex flex-col justify-between gap-12 px-8 py-12 sm:px-12 sm:py-16 lg:flex-row lg:items-start lg:px-14 lg:py-20">
            <div className="max-w-2xl lg:-mt-2">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/72 sm:text-base">
                Service photo
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-[1.0] text-white sm:text-5xl lg:text-6xl">
                Des images terrain
                <br />
                <span className="text-sky">qui servent</span> vraiment.
              </h1>
              <p className="mt-5 max-w-xl text-base text-white/65 sm:text-lg">
                Couverture photo sport, événement et portrait. Un regard affûté, du
                matériel Sony haut de gamme et une livraison claire en galerie
                privée, prête à diffuser.
              </p>
            </div>

            <div className="flex flex-col gap-3 lg:mt-4 lg:self-end lg:items-end lg:text-right">
              <div className="grid grid-cols-3 gap-4 lg:grid-cols-1 lg:text-right">
                {[
                  { value: "2", label: "Boîtiers plein format" },
                  { value: "3", label: "Optiques G Master / G" },
                  { value: "Workflow Pro", label: "Méthode terrain éprouvée" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-bold text-white sm:text-3xl">{stat.value}</p>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3 lg:mt-10 lg:justify-end">
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Deliverables + Process ── */}
      <section className="mx-auto w-full max-w-[1440px] px-4 pt-6 sm:px-6 xl:px-10">
        <div className="grid gap-4 lg:grid-cols-2">

          {/* Deliverables */}
          <div className="rounded-[28px] border border-line bg-white p-6 shadow-[0_14px_42px_rgba(35,48,54,0.09)] sm:p-8">
            <p className="text-[10px] uppercase tracking-[0.28em] text-ink/50">Ce que vous recevez</p>
            <h2 className="mt-3 text-xl font-bold text-ink sm:text-2xl">Des livrables concrets</h2>
            <ul className="mt-5 space-y-4">
              {deliverables.map((line) => (
                <li key={line} className="flex items-start gap-3 text-base leading-relaxed text-ink/70">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky/20 text-xs font-bold text-deep">✓</span>
                  {line}
                </li>
              ))}
            </ul>
          </div>

          {/* Process */}
          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#081019] p-6 shadow-[0_14px_42px_rgba(8,16,25,0.3)] sm:p-8">
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/45">Comment ça marche</p>
            <h2 className="mt-3 text-xl font-bold text-white sm:text-2xl">4 étapes, zéro friction</h2>
            <div className="mt-5 space-y-3">
              {steps.map((step) => (
                <div
                  key={step.step}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                >
                  <span className="mt-0.5 text-[11px] font-bold tabular-nums text-sky/70">{step.step}</span>
                  <div>
                    <p className="text-sm font-semibold text-white">{step.label}</p>
                    <p className="text-xs text-white/55">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Matériel ── */}
      <section className="mx-auto w-full max-w-[1440px] px-4 pt-6 sm:px-6 xl:px-10">
        <div className="rounded-[28px] border border-line bg-white p-6 shadow-[0_14px_42px_rgba(35,48,54,0.09)] sm:p-8">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-ink/50">Matériel Sony</p>
              <h2 className="mt-2 text-2xl font-bold text-ink sm:text-[2rem]">
                Équipement disponible
              </h2>
            </div>
            <p className="hidden text-xs text-ink/40 sm:block">Cliquez sur un produit pour voir la fiche Sony</p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {equipment.map((item) => (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-3xl border border-line transition hover:-translate-y-1 hover:border-sky/40 hover:shadow-[0_16px_40px_rgba(35,48,54,0.14)]"
              >
                <div className="flex h-44 items-center justify-center overflow-hidden bg-[#0b1622] sm:h-48">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={240}
                    height={180}
                    className={`h-full w-full object-contain transition duration-500 group-hover:scale-[1.08] ${
                      item.id === "sony-70-200" ? "p-1 sm:p-2" : "p-2 sm:p-3"
                    }`}
                  />
                </div>
                <div className="border-t border-line/80 bg-white p-4 sm:p-5">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-ink/40">
                    {item.category}
                  </p>
                  <p className="mt-1 text-base font-bold text-ink">{item.name}</p>
                  <p className="mt-1 text-xs text-ink/45">{item.detail}</p>
                  <p className="mt-3 text-[11px] font-semibold text-deep/55 transition group-hover:text-deep">
                    Voir sur sony.fr →
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-4 pt-6 sm:px-6 xl:px-10">
        <div className="rounded-[28px] border border-line bg-white p-6 shadow-[0_14px_42px_rgba(35,48,54,0.09)] sm:p-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-ink/50">Portfolio</p>
              <h2 className="mt-2 text-xl font-bold text-ink sm:text-2xl">Quelques exemples terrain</h2>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/services/photo/galerie"
                className="inline-flex w-full items-center justify-center rounded-full border border-deep/20 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-deep transition hover:bg-deep/5 sm:w-auto"
              >
                Voir la galerie complète
              </Link>
              <Link
                href="/services"
                className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/40 transition hover:text-ink"
              >
                Voir tous les services
              </Link>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioPreview.map((photo, index) => (
              <div
                key={photo.src}
                className={`group relative overflow-hidden rounded-2xl border border-line bg-[#0b1622] ${
                  index === 0 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="relative h-56 sm:h-64">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081019]/70 via-transparent to-transparent" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}

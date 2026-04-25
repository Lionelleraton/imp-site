"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type ServiceId = "webios" | "photo" | "threed";

type PhotoEquipment = {
  id: string;
  name: string;
  category: string;
  image: string;
  href: string;
};

const PHOTO_EQUIPMENT: PhotoEquipment[] = [
  {
    id: "sony-a7c",
    name: "Sony A7C",
    category: "Corps d'appareil",
    image: "/equipment/sony-a7c-photo.jpg",
    href: "https://www.sony.fr/interchangeable-lens-cameras/products/ilce-7c",
  },
  {
    id: "sony-a7iv",
    name: "Sony A7 IV",
    category: "Corps d'appareil",
    image: "/equipment/sony-a7iv-photo.jpg",
    href: "https://www.sony.fr/interchangeable-lens-cameras/products/ilce-7m4",
  },
  {
    id: "sony-70-200",
    name: "70–200 G Master",
    category: "Téléobjectif",
    image: "/equipment/sony-70-200-photo.jpg",
    href: "https://www.sony.fr/lenses/products/sel70200gm",
  },
  {
    id: "sony-24-105",
    name: "24–105 F4 FE",
    category: "Zoom polyvalent",
    image: "/equipment/sony-24-105-photo.jpg",
    href: "https://www.sony.fr/lenses/products/sel24105g",
  },
  {
    id: "sony-16-35",
    name: "16–35 f/2.8 G Master",
    category: "Grand angle",
    image: "/equipment/sony-16-35-photo.jpg",
    href: "https://www.sony.fr/lenses/products/sel1635gm",
  },
];

type Service = {
  id: ServiceId;
  title: string;
  subtitle: string;
  headline: string;
  description: string;
  deliverables: string[];
  process: string[];
  equipmentTitle: string;
  equipment: string[];
  ctaHref: string;
  ctaLabel: string;
};

const SERVICE_DATA: Service[] = [
  {
    id: "webios",
    title: "Web & iOS",
    subtitle: "Développement d’applications",
    headline: "Des applications web et iOS qui font gagner du temps et transforment l’usage",
    description:
      "On transforme votre besoin en produit digital clair, rapide et orienté résultats. Chaque écran guide l’utilisateur vers la prochaine action utile.",
    deliverables: [
      "Landing pages premium avec structure conversion",
      "Applications iOS pour usages terrain",
      "Architecture claire et évolutive",
    ],
    process: [
      "Brief stratégique : objectifs, cible, positionnement",
      "Conception UX/UI : maquettes + hiérarchie des écrans",
      "Développement, tests, mise en ligne et suivi",
    ],
    equipmentTitle: "Stack de production",
    equipment: ["Next.js", "iOS natif", "SEO technique"],
    ctaHref: "/services/web",
    ctaLabel: "Découvrir Web & iOS",
  },
  {
    id: "photo",
    title: "Photos",
    subtitle: "Portfolio & matériel photo",
    headline: "Un service photo premium pour valoriser vos univers et vos produits",
    description:
      "Direction artistique, production terrain et tri éditorial: un rendu net, cohérent et prêt à publier pour vos clients, partenaires et sponsors.",
    deliverables: [
      "Shooting terrain, événement et portrait",
      "Tri éditorial + traitement colorimétrique",
      "Galeries clients privées par code d’accès",
    ],
    process: [
      "Brief style et intentions de rendu",
      "Production terrain avec sélection en continu",
      "Livraison en galerie et export final",
    ],
    equipmentTitle: "Matériel photo disponible",
    equipment: ["Boîtier principal", "Zoom polyvalent", "Téléobjectif"],
    ctaHref: "/services/photo",
    ctaLabel: "Découvrir le service photo",
  },
  {
    id: "threed",
    title: "Service 3D",
    subtitle: "Impression & prototypage",
    headline: "Impression 3D pour reproduire, tester et valider vos pièces",
    description:
      "Du prototype rapide à la pièce fonctionnelle, on avance par itérations courtes pour valider vite, corriger vite et sécuriser vos décisions.",
    deliverables: [
      "Reproduction de pièces existantes",
      "Prototypes de validation rapide",
      "Impressions 3D pour tests terrain",
    ],
    process: [
      "Analyse du besoin et contraintes d'usage",
      "Préparation du modèle et tests d'impression",
      "Itérations rapides jusqu'à validation",
    ],
    equipmentTitle: "Capacités 3D disponibles",
    equipment: ["Prototype rapide", "Reproduction de pièce", "Ajustements techniques"],
    ctaHref: "/services/3d",
    ctaLabel: "Découvrir l’impression 3D",
  },
];

const PHOTO_SHOWCASE_LAYOUT = [
  "col-span-2 row-span-1 sm:col-span-3 sm:row-span-2",
  "col-span-1 row-span-1 sm:col-span-2 sm:row-span-2",
  "col-span-1 row-span-1 sm:col-span-1 sm:row-span-2",
  "col-span-1 row-span-1 sm:col-span-2 sm:row-span-2",
  "col-span-1 row-span-1 sm:col-span-2 sm:row-span-2",
  "col-span-2 row-span-1 sm:col-span-2 sm:row-span-2",
];

const PHOTO_SHOWCASE_METRICS = [
  { value: "Terrain", label: "Conditions réelles" },
  { value: "Édito", label: "Sélection soignée" },
  { value: "Rapide", label: "Livraison galerie" },
];

const WEB_APP_SHOWCASE = [
  {
    id: "skitrack",
    title: "SkiTrack",
    subtitle: "Application terrain",
    description: "Saisie rapide des tests, analyse immédiate et décision staff.",
    image: "/services/biathlon-pour.jpg",
    href: "/skitrack",
  },
  {
    id: "inmotion-facture",
    title: "InMotion Facture",
    subtitle: "Application business",
    description: "Factures, suivi client et pilotage simplifié en un seul outil.",
    image: "/hero-home.jpg",
    href: "/services/web",
  },
];

type ServicesExperienceProps = {
  photoImages: string[];
};

function fallbackImages(images: string[]): string[] {
  const backups = [
    "/hero.jpg",
    "/hero-home.jpg",
    "/DSC05240.ARW.png",
    "/services/photo/24-DSC03738.JPG",
    "/services/photo/50-DSC03630.JPG",
    "/services/photo/51-DSC03624.JPG",
  ];

  return [...images, ...backups].filter(Boolean);
}

function cycle<T>(arr: T[]): T[] {
  return [...arr, ...arr];
}

function byId(id: ServiceId): Service {
  return SERVICE_DATA.find((item) => item.id === id) ?? SERVICE_DATA[0];
}

export default function ServicesExperience({ photoImages }: ServicesExperienceProps) {
  const [active, setActive] = useState<ServiceId>("webios");

  const allPhotos = useMemo(() => fallbackImages(photoImages), [photoImages]);

  const visuals = useMemo(() => {
    const pick = (index: number) => allPhotos[index % allPhotos.length];

    return {
      webios: ["/hero-home.jpg", "/services/solutionwebios.jpg", "/services/biathlon-pour.jpg", "/hero-home.jpg"],
      photo: [
        "/services/photo/24-DSC03738.JPG",
        pick(0),
        pick(1),
        pick(2),
        pick(3),
        pick(4),
        pick(5),
        pick(6),
      ],
      threed: ["/services/3d-print.jpg", "/services/3d-print.jpg", "/services/3d-print.jpg", "/services/3d-print.jpg", "/services/3d-print.jpg", "/services/3d-print.jpg"],
    };
  }, [allPhotos]);

  const current = byId(active);

  return (
    <div className="space-y-9 sm:space-y-11">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-[10px] uppercase tracking-[0.28em] text-ink/55 sm:text-[11px] sm:tracking-[0.33em]">
          Choisissez votre levier
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl lg:text-5xl">
          Des services conçus pour convertir et faire avancer vos décisions
        </h2>
        <p className="mt-4 text-ink/65">
          Chaque offre est construite avec une promesse claire, des livrables concrets
          et un CTA direct pour passer à l’étape suivante.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {SERVICE_DATA.map((service) => {
          const selected = active === service.id;
          const image =
            service.id === "webios"
              ? "/hero-home.jpg"
              : service.id === "photo"
                ? "/services/photo/24-DSC03738.JPG"
                : "/services/3d-print.jpg";

          return (
            <button
              key={service.id}
              type="button"
              onClick={() => setActive(service.id)}
              className={`group relative overflow-hidden rounded-[28px] border text-left transition-all duration-300 ${
                selected
                  ? "border-deep bg-deep text-white shadow-[0_28px_65px_rgba(36,67,87,0.3)]"
                  : "border-line bg-white shadow-[0_12px_30px_rgba(35,48,54,0.1)] hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(35,48,54,0.18)]"
              }`}
            >
              <div className="relative h-44 sm:h-48">
                <Image
                  src={image}
                  alt={service.title}
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className={`object-cover transition duration-500 ${selected ? "opacity-[0.55]" : "group-hover:scale-[1.05]"}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1d2a]/80 via-[#0f1d2a]/20 to-transparent" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className={`text-[10px] uppercase tracking-[0.24em] ${selected ? "text-white/75" : "text-white/70"}`}>
                  {service.subtitle}
                </p>
                <h3 className="mt-1 text-xl font-semibold text-white">{service.title}</h3>
              </div>
            </button>
          );
        })}
      </div>

      <section className="relative overflow-hidden rounded-[34px] border border-white/8 bg-[#081019] p-5 sm:p-7 lg:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_15%,rgba(137,169,186,0.35),transparent_30%),radial-gradient(circle_at_86%_84%,rgba(137,169,186,0.22),transparent_37%),linear-gradient(120deg,rgba(8,16,25,0.94),rgba(11,24,36,0.88))]" />

        <div key={active} className="animate-reveal relative z-10 grid gap-6 xl:items-start xl:grid-cols-[1fr_1fr]">
          <div className="rounded-[28px] border border-white/12 bg-white/[0.03] p-5 backdrop-blur sm:p-7">
            <p className="text-[10px] uppercase tracking-[0.26em] text-white/60 sm:text-[11px] sm:tracking-[0.32em]">
              {current.title}
            </p>
            <h3 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.025em] text-white sm:text-4xl">
              {current.headline}
            </h3>
            <p className="mt-4 text-white/75">{current.description}</p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={current.ctaHref}
                className="inline-flex w-full items-center justify-center rounded-full border border-white/40 bg-transparent px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-ink sm:w-auto"
              >
                {current.ctaLabel}
              </Link>
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/40 bg-transparent px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-ink sm:w-auto"
              >
                Réserver un appel
              </Link>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/12 bg-white/[0.03] p-4 backdrop-blur sm:p-5">
            {active === "photo" ? (
              <div className="space-y-3">
                <div className="relative h-[340px] overflow-hidden rounded-2xl border border-white/16 p-2 sm:h-[390px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/18 via-white/[0.04] to-transparent" />
                  <div className="relative grid h-full grid-cols-2 grid-rows-3 gap-2 sm:grid-cols-6 sm:grid-rows-4">
                    {visuals.photo.slice(0, 6).map((src, index) => (
                      <div
                        key={`${src}-photo-mosaic-${index}`}
                        className={`group relative overflow-hidden rounded-xl border border-white/20 ${PHOTO_SHOWCASE_LAYOUT[index] ?? "col-span-1 row-span-1"}`}
                      >
                        <Image
                          src={src}
                          alt={`Portfolio ${index + 1}`}
                          fill
                          sizes="(min-width: 640px) 33vw, 50vw"
                          className="object-cover transition duration-500 group-hover:scale-[1.05]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1420]/55 via-transparent to-transparent" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {PHOTO_SHOWCASE_METRICS.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-xl border border-white/16 bg-white/[0.08] px-3 py-2.5 text-center backdrop-blur"
                    >
                      <p className="text-sm font-semibold text-white">{metric.value}</p>
                      <p className="text-[10px] uppercase tracking-[0.16em] text-white/65">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {active === "webios" ? (
              <div className="relative h-[360px] overflow-hidden rounded-2xl border border-white/16">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/[0.04] to-transparent" />

                <div className="relative z-10 grid h-full gap-3 p-3 sm:grid-cols-2 sm:p-4">
                  {WEB_APP_SHOWCASE.map((app) => (
                    <Link
                      key={app.id}
                      href={app.href}
                      className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/8"
                    >
                      <Image
                        src={app.image}
                        alt={app.title}
                        fill
                        sizes="(min-width: 640px) 26vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#091421]/88 via-[#091421]/35 to-transparent" />

                      <div className="absolute inset-x-0 bottom-0 p-4">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/70">
                          {app.subtitle}
                        </p>
                        <p className="mt-1 text-lg font-semibold text-white">{app.title}</p>
                        <p className="mt-2 text-xs leading-relaxed text-white/78">{app.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="absolute bottom-4 left-4 rounded-full border border-white/30 bg-white/12 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white">
                  Applications en action
                </div>
              </div>
            ) : null}

            {active === "threed" ? (
              <div className="relative h-[360px] overflow-hidden rounded-2xl border border-white/16">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/7 to-transparent" />

                <div className="service-strip mt-6">
                  {cycle(visuals.threed).map((src, index) => (
                    <div
                      key={`${src}-3d-top-${index}`}
                      className="relative h-32 w-44 shrink-0 overflow-hidden rounded-xl border border-white/20"
                    >
                      <Image src={src} alt={`Rendu 3D ${index + 1}`} fill sizes="176px" className="object-cover" />
                    </div>
                  ))}
                </div>

                <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/16 bg-white/10 p-4 backdrop-blur">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/70">Impression 3D</p>
                  <p className="mt-1 text-lg font-semibold text-white">Pièces, reproduction et prototypage rapide</p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-3">
        <article className="rounded-3xl border border-line bg-white p-5 shadow-[0_10px_28px_rgba(35,48,54,0.09)] sm:p-6">
          <p className="text-[10px] uppercase tracking-[0.22em] text-ink/55">Ce que nous livrons</p>
          <ul className="mt-3 space-y-2 text-sm text-ink/75">
            {current.deliverables.map((line) => (
              <li key={line}>• {line}</li>
            ))}
          </ul>
        </article>

        <article className="rounded-3xl border border-line bg-white p-5 shadow-[0_10px_28px_rgba(35,48,54,0.09)] sm:p-6">
          <p className="text-[10px] uppercase tracking-[0.22em] text-ink/55">Process en 3 étapes</p>
          <ol className="mt-3 space-y-2 text-sm text-ink/75">
            {current.process.map((line, index) => (
              <li key={line}>
                {index + 1}. {line}
              </li>
            ))}
          </ol>
        </article>

        <article className="rounded-3xl border border-line bg-white p-5 shadow-[0_10px_28px_rgba(35,48,54,0.09)] sm:p-6">
          <p className="text-[10px] uppercase tracking-[0.22em] text-ink/55">{current.equipmentTitle}</p>
          <ul className="mt-3 space-y-2 text-sm text-ink/75">
            {current.equipment.map((line) => (
              <li key={line}>• {line}</li>
            ))}
          </ul>
          <Link
            href={active === "photo" ? "/services/photo/galerie" : current.ctaHref}
            className="mt-5 inline-flex items-center justify-center rounded-full border border-deep/30 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.19em] text-deep transition hover:bg-deep/5"
          >
            {active === "photo" ? "Voir la galerie" : "Voir le service"}
          </Link>
        </article>
      </div>

      {active === "photo" && (
        <section>
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-ink/55 sm:text-[11px]">
                Matériel
              </p>
              <h3 className="mt-1 text-xl font-semibold tracking-[-0.02em] text-ink sm:text-2xl">
                Équipement Sony disponible
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {PHOTO_EQUIPMENT.map((item) => (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-3xl border border-line bg-white shadow-[0_8px_22px_rgba(35,48,54,0.08)] transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(35,48,54,0.14)]"
              >
                <div className="relative flex h-36 items-center justify-center overflow-hidden bg-[#f4f5f6] sm:h-40">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                    className="object-contain p-4 transition duration-500 group-hover:scale-[1.06]"
                  />
                </div>
                <div className="p-3.5 sm:p-4">
                  <p className="text-[9px] uppercase tracking-[0.22em] text-ink/45 sm:text-[10px]">
                    {item.category}
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-ink sm:text-[15px]">
                    {item.name}
                  </p>
                  <p className="mt-1 text-[10px] text-deep/60 transition group-hover:text-deep">
                    Voir sur Sony →
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      <style jsx>{`
        .service-strip {
          display: flex;
          gap: 0.75rem;
          width: max-content;
          animation: slideLeft 24s linear infinite;
        }

        .service-strip.reverse {
          animation-name: slideRight;
        }

        @keyframes slideLeft {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes slideRight {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

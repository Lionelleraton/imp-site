import Image from "next/image";
import Link from "next/link";

const features = [
  {
    label: "Développement",
    description: "Apps web et iOS pour gagner du temps, piloter vos chiffres clés et déclencher l’action.",
    href: "/services/web",
    cta: "Découvrir Web & iOS",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="h-5 w-5">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Photographie",
    description: "Images premium pour valoriser vos produits, rassurer vos clients et renforcer votre image.",
    href: "/services/photo",
    cta: "Découvrir la photo",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="h-5 w-5">
        <rect x="2" y="7" width="20" height="14" rx="2.5" />
        <circle cx="12" cy="14" r="3.5" />
        <path d="M8.5 7 10 4.5h4L15.5 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Impression / modélisation 3D",
    description: "Impression et modélisation 3D pour reproduire des pièces et prototyper vite sur le terrain.",
    href: "/services/3d",
    cta: "Découvrir l’impression 3D",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="h-5 w-5">
        <path d="M12 2 2 7l10 5 10-5-10-5z" strokeLinejoin="round" />
        <path d="M2 17l10 5 10-5" strokeLinecap="round" />
        <path d="M2 12l10 5 10-5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Solutions",
    description: "Des solutions construites avec vous, de l’idée au déploiement, pour un impact concret.",
    href: "/contact",
    cta: "Lancer mon projet",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="h-5 w-5">
        <circle cx="9" cy="7" r="3" />
        <path d="M2 21v-1a6 6 0 0112 0v1" strokeLinecap="round" />
        <circle cx="18" cy="9" r="2.5" />
        <path d="M15 21v-0.5a4.5 4.5 0 019 0V21" strokeLinecap="round" />
      </svg>
    ),
  },
];

const explorationLinks = [
  {
    title: "Services Web",
    description: "Parcours clairs, CTA efficaces et pages conçues pour convertir.",
    href: "/services/web",
  },
  {
    title: "SkiTrack mobile",
    description: "L’app terrain qui structure les tests et accélère les décisions staff.",
    href: "/skitrack",
  },
  {
    title: "Photo terrain",
    description: "Des visuels prêts à publier qui soutiennent votre image et vos ventes.",
    href: "/services/photo",
  },
];

const spotlightCards = [
  {
    title: "Nos solutions web et iOS",
    description: "Des solutions numériques pensées pour guider l'utilisateur, structurer le parcours et convertir.",
    href: "/services/web",
    cta: "Explorer Web & iOS",
    image: "/hero-home.jpg",
  },
  {
    title: "SkiTrack, du terrain à la décision",
    description: "Découvrez comment l’application mobile centralise les tests matériel et accélère l’analyse des staffs.",
    href: "/skitrack",
    cta: "Voir SkiTrack",
    image: "/services/biathlon-pour.jpg",
  },
  {
    title: "Photo sportive à impact commercial",
    description: "Un workflow visuel complet: brief, production, tri éditorial et livraison en galerie privée.",
    href: "/services/photo",
    cta: "Voir la partie photo",
    image: "/services/photo/24-DSC03738.JPG",
  },
];

const socialProofs = [
  {
    athlete: "Retour anonymisé",
    role: "Biathlon",
    quote:
      "Avec SkiTrack, je passe moins de temps à expliquer mes sensations et plus de temps à progresser.",
    href: "/skitrack",
  },
  {
    athlete: "Retour anonymisé",
    role: "Staff nordique",
    quote:
      "Les retours sont plus clairs, les décisions sont plus rapides, et on évite beaucoup d'hésitations.",
    href: "/solutions",
  },
  {
    athlete: "Retour anonymisé",
    role: "Athlète",
    quote:
      "Le service photo donne une image pro tout de suite. Les sponsors voient la différence.",
    href: "/services/photo",
  },
  {
    athlete: "Retour anonymisé",
    role: "Responsable club",
    quote:
      "On sent une vraie logique produit: chaque page guide vers l'action au bon moment.",
    href: "/services",
  },
];

const ctaBlocks = [
  {
    title: "Je veux un aperçu rapide",
    label: "des services",
    href: "/services",
  },
  {
    title: "Je veux voir des cas concrets",
    label: "et les solutions",
    href: "/solutions",
  },
  {
    title: "Je veux lancer mon projet",
    label: "avec vous",
    href: "/contact",
  },
];

function ArrowIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <path d="M5 12h14" strokeLinecap="round" />
      <path d="m13.5 7 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <main className="pb-24">
      <section className="mx-auto w-full max-w-[1440px] px-4 pt-8 sm:px-6 sm:pt-10 xl:px-10">
        <div className="overflow-hidden rounded-[34px] border border-line bg-white shadow-[0_30px_90px_rgba(35,48,54,0.16)]">
          <div className="relative grid lg:grid-cols-[58fr_42fr]">
            <div className="relative overflow-hidden bg-gradient-to-br from-white via-white to-surface px-8 py-12 sm:px-12 sm:py-14 lg:px-14 lg:py-16">
              <div className="pointer-events-none absolute -left-20 -top-16 h-52 w-52 rounded-full bg-sky/30 blur-3xl" />
              <div className="pointer-events-none absolute right-0 top-1/3 h-52 w-52 rounded-full bg-deep/12 blur-3xl" />
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.11]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(36,67,87,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(36,67,87,0.08) 1px, transparent 1px)",
                  backgroundSize: "34px 34px",
                  maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.15))",
                }}
              />

              <p className="relative text-[10px] font-bold uppercase tracking-[0.35em] text-deep/80">
                Solutions numériques, photo et 3D pour sportifs, clubs et marques
              </p>

              <h1 className="animate-reveal relative mt-4 max-w-2xl font-display text-4xl font-bold leading-[1.06] text-ink sm:text-5xl lg:text-[4.1rem]">
                Passe du ressenti aux décisions qui font progresser.
              </h1>

              <p
                className="animate-reveal relative mt-5 max-w-[560px] text-sm leading-relaxed text-ink/70 sm:text-base"
                style={{ animationDelay: "90ms" }}
              >
                On conçoit des expériences web et iOS orientées performance, des visuels premium
                et des services 3D pour vous aider à décider plus vite, mieux exécuter et passer
                un vrai cap.
              </p>

              <div
                className="animate-reveal relative mt-8 flex flex-wrap gap-3"
                style={{ animationDelay: "150ms" }}
              >
                <Link
                  href="/services/web"
                  className="inline-flex w-full items-center justify-center rounded-full bg-deep px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 hover:bg-deep/88 sm:w-auto"
                >
                  Découvrir web & iOS
                  <ArrowIcon className="ml-2 h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center rounded-full border border-deep/30 bg-white px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-deep transition hover:-translate-y-0.5 hover:bg-sky/15 sm:w-auto"
                >
                  Réserver un appel
                </Link>
              </div>

              <div className="relative mt-9 grid gap-3 sm:grid-cols-3">
                {explorationLinks.map((link, index) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="animate-reveal group rounded-2xl border border-line/80 bg-white/85 p-5 transition hover:-translate-y-0.5 hover:border-deep/35 hover:shadow-[0_14px_32px_rgba(35,48,54,0.15)]"
                    style={{ animationDelay: `${220 + index * 80}ms` }}
                  >
                    <p className="text-sm font-semibold text-deep">{link.title}</p>
                    <p className="mt-2 text-[12px] leading-relaxed text-ink/62">{link.description}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.22em] text-deep/80">
                      Découvrir
                      <ArrowIcon className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                    </span>
                  </Link>
                ))}
              </div>

            </div>

            <div className="relative min-h-[430px] overflow-hidden bg-deep lg:min-h-0">
              <Image
                src="/hero-home.jpg"
                alt="InMotion Performance"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-center"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-deep/15 via-deep/45 to-deep/85" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(137,169,186,0.35),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.18),transparent_40%)]" />
            </div>
          </div>

          <div className="grid border-t border-deep/25 bg-deep sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Link
                key={feature.label}
                href={feature.href}
                className={`p-5 text-center sm:p-6 ${
                  index < features.length - 1
                    ? "border-b border-white/10 sm:border-b-0 sm:border-r sm:border-white/10"
                    : ""
                } transition hover:bg-white/[0.04] lg:border-r lg:border-white/10`}
              >
                <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/35 text-white/65">
                  {feature.icon}
                </div>
                <p className="text-[9px] font-bold uppercase tracking-[0.26em] text-white">
                  {feature.label}
                </p>
                <p className="mx-auto mt-2 max-w-[180px] text-center text-[11px] leading-relaxed text-white/50">
                  {feature.description}
                </p>
                <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-sky">
                  {feature.cta}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-4 pt-6 sm:px-6 xl:px-10">
        <div className="grid gap-4 lg:grid-cols-3">
          {spotlightCards.map((card) => (
            <article
              key={card.title}
              className="group relative overflow-hidden rounded-[28px] border border-line bg-white shadow-[0_14px_42px_rgba(35,48,54,0.11)]"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1d2a]/70 via-[#0f1d2a]/20 to-transparent" />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold leading-tight text-ink">{card.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink/67">{card.description}</p>
                <Link
                  href={card.href}
                  className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-deep transition group-hover:translate-x-1"
                >
                  {card.cta}
                  <ArrowIcon />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-4 pt-6 sm:px-6 xl:px-10">
        <div className="rounded-[30px] border border-line bg-white p-6 shadow-[0_14px_42px_rgba(35,48,54,0.09)] sm:p-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/45">Preuves sociales</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">
                Ce que le terrain dit vraiment
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-deep/25 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-deep transition hover:bg-sky/12"
            >
              Tout explorer
              <ArrowIcon />
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {socialProofs.map((card) => (
              <Link
                key={`${card.athlete}-${card.role}`}
                href={card.href}
                className="group rounded-2xl border border-line/80 bg-surface/45 p-5 transition hover:-translate-y-0.5 hover:border-deep/35 hover:shadow-[0_14px_32px_rgba(35,48,54,0.12)]"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/45">
                  {card.athlete} · {card.role}
                </p>
                <p className="mt-3 text-base leading-relaxed text-ink/75">“{card.quote}”</p>
                <span className="mt-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-deep">
                  Voir le détail
                  <ArrowIcon className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-4 pt-6 sm:px-6 xl:px-10">
        <div className="relative overflow-hidden rounded-[30px] bg-deep p-6 shadow-[0_20px_48px_rgba(35,48,54,0.2)] sm:p-8">
          <div className="relative">
            <div className="relative z-10 grid gap-4 lg:grid-cols-[1.3fr_1fr]">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/55">
                  Dernière étape
                </p>
                <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight text-white sm:text-4xl">
                  Prêt à transformer vos visites en prises de contact qualifiées ?
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
                  On reprend votre parcours actuel, on clarifie la lecture, on priorise les CTA
                  importants et on transforme la home en vrai point d’entrée business.
                </p>
              </div>

              <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
                {ctaBlocks.map((block) => (
                  <Link
                    key={block.title}
                    href={block.href}
                    className="group flex items-center justify-between rounded-xl border border-white/20 bg-white/[0.06] px-4 py-3 text-white transition hover:bg-white/[0.12]"
                  >
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.22em] text-white/55">{block.title}</p>
                      <p className="mt-1 text-sm font-semibold">{block.label}</p>
                    </div>
                    <ArrowIcon className="h-4 w-4 transition group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

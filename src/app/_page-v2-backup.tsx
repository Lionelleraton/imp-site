import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    label: "Performance nordique",
    description: "Des outils digitaux orientés terrain pour progresser avec des chiffres clairs.",
    href: "/skitrack",
    cta: "Voir SkiTrack",
    accent: "from-sky/40 to-deep/70",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="h-5 w-5">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Applications web & iOS",
    description: "Des interfaces rapides et lisibles pour coachs, athlètes et marques.",
    href: "/services/web",
    cta: "Voir Web & iOS",
    accent: "from-deep/50 to-sky/50",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="h-5 w-5">
        <rect x="3" y="4" width="18" height="14" rx="2.5" />
        <path d="M8 20h8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Photo premium",
    description: "Un pôle visuel fort pour vos produits, campagnes et événements sportifs.",
    href: "/services/photo",
    cta: "Voir la photo",
    accent: "from-sky/30 to-mist/80",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="h-5 w-5">
        <rect x="2" y="7" width="20" height="14" rx="2.5" />
        <circle cx="12" cy="14" r="3.5" />
        <path d="M8.5 7 10 4.5h4L15.5 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Sur-mesure",
    description: "Des solutions pensées avec vous, de l'idée au déploiement concret.",
    href: "/contact",
    cta: "Parler du besoin",
    accent: "from-deep/40 to-sky/40",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="h-5 w-5">
        <circle cx="8" cy="8" r="3" />
        <circle cx="17" cy="7" r="2.5" />
        <path d="M2 21v-1a6 6 0 0 1 12 0v1" strokeLinecap="round" />
        <path d="M14 21v-0.5a4.5 4.5 0 0 1 8 0V21" strokeLinecap="round" />
      </svg>
    ),
  },
];

const spotlightCards = [
  {
    title: "Nos solutions web et iOS",
    description:
      "Des applications conçues pour faire gagner du temps, structurer l'analyse et guider vers l'action.",
    href: "/services/web",
    cta: "Explorer Web & iOS",
    image: "/services/solutionwebios.jpg",
    badge: "Web & iOS",
  },
  {
    title: "SkiTrack, du terrain à la décision",
    description:
      "Des données utiles dès la fin du test pour aider staff, coachs et athlètes à trancher plus vite.",
    href: "/skitrack",
    cta: "Voir SkiTrack",
    image: "/services/biathlon-pour.jpg",
    badge: "SkiTrack",
  },
  {
    title: "Photo sportive à impact commercial",
    description:
      "Des visuels premium pour valoriser votre univers, vos produits et la relation avec vos partenaires.",
    href: "/services/photo",
    cta: "Voir la photo",
    image: "/services/photo/24-DSC03738.JPG",
    badge: "Photo",
  },
];

const socialProofs = [
  {
    athlete: "Athlète",
    role: "Biathlon",
    quote:
      "On a enfin un suivi clair de mes tests. Je comprends plus vite ce qui fonctionne et je gagne du temps.",
    href: "/skitrack",
  },
  {
    athlete: "Coach",
    role: "Ski nordique",
    quote:
      "Les chiffres clés sont lisibles immédiatement. Les décisions staff sont plus rapides et mieux assumées.",
    href: "/services/web",
  },
  {
    athlete: "Marque",
    role: "Outdoor",
    quote:
      "Le volet photo nous aide à mieux présenter nos produits et à créer plus d'engagement commercial.",
    href: "/services/photo",
  },
  {
    athlete: "Club",
    role: "Staff performance",
    quote:
      "Le site est clair, les offres sont compréhensibles, et le passage au contact se fait naturellement.",
    href: "/contact",
  },
];

const ctaBlocks = [
  { title: "Je veux un aperçu rapide", label: "des services", href: "/services" },
  { title: "Je veux voir des cas concrets", label: "et les solutions", href: "/solutions" },
  { title: "Je veux lancer mon projet", label: "avec vous", href: "/contact" },
];

const profileHighlights = [
  "Expérience terrain au contact des athlètes et coachs.",
  "Approche produit: utile, claire, orientée résultats.",
  "Un seul objectif: transformer vos besoins en actions concrètes.",
];

const stats = [
  { value: "3+", label: "solutions actives" },
  { value: "100%", label: "orienté terrain" },
  { value: "2 sem.", label: "déploiement" },
];

function ArrowIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <path d="M5 12h14" strokeLinecap="round" />
      <path d="m13.5 7 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const reveal = (delay: number): CSSProperties => ({ "--reveal-delay": `${delay}ms` } as CSSProperties);

export default function HomePage() {
  return (
    <main className="pb-24">
      {/* ── HERO ── */}
      <section
        className="mx-auto w-full max-w-[1440px] px-4 pt-8 sm:px-6 sm:pt-10 xl:px-10"
        data-reveal
        style={reveal(0)}
      >
        <div className="overflow-hidden rounded-[34px] border border-line bg-white shadow-[0_30px_90px_rgba(35,48,54,0.18)]">
          <div className="relative grid lg:grid-cols-[58fr_42fr]">
            {/* ── Left content ── */}
            <div className="relative overflow-hidden bg-gradient-to-br from-white via-white to-surface px-8 py-12 sm:px-12 sm:py-14 lg:px-14 lg:py-16">
              {/* Decorative orbs */}
              <div className="pointer-events-none absolute -left-24 -top-20 h-64 w-64 rounded-full bg-sky/22 blur-3xl animate-glow-pulse" />
              <div
                className="pointer-events-none absolute right-0 top-1/3 h-56 w-56 rounded-full bg-deep/8 blur-3xl animate-glow-pulse"
                style={{ animationDelay: "2.5s" } as CSSProperties}
              />
              <div className="pointer-events-none absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-sky/12 blur-2xl" />
              {/* Subtle grid texture */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(36,67,87,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(36,67,87,0.1) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                  maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.95), rgba(0,0,0,0.05))",
                }}
              />

              <div className="relative">
                {/* Animated badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-sky/35 bg-sky/8 px-3.5 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky animate-glow-pulse" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-deep/75">
                    InMotion Performance · ski nordique & solutions digitales
                  </p>
                </div>

                <h1 className="mt-5 max-w-2xl font-display text-4xl font-bold leading-[1.06] text-ink sm:text-5xl lg:text-[4.1rem]">
                  Optimiser la performance en ski nordique grâce aux solutions{" "}
                  <span className="text-gradient">numériques.</span>
                </h1>

                <p className="mt-5 max-w-[620px] text-sm leading-relaxed text-ink/68 sm:text-base">
                  Applications, outils et solutions sur mesure pour athlètes, coachs et marques.
                  En parallèle, un pôle photo premium pour valoriser vos produits, vos équipes et
                  vos événements, au-delà du ski nordique.
                </p>

                {/* CTA buttons */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/services/web"
                    className="btn-shine inline-flex w-full items-center justify-center rounded-full bg-deep px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white shadow-[0_12px_32px_rgba(36,67,87,0.32)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(36,67,87,0.42)] sm:w-auto"
                  >
                    Découvrir web & iOS
                    <ArrowIcon className="ml-2 h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center rounded-full border border-deep/25 bg-white/90 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-deep transition hover:-translate-y-0.5 hover:border-deep/45 hover:bg-sky/10 sm:w-auto"
                  >
                    Réserver un appel
                  </Link>
                </div>

                {/* Stats row */}
                <div className="mt-7 flex flex-wrap items-center gap-6 border-t border-line/60 pt-6">
                  {stats.map((stat, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="font-display text-2xl font-bold leading-none text-deep">
                        {stat.value}
                      </span>
                      <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.22em] text-ink/48">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Target tags */}
                <div className="relative mt-6 grid gap-2 sm:grid-cols-3">
                  {["Athlètes", "Coachs", "Marques"].map((item, index) => (
                    <div
                      key={item}
                      className="hover-gradient-border rounded-xl border border-line/70 bg-white/75 px-4 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-deep transition hover:bg-sky/8"
                      data-reveal
                      style={reveal(80 + index * 90)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right image ── */}
            <div className="relative min-h-[430px] overflow-hidden bg-deep lg:min-h-0">
              <Image
                src="/hero-home.jpg"
                alt="InMotion Performance"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-center transition duration-700 hover:scale-[1.02]"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-deep/10 via-deep/30 to-deep/82" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(137,169,186,0.28),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.12),transparent_40%)]" />
              {/* Glass info card */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass-dark rounded-2xl border border-white/15 px-5 py-4">
                  <p className="text-[9px] font-bold uppercase tracking-[0.32em] text-white/50">
                    Chamonix Mont-Blanc
                  </p>
                  <p className="mt-1 text-sm font-semibold leading-snug text-white">
                    Solutions terrain → décisions rapides
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Feature bar ── */}
          <div className="grid border-t border-deep/22 bg-deep sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Link
                key={feature.label}
                href={feature.href}
                className={`group p-5 text-center sm:p-6 ${
                  index < features.length - 1
                    ? "border-b border-white/8 sm:border-b-0 sm:border-r sm:border-white/8"
                    : ""
                } transition-colors duration-200 hover:bg-white/[0.055] lg:border-r lg:border-white/8`}
              >
                <div
                  className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.accent} text-white transition-transform duration-300 group-hover:scale-110`}
                >
                  {feature.icon}
                </div>
                <p className="text-[9px] font-bold uppercase tracking-[0.26em] text-white">
                  {feature.label}
                </p>
                <p className="mx-auto mt-2 max-w-[180px] text-center text-[11px] leading-relaxed text-white/48">
                  {feature.description}
                </p>
                <p className="mt-3 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-sky transition-all duration-200 group-hover:gap-2">
                  {feature.cta}
                  <ArrowIcon className="h-3 w-3" />
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPOTLIGHT CARDS ── */}
      <section
        className="mx-auto w-full max-w-[1440px] px-4 pt-6 sm:px-6 xl:px-10"
        data-reveal
        style={reveal(50)}
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {spotlightCards.map((card, index) => (
            <article
              key={card.title}
              className="hover-gradient-border group relative overflow-hidden rounded-[28px] border border-line bg-white shadow-[0_14px_42px_rgba(35,48,54,0.11)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_64px_rgba(35,48,54,0.18)]"
              data-reveal
              style={reveal(100 + index * 110)}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.07]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1d2a]/78 via-[#0f1d2a]/18 to-transparent" />
                {/* Glass badge */}
                <div className="absolute left-4 top-4">
                  <span className="glass rounded-full border border-white/28 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.28em] text-ink/80">
                    {card.badge}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold leading-tight text-ink">{card.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">{card.description}</p>
                <Link
                  href={card.href}
                  className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-deep transition-all duration-200 group-hover:translate-x-1 group-hover:gap-3"
                >
                  {card.cta}
                  <ArrowIcon />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section
        className="mx-auto w-full max-w-[1440px] px-4 pt-6 sm:px-6 xl:px-10"
        data-reveal
        style={reveal(60)}
      >
        <div className="rounded-[30px] border border-line bg-white p-6 shadow-[0_14px_42px_rgba(35,48,54,0.09)] sm:p-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/42">
                Preuves sociales
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">
                Ce que le terrain dit vraiment
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-deep/22 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-deep transition hover:border-deep/45 hover:bg-sky/10"
            >
              Tout explorer
              <ArrowIcon />
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {socialProofs.map((card, index) => (
              <Link
                key={`${card.athlete}-${card.role}`}
                href={card.href}
                className="group relative overflow-hidden rounded-2xl border border-line/75 bg-surface/40 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-deep/28 hover:shadow-[0_14px_36px_rgba(35,48,54,0.12)]"
                data-reveal
                style={reveal(100 + index * 90)}
              >
                {/* Accent border left */}
                <div className="absolute bottom-5 left-0 top-5 w-0.5 rounded-full bg-gradient-to-b from-sky via-deep/70 to-sky opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Quote mark */}
                <svg className="mb-2 h-6 w-6 text-sky/38" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                </svg>

                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/42">
                  {card.athlete} · {card.role}
                </p>
                <p className="mt-3 text-base leading-relaxed text-ink/73">"{card.quote}"</p>
                <span className="mt-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-deep">
                  Voir le détail
                  <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section
        className="mx-auto w-full max-w-[1440px] px-4 pt-6 sm:px-6 xl:px-10"
        data-reveal
        style={reveal(75)}
      >
        <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
          <article className="group overflow-hidden rounded-[30px] border border-line bg-white shadow-[0_20px_52px_rgba(35,48,54,0.12)]">
            <div className="relative h-full min-h-[300px]">
              <Image
                src="/services/photo/DSC03145.JPG"
                alt="Portrait fondateur InMotion Performance"
                fill
                sizes="(min-width: 1024px) 34vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a27]/65 via-[#0c1a27]/12 to-transparent" />
              {/* Corner accent dot */}
              <div className="absolute right-5 top-5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-white/12 backdrop-blur-sm">
                  <div className="h-2 w-2 rounded-full bg-sky animate-glow-pulse" />
                </div>
              </div>
            </div>
          </article>

          <article className="rounded-[30px] border border-line bg-white p-6 shadow-[0_20px_52px_rgba(35,48,54,0.12)] sm:p-8">
            {/* Gradient accent line */}
            <div className="mb-4 h-0.5 w-10 rounded-full bg-gradient-to-r from-deep to-sky" />
            <p className="text-[10px] uppercase tracking-[0.28em] text-ink/48">Qui suis-je</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              Un interlocuteur unique, du besoin terrain à la solution livrée
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink/68 sm:text-base">
              Je pilote InMotion Performance avec une approche simple: écouter le besoin réel,
              transformer l&apos;idée en solution utile et livrer une expérience claire pour les athlètes,
              les coachs, les staffs et les marques.
            </p>
            <ol className="mt-5 space-y-3">
              {profileHighlights.map((line, i) => (
                <li key={line} className="flex items-start gap-3 text-sm text-ink/70">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-deep/10 text-[10px] font-bold text-deep">
                    {i + 1}
                  </span>
                  {line}
                </li>
              ))}
            </ol>
            <Link
              href="/contact"
              className="btn-shine mt-6 inline-flex items-center gap-2 rounded-full bg-deep px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white shadow-[0_10px_28px_rgba(36,67,87,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(36,67,87,0.38)]"
            >
              Échanger sur votre projet
              <ArrowIcon />
            </Link>
          </article>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="mx-auto w-full max-w-[1440px] px-4 pt-6 sm:px-6 xl:px-10"
        data-reveal
        style={reveal(90)}
      >
        <div className="relative overflow-hidden rounded-[30px] shadow-[0_24px_56px_rgba(35,48,54,0.22)]">
          {/* Animated gradient background */}
          <div
            className="absolute inset-0 animate-gradient-x"
            style={{
              background:
                "linear-gradient(135deg, #061018 0%, #112030 28%, #1a3248 52%, #244357 72%, #1a3248 86%, #061018 100%)",
              backgroundSize: "200% 200%",
            }}
          />
          {/* Decorative orbs */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-sky/14 blur-3xl animate-glow-pulse" />
          <div className="pointer-events-none absolute -bottom-8 -left-8 h-56 w-56 rounded-full bg-deep/70 blur-3xl" />
          {/* Subtle grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.055]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.18) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />

          <div className="relative z-10 p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/48">
                  Dernière étape
                </p>
                <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight text-white sm:text-4xl">
                  Prêt à transformer vos visites en prises de contact qualifiées ?
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/62 sm:text-base">
                  On clarifie votre message, on met les bons CTA au bon endroit et on structure une
                  expérience qui convertit sans friction.
                </p>
                <Link
                  href="/contact"
                  className="btn-shine mt-6 inline-flex items-center gap-2 rounded-full border border-white/28 bg-white/10 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition hover:bg-white hover:text-ink"
                >
                  Réserver un appel gratuit
                  <ArrowIcon />
                </Link>
              </div>

              <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
                {ctaBlocks.map((block, index) => (
                  <Link
                    key={block.title}
                    href={block.href}
                    className="group flex items-center justify-between rounded-xl border border-white/14 bg-white/[0.05] px-4 py-3.5 text-white backdrop-blur-sm transition-all duration-200 hover:border-white/28 hover:bg-white/[0.1]"
                    data-reveal
                    style={reveal(120 + index * 90)}
                  >
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.22em] text-white/48">
                        {block.title}
                      </p>
                      <p className="mt-1 text-sm font-semibold">{block.label}</p>
                    </div>
                    <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1.5" />
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

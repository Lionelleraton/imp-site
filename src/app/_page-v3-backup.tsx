import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import StickyMobileCTA from "./components/StickyMobileCTA";

/* ── Data ── */

const trustTags = ["Athlètes", "Coachs", "Marques sportives", "Clubs nordiques"];

const stats = [
  { value: "3+", label: "solutions actives", sub: "déployées en production" },
  { value: "2 sem.", label: "délai moyen", sub: "de l'idée au déploiement" },
  { value: "100%", label: "orienté terrain", sub: "Chamonix Mont-Blanc" },
];


const process = [
  {
    n: "01",
    title: "Comprendre",
    desc: "J'analyse votre besoin terrain, vos contraintes réelles et ce qui bloque aujourd'hui.",
  },
  {
    n: "02",
    title: "Développer",
    desc: "Je construis une solution ciblée, simple, pensée pour être utilisée par les équipes dès le premier jour.",
  },
  {
    n: "03",
    title: "Déployer",
    desc: "Mise en production en 2 semaines. Vous êtes autonomes. Je reste disponible.",
  },
];

const testimonials = [
  {
    athlete: "Athlète",
    role: "Biathlon",
    quote: "On a enfin un suivi clair de mes tests. Je comprends plus vite ce qui fonctionne et je gagne du temps.",
    href: "/skitrack",
  },
  {
    athlete: "Coach",
    role: "Ski nordique",
    quote: "Les chiffres clés sont lisibles immédiatement. Les décisions staff sont plus rapides et mieux assumées.",
    href: "/services/web",
  },
  {
    athlete: "Marque",
    role: "Outdoor",
    quote: "Le volet photo nous aide à mieux présenter nos produits et à créer plus d'engagement commercial.",
    href: "/services/photo",
  },
  {
    athlete: "Club",
    role: "Staff performance",
    quote: "Le site est clair, les offres sont compréhensibles, et le passage au contact se fait naturellement.",
    href: "/contact",
  },
];

const profileHighlights = [
  { n: "01", text: "Expérience terrain au contact des athlètes et coachs." },
  { n: "02", text: "Approche produit: utile, claire, orientée résultats." },
  { n: "03", text: "Un seul objectif: transformer vos besoins en actions concrètes." },
];

/* ── Components ── */

function Arrow({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <path d="M5 12h14" strokeLinecap="round" />
      <path d="m13.5 7 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const r = (ms: number): CSSProperties => ({ "--reveal-delay": `${ms}ms` } as CSSProperties);

/* ── Page ── */

export default function HomePage() {
  return (
    <>
      <StickyMobileCTA />

      <main className="pb-28 sm:pb-24">

        {/* ────────────────── HERO ────────────────── */}
        <section className="mx-auto w-full max-w-[1440px] px-4 pt-6 sm:px-6 sm:pt-8 xl:px-10" data-reveal style={r(0)}>
          <div className="relative flex min-h-[82svh] items-end overflow-hidden rounded-[34px] sm:min-h-[72svh] lg:min-h-[78svh]">
            {/* Background image */}
            <Image
              src="/hero-home.jpg"
              alt="InMotion Performance"
              fill
              sizes="100vw"
              className="object-cover object-center"
              priority
            />
            {/* Layered overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020c14]/96 via-[#020c14]/62 to-[#020c14]/15" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_900px_600px_at_15%_90%,rgba(137,169,186,0.22),transparent_60%)]" />
            {/* Noise texture */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                backgroundSize: "200px 200px",
              }}
            />

            {/* Content */}
            <div className="relative z-10 w-full px-6 pb-10 sm:px-12 sm:pb-14 lg:px-16 lg:pb-16">
              {/* Badge */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/8 px-3.5 py-2 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-sky animate-glow-pulse" />
                <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-white/68">
                  InMotion Performance · Chamonix
                </p>
              </div>

              {/* Headline */}
              <h1 className="max-w-[16ch] font-display text-[2.6rem] font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
                La performance nordique commence par les{" "}
                <span className="text-gradient-light">données.</span>
              </h1>

              {/* Subline */}
              <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-white/58 sm:text-lg">
                Applications, outils terrain et photo premium pour athlètes, coachs et marques.
              </p>

              {/* CTAs */}
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/contact"
                  className="btn-shine flex h-14 w-full items-center justify-center gap-2.5 rounded-2xl bg-white text-[12px] font-semibold uppercase tracking-[0.22em] text-deep shadow-[0_16px_48px_rgba(0,0,0,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_56px_rgba(0,0,0,0.45)] sm:h-auto sm:w-auto sm:rounded-full sm:px-8 sm:py-4"
                >
                  Réserver un appel gratuit
                  <Arrow />
                </Link>
                <Link
                  href="/services"
                  className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/8 text-[12px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-sm transition hover:bg-white/14 sm:h-auto sm:w-auto sm:rounded-full sm:px-7 sm:py-4"
                >
                  Voir les services
                </Link>
              </div>

              {/* Trust pills */}
              <div className="mt-7 flex flex-wrap gap-2">
                {trustTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/16 bg-white/7 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/58 backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ────────────────── STATS ────────────────── */}
        <section
          className="mx-auto w-full max-w-[1440px] px-4 pt-4 sm:px-6 xl:px-10"
          data-reveal
          style={r(40)}
        >
          <div className="overflow-hidden rounded-[28px] border border-line bg-white shadow-[0_12px_36px_rgba(35,48,54,0.1)]">
            <div className="grid divide-y divide-line/50 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 px-6 py-5 sm:flex-col sm:items-start sm:gap-2 sm:py-6 lg:px-8"
                >
                  <span className="font-display text-4xl font-bold leading-none text-deep lg:text-5xl">
                    {s.value}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{s.label}</p>
                    <p className="mt-0.5 text-[11px] text-ink/48">{s.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ────────────────── BENTO SERVICES ────────────────── */}
        <section
          className="mx-auto w-full max-w-[1440px] px-4 pt-4 sm:px-6 xl:px-10"
          data-reveal
          style={r(60)}
        >
          {/* Section header */}
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-ink/40">Services</p>
              <h2 className="mt-1.5 text-2xl font-semibold text-ink sm:text-3xl">
                Ce qu&apos;on fait concrètement
              </h2>
            </div>
            <Link
              href="/services"
              className="hidden items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-deep sm:inline-flex"
            >
              Tout voir <Arrow className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">

            {/* SkiTrack - featured dark card, full width on mobile */}
            <article
              className="hover-gradient-border group relative col-span-2 overflow-hidden rounded-[28px] lg:col-span-1 lg:row-span-2"
              data-reveal
              style={r(80)}
            >
              <div className="relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-[28px] sm:min-h-[360px] lg:h-full">
                <Image
                  src="/services/biathlon-pour.jpg"
                  alt="SkiTrack"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030c14]/92 via-[#030c14]/45 to-transparent" />
                <div className="relative z-10 p-6 sm:p-7">
                  <span className="inline-block rounded-full border border-white/22 bg-white/10 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.28em] text-white/75 backdrop-blur-sm">
                    SkiTrack
                  </span>
                  <h3 className="mt-3 text-2xl font-bold leading-tight text-white sm:text-3xl">
                    Du terrain à la décision
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/58">
                    Centralisez les tests matériel, tracez les retours athlètes et générez des
                    tableaux de bord décisionnels exploitables immédiatement.
                  </p>
                  <Link
                    href="/skitrack"
                    className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-sky transition-all duration-200 group-hover:gap-3"
                  >
                    Voir SkiTrack <Arrow className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </article>

            {/* Web & iOS */}
            <article
              className="hover-gradient-border group rounded-[28px] border border-line bg-white p-5 shadow-[0_10px_32px_rgba(35,48,54,0.09)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_52px_rgba(35,48,54,0.16)] sm:p-6"
              data-reveal
              style={r(120)}
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-deep/80 to-sky/60 text-white">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="h-5 w-5">
                  <rect x="3" y="4" width="18" height="14" rx="2.5" />
                  <path d="M8 20h8" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-ink/38">
                Web & iOS
              </span>
              <h3 className="mt-2 text-lg font-semibold leading-tight text-ink">
                Applications web & iOS
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink/60">
                Des interfaces rapides et lisibles conçues pour faire gagner du temps aux coachs,
                athlètes et marques.
              </p>
              <Link
                href="/services/web"
                className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-deep transition-all duration-200 group-hover:gap-2.5"
              >
                Voir Web & iOS <Arrow className="h-3 w-3" />
              </Link>
            </article>

            {/* Photo */}
            <article
              className="hover-gradient-border group rounded-[28px] border border-line bg-white p-5 shadow-[0_10px_32px_rgba(35,48,54,0.09)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_52px_rgba(35,48,54,0.16)] sm:p-6"
              data-reveal
              style={r(160)}
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky/60 to-mist text-ink/70">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="h-5 w-5">
                  <rect x="2" y="7" width="20" height="14" rx="2.5" />
                  <circle cx="12" cy="14" r="3.5" />
                  <path d="M8.5 7 10 4.5h4L15.5 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-ink/38">
                Photo
              </span>
              <h3 className="mt-2 text-lg font-semibold leading-tight text-ink">Photo premium</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink/60">
                Un pôle visuel fort pour vos produits, campagnes et événements sportifs.
              </p>
              <Link
                href="/services/photo"
                className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-deep transition-all duration-200 group-hover:gap-2.5"
              >
                Voir la photo <Arrow className="h-3 w-3" />
              </Link>
            </article>

            {/* Sur-mesure - wide on desktop */}
            <article
              className="hover-gradient-border group col-span-2 flex flex-col justify-between gap-4 rounded-[28px] border border-line bg-surface/60 p-5 shadow-[0_10px_32px_rgba(35,48,54,0.07)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_48px_rgba(35,48,54,0.13)] sm:flex-row sm:items-center sm:p-6 lg:col-span-2"
              data-reveal
              style={r(200)}
            >
              <div>
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-deep/40 to-sky/40 text-deep">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="h-5 w-5">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 17l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-ink/38">
                  Sur-mesure
                </span>
                <h3 className="mt-2 text-lg font-semibold text-ink sm:text-xl">
                  Votre besoin unique, notre solution
                </h3>
                <p className="mt-2 max-w-lg text-[13px] leading-relaxed text-ink/60">
                  De l&apos;idée au déploiement concret — je conçois les outils qui manquaient à votre
                  structure.
                </p>
              </div>
              <Link
                href="/contact"
                className="btn-shine inline-flex flex-shrink-0 items-center gap-2 rounded-full bg-deep px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_10px_28px_rgba(36,67,87,0.3)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(36,67,87,0.4)]"
              >
                Parler du besoin <Arrow />
              </Link>
            </article>
          </div>
        </section>

        {/* ────────────────── PROCESS ────────────────── */}
        <section
          className="mx-auto w-full max-w-[1440px] px-4 pt-4 sm:px-6 xl:px-10"
          data-reveal
          style={r(80)}
        >
          <div className="relative overflow-hidden rounded-[30px] border border-line bg-white p-6 shadow-[0_12px_36px_rgba(35,48,54,0.09)] sm:p-8">
            {/* Section header */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-ink/40">
                  Comment ça marche
                </p>
                <h2 className="mt-1.5 text-2xl font-semibold text-ink sm:text-3xl">
                  Simple. Rapide. Sur le terrain.
                </h2>
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-3">
              {process.map((step, i) => (
                <div key={step.n} className="relative" data-reveal style={r(100 + i * 80)}>
                  {/* Connector line (desktop) */}
                  {i < process.length - 1 && (
                    <div className="absolute left-full top-6 hidden h-px w-full -translate-y-0.5 bg-gradient-to-r from-line to-transparent sm:block" />
                  )}
                  {/* Number */}
                  <span className="font-display text-5xl font-bold leading-none text-deep/12 sm:text-6xl">
                    {step.n}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">{step.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-line/60 pt-6">
              <Link
                href="/contact"
                className="btn-shine inline-flex items-center gap-2 rounded-full bg-deep px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_10px_28px_rgba(36,67,87,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(36,67,87,0.38)]"
              >
                Lancer mon projet <Arrow />
              </Link>
            </div>
          </div>
        </section>

        {/* ────────────────── TESTIMONIALS ────────────────── */}
        <section
          className="mx-auto w-full max-w-[1440px] pt-4"
          data-reveal
          style={r(90)}
        >
          {/* Section header with padding */}
          <div className="mb-4 flex items-end justify-between px-4 sm:px-6 xl:px-10">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-ink/40">
                Témoignages
              </p>
              <h2 className="mt-1.5 text-2xl font-semibold text-ink sm:text-3xl">
                Ce que le terrain dit
              </h2>
            </div>
            <Link
              href="/services"
              className="hidden items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-deep sm:inline-flex"
            >
              Tout explorer <Arrow className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Horizontal scroll on mobile, grid on desktop */}
          <div className="flex gap-4 overflow-x-auto pb-4 pl-4 pr-4 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 sm:px-6 xl:px-10"
               style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}>
            {testimonials.map((card) => (
              <Link
                key={`${card.athlete}-${card.role}`}
                href={card.href}
                className="group relative flex min-w-[82vw] flex-shrink-0 flex-col overflow-hidden rounded-2xl border border-line/70 bg-white p-5 shadow-[0_8px_24px_rgba(35,48,54,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(35,48,54,0.13)] sm:min-w-0"
                style={{ scrollSnapAlign: "start" }}
              >
                {/* Accent left border on hover */}
                <div className="absolute bottom-4 left-0 top-4 w-[3px] rounded-full bg-gradient-to-b from-sky to-deep/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Quote icon */}
                <svg className="mb-3 h-7 w-7 flex-shrink-0 text-sky/35" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                </svg>

                <p className="flex-1 text-base leading-relaxed text-ink/73">&ldquo;{card.quote}&rdquo;</p>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-deep">
                      {card.athlete}
                    </p>
                    <p className="text-[10px] text-ink/45">{card.role}</p>
                  </div>
                  <Arrow className="h-4 w-4 text-deep/40 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile "voir tout" */}
          <div className="mt-4 px-4 sm:hidden">
            <Link
              href="/services"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-deep/22 text-[11px] font-semibold uppercase tracking-[0.22em] text-deep transition hover:bg-sky/8"
            >
              Explorer les services <Arrow className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>

        {/* ────────────────── ABOUT ────────────────── */}
        <section
          className="mx-auto w-full max-w-[1440px] px-4 pt-4 sm:px-6 xl:px-10"
          data-reveal
          style={r(100)}
        >
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            {/* Photo */}
            <article className="group overflow-hidden rounded-[28px] border border-line bg-white shadow-[0_16px_48px_rgba(35,48,54,0.12)]">
              <div className="relative min-h-[280px] h-full">
                <Image
                  src="/services/photo/DSC03145.JPG"
                  alt="Fondateur InMotion Performance"
                  fill
                  sizes="(min-width: 1024px) 36vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a27]/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="glass-dark rounded-xl border border-white/15 px-4 py-3">
                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/50">
                      Fondateur
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-white">
                      InMotion Performance · Chamonix
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Text */}
            <article className="flex flex-col justify-center rounded-[28px] border border-line bg-white p-6 shadow-[0_16px_48px_rgba(35,48,54,0.12)] sm:p-8">
              <div className="mb-4 h-0.5 w-10 rounded-full bg-gradient-to-r from-deep to-sky" />
              <p className="text-[10px] uppercase tracking-[0.3em] text-ink/45">Qui suis-je</p>
              <h2 className="mt-3 text-2xl font-semibold leading-tight text-ink sm:text-3xl">
                Un interlocuteur unique, du besoin terrain à la solution livrée
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ink/65 sm:text-[15px]">
                Je pilote InMotion Performance avec une approche simple: écouter le besoin réel,
                transformer l&apos;idée en solution utile et livrer une expérience claire pour les
                athlètes, les coachs, les staffs et les marques.
              </p>
              <ol className="mt-5 space-y-3">
                {profileHighlights.map((h) => (
                  <li key={h.n} className="flex items-start gap-3 text-sm text-ink/68">
                    <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-deep/10 text-[10px] font-bold text-deep">
                      {h.n}
                    </span>
                    {h.text}
                  </li>
                ))}
              </ol>
              <Link
                href="/contact"
                className="btn-shine mt-6 inline-flex items-center gap-2 self-start rounded-full bg-deep px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_10px_28px_rgba(36,67,87,0.3)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(36,67,87,0.4)]"
              >
                Échanger sur votre projet
                <Arrow />
              </Link>
            </article>
          </div>
        </section>

        {/* ────────────────── CTA ────────────────── */}
        <section
          className="mx-auto w-full max-w-[1440px] px-4 pt-4 sm:px-6 xl:px-10"
          data-reveal
          style={r(110)}
        >
          <div className="relative overflow-hidden rounded-[30px] shadow-[0_24px_56px_rgba(35,48,54,0.22)]">
            {/* Animated gradient bg */}
            <div
              className="absolute inset-0 animate-gradient-x"
              style={{
                background:
                  "linear-gradient(135deg, #040e18 0%, #102030 28%, #1a3248 52%, #244357 72%, #1a3248 86%, #040e18 100%)",
                backgroundSize: "200% 200%",
              }}
            />
            {/* Orbs */}
            <div className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-sky/12 blur-3xl animate-glow-pulse" />
            <div className="pointer-events-none absolute -bottom-8 left-1/4 h-48 w-48 rounded-full bg-sky/8 blur-3xl" />
            {/* Grid texture */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-12 lg:px-14">
              <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/45">
                    Prêt à démarrer ?
                  </p>
                  <h2 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                    Votre projet mérite
                    <br />
                    <span className="text-gradient-light">une solution terrain.</span>
                  </h2>
                  <p className="mt-4 text-base text-white/55">
                    Un appel de 30 min suffit. On clarifie votre besoin, on évalue
                    la faisabilité et on vous dit si on peut vous aider.
                  </p>
                </div>

                <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:flex-col">
                  <Link
                    href="/contact"
                    className="btn-shine flex h-14 w-full items-center justify-center gap-2.5 rounded-2xl bg-white text-[12px] font-semibold uppercase tracking-[0.22em] text-deep shadow-[0_16px_40px_rgba(0,0,0,0.3)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_48px_rgba(0,0,0,0.4)] sm:h-auto sm:w-auto sm:rounded-full sm:px-8 sm:py-4 lg:w-full"
                  >
                    Réserver un appel gratuit <Arrow />
                  </Link>
                  <Link
                    href="/solutions"
                    className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/8 text-[12px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-sm transition hover:bg-white/14 sm:h-auto sm:w-auto sm:rounded-full sm:px-7 sm:py-4 lg:w-full"
                  >
                    Voir les solutions
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}

import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import StickyMobileCTA from "./components/StickyMobileCTA";

/* ─── Data ─── */

const marqueeItems = [
  "Performance nordique",
  "Solutions terrain",
  "SkiTrack",
  "Web & iOS",
  "Photo premium",
  "Chamonix",
  "Athlètes",
  "Coachs",
  "Marques outdoor",
  "Clubs nordiques",
];

const statsEditorial = [
  { n: "3+", label: "Solutions actives", sub: "déployées en production" },
  { n: "100%", label: "Orienté terrain", sub: "Athlètes · Coachs · Marques" },
  { n: "2 sem.", label: "Délai moyen", sub: "de l'idée au déploiement" },
];

const services = [
  {
    badge: "Web & iOS",
    title: "Applications web & iOS",
    desc: "Des interfaces rapides conçues pour faire gagner du temps aux coachs, athlètes et marques.",
    href: "/services/web",
    cta: "Voir Web & iOS",
    bg: "bg-white",
    wide: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="h-5 w-5">
        <rect x="3" y="4" width="18" height="14" rx="2.5" />
        <path d="M8 20h8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    badge: "Photo",
    title: "Photo premium",
    desc: "Un pôle visuel fort pour vos produits, campagnes et événements sportifs.",
    href: "/services/photo",
    cta: "Voir la photo",
    bg: "bg-surface",
    wide: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="h-5 w-5">
        <rect x="2" y="7" width="20" height="14" rx="2.5" />
        <circle cx="12" cy="14" r="3.5" />
        <path d="M8.5 7 10 4.5h4L15.5 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    badge: "Sur-mesure",
    title: "Solution unique",
    desc: "De l'idée au déploiement — je conçois ce qui manquait à votre structure.",
    href: "/contact",
    cta: "Parler du besoin",
    bg: "bg-deep text-white",
    wide: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="h-5 w-5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 17l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const aboutHighlights = [
  "Expérience terrain au contact des athlètes et coachs.",
  "Approche produit : utile, claire, orientée résultats.",
  "Un seul objectif : transformer vos besoins en actions concrètes.",
];

/* ─── Helpers ─── */

function Arrow({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <path d="M5 12h14" strokeLinecap="round" />
      <path d="m13.5 7 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const r = (ms: number): CSSProperties => ({ "--reveal-delay": `${ms}ms` } as CSSProperties);

/* ─── Page ─── */

export default function HomePage() {
  return (
    <>
      <StickyMobileCTA />

      <main className="pb-28 sm:pb-24">

        {/* ══════════════════════════════════════
            HERO — EDITORIAL FULL-HEIGHT
            Taste-skill: asymmetric, typography-first,
            NOT centered, NOT dark image bg
        ══════════════════════════════════════ */}
        <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[1440px] flex-col px-5 pb-10 pt-5 sm:px-8 xl:px-14">

          {/* Subtle dot grid — background texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.038]"
            style={{
              backgroundImage: "radial-gradient(rgba(35,48,54,0.5) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* Top context strip */}
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sky animate-glow-pulse" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-ink/42">
                InMotion Performance — Chamonix
              </p>
            </div>
            <Link
              href="/contact"
              className="hidden items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/48 transition hover:text-ink sm:inline-flex"
            >
              Prendre contact <Arrow className="h-3 w-3" />
            </Link>
          </div>

          {/* ── HEADLINE + ACCENT IMAGES ── */}
          <div className="relative mt-auto flex flex-col gap-8 pt-12 lg:flex-row lg:items-end lg:justify-between lg:pt-0">

            {/* Editorial 3-word headline */}
            <div className="lg:max-w-[64%]">
              <h1 className="font-display font-bold leading-[0.88] tracking-[-0.04em]">
                <span className="block text-[3.8rem] text-ink sm:text-[5.5rem] lg:text-[8rem] xl:text-[10rem]">
                  Données.
                </span>
                <span className="block text-[3.8rem] text-sky sm:text-[5.5rem] lg:text-[8rem] xl:text-[10rem]">
                  Décisions.
                </span>
                <span className="block text-[3.8rem] text-ink sm:text-[5.5rem] lg:text-[8rem] xl:text-[10rem]">
                  Performance.
                </span>
              </h1>
            </div>

            {/* Accent image stack — desktop only */}
            <div className="hidden shrink-0 flex-col gap-3 pb-3 lg:flex lg:w-[30%]">
              <div
                className="relative h-56 overflow-hidden rounded-[26px] shadow-[0_24px_64px_rgba(35,48,54,0.22)]"
                data-reveal
                style={r(80)}
              >
                <Image
                  src="/hero-home.jpg"
                  alt=""
                  fill
                  sizes="32vw"
                  className="object-cover transition duration-700 hover:scale-[1.03]"
                  priority
                />
              </div>
              <div
                className="relative ml-12 h-36 overflow-hidden rounded-[22px] shadow-[0_16px_48px_rgba(35,48,54,0.18)]"
                data-reveal
                style={r(160)}
              >
                <Image
                  src="/services/biathlon-pour.jpg"
                  alt=""
                  fill
                  sizes="22vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-deep/15" />
              </div>
            </div>
          </div>

          {/* ── SUB + CTAs ── */}
          <div className="relative mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="max-w-[42ch] text-base leading-relaxed text-ink/55 sm:text-[17px]">
                Applications terrain et photo premium pour athlètes, coachs et marques sportives.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="btn-shine flex h-14 w-full items-center justify-center gap-2.5 rounded-2xl bg-deep text-[12px] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_14px_40px_rgba(36,67,87,0.42)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_48px_rgba(36,67,87,0.52)] sm:h-auto sm:w-auto sm:rounded-full sm:px-8 sm:py-4"
                >
                  Réserver un appel gratuit <Arrow />
                </Link>
                <Link
                  href="/services"
                  className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl border border-ink/16 text-[12px] font-semibold uppercase tracking-[0.22em] text-ink/60 transition hover:border-ink/32 hover:text-ink sm:h-auto sm:w-auto sm:rounded-full sm:px-7 sm:py-4"
                >
                  Voir les services
                </Link>
              </div>
            </div>

            {/* Mini stats — desktop */}
            <div className="hidden shrink-0 flex-row items-end gap-7 pb-1 sm:flex">
              {[{ n: "3+", l: "Solutions" }, { n: "2 sem.", l: "Déploiement" }].map((s) => (
                <div key={s.n} className="text-right">
                  <span className="font-display text-3xl font-bold leading-none text-deep">{s.n}</span>
                  <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.22em] text-ink/38">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            MARQUEE — PERPETUAL MOTION STRIP
            Taste-skill: "infinite loop" to keep UI alive
        ══════════════════════════════════════ */}
        <div className="overflow-hidden border-y border-deep/20 bg-deep py-4">
          <div className="flex w-max animate-marquee items-center">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-5 px-5 text-[10px] font-semibold uppercase tracking-[0.32em] text-white/48"
              >
                {item}
                <span className="h-1 w-1 shrink-0 rounded-full bg-sky/55" />
              </span>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════
            SKITRACK — DOUBLE-BEZEL MAGAZINE SPREAD
            Taste-skill: nested shell + inner core = tactile depth
        ══════════════════════════════════════ */}
        <section
          className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24 xl:px-14"
          data-reveal
          style={r(0)}
        >
          {/* Section label */}
          <div className="mb-8 flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-ink/38">
              Solution phare
            </p>
            <Link
              href="/skitrack"
              className="hidden items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-deep transition hover:opacity-70 sm:inline-flex"
            >
              En savoir plus <Arrow className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Outer bezel */}
          <div className="rounded-[2.5rem] bg-deep p-2 shadow-[0_36px_90px_rgba(8,16,25,0.38)]">
            {/* Inner core */}
            <div className="relative grid overflow-hidden rounded-[2rem] lg:grid-cols-[55fr_45fr]">
              {/* Left: full image */}
              <div className="relative min-h-[280px] sm:min-h-[380px] lg:min-h-[520px]">
                <Image
                  src="/services/biathlon-pour.jpg"
                  alt="SkiTrack en action"
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover"
                  priority
                />
                {/* Desktop: gradient toward text panel */}
                <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-transparent via-transparent to-deep/75 lg:block" />
                {/* Mobile: gradient toward bottom */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-deep/85 lg:hidden" />
              </div>

              {/* Right: content */}
              <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-sky/28 bg-sky/10 px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.32em] text-sky">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky animate-glow-pulse" />
                  SkiTrack
                </span>

                <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.8rem]">
                  Du terrain à la décision.
                </h2>

                <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55 sm:text-[15px]">
                  Centralisez les tests matériel, tracez les retours athlètes et générez des tableaux
                  de bord décisionnels exploitables immédiatement — sans friction.
                </p>

                {/* Stats inside card */}
                <div className="mt-8 grid grid-cols-2 gap-3">
                  {[
                    { n: "3+", l: "solutions actives" },
                    { n: "2 sem.", l: "délai déploiement" },
                  ].map((s) => (
                    <div key={s.n} className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3">
                      <span className="font-display text-2xl font-bold text-white">{s.n}</span>
                      <p className="mt-0.5 text-[10px] uppercase tracking-[0.22em] text-white/42">{s.l}</p>
                    </div>
                  ))}
                </div>

                <Link
                  href="/skitrack"
                  className="btn-shine mt-8 inline-flex w-fit items-center gap-2.5 rounded-full border border-white/22 bg-white/10 px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-sm transition hover:bg-white hover:text-ink"
                >
                  Voir SkiTrack <Arrow />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            SERVICES — ASYMMETRIC TRIO
            Taste-skill: NO 3-equal-cols (anti-slop)
            Grid: 2fr / 1.4fr / 1fr
        ══════════════════════════════════════ */}
        <section
          className="mx-auto w-full max-w-[1440px] px-5 pb-16 sm:px-8 sm:pb-24 xl:px-14"
          data-reveal
          style={r(40)}
        >
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
              Et bien plus encore
            </h2>
            <Link
              href="/services"
              className="hidden items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-deep transition hover:opacity-70 sm:inline-flex"
            >
              Tout voir <Arrow className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[2fr_1.5fr_1.1fr]">
            {services.map((s, i) => (
              <article
                key={s.badge}
                className={`hover-gradient-border group relative overflow-hidden rounded-[28px] border border-line p-6 shadow-[0_12px_36px_rgba(35,48,54,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_56px_rgba(35,48,54,0.16)] sm:p-7 ${s.bg}`}
                data-reveal
                style={r(60 + i * 80)}
              >
                {/* Gradient accent line */}
                <div className={`mb-5 h-0.5 w-8 rounded-full transition-all duration-300 group-hover:w-12 ${s.bg.includes("deep") ? "bg-gradient-to-r from-sky to-white/50" : "bg-gradient-to-r from-deep to-sky"}`} />

                <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-2xl ${s.bg.includes("deep") ? "bg-white/12 text-white" : "bg-gradient-to-br from-deep/80 to-sky/50 text-white"}`}>
                  {s.icon}
                </div>

                <span className={`text-[9px] font-bold uppercase tracking-[0.3em] ${s.bg.includes("deep") ? "text-white/40" : "text-ink/38"}`}>
                  {s.badge}
                </span>
                <h3 className={`mt-2 text-xl font-semibold leading-tight ${s.bg.includes("deep") ? "text-white" : "text-ink"}`}>
                  {s.title}
                </h3>
                <p className={`mt-2 text-[13px] leading-relaxed ${s.bg.includes("deep") ? "text-white/52" : "text-ink/58"}`}>
                  {s.desc}
                </p>
                <Link
                  href={s.href}
                  className={`mt-5 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] transition-all duration-200 group-hover:gap-2.5 ${s.bg.includes("deep") ? "text-sky" : "text-deep"}`}
                >
                  {s.cta} <Arrow className="h-3 w-3" />
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════
            STATS — EDITORIAL HUGE NUMBERS
            Taste-skill: typography as primary design tool
        ══════════════════════════════════════ */}
        <section className="bg-deep" data-reveal style={r(50)}>
          <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24 xl:px-14">
            {/* Decorative orb */}
            <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 translate-x-1/2 -translate-y-1/2 rounded-full bg-sky/8 blur-3xl" />
            <div className="relative grid gap-12 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-white/10">
              {statsEditorial.map((s, i) => (
                <div
                  key={s.n}
                  className="sm:px-12 sm:first:pl-0 sm:last:pr-0"
                  data-reveal
                  style={r(60 + i * 90)}
                >
                  <span className="font-display text-[3.5rem] font-bold leading-none text-white sm:text-[4.5rem] lg:text-[5.5rem]">
                    {s.n}
                  </span>
                  <p className="mt-4 text-base font-semibold text-white">{s.label}</p>
                  <p className="mt-1 text-sm text-white/42">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            TESTIMONIAL — EDITORIAL PULL QUOTE
            Taste-skill: single powerful quote, NOT a grid of cards
        ══════════════════════════════════════ */}
        <section
          className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 sm:py-28 xl:px-14"
          data-reveal
          style={r(60)}
        >
          <div className="mx-auto max-w-3xl">
            {/* Decorative separator */}
            <div className="mb-10 flex items-center gap-4">
              <div className="h-px flex-1 bg-line" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-ink/35">
                Témoignage terrain
              </span>
              <div className="h-px flex-1 bg-line" />
            </div>

            {/* Giant quote mark */}
            <svg className="mb-5 h-14 w-14 text-sky/28" viewBox="0 0 32 32" fill="currentColor">
              <path d="M0 16C0 7.163 7.163 0 16 0v6C10.477 6 6 10.477 6 16v2h6v14H0V16zm18 0C18 7.163 25.163 0 34 0v6C28.477 6 24 10.477 24 16v2h6v14H18V16z" />
            </svg>

            <blockquote className="font-display text-2xl font-semibold leading-[1.2] text-ink sm:text-3xl lg:text-[2.5rem]">
              &ldquo;Les chiffres clés sont lisibles immédiatement. Les décisions staff sont plus
              rapides et mieux assumées.&rdquo;
            </blockquote>

            <div className="mt-8 flex items-center justify-between border-t border-line pt-6">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-deep">Coach</p>
                <p className="mt-0.5 text-[11px] text-ink/42">Ski nordique</p>
              </div>
              <Link
                href="/services/web"
                className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/48 transition hover:text-deep"
              >
                Voir Web & iOS <Arrow className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            ABOUT — EDITORIAL SPLIT
            Taste-skill: "Z-Axis cascade" feel, numbered highlights,
            NOT a symmetric double-card
        ══════════════════════════════════════ */}
        <section
          className="mx-auto w-full max-w-[1440px] px-5 pb-16 sm:px-8 sm:pb-24 xl:px-14"
          data-reveal
          style={r(70)}
        >
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            {/* Text */}
            <div className="flex flex-col justify-center">
              <div className="mb-6 h-px bg-line" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-ink/38">
                Qui suis-je
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-[2.8rem]">
                Un interlocuteur unique,
                <br />
                <span className="text-gradient">de l&apos;idée à la solution.</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ink/55 sm:text-[16px]">
                Je pilote InMotion Performance avec une approche simple: écouter le besoin réel,
                transformer l&apos;idée en solution utile et livrer une expérience claire pour les
                athlètes, les coachs, les staffs et les marques.
              </p>

              {/* Numbered highlights — editorial numbered list */}
              <ol className="mt-8 space-y-0">
                {aboutHighlights.map((text, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-5 border-b border-line/60 py-4 first:border-t"
                  >
                    <span className="font-display text-4xl font-bold leading-none text-deep/12">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-2 text-sm leading-relaxed text-ink/65">{text}</span>
                  </li>
                ))}
              </ol>

              <Link
                href="/contact"
                className="btn-shine mt-8 inline-flex w-fit items-center gap-2.5 rounded-full bg-deep px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_12px_32px_rgba(36,67,87,0.32)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(36,67,87,0.42)]"
              >
                Échanger sur votre projet <Arrow />
              </Link>
            </div>

            {/* Image */}
            <div
              className="group relative overflow-hidden rounded-[2rem] shadow-[0_28px_72px_rgba(35,48,54,0.2)]"
              data-reveal
              style={r(100)}
            >
              <div className="relative min-h-[380px] h-full">
                <Image
                  src="/services/photo/DSC03145.JPG"
                  alt="Fondateur InMotion Performance"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep/38 to-transparent" />
                {/* Corner glass badge */}
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="glass-dark rounded-xl border border-white/15 px-4 py-3">
                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/48">Fondateur</p>
                    <p className="mt-0.5 text-sm font-semibold text-white">InMotion Performance · Chamonix</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            CTA — DARK MINIMAL STRIP
            Taste-skill: AIDA action layer, clean, no frills
        ══════════════════════════════════════ */}
        <section
          className="mx-auto w-full max-w-[1440px] px-5 pb-8 sm:px-8 xl:px-14"
          data-reveal
          style={r(80)}
        >
          {/* Double-bezel outer ring */}
          <div className="rounded-[2.5rem] bg-ink/6 p-1.5">
            <div className="relative overflow-hidden rounded-[2.2rem] bg-deep px-8 py-12 shadow-[0_32px_80px_rgba(8,16,25,0.38)] sm:px-14 sm:py-16">
              {/* Orbs */}
              <div className="pointer-events-none absolute -right-12 -top-12 h-72 w-72 rounded-full bg-sky/10 blur-3xl animate-glow-pulse" />
              <div className="pointer-events-none absolute -bottom-8 left-1/3 h-56 w-56 rounded-full bg-sky/7 blur-3xl" />
              {/* Grid */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.045]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)",
                  backgroundSize: "38px 38px",
                }}
              />

              <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/38">
                    Prêt à démarrer ?
                  </p>
                  <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[3.2rem]">
                    Votre terrain mérite
                    <br />
                    <span className="text-gradient-light">une solution qui marche.</span>
                  </h2>
                  <p className="mt-4 max-w-lg text-base leading-relaxed text-white/48">
                    Un appel de 30 min. On clarifie votre besoin, on évalue la faisabilité et on
                    vous dit si on peut vous aider — sans engagement.
                  </p>
                </div>

                <div className="flex flex-col gap-3 lg:min-w-[220px]">
                  <Link
                    href="/contact"
                    className="btn-shine flex h-14 w-full items-center justify-center gap-2.5 rounded-2xl bg-white text-[12px] font-semibold uppercase tracking-[0.22em] text-deep shadow-[0_16px_48px_rgba(0,0,0,0.32)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_56px_rgba(0,0,0,0.42)] sm:h-auto sm:rounded-full sm:px-8 sm:py-4"
                  >
                    Réserver un appel <Arrow />
                  </Link>
                  <Link
                    href="/solutions"
                    className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl border border-white/18 text-[12px] font-semibold uppercase tracking-[0.22em] text-white/70 transition hover:border-white/35 hover:text-white sm:h-auto sm:rounded-full sm:px-7 sm:py-3.5"
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

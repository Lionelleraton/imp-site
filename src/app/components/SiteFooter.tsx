import Image from "next/image";
import Link from "next/link";

const navColumns = [
  {
    title: "Services",
    links: [
      { label: "Web & iOS", href: "/services/web" },
      { label: "Photo premium", href: "/services/photo" },
      { label: "SkiTrack", href: "/skitrack" },
      { label: "Sur-mesure", href: "/contact" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { label: "Nos solutions", href: "/solutions" },
      { label: "Choisir ses skis", href: "/choose-skis" },
      { label: "Galerie photo", href: "/services/photo/galerie" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="h-3.5 w-3.5"
    >
      <path d="M5 12h14" strokeLinecap="round" />
      <path d="m13.5 7 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SiteFooter() {
  return (
    <footer className="mt-16">
      <div className="mx-auto w-full max-w-[1400px] px-4 pb-16 sm:px-6 xl:px-10">
        <div className="overflow-hidden rounded-[28px] border border-line bg-white shadow-[0_22px_60px_rgba(35,48,54,0.12)]">

          {/* ── Main content ── */}
          <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-[1.6fr_0.75fr_0.75fr] md:items-start lg:p-10">
            {/* Brand + contact */}
            <div>
              <Image
                src="/brand/logo-dark-blue.svg"
                alt="InMotion Performance"
                width={220}
                height={64}
                className="h-7 w-auto"
              />
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/58">
                Solutions numériques et photo premium pour la performance en ski nordique et au-delà.
              </p>
              <div className="mt-5 space-y-2.5 text-sm text-ink/68">
                <a
                  href="mailto:inmotionperformance@icloud.com"
                  className="flex items-center gap-2.5 transition hover:text-deep"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    className="h-4 w-4 flex-shrink-0 text-sky"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2.5" />
                    <path d="m2 7 10 7 10-7" />
                  </svg>
                  inmotionperformance@icloud.com
                </a>
                <a
                  href="tel:+33665620084"
                  className="flex items-center gap-2.5 transition hover:text-deep"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    className="h-4 w-4 flex-shrink-0 text-sky"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.33 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.06 6.06l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  +33 6 65 62 00 84
                </a>
                <p className="flex items-center gap-2.5 text-ink/52">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    className="h-4 w-4 flex-shrink-0 text-sky"
                  >
                    <path d="M12 21c-4-4-7-7.5-7-11a7 7 0 1 1 14 0c0 3.5-3 7-7 11z" />
                    <circle cx="12" cy="10" r="2" />
                  </svg>
                  Chamonix Mont-Blanc, France
                </p>
              </div>
              <p className="mt-3 text-[10px] uppercase tracking-[0.22em] text-ink/38">
                Réponse rapide en 24h ouvrées
              </p>
            </div>

            {/* Nav columns */}
            {navColumns.map((col) => (
              <div key={col.title}>
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-ink/48">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group flex items-center gap-2 text-sm text-ink/62 transition hover:text-deep"
                      >
                        <span className="h-px w-3.5 rounded-full bg-sky/55 transition-all duration-200 group-hover:w-5 group-hover:bg-deep" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ── CTA strip ── */}
          <div className="border-t border-line bg-deep px-6 py-5 sm:px-8 lg:px-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/48">
                  Dernière étape
                </p>
                <h2 className="mt-1.5 text-xl font-semibold text-white sm:text-2xl">
                  Parlons de votre prochain cap
                </h2>
              </div>
              <Link
                href="/contact"
                className="btn-shine inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-deep shadow-[0_10px_28px_rgba(0,0,0,0.2)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(0,0,0,0.28)]"
              >
                Réserver un appel
                <ArrowIcon />
              </Link>
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div className="border-t border-line/50 px-6 py-4 sm:px-8 lg:px-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-[10px] text-ink/38">
                © {new Date().getFullYear()} InMotion Performance · Chamonix Mont-Blanc
              </p>
              <div className="overflow-hidden rounded-xl border border-line/65">
                <iframe
                  title="Carte Chamonix"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=6.861%2C45.915%2C6.885%2C45.930&layer=mapnik&marker=45.923%2C6.873"
                  className="h-16 w-36 opacity-70"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-16">
      <div className="mx-auto w-full max-w-[1400px] px-4 pb-16 sm:px-6 xl:px-10">
        <div className="rounded-[28px] border border-line bg-white p-6 shadow-[0_22px_60px_rgba(35,48,54,0.12)] sm:p-8">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60 sm:text-[11px] sm:tracking-[0.3em]">
                Informations clés
              </p>
              <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
                InMotion Performance
              </h2>
              <div className="mt-4 space-y-2 text-sm text-ink/70 sm:text-base">
                <p>inmotionperformance@icloud.com</p>
                <p>+33 6 65 62 00 84</p>
                <p>Chamonix Mont-Blanc, France</p>
              </div>
              <div className="mt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-deep px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-deep/90 sm:px-7 sm:py-3.5 sm:text-sm"
                >
                  Nous contacter
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-line bg-white/90 p-3 shadow-[0_14px_30px_rgba(35,48,54,0.12)]">
              <div className="overflow-hidden rounded-2xl border border-line">
                <iframe
                  title="Carte Chamonix"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=6.861%2C45.915%2C6.885%2C45.930&layer=mapnik&marker=45.923%2C6.873"
                  className="h-48 w-full"
                  loading="lazy"
                />
              </div>
              <p className="mt-3 text-xs text-ink/60">
                Localisation : Chamonix Mont-Blanc
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

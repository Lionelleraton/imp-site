import Link from "next/link";

export default function Services3dPage() {
  return (
    <main className="pb-24">
      <section className="mx-auto w-full max-w-[1400px] px-4 pt-10 sm:px-6 sm:pt-12 xl:px-10">
        <div className="grid items-end gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60 sm:text-[11px] sm:tracking-[0.3em]">
              Service 3D
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl md:text-6xl">
              Solutions 3D pour produits et contenus immersifs
            </h1>
            <p className="mt-4 max-w-2xl text-ink/70">
              Visualisations produits, rendus réalistes et supports marketing
              pour présenter clairement vos innovations.
            </p>
          </div>
          <div className="rounded-3xl border border-line bg-deep p-5 text-white shadow-[0_22px_60px_rgba(36,67,87,0.35)] sm:p-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/60 sm:text-[11px] sm:tracking-[0.3em]">
              Objectif
            </p>
            <p className="mt-3 text-lg font-semibold">
              Montrer, expliquer, convaincre avec des visuels premium.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-line bg-white/85 p-6 shadow-[0_18px_50px_rgba(35,48,54,0.1)]">
            <h3 className="text-lg font-semibold">Ce que nous livrons</h3>
            <ul className="mt-4 space-y-2 text-sm text-ink/70 sm:text-base">
              <li>Rendus réalistes, plans techniques, vues détaillées.</li>
              <li>Contenus adaptés aux sites, salons et supports internes.</li>
              <li>Déclinaisons pour marketing, fiches produits et social.</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white/85 p-6 shadow-[0_18px_50px_rgba(35,48,54,0.1)]">
            <h3 className="text-lg font-semibold">Galerie 3D</h3>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="h-20 rounded-xl bg-sky/15" />
              <div className="h-20 rounded-xl bg-deep/10" />
              <div className="h-20 rounded-xl bg-mist/70" />
              <div className="h-20 rounded-xl bg-mist/60" />
              <div className="h-20 rounded-xl bg-sky/20" />
              <div className="h-20 rounded-xl bg-deep/15" />
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex rounded-full bg-deep px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-deep/90"
          >
            Prendre un RDV
          </Link>
          <Link
            href="/services"
            className="inline-flex rounded-full border border-deep px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-deep transition hover:bg-deep hover:text-white"
          >
            Retour aux services
          </Link>
        </div>
      </section>
    </main>
  );
}

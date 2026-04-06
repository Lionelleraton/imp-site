import Link from "next/link";
import { readdirSync } from "fs";
import path from "path";
import PhotoGallery from "./PhotoGallery";

export default function ServicesPhotoPage() {
  const images = (() => {
    try {
      const dir = path.join(process.cwd(), "public/services/photo");
      return readdirSync(dir)
        .filter((name) => !name.startsWith("."))
        .sort()
        .map((name) => `/services/photo/${name}`);
    } catch {
      return [];
    }
  })();

  return (
    <main className="pb-24">
      <section className="mx-auto w-full max-w-[1400px] px-4 pt-10 sm:px-6 sm:pt-12 xl:px-10">
        <div className="grid items-end gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60 sm:text-[11px] sm:tracking-[0.3em]">
              Service photo
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl md:text-6xl">
              Couverture photo terrain, claire et exploitable
            </h1>
            <p className="mt-4 max-w-2xl text-ink/70">
              Contenu de qualité pour communication, sponsors, archives équipes et
              valorisation des événements.
            </p>
          </div>
          <div className="rounded-3xl border border-line bg-deep p-5 text-white shadow-[0_22px_60px_rgba(36,67,87,0.35)] sm:p-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/60 sm:text-[11px] sm:tracking-[0.3em]">
              Livraison
            </p>
            <p className="mt-3 text-lg font-semibold">
              Sélection rapide, contenus optimisés pour vos supports.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-line bg-white/85 p-6 shadow-[0_18px_50px_rgba(35,48,54,0.1)]">
            <h3 className="text-lg font-semibold">Ce que nous livrons</h3>
            <ul className="mt-4 space-y-2 text-sm text-ink/70 sm:text-base">
              <li>Reportage terrain et moments clés.</li>
              <li>Photos prêtes pour communication et réseaux.</li>
              <li>Archivage propre par dates et disciplines.</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white/85 p-6 shadow-[0_18px_50px_rgba(35,48,54,0.1)]">
            <h3 className="text-lg font-semibold">Galerie interactive</h3>
            <p className="mt-2 text-sm text-ink/70 sm:text-base">
              Cliquez sur une image pour l’afficher en grand.
            </p>
            <div className="mt-4">
              {images.length > 0 ? (
                <PhotoGallery images={images} />
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={`placeholder-${index}`}
                      className="h-20 rounded-xl bg-deep/10"
                    />
                  ))}
                </div>
              )}
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

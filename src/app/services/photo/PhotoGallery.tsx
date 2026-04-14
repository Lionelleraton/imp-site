"use client";

import Image from "next/image";
import { useState } from "react";

type PhotoGalleryProps = {
  images: string[];
  unoptimized?: boolean;
  downloadAllUrl?: string;
};

export default function PhotoGallery({
  images,
  unoptimized,
  downloadAllUrl,
}: PhotoGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isZipping, setIsZipping] = useState(false);
  const [zipProgress, setZipProgress] = useState(0);
  const activeSrc = activeIndex !== null ? images[activeIndex] : null;

  const close = () => setActiveIndex(null);
  const showPrev = () => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + images.length - 1) % images.length);
  };
  const showNext = () => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % images.length);
  };
  const downloadAll = async () => {
    if (isZipping) return;
    setIsZipping(true);
    setZipProgress(0);
    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();
      const total = images.length;

      for (let index = 0; index < total; index += 1) {
        const src = images[index];
        const response = await fetch(src);
        const blob = await response.blob();
        const filename = decodeURIComponent(
          src.split("/").pop()?.split("?")[0] ?? `image-${index + 1}.jpg`
        );
        zip.file(filename, blob);
        setZipProgress(Math.round(((index + 1) / total) * 100));
      }

      const zipBlob = await zip.generateAsync(
        { type: "blob" },
        (metadata) => {
          setZipProgress(Math.round(metadata.percent));
        }
      );

      const link = document.createElement("a");
      link.href = URL.createObjectURL(zipBlob);
      link.download = "galerie.zip";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error(error);
    } finally {
      setIsZipping(false);
    }
  };

  if (images.length === 0) {
    return (
      <div className="rounded-2xl border border-line bg-white/90 p-6 text-sm text-ink/70">
        Aucune image disponible pour le moment.
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.25em] text-ink/50">
          {images.length} photos disponibles
        </p>
        {downloadAllUrl ? (
          <a
            href={downloadAllUrl}
            download
            className="inline-flex items-center justify-center rounded-full border border-deep/20 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-deep transition hover:bg-deep/5"
          >
            Télécharger tout
          </a>
        ) : (
          <button
            type="button"
            onClick={downloadAll}
            disabled={isZipping}
            className="inline-flex items-center justify-center rounded-full border border-deep/20 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-deep transition hover:bg-deep/5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isZipping ? `Création du ZIP… ${zipProgress}%` : "Télécharger tout"}
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6">
        {images.map((src, index) => (
          <div
            key={src}
            className="overflow-hidden rounded-2xl border border-line bg-white/90 shadow-[0_10px_30px_rgba(35,48,54,0.08)]"
          >
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group w-full"
            >
              <div className="relative aspect-[4/5] w-full bg-mist/30">
                <Image
                  src={src}
                  alt="Photo terrain"
                  fill
                  sizes="(min-width: 1280px) 14vw, (min-width: 1024px) 16vw, (min-width: 768px) 22vw, (min-width: 640px) 30vw, 48vw"
                  unoptimized={unoptimized}
                  quality={100}
                  className="object-cover transition duration-300 group-hover:scale-[1.05]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
              </div>
            </button>
            <div className="flex items-center justify-between border-t border-line/70 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-ink/50">
              <span>Image {index + 1}</span>
              <a
                href={src}
                download
                className="rounded-full border border-deep/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-deep transition hover:bg-deep/5"
              >
                Télécharger
              </a>
            </div>
          </div>
        ))}
      </div>

      {activeIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90">
          <button
            type="button"
            onClick={close}
            className="absolute inset-0 h-full w-full cursor-zoom-out"
            aria-label="Fermer"
          />
          <div className="pointer-events-none absolute left-0 right-0 top-0 flex items-center justify-between px-6 py-5">
            <p className="text-xs uppercase tracking-[0.25em] text-white/70">
              Galerie privée
            </p>
            <div className="pointer-events-auto flex items-center gap-3">
              {activeSrc ? (
                <a
                  href={activeSrc}
                  download
                  className="rounded-full border border-white/40 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur"
                >
                  Télécharger
                </a>
              ) : null}
              <button
                type="button"
                onClick={close}
                className="rounded-full border border-white/40 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur"
              >
                Fermer
              </button>
            </div>
          </div>
          {images.length > 1 ? (
            <button
              type="button"
              onClick={showPrev}
              className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-white/10 px-3 py-2 text-sm font-semibold text-white backdrop-blur"
              aria-label="Image précédente"
            >
              ◀
            </button>
          ) : null}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 pb-10 pt-16">
            <div className="pointer-events-auto w-full max-w-6xl">
              <Image
                src={activeSrc ?? images[0]}
                alt="Photo terrain"
                width={2000}
                height={1400}
                unoptimized={unoptimized}
                quality={100}
                className="max-h-[80vh] w-full rounded-3xl object-contain shadow-[0_30px_120px_rgba(0,0,0,0.45)]"
              />
            </div>
          </div>
          {images.length > 1 ? (
            <button
              type="button"
              onClick={showNext}
              className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-white/10 px-3 py-2 text-sm font-semibold text-white backdrop-blur"
              aria-label="Image suivante"
            >
              ▶
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type PhotoGalleryProps = {
  images: string[];
  unoptimized?: boolean;
  downloadAllUrl?: string;
  totalBytes?: number | null;
};

// Pour les sources proxy (Dropbox/Drive) la miniature est servie par défaut ;
// on demande l'original en pleine résolution pour le téléchargement (dl=1).
function fullResUrl(src: string): string {
  if (!src.startsWith("/api/gallery/")) return src;
  return src + (src.includes("?") ? "&" : "?") + "dl=1";
}

function fileNameFromSrc(src: string, index: number): string {
  return decodeURIComponent(
    src.split("/").pop()?.split("?")[0] ?? `image-${index + 1}.jpg`
  );
}

function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 o";
  const units = ["o", "Ko", "Mo", "Go", "To"];
  let value = bytes;
  let index = 0;
  while (value >= 1024 && index < units.length - 1) {
    value /= 1024;
    index += 1;
  }
  const precision = value >= 100 ? 0 : value >= 10 ? 1 : 2;
  return `${value.toFixed(precision)} ${units[index]}`;
}

const IconDownload = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className} aria-hidden="true">
    <path d="M12 4v11m0 0l-4-4m4 4l4-4M5 19h14" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconClose = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className} aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
  </svg>
);
const IconChevron = ({ className = "", dir = "left" }: { className?: string; dir?: "left" | "right" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className} aria-hidden="true">
    <path d={dir === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function PhotoGallery({
  images,
  downloadAllUrl,
  totalBytes,
}: PhotoGalleryProps) {
  const [active, setActive] = useState<number | null>(null);
  const [isZipping, setIsZipping] = useState(false);
  const [zipProgress, setZipProgress] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i + images.length - 1) % images.length)),
    [images.length]
  );
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active, close, prev, next]);

  const downloadSingle = async (src: string, index: number) => {
    try {
      const response = await fetch(fullResUrl(src));
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileNameFromSrc(src, index);
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error(error);
    }
  };

  const downloadAll = async () => {
    if (isZipping) return;
    setIsZipping(true);
    setZipProgress(0);
    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();
      for (let i = 0; i < images.length; i += 1) {
        const response = await fetch(fullResUrl(images[i]));
        const blob = await response.blob();
        zip.file(fileNameFromSrc(images[i], i), blob);
        setZipProgress(Math.round(((i + 1) / images.length) * 100));
      }
      const zipBlob = await zip.generateAsync({ type: "blob" }, (m) =>
        setZipProgress(Math.round(m.percent))
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
      <div className="rounded-2xl border border-line bg-panel/80 p-8 text-center text-sm text-ink/70">
        Aucune photo pour le moment. Elles apparaîtront ici dès leur mise en ligne.
      </div>
    );
  }

  const activeSrc = active !== null ? images[active] : null;
  const btnBase =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition";

  return (
    <div>
      {/* Barre d'actions */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">
          {images.length} photo{images.length > 1 ? "s" : ""}
          {typeof totalBytes === "number" && totalBytes > 0 ? ` · ${formatBytes(totalBytes)}` : ""}
        </p>
        {downloadAllUrl ? (
          <a href={downloadAllUrl} download className={`${btnBase} bg-deep text-white hover:brightness-110`}>
            <IconDownload className="h-4 w-4" /> Tout télécharger
          </a>
        ) : (
          <button
            type="button"
            onClick={downloadAll}
            disabled={isZipping}
            className={`${btnBase} bg-deep text-white hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60`}
          >
            <IconDownload className="h-4 w-4" />
            {isZipping ? `ZIP… ${zipProgress}%` : "Tout télécharger"}
          </button>
        )}
      </div>

      {/* Mosaïque */}
      <div className="columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4 [&>*]:mb-3 sm:[&>*]:mb-4">
        {images.map((src, i) => (
          <div
            key={src}
            className="group relative block break-inside-avoid overflow-hidden rounded-xl bg-mist/40 shadow-[0_2px_10px_rgba(31,39,36,0.06)] transition duration-300 hover:shadow-[0_14px_40px_rgba(31,39,36,0.16)]"
          >
            <button
              type="button"
              onClick={() => setActive(i)}
              className="block w-full cursor-zoom-in"
              aria-label={`Agrandir la photo ${i + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Photo ${i + 1}`}
                loading="lazy"
                decoding="async"
                className="h-auto w-full object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
              />
            </button>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                downloadSingle(src, i);
              }}
              aria-label={`Télécharger la photo ${i + 1}`}
              className="absolute right-2.5 top-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm backdrop-blur transition hover:bg-white hover:text-deep opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
            >
              <IconDownload className="h-[18px] w-[18px]" />
            </button>
          </div>
        ))}
      </div>

      {/* Visionneuse plein écran */}
      {active !== null && activeSrc && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-sm"
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
            if (Math.abs(dx) > 50) (dx > 0 ? prev : next)();
            touchStartX.current = null;
          }}
        >
          {/* Barre haut */}
          <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/70">
              {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </span>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => downloadSingle(activeSrc, active)}
                className="flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white/20"
              >
                <IconDownload className="h-4 w-4" />
                <span className="hidden sm:inline">Télécharger</span>
              </button>
              <button
                type="button"
                onClick={close}
                aria-label="Fermer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:bg-white/20"
              >
                <IconClose className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="relative flex flex-1 items-center justify-center overflow-hidden px-3 pb-4 sm:px-16">
            <button
              type="button"
              onClick={close}
              aria-label="Fermer"
              className="absolute inset-0 cursor-zoom-out"
              tabIndex={-1}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeSrc}
              alt={`Photo ${active + 1}`}
              className="relative max-h-full max-w-full rounded-lg object-contain shadow-[0_30px_120px_rgba(0,0,0,0.5)]"
            />
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Précédente"
                  className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/40 text-white transition hover:bg-black/70 sm:left-5 sm:h-12 sm:w-12"
                >
                  <IconChevron dir="left" className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Suivante"
                  className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/40 text-white transition hover:bg-black/70 sm:right-5 sm:h-12 sm:w-12"
                >
                  <IconChevron dir="right" className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

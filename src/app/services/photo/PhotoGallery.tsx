"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type ZipPart = { url: string; bytes: number; count: number };

type PhotoGalleryProps = {
  images: string[];
  unoptimized?: boolean;
  downloadAllUrl?: string;
  totalBytes?: number | null;
  /** Archives ZIP générées côté serveur (diffusées en flux, sans limite mémoire). */
  zipParts?: ZipPart[];
};

type Toast = { kind: "info" | "success" | "error"; text: string } | null;

// Au-delà, on ne fabrique plus le ZIP dans le navigateur (risque mémoire mobile).
const CLIENT_ZIP_MAX_BYTES = 300 * 1024 * 1024;

// Pour les sources proxy (Dropbox/Drive) la miniature est servie par défaut ;
// on demande l'original en pleine résolution pour le téléchargement (dl=1).
function fullResUrl(src: string): string {
  if (!src.startsWith("/api/gallery/")) return src;
  return src + (src.includes("?") ? "&" : "?") + "dl=1";
}

function fileNameFromSrc(src: string, index: number): string {
  try {
    return decodeURIComponent(src.split("/").pop()?.split("?")[0] || `photo-${index + 1}.jpg`);
  } catch {
    return `photo-${index + 1}.jpg`;
  }
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
  return `${value.toFixed(precision).replace(".", ",")} ${units[index]}`;
}

async function fetchBlob(url: string): Promise<Blob> {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const blob = await res.blob();
  if (blob.size === 0) throw new Error("Fichier vide");
  return blob;
}

function saveBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
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
const Spinner = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`animate-spin ${className}`} aria-hidden="true">
    <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2.5" />
    <path d="M21 12a9 9 0 0 0-9-9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export default function PhotoGallery({
  images,
  downloadAllUrl,
  totalBytes,
  zipParts,
}: PhotoGalleryProps) {
  const [active, setActive] = useState<number | null>(null);
  const [busy, setBusy] = useState<Set<number>>(new Set());
  const [zipping, setZipping] = useState<number | null>(null); // % pendant le ZIP navigateur
  const [toast, setToast] = useState<Toast>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((t: Toast, ms = 4500) => {
    setToast(t);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    if (t) toastTimer.current = setTimeout(() => setToast(null), ms);
  }, []);

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
    if (busy.has(index)) return;
    setBusy((s) => new Set(s).add(index));
    showToast({ kind: "info", text: "Téléchargement en cours…" }, 60_000);
    try {
      const blob = await fetchBlob(fullResUrl(src));
      saveBlob(blob, fileNameFromSrc(src, index));
      showToast({ kind: "success", text: "Photo téléchargée." });
    } catch {
      showToast(
        { kind: "error", text: "Le téléchargement a échoué. Vérifiez votre connexion puis réessayez." },
        7000
      );
    } finally {
      setBusy((s) => {
        const n = new Set(s);
        n.delete(index);
        return n;
      });
    }
  };

  // ZIP fabriqué dans le navigateur : uniquement pour les petites galeries
  // sans archive serveur (anciennes galeries).
  const canClientZip =
    !zipParts && !downloadAllUrl && (totalBytes ?? 0) <= CLIENT_ZIP_MAX_BYTES && images.length <= 120;

  const clientZip = async () => {
    if (zipping !== null) return;
    setZipping(0);
    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();
      for (let i = 0; i < images.length; i += 1) {
        const blob = await fetchBlob(fullResUrl(images[i]));
        zip.file(fileNameFromSrc(images[i], i), blob);
        setZipping(Math.round(((i + 1) / images.length) * 90));
      }
      const zipBlob = await zip.generateAsync({ type: "blob", compression: "STORE" });
      saveBlob(zipBlob, "galerie.zip");
      showToast({ kind: "success", text: "Archive téléchargée." });
    } catch {
      showToast(
        { kind: "error", text: "L’archive n’a pas pu être créée. Téléchargez les photos une à une." },
        8000
      );
    } finally {
      setZipping(null);
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
  const btnPrimary =
    "inline-flex items-center justify-center gap-2 rounded-full bg-deep px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition hover:brightness-110";
  const btnOutline =
    "inline-flex items-center justify-center gap-2 rounded-full border border-deep/30 bg-panel px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-deep transition hover:bg-deep/5";

  return (
    <div>
      {/* Barre d'actions */}
      <div className="mb-6 border-b border-line pb-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/60">
            {images.length} photo{images.length > 1 ? "s" : ""}
            {typeof totalBytes === "number" && totalBytes > 0 ? ` · ${formatBytes(totalBytes)}` : ""}
          </p>

          {zipParts && zipParts.length === 1 ? (
            <a href={zipParts[0].url} download className={btnPrimary}>
              <IconDownload className="h-4 w-4" /> Tout télécharger
            </a>
          ) : null}
          {!zipParts && downloadAllUrl ? (
            <a href={downloadAllUrl} download className={btnPrimary}>
              <IconDownload className="h-4 w-4" /> Tout télécharger
            </a>
          ) : null}
          {canClientZip ? (
            <button type="button" onClick={clientZip} disabled={zipping !== null} className={`${btnPrimary} disabled:opacity-60`}>
              {zipping !== null ? <Spinner className="h-4 w-4" /> : <IconDownload className="h-4 w-4" />}
              {zipping !== null ? `Préparation… ${zipping}%` : "Tout télécharger"}
            </button>
          ) : null}
        </div>

        {zipParts && zipParts.length > 1 ? (
          <div className="mt-4 rounded-xl border border-line bg-panel/70 p-4">
            <p className="text-sm text-ink/75">
              Galerie volumineuse : elle est découpée en {zipParts.length} archives pour un
              téléchargement fiable, même sur téléphone.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {zipParts.map((part, i) => (
                <a key={`${i}-${part.url}`} href={part.url} download className={btnOutline}>
                  <IconDownload className="h-4 w-4 shrink-0" />
                  <span>
                    Partie {i + 1}
                    <span className="font-normal normal-case tracking-normal text-ink/60">
                      {" "}· {part.count} photos · {formatBytes(part.bytes)}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        ) : null}

        {!zipParts && !downloadAllUrl && !canClientZip ? (
          <p className="mt-3 text-sm text-ink/65">
            Galerie volumineuse : téléchargez les photos une à une avec le bouton sur chaque image.
          </p>
        ) : null}
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
              className="absolute right-2.5 top-2.5 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink opacity-100 shadow-sm backdrop-blur transition hover:bg-white hover:text-deep sm:opacity-0 sm:group-hover:opacity-100"
            >
              {busy.has(i) ? <Spinner className="h-[18px] w-[18px]" /> : <IconDownload className="h-[18px] w-[18px]" />}
            </button>
          </div>
        ))}
      </div>

      {/* Visionneuse plein écran, rendue à la racine du document pour couvrir
          tout l'écran quel que soit le conteneur (correctif iPhone). */}
      {active !== null && activeSrc
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label={`Photo ${active + 1} sur ${images.length}`}
              className="fixed inset-0 z-[10000] flex h-[100dvh] flex-col overflow-hidden bg-black/95 backdrop-blur-sm"
              onTouchStart={(e) => {
                const t = e.touches[0];
                touchStart.current = t ? { x: t.clientX, y: t.clientY } : null;
              }}
              onTouchEnd={(e) => {
                if (!touchStart.current) return;
                const t = e.changedTouches[0];
                const dx = (t?.clientX ?? 0) - touchStart.current.x;
                const dy = (t?.clientY ?? 0) - touchStart.current.y;
                touchStart.current = null;
                // Glissement vers le bas = fermer ; horizontal = photo précédente/suivante.
                if (Math.abs(dy) > Math.abs(dx) && dy > 80) {
                  close();
                  return;
                }
                if (Math.abs(dx) > 50) (dx > 0 ? prev : next)();
              }}
            >
              {/* Haut : compteur, télécharger, fermer */}
              <div className="flex shrink-0 items-center justify-between gap-3 px-4 pb-2 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6 sm:pb-4">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/75">
                  {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => downloadSingle(activeSrc, active)}
                    disabled={busy.has(active)}
                    aria-label="Télécharger la photo"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:bg-white/20 disabled:opacity-70"
                  >
                    {busy.has(active) ? <Spinner className="h-5 w-5" /> : <IconDownload className="h-5 w-5" />}
                  </button>
                  <button
                    type="button"
                    onClick={close}
                    aria-label="Fermer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:bg-white/20"
                  >
                    <IconClose className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Image */}
              <div className="relative min-h-0 flex-1 overflow-hidden px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-16">
                <button
                  type="button"
                  onClick={close}
                  aria-label="Fermer"
                  className="absolute inset-0 cursor-zoom-out"
                  tabIndex={-1}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={activeSrc}
                  src={activeSrc}
                  alt={`Photo ${active + 1}`}
                  className="pointer-events-none relative h-full w-full object-contain"
                />
                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={prev}
                      aria-label="Photo précédente"
                      className="absolute left-5 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/40 text-white transition hover:bg-black/70 sm:flex"
                    >
                      <IconChevron dir="left" className="h-6 w-6" />
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      aria-label="Photo suivante"
                      className="absolute right-5 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/40 text-white transition hover:bg-black/70 sm:flex"
                    >
                      <IconChevron dir="right" className="h-6 w-6" />
                    </button>
                  </>
                )}
              </div>

            </div>,
            document.body
          )
        : null}

      {/* Message d'état (succès / erreur), lui aussi à la racine du document */}
      {toast
        ? createPortal(
            <div
              role={toast.kind === "error" ? "alert" : "status"}
              aria-live="polite"
              className={`fixed left-1/2 top-[max(1rem,env(safe-area-inset-top))] z-[10001] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-xl px-4 py-3 text-center text-sm font-medium shadow-xl ${
                toast.kind === "error"
                  ? "bg-[#7f1d1d] text-white"
                  : toast.kind === "success"
                    ? "bg-[#1f2724] text-white"
                    : "bg-white text-[#1f2724]"
              }`}
            >
              {toast.text}
            </div>,
            document.body
          )
        : null}
    </div>
  );
}

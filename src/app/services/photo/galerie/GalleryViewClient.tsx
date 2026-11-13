"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import PhotoGallery, { type ZipPart } from "../PhotoGallery";

type GalleryViewClientProps = {
  manifestUrl?: string | null;
  initialImages?: string[];
  downloadAllUrl?: string;
  unoptimized?: boolean;
};

type LoadError = { message: string; expired?: boolean };

export default function GalleryViewClient({
  manifestUrl,
  initialImages = [],
  downloadAllUrl,
}: GalleryViewClientProps) {
  const [images, setImages] = useState<string[]>(initialImages);
  const [totalBytes, setTotalBytes] = useState<number | null>(null);
  const [zipParts, setZipParts] = useState<ZipPart[] | undefined>(undefined);
  const [loading, setLoading] = useState(Boolean(manifestUrl));
  const [error, setError] = useState<LoadError | null>(null);
  const [attempt, setAttempt] = useState(0);

  const retry = useCallback(() => {
    setError(null);
    setLoading(true);
    setAttempt((n) => n + 1);
  }, []);

  useEffect(() => {
    if (!manifestUrl) return;
    let cancelled = false;

    fetch(manifestUrl, { cache: "no-store" })
      .then(async (res) => {
        if (res.status === 401 || res.status === 403) {
          throw { message: "Votre session a expiré.", expired: true } as LoadError;
        }
        if (!res.ok) {
          throw { message: "La galerie est momentanément indisponible." } as LoadError;
        }
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        const list = Array.isArray(data) ? data : data?.images;
        if (Array.isArray(list)) setImages(list as string[]);
        if (!Array.isArray(data)) {
          if (typeof data?.totalBytes === "number") setTotalBytes(data.totalBytes);
          if (Array.isArray(data?.zipParts)) setZipParts(data.zipParts as ZipPart[]);
        }
        setLoading(false);
      })
      .catch((err: LoadError | Error) => {
        if (cancelled) return;
        setError(
          "message" in err && "expired" in err
            ? (err as LoadError)
            : { message: "Connexion impossible. Vérifiez votre réseau." }
        );
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [manifestUrl, attempt]);

  if (loading) {
    return (
      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-4" aria-busy="true" aria-label="Chargement des photos">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-[4/5] animate-pulse rounded-xl bg-mist/60" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div role="alert" className="rounded-2xl border border-line bg-panel p-6 text-center">
        <p className="text-base font-semibold text-ink">{error.message}</p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          {error.expired ? (
            <Link
              href="/services/photo/galerie"
              className="inline-flex items-center justify-center rounded-full bg-deep px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white"
            >
              Saisir mon code
            </Link>
          ) : (
            <button
              type="button"
              onClick={retry}
              className="inline-flex items-center justify-center rounded-full bg-deep px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white"
            >
              Réessayer
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <PhotoGallery
      images={images}
      downloadAllUrl={downloadAllUrl}
      totalBytes={totalBytes}
      zipParts={zipParts}
    />
  );
}

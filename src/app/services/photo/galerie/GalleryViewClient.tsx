"use client";

import { useEffect, useState } from "react";
import PhotoGallery from "../PhotoGallery";

type GalleryViewClientProps = {
  manifestUrl?: string | null;
  initialImages?: string[];
  downloadAllUrl?: string;
};

export default function GalleryViewClient({
  manifestUrl,
  initialImages = [],
  downloadAllUrl,
}: GalleryViewClientProps) {
  const [images, setImages] = useState<string[]>(initialImages);
  const [loading, setLoading] = useState(Boolean(manifestUrl));

  useEffect(() => {
    if (!manifestUrl) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    fetch(manifestUrl)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled) return;
        const list = Array.isArray(data) ? data : data?.images;
        if (Array.isArray(list)) {
          setImages(list as string[]);
        }
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [manifestUrl]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-line bg-white/90 p-6 text-sm text-ink/70">
        Chargement des images…
      </div>
    );
  }

  return (
    <PhotoGallery
      images={images}
      unoptimized
      downloadAllUrl={downloadAllUrl}
    />
  );
}

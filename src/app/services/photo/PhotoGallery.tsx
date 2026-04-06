"use client";

import Image from "next/image";
import { useState } from "react";

type PhotoGalleryProps = {
  images: string[];
};

export default function PhotoGallery({ images }: PhotoGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = () => setActiveIndex(null);
  const showPrev = () => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + images.length - 1) % images.length);
  };
  const showNext = () => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % images.length);
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group relative overflow-hidden rounded-2xl border border-line bg-white/80 text-left shadow-[0_10px_30px_rgba(35,48,54,0.08)] transition-transform duration-300 hover:scale-[1.02]"
          >
            <Image
              src={src}
              alt="Photo terrain"
              width={520}
              height={360}
              className="h-28 w-full object-cover transition duration-300 group-hover:scale-[1.05] sm:h-36"
            />
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">
          <button
            type="button"
            onClick={close}
            className="absolute right-6 top-6 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-deep"
          >
            Fermer
          </button>
          <button
            type="button"
            onClick={showPrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-sm font-semibold text-deep"
            aria-label="Image précédente"
          >
            ◀
          </button>
          <div className="relative w-full max-w-4xl">
            <Image
              src={images[activeIndex]}
              alt="Photo terrain"
              width={1600}
              height={1060}
              className="h-[70vh] w-full rounded-3xl object-contain"
            />
          </div>
          <button
            type="button"
            onClick={showNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-sm font-semibold text-deep"
            aria-label="Image suivante"
          >
            ▶
          </button>
        </div>
      )}
    </div>
  );
}

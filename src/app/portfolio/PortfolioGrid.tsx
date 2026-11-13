"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { PortfolioCategory, PortfolioPhoto } from "@/data/portfolio";

type Props = {
  photos: PortfolioPhoto[];
  categories: { id: PortfolioCategory; label: string }[];
  monoClass: string;
};

const IconClose = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5" aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
  </svg>
);
const IconChevron = ({ dir }: { dir: "left" | "right" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-6 w-6" aria-hidden="true">
    <path d={dir === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function PortfolioGrid({ photos, categories, monoClass }: Props) {
  const [filter, setFilter] = useState<PortfolioCategory | "all">("all");
  const [active, setActive] = useState<number | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const visible = useMemo(
    () => (filter === "all" ? photos : photos.filter((p) => p.category === filter)),
    [filter, photos]
  );
  const counts = useMemo(() => {
    const m = new Map<PortfolioCategory, number>();
    photos.forEach((p) => m.set(p.category, (m.get(p.category) ?? 0) + 1));
    return m;
  }, [photos]);

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i + visible.length - 1) % visible.length)),
    [visible.length]
  );
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % visible.length)),
    [visible.length]
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

  const current = active !== null ? visible[active] : null;
  const chip = (on: boolean) =>
    `${monoClass} rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.1em] transition ${
      on
        ? "border-[#B15F38] bg-[#B15F38] text-[#FBF9F3]"
        : "border-[rgba(31,39,36,0.18)] text-[#5E655D] hover:border-[rgba(31,39,36,0.35)] hover:text-[#1F2724]"
    }`;

  return (
    <div>
      {/* Filtres */}
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filtrer par thème">
        <button type="button" onClick={() => setFilter("all")} aria-pressed={filter === "all"} className={chip(filter === "all")}>
          Tout · {photos.length}
        </button>
        {categories
          .filter((c) => (counts.get(c.id) ?? 0) > 0)
          .map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setFilter(c.id)}
              aria-pressed={filter === c.id}
              className={chip(filter === c.id)}
            >
              {c.label} · {counts.get(c.id)}
            </button>
          ))}
      </div>

      {/* Mosaïque */}
      <div className="columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4 [&>*]:mb-3 sm:[&>*]:mb-4">
        {visible.map((p, i) => (
          <button
            key={p.src}
            type="button"
            onClick={() => setActive(i)}
            className="group relative block w-full break-inside-avoid overflow-hidden rounded-xl bg-[#E3DBC8] text-left shadow-[0_2px_10px_rgba(31,39,36,0.06)]"
            aria-label={`Agrandir : ${p.title}, ${p.place}`}
          >
            <Image
              src={p.src}
              alt={`${p.title}, ${p.place}. Photo de Lionel Jouannaud, photographe sport et outdoor.`}
              width={p.width}
              height={p.height}
              sizes="(min-width:1024px) 25vw, (min-width:640px) 33vw, 50vw"
              className="h-auto w-full transition duration-500 ease-out group-hover:scale-[1.04]"
            />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-3 pb-2.5 pt-10 opacity-0 transition duration-300 group-hover:opacity-100 [@media(hover:none)]:opacity-100">
              <span className="block text-[14px] font-bold leading-tight text-[#FBF9F3] sm:text-[16px]">{p.title}</span>
              <span className={`${monoClass} mt-1 block text-[10px] uppercase tracking-[0.14em] text-[#E8B28C]`}>
                {p.place}
              </span>
            </span>
          </button>
        ))}
      </div>

      {/* Visionneuse plein écran (rendue à la racine du document) */}
      {current && active !== null
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label={`${current.title}, photo ${active + 1} sur ${visible.length}`}
              className="fixed inset-x-0 top-0 z-[1000] flex h-[100dvh] flex-col bg-[#0b0b0b]"
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
                if (Math.abs(dy) > Math.abs(dx) && dy > 80) return close();
                if (Math.abs(dx) > 50) (dx > 0 ? prev : next)();
              }}
            >
              <div className="flex items-center justify-between px-4 pb-2 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6 sm:pt-4">
                <span className={`${monoClass} text-xs uppercase tracking-[0.18em] text-white/75`}>
                  {String(active + 1).padStart(2, "0")} / {String(visible.length).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Fermer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:bg-white/20"
                >
                  <IconClose />
                </button>
              </div>

              <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-3 sm:px-16">
                <button type="button" onClick={close} aria-label="Fermer" className="absolute inset-0 cursor-zoom-out" tabIndex={-1} />
                <Image
                  key={current.src}
                  src={current.src}
                  alt={`${current.title}, ${current.place}`}
                  width={current.width}
                  height={current.height}
                  sizes="100vw"
                  className="relative h-auto max-h-full w-auto max-w-full rounded-lg object-contain"
                  priority
                />
                {visible.length > 1 ? (
                  <>
                    <button
                      type="button"
                      onClick={prev}
                      aria-label="Photo précédente"
                      className="absolute left-5 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/40 text-white transition hover:bg-black/70 sm:flex"
                    >
                      <IconChevron dir="left" />
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      aria-label="Photo suivante"
                      className="absolute right-5 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/40 text-white transition hover:bg-black/70 sm:flex"
                    >
                      <IconChevron dir="right" />
                    </button>
                  </>
                ) : null}
              </div>

              <div className="px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 text-center">
                <p className="text-[17px] font-bold text-white">{current.title}</p>
                <p className={`${monoClass} mt-1 text-[11px] uppercase tracking-[0.16em] text-[#E8B28C]`}>{current.place}</p>
                <p className={`${monoClass} mt-2 text-[10px] uppercase tracking-[0.14em] text-white/45 sm:hidden`}>
                  Glissez pour changer · vers le bas pour fermer
                </p>
              </div>
            </div>,
            document.body
          )
        : null}
    </div>
  );
}

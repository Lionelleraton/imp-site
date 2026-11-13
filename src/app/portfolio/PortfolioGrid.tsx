"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import type { PortfolioCategory, PortfolioPhoto } from "@/data/portfolio";

type Props = {
  photos: PortfolioPhoto[];
  categories: { id: PortfolioCategory; label: string }[];
  monoClass: string;
};

// La collection ouverte est portée par l'URL (ex. /portfolio#trail) : lien partageable.
function subscribeHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}
const readHash = () => window.location.hash.replace("#", "");
const readHashServer = () => "";

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
  const hash = useSyncExternalStore(subscribeHash, readHash, readHashServer);
  const [active, setActive] = useState<number | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const byCategory = useMemo(() => {
    const m = new Map<PortfolioCategory, PortfolioPhoto[]>();
    photos.forEach((p) => m.set(p.category, [...(m.get(p.category) ?? []), p]));
    return m;
  }, [photos]);
  const collections = categories.filter((c) => (byCategory.get(c.id)?.length ?? 0) > 0);
  const collection = byCategory.has(hash as PortfolioCategory) ? (hash as PortfolioCategory) : null;
  const visible = collection ? byCategory.get(collection) ?? [] : [];
  const label = collections.find((c) => c.id === collection)?.label ?? "";

  const open = (id: PortfolioCategory) => {
    setActive(null);
    window.history.replaceState(null, "", `#${id}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    requestAnimationFrame(() => panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };
  const back = () => {
    window.history.replaceState(null, "", window.location.pathname);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    requestAnimationFrame(() => listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

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

  return (
    <div>
      {/* Collections */}
      <div ref={listRef} className="scroll-mt-24">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className={`${monoClass} text-[12px] uppercase tracking-[0.26em] text-[#B15F38]`}>
              Explorer les collections
            </p>
            <h2 className="mt-3 text-[clamp(1.7rem,4.2vw,2.8rem)] font-extrabold leading-[1.02] tracking-[-0.015em]">
              Des histoires en images.
            </h2>
          </div>
          <span className={`${monoClass} text-[12px] tracking-[0.1em] text-[#8A8475]`}>
            Choisissez un univers
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:gap-4 min-[901px]:grid-cols-4" aria-label="Collections photo">
          {collections.map((c, index) => {
            const list = byCategory.get(c.id) ?? [];
            const cover = list[0];
            const selected = collection === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => open(c.id)}
                aria-pressed={selected}
                aria-label={`${c.label}, ${list.length} photos`}
                className={`group relative block aspect-[4/5] w-full overflow-hidden rounded-md bg-[#E3DBC8] text-left ${
                  selected ? "ring-2 ring-[#B15F38] ring-offset-2 ring-offset-[#F4F1E8]" : ""
                }`}
              >
                <Image
                  src={cover.src}
                  alt=""
                  fill
                  sizes="(min-width:901px) 25vw, 50vw"
                  className="object-cover transition duration-700 ease-out group-hover:scale-[1.055] motion-reduce:transition-none"
                />
                <span className="absolute inset-0 bg-gradient-to-b from-black/5 from-25% to-black/80" />
                <span className="absolute inset-x-0 bottom-0 z-[1] p-3.5 pr-9 sm:p-6 sm:pr-10">
                  <span className={`${monoClass} block whitespace-nowrap text-[8px] uppercase tracking-[0.06em] text-[#F0BD9A] sm:text-[10px] sm:tracking-[0.15em]`}>
                    {String(index + 1).padStart(2, "0")} / {list.length} photos
                  </span>
                  <span className="mt-2 block text-[clamp(13px,4vw,18px)] font-extrabold uppercase leading-[1.02] text-[#FBF9F3] [overflow-wrap:anywhere] sm:text-[clamp(20px,2.4vw,30px)]">
                    {c.label}
                  </span>
                </span>
                <span className="absolute bottom-2 right-2.5 z-[1] text-[20px] text-[#FBF9F3] sm:bottom-2.5 sm:right-3 sm:text-[24px]" aria-hidden="true">
                  ↗
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Collection ouverte */}
      {collection ? (
        <div ref={panelRef} className="mt-12 scroll-mt-24 sm:mt-16">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <button
                type="button"
                onClick={back}
                className={`${monoClass} py-2 text-[11px] uppercase tracking-[0.1em] text-[#B15F38] hover:underline`}
              >
                ← Toutes les collections
              </button>
              <h2 className="text-[clamp(1.7rem,4.2vw,2.8rem)] font-extrabold uppercase leading-[1.02] tracking-[-0.015em]">
                {label}
              </h2>
            </div>
            <span className={`${monoClass} text-[12px] tracking-[0.1em] text-[#8A8475]`}>
              {visible.length} photo{visible.length > 1 ? "s" : ""}
            </span>
          </div>

          <div className="columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4 [&>*]:mb-3 sm:[&>*]:mb-4">
            {visible.map((p, i) => (
              <button
                key={p.src}
                type="button"
                onClick={() => setActive(i)}
                className="group relative block w-full break-inside-avoid overflow-hidden rounded-md bg-[#E3DBC8] text-left"
                aria-label={`Agrandir : ${p.title}, ${p.place}`}
              >
                <Image
                  src={p.src}
                  alt={`${p.title}, ${p.place}. Photo de Lionel Jouannaud, photographe sport et outdoor.`}
                  width={p.width}
                  height={p.height}
                  sizes="(min-width:1024px) 25vw, (min-width:640px) 33vw, 50vw"
                  className="h-auto w-full transition duration-700 ease-out group-hover:scale-[1.045] motion-reduce:transition-none"
                />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent px-3 pb-2.5 pt-10 opacity-0 transition duration-300 group-hover:opacity-100 [@media(hover:none)]:opacity-100">
                  <span className="block text-[14px] font-bold leading-tight text-[#FBF9F3] sm:text-[17px]">{p.title}</span>
                  <span className={`${monoClass} mt-1 block text-[10px] uppercase tracking-[0.14em] text-[#E8B28C]`}>
                    {p.place}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {/* Visionneuse plein écran (rendue à la racine du document) */}
      {current && active !== null
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label={`${current.title}, photo ${active + 1} sur ${visible.length}`}
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
                if (Math.abs(dy) > Math.abs(dx) && dy > 80) return close();
                if (Math.abs(dx) > 50) (dx > 0 ? prev : next)();
              }}
            >
              <div className="flex shrink-0 items-center justify-between px-4 pb-2 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6 sm:pb-4">
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

              <div className="relative min-h-0 flex-1 overflow-hidden px-3 sm:px-16">
                <button type="button" onClick={close} aria-label="Fermer" className="absolute inset-0 cursor-zoom-out" tabIndex={-1} />
                <Image
                  key={current.src}
                  src={current.src}
                  alt={`${current.title}, ${current.place}`}
                  fill
                  sizes="100vw"
                  className="pointer-events-none object-contain"
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

              <div className="shrink-0 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 text-center">
                <p className="text-[17px] font-bold text-white">{current.title}</p>
                <p className={`${monoClass} mt-1 text-[11px] uppercase tracking-[0.16em] text-[#E8B28C]`}>{current.place}</p>
              </div>
            </div>,
            document.body
          )
        : null}
    </div>
  );
}

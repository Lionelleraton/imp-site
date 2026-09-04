"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 480);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div
      className={
        "fixed bottom-0 left-0 right-0 z-40 sm:hidden transition-transform duration-300 ease-out " +
        (visible ? "translate-y-0" : "translate-y-full")
      }
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-4 mb-4">
        <Link
          href="/contact"
          className="btn-shine flex h-14 w-full items-center justify-center gap-2.5 rounded-2xl bg-deep text-[12px] font-semibold uppercase tracking-[0.25em] text-white shadow-[0_8px_32px_rgba(36,67,87,0.5)]"
        >
          Réserver un appel gratuit
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            className="h-4 w-4"
          >
            <path d="M5 12h14" strokeLinecap="round" />
            <path d="m13.5 7 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

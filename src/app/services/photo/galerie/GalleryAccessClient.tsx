"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function GalleryAccessClient() {
  const router = useRouter();
  const [code, setCode] = useState("");

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = code.trim();
    if (!trimmed) return;
    const normalized = trimmed.replace(/\s+/g, "-").toUpperCase();
    router.push(`/services/photo/galerie/${encodeURIComponent(normalized)}`);
  };

  return (
    <form onSubmit={submit} className="mt-6 flex flex-col gap-4">
      <label className="text-sm font-semibold text-ink/80" htmlFor="gallery-code">
        Code d’accès
      </label>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          id="gallery-code"
          type="text"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          placeholder="Ex: IMOTION-DEMO"
          className="w-full rounded-2xl border border-line bg-white/90 px-4 py-3 text-sm text-ink shadow-[0_10px_30px_rgba(35,48,54,0.08)] focus:border-deep/40 focus:outline-none"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-deep px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5"
        >
          Accéder
        </button>
      </div>
      <p className="text-xs text-ink/60">
        Le code vous est fourni après la livraison de votre galerie.
      </p>
    </form>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function GalleryAccessClient() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const trimmed = code.trim();
    if (!trimmed) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/gallery/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: trimmed }),
      });
      const data = (await response.json()) as { redirectTo?: string; error?: string };

      if (!response.ok || !data.redirectTo) {
        setError(data.error ?? "Impossible d’accéder à la galerie pour le moment.");
        return;
      }

      router.push(data.redirectTo);
    } catch {
      setError("Erreur réseau. Réessayez dans quelques secondes.");
    } finally {
      setIsSubmitting(false);
    }
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
          placeholder="Ex: RAE-17"
          className="w-full rounded-2xl border border-line bg-white/90 px-4 py-3 text-base text-ink shadow-[0_10px_30px_rgba(35,48,54,0.08)] focus:border-deep/40 focus:outline-none sm:text-sm"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center rounded-full bg-deep px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 sm:w-auto"
        >
          {isSubmitting ? "Ouverture..." : "Ouvrir la galerie"}
        </button>
      </div>
      <p className="text-xs text-ink/60">
        Le code vous est fourni après la livraison de votre galerie.
      </p>
      {error ? <p className="text-xs text-red-700">{error}</p> : null}
    </form>
  );
}

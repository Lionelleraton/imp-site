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
    <form onSubmit={submit} className="mt-7 flex flex-col gap-4">
      <label className="text-sm font-semibold text-[#1F2724]" htmlFor="gallery-code">
        Code d’accès
      </label>
      <div className="flex flex-col gap-3">
        <input
          id="gallery-code"
          type="text"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          placeholder="Ex: RAE-17"
          autoComplete="off"
          className="w-full rounded-xl border border-[#1F2724]/20 bg-[#FBF9F3] px-4 py-4 text-base text-[#1F2724] focus:border-[#B15F38] focus:outline-none"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#B15F38] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#8A4A2B] disabled:opacity-60 sm:w-fit"
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

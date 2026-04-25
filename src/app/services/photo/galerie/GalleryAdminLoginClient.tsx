"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function GalleryAdminLoginClient() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!password.trim()) {
      setError("Saisissez le mot de passe administrateur.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/gallery/admin-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(data.error ?? "Connexion refusée.");
        return;
      }

      setPassword("");
      router.refresh();
    } catch {
      setError("Erreur réseau. Réessayez.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl border border-line bg-white/85 p-6 shadow-[0_18px_50px_rgba(35,48,54,0.1)] sm:p-8">
      <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60">
        Accès administrateur
      </p>
      <h1 className="mt-3 text-2xl font-semibold sm:text-3xl">
        Connexion requise
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-ink/70">
        Cette page est réservée à l’équipe interne pour l’upload de galeries.
      </p>

      <form onSubmit={submit} className="mt-6 flex flex-col gap-4 sm:max-w-md">
        <label className="text-sm font-semibold text-ink/80" htmlFor="admin-password">
          Mot de passe
        </label>
        <input
          id="admin-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-2xl border border-line bg-white/90 px-4 py-3 text-sm text-ink shadow-[0_10px_30px_rgba(35,48,54,0.08)] focus:border-deep/40 focus:outline-none"
          placeholder="••••••••"
          autoComplete="current-password"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-full bg-deep px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Connexion..." : "Se connecter"}
        </button>
      </form>

      {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}
    </div>
  );
}


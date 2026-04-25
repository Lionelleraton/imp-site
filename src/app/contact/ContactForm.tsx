"use client";

import { useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
  company: string; // honeypot
};

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  phone: "",
  message: "",
  company: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const updateField = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccess(null);
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !data.ok) {
        setError(data.error ?? "Impossible d’envoyer votre message pour le moment.");
        return;
      }

      setForm(INITIAL_STATE);
      setSuccess("Message envoyé. Réponse sous 24h ouvrées.");
    } catch {
      setError("Erreur réseau. Réessayez dans quelques instants.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-line bg-white/85 p-5 shadow-[0_22px_60px_rgba(35,48,54,0.12)] backdrop-blur sm:p-6"
    >
      <div>
        <label className="text-sm font-medium" htmlFor="contact-name">
          Nom <span className="text-deep">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          name="name"
          autoComplete="name"
          required
          value={form.name}
          onChange={(event) => updateField("name", event.target.value)}
          className="mt-1 w-full rounded-xl border border-line bg-white/70 px-3 py-3 text-base outline-none transition focus:border-sky focus:ring-4 focus:ring-sky/20 sm:text-sm"
          placeholder="Nom et prénom"
        />
      </div>

      <div className="mt-4">
        <label className="text-sm font-medium" htmlFor="contact-email">
          Email <span className="text-deep">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          name="email"
          autoComplete="email"
          required
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
          className="mt-1 w-full rounded-xl border border-line bg-white/70 px-3 py-3 text-base outline-none transition focus:border-sky focus:ring-4 focus:ring-sky/20 sm:text-sm"
          placeholder="vous@email.com"
        />
      </div>

      <div className="mt-4">
        <label className="text-sm font-medium" htmlFor="contact-phone">
          Téléphone
        </label>
        <input
          id="contact-phone"
          type="tel"
          name="phone"
          autoComplete="tel"
          value={form.phone}
          onChange={(event) => updateField("phone", event.target.value)}
          className="mt-1 w-full rounded-xl border border-line bg-white/70 px-3 py-3 text-base outline-none transition focus:border-sky focus:ring-4 focus:ring-sky/20 sm:text-sm"
          placeholder="+33 6 12 34 56 78"
        />
      </div>

      <div className="mt-4 hidden" aria-hidden="true">
        <label htmlFor="contact-company">Entreprise</label>
        <input
          id="contact-company"
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={form.company}
          onChange={(event) => updateField("company", event.target.value)}
        />
      </div>

      <div className="mt-4">
        <label className="text-sm font-medium" htmlFor="contact-message">
          Message <span className="text-deep">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          required
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
          className="mt-1 w-full rounded-xl border border-line bg-white/70 px-3 py-3 text-base outline-none transition focus:border-sky focus:ring-4 focus:ring-sky/20 sm:text-sm"
          placeholder="Décrivez votre besoin, votre objectif et ce que vous attendez du projet."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-deep px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 sm:text-xs disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Envoi..." : "Envoyer ma demande"}
      </button>

      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">
        Réponse sous 24h ouvrées
      </p>

      <p className="mt-4 text-xs text-ink/60">* Informations obligatoires.</p>

      {success ? <p className="mt-3 text-sm text-green-700">{success}</p> : null}
      {error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}
    </form>
  );
}

import os from "node:os";
import path from "node:path";
import { appendFile, mkdir } from "node:fs/promises";
import { NextResponse } from "next/server";
import {
  computeQuote,
  formatEuro,
  getFormule,
  type DevisSelection,
} from "@/lib/devis-pricing";

export const runtime = "nodejs";

// Émetteur du devis.
const EMETTEUR = {
  name: "InMotion Performance",
  contact: "Lionel Jouannaud",
  address: "215 chemin des Favrands, 74400 Chamonix-Mont-Blanc",
  email: "inmotionperformance@icloud.com",
  phone: "+33 6 65 62 00 84",
  siren: "953 801 511",
};

// Anti-spam : rate-limit en mémoire (best-effort par instance).
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const rateLimitHits = new Map<string, number[]>();

function getClientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (rateLimitHits.get(ip) ?? []).filter(
    (ts) => now - ts < RATE_LIMIT_WINDOW_MS
  );
  recent.push(now);
  rateLimitHits.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

function sanitize(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function isValidEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function devisNumber(): string {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(
    d.getDate()
  ).padStart(2, "0")}`;
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `INM-${ymd}-${rand}`;
}

type DevisLead = {
  number: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  structure: string;
  eventDate: string;
  place: string;
  message: string;
  selection: DevisSelection;
  total: number;
};

function buildQuoteText(lead: DevisLead): string {
  const quote = computeQuote(lead.selection);
  const lines = quote.lines
    .map((l) => `  • ${l.label} : ${formatEuro(l.amount)}`)
    .join("\n");
  return [
    `DEVIS ${lead.number}`,
    `Date : ${new Date(lead.createdAt).toLocaleDateString("fr-FR")}`,
    "Échéance : à réception · Validité : 30 jours",
    "",
    "ÉMETTEUR",
    `${EMETTEUR.name} — ${EMETTEUR.contact}`,
    EMETTEUR.address,
    `${EMETTEUR.email} · ${EMETTEUR.phone}`,
    `SIREN ${EMETTEUR.siren}`,
    "",
    "CLIENT",
    `${lead.name}${lead.structure ? ` — ${lead.structure}` : ""}`,
    lead.email,
    lead.phone || "",
    lead.eventDate ? `Date souhaitée : ${lead.eventDate}` : "",
    lead.place ? `Lieu : ${lead.place}` : "",
    "",
    "PRESTATION",
    lines,
    "",
    `TOTAL : ${formatEuro(quote.total)}`,
    "TVA non applicable, art. 293 B du CGI.",
    "",
    lead.message ? `Message du client :\n${lead.message}\n` : "",
    "CONDITIONS",
    "Devis à confirmer. Réservation : acompte de 30 % à la signature, solde à la livraison.",
    "Déplacement : inclus jusqu'à 30 km, puis 0,50 €/km aller-retour.",
    "Remontées, hébergement et repas éventuels facturés au réel.",
    "RIB communiqué à la validation du devis.",
  ]
    .filter((l) => l !== "")
    .join("\n");
}

// Notification via webhook (Zapier / Make / n8n / Discord…), si configuré.
// Permet de recevoir les devis sans dépendre de Resend.
async function sendWebhook(lead: DevisLead, quoteText: string): Promise<boolean> {
  const url = process.env.CONTACT_WEBHOOK_URL?.trim();
  if (!url) return false;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: "devis_submitted", lead, quoteText }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function sendEmail(to: string, subject: string, text: string): Promise<boolean> {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return false;
  const from =
    process.env.CONTACT_FROM_EMAIL?.trim() ??
    "InMotion Performance <onboarding@resend.dev>";
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to: [to], subject, text }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function archiveLead(lead: DevisLead): Promise<void> {
  const dir =
    process.env.CONTACT_LEADS_DIR?.trim() ??
    path.join(os.tmpdir(), "imp-site-devis");
  try {
    await mkdir(dir, { recursive: true });
    await appendFile(
      path.join(dir, `${lead.createdAt.slice(0, 10)}-devis.ndjson`),
      `${JSON.stringify(lead)}\n`,
      "utf8"
    );
  } catch {
    // best-effort
  }
}

export async function POST(request: Request) {
  if (isRateLimited(getClientIp(request))) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessayez dans une minute." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  // Honeypot (champ caché "website").
  if (sanitize(body.website)) {
    return NextResponse.json({ ok: true, number: devisNumber() });
  }

  const name = sanitize(body.name);
  const email = sanitize(body.email);
  const phone = sanitize(body.phone);
  const structure = sanitize(body.structure);
  const eventDate = sanitize(body.eventDate);
  const place = sanitize(body.place);
  const message = sanitize(body.message);

  if (!name || name.length < 2 || name.length > 120) {
    return NextResponse.json({ error: "Nom invalide." }, { status: 400 });
  }
  if (!isValidEmail(email) || email.length > 180) {
    return NextResponse.json({ error: "Email invalide." }, { status: 400 });
  }

  const sel = (body.selection ?? {}) as Partial<DevisSelection>;
  const selection: DevisSelection = {
    formuleId: (sel.formuleId as DevisSelection["formuleId"]) ?? "",
    express: Boolean(sel.express),
    licence: Boolean(sel.licence),
    associatif: Boolean(sel.associatif),
    extraHours: Number(sel.extraHours) || 0,
    kmAllerRetour: Number(sel.kmAllerRetour) || 0,
  };

  if (!selection.formuleId || !getFormule(selection.formuleId)) {
    return NextResponse.json({ error: "Veuillez choisir une formule." }, { status: 400 });
  }

  // Recalcul autoritatif côté serveur.
  const quote = computeQuote(selection);
  if (!quote.valid) {
    return NextResponse.json({ error: "Sélection invalide." }, { status: 400 });
  }

  const lead: DevisLead = {
    number: devisNumber(),
    createdAt: new Date().toISOString(),
    name,
    email,
    phone,
    structure,
    eventDate,
    place,
    message,
    selection,
    total: quote.total,
  };

  const quoteText = buildQuoteText(lead);

  // 1) Notification à l'éditeur — via e-mail (Resend) et/ou webhook.
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const [emailNotif, webhookNotif] = await Promise.all([
    to
      ? sendEmail(
          to,
          `Nouveau devis ${lead.number} — ${name} (${formatEuro(quote.total)})`,
          `Un visiteur a généré un devis via le site.\n\n${quoteText}`
        )
      : Promise.resolve(false),
    sendWebhook(lead, quoteText),
  ]);
  const notif = emailNotif || webhookNotif;

  // 2) Copie du devis au client (best-effort : nécessite un domaine vérifié sur Resend).
  const copyToClient = await sendEmail(
    email,
    `Votre devis ${EMETTEUR.name} — ${lead.number}`,
    `Bonjour ${name},\n\nVoici le récapitulatif de votre devis. Il ne vous engage pas : je reviens vers vous sous 24 h ouvrées pour le finaliser ensemble.\n\n${quoteText}\n\nÀ très vite,\n${EMETTEUR.contact} — ${EMETTEUR.name}`
  );

  await archiveLead(lead);

  if (!notif) {
    // Aucun canal de notification n'a abouti : le lead reste archivé localement,
    // mais on signale qu'il faut configurer l'envoi côté serveur.
    return NextResponse.json(
      {
        error:
          "Le devis n'a pas pu être transmis. Configurez l'envoi : RESEND_API_KEY + CONTACT_TO_EMAIL, ou CONTACT_WEBHOOK_URL.",
      },
      { status: 503 }
    );
  }

  return NextResponse.json({
    ok: true,
    number: lead.number,
    total: quote.total,
    emailedToClient: copyToClient,
  });
}

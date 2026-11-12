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
import { buildDevisPdf } from "@/lib/devis-pdf";

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
    `ESTIMATION ${lead.number}`,
    `Date : ${new Date(lead.createdAt).toLocaleDateString("fr-FR")}`,
    "Estimation indicative — ne constitue pas un devis définitif.",
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
    "Estimation à confirmer : ne constitue pas un devis définitif.",
    "Réservation : acompte de 30 % à la signature, solde à la livraison.",
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

type EmailOpts = {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
  attachments?: { filename: string; content: string }[];
};

async function sendEmail(opts: EmailOpts): Promise<boolean> {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return false;
  // Domaine inmotionperformance.com vérifié sur Resend : on envoie depuis lui.
  const from =
    process.env.CONTACT_FROM_EMAIL?.trim() ||
    "InMotion Performance <contact@inmotionperformance.com>";
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [opts.to],
        subject: opts.subject,
        text: opts.text,
        ...(opts.html ? { html: opts.html } : {}),
        ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
        ...(opts.attachments ? { attachments: opts.attachments } : {}),
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// Corps HTML propre pour l'e-mail (récap + mention du PDF joint).
function buildHtml(lead: DevisLead, forClient: boolean): string {
  const quote = computeQuote(lead.selection);
  const rows = quote.lines
    .map(
      (l) =>
        `<tr><td style="padding:8px 0;border-bottom:1px solid #eceef0;color:#233036">${escapeHtml(
          l.label
        )}</td><td style="padding:8px 0;border-bottom:1px solid #eceef0;text-align:right;font-weight:600;color:#233036;white-space:nowrap">${formatEuro(
          l.amount
        )}</td></tr>`
    )
    .join("");

  const quoteTable = `<table style="width:100%;border-collapse:collapse;font-size:14px">${rows}
        <tr><td style="padding:14px 0 0;font-weight:700;font-size:15px">Total estimé</td><td style="padding:14px 0 0;text-align:right;font-weight:700;font-size:18px;color:#244357">${formatEuro(
          quote.total
        )}</td></tr>
      </table>
      <p style="font-size:12px;color:#6b7076;margin:6px 0 20px">TVA non applicable, art. 293 B du CGI · <strong>estimation indicative, non contractuelle</strong>.</p>`;

  const header = `<div style="background:#244357;color:#fff;padding:22px 24px;border-radius:14px 14px 0 0">
      <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;opacity:.75">Estimation ${lead.number}</div>
      <div style="font-size:20px;font-weight:700;margin-top:4px">InMotion Performance</div>
    </div>`;

  if (!forClient) {
    // ── E-mail reçu par Lionel : fiche contact complète + récap. ──
    const contactRow = (label: string, value: string) =>
      value
        ? `<tr><td style="padding:6px 14px 6px 0;color:#6b7076;font-size:13px;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:6px 0;color:#233036;font-size:14px;font-weight:600">${value}</td></tr>`
        : "";
    const contactCard = `<table style="width:100%;border-collapse:collapse">
        ${contactRow("Nom", escapeHtml(lead.name))}
        ${contactRow("Structure", escapeHtml(lead.structure))}
        ${contactRow("Email", `<a href="mailto:${escapeHtml(lead.email)}" style="color:#244357">${escapeHtml(lead.email)}</a>`)}
        ${contactRow("Téléphone", lead.phone ? `<a href="tel:${escapeHtml(lead.phone.replace(/\s+/g, ""))}" style="color:#244357">${escapeHtml(lead.phone)}</a>` : "")}
        ${contactRow("Date souhaitée", escapeHtml(lead.eventDate))}
        ${contactRow("Lieu", escapeHtml(lead.place))}
      </table>`;
    const messageBlock = lead.message
      ? `<div style="margin:16px 0 0"><div style="font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#6b7076;margin-bottom:6px">Message du client</div>
         <div style="background:#f6f7f8;border-radius:10px;padding:12px 14px;font-size:14px;line-height:1.55;color:#233036;white-space:pre-wrap">${escapeHtml(lead.message)}</div></div>`
      : "";
    return `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;color:#233036">
      ${header}
      <div style="border:1px solid #eceef0;border-top:0;border-radius:0 0 14px 14px;padding:24px">
        <p style="font-size:14px;line-height:1.6;margin:0 0 6px"><strong>Nouvelle demande de devis</strong> via le site (estimation à confirmer).</p>
        <div style="font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#6b7076;margin:18px 0 8px">Contact — pour le rappeler</div>
        ${contactCard}
        ${messageBlock}
        <div style="font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#6b7076;margin:22px 0 8px">Prestation estimée</div>
        ${quoteTable}
        <p style="font-size:13px;color:#6b7076;margin:0">Le PDF de l'estimation est en pièce jointe. Réponds directement à cet e-mail pour écrire au client.</p>
      </div>
    </div>`;
  }

  // ── E-mail reçu par le client. ──
  const intro = `Bonjour ${escapeHtml(lead.name)},<br><br>Merci pour votre demande. Voici votre <strong>estimation ${lead.number}</strong> — il s'agit d'une estimation indicative qui ne vous engage pas et ne constitue pas un devis définitif. Je reviens vers vous sous 24 h ouvrées pour la confirmer ensemble. Le PDF est en pièce jointe.`;
  return `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;color:#233036">
    ${header}
    <div style="border:1px solid #eceef0;border-top:0;border-radius:0 0 14px 14px;padding:24px">
      <p style="font-size:14px;line-height:1.6;margin:0 0 18px">${intro}</p>
      ${quoteTable}
      <p style="font-size:13px;line-height:1.6;color:#6b7076;margin:0">Lionel Jouannaud — InMotion Performance<br>
      <a href="mailto:${EMETTEUR.email}" style="color:#244357">${EMETTEUR.email}</a> · ${EMETTEUR.phone}</p>
    </div>
  </div>`;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"]/g, (c) =>
    c === "&" ? "&amp;" : c === "<" ? "&lt;" : c === ">" ? "&gt;" : "&quot;"
  );
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

  // PDF du devis (pièce jointe pro). Sans PDF, on envoie quand même le récap.
  let attachments: { filename: string; content: string }[] | undefined;
  try {
    const pdf = await buildDevisPdf(lead);
    attachments = [
      { filename: `Devis-${lead.number}.pdf`, content: Buffer.from(pdf).toString("base64") },
    ];
  } catch {
    attachments = undefined;
  }

  // 1) Notification à l'éditeur — via e-mail (Resend) et/ou webhook.
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const [emailNotif, webhookNotif] = await Promise.all([
    to
      ? sendEmail({
          to,
          subject: `Demande de devis — ${name}${phone ? ` · ${phone}` : ""} (${formatEuro(quote.total)})`,
          text: `Nouvelle demande de devis via le site (estimation à confirmer).\n\nCONTACT\n${name}${structure ? ` — ${structure}` : ""}\nEmail : ${email}\nTéléphone : ${phone || "—"}\n${eventDate ? `Date souhaitée : ${eventDate}\n` : ""}${place ? `Lieu : ${place}\n` : ""}${message ? `\nMessage :\n${message}\n` : ""}\n${quoteText}`,
          html: buildHtml(lead, false),
          replyTo: email, // répondre directement au client
          attachments,
        })
      : Promise.resolve(false),
    sendWebhook(lead, quoteText),
  ]);
  const notif = emailNotif || webhookNotif;

  // 2) Copie du devis au client (avec le PDF).
  const copyToClient = await sendEmail({
    to: email,
    subject: `Votre estimation ${EMETTEUR.name} — ${lead.number}`,
    text: `Bonjour ${name},\n\nVoici votre estimation (PDF en pièce jointe). Il s'agit d'une estimation indicative : elle ne vous engage pas et ne constitue pas un devis définitif. Je reviens vers vous sous 24 h ouvrées pour la confirmer ensemble.\n\n${quoteText}\n\nÀ très vite,\n${EMETTEUR.contact} — ${EMETTEUR.name}`,
    html: buildHtml(lead, true),
    replyTo: to || EMETTEUR.email, // le client peut répondre directement à Lionel
    attachments,
  });

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

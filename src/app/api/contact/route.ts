import os from "node:os";
import path from "node:path";
import { appendFile, mkdir } from "node:fs/promises";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  company?: string;
};

type ContactLead = {
  name: string;
  email: string;
  phone: string;
  message: string;
  source: string;
  createdAt: string;
  userAgent?: string;
};

function sanitize(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.trim();
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 48);
}

async function sendWebhookLead(lead: ContactLead): Promise<boolean> {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL?.trim();
  if (!webhookUrl) return false;

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event: "contact_form_submitted",
      lead,
    }),
  });

  return response.ok;
}

async function sendEmailLead(lead: ContactLead): Promise<boolean> {
  const resendKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  if (!resendKey || !to) return false;

  const from =
    process.env.CONTACT_FROM_EMAIL?.trim() ?? "InMotion <onboarding@resend.dev>";

  const text = [
    "Nouveau lead site InMotion",
    "",
    `Date: ${lead.createdAt}`,
    `Nom: ${lead.name}`,
    `Email: ${lead.email}`,
    `Téléphone: ${lead.phone || "-"}`,
    "",
    "Message:",
    lead.message,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `Nouveau lead site — ${lead.name}`,
      text,
    }),
  });

  return response.ok;
}

async function archiveLeadLocally(lead: ContactLead): Promise<boolean> {
  const leadsDir =
    process.env.CONTACT_LEADS_DIR?.trim() ??
    path.join(os.tmpdir(), "imp-site-contact-leads");
  const safeName = slugify(lead.name || "lead");
  const safeDate = lead.createdAt.slice(0, 10);
  const filePath = path.join(leadsDir, `${safeDate}-${safeName}.ndjson`);

  await mkdir(leadsDir, { recursive: true });
  await appendFile(filePath, `${JSON.stringify(lead)}\n`, "utf8");
  return true;
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  // Honeypot anti-spam.
  if (sanitize(body.company)) {
    return NextResponse.json({ ok: true });
  }

  const name = sanitize(body.name);
  const email = sanitize(body.email);
  const phone = sanitize(body.phone);
  const message = sanitize(body.message);

  if (!name || name.length < 2) {
    return NextResponse.json({ error: "Nom invalide." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Email invalide." }, { status: 400 });
  }
  if (!message || message.length < 12) {
    return NextResponse.json({ error: "Message trop court." }, { status: 400 });
  }

  const lead: ContactLead = {
    name,
    email,
    phone,
    message,
    source: "site-contact-form",
    createdAt: new Date().toISOString(),
    userAgent: request.headers.get("user-agent") ?? undefined,
  };

  const results = await Promise.allSettled([
    sendWebhookLead(lead),
    sendEmailLead(lead),
    archiveLeadLocally(lead),
  ]);

  const deliveredViaPrimaryChannel = results.slice(0, 2).some(
    (result) => result.status === "fulfilled" && result.value === true
  );

  if (!deliveredViaPrimaryChannel) {
    return NextResponse.json(
      {
        error:
          "Le message n’a pas pu être transmis. Vérifiez CONTACT_WEBHOOK_URL ou RESEND_API_KEY/CONTACT_TO_EMAIL.",
      },
      { status: 503 }
    );
  }

  return NextResponse.json({ ok: true });
}

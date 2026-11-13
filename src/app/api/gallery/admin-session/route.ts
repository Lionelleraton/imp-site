import crypto from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  createAdminSessionToken,
  getAdminSessionCookieName,
  getAdminSessionTtlSeconds,
} from "@/lib/security-tokens";
import { delay, getClientIp, hit, isLimited, reset } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MAX_FAILURES = 5;
const WINDOW_MS = 15 * 60 * 1000;

function safeEqual(a: string, b: string): boolean {
  const ha = crypto.createHash("sha256").update(a).digest();
  const hb = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(ha, hb);
}

type AdminSessionBody = {
  password?: string;
};

export async function POST(request: Request) {
  const key = `gallery-admin:${getClientIp(request)}`;
  if (isLimited(key, MAX_FAILURES, WINDOW_MS)) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessayez dans 15 minutes." },
      { status: 429 }
    );
  }

  let body: AdminSessionBody;
  try {
    body = (await request.json()) as AdminSessionBody;
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const expectedPassword = process.env.GALLERY_ADMIN_PASSWORD?.trim();
  if (!expectedPassword) {
    return NextResponse.json(
      { error: "Variable GALLERY_ADMIN_PASSWORD manquante côté serveur." },
      { status: 503 }
    );
  }

  const providedPassword = body.password?.trim() ?? "";
  if (!providedPassword || !safeEqual(providedPassword, expectedPassword)) {
    hit(key, WINDOW_MS);
    await delay(700);
    return NextResponse.json({ error: "Mot de passe incorrect." }, { status: 401 });
  }
  reset(key);

  const sessionToken = createAdminSessionToken();
  const cookieStore = await cookies();
  cookieStore.set({
    name: getAdminSessionCookieName(),
    value: sessionToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: getAdminSessionTtlSeconds(),
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(getAdminSessionCookieName());
  return NextResponse.json({ ok: true });
}


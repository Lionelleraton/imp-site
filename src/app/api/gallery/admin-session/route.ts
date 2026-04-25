import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  createAdminSessionToken,
  getAdminSessionCookieName,
  getAdminSessionTtlSeconds,
} from "@/lib/security-tokens";

export const runtime = "nodejs";

type AdminSessionBody = {
  password?: string;
};

export async function POST(request: Request) {
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
  if (!providedPassword || providedPassword !== expectedPassword) {
    return NextResponse.json({ error: "Mot de passe incorrect." }, { status: 401 });
  }

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


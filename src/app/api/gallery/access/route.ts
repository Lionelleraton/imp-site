import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { normalizeGalleryCode } from "@/lib/gallery-code";
import {
  createGallerySessionToken,
  getGallerySessionCookieName,
  getGallerySessionTtlSeconds,
} from "@/lib/security-tokens";

export const runtime = "nodejs";

type AccessBody = {
  code?: string;
};

export async function POST(request: Request) {
  let body: AccessBody;
  try {
    body = (await request.json()) as AccessBody;
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const rawCode = body.code ?? "";
  const normalizedCode = normalizeGalleryCode(rawCode);

  if (!normalizedCode) {
    return NextResponse.json({ error: "Code d’accès manquant." }, { status: 400 });
  }

  const sessionToken = createGallerySessionToken(normalizedCode);
  const cookieStore = await cookies();
  cookieStore.set({
    name: getGallerySessionCookieName(),
    value: sessionToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: getGallerySessionTtlSeconds(),
  });

  return NextResponse.json({
    ok: true,
    redirectTo: `/services/photo/galerie/${encodeURIComponent(normalizedCode)}`,
  });
}


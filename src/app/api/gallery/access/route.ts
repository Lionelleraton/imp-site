import { list } from "@vercel/blob";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { PHOTO_GALLERIES } from "@/data/photo-galleries";
import {
  buildPrefixCandidates,
  isValidGalleryCode,
  normalizeGalleryCode,
  normalizeGalleryCodeLoose,
} from "@/lib/gallery-code";
import {
  createGallerySessionToken,
  getGallerySessionCookieName,
  getGallerySessionTtlSeconds,
} from "@/lib/security-tokens";
import { folderExists, isDropboxConfigured, resolveFolderPathForCode } from "@/lib/dropbox";
import { isDriveConfigured, resolveFolderIdForCode } from "@/lib/drive";
import { delay, getClientIp, hit, isLimited, reset } from "@/lib/rate-limit";

export const runtime = "nodejs";

// Au-delà de 8 codes erronés en 15 minutes, l'IP est temporairement bloquée.
const MAX_FAILURES = 8;
const WINDOW_MS = 15 * 60 * 1000;
const GENERIC_ERROR = "Code invalide ou galerie introuvable. Vérifiez le code reçu.";

type AccessBody = { code?: string };

// La galerie correspondant au code existe-t-elle vraiment ?
async function galleryExists(code: string): Promise<boolean> {
  const loose = normalizeGalleryCodeLoose(code);
  if (PHOTO_GALLERIES.some((g) => normalizeGalleryCodeLoose(g.code) === loose)) {
    return true;
  }
  if (isDropboxConfigured() && (await folderExists(resolveFolderPathForCode(code)))) {
    return true;
  }
  if (isDriveConfigured()) {
    try {
      if (await resolveFolderIdForCode(code)) return true;
    } catch {
      // on continue vers les autres sources
    }
  }
  if (process.env.BLOB_READ_WRITE_TOKEN?.trim()) {
    try {
      for (const prefix of buildPrefixCandidates(code).filter((p) => p.endsWith("/"))) {
        const { blobs } = await list({ prefix, limit: 1 });
        if (blobs.length > 0) return true;
      }
    } catch {
      // stockage Blob indisponible : ignoré
    }
  }
  return false;
}

export async function POST(request: Request) {
  const key = `gallery-access:${getClientIp(request)}`;

  if (isLimited(key, MAX_FAILURES, WINDOW_MS)) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessayez dans 15 minutes ou contactez-moi." },
      { status: 429 }
    );
  }

  let body: AccessBody;
  try {
    body = (await request.json()) as AccessBody;
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const code = normalizeGalleryCode(body.code ?? "");
  if (!code) {
    return NextResponse.json({ error: "Saisissez votre code d’accès." }, { status: 400 });
  }

  const ok = isValidGalleryCode(code) && (await galleryExists(code));
  if (!ok) {
    hit(key, WINDOW_MS);
    await delay(700); // ralentit les essais automatisés
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 404 });
  }

  reset(key);
  const cookieStore = await cookies();
  cookieStore.set({
    name: getGallerySessionCookieName(),
    value: createGallerySessionToken(code),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: getGallerySessionTtlSeconds(),
  });

  return NextResponse.json({
    ok: true,
    redirectTo: `/services/photo/galerie/${encodeURIComponent(code)}`,
  });
}

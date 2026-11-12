import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { normalizeGalleryCode } from "@/lib/gallery-code";
import {
  getGallerySessionCookieName,
  verifyGallerySessionToken,
} from "@/lib/security-tokens";
import {
  fileBelongsToFolder,
  getFileMedia,
  isDriveConfigured,
  resolveFolderIdForCode,
} from "@/lib/drive";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string; name: string }> };

export async function GET(request: Request, context: Ctx) {
  if (!isDriveConfigured()) {
    return NextResponse.json({ error: "Drive non configuré." }, { status: 503 });
  }

  const { id, name } = await context.params;
  const { searchParams } = new URL(request.url);
  const download = searchParams.get("dl") === "1";

  const cookieStore = await cookies();
  const session = verifyGallerySessionToken(
    cookieStore.get(getGallerySessionCookieName())?.value
  );
  if (!session) {
    return NextResponse.json({ error: "Session invalide." }, { status: 401 });
  }

  const code = normalizeGalleryCode(searchParams.get("code") || session.code);
  if (!code || code !== session.code) {
    return NextResponse.json({ error: "Accès non autorisé." }, { status: 403 });
  }

  const folderId = await resolveFolderIdForCode(code);
  if (!folderId) {
    return NextResponse.json({ error: "Galerie introuvable." }, { status: 404 });
  }

  // Le fichier demandé doit appartenir au dossier autorisé pour ce code.
  const membership = await fileBelongsToFolder(id, folderId);
  if (!membership.ok) {
    return NextResponse.json({ error: "Image non autorisée." }, { status: 403 });
  }

  const media = await getFileMedia(id);
  if (!media.ok || !media.body) {
    return NextResponse.json({ error: "Image indisponible." }, { status: 502 });
  }

  const filename = decodeURIComponent(name || membership.name || "photo.jpg");
  const headers = new Headers();
  headers.set(
    "Content-Type",
    media.headers.get("content-type") || membership.mimeType || "image/jpeg"
  );
  const len = media.headers.get("content-length");
  if (len) headers.set("Content-Length", len);
  headers.set(
    "Content-Disposition",
    `${download ? "attachment" : "inline"}; filename="${filename.replace(/"/g, "")}"`
  );
  // Privé : seul le navigateur du client (avec le cookie) peut mettre en cache.
  headers.set("Cache-Control", "private, max-age=3600");

  return new Response(media.body, { status: 200, headers });
}

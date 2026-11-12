import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { normalizeGalleryCode } from "@/lib/gallery-code";
import {
  getGallerySessionCookieName,
  verifyGallerySessionToken,
} from "@/lib/security-tokens";
import {
  isDriveConfigured,
  listImagesInFolder,
  resolveFolderIdForCode,
} from "@/lib/drive";

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!isDriveConfigured()) {
    return NextResponse.json(
      { error: "Google Drive n'est pas configuré." },
      { status: 503 }
    );
  }

  const { searchParams } = new URL(request.url);
  const includeMeta =
    searchParams.get("includeMeta") === "1" ||
    searchParams.get("includeMeta")?.toLowerCase() === "true";

  const cookieStore = await cookies();
  const session = verifyGallerySessionToken(
    cookieStore.get(getGallerySessionCookieName())?.value
  );
  if (!session) {
    return NextResponse.json({ error: "Session galerie invalide." }, { status: 401 });
  }

  const code = normalizeGalleryCode(searchParams.get("code") || session.code);
  if (!code || code !== session.code) {
    return NextResponse.json({ error: "Code galerie non autorisé." }, { status: 403 });
  }

  const folderId = await resolveFolderIdForCode(code);
  if (!folderId) {
    return includeMeta
      ? NextResponse.json({ images: [], count: 0, totalBytes: 0 })
      : NextResponse.json([]);
  }

  let files;
  try {
    files = await listImagesInFolder(folderId);
  } catch {
    return NextResponse.json(
      { error: "Impossible de lire la galerie sur Google Drive." },
      { status: 502 }
    );
  }

  const encodedCode = encodeURIComponent(code);
  const images = files.map(
    (f) =>
      `/api/gallery/drive/img/${encodeURIComponent(f.id)}/${encodeURIComponent(
        f.name
      )}?code=${encodedCode}`
  );
  const totalBytes = files.reduce((sum, f) => sum + (f.size || 0), 0);

  if (includeMeta) {
    return NextResponse.json({ images, count: images.length, totalBytes });
  }
  return NextResponse.json(images);
}

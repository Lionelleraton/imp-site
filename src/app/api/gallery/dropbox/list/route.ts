import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { isValidGalleryCode, normalizeGalleryCode } from "@/lib/gallery-code";
import {
  getGallerySessionCookieName,
  verifyGallerySessionToken,
} from "@/lib/security-tokens";
import {
  isDropboxConfigured,
  listFolderImages,
  resolveFolderPathForCode,
} from "@/lib/dropbox";
import { planZipParts } from "@/lib/gallery-zip";

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!isDropboxConfigured()) {
    return NextResponse.json({ error: "Dropbox non configuré." }, { status: 503 });
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
  if (!code || code !== session.code || !isValidGalleryCode(code)) {
    return NextResponse.json({ error: "Code galerie non autorisé." }, { status: 403 });
  }

  const folderPath = resolveFolderPathForCode(code);
  let files;
  try {
    files = await listFolderImages(folderPath);
  } catch {
    return NextResponse.json(
      { error: "Impossible de lire la galerie sur Dropbox." },
      { status: 502 }
    );
  }

  const encodedCode = encodeURIComponent(code);
  const images = files.map(
    (f) =>
      `/api/gallery/dropbox/img/${encodeURIComponent(f.name)}?path=${encodeURIComponent(
        f.path
      )}&code=${encodedCode}`
  );
  const totalBytes = files.reduce((sum, f) => sum + (f.size || 0), 0);

  const zipParts = planZipParts(files).map((part, i) => ({
    url: `/api/gallery/dropbox/zip?code=${encodedCode}&part=${i + 1}`,
    bytes: part.bytes,
    count: part.count,
  }));

  if (includeMeta) {
    return NextResponse.json({ images, count: images.length, totalBytes, zipParts });
  }
  return NextResponse.json(images);
}

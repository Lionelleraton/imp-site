import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { isValidGalleryCode, normalizeGalleryCode } from "@/lib/gallery-code";
import {
  getGallerySessionCookieName,
  verifyGallerySessionToken,
} from "@/lib/security-tokens";
import {
  downloadFile,
  getThumbnail,
  isDropboxConfigured,
  resolveFolderPathForCode,
} from "@/lib/dropbox";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ name: string }> };

function mimeFromName(name: string): string {
  const ext = name.toLowerCase().split(".").pop() ?? "";
  const map: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    gif: "image/gif",
    avif: "image/avif",
    tif: "image/tiff",
    tiff: "image/tiff",
    heic: "image/heic",
  };
  return map[ext] ?? "application/octet-stream";
}

export async function GET(request: Request, context: Ctx) {
  if (!isDropboxConfigured()) {
    return NextResponse.json({ error: "Dropbox non configuré." }, { status: 503 });
  }

  const { name } = await context.params;
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path") ?? "";
  const download = searchParams.get("dl") === "1";

  const cookieStore = await cookies();
  const session = verifyGallerySessionToken(
    cookieStore.get(getGallerySessionCookieName())?.value
  );
  if (!session) {
    return NextResponse.json({ error: "Session invalide." }, { status: 401 });
  }

  const code = normalizeGalleryCode(searchParams.get("code") || session.code);
  if (!code || code !== session.code || !isValidGalleryCode(code)) {
    return NextResponse.json({ error: "Accès non autorisé." }, { status: 403 });
  }

  // Le fichier demandé doit être dans le dossier autorisé pour ce code.
  const authorized = (resolveFolderPathForCode(code) + "/").toLowerCase();
  if (
    !path ||
    path.includes("..") ||
    !path.toLowerCase().startsWith(authorized)
  ) {
    return NextResponse.json({ error: "Image non autorisée." }, { status: 403 });
  }

  let upstream: Response;
  try {
    upstream = download ? await downloadFile(path) : await getThumbnail(path);
  } catch {
    return NextResponse.json({ error: "Image indisponible." }, { status: 502 });
  }
  if (!upstream.ok || !upstream.body) {
    return NextResponse.json({ error: "Image indisponible." }, { status: 502 });
  }

  const filename = decodeURIComponent(name || "photo.jpg");
  const headers = new Headers();
  headers.set("Content-Type", download ? mimeFromName(filename) : "image/jpeg");
  const len = upstream.headers.get("content-length");
  if (len) headers.set("Content-Length", len);
  headers.set(
    "Content-Disposition",
    `${download ? "attachment" : "inline"}; filename="${filename.replace(/"/g, "")}"`
  );
  headers.set("Cache-Control", "private, max-age=3600");

  return new Response(upstream.body, { status: 200, headers });
}

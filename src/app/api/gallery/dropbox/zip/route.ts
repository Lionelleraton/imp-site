import { downloadZip } from "client-zip";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { isValidGalleryCode, normalizeGalleryCode } from "@/lib/gallery-code";
import {
  getGallerySessionCookieName,
  verifyGallerySessionToken,
} from "@/lib/security-tokens";
import {
  downloadFile,
  isDropboxConfigured,
  listFolderImages,
  resolveFolderPathForCode,
  type DropboxFile,
} from "@/lib/dropbox";
import { planZipParts } from "@/lib/gallery-zip";

export const runtime = "nodejs";
// Le ZIP est diffusé au fil de l'eau (aucune mise en mémoire de la galerie).
export const maxDuration = 300;

async function fetchWithRetry(path: string): Promise<Response> {
  let last: Response | null = null;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const res = await downloadFile(path);
    if (res.ok && res.body) return res;
    last = res;
  }
  throw new Error(`Téléchargement impossible (${last?.status ?? "?"})`);
}

export async function GET(request: Request) {
  if (!isDropboxConfigured()) {
    return NextResponse.json({ error: "Dropbox non configuré." }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const cookieStore = await cookies();
  const session = verifyGallerySessionToken(
    cookieStore.get(getGallerySessionCookieName())?.value
  );
  if (!session) {
    return NextResponse.json({ error: "Session expirée. Saisissez à nouveau votre code." }, { status: 401 });
  }

  const code = normalizeGalleryCode(searchParams.get("code") || session.code);
  if (!code || code !== session.code || !isValidGalleryCode(code)) {
    return NextResponse.json({ error: "Accès non autorisé." }, { status: 403 });
  }

  let files: DropboxFile[];
  try {
    files = await listFolderImages(resolveFolderPathForCode(code));
  } catch {
    return NextResponse.json({ error: "Galerie momentanément indisponible." }, { status: 502 });
  }
  if (files.length === 0) {
    return NextResponse.json({ error: "Aucune photo dans cette galerie." }, { status: 404 });
  }

  const parts = planZipParts(files);
  const partNumber = Math.max(1, Number(searchParams.get("part") ?? "1") || 1);
  const range = parts[partNumber - 1];
  if (!range) {
    return NextResponse.json({ error: "Partie introuvable." }, { status: 404 });
  }

  const slice = files.slice(range.start, range.end);
  async function* entries() {
    for (const f of slice) {
      const res = await fetchWithRetry(f.path);
      yield { input: res, name: f.name, size: f.size };
    }
  }

  const zip = downloadZip(entries(), {
    metadata: slice.map((f) => ({ name: f.name, size: f.size })),
  });

  const base = `galerie-${code.toLowerCase()}`;
  const filename = parts.length > 1 ? `${base}-partie-${partNumber}.zip` : `${base}.zip`;
  const headers = new Headers(zip.headers);
  headers.set("Content-Type", "application/zip");
  headers.set("Content-Disposition", `attachment; filename="${filename}"`);
  headers.set("Cache-Control", "private, no-store");

  return new Response(zip.body, { status: 200, headers });
}

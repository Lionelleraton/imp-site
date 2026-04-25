import { list } from "@vercel/blob";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { PHOTO_GALLERIES } from "@/data/photo-galleries";
import {
  buildPrefixCandidates,
  normalizeGalleryCode,
  normalizeGalleryCodeLoose,
} from "@/lib/gallery-code";
import {
  getAdminSessionCookieName,
  getGallerySessionCookieName,
  verifyAdminSessionToken,
  verifyGallerySessionToken,
} from "@/lib/security-tokens";

export const runtime = "nodejs";

function normalizePrefixesParam(prefixesParam: string): string[] {
  return prefixesParam
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizePrefixKey(prefix: string): string {
  return prefix.trim().replace(/^\/+/, "").replace(/\/+$/, "").toLowerCase();
}

function resolveGalleryConfiguredPrefixes(code: string): string[] {
  const loose = normalizeGalleryCodeLoose(code);
  const matched = PHOTO_GALLERIES.find(
    (gallery) => normalizeGalleryCodeLoose(gallery.code) === loose
  );
  if (!matched) return [];

  const prefixes = new Set<string>();

  if (matched.slug) {
    prefixes.add(matched.slug);
    prefixes.add(`${matched.slug}/`);
  }

  if (matched.manifest) {
    try {
      const url = new URL(matched.manifest, "https://inmotionperformance.com");
      const prefix = url.searchParams.get("prefix");
      const prefixAlt = url.searchParams.get("prefixAlt");
      const prefixesParam = url.searchParams.get("prefixes");

      if (prefix) prefixes.add(prefix);
      if (prefixAlt) prefixes.add(prefixAlt);
      if (prefixesParam) {
        normalizePrefixesParam(prefixesParam).forEach((item) => prefixes.add(item));
      }
    } catch {
      // ignore malformed manifest URL
    }
  }

  return Array.from(prefixes).filter(Boolean);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const prefix = searchParams.get("prefix") ?? "";
  const prefixAlt = searchParams.get("prefixAlt") ?? "";
  const prefixesParam = searchParams.get("prefixes") ?? "";
  const codeQuery = searchParams.get("code") ?? "";
  const includeMeta =
    searchParams.get("includeMeta") === "1" ||
    searchParams.get("includeMeta")?.toLowerCase() === "true";
  const limitRaw = Number(searchParams.get("limit") ?? 2000);
  const limit = Number.isFinite(limitRaw)
    ? Math.min(Math.max(limitRaw, 1), 2000)
    : 2000;

  const cookieStore = await cookies();
  const adminSessionToken = cookieStore.get(getAdminSessionCookieName())?.value;
  const adminSession = verifyAdminSessionToken(adminSessionToken);
  const isAdmin = Boolean(adminSession);

  const gallerySessionToken = cookieStore.get(getGallerySessionCookieName())?.value;
  const gallerySession = verifyGallerySessionToken(gallerySessionToken);

  const requestedPrefixes = prefixesParam
    ? normalizePrefixesParam(prefixesParam)
    : [prefix, prefixAlt].filter(Boolean);

  let prefixes: string[] = [];
  if (isAdmin) {
    prefixes = requestedPrefixes;
    if (prefixes.length === 0) {
      return NextResponse.json(
        { error: "Prefix manquant pour la consultation admin." },
        { status: 400 }
      );
    }
  } else {
    if (!gallerySession) {
      return NextResponse.json(
        { error: "Session galerie invalide." },
        { status: 401 }
      );
    }

    const code = normalizeGalleryCode(codeQuery || gallerySession.code);
    if (!code || code !== gallerySession.code) {
      return NextResponse.json(
        { error: "Code galerie non autorisé." },
        { status: 403 }
      );
    }

    const authorizedSeeds = [
      ...resolveGalleryConfiguredPrefixes(code),
      ...buildPrefixCandidates(code),
    ];
    const authorizedKeys = new Set(
      authorizedSeeds.map(normalizePrefixKey).filter(Boolean)
    );

    if (requestedPrefixes.length > 0) {
      prefixes = requestedPrefixes.filter((candidate) => {
        const candidateKey = normalizePrefixKey(candidate);
        if (!candidateKey) return false;
        for (const allowed of authorizedKeys) {
          if (candidateKey === allowed || candidateKey.startsWith(`${allowed}/`)) {
            return true;
          }
        }
        return false;
      });

      if (prefixes.length === 0) {
        return NextResponse.json({ error: "Prefix non autorisé." }, { status: 403 });
      }
    } else {
      prefixes = resolveGalleryConfiguredPrefixes(code);
    }

    if (prefixes.length === 0) {
      prefixes = buildPrefixCandidates(code);
    }
  }

  const cleanPrefixes = Array.from(
    new Set(
      prefixes
        .map((item) => item.trim())
        .filter(Boolean)
    )
  );

  if (cleanPrefixes.length === 0) {
    if (includeMeta) {
      return NextResponse.json({ images: [], count: 0, totalBytes: 0 });
    }
    return NextResponse.json([]);
  }

  const results = await Promise.all(
    cleanPrefixes.map((item) =>
      list({
        prefix: item,
        limit,
      })
    )
  );

  const imagesByUrl = new Map<string, { url: string; size: number }>();
  results.forEach(({ blobs }) => {
    blobs.forEach((blob) => {
      if (/\.(jpg|jpeg|png|webp|avif)$/i.test(blob.url)) {
        if (!imagesByUrl.has(blob.url)) {
          imagesByUrl.set(blob.url, {
            url: blob.url,
            size: typeof blob.size === "number" ? blob.size : 0,
          });
        }
      }
    });
  });

  const images = Array.from(imagesByUrl.keys());
  const totalBytes = Array.from(imagesByUrl.values()).reduce(
    (sum, item) => sum + item.size,
    0
  );

  if (includeMeta) {
    return NextResponse.json({
      images,
      count: images.length,
      totalBytes,
    });
  }

  return NextResponse.json(images);
}

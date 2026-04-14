import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const prefix = searchParams.get("prefix") ?? "";
  const prefixAlt = searchParams.get("prefixAlt") ?? "";
  const prefixesParam = searchParams.get("prefixes") ?? "";
  const code = searchParams.get("code") ?? "";
  const limit = Number(searchParams.get("limit") ?? 2000);

  const prefixes = prefixesParam
    ? prefixesParam
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    : [prefix, prefixAlt].filter(Boolean);

  if (prefixes.length === 0) {
    // allow fallback on code search if provided
    if (!code) return NextResponse.json([]);
  }

  const results = await Promise.all(
    prefixes.length > 0
      ? prefixes.map((item) => list({ prefix: item, limit }))
      : []
  );

  const urls = new Set<string>();
  results.forEach(({ blobs }) => {
    blobs.forEach((blob) => {
      if (/\.(jpg|jpeg|png|webp)$/i.test(blob.url)) {
        urls.add(blob.url);
      }
    });
  });

  if (urls.size > 0 || !code) {
    return NextResponse.json(Array.from(urls));
  }

  const normalize = (value: string) =>
    value.toLowerCase().replace(/[^a-z0-9]/g, "");
  const base = normalize(code);
  if (!base) return NextResponse.json([]);

  const candidates = new Set<string>([base]);
  candidates.add(normalize(code.replace(/\s+/g, "-")));
  candidates.add(normalize(code.replace(/\s+/g, "_")));
  candidates.add(normalize(code.replace(/-+/g, "")));

  const { blobs } = await list({ prefix: "", limit });
  blobs.forEach((blob) => {
    if (!/\.(jpg|jpeg|png|webp)$/i.test(blob.url)) return;
    try {
      const pathname = new URL(blob.url).pathname;
      const haystack = normalize(pathname);
      for (const token of candidates) {
        if (token && haystack.includes(token)) {
          urls.add(blob.url);
          break;
        }
      }
    } catch {
      // ignore invalid URLs
    }
  });

  return NextResponse.json(Array.from(urls));
}

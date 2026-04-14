import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const prefix = searchParams.get("prefix") ?? "";
  const prefixAlt = searchParams.get("prefixAlt") ?? "";
  const prefixesParam = searchParams.get("prefixes") ?? "";
  const limit = Number(searchParams.get("limit") ?? 2000);

  const prefixes = prefixesParam
    ? prefixesParam
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    : [prefix, prefixAlt].filter(Boolean);

  if (prefixes.length === 0) {
    return NextResponse.json([]);
  }

  const results = await Promise.all(
    prefixes.map((item) => list({ prefix: item, limit }))
  );

  const urls = new Set<string>();
  results.forEach(({ blobs }) => {
    blobs.forEach((blob) => {
      if (/\.(jpg|jpeg|png|webp)$/i.test(blob.url)) {
        urls.add(blob.url);
      }
    });
  });

  return NextResponse.json(Array.from(urls));
}

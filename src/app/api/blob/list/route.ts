import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const prefix = searchParams.get("prefix") ?? "";
  const limit = Number(searchParams.get("limit") ?? 2000);

  const { blobs } = await list({ prefix, limit });
  const urls = blobs
    .map((blob) => blob.url)
    .filter((url) => /\.(jpg|jpeg|png|webp)$/i.test(url));

  return NextResponse.json(urls);
}

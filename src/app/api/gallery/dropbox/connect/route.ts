import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { buildAuthorizeUrl } from "@/lib/dropbox";

export const runtime = "nodejs";

async function origin(): Promise<string> {
  const h = await headers();
  const proto = h.get("x-forwarded-proto") ?? "https";
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  return `${proto}://${host}`;
}

// Étape unique : lance l'autorisation Dropbox pour récupérer un refresh token.
export async function GET() {
  const redirectUri = `${await origin()}/api/gallery/dropbox/callback`;
  const url = buildAuthorizeUrl(redirectUri);
  if (!url) {
    return NextResponse.json(
      { error: "DROPBOX_APP_KEY manquant. Ajoutez-le d'abord sur Vercel." },
      { status: 503 }
    );
  }
  return NextResponse.redirect(url);
}

import { headers } from "next/headers";
import { exchangeCodeForRefreshToken } from "@/lib/dropbox";

export const runtime = "nodejs";

async function origin(): Promise<string> {
  const h = await headers();
  const proto = h.get("x-forwarded-proto") ?? "https";
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  return `${proto}://${host}`;
}

function page(title: string, body: string): Response {
  const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title>
<style>body{font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:#f4f1e8;color:#1f2724;margin:0;padding:40px 20px;line-height:1.6}
.card{max-width:680px;margin:0 auto;background:#fbf9f3;border:1px solid rgba(31,39,36,.14);border-radius:18px;padding:28px}
h1{font-size:22px;margin:0 0 10px}code,.tok{font-family:ui-monospace,Menlo,monospace;font-size:13px;background:#ece6d7;border:1px solid rgba(31,39,36,.14);border-radius:10px;padding:14px;display:block;word-break:break-all;margin:14px 0}
b{color:#b15f38}</style></head><body><div class="card">${body}</div></body></html>`;
  return new Response(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}

// Reçoit le code d'autorisation Dropbox et affiche le refresh token à copier.
export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const err = url.searchParams.get("error_description") || url.searchParams.get("error");

  if (err) {
    return page("Connexion Dropbox", `<h1>Connexion annulée</h1><p>${err}</p>`);
  }
  if (!code) {
    return page(
      "Connexion Dropbox",
      `<h1>Connexion Dropbox</h1><p>Démarrez la connexion via <code>/api/gallery/dropbox/connect</code>.</p>`
    );
  }

  const redirectUri = `${await origin()}/api/gallery/dropbox/callback`;
  const { refresh_token, error } = await exchangeCodeForRefreshToken(code, redirectUri);
  if (error || !refresh_token) {
    return page(
      "Connexion Dropbox",
      `<h1>Échec</h1><p>${error ?? "Token introuvable."}</p>`
    );
  }

  return page(
    "Dropbox connecté",
    `<h1>✅ Dropbox connecté</h1>
     <p>Copie ce <b>refresh token</b> et ajoute-le sur Vercel dans la variable
     <code>DROPBOX_REFRESH_TOKEN</code>, puis redéploie.</p>
     <div class="tok">${refresh_token}</div>
     <p style="color:#5e655d;font-size:14px">Garde-le secret. Tu peux refermer cet onglet ensuite.</p>`
  );
}

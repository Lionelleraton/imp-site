// Client Dropbox minimal pour les galeries clients.
// Les photos restent stockées sur Dropbox ; le site liste et relaie les images,
// protégées par le code d'accès galerie.
//
// Variables d'environnement attendues :
//   DROPBOX_APP_KEY        : clé de l'app Dropbox
//   DROPBOX_APP_SECRET     : secret de l'app Dropbox
//   DROPBOX_REFRESH_TOKEN  : refresh token (obtenu une fois via /api/gallery/dropbox/connect)
//   DROPBOX_GALLERIES_PATH : (optionnel) dossier de base, ex. "" (racine app folder)
//                            ou "/Galeries clients". Chaque galerie = un sous-dossier
//                            nommé comme le code d'accès.

const API = "https://api.dropboxapi.com/2";
const CONTENT = "https://content.dropboxapi.com/2";
const TOKEN_URL = "https://api.dropbox.com/oauth2/token";

export type DropboxFile = {
  name: string;
  path: string; // path_display
  size: number;
};

const IMAGE_RE = /\.(jpe?g|png|webp|gif|avif|tiff?|heic)$/i;

export function isDropboxConfigured(): boolean {
  return Boolean(
    process.env.DROPBOX_APP_KEY?.trim() &&
      process.env.DROPBOX_APP_SECRET?.trim() &&
      process.env.DROPBOX_REFRESH_TOKEN?.trim()
  );
}

export function getBasePath(): string {
  const raw = (process.env.DROPBOX_GALLERIES_PATH ?? "").trim();
  if (!raw || raw === "/") return "";
  return ("/" + raw.replace(/^\/+/, "").replace(/\/+$/, "")).replace(/\/+/g, "/");
}

export function resolveFolderPathForCode(code: string): string {
  const clean = code.trim().replace(/^\/+|\/+$/g, "");
  return `${getBasePath()}/${clean}`;
}

let cachedToken: { value: string; exp: number } | null = null;

async function getAccessToken(): Promise<string> {
  const now = Date.now();
  if (cachedToken && cachedToken.exp - 60_000 > now) return cachedToken.value;

  const key = process.env.DROPBOX_APP_KEY?.trim();
  const secret = process.env.DROPBOX_APP_SECRET?.trim();
  const refresh = process.env.DROPBOX_REFRESH_TOKEN?.trim();
  if (!key || !secret || !refresh) {
    throw new Error("Dropbox non configuré.");
  }

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${key}:${secret}`).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh,
    }),
  });
  if (!res.ok) throw new Error(`Dropbox auth échouée (${res.status}).`);
  const data = (await res.json()) as { access_token: string; expires_in: number };
  cachedToken = {
    value: data.access_token,
    exp: now + (data.expires_in ?? 14400) * 1000,
  };
  return data.access_token;
}

async function rpc(endpoint: string, body: unknown): Promise<Response> {
  const token = await getAccessToken();
  return fetch(`${API}/${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

async function content(endpoint: string, apiArg: unknown): Promise<Response> {
  const token = await getAccessToken();
  return fetch(`${CONTENT}/${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Dropbox-API-Arg": JSON.stringify(apiArg),
    },
  });
}

type ListEntry = {
  ".tag": "file" | "folder" | "deleted";
  name: string;
  path_display?: string;
  size?: number;
};

export async function listFolderImages(folderPath: string): Promise<DropboxFile[]> {
  const files: DropboxFile[] = [];
  let res = await rpc("files/list_folder", {
    path: folderPath,
    recursive: false,
    limit: 2000,
  });
  if (!res.ok) return files; // dossier absent ou vide

  const collect = (entries: ListEntry[]) => {
    entries.forEach((e) => {
      if (e[".tag"] === "file" && IMAGE_RE.test(e.name)) {
        files.push({
          name: e.name,
          path: e.path_display ?? `${folderPath}/${e.name}`,
          size: e.size ?? 0,
        });
      }
    });
  };

  let data = (await res.json()) as {
    entries: ListEntry[];
    cursor: string;
    has_more: boolean;
  };
  collect(data.entries);

  while (data.has_more) {
    res = await rpc("files/list_folder/continue", { cursor: data.cursor });
    if (!res.ok) break;
    data = (await res.json()) as typeof data;
    collect(data.entries);
  }

  files.sort((a, b) => a.name.localeCompare(b.name, "fr", { numeric: true }));
  return files;
}

// Miniature (aperçu rapide). size ex. "w2048h1536" (max) ou "w1024h768".
export async function getThumbnail(
  path: string,
  size: string = "w2048h1536"
): Promise<Response> {
  return content("files/get_thumbnail_v2", {
    resource: { ".tag": "path", path },
    format: { ".tag": "jpeg" },
    size: { ".tag": size },
    mode: { ".tag": "fitone_bestfit" },
  });
}

// Fichier original (pleine résolution) pour le téléchargement.
export async function downloadFile(path: string): Promise<Response> {
  return content("files/download", { path });
}

// ── OAuth (obtention unique du refresh token) ──

export function buildAuthorizeUrl(redirectUri: string): string | null {
  const key = process.env.DROPBOX_APP_KEY?.trim();
  if (!key) return null;
  const params = new URLSearchParams({
    client_id: key,
    response_type: "code",
    token_access_type: "offline",
    redirect_uri: redirectUri,
  });
  return `https://www.dropbox.com/oauth2/authorize?${params.toString()}`;
}

export async function exchangeCodeForRefreshToken(
  code: string,
  redirectUri: string
): Promise<{ refresh_token?: string; error?: string }> {
  const key = process.env.DROPBOX_APP_KEY?.trim();
  const secret = process.env.DROPBOX_APP_SECRET?.trim();
  if (!key || !secret) return { error: "DROPBOX_APP_KEY / SECRET manquants." };

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      grant_type: "authorization_code",
      client_id: key,
      client_secret: secret,
      redirect_uri: redirectUri,
    }),
  });
  const data = (await res.json()) as { refresh_token?: string; error_description?: string };
  if (!res.ok || !data.refresh_token) {
    return { error: data.error_description || `Échec (${res.status}).` };
  }
  return { refresh_token: data.refresh_token };
}

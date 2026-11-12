import crypto from "node:crypto";

// Client Google Drive minimal (compte de service) pour les galeries clients.
// Les photos restent stockées et sauvegardées sur Drive ; le site se contente
// de lister et de relayer les images, protégées par le code d'accès galerie.
//
// Variables d'environnement attendues :
//   GOOGLE_SERVICE_ACCOUNT_EMAIL        : adresse du compte de service
//   GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY  : clé privée PEM (avec des \n échappés)
//   GALLERY_DRIVE_PARENT_FOLDER_ID      : dossier parent partagé avec le compte
//                                          de service (contient un sous-dossier
//                                          par galerie, nommé comme le code).

const TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";
const DRIVE_API = "https://www.googleapis.com/drive/v3";
const SCOPE = "https://www.googleapis.com/auth/drive.readonly";

export type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
  size: number;
};

export function isDriveConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim() &&
      process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.trim() &&
      process.env.GALLERY_DRIVE_PARENT_FOLDER_ID?.trim()
  );
}

function getPrivateKey(): string {
  return (process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY ?? "")
    .replace(/\\n/g, "\n")
    .trim();
}

function base64Url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

// Jeton d'accès mis en cache le temps de sa validité (par instance).
let cachedToken: { value: string; exp: number } | null = null;

async function getAccessToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  if (cachedToken && cachedToken.exp - 60 > now) {
    return cachedToken.value;
  }

  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();
  const privateKey = getPrivateKey();
  if (!email || !privateKey) {
    throw new Error("Compte de service Google non configuré.");
  }

  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = base64Url(
    JSON.stringify({
      iss: email,
      scope: SCOPE,
      aud: TOKEN_ENDPOINT,
      iat: now,
      exp: now + 3600,
    })
  );
  const signingInput = `${header}.${claim}`;
  const signature = crypto.sign(
    "RSA-SHA256",
    Buffer.from(signingInput),
    privateKey
  );
  const assertion = `${signingInput}.${base64Url(signature)}`;

  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  if (!res.ok) {
    throw new Error(`Échec de l'authentification Google Drive (${res.status}).`);
  }
  const data = (await res.json()) as { access_token: string; expires_in: number };
  cachedToken = {
    value: data.access_token,
    exp: now + (data.expires_in ?? 3600),
  };
  return data.access_token;
}

async function driveGet(path: string): Promise<Response> {
  const token = await getAccessToken();
  return fetch(`${DRIVE_API}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

function escapeQueryValue(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

// Résout le dossier Drive d'une galerie à partir du code d'accès.
// Convention : un sous-dossier du dossier parent, nommé exactement comme le code
// (insensible à la casse). On teste quelques variantes courantes du code.
const folderIdCache = new Map<string, { id: string | null; exp: number }>();

export async function resolveFolderIdForCode(
  code: string
): Promise<string | null> {
  const parent = process.env.GALLERY_DRIVE_PARENT_FOLDER_ID?.trim();
  if (!parent) return null;

  const key = code.trim().toLowerCase();
  const now = Date.now();
  const cached = folderIdCache.get(key);
  if (cached && cached.exp > now) return cached.id;

  const candidates = Array.from(
    new Set([
      code.trim(),
      code.trim().toUpperCase(),
      code.trim().toLowerCase(),
      code.trim().replace(/\s+/g, "-"),
      code.trim().replace(/\s+/g, "_"),
    ])
  ).filter(Boolean);

  let foundId: string | null = null;
  for (const candidate of candidates) {
    const q = `'${parent}' in parents and mimeType = 'application/vnd.google-apps.folder' and name = '${escapeQueryValue(
      candidate
    )}' and trashed = false`;
    const res = await driveGet(
      `/files?q=${encodeURIComponent(q)}&fields=${encodeURIComponent(
        "files(id,name)"
      )}&pageSize=1&supportsAllDrives=true&includeItemsFromAllDrives=true`
    );
    if (!res.ok) continue;
    const data = (await res.json()) as { files?: { id: string }[] };
    if (data.files && data.files.length > 0) {
      foundId = data.files[0].id;
      break;
    }
  }

  folderIdCache.set(key, { id: foundId, exp: now + 5 * 60 * 1000 });
  return foundId;
}

export async function listImagesInFolder(folderId: string): Promise<DriveFile[]> {
  const q = `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`;
  const files: DriveFile[] = [];
  let pageToken: string | undefined;

  do {
    const params = new URLSearchParams({
      q,
      fields: "nextPageToken, files(id,name,mimeType,size)",
      orderBy: "name_natural",
      pageSize: "1000",
      supportsAllDrives: "true",
      includeItemsFromAllDrives: "true",
    });
    if (pageToken) params.set("pageToken", pageToken);
    const res = await driveGet(`/files?${params.toString()}`);
    if (!res.ok) break;
    const data = (await res.json()) as {
      files?: { id: string; name: string; mimeType: string; size?: string }[];
      nextPageToken?: string;
    };
    (data.files ?? []).forEach((f) =>
      files.push({
        id: f.id,
        name: f.name,
        mimeType: f.mimeType,
        size: Number(f.size ?? 0),
      })
    );
    pageToken = data.nextPageToken;
  } while (pageToken);

  return files;
}

// Vérifie qu'un fichier appartient bien au dossier autorisé (anti-accès direct).
export async function fileBelongsToFolder(
  fileId: string,
  folderId: string
): Promise<{ ok: boolean; name?: string; mimeType?: string }> {
  const res = await driveGet(
    `/files/${encodeURIComponent(fileId)}?fields=${encodeURIComponent(
      "id,name,mimeType,parents"
    )}&supportsAllDrives=true`
  );
  if (!res.ok) return { ok: false };
  const data = (await res.json()) as {
    name?: string;
    mimeType?: string;
    parents?: string[];
  };
  const ok = Array.isArray(data.parents) && data.parents.includes(folderId);
  return { ok, name: data.name, mimeType: data.mimeType };
}

// Récupère le flux binaire d'un fichier (pleine résolution) depuis Drive.
export async function getFileMedia(fileId: string): Promise<Response> {
  return driveGet(
    `/files/${encodeURIComponent(fileId)}?alt=media&supportsAllDrives=true`
  );
}

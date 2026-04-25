import crypto from "node:crypto";

const ADMIN_SESSION_COOKIE = "gallery_admin_session";
const GALLERY_SESSION_COOKIE = "gallery_access_session";
const DEFAULT_ADMIN_SESSION_TTL_SECONDS = 60 * 60 * 12;
const DEFAULT_GALLERY_SESSION_TTL_SECONDS = 60 * 60 * 6;

type TokenKind = "admin" | "gallery";

type BaseTokenPayload = {
  kind: TokenKind;
  exp: number;
};

export type AdminTokenPayload = BaseTokenPayload & {
  kind: "admin";
};

export type GalleryTokenPayload = BaseTokenPayload & {
  kind: "gallery";
  code: string;
};

type AnyTokenPayload = AdminTokenPayload | GalleryTokenPayload;

function base64UrlEncode(input: string | Buffer): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function base64UrlDecode(input: string): string {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  return Buffer.from(base64 + padding, "base64").toString("utf8");
}

function getSigningSecret(): string {
  const explicit = process.env.GALLERY_SIGNING_SECRET?.trim();
  if (explicit) return explicit;

  const blobToken = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  if (blobToken) return blobToken;

  return "imp-site-dev-gallery-secret";
}

function signRaw(payloadBase64: string): string {
  const signature = crypto
    .createHmac("sha256", getSigningSecret())
    .update(payloadBase64)
    .digest();
  return base64UrlEncode(signature);
}

function toToken(payload: AnyTokenPayload): string {
  const payloadBase64 = base64UrlEncode(JSON.stringify(payload));
  const signature = signRaw(payloadBase64);
  return `${payloadBase64}.${signature}`;
}

function verifyRaw(token: string): AnyTokenPayload | null {
  const [payloadBase64, signature] = token.split(".");
  if (!payloadBase64 || !signature) return null;

  const expected = signRaw(payloadBase64);
  const provided = Buffer.from(signature);
  const computed = Buffer.from(expected);

  if (provided.length !== computed.length) return null;
  if (!crypto.timingSafeEqual(provided, computed)) return null;

  try {
    const parsed = JSON.parse(base64UrlDecode(payloadBase64)) as AnyTokenPayload;
    if (!parsed || typeof parsed !== "object") return null;
    if (typeof parsed.exp !== "number" || Date.now() >= parsed.exp) return null;
    if (parsed.kind !== "admin" && parsed.kind !== "gallery") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function createAdminSessionToken(ttlSeconds = DEFAULT_ADMIN_SESSION_TTL_SECONDS): string {
  const payload: AdminTokenPayload = {
    kind: "admin",
    exp: Date.now() + ttlSeconds * 1000,
  };
  return toToken(payload);
}

export function createGallerySessionToken(
  code: string,
  ttlSeconds = DEFAULT_GALLERY_SESSION_TTL_SECONDS
): string {
  const payload: GalleryTokenPayload = {
    kind: "gallery",
    code,
    exp: Date.now() + ttlSeconds * 1000,
  };
  return toToken(payload);
}

export function verifyAdminSessionToken(token?: string | null): AdminTokenPayload | null {
  if (!token) return null;
  const payload = verifyRaw(token);
  if (!payload || payload.kind !== "admin") return null;
  return payload;
}

export function verifyGallerySessionToken(token?: string | null): GalleryTokenPayload | null {
  if (!token) return null;
  const payload = verifyRaw(token);
  if (!payload || payload.kind !== "gallery") return null;
  return payload;
}

export function getAdminSessionCookieName(): string {
  return ADMIN_SESSION_COOKIE;
}

export function getGallerySessionCookieName(): string {
  return GALLERY_SESSION_COOKIE;
}

export function getAdminSessionTtlSeconds(): number {
  return DEFAULT_ADMIN_SESSION_TTL_SECONDS;
}

export function getGallerySessionTtlSeconds(): number {
  return DEFAULT_GALLERY_SESSION_TTL_SECONDS;
}


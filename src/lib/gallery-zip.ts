// Découpe une galerie en archives ZIP de taille raisonnable.
// Chaque partie doit pouvoir être générée ET téléchargée dans la durée maximale
// d'une fonction serveur (300 s), y compris sur une connexion mobile moyenne :
// d'où un plafond d'environ 700 Mo et 80 photos par partie.

export const ZIP_PART_MAX_BYTES = 700 * 1024 * 1024;
export const ZIP_PART_MAX_FILES = 80;

export type SizedFile = { name: string; size: number };
export type ZipPartRange = { start: number; end: number; bytes: number; count: number };

export function planZipParts<T extends SizedFile>(files: T[]): ZipPartRange[] {
  const parts: ZipPartRange[] = [];
  let start = 0;
  let bytes = 0;
  files.forEach((f, i) => {
    const size = f.size || 0;
    const count = i - start;
    if (count > 0 && (bytes + size > ZIP_PART_MAX_BYTES || count >= ZIP_PART_MAX_FILES)) {
      parts.push({ start, end: i, bytes, count });
      start = i;
      bytes = 0;
    }
    bytes += size;
  });
  if (files.length > start) {
    parts.push({ start, end: files.length, bytes, count: files.length - start });
  }
  return parts;
}

export function normalizeGalleryCode(value: string): string {
  return value.trim().replace(/\s+/g, "-").toUpperCase();
}

export function normalizeGalleryCodeLoose(value: string): string {
  return value.replace(/\s+/g, "").toUpperCase();
}

export function slugifyPrefix(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^[-/]+|[-/]+$/g, "");
}

export function buildPrefixCandidates(raw: string): string[] {
  const trimmed = raw.trim();
  if (!trimmed) return [];

  const variants = new Set<string>();
  const add = (value: string) => {
    const clean = value.trim();
    if (!clean) return;
    variants.add(clean);
    if (!clean.endsWith("/")) variants.add(`${clean}/`);
  };

  add(trimmed);
  add(trimmed.toLowerCase());
  add(trimmed.toUpperCase());

  const dashed = trimmed.replace(/\s+/g, "-");
  const underscored = trimmed.replace(/\s+/g, "_");
  add(dashed);
  add(dashed.toLowerCase());
  add(dashed.toUpperCase());
  add(underscored);
  add(underscored.toLowerCase());
  add(underscored.toUpperCase());

  const slug = slugifyPrefix(trimmed);
  if (slug) {
    add(slug);
    add(slug.toUpperCase());
  }

  return Array.from(variants);
}


// Format autorisé pour un code galerie (après normalisation) : lettres,
// chiffres, tirets et underscores, 3 à 64 caractères. Empêche tout caractère
// de chemin (/, .., etc.) puisque le code sert à désigner un dossier.
export function isValidGalleryCode(code: string): boolean {
  return /^[A-Z0-9][A-Z0-9_-]{2,63}$/.test(code);
}

// Limiteur d'essais en mémoire (fenêtre glissante, par clé : IP + action).
// Best effort : chaque instance serverless a sa propre mémoire. Combiné à des
// codes longs et aléatoires, cela rend la recherche de code par force brute
// impraticable. Pour une garantie stricte multi-instances, brancher un store
// partagé (Upstash Redis / Vercel KV) à la place de cette Map.

type Bucket = { hits: number[] };

const buckets = new Map<string, Bucket>();

export function getClientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

/** Renvoie true si la clé a déjà atteint `max` évènements dans la fenêtre. */
export function isLimited(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket) return false;
  bucket.hits = bucket.hits.filter((t) => now - t < windowMs);
  return bucket.hits.length >= max;
}

/** Enregistre un évènement (ex. un échec) pour la clé. */
export function hit(key: string, windowMs: number): void {
  const now = Date.now();
  const bucket = buckets.get(key) ?? { hits: [] };
  bucket.hits = bucket.hits.filter((t) => now - t < windowMs);
  bucket.hits.push(now);
  buckets.set(key, bucket);
  // Nettoyage opportuniste pour éviter que la Map grossisse indéfiniment.
  if (buckets.size > 5000) {
    for (const [k, b] of buckets) {
      if (b.hits.every((t) => now - t >= windowMs)) buckets.delete(k);
    }
  }
}

export function reset(key: string): void {
  buckets.delete(key);
}

/** Petite pause pour ralentir les tentatives automatisées. */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

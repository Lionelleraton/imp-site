// Source unique de vérité pour les tarifs photo et le calcul des devis.
// Utilisée par le formulaire (/devis) ET l'API (/api/devis) : le total est
// toujours recalculé côté serveur à partir d'ici.

export type FormuleId =
  | "seance-courte"
  | "demi-journee"
  | "journee"
  | "shooting-produits"
  | "soiree-marque";

export type Formule = {
  id: FormuleId;
  name: string;
  tag: string;
  target: string;
  deliver: string;
  price: number; // prix net en euros (TVA non applicable)
};

export const FORMULES: Formule[] = [
  {
    id: "seance-courte",
    name: "Séance courte · 2 h terrain",
    tag: "2 h terrain",
    target: "Athlètes, clubs, petites marques",
    deliver: "30 à 40 photos retouchées · livraison sous 72 h",
    price: 300,
  },
  {
    id: "demi-journee",
    name: "Demi-journée · jusqu'à 4 h",
    tag: "Jusqu'à 4 h",
    target: "Courses, événements, marques",
    deliver: "100 à 150 photos retouchées · livraison sous 72 h",
    price: 450,
  },
  {
    id: "journee",
    name: "Journée · jusqu'à 8 h",
    tag: "Jusqu'à 8 h",
    target: "Courses, campagnes, grands événements",
    deliver: "250 à 400 photos retouchées · 15 photos livrées le soir même",
    price: 750,
  },
  {
    id: "shooting-produits",
    name: "Shooting produits · demi-journée",
    tag: "Demi-journée terrain",
    target: "Marques et équipementiers outdoor",
    deliver: "Produits portés ou utilisés en action · 30 visuels retouchés",
    price: 600,
  },
  {
    id: "soiree-marque",
    name: "Soirée de marque · 4 h",
    tag: "4 h",
    target: "Lancements, soirées partenaires, salons",
    deliver: "≈ 100 photos retouchées · livraison sous 72 h",
    price: 660,
  },
];

export const EXPRESS_PRICE = 100;
export const HOUR_PRICE = 100;
export const LICENCE_RATE = 0.3; // +30 % du prix de la formule
export const KM_PRICE = 0.5; // au-delà de 30 km, aller-retour
export const KM_INCLUDED = 30;
export const ASSOCIATIF_RATE = 0.15; // -15 %

export type DevisSelection = {
  formuleId: FormuleId | "";
  express: boolean;
  licence: boolean;
  associatif: boolean;
  extraHours: number; // heures supplémentaires
  kmAllerRetour: number; // distance A/R totale en km (0 si local)
};

export type QuoteLine = { label: string; amount: number; detail?: string };

export type Quote = {
  lines: QuoteLine[];
  total: number;
  valid: boolean;
};

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function getFormule(id: string): Formule | undefined {
  return FORMULES.find((f) => f.id === id);
}

/** Calcule le devis à partir d'une sélection. Pure, sans effet de bord. */
export function computeQuote(sel: DevisSelection): Quote {
  const formule = sel.formuleId ? getFormule(sel.formuleId) : undefined;
  if (!formule) return { lines: [], total: 0, valid: false };

  const lines: QuoteLine[] = [];

  const basePrice = formule.price;
  const discount = sel.associatif ? round2(basePrice * ASSOCIATIF_RATE) : 0;
  lines.push({ label: formule.name, amount: basePrice, detail: formule.deliver });

  if (discount > 0) {
    lines.push({ label: "Tarif associatif (−15 %)", amount: -discount });
  }

  const hours = Math.max(0, Math.min(12, Math.floor(sel.extraHours || 0)));
  if (hours > 0) {
    lines.push({
      label: `Heures supplémentaires × ${hours}`,
      amount: hours * HOUR_PRICE,
    });
  }

  if (sel.express) {
    lines.push({ label: "Livraison express (20 photos le soir même)", amount: EXPRESS_PRICE });
  }

  if (sel.licence) {
    lines.push({
      label: "Licence publicité / print (+30 %)",
      amount: round2(basePrice * LICENCE_RATE),
    });
  }

  const km = Math.max(0, Math.min(2000, Math.floor(sel.kmAllerRetour || 0)));
  const billableKm = Math.max(0, km - KM_INCLUDED);
  if (billableKm > 0) {
    lines.push({
      label: `Déplacement A/R depuis Chamonix (${km} km)`,
      amount: round2(billableKm * KM_PRICE),
    });
  }

  const total = round2(lines.reduce((sum, l) => sum + l.amount, 0));
  return { lines, total, valid: true };
}

export function formatEuro(n: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: n % 1 === 0 ? 0 : 2,
  }).format(n);
}

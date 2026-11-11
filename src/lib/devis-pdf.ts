import { PDFDocument, StandardFonts, rgb, type PDFFont } from "pdf-lib";
import { computeQuote, formatEuro, type DevisSelection } from "./devis-pricing";

export type DevisPdfData = {
  number: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  structure: string;
  eventDate: string;
  place: string;
  selection: DevisSelection;
};

const EMETTEUR = {
  name: "InMotion Performance",
  contact: "Lionel Jouannaud",
  address: "215 chemin des Favrands, 74400 Chamonix-Mont-Blanc",
  email: "inmotionperformance@icloud.com",
  phone: "+33 6 65 62 00 84",
  siren: "SIREN 953 801 511",
};

// Couleurs
const INK = rgb(0.137, 0.188, 0.212); // #233036
const MUTED = rgb(0.45, 0.49, 0.52);
const LINE = rgb(0.85, 0.87, 0.88);
const ACCENT = rgb(0.141, 0.263, 0.341); // #244357

const A4 = { w: 595.28, h: 841.89 };
const M = 48; // marge

// pdf-lib (WinAnsi) ne gère pas certains caractères Unicode : on les remplace.
function san(s: string): string {
  return (s ?? "")
    .replace(/[  ]/g, " ")
    .replace(/≈/g, "~")
    .replace(/−/g, "-")
    .replace(/[→✓]/g, "-");
}

export async function buildDevisPdf(data: DevisPdfData): Promise<Uint8Array> {
  const quote = computeQuote(data.selection);
  const doc = await PDFDocument.create();
  doc.setTitle(`Devis ${data.number}`);
  doc.setAuthor(EMETTEUR.name);
  const page = doc.addPage([A4.w, A4.h]);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  const text = (
    s: string,
    x: number,
    y: number,
    size = 10,
    f: PDFFont = font,
    color = INK
  ) => page.drawText(san(s), { x, y, size, font: f, color });

  const right = (
    s: string,
    xRight: number,
    y: number,
    size = 10,
    f: PDFFont = font,
    color = INK
  ) => {
    const w = f.widthOfTextAtSize(san(s), size);
    page.drawText(san(s), { x: xRight - w, y, size, font: f, color });
  };

  const hr = (y: number, x1 = M, x2 = A4.w - M, color = LINE) =>
    page.drawLine({ start: { x: x1, y }, end: { x: x2, y }, thickness: 1, color });

  let y = A4.h - M;

  // ── En-tête ──
  text("DEVIS", M, y - 18, 26, bold, ACCENT);
  right(`N° ${data.number}`, A4.w - M, y - 6, 11, bold);
  right(
    `Date : ${new Date(data.createdAt).toLocaleDateString("fr-FR")}`,
    A4.w - M,
    y - 22,
    9,
    font,
    MUTED
  );
  right("Échéance : à réception · Validité : 30 jours", A4.w - M, y - 35, 9, font, MUTED);

  y -= 60;
  hr(y);
  y -= 26;

  // ── Émetteur / Client ──
  const colR = A4.w / 2 + 10;
  text("ÉMETTEUR", M, y, 8, bold, MUTED);
  text("CLIENT", colR, y, 8, bold, MUTED);
  y -= 16;

  const blockEmetteur = [
    `${EMETTEUR.name} — ${EMETTEUR.contact}`,
    EMETTEUR.address,
    `${EMETTEUR.email}`,
    `${EMETTEUR.phone}`,
    EMETTEUR.siren,
  ];
  const blockClient = [
    data.structure ? `${data.name} — ${data.structure}` : data.name,
    data.email,
    data.phone || "",
    data.eventDate ? `Date souhaitée : ${data.eventDate}` : "",
    data.place ? `Lieu : ${data.place}` : "",
  ].filter(Boolean);

  const startY = y;
  blockEmetteur.forEach((l, i) => text(l, M, startY - i * 14, 10, i === 0 ? bold : font));
  blockClient.forEach((l, i) => text(l, colR, startY - i * 14, 10, i === 0 ? bold : font));

  y = startY - Math.max(blockEmetteur.length, blockClient.length) * 14 - 24;

  // ── Tableau prestation ──
  hr(y);
  y -= 16;
  text("DESCRIPTION", M, y, 8, bold, MUTED);
  right("MONTANT", A4.w - M, y, 8, bold, MUTED);
  y -= 8;
  hr(y);
  y -= 20;

  quote.lines.forEach((l) => {
    text(l.label, M, y, 10.5, bold);
    right(formatEuro(l.amount), A4.w - M, y, 10.5, bold);
    if (l.detail) {
      y -= 13;
      text(l.detail, M, y, 8.5, font, MUTED);
    }
    y -= 20;
  });

  y -= 4;
  hr(y);
  y -= 24;

  // ── Totaux ──
  right("TOTAL", A4.w - M - 130, y, 11, bold);
  right(formatEuro(quote.total), A4.w - M, y, 15, bold, ACCENT);
  y -= 16;
  right("TVA non applicable, art. 293 B du CGI.", A4.w - M, y, 8.5, font, MUTED);

  // ── Conditions ──
  y -= 40;
  hr(y);
  y -= 18;
  text("CONDITIONS", M, y, 8, bold, MUTED);
  y -= 16;
  const conditions = [
    "Ce devis est à confirmer et ne vous engage pas.",
    "Réservation : acompte de 30 % à la signature, solde à la livraison des photos.",
    "Déplacement : inclus jusqu'à 30 km, puis 0,50 €/km aller-retour depuis Chamonix.",
    "Remontées mécaniques, hébergement et repas éventuels facturés au réel.",
    "Droits de communication inclus : site, réseaux et presse — France, 2 ans. Crédit photo obligatoire.",
    "RIB communiqué à la validation du devis.",
  ];
  conditions.forEach((c) => {
    text("•", M, y, 9, font, MUTED);
    text(c, M + 12, y, 9, font, MUTED);
    y -= 15;
  });

  // ── Pied de page ──
  const footY = M + 8;
  hr(footY + 18);
  text(
    `${EMETTEUR.name} · ${EMETTEUR.contact} · ${EMETTEUR.email} · ${EMETTEUR.phone}`,
    M,
    footY,
    8,
    font,
    MUTED
  );

  return doc.save();
}

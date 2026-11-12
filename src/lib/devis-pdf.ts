import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import { computeQuote, type DevisSelection } from "./devis-pricing";
import { IMP_LOGO_PATH, IMP_LOGO_VIEWBOX } from "./imp-logo-path";

// Montants toujours en 2 décimales sur le PDF (format facture : « 660,00 € »).
function formatEuro(n: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

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
  email: "inmotionperformance@icloud.fr",
  phone: "+33 6 65 62 00 84",
  bank: "Boursorama",
  iban: "FR76 4061 8804 1800 0405 5915 142",
  bic: "BOUS FRPP XXX",
};

// ── Palette (identique à la DA du site : crème + encre) ──
const BG = rgb(0.957, 0.945, 0.91); // crème #F4F1E8
const BORDER = rgb(0.8, 0.78, 0.72); // liseré
const INK = rgb(0.11, 0.12, 0.12); // quasi-noir
const GREY = rgb(0.42, 0.43, 0.44); // texte secondaire
const LINE = rgb(0.8, 0.78, 0.72); // filets de tableau

const A4 = { w: 595.28, h: 841.89 };
const CM = 47; // marge de contenu gauche
const CMR = A4.w - CM; // marge de contenu droite

// pdf-lib (WinAnsi) ne gère pas certains caractères Unicode : on les remplace.
function san(s: string): string {
  return (s ?? "")
    .replace(/[   ]/g, " ")
    .replace(/≈/g, "~")
    .replace(/−/g, "-")
    .replace(/[→✓⚠]/g, "-")
    .replace(/€/g, "€"); // € supporté par WinAnsi
}

export async function buildDevisPdf(data: DevisPdfData): Promise<Uint8Array> {
  const quote = computeQuote(data.selection);
  const doc = await PDFDocument.create();
  doc.setTitle(`Devis ${data.number}`);
  doc.setAuthor(EMETTEUR.name);
  doc.setSubject("Estimation en ligne · InMotion Performance");
  const page = doc.addPage([A4.w, A4.h]);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  const Y = (fromTop: number) => A4.h - fromTop;

  const text = (
    s: string,
    x: number,
    fromTop: number,
    size = 10,
    f: PDFFont = font,
    color = INK
  ) => page.drawText(san(s), { x, y: Y(fromTop), size, font: f, color });

  const right = (
    s: string,
    xRight: number,
    fromTop: number,
    size = 10,
    f: PDFFont = font,
    color = INK
  ) => {
    const str = san(s);
    const w = f.widthOfTextAtSize(str, size);
    page.drawText(str, { x: xRight - w, y: Y(fromTop), size, font: f, color });
  };

  const center = (
    s: string,
    cx: number,
    fromTop: number,
    size = 10,
    f: PDFFont = font,
    color = INK
  ) => {
    const str = san(s);
    const w = f.widthOfTextAtSize(str, size);
    page.drawText(str, { x: cx - w / 2, y: Y(fromTop), size, font: f, color });
  };

  const hr = (fromTop: number, x1 = CM, x2 = CMR, color = LINE) =>
    page.drawLine({
      start: { x: x1, y: Y(fromTop) },
      end: { x: x2, y: Y(fromTop) },
      thickness: 1,
      color,
    });

  // ── Fond crème + liseré arrondi ──
  page.drawRectangle({ x: 0, y: 0, width: A4.w, height: A4.h, color: BG });
  page.drawRectangle({
    x: 22,
    y: 22,
    width: A4.w - 44,
    height: A4.h - 44,
    borderColor: BORDER,
    borderWidth: 1,
    color: undefined,
  });

  // ── Logo InMotion (tracé SVG, rendu identique au site) ──
  const logoW = 150;
  const scale = logoW / IMP_LOGO_VIEWBOX.w;
  page.drawSvgPath(IMP_LOGO_PATH, {
    x: CM,
    y: Y(52),
    scale,
    color: INK,
  });

  // ── En-tête : DEVIS + méta (droite) ──
  right("DEVIS", CMR, 82, 38, bold, INK);
  right(`DEVIS N°${data.number}`, CMR, 101, 12.5, bold, INK);
  right(
    `DATE : ${new Date(data.createdAt).toLocaleDateString("fr-FR")}`,
    CMR,
    117,
    10.5,
    font,
    GREY
  );
  right("ÉCHÉANCE : À réception", CMR, 132, 10.5, font, GREY);
  right("ESTIMATION À CONFIRMER", CMR, 150, 9, bold, INK);

  // ── ÉMETTEUR / DESTINATAIRE ──
  const blockTop = 182;
  text("ÉMETTEUR :", CM, blockTop, 11, bold, INK);
  right("DESTINATAIRE :", CMR, blockTop, 11, bold, INK);

  const emetteur = [
    EMETTEUR.name,
    EMETTEUR.contact,
    EMETTEUR.address,
    EMETTEUR.email,
    EMETTEUR.phone,
  ];
  const destinataire = [
    data.structure ? `${data.name}, ${data.structure}` : data.name,
    data.email,
    data.phone || "",
    data.eventDate ? `Date souhaitée : ${data.eventDate}` : "",
    data.place ? `Lieu : ${data.place}` : "",
  ].filter(Boolean);

  const lineStart = blockTop + 20;
  const lh = 15.5;
  emetteur.forEach((l, i) => text(l, CM, lineStart + i * lh, 10.5, font, GREY));
  destinataire.forEach((l, i) => right(l, CMR, lineStart + i * lh, 10.5, font, GREY));

  // ── Bandeau « estimation » (insistance) ──
  const noteTop = lineStart + 5 * lh + 20;
  center(
    "Estimation indicative générée en ligne. Elle ne constitue pas un devis définitif et reste à confirmer.",
    A4.w / 2,
    noteTop,
    9,
    bold,
    INK
  );

  // ── Tableau ──
  const qtyR = 372;
  const puR = 470;
  const totR = CMR;
  let t = noteTop + 28;

  text("DESCRIPTION :", CM, t, 10, bold, INK);
  right("QTÉ :", qtyR, t, 10, bold, INK);
  right("PRIX UNITAIRE HT :", puR, t, 10, bold, INK);
  right("TOTAL HT :", totR, t, 10, bold, INK);
  t += 10;
  hr(t);
  t += 22;

  quote.lines.forEach((l) => {
    text(l.label, CM, t, 11, font, INK);
    right("1", qtyR, t, 11, font, INK);
    right(formatEuro(l.amount), puR, t, 11, font, INK);
    right(formatEuro(l.amount), totR, t, 11, font, INK);
    if (l.detail) {
      t += 13;
      text(l.detail, CM, t, 8.5, font, GREY);
    }
    t += 22;
  });

  t += 4;
  hr(t);
  t += 24;

  // ── Totaux ──
  right("TOTAL HT", totR - 150, t, 11, bold, INK);
  right(formatEuro(quote.total), totR, t, 11, font, INK);
  t += 15;
  right("TVA non applicable - art. 293 B", totR, t, 9, font, GREY);
  t += 20;
  right("TOTAL TTC", totR - 150, t, 12, bold, INK);
  right(formatEuro(quote.total), totR, t, 13.5, bold, INK);

  // ── Pied de page : RÈGLEMENT / TERMES & CONDITIONS ──
  const footTop = 690;
  const colR = A4.w / 2 + 6;
  text("RÈGLEMENT :", CM, footTop, 11, bold, INK);
  const reglement = [
    "Virement bancaire",
    `Banque : ${EMETTEUR.bank}`,
    `IBAN : ${EMETTEUR.iban}`,
    `BIC : ${EMETTEUR.bic}`,
  ];
  reglement.forEach((l, i) => text(l, CM, footTop + 22 + i * 14, 9.5, font, GREY));

  text("TERMES & CONDITIONS", colR, footTop, 11, bold, INK);
  const termes = [
    "Estimation générée en ligne : elle ne constitue pas un devis définitif et reste à confirmer avec le photographe.",
    "TVA non applicable, art. 293 B du Code général des impôts.",
    "Déplacement inclus jusqu'à 30 km, puis 0,50 €/km aller-retour depuis Chamonix.",
    "Réservation : acompte de 30 % à la signature, solde à la livraison des photos.",
    "Droits de communication inclus (web, réseaux, presse), France, 2 ans. Crédit photo obligatoire.",
  ];
  drawParagraphs(page, font, termes, {
    x: colR,
    fromTop: footTop + 20,
    maxWidth: CMR - colR,
    size: 8.5,
    lh: 11.5,
    color: GREY,
    gap: 4,
    Y,
  });

  return doc.save();
}

// Rend une liste de paragraphes avec retour à la ligne automatique.
function drawParagraphs(
  page: PDFPage,
  font: PDFFont,
  paragraphs: string[],
  opts: {
    x: number;
    fromTop: number;
    maxWidth: number;
    size: number;
    lh: number;
    color: ReturnType<typeof rgb>;
    gap: number;
    Y: (t: number) => number;
  }
) {
  let t = opts.fromTop;
  for (const para of paragraphs) {
    const words = san(para).split(/\s+/);
    let line = "";
    for (const w of words) {
      const test = line ? `${line} ${w}` : w;
      if (font.widthOfTextAtSize(test, opts.size) > opts.maxWidth && line) {
        page.drawText(line, {
          x: opts.x,
          y: opts.Y(t),
          size: opts.size,
          font,
          color: opts.color,
        });
        t += opts.lh;
        line = w;
      } else {
        line = test;
      }
    }
    if (line) {
      page.drawText(line, {
        x: opts.x,
        y: opts.Y(t),
        size: opts.size,
        font,
        color: opts.color,
      });
      t += opts.lh;
    }
    t += opts.gap;
  }
}

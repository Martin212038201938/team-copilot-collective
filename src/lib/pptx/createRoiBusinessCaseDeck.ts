import type PptxGenJS from "pptxgenjs";
import type { RoiBusinessCase, PresentationOptions } from "@/lib/roi/types";
import { buildDeckValues, type DeckValues } from "@/lib/roi/deckValues";
import { PPT_THEME, PPT_FONT, px, pt, PAD, SLIDE_W, CONTENT_W } from "./theme";
import {
  paletteFor, hairline, racingStripe, eyebrow, slideTitle, lead, footer,
  hairlineGrid, kpiRow, railStatement, card, labeledBlock, hairlineTable, leadHeight, fitBodySize,
  estimateLines,
  type Palette,
} from "./layout";
import { DECK_SLIDES, DECK_FOOTER_LEFT, DECK_FOOTER_DISCLAIMER, type DeckSlideContent } from "./deckContent";
import { applyOverrides } from "./deckContentOverrides";
import { structureFor, type SlideStructure, type Step } from "./deckStructure";
import { buildPptxFileName } from "./fileName";

/** Buchungslink für das Erstgespräch – auf Folie 20 hinterlegt. */
const BOOKING_URL =
  "https://outlook.office.com/book/CopilotErstgesprch@yellow-boat.com/s/L_QescD89USYChbx2CRsNg2?ismsaljsauthenabled";

/**
 * Baut die 20-seitige Entscheidungsvorlage im Copilotenschule-Design.
 *
 * Grundsätze aus dem Design-Handoff:
 *  - Reihenfolge und Copy sind Teil der Argumentation und bleiben unverändert.
 *  - Es werden KEINE Folien abhängig von den Eingaben ein- oder ausgeblendet; die
 *    Präsentation ist immer identisch aufgebaut und wird nur mit Werten personalisiert.
 *  - Alles bleibt editierbar: echte Textfelder, Formen und Linien, keine Bilder von Folien.
 */
export async function createRoiBusinessCaseDeck(args: {
  businessCase: RoiBusinessCase;
  options: PresentationOptions;
}): Promise<{ blob: Blob; fileName: string }> {
  const { businessCase: bc, options } = args;
  const { default: PptxGenJS } = await import("pptxgenjs");
  const pptx = new PptxGenJS();

  pptx.layout = "LAYOUT_WIDE";
  pptx.author = "Copilotenschule";
  pptx.company = "Copilotenschule";
  pptx.subject = "Microsoft 365 Copilot Business Case";
  pptx.title = `Business Case Microsoft 365 Copilot – ${bc.inputs.companyName}`;

  const ansprechpartner = [options.contactName, options.contactRole].filter(Boolean).join(", ")
    || "Martin Lang · copilotenschule.de";
  const v = buildDeckValues(bc, { datum: options.presentationDate, ansprechpartner });

  const renderers: Record<number, (s: PptxGenJS.Slide, c: DeckSlideContent, p: Palette) => void> = {
    1: (s, c, p) => slide01(s, c, p, v, options),
    2: (s, c, p) => slide02(s, c, p, v),
    9: (s, c, p) => slide09(s, c, p, v),
    10: (s, c, p) => slide10(s, c, p, v),
    13: (s, c, p) => slide13(s, c, p, v),
    19: (s, c, p) => slide19(s, c, p, v, options),
    20: (s, c, p) => slide20(s, c, p, v),
  };

  for (const content of DECK_SLIDES) {
    // Erst die sprachlichen Anpassungen, dann die Werte einsetzen.
    const resolved = resolveContent(applyOverrides(content), v);
    const palette = paletteFor(resolved.bg);
    const slide = pptx.addSlide();
    slide.background = { color: palette.bg };

    const renderer = renderers[resolved.nr];
    if (renderer) {
      renderer(slide, resolved, palette);
    } else {
      // Alle übrigen Folien werden aus ihrer expliziten Struktur gezeichnet.
      renderStructure(slide, resolved, palette, structureFor(content), v);
    }

    if (resolved.nr > 1) {
      footer(slide, {
        left: DECK_FOOTER_LEFT,
        center: resolved.disclaimer ? DECK_FOOTER_DISCLAIMER : undefined,
        right: v.firma,
        palette,
      });
    }
    if (resolved.notes) slide.addNotes(resolved.notes);
  }

  const blob = (await pptx.write({ outputType: "blob" })) as Blob;
  return { blob, fileName: buildPptxFileName(bc.inputs.companyName) };
}

/** Ersetzt alle {{ platzhalter }} durch die berechneten Werte. */
function resolveContent(c: DeckSlideContent, v: DeckValues): DeckSlideContent {
  const fill = (text: string): string =>
    text.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (_m, key: string) => {
      const value = (v as unknown as Record<string, unknown>)[key];
      return typeof value === "string" || typeof value === "number" ? String(value) : "";
    });

  return {
    ...c,
    title: c.title ? fill(c.title) : c.title,
    items: c.items.map(fill),
  };
}


/**
 * Passt ein Logo in einen Rahmen ein, ohne es zu verzerren.
 *
 * pptxgenjs beschneidet bei sizing:"contain" das Bild (srcRect) statt es einzupassen —
 * ein quadratisches Logo in einem 300×140-Rahmen wurde dadurch sichtbar verzogen.
 * Deshalb rechnen wir die Zielmaße selbst aus und zentrieren das Bild im Rahmen.
 * Ohne bekanntes Seitenverhältnis wird ein quadratisches angenommen: lieber etwas
 * kleiner als verzerrt.
 */
function fitLogo(
  box: { x: number; y: number; w: number; h: number },
  aspect: number | undefined
): { x: number; y: number; w: number; h: number } {
  const ratio = aspect && aspect > 0 ? aspect : 1;
  let w = box.w;
  let h = w / ratio;
  if (h > box.h) {
    h = box.h;
    w = h * ratio;
  }
  return { x: box.x + (box.w - w) / 2, y: box.y + (box.h - h) / 2, w, h };
}

/** Kopfbereich (Eyebrow + Titel + optionaler Lead) und liefert die Y-Position darunter. */
function header(slide: PptxGenJS.Slide, c: DeckSlideContent, p: Palette, leadText?: string): number {
  if (c.eyebrow) eyebrow(slide, c.eyebrow, p);
  if (c.title) slideTitle(slide, c.title, p);
  if (leadText) {
    const leadY = PAD.top + px(140);
    lead(slide, leadText, p, leadY);
    // Der Folgeblock beginnt unter dem tatsächlich gesetzten Lead – bei zweizeiligen
    // Absätzen lag er vorher darunter und wurde überschrieben (Folie 04).
    return leadY + leadHeight(leadText) + px(56);
  }
  return PAD.top + px(170);
}

// ---------------------------------------------------------------- Folie 01

function slide01(slide: PptxGenJS.Slide, c: DeckSlideContent, p: Palette, v: DeckValues, o: PresentationOptions): void {
  racingStripe(slide, PAD.titleSide, PAD.titleTop);
  slide.addText("copilotenschule.de", {
    x: SLIDE_W - PAD.titleSide - px(500), y: PAD.titleTop - px(6), w: px(500), h: px(40),
    fontFace: PPT_FONT.display, fontSize: pt(28), bold: true, color: PPT_THEME.onNavy, align: "right", valign: "top",
  });

  const items = c.items;
  slide.addText(items[0] ?? "§ 00 — Entscheidungsvorlage", {
    x: PAD.titleSide, y: PAD.titleTop + px(60), w: px(900), h: px(34),
    fontFace: PPT_FONT.mono, fontSize: pt(24), color: PPT_THEME.onNavyTertiary, charSpacing: 2.4, valign: "top",
  });

  slide.addText("Business Case\nMicrosoft 365 Copilot", {
    x: PAD.titleSide, y: px(300), w: px(1400), h: px(300),
    fontFace: PPT_FONT.display, fontSize: pt(104), bold: true, color: PPT_THEME.onNavy,
    charSpacing: -3, lineSpacingMultiple: 1.05, valign: "top",
  });

  // Die beiden Untertitel dürfen jeweils zwei Zeilen brauchen; der zweite rutscht dann
  // nach unten, statt in den ersten hineinzulaufen.
  let subY = px(620);
  items.filter((t) => t.length > 60).slice(0, 2).forEach((text) => {
    const h = estimateLines(text, 1300, 32) * px(52);
    slide.addText(text, {
      x: PAD.titleSide, y: subY, w: px(1300), h,
      fontFace: PPT_FONT.body, fontSize: pt(32), color: PPT_THEME.onNavySecondary,
      lineSpacingMultiple: 1.25, valign: "top",
    });
    subY += h + px(18);
  });

  // Automatisch recherchiertes Logo, dezent unten rechts. Ohne Fund: kein Platzhalter.
  if (o.logoDataUrl) {
    const box = fitLogo(
      { x: SLIDE_W - PAD.titleSide - px(320), y: px(290), w: px(320), h: px(200) },
      o.logoAspect
    );
    slide.addImage({ data: o.logoDataUrl, ...box });
  }

  const metaY = px(1080 - 90 - 110);
  hairline(slide, PAD.titleSide, metaY, SLIDE_W - 2 * PAD.titleSide, PPT_THEME.onNavyHairline);
  const metaW = (SLIDE_W - 2 * PAD.titleSide) / 3;
  ([
    ["Unternehmen", v.firma],
    ["Stand", v.datum],
    ["Ansprechpartner", v.ansprechpartner],
  ] as const).forEach(([label, value], i) => {
    const x = PAD.titleSide + i * metaW;
    slide.addText(label.toUpperCase(), {
      x, y: metaY + px(22), w: metaW - px(24), h: px(30),
      fontFace: PPT_FONT.mono, fontSize: pt(24), color: PPT_THEME.onNavyMuted, charSpacing: 1.6, valign: "top",
    });
    slide.addText(value, {
      x, y: metaY + px(58), w: metaW - px(24), h: px(44),
      fontFace: PPT_FONT.body, fontSize: pt(30), color: PPT_THEME.onNavy, valign: "top", shrinkText: true,
    });
  });
}

// ---------------------------------------------------------------- Folie 02

function slide02(slide: PptxGenJS.Slide, c: DeckSlideContent, p: Palette, v: DeckValues): void {
  const y = header(slide, c, p, c.items[0]);

  kpiRow(slide, {
    x: PAD.side, y, w: CONTENT_W, h: px(190),
    palette: p,
    items: [
      { label: "ROI Jahr 1", value: v.roiY1 },
      { label: "Break-even", value: v.breakEven },
      { label: "Investition Jahr 1", value: v.costY1 },
      { label: "Netto-Nutzen 3 Jahre", value: v.net3 },
    ],
  });

  const boxY = y + px(230);
  // Die Karte reicht bis kurz über die Fußzeile — der Annahmenblock ist im
  // Zwei-Gruppen-Modell deutlich länger geworden und lief vorher unten heraus.
  const boxH = px(1080 - 80 - 60) - boxY - px(20);
  card(slide, { x: PAD.side, y: boxY, w: CONTENT_W, h: boxH });

  // Herleitung / Annahmen / Quellen – die drei Label-Text-Paare am Ende der Folie.
  const pairs: { label: string; body: string }[] = [];
  for (let i = 9; i + 1 < c.items.length; i += 2) {
    pairs.push({ label: c.items[i], body: c.items[i + 1] });
  }
  const colW = (CONTENT_W - px(96)) / 3;
  const bodySize = fitBodySize(pairs.slice(0, 3).map((pair) => pair.body), colW - px(40), boxH - px(150), 27);
  pairs.slice(0, 3).forEach((pair, i) => {
    labeledBlock(slide, {
      x: PAD.side + px(40) + i * (colW + px(8)),
      y: boxY + px(40),
      w: colW - px(40),
      label: pair.label,
      body: pair.body,
      palette: { ...p, secondary: PPT_THEME.body },
      bodyH: boxH - px(80),
      bodySize,
    });
  });
}



// ---------------------------------------------------------------- Folie 09

function slide09(slide: PptxGenJS.Slide, c: DeckSlideContent, p: Palette, v: DeckValues): void {
  const y = header(slide, c, p, c.items[0]);
  const leftW = px(900);

  hairlineTable(slide, {
    x: PAD.side, y, w: leftW, rowH: px(92),
    rows: [
      ["Realisierter Nutzen Jahr 1", v.benefitY1],
      ["Gesamtkosten Jahr 1", v.costY1],
      ["Realisierter Nutzen 3 Jahre", v.benefit3],
      ["Gesamtkosten 3 Jahre", v.cost3],
      ["Netto-Nutzen 3 Jahre", v.net3],
    ],
    palette: p, colRatios: [0.62, 0.38],
  });

  const rightX = PAD.side + leftW + px(80);
  const rightW = CONTENT_W - leftW - px(80);
  ([
    ["ROI Jahr 1", v.roiY1],
    ["ROI 3 Jahre", v.roi3],
  ] as const).forEach(([label, value], i) => {
    const boxY = y + i * px(200);
    card(slide, { x: rightX, y: boxY, w: rightW, h: px(170) });
    slide.addText(label.toUpperCase(), {
      x: rightX + px(32), y: boxY + px(26), w: rightW - px(64), h: px(30),
      fontFace: PPT_FONT.mono, fontSize: pt(24), color: PPT_THEME.footer, charSpacing: 1.6, valign: "top",
    });
    slide.addText(value, {
      x: rightX + px(32), y: boxY + px(62), w: rightW - px(64), h: px(90),
      fontFace: PPT_FONT.display, fontSize: pt(82), bold: true, color: PPT_THEME.navy,
      charSpacing: -2, valign: "top", shrinkText: true,
    });
  });

  // Der Hinweis füllt den Rest der rechten Spalte und verkleinert sich, statt in den
  // Kalkulationshinweis über der Fußzeile zu laufen.
  const hintY = y + px(410);
  const hintH = px(1080 - 80 - 105) - hintY;
  slide.addText(v.roiHinweis, {
    x: rightX, y: hintY, w: rightW, h: hintH,
    fontFace: PPT_FONT.body, fontSize: pt(fitBodySize([v.roiHinweis], rightW, hintH, 26)),
    color: p.secondary, lineSpacingMultiple: 1.25, valign: "top",
  });
}

// ---------------------------------------------------------------- Folie 10

function slide10(slide: PptxGenJS.Slide, c: DeckSlideContent, p: Palette, v: DeckValues): void {
  const y = header(slide, c, p, c.items[0]);

  kpiRow(slide, {
    x: PAD.side, y, w: CONTENT_W, h: px(200),
    palette: p, valueSize: 56,
    items: [
      { label: "Lizenzen", value: v.blockLic, note: `${v.blockLicPct} der Gesamtkosten` },
      { label: "Training", value: v.blockTrain, note: `${v.blockTrainPct} der Gesamtkosten` },
      { label: "IT-Setup", value: v.blockIt, note: `${v.blockItPct} der Gesamtkosten` },
      { label: "Change & Adoption", value: v.blockChange, note: `${v.blockChangePct} der Gesamtkosten` },
    ],
  });

  const notes = c.items.slice(-2);
  const colW = (CONTENT_W - px(80)) / 2;
  notes.forEach((text, i) => {
    slide.addText(text, {
      x: PAD.side + i * (colW + px(80)), y: y + px(260), w: colW, h: px(180),
      fontFace: PPT_FONT.body, fontSize: pt(27), color: p.secondary, lineSpacingMultiple: 1.3, valign: "top",
    });
  });
}



// ---------------------------------------------------------------- Folie 13

/** Break-even-Diagramm: kumulierter Nutzen gegen kumulierte Kosten, als natives Liniendiagramm. */
function slide13(slide: PptxGenJS.Slide, c: DeckSlideContent, p: Palette, v: DeckValues): void {
  const y = header(slide, c, p, c.items[0]);
  const labels = v.chartBenefitSeries.map((_, i) => `M${i + 1}`);

  slide.addChart(
    "line",
    [
      { name: "Kumulierter Nutzen", labels, values: v.chartBenefitSeries.map((n) => Math.round(n)) },
      { name: "Kumulierte Kosten", labels, values: v.chartCostSeries.map((n) => Math.round(n)) },
    ],
    {
      x: PAD.side, y, w: CONTENT_W, h: px(460),
      chartColors: [PPT_THEME.sky, PPT_THEME.navy],
      showLegend: true, legendPos: "b", legendFontFace: PPT_FONT.body, legendFontSize: pt(24),
      lineSize: 3, lineDataSymbol: "none",
      catAxisLabelFontFace: PPT_FONT.mono, catAxisLabelFontSize: pt(20),
      valAxisLabelFontFace: PPT_FONT.mono, valAxisLabelFontSize: pt(20),
      valAxisLabelFormatCode: "#,##0",
      catAxisLabelFrequency: "3",
    }
  );

  const beText = v.breakEvenMonth
    ? `Break-even: ${v.breakEvenShort} · Maßstab bis ${v.chartMaxLabel}`
    : `Kein Break-even innerhalb von 36 Monaten · Maßstab bis ${v.chartMaxLabel}`;
  slide.addText(beText, {
    x: PAD.side, y: y + px(480), w: CONTENT_W, h: px(50),
    fontFace: PPT_FONT.mono, fontSize: pt(24), color: PPT_THEME.signal, charSpacing: 1.6, valign: "top",
  });
}



// ---------------------------------------------------------------- Folie 19

function slide19(slide: PptxGenJS.Slide, c: DeckSlideContent, p: Palette, v: DeckValues, o: PresentationOptions): void {
  // Kein Lead: Der erste Eintrag der Vorlage ist das Wort "Beantragt" — die Beschriftung
  // des linken Blocks, kein Einleitungssatz.
  const y = header(slide, c, p);
  const colW = (CONTENT_W - px(80)) / 2;

  const facts: [string, string][] = [
    ["Beantragter Umfang", `${v.nutzerText} Nutzer · ${v.gruppenText}`],
    ["Investition Jahr 1", v.costY1],
    ["Aufteilung", v.investSplit],
    ["Erwarteter Nutzen Jahr 1", v.benefitY1],
    ["Erwarteter Break-even", v.breakEven],
  ];
  facts.forEach(([label, value], i) => {
    const rowY = y + i * px(96);
    hairline(slide, PAD.side, rowY, colW, p.hairline);
    slide.addText(label.toUpperCase(), {
      x: PAD.side, y: rowY + px(18), w: colW, h: px(30),
      fontFace: PPT_FONT.mono, fontSize: pt(24), color: PPT_THEME.onNavyMuted, charSpacing: 1.6, valign: "top",
    });
    slide.addText(value, {
      x: PAD.side, y: rowY + px(52), w: colW, h: px(40),
      fontFace: PPT_FONT.body, fontSize: pt(28), color: p.text, valign: "top", shrinkText: true,
    });
  });

  // Die vier Schritte stehen in der Vorlage hinter den Nummern 01–04; der Schlusssatz
  // danach ist der Disclaimer und gehört nicht in die Liste.
  const numbered = c.items
    .map((t, i) => ({ t, prev: c.items[i - 1] }))
    .filter((e) => /^0\d$/.test(e.prev ?? ""))
    .map((e) => e.t);
  const steps = numbered.slice(0, 4);
  const rightX = PAD.side + colW + px(80);
  slide.addText("NÄCHSTE SCHRITTE", {
    x: rightX, y, w: colW, h: px(30),
    fontFace: PPT_FONT.mono, fontSize: pt(24), color: PPT_THEME.onNavyTertiary, charSpacing: 1.6, valign: "top",
  });
  steps.forEach((text, i) => {
    slide.addText(`${String(i + 1).padStart(2, "0")}   ${text}`, {
      x: rightX, y: y + px(56 + i * 104), w: colW, h: px(96),
      fontFace: PPT_FONT.body, fontSize: pt(27), color: p.secondary, lineSpacingMultiple: 1.25, valign: "top",
    });
  });

  if (o.logoDataUrl) {
    const box = fitLogo(
      { x: SLIDE_W - PAD.side - px(220), y: PAD.top - px(16), w: px(220), h: px(110) },
      o.logoAspect
    );
    slide.addImage({ data: o.logoDataUrl, ...box });
  }
}

// ---------------------------------------------------------------- Folie 20

function slide20(slide: PptxGenJS.Slide, c: DeckSlideContent, p: Palette, v: DeckValues): void {
  const items = c.items;
  // Reihenfolge in der Vorlage: Einladung · Begründung · Label · Name · Rolle · E-Mail ·
  // Button-Titel · Button-Text · Button-Label · Telefon · Markenzeile · Telefon.
  const [invitation, reason, contactLabel, name, role, email, bookingTitle, bookingText, bookingCta, phoneAlt, brandLine] = items;

  const y = header(slide, c, p, reason);
  const colW = (CONTENT_W - px(100)) / 2;

  // --- links: Einladung und Ansprechpartner ---------------------------------
  slide.addText(invitation, {
    x: PAD.side, y, w: colW, h: px(110),
    fontFace: PPT_FONT.display, fontSize: pt(42), bold: true, color: p.text,
    lineSpacingMultiple: 1.15, valign: "top", shrinkText: true,
  });

  const cardY = y + px(140);
  const cardH = px(310);
  card(slide, { x: PAD.side, y: cardY, w: colW, h: cardH });
  racingStripe(slide, PAD.side + px(40), cardY + px(36));

  slide.addText((contactLabel ?? "Ihr Ansprechpartner").toUpperCase(), {
    x: PAD.side + px(40), y: cardY + px(74), w: colW - px(80), h: px(30),
    fontFace: PPT_FONT.mono, fontSize: pt(22), color: PPT_THEME.footer, charSpacing: 1.6, valign: "top",
  });
  slide.addText(name ?? "", {
    x: PAD.side + px(40), y: cardY + px(114), w: colW - px(80), h: px(60),
    fontFace: PPT_FONT.display, fontSize: pt(40), bold: true, color: PPT_THEME.navy, valign: "top", shrinkText: true,
  });
  slide.addText([role, email, phoneAlt?.replace(/^Alternativ:\s*/, "")].filter(Boolean).join("\n"), {
    x: PAD.side + px(40), y: cardY + px(180), w: colW - px(80), h: px(90),
    fontFace: PPT_FONT.body, fontSize: pt(25), color: PPT_THEME.body, lineSpacingMultiple: 1.3, valign: "top",
  });

  // --- rechts: Terminbuchung ------------------------------------------------
  const rightX = PAD.side + colW + px(100);
  slide.addText((bookingTitle ?? "Termin direkt buchen").toUpperCase(), {
    x: rightX, y, w: colW, h: px(30),
    fontFace: PPT_FONT.mono, fontSize: pt(22), color: PPT_THEME.signal, charSpacing: 1.6, valign: "top",
  });
  slide.addText(bookingText ?? "", {
    x: rightX, y: y + px(50), w: colW, h: px(110),
    fontFace: PPT_FONT.body, fontSize: pt(28), color: p.secondary, lineSpacingMultiple: 1.3, valign: "top",
  });

  const btnY = y + px(180);
  slide.addShape("rect", {
    x: rightX, y: btnY, w: colW, h: px(110),
    fill: { color: PPT_THEME.navy }, line: { color: PPT_THEME.navy, width: 0 },
  });
  slide.addText(bookingCta ?? "Termin wählen →", {
    x: rightX, y: btnY + px(30), w: colW, h: px(56),
    fontFace: PPT_FONT.display, fontSize: pt(32), bold: true, color: PPT_THEME.white,
    align: "center", valign: "top",
    hyperlink: { url: BOOKING_URL },
  });
  slide.addText(`${email} · ${(phoneAlt ?? "").replace(/^Alternativ:\s*/, "")}`, {
    x: rightX, y: btnY + px(132), w: colW, h: px(44),
    fontFace: PPT_FONT.mono, fontSize: pt(22), color: p.secondary, align: "center", valign: "top",
  });

  // --- Markenzeile über der Fußzeile ---------------------------------------
  const brandY = px(1080 - 80 - 34) - px(84);
  slide.addText(`${brandLine ?? ""} · Business Case für ${v.firma}`, {
    x: PAD.side, y: brandY, w: CONTENT_W, h: px(40),
    fontFace: PPT_FONT.body, fontSize: pt(24), color: p.secondary, valign: "top",
  });
}

// ------------------------------------------------- Strukturbasierte Folien

/**
 * Zeichnet eine Folie aus ihrer expliziten Struktur (siehe deckStructure.ts).
 * Ersetzt die frühere Heuristik, die Titel und Texte aus der Reihenfolge der
 * Textbausteine erraten hat und bei Pfeilen, Zwischenlabels oder Preisen zerbrach.
 */
function renderStructure(
  slide: PptxGenJS.Slide,
  c: DeckSlideContent,
  p: Palette,
  structure: SlideStructure,
  v: DeckValues
): void {
  const fill = (t: string): string =>
    t.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (_m, key: string) => {
      const value = (v as unknown as Record<string, unknown>)[key];
      return typeof value === "string" || typeof value === "number" ? String(value) : "";
    });

  const y = header(slide, c, p, structure.kind !== "raw" ? structure.lead && fill(structure.lead) : undefined);
  // Oberhalb der Fußzeile UND des mittigen Kalkulationshinweises, der auf den
  // Rechenfolien direkt über der Fußlinie steht.
  const bottom = px(1080 - 80 - 105);
  const available = bottom - y;

  switch (structure.kind) {
    case "steps": {
      const cols = structure.columns;
      const rows = Math.ceil(structure.steps.length / cols);
      // Platz für die Schlussaussage reservieren – sie kann bis zu vier Zeilen lang sein.
      const statementH = structure.statement
        ? Math.max(px(150), estimateLines(fill(structure.statement), CONTENT_W / px(1), 30) * px(48) + px(40))
        : 0;
      const gridH = Math.max(px(220), (available - statementH - px(40) * (rows - 1)) / rows);

      // Eine gemeinsame Schriftgröße für alle Reihen: sonst steht Reihe 1 in 18 pt und
      // Reihe 2 in 27 pt, weil dort zufällig kürzere Texte stehen.
      const colW = (CONTENT_W - px(32) * (cols - 1)) / cols;
      const bodySize = fitBodySize(
        structure.steps.map((step) => (step.body ? fill(step.body) : "")),
        colW,
        gridH - px(120),
        27
      );

      for (let r = 0; r < rows; r++) {
        hairlineGrid(slide, {
          x: PAD.side,
          y: y + r * (gridH + px(40)),
          w: CONTENT_W,
          colH: gridH,
          columns: structure.steps.slice(r * cols, (r + 1) * cols).map((step) => ({
            eyebrow: step.num,
            title: fill(step.title),
            body: step.body ? fill(step.body) : undefined,
          })),
          palette: p,
          titleSize: cols >= 5 ? 26 : cols === 4 ? 30 : 32,
          bodySize,
        });
      }

      if (structure.statement) {
        const statementY = bottom - statementH + px(20);
        railStatement(slide, {
          x: PAD.side,
          y: statementY,
          w: CONTENT_W,
          text: fill(structure.statement),
          palette: p,
          size: 30,
          maxH: bottom - statementY,
        });
      }
      return;
    }

    case "chain": {
      const colW = (CONTENT_W - px(90)) / 2;
      const stepH = Math.min(px(110), available / Math.max(structure.steps.length, 1));

      const labelY = y;
      const bodyY = y + (structure.leftLabel || structure.rightLabel ? px(50) : 0);
      if (structure.leftLabel) {
        slide.addText(structure.leftLabel.toUpperCase(), {
          x: PAD.side, y: labelY, w: colW, h: px(30),
          fontFace: PPT_FONT.mono, fontSize: pt(24), color: PPT_THEME.sky, charSpacing: 1.6, valign: "top",
        });
      }
      structure.steps.forEach((step, i) => {
        const rowY = bodyY + i * stepH;
        hairline(slide, PAD.side, rowY, colW, p.hairline);
        slide.addText(step.num ?? "", {
          x: PAD.side, y: rowY + px(20), w: px(70), h: px(34),
          fontFace: PPT_FONT.mono, fontSize: pt(24), color: PPT_THEME.sky, valign: "top",
        });
        slide.addText(fill(step.title), {
          x: PAD.side + px(80), y: rowY + px(16), w: colW - px(80), h: stepH - px(30),
          fontFace: PPT_FONT.display, fontSize: pt(30), bold: true, color: p.text, valign: "top", shrinkText: true,
        });
      });

      const rightX = PAD.side + colW + px(90);
      if (structure.rightLabel) {
        slide.addText(structure.rightLabel.toUpperCase(), {
          x: rightX, y: labelY, w: colW, h: px(30),
          fontFace: PPT_FONT.mono, fontSize: pt(24), color: PPT_THEME.signal, charSpacing: 1.6, valign: "top",
        });
      }
      let cursor = bodyY;
      structure.text.forEach((text) => {
        slide.addText(fill(text), {
          x: rightX, y: cursor, w: colW, h: px(200),
          fontFace: PPT_FONT.body, fontSize: pt(28), color: p.secondary, lineSpacingMultiple: 1.3, valign: "top",
        });
        cursor += px(220);
      });
      (structure.boxed ?? []).forEach((text) => {
        card(slide, { x: rightX, y: cursor, w: colW, h: px(160) });
        slide.addText(fill(text), {
          x: rightX + px(28), y: cursor + px(24), w: colW - px(56), h: px(112),
          fontFace: PPT_FONT.body, fontSize: pt(27), color: PPT_THEME.body, lineSpacingMultiple: 1.3, valign: "top",
        });
        cursor += px(190);
      });
      return;
    }

    case "chainAndColumns": {
      // Die Vorlage verbindet die fünf Stufen sichtbar mit Pfeilen — ohne sie wirkt die
      // Reihe wie eine beliebige Aufzählung statt wie eine Kette.
      const arrowW = px(46);
      const linkW = (CONTENT_W - arrowW * (structure.chain.length - 1)) / structure.chain.length;
      structure.chain.forEach((step, i) => {
        const x = PAD.side + i * (linkW + arrowW);
        hairline(slide, x, y, linkW, p.hairline);
        slide.addText(step.num ?? "", {
          x, y: y + px(20), w: linkW, h: px(30),
          fontFace: PPT_FONT.mono, fontSize: pt(24), color: PPT_THEME.sky, valign: "top",
        });
        slide.addText(fill(step.title), {
          x, y: y + px(58), w: linkW, h: px(76),
          fontFace: PPT_FONT.display, fontSize: pt(30), bold: true, color: p.text, valign: "top", shrinkText: true,
        });
        if (i < structure.chain.length - 1) {
          slide.addText("→", {
            x: x + linkW, y: y + px(54), w: arrowW, h: px(50),
            fontFace: PPT_FONT.display, fontSize: pt(32), color: PPT_THEME.sky,
            align: "center", valign: "top",
          });
        }
      });

      const colY = y + px(210);
      hairlineGrid(slide, {
        x: PAD.side, y: colY, w: CONTENT_W, colH: Math.max(px(200), bottom - colY),
        columns: structure.columns.map((col) => ({ title: fill(col.title), body: col.body ? fill(col.body) : undefined })),
        palette: p,
      });
      return;
    }

    case "cards": {
      const cardW = (CONTENT_W - px(60)) / structure.cards.length;
      const cardH = Math.min(px(540), available);
      structure.cards.forEach((item, i) => {
        const x = PAD.side + i * (cardW + px(60));
        const isNavy = i === 1;
        card(slide, {
          x, y, w: cardW, h: cardH,
          fill: isNavy ? PPT_THEME.navy : PPT_THEME.white,
          border: PPT_THEME.navy,
        });
        racingStripe(slide, x + px(40), y + px(36));
        const textColor = isNavy ? PPT_THEME.onNavy : PPT_THEME.navy;
        const bodyColor = isNavy ? PPT_THEME.onNavySecondary : PPT_THEME.body;

        slide.addText(item.eyebrow.toUpperCase(), {
          x: x + px(40), y: y + px(74), w: cardW - px(80), h: px(30),
          fontFace: PPT_FONT.mono, fontSize: pt(24), color: isNavy ? PPT_THEME.onNavyTertiary : PPT_THEME.sky,
          charSpacing: 1.6, valign: "top",
        });
        slide.addText(fill(item.title), {
          x: x + px(40), y: y + px(112), w: cardW - px(80), h: px(64),
          fontFace: PPT_FONT.display, fontSize: pt(38), bold: true, color: textColor, valign: "top", shrinkText: true,
        });
        slide.addText(fill(item.body), {
          x: x + px(40), y: y + px(190), w: cardW - px(80), h: cardH - px(300),
          fontFace: PPT_FONT.body, fontSize: pt(27), color: bodyColor,
          lineSpacingMultiple: 1.3, valign: "top", shrinkText: true,
        });
        if (item.note) {
          slide.addText(fill(item.note), {
            x: x + px(40), y: y + cardH - px(96), w: cardW - px(80), h: px(70),
            fontFace: PPT_FONT.body, fontSize: pt(25), italic: true, color: bodyColor, valign: "top",
          });
        }
      });
      return;
    }

    case "table": {
      // estimateLines rechnet in Bildpunkten, CONTENT_W liegt in Zoll vor.
      const footH = structure.footnote
        ? Math.min(
            available * 0.4,
            estimateLines(fill(structure.footnote), CONTENT_W / px(1), 25) * px(40) + px(30)
          )
        : 0;
      hairlineTable(slide, {
        x: PAD.side, y, w: CONTENT_W, rowH: px(96),
        header: structure.header,
        rows: structure.rows.map((row) => row.map(fill)),
        palette: p,
        colRatios: structure.rows[0]?.length === 3 ? [0.4, 0.3, 0.3] : [0.42, 0.58],
        maxH: available - footH,
      });
      if (structure.footnote) {
        slide.addText(fill(structure.footnote), {
          x: PAD.side, y: bottom - footH + px(20), w: CONTENT_W, h: footH,
          fontFace: PPT_FONT.body, fontSize: pt(25), italic: true, color: p.secondary,
          lineSpacingMultiple: 1.25, valign: "top",
        });
      }
      return;
    }

    case "formula": {
      const count = structure.factors.length;
      const gap = px(52);
      const boxW = (CONTENT_W - gap * (count - 1)) / count;
      structure.factors.forEach((factor, i) => {
        const x = PAD.side + i * (boxW + gap);
        card(slide, { x, y, w: boxW, h: px(180) });
        slide.addText(factor.label.toUpperCase(), {
          x: x + px(20), y: y + px(22), w: boxW - px(40), h: px(64),
          fontFace: PPT_FONT.mono, fontSize: pt(22), color: PPT_THEME.footer,
          charSpacing: 1.4, align: "center", valign: "top",
        });
        slide.addText(fill(factor.value), {
          x: x + px(16), y: y + px(96), w: boxW - px(32), h: px(70),
          fontFace: PPT_FONT.display, fontSize: pt(36), bold: true, color: PPT_THEME.navy,
          align: "center", valign: "top", shrinkText: true,
        });
        if (i < count - 1) {
          slide.addText("×", {
            x: x + boxW, y: y + px(66), w: gap, h: px(56),
            fontFace: PPT_FONT.display, fontSize: pt(34), color: PPT_THEME.sky, align: "center", valign: "top",
          });
        }
      });

      const resY = y + px(230);
      hairline(slide, PAD.side, resY, CONTENT_W, p.hairline);
      slide.addText(structure.result.label.toUpperCase(), {
        x: PAD.side, y: resY + px(22), w: CONTENT_W, h: px(30),
        fontFace: PPT_FONT.mono, fontSize: pt(24), color: PPT_THEME.footer, charSpacing: 1.6, valign: "top",
      });
      slide.addText(fill(structure.result.value), {
        x: PAD.side, y: resY + px(58), w: CONTENT_W, h: px(90),
        fontFace: PPT_FONT.display, fontSize: pt(66), bold: true, color: PPT_THEME.navy,
        charSpacing: -1.6, valign: "top", shrinkText: true,
      });

      const notesY = resY + px(180);
      const noteW = (CONTENT_W - px(60)) / Math.max(structure.notes.length, 1);
      structure.notes.forEach((note, i) => {
        slide.addText(fill(note), {
          x: PAD.side + i * (noteW + px(30)), y: notesY, w: noteW, h: bottom - notesY,
          fontFace: PPT_FONT.body,
          fontSize: pt(fitBodySize(structure.notes.map(fill), noteW, bottom - notesY, 25)),
          color: p.secondary, lineSpacingMultiple: 1.25, valign: "top",
        });
      });
      return;
    }

    case "tiles": {
      const cols = structure.columns;
      const rows = Math.ceil(structure.tiles.length / cols);
      const footH = structure.footnote ? px(120) : 0;
      const gap = px(28);
      const tileW = (CONTENT_W - gap * (cols - 1)) / cols;
      const tileH = Math.max(px(150), (available - footH - gap * (rows - 1)) / rows);

      const padX = px(28);
      const innerW = tileW - 2 * padX;

      // Die Kacheln sind unterschiedlich beschriftet: manche Titel brauchen zwei Zeilen,
      // manche Beschreibungen drei. Deshalb wird der Block je Kachel von oben nach unten
      // aufgebaut und der Fließtext bekommt genau den Rest — vorher war die Höhe fest und
      // längere Leistungsbeschreibungen liefen unten aus der Kachel heraus.
      const titleLines = Math.max(
        ...structure.tiles.map((t) => estimateLines(fill(t.title), innerW / px(1), 28))
      );
      const titleH = px(24) + titleLines * px(42);
      const noteH = structure.tiles.some((t) => t.note) ? px(58) : 0;
      const bodyY = titleH + noteH + px(12);
      const bodyH = tileH - bodyY - px(20);
      const bodySize = fitBodySize(
        structure.tiles.map((t) => (t.body ? fill(t.body) : "")),
        innerW,
        bodyH,
        23
      );

      structure.tiles.forEach((tile, i) => {
        const x = PAD.side + (i % cols) * (tileW + gap);
        const ty = y + Math.floor(i / cols) * (tileH + gap);
        card(slide, { x, y: ty, w: tileW, h: tileH });

        // Kacheln ohne Beschreibung sind Wortmarken (Folie 18) und stehen mittig.
        const isWordmark = !tile.body && !tile.note;
        slide.addText(fill(tile.title), {
          x: x + padX, y: ty + (isWordmark ? tileH / 2 - px(34) : px(24)), w: innerW,
          h: isWordmark ? px(68) : titleH - px(24),
          fontFace: PPT_FONT.display, fontSize: pt(isWordmark ? 30 : 28), bold: true, color: PPT_THEME.navy,
          valign: "top", shrinkText: true,
        });
        if (tile.note) {
          // Der Preis ist die Kernaussage der Kachel und steht direkt unter dem Titel.
          slide.addText(fill(tile.note), {
            x: x + padX, y: ty + titleH, w: innerW, h: noteH - px(6),
            fontFace: PPT_FONT.display, fontSize: pt(32), bold: true, color: PPT_THEME.signal,
            valign: "top", shrinkText: true,
          });
        }
        if (tile.body) {
          slide.addText(fill(tile.body), {
            x: x + padX, y: ty + bodyY, w: innerW, h: bodyH,
            fontFace: PPT_FONT.body, fontSize: pt(bodySize), color: PPT_THEME.body,
            lineSpacingMultiple: 1.2, valign: "top", shrinkText: true,
          });
        }
      });

      if (structure.footnote) {
        slide.addText(fill(structure.footnote), {
          x: PAD.side, y: bottom - footH + px(16), w: CONTENT_W, h: footH - px(20),
          fontFace: PPT_FONT.body, fontSize: pt(24), color: p.secondary, lineSpacingMultiple: 1.25, valign: "top",
        });
      }
      return;
    }

    case "numbers": {
      // Bewusst nicht kpiRow: dort steht das Label ÜBER der Zahl und ist einzeilig
      // gedacht. Hier sind die Beschriftungen ganze Sätze und gehören unter die Zahl.
      const gap = px(40);
      const colW = (CONTENT_W - gap * (structure.numbers.length - 1)) / structure.numbers.length;

      // Die Beschriftungen sind ganze Sätze und brauchen je nach Spaltenbreite zwei bis
      // vier Zeilen. Bei fester Blockhöhe lief die letzte Zeile über die untere Haarlinie.
      const labelLines = Math.max(
        ...structure.numbers.map((n) => estimateLines(fill(n.label), colW / px(1), 25))
      );
      const blockH = Math.min(
        available - px(200),
        Math.max(px(230), px(126) + labelLines * px(44) + px(24))
      );

      hairline(slide, PAD.side, y, CONTENT_W, p.hairline);
      structure.numbers.forEach((n, i) => {
        const x = PAD.side + i * (colW + gap);
        slide.addText(fill(n.value), {
          x, y: y + px(30), w: colW, h: px(84),
          fontFace: PPT_FONT.display, fontSize: pt(58), bold: true, color: p.text,
          charSpacing: -1.6, valign: "top", shrinkText: true,
        });
        slide.addText(fill(n.label), {
          x, y: y + px(126), w: colW, h: blockH - px(150),
          fontFace: PPT_FONT.body, fontSize: pt(25), color: p.secondary,
          lineSpacingMultiple: 1.25, valign: "top", shrinkText: true,
        });
      });
      hairline(slide, PAD.side, y + blockH, CONTENT_W, p.hairline);

      if (structure.quote) {
        railStatement(slide, {
          x: PAD.side, y: y + blockH + px(70), w: CONTENT_W, text: fill(structure.quote),
          palette: p, size: 32, italic: true,
          attribution: structure.quoteAuthor ? fill(structure.quoteAuthor) : undefined,
        });
      }
      return;
    }

    default: {
      // Sollte nicht vorkommen — sichtbar machen statt still eine leere Folie liefern.
      slide.addText(structure.kind === "raw" ? structure.items.map(fill).join("\n") : "", {
        x: PAD.side, y, w: CONTENT_W, h: available,
        fontFace: PPT_FONT.body, fontSize: pt(26), color: p.secondary, lineSpacingMultiple: 1.3, valign: "top",
      });
    }
  }
}

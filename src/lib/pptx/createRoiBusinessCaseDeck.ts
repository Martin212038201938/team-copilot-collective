import type PptxGenJS from "pptxgenjs";
import type { RoiBusinessCase, PresentationOptions } from "@/lib/roi/types";
import { buildDeckValues, type DeckValues } from "@/lib/roi/deckValues";
import { PPT_THEME, PPT_FONT, px, pt, PAD, SLIDE_W, CONTENT_W } from "./theme";
import {
  paletteFor, hairline, racingStripe, eyebrow, slideTitle, lead, footer,
  hairlineGrid, kpiRow, railStatement, card, labeledBlock, hairlineTable,
  type Palette,
} from "./layout";
import { DECK_SLIDES, DECK_FOOTER_LEFT, DECK_FOOTER_DISCLAIMER, type DeckSlideContent } from "./deckContent";
import { buildPptxFileName } from "./fileName";

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
    3: (s, c, p) => gridSlide(s, c, p, 4),
    4: (s, c, p) => slide04(s, c, p),
    5: (s, c, p) => slide05(s, c, p),
    6: (s, c, p) => gridSlide(s, c, p, 4),
    7: (s, c, p) => gridSlide(s, c, p, 3),
    8: (s, c, p) => tableSlide(s, c, p, ["Risiko", "Gegenmaßnahme"]),
    9: (s, c, p) => slide09(s, c, p, v),
    10: (s, c, p) => slide10(s, c, p, v),
    11: (s, c, p) => slide11(s, c, p, v),
    12: (s, c, p) => slide12(s, c, p),
    13: (s, c, p) => slide13(s, c, p, v),
    14: (s, c, p) => gridSlide(s, c, p, 3),
    15: (s, c, p) => gridSlide(s, c, p, 5),
    16: (s, c, p) => slide16(s, c, p),
    17: (s, c, p) => slide17(s, c, p),
    18: (s, c, p) => gridSlide(s, c, p, 4),
    19: (s, c, p) => slide19(s, c, p, v, options),
    20: (s, c, p) => slide20(s, c, p),
  };

  for (const content of DECK_SLIDES) {
    const resolved = resolveContent(content, v);
    const palette = paletteFor(resolved.bg);
    const slide = pptx.addSlide();
    slide.background = { color: palette.bg };

    (renderers[resolved.nr] ?? ((s, c, p) => gridSlide(s, c, p, 3)))(slide, resolved, palette);

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

/** Kopfbereich (Eyebrow + Titel + optionaler Lead) und liefert die Y-Position darunter. */
function header(slide: PptxGenJS.Slide, c: DeckSlideContent, p: Palette, leadText?: string): number {
  if (c.eyebrow) eyebrow(slide, c.eyebrow, p);
  if (c.title) slideTitle(slide, c.title, p);
  if (leadText) {
    lead(slide, leadText, p, PAD.top + px(140));
    return PAD.top + px(250);
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

  const subs = items.filter((t) => t.length > 60).slice(0, 2);
  subs.forEach((text, i) => {
    slide.addText(text, {
      x: PAD.titleSide, y: px(620 + i * 74), w: px(1300), h: px(70),
      fontFace: PPT_FONT.body, fontSize: pt(32), color: PPT_THEME.onNavySecondary,
      lineSpacingMultiple: 1.25, valign: "top",
    });
  });

  // Automatisch recherchiertes Logo, dezent unten rechts. Ohne Fund: kein Platzhalter.
  if (o.logoDataUrl) {
    slide.addImage({
      data: o.logoDataUrl,
      x: SLIDE_W - PAD.titleSide - px(300), y: px(300), w: px(300), h: px(140),
      sizing: { type: "contain", w: px(300), h: px(140) },
    });
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

  const boxY = y + px(240);
  const boxH = px(300);
  card(slide, { x: PAD.side, y: boxY, w: CONTENT_W, h: boxH });

  // Herleitung / Annahmen / Quellen – die drei Label-Text-Paare am Ende der Folie.
  const pairs: { label: string; body: string }[] = [];
  for (let i = 9; i + 1 < c.items.length; i += 2) {
    pairs.push({ label: c.items[i], body: c.items[i + 1] });
  }
  const colW = (CONTENT_W - px(96)) / 3;
  pairs.slice(0, 3).forEach((pair, i) => {
    labeledBlock(slide, {
      x: PAD.side + px(40) + i * (colW + px(8)),
      y: boxY + px(40),
      w: colW - px(40),
      label: pair.label,
      body: pair.body,
      palette: { ...p, secondary: PPT_THEME.body },
      bodyH: boxH - px(100),
    });
  });
}

// ------------------------------------------------- Generisches Hairline-Raster

/**
 * Deckt die Folien 03, 06, 07, 14, 15 und 18 ab: gleichmäßiges Raster aus
 * Nummer/Titel/Text, darunter optional eine Aussage mit rotem Rail.
 */
function gridSlide(slide: PptxGenJS.Slide, c: DeckSlideContent, p: Palette, columns: number): void {
  const items = [...c.items];
  const leadText = items.length && items[0].length > 80 ? items.shift() : undefined;
  const y = header(slide, c, p, leadText);

  // Rail-Statements sind lange Einzeltexte am Ende ohne zugehörigen Titel.
  const tail: string[] = [];
  while (items.length && items[items.length - 1].length > 110 && items.length % 3 !== 0) {
    tail.unshift(items.pop() as string);
  }

  const cols: { eyebrow?: string; title: string; body?: string }[] = [];
  const isNumbered = /^\d{2}$/.test(items[0] ?? "");
  const step = isNumbered ? 3 : 2;
  for (let i = 0; i + step - 1 < items.length && cols.length < columns * 2; i += step) {
    cols.push(
      isNumbered
        ? { eyebrow: items[i], title: items[i + 1], body: items[i + 2] }
        : { title: items[i], body: items[i + 1] }
    );
  }

  const gridH = px(300);
  const rows = Math.ceil(cols.length / columns);
  for (let r = 0; r < rows; r++) {
    hairlineGrid(slide, {
      x: PAD.side,
      y: y + r * (gridH + px(40)),
      w: CONTENT_W,
      colH: gridH,
      columns: cols.slice(r * columns, (r + 1) * columns),
      palette: p,
      titleSize: columns >= 5 ? 28 : 32,
    });
  }

  if (tail.length) {
    railStatement(slide, {
      x: PAD.side,
      y: y + rows * (gridH + px(40)) + px(10),
      w: CONTENT_W,
      text: tail.join("  "),
      palette: p,
    });
  }
}

// --------------------------------------------------------------- Folie 04/05

function slide04(slide: PptxGenJS.Slide, c: DeckSlideContent, p: Palette): void {
  const items = [...c.items];
  const leadText = items.length && items[0].length > 80 ? items.shift() : undefined;
  const y = header(slide, c, p, leadText);

  const colW = (CONTENT_W - px(80)) / 2;
  // Links: Kette aus vier Stufen.
  const chain = items.slice(0, 8);
  for (let i = 0; i * 2 + 1 < chain.length && i < 4; i++) {
    const rowY = y + i * px(96);
    hairline(slide, PAD.side, rowY, colW, p.hairline);
    slide.addText(chain[i * 2], {
      x: PAD.side, y: rowY + px(20), w: colW, h: px(40),
      fontFace: PPT_FONT.display, fontSize: pt(30), bold: true, color: p.text, valign: "top",
    });
    slide.addText(chain[i * 2 + 1] ?? "", {
      x: PAD.side, y: rowY + px(58), w: colW, h: px(34),
      fontFace: PPT_FONT.body, fontSize: pt(26), color: p.secondary, valign: "top",
    });
  }

  // Rechts: Fließtext plus abgesetzte Box.
  const rest = items.slice(8);
  const rightX = PAD.side + colW + px(80);
  slide.addText(rest.slice(0, 1).join(" "), {
    x: rightX, y, w: colW, h: px(200),
    fontFace: PPT_FONT.body, fontSize: pt(30), color: p.secondary, lineSpacingMultiple: 1.3, valign: "top",
  });
  if (rest.length > 1) {
    const boxY = y + px(220);
    card(slide, { x: rightX, y: boxY, w: colW, h: px(200) });
    slide.addText(rest.slice(1).join("\n\n"), {
      x: rightX + px(32), y: boxY + px(28), w: colW - px(64), h: px(150),
      fontFace: PPT_FONT.body, fontSize: pt(27), color: PPT_THEME.body, lineSpacingMultiple: 1.3, valign: "top",
    });
  }
}

function slide05(slide: PptxGenJS.Slide, c: DeckSlideContent, p: Palette): void {
  const items = [...c.items];
  const leadText = items.length && items[0].length > 80 ? items.shift() : undefined;
  const y = header(slide, c, p, leadText);

  const cardW = (CONTENT_W - px(60)) / 2;
  const cardH = px(420);
  const half = Math.ceil(items.length / 2);

  [0, 1].forEach((i) => {
    const x = PAD.side + i * (cardW + px(60));
    const isNavy = i === 1;
    card(slide, {
      x, y, w: cardW, h: cardH,
      fill: isNavy ? PPT_THEME.navy : PPT_THEME.white,
      border: isNavy ? PPT_THEME.navy : PPT_THEME.navy,
    });
    racingStripe(slide, x + px(40), y + px(40));

    const chunk = items.slice(i * half, (i + 1) * half);
    const textColor = isNavy ? PPT_THEME.onNavy : PPT_THEME.navy;
    const bodyColor = isNavy ? PPT_THEME.onNavySecondary : PPT_THEME.body;
    if (chunk[0]) {
      slide.addText(chunk[0], {
        x: x + px(40), y: y + px(80), w: cardW - px(80), h: px(60),
        fontFace: PPT_FONT.display, fontSize: pt(40), bold: true, color: textColor, valign: "top",
      });
    }
    if (chunk.length > 1) {
      slide.addText(chunk.slice(1).join("\n\n"), {
        x: x + px(40), y: y + px(150), w: cardW - px(80), h: cardH - px(190),
        fontFace: PPT_FONT.body, fontSize: pt(27), color: bodyColor, lineSpacingMultiple: 1.3, valign: "top",
      });
    }
  });
}

// ------------------------------------------------------- Generische Tabelle

function tableSlide(slide: PptxGenJS.Slide, c: DeckSlideContent, p: Palette, headerCells: string[]): void {
  const items = [...c.items];
  const leadText = items.length && items[0].length > 80 ? items.shift() : undefined;
  const y = header(slide, c, p, leadText);

  const rows: string[][] = [];
  for (let i = 0; i + 1 < items.length; i += 2) rows.push([items[i], items[i + 1]]);

  hairlineTable(slide, {
    x: PAD.side, y, w: CONTENT_W, rowH: px(110),
    header: headerCells, rows, palette: p, colRatios: [0.42, 0.58],
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

  slide.addText(v.roiHinweis, {
    x: rightX, y: y + px(420), w: rightW, h: px(160),
    fontFace: PPT_FONT.body, fontSize: pt(26), color: p.secondary, lineSpacingMultiple: 1.3, valign: "top",
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

// ---------------------------------------------------------------- Folie 11

function slide11(slide: PptxGenJS.Slide, c: DeckSlideContent, p: Palette, v: DeckValues): void {
  const y = header(slide, c, p, c.items[0]);

  // Formelleiste: Nutzer × Zeitersparnis × Stundensatz × 50 %
  const parts = [v.nutzerText + " Nutzer", v.hoursY1 + "/Monat", v.rateText + "/Std.", "50 % Realisierung"];
  const barW = (CONTENT_W - px(3 * 40)) / 4;
  parts.forEach((text, i) => {
    const x = PAD.side + i * (barW + px(40));
    card(slide, { x, y, w: barW, h: px(120) });
    slide.addText(text, {
      x: x + px(20), y: y + px(34), w: barW - px(40), h: px(60),
      fontFace: PPT_FONT.display, fontSize: pt(32), bold: true, color: PPT_THEME.navy,
      align: "center", valign: "top", shrinkText: true,
    });
    if (i < parts.length - 1) {
      slide.addText("×", {
        x: x + barW, y: y + px(38), w: px(40), h: px(50),
        fontFace: PPT_FONT.display, fontSize: pt(34), color: PPT_THEME.sky, align: "center", valign: "top",
      });
    }
  });

  const rest = c.items.slice(1);
  const colW = (CONTENT_W - px(80)) / 2;
  [0, 1].forEach((i) => {
    const chunk = rest.slice(i * Math.ceil(rest.length / 2), (i + 1) * Math.ceil(rest.length / 2));
    if (!chunk.length) return;
    slide.addText(chunk.join("\n\n"), {
      x: PAD.side + i * (colW + px(80)), y: y + px(180), w: colW, h: px(320),
      fontFace: PPT_FONT.body, fontSize: pt(27), color: p.secondary, lineSpacingMultiple: 1.3, valign: "top",
    });
  });
}

// ---------------------------------------------------------------- Folie 12

function slide12(slide: PptxGenJS.Slide, c: DeckSlideContent, p: Palette): void {
  const items = [...c.items];
  const leadText = items.length && items[0].length > 80 ? items.shift() : undefined;
  const y = header(slide, c, p, leadText);

  const rows: string[][] = [];
  for (let i = 0; i + 2 < items.length; i += 3) rows.push([items[i], items[i + 1], items[i + 2]]);

  hairlineTable(slide, {
    x: PAD.side, y, w: CONTENT_W, rowH: px(96),
    header: ["", "Realistisch", "Forrester TEI"],
    rows, palette: p, colRatios: [0.4, 0.3, 0.3],
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
      x: PAD.side, y, w: CONTENT_W, h: px(520),
      chartColors: [PPT_THEME.sky, PPT_THEME.navy],
      showLegend: true, legendPos: "b", legendFontFace: PPT_FONT.body, legendFontSize: pt(24),
      lineSize: 3, lineDataSymbol: "none",
      catAxisLabelFontFace: PPT_FONT.mono, catAxisLabelFontSize: pt(20),
      valAxisLabelFontFace: PPT_FONT.mono, valAxisLabelFontSize: pt(20),
      valAxisLabelFormatCode: "#.##0",
      catAxisLabelFrequency: "3",
    }
  );

  const beText = v.breakEvenMonth
    ? `Break-even: ${v.breakEvenShort} · Maßstab bis ${v.chartMaxLabel}`
    : `Kein Break-even innerhalb von 36 Monaten · Maßstab bis ${v.chartMaxLabel}`;
  slide.addText(beText, {
    x: PAD.side, y: y + px(540), w: CONTENT_W, h: px(50),
    fontFace: PPT_FONT.mono, fontSize: pt(24), color: PPT_THEME.signal, charSpacing: 1.6, valign: "top",
  });
}

// ---------------------------------------------------------------- Folie 16

function slide16(slide: PptxGenJS.Slide, c: DeckSlideContent, p: Palette): void {
  const items = [...c.items];
  const leadText = items.length && items[0].length > 80 ? items.shift() : undefined;
  const y = header(slide, c, p, leadText);

  const tiles: { title: string; body: string }[] = [];
  for (let i = 0; i + 1 < items.length && tiles.length < 8; i += 2) {
    tiles.push({ title: items[i], body: items[i + 1] });
  }

  const cols = 4;
  const tileW = (CONTENT_W - px(3 * 32)) / cols;
  const tileH = px(230);
  tiles.forEach((tile, i) => {
    const x = PAD.side + (i % cols) * (tileW + px(32));
    const ty = y + Math.floor(i / cols) * (tileH + px(32));
    card(slide, { x, y: ty, w: tileW, h: tileH });
    slide.addText(tile.title, {
      x: x + px(24), y: ty + px(24), w: tileW - px(48), h: px(64),
      fontFace: PPT_FONT.display, fontSize: pt(30), bold: true, color: PPT_THEME.navy, valign: "top",
    });
    slide.addText(tile.body, {
      x: x + px(24), y: ty + px(94), w: tileW - px(48), h: tileH - px(120),
      fontFace: PPT_FONT.body, fontSize: pt(25), color: PPT_THEME.body, lineSpacingMultiple: 1.25, valign: "top",
    });
  });

  const hint = items[items.length - 1];
  if (hint && hint.length > 120) {
    slide.addText(hint, {
      x: PAD.side, y: y + 2 * (tileH + px(32)) + px(8), w: CONTENT_W, h: px(110),
      fontFace: PPT_FONT.body, fontSize: pt(24), color: p.secondary, lineSpacingMultiple: 1.25, valign: "top",
    });
  }
}

// ---------------------------------------------------------------- Folie 17

function slide17(slide: PptxGenJS.Slide, c: DeckSlideContent, p: Palette): void {
  const items = [...c.items];
  const leadText = items.length && items[0].length > 80 ? items.shift() : undefined;
  const y = header(slide, c, p, leadText);

  const kpis: { label: string; value: string }[] = [];
  for (let i = 0; i + 1 < items.length && kpis.length < 4; i += 2) {
    kpis.push({ value: items[i], label: items[i + 1] });
  }
  kpiRow(slide, { x: PAD.side, y, w: CONTENT_W, h: px(180), palette: p, items: kpis, valueSize: 56 });

  const quote = items.find((t) => t.length > 120);
  if (quote) {
    railStatement(slide, { x: PAD.side, y: y + px(240), w: CONTENT_W, text: quote, palette: p });
  }
}

// ---------------------------------------------------------------- Folie 19

function slide19(slide: PptxGenJS.Slide, c: DeckSlideContent, p: Palette, v: DeckValues, o: PresentationOptions): void {
  const y = header(slide, c, p, c.items[0]);
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

  const steps = c.items.filter((t) => t.length > 40).slice(-4);
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
    slide.addImage({
      data: o.logoDataUrl,
      x: SLIDE_W - PAD.side - px(220), y: PAD.top - px(10), w: px(220), h: px(90),
      sizing: { type: "contain", w: px(220), h: px(90) },
    });
  }
}

// ---------------------------------------------------------------- Folie 20

function slide20(slide: PptxGenJS.Slide, c: DeckSlideContent, p: Palette): void {
  const items = [...c.items];
  const leadText = items.length && items[0].length > 80 ? items.shift() : undefined;
  const y = header(slide, c, p, leadText);
  const colW = (CONTENT_W - px(80)) / 2;

  slide.addText(items.filter((t) => t.length <= 120).join("\n"), {
    x: PAD.side, y, w: colW, h: px(300),
    fontFace: PPT_FONT.body, fontSize: pt(30), color: p.text, lineSpacingMultiple: 1.4, valign: "top",
  });

  const btnY = y + px(40);
  const rightX = PAD.side + colW + px(80);
  slide.addShape("rect", {
    x: rightX, y: btnY, w: px(620), h: px(110),
    fill: { color: PPT_THEME.navy }, line: { color: PPT_THEME.navy, width: 0 },
  });
  slide.addText("Termin vereinbaren", {
    x: rightX, y: btnY + px(32), w: px(620), h: px(50),
    fontFace: PPT_FONT.display, fontSize: pt(32), bold: true, color: PPT_THEME.white,
    align: "center", valign: "top",
    hyperlink: { url: "https://outlook.office.com/book/CopilotErstgesprch@yellow-boat.com/s/L_QescD89USYChbx2CRsNg2?ismsaljsauthenabled" },
  });
  slide.addText("martin@yellow-boat.com · +49 221 950 187 74", {
    x: rightX, y: btnY + px(150), w: px(620), h: px(50),
    fontFace: PPT_FONT.mono, fontSize: pt(24), color: p.secondary, align: "center", valign: "top",
  });
}

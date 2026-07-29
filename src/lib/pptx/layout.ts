import type PptxGenJS from "pptxgenjs";
import { PPT_THEME, PPT_FONT, px, pt, PAD, SLIDE_W, CONTENT_W } from "./theme";

/**
 * Wiederkehrende Layout-Bausteine der Entscheidungsvorlage.
 *
 * Die Vorlage arbeitet mit Haarlinien statt Rahmen, mit Monospace-Eyebrows in Versalien
 * und mit einem "Racing Stripe" aus drei Balken. Alle Bausteine erzeugen echte
 * PowerPoint-Objekte (Textfelder, Formen, Linien) – die Folien bleiben editierbar.
 */

export type Palette = {
  bg: string;
  text: string;
  secondary: string;
  hairline: string;
  eyebrow: string;
};

/** Farbwelt je nach Folienhintergrund (Paper oder Navy). */
export function paletteFor(bg: string): Palette {
  const isNavy = bg.toUpperCase().includes("0A2E5C");
  return isNavy
    ? {
        bg: PPT_THEME.navy,
        text: PPT_THEME.onNavy,
        secondary: PPT_THEME.onNavySecondary,
        hairline: PPT_THEME.onNavyHairline,
        eyebrow: PPT_THEME.onNavyTertiary,
      }
    : {
        bg: PPT_THEME.paper,
        text: PPT_THEME.navy,
        secondary: PPT_THEME.body,
        hairline: PPT_THEME.fog,
        eyebrow: PPT_THEME.signal,
      };
}

/** Waagerechte Haarlinie – das tragende Strukturelement der Vorlage. */
export function hairline(slide: PptxGenJS.Slide, x: number, y: number, w: number, color: string): void {
  slide.addShape("line", { x, y, w, h: 0, line: { color, width: 0.75 } });
}

/** Racing-Stripe: drei Balken in Sky, Signal, Sky. */
export function racingStripe(slide: PptxGenJS.Slide, x: number, y: number): void {
  const barW = px(52);
  const barH = px(7);
  const gap = px(3);
  [PPT_THEME.sky, PPT_THEME.signal, PPT_THEME.sky].forEach((color, i) => {
    slide.addShape("rect", {
      x: x + i * (barW + gap),
      y,
      w: barW,
      h: barH,
      fill: { color },
      line: { color, width: 0 },
    });
  });
}

/** Eyebrow: Monospace, Versalien, weit gesperrt. */
export function eyebrow(slide: PptxGenJS.Slide, text: string, palette: Palette, y = PAD.top): void {
  slide.addText(text.toUpperCase(), {
    x: PAD.side,
    y,
    w: CONTENT_W,
    h: px(30),
    fontFace: PPT_FONT.mono,
    fontSize: pt(24),
    color: palette.eyebrow,
    charSpacing: 2.4,
    valign: "top",
  });
}

/** Folientitel (H2, 64 px). */
export function slideTitle(slide: PptxGenJS.Slide, text: string, palette: Palette, y = PAD.top + px(46)): void {
  slide.addText(text, {
    x: PAD.side,
    y,
    w: CONTENT_W,
    h: px(84),
    fontFace: PPT_FONT.display,
    fontSize: pt(64),
    bold: true,
    color: palette.text,
    charSpacing: -1.2,
    valign: "top",
  });
}

/**
 * Zeilenzahl eines Textes in einer Box abschätzen.
 *
 * PowerPoint bricht selbst um, verrät uns aber nicht, wie hoch das Ergebnis wird. Ohne
 * diese Schätzung startet der nachfolgende Block auf einer festen Höhe und wird von einem
 * zweizeiligen Absatz überschrieben — genau das ist auf Folie 04 passiert.
 * Faustwert: bei DM Sans braucht ein Zeichen rund 0,58 × Schriftgröße an Breite.
 * Bewusst großzügig gerechnet — eine zu niedrig geschätzte Zeilenzahl führt zu
 * überlappenden Blöcken, eine zu hohe nur zu etwas Luft.
 */
export function estimateLines(text: string, boxWidthPx: number, fontSizePx: number): number {
  const perLine = Math.max(8, Math.floor(boxWidthPx / (fontSizePx * 0.58)));
  return text.split("\n").reduce((sum, part) => sum + Math.max(1, Math.ceil(part.length / perLine)), 0);
}

/** Höhe, die der Lead-Absatz tatsächlich einnimmt. */
export function leadHeight(text: string, w = px(1400)): number {
  return estimateLines(text, w / px(1), 32) * px(52);
}

/** Lead-Absatz unter dem Titel. */
export function lead(slide: PptxGenJS.Slide, text: string, palette: Palette, y: number, w = px(1400)): void {
  slide.addText(text, {
    x: PAD.side,
    y,
    w,
    h: leadHeight(text, w),
    fontFace: PPT_FONT.body,
    fontSize: pt(32),
    color: palette.secondary,
    lineSpacingMultiple: 1.25,
    valign: "top",
  });
}

/**
 * Fußzeile jeder Inhaltsfolie: Haarlinie, links der Deck-Titel, rechts der Firmenname,
 * auf den Rechenfolien zusätzlich mittig der Kalkulationshinweis.
 */
export function footer(
  slide: PptxGenJS.Slide,
  opts: { left: string; center?: string; right: string; palette: Palette }
): void {
  const y = px(1080 - 80 - 34);
  hairline(slide, PAD.side, y, CONTENT_W, opts.palette.hairline);

  const common = {
    y: y + px(14),
    h: px(30),
    fontFace: PPT_FONT.mono,
    // Kleiner als die übrigen Eyebrows: "BUSINESS CASE MICROSOFT 365 COPILOT" ist lang und
    // brach bei 24 pt auf jeder Folie in eine zweite Zeile um.
    fontSize: pt(18),
    color: PPT_THEME.footer,
    charSpacing: 1.0,
    valign: "top" as const,
  };
  // Der Kalkulationshinweis steht ÜBER der Linie und nutzt die volle Breite. Neben
  // Deck-Titel und Firmenname bliebe für ihn nur ein Drittel — dort brach er immer um.
  if (opts.center) {
    slide.addText(opts.center, {
      ...common, x: PAD.side, y: y - px(46), w: CONTENT_W, align: "center",
    });
  }
  slide.addText(opts.left.toUpperCase(), { ...common, x: PAD.side, w: px(860), align: "left" });
  slide.addText(opts.right, { ...common, x: SLIDE_W - PAD.side - px(700), w: px(700), align: "right" });
}

/**
 * Gleichmäßiges Raster mit Haarlinie über jeder Spalte — das Grundmuster der Vorlage
 * für Aufzählungen (Folien 03, 06, 07, 15, 18).
 */
export function hairlineGrid(
  slide: PptxGenJS.Slide,
  opts: {
    x: number; y: number; w: number; colH: number;
    columns: { eyebrow?: string; title: string; body?: string }[];
    palette: Palette;
    gap?: number;
    titleSize?: number;
    bodySize?: number;
  }
): void {
  const gap = opts.gap ?? px(32);
  const colW = (opts.w - gap * (opts.columns.length - 1)) / opts.columns.length;

  // Schriftgröße des Fließtextes an die längste Spalte anpassen. Ohne das laufen die
  // ausführlichen Beschreibungen der Lernreise (Folie 15) über den Folienrand hinaus.
  const titleSize = opts.titleSize ?? 32;
  const bodySize = opts.bodySize ?? fitBodySize(opts.columns.map((c) => c.body ?? ""), colW, opts.colH - px(120), 27);

  opts.columns.forEach((col, i) => {
    const x = opts.x + i * (colW + gap);
    hairline(slide, x, opts.y, colW, opts.palette.hairline);

    let cursor = opts.y + px(22);
    if (col.eyebrow) {
      slide.addText(col.eyebrow, {
        x, y: cursor, w: colW, h: px(30),
        fontFace: PPT_FONT.mono, fontSize: pt(24), color: PPT_THEME.sky, charSpacing: 1.6, valign: "top",
      });
      cursor += px(40);
    }
    slide.addText(col.title, {
      x, y: cursor, w: colW, h: px(74),
      fontFace: PPT_FONT.display, fontSize: pt(titleSize), bold: true,
      color: opts.palette.text, charSpacing: -0.6, valign: "top", shrinkText: true,
    });
    if (col.body) {
      slide.addText(col.body, {
        x, y: cursor + px(80), w: colW, h: opts.colH - px(100),
        fontFace: PPT_FONT.body, fontSize: pt(bodySize), color: opts.palette.secondary,
        lineSpacingMultiple: 1.25, valign: "top",
        // PowerPoint bricht enger um als unsere Schätzung. Autofit ist die Rückversicherung,
        // damit Text nie über die Haarlinie der nächsten Zeile hinausläuft.
        shrinkText: true,
      });
    }
  });
}

/**
 * Größte Schrift, bei der der längste Text noch in die Box passt.
 *
 * Absichtlich konservativ: lieber eine Stufe kleiner als ein Text, der unter dem
 * Folienrand verschwindet. Unter 18 pt wird nicht weiter verkleinert — dann stimmt
 * die Textmenge nicht mit der Folie überein und das soll auffallen.
 */
export function fitBodySize(texts: string[], boxWidthPx: number, boxHeightPx: number, base: number): number {
  const longest = texts.reduce((a, b) => (b.length > a.length ? b : a), "");
  if (!longest) return base;

  for (let size = base; size > 22; size -= 1) {
    const lineHeight = size * 1.25 * 2; // pt → px (1 px = 0,5 pt)
    if (estimateLines(longest, boxWidthPx / px(1), size) * lineHeight <= boxHeightPx / px(1)) return size;
  }
  return 22;
}

/** KPI-Zeile mit Haarlinie oben und unten (Folien 02, 10, 17). */
export function kpiRow(
  slide: PptxGenJS.Slide,
  opts: {
    x: number; y: number; w: number; h: number;
    items: { label: string; value: string; note?: string }[];
    palette: Palette;
    valueSize?: number;
    valueColor?: string;
  }
): void {
  const gap = px(32);
  const colW = (opts.w - gap * (opts.items.length - 1)) / opts.items.length;

  hairline(slide, opts.x, opts.y, opts.w, opts.palette.hairline);
  hairline(slide, opts.x, opts.y + opts.h, opts.w, opts.palette.hairline);

  opts.items.forEach((item, i) => {
    const x = opts.x + i * (colW + gap);
    slide.addText(item.label.toUpperCase(), {
      x, y: opts.y + px(20), w: colW, h: px(30),
      fontFace: PPT_FONT.mono, fontSize: pt(24), color: PPT_THEME.footer, charSpacing: 1.6, valign: "top",
    });
    slide.addText(item.value, {
      x, y: opts.y + px(58), w: colW, h: px(86),
      fontFace: PPT_FONT.display, fontSize: pt(opts.valueSize ?? 62), bold: true,
      color: opts.valueColor ?? opts.palette.text, charSpacing: -1.6, valign: "top",
      // Kennzahlen dürfen niemals umbrechen – die Vorlage setzt hier bewusst nowrap.
      shrinkText: true,
    });
    if (item.note) {
      slide.addText(item.note, {
        x, y: opts.y + px(148), w: colW, h: px(40),
        fontFace: PPT_FONT.body, fontSize: pt(24), color: opts.palette.secondary, valign: "top",
      });
    }
  });
}

/** Aussage mit rotem Rail links (Folien 03, 06, 17). */
export function railStatement(
  slide: PptxGenJS.Slide,
  opts: {
    x: number; y: number; w: number; text: string; palette: Palette; size?: number; maxH?: number;
    /** Zitatgeber – steht eine Zeile darunter und bleibt bewusst aufrecht. */
    attribution?: string;
    italic?: boolean;
  }
): void {
  const railW = px(6);
  const size = opts.size ?? 34;
  // Höhe aus dem Text ableiten: Die Schlussaussagen der Vorlage sind zwischen einer und
  // vier Zeilen lang; bei fester Höhe lief die vierte Zeile in die Fußzeile (Folie 06).
  const textW = opts.w - railW - px(28);
  const lines = estimateLines(opts.text, textW / px(1), size);
  const attributionH = opts.attribution ? px(56) : 0;
  // px() umrechnen: size ist in Punkt, die Layoutmaße sind Zoll. Ohne die Umrechnung
  // wären es Zoll statt Bildpunkte — der Block läge weit außerhalb der Folie.
  const h = Math.min(
    opts.maxH ?? Number.POSITIVE_INFINITY,
    Math.max(px(120), px(lines * size * 2.5)) + attributionH
  );
  slide.addShape("rect", {
    x: opts.x, y: opts.y, w: railW, h,
    fill: { color: PPT_THEME.signal }, line: { color: PPT_THEME.signal, width: 0 },
  });
  slide.addText(opts.text, {
    x: opts.x + railW + px(28), y: opts.y, w: textW, h,
    fontFace: PPT_FONT.display, fontSize: pt(size), color: opts.palette.text,
    italic: opts.italic ?? false,
    lineSpacingMultiple: 1.25, valign: "top",
  });

  if (opts.attribution) {
    slide.addText(opts.attribution, {
      x: opts.x + railW + px(28), y: opts.y + h - attributionH + px(4), w: textW, h: attributionH - px(8),
      fontFace: PPT_FONT.body, fontSize: pt(26), color: opts.palette.secondary, valign: "top",
    });
  }
}

/** Weiße Karte auf Paper bzw. abgesetzte Fläche auf Navy. */
export function card(
  slide: PptxGenJS.Slide,
  opts: { x: number; y: number; w: number; h: number; fill?: string; border?: string }
): void {
  slide.addShape("rect", {
    x: opts.x, y: opts.y, w: opts.w, h: opts.h,
    fill: { color: opts.fill ?? PPT_THEME.white },
    line: opts.border ? { color: opts.border, width: 1 } : { color: opts.fill ?? PPT_THEME.white, width: 0 },
  });
}

/** Beschriftetes Textblock-Paar (Überschrift + Fließtext) innerhalb einer Karte. */
export function labeledBlock(
  slide: PptxGenJS.Slide,
  opts: {
    x: number; y: number; w: number; label: string; body: string; palette: Palette;
    bodyH?: number; bodySize?: number;
  }
): void {
  // Mehrzeilige Beschriftungen sind erlaubt ("Konservative Annahmen machen"), dürfen aber
  // nicht in den Fließtext hineinragen — deshalb wird die Höhe geschätzt statt gesetzt.
  const labelH = estimateLines(opts.label.toUpperCase(), opts.w / px(1), 24) * px(34);
  const bodyH = opts.bodyH ?? px(160);

  slide.addText(opts.label.toUpperCase(), {
    x: opts.x, y: opts.y, w: opts.w, h: labelH,
    fontFace: PPT_FONT.mono, fontSize: pt(24), color: PPT_THEME.footer, charSpacing: 1.6, valign: "top",
  });
  slide.addText(opts.body, {
    x: opts.x, y: opts.y + labelH + px(12), w: opts.w, h: bodyH - labelH - px(12),
    fontFace: PPT_FONT.body,
    fontSize: pt(opts.bodySize ?? 27),
    color: opts.palette.secondary,
    lineSpacingMultiple: 1.25, valign: "top",
  });
}

/** Zweispaltige Tabelle mit Haarlinien (Folien 08, 12). */
/**
 * Tabelle mit Haarlinien. Die Zeilenhöhe wächst mit dem längsten Text der Zeile —
 * sonst laufen lange Formulierungen über die nächste Linie (Folie 08).
 */
export function hairlineTable(
  slide: PptxGenJS.Slide,
  opts: {
    x: number; y: number; w: number; rowH: number;
    header?: string[];
    rows: string[][];
    palette: Palette;
    colRatios?: number[];
    /** Maximale Gesamthöhe; die Zeilen werden notfalls gestaucht. */
    maxH?: number;
  }
): void {
  const cols = opts.rows[0]?.length ?? 2;
  const ratios = opts.colRatios ?? Array(cols).fill(1 / cols);
  let y = opts.y;

  // Zeilenhöhe je Zeile aus der Textmenge ableiten: rund 42 Zeichen passen bei 28 px
  // Schrift in eine Spaltenzeile. Damit bleibt der Text sicher zwischen den Linien.
  const heightFor = (cells: string[]): number => {
    const lines = Math.max(
      1,
      ...cells.map((cell, i) => Math.ceil(cell.length / Math.max(18, (ratios[i] * opts.w) / px(15))))
    );
    return Math.max(opts.rowH, px(34) + lines * px(40));
  };

  const headerH = opts.header ? opts.rowH : 0;
  const bodyHeights = opts.rows.map(heightFor);
  const totalH = headerH + bodyHeights.reduce((a, b) => a + b, 0);
  // Bei Platzmangel gleichmäßig stauchen statt über den Folienrand zu laufen.
  const scale = opts.maxH && totalH > opts.maxH ? opts.maxH / totalH : 1;

  const drawRow = (cells: string[], isHeader: boolean, rowHeight: number) => {
    hairline(slide, opts.x, y, opts.w, opts.palette.hairline);
    let x = opts.x;
    cells.forEach((cell, i) => {
      const cw = opts.w * ratios[i];
      slide.addText(cell, {
        x, y: y + px(16), w: cw - px(28), h: rowHeight - px(28),
        fontFace: isHeader ? PPT_FONT.mono : PPT_FONT.body,
        fontSize: pt(isHeader ? 24 : 28),
        bold: isHeader,
        color: isHeader ? PPT_THEME.footer : opts.palette.text,
        charSpacing: isHeader ? 1.6 : 0,
        lineSpacingMultiple: 1.15,
        valign: "top",
        shrinkText: true,
      });
      x += cw;
    });
    y += rowHeight;
  };

  if (opts.header) drawRow(opts.header.map((h) => h.toUpperCase()), true, headerH * scale);
  opts.rows.forEach((r, i) => drawRow(r, false, bodyHeights[i] * scale));
  hairline(slide, opts.x, y, opts.w, opts.palette.hairline);
}

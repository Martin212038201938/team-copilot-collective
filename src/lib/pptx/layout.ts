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

/** Lead-Absatz unter dem Titel. */
export function lead(slide: PptxGenJS.Slide, text: string, palette: Palette, y: number, w = px(1400)): void {
  slide.addText(text, {
    x: PAD.side,
    y,
    w,
    h: px(80),
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
    fontSize: pt(24),
    color: PPT_THEME.footer,
    charSpacing: 1.6,
    valign: "top" as const,
  };
  slide.addText(opts.left.toUpperCase(), { ...common, x: PAD.side, w: px(620), align: "left" });
  if (opts.center) {
    slide.addText(opts.center, { ...common, x: PAD.side + px(620), w: px(680), align: "center" });
  }
  slide.addText(opts.right, { ...common, x: SLIDE_W - PAD.side - px(620), w: px(620), align: "right" });
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
  }
): void {
  const gap = opts.gap ?? px(32);
  const colW = (opts.w - gap * (opts.columns.length - 1)) / opts.columns.length;

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
      fontFace: PPT_FONT.display, fontSize: pt(opts.titleSize ?? 32), bold: true,
      color: opts.palette.text, charSpacing: -0.6, valign: "top",
    });
    if (col.body) {
      slide.addText(col.body, {
        x, y: cursor + px(80), w: colW, h: opts.colH - px(120),
        fontFace: PPT_FONT.body, fontSize: pt(27), color: opts.palette.secondary,
        lineSpacingMultiple: 1.3, valign: "top",
      });
    }
  });
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
  opts: { x: number; y: number; w: number; text: string; palette: Palette; size?: number }
): void {
  const railW = px(6);
  const h = px(120);
  slide.addShape("rect", {
    x: opts.x, y: opts.y, w: railW, h,
    fill: { color: PPT_THEME.signal }, line: { color: PPT_THEME.signal, width: 0 },
  });
  slide.addText(opts.text, {
    x: opts.x + railW + px(28), y: opts.y, w: opts.w - railW - px(28), h,
    fontFace: PPT_FONT.display, fontSize: pt(opts.size ?? 34), color: opts.palette.text,
    lineSpacingMultiple: 1.25, valign: "top",
  });
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
  opts: { x: number; y: number; w: number; label: string; body: string; palette: Palette; bodyH?: number }
): void {
  slide.addText(opts.label.toUpperCase(), {
    x: opts.x, y: opts.y, w: opts.w, h: px(30),
    fontFace: PPT_FONT.mono, fontSize: pt(24), color: PPT_THEME.footer, charSpacing: 1.6, valign: "top",
  });
  slide.addText(opts.body, {
    x: opts.x, y: opts.y + px(40), w: opts.w, h: opts.bodyH ?? px(160),
    fontFace: PPT_FONT.body, fontSize: pt(27), color: opts.palette.secondary,
    lineSpacingMultiple: 1.3, valign: "top",
  });
}

/** Zweispaltige Tabelle mit Haarlinien (Folien 08, 12). */
export function hairlineTable(
  slide: PptxGenJS.Slide,
  opts: {
    x: number; y: number; w: number; rowH: number;
    header?: string[];
    rows: string[][];
    palette: Palette;
    colRatios?: number[];
  }
): void {
  const cols = opts.rows[0]?.length ?? 2;
  const ratios = opts.colRatios ?? Array(cols).fill(1 / cols);
  let y = opts.y;

  const drawRow = (cells: string[], isHeader: boolean) => {
    hairline(slide, opts.x, y, opts.w, opts.palette.hairline);
    let x = opts.x;
    cells.forEach((cell, i) => {
      const cw = opts.w * ratios[i];
      slide.addText(cell, {
        x, y: y + px(18), w: cw - px(24), h: opts.rowH - px(24),
        fontFace: isHeader ? PPT_FONT.mono : PPT_FONT.body,
        fontSize: pt(isHeader ? 24 : 28),
        bold: isHeader,
        color: isHeader ? PPT_THEME.footer : opts.palette.text,
        charSpacing: isHeader ? 1.6 : 0,
        lineSpacingMultiple: 1.2,
        valign: "top",
      });
      x += cw;
    });
    y += opts.rowH;
  };

  if (opts.header) drawRow(opts.header.map((h) => h.toUpperCase()), true);
  opts.rows.forEach((r) => drawRow(r, false));
  hairline(slide, opts.x, y, opts.w, opts.palette.hairline);
}

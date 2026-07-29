import { DECK_SLIDES, type DeckSlideContent } from "./deckContent";
import { applyOverrides } from "./deckContentOverrides";

/**
 * Explizite Struktur je Folie.
 *
 * Warum: Die erste Fassung hat die Struktur aus der Reihenfolge der Textbausteine erraten
 * ("zwei Einträge = Titel + Text, drei = Nummer + Titel + Text"). Das bricht überall dort,
 * wo die Vorlage Pfeile, Zwischenüberschriften oder Preise dazwischenschiebt — also auf den
 * Folien 4, 7, 11, 14, 16, 17 und 18. Statt die Heuristik zu flicken, wird die Struktur hier
 * einmal ausgeschrieben. Der Text bleibt dabei unverändert aus deckContent.ts.
 */

export type Step = { num?: string; title: string; body?: string };
export type Tile = { title: string; body?: string; note?: string };
export type Pair = { label: string; value: string };

export type SlideStructure =
  | { kind: "raw"; lead?: string; items: string[] }
  | { kind: "steps"; lead?: string; columns: number; steps: Step[]; statement?: string }
  | { kind: "chain"; lead?: string; steps: Step[]; leftLabel?: string; rightLabel?: string; text: string[]; boxed?: string[] }
  | { kind: "cards"; lead?: string; cards: { eyebrow: string; title: string; body: string; note?: string }[] }
  | { kind: "table"; lead?: string; header?: string[]; rows: string[][]; footnote?: string }
  | { kind: "formula"; lead?: string; factors: Pair[]; result: Pair; notes: string[] }
  | { kind: "tiles"; lead?: string; columns: number; tiles: Tile[]; footnote?: string }
  | { kind: "numbers"; lead?: string; numbers: Pair[]; quote?: string }
  | { kind: "chainAndColumns"; lead?: string; chain: Step[]; columns: Step[] };

/** Erster Eintrag ist ein Lead, wenn er lang ist und keine Überschrift sein kann. */
function takeLead(items: string[]): { lead?: string; rest: string[] } {
  if (items.length && items[0].length > 70) return { lead: items[0], rest: items.slice(1) };
  return { rest: items };
}

/** Gruppiert flach abgelegte Einträge zu Dreiergruppen (Nummer, Titel, Text). */
function triples(items: string[], skip: (s: string) => boolean = () => false): Step[] {
  const clean = items.filter((t) => !skip(t));
  const out: Step[] = [];
  for (let i = 0; i + 2 < clean.length; i += 3) {
    out.push({ num: clean[i], title: clean[i + 1], body: clean[i + 2] });
  }
  return out;
}

/** Gruppiert zu Zweiergruppen (Titel, Text). */
function pairsOf(items: string[]): Step[] {
  const out: Step[] = [];
  for (let i = 0; i + 1 < items.length; i += 2) out.push({ title: items[i], body: items[i + 1] });
  return out;
}

const isArrow = (s: string): boolean => s === "↓" || s === "→" || s === "×";
const isNumber = (s: string): boolean => /^\d{2}$/.test(s);

export function structureFor(slide: DeckSlideContent): SlideStructure {
  const c = applyOverrides(slide);
  const items = c.items;

  switch (c.nr) {
    // 03 — vier nummerierte Stufen, darunter eine Aussage mit Rail
    case 3: {
      const { lead, rest } = takeLead(items);
      const steps = triples(rest.filter((t) => !isArrow(t)));
      const statement = rest.slice(steps.length * 3).filter((t) => t.length > 60).join(" ");
      return { kind: "steps", lead, columns: 4, steps, statement: statement || undefined };
    }

    // 04 — links eine Kette mit Pfeilen, rechts Text und eine abgesetzte Box
    case 4: {
      const { lead, rest } = takeLead(items);
      const leftLabel = rest.find((t) => t === "Mit Erfahrung");
      const rightLabel = rest.find((t) => t === "Ohne Erfahrung");
      const chainItems = rest.filter((t) => !isArrow(t) && t !== leftLabel && t !== rightLabel && t.length < 60);
      const steps: Step[] = [];
      for (let i = 0; i + 1 < chainItems.length; i += 2) {
        if (isNumber(chainItems[i])) steps.push({ num: chainItems[i], title: chainItems[i + 1] });
      }
      const longs = rest.filter((t) => t.length >= 60);
      return { kind: "chain", lead, steps, leftLabel, rightLabel, text: longs.slice(0, 1), boxed: longs.slice(1) };
    }

    // 05 — zwei Karten (Chat vs. lizenzierter Copilot)
    case 5: {
      const { lead, rest } = takeLead(items);
      const cards: { eyebrow: string; title: string; body: string; note?: string }[] = [];
      for (let i = 0; i + 3 < rest.length; i += 4) {
        cards.push({ eyebrow: rest[i], title: rest[i + 1], body: rest[i + 2], note: rest[i + 3] });
      }
      return { kind: "cards", lead, cards };
    }

    // 06 — vier Motive
    case 6: {
      const { lead, rest } = takeLead(items);
      const steps = triples(rest.filter((t) => !isArrow(t)));
      const statement = rest.filter((t) => t.length > 90).slice(steps.length ? 0 : 1).join(" ");
      return { kind: "steps", lead, columns: 4, steps, statement: statement || undefined };
    }

    // 07 — 3×2-Raster aus Titel/Text-Paaren, erster Eintrag ist KEIN Lead
    case 7: {
      // Die Vorlage beginnt hier direkt mit einem Textblock ohne eigene Überschrift.
      const first = items[0];
      const rest = items.slice(1);
      const steps = pairsOf(rest);
      return { kind: "steps", columns: 3, steps, statement: first };
    }

    // 08 — Risiko/Gegenmaßnahme; die ersten beiden Einträge SIND die Kopfzeile
    case 8: {
      const header = items.slice(0, 2);
      const rows: string[][] = [];
      for (let i = 2; i + 1 < items.length; i += 2) rows.push([items[i], items[i + 1]]);
      return { kind: "table", header, rows };
    }

    // 11 — Formelleiste aus Label/Wert-Paaren plus Ergebnis, darunter Erläuterungen
    case 11: {
      const factors: Pair[] = [];
      let i = 0;
      while (i + 1 < items.length && !items[i].startsWith("Ergebnis")) {
        if (isArrow(items[i])) { i += 1; continue; }
        factors.push({ label: items[i], value: items[i + 1] });
        i += 2;
      }
      const result: Pair = { label: items[i] ?? "Ergebnis", value: items[i + 1] ?? "" };
      const notes = items.slice(i + 2).filter((t) => t.length > 40);
      return { kind: "formula", factors, result, notes };
    }

    // 12 — Szenarien-Tabelle mit drei Spalten
    case 12: {
      const { lead, rest } = takeLead(items);
      const footnote = rest.find((t) => t.length > 120);
      const cells = rest.filter((t) => t !== footnote);
      const header = cells.slice(0, 3);
      const rows: string[][] = [];
      for (let i = 3; i + 2 < cells.length; i += 3) rows.push([cells[i], cells[i + 1], cells[i + 2]]);
      return { kind: "table", lead, header, rows, footnote };
    }

    // 14 — oben eine fünfgliedrige Kette, darunter drei Dimensionen
    case 14: {
      const { lead, rest } = takeLead(items);
      const chain: Step[] = [];
      let idx = 0;
      while (idx < rest.length && (isNumber(rest[idx]) || isArrow(rest[idx]))) {
        if (isArrow(rest[idx])) { idx += 1; continue; }
        chain.push({ num: rest[idx], title: rest[idx + 1] });
        idx += 2;
      }
      const dimensions = pairsOf(rest.slice(idx));
      return { kind: "chainAndColumns", lead, chain, columns: dimensions };
    }

    // 15 — fünf Stufen der Lernreise
    case 15: {
      const { lead, rest } = takeLead(items);
      return { kind: "steps", lead, columns: 5, steps: triples(rest) };
    }

    // 16 — acht Bausteine mit Preis. Der erste Eintrag ist der Preishinweis und gehört
    // als Fußnote unter das Raster; danach folgen Dreiergruppen (Titel, Leistung, Preis).
    case 16: {
      const footnote = items[0];
      const rest = items.slice(1);
      const tiles: Tile[] = [];
      for (let i = 0; i + 2 < rest.length; i += 3) {
        tiles.push({ title: rest[i], body: rest[i + 1], note: rest[i + 2] });
      }
      return { kind: "tiles", columns: 4, tiles, footnote };
    }

    // 17 — vier Kennzahlen plus Zitat mit Namensnennung
    case 17: {
      const { lead, rest } = takeLead(items);
      // Das Zitat erkennt man am Anführungszeichen, nicht an der Länge: Es ist mit 81 Zeichen
      // kürzer als der einleitende Absatz und wäre über eine Längenregel nicht zu fassen.
      const quoteIndex = rest.findIndex((t) => t.trimStart().startsWith("„"));
      const cells = quoteIndex >= 0 ? rest.slice(0, quoteIndex) : rest;
      const quote = quoteIndex >= 0 ? rest.slice(quoteIndex).join("  ") : undefined;

      const numbers: Pair[] = [];
      for (let i = 0; i + 1 < cells.length; i += 2) numbers.push({ value: cells[i], label: cells[i + 1] });
      return { kind: "numbers", lead, numbers, quote };
    }

    // 18 — Referenzkunden als Wortmarken. Der erste Eintrag ist die Einordnung und
    // gehört als Lead unter den Titel, nicht als Kachel zwischen die Firmennamen.
    case 18: {
      return { kind: "tiles", lead: items[0], columns: 4, tiles: items.slice(1).map((t) => ({ title: t })) };
    }

    default:
      return { kind: "raw", items };
  }
}

/** Für Tests: alle Folien einmal strukturieren. */
export function structureAll(): { nr: number; structure: SlideStructure }[] {
  return DECK_SLIDES.map((s) => ({ nr: s.nr, structure: structureFor(s) }));
}

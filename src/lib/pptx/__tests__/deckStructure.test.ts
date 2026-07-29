import { describe, it, expect } from "vitest";
import { DECK_SLIDES } from "../deckContent";
import { structureFor } from "../deckStructure";

/**
 * Diese Tests hätten die kaputten Folien verhindert: Sie prüfen nicht, ob irgendetwas
 * gerendert wird, sondern ob die Struktur je Folie die erwartete Form hat — richtige
 * Anzahl Elemente, keine Pfeile oder Nummern in Titeln, keine leeren Texte.
 */
const byNr = (nr: number) => structureFor(DECK_SLIDES.find((s) => s.nr === nr)!);

describe("Folienstruktur", () => {
  it("Folie 03: vier nummerierte Stufen mit Titel und Text", () => {
    const s = byNr(3);
    expect(s.kind).toBe("steps");
    if (s.kind !== "steps") return;
    expect(s.steps).toHaveLength(4);
    expect(s.steps.map((x) => x.num)).toEqual(["01", "02", "03", "04"]);
    for (const step of s.steps) {
      expect(step.title.length).toBeGreaterThan(3);
      expect(step.body?.length ?? 0).toBeGreaterThan(20);
    }
  });

  it("Folie 04: vierstufige Kette ohne Pfeile in den Titeln", () => {
    const s = byNr(4);
    expect(s.kind).toBe("chain");
    if (s.kind !== "chain") return;
    expect(s.steps).toHaveLength(4);
    expect(s.steps.map((x) => x.num)).toEqual(["01", "02", "03", "04"]);
    expect(s.steps.map((x) => x.title).join(" ")).not.toMatch(/[↓→]/);
    expect(s.leftLabel).toBe("Mit Erfahrung");
    expect(s.rightLabel).toBe("Ohne Erfahrung");
    expect(s.text.length).toBeGreaterThan(0);
  });

  it("Folie 05: genau zwei Karten mit Eyebrow, Titel, Text und Eignung", () => {
    const s = byNr(5);
    expect(s.kind).toBe("cards");
    if (s.kind !== "cards") return;
    expect(s.cards).toHaveLength(2);
    expect(s.cards[0].eyebrow).toBe("Track 1");
    expect(s.cards[1].eyebrow).toBe("Track 2");
    for (const card of s.cards) {
      expect(card.title.length).toBeGreaterThan(3);
      expect(card.body.length).toBeGreaterThan(30);
      expect(card.note?.length ?? 0).toBeGreaterThan(10);
    }
  });

  it("Folie 07: 3×2-Raster, der einleitende Text landet nicht als Kachel", () => {
    const s = byNr(7);
    expect(s.kind).toBe("steps");
    if (s.kind !== "steps") return;
    expect(s.steps).toHaveLength(5);
    expect(s.statement?.length ?? 0).toBeGreaterThan(60);
    for (const step of s.steps) {
      expect(step.title.length).toBeLessThan(40);
      expect(step.body?.length ?? 0).toBeGreaterThan(20);
    }
  });

  it("Folie 08: Tabelle mit Risiko und Gegenmaßnahme", () => {
    const s = byNr(8);
    expect(s.kind).toBe("table");
    if (s.kind !== "table") return;
    expect(s.header).toEqual(["Risiko", "Gegenmaßnahme"]);
    expect(s.rows.length).toBeGreaterThanOrEqual(4);
    for (const row of s.rows) expect(row).toHaveLength(2);
  });

  it("Folie 11: Faktoren der Formel als Label/Wert-Paare plus Ergebnis", () => {
    const s = byNr(11);
    expect(s.kind).toBe("formula");
    if (s.kind !== "formula") return;
    expect(s.factors).toHaveLength(4);
    expect(s.factors.map((f) => f.label)).toEqual([
      "Nutzer", "Ø Zeitersparnis / Monat", "Stundensatz", "Realisierung",
    ]);
    expect(s.factors.map((f) => f.value).join(" ")).not.toMatch(/[×]/);
    expect(s.result.label).toContain("Ergebnis");
    expect(s.notes.length).toBeGreaterThanOrEqual(2);
  });

  it("Folie 12: dreispaltige Szenarien-Tabelle", () => {
    const s = byNr(12);
    expect(s.kind).toBe("table");
    if (s.kind !== "table") return;
    expect(s.header).toHaveLength(3);
    expect(s.header?.[1]).toBe("Realistisch");
    expect(s.header?.[2]).toBe("Forrester TEI");
    expect(s.rows.length).toBeGreaterThanOrEqual(4);
    for (const row of s.rows) expect(row).toHaveLength(3);
  });

  it("Folie 14: fünfgliedrige Kette plus drei Dimensionen", () => {
    const s = byNr(14);
    expect(s.kind).toBe("chainAndColumns");
    if (s.kind !== "chainAndColumns") return;
    expect(s.chain).toHaveLength(5);
    expect(s.chain.map((x) => x.title)).toEqual(["Lizenz", "Training", "Übung", "Community", "Gewohnheiten"]);
    expect(s.columns).toHaveLength(3);
    expect(s.columns.map((x) => x.title)).toEqual(["Technologie", "Kompetenz", "Verhalten"]);
  });

  it("Folie 15: fünf Stufen der Lernreise", () => {
    const s = byNr(15);
    expect(s.kind).toBe("steps");
    if (s.kind !== "steps") return;
    expect(s.steps).toHaveLength(5);
    expect(s.steps.map((x) => x.num)).toEqual(["01", "02", "03", "04", "05"]);
    expect(s.steps.map((x) => x.title)).toEqual(["Kick-off", "Lernreise", "Praxis", "Community", "Weiterentwicklung"]);
  });

  it("Folie 16: acht Bausteine mit Beschreibung und Preis", () => {
    const s = byNr(16);
    expect(s.kind).toBe("tiles");
    if (s.kind !== "tiles") return;
    expect(s.tiles).toHaveLength(8);
    for (const tile of s.tiles) {
      expect(tile.title.length).toBeGreaterThan(3);
      expect(tile.title.length).toBeLessThan(40);
      expect(tile.note?.length ?? 0).toBeGreaterThan(0);
    }
  });

  it("Folie 17: vier Kennzahlen plus Zitat", () => {
    const s = byNr(17);
    expect(s.kind).toBe("numbers");
    if (s.kind !== "numbers") return;
    expect(s.numbers).toHaveLength(4);
    for (const n of s.numbers) {
      expect(n.value.length).toBeLessThan(20);
      expect(n.label.length).toBeGreaterThan(3);
    }
    expect(s.quote?.length ?? 0).toBeGreaterThan(80);
  });

  it("Folie 18: Referenzkunden als Wortmarken, keine Fließtexte", () => {
    const s = byNr(18);
    expect(s.kind).toBe("tiles");
    if (s.kind !== "tiles") return;
    expect(s.tiles.length).toBeGreaterThanOrEqual(8);
    for (const tile of s.tiles) expect(tile.title.length).toBeLessThan(60);
  });

  it("keine Struktur enthält Pfeile oder leere Texte", () => {
    for (const slide of DECK_SLIDES) {
      const s = structureFor(slide);
      const collected: string[] = [];
      if (s.kind === "steps") s.steps.forEach((x) => collected.push(x.title, x.body ?? "x"));
      if (s.kind === "chain") s.steps.forEach((x) => collected.push(x.title));
      if (s.kind === "chainAndColumns") [...s.chain, ...s.columns].forEach((x) => collected.push(x.title));
      if (s.kind === "tiles") s.tiles.forEach((x) => collected.push(x.title));
      if (s.kind === "cards") s.cards.forEach((x) => collected.push(x.title, x.body));
      for (const text of collected) {
        expect(text.trim(), `Folie ${slide.nr}`).not.toBe("");
        expect(text, `Folie ${slide.nr}`).not.toMatch(/^[↓→×]$/);
      }
    }
  });
});

import { describe, it, expect } from "vitest";
import { DECK_SLIDES } from "../deckContent";
import { calculateRoiBusinessCase } from "@/lib/roi/calculate";
import { buildDeckValues } from "@/lib/roi/deckValues";

const bc = calculateRoiBusinessCase({
  companyName: "Yellow Boat Testfirma GmbH",
  users: 5,
  m365Users: 25,
  hourlyCostEur: 60.4,
  licensePerUserMonthEur: 26,
});
const v = buildDeckValues(bc, { datum: "Juli 2026", ansprechpartner: "Martin Lang, Geschäftsführung" });

/** Dieselbe Ersetzung wie im Deck-Builder. */
function fill(text: string): string {
  return text.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (_m, key: string) => {
    const value = (v as unknown as Record<string, unknown>)[key];
    return typeof value === "string" || typeof value === "number" ? String(value) : "";
  });
}

describe("Designvorlage: Folieninhalte", () => {
  it("enthält genau die 20 Folien des Handoffs", () => {
    expect(DECK_SLIDES).toHaveLength(20);
    expect(DECK_SLIDES[0].label).toBe("Titel");
    expect(DECK_SLIDES[19].label).toBe("Gespräch");
  });

  it("nutzt nur Navy- und Paper-Hintergründe", () => {
    const backgrounds = new Set(DECK_SLIDES.map((s) => s.bg.toUpperCase()));
    expect([...backgrounds].sort()).toEqual(["#0A2E5C", "#F3F5F8"]);
  });

  it("markiert die acht Rechenfolien mit dem Kalkulationshinweis", () => {
    const withDisclaimer = DECK_SLIDES.filter((s) => s.disclaimer).map((s) => s.nr);
    expect(withDisclaimer).toEqual([2, 9, 10, 11, 12, 13, 16, 19]);
  });

  it("ersetzt ALLE Platzhalter – kein {{ }} bleibt stehen", () => {
    for (const slide of DECK_SLIDES) {
      const texts = [slide.title ?? "", ...slide.items].map(fill);
      for (const text of texts) {
        expect(text, `Folie ${slide.nr} (${slide.label})`).not.toMatch(/\{\{|\}\}/);
      }
    }
  });

  it("erzeugt keine leeren oder kaputten Werte in den Texten", () => {
    const all = DECK_SLIDES.flatMap((s) => [s.title ?? "", ...s.items]).map(fill).join(" ");
    expect(all).not.toMatch(/undefined|NaN|null/);
  });

  it("jede Folie hat Sprechernotizen", () => {
    for (const slide of DECK_SLIDES) {
      expect(slide.notes.length, `Folie ${slide.nr}`).toBeGreaterThan(10);
    }
  });

  it("setzt die Kundenwerte tatsächlich ein", () => {
    const exec = DECK_SLIDES.find((s) => s.nr === 2)!;
    const filled = exec.items.map(fill).join(" ");
    expect(filled).toContain("Yellow Boat Testfirma GmbH");
    expect(filled).toContain(v.roiY1);
    expect(filled).toContain(v.costY1);
  });
});

import { describe, it, expect } from "vitest";
import { DECK_SLIDES } from "../deckContent";
import { DECK_OVERRIDES, applyOverrides } from "../deckContentOverrides";

describe("Sprachliche Anpassungen an der Designvorlage", () => {
  it("jeder Override findet seinen Originaltext — sonst ist er wirkungslos", () => {
    for (const override of DECK_OVERRIDES) {
      const slide = DECK_SLIDES.find((s) => s.nr === override.slide);
      expect(slide, `Folie ${override.slide} existiert nicht`).toBeDefined();
      expect(
        slide!.items,
        `Folie ${override.slide}: Originaltext nicht gefunden — Vorlage geändert?\n  "${override.from}"`
      ).toContain(override.from);
    }
  });

  it("ersetzt die Formulierungen, die das Zwei-Gruppen-Modell falsch darstellen", () => {
    const slide12 = applyOverrides(DECK_SLIDES.find((s) => s.nr === 12)!);
    expect(slide12.items).toContain("Ziel-Zeitersparnis je lizenzierter Person");
    expect(slide12.items.join(" ")).not.toContain("Für alle geschulten Personen wird eine durchschnittliche");

    const slide2 = applyOverrides(DECK_SLIDES.find((s) => s.nr === 2)!);
    expect(slide2.items.join(" ")).not.toContain("8 Std. Zielwert je Person und Monat");
    expect(slide2.items.join(" ")).toContain("{{ nutzenbasisText }}");
  });

  it("lässt Folien ohne Override unangetastet", () => {
    const slide5 = DECK_SLIDES.find((s) => s.nr === 5)!;
    expect(applyOverrides(slide5).items).toEqual(slide5.items);
  });
});

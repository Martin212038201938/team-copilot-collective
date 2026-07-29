import { describe, it, expect } from "vitest";
import { calculateRoiBusinessCase } from "../calculate";
import { buildDeterministicCopy, buildTrainingCopy } from "../deterministicCopy";
import { formatBreakEven, formatBreakEvenDative } from "../format";
import type { RoiInputs } from "../types";

const inputs: RoiInputs = {
  companyName: "Yellow Boat Testfirma GmbH",
  users: 50,
  m365Users: 50,
  hourlyCostEur: 50,
  licensePerUserMonthEur: 26,
};

describe("formatBreakEvenDative", () => {
  it("nutzt den Dativ für Fließtext", () => {
    expect(formatBreakEvenDative(7)).toBe("7 Monaten");
    expect(formatBreakEvenDative(1)).toBe("1 Monat");
    expect(formatBreakEvenDative(null)).toBe("mehr als 36 Monaten");
  });

  it("die Kachel-Variante bleibt im Nominativ", () => {
    expect(formatBreakEven(7)).toBe("7 Monate");
    expect(formatBreakEven(1)).toBe("1 Monat");
  });
});

describe("buildDeterministicCopy", () => {
  const bc = calculateRoiBusinessCase(inputs);
  const copy = buildDeterministicCopy(bc);

  it("Executive Summary ist grammatikalisch korrekt (nicht 'nach 7 Monate')", () => {
    expect(copy.executiveSummary).toContain("nach 5 Monaten erreicht");
    expect(copy.executiveSummary).not.toMatch(/nach \d+ Monate erreicht/);
  });

  it("enthält Unternehmensname und Kernzahlen", () => {
    // Intl.NumberFormat("de-DE") setzt vor % und € ein geschütztes Leerzeichen (U+00A0).
    const normalized = copy.executiveSummary.replace(/ /g, " ");
    expect(normalized).toContain("Yellow Boat Testfirma GmbH");
    expect(normalized).toContain("123 %");
    expect(normalized).toContain("235.575 €");
  });

  it("erzeugt keine Platzhalter", () => {
    const all = [
      copy.executiveSummary,
      copy.decisionRecommendation,
      ...copy.valueDrivers,
      ...copy.conditions,
      ...copy.nextSteps,
      buildTrainingCopy(bc),
    ].join(" ");
    expect(all).not.toMatch(/undefined|NaN|\bnull\b|TODO/);
  });

  it("liefert je genau drei Werttreiber, Voraussetzungen und nächste Schritte", () => {
    expect(copy.valueDrivers).toHaveLength(3);
    expect(copy.conditions).toHaveLength(3);
    expect(copy.nextSteps).toHaveLength(3);
  });

  it("unterstellt keine Rolle wie 'IT-Leiter' und verspricht keine Wirkung", () => {
    const all = [copy.executiveSummary, copy.decisionRecommendation, ...copy.nextSteps].join(" ");
    expect(all).not.toMatch(/IT-Leiter|garantiert|Garantie/i);
  });

  it("schaltet bei negativem Drei-Jahres-ROI auf den vorsichtigen Text um", () => {
    // Sehr hoher Lizenzpreis => Kosten uebersteigen den Nutzen dauerhaft.
    const negative = calculateRoiBusinessCase({ ...inputs, licensePerUserMonthEur: 500 });
    const negativeCopy = buildDeterministicCopy(negative);
    expect(negative.realistic.roi).toBeLessThan(0);
    expect(negativeCopy.executiveSummary).toContain("noch nicht");
    expect(negativeCopy.executiveSummary).not.toContain("positiven ROI");
  });
});

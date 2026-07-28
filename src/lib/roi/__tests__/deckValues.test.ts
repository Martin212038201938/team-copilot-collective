import { describe, it, expect } from "vitest";
import { calculateRoiBusinessCase } from "../calculate";
import { buildDeckValues } from "../deckValues";

/**
 * Gegenprobe mit den Referenzwerten aus dem Design-Handoff
 * (README.md, Abschnitt "Referenzwerte zum Gegentesten"):
 * nutzer = 300, stundensatz = 50, lizenzpreis = 26, Szenario realistisch.
 */
// Die Referenzwerte des Handoffs gelten für den Fall, dass die Nutzenbasis der Lizenzzahl
// entspricht (m365Users = users). Bei größerer Chat-Basis steigt der Nutzen entsprechend —
// siehe den gesonderten Test weiter unten.
const bc = calculateRoiBusinessCase({
  companyName: "Muster GmbH",
  users: 300,
  m365Users: 300,
  hourlyCostEur: 50,
  licensePerUserMonthEur: 26,
});
const v = buildDeckValues(bc, { datum: "Juli 2026", ansprechpartner: "Martin Lang · copilotenschule.de" });

describe("Deck-Werte gegen die Referenz des Design-Handoffs", () => {
  it("Kosten und Nutzen", () => {
    expect(v.costY1).toBe("275.072 €");
    expect(v.cost3).toBe("624.736 €");
    expect(v.benefitY1).toBe("639.339 €");
    expect(v.benefit3).toBe("2.078.059 €");
    expect(v.net3).toBe("1.453.323 €");
  });

  it("ROI und Break-even", () => {
    expect(v.roiY1).toBe("132 %");
    expect(v.roi3).toBe("233 %");
    expect(v.breakEven).toBe("5 Monate");
    expect(v.breakEvenShort).toBe("MONAT 5");
  });

  it("durchschnittliche Zeitersparnis Jahr 1", () => {
    expect(v.hoursY1).toBe("7,1 Std.");
  });

  it("Kostenblöcke über drei Jahre mit Anteilen", () => {
    expect(v.blockLic).toBe("280.800 €");
    expect(v.blockLicPct).toBe("45 %");
    expect(v.blockTrain).toBe("250.000 €");
    expect(v.blockTrainPct).toBe("40 %");
    expect(v.blockIt).toBe("27.000 €");
    expect(v.blockItPct).toBe("4 %");
    expect(v.blockChange).toBe("66.936 €");
    expect(v.blockChangePct).toBe("11 %");
  });

  it("Gruppen und Investitionsaufteilung", () => {
    expect(v.gruppenText).toBe("25 Gruppen à 12 Personen");
    expect(v.investSplit).toContain("Schulung 125.000 €");
    expect(v.investSplit).toContain("Lizenzen 93.600 €");
  });

  it("verkürzt Millionenbeträge wie die Vorlage", () => {
    // chartMaxLabel ist der groessere der beiden Endwerte -> Nutzen 3 Jahre.
    expect(v.chartMaxLabel).toBe("2,08 Mio. €");
  });

  it("liefert 36 Monatswerte für das Break-even-Diagramm", () => {
    expect(v.chartBenefitSeries).toHaveLength(36);
    expect(v.chartCostSeries).toHaveLength(36);
    expect(v.breakEvenMonth).toBe(5);
  });

  it("weist immer das realistische Szenario aus, Forrester nur als Vergleich", () => {
    expect(v.szenarioText).toBe("realistisches");
    expect(v.realRoiY1).toBe("132 %");
    expect(v.studyRoiY1).toBe("161 %");
    expect(v.realRoi3).toBe("233 %");
    expect(v.studyRoi3).toBe("274 %");
  });

  it("erzeugt keine Platzhalter oder NaN", () => {
    const all = Object.entries(v)
      .filter(([, value]) => typeof value === "string")
      .map(([, value]) => value)
      .join(" ");
    expect(all).not.toMatch(/undefined|NaN|\{\{/);
  });
});

describe("Nutzenbasis", () => {
  it("rechnet den Nutzen über alle Microsoft-365-Nutzer, die Kosten nur über die Lizenzen", () => {
    const breit = calculateRoiBusinessCase({
      companyName: "Muster GmbH",
      users: 300,
      m365Users: 900,
      hourlyCostEur: 50,
      licensePerUserMonthEur: 26,
    });
    // Dreifache Nutzenbasis -> dreifacher Nutzen, Kosten unverändert.
    expect(breit.realistic.years[0].realizedBenefitEur).toBeCloseTo(3 * bc.realistic.years[0].realizedBenefitEur, 2);
    // Lizenzkosten unveraendert; IT-Setup skaliert allerdings mit der groesseren Gesamtbasis.
    expect(breit.realistic.years[0].licenseCostEur).toBeCloseTo(bc.realistic.years[0].licenseCostEur, 2);
  });

  it("fällt ohne m365Users auf die Lizenzzahl zurück statt still NaN zu liefern", () => {
    const ohne = calculateRoiBusinessCase({
      companyName: "Muster GmbH",
      users: 300,
      hourlyCostEur: 50,
      licensePerUserMonthEur: 26,
    } as never);
    expect(Number.isFinite(ohne.realistic.totalCostEur)).toBe(true);
    expect(Math.round(ohne.realistic.years[0].realizedBenefitEur)).toBe(639339);
  });
});

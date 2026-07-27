import { describe, it, expect } from "vitest";
import { calculateRoiBusinessCase, timeSavingHoursForMonth } from "../calculate";
import { calculateItSetup } from "../itSetup";
import { calculateTraining } from "../training";
import type { RoiInputs } from "../types";

const baseInputs: Omit<RoiInputs, "users"> = {
  companyName: "Testfirma GmbH",
  hourlyCostEur: 50,
  licensePerUserMonthEur: 26,
};

function round(value: number): number {
  return Math.round(value);
}

describe("calculateItSetup — Staffelgrenzen", () => {
  it.each([
    [10, 4000],
    [50, 10000],
    [300, 27000],
    [1000, 55000],
    [5000, 135000],
  ])("users=%i -> %i €", (users, expected) => {
    expect(round(calculateItSetup(users))).toBe(expected);
  });
});

describe("calculateTraining — Gruppenbildung", () => {
  it.each([
    [1, 1],
    [12, 1],
    [13, 2],
    [50, 5],
    [300, 25],
  ])("users=%i -> %i Gruppen", (users, expectedGroups) => {
    expect(calculateTraining(users).groups).toBe(expectedGroups);
  });

  it("volle Zwölfergruppe kostet 416,67 € pro Person", () => {
    expect(calculateTraining(12).fullGroupCostPerSeatEur).toBeCloseTo(416.6666667, 4);
  });

  it("Jahr 2 und 3 sind je 50 % von Jahr 1", () => {
    const t = calculateTraining(50);
    expect(t.year2Eur).toBeCloseTo(t.year1Eur * 0.5, 6);
    expect(t.year3Eur).toBeCloseTo(t.year1Eur * 0.5, 6);
  });

  it("50 Nutzer: 25.000 € Jahr 1, 500 €/Nutzer", () => {
    const t = calculateTraining(50);
    expect(round(t.year1Eur)).toBe(25000);
    expect(round(t.actualCostPerUserYear1Eur)).toBe(500);
  });

  it("300 Nutzer: 125.000 € Jahr 1, 416,67 €/Nutzer", () => {
    const t = calculateTraining(300);
    expect(round(t.year1Eur)).toBe(125000);
    expect(t.actualCostPerUserYear1Eur).toBeCloseTo(416.6666667, 2);
  });
});

describe("timeSavingHoursForMonth — Lernkurve", () => {
  it("Monat 1 entspricht 60 % des Zielwerts", () => {
    expect(timeSavingHoursForMonth(1, 8)).toBeCloseTo(8 * 0.6, 6);
  });

  it("Lücke halbiert sich nach 2 Monaten", () => {
    const gapAtMonth1 = 8 - timeSavingHoursForMonth(1, 8);
    const gapAtMonth3 = 8 - timeSavingHoursForMonth(3, 8);
    expect(gapAtMonth3).toBeCloseTo(gapAtMonth1 * 0.5, 6);
  });

  it("nähert sich dem Zielwert für große Monate", () => {
    expect(timeSavingHoursForMonth(36, 8)).toBeGreaterThan(7.99);
  });
});

describe("Referenzfall: 50 Nutzer, 50 €/Std., 26 €/Monat", () => {
  const inputs: RoiInputs = { ...baseInputs, users: 50 };
  const businessCase = calculateRoiBusinessCase(inputs);

  it("Training und IT-Setup", () => {
    expect(businessCase.training.groups).toBe(5);
    expect(round(businessCase.training.year1Eur)).toBe(25000);
    expect(round(businessCase.itSetup.totalEur)).toBe(10000);
  });

  it("realistisches Szenario Jahr 1", () => {
    const { years, breakEvenMonth } = businessCase.realistic;
    expect(round(years[0].totalCostEur)).toBe(56672);
    expect(round(years[0].realizedBenefitEur)).toBe(106557);
    expect(round((years[0].realizedBenefitEur - years[0].totalCostEur) / years[0].totalCostEur * 100)).toBe(88);
    expect(breakEvenMonth).toBe(7);
  });

  it("realistisches Szenario 3 Jahre", () => {
    const r = businessCase.realistic;
    expect(round(r.totalCostEur)).toBe(119616);
    expect(round(r.totalBenefitEur)).toBe(346343);
    expect(round(r.netBenefitEur)).toBe(226727);
    expect(round(r.roi! * 100)).toBe(190);
  });

  it("studiennahes Szenario", () => {
    const s = businessCase.studyNear;
    expect(round(s.years[0].realizedBenefitEur)).toBe(119876);
    expect(round(s.years[0].realizedBenefitEur / s.years[0].totalCostEur * 100 - 100)).toBe(112); // ROI Jahr 1 laut Konzept: 112 %
    expect(s.breakEvenMonth).toBe(6);
    expect(round(s.totalBenefitEur)).toBe(389636);
    expect(round(s.roi! * 100)).toBe(226);
  });
});

describe("Referenzfall: 300 Nutzer, 50 €/Std., 26 €/Monat", () => {
  const inputs: RoiInputs = { ...baseInputs, users: 300 };
  const businessCase = calculateRoiBusinessCase(inputs);

  it("Training und IT-Setup", () => {
    expect(businessCase.training.groups).toBe(25);
    expect(round(businessCase.training.year1Eur)).toBe(125000);
    expect(round(businessCase.itSetup.totalEur)).toBe(27000);
  });

  it("realistisches Szenario Jahr 1", () => {
    const { years, breakEvenMonth } = businessCase.realistic;
    expect(round(years[0].totalCostEur)).toBe(275072);
    expect(round(years[0].realizedBenefitEur)).toBe(639339);
    expect(breakEvenMonth).toBe(5);
  });

  it("realistisches Szenario 3 Jahre", () => {
    const r = businessCase.realistic;
    expect(round(r.totalCostEur)).toBe(624736);
    expect(round(r.totalBenefitEur)).toBe(2078059);
    expect(round(r.netBenefitEur)).toBe(1453323);
    expect(round(r.roi! * 100)).toBe(233);
  });

  it("studiennahes Szenario", () => {
    const s = businessCase.studyNear;
    expect(round(s.years[0].realizedBenefitEur)).toBe(719257);
    expect(s.breakEvenMonth).toBe(5);
    expect(round(s.totalBenefitEur)).toBe(2337817);
    expect(round(s.roi! * 100)).toBe(274);
  });
});

describe("Modellprinzipien", () => {
  it("alle geschulten Nutzer fließen ein — kein 35%-Adoption-Abschlag", () => {
    const inputs: RoiInputs = { ...baseInputs, users: 100 };
    const bc = calculateRoiBusinessCase(inputs);
    // Monat 1 Nutzen = users * timeSaving(1) * hourlyCost * 0.5, ohne weiteren Multiplikator
    const expectedMonth1Benefit = 100 * timeSavingHoursForMonth(1, 8) * 50 * 0.5;
    expect(bc.realistic.months[0].realizedBenefitEur).toBeCloseTo(expectedMonth1Benefit, 6);
  });

  it("IT-Setup fällt nur in Jahr 1 an (nur Monat 1)", () => {
    const bc = calculateRoiBusinessCase({ ...baseInputs, users: 50 });
    const nonMonth1ItCosts = bc.realistic.months.filter((m) => m.month !== 1).some((m) => m.itSetupCostEur !== 0);
    expect(nonMonth1ItCosts).toBe(false);
  });

  it("Change-Kosten nur in Monat 1, 13, 25", () => {
    const bc = calculateRoiBusinessCase({ ...baseInputs, users: 50 });
    const changeMonths = bc.realistic.months.filter((m) => m.changeCostEur !== 0).map((m) => m.month);
    expect(changeMonths).toEqual([1, 13, 25]);
  });
});

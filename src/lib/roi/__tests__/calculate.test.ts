import { describe, it, expect } from "vitest";
import { calculateRoiBusinessCase, timeSavingHoursForMonth } from "../calculate";
import { calculateItSetup } from "../itSetup";
import { calculateTraining } from "../training";
import type { RoiInputs } from "../types";

const baseInputs: Omit<RoiInputs, "users" | "m365Users"> = {
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

describe("calculateTraining — Gruppenbildung (Lizenz-Segment)", () => {
  it.each([
    [1, 1],
    [12, 1],
    [13, 2],
    [50, 5],
    [300, 25],
  ])("licensedUsers=%i -> %i Gruppen", (users, expectedGroups) => {
    expect(calculateTraining(users, 0).licensed.groups).toBe(expectedGroups);
  });

  it("volle Zwölfergruppe kostet 416,67 € pro Person", () => {
    expect(calculateTraining(12, 0).licensed.fullGroupCostPerSeatEur).toBeCloseTo(416.6666667, 4);
  });

  it("Jahr 2 und 3 sind je 50 % von Jahr 1 (Lizenz-Segment)", () => {
    const t = calculateTraining(50, 0);
    expect(t.year2Eur).toBeCloseTo(t.year1Eur * 0.5, 6);
    expect(t.year3Eur).toBeCloseTo(t.year1Eur * 0.5, 6);
  });

  it("50 lizenzierte Nutzer: 25.000 € Jahr 1, 500 €/Nutzer", () => {
    const t = calculateTraining(50, 0);
    expect(round(t.year1Eur)).toBe(25000);
    expect(round(t.actualCostPerUserYear1Eur)).toBe(500);
  });

  it("300 lizenzierte Nutzer: 125.000 € Jahr 1, 416,67 €/Nutzer", () => {
    const t = calculateTraining(300, 0);
    expect(round(t.year1Eur)).toBe(125000);
    expect(t.actualCostPerUserYear1Eur).toBeCloseTo(416.6666667, 2);
  });
});

describe("calculateTraining — Chat-Segment ohne Lizenz (nur Kick-off)", () => {
  it("20 Chat-Nutzer ohne Lizenz: 2 Gruppen, nur Kick-off, kein Folgejahr", () => {
    const t = calculateTraining(0, 20);
    expect(t.chat.groups).toBe(2);
    expect(round(t.chat.year1Eur)).toBe(3600); // 2 × 1.800 €
    expect(t.chat.year2Eur).toBe(0);
    expect(t.chat.year3Eur).toBe(0);
    expect(t.licensed.groups).toBe(0);
    expect(round(t.year1Eur)).toBe(3600);
  });

  it("Lizenz- und Chat-Gruppen werden getrennt aufgerundet", () => {
    const t = calculateTraining(15, 10);
    expect(t.licensed.groups).toBe(2); // ceil(15/12)
    expect(t.chat.groups).toBe(1); // ceil(10/12)
    expect(t.groups).toBe(3);
    expect(round(t.licensed.year1Eur)).toBe(10000); // 2 × 5.000 €
    expect(round(t.chat.year1Eur)).toBe(1800); // 1 × 1.800 €
    expect(round(t.year1Eur)).toBe(11800);
    // Folgejahre nur für das Lizenz-Segment, Chat-Segment bleibt 0.
    expect(round(t.year2Eur)).toBe(5000);
    expect(round(t.year3Eur)).toBe(5000);
    expect(round(t.actualCostPerUserYear1Eur)).toBe(472); // 11.800 / 25
  });

  it("keine Chat-Nutzer -> chat-Segment ist vollständig neutral (0)", () => {
    const t = calculateTraining(50, 0);
    expect(t.chat.groups).toBe(0);
    expect(t.chat.year1Eur).toBe(0);
    expect(t.chat.actualCostPerUserYear1Eur).toBe(0);
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

describe("Referenzfall: 50 Nutzer, 50 €/Std., 26 €/Monat (keine Chat-Nutzer)", () => {
  const inputs: RoiInputs = { ...baseInputs, users: 50, m365Users: 50 };
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

describe("Referenzfall: 300 Nutzer, 50 €/Std., 26 €/Monat (keine Chat-Nutzer)", () => {
  const inputs: RoiInputs = { ...baseInputs, users: 300, m365Users: 300 };
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

describe("Referenzfall: 50 Lizenz-Nutzer + 20 Chat-Nutzer ohne Lizenz (m365Users = 70)", () => {
  const inputs: RoiInputs = { ...baseInputs, users: 50, m365Users: 70 };
  const businessCase = calculateRoiBusinessCase(inputs);

  it("Training: Lizenz- und Chat-Segment getrennt, Chat nur Kick-off", () => {
    expect(businessCase.training.licensed.groups).toBe(5); // ceil(50/12)
    expect(businessCase.training.chat.groups).toBe(2); // ceil(20/12)
    expect(round(businessCase.training.licensed.year1Eur)).toBe(25000);
    expect(round(businessCase.training.chat.year1Eur)).toBe(3600);
    expect(round(businessCase.training.year1Eur)).toBe(28600);
    expect(businessCase.training.chat.year2Eur).toBe(0);
    expect(businessCase.training.chat.year3Eur).toBe(0);
  });

  it("IT-Setup basiert auf der Gesamt-Nutzerzahl (70), nicht nur den Lizenzen (50)", () => {
    expect(round(businessCase.itSetup.totalEur)).toBe(round(calculateItSetup(70)));
    expect(round(businessCase.itSetup.totalEur)).not.toBe(round(calculateItSetup(50)));
  });

  it("Nutzen: 50 Lizenznutzer mit 8 Std., die 20 Chat-Nutzer nur mit 2,5 Std.", () => {
    const expectedMonth1Benefit =
      (50 * timeSavingHoursForMonth(1, 8) + 20 * timeSavingHoursForMonth(1, 2.5)) * 50 * 0.5;
    expect(businessCase.realistic.months[0].realizedBenefitEur).toBeCloseTo(expectedMonth1Benefit, 6);
  });

  it("Chat-Nutzer werden nicht mit dem vollen Zielwert der Lizenznutzer angesetzt", () => {
    const alsWaerenAlleLizenziert = 70 * timeSavingHoursForMonth(1, 8) * 50 * 0.5;
    expect(businessCase.realistic.months[0].realizedBenefitEur).toBeLessThan(alsWaerenAlleLizenziert);
  });

  it("Lizenzkosten fallen weiterhin nur für die 50 lizenzierten Nutzer an", () => {
    expect(round(businessCase.realistic.months[0].licenseCostEur)).toBe(round(50 * 26));
  });
});

describe("Modellprinzipien", () => {
  it("alle geschulten Nutzer fließen ein — kein 35%-Adoption-Abschlag", () => {
    const inputs: RoiInputs = { ...baseInputs, users: 100, m365Users: 100 };
    const bc = calculateRoiBusinessCase(inputs);
    // Monat 1 Nutzen = m365Users * timeSaving(1) * hourlyCost * 0.5, ohne weiteren Multiplikator
    const expectedMonth1Benefit = 100 * timeSavingHoursForMonth(1, 8) * 50 * 0.5;
    expect(bc.realistic.months[0].realizedBenefitEur).toBeCloseTo(expectedMonth1Benefit, 6);
  });

  it("IT-Setup fällt nur in Jahr 1 an (nur Monat 1)", () => {
    const bc = calculateRoiBusinessCase({ ...baseInputs, users: 50, m365Users: 50 });
    const nonMonth1ItCosts = bc.realistic.months.filter((m) => m.month !== 1).some((m) => m.itSetupCostEur !== 0);
    expect(nonMonth1ItCosts).toBe(false);
  });

  it("Change-Kosten nur in Monat 1, 13, 25", () => {
    const bc = calculateRoiBusinessCase({ ...baseInputs, users: 50, m365Users: 50 });
    const changeMonths = bc.realistic.months.filter((m) => m.changeCostEur !== 0).map((m) => m.month);
    expect(changeMonths).toEqual([1, 13, 25]);
  });
});

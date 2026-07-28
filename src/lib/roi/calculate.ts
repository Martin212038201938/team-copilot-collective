import { ROI_ASSUMPTIONS, ASSUMPTIONS_VERSION } from "./assumptions";
import { calculateItSetup } from "./itSetup";
import { calculateTraining } from "./training";
import type {
  RoiInputs,
  RoiBusinessCase,
  ScenarioId,
  ScenarioResult,
  MonthlyProjection,
  YearProjection,
} from "./types";

/**
 * Durchschnittliche Zeitersparnis pro geschulter Person in einem gegebenen Monat.
 * Monat 1 beginnt bei 60 % des Zielwerts, danach halbiert sich alle 2 Monate die
 * verbleibende Lücke zum Zielwert (Konzept Abschnitt 6.6).
 */
export function timeSavingHoursForMonth(month: number, targetHours: number): number {
  const { rampStartShare, rampGapHalfLifeMonths } = ROI_ASSUMPTIONS;
  return targetHours * (1 - (1 - rampStartShare) * Math.pow(0.5, (month - 1) / rampGapHalfLifeMonths));
}

function yearForMonth(month: number): 1 | 2 | 3 {
  if (month <= 12) return 1;
  if (month <= 24) return 2;
  return 3;
}

function computeScenario(
  inputs: RoiInputs,
  id: ScenarioId,
  targetHoursPerUserMonth: number,
  training: ReturnType<typeof calculateTraining>,
  itSetupTotalEur: number
): ScenarioResult {
  const { users, m365Users, hourlyCostEur, licensePerUserMonthEur } = inputs;
  const { horizonMonths, economicRealizationRate, changeAndAdoptionRate } = ROI_ASSUMPTIONS;

  // Der Nutzen (Zeitersparnis) gilt für ALLE Microsoft-365-Nutzer, nicht nur für lizenzierte
  // Copilot-Pro-Nutzer — Chat-User ohne Lizenz werden mit demselben Zielwert angesetzt (siehe
  // RoiInputs.m365Users). Lizenzkosten fallen dagegen ausschließlich für "users" an.
  //
  // Rückfallebene: Fehlt m365Users (ältere Aufrufer, unvollständige Payload), wird die
  // Lizenzzahl verwendet. Ohne diesen Fallback liefert die gesamte Berechnung still NaN —
  // inklusive der Kosten — und die Fehlerursache ist von außen nicht erkennbar.
  const benefitUsers = Number.isFinite(m365Users) && m365Users > 0 ? m365Users : users;

  const monthlyLicenseCostEur = users * licensePerUserMonthEur;
  const licensesYear1Eur = monthlyLicenseCostEur * 12;
  const licensesYear2Eur = monthlyLicenseCostEur * 12;
  const licensesYear3Eur = monthlyLicenseCostEur * 12;

  const changeYear1Eur = changeAndAdoptionRate * (licensesYear1Eur + training.year1Eur + itSetupTotalEur);
  const changeYear2Eur = changeAndAdoptionRate * (licensesYear2Eur + training.year2Eur);
  const changeYear3Eur = changeAndAdoptionRate * (licensesYear3Eur + training.year3Eur);

  const months: MonthlyProjection[] = [];
  let cumulativeBenefitEur = 0;
  let cumulativeCostEur = 0;
  let breakEvenMonth: number | null = null;

  for (let month = 1; month <= horizonMonths; month++) {
    const year = yearForMonth(month);
    const grossHoursPerUser = timeSavingHoursForMonth(month, targetHoursPerUserMonth);
    const realizedBenefitEur = benefitUsers * grossHoursPerUser * hourlyCostEur * economicRealizationRate;

    const trainingCostEur = month === 1 ? training.year1Eur : month === 13 ? training.year2Eur : month === 25 ? training.year3Eur : 0;
    const itSetupCostEur = month === 1 ? itSetupTotalEur : 0;
    const changeCostEur = month === 1 ? changeYear1Eur : month === 13 ? changeYear2Eur : month === 25 ? changeYear3Eur : 0;
    const licenseCostEur = monthlyLicenseCostEur;

    const totalCostEur = licenseCostEur + trainingCostEur + itSetupCostEur + changeCostEur;

    cumulativeBenefitEur += realizedBenefitEur;
    cumulativeCostEur += totalCostEur;
    const cumulativeNetBenefitEur = cumulativeBenefitEur - cumulativeCostEur;

    if (breakEvenMonth === null && cumulativeNetBenefitEur >= 0) {
      breakEvenMonth = month;
    }

    months.push({
      month,
      year,
      users: benefitUsers,
      grossHoursPerUser,
      realizedBenefitEur,
      licenseCostEur,
      trainingCostEur,
      itSetupCostEur,
      changeCostEur,
      totalCostEur,
      cumulativeBenefitEur,
      cumulativeCostEur,
      cumulativeNetBenefitEur,
    });
  }

  const years: YearProjection[] = ([1, 2, 3] as const).map((year) => {
    const yearMonths = months.filter((m) => m.year === year);
    const realizedBenefitEur = yearMonths.reduce((sum, m) => sum + m.realizedBenefitEur, 0);
    const licenseCostEur = yearMonths.reduce((sum, m) => sum + m.licenseCostEur, 0);
    const trainingCostEur = yearMonths.reduce((sum, m) => sum + m.trainingCostEur, 0);
    const itSetupCostEur = yearMonths.reduce((sum, m) => sum + m.itSetupCostEur, 0);
    const changeCostEur = yearMonths.reduce((sum, m) => sum + m.changeCostEur, 0);
    const totalCostEur = yearMonths.reduce((sum, m) => sum + m.totalCostEur, 0);
    const netBenefitEur = realizedBenefitEur - totalCostEur;
    const averageGrossHoursPerUserMonth = yearMonths.reduce((sum, m) => sum + m.grossHoursPerUser, 0) / yearMonths.length;
    const lastMonthOfYear = yearMonths[yearMonths.length - 1];
    const cumulativeNetBenefitEur = lastMonthOfYear.cumulativeNetBenefitEur;
    const roi = lastMonthOfYear.cumulativeCostEur === 0 ? null : cumulativeNetBenefitEur / lastMonthOfYear.cumulativeCostEur;

    return {
      year,
      averageGrossHoursPerUserMonth,
      realizedBenefitEur,
      licenseCostEur,
      trainingCostEur,
      itSetupCostEur,
      changeCostEur,
      totalCostEur,
      netBenefitEur,
      cumulativeNetBenefitEur,
      roi,
    };
  });

  const totalBenefitEur = months.reduce((sum, m) => sum + m.realizedBenefitEur, 0);
  const totalCostEur = months.reduce((sum, m) => sum + m.totalCostEur, 0);
  const netBenefitEur = totalBenefitEur - totalCostEur;
  const roi = totalCostEur === 0 ? null : netBenefitEur / totalCostEur;

  return {
    id,
    targetHoursPerUserMonth,
    economicRealizationRate,
    months,
    years,
    totalBenefitEur,
    totalCostEur,
    netBenefitEur,
    roi,
    breakEvenMonth,
  };
}

/**
 * Berechnet den vollständigen Business Case (beide Szenarien + Trainings-/IT-Setup-Übersicht)
 * aus den vier Nutzereingaben. Einzige Quelle der Wahrheit für Website, PowerPoint und Tests.
 */
export function calculateRoiBusinessCase(inputs: RoiInputs): RoiBusinessCase {
  const licensedUsers = inputs.users;
  // Rückfallebene an EINER Stelle: Fehlt m365Users, gilt die Lizenzzahl als Gesamtbasis.
  // Ohne diesen Fallback liefert die gesamte Rechnung still NaN – auch die Kosten.
  const totalM365Users =
    Number.isFinite(inputs.m365Users) && inputs.m365Users > 0 ? inputs.m365Users : licensedUsers;
  const normalizedInputs: RoiInputs = { ...inputs, m365Users: totalM365Users };

  // Nutzer ohne Lizenz = alle M365-Nutzer abzüglich der geplanten Copilot-Lizenzen (nie negativ,
  // falls versehentlich users > m365Users eingegeben wurde — das Formular validiert dagegen).
  const chatUsers = Math.max(totalM365Users - licensedUsers, 0);

  const training = calculateTraining(licensedUsers, chatUsers);
  // IT-Setup skaliert mit der Gesamt-Kopfzahl (Tenant-Konfiguration, Security, Governance
  // betreffen alle M365-Nutzer, unabhängig vom Lizenztyp).
  const itSetupTotalEur = calculateItSetup(totalM365Users);

  const realistic = computeScenario(normalizedInputs, "realistic", ROI_ASSUMPTIONS.realisticTargetHoursPerMonth, training, itSetupTotalEur);
  const studyNear = computeScenario(normalizedInputs, "studyNear", ROI_ASSUMPTIONS.studyNearTargetHoursPerMonth, training, itSetupTotalEur);

  return {
    inputs: normalizedInputs,
    assumptionsVersion: ASSUMPTIONS_VERSION,
    generatedAt: new Date().toISOString(),
    training,
    itSetup: {
      totalEur: itSetupTotalEur,
      perUserEur: totalM365Users > 0 ? itSetupTotalEur / totalM365Users : 0,
    },
    realistic,
    studyNear,
  };
}

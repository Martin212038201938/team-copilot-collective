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
  const { users, hourlyCostEur, licensePerUserMonthEur } = inputs;
  const { horizonMonths, economicRealizationRate, changeAndAdoptionRate } = ROI_ASSUMPTIONS;

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
    const realizedBenefitEur = users * grossHoursPerUser * hourlyCostEur * economicRealizationRate;

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
      users,
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
  const training = calculateTraining(inputs.users);
  const itSetupTotalEur = calculateItSetup(inputs.users);

  const realistic = computeScenario(inputs, "realistic", ROI_ASSUMPTIONS.realisticTargetHoursPerMonth, training, itSetupTotalEur);
  const studyNear = computeScenario(inputs, "studyNear", ROI_ASSUMPTIONS.studyNearTargetHoursPerMonth, training, itSetupTotalEur);

  return {
    inputs,
    assumptionsVersion: ASSUMPTIONS_VERSION,
    generatedAt: new Date().toISOString(),
    training: {
      groups: training.groups,
      fullGroupCostEur: training.fullGroupCostEur,
      fullGroupCostPerSeatEur: training.fullGroupCostPerSeatEur,
      actualCostPerUserYear1Eur: training.actualCostPerUserYear1Eur,
      year1Eur: training.year1Eur,
      year2Eur: training.year2Eur,
      year3Eur: training.year3Eur,
    },
    itSetup: {
      totalEur: itSetupTotalEur,
      perUserEur: inputs.users > 0 ? itSetupTotalEur / inputs.users : 0,
    },
    realistic,
    studyNear,
  };
}

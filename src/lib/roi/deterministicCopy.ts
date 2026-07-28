import type { RoiBusinessCase, PresentationCopy } from "./types";
import { formatEur, formatEurCents, formatPercent, formatBreakEvenDative, formatHours } from "./format";

/**
 * Feste, geprüfte Textbausteine (Konzept Abschnitt 12). Vollständiger Fallback, falls keine
 * KI-Personalisierung aktiv ist (Standard in Version 1) oder diese fehlschlägt.
 * Implementiert dieselbe Inhaltsstruktur wie eine mögliche spätere KI-Antwort (PresentationCopy).
 */
export function buildDeterministicCopy(bc: RoiBusinessCase): PresentationCopy {
  return {
    executiveSummary: buildExecutiveSummary(bc),
    decisionRecommendation: buildDecisionRecommendation(bc),
    valueDrivers: buildValueDrivers(bc),
    conditions: buildConditions(),
    nextSteps: buildNextSteps(),
  };
}

function buildExecutiveSummary(bc: RoiBusinessCase): string {
  const { inputs, realistic } = bc;
  const company = inputs.companyName || "Ihr Unternehmen";
  const year1 = realistic.years[0];
  const roiYear1 = year1.roi;
  const roiThreeYears = realistic.roi;

  // Dativ, weil der Wert in Saetzen wie "wird nach X erreicht" steht.
  const breakEven = formatBreakEvenDative(realistic.breakEvenMonth);
  const netBenefit3y = formatEur(realistic.netBenefitEur);

  if (roiYear1 !== null && roiYear1 > 0) {
    return `Für ${company} weist die Planungsrechnung bei ${inputs.m365Users} Microsoft-365-Nutzern (davon ${inputs.users} mit Copilot-Lizenz) bereits im ersten Jahr einen positiven ROI von ${formatPercent(roiYear1)} aus. Dem realisierten Nutzen von ${formatEur(year1.realizedBenefitEur)} stehen Gesamtkosten von ${formatEur(year1.totalCostEur)} gegenüber. Über drei Jahre entsteht ein kumulierter Netto-Nutzen von ${netBenefit3y}; der Break-even wird nach ${breakEven} erreicht.`;
  }

  if (roiThreeYears !== null && roiThreeYears > 0) {
    return `Für ${company} deckt der realisierte Nutzen die anfänglichen Kosten im ersten Jahr noch nicht vollständig. Über den Drei-Jahres-Zeitraum wird die Investition in der Planungsrechnung jedoch wirtschaftlich: Der kumulierte Netto-Nutzen beträgt ${netBenefit3y}, der Break-even wird nach ${breakEven} erreicht.`;
  }

  return `Unter den eingegebenen Annahmen deckt der realisierte Nutzen die Gesamtkosten innerhalb von 36 Monaten noch nicht. Vor einer Budgetentscheidung sollten Nutzerumfang, Lizenzpreis, priorisierte Anwendungsfälle und erreichbare Zeitersparnis überprüft werden.`;
}

function buildDecisionRecommendation(bc: RoiBusinessCase): string {
  const roiThreeYears = bc.realistic.roi;
  if (roiThreeYears !== null && roiThreeYears > 0) {
    return "Die Planungsrechnung spricht für den Start einer strukturierten Einführung. Vor der finalen Budgetfreigabe sollten die Annahmen mit zwei bis drei priorisierten Anwendungsfällen und einer Baseline-Messung validiert werden.";
  }
  return "Vor einer Budgetentscheidung sollten Nutzerumfang, Lizenzpreis, priorisierte Anwendungsfälle und erreichbare Zeitersparnis überprüft werden, um die Annahmen realistischer abzubilden.";
}

function buildValueDrivers(bc: RoiBusinessCase): [string, string, string] {
  const { m365Users, users } = bc.inputs;
  const chatUsers = Math.max(m365Users - users, 0);
  const userLine =
    chatUsers > 0
      ? `Alle ${m365Users} Microsoft-365-Nutzer fließen in den Nutzen ein (${users} mit Copilot-Lizenz, ${chatUsers} mit Copilot Chat ohne Lizenz) — ohne künstlichen Adoption-Abschlag.`
      : `Alle ${m365Users} geschulten Nutzer fließen in den Nutzen ein — ohne künstlichen Adoption-Abschlag.`;
  return [
    userLine,
    `Nur 50 % des rechnerischen Kapazitätswerts werden wirtschaftlich als Nutzen angesetzt.`,
    `Break-even im realistischen Szenario nach ${formatBreakEvenDative(bc.realistic.breakEvenMonth)}.`,
  ];
}

function buildConditions(): [string, string, string] {
  return [
    "Relevante Anwendungsfälle priorisieren, statt Copilot unspezifisch auszurollen.",
    "Mitarbeitende über eine strukturierte Lernreise befähigen, nicht nur Lizenzen verteilen.",
    "Nutzung und Wirkung nach dem Rollout messen und die Annahmen laufend nachschärfen.",
  ];
}

function buildNextSteps(): [string, string, string] {
  return [
    "Zwei bis drei priorisierte Anwendungsfälle mit den Fachbereichen festlegen.",
    "Baseline-Messung vor dem Rollout durchführen.",
    "Lernreise und Change-Kommunikation gemeinsam mit der Copilotenschule planen.",
  ];
}

/** Trainingstext (Abschnitt 12.2). */
export function buildTrainingCopy(bc: RoiBusinessCase): string {
  const { training } = bc;
  const licensedSentence = `Für die ${training.licensed.users} Nutzer mit Copilot-Lizenz werden ${training.licensed.groups} Gruppe${training.licensed.groups === 1 ? "" : "n"} mit Kick-off und vollständiger Lernreise benötigt (${formatEurCents(training.licensed.actualCostPerUserYear1Eur)} pro eingeplanter Person, Vergleichswert bei voller Zwölfergruppe: ${formatEurCents(training.licensed.fullGroupCostPerSeatEur)}).`;

  if (training.chat.users === 0) {
    return `Das Qualifizierungsmodell umfasst je Gruppe einen Kick-off für ${formatEur(1800)} und vier Lernreise-Termine zu je ${formatEur(800)}. Bei zwölf Teilnehmenden entsprechen ${formatEur(training.licensed.fullGroupCostEur)} Gruppenkosten ${formatEurCents(training.licensed.fullGroupCostPerSeatEur)} pro Person. ${licensedSentence}`;
  }

  return `Das Qualifizierungsmodell unterscheidet zwei Gruppen: Nutzer mit Copilot-Lizenz erhalten je Gruppe einen Kick-off für ${formatEur(1800)} und vier Lernreise-Termine zu je ${formatEur(800)} (${formatEur(training.licensed.fullGroupCostEur)} je voller Zwölfergruppe). Nutzer ohne Lizenz (nur Copilot Chat) erhalten ausschließlich den Kick-off, ebenfalls je Gruppe von bis zu 12 Personen, ohne Lernreise und ohne Folgejahr. ${licensedSentence} Für die ${training.chat.users} Chat-Nutzer ohne Lizenz kommen ${training.chat.groups} weitere Kick-off-Gruppe${training.chat.groups === 1 ? "" : "n"} hinzu (${formatEurCents(training.chat.actualCostPerUserYear1Eur)} pro eingeplanter Person).`;
}

/** Agentisches Potenzial (Abschnitt 12.3) — fester Hinweistext, keine Zahl. */
export const AGENTIC_POTENTIAL_COPY =
  "Die Rechnung verwendet nur die heute besser belegbare Assistenz-Nutzung. Zusätzlicher Nutzen aus leistungsfähigeren Modellen, neuen Werkzeugen, tieferer Prozessintegration und agentischen, mehrstufigen Abläufen ist nicht eingerechnet.";

/** Dominanter Kostenblock über 3 Jahre (Abschnitt 12.4). */
export function buildDominantCostBlockCopy(bc: RoiBusinessCase): string {
  const y = bc.realistic.years;
  const sum = (key: "licenseCostEur" | "trainingCostEur" | "itSetupCostEur" | "changeCostEur") =>
    y.reduce((s, year) => s + year[key], 0);

  const blocks: Array<[string, number]> = [
    ["Lizenzen", sum("licenseCostEur")],
    ["Training und Weiterbildung", sum("trainingCostEur")],
    ["IT-Setup und Einführung", sum("itSetupCostEur")],
    ["Change und Adoption", sum("changeCostEur")],
  ];
  const total = blocks.reduce((s, [, v]) => s + v, 0);
  const [label, value] = blocks.reduce((max, curr) => (curr[1] > max[1] ? curr : max));
  const share = total > 0 ? value / total : 0;

  return `Über drei Jahre ist ${label} mit ${formatPercent(share)} der größte Kostenblock.`;
}

/** Nutzenlogik-Beispieltext (Folie 6, Abschnitt 10). */
export function buildBenefitLogicCopy(bc: RoiBusinessCase): string {
  const y1 = bc.realistic.years[0];
  const avgHours = formatHours(y1.averageGrossHoursPerUserMonth);
  const perUserBenefit = bc.inputs.m365Users > 0 ? y1.realizedBenefitEur / bc.inputs.m365Users : 0;
  return `Im ersten Jahr werden im realistischen Szenario durchschnittlich ${avgHours} Stunden brutto je Nutzer und Monat angesetzt. Daraus entsteht wirtschaftlich angesetzter Nutzen von ${formatEur(perUserBenefit)} pro Nutzer und Jahr. Die Rechnung unterstellt nicht, dass jede gesparte Stunde als Personalkostensenkung realisiert wird.`;
}

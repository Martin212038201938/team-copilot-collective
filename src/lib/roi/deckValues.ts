import { ROI_ASSUMPTIONS } from "./assumptions";
import type { RoiBusinessCase } from "./types";

/**
 * Erzeugt exakt die Werte, die die Designvorlage als {{ Platzhalter }} erwartet.
 *
 * WICHTIG: Die Formatierung folgt bewusst 1:1 der Vorlage (`Business Case Copilot.dc.html`),
 * NICHT unserem Intl-basierten format.ts. Unterschied: Die Vorlage schreibt "132 %" und
 * "275.072 €" mit normalem Leerzeichen, Intl setzt ein geschütztes. Auf einer Folie fällt
 * das nicht auf, aber die Werte sollen mit der Excel und dem HTML-Deck deckungsgleich sein.
 *
 * Die Rechenwerte selbst kommen unverändert aus calculate.ts.
 */

const num = (n: number): string => Math.round(n).toLocaleString("de-DE");
const eur = (n: number): string => `${num(n)} €`;
/** Ab einer Million verkürzt: "2,08 Mio. €" statt "2.078.059 €". */
const kEur = (n: number): string =>
  n >= 1_000_000
    ? `${(n / 1_000_000).toLocaleString("de-DE", { maximumFractionDigits: 2 })} Mio. €`
    : `${num(n)} €`;
const pct = (v: number): string => `${Math.round(v * 100)} %`;

export type DeckValues = {
  firma: string;
  datum: string;
  ansprechpartner: string;
  nutzerText: string;
  rateText: string;
  szenarioText: string;
  szenarioTextLower: string;
  roiY1: string;
  roi3: string;
  breakEven: string;
  breakEvenShort: string;
  costY1: string;
  cost3: string;
  benefitY1: string;
  benefit3: string;
  net3: string;
  benefitPerUser: string;
  hoursY1: string;
  roiHinweis: string;
  blockLic: string; blockLicPct: string;
  blockTrain: string; blockTrainPct: string;
  blockIt: string; blockItPct: string;
  blockChange: string; blockChangePct: string;
  realBenefitY1: string; studyBenefitY1: string;
  realRoiY1: string; studyRoiY1: string;
  realRoi3: string; studyRoi3: string;
  gruppenText: string;
  investSplit: string;
  /** Kumulierte Reihen für das Break-even-Diagramm (Folie 13). */
  chartBenefitSeries: number[];
  chartCostSeries: number[];
  chartMaxLabel: string;
  breakEvenMonth: number | null;
  /** Zwei-Gruppen-Modell: lizenzierte Nutzer und Nutzer mit Copilot Chat ohne Lizenz. */
  lizenzNutzerText: string;
  chatNutzerText: string;
  hatChatNutzer: boolean;
  zielLizenzText: string;
  zielChatText: string;
  /** Ein Satz, der die Nutzenbasis beschreibt — je nachdem, ob es Chat-Nutzer gibt. */
  nutzenbasisText: string;
};

export function buildDeckValues(
  bc: RoiBusinessCase,
  opts: { datum: string; ansprechpartner: string }
): DeckValues {
  const { inputs, realistic, studyNear, training, itSetup } = bc;
  const users = inputs.users;

  // Das ausgewiesene Szenario ist fest "Realistisch"; studyNear dient nur dem Vergleich
  // auf Folie 12 (bewusste Produktentscheidung, kein Formularfeld).
  const m = realistic;
  const year1 = m.years[0];

  const chatUsers = Math.max((inputs.m365Users ?? users) - users, 0);
  const licY = users * inputs.licensePerUserMonthEur * 12;
  const trainY23 = training.year2Eur;
  const changeY23 = m.years[1].changeCostEur;

  const roiOf = (s: typeof realistic): string => {
    const y1 = s.years[0];
    return pct((y1.realizedBenefitEur - y1.totalCostEur) / y1.totalCostEur);
  };
  const roi3Of = (s: typeof realistic): string =>
    pct((s.totalBenefitEur - s.totalCostEur) / s.totalCostEur);

  const chartBenefitSeries = m.months.map((x) => x.cumulativeBenefitEur);
  const chartCostSeries = m.months.map((x) => x.cumulativeCostEur);
  const max = Math.max(
    chartBenefitSeries[chartBenefitSeries.length - 1],
    chartCostSeries[chartCostSeries.length - 1]
  );

  const licenses3y = licY * 3;
  const training3y = training.year1Eur + 2 * trainY23;
  const change3y = year1.changeCostEur + 2 * changeY23;

  return {
    firma: inputs.companyName,
    datum: opts.datum,
    ansprechpartner: opts.ansprechpartner,
    nutzerText: num(users),
    rateText: `${num(inputs.hourlyCostEur)} €`,
    szenarioText: "realistisches",
    szenarioTextLower: "realistischen",
    roiY1: roiOf(m),
    roi3: roi3Of(m),
    breakEven: m.breakEvenMonth ? `${m.breakEvenMonth} Monate` : "> 36 Monate",
    breakEvenShort: m.breakEvenMonth ? `MONAT ${m.breakEvenMonth}` : "",
    costY1: eur(year1.totalCostEur),
    cost3: eur(m.totalCostEur),
    benefitY1: eur(year1.realizedBenefitEur),
    benefit3: eur(m.totalBenefitEur),
    net3: eur(m.totalBenefitEur - m.totalCostEur),
    benefitPerUser: eur(year1.realizedBenefitEur / users),
    hoursY1: `${year1.averageGrossHoursPerUserMonth.toLocaleString("de-DE", { maximumFractionDigits: 1 })} Std.`,
    roiHinweis:
      "100 % ROI bedeutet nicht die Gewinnschwelle, sondern einen Nutzen in doppelter Höhe der Kosten. Break-even liegt bei 0 %.",
    blockLic: kEur(licenses3y),
    blockLicPct: pct(licenses3y / m.totalCostEur),
    blockTrain: kEur(training3y),
    blockTrainPct: pct(training3y / m.totalCostEur),
    blockIt: kEur(itSetup.totalEur),
    blockItPct: pct(itSetup.totalEur / m.totalCostEur),
    blockChange: kEur(change3y),
    blockChangePct: pct(change3y / m.totalCostEur),
    realBenefitY1: eur(realistic.years[0].realizedBenefitEur),
    studyBenefitY1: eur(studyNear.years[0].realizedBenefitEur),
    realRoiY1: roiOf(realistic),
    studyRoiY1: roiOf(studyNear),
    realRoi3: roi3Of(realistic),
    studyRoi3: roi3Of(studyNear),
    gruppenText: `${training.groups} Gruppen à 12 Personen`,
    investSplit:
      `Schulung ${eur(training.year1Eur)} · Lizenzen ${eur(licY)} · ` +
      `IT/Change ${eur(itSetup.totalEur + year1.changeCostEur)}`,
    chartBenefitSeries,
    chartCostSeries,
    chartMaxLabel: kEur(max),
    breakEvenMonth: m.breakEvenMonth,
    lizenzNutzerText: num(users),
    chatNutzerText: num(chatUsers),
    hatChatNutzer: chatUsers > 0,
    zielLizenzText: `${m.targetHoursPerUserMonth} Std./Monat`,
    zielChatText: `${ROI_ASSUMPTIONS.chatOnlyTargetHoursPerMonth.toLocaleString("de-DE")} Std./Monat`,
    nutzenbasisText:
      chatUsers > 0
        ? `${num(users)} Personen mit Copilot-Lizenz werden mit ${m.targetHoursPerUserMonth} Std./Monat angesetzt, ` +
          `${num(chatUsers)} weitere Microsoft-365-Nutzer mit ` +
          `${ROI_ASSUMPTIONS.chatOnlyTargetHoursPerMonth.toLocaleString("de-DE")} Std./Monat — ihnen fehlen ` +
          `Lizenz, Integration in die Office-Anwendungen und die vollständige Lernreise.`
        : `Alle ${num(users)} Personen erhalten eine Copilot-Lizenz und die vollständige Lernreise; ` +
          `angesetzt sind ${m.targetHoursPerUserMonth} Std./Monat.`,
  };
}

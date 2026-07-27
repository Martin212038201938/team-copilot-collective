import type PptxGenJS from "pptxgenjs";
import type { RoiBusinessCase, PresentationCopy, PresentationOptions } from "@/lib/roi/types";
import { formatEur, formatPercent, formatBreakEven, formatHours } from "@/lib/roi/format";
import { ASSUMPTIONS_VERSION } from "@/lib/roi/assumptions";
import {
  buildTrainingCopy,
  AGENTIC_POTENTIAL_COPY,
  buildDominantCostBlockCopy,
  buildBenefitLogicCopy,
} from "@/lib/roi/deterministicCopy";
import { PPT_THEME, PPT_FONT, roiColor } from "./theme";
import { ROI_SOURCES, buildSourcesNotes } from "./sources";
import { buildPptxFileName } from "./fileName";

const MASTER_NAME = "ROI_MASTER";

/**
 * Baut die vollständige, editierbare Business-Case-PowerPoint im Browser (Konzept Abschnitt 9-12).
 * Gibt einen Blob zurück (kein direkter Download hier) — der Aufrufer lädt ihn zum "echten
 * Honeypot"-Endpunkt hoch, der die Mail erst NACH erfolgreicher Speicherung verschickt.
 */
export async function createRoiBusinessCaseDeck(args: {
  businessCase: RoiBusinessCase;
  options: PresentationOptions;
  copy: PresentationCopy;
}): Promise<{ blob: Blob; fileName: string }> {
  const { businessCase: bc, options, copy } = args;
  const { default: PptxGenJS } = await import("pptxgenjs");
  const pptx = new PptxGenJS();

  pptx.layout = "LAYOUT_WIDE";
  pptx.author = "Copilotenschule";
  pptx.company = "Copilotenschule";
  pptx.subject = "Microsoft 365 Copilot Business Case";
  pptx.title = `Copilot Business Case – ${bc.inputs.companyName}`;

  defineMaster(pptx, bc, options);

  addTitleSlide(pptx, bc, options);
  addExecutiveSummarySlide(pptx, bc, copy);
  addModelOverviewSlide(pptx, bc);
  addInvestmentSlide(pptx, bc);
  addTrainingEconomicsSlide(pptx, bc);
  addBenefitLogicSlide(pptx, bc);
  addScenarioComparisonSlide(pptx, bc);
  addTimelineSlide(pptx, bc);
  addRealizationConditionsSlide(pptx, copy);
  addDecisionSlide(pptx, bc, copy);
  addSourcesSlide(pptx);

  const blob = (await pptx.write({ outputType: "blob" })) as Blob;
  const fileName = buildPptxFileName(bc.inputs.companyName);
  return { blob, fileName };
}

function defineMaster(pptx: PptxGenJS, bc: RoiBusinessCase, options: PresentationOptions) {
  const objects: PptxGenJS.SlideMasterProps["objects"] = [
    { line: { x: 0, y: 7.42, w: "100%", h: 0, line: { color: PPT_THEME.primary, width: 1.5 } } },
    {
      text: {
        text: "Copilotenschule",
        options: { x: 11.6, y: 0.15, w: 1.6, h: 0.3, fontSize: 10, color: PPT_THEME.muted, align: "right", fontFace: PPT_FONT.body },
      },
    },
    {
      text: {
        text: `${bc.inputs.companyName} · Planungsrechnung – kein Wirkungsversprechen · ${options.presentationDate}`,
        options: { x: 0.4, y: 7.1, w: 10, h: 0.3, fontSize: 9, color: PPT_THEME.muted, fontFace: PPT_FONT.body },
      },
    },
  ];

  if (options.logoDataUrl) {
    objects.unshift({
      image: { data: options.logoDataUrl, x: 0.4, y: 0.15, w: 1.4, h: 0.5, sizing: { type: "contain", w: 1.4, h: 0.5 } },
    });
  }

  pptx.defineSlideMaster({
    title: MASTER_NAME,
    background: { color: PPT_THEME.white },
    objects,
    slideNumber: { x: 12.9, y: 7.1, fontSize: 9, color: PPT_THEME.muted },
  });
}

function addSlideTitle(slide: PptxGenJS.Slide, title: string) {
  slide.addText(title, {
    x: 0.5, y: 0.35, w: 12.3, h: 0.8,
    fontSize: 28, bold: true, color: PPT_THEME.navy, fontFace: PPT_FONT.head,
  });
}

function addTitleSlide(pptx: PptxGenJS, bc: RoiBusinessCase, options: PresentationOptions) {
  const slide = pptx.addSlide({ masterName: MASTER_NAME });
  slide.addText("Business Case für Microsoft 365 Copilot", {
    x: 0.8, y: 2.1, w: 11.7, h: 1.2, fontSize: 40, bold: true, color: PPT_THEME.navy, fontFace: PPT_FONT.head, align: "left",
  });
  slide.addText(`Planungsrechnung für ${bc.inputs.companyName}`, {
    x: 0.8, y: 3.35, w: 11.7, h: 0.6, fontSize: 22, color: PPT_THEME.text, fontFace: PPT_FONT.body,
  });
  slide.addText(`${bc.inputs.users} geplante Nutzer  |  36-Monats-Betrachtung`, {
    x: 0.8, y: 4.0, w: 11.7, h: 0.5, fontSize: 16, color: PPT_THEME.muted, fontFace: PPT_FONT.body,
  });

  const metaLines = [
    options.initiativeTitle,
    options.presenterName,
    options.presentationDate,
  ].filter(Boolean) as string[];
  if (metaLines.length > 0) {
    slide.addText(metaLines.join("  ·  "), {
      x: 0.8, y: 4.7, w: 11.7, h: 0.5, fontSize: 13, color: PPT_THEME.muted, fontFace: PPT_FONT.body,
    });
  }
}

function addExecutiveSummarySlide(pptx: PptxGenJS, bc: RoiBusinessCase, copy: PresentationCopy) {
  const slide = pptx.addSlide({ masterName: MASTER_NAME });
  addSlideTitle(slide, "Executive Summary");

  const year1 = bc.realistic.years[0];
  const kpis: Array<{ label: string; value: string; color: string }> = [
    { label: "ROI Jahr 1", value: formatPercent(year1.roi), color: roiColor(year1.roi) },
    { label: "Netto-Nutzen 3 Jahre", value: formatEur(bc.realistic.netBenefitEur), color: PPT_THEME.navy },
    { label: "Break-even", value: formatBreakEven(bc.realistic.breakEvenMonth), color: PPT_THEME.navy },
    { label: "Trainingskosten/Nutzer (J1)", value: formatEur(bc.training.actualCostPerUserYear1Eur), color: PPT_THEME.navy },
  ];

  const boxW = 2.85;
  kpis.forEach((kpi, i) => {
    const x = 0.5 + i * (boxW + 0.15);
    slide.addShape("roundRect", { x, y: 1.4, w: boxW, h: 1.5, fill: { color: PPT_THEME.lightGray }, line: { color: PPT_THEME.lightGray } });
    slide.addText(kpi.value, { x, y: 1.55, w: boxW, h: 0.7, align: "center", fontSize: 24, bold: true, color: kpi.color, fontFace: PPT_FONT.head });
    slide.addText(kpi.label, { x, y: 2.25, w: boxW, h: 0.5, align: "center", fontSize: 12, color: PPT_THEME.muted, fontFace: PPT_FONT.body });
  });

  slide.addText(copy.executiveSummary, {
    x: 0.5, y: 3.3, w: 12.3, h: 2.6, fontSize: 16, color: PPT_THEME.text, fontFace: PPT_FONT.body, valign: "top",
  });

  slide.addNotes(buildSourcesNotes());
}

function addModelOverviewSlide(pptx: PptxGenJS, bc: RoiBusinessCase) {
  const slide = pptx.addSlide({ masterName: MASTER_NAME });
  addSlideTitle(slide, "Was in die Rechnung einfließt");

  const costBlocks = ["Lizenzen", "Training und Weiterbildung", "IT-Setup und Einführung", "Change und Adoption"];
  const benefitAssumptions = [
    "Alle geschulten Nutzer werden berücksichtigt",
    `${bc.realistic.targetHoursPerUserMonth} Stunden Zielwert im realistischen Szenario`,
    "Schneller Kompetenzsprung nach Trainingsbeginn",
    "Nur 50 % wirtschaftlich realisierter Kapazitätswert",
  ];

  slide.addText("Kostenblöcke", { x: 0.5, y: 1.3, w: 5.8, h: 0.4, fontSize: 18, bold: true, color: PPT_THEME.navy, fontFace: PPT_FONT.head });
  slide.addText(costBlocks.map((t) => `• ${t}`).join("\n"), {
    x: 0.5, y: 1.75, w: 5.8, h: 2.6, fontSize: 15, color: PPT_THEME.text, fontFace: PPT_FONT.body, lineSpacingMultiple: 1.4,
  });

  slide.addText("Nutzenannahmen", { x: 6.6, y: 1.3, w: 5.8, h: 0.4, fontSize: 18, bold: true, color: PPT_THEME.navy, fontFace: PPT_FONT.head });
  slide.addText(benefitAssumptions.map((t) => `• ${t}`).join("\n"), {
    x: 6.6, y: 1.75, w: 5.8, h: 2.6, fontSize: 15, color: PPT_THEME.text, fontFace: PPT_FONT.body, lineSpacingMultiple: 1.4,
  });
}

function addInvestmentSlide(pptx: PptxGenJS, bc: RoiBusinessCase) {
  const slide = pptx.addSlide({ masterName: MASTER_NAME });
  addSlideTitle(slide, "Investition über drei Jahre");

  const years = bc.realistic.years;
  const chartData: PptxGenJS.OptsChartData[] = [
    { name: "Lizenzen", labels: ["Jahr 1", "Jahr 2", "Jahr 3"], values: years.map((y) => Math.round(y.licenseCostEur)) },
    { name: "Training", labels: ["Jahr 1", "Jahr 2", "Jahr 3"], values: years.map((y) => Math.round(y.trainingCostEur)) },
    { name: "IT-Setup", labels: ["Jahr 1", "Jahr 2", "Jahr 3"], values: years.map((y) => Math.round(y.itSetupCostEur)) },
    { name: "Change & Adoption", labels: ["Jahr 1", "Jahr 2", "Jahr 3"], values: years.map((y) => Math.round(y.changeCostEur)) },
  ];

  slide.addChart("bar", chartData, {
    x: 0.5, y: 1.3, w: 8.2, h: 5.5,
    barGrouping: "stacked",
    chartColors: [PPT_THEME.primary, PPT_THEME.realistic, PPT_THEME.neutral, PPT_THEME.navy],
    showLegend: true, legendPos: "b",
    showValAxisTitle: false,
    valAxisLabelFormatCode: "#,##0",
    dataLabelColor: PPT_THEME.white,
  });

  slide.addText(`Gesamtkosten Jahr 1: ${formatEur(years[0].totalCostEur)}`, {
    x: 9.0, y: 1.5, w: 3.8, h: 0.5, fontSize: 15, bold: true, color: PPT_THEME.navy, fontFace: PPT_FONT.body,
  });
  slide.addText(`Gesamtkosten 3 Jahre: ${formatEur(bc.realistic.totalCostEur)}`, {
    x: 9.0, y: 2.0, w: 3.8, h: 0.5, fontSize: 15, bold: true, color: PPT_THEME.navy, fontFace: PPT_FONT.body,
  });
  slide.addText(buildDominantCostBlockCopy(bc), {
    x: 9.0, y: 2.7, w: 3.8, h: 2.5, fontSize: 13, color: PPT_THEME.text, fontFace: PPT_FONT.body, valign: "top",
  });
}

function addTrainingEconomicsSlide(pptx: PptxGenJS, bc: RoiBusinessCase) {
  const slide = pptx.addSlide({ masterName: MASTER_NAME });
  addSlideTitle(slide, "Training ist pro Person überschaubar");

  slide.addShape("roundRect", { x: 0.5, y: 1.4, w: 5.6, h: 2.2, fill: { color: PPT_THEME.lightOrange }, line: { color: PPT_THEME.lightOrange } });
  slide.addText("1.800 € Kick-off\n+ 4 × 800 € Lernreise\n= 5.000 € je Gruppe", {
    x: 0.7, y: 1.6, w: 5.2, h: 1.8, fontSize: 16, color: PPT_THEME.text, fontFace: PPT_FONT.body, valign: "middle", align: "center",
  });

  slide.addShape("roundRect", { x: 6.3, y: 1.4, w: 5.6, h: 2.2, fill: { color: PPT_THEME.lightBlue }, line: { color: PPT_THEME.lightBlue } });
  slide.addText("5.000 € / 12 Personen\n= 416,67 € pro Person", {
    x: 6.5, y: 1.6, w: 5.2, h: 1.8, fontSize: 16, color: PPT_THEME.text, fontFace: PPT_FONT.body, valign: "middle", align: "center",
  });

  slide.addText(buildTrainingCopy(bc), {
    x: 0.5, y: 3.9, w: 11.4, h: 1.4, fontSize: 15, color: PPT_THEME.text, fontFace: PPT_FONT.body, valign: "top",
  });
  slide.addText("Für Jahr 2 und 3 sind jeweils 50 % des Trainingsbudgets aus Jahr 1 als fortlaufende Weiterbildung vorgesehen.", {
    x: 0.5, y: 5.4, w: 11.4, h: 0.8, fontSize: 13, italic: true, color: PPT_THEME.muted, fontFace: PPT_FONT.body,
  });
}

function addBenefitLogicSlide(pptx: PptxGenJS, bc: RoiBusinessCase) {
  const slide = pptx.addSlide({ masterName: MASTER_NAME });
  addSlideTitle(slide, "Wie aus Zeitersparnis Nutzen wird");

  slide.addText("Nutzer  ×  Zeitersparnis je Person  ×  Vollkosten-Stundensatz  ×  50 % wirtschaftliche Realisierung  =  realisierter Nutzen", {
    x: 0.5, y: 1.5, w: 12.3, h: 0.9, fontSize: 16, bold: true, color: PPT_THEME.navy, fontFace: PPT_FONT.body, align: "center",
  });

  slide.addText(buildBenefitLogicCopy(bc), {
    x: 0.5, y: 2.7, w: 12.3, h: 1.8, fontSize: 15, color: PPT_THEME.text, fontFace: PPT_FONT.body, valign: "top",
  });

  slide.addText(AGENTIC_POTENTIAL_COPY, {
    x: 0.5, y: 4.7, w: 12.3, h: 1.4, fontSize: 13, italic: true, color: PPT_THEME.muted, fontFace: PPT_FONT.body, valign: "top",
  });
}

function addScenarioComparisonSlide(pptx: PptxGenJS, bc: RoiBusinessCase) {
  const slide = pptx.addSlide({ masterName: MASTER_NAME });
  addSlideTitle(slide, "Zwei plausible Szenarien");

  const headerRow: PptxGenJS.TableRow = [
    { text: "", options: { fill: { color: PPT_THEME.lightGray } } },
    { text: "Realistisch", options: { bold: true, fill: { color: PPT_THEME.lightOrange }, align: "center" } },
    { text: "Studiennah", options: { bold: true, fill: { color: PPT_THEME.lightBlue }, align: "center" } },
  ];

  const dataRows: string[][] = [
    ["Geschulte Nutzer", "alle", "alle"],
    ["Ziel-Zeitersparnis", `${bc.realistic.targetHoursPerUserMonth} Std./Monat`, `${bc.studyNear.targetHoursPerUserMonth} Std./Monat`],
    ["Wirtschaftlich realisierbar", "50 %", "50 %"],
    ["Nutzen Jahr 1", formatEur(bc.realistic.years[0].realizedBenefitEur), formatEur(bc.studyNear.years[0].realizedBenefitEur)],
    ["ROI Jahr 1", formatPercent(bc.realistic.years[0].roi), formatPercent(bc.studyNear.years[0].roi)],
    ["ROI 3 Jahre", formatPercent(bc.realistic.roi), formatPercent(bc.studyNear.roi)],
  ];

  const rows: PptxGenJS.TableRow[] = [
    headerRow,
    ...dataRows.map((row, i): PptxGenJS.TableRow =>
      row.map((cell, ci) => ({
        text: cell,
        options: {
          align: ci === 0 ? "left" : "center",
          fontSize: 14,
          color: PPT_THEME.text,
          fill: { color: i % 2 === 0 ? PPT_THEME.white : PPT_THEME.lightGray },
        },
      }))
    ),
  ];

  slide.addTable(rows, {
    x: 0.7, y: 1.4, w: 11.9, h: 3.6,
    fontFace: PPT_FONT.body, border: { type: "solid", color: "DDDDDD", pt: 0.5 },
    colW: [4.3, 3.8, 3.8],
  });

  slide.addText(
    "Die Szenarien unterscheiden sich nicht durch eine künstliche Adoption-Quote. Für alle geschulten Nutzer wird eine durchschnittliche Zeitersparnis angesetzt.",
    { x: 0.7, y: 5.3, w: 11.9, h: 0.9, fontSize: 13, italic: true, color: PPT_THEME.muted, fontFace: PPT_FONT.body }
  );
}

function addTimelineSlide(pptx: PptxGenJS, bc: RoiBusinessCase) {
  const slide = pptx.addSlide({ masterName: MASTER_NAME });
  addSlideTitle(slide, "Wirtschaftliche Entwicklung über 36 Monate");

  const months = bc.realistic.months;
  const labels = months.map((m) => `M${m.month}`);
  const chartData: PptxGenJS.OptsChartData[] = [
    { name: "Kumulierter Nutzen", labels, values: months.map((m) => Math.round(m.cumulativeBenefitEur)) },
    { name: "Kumulierte Kosten", labels, values: months.map((m) => Math.round(m.cumulativeCostEur)) },
    { name: "Kumulierter Netto-Nutzen", labels, values: months.map((m) => Math.round(m.cumulativeNetBenefitEur)) },
  ];

  slide.addChart("line", chartData, {
    x: 0.4, y: 1.3, w: 12.5, h: 4.9,
    chartColors: [PPT_THEME.positive, PPT_THEME.negative, PPT_THEME.navy],
    showLegend: true, legendPos: "b",
    lineSize: 2.5, lineDataSymbol: "none",
    catAxisLabelRotate: 45,
    valAxisLabelFormatCode: "#,##0",
  });

  const breakEvenText = bc.realistic.breakEvenMonth
    ? `Break-even im realistischen Szenario: Monat ${bc.realistic.breakEvenMonth}.`
    : "Innerhalb von 36 Monaten wird im realistischen Szenario kein Break-even erreicht.";

  slide.addText(
    `${breakEvenText} Die Rechnung bildet eine heute belegbare Assistenz-Baseline ab; zusätzlicher Nutzen aus besseren Modellen, neuen Werkzeugen, tieferer Prozessintegration und agentischen Abläufen ist nicht eingepreist.`,
    { x: 0.4, y: 6.35, w: 12.5, h: 0.8, fontSize: 11, italic: true, color: PPT_THEME.muted, fontFace: PPT_FONT.body }
  );
}

function addRealizationConditionsSlide(pptx: PptxGenJS, copy: PresentationCopy) {
  const slide = pptx.addSlide({ masterName: MASTER_NAME });
  addSlideTitle(slide, "Voraussetzungen für die Realisierung");

  slide.addText(copy.conditions.map((c) => `• ${c}`).join("\n\n"), {
    x: 0.5, y: 1.5, w: 12.3, h: 2.6, fontSize: 17, color: PPT_THEME.text, fontFace: PPT_FONT.body, lineSpacingMultiple: 1.3,
  });

  const measures = [
    "Aktive Nutzung und Wiederholungsnutzung",
    "Zeitersparnis in ausgewählten Aufgaben",
    "Qualitäts- oder Durchlaufzeitverbesserung",
    "Teilnahme und Transfer aus den Trainings",
  ];
  slide.addText("Messgrößen", { x: 0.5, y: 4.4, w: 12.3, h: 0.4, fontSize: 16, bold: true, color: PPT_THEME.navy, fontFace: PPT_FONT.head });
  slide.addText(measures.map((m) => `• ${m}`).join("\n"), {
    x: 0.5, y: 4.85, w: 12.3, h: 1.9, fontSize: 14, color: PPT_THEME.text, fontFace: PPT_FONT.body, lineSpacingMultiple: 1.3,
  });
}

function addDecisionSlide(pptx: PptxGenJS, bc: RoiBusinessCase, copy: PresentationCopy) {
  const slide = pptx.addSlide({ masterName: MASTER_NAME });
  addSlideTitle(slide, "Entscheidungsvorlage");

  const lines = [
    `Beantragter Umfang: ${bc.inputs.users} Nutzer`,
    `Investition Jahr 1: ${formatEur(bc.realistic.years[0].totalCostEur)}`,
    `Erwarteter realisierter Nutzen Jahr 1: ${formatEur(bc.realistic.years[0].realizedBenefitEur)}`,
    `Erwarteter Break-even: ${formatBreakEven(bc.realistic.breakEvenMonth)}`,
  ];
  slide.addText(lines.map((l) => `• ${l}`).join("\n"), {
    x: 0.5, y: 1.4, w: 12.3, h: 1.8, fontSize: 17, color: PPT_THEME.text, fontFace: PPT_FONT.body, lineSpacingMultiple: 1.3,
  });

  slide.addText(copy.decisionRecommendation, {
    x: 0.5, y: 3.3, w: 12.3, h: 1.4, fontSize: 15, color: PPT_THEME.text, fontFace: PPT_FONT.body, valign: "top",
  });

  slide.addText("Business Case und Einführungskonzept mit der Copilotenschule prüfen", {
    x: 0.5, y: 5.0, w: 8.5, h: 0.6, fontSize: 16, bold: true, color: PPT_THEME.white, fill: { color: PPT_THEME.primary },
    align: "center", valign: "middle", fontFace: PPT_FONT.body,
    hyperlink: { url: "https://copilotenschule.de/kontakt" },
  });
}

function addSourcesSlide(pptx: PptxGenJS) {
  const slide = pptx.addSlide({ masterName: MASTER_NAME });
  addSlideTitle(slide, "Methodik und Quellen");

  slide.addText(
    "Kurzformeln: realisierter Nutzen = Nutzer × Zeitersparnis × Stundensatz × 50 %. Feste Annahmen: 8/9 Std. Zielwert, 12 % Change & Adoption, degressives IT-Setup. Planungsrechnung, kein Wirkungsversprechen. Assistenz-Baseline, agentisches Zusatzpotenzial nicht eingerechnet.",
    { x: 0.5, y: 1.3, w: 12.3, h: 1.4, fontSize: 13, color: PPT_THEME.text, fontFace: PPT_FONT.body, valign: "top" }
  );

  const rows: PptxGenJS.TableRow[] = ROI_SOURCES.map((s) => [
    { text: s.label, options: { fontSize: 12, color: PPT_THEME.text } },
    { text: s.url, options: { fontSize: 11, color: PPT_THEME.primary, hyperlink: { url: s.url } } },
  ]);
  slide.addTable(rows, {
    x: 0.5, y: 2.9, w: 12.3, h: 3.6,
    fontFace: PPT_FONT.body, border: { type: "solid", color: "DDDDDD", pt: 0.5 }, colW: [5.5, 6.8],
  });

  slide.addText(`Version der Annahmen: ${ASSUMPTIONS_VERSION}`, {
    x: 0.5, y: 6.7, w: 6, h: 0.4, fontSize: 10, color: PPT_THEME.muted, fontFace: PPT_FONT.body,
  });
}

import { ROI_ASSUMPTIONS } from "@/lib/roi/assumptions";
import type { RoiBusinessCase } from "@/lib/roi/types";

/**
 * Erzeugt die Kunden-Excel aus der Vorlage "Copilot-ROI-Rechner-plausibel.xlsx".
 *
 * Grundsatz: Das Formelmodell der Vorlage bleibt erhalten und rechnet in Excel selbst.
 * Wir schreiben nur die Eingaben und passen die Formeln an, die sich durch das
 * Zwei-Gruppen-Modell geändert haben. So kann der Kunde in der Datei weiterrechnen,
 * statt eingefrorene Werte zu sehen.
 *
 * Angepasst gegenüber der Original-Vorlage:
 *   1. Neuer Eingabeblock: M365-Nutzer und Lizenznutzer direkt untereinander.
 *   2. Nutzen (Spalten K und L in "5. Berechnung"): Lizenznutzer mit vollem Zielwert,
 *      Chat-Nutzer nur mit chatOnlyTargetHoursPerMonth.
 *   3. IT-Setup (Spalte F): skaliert über alle M365-Nutzer, nicht nur die Lizenzen.
 *   4. Training (Spalte E): zusätzliche Kick-off-Gruppen für die Chat-Nutzer.
 *
 * Ohne diese Anpassungen würden PowerPoint und Excel unterschiedliche Zahlen zeigen —
 * beide Dateien gehen aber gemeinsam an denselben Empfänger.
 */

const TEMPLATE_URL = "/downloads/Copilot-ROI-Rechner-Vorlage.xlsx";

const SHEET_INPUTS = "xl/worksheets/sheet1.xml";
const SHEET_CALC = "xl/worksheets/sheet5.xml";

/** Alle Blätter, die auf "1. Eingaben" verweisen und deshalb mitgedreht werden müssen. */
const SHEETS_WITH_REFS = [
  "xl/worksheets/sheet2.xml",
  "xl/worksheets/sheet3.xml",
  "xl/worksheets/sheet4.xml",
  "xl/worksheets/sheet5.xml",
  "xl/worksheets/sheet6.xml",
];

export async function createRoiWorkbook(bc: RoiBusinessCase): Promise<{ blob: Blob; fileName: string }> {
  const [{ default: JSZip }, response] = await Promise.all([
    import("jszip"),
    fetch(TEMPLATE_URL),
  ]);
  if (!response.ok) {
    throw new Error("Die Excel-Vorlage konnte nicht geladen werden.");
  }

  const zip = await JSZip.loadAsync(await response.arrayBuffer());

  const inputsXml = await zip.file(SHEET_INPUTS)!.async("string");
  zip.file(SHEET_INPUTS, rebuildInputSheet(inputsXml, bc));

  // Reihenfolge wichtig: patchCalcSheet arbeitet noch mit den Original-Bezügen
  // (B8 = Lizenznutzer, B11 = M365). Erst danach wird rotiert.
  for (const name of SHEETS_WITH_REFS) {
    const file = zip.file(name);
    if (!file) continue;
    let xml = await file.async("string");
    if (name === SHEET_CALC) xml = patchCalcSheet(xml);
    zip.file(name, dropCachedValues(rotateInputRefs(retuneItLadder(relabel(xml)))));
  }

  const workbookXml = await zip.file("xl/workbook.xml")!.async("string");
  zip.file("xl/workbook.xml", forceRecalcOnLoad(workbookXml));

  const blob = await zip.generateAsync({
    type: "blob",
    mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    compression: "DEFLATE",
  });

  return { blob, fileName: buildWorkbookFileName(bc.inputs.companyName) };
}

/**
 * Schreibt den Eingabeblock neu.
 *
 * Die Vorlage kannte nur eine Nutzerzahl. Jetzt stehen beide Gruppen direkt untereinander,
 * zuerst die Gesamtzahl der Microsoft-365-Nutzer, darunter die Teilmenge mit kostenpflichtiger
 * Copilot-Lizenz — sonst liest sich die Datei so, als bekämen alle eine Lizenz.
 *
 * Dadurch rutschen Stundensatz und Lizenzpreis je eine Zeile nach unten. Alle Bezüge in den
 * übrigen Blättern werden anschließend von rotateInputRefs() mitgedreht.
 *
 * Zeilenbelegung neu: 7 Firma · 8 M365-Nutzer · 9 Lizenznutzer · 10 Stundensatz · 11 Lizenzpreis
 */
function rebuildInputSheet(xml: string, bc: RoiBusinessCase): string {
  const { companyName, users, m365Users, hourlyCostEur, licensePerUserMonthEur } = bc.inputs;

  const rows =
    inputRow(8, "Microsoft-365-Nutzer insgesamt", m365Users, 23, "Personen",
      "Alle Beschäftigten mit Microsoft 365. Sie nutzen Copilot Chat ohne Zusatzkosten.") +
    inputRow(9, "Davon mit Microsoft-365-Copilot-Lizenz", users, 23, "Personen",
      "Teilmenge mit kostenpflichtiger Lizenz und vollständiger Lernreise.") +
    inputRow(10, "Vollkosten-Stundensatz", hourlyCostEur, 24, "€/Stunde",
      "Personalkosten inkl. Lohnnebenkosten und Gemeinkosten") +
    inputRow(11, "Copilot-Lizenzpreis", licensePerUserMonthEur, 24, "€/Nutzer/Monat",
      "Aktuellen Vertragspreis eintragen");

  let out = xml.replace(/<x:row r="8">.*?<x:row r="12"/s, `${rows}<x:row r="12"`);
  out = setInlineString(out, "B7", companyName);

  // Aus vier Eingaben sind fünf geworden.
  out = out.replace(/vier gelben Felder/g, "fünf gelben Felder").replace(/IHRE VIER ANGABEN/g, "IHRE FÜNF ANGABEN");

  // Gültigkeitsprüfungen an die verschobenen Zeilen anpassen.
  out = out.replace('sqref="B8"', 'sqref="B8:B9"').replace('sqref="B9:B10"', 'sqref="B10:B11"');

  return out;
}

/** Baut eine komplette Eingabezeile im Stil der Vorlage. */
function inputRow(r: number, label: string, value: number, valueStyle: number, unit: string, purpose: string): string {
  return (
    `<x:row r="${r}">` +
    `<x:c r="A${r}" s="20" t="str"><x:v>${escapeXml(label)}</x:v></x:c>` +
    `<x:c r="B${r}" s="${valueStyle}" t="n"><x:v>${value}</x:v></x:c>` +
    `<x:c r="C${r}" s="20" t="str"><x:v>${escapeXml(unit)}</x:v></x:c>` +
    `<x:c r="D${r}" s="20" t="str"><x:v>${escapeXml(purpose)}</x:v></x:c>` +
    `</x:row>`
  );
}

/**
 * Dreht die Bezüge auf "1. Eingaben" um eine Zeile weiter: 8→9, 9→10, 10→11, 11→8.
 *
 * Es ist ein Ringtausch, deshalb der Umweg über Platzhalter — sonst würde ein bereits
 * ersetzter Bezug in einem späteren Durchlauf ein zweites Mal verschoben. Nur qualifizierte
 * Bezüge werden angefasst; ein blankes "B8" in einem anderen Blatt meint dort etwas anderes.
 */
function rotateInputRefs(xml: string): string {
  const rotation: Record<string, string> = { "8": "9", "9": "10", "10": "11", "11": "8" };

  return xml.replace(
    /('1\. Eingaben'!)(\$?)B(\$?)(8|9|10|11)(?![0-9])/g,
    (_m, prefix: string, d1: string, d2: string, row: string) => `${prefix}${d1}B${d2}${rotation[row]}`
  );
}

/** Schreibt einen Text als Inline-String (unabhängig von sharedStrings.xml). */
function setInlineString(xml: string, ref: string, value: string): string {
  const pattern = new RegExp(`(<x:c r="${ref}")([^>]*?)(\\s*/>|>.*?</x:c>)`, "s");
  return xml.replace(pattern, (_m, open: string, attrs: string) => {
    const cleaned = attrs.replace(/\s+t="[^"]*"/, "");
    return `${open}${cleaned} t="inlineStr"><x:is><x:t>${escapeXml(value)}</x:t></x:is></x:c>`;
  });
}

/**
 * Passt die Nutzen-, IT- und Trainingsformeln der 36 Monatszeilen an das
 * Zwei-Gruppen-Modell an.
 */
function patchCalcSheet(xml: string): string {
  const chatTarget = ROI_ASSUMPTIONS.chatOnlyTargetHoursPerMonth;
  const chatUsers = `MAX('1. Eingaben'!$B$11-'1. Eingaben'!$B$8,0)`;
  const licensed = `'1. Eingaben'!$B$8`;
  const total = `'1. Eingaben'!$B$11`;

  let out = xml;

  // --- Nutzen: Lizenznutzer voll, Chat-Nutzer anteilig -------------------------
  // Die Anlaufkurve ist identisch, nur der Zielwert unterscheidet sich. Deshalb genügt
  // der Faktor chatTarget/Zielwert auf dieselbe Stundenspalte.
  out = out.replace(
    /<x:f>C(\d+)\*I\1\*'4\. Szenarien'!D6\*'1\. Eingaben'!B9<\/x:f>/g,
    (_m, row: string) =>
      `<x:f>(${licensed}+${chatUsers}*${chatTarget}/'4. Szenarien'!$B$6)*I${row}` +
      `*'4. Szenarien'!D6*'1. Eingaben'!B9</x:f>`
  );
  out = out.replace(
    /<x:f>C(\d+)\*J\1\*'4\. Szenarien'!D7\*'1\. Eingaben'!B9<\/x:f>/g,
    (_m, row: string) =>
      `<x:f>(${licensed}+${chatUsers}*${chatTarget}/'4. Szenarien'!$B$7)*J${row}` +
      `*'4. Szenarien'!D7*'1. Eingaben'!B9</x:f>`
  );

  // --- IT-Setup: neue Staffel mit Freigrenze, Basis sind alle M365-Nutzer ------
  // Bewusst über die Parameterzellen in "6. Quellen & Methodik" statt über feste Zahlen:
  // so bleibt die Staffel in der Datei sichtbar und der Kunde kann sie nachvollziehen.
  out = out.replace(
    /<x:f>IF\(A(\d+)=1,'6\. Quellen &amp; Methodik'!B16\+MIN\(C\1,50\).*?<\/x:f>/g,
    (_m, row: string) => `<x:f>IF(A${row}=1,${itLadderFormula(total)},0)</x:f>`
  );

  // --- Training: zusätzliche Kick-off-Gruppen für Chat-Nutzer ------------------
  // Chat-Nutzer erhalten nur den Kick-off (B31), keine Lernreise und kein Folgejahr.
  out = out.replace(
    /<x:f>IF\(A(\d+)=1,INT\(\('1\. Eingaben'!B8/g,
    (_m, row: string) =>
      `<x:f>IF(A${row}=1,INT((${chatUsers}+'6. Quellen &amp; Methodik'!B33-1)` +
      `/'6. Quellen &amp; Methodik'!B33)*'6. Quellen &amp; Methodik'!B31` +
      `+INT(('1. Eingaben'!B8`
  );

  return out;
}

/**
 * Entfernt die in der Vorlage gespeicherten Ergebniswerte aller Formelzellen.
 *
 * Ohne das zeigen Programme, die fullCalcOnLoad ignorieren (LibreOffice zum Beispiel
 * rechnet Excel-Dateien standardmäßig nicht neu), weiterhin die Zahlen des
 * Beispielunternehmens mit 300 Nutzern — obwohl in den Eingaben etwas anderes steht.
 * Fehlt der Wert, muss jedes Programm rechnen.
 */
function dropCachedValues(xml: string): string {
  return xml.replace(/(<\/x:f>)<x:v>[^<]*<\/x:v>/g, "$1");
}

/** Verweis auf das Quellenblatt – dort stehen die Staffelparameter. */
const Q = "'6. Quellen &amp; Methodik'";

/**
 * Die IT-Staffel als Excel-Formel über eine beliebige Nutzerbasis.
 * Freigrenze (B16) und Grenzkosten je Stufe (B17–B20) kommen aus dem Quellenblatt.
 */
function itLadderFormula(base: string): string {
  const a = ROI_ASSUMPTIONS;
  return (
    `MAX(MIN(${base},${a.itTier1MaxUsers})-${Q}!$B$16,0)*${Q}!$B$17` +
    `+MAX(MIN(${base}-${a.itTier1MaxUsers},${a.itTier2MaxUsers - a.itTier1MaxUsers}),0)*${Q}!$B$18` +
    `+MAX(MIN(${base}-${a.itTier2MaxUsers},${a.itTier3MaxUsers - a.itTier2MaxUsers}),0)*${Q}!$B$19` +
    `+MAX(${base}-${a.itTier3MaxUsers},0)*${Q}!$B$20`
  );
}

/**
 * Schreibt die Staffelparameter im Quellenblatt auf das aktuelle Modell um und zieht die
 * Beispielrechnung in der Executive Summary nach.
 *
 * Die Vorlage kannte eine Grundpauschale von 2.500 € ab der ersten Person. Jetzt gilt eine
 * Freigrenze: bis 15 Personen erledigt die IT die Vorbereitung ohne eigenes Projekt.
 * Zelle B16 trägt deshalb nicht mehr einen Betrag, sondern die Freigrenze selbst.
 */
function retuneItLadder(xml: string): string {
  const a = ROI_ASSUMPTIONS;
  let out = xml;

  out = setCellNumber(out, "B16", a.itFreeUpToUsers);
  out = setCellNumber(out, "B17", a.itTier1PerUserEur);
  out = setCellNumber(out, "B18", a.itTier2PerUserEur);
  out = setCellNumber(out, "B19", a.itTier3PerUserEur);
  out = setCellNumber(out, "B20", a.itTier4PerUserEur);

  // Beispielrechnung in der Executive Summary (Spalte E, Zeilen 24–27).
  out = out.replace(
    /<x:f>'6\. Quellen &amp; Methodik'!B16\+MIN\((D\d+),50\).*?<\/x:f>/g,
    (_m, base: string) => `<x:f>${itLadderFormula(base)}</x:f>`
  );

  return out;
}

/** Setzt eine Zahl in eine Zelle, ohne den Zellstil anzutasten. */
function setCellNumber(xml: string, ref: string, value: number): string {
  const pattern = new RegExp(`(<x:c r="${ref}"[^>]*>)<x:v>[^<]*</x:v></x:c>`);
  return xml.replace(pattern, (_m, open: string) => `${open}<x:v>${value}</x:v></x:c>`);
}

/**
 * Textstellen, die durch das Zwei-Gruppen-Modell und die neue IT-Staffel falsch geworden
 * wären. Nicht gefundene Texte werden stillschweigend übergangen — die Vorlage darf sich
 * ändern, ohne dass die Erzeugung bricht.
 */
const TEXT_REPLACEMENTS: Array<[string, string]> = [
  ["Geplante Copilot-Nutzer", "Nutzer mit Copilot-Lizenz"],
  ["Geschulte Nutzer", "Nutzer mit Copilot-Lizenz"],
  [
    "Alle Nutzer × durchschnittliche Zeitersparnis je Person",
    "Lizenz-Nutzer × voller Zielwert + übrige Microsoft-365-Nutzer × 2,5 Std. (nur Copilot Chat)",
  ],
  [
    "2.500 € Grundaufwand + degressive Nutzerstaffel; nur Jahr 1",
    "Bis 15 Nutzer kein Aufwand, darüber degressive Staffel über alle Microsoft-365-Nutzer; nur Jahr 1",
  ],
  ["Grundaufwand", "Freigrenze"],
  ["jede Einführung", "Nutzer 1–15"],
  [
    "Tenant-Prüfung, Grundkonzept, Koordination",
    "Bis zu dieser Größe erledigt die IT die Vorbereitung ohne eigenes Projekt",
  ],
  ["Nutzer 1–50", "Nutzer 16–50"],
  [
    "Die Größenstaffel berücksichtigt einen festen Grundaufwand und sinkende Grenzkosten je zusätzlichem Nutzer. Dadurch nimmt der IT-Aufwand insgesamt zu, während die Kosten pro Nutzer mit der Unternehmensgröße sinken.",
    "Bis 15 Nutzer entsteht kein eigener IT-Aufwand. Darüber sinken die Grenzkosten je zusätzlichem Nutzer, sodass der Gesamtaufwand steigt, der Aufwand pro Nutzer aber deutlich fällt.",
  ],
  [
    "Alle geschulten Personen werden berücksichtigt.",
    "Berücksichtigt sind beide Gruppen: Lizenz-Nutzer mit dem vollen Zielwert, übrige Microsoft-365-Nutzer mit 2,5 Std. aus Copilot Chat.",
  ],
  ["Alle geschulten Personen zählen", "Beide Nutzergruppen zählen"],
  [
    "Die Zeitersparnis gilt je Person – sie ist keine Quote aktiver Personen.",
    "Die Zeitersparnis gilt je Person – sie ist keine Quote aktiver Personen. Lizenz- und Chat-Nutzer werden getrennt gerechnet.",
  ],
  ["<x:v>1. Eingaben!B8</x:v>", "<x:v>1. Eingaben!B9</x:v>"],
];

function relabel(xml: string): string {
  let out = xml;
  for (const [from, to] of TEXT_REPLACEMENTS) {
    out = out.split(from).join(to);
  }
  return out;
}

/** Sorgt dafür, dass Excel beim Öffnen alles neu berechnet. */
function forceRecalcOnLoad(xml: string): string {
  if (xml.includes("<x:calcPr")) {
    return xml.replace(/<x:calcPr[^>]*\/>/, '<x:calcPr calcId="0" fullCalcOnLoad="1"/>');
  }
  return xml.replace("</x:workbook>", '<x:calcPr calcId="0" fullCalcOnLoad="1"/></x:workbook>');
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildWorkbookFileName(companyName: string, date = new Date()): string {
  const slug = (companyName || "Unternehmen")
    .replace(/[äöüÄÖÜß]/g, (c) => ({ ä: "ae", ö: "oe", ü: "ue", Ä: "Ae", Ö: "Oe", Ü: "Ue", ß: "ss" }[c] ?? c))
    .replace(/[^A-Za-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50) || "Unternehmen";
  return `Copilot-ROI-Rechner-${slug}-${date.toISOString().slice(0, 10)}.xlsx`;
}

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
 *   1. Neue Eingabezelle B11 = Microsoft-365-Nutzer gesamt.
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

/** Zellbezüge der Eingaben in "1. Eingaben". */
const CELL = {
  company: "B7",
  licensedUsers: "B8",
  hourlyCost: "B9",
  licensePrice: "B10",
  m365Users: "B11",
} as const;

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
  zip.file(SHEET_INPUTS, patchInputSheet(inputsXml, bc));

  const calcXml = await zip.file(SHEET_CALC)!.async("string");
  zip.file(SHEET_CALC, patchCalcSheet(calcXml));

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
 * Trägt die Eingaben ein und ergänzt Zeile 11 (Microsoft-365-Nutzer).
 * Zahlen werden als echte Zahlen geschrieben, der Firmenname als Inline-String —
 * damit muss die sharedStrings-Tabelle nicht angefasst werden.
 */
function patchInputSheet(xml: string, bc: RoiBusinessCase): string {
  const { companyName, users, m365Users, hourlyCostEur, licensePerUserMonthEur } = bc.inputs;

  let out = setNumber(xml, CELL.licensedUsers, users);
  out = setNumber(out, CELL.hourlyCost, hourlyCostEur);
  out = setNumber(out, CELL.licensePrice, licensePerUserMonthEur);
  out = setInlineString(out, CELL.company, companyName);
  out = insertM365Row(out, m365Users);
  return out;
}

/** Ersetzt den Wert einer Zelle durch eine Zahl und entfernt eine etwaige Formel. */
function setNumber(xml: string, ref: string, value: number): string {
  const pattern = new RegExp(`(<x:c r="${ref}"[^>]*?)(\\s*/>|>.*?</x:c>)`, "s");
  return xml.replace(pattern, (_m, open: string) => {
    // t="s" (sharedString) muss weg, sonst interpretiert Excel die Zahl als String-Index.
    const cleaned = open.replace(/\s+t="[^"]*"/, "");
    return `${cleaned}><x:v>${value}</x:v></x:c>`;
  });
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
 * Fügt Zeile 11 mit der Gesamtzahl der Microsoft-365-Nutzer ein.
 * Zeile 11 ist in der Vorlage frei (belegt sind 1, 3, 5–10, 12–14), deshalb muss nichts
 * verschoben werden und alle bestehenden Bezüge bleiben gültig.
 */
function insertM365Row(xml: string, m365Users: number): string {
  if (xml.includes('<x:row r="11"')) {
    return setNumber(xml, CELL.m365Users, m365Users);
  }
  const row =
    `<x:row r="11">` +
    inlineCell("A11", "Microsoft-365-Nutzer gesamt") +
    `<x:c r="B11"><x:v>${m365Users}</x:v></x:c>` +
    inlineCell("C11", "Personen") +
    inlineCell("D11", "Basis der Zeitersparnis: auch Nutzer ohne Lizenz arbeiten mit Copilot Chat") +
    `</x:row>`;

  // Direkt vor Zeile 12 einhängen, damit die Reihenfolge im XML aufsteigend bleibt.
  return xml.replace('<x:row r="12"', `${row}<x:row r="12"`);
}

function inlineCell(ref: string, text: string): string {
  return `<x:c r="${ref}" t="inlineStr"><x:is><x:t>${escapeXml(text)}</x:t></x:is></x:c>`;
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

  // --- IT-Setup: skaliert über alle M365-Nutzer -------------------------------
  out = out.replace(
    /(<x:f>IF\(A(\d+)=1,'6\. Quellen &amp; Methodik'!B16\+MIN\()C\2(,50\).*?<\/x:f>)/g,
    (match) => match.replace(/\bC\d+\b/g, total)
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

  // Zwischengespeicherte Werte entfernen, damit Excel nicht kurz veraltete Zahlen zeigt.
  out = out.replace(/(<\/x:f>)<x:v>[^<]*<\/x:v>/g, "$1");

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

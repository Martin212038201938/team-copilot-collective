import { describe, it, expect, beforeAll, vi } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import JSZip from "jszip";
import { createRoiWorkbook, buildWorkbookFileName } from "../createRoiWorkbook";
import { calculateRoiBusinessCase } from "@/lib/roi/calculate";

/**
 * Prüft die tatsächlich erzeugte Datei, nicht nur die Transformationslogik:
 * Die echte Vorlage aus public/downloads wird geladen, umgeschrieben und wieder
 * ausgepackt. So fallen kaputte Formeln oder verlorene Zellen sofort auf.
 */
const templatePath = resolve(__dirname, "../../../../public/downloads/Copilot-ROI-Rechner-Vorlage.xlsx");

const bc = calculateRoiBusinessCase({
  companyName: "Yellow Boat Testfirma GmbH",
  users: 5,
  m365Users: 25,
  hourlyCostEur: 60.4,
  licensePerUserMonthEur: 26,
});

let zip: JSZip;
let inputs: string;
let calc: string;

beforeAll(async () => {
  const buffer = readFileSync(templatePath);
  vi.stubGlobal("fetch", async () =>
    ({ ok: true, arrayBuffer: async () => buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength) })
  );

  const { blob } = await createRoiWorkbook(bc);
  zip = await JSZip.loadAsync(await blob.arrayBuffer());
  inputs = await zip.file("xl/worksheets/sheet1.xml")!.async("string");
  calc = await zip.file("xl/worksheets/sheet5.xml")!.async("string");
});

describe("Kunden-Excel aus der Vorlage", () => {
  it("bleibt eine gültige Arbeitsmappe mit allen sechs Blättern", async () => {
    for (let i = 1; i <= 6; i++) {
      expect(zip.file(`xl/worksheets/sheet${i}.xml`), `sheet${i}`).not.toBeNull();
    }
    expect(zip.file("xl/workbook.xml")).not.toBeNull();
  });

  it("trägt die fünf Eingaben des Kunden ein", () => {
    expect(inputs).toContain("Yellow Boat Testfirma GmbH");
    expect(inputs).toMatch(/<x:c r="B8"[^>]*><x:v>25<\/x:v>/);   // M365-Nutzer
    expect(inputs).toMatch(/<x:c r="B9"[^>]*><x:v>5<\/x:v>/);    // davon lizenziert
    expect(inputs).toMatch(/<x:c r="B10"[^>]*><x:v>60\.4<\/x:v>/);
    expect(inputs).toMatch(/<x:c r="B11"[^>]*><x:v>26<\/x:v>/);
  });

  it("stellt die M365-Nutzer über die Lizenznutzer", () => {
    const posM365 = inputs.indexOf("Microsoft-365-Nutzer insgesamt");
    const posLic = inputs.indexOf("Davon mit Microsoft-365-Copilot-Lizenz");
    expect(posM365).toBeGreaterThan(-1);
    expect(posLic).toBeGreaterThan(posM365);
  });

  it("zieht die Gültigkeitsprüfungen mit", () => {
    expect(inputs).toContain('sqref="B8:B9"');
    expect(inputs).toContain('sqref="B10:B11"');
    expect(inputs).toContain("fünf gelben Felder");
  });

  it("überschreibt keine bestehenden Zeilen", () => {
    for (const r of [1, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]) {
      expect(inputs, `Zeile ${r}`).toContain(`<x:row r="${r}"`);
    }
  });

  it("rechnet den Nutzen mit getrennten Zielwerten für Lizenz- und Chat-Nutzer", () => {
    // Alte Formel darf nicht mehr vorkommen ...
    expect(calc).not.toMatch(/<x:f>C\d+\*I\d+\*'4\. Szenarien'!D6/);
    // ... und die neue muss die Chat-Gruppe enthalten.
    // Nach der Rotation: B8 = M365 gesamt, B9 = Lizenznutzer.
    expect(calc).toContain("MAX('1. Eingaben'!$B$8-'1. Eingaben'!$B$9,0)*2.5/'4. Szenarien'!$B$6");
    const patched = calc.match(/\(&apos;1\. Eingaben&apos;|\('1\. Eingaben'!\$B\$9\+MAX/g) ?? [];
    expect(patched.length).toBeGreaterThanOrEqual(36);
  });

  it("setzt die neue IT-Staffel mit Freigrenze ein", async () => {
    // Keine Grundpauschale mehr, Freigrenze bis 15 Personen, Basis sind alle M365-Nutzer.
    expect(calc).toContain("MAX(MIN('1. Eingaben'!$B$8,50)-'6. Quellen &amp; Methodik'!$B$16,0)");
    expect(calc).not.toContain("'6. Quellen &amp; Methodik'!B16+MIN(");

    // Die Staffelparameter selbst müssen zum Modell passen.
    const sources = await zip.file("xl/worksheets/sheet6.xml")!.async("string");
    expect(sources).toMatch(/<x:c r="B16"[^>]*><x:v>15<\/x:v>/);
    expect(sources).toMatch(/<x:c r="B17"[^>]*><x:v>60<\/x:v>/);
    expect(sources).toMatch(/<x:c r="B20"[^>]*><x:v>6<\/x:v>/);
  });

  it("ergänzt Kick-off-Gruppen für die Chat-Nutzer im Trainingsbudget", () => {
    expect(calc).toContain("'6. Quellen &amp; Methodik'!B31+INT(('1. Eingaben'!B9");
  });

  it("erzwingt die Neuberechnung beim Öffnen", async () => {
    const workbook = await zip.file("xl/workbook.xml")!.async("string");
    expect(workbook).toContain('fullCalcOnLoad="1"');
  });

  it("entfernt zwischengespeicherte Werte in allen Rechenblättern", async () => {
    for (const n of [2, 3, 4, 5, 6]) {
      const xml = await zip.file(`xl/worksheets/sheet${n}.xml`)!.async("string");
      expect(xml, `sheet${n}`).not.toMatch(/<\/x:f><x:v>/);
    }
  });

  it("baut einen sicheren Dateinamen", () => {
    expect(buildWorkbookFileName("Yellow Boat Testfirma GmbH", new Date("2026-07-28")))
      .toBe("Copilot-ROI-Rechner-Yellow-Boat-Testfirma-GmbH-2026-07-28.xlsx");
    expect(buildWorkbookFileName("Müller & Söhne GmbH", new Date("2026-07-28")))
      .toBe("Copilot-ROI-Rechner-Mueller-Soehne-GmbH-2026-07-28.xlsx");
  });
});

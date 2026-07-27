// Dateiname-Regeln (Konzept Abschnitt 11.7).
const UMLAUT_MAP: Record<string, string> = {
  ä: "ae", ö: "oe", ü: "ue", Ä: "Ae", Ö: "Oe", Ü: "Ue", ß: "ss",
};

function replaceUmlauts(input: string): string {
  return input.replace(/[äöüÄÖÜß]/g, (ch) => UMLAUT_MAP[ch] ?? ch);
}

export function slugifyCompanyName(companyName: string): string {
  const replaced = replaceUmlauts(companyName || "");
  const slug = replaced
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^A-Za-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50);
  return slug || "Unternehmen";
}

export function buildPptxFileName(companyName: string, date = new Date()): string {
  const slug = slugifyCompanyName(companyName);
  const iso = date.toISOString().slice(0, 10); // YYYY-MM-DD
  return `Copilot-Business-Case-${slug}-${iso}.pptx`;
}

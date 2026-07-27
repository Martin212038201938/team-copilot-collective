// Designsystem der ROI-PowerPoint (Konzept Abschnitt 9.2).
export const PPT_THEME = {
  primary: "488CCB", // Website-Primärblau
  navy: "1F4E79", // ruhige Managementfarbe
  realistic: "ED7D31", // realistisches Szenario
  studyNear: "488CCB", // studiennahes Szenario
  positive: "4F8A3C",
  negative: "C00000",
  neutral: "666666",
  lightBlue: "EAF3F8",
  lightOrange: "FCE4D6",
  lightGreen: "E2F0D9",
  lightGray: "F3F4F6",
  text: "1A1A1A",
  muted: "666666",
  white: "FFFFFF",
} as const;

export const PPT_FONT = {
  head: "Aptos Display",
  body: "Aptos",
} as const;

/** Farblogik für ROI-Werte — positiver ROI grün, negativer rot, exakt null neutral (Konzept 5.4/9.2). */
export function roiColor(roi: number | null): string {
  if (roi === null) return PPT_THEME.neutral;
  if (roi > 0) return PPT_THEME.positive;
  if (roi < 0) return PPT_THEME.negative;
  return PPT_THEME.neutral;
}

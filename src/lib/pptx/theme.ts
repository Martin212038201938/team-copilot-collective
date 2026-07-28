/**
 * Design-Tokens der Copilotenschule-Entscheidungsvorlage.
 * Quelle: design_handoff_copilot_business_case/README.md, Abschnitt "Design Tokens".
 * Farbwerte ohne führendes "#", wie von PptxGenJS erwartet.
 */
export const PPT_THEME = {
  navy: "0A2E5C", // Struktur, Typografie, dunkle Flächen
  ink: "031127", // tiefster Ton, Hover
  sky: "488BCB", // Marke, Stripe, Nummerierungen, Nutzen-Linie
  signal: "E2202A", // NUR Akzent: Eyebrows, mittlerer Stripe-Balken, Rails
  paper: "F3F5F8", // Standard-Folienhintergrund
  white: "FFFFFF",
  fog: "E6E8EC", // Hairlines auf Paper
  body: "33465F", // Fließtext
  secondary: "5A6B82",
  footer: "8A97A8",
  // Auf Navy-Flächen:
  onNavy: "FFFFFF",
  onNavySecondary: "B9CCE0",
  onNavyTertiary: "9FC0E0",
  onNavyMuted: "7F9FC2",
  onNavyHairline: "2A4E7A", // Ersatz für rgba(255,255,255,0.22) – PPTX kennt keine Alpha-Linien
} as const;

export const PPT_FONT = {
  display: "DM Sans",
  body: "DM Sans",
  mono: "JetBrains Mono",
} as const;

/**
 * Die Vorlage ist auf 1920 × 1080 px gebaut, die PPTX auf 13,333 × 7,5 Zoll.
 * Damit gilt exakt: 1 Zoll = 144 px. Alle Maße der Vorlage lassen sich also
 * unverändert übernehmen und hier umrechnen — das hält das Layout deckungsgleich.
 */
export const PX_PER_INCH = 144;
export const px = (value: number): number => value / PX_PER_INCH;

/**
 * Schriftgrößen: 1920 px Folienbreite entsprechen 960 pt, also 1 px = 0,5 pt.
 * Die Vorlage arbeitet in px, PptxGenJS in pt.
 */
export const pt = (pxValue: number): number => pxValue / 2;

/** Seitenränder der Vorlage: 96 oben / 100 seitlich / 80 unten (Titelfolie: 110/120/90). */
export const PAD = {
  top: px(96),
  side: px(100),
  bottom: px(80),
  titleTop: px(110),
  titleSide: px(120),
} as const;

export const SLIDE_W = px(1920);
export const SLIDE_H = px(1080);
/** Nutzbare Breite zwischen den Seitenrändern. */
export const CONTENT_W = SLIDE_W - 2 * PAD.side;

/** Farbwahl für ROI-Werte: positiv grün wirkt hier fehl am Platz — die Vorlage bleibt bei Navy. */
export function roiColor(roi: number | null): string {
  if (roi !== null && roi < 0) return PPT_THEME.signal;
  return PPT_THEME.navy;
}

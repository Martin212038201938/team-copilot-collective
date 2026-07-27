// Deutsche Zahlen-/Währungsformatierung für den ROI-Generator (Konzept Abschnitt 6.10).

const eurFormatter = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const eurCentsFormatter = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

const percentFormatter = new Intl.NumberFormat("de-DE", {
  style: "percent",
  maximumFractionDigits: 0,
});

const hoursFormatter = new Intl.NumberFormat("de-DE", {
  maximumFractionDigits: 1,
  minimumFractionDigits: 1,
});

/** Geldbeträge auf ganze Euro gerundet, z. B. "56.672 €". */
export function formatEur(value: number): string {
  return eurFormatter.format(Math.round(value));
}

/** Kosten pro Person mit zwei Nachkommastellen, z. B. "416,67 €". */
export function formatEurCents(value: number): string {
  return eurCentsFormatter.format(value);
}

/** ROI auf ganze Prozentpunkte gerundet, z. B. "88 %". null → "–". */
export function formatPercent(value: number | null): string {
  if (value === null) return "–";
  return percentFormatter.format(value);
}

/** Stunden auf eine Nachkommastelle, z. B. "6,8 Std." */
export function formatHours(value: number): string {
  return hoursFormatter.format(value);
}

/** Break-even auf volle Monate, oder "> 36 Monate" wenn nicht erreicht. */
export function formatBreakEven(month: number | null, horizonMonths = 36): string {
  if (month === null) return `> ${horizonMonths} Monate`;
  return `${month} ${month === 1 ? "Monat" : "Monate"}`;
}

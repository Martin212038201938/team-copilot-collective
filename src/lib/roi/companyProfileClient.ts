/**
 * Holt das automatisch recherchierte Unternehmensprofil vom Server.
 *
 * Zeitbudget: Die Recherche darf großzügig lange dauern, weil die Präsentation ohnehin erst
 * über den E-Mail-Link abgeholt wird. Damit trotzdem niemand vor einem Spinner sitzt, wird
 * sie VORGEZOGEN gestartet, sobald die E-Mail-Adresse feststeht (prefetchCompanyProfile).
 * Beim Absenden liegt das Ergebnis dann meist schon vor.
 *
 * Bewusst "best effort": Schlägt der Aufruf fehl oder dauert er zu lange, wird die
 * Präsentation ohne Zusatzinfos gebaut. Es erscheint dann KEIN Platzhalter — der Nutzer
 * bemerkt nicht, dass etwas fehlt.
 */

export type CompanyProfile = {
  found: boolean;
  industry: string | null;
  summary: string | null;
  /** Logo als Data-URL, direkt in die PPTX einbettbar (kein CORS-Problem). */
  logoDataUrl: string | null;
  /** Seitenverhältnis (Breite/Höhe) des Originalbilds — sonst wird das Logo verzerrt. */
  logoAspect: number | null;
};

const EMPTY_PROFILE: CompanyProfile = { found: false, industry: null, summary: null, logoDataUrl: null, logoAspect: null };

/**
 * Obergrenze für die gesamte Recherche. Großzügig, weil die Auslieferung asynchron per
 * E-Mail erfolgt — der Nutzer wartet in der Regel nur die Restzeit des Prefetch ab.
 */
const PROFILE_TIMEOUT_MS = 120_000;

/** Läuft bereits eine Anfrage für diese Kombination, wird sie wiederverwendet. */
let inFlight: { key: string; promise: Promise<CompanyProfile> } | null = null;

function profileKey(companyName: string, email: string): string {
  return `${companyName.trim().toLowerCase()}|${email.trim().toLowerCase()}`;
}

async function requestProfile(companyName: string, email: string): Promise<CompanyProfile> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), PROFILE_TIMEOUT_MS);

  try {
    const response = await fetch("/api/roi-company-profile.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ companyName, email }),
      signal: controller.signal,
    });
    if (!response.ok) return EMPTY_PROFILE;

    const data = (await response.json()) as Partial<CompanyProfile>;
    return {
      found: Boolean(data.found),
      industry: data.industry ?? null,
      summary: data.summary ?? null,
      logoDataUrl: typeof data.logoDataUrl === "string" && data.logoDataUrl.startsWith("data:image/")
        ? data.logoDataUrl
        : null,
      logoAspect: typeof data.logoAspect === "number" && data.logoAspect > 0 ? data.logoAspect : null,
    };
  } catch {
    return EMPTY_PROFILE;
  } finally {
    window.clearTimeout(timer);
  }
}

/**
 * Startet die Recherche im Hintergrund, ohne auf das Ergebnis zu warten.
 * Aufrufen, sobald Unternehmensname und E-Mail bekannt sind (z. B. beim Verlassen des
 * E-Mail-Feldes). Mehrfachaufrufe mit denselben Werten lösen nur eine Anfrage aus.
 */
export function prefetchCompanyProfile(companyName: string, email: string): void {
  if (!companyName.trim() || !email.trim() || !email.includes("@")) return;
  const key = profileKey(companyName, email);
  if (inFlight?.key === key) return;
  // Fehler hier bewusst verschlucken – requestProfile liefert im Zweifel ein leeres Profil.
  inFlight = { key, promise: requestProfile(companyName, email) };
}

/**
 * Liefert das Profil. Wurde vorher prefetchCompanyProfile() mit denselben Werten
 * aufgerufen, wird auf die bereits laufende Anfrage gewartet statt eine neue zu starten.
 */
export function fetchCompanyProfile(companyName: string, email: string): Promise<CompanyProfile> {
  const key = profileKey(companyName, email);
  if (inFlight?.key === key) return inFlight.promise;

  const promise = requestProfile(companyName, email);
  inFlight = { key, promise };
  return promise;
}

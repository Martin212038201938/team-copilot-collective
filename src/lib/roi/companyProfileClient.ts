/**
 * Holt das automatisch recherchierte Unternehmensprofil vom Server.
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
};

const EMPTY_PROFILE: CompanyProfile = { found: false, industry: null, summary: null, logoDataUrl: null };

/** Nach diesem Zeitfenster wird ohne Profil weitergebaut, damit niemand wartet. */
const PROFILE_TIMEOUT_MS = 8000;

export async function fetchCompanyProfile(companyName: string, email: string): Promise<CompanyProfile> {
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
    };
  } catch {
    return EMPTY_PROFILE;
  } finally {
    window.clearTimeout(timer);
  }
}

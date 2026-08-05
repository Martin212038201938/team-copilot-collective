/**
 * Smartlead Landing Page — /sml/hr-tipps_2026
 *
 * KAMPAGNE: HR-Tipps-2026 | Zielgruppe: HR/Personalverantwortliche Deutschland
 * ZWECK: Nur über Smartlead-E-Mail-Kampagne erreichbar. Misst Funnel-Performance.
 *
 * ⚠️ REDESIGN 05.08.2026 (Maßnahme E3, Tiefenanalyse-Katalog):
 * Befund: >5 Wochen 0 Conversions bei laufender Cold-Mail-Kampagne, aber nur
 * 6–15 % Scroll-Tiefe und 8–15 s Verweildauer. Die Mails funktionieren (Klicks
 * kommen an), die alte 10-Tipps-Langform-Seite hat konvertiert niemanden.
 * Lösung: radikal auf 1 Screen gekürzt — Nutzenversprechen + 3 Bullets +
 * direkt eingebetteter Bookings-Kalender als einziges CTA-Ziel. Keine
 * Navigation zu anderen Seiten mehr (kein /kontakt, kein /trainings, kein
 * Wissensartikel-Link) — jeder Pfad auf der Seite führt zum selben Termin.
 * Die alten 10 Workflow-Beispiele wurden entfernt (waren die Ursache der
 * geringen Scroll-Tiefe: zu viel Text vor dem CTA).
 *
 * TRACKING:
 *  - UTM-Parameter werden auf Clarity-Session-Tags gemappt (utm_source, utm_campaign, utm_content)
 *  - Der Booking-Klick löst trackConversion("sml_booking_click") aus (Event-Name bewusst
 *    unverändert gelassen, damit bestehende Health-Check-Reports/Dashboards weiter greifen)
 *  - Nach dem Klick wird der ursprüngliche Tab auf /danke umgeleitet (wie booking.ts),
 *    damit GA4/Ads dort einen frischen page_view/Conversion-Trigger bekommen — das gab
 *    es auf dieser Seite bisher NICHT und war eine zusätzliche Tracking-Lücke.
 *
 * NICHT indexieren / NICHT in der Website anbinden:
 *  - noindex, nofollow via Helmet
 *  - NICHT in articles.ts, NICHT in Wissen.tsx, NICHT in sitemap.xml
 *  - KEIN IndexNow-Ping, KEINE Google-Search-Console-Einreichung
 *  - Pre-Render via react-snap (package.json, reactSnap.include) nur für schnelle
 *    statische Auslieferung; Indexierung wird durch das noindex-Meta verhindert.
 *
 * CONVERSION-ZIEL (bewusst auf eins reduziert, Maßnahme E3):
 *  1. Termin buchen → trackConversion("sml_booking_click") + Redirect auf /danke
 */

import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { trackConversion, setSessionTag, markConvertedSession } from "@/lib/analytics";

// ─── Kampagnen-Konstanten ──────────────────────────────────────────────────
const BOOKING_URL =
  "https://outlook.office.com/book/CopilotErstgesprch@yellow-boat.com/s/SH3go0qktUGV6pztfyPi6w2";

// ─── UTM → Clarity-Mapping ────────────────────────────────────────────────
function tagClarityFromUTM(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const source = params.get("utm_source") ?? "direct";
  const campaign = params.get("utm_campaign") ?? "unknown";
  const content = params.get("utm_content") ?? "unknown";
  const medium = params.get("utm_medium") ?? "unknown";

  setSessionTag("campaign_source", source);
  setSessionTag("campaign_name", campaign);
  setSessionTag("campaign_mail", content);   // mail1 / mail2 / mail3 / mail4 / mail5
  setSessionTag("campaign_medium", medium);

  // Besondere Session-Markierung damit Smartlead-Traffic leicht filterbar ist
  // utm_source=outbound gemäß UTM-Konvention (sea-tracking-konzept-2026-06.md)
  if (source === "outbound") {
    setSessionTag("visitor_type", "smartlead_campaign");
    trackConversion("sml_landing_page_visit", campaign);
  }
}

// ─── CTA-Handler (einziges Ziel: Termin) ──────────────────────────────────
// Event-Name "sml_booking_click" bewusst wie vor dem Redesign beibehalten
// (Kontinuität für bestehende Health-Check-Reports). Neu: Redirect auf /danke
// nach kurzem Delay, analog src/lib/booking.ts — bisher fehlte dieser Trigger
// auf dieser Seite komplett, dadurch blieb jede Buchung für GA4/Ads unsichtbar.
function handleBookingClick(source: string): void {
  trackConversion("sml_booking_click", source);
  markConvertedSession("sml_booking_intent");
  if (typeof window !== "undefined") {
    window.setTimeout(() => {
      window.location.href = "/danke";
    }, 200);
  }
}

// ─── Komponente ───────────────────────────────────────────────────────────
const SmlHrTipps2026 = () => {
  useEffect(() => {
    tagClarityFromUTM();
  }, []);

  return (
    <>
      {/* ── Kein SEO-Indexing ── */}
      <Helmet>
        <title>Copilot im HR-Team: kostenloses Erstgespräch | copilotenschule.de</title>
        <meta
          name="description"
          content="15 Minuten, ein Gespräch: Wo hat Microsoft Copilot bei Ihrem HR-Team den größten Hebel? Direkt Termin wählen, kein Formular."
        />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://copilotenschule.de/sml/hr-tipps_2026" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white flex flex-col">
        <div className="flex-1 flex flex-col justify-center px-4 py-10 md:py-14">
          <div className="max-w-2xl mx-auto w-full text-center">

            {/* Mail-Bezug: schließt die Erwartungslücke aus der Kalt-Mail */}
            <p className="text-sm text-slate-400 mb-4">
              Schön, dass Sie da sind – Sie kommen aus unserer E-Mail zu Copilot im HR-Team.
            </p>

            <div className="inline-block bg-white/10 border border-white/15 text-slate-200 text-sm font-medium px-3 py-1 rounded-full mb-5">
              Für Personalverantwortliche
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              Copilot im HR-Team: lohnt sich das –<br className="hidden md:block" /> und wie fangen Sie richtig an?
            </h1>

            <p className="text-lg text-slate-300 mb-8 max-w-xl mx-auto">
              In einem kostenlosen 15-Minuten-Gespräch klären wir gemeinsam, wo Copilot bei Ihrem
              HR-Team den größten Hebel hat. Kein Verkaufsgespräch – ein ehrliches Erstgespräch.
            </p>

            {/* ── 3 Bullets: Nutzenversprechen ── */}
            <div className="grid sm:grid-cols-3 gap-4 mb-9 text-left">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-sm text-slate-200 leading-relaxed">
                  <span className="text-amber-400 font-bold">Konkrete Workflows</span> statt
                  Buzzwords – Fluktuationsanalyse, Betriebsvereinbarungen, Employer Branding,
                  Jahresgespräche.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-sm text-slate-200 leading-relaxed">
                  <span className="text-amber-400 font-bold">2.000+ ausgebildete Wissensarbeiter</span> –
                  Praxiserfahrung aus echten Unternehmenstrainings, nicht nur Theorie.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-sm text-slate-200 leading-relaxed">
                  <span className="text-amber-400 font-bold">15 Minuten, kein Risiko</span> –
                  direkt unten Termin wählen, ohne Formular und ohne Warteschleife.
                </p>
              </div>
            </div>

            {/* ── Primärer CTA-Button (öffnet Buchung + leitet diesen Tab auf /danke) ── */}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleBookingClick("hero_button")}
              className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-900 font-semibold px-8 py-4 rounded-lg text-lg shadow-lg shadow-amber-500/20 transition-colors mb-3"
            >
              Kostenloses Erstgespräch buchen
            </a>
            <p className="text-xs text-slate-400 mb-10">
              Oder direkt unten im Kalender einen Termin wählen.
            </p>

            {/* ── Bookings-Kalender direkt eingebettet ──────────────────
                Hinweis: Falls der eingebettete Kalender im Einzelfall durch
                Microsofts Frame-Policy nicht lädt, bleibt der Button oben
                als garantiert funktionierender Weg zum selben Ziel bestehen. */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src={BOOKING_URL}
                title="Termin für kostenloses Erstgespräch buchen"
                loading="lazy"
                className="w-full"
                style={{ height: "700px", border: "none" }}
              />
            </div>

            <p className="text-slate-500 text-xs mt-8">
              Yellow-Boat Consulting · Martin Lang · Nussbaumerstrasse 26 · 50823 Köln
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SmlHrTipps2026;

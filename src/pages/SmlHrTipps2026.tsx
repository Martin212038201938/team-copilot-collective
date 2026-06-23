/**
 * Smartlead Landing Page — /sml/hr-tipps_2026
 *
 * KAMPAGNE: HR-Tipps-2026 | Zielgruppe: HR/Personalverantwortliche Deutschland
 * ZWECK: Nur über Smartlead-E-Mail-Kampagne erreichbar. Misst Funnel-Performance.
 *
 * TRACKING:
 *  - UTM-Parameter werden auf Clarity-Session-Tags gemappt (utm_source, utm_campaign, utm_content)
 *  - Jeder CTA-Klick löst ein trackConversion-Event aus
 *  - markConvertedSession() bei Booking-Klick (höchste Prio-Aufzeichnung in Clarity)
 *
 * NICHT indexieren:
 *  - noindex, nofollow via Helmet
 *  - NICHT in articles.ts, NICHT in Wissen.tsx, NICHT in sitemap.xml
 *
 * CONVERSION-ZIELE (priorisiert):
 *  1. Termin buchen  →  trackConversion("sml_booking_click")
 *  2. Kontaktformular →  trackConversion("sml_contact_click")
 *  3. Angebote-Seite  →  trackConversion("sml_offers_click")
 *  4. Hauptseite      →  trackConversion("sml_home_click")
 *  5. HR-Artikel      →  trackConversion("sml_article_click")
 */

import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
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

// ─── CTA-Handler ──────────────────────────────────────────────────────────
function handleBookingClick(): void {
  trackConversion("sml_booking_click");
  markConvertedSession("sml_booking_intent");
}
function handleContactClick(): void {
  trackConversion("sml_contact_click");
  markConvertedSession("sml_contact_intent");
}
function handleOffersClick(): void {
  trackConversion("sml_offers_click");
}
function handleArticleClick(): void {
  trackConversion("sml_article_click");
}
function handleHomeClick(): void {
  trackConversion("sml_home_click");
}

// ─── Daten ────────────────────────────────────────────────────────────────
const TIPS_CHAT = [
  {
    nr: "01",
    icon: "✍️",
    title: "Stellenanzeigen in Minuten – nicht Stunden",
    body: `Copilot Chat schreibt auf Basis einer kurzen Briefing-Eingabe vollständige Stellenanzeigen im Stil der eigenen Unternehmenssprache. Mit dem richtigen Prompt entstehen in Sekunden Versionen für LinkedIn, Indeed und das Karriereportal – inkl. Diversity-konformer Formulierung auf Wunsch.`,
    prompt: `„Schreib eine Stellenanzeige für eine Teamleitung HR in einem mittelständischen Produktionsunternehmen, 500 MA, modern-sachlicher Ton, max. 300 Wörter, inkl. Diversity-Statement."`,
    lizenzBox: `Mit Copilot in Word zieht die Anzeige direkt Infos aus bestehenden Jobprofilen und passt Formulierungen an vergangene Ausschreibungen an – alles ohne Copy-Paste.`,
  },
  {
    nr: "02",
    icon: "📮",
    title: "Absagemails, die den Kandidaten wirklich respektieren",
    body: `Standardisierte Absagemails wirken wie ein Formbrief – und das spüren Kandidaten. Copilot Chat formuliert auf Basis von Stichwörtern zur Person individuelle, wertschätzende Absagen. Das stärkt das Employer Branding, selbst bei Nicht-Besetzung.`,
    prompt: `„Schreib eine Absage für einen Bewerber auf eine IT-Projektmanager-Stelle. Stärken waren: strukturierte Bewerbung, gute Kommunikation. Absagegrund: interner Kandidat bevorzugt. Ton: wertschätzend, klar, kein Floskeln."`,
    lizenzBox: `Mit der Copilot-Lizenz lässt sich ein Agent bauen, der Absagemails aus dem ATS-Eintrag automatisch generiert und zur Freigabe vorlegt – ohne manuelle Texteingabe.`,
  },
  {
    nr: "03",
    icon: "🗂️",
    title: "Onboarding-Pläne strukturiert aufbauen",
    body: `Copilot Chat erstellt vollständige Onboarding-Checklisten für neue Rollen – mit Wochen-Struktur, Ansprechpartnern, Lernzielen und Aufgaben. Was bisher Stunden dauerte, entsteht in Minuten und lässt sich direkt in die eigene Vorlage kopieren.`,
    prompt: `„Erstell einen 4-Wochen-Onboarding-Plan für eine neue HR Business Partnerin in einem 200-MA-Unternehmen, Industrie, hybrides Arbeiten. Mit Wochenzielen, empfohlenen Kennenlern-Gesprächen und Pflichtschulungen."`,
    lizenzBox: `Mit der Copilot-Lizenz entstehen solche Pläne direkt in Loop als geteiltes Dokument – bearbeitbar, kommentierbar, automatisch mit dem Team geteilt.`,
  },
  {
    nr: "04",
    icon: "📄",
    title: "Zeugnisse als ersten Entwurf in Sekunden",
    body: `Zeugnistexte gehören zu den zeitaufwändigsten Aufgaben in der Personalabteilung – und sind rechtlich sensibel. Copilot Chat liefert auf Basis von Stichwörtern zur Tätigkeit und Bewertung einen soliden Erstentwurf im Zeugnisstil, den Sie dann finalisieren.`,
    prompt: `„Erstell einen Arbeitszeugnistext für einen Mitarbeiter im Vertriebsinnendienst, 4 Jahre, Bewertung: sehr gut, Stärken: Kundenorientierung, Eigeninitiative, Teamarbeit. Ton: klassisches Arbeitszeugnis, positive Gesamtbewertung."`,
    lizenzBox: `Mit der Copilot-Lizenz in Word zieht der Entwurf direkt aus der eigenen Zeugnisvorlage und übernimmt Standardformulierungen, die Sie intern abgestimmt haben.`,
  },
  {
    nr: "05",
    icon: "📊",
    title: "Excel-Formeln erklären lassen – und Auswertungen vorbereiten",
    body: `Excel-Auswertungen sind in vielen Personalabteilungen Pflicht – aber nicht für alle eine Freude. Copilot Chat erklärt Formeln verständlich, schlägt passende Formeln für konkrete Aufgaben vor und strukturiert Pivot-Tabellen-Logik auf Befehl.`,
    prompt: `„Ich habe eine Excel-Tabelle mit Bewerberdaten (Datum, Quelle, Status). Welche Formeln brauche ich, um die Time-to-Hire pro Stellenquelle zu berechnen? Erkläre Schritt für Schritt."`,
    lizenzBox: `Mit Copilot in Excel (Lizenz erforderlich) analysiert Copilot die Tabelle direkt, erstellt Auswertungen per Spracheingabe und erklärt Ergebnisse im Klartext – ohne Formeln schreiben zu müssen.`,
  },
];

const TIPS_LIZENZ = [
  {
    nr: "06",
    icon: "🤖",
    title: "Bewerber-Kommunikation mit einem Agent halbautomatisieren",
    body: `Ein individuell eingerichteter Copilot-Agent überwacht den Posteingang, erkennt Bewerbungsmails und schlägt direkt passende Antwortvorlagen vor – je nach Bewerbungsphase, Stelle und Ton. Der HR-Manager gibt frei. Die manuelle Sortier- und Tipparbeit entfällt.`,
    agent: `Einrichtung: Copilot Studio → Neuer Agent → Wissensbasis: E-Mail-Vorlagen + Stellenprofile → Trigger: neue Mail mit "Bewerbung" im Betreff.`,
  },
  {
    nr: "07",
    icon: "📈",
    title: "HR-Analytics aus Excel automatisch kommentieren lassen",
    body: `Wer regelmäßig Fluktuation, Krankenstand oder Recruiting-Kennzahlen für die Geschäftsleitung aufbereitet, kennt das: Die Zahlen stehen – aber der erklärende Text kostet Zeit. Copilot in Excel analysiert die Daten und schreibt den Kommentar direkt in die Tabelle.`,
    agent: `Prompt im Copilot-Excel-Seitenbereich: „Analysiere diese Tabelle und schreib einen Managementkommentar für die monatliche HR-Reporting-Runde. Max. 150 Wörter, drei Beobachtungen, eine Empfehlung."`,
  },
  {
    nr: "08",
    icon: "🗃️",
    title: "Bewerbungsunterlagen mit Copilot in Word strukturieren",
    body: `Copilot in Word liest Lebenslauf und Anschreiben und erstellt auf Knopfdruck eine strukturierte Auswertung: Passung zur Stellenbeschreibung, Lücken, Stärken, empfohlene Interviewfragen. Das beschleunigt die Vorauswahl erheblich.`,
    agent: `Öffne das Anschreiben in Word → Copilot-Seitenbereich → „Vergleiche diesen Lebenslauf mit dem Anforderungsprofil [eingefügter Text] und erstell eine Bewerbungsauswertung mit drei Interviewfragen."`,
  },
  {
    nr: "09",
    icon: "🔁",
    title: "Onboarding-Workflows in Loop automatisieren",
    body: `Microsoft Loop ermöglicht strukturierte Onboarding-Seiten, die sich mit dem Fortschritt des neuen Mitarbeiters aktualisieren. Copilot in Loop erstellt Tasks, verfolgt Erledigungen und schlägt beim wöchentlichen Check-in automatisch offene Punkte vor.`,
    agent: `In Loop: Neue Seite → Copilot: „Erstell einen Onboarding-Workflow für eine neue Stelle im HR-Team mit Wochenzielen, Aufgaben und Checkboxen." → Seite mit neuem Mitarbeiter teilen.`,
  },
  {
    nr: "10",
    icon: "💬",
    title: "Jahresgespräche mit einem Copilot-Agent vorbereiten",
    body: `Ein Agent, der vor Jahresgesprächen relevante E-Mail-Korrespondenz, Projektdokumente und frühere Feedback-Notizen zusammenfasst, spart je Gespräch 20–30 Minuten Vorbereitungszeit. Das multipliziert sich bei 50 Mitarbeitern auf signifikante Zeitgewinne.`,
    agent: `Einrichtung: Copilot Studio → Neuer Agent → Wissensbasis: M365-Mails + SharePoint-Dokumente → Prompt: „Fasse die wichtigsten Beiträge und Rückmeldungen für [Mitarbeitername] im letzten Jahr zusammen."`,
  },
];

// ─── Komponente ───────────────────────────────────────────────────────────
const SmlHrTipps2026 = () => {
  useEffect(() => {
    tagClarityFromUTM();
  }, []);

  return (
    <>
      {/* ── Kein SEO-Indexing ── */}
      <Helmet>
        <title>10 Copilot-Tipps für HR | copilotenschule.de</title>
        <meta name="description" content="5 Tipps mit kostenlosem Copilot Chat + 5 Tipps für Copilot-Lizenzinhaber – speziell für Personalabteilungen." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://copilotenschule.de/sml/hr-tipps_2026" />
      </Helmet>

      <div className="min-h-screen bg-white">

        {/* ── HEADER / HERO ─────────────────────────────────────────────── */}
        <header className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block bg-blue-500/20 border border-blue-400/30 text-blue-200 text-sm font-medium px-3 py-1 rounded-full mb-6">
              Praxis-Tipps für Personalverantwortliche
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-5 leading-tight">
              10 Copilot-Tipps für HR –<br className="hidden md:block" /> die wirklich im Alltag helfen
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Zu viel Verwaltung, zu wenig Zeit für Menschen. Excel-Formeln, die niemand liebt.
              Stellenanzeigen, Zeugnisse, Absagemails, die sich immer wiederholen.
              Copilot löst genau diese Aufgaben – mit und ohne Lizenz.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleBookingClick}
                className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                📅 Kostenloses Erstgespräch buchen
              </a>
              <Link
                to="/trainings"
                onClick={handleOffersClick}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium px-6 py-3 rounded-lg transition-colors"
              >
                Unsere Angebote ansehen →
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-4 py-12">

          {/* ── SECTION A: KOSTENLOSE TIPPS ──────────────────────────── */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">Teil 1 von 2</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              5 Tipps mit dem kostenlosen Copilot Chat
            </h2>
            <p className="text-slate-600 mb-8">
              Copilot Chat ist unter{" "}
              <a href="https://copilot.microsoft.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                copilot.microsoft.com
              </a>{" "}
              kostenlos zugänglich und braucht keine Microsoft-365-Lizenz.
              Diese fünf Anwendungen funktionieren sofort – mit dem richtigen Prompt.
            </p>

            <div className="space-y-6">
              {TIPS_CHAT.map((tip) => (
                <div key={tip.nr} className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-xl">
                        {tip.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tipp {tip.nr}</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">{tip.title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed mb-4">{tip.body}</p>

                        {/* Beispiel-Prompt */}
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 mb-4">
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Beispiel-Prompt</p>
                          <p className="text-sm text-slate-700 italic">{tip.prompt}</p>
                        </div>

                        {/* Lizenz-Box */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">⚡ Mit Copilot-Lizenz noch einfacher</p>
                          <p className="text-sm text-blue-900">{tip.lizenzBox}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── MID-PAGE CTA ──────────────────────────────────────────── */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white text-center mb-16">
            <h3 className="text-xl font-bold mb-2">Neugierig, was bei Ihnen im HR-Alltag möglich wäre?</h3>
            <p className="text-blue-100 text-sm mb-6">
              In einem kostenlosen 15-Minuten-Gespräch analysieren wir gemeinsam, wo Copilot bei Ihnen den größten Hebel hat.
              Kein Verkaufsgespräch – ein ehrliches Erstgespräch.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleBookingClick}
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 hover:bg-blue-50 font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                📅 Termin buchen
              </a>
              <Link
                to="/kontakt"
                onClick={handleContactClick}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-medium px-6 py-3 rounded-lg transition-colors"
              >
                ✉️ Nachricht schreiben
              </Link>
            </div>
          </div>

          {/* ── SECTION B: LIZENZ-TIPPS ───────────────────────────────── */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">Teil 2 von 2</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              5 Tipps für Copilot-Lizenzinhaber
            </h2>
            <p className="text-slate-600 mb-8">
              Mit der Microsoft-365-Copilot-Lizenz öffnet sich eine weitere Dimension: tiefere Integration in
              Office-Apps, eigene Agents und Teil-Automatisierungen, die Verwaltungsarbeit strukturell reduzieren –
              nicht nur vereinzeln.
            </p>

            <div className="space-y-6">
              {TIPS_LIZENZ.map((tip) => (
                <div key={tip.nr} className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center text-xl">
                        {tip.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Tipp {tip.nr}</span>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">Lizenz erforderlich</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">{tip.title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed mb-4">{tip.body}</p>

                        {/* Agent-Hinweis */}
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">So richten Sie es ein</p>
                          <p className="text-sm text-slate-700">{tip.agent}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── WEITERLESEN ───────────────────────────────────────────── */}
          <section className="mb-16">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 text-3xl">👥</div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Wissensartikel</p>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Copilot im HR: Wo Personalabteilungen wirklich Zeit gewinnen
                  </h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Die wirkungsvollsten Copilot Use Cases für HR im Detail: Von Stellenausschreibungen über
                    Zeugnisse bis People Analytics – mit konkreter Zeitersparnis pro Mitarbeiter und
                    Empfehlungen für die schrittweise Einführung.
                  </p>
                  <Link
                    to="/wissen/copilot-hr-use-cases"
                    onClick={handleArticleClick}
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-sm underline underline-offset-4"
                  >
                    Zum vollständigen Artikel →
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* ── BOTTOM CTA ────────────────────────────────────────────── */}
          <section className="border-t border-slate-200 pt-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                Nächster Schritt: Ihren Copilot-Bedarf klären
              </h2>
              <p className="text-slate-600 max-w-xl mx-auto">
                Die copilotenschule.de bietet praxisnahe Copilot-Trainings speziell für Unternehmen –
                keine generischen KI-Kurse, sondern Lernformate, die direkt im Arbeitsalltag wirken.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {/* Primär: Buchung */}
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleBookingClick}
                className="flex flex-col items-center text-center bg-blue-600 hover:bg-blue-500 text-white rounded-xl p-6 transition-colors"
              >
                <span className="text-2xl mb-2">📅</span>
                <span className="font-bold mb-1">Termin buchen</span>
                <span className="text-blue-200 text-xs">15 Min. kostenlos</span>
              </a>

              {/* Sekundär: Angebote */}
              <Link
                to="/trainings"
                onClick={handleOffersClick}
                className="flex flex-col items-center text-center bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-xl p-6 transition-colors"
              >
                <span className="text-2xl mb-2">🎓</span>
                <span className="font-bold mb-1">Unsere Angebote</span>
                <span className="text-slate-500 text-xs">Trainings & Workshops</span>
              </Link>

              {/* Tertiär: Startseite */}
              <Link
                to="/"
                onClick={handleHomeClick}
                className="flex flex-col items-center text-center bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-xl p-6 transition-colors"
              >
                <span className="text-2xl mb-2">🏠</span>
                <span className="font-bold mb-1">Zur Startseite</span>
                <span className="text-slate-500 text-xs">copilotenschule.de</span>
              </Link>
            </div>

            <p className="text-center text-slate-400 text-xs">
              Yellow-Boat Consulting · Martin Lang · Nussbaumerstrasse 26 · 50823 Köln
            </p>
          </section>

        </main>
      </div>
    </>
  );
};

export default SmlHrTipps2026;

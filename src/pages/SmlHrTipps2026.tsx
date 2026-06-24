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
 * NICHT indexieren / NICHT in der Website anbinden:
 *  - noindex, nofollow via Helmet
 *  - NICHT in articles.ts, NICHT in Wissen.tsx, NICHT in sitemap.xml
 *  - KEIN IndexNow-Ping, KEINE Google-Search-Console-Einreichung
 *  - Pre-Render via react-snap (package.json) nur für schnelle statische Auslieferung;
 *    Indexierung wird durch das noindex-Meta verhindert.
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

// ─── Daten: Teil 1 — kostenloser Copilot Chat ──────────────────────────────
type ChatCase = {
  nr: string;
  title: string;
  lead: string;
  workflow: string[];
  prompt: string;
  followups: string[];
  output: string;
};

const TIPS_CHAT: ChatCase[] = [
  {
    nr: "01",
    title: "Fluktuation verstehen statt nur berichten",
    lead: `Die meisten Fluktuationsberichte hören bei der Zahl auf: zwölf Prozent, drei Prozentpunkte über Vorjahr, fertig. Das eigentlich Interessante steht in den Austrittsgesprächen, und genau die liest niemand systematisch durch. Copilot Chat kann das – wenn Sie ihm das Rohmaterial geben, statt ihn nach einer allgemeinen Einschätzung zu fragen.`,
    workflow: [
      "Anonymisierte Notizen Ihrer Austrittsgespräche der letzten zwölf Monate als Word- oder PDF-Datei über das Pluszeichen im Eingabefeld hochladen. Klarnamen vorher schwärzen – die Mustererkennung braucht keine Namen.",
      "Als zweite Datei die Fluktuationsquote je Abteilung hochladen, damit Copilot Aussagen und Zahlen zusammenbringt.",
      "Im Prompt auf eine öffentliche Benchmark verweisen (z. B. den Gallup State of the Global Workplace). Copilot Chat ist im Web verankert und zieht die aktuellen Vergleichswerte selbst.",
      "Oben rechts von „Schnelle Antwort“ auf „Think Deeper“ umstellen. Bei einer Musteranalyse über 40+ Gespräche merkt man den Unterschied deutlich.",
    ],
    prompt: `Du bist eine erfahrene People-Analytics-Beraterin. Ich habe dir zwei Dateien hochgeladen: erstens die anonymisierten Notizen aus 47 Austrittsgesprächen der letzten zwölf Monate, zweitens unsere Fluktuationsquote je Abteilung. Arbeite die genannten Austrittsgründe heraus und gruppiere sie in höchstens sechs wiederkehrende Muster. Gewichte jedes Muster nach Häufigkeit und danach, ob es sich mit Abteilungen überschneidet, die eine überdurchschnittliche Fluktuationsquote haben. Vergleiche unsere Muster anschließend mit den aktuellen Top-Kündigungsgründen aus dem Gallup State of the Global Workplace und benenne, wo wir vom allgemeinen Bild abweichen. Gib mir zum Schluss drei priorisierte Maßnahmen, die ein HR-Team mit begrenztem Budget realistisch umsetzen kann – je Maßnahme mit dem erwarteten Effekt und einer Kennzahl, an der wir den Erfolg messen können. Schreib sachlich, ohne Marketingsprache.`,
    followups: [
      "Mach aus Maßnahme 1 eine einseitige Entscheidungsvorlage für die Geschäftsführung, höchstens 250 Wörter, mit einer klaren Empfehlung am Anfang.",
      "Welche drei Fragen sollten wir ins nächste Austrittsgespräch aufnehmen, um die größte blinde Stelle in unseren Daten zu schließen?",
    ],
    output: `Muster 2 – Fehlende Entwicklungsperspektive (17 von 47 Nennungen, konzentriert in Vertrieb und IT, beide mit Fluktuation über 15 %). Typische Aussage: „Ich wusste nach zwei Jahren nicht, was der nächste Schritt sein soll.“

Abweichung vom Benchmark: Vergütung wird bei Ihnen seltener als Hauptgrund genannt als im Gallup-Durchschnitt. Ihr Engpass ist weniger das Gehalt als die fehlende Perspektive – das ist die gute Nachricht, denn Perspektive ist günstiger zu reparieren als Gehalt.

Maßnahme 1: Verbindliche Entwicklungsgespräche alle sechs Monate, getrennt vom Jahresgespräch. Erwarteter Effekt: spürbar bei den 25- bis 35-Jährigen. Messgröße: Anteil der Mitarbeitenden mit dokumentiertem Entwicklungsziel, Ziel 80 % binnen zwölf Monaten.`,
  },
  {
    nr: "02",
    title: "Vorauswahl mit einer Bewertungsmatrix, die man verteidigen kann",
    lead: `Lebensläufe nacheinander zu lesen und „nach Gefühl“ zu sortieren ist nicht nur langsam, es ist auch angreifbar – spätestens wenn ein abgelehnter Bewerber nachfragt, warum. Eine konsistente, gewichtete Matrix ist fairer und schneller zugleich, und Copilot Chat baut sie Ihnen aus Rohdaten, selbst wenn die Tabelle unsauber ist.`,
    workflow: [
      "Die Bewerberübersicht als Excel hochladen, auch mit uneinheitlichen Spalten und Freitextnotizen. Copilot kommt mit unstrukturierten Tabellen besser zurecht, als man denkt.",
      "Die Stellenausschreibung als zweite Datei hochladen oder per Schrägstrich-Befehl aus einem offenen Dokument einfügen.",
      "Im Prompt das Anforderungsprofil gewichten lassen und ausdrücklich einen Bias-Check verlangen – das ist der Teil, den fast alle weglassen.",
    ],
    prompt: `Ich habe dir zwei Dateien gegeben: eine Excel-Liste mit 28 Bewerbern (Spalten teils uneinheitlich, mit Freitextnotizen) und unsere Stellenausschreibung für eine Teamleitung Kundenservice. Erstelle erstens aus der Ausschreibung ein Anforderungsprofil mit gewichteten Kriterien (Muss/Soll, Gewichtung in Prozent, zusammen 100). Bewerte zweitens jeden Bewerber anhand der vorhandenen Angaben pro Kriterium auf einer Skala von 1 bis 5 und berechne einen gewichteten Gesamtscore. Wo Angaben fehlen, schreib „unbekannt“, statt zu raten. Gib drittens eine Shortlist der besten sechs mit je zwei Sätzen Begründung aus. Prüfe viertens deine eigene Bewertung kritisch auf Verzerrungen: Sind Kriterien eingeflossen, die nichts mit der Eignung zu tun haben – etwa Lücken im Lebenslauf, Alter, die Herkunft des Namens oder der Studienort? Wenn ja, sag mir konkret, an welcher Stelle.`,
    followups: [
      "Formuliere für die sechs Shortlist-Kandidaten je drei kompetenzbasierte Interviewfragen, die genau auf die Lücken in ihrem Profil zielen.",
      "Erstelle eine Absagevorlage für die nicht berücksichtigten Bewerber mit Platzhaltern für einen konkreten, persönlichen Bezug, den ich je Person ausfülle.",
    ],
    output: `Anforderungsprofil (Auszug): Führungserfahrung im Service (Muss, 25 %) · Eskalationskompetenz (Muss, 20 %) · Branchennähe (Soll, 10 %) …

Bewertung (Auszug):
Kandidat C – Gesamtscore 4,3. Stark in Führung (5) und Eskalation (4), Branchennähe unbekannt. Begründung: Sieben Jahre Teamleitung im Service, klare Beispiele für Deeskalation in den Notizen.

Bias-Hinweis: In zwei Fällen war in den Freitextnotizen eine Beschäftigungslücke vermerkt. Lücken sagen nichts über die Eignung für diese Rolle aus – ich habe sie nicht in den Score einfließen lassen und empfehle, sie im Gespräch neutral anzusprechen, statt sie vorab zu werten.`,
  },
  {
    nr: "03",
    title: "Eine Betriebsvereinbarung lesbar machen und konkrete Fälle prüfen",
    lead: `Niemand schlägt für jede Rückfrage die komplette Betriebsvereinbarung auf, und genau deshalb kursieren im Unternehmen halb richtige Auskünfte. Copilot Chat kann ein hochgeladenes Dokument genau lesen und Ihnen die relevante Stelle wörtlich zeigen. Wichtig ist die Disziplin im Prompt: Er soll ausschließlich aus dem Dokument antworten und nicht frei interpretieren. Eine arbeitsrechtliche Prüfung ersetzt das nicht – als Vorklärung spart es trotzdem viel Zeit.`,
    workflow: [
      "Die Betriebsvereinbarung oder Richtlinie als PDF hochladen.",
      "Den konkreten Fall im Prompt schildern und Copilot anweisen, nur aus dem Dokument zu antworten und Passagen wörtlich mit Abschnittsnummer zu zitieren.",
      "Auf „Think Deeper“ stellen – es geht um genaues Lesen, nicht um eine schnelle Antwort.",
      "Bei rechtlicher Unsicherheit das Ergebnis als Vorbereitung nutzen und arbeitsrechtlich prüfen lassen, nicht als verbindliche Auskunft.",
    ],
    prompt: `Ich habe dir unsere Betriebsvereinbarung zur Vertrauensarbeitszeit als PDF hochgeladen. Ein Teamleiter möchte für seine Abteilung eine feste Kernarbeitszeit von 9 bis 15 Uhr einführen. Prüfe ausschließlich auf Basis des hochgeladenen Dokuments: Ist das mit der bestehenden Vereinbarung vereinbar, oder widerspricht es ihr? Zitiere die relevanten Passagen wörtlich mit Abschnittsnummer. Wenn das Dokument den Fall nicht eindeutig regelt, sag das klar, statt zu interpretieren. Gib mir am Ende drei Antwortvarianten für den Teamleiter: eine zustimmende, eine ablehnende und eine, die zunächst den Betriebsrat einbezieht.`,
    followups: [
      "Welche Punkte müssten wir mit dem Betriebsrat klären, bevor wir das umsetzen?",
      "Fasse die Vereinbarung in zehn verständlichen Stichpunkten für eine Führungskräfte-Schulung zusammen, ohne juristische Fachsprache.",
    ],
    output: `Relevant ist Abschnitt 3.2: „Die Lage der Arbeitszeit bestimmen die Mitarbeitenden im Rahmen der betrieblichen Erfordernisse eigenverantwortlich.“ Und Abschnitt 4.1: „Abweichende Anwesenheitsregelungen einzelner Abteilungen bedürfen der Zustimmung des Betriebsrats.“

Einordnung: Eine fest vorgeschriebene Kernarbeitszeit greift in die in 3.2 zugesicherte eigenverantwortliche Lage ein. Nach 4.1 wäre sie nicht ausgeschlossen, aber zustimmungspflichtig durch den Betriebsrat. Eindeutig „erlaubt ohne Weiteres“ gibt das Dokument nicht her – diese Lücke sollten Sie nicht durch eigene Auslegung schließen.`,
  },
  {
    nr: "04",
    title: "Eine neue Richtlinie zielgruppengerecht kommunizieren",
    lead: `Eine neue Regelung scheitert selten am Inhalt, sondern an der Kommunikation. Die Geschäftsführung liest etwas anderes als das Team, und die Führungskräfte brauchen Argumente für den Moment, in dem jemand im Meeting die Augen verdreht. Aus einem Dokument lassen sich diese drei Fassungen in einem Durchgang erzeugen – inklusive abgestimmter Tonalität, wenn Sie ein gutes Beispiel mitliefern.`,
    workflow: [
      "Den finalen Richtlinientext hochladen.",
      "Eine frühere, gut aufgenommene Mitarbeiter-Mail mit hochladen oder einfügen, an deren Ton sich Copilot orientieren soll. Das ist der Trick, mit dem die Texte nicht nach Vorlage klingen.",
      "Im Prompt Zielgruppen, Kanäle und Länge je Format genau festlegen.",
    ],
    prompt: `Anbei zwei Dateien: erstens unsere neue Regelung zum mobilen Arbeiten, gültig ab 1. September, und zweitens eine frühere Mitarbeiter-Mail von mir, an deren Tonalität du dich orientieren sollst. Erstelle daraus ein Kommunikationspaket. a) Eine All-Staff-Mail von höchstens 200 Wörtern, die wichtigste Änderung steht im ersten Satz. b) Eine FAQ mit den acht Fragen, die Mitarbeitende erfahrungsgemäß zuerst stellen, jeweils mit Antwort. c) Einen kurzen Leitfaden für Führungskräfte, wie sie die Regelung im Team-Meeting erklären und mit Widerstand umgehen. Verwende durchgängig dieselbe Terminologie wie im Richtliniendokument. Keine Floskeln, kein „wir freuen uns, Ihnen mitteilen zu dürfen“.`,
    followups: [
      "Übersetze die All-Staff-Mail ins Englische, gleiche Tonalität, gleiche Kürze.",
      "Schreib drei Varianten der Betreffzeile, die zum Öffnen motivieren, ohne reißerisch zu wirken.",
    ],
    output: `All-Staff-Mail (Auszug): „Ab 1. September arbeiten Sie an bis zu drei Tagen pro Woche mobil – die Absprache läuft künftig direkt im Team, nicht mehr über einen Antrag. Was das konkret heißt: …“

Führungskräfte-Leitfaden (Auszug): Typischer Einwand im Meeting – „Dann ist ja nie jemand da.“ Mögliche Antwort: Die Regelung schreibt keine festen Bürotage vor, aber das Team legt gemeinsam eine verlässliche Mindestpräsenz fest. Diese Entscheidung treffen Sie im Team, nicht ich für Sie.`,
  },
  {
    nr: "05",
    title: "Employer-Branding-Lücken finden, die Sie wirklich füllen können",
    lead: `Die meisten Karriereseiten versprechen dieselben fünf Benefits, und genau deshalb glaubt sie niemand mehr. Spannend wird es, wenn Sie Ihre echten Stärken aus den Mitarbeiterbewertungen gegen die Versprechen der Wettbewerber legen. Copilot Chat kann beides verbinden: hochgeladene eigene Bewertungen und live gelesene Karriereseiten der Konkurrenz.`,
    workflow: [
      "Einen Export Ihrer jüngsten Arbeitgeberbewertungen (Kununu, Glassdoor oder zusammenkopiert) als Datei hochladen.",
      "Im Prompt zwei bis drei konkrete Wettbewerber-Karriereseiten als vollständige URL nennen. Copilot Chat liest die Web-Inhalte direkt.",
      "Auf „Think Deeper“ stellen, weil der Abgleich zwischen Ihren Daten und mehreren Webquellen sonst oberflächlich bleibt.",
    ],
    prompt: `Ich habe dir einen Export unserer 60 jüngsten Arbeitgeberbewertungen hochgeladen. Werte zuerst aus, welche drei Stärken und welche drei Schwächen Mitarbeitende am häufigsten nennen, jeweils mit einem typischen Originalzitat. Sieh dir anschließend die Karriereseiten von [URL Wettbewerber 1], [URL Wettbewerber 2] und [URL Wettbewerber 3] an und fasse zusammen, mit welchen Argumenten diese drei um dieselben Fachkräfte werben. Stelle drittens unsere tatsächlich genannten Stärken den Versprechen der Wettbewerber gegenüber und zeig mir, wo wir glaubwürdig etwas behaupten könnten, das die anderen nicht haben. Gib mir zum Schluss fünf konkrete Inhaltsideen für unsere Karriereseite, die auf unseren echten Stärken aufbauen – keine generischen Benefits-Listen.`,
    followups: [
      "Mach aus Idee 1 einen Entwurf für einen Mitarbeiter-Testimonial-Text, den ich der betreffenden Person zur Freigabe vorlege.",
      "Welche Schwäche sollten wir zuerst angehen, weil sie in unseren Bewertungen UND im Vergleich mit den Wettbewerbern auftaucht?",
    ],
    output: `Ihre meistgenannte Stärke: direkte Erreichbarkeit der Führung und kurze Entscheidungswege („Mein Chef sitzt zwei Meter weiter, Entscheidungen dauern Minuten, nicht Wochen.“). Genau damit wirbt keiner der drei Wettbewerber – die betonen alle Weiterbildung und Obstkörbe.

Empfehlung: Bauen Sie nicht das zwölfte Weiterbildungsversprechen, sondern erzählen Sie die kurzen Wege an einem echten Beispiel. Die Schwäche, die Sie zuerst angehen sollten, ist das Onboarding: Sie taucht in Ihren Bewertungen auf Platz 1 der Kritik auf und wird von zwei Wettbewerbern offensiv als Stärke ausgespielt.`,
  },
];

// ─── Daten: Teil 2 — Microsoft 365 Copilot (Vollizenz) ─────────────────────
type LizenzCase = {
  nr: string;
  title: string;
  badge: string;
  lead: string;
  setup: string[];
  prompt: string;
  output: string;
};

const TIPS_LIZENZ: LizenzCase[] = [
  {
    nr: "06",
    title: "HR-Analytics, bei der Copilot die Tabelle wirklich rechnet",
    badge: "Copilot in Excel",
    lead: `Der Unterschied zur Gratis-Variante ist konkret: Im kostenlosen Chat analysiert Copilot eine hochgeladene Kopie Ihrer Tabelle. Mit Lizenz arbeitet Copilot in Excel direkt in der echten Arbeitsmappe – er legt PivotTables an, schreibt Formeln, formatiert und kommentiert das Ergebnis, ohne dass Sie eine Formel tippen.`,
    setup: [
      "Die Personaldatei in Excel öffnen und den Datenbereich als Tabelle formatieren (Strg+T) – damit Copilot die Struktur sauber erkennt.",
      "Den Copilot-Seitenbereich über das Menüband öffnen.",
      "Den Auftrag in normaler Sprache stellen; Copilot fragt bei Unklarheiten nach.",
    ],
    prompt: `Analysiere diese Personaldaten. Berechne Fluktuation, durchschnittliche Betriebszugehörigkeit und Krankenstand je Abteilung und Jahr. Erstelle eine PivotTable, die die Entwicklung über die letzten drei Jahre zeigt, hebe Abteilungen mit überdurchschnittlichem Anstieg farblich hervor und schreib mir darunter einen Management-Kommentar von höchstens 150 Wörtern mit drei Beobachtungen und einer Empfehlung.`,
    output: `Copilot legt die PivotTable als neues Blatt an, markiert zwei Abteilungen rot und schreibt: „Die Fluktuation im Vertrieb ist von 11 % auf 19 % gestiegen, während der Krankenstand stabil blieb – das spricht eher für Abwanderung als für Belastung. Auffällig: Die betroffene Abteilung hatte 2025 zwei Führungswechsel. Empfehlung: Ursachen vor der nächsten Recruiting-Welle klären, sonst füllen Sie ein Fass ohne Boden.“`,
  },
  {
    nr: "07",
    title: "Ein HR-Agent, der die immer gleichen Fragen abfängt",
    badge: "Agent Builder",
    lead: `Die teuerste Aufgabe im HR ist keine einzelne, sondern die Summe der Routinefragen: Urlaubsanspruch, Elternzeit, Reisekosten, Onboarding-Ablauf. Mit der Lizenz bauen Sie im Agent Builder von Microsoft 365 Copilot einen eigenen Agenten, der diese Fragen aus Ihren echten Dokumenten beantwortet – per natürlicher Sprache eingerichtet, ohne eine Zeile Code.`,
    setup: [
      "In Microsoft 365 Copilot „Agent erstellen“ wählen und im Dialog beschreiben, was der Agent tun soll. Name, Beschreibung und Anweisungen füllen sich beim Tippen automatisch.",
      "Als Wissensquelle die SharePoint-Site verknüpfen, auf der Ihre HR-Richtlinien, Onboarding-Unterlagen und FAQ ohnehin liegen – das ist der schnellste verlässliche Treffer.",
      "Den Agenten mit echten Fragen testen und anschließend im Unternehmen teilen.",
    ],
    prompt: `Erstell einen Agenten namens „HR-Lotse“. Er beantwortet Mitarbeiterfragen zu Urlaub, Elternzeit, Reisekosten und Onboarding ausschließlich auf Basis der verknüpften SharePoint-Dokumente. Wenn eine Frage dort nicht beantwortet wird, verweist er an hr@unsere-firma.de, statt zu raten. Tonalität: freundlich und knapp, siezen. Nenne bei jeder Antwort das Quelldokument, aus dem die Information stammt.`,
    output: `Mitarbeiterfrage: „Wie viele Tage Sonderurlaub habe ich bei einem Umzug?“ – Antwort des Agenten: „Bei einem Umzug aus betrieblichem Anlass erhalten Sie zwei Tage Sonderurlaub, bei einem privaten Umzug einen Tag. (Quelle: Betriebsvereinbarung Sonderurlaub, Abschnitt 2.4.) Für Sonderfälle wenden Sie sich an hr@unsere-firma.de.“`,
  },
  {
    nr: "08",
    title: "Der belegte Tiefenbericht statt zehn offener Browser-Tabs",
    badge: "Researcher-Agent",
    lead: `Viele „Recherchen“ im HR bestehen aus ein paar Google-Tabs und einem Bauchgefühl. Der Researcher-Agent – verfügbar mit Copilot-Lizenz beziehungsweise Microsoft 365 Premium – liefert stattdessen einen quellenbelegten Bericht, der Web-Daten und Ihre eigenen Dokumente kombiniert und am Ende als Word-Datei herausfällt.`,
    setup: [
      "Den Researcher in Microsoft 365 Copilot starten.",
      "Auftrag stellen und ausdrücklich angeben, dass interne Quellen (SharePoint, Dateien) einbezogen werden sollen.",
      "Den fertigen, quellenbelegten Bericht nach Word oder PDF exportieren und vor Verwendung kurz gegenlesen.",
    ],
    prompt: `Erstelle einen quellenbelegten Bericht zum Vergütungs- und Benefits-Benchmark für die Rolle „Senior Software Engineer“ im Raum Köln/Bonn. Nutze öffentliche Gehaltsdaten aus dem Web und gleiche sie mit unserer internen Gehaltsbandstruktur ab, die im verknüpften SharePoint liegt. Zeig mir, wo unsere Bänder unter Marktniveau liegen, und leite eine begründete Empfehlung für die nächste Gehaltsrunde ab. Exportiere das Ergebnis als Word-Dokument mit Quellenangaben.`,
    output: `Der Bericht (rund vier Seiten, mit Fußnoten) hält fest: Das Marktmedian für die Rolle liegt etwa 8 % über Ihrer aktuellen Bandobergrenze; im unteren Banddrittel sind Sie wettbewerbsfähig, im oberen verlieren Sie gegen größere Arbeitgeber. Empfehlung: Statt das gesamte Band anzuheben, gezielt die Obergrenze für die erfahrenen Profile öffnen – das adressiert genau die Gruppe mit der höchsten Abwanderung.`,
  },
  {
    nr: "09",
    title: "Eine mehrstufige Aufgabe komplett abgeben",
    badge: "Copilot Cowork",
    lead: `Der eigentliche Sprung in diesem Jahr ist nicht der bessere Entwurf, sondern die erledigte Aufgabe. Copilot Cowork – seit Mitte Juni 2026 allgemein verfügbar – nimmt einen mehrstufigen Auftrag an, erstellt einen Plan, arbeitet im Hintergrund und legt Ihnen an definierten Punkten einen Zwischenstand vor. Sie beschreiben das Ergebnis, nicht den Weg.`,
    setup: [
      "Den Auftrag als Ergebnis formulieren, nicht als Einzelschritt. Cowork zerlegt ihn selbst in einen Plan.",
      "Auf die verwendeten Quellen verweisen – Ordner, Dateien, Vorlagen. Cowork erdet die Arbeit in Ihren Mails, Dateien und Daten.",
      "Einen Checkpoint zur Freigabe einbauen, damit nichts Endgültiges ohne Ihren Blick passiert.",
    ],
    prompt: `Vereinheitliche alle Stellenbeschreibungen aus dem Ordner „Recruiting/Profile“ auf unsere neue Vorlage, die im selben Ordner liegt. Markiere in jeder Beschreibung Formulierungen, die rechtlich heikel oder nicht diskriminierungsfrei sind, und schlag eine neutrale Alternative vor. Erstelle am Ende eine Übersichtstabelle, welche Beschreibungen stark überarbeitet werden mussten und warum. Leg mir vor dem Speichern einen Zwischenstand zur Freigabe vor.`,
    output: `Cowork zeigt zuerst den Plan: 40 Dateien lesen, gegen die Vorlage angleichen, Sprachprüfung, Übersichtstabelle. Nach dem Hintergrundlauf der Checkpoint: „38 von 40 angeglichen, 2 zur Klärung markiert. In 11 Beschreibungen Formulierungen wie ‚junges, dynamisches Team‘ ersetzt durch altersneutrale Varianten. Übersichtstabelle erstellt. Soll ich speichern?“ Sie geben frei – oder korrigieren die zwei Sonderfälle vorher.`,
  },
  {
    nr: "10",
    title: "Jahresgespräche vorbereiten, ohne ein Jahr nachzulesen",
    badge: "Copilot in Outlook & Word",
    lead: `Was im Gratis-Chat das mühsame Hochladen einzelner Dateien ist, erledigt die Lizenz über Ihren Microsoft Graph von selbst: Copilot greift mit Ihrer Berechtigung auf die relevante Korrespondenz, Dokumente und Meeting-Notizen zu. Für die Vorbereitung eines Jahresgesprächs spart das je Mitarbeiter eine gute halbe Stunde – bei 30 Gesprächen ist das ein ganzer Arbeitstag.`,
    setup: [
      "Copilot in Outlook oder Word öffnen.",
      "Den Mitarbeiter benennen und den Zeitraum eingrenzen. Copilot zieht nur, worauf Sie ohnehin Zugriff haben.",
      "Die Zusammenfassung als Gesprächsleitfaden ausgeben lassen und vertraulich behandeln – Mitbestimmung und Datenschutz vorab klären.",
    ],
    prompt: `Bereite mein Jahresgespräch mit [Mitarbeitername] vor. Fasse aus unserer Korrespondenz, den geteilten Projektdokumenten und den Meeting-Notizen der letzten zwölf Monate zusammen: die drei größten Beiträge, zwei Entwicklungsfelder und die offenen Themen aus dem letzten Gespräch. Formuliere daraus einen strukturierten Gesprächsleitfaden mit konkreten Beispielen, auf die ich mich im Gespräch beziehen kann.`,
    output: `Leitfaden (Auszug): „Größter Beitrag: Übernahme des Migrationsprojekts nach dem Ausfall des Kollegen im März – termingerecht abgeschlossen, im Lenkungskreis-Protokoll vom 12.5. ausdrücklich erwähnt. Entwicklungsfeld: delegiert ungern, in drei Projektmails selbst Aufgaben übernommen, die ins Team gehört hätten. Offenes Thema aus dem Vorjahr: Wunsch nach Projektleitung – jetzt einlösbar.“`,
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
        <title>Zehn Copilot-Workflows für HR | copilotenschule.de</title>
        <meta
          name="description"
          content="Fünf HR-Workflows mit dem kostenlosen Copilot Chat plus fünf mit Vollizenz – mit vollständigen Prompts, Datei-Upload und Web-Quellen. Für Personalverantwortliche."
        />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://copilotenschule.de/sml/hr-tipps_2026" />
      </Helmet>

      <div className="min-h-screen bg-white text-slate-800">

        {/* ── HEADER / HERO ─────────────────────────────────────────────── */}
        <header className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block bg-white/10 border border-white/15 text-slate-200 text-sm font-medium px-3 py-1 rounded-full mb-6">
              Für Personalverantwortliche
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-5 leading-tight">
              Zehn Copilot-Workflows für HR,<br className="hidden md:block" /> auf die man nicht in zwei Minuten selbst kommt
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Fünf laufen sofort mit dem kostenlosen Copilot Chat, fünf zeigen, wohin die Reise mit
              Vollizenz geht. Jeweils mit dem vollständigen Prompt, dem Datei-Upload und den Web-Quellen –
              nicht nur der Idee dahinter.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleBookingClick}
                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Kostenloses Erstgespräch buchen
              </a>
              <Link
                to="/trainings"
                onClick={handleOffersClick}
                className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium px-6 py-3 rounded-lg transition-colors"
              >
                Unsere Trainings ansehen
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-4 py-12">

          {/* ── DATENSCHUTZ-HINWEIS (vor dem ersten Upload) ───────────── */}
          <div className="border-l-4 border-slate-400 bg-slate-50 rounded-r-lg p-5 mb-12">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Kurz zum Datenschutz, bevor Sie Dateien hochladen
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              Diese Workflows setzen voraus, dass Sie mit Ihrem Geschäftskonto (Microsoft Entra) im
              Copilot Chat angemeldet sind. Dann greift die Enterprise Data Protection von Microsoft:
              Ihre Eingaben und hochgeladenen Dateien werden nicht zum Training der Modelle verwendet und
              bleiben im Kontext Ihres Mandanten. Genau hier liegt ein verbreiteter Fehler – viele tippen
              sensible Personaldaten in den Copilot mit einem privaten Microsoft-Konto, und dort gilt
              dieser Schutz nicht. Schwärzen Sie Klarnamen, wo es ohne Informationsverlust geht, und
              stimmen Sie den Umgang mit Beschäftigtendaten vorab mit Datenschutz und Betriebsrat ab.
            </p>
          </div>

          {/* ── SECTION A: KOSTENLOSE WORKFLOWS ──────────────────────── */}
          <section className="mb-12">
            <div className="mb-2">
              <span className="bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                Teil 1 von 2 · ohne Lizenz
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Fünf Workflows mit dem kostenlosen Copilot Chat
            </h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Copilot Chat ist für alle mit einem Microsoft-Geschäftskonto kostenlos – ohne separate
              Copilot-Lizenz, erreichbar unter{" "}
              <a
                href="https://m365.cloud.microsoft/chat"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                m365.cloud.microsoft/chat
              </a>{" "}
              oder direkt in Teams und Outlook. Datei-Upload und Web-Recherche sind enthalten. Der
              Unterschied zwischen brauchbar und beeindruckend liegt fast nie am Werkzeug, sondern am
              Kontext, den Sie mitliefern.
            </p>

            <div className="space-y-8">
              {TIPS_CHAT.map((tip) => (
                <article key={tip.nr} className="border border-slate-200 rounded-xl p-6">
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-2xl font-bold text-slate-300 tabular-nums">{tip.nr}</span>
                    <h3 className="text-lg md:text-xl font-bold text-slate-900">{tip.title}</h3>
                  </div>

                  <p className="text-slate-600 text-[15px] leading-relaxed mb-5">{tip.lead}</p>

                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    So gehen Sie vor
                  </p>
                  <ol className="list-decimal list-outside ml-5 space-y-1.5 text-sm text-slate-700 mb-5">
                    {tip.workflow.map((step, i) => (
                      <li key={i} className="leading-relaxed pl-1">{step}</li>
                    ))}
                  </ol>

                  <div className="bg-slate-900 rounded-lg p-4 mb-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Der vollständige Prompt
                    </p>
                    <p className="text-sm text-slate-100 leading-relaxed whitespace-pre-line">{tip.prompt}</p>
                  </div>

                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Nachschärfen
                  </p>
                  <ul className="space-y-1.5 text-sm text-slate-700 mb-5">
                    {tip.followups.map((f, i) => (
                      <li key={i} className="leading-relaxed pl-4 border-l-2 border-slate-200">{f}</li>
                    ))}
                  </ul>

                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-2">
                      Beispiel-Ausschnitt aus der Antwort
                    </p>
                    <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{tip.output}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* ── PLAKATIVER HINWEIS: Gratis vs. Vollizenz ──────────────── */}
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-7 mb-12">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-2">
              Wichtig
            </p>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
              Alle fünf Workflows oben laufen mit dem kostenlosen Copilot Chat. Mit Vollizenz ändert sich
              die Spielklasse.
            </h3>
            <p className="text-slate-700 text-[15px] leading-relaxed">
              Sobald Microsoft 365 Copilot als Lizenz dazukommt, müssen Sie nichts mehr hochladen: Copilot
              greift mit Ihrer Berechtigung direkt auf Ihre Unternehmensdaten zu. Dazu kommen eigene
              Agenten, die Routinefragen Ihres Teams automatisch beantworten, und Copilot Cowork, das
              mehrstufige Aufgaben eigenständig zu Ende bringt. Genau für diesen Schritt – inklusive
              Agent-Erstellung und Copilot Cowork – haben wir eigene Trainingsformate. Die folgenden fünf
              Beispiele zeigen, was damit möglich wird.
            </p>
          </div>

          {/* ── SECTION B: VOLLIZENZ-WORKFLOWS ────────────────────────── */}
          <section className="mb-12">
            <div className="mb-2">
              <span className="bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                Teil 2 von 2 · mit Vollizenz
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Fünf Workflows mit Microsoft 365 Copilot
            </h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Mit der Lizenz verschiebt sich die Arbeit von „Copilot hilft beim Entwurf“ zu „Copilot
              erledigt den Schritt“. Tiefe Integration in Word, Excel und Outlook, eigene Agenten und
              Hintergrund-Automatisierung sind nicht mehr Spielerei, sondern reduzieren Verwaltungsarbeit
              strukturell.
            </p>

            <div className="space-y-8">
              {TIPS_LIZENZ.map((tip) => (
                <article key={tip.nr} className="border border-slate-200 rounded-xl p-6">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-2xl font-bold text-blue-200 tabular-nums">{tip.nr}</span>
                    <h3 className="text-lg md:text-xl font-bold text-slate-900">{tip.title}</h3>
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-3 ml-9">
                    {tip.badge}
                  </p>

                  <p className="text-slate-600 text-[15px] leading-relaxed mb-5">{tip.lead}</p>

                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    So richten Sie es ein
                  </p>
                  <ol className="list-decimal list-outside ml-5 space-y-1.5 text-sm text-slate-700 mb-5">
                    {tip.setup.map((step, i) => (
                      <li key={i} className="leading-relaxed pl-1">{step}</li>
                    ))}
                  </ol>

                  <div className="bg-slate-900 rounded-lg p-4 mb-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Auftrag an Copilot
                    </p>
                    <p className="text-sm text-slate-100 leading-relaxed whitespace-pre-line">{tip.prompt}</p>
                  </div>

                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-2">
                      Beispiel-Ergebnis
                    </p>
                    <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{tip.output}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* ── HAUPT-CTA ─────────────────────────────────────────────── */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-800 rounded-2xl p-8 text-white text-center mb-12">
            <h3 className="text-xl md:text-2xl font-bold mb-2">
              Lohnt sich das für Ihr Team – und ist die Copilotenschule der richtige Partner dafür?
            </h3>
            <p className="text-blue-100 text-sm mb-6 max-w-xl mx-auto leading-relaxed">
              In einem kostenlosen 15-Minuten-Gespräch schauen wir gemeinsam, wo Copilot bei Ihnen den
              größten Hebel hat und welches Format dazu passt. Kein Verkaufsgespräch, ein ehrliches
              Erstgespräch.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleBookingClick}
                className="inline-flex items-center justify-center bg-white text-blue-800 hover:bg-blue-50 font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Termin buchen
              </a>
              <Link
                to="/kontakt"
                onClick={handleContactClick}
                className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/30 text-white font-medium px-6 py-3 rounded-lg transition-colors"
              >
                Nachricht schreiben
              </Link>
            </div>
          </div>

          {/* ── WEITERLESEN ───────────────────────────────────────────── */}
          <section className="mb-12">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-7">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Zum Weiterlesen
              </p>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Copilot im HR: Wo Personalabteilungen wirklich Zeit gewinnen
              </h3>
              <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                Der vertiefende Fachartikel ordnet die wirkungsvollsten HR-Anwendungsfälle ein – von
                Stellenausschreibung über Zeugnisse bis People Analytics, mit konkreter Zeitersparnis und
                einer Empfehlung für die schrittweise Einführung.
              </p>
              <Link
                to="/wissen/copilot-hr-use-cases"
                onClick={handleArticleClick}
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-sm underline underline-offset-4"
              >
                Zum vollständigen Artikel
              </Link>
            </div>
          </section>

          {/* ── BOTTOM CTA ────────────────────────────────────────────── */}
          <section className="border-t border-slate-200 pt-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                Nächster Schritt: Copilot-Bedarf im Team klären
              </h2>
              <p className="text-slate-600 max-w-xl mx-auto leading-relaxed">
                Die copilotenschule.de bietet praxisnahe Copilot-Trainings für Unternehmen – keine
                generischen KI-Kurse, sondern Formate, die direkt im Arbeitsalltag wirken, inklusive
                Agent-Erstellung und Copilot Cowork für Lizenz-Teams.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleBookingClick}
                className="flex flex-col items-center text-center bg-blue-700 hover:bg-blue-600 text-white rounded-xl p-6 transition-colors"
              >
                <span className="font-bold mb-1">Termin buchen</span>
                <span className="text-blue-200 text-xs">15 Min. kostenlos</span>
              </a>

              <Link
                to="/trainings"
                onClick={handleOffersClick}
                className="flex flex-col items-center text-center bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-xl p-6 transition-colors"
              >
                <span className="font-bold mb-1">Unsere Angebote</span>
                <span className="text-slate-500 text-xs">Trainings &amp; Workshops</span>
              </Link>

              <Link
                to="/"
                onClick={handleHomeClick}
                className="flex flex-col items-center text-center bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-xl p-6 transition-colors"
              >
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

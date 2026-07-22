import { Brain, Shield, Laptop, Zap, Scale, GraduationCap, Wrench, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type CopilotTier = "free" | "paid";

// Buchungsvarianten (B7, 2026-07-22): ersetzen die früheren "Buchbar als:"-Feature-Bullets.
// Sichtbar als Abschnitt "Formate und Buchungsvarianten"; im Schema wird je Variante
// eine eigene CourseInstance ausgegeben.
export type BookingMode = "onsite" | "online" | "blended";

export const BOOKING_MODE_LABELS: Record<BookingMode, string> = {
  onsite: "Inhouse / vor Ort",
  online: "Live-Online",
  blended: "Kombiniert (Präsenz + Online)",
};

export interface BookingFormat {
  name: string;         // z.B. "Ganztag (7 Stunden)"
  modes: BookingMode[];
  durationISO?: string; // ISO 8601 für schema.org CourseInstance.duration
  workload?: string;    // sichtbarer Umfang, z.B. "2 Stunden pro Woche über 4–6 Wochen"
  description?: string; // 1 Satz Einordnung der Variante
  badge?: string;       // z.B. "Meistverkauft" – auffälliger Störer an der Variantenkarte
}

export interface TrainingFAQ {
  question: string;
  answer: string;
}

export interface Training {
  slug: string;
  icon: LucideIcon;
  title: string;
  duration: string;
  durationISO?: string;  // ISO 8601 duration for schema.org
  description: string;
  features: string[];
  tiers: CopilotTier[];
  // Neue Rubriken für Content-Tiefe & LLM-Sichtbarkeit
  questionLead?: string;          // Kursive LLM-Frage als Teaser
  targetAudience?: string[];      // Wer profitiert davon
  learningOutcomes?: string[];    // Was lernen die Teilnehmer
  businessImpact?: string[];      // Erwartbare Effekte im Arbeitsalltag
  // SEO-Felder
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  // FAQ für strukturierte Daten
  faqs?: TrainingFAQ[];
  // "Häufig gebucht" Badge
  popular?: boolean;
  // "NEU" Badge – wird auf der Übersichtskachel als auffälliger Hinweis angezeigt
  isNew?: boolean;
  // Voraussetzungen je Training (Lizenz, Vorkenntnisse) – wird im Course-Schema
  // als coursePrerequisites ausgegeben (B2, 2026-07-22)
  prerequisites?: string;
  // "Auf einen Blick"-Faktenbox (B7, 2026-07-22): sichtbare Kernfakten im Hero
  format?: string;        // z.B. "Inhouse vor Ort oder Live-Online"
  level?: string;         // z.B. "Einsteiger", "Fortgeschrittene"
  audienceShort?: string; // Kurzform der Zielgruppe für die Faktenbox
  groupSize?: string;     // z.B. "bis 12 Teilnehmende"
  certificate?: string;   // sichtbarer Nachweis; geht zusätzlich als educationalCredentialAwarded ins Schema
  // Optionales Bild fürs Course-Schema (absolute URL). Fallback: Site-Logo
  // (DEFAULT_COURSE_IMAGE in lib/schema.ts). B6-Rest, 2026-07-22.
  image?: string;
  // Permanent sichtbarer Preis-Störer (unabhängig vom A/B-Test ab_pricing). Der Preis
  // wird dann AUCH ins Schema (Offer.price) übernommen – sichtbar und maschinenlesbar
  // bleiben deckungsgleich. Aktuell nur eu-ai-act-pflichtschulung (2026-07-22).
  visiblePrice?: {
    perPerson: number;   // "ab"-Preis in EUR
    unitLabel?: string;  // Default "pro Teilnehmer"
    note?: string;       // z.B. "inkl. Zertifikat."
  };
  bookingFormats?: BookingFormat[]; // Varianten für Abschnitt "Formate und Buchungsvarianten" + Schema
  // Optionaler Preis pro Person. ACHTUNG (B1, 2026-07-22): Wird derzeit NICHT
  // ins Schema ausgegeben, solange der A/B-Test "Preise auszeichnen" läuft –
  // Preise erst nach Testentscheid wieder maschinenlesbar machen.
  pricePerPerson?: number;
  pricePerPersonLabel?: string; // optional: Preisbeschreibung (aktuell ungenutzt, s.o.)
  // A/B-Test "Preise auszeichnen": sichtbarer "ab"-Preis-Störer NUR auf der B-Route
  // (/trainings/preis/:slug). Werte in EUR, Basis Gruppengröße 12 Teilnehmer.
  abPreisProPerson?: number;   // z.B. 133  -> "ab 133 €* pro Teilnehmer"
  abPreisProGruppe?: number;   // z.B. 1600 -> "oder ab 1.600 €* pro geschlossene Gruppe"
  // Verknüpfte Workshops (Slugs) – werden als optionale Erweiterungsmodule angezeigt
  relatedWorkshops?: string[];
}

// Alle Trainingsmodule mit SEO-optimierten Slugs
export const trainings: Training[] = [
  {
    slug: "copilot-grundlagen-prompt-design",
    icon: Brain,
    title: "Copilot Grundlagen: Prompt Design & KI-Kompetenz",
    duration: "Halbtag (4 h) | Ganztag (7 h)",
    durationISO: "PT4H",
    description: "Fundiertes Einsteiger-Training in die Arbeit mit KI-Assistenten: Sie lernen, wie Sie effektive Prompts formulieren, KI-Outputs kritisch bewerten und Microsoft Copilot Chat strategisch für Recherche, Textarbeit und kreative Aufgaben einsetzen. Dieses 4-stündige Kick-Off ist zugleich das Pflichttraining nach EU AI Act: Es erfüllt die KI-Einweisungspflicht (AI Literacy, Artikel 4), die jeder Arbeitgeber seit Februar 2025 jedem Mitarbeitenden geben muss, der mit KI arbeitet. Über die reine Pflichtunterweisung hinaus erhalten Ihre Teilnehmer eine echte, praxisnahe Einweisung in Microsoft Copilot Chat – inklusive vieler Tipps und Tricks auch für bereits erfahrene Copilot-Nutzer. Jeder Teilnehmer erhält ein Zertifikat „Schulung gemäß EU AI-Act“. Ideal für alle, die noch keine Copilot-Lizenz haben oder zunächst die Grundlagen beherrschen wollen.",
    features: [
      "Pflichtunterweisung erfüllt: Dieses Training ist die nach EU AI Act vorgeschriebene KI-Einweisung, die ein Arbeitgeber jedem Mitarbeitenden geben muss, der mit KI arbeitet",
      "EU AI Act kompakt: Was das KI-Gesetz von Ihnen und Ihren Mitarbeitenden verlangt (KI-Kompetenz-/Einweisungspflicht nach Artikel 4)",
      "Risikogruppen nach EU AI-Act: Welche KI-Anwendungen als minimales, begrenztes oder hohes Risiko gelten – und was das für die tägliche Arbeit bedeutet",
      "Echte Copilot-Chat-Einweisung statt trockener Theorie – mit vielen Tipps & Tricks auch für bereits erfahrene Copilot-Nutzer",
      "Teilnehmer-Zertifikat „Schulung gemäß EU AI-Act“ zum Nachweis der erfüllten Schulungspflicht",
      "Prompt Engineering Grundlagen: Struktur, Kontext, Beispiele – wie Sie Copilot präzise Anweisungen geben",
      "Die Kunst der richtigen Frage: Von vagen Anfragen zu punktgenauen Ergebnissen",
      "Iteratives Prompting: Ergebnisse verfeinern, nachfragen, in die Tiefe gehen",
      "Copilot Chat für Recherche: Web-Suche, Zusammenfassungen, Faktenprüfung",
      "Textarbeit mit KI: Schreiben, Umformulieren, Kürzen, Übersetzen, Tonalität anpassen",
      "Kreative Anwendungen: Brainstorming, Ideengenerierung, Perspektivwechsel",
      "KI-Output kritisch bewerten: Halluzinationen erkennen, Quellen prüfen, Grenzen verstehen",
      "Eigene Prompt-Bibliothek aufbauen: Templates für wiederkehrende Aufgaben – umgesetzt durch das Anlegen eigener Copilot Agenten",
      "KI-unterstützte Automatisierung von Teilschritten der Arbeit durch Copilot Agenten"
    ],
    tiers: ["free"],
    popular: true,
    abPreisProPerson: 133,
    abPreisProGruppe: 1600,
    questionLead: "Welches Training eignet sich am besten, um Microsoft Copilot von Grund auf zu lernen – auch ohne Lizenz?",
    prerequisites: "Keine Vorkenntnisse erforderlich. Eine Copilot-Lizenz wird nicht benötigt – der kostenlose Microsoft Copilot Chat genügt.",
    format: "Inhouse bei Ihnen vor Ort oder Live-Online",
    level: "Einsteiger",
    audienceShort: "Alle Mitarbeitenden – auch ohne Copilot-Lizenz",
    groupSize: "bis 12 Teilnehmende",
    certificate: "Teilnehmer-Zertifikat „Schulung gemäß EU AI-Act“",
    bookingFormats: [
      {
        name: "Halbtag (4 Stunden)",
        modes: ["onsite", "online"],
        durationISO: "PT4H",
        badge: "Meistgebucht",
        description: "Kompaktes Kick-off für ganze Teams – erfüllt zugleich die KI-Einweisungspflicht nach EU AI Act."
      },
      {
        name: "Ganztag (7 Stunden)",
        modes: ["onsite", "online"],
        durationISO: "PT7H",
        badge: "Empfohlen",
        description: "Mit viel Raum für praktische Übungen – unsere Empfehlung, wenn das Gelernte direkt in den Arbeitsalltag übergehen soll."
      }
    ],
    targetAudience: [
      "Büromitarbeiter, die zum ersten Mal mit KI-Assistenten arbeiten und einen strukturierten Einstieg suchen",
      "Teamleiter, die ihr Team auf die Copilot-Einführung vorbereiten wollen, bevor Lizenzen beschafft werden",
      "L&D-Verantwortliche, die ein Grundlagen-Modul für die KI-Kompetenz im Unternehmen brauchen",
      "Assistenzen und Office Manager, die Routineaufgaben mit KI beschleunigen möchten"
    ],
    learningOutcomes: [
      "Sie erfüllen die KI-Einweisungspflicht nach EU AI Act (Artikel 4) und kennen die Risikogruppen des KI-Gesetzes – dokumentiert per Teilnehmer-Zertifikat „Schulung gemäß EU AI-Act“",
      "Sie formulieren präzise Prompts mit klarer Struktur, Kontext und Beispielen – und erhalten deutlich bessere KI-Antworten",
      "Sie bewerten KI-Outputs kritisch: Halluzinationen erkennen, Fakten prüfen, Grenzen einschätzen",
      "Sie nutzen Copilot Chat produktiv für Recherche, Texterstellung, Zusammenfassungen und kreative Aufgaben",
      "Sie entwickeln eine persönliche Prompt-Bibliothek mit Templates für Ihre wiederkehrenden Aufgaben",
      "Sie automatisieren erste Teilschritte Ihrer Arbeit durch das Anlegen eigener Copilot Agenten"
    ],
    businessImpact: [
      "Recherche-Aufgaben, die bisher 30-60 Minuten dauerten, erledigen Sie in unter 10 Minuten",
      "Texterstellung (E-Mails, Berichte, Zusammenfassungen) wird 3-5x schneller bei gleichbleibender Qualität",
      "Die Hemmschwelle gegenüber KI sinkt – Mitarbeiter nutzen Copilot eigenständig im Alltag",
      "Der spätere Umstieg auf Microsoft 365 Copilot (bezahlte Version) gelingt deutlich schneller: Das Kickoff muss nicht wiederholt werden – die [Lernreise-Module des Praxis-Trainings](/trainings/microsoft-365-copilot-praxis) setzen direkt darauf auf und trainieren den Copilot-Umgang in den Office-Apps"
    ],
    metaTitle: "Copilot Grundlagen Training – Prompt Design & KI-Kompetenz | copilotenschule.de",
    metaDescription: "Lernen Sie effektives Prompt Engineering für Microsoft Copilot. Einsteiger-Training für KI-Assistenten: Prompts formulieren, Outputs bewerten, produktiv arbeiten.",
    keywords: ["Copilot Grundlagen", "Prompt Engineering Training", "KI-Kompetenz Schulung", "Microsoft Copilot Einsteiger", "Prompt Design lernen"],
    faqs: [
      {
        question: "Müssen wir unsere Mitarbeitenden nach dem EU AI Act zu KI schulen – und deckt dieses Training das ab?",
        answer: "Ja. Der EU AI Act verpflichtet Arbeitgeber (Art. 4, wirksam seit Februar 2025) dazu, für ausreichende KI-Kompetenz aller Mitarbeitenden zu sorgen, die KI-Systeme wie Microsoft Copilot einsetzen. Dieses 4-stündige Kick-Off ist genau diese Pflichtunterweisung: Es vermittelt die verlangte KI-Kompetenz, erklärt die Risikogruppen des KI-Gesetzes und schließt mit einem Teilnehmer-Zertifikat „Schulung gemäß EU AI-Act“ ab. Gleichzeitig ist es eine echte, praxisnahe Copilot-Chat-Einweisung mit vielen Tipps und Tricks – also Pflichterfüllung und produktiver Mehrwert in einem. Hinweis: Die konkrete Auslegung des EU AI Act sollten Sie im Zweifel rechtlich prüfen lassen."
      },
      {
        question: "Warum bekomme ich von Copilot oft unbrauchbare oder zu allgemeine Antworten?",
        answer: "Die Qualität der KI-Antworten hängt direkt von der Qualität Ihrer Anfrage ab. Ohne klare Struktur, Kontext und konkrete Beispiele in Ihren Prompts liefert Copilot generische Ergebnisse. Mit gezieltem Prompt Engineering lernen Ihre Mitarbeiter, präzise Anfragen zu formulieren – und erhalten damit deutlich bessere, sofort nutzbare Ergebnisse."
      },
      {
        question: "Wie kann ich mein Team auf KI vorbereiten, bevor wir Copilot-Lizenzen kaufen?",
        answer: "Starten Sie mit dem kostenlosen Microsoft Copilot Chat. Ihre Mitarbeiter können dort bereits die Grundlagen des Promptings üben – Recherche, Texterstellung, Zusammenfassungen. So bauen sie KI-Kompetenz auf, bevor die kostenpflichtigen Lizenzen kommen, und der spätere Umstieg auf Microsoft 365 Copilot fällt deutlich leichter."
      },
      {
        question: "Wie erkennen meine Mitarbeiter, ob eine KI-Antwort korrekt ist oder halluziniert?",
        answer: "Kritische Bewertung von KI-Outputs ist eine erlernbare Kompetenz. Dazu gehört: Quellen prüfen, Fakten hinterfragen, bei Web-Suchen die Original-Links checken und die typischen Muster von KI-Halluzinationen kennen. Diese kritische KI-Kompetenz schützt vor teuren Fehlern durch blindes Vertrauen in KI-generierte Inhalte."
      },
      {
        question: "Funktionieren Prompt-Techniken für ChatGPT auch bei Microsoft Copilot?",
        answer: "Ja, die Grundprinzipien guten Promptings sind plattformübergreifend anwendbar – ob Copilot, ChatGPT, Claude oder Gemini. Wer einmal versteht, wie man Kontext gibt, Beispiele nutzt und iterativ verfeinert, kann diese Techniken bei allen KI-Assistenten einsetzen."
      },
      {
        question: "Wir starten ohne Lizenzen – müssen wir das Training nach dem Umstieg auf Microsoft 365 Copilot wiederholen?",
        answer: "Nein. Das Grundlagen-Kickoff vermittelt Prompt-Kompetenz, das kritische Bewerten von KI-Antworten und die EU-AI-Act-Pflichtinhalte – all das gilt unabhängig von der Lizenz und muss nicht erneut durchgeführt werden. Beim Umstieg auf Microsoft 365 Copilot setzen Ihre Teams direkt darauf auf: Die Lernreise-Module des Praxis-Trainings bringen die User aufs nächste Level, weil dort der Copilot-Umgang direkt in Word, Excel, PowerPoint, Outlook und Teams geübt und erarbeitet wird."
      }
    ]
  },
  {
    slug: "microsoft-365-copilot-praxis",
    abPreisProPerson: 383,
    abPreisProGruppe: 4600,
    icon: Brain,
    title: "Microsoft 365 Copilot in der Praxis: Word, Excel, PowerPoint, Outlook & Teams",
    duration: "Ganztag | 2-tägig | Online-Lernreise (6–8 h) | Kickoff (4 h) + Online-Lernreise (4 × 2 h)",
    durationISO: "PT7H",
    description: "Praxisorientiertes Training für Copilot-Lizenzinhaber: Sie lernen, wie Sie Microsoft 365 Copilot direkt in Ihren Office-Anwendungen einsetzen – von der Dokumenterstellung in Word über Datenanalyse in Excel bis zur Meeting-Zusammenfassung in Teams. Mit echten Arbeitsszenarien und direkt anwendbaren Workflows.",
    features: [
      "Copilot in Word: Projektpläne, Angebote und Entscheidungsvorlagen in Minuten statt Stunden erstellen – inklusive Struktur, Formatierung und Zusammenfassungen für die Geschäftsleitung",
      "Copilot in Excel: Daten analysieren, Pivot-Tabellen erstellen, Diagramme erzeugen und komplizierte Formeln schreiben lassen – per natürlicher Sprache. Endlich Excel voll nutzen, auch ohne tiefes Excel-Wissen",
      "Copilot in PowerPoint: Aus einem Word-Briefing oder Projektbericht direkt eine präsentationsfertige Slide-Deck generieren, statt Stunden in Layouts zu investieren",
      "Copilot in Outlook: E-Mail-Threads auf Action Items verdichten, Antworten im richtigen Tonfall vorfertigen lassen, Meeting-Vorbereitungen automatisch aus dem Posteingang ziehen, freie Termine aller Teilnehmer suchen lassen und inhaltlich quer durch alle Mails suchen",
      "Copilot in Teams: Meetings automatisch protokollieren lassen, verpasste Besprechungen in 30 Sekunden nachlesen und offene Aufgaben direkt extrahieren",
      "Cross-App-Workflows: Aus einer E-Mail-Kette wird ein strukturiertes Word-Dokument, aus dem Word-Text eine Präsentation – nahtlos zwischen den Apps arbeiten",
      "Prompt Engineering für Office: App-spezifische Prompt-Techniken, die in Word anders funktionieren als in Excel oder PowerPoint – mit sofort einsetzbaren Vorlagen",
      "Eigene Use Cases aus Ihrem Arbeitsalltag praktisch umsetzen"
    ],
    tiers: ["paid"],
    popular: true,
    questionLead: "Wie nutze ich Microsoft 365 Copilot in Word, Excel, PowerPoint, Outlook und Teams produktiv?",
    prerequisites: "Microsoft 365 Copilot-Lizenz erforderlich. Sicherer Umgang mit den Office-Anwendungen wird vorausgesetzt; KI-Vorkenntnisse sind nicht nötig.",
    format: "Inhouse vor Ort oder Live-Online",
    level: "Einsteiger bis Fortgeschrittene (mit Lizenz)",
    audienceShort: "Wissensarbeiter mit Microsoft 365 Copilot-Lizenz",
    groupSize: "bis 12 Teilnehmende",
    bookingFormats: [
      {
        name: "Kickoff (4 Stunden) + Online-Lernreise (4 × 2 Stunden)",
        modes: ["blended", "online"],
        durationISO: "PT12H",
        workload: "4-Stunden-Kickoff, danach 4 Module à 2 Stunden über mehrere Wochen",
        badge: "Meistverkauft",
        description: "Unser meistgebuchtes Format: gemeinsamer Kickoff in Präsenz oder online, danach vier Online-Module à 2 Stunden – Momentum zum Start, nachhaltiger Transfer über mehrere Wochen."
      },
      {
        name: "Ganztag (7 Stunden)",
        modes: ["onsite", "online"],
        durationISO: "PT7H",
        description: "Der Klassiker: alle Kern-Apps an einem Tag, mit Übungen an echten Arbeitsszenarien."
      },
      {
        name: "2-tägig (2 × 7 Stunden)",
        modes: ["onsite", "online"],
        durationISO: "P2D",
        description: "Mehr Tiefe und mehr eigene Use Cases – ideal, wenn das Team Copilot intensiv verankern soll."
      },
      {
        name: "Online-Lernreise (6–8 Stunden, Module à 2 Stunden)",
        modes: ["online"],
        workload: "3–4 Sessions à 2 Stunden über mehrere Wochen",
        description: "Wöchentliche Sessions mit Praxisphasen dazwischen – für nachhaltigen Transfer in den Alltag."
      }
    ],
    targetAudience: [
      "Wissensarbeiter mit bestehender Copilot-Lizenz, die das volle Potenzial der Office-Integration ausschöpfen wollen",
      "Führungskräfte, die Meetings effizienter gestalten und Entscheidungsvorlagen schneller erstellen möchten",
      "Projektmanager, die Cross-App-Workflows beherrschen und Reports automatisieren wollen",
      "Assistenzen und Office Manager, die E-Mail-Flut und Dokumentenarbeit spürbar reduzieren möchten"
    ],
    learningOutcomes: [
      "Sie erstellen Angebote, Berichte und Entscheidungsvorlagen mit Copilot in Word – von der leeren Seite zum fertigen Dokument in Minuten",
      "Sie bauen Finanzanalysen, Forecasts und Auswertungen in Excel per Sprachbefehl auf, ohne komplexe Formelkenntnisse zu benötigen",
      "Sie beherrschen Cross-App-Workflows: aus einem E-Mail-Thread wird ein strukturierter Bericht, aus einem Word-Dokument eine Präsentation",
      "Sie nutzen Copilot in Outlook, um E-Mail-Flut zu bewältigen, Kernaussagen aus langen Threads zu extrahieren und Meetings vorzubereiten",
      "Sie lassen Teams-Meetings automatisch zusammenfassen und können verpasste Besprechungen in Sekunden nachlesen",
      "Sie kennen app-spezifische Prompt-Techniken und wissen, warum derselbe Prompt in Word, Excel und PowerPoint unterschiedliche Ergebnisse liefert"
    ],
    businessImpact: [
      "Präsentationen entstehen direkt aus vorhandenen Dokumenten: Aus einem Word-Briefing oder Projektbericht wird ein präsentationsfertiges Slide-Deck – statt 4–40 Stunden Folienarbeit nur noch 30 Minuten bis 4 Stunden",
      "Dokumenterstellung wird 60-80% schneller: Berichte, Angebote und Protokolle entstehen in Minuten statt Stunden",
      "Monats-Reports und Forecasts in Excel aktualisieren sich in 5 Minuten statt einer Stunde – [wie unser eigener Forecast-Workflow zeigt](/wissen/copilot-fuer-excel)",
      "Meeting-Nachbereitung schrumpft von 30 Minuten auf 2 Minuten durch automatische Teams-Zusammenfassungen",
      "E-Mail-Bearbeitungszeit sinkt um 30-50% durch KI-generierte Entwürfe und Thread-Zusammenfassungen",
      "Vertriebs- und kundennahe Teams sparen mit Copilot-Workflows realistisch 3–6 Stunden pro Woche – [konkrete Use Cases aus dem Vertrieb](/wissen/copilot-vertrieb-use-cases)",
      "Die aktive Copilot-Nutzungsrate im Team steigt typischerweise um 60-80% nach dem Training – [wie das Beispiel Pernod Ricard zeigt](/wissen/copilot-chat-free-pernod-ricard)"
    ],
    metaTitle: "Microsoft 365 Copilot Training – Word, Excel, PowerPoint, Outlook, Teams | copilotenschule.de",
    metaDescription: "Praxistraining für Microsoft 365 Copilot: Lernen Sie Copilot in Word, Excel, PowerPoint, Outlook und Teams produktiv einzusetzen. Mit echten Workflows.",
    keywords: ["Microsoft 365 Copilot Training", "Copilot Word Excel", "Office Copilot Schulung", "Copilot PowerPoint", "Copilot Outlook Teams"],
    faqs: [
      {
        question: "Wir haben Microsoft 365 Copilot-Lizenzen gekauft, aber die Nutzung ist gering – was tun?",
        answer: "Das ist ein häufiges Problem: Ohne praktische Einführung wissen Mitarbeiter nicht, wo sie anfangen sollen. Der Schlüssel liegt in konkreten, sofort anwendbaren Workflows für den Arbeitsalltag – z.B. wie man in 30 Sekunden ein Meeting-Protokoll aus Teams erstellt oder Excel-Daten mit natürlicher Sprache analysiert. Praxistraining steigert die Nutzungsrate typischerweise um 60-80%."
      },
      {
        question: "Wie erstelle ich mit Copilot automatisch Präsentationen aus einem Word-Dokument?",
        answer: "Das ist ein Cross-App-Workflow: Copilot in PowerPoint kann direkt auf Word-Dokumente zugreifen und daraus strukturierte Präsentationen generieren. Sie geben den Dateipfad an, Copilot extrahiert die Kernaussagen und erstellt Slides mit passenden Layouts. Ähnlich funktioniert die Erstellung von Word-Dokumenten aus E-Mail-Threads oder Excel-Reports aus Meeting-Notizen."
      },
      {
        question: "Kann Copilot meine Excel-Tabellen wirklich analysieren und Formeln schreiben?",
        answer: "Ja, Microsoft 365 Copilot in Excel kann Daten analysieren, Trends erkennen, Pivot-Tabellen erstellen und komplexe Formeln generieren – alles per natürlicher Sprache. Sie schreiben z.B. 'Zeige mir den Umsatztrend der letzten 12 Monate nach Produktkategorie' und erhalten ein fertiges Diagramm. Die Lernkurve ist steil, aber mit den richtigen Prompt-Techniken erschließt sich enormes Potenzial."
      },
      {
        question: "Wie hilft Copilot bei der E-Mail-Flut in Outlook?",
        answer: "Copilot in Outlook kann E-Mail-Threads zusammenfassen, Antwort-Entwürfe erstellen, den Tonfall anpassen und sogar Meeting-Follow-ups automatisieren. Besonders wertvoll: die Zusammenfassung langer E-Mail-Verläufe auf die wesentlichen Punkte und offenen Action Items – spart täglich 30-60 Minuten bei E-Mail-intensiven Jobs."
      }
    ]
  },
  {
    slug: "ausbildung-ki-wissensarbeiter",
    icon: GraduationCap,
    title: "Ausbildung zum KI-unterstützten Wissensarbeiter",
    duration: "2 Tage | 6–10 × 2 h Lernreise",
    durationISO: "P2D",
    description: "Umfassende Ausbildung für alle, die KI-Assistenten professionell in ihren Arbeitsalltag integrieren wollen – von den Grundlagen bis zum Expertenniveau. In diesem intensiven Programm lernen Sie nicht nur die Tools, sondern entwickeln eine neue Art zu arbeiten: schneller, präziser, kreativer. Mit mindestens 30 % Zeit in praktischen Übungen und bei der begleiteten Umsetzung eigener Use Cases.",
    features: [
      "Grundlagen-Modul: KI verstehen – wie LLMs funktionieren, Möglichkeiten und Grenzen, Erwartungsmanagement",
      "Copilot Chat Mastery: Von einfachen Fragen zu komplexen Recherchen, Web-Suche, Zusammenfassungen, Faktencheck",
      "Prompt Engineering Intensiv: Strukturierte Prompts, Kontext-Technik, Few-Shot Learning, Chain-of-Thought",
      "Word, Excel, PowerPoint, Outlook, Teams: Jede App im Detail mit 3+ praktischen Übungen pro Anwendung",
      "Datenanalyse & Reporting: Komplexe Excel-Analysen, Pivot-Tabellen, Visualisierungen, automatisierte Reports",
      "Cross-App-Workflows: Dokumente aus E-Mails, Präsentationen aus Briefings, Meeting-Follow-ups automatisieren",
      "Automatisierung mit Copilot Agenten und Copilot Studio: Teilschritte der eigenen Arbeit automatisieren – vom eigenen Agenten bis zum ersten Copilot-Studio-Workflow",
      "Kreative KI-Nutzung: Brainstorming, Ideation, Texte schreiben, Konzepte entwickeln, Perspektivwechsel",
      "Use Case Workshop: 10+ reale Anwendungsszenarien aus Vertrieb, Marketing, HR, Finance, Projektmanagement",
      "Persönliche Prompt-Bibliothek: Templates für Ihre wiederkehrenden Aufgaben entwickeln und dokumentieren",
      "Peer Learning & Gruppenarbeit: Voneinander lernen, Best Practices teilen, gemeinsam Probleme lösen"
    ],
    tiers: ["paid"],
    questionLead: "Gibt es eine umfassende KI-Ausbildung für Büromitarbeiter?",
    prerequisites: "Microsoft 365 Copilot-Lizenz erforderlich. KI-Vorkenntnisse sind nicht nötig – die Ausbildung führt von den Grundlagen bis zum Expertenniveau.",
    format: "Inhouse vor Ort oder Live-Online",
    level: "Grundlagen bis Expertenniveau",
    audienceShort: "Mitarbeitende, die KI-Experten ihres Teams werden sollen",
    groupSize: "bis 12 Teilnehmende",
    certificate: "Teilnahmebestätigung für HR- und Compliance-Zwecke",
    bookingFormats: [
      {
        name: "2 Tage intensiv (14 Stunden)",
        modes: ["onsite", "online"],
        durationISO: "P2D",
        description: "Kompakte Intensiv-Ausbildung mit mindestens 30 % Praxisanteil und begleiteter Umsetzung eigener Use Cases."
      },
      {
        name: "Lernreise (6–10 × 2 Stunden über 6–10 Wochen)",
        modes: ["online"],
        workload: "2 Stunden pro Woche plus Praxisaufgaben",
        description: "Gestreckter Kompetenzaufbau mit Praxisaufgaben zwischen den Sessions."
      }
    ],
    targetAudience: [
      "Unternehmen, die eine systematische KI-Qualifizierung ihrer gesamten Belegschaft brauchen",
      "Personalentwickler, die ein nachweisbares KI-Kompetenzprogramm gemäß EU AI Act aufbauen müssen",
      "Mitarbeiter, die sich als KI-Experten in ihrem Team positionieren und andere begleiten wollen",
      "Führungskräfte, die den gesamten Copilot-Funktionsumfang verstehen müssen, um fundiert entscheiden zu können"
    ],
    learningOutcomes: [
      "Sie beherrschen alle Microsoft 365 Copilot-Apps auf Expertenniveau – von einfachen bis zu komplexen Anwendungen",
      "Sie entwickeln Cross-App-Workflows, die mehrere Office-Anwendungen nahtlos verbinden",
      "Sie automatisieren Teilschritte Ihrer Arbeit mit Copilot Agenten und kennen die Einsatzmöglichkeiten von Copilot Studio",
      "Sie bauen eine vollständige, dokumentierte Prompt-Bibliothek für Ihre Abteilung auf",
      "Sie können KI-Outputs kritisch bewerten, Halluzinationen erkennen und Qualitätskontrolle durchführen",
      "Sie erhalten eine Teilnahmebestätigung, die Ihre KI-Schulung für HR und Compliance-Zwecke dokumentiert"
    ],
    businessImpact: [
      "Mitarbeiter werden zu KI-Multiplikatoren, die Kollegen selbstständig unterstützen und begeistern",
      "Die Copilot-Nutzungsrate im Unternehmen steigt nachhaltig, weil echte Kompetenz aufgebaut wird",
      "Zeiteinsparung von durchschnittlich 5-10 Stunden pro Mitarbeiter und Woche bei routineintensiven Aufgaben",
      "Die EU AI Act Schulungspflicht (Artikel 4) wird nachweisbar erfüllt – Audit-sicher dokumentiert"
    ],
    metaTitle: "Ausbildung KI-Wissensarbeiter – Intensivtraining Microsoft Copilot | copilotenschule.de",
    metaDescription: "2-tägige Intensiv-Ausbildung zum KI-unterstützten Wissensarbeiter. Von Grundlagen bis Expertenniveau: min. 30 % Praxisanteil, alle M365 Apps.",
    keywords: ["KI Ausbildung", "Wissensarbeiter Training", "Copilot Intensivkurs", "KI-Kompetenz", "Microsoft Copilot Ausbildung"],
    faqs: [
      {
        question: "Wie kann ich meine Mitarbeiter systematisch in KI ausbilden – nicht nur einmalig schulen?",
        answer: "Einmalige Trainings verpuffen oft schnell. Nachhaltiger Kompetenzaufbau erfordert ein strukturiertes Ausbildungsprogramm: Grundlagen verstehen, jede Office-App einzeln meistern, praktische Use Cases umsetzen, Peer Learning und am Ende eine persönliche Prompt-Bibliothek für wiederkehrende Aufgaben. So wird KI-Kompetenz zur dauerhaften Fähigkeit statt zum einmaligen Workshop-Erlebnis."
      },
      {
        question: "Welche KI-Kompetenzen brauchen Büromitarbeiter eigentlich konkret?",
        answer: "Für Wissensarbeiter sind fünf Kernkompetenzen entscheidend: 1) Effektive Prompts formulieren, 2) KI-Outputs kritisch bewerten, 3) Copilot in Office-Apps produktiv nutzen, 4) Cross-App-Workflows beherrschen (z.B. Präsentation aus E-Mail-Thread), 5) Eine persönliche Prompt-Bibliothek für wiederkehrende Aufgaben aufbauen. Diese Fähigkeiten machen den Unterschied zwischen KI-Nutzung und KI-Produktivität."
      },
      {
        question: "Wie lange dauert es, bis Mitarbeiter wirklich produktiv mit KI arbeiten können?",
        answer: "Die Grundlagen sind in einem halben Tag vermittelt. Für echte Produktivitätssteigerung im Alltag – also das sichere Beherrschen aller relevanten Apps und Workflows – sollten Sie mit 2 intensiven Tagen oder einer Lernreise über 6–10 Wochen rechnen. Der Vorteil der Lernreise: Zwischen den Sessions wenden Mitarbeiter das Gelernte direkt an und kommen mit echten Fragen zurück."
      }
    ],
    relatedWorkshops: ["bessere-entscheidungen-mit-copilot"],
  },
  {
    slug: "train-the-trainer-copilot",
    abPreisProPerson: 840,
    icon: Users,
    title: "Train-the-Trainer: Copilot Multiplikatoren ausbilden",
    duration: "2 Tage (2 x 7 Stunden) + bedarfsorientierte Online-Workshops",
    durationISO: "P2D",
    description: "Zwei intensive Tage à 7 Stunden, in denen wir AI Change Verantwortliche, Ambassadoren und Multiplikatoren aus Ihren Fachabteilungen so ausbilden, dass sie Copilot im eigenen Unternehmen souverän vermitteln und einführen können. Entstanden ist die Weiterbildung aus unserem internen Trainingsprogramm für neue Copilot-Trainer – wir geben Ihnen also exakt das Curriculum mit, mit dem wir auch unsere eigenen Leute ausbilden, verdichtet auf zwei fokussierte Tage. Wir starten mit der Herleitung von reiner Chatbot-Nutzung hin zu echter KI-unterstützter Arbeit – dem gedanklichen Fundament, das Multiplikatoren später selbst vermitteln müssen. Darauf bauen drei Kompetenzfelder auf, die wir an beiden Tagen verzahnen statt sie in getrennte Blöcke zu sortieren: fortgeschrittene und rechtssichere Copilot-Praxis, das Handwerk eines tragfähigen Adoption-Programms und Didaktik für unterschiedliche Nutzergruppen. Nach den zwei Tagen bleibt die Verbindung – über eine Community of Practice mit Multiplikatoren aus anderen Unternehmen und einen laufend gepflegten Material- und Update-Pool. Buchbar als geschlossenes Inhouse-Format oder als offenes Training in Köln, in dem Pilotinnen und Piloten aus unterschiedlichen Branchen aufeinandertreffen.",
    features: [
      "Tag 1 – Von der Chatbot-Nutzung zur KI-unterstützten Arbeit: Wir leiten her, warum „einfach mal etwas in den Chat tippen” zu kurz greift, und was echte KI-unterstützte Arbeit ausmacht. Darauf folgt die eigene Praxis: Selbst erfahrene Nutzer entdecken Funktionalität, Workflows, Einstellungsmöglichkeiten und blinde Flecken im Microsoft-365- und Copilot-Ökosystem, inklusive Workflows, Use Cases, Teilautomatisierung, Agenten und Copilot Studio – verständlich für technisch interessierte Büroanwender, nicht nur für die IT. Auf Wunsch vertiefen wir zusätzlich die Admin-Einstellungen im Copilot Admin Center. Parallel reflektieren wir didaktisch, wie sich diese Inhalte vermitteln lassen. Der Tag endet mit einer kurzen Lehrprobe.",
      "Tag 2 – Rechtssichere Praxis, Adoption und Rollout: Kompakter Überblick über Datenschutz, Urheberrecht und EU AI Act im Bezug auf die Copilot-Nutzung, inklusive Datenklassifizierung und sensibler Daten. Plus realistische Stakeholder-Simulationen (Betriebsrat, Datenschutz, Fachabteilung) und Umgang mit Widerständen. Im zweiten Teil identifizieren und bewerten Teilnehmende Use Cases anhand eines festen Bewertungsschemas, entwickeln daraus Best Practices für den eigenen Rollout, definieren relevante Kennzahlen und erstellen eine erste Roadmap mit konkreten To-dos – mit echten Zahlen Ihres Unternehmens.",
      "Agenten bauen und betreiben: Erstellung eigener Copilot Agenten und Einstieg in Copilot Studio – inklusive Policies für die Verwendung und das Teilen von Agenten und KI-unterstützten Prozessen. Wir vermitteln, wie ein sicherer und rechtskonformer Betrieb im Unternehmen umgesetzt wird.",
      "Detaillierte Session zu Grounding, Zugriffsrechten und Datenschutzeinstellungen: Welche Daten Copilot tatsächlich sieht, wie Freigaben und Berechtigungen wirken und wie Multiplikatoren diese Themen intern souverän erklären.",
      "Verzahnt statt getrennt: Praxis, Rechtssicherheit, Adoption-Architektur und Didaktik laufen an beiden Tagen parallel – so wie Multiplikatoren später auch im Alltag zwischen einem komplexen Prompt, einer Rechtsfrage und einem Skeptiker-Argument wechseln.",
      "Lehrproben mit ehrlichem Feedback: Jede Teilnehmerin und jeder Teilnehmer übt das eigene Erklären unter Echt-Bedingungen und bekommt strukturiertes Feedback aus der Gruppe und vom Coach.",
      "Use-Case-Schema: Ein wiederverwendbares Bewertungsraster, mit dem Multiplikatoren im eigenen Haus eigenständig Use Cases identifizieren, priorisieren und in die Umsetzung bringen können – statt einer einmaligen Liste.",
      "Optionales Zusatzmodul Admin-Einstellungen: Auf Wunsch vertiefte Einweisung in Copilot-Administration (Rollen, Policies, Tenant-Konfiguration) für Multiplikatoren mit IT-nahem Profil.",
      "Begleitung danach – Baustein 1: Community of Practice der ausgebildeten Multiplikatoren über Unternehmensgrenzen hinweg. Geteilte Use Cases, Sparring vor wichtigen internen Vorhaben, Erfahrungsaustausch unter Kolleginnen und Kollegen, die vor denselben Fragen stehen.",
      "Begleitung danach – Baustein 2: Laufend gepflegter Material- und Update-Pool. Microsoft entwickelt Copilot dynamisch weiter – über den Pool bleiben unsere Multiplikatoren auf einem Stand, den ein einmaliges Zertifikat strukturell nicht halten könnte.",
      "Optionale Online-Workshops: Bedarfsorientiert, dort wo Sie auf Ihrer Reise stehen – Vorbereitung der ersten internen Trainings, knifflige Use Cases, Stakeholder-Workshops, Umgang mit Widerstand. Auf Wunsch begleiten wir Sie auch beim eigentlichen Rollout.",
      "Komplette Materialbibliothek zur freien internen Nutzung: Trainings-Decks (PPTX), fertige Übungsaufgaben, Kommunikations- und Change-Templates (Mail-Vorlagen, Kickoff-Decks), FAQ-Sammlungen für das Intranet und Schulungsunterlagen für Endanwender. Eine Prompt-Bibliothek bauen Sie im Training mit eigenen Use Cases – das ist mehr wert als jede vorgefertigte Liste.",
      "Weitere Inhalte nach Absprache: Das Curriculum lässt sich um Ihre spezifischen Anforderungen ergänzen."
    ],
    tiers: ["free", "paid"],
    isNew: true,
    popular: true,
    pricePerPerson: 1495,
    pricePerPersonLabel: "Ab 1.495 € pro Person für 2 Tage (2 x 7 Stunden, offenes Training, inkl. Trainings-Decks, Templates und FAQ-Sammlungen). Inhouse-Konditionen auf Anfrage.",
    questionLead: "Wir bilden Ihre internen Copilot-Multiplikatoren, Ambassadoren und AI Change Verantwortlichen in 2 x 7 Stunden aus, damit Sie Ihre Mitarbeitenden im Alltag begeistern und befähigen können.",
    prerequisites: "Keine formalen Voraussetzungen. Empfohlen sind eigene Copilot-Praxis, gute Kommunikationsfähigkeiten und ein Grundgefühl für Prozesse im eigenen Unternehmen.",
    format: "Geschlossene Inhouse-Gruppe (vor Ort oder online) oder offenes Training in Köln",
    level: "Fortgeschrittene",
    audienceShort: "Interne Multiplikatoren, Ambassadoren und AI-Change-Verantwortliche",
    groupSize: "bis 12 Teilnehmende",
    bookingFormats: [
      {
        name: "Geschlossene Inhouse-Gruppe (2 × 7 Stunden)",
        modes: ["onsite", "online"],
        durationISO: "P2D",
        description: "Ihre komplette Multiplikatoren-Mannschaft in einem Durchgang – vor Ort bei Ihnen oder online."
      },
      {
        name: "Offenes Training in Köln (2 × 7 Stunden)",
        modes: ["onsite"],
        durationISO: "P2D",
        description: "Multiplikatoren aus verschiedenen Unternehmen – der branchenübergreifende Austausch ist ein eigener Wert."
      }
    ],
    targetAudience: [
      "AI Change Verantwortliche und Ambassadoren, die einen Copilot-Rollout in ihrem Unternehmen orchestrieren",
      "Copilot-Multiplikatoren aus Fachabteilungen, die Kolleginnen und Kollegen im Alltag begleiten und befähigen wollen",
      "L&D- und HR-Verantwortliche, die ein internes Copilot-Curriculum aufbauen statt jeden Workshop extern einzukaufen",
      "Führungskräfte, die Adoption nicht dem Zufall überlassen wollen und eine valide Roadmap brauchen",
      "Erfahrene Copilot-Anwender, die zur internen Anlaufstelle werden – auch ohne klassischen Trainer-Hintergrund"
    ],
    learningOutcomes: [
      "Sie vollziehen die Herleitung von reiner Chatbot-Nutzung zu echter KI-unterstützter Arbeit nach – und können diesen gedanklichen Sprung selbst vermitteln",
      "Sie nutzen Microsoft 365 Copilot fortgeschritten und rechtssicher – inklusive Workflows, Einstellungsmöglichkeiten, Agenten, Copilot Studio und sensiblen Datenklassen; auf Wunsch inklusive Admin-Einstellungen",
      "Sie erstellen eigene Copilot Agenten mit Copilot Studio und definieren Policies für Verwendung und Teilen von Agenten und KI-unterstützten Prozessen – inklusive Grounding, Zugriffsrechten und Datenschutzeinstellungen für den sicheren, rechtskonformen Betrieb",
      "Sie identifizieren, bewerten und priorisieren Use Cases anhand eines festen Schemas – und leiten daraus Best Practices für den eigenen Rollout ab",
      "Sie planen ein eigenes Copilot-Adoption-Programm: Rollen, Komponenten, Zeithorizont, Budget und Erfolgsmetriken – mit echten Zahlen Ihres Unternehmens",
      "Sie holen Skeptiker, Pragmatiker und Power User mit jeweils passender Argumentation und Didaktik ab und führen interne Trainings, Lernreisen und Office Hours souverän",
      "Sie meistern realistische Stakeholder-Gespräche mit Betriebsrat, Datenschutz und Fachabteilungen – aus den Simulationen am zweiten Tag",
      "Sie verfügen über die komplette Materialbibliothek (Decks, Übungen, Templates, FAQs für das Intranet, Schulungsunterlagen für Endanwender) zur freien internen Nutzung",
      "Sie sind nach den zwei Tagen weiter angebunden: Community of Practice, Material- und Update-Pool und bedarfsorientierte Online-Workshops halten Ihren Wissensstand auch in Monat 6 und 12"
    ],
    businessImpact: [
      "Adoption-Programme werden plan- und steuerbar: Sie wissen, welche Hebel wann wirken und welche Investitionen lohnen – aufbauend auf unserem [Leitfaden für die Copilot-Einführung im Unternehmen](/wissen/copilot-im-unternehmen-einfuehren-leitfaden)",
      "Die Kosten für externe Schulungen sinken deutlich, weil Sie intern kompetent skalieren – wir liefern dafür die Materialien und das didaktische Fundament aus unserem [Training- und Schulungsangebot](/wissen/copilot-training-schulung)",
      "Mitarbeitende sehen vertraute Gesichter in Trainings statt austauschbarer Externer – Akzeptanz und Transferquote steigen, gerade wenn Sie eine [interne Launch-Kampagne](/wissen/copilot-launch-kampagne) als Rahmen nutzen",
      "Multiplikatoren tragen den Change im Alltag: in der Kaffeeküche, im Teams-Chat, in der Übersetzung neuer Features in den eigenen Prozess – die Wirkungen, die [unser Fachartikel zur Inhouse-Change-Begleitung](/wissen/interne-copilot-trainer-ausbilden) ausführlich beschreibt",
      "Sie etablieren ein dauerhaftes Lern-Ökosystem statt einmaliger Workshop-Events – Verhaltensänderung wird wahrscheinlicher, Risiken im Umgang mit KI sinken sichtbar"
    ],
    metaTitle: "Train-the-Trainer Copilot – Multiplikatoren ausbilden (2 Tage) | copilotenschule.de",
    metaDescription: "2-tägige Train-the-Trainer Ausbildung (2 x 7 Stunden) für Copilot-Multiplikatoren, Ambassadoren und AI Change Verantwortliche. Mit Trainings-Decks, Adoption-Konzept und Didaktik. Inhouse oder offen.",
    keywords: [
      "Train the Trainer Copilot",
      "Copilot Trainer Ausbildung",
      "Copilot Ambassador Programm",
      "Copilot Multiplikator ausbilden",
      "AI Change Manager Schulung",
      "Copilot Adoption Programm aufbauen",
      "interne Copilot Trainer schulen",
      "Microsoft Copilot Train the Trainer",
      "Copilot Train the Trainer 2 Tage"
    ],
    faqs: [
      {
        question: "Wir wollen Copilot intern selbst trainieren – wie bauen wir dafür kompetente Multiplikatoren auf?",
        answer: "Multiplikatoren brauchen drei Dinge gleichzeitig: eigene fortgeschrittene Praxis mit Copilot, ein klares Bild davon wie ein Adoption-Programm funktioniert, und didaktische Werkzeuge für unterschiedliche Zielgruppen. Diese drei Kompetenzfelder verzahnen wir an beiden Tagen – statt sie in getrennte Blöcke zu sortieren. Sie verlassen das Training mit echtem Können, einem Adoption-Plan für Ihr Unternehmen und einer kompletten Materialbibliothek (Decks, Übungen, FAQs), die Sie intern frei einsetzen dürfen. Ein ausführliches Bild der Inhouse-Multiplikator-Logik finden Sie in unserem Beitrag zu [interne Copilot-Trainer ausbilden](/wissen/interne-copilot-trainer-ausbilden)."
      },
      {
        question: "Warum reichen zwei Tage, wenn es doch um so viele Themen geht?",
        answer: "Weil wir Inhalte verdichten statt streichen. Statt Praxis, Recht, Didaktik und Adoption in getrennte Blöcke zu sortieren, verzahnen wir sie an beiden Tagen eng miteinander – ganz so, wie Multiplikatoren später auch im Alltag zwischen einem komplexen Prompt, einer Rechtsfrage und einem Skeptiker-Argument wechseln müssen. Ergänzt wird das kompakte Präsenzformat durch die Materialbibliothek zum Selbststudium, die Community of Practice und bedarfsorientierte Online-Workshops danach – so bleibt kein Inhalt auf der Strecke, nur der Kalenderaufwand sinkt."
      },
      {
        question: "Was ist der Unterschied zur Ausbildung zum KI-unterstützten Wissensarbeiter?",
        answer: "Die Wissensarbeiter-Ausbildung macht Sie zum Power User. Train-the-Trainer geht eine Stufe weiter: Hier lernen Sie, andere zu Power Usern zu machen. Sie vertiefen die eigene Praxis, lernen aber zusätzlich Adoption-Architektur, Change Management und Didaktik – und bekommen die kompletten Trainingsunterlagen, die wir selbst nutzen, zur freien internen Verwendung."
      },
      {
        question: "Was passiert konkret an Tag 1 und Tag 2?",
        answer: "Tag 1 startet mit der Herleitung von reiner Chatbot-Nutzung zu echter KI-unterstützter Arbeit und vertieft danach die eigene Copilot-Praxis: Funktionalität, Workflows, Einstellungsmöglichkeiten, Use Cases, Teilautomatisierung sowie Agenten und Copilot Studio, mit didaktischer Reflexion und einer kurzen Lehrprobe – auf Wunsch inklusive Admin-Einstellungen. Tag 2 widmet sich rechtssicherer Praxis (Datenschutz, Urheberrecht, EU AI Act, Datenklassifizierung) und realistischen Stakeholder-Simulationen. Im zweiten Teil identifizieren und bewerten Teilnehmende Use Cases anhand eines festen Schemas, leiten Best Practices für den Rollout ab und entwickeln mit echten Zahlen Ihres Unternehmens das eigene Adoption-Programm inklusive Kennzahlen und Roadmap."
      },
      {
        question: "Bekommen wir wirklich die kompletten Trainings-Decks und Materialien zur freien Nutzung?",
        answer: "Ja. Wir möchten, dass Ihre Copilot-Einführung erfolgreich wird – und das gelingt am besten, wenn Sie nach dem Training nicht alles neu erfinden müssen. Sie erhalten unsere Trainings-Decks (PPTX), Übungsaufgaben, Kommunikations- und Change-Templates, fertige FAQ-Sammlungen fürs Intranet und Schulungsunterlagen für Endanwender. Diese Materialien dürfen Sie intern beliebig anpassen und einsetzen. Eine Prompt-Bibliothek bauen Sie im Training mit Ihren echten Anwendungsfällen selbst – das ist mehr wert als jede vorgefertigte Sammlung."
      },
      {
        question: "Was passiert nach den zwei Tagen – und wie bleiben unsere Multiplikatoren auf Stand?",
        answer: "Zwei Bausteine tragen die Begleitung. Erstens eine Community of Practice, in der ausgebildete Multiplikatoren aus unterschiedlichen Unternehmen Use Cases teilen, sich vor wichtigen internen Vorhaben Sparring holen und Erfahrungsaustausch betreiben, der zwischen Wettbewerbern selten entsteht. Zweitens ein laufend gepflegter Material- und Update-Pool: Microsoft entwickelt Copilot dynamisch weiter; über den Pool bleiben Ihre Multiplikatoren auf einem Stand, den ein einmaliges Zertifikat strukturell nicht halten könnte. Ergänzend bieten wir bedarfsorientierte Online-Workshops und auf Wunsch Begleitung beim eigentlichen Rollout."
      },
      {
        question: "Können wir das Training als geschlossene Gruppe oder nur offen buchen?",
        answer: "Beides. Geschlossene Inhouse-Gruppen finden bei Ihnen vor Ort oder online statt – ideal, wenn Sie eine ganze Mannschaft gleichzeitig befähigen wollen. Offene Trainings sammeln Multiplikatoren aus verschiedenen Firmen und finden in Köln statt; das ist besonders wertvoll, weil der Austausch mit Pilotinnen und Piloten aus anderen Branchen Perspektiven öffnet, die in geschlossenen Gruppen fehlen."
      },
      {
        question: "Welche Voraussetzungen brauchen unsere Teilnehmer und wen schicken wir am besten?",
        answer: "Keine formalen Voraussetzungen. Wirksam sind Mitarbeitende mit guten Kommunikationsskills, die geduldig zuhören und erklären können, im Alltag ansprechbar und präsent sind (nicht die gestresstesten High Performer), Copilot bereits aus eigener Motivation länger nutzen und ein Grundgefühl für Prozesse haben. Wichtig: Schicken Sie nicht nur Führungskräfte – die wirksamsten Multiplikatoren sind oft eine Ebene tiefer, mit Akzeptanz und Vertrauen im Kollegium. Eine bewusst gemischte Gruppe aus Fach- und Führungsebene wirkt erfahrungsgemäß am stärksten."
      },
      {
        question: "Wie überzeuge ich die Geschäftsleitung, in eine Train-the-Trainer-Ausbildung zu investieren?",
        answer: "Das stärkste Argument ist Skalierung: Wenn Sie 1.000 Mitarbeitende zu Copilot-Profis machen wollen, sind externe Schulungen für jeden schlicht zu teuer und zu zähflüssig. Mit zwei bis fünf intern ausgebildeten Multiplikatoren können Sie den Großteil der Trainings selbst stemmen – und behalten zusätzlich Adoption-Steuerung, Use-Case-Pflege und Anwender-Support im Haus. Verhaltensänderung gelingt mit vertrauten Gesichtern aus dem eigenen Unternehmen messbar besser als mit Externen, gerade in der entscheidenden Phase nach dem Training. Da das kompakte Format nur zwei Arbeitstage bindet, sinkt zusätzlich die Hürde, gute Multiplikatoren überhaupt aus dem Tagesgeschäft freizustellen."
      }
    ],
    relatedWorkshops: ["copilot-strategie-change-management", "copilot-launch-eventtag"],
  },
  {
    slug: "copilot-lernreise-8-wochen",
    icon: GraduationCap,
    title: "Copilot Lernreise: Von 0 auf 100 in 8 Wochen",
    duration: "6–10 × 2 Stunden online",
    durationISO: "PT8H",
    description: "Begleitete Lernreise für nachhaltigen Kompetenzaufbau: In 6–10 wöchentlichen Online-Sessions à 2 Stunden lernen Sie Microsoft Copilot von Grund auf – mit Theorie, Live-Demos und praktischen Übungen, die sehr nahe an Ihren täglichen Szenarien sind. Jede Session bringt einen neuen Use Case, den Sie direkt in Ihrem Arbeitsalltag umsetzen. Ideal für Teams, die Copilot schrittweise und nachhaltig in ihre Arbeit integrieren wollen.",
    features: [
      "Copilot Grundlagen: Interface, erste Prompts, Erwartungsmanagement – z. B. E-Mail-Zusammenfassungen",
      "Copilot in Word: Dokumente erstellen, überarbeiten, zusammenfassen – z. B. Protokoll aus Meeting-Notizen",
      "Copilot in Excel: Datenanalyse, Formeln, Visualisierungen – z. B. Monatsbericht automatisieren",
      "Copilot in PowerPoint: Präsentationen erstellen und optimieren – z. B. Pitch-Deck aus einem Briefing",
      "Copilot in Outlook: E-Mail-Produktivität steigern – z. B. wiederkehrende Status-Mails automatisieren",
      "Copilot in Teams: Meetings zusammenfassen, Chat produktiv nutzen – z. B. Meeting-Follow-ups automatisieren",
      "Advanced Prompting: Komplexe Anfragen, Verkettung, Custom Instructions – Aufbau der persönlichen Prompt-Bibliothek",
      "Copilot Agenten und Copilot Studio: Eigene Agenten anlegen und Teilschritte der täglichen Arbeit automatisieren",
      "Integration & Workflow: Alles zusammenführen – individueller End-to-End-Workflow für den eigenen Arbeitsalltag",
      "Praktische Übungen in jeder Session – sehr nahe an den täglichen Szenarien der Teilnehmenden",
      "Zwischen den Sessions: Praxisaufgaben, Peer-Learning, Support via Teams-Kanal"
    ],
    tiers: ["paid"],
    popular: true,
    questionLead: "Gibt es ein Copilot-Training, das über mehrere Wochen geht – für nachhaltigen Kompetenzaufbau statt Tagesschulung?",
    prerequisites: "Microsoft 365 Copilot-Lizenz erforderlich. Keine Vorkenntnisse nötig – die Lernreise startet bei den Grundlagen.",
    format: "Live-Online",
    level: "Einsteiger – von 0 auf 100",
    audienceShort: "Teams, die Copilot nachhaltig im Arbeitsalltag verankern wollen",
    groupSize: "maximal 12 Teilnehmende, ideal bis 8",
    bookingFormats: [
      {
        name: "Lernreise (6–10 wöchentliche Online-Sessions à 2 Stunden)",
        modes: ["online"],
        workload: "2 Stunden pro Woche über 6–10 Wochen",
        description: "Jede Session ein Schwerpunkt und ein Use Case für den eigenen Arbeitsalltag – mit Support-Kanal zwischen den Sessions."
      }
    ],
    targetAudience: [
      "Unternehmen, die nachhaltige KI-Kompetenz aufbauen wollen statt einmaliger Workshop-Events",
      "L&D-Verantwortliche, die eine begleitete Lernreise in bestehende Weiterbildungsprogramme integrieren möchten",
      "Teams, die Copilot schrittweise in den Arbeitsalltag integrieren und dabei begleitet werden wollen",
      "Führungskräfte, die messbare Verhaltensänderung statt nur Wissensvermittlung erreichen möchten"
    ],
    learningOutcomes: [
      "Sie beherrschen nach der Lernreise alle relevanten Copilot-Funktionen in Word, Excel, PowerPoint, Outlook und Teams",
      "Sie haben in jeder Session einen konkreten Use Case aus Ihrem echten Arbeitsalltag umgesetzt und verfestigt",
      "Sie verfügen über eine persönliche Prompt-Bibliothek und einen individuellen End-to-End-Workflow",
      "Sie legen eigene Copilot Agenten an und automatisieren mit Copilot Studio erste Teilschritte Ihrer Arbeit",
      "Sie können Kollegen eigenständig unterstützen, weil Sie die häufigsten Probleme bereits selbst gelöst haben"
    ],
    businessImpact: [
      "Nachhaltigkeit: 87% der Teilnehmer nutzen Copilot auch 3 Monate nach der Lernreise aktiv – vs. 30% bei Tagesschulungen",
      "Jede Session bringt einen direkt anwendbaren Workflow – der Produktivitätsgewinn beginnt ab der ersten Woche",
      "Praktische Übungen sehr nahe an den täglichen Szenarien – das Gelernte greift ohne Umweg im echten Arbeitsalltag",
      "Erste eigene Copilot Agenten und Copilot-Studio-Automatisierungen entstehen bereits während der Lernreise",
      "Der Betreuungsaufwand für IT und Helpdesk sinkt, weil Teilnehmer lernen, Probleme selbst zu lösen",
      "Die Lernreise ist mit Sessions von jeweils 2 Stunden minimal invasiv – kein ganzer Arbeitstag geht verloren"
    ],
    metaTitle: "Copilot Lernreise – 8 Wochen Kompetenzaufbau | copilotenschule.de",
    metaDescription: "Nachhaltige Copilot-Lernreise: 6–10 Online-Sessions à 2 Stunden, jede mit eigenem Use Case. Schrittweiser Kompetenzaufbau bis zu Copilot Agenten.",
    keywords: ["Copilot Lernreise", "Copilot 8 Wochen", "nachhaltiges KI-Training", "Copilot Blended Learning", "Copilot Kompetenzaufbau"],
    faqs: [
      {
        question: "Wie stellen wir sicher, dass KI-Training nachhaltig wirkt und nicht nach einer Woche vergessen ist?",
        answer: "Das Problem kennen viele: Nach einem eintägigen Workshop verpufft das Wissen schnell. Die Lösung: Ein Lernreise-Format über mehrere Wochen. Jede Woche ein neues Thema, dazwischen praktische Anwendung im Arbeitsalltag, und in der nächsten Session werden echte Fragen aus der Praxis geklärt. So wird Copilot zur Gewohnheit, nicht zum einmaligen Event."
      },
      {
        question: "Gibt es Copilot-Training, das über mehrere Wochen geht statt an einem Tag?",
        answer: "Ja, eine Lernreise über 6–10 Wochen mit wöchentlichen 2-Stunden-Sessions online ist ideal für nachhaltigen Kompetenzaufbau. Jede Session ein neuer Schwerpunkt (Word, Excel, PowerPoint bis hin zu Copilot Agenten), jede Session ein praktischer Use Case zum Umsetzen. Zwischen den Sessions: echte Anwendung, Peer Learning, Support-Kanal für Fragen. So wird KI-Kompetenz zur dauerhaften Fähigkeit."
      },
      {
        question: "Wie viel Zeit müssen meine Mitarbeiter für eine Copilot-Lernreise einplanen?",
        answer: "2 Stunden pro Woche für die Live-Session – das ist die Zeit, die im Kalender steht. Die Use Cases setzen die Teilnehmenden direkt in ihrer täglichen Arbeit um; die praktischen Übungen sind bewusst so gewählt, dass sie sehr nahe an den echten Arbeitsszenarien liegen. So lässt sich die Lernreise gut in den Arbeitsalltag integrieren – anders als ein Ganztags-Workshop, der den Kalender blockiert."
      },
      {
        question: "Was unterscheidet eine Lernreise von einem kompakten Workshop?",
        answer: "Der entscheidende Unterschied: Transfer in die Praxis. Bei einem Tagesworkshop lernen Mitarbeiter viel auf einmal, aber setzen es danach oft nicht um. Bei einer Lernreise kommt jede Woche ein neues Thema – klein genug, um es sofort anzuwenden. Die nächste Session startet mit Erfahrungsaustausch: Was hat funktioniert? Wo gab es Probleme? So entsteht echte Verhaltensänderung."
      }
    ],
    relatedWorkshops: ["bessere-entscheidungen-mit-copilot"],
  },
  {
    slug: "copilot-studio-ki-agenten",
    abPreisProPerson: 283,
    icon: Brain,
    title: "KI-Agenten und Automatisierung mit Microsoft Copilot Studio",
    duration: "1 Tag (7 Stunden)",
    durationISO: "PT7H",
    description: "Fortgeschrittenes Training zur Entwicklung intelligenter KI-Agenten und Automatisierungs-Workflows mit Microsoft Copilot Studio. Sie lernen, wie Sie benutzerdefinierte Copilot-Agenten für spezifische Geschäftsprozesse erstellen, diese mit Unternehmensdaten verbinden und in Microsoft Teams sowie andere Anwendungen integrieren.",
    features: [
      "Copilot Studio Grundlagen: Plattform-Überblick, Architektur verstehen, Entwicklungsumgebung einrichten",
      "Custom Agents für Microsoft Teams erstellen: Conversational AI entwickeln, Natural Language Processing nutzen",
      "Integration mit Unternehmensdaten: SharePoint, Dataverse, externe APIs anbinden, Datenquellen konfigurieren",
      "Workflow-Automatisierung mit Power Automate: Geschäftsprozesse digitalisieren, Genehmigungsprozesse abbilden",
      "Prompt Engineering für Agenten: Systemanweisungen optimieren, Kontext-Management, Guardrails implementieren",
      "Testing und Deployment: Agenten testen, Performance optimieren, Rollout planen, Monitoring einrichten",
      "Use Cases aus der Praxis: HR-Assistent, IT-Helpdesk-Agent, Sales-Support-Bot, Onboarding-Assistent"
    ],
    tiers: ["paid"],
    questionLead: "Wie entwickle ich einen KI-Agenten mit Microsoft Copilot Studio – und welche Geschäftsprozesse kann ich automatisieren?",
    prerequisites: "Keine Programmierkenntnisse erforderlich – Copilot Studio ist eine Low-Code-Plattform. Sicherer Umgang mit Microsoft 365 wird vorausgesetzt; Power-Automate-Kenntnisse sind hilfreich, aber keine Bedingung.",
    format: "Inhouse vor Ort oder Live-Online",
    level: "Fortgeschrittene",
    audienceShort: "Power User, Citizen Developer und Prozessverantwortliche",
    groupSize: "bis 12 Teilnehmende",
    bookingFormats: [
      {
        name: "Ganztag (7 Stunden)",
        modes: ["onsite", "online"],
        durationISO: "PT7H",
        description: "Von den Copilot-Studio-Grundlagen bis zum ersten funktionsfähigen eigenen Agenten."
      },
      {
        name: "Hackathon (7 Stunden)",
        modes: ["onsite", "online"],
        durationISO: "PT7H",
        description: "Ganz wenig Theorie, maximale Umsetzung: begleitetes Bauen eigener Use Cases – am Ende des Tages stehen funktionsfähige Agenten für Ihre echten Prozesse."
      }
    ],
    targetAudience: [
      "Power User und Citizen Developer, die intelligente Chatbots und KI-Agenten für ihr Unternehmen bauen wollen",
      "IT-Abteilungen, die den Fachbereichen Self-Service-KI-Lösungen ermöglichen möchten",
      "Prozessverantwortliche, die repetitive Anfragen (HR, IT-Support, FAQ) durch KI-Agenten entlasten wollen",
      "Innovationsmanager, die KI-Automatisierung als strategisches Differenzierungsmerkmal positionieren"
    ],
    learningOutcomes: [
      "Sie erstellen funktionsfähige Custom Agents mit Microsoft Copilot Studio – von der Konzeption bis zum Deployment",
      "Sie verbinden KI-Agenten mit Ihren Unternehmensdaten: SharePoint, Dataverse, externe APIs",
      "Sie implementieren Guardrails und Testing-Routinen, damit Ihre Agenten zuverlässig und sicher antworten",
      "Sie beherrschen Workflow-Automatisierung mit Power Automate für komplexe Geschäftsprozesse"
    ],
    businessImpact: [
      "First-Level-Support wird um 40-60% entlastet durch KI-Agenten, die Standardfragen selbstständig beantworten",
      "Mitarbeiter finden Informationen in Sekunden statt Minuten – der Agent durchsucht alle internen Quellen",
      "Wiederkehrende Prozesse (Urlaubsanträge, Onboarding-Fragen, IT-Tickets) laufen automatisiert ab",
      "Die Time-to-Value für neue Automatisierungsprojekte sinkt von Monaten auf Wochen"
    ],
    metaTitle: "Copilot Studio Training – KI-Agenten entwickeln | copilotenschule.de",
    metaDescription: "Entwickeln Sie KI-Agenten mit Microsoft Copilot Studio: Custom Agents, Teams-Integration, Power Automate. Praxis-Training für Unternehmen.",
    keywords: ["Copilot Studio Training", "KI-Agenten entwickeln", "Microsoft Copilot Agents", "Copilot Automatisierung", "Custom Copilot"],
    faqs: [
      {
        question: "Kann ich einen KI-Assistenten bauen, der auf unsere Firmendaten zugreift?",
        answer: "Ja, mit Microsoft Copilot Studio können Sie KI-Agenten erstellen, die auf SharePoint, Dataverse oder externe APIs zugreifen. Der Agent beantwortet Fragen basierend auf Ihren internen Dokumenten, Wissensdatenbanken oder Unternehmensdaten – ohne dass diese Daten zu OpenAI oder anderen externen Diensten fließen. Das ist der Unterschied zu allgemeinen KI-Chatbots."
      },
      {
        question: "Brauche ich Programmierkenntnisse, um einen KI-Agenten zu entwickeln?",
        answer: "Copilot Studio ist eine Low-Code-Plattform – grundlegende Agenten können Sie ohne Programmierung erstellen. Für komplexere Integrationen (APIs, Workflow-Automatisierung, Custom Connectors) sind Power Automate-Kenntnisse hilfreich. Tiefe Entwicklerkenntnisse sind erst bei sehr spezifischen Anpassungen nötig."
      },
      {
        question: "Welche Use Cases eignen sich für KI-Agenten im Unternehmen?",
        answer: "Die erfolgreichsten Anwendungsfälle: HR-Assistenten (Urlaubsanträge, Policies, Onboarding-Fragen), IT-Helpdesk-Bots (First-Level-Support, Passwort-Reset-Anleitungen), Wissensmanagement (FAQ-Bot auf Basis interner Dokumente), Sales-Support (Produktinfos, Preislisten) und Projekt-Assistenten (Status-Updates, Dokumenten-Suche). Entscheidend: Klar definierter Scope und gute Datenbasis."
      },
      {
        question: "Wie stelle ich sicher, dass mein KI-Agent keine falschen Informationen liefert?",
        answer: "Drei Hebel: 1) Gute Datenbasis – der Agent ist nur so gut wie seine Quellen, 2) Guardrails – klare Grenzen setzen, bei welchen Themen der Agent antwortet und wann er an Menschen eskaliert, 3) Testing – systematisch Fragen durchspielen, Edge Cases identifizieren, und kontinuierlich verbessern. Ein gut konfigurierter Agent gibt bei Unsicherheit zu, dass er die Antwort nicht weiß."
      }
    ]
  },
  {
    slug: "eu-ai-act-pflichtschulung",
    icon: Scale,
    title: "EU AI Act Pflichtschulung – Rechtssichere KI-Nutzung im Unternehmen",
    duration: "2–3 Stunden online",
    durationISO: "PT3H",
    description: "Pflichtschulung zur Erfüllung der EU AI Act Anforderungen: Alle Mitarbeiter, die mit KI-Systemen arbeiten, müssen nachweislich geschult werden. Dieses Training vermittelt das erforderliche Wissen zu KI-Kompetenz, Risikobewusstsein und verantwortungsvollem Umgang mit KI-Systemen gemäß Artikel 4 EU AI Act.",
    features: [
      "EU AI Act Grundlagen: Anwendungsbereich, Risikoklassifizierung, Pflichten für Unternehmen und Mitarbeiter",
      "Artikel 4 KI-Kompetenz: Was der Gesetzgeber fordert und wie Sie die Anforderungen erfüllen",
      "Risikobasierter Ansatz verstehen: Hochrisiko-KI vs. KI mit geringem Risiko, Verbotene KI-Praktiken",
      "Transparenz- und Dokumentationspflichten: Was bei der KI-Nutzung dokumentiert werden muss",
      "Praktische Compliance: Checklisten für den Arbeitsalltag, Do's und Don'ts",
      "Microsoft Copilot im EU AI Act Kontext: Einordnung, Verantwortlichkeiten, Best Practices",
      "Nachweisführung: Teilnahmebestätigung und Dokumentation für Audits und Behörden"
    ],
    tiers: ["free", "paid"],
    questionLead: "Welche KI-Schulung brauchen unsere Mitarbeiter, um den EU AI Act Artikel 4 zu erfüllen?",
    prerequisites: "Keine Vorkenntnisse erforderlich. Das Training richtet sich an Mitarbeitende, die künftig mit KI-Systemen arbeiten sollen – unabhängig vom Kenntnisstand.",
    format: "Live-Online",
    level: "Alle Niveaus",
    audienceShort: "Mitarbeitende, die künftig mit KI-Systemen arbeiten sollen (Art. 4 EU AI Act)",
    groupSize: "bis 12 Teilnehmende",
    visiblePrice: {
      perPerson: 49,
      unitLabel: "pro Teilnehmenden",
      note: "inkl. Zertifikat."
    },
    certificate: "Schulungsnachweis für Audits und Behördenanfragen",
    bookingFormats: [
      {
        name: "Online-Schulung (2–3 Stunden)",
        modes: ["online"],
        durationISO: "PT3H",
        description: "Kompakte Pflichtschulung mit Nachweisführung für Audits und Behördenanfragen."
      }
    ],
    targetAudience: [
      "Mitarbeitende, die künftig mit KI-Systemen arbeiten sollen – für genau diese Gruppe ist die Weiterbildung gemäß EU AI Act konzipiert"
    ],
    learningOutcomes: [
      "Sie verstehen den EU AI Act und können die relevanten Pflichten für Ihr Unternehmen identifizieren",
      "Sie kennen die Risikoklassifizierung von KI-Systemen und wissen, wo Microsoft Copilot einzuordnen ist",
      "Sie wenden die praktische Compliance-Checkliste im Arbeitsalltag an: Do's und Don'ts beim KI-Einsatz",
      "Sie erhalten einen Schulungsnachweis, der bei Audits und Behördenanfragen als Kompetenzbeleg dient"
    ],
    businessImpact: [
      "Rechtssicherheit: Die gesetzliche Schulungspflicht nach Artikel 4 EU AI Act ist nachweisbar erfüllt",
      "Bei Audits und Behördenanfragen liegen Schulungsnachweise für jeden Mitarbeiter vor",
      "Das Risiko von Bußgeldern durch unwissentliche Verstöße gegen KI-Regulierung wird minimiert",
      "Mitarbeiter entwickeln ein gesundes Risikobewusstsein – weder KI-Angst noch blindes Vertrauen"
    ],
    metaTitle: "EU AI Act Pflichtschulung – Artikel 4 KI-Kompetenz | copilotenschule.de",
    metaDescription: "EU AI Act Pflichtschulung nach Artikel 4: KI-Kompetenz, Risikobewusstsein, Compliance. Mit Schulungsnachweis für Audits.",
    keywords: ["EU AI Act Schulung", "Artikel 4 KI-Kompetenz", "KI Pflichtschulung", "AI Act Training", "KI Compliance"],
    faqs: [
      {
        question: "Müssen alle Mitarbeiter, die Copilot nutzen, zum EU AI Act geschult werden?",
        answer: "Ja, Artikel 4 des EU AI Act fordert, dass Personen, die KI-Systeme bedienen oder überwachen, über ausreichende KI-Kompetenz verfügen müssen. Das betrifft faktisch alle Mitarbeiter, die Microsoft Copilot oder andere KI-Tools nutzen. Die Schulung muss nachweisbar sein – ein Schulungsnachweis ist für Audits wichtig."
      },
      {
        question: "Was genau fordert der EU AI Act von Unternehmen, die KI einsetzen?",
        answer: "Für die meisten Unternehmen relevant: 1) KI-Kompetenz-Schulung für Mitarbeiter (Artikel 4), 2) Transparenzpflichten (Nutzer müssen wissen, dass sie mit KI interagieren), 3) Dokumentation der eingesetzten KI-Systeme, 4) Bei Hochrisiko-KI zusätzliche Anforderungen. Microsoft Copilot fällt typischerweise unter 'KI mit geringem Risiko', aber die Grundpflichten gelten trotzdem."
      },
      {
        question: "Bis wann muss ich meine Mitarbeiter zum EU AI Act geschult haben?",
        answer: "Der EU AI Act ist seit August 2024 in Kraft. Die Anforderungen an KI-Kompetenz (Artikel 4) gelten ab Februar 2025. Unternehmen sollten also zeitnah sicherstellen, dass alle KI-nutzenden Mitarbeiter nachweislich geschult sind. Die Umsetzung sollte nicht auf die lange Bank geschoben werden – bei Prüfungen müssen Sie die Schulungen belegen können."
      },
      {
        question: "Wie dokumentiere ich die KI-Schulung meiner Mitarbeiter für Audits?",
        answer: "Für die Nachweisführung brauchen Sie: Teilnahmebestätigungen pro Mitarbeiter, Dokumentation der Schulungsinhalte (welche KI-Kompetenzen wurden vermittelt), Datum und Dauer der Schulung, und idealerweise eine Anwesenheitsliste. Ein professioneller Schulungsnachweis mit konkreten Lerninhalten erfüllt die Anforderungen und gibt Sicherheit bei Behördenanfragen."
      }
    ]
  },
];

export function getTrainingBySlug(slug: string): Training | undefined {
  return trainings.find(t => t.slug === slug);
}

// Hilfsfunktion: Alle Slugs für statische Generierung
export function getAllTrainingSlugs(): string[] {
  return trainings.map(t => t.slug);
}

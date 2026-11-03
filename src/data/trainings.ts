import { Brain, Shield, Laptop, Zap, Scale, GraduationCap, Wrench, Users, Calculator, Briefcase } from "lucide-react";
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
  price?: number;       // Gruppenpreis dieser Variante in EUR – maschinenlesbar als eigenes Offer je CourseInstance (optional, nur wo gepflegt)
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
  // Seit 30.09.2026: KEIN sichtbarer Preis-pro-Teilnehmer mehr auf der Seite
  // (führte bei Kunden zur Fehlannahme, es gäbe buchbare Einzelplätze). Nur noch
  // für Trainings mit gepflegtem perGroup wird der Gruppenpreis maschinenlesbar
  // ins Schema (Offer.price) übernommen – rein für Google-/LLM-Sichtbarkeit,
  // nicht mehr auf der Seite selbst gerendert (siehe TrainingDetail.tsx).
  // Einzige Ausnahme: Train-the-Trainer, das zusätzlich als offenes Seminar mit
  // echten Einzelplätzen angeboten wird (siehe pricePerPerson unten).
  visiblePrice?: {
    perPerson: number;   // nur noch als Rechengrundlage, wird NICHT mehr angezeigt
    perGroup?: number;   // "ab"-Gruppenpreis in EUR – einziger Preis, der noch (nur im Schema) auftaucht
    unitLabel?: string;  // Default "pro Teilnehmer"
    note?: string;       // z.B. "inkl. Zertifikat."
  };
  bookingFormats?: BookingFormat[]; // Varianten für Abschnitt "Formate und Buchungsvarianten" + Schema
  // Echter Preis pro Person für Trainings, die (auch) als offenes Seminar mit
  // buchbaren Einzelplätzen laufen – aktuell nur Train-the-Trainer. Wird als
  // einzige Ausnahme von der "kein Preis pro Teilnehmer"-Regel angezeigt.
  pricePerPerson?: number;
  pricePerPersonLabel?: string; // Fließtext-Preisbeschreibung, wird direkt angezeigt
  // Verknüpfte Workshops (Slugs) – werden als optionale Erweiterungsmodule angezeigt
  relatedWorkshops?: string[];
  // Optionaler fachlicher Hintergrund-Text (bewusst unpersönlich, ohne Namensnennung) –
  // wird als eigener Abschnitt "Fachlicher Hintergrund" in TrainingDetail gerendert.
  backgroundExpertise?: string;
  // Optionale Trainer-Person NUR für strukturierte Daten (schema.org Course.instructor).
  // Erscheint nicht im sichtbaren Seitentext; überschreibt den Default-Instructor (#martin-lang).
  instructorPerson?: { name: string; sameAs?: string[] };
  // --- Optionale Felder ab 03.11.2026 (Führungskräfte-Angebot) ---
  // Alle Felder sind optional; bestehende Trainings rendern unverändert.
  subtitle?: string;               // Untertitel unter dem H1
  featuresTitle?: string;          // Abweichende Überschrift für den Inhalte-Abschnitt (Default "Inhalte und Lernziele")
  featuresBoldLead?: boolean;      // "Titel: Text" in features → Titel fett
  learningOutcomesTitle?: string;  // Abweichende Überschrift für learningOutcomes
  services?: string[];             // Abschnitt "Leistungen"
  priceOnRequest?: boolean;        // Faktenbox zeigt "Preis auf Anfrage" (Preis bleibt nur im Schema)
  // Vergleichsblock zwischen zwei Stufen eines Angebots (z. B. Briefing vs. Training)
  comparison?: {
    title: string;
    items: { name: string; duration: string; text: string; href?: string; current?: boolean }[];
  };
  // Querverweise auf weitere Formate (Titel/Dauer kommen aus den Datenquellen)
  crossLinks?: { workshops?: string[]; trainings?: string[] };
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
    visiblePrice: {
      perPerson: 150,
      perGroup: 1800,
    },
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
    visiblePrice: {
      perPerson: 383,
      perGroup: 4600,
    },
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
    icon: Users,
    title: "Train-the-Trainer: Copilot Multiplikatoren ausbilden",
    duration: "1 Tag (7 h) | 2 Tage (2 × 7 h) | 4 × 4 h",
    durationISO: "P2D",
    description: "Training für Multiplikatorinnen und Multiplikatoren, die Copilot im eigenen Unternehmen vermitteln und den Rollout mittragen sollen. Im Mittelpunkt steht der Transfer von „mal den Chatbot nutzen“ zu echter KI-unterstützter Arbeit – zuerst in der eigenen Praxis, dann in der Vermittlung an Kolleginnen und Kollegen. Fundament ist Copilot Chat in der Tiefe: Funktionalität und Einstellungen, Custom Instructions, Kontext, Prompting nach einer festen Formel aus Ziel, Kontext, Quelle und Erwartung, Arbeitsbereiche (ehemals Notebooks), Pages und die im Chat verfügbaren Agents. Wo Microsoft 365 Copilot in der Vollversion vorhanden oder geplant ist, kommen agentische Arbeitsweisen mit den Copiloten in Teams, Outlook, Word, PowerPoint, Excel und SharePoint dazu. Ergänzt wird das durch einen Überblick über Datenschutz, Urheberrecht und EU AI Act, ein festes Schema für Use Cases, Didaktik und eine ehrliche Einwandbehandlung für den Rollout. Buchbar als Tagesformat, über zwei Tage oder in vier Halbtagen – inhouse vor Ort oder online, oder als offenes Training in Köln.",
    features: [
      "Vom Chatbot zur KI-unterstützten Arbeit: Wir leiten her, warum „mal den Chatbot nutzen“ zu kurz greift, und begleiten den Transfer in eine Arbeitsweise, in der KI fester Teil der täglichen Arbeit ist – und die Multiplikatoren später selbst vermitteln.",
      "Rechtsrahmen kompakt: Überblick über Datenschutz, Urheberrecht und EU AI Act in Bezug auf die Copilot-Nutzung – so aufbereitet, dass Multiplikatoren die häufigsten Fragen im Haus beantworten können.",
      "Copilot Chat in der Tiefe: Funktionalität und Einstellungsmöglichkeiten, Custom Instructions und das gezielte Bereitstellen von Kontext.",
      "Prompting nach fester Formel: Ziel, Kontext, Quelle und Erwartung – ein Schema, das sich leicht lernen und ebenso leicht weitergeben lässt.",
      "Arbeitsbereiche (ehemals Notebooks), Pages und Agents im Copilot Chat: wann welches Werkzeug passt und wie man damit an Projekten und wiederkehrenden Aufgaben arbeitet.",
      "AI Mindset und ehrliche Einwandbearbeitung: Vorbehalte werden ernst genommen statt wegmoderiert – und wir üben Antworten, die im Kollegium tragen.",
      "Falls Microsoft 365 Copilot in der Vollversion vorhanden oder geplant ist: agentische Arbeitsweisen mit den Copiloten in Teams, Outlook, Word, PowerPoint, Excel und SharePoint anhand konkreter Beispiele.",
      "Custom Instructions in den Apps, wo vorhanden, Datenquellen und Grounding sowie viele neue Workflow- und Use-Case-Ideen für den Arbeitsalltag.",
      "Agent Builder und Workflows, sofern in Ihrer Umgebung verfügbar: eigene Agents anlegen und wiederkehrende Abläufe teilautomatisieren.",
      "Use Cases mit festem Schema: identifizieren, bewerten und umsetzen – mit einem Raster, das Multiplikatoren danach eigenständig im eigenen Haus anwenden.",
      "Didaktik und Praxisübungen: Wie man Copilot unterschiedlichen Nutzergruppen vermittelt – geübt an eigenen Beispielen, mit Feedback aus der Gruppe und vom Trainer.",
      "Einwandbehandlung für den Rollout: typische Widerstände aus Fachabteilungen, Führung und Belegschaft und wie Multiplikatoren darauf reagieren.",
      "Standard-Trainings-Deck, mit dem Multiplikatoren ihre ersten eigenen Schulungen bestreiten können.",
      "Zeit für Diskussionen, Praxisübungen und Gruppen-Experimente. Weitere Inhalte nach Absprache."
    ],
    tiers: ["free", "paid"],
    isNew: true,
    popular: true,
    pricePerPerson: 1495,
    pricePerPersonLabel: "Ab 1.495 € pro Person für das offene Training in Köln (2 × 7 Stunden, inkl. Standard-Trainings-Deck). Inhouse-Konditionen auf Anfrage.",
    questionLead: "Wir bilden Ihre internen Copilot-Multiplikatoren, Ambassadoren und AI Change Verantwortlichen aus – an einem Tag, an zwei Tagen oder in vier Halbtagen –, damit sie Ihre Mitarbeitenden im Alltag befähigen können.",
    prerequisites: "Keine formalen Voraussetzungen. Empfohlen sind eigene Copilot-Praxis, gute Kommunikationsfähigkeiten und ein Grundgefühl für Prozesse im eigenen Unternehmen.",
    format: "Inhouse (vor Ort oder online) oder offenes Training in Köln",
    level: "Fortgeschrittene",
    audienceShort: "Interne Multiplikatoren, Ambassadoren und AI-Change-Verantwortliche",
    groupSize: "bis 12 Teilnehmende",
    bookingFormats: [
      {
        name: "Tagesformat (7 Stunden)",
        modes: ["onsite", "online"],
        durationISO: "PT7H",
        description: "Die Kerninhalte an einem Tag – für Unternehmen, die mit Copilot Chat starten und ihre Multiplikatoren schnell arbeitsfähig machen wollen."
      },
      {
        name: "Zwei Tage (2 × 7 Stunden)",
        modes: ["onsite", "online"],
        durationISO: "P2D",
        description: "Das volle Programm inklusive der Copiloten in den 365-Apps, mit deutlich mehr Zeit für Praxisübungen, Diskussionen und Gruppen-Experimente."
      },
      {
        name: "Vier Halbtage (4 × 4 Stunden)",
        modes: ["onsite", "online"],
        durationISO: "PT16H",
        description: "Die Inhalte verteilt auf vier Termine – zwischen den Halbtagen probieren die Multiplikatoren das Gelernte im eigenen Haus aus."
      },
      {
        name: "Offenes Training in Köln (2 × 7 Stunden)",
        modes: ["onsite"],
        durationISO: "P2D",
        description: "Multiplikatoren aus verschiedenen Unternehmen – der branchenübergreifende Austausch ist ein eigener Gewinn."
      }
    ],
    targetAudience: [
      "AI Change Verantwortliche und Ambassadoren, die einen Copilot-Rollout in ihrem Unternehmen orchestrieren",
      "Copilot-Multiplikatoren aus Fachabteilungen, die Kolleginnen und Kollegen im Alltag begleiten und befähigen wollen",
      "L&D- und HR-Verantwortliche, die interne Copilot-Trainings aufbauen statt jeden Workshop extern einzukaufen",
      "Führungskräfte, die Adoption nicht dem Zufall überlassen und feste Ansprechpartner in den Teams verankern wollen",
      "Erfahrene Copilot-Anwender, die zur internen Anlaufstelle werden – auch ohne klassischen Trainer-Hintergrund"
    ],
    learningOutcomes: [
      "Sie vollziehen den Schritt von „mal den Chatbot nutzen“ zu KI-unterstützter Arbeit selbst nach und können ihn Kolleginnen und Kollegen vermitteln",
      "Sie kennen die Leitplanken aus Datenschutz, Urheberrecht und EU AI Act für die Copilot-Nutzung und können sie intern erklären",
      "Sie beherrschen Copilot Chat in der Tiefe: Einstellungen, Custom Instructions, Kontext, Arbeitsbereiche, Pages und Agents",
      "Sie prompten nach der Formel aus Ziel, Kontext, Quelle und Erwartung und bringen sie anderen bei",
      "Sie kennen agentische Arbeitsweisen mit den Copiloten in den 365-Apps, Grounding über Datenquellen sowie Agent Builder und Workflows – sofern Ihre Lizenzierung das hergibt",
      "Sie identifizieren, bewerten und setzen Use Cases anhand eines festen Schemas um",
      "Sie gestalten eigene Trainings für unterschiedliche Nutzergruppen und starten dafür mit dem Standard-Trainings-Deck",
      "Sie begegnen Einwänden im Rollout ehrlich und mit Argumenten, die im Kollegium tragen"
    ],
    businessImpact: [
      "Use Cases werden im Haus systematisch gefunden, bewertet und umgesetzt statt zufällig – passend zu unserem [Leitfaden für die Copilot-Einführung im Unternehmen](/wissen/copilot-im-unternehmen-einfuehren-leitfaden)",
      "Die Kosten für externe Schulungen sinken, weil Sie intern skalieren – mit Standard-Trainings-Deck und didaktischem Fundament aus unserem [Training- und Schulungsangebot](/wissen/copilot-training-schulung)",
      "Mitarbeitende sehen vertraute Gesichter in Trainings statt austauschbarer Externer – Akzeptanz und Transferquote steigen, gerade wenn Sie eine [interne Launch-Kampagne](/wissen/copilot-launch-kampagne) als Rahmen nutzen",
      "Multiplikatoren tragen den Change im Alltag: in der Kaffeeküche, im Teams-Chat, in der Übersetzung neuer Features in den eigenen Prozess – die Wirkungen, die [unser Fachartikel zur Inhouse-Change-Begleitung](/wissen/interne-copilot-trainer-ausbilden) ausführlich beschreibt",
      "Fragen zu Datenschutz, Urheberrecht und EU AI Act werden in den Teams beantwortet, statt jede Kleinigkeit an IT oder Rechtsabteilung weiterzureichen"
    ],
    metaTitle: "Train-the-Trainer Copilot – Multiplikatoren ausbilden | copilotenschule.de",
    metaDescription: "Train-the-Trainer für Copilot-Multiplikatoren: Copilot Chat in der Tiefe, 365-Apps, Use Cases, Didaktik, Einwände. 7 h, 2 × 7 h oder 4 × 4 h.",
    keywords: [
      "Train the Trainer Copilot",
      "Copilot Trainer Ausbildung",
      "Copilot Ambassador Programm",
      "Copilot Multiplikator ausbilden",
      "AI Change Manager Schulung",
      "interne Copilot Trainer schulen",
      "Microsoft Copilot Train the Trainer",
      "Copilot Chat Multiplikatoren Schulung"
    ],
    faqs: [
      {
        question: "Wir wollen Copilot intern selbst trainieren – wie bauen wir dafür kompetente Multiplikatoren auf?",
        answer: "Multiplikatoren brauchen drei Dinge: eigene Praxis, die deutlich über gelegentliches Chatten hinausgeht, ein Werkzeug, mit dem sie Use Cases finden und bewerten, und didaktisches Handwerk für unterschiedliche Nutzergruppen. Genau das trainieren wir – mit Copilot Chat in der Tiefe, einem festen Use-Case-Schema und Praxisübungen zur Vermittlung. Für die ersten eigenen Schulungen erhalten Sie ein Standard-Trainings-Deck. Mehr zur Logik interner Multiplikatoren lesen Sie in unserem Beitrag [interne Copilot-Trainer ausbilden](/wissen/interne-copilot-trainer-ausbilden)."
      },
      {
        question: "Welches Format passt zu uns – ein Tag, zwei Tage oder vier Halbtage?",
        answer: "Der Tag mit 7 Stunden passt, wenn Sie mit Copilot Chat starten und Ihre Multiplikatoren schnell arbeitsfähig sein sollen. Zwei Tage geben Raum für die Copiloten in den 365-Apps, Agent Builder und deutlich mehr Übung – das empfehlen wir, wenn die Vollversion von Microsoft 365 Copilot vorhanden oder geplant ist. Vier Halbtage à 4 Stunden verteilen die Inhalte so, dass Ihre Leute zwischen den Terminen ausprobieren und mit echten Fragen zurückkommen. Welches Format zu Ihrem Rollout passt, klären wir mit Ihnen in einem kurzen Gespräch."
      },
      {
        question: "Wir haben nur Copilot Chat, keine Vollversion – lohnt sich das Training trotzdem?",
        answer: "Ja. Der Kern des Trainings ist Copilot Chat: Einstellungen, Custom Instructions, Kontext, Prompting nach fester Formel, Arbeitsbereiche, Pages und Agents. Mit diesem Teil arbeiten die meisten Mitarbeitenden zuerst, und genau hier brauchen sie Unterstützung. Die agentischen Arbeitsweisen in Teams, Outlook, Word, PowerPoint, Excel und SharePoint nehmen wir nur auf, wenn die Vollversion vorhanden oder geplant ist. So investieren Sie keine Trainingszeit in Funktionen, die Ihre Leute gar nicht haben."
      },
      {
        question: "Viele Mitarbeitende sind skeptisch gegenüber KI – wie sollen Multiplikatoren damit umgehen?",
        answer: "Mit Ehrlichkeit statt Werbesprech. Im Training arbeiten wir an einem realistischen AI Mindset und an Antworten auf die Einwände, die im Rollout tatsächlich kommen: Sorge um den eigenen Arbeitsplatz, enttäuschende erste Erfahrungen, Datenschutzbedenken. Multiplikatoren lernen, die Grenzen von Copilot offen zu benennen. Das macht sie glaubwürdiger als jede Hochglanzdemo."
      },
      {
        question: "Was ist der Unterschied zur Ausbildung zum KI-unterstützten Wissensarbeiter?",
        answer: "Die Wissensarbeiter-Ausbildung macht Sie zum Power User. Train-the-Trainer geht eine Stufe weiter: Hier lernen Sie, andere zu Power Usern zu machen. Sie vertiefen die eigene Praxis, lernen zusätzlich Use-Case-Bewertung, Didaktik und Einwandbehandlung für den Rollout – und bekommen ein Standard-Trainings-Deck für Ihre ersten eigenen Schulungen."
      },
      {
        question: "Können wir das Training als geschlossene Gruppe oder nur offen buchen?",
        answer: "Beides. Geschlossene Inhouse-Gruppen buchen Sie als Tag, über zwei Tage oder in vier Halbtagen – bei Ihnen vor Ort oder online. Das offene Training über zwei Tage findet in Köln statt und bringt Multiplikatoren aus verschiedenen Firmen zusammen; der Austausch mit Kolleginnen und Kollegen aus anderen Branchen öffnet Perspektiven, die in geschlossenen Gruppen fehlen."
      },
      {
        question: "Welche Voraussetzungen brauchen unsere Teilnehmer und wen schicken wir am besten?",
        answer: "Keine formalen Voraussetzungen. Wirksam sind Mitarbeitende mit guten Kommunikationsskills, die geduldig zuhören und erklären können, im Alltag ansprechbar und präsent sind (nicht die gestresstesten High Performer), Copilot bereits aus eigener Motivation länger nutzen und ein Grundgefühl für Prozesse haben. Wichtig: Schicken Sie nicht nur Führungskräfte – die wirksamsten Multiplikatoren sind oft eine Ebene tiefer, mit Akzeptanz und Vertrauen im Kollegium. Eine bewusst gemischte Gruppe aus Fach- und Führungsebene wirkt erfahrungsgemäß am stärksten."
      },
      {
        question: "Wie überzeuge ich die Geschäftsleitung, in eine Train-the-Trainer-Ausbildung zu investieren?",
        answer: "Das stärkste Argument ist Skalierung: Wenn Sie 1.000 Mitarbeitende zu Copilot-Profis machen wollen, sind externe Schulungen für jeden schlicht zu teuer und zu zähflüssig. Mit zwei bis fünf intern ausgebildeten Multiplikatoren können Sie den Großteil der Trainings selbst stemmen – und behalten Use-Case-Pflege und Anwender-Support im Haus. Verhaltensänderung gelingt mit vertrauten Gesichtern aus dem eigenen Unternehmen messbar besser als mit Externen, gerade in der entscheidenden Phase nach dem Training. Da schon ein einzelner Tag reicht, um zu starten, sinkt zusätzlich die Hürde, gute Multiplikatoren aus dem Tagesgeschäft freizustellen."
      }
    ],
    relatedWorkshops: ["copilot-strategie-change-management", "copilot-launch-eventtag"],
  },
  {
    slug: "copilot-fuehrungskraefte",
    icon: Briefcase,
    title: "Copilot für Führungskräfte",
    subtitle: "Die Einführung im Team begleiten und Copilot selbst als Führungswerkzeug nutzen",
    duration: "Ganztag (7 Stunden)",
    durationISO: "PT7H",
    description: "Wenn Copilot ins Unternehmen kommt, fragen die Mitarbeitenden zuerst ihre Führungskraft. Dieses Training bereitet Führungskräfte auf genau diese Rolle vor und macht Copilot zugleich zu ihrem eigenen Werkzeug. Denn wer es selbst benutzt, muss weniger überzeugen.",
    featuresTitle: "Inhalte",
    featuresBoldLead: true,
    features: [
      "Was sich verändert: Wie KI und Agenten die Arbeit im Team verschieben und welche neuen Aufgaben daraus für Führung entstehen.",
      "Die Fragen des Teams: Ehrliche Antworten auf Job-Sorgen, Nutzungsregeln und Erwartungen, und Klarheit, was an IT, Datenschutz oder Betriebsrat gehört.",
      "Copilot im Führungsalltag: Gespräche vorbereiten, Unterlagen verdichten, Entscheidungsvorlagen erstellen und Teamkommunikation entwerfen, mit eigener Praxis am Gerät.",
      "Anwendungsfälle und nächste Schritte: Fälle aus dem eigenen Bereich mit vier Prüffragen bewerten und einen Plan für die ersten 30 Tage im Team entwickeln."
    ],
    learningOutcomesTitle: "Das nehmen die Teilnehmenden mit",
    learningOutcomes: [
      "Sicherheit im Gespräch mit dem Team über die Einführung",
      "Eigene Routinen mit Copilot für typische Führungsaufgaben",
      "Bewertete Anwendungsfälle und einen 30-Tage-Plan für das eigene Team"
    ],
    services: [
      "Vorgespräch zu den Regeln im Haus",
      "Trainingsunterlagen",
      "Prompt-Sammlung für Führungsaufgaben",
      "Teilnahmebestätigung"
    ],
    tiers: ["free", "paid"],
    isNew: true,
    prerequisites: "Microsoft 365 Copilot empfohlen, Durchführung mit Copilot Chat möglich.",
    format: "Inhouse vor Ort oder online",
    groupSize: "bis 12 Teilnehmende",
    // Preis nur maschinenlesbar (JSON-LD Offer.price), NICHT sichtbar – sichtbar "Preis auf Anfrage".
    // perPerson ist Pflichtfeld des Typs, wird nicht gerendert (3.400 € / 12 TN).
    visiblePrice: { perPerson: 283, perGroup: 3400 },
    priceOnRequest: true,
    comparison: {
      title: "Briefing oder Training?",
      items: [
        { name: "Führungskräfte-Briefing", duration: "2 Stunden", text: "Orientierung vor dem Rollout, ohne eigenes Hands-on.", href: "/workshops/fuehrungskraefte-briefing-copilot" },
        { name: "Copilot für Führungskräfte", duration: "Ganztag", text: "Vertiefung mit Übungen und Copilot im eigenen Führungsalltag.", current: true }
      ]
    },
    crossLinks: {
      workshops: ["fuehrungskraefte-briefing-copilot", "copilot-strategie-change-management"],
      trainings: ["eu-ai-act-pflichtschulung"]
    },
    metaTitle: "Copilot Training für Führungskräfte | copilotenschule.de",
    metaDescription: "Ganztagstraining für Führungskräfte: auf die Fragen des Teams zur Copilot-Einführung vorbereiten und Copilot selbst als Führungswerkzeug nutzen.",
    keywords: [
      "Copilot Schulung Führungskräfte",
      "KI Training Führungskräfte",
      "Microsoft 365 Copilot für Führungskräfte",
      "Copilot Training Führungskräfte",
      "Copilot Einführung Führungskräfte",
      "KI Schulung Führungskräfte"
    ],
    faqs: [
      {
        question: "Brauchen die Teilnehmenden eine Copilot-Lizenz?",
        answer: "Empfohlen, nicht zwingend. Mit Microsoft 365 Copilot arbeiten die Übungen im eigenen Postfach und in Teams, mit Copilot Chat anhand eingefügter Unterlagen."
      },
      {
        question: "Was ist der Unterschied zum Führungskräfte-Briefing?",
        answer: "Das [Führungskräfte-Briefing](/workshops/fuehrungskraefte-briefing-copilot) gibt in zwei Stunden Orientierung. Das Training übt die Gespräche mit dem Team und macht Copilot zum eigenen Werkzeug."
      },
      {
        question: "Wann ist der richtige Zeitpunkt?",
        answer: "Vor den Schulungen der Mitarbeitenden, denn das Team fragt die Führungskraft zuerst."
      }
    ],
  },
  {
    slug: "copilot-lernreise-8-wochen",
    icon: GraduationCap,
    title: "Copilot Lernreise: Das Potenzial des Copiloten in den 365-Apps voll nutzen",
    duration: "6 × 2 Stunden online über 6 Wochen",
    durationISO: "PT12H",
    description: "Begleitete Lernreise für nachhaltigen Kompetenzaufbau: In 6 wöchentlichen Online-Sessions à 2 Stunden lernen Sie, das Potenzial von Microsoft Copilot in Word, Excel, PowerPoint, Outlook und Teams voll zu nutzen – mit Theorie, Live-Demos und praktischen Übungen, die sehr nahe an Ihren täglichen Szenarien sind. Jede Session bringt einen neuen Use Case, den Sie direkt in Ihrem Arbeitsalltag umsetzen. Ideal für Teams, die Copilot schrittweise und nachhaltig in ihre Arbeit integrieren wollen.",
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
    level: "Einsteiger bis Fortgeschrittene",
    audienceShort: "Teams, die Copilot nachhaltig im Arbeitsalltag verankern wollen",
    groupSize: "maximal 12 Teilnehmende, ideal bis 8",
    bookingFormats: [
      {
        name: "Lernreise (6 wöchentliche Online-Sessions à 2 Stunden)",
        modes: ["online"],
        workload: "2 Stunden pro Woche über 6 Wochen",
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
    metaTitle: "Copilot Lernreise – 6 Wochen, 6 × 2 h online | copilotenschule.de",
    metaDescription: "Copilot-Lernreise: 6 Online-Sessions à 2 Stunden über 6 Wochen. So nutzen Ihre Teams das Potenzial von Copilot in Word, Excel, Outlook & Co. voll.",
    keywords: ["Copilot Lernreise", "Copilot 6 Wochen", "nachhaltiges KI-Training", "Copilot Blended Learning", "Copilot Kompetenzaufbau"],
    faqs: [
      {
        question: "Wie stellen wir sicher, dass KI-Training nachhaltig wirkt und nicht nach einer Woche vergessen ist?",
        answer: "Das Problem kennen viele: Nach einem eintägigen Workshop verpufft das Wissen schnell. Die Lösung: Ein Lernreise-Format über mehrere Wochen. Jede Woche ein neues Thema, dazwischen praktische Anwendung im Arbeitsalltag, und in der nächsten Session werden echte Fragen aus der Praxis geklärt. So wird Copilot zur Gewohnheit, nicht zum einmaligen Event."
      },
      {
        question: "Gibt es Copilot-Training, das über mehrere Wochen geht statt an einem Tag?",
        answer: "Ja, eine Lernreise über 6 Wochen mit sechs wöchentlichen 2-Stunden-Sessions online ist ideal für nachhaltigen Kompetenzaufbau. Jede Session ein neuer Schwerpunkt (Word, Excel, PowerPoint bis hin zu Copilot Agenten), jede Session ein praktischer Use Case zum Umsetzen. Zwischen den Sessions: echte Anwendung, Peer Learning, Support-Kanal für Fragen. So wird KI-Kompetenz zur dauerhaften Fähigkeit."
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
    icon: Brain,
    title: "KI-Agenten und Automatisierung mit Microsoft Copilot Studio",
    duration: "1 Tag (7 Stunden)",
    durationISO: "PT7H",
    description: "Fortgeschrittenes Training zur Entwicklung intelligenter KI-Agenten und Automatisierungs-Workflows mit Microsoft Copilot Studio. Sie lernen, wie Sie benutzerdefinierte Copilot-Agenten für spezifische Geschäftsprozesse erstellen, diese mit Unternehmensdaten verbinden und über Power Automate sowie eigene API-Anbindungen in bestehende Systeme integrieren. Der Workshop geht bewusst über reine Low-Code-Klicks hinaus: Wo Copilot Studio an seine Grenzen stößt, zeigen wir, wie sich Agenten sauber mit externen Schnittstellen, Datenbanken und bestehender Unternehmenssoftware verbinden lassen.",
    features: [
      "Copilot Studio Grundlagen: Plattform-Überblick, Architektur verstehen, Entwicklungsumgebung einrichten",
      "Custom Agents für Microsoft Teams erstellen: Conversational AI entwickeln, Natural Language Processing nutzen",
      "Integration mit Unternehmensdaten: SharePoint, Dataverse, externe APIs anbinden, Datenquellen konfigurieren",
      "Workflow-Automatisierung mit Power Automate: Geschäftsprozesse digitalisieren, Genehmigungsprozesse abbilden",
      "Prompt Engineering für Agenten: Systemanweisungen optimieren, Kontext-Management, Guardrails implementieren",
      "Testing und Deployment: Agenten testen, Performance optimieren, Rollout planen, Monitoring einrichten",
      "Use Cases aus der Praxis: HR-Assistent, IT-Helpdesk-Agent, Sales-Support-Bot, Onboarding-Assistent",
      "Eigene APIs und Schnittstellen anbinden: wo Copilot Studio an Grenzen stößt und wie sich Agenten sauber mit bestehender Unternehmenssoftware verbinden lassen",
      "Datengetriebene Agenten: Auswertungen und Kennzahlen aus Power BI bzw. strukturierten Daten als Kontext für Agenten nutzen"
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
      "Sie beherrschen Workflow-Automatisierung mit Power Automate für komplexe Geschäftsprozesse",
      "Sie verstehen, wie sich Copilot-Agenten technisch sauber mit eigenen APIs, Datenbanken und bestehender Unternehmenssoftware verbinden lassen – nicht nur über Standard-Konnektoren"
    ],
    businessImpact: [
      "First-Level-Support wird um 40-60% entlastet durch KI-Agenten, die Standardfragen selbstständig beantworten",
      "Mitarbeiter finden Informationen in Sekunden statt Minuten – der Agent durchsucht alle internen Quellen",
      "Wiederkehrende Prozesse (Urlaubsanträge, Onboarding-Fragen, IT-Tickets) laufen automatisiert ab",
      "Die Time-to-Value für neue Automatisierungsprojekte sinkt von Monaten auf Wochen"
    ],
    backgroundExpertise: "In dieses Training fließt eine Kombination ein, die am Markt selten in einer Person zusammenkommt: tiefe Software-Entwicklungspraxis und offizielle Microsoft-Trainings-Qualifikation. Über sieben Jahre Erfahrung als Full-Stack-Softwareentwickler, unter anderem mit Vue.js, PHP/Symfony und Node.js, bilden das technische Fundament, um Copilot-Studio-Agenten und Power-Automate-Workflows nicht nur zu bedienen, sondern ihre Funktionsweise wirklich zu verstehen. Dazu kommen die offizielle Microsoft-Trainerzulassung (Microsoft Certified Trainer), eine IHK-geprüfte Ausbildereignung (AEVO) für methodisch fundierte Vermittlung sowie eine Zertifizierung als Microsoft Power BI Data Analyst, die zusätzliche analytische Tiefe im Umgang mit Daten und Automatisierungen mitbringt. Ergänzt durch eine Agile-Scrum-Zertifizierung und praktische Projekterfahrung – hilfreich, wenn Automatisierungsvorhaben im Team eingeführt werden sollen. Diese Kombination aus Entwickler-Perspektive und Trainer-Erfahrung erlaubt es, im Training nicht nur zu zeigen, wie man klickt, sondern zu erklären, was im Hintergrund passiert – und wo typische Stolperfallen bei Agenten und Automatisierungen liegen.",
    instructorPerson: {
      name: "Jerish George",
      sameAs: ["https://jerishgeorge.de/"]
    },
    metaTitle: "Copilot Studio Training – KI-Agenten entwickeln | copilotenschule.de",
    metaDescription: "Entwickeln Sie KI-Agenten mit Microsoft Copilot Studio: Custom Agents, Teams-Integration, Power Automate. Praxis-Training für Unternehmen.",
    keywords: ["Copilot Studio Training", "KI-Agenten entwickeln", "Microsoft Copilot Agents", "Copilot Automatisierung", "Custom Copilot", "Copilot Agent erstellen", "Power Automate Schulung"],
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
      },
      {
        question: "Was unterscheidet diesen Workshop von einem reinen No-Code/Low-Code-Einstieg?",
        answer: "Copilot Studio ist zwar Low-Code, aber bei komplexeren Integrationen – eigene APIs, Datenbanken, bestehende Unternehmenssoftware – braucht es echtes technisches Verständnis. Der Workshop wird von einem Trainer mit über sieben Jahren eigener Softwareentwicklungserfahrung geleitet und geht deshalb dort in die Tiefe, wo reine Low-Code-Formate an Grenzen stoßen."
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
  {
    slug: "copilot-excel-rechnungswesen-controlling",
    icon: Calculator,
    isNew: true,
    title: "Copilot in Excel für Rechnungswesen & Controlling",
    duration: "Ganztag (8 Stunden)",
    durationISO: "PT8H",
    description: "Ein Praxistag für Mitarbeitende aus Rechnungswesen und Controlling, die mit Microsoft 365 Copilot ihre tägliche Arbeit in Excel und im Berichtswesen beschleunigen wollen. Der Workshop bleibt nah an den tatsächlichen Copilot-Funktionen: Formeln und Datenanalyse in Excel, Aufbereitung wiederkehrender Berichte sowie ein erstes eigenes Agenten-Konzept für eine wiederkehrende Aufgabe aus dem Arbeitsalltag. Kein Buchhaltungs- oder Controlling-Grundlagentraining – vorausgesetzt werden die fachlichen Kenntnisse der Teilnehmenden, vermittelt wird der sichere und wirksame Umgang mit Copilot in diesem Umfeld. Unabhängig vom eingesetzten Buchhaltungs- oder ERP-System – ob DATEV, SAP, Lexware, Lexoffice, ABAS, Sage oder ein anderes System: Der Workshop setzt an Excel an, nicht am jeweiligen Vorsystem. Im Kern geht es um Finanzprozesse, die sich mit Microsoft 365 Copilot über mehrere Apps hinweg gestalten lassen – mit Excel als Dreh- und Angelpunkt. Das Schulungskonzept ist modular aufgebaut: Schwerpunkt bleibt Copilot in Excel, auf Wunsch lässt sich ein Modul zum Berichtswesen mit Power BI als regulärer Baustein des Ganztags einbinden, ohne Aufpreis.",
    features: [
      "Formeln aus natürlicher Sprache generieren – z. B. für Kontenabstimmung oder Soll-Ist-Vergleiche",
      "Datenanalyse: Trends und Auffälligkeiten in Buchungs- und Planungsdaten erkennen",
      "Pivot-Tabellen automatisch erstellen und anpassen",
      "Die COPILOT()-Funktion: KI-gestützte Auswertung direkt in der Zelle, die sich bei neuen Daten automatisch aktualisiert",
      "Wiederkehrende Reports (Monats-/Quartalsberichte) mit Copilot vorbereiten",
      "Soll-Ist-Vergleiche und Abweichungsanalysen aufbereiten",
      "Diagramme und kurze Management-Zusammenfassungen aus Zahlen erzeugen",
      "Agent Builder in Microsoft 365 Copilot – No-Code-Einstieg für Fachanwender",
      "Konzept für einen eigenen Agenten zu einer wiederkehrenden Aufgabe (z. B. Checkliste Monatsabschluss, Erinnerung bei offenen Posten) – Umsetzung optional im Nachgang"
    ],
    tiers: ["paid"],
    questionLead: "Wie nutze ich Microsoft 365 Copilot in Excel und im Berichtswesen für Rechnungswesen und Controlling?",
    prerequisites: "Microsoft 365 Copilot-Lizenz (Business/Enterprise) für alle Teilnehmenden. Grundkenntnisse in Excel sowie fachliche Kenntnisse in Rechnungswesen/Controlling werden vorausgesetzt und nicht vermittelt.",
    format: "Live-Online (Microsoft Teams), vor Ort beim Kunden oder bei uns in Köln-Nippes",
    level: "Fortgeschrittene (mit Lizenz, fachliche Vorkenntnisse vorausgesetzt)",
    audienceShort: "Mitarbeitende aus Rechnungswesen und Controlling",
    groupSize: "bis 12 Teilnehmende",
    certificate: "Personalisiertes Teilnahmezertifikat auf Wunsch",
    targetAudience: [
      "Mitarbeitende aus Finanzbuchhaltung, Rechnungswesen und Controlling",
      "Arbeiten regelmäßig in Excel mit Buchungs-, Planungs- oder Reportingdaten",
      "Verfügen über eine Microsoft 365 Copilot Lizenz (Business oder Enterprise)"
    ],
    learningOutcomes: [
      "Copilot sicher und compliant mit sensiblen Finanzdaten einsetzen",
      "Excel-Formeln, Datenanalysen und Pivot-Tabellen per Copilot erstellen und prüfen",
      "Wiederkehrende Reports und Soll-Ist-Vergleiche mit Copilot vorbereiten",
      "Das Konzept für einen eigenen Agenten zu einer wiederkehrenden Aufgabe entwickeln"
    ],
    backgroundExpertise: "In dieses Training fließt Praxiserfahrung aus Finanzbuchhaltung, Controlling-nahen Aufgaben und eigener Entwicklung von KI-Schulungsinhalten ein: IHK-geprüfte Finanzbuchhalter-Qualifikation und staatlich geprüfte Bilanzbuchhalter-Qualifikation, ingenieurwissenschaftliche und informatische Ausbildung (Diplom-Ingenieurwesen sowie Bachelor in Informatik & Mathematik). Mehrjährige Praxis in der Finanzbuchhaltung mehrerer Unternehmen und Steuerberatungsgesellschaften – unter anderem mit DATEV, SAP, ABAS und weiteren Buchhaltungssystemen, inklusive vorbereitender Jahresabschlussarbeiten, Kontenabstimmung und Mandantenbetreuung. Dazu mehrjährige Erfahrung in Controlling-nahen Aufgaben: Budgetkontrolle, Mittelabstimmung und Unterstützung der Jahresplanung sowie, aus einer früheren Tätigkeit im Einzelhandel, operative Controlling- und Prozesskoordination. Ergänzt durch eine Weiterbildung zur KI-Spezialistin (AI-Engineering mit Python und SQL) und Erfahrung mit Automatisierungswerkzeugen wie Power BI, Zapier und Make. Dieser Hintergrund ist zugleich Grundlage eines vollständigen IHK-Lehrplans zu digitalen und KI-gestützten Büro- und Finanzprozessen – mit eigens erarbeiteten Lektionen zu Microsoft Copilot in Excel, Prompting, Datenschutz, EU AI Act und der Qualitätskontrolle von KI-Ergebnissen.",
    instructorPerson: {
      name: "Natalia Fratz",
      sameAs: ["https://www.linkedin.com/in/natalia-fratz-491b11354/"]
    },
    visiblePrice: {
      perPerson: 267,
      perGroup: 3200,
      unitLabel: "pro Teilnehmer",
      note: "zzgl. Reisekostenpauschale 350 € bei Präsenz beim Kunden"
    },
    bookingFormats: [
      {
        name: "Ganztag Live-Online (8 Stunden)",
        modes: ["online"],
        durationISO: "PT8H",
        price: 3200,
        description: "Alle vier Module. Über Microsoft Teams, bis 12 Teilnehmende."
      },
      {
        name: "Ganztag vor Ort beim Kunden (8 Stunden)",
        modes: ["onsite"],
        durationISO: "PT8H",
        price: 3200,
        description: "Alle vier Module. Inhouse beim Kunden, bis 12 Teilnehmende, zzgl. Reisekostenpauschale."
      },
      {
        name: "Ganztag bei uns in Köln-Nippes (8 Stunden)",
        modes: ["onsite"],
        durationISO: "PT8H",
        price: 3200,
        description: "Alle vier Module. In unseren eigenen Räumen in Köln-Nippes, bis 12 Teilnehmende."
      },
      {
        name: "Halbtag (4 Stunden)",
        modes: ["onsite", "online"],
        durationISO: "PT4H",
        price: 1950,
        description: "Kompakte Variante ohne Grundlagenmodul und ohne Agenten-Konzept – nur Copilot in Excel und Berichtswesen. Live-Online, beim Kunden oder bei uns in Köln-Nippes."
      }
    ],
    metaTitle: "Copilot in Excel für Rechnungswesen & Controlling | copilotenschule.de",
    metaDescription: "Ganztagesworkshop: Microsoft 365 Copilot in Excel für Rechnungswesen & Controlling. Formeln, Datenanalyse, Berichtswesen, eigene Agenten. Online, beim Kunden oder in Köln-Nippes.",
    keywords: ["Copilot in Excel", "Copilot Excel Schulung", "Copilot Rechnungswesen", "Copilot Controlling", "Microsoft 365 Copilot Buchhaltung", "Copilot DATEV", "Copilot Lexoffice", "Copilot SAP"],
    faqs: [
      {
        question: "Vermittelt der Workshop Buchhaltungs- oder Controlling-Grundlagen?",
        answer: "Nein. Vorausgesetzt werden die fachlichen Kenntnisse der Teilnehmenden aus Rechnungswesen und Controlling. Vermittelt wird ausschließlich der sichere und wirksame Umgang mit Microsoft 365 Copilot in diesem Arbeitsumfeld."
      },
      {
        question: "Baut der Workshop auf Power BI auf?",
        answer: "Grundsätzlich nicht – der Schwerpunkt liegt bewusst auf Copilot in Excel: Pivot-Tabellen, Power Query und die Copilot-Funktionen direkt in der Tabelle. Das Schulungskonzept ist aber modular aufgebaut, sodass wir Power BI auf Wunsch gerne als eigenes Modul zum Berichtswesen mit reinnehmen – als Teil des Ganztags, ohne Aufpreis."
      },
      {
        question: "Bauen wir im Workshop einen fertigen, einsatzbereiten Agenten?",
        answer: "Im Workshop entsteht das Konzept für einen eigenen Agenten zu einer wiederkehrenden Aufgabe aus dem Arbeitsalltag der Teilnehmenden. Die technische Umsetzung erfolgt im Nachgang; eine freiwillige Follow-up-Session für Vorstellung und offene Fragen kann optional ergänzt werden."
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

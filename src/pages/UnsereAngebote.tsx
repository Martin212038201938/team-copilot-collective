import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Users, TrendingUp, Shield, Clock, Laptop, Zap, HelpCircle, X, ArrowRight, Scale, Lightbulb, Mic, GraduationCap, PartyPopper, Wrench } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { generateTrainingSchemas } from "@/lib/schema";

export type CopilotTier = "free" | "paid";

interface TrainingModule {
  icon: typeof Brain;
  title: string;
  duration: string;
  description: string;
  features: string[];
  tiers: CopilotTier[];
}

// Alle Trainingsmodule - optimiert für LLM-Referenzierbarkeit und SEO
const modules: TrainingModule[] = [
  {
    icon: Brain,
    title: "Copilot Grundlagen: Prompt Design & KI-Kompetenz",
    duration: "Halbtag | Ganztag | 3×2h Lernreise",
    description: "Fundiertes Einsteiger-Training in die Arbeit mit KI-Assistenten: Sie lernen, wie Sie effektive Prompts formulieren, KI-Outputs kritisch bewerten und Microsoft Copilot Chat strategisch für Recherche, Textarbeit und kreative Aufgaben einsetzen. Ideal für alle, die noch keine Copilot-Lizenz haben oder zunächst die Grundlagen beherrschen wollen.",
    features: [
      "Prompt Engineering Grundlagen: Struktur, Kontext, Beispiele – wie Sie Copilot präzise Anweisungen geben",
      "Die Kunst der richtigen Frage: Von vagen Anfragen zu punktgenauen Ergebnissen",
      "Iteratives Prompting: Ergebnisse verfeinern, nachfragen, in die Tiefe gehen",
      "Copilot Chat für Recherche: Web-Suche, Zusammenfassungen, Faktenprüfung",
      "Textarbeit mit KI: Schreiben, Umformulieren, Kürzen, Übersetzen, Tonalität anpassen",
      "Kreative Anwendungen: Brainstorming, Ideengenerierung, Perspektivwechsel",
      "KI-Output kritisch bewerten: Halluzinationen erkennen, Quellen prüfen, Grenzen verstehen",
      "Eigene Prompt-Bibliothek aufbauen: Templates für wiederkehrende Aufgaben entwickeln",
      "Buchbar als: Halbtag (4h), Ganztag (7h) oder Lernreise (3×2h über 3 Wochen)"
    ],
    tiers: ["free"]
  },
  {
    icon: Brain,
    title: "Microsoft 365 Copilot in der Praxis: Word, Excel, PowerPoint, Outlook & Teams",
    duration: "Halbtag | Ganztag | 3×2h Lernreise",
    description: "Praxisorientiertes Training für Copilot-Lizenzinhaber: Sie lernen, wie Sie Microsoft 365 Copilot direkt in Ihren Office-Anwendungen einsetzen – von der Dokumenterstellung in Word über Datenanalyse in Excel bis zur Meeting-Zusammenfassung in Teams. Mit echten Arbeitsszenarien und direkt anwendbaren Workflows.",
    features: [
      "Copilot in Word: Dokumente erstellen, überarbeiten, zusammenfassen, formatieren",
      "Copilot in Excel: Formeln generieren, Daten analysieren, Pivot-Tabellen erstellen, Insights gewinnen",
      "Copilot in PowerPoint: Präsentationen aus Briefings erstellen, Design optimieren, Inhalte strukturieren",
      "Copilot in Outlook: E-Mail-Entwürfe erstellen, Postfach organisieren, Meeting-Follow-ups automatisieren",
      "Copilot in Teams: Meetings zusammenfassen, Aktionspunkte extrahieren, Chat-Verlauf durchsuchen",
      "Cross-App-Workflows: Dokumente aus E-Mails erstellen, Präsentationen aus Word-Texten generieren",
      "Prompt Engineering für Office: App-spezifische Prompts, die wirklich funktionieren",
      "Eigene Use Cases aus Ihrem Arbeitsalltag praktisch umsetzen",
      "Buchbar als: Halbtag (4h), Ganztag (7h) oder Lernreise (3×2h über 3 Wochen)"
    ],
    tiers: ["paid"]
  },
  {
    icon: GraduationCap,
    title: "Ausbildung zum KI-unterstützten Wissensarbeiter",
    duration: "2 Tage | 8×2h Lernreise",
    description: "Umfassende Ausbildung für alle, die KI-Assistenten professionell in ihren Arbeitsalltag integrieren wollen – von den Grundlagen bis zum Expertenniveau. In diesem intensiven Programm lernen Sie nicht nur die Tools, sondern entwickeln eine neue Art zu arbeiten: schneller, präziser, kreativer. Mit über 20 praktischen Übungen und realen Use Cases aus verschiedenen Unternehmensbereichen.",
    features: [
      "Grundlagen-Modul: KI verstehen – wie LLMs funktionieren, Möglichkeiten und Grenzen, Erwartungsmanagement",
      "Copilot Chat Mastery: Von einfachen Fragen zu komplexen Recherchen, Web-Suche, Zusammenfassungen, Faktencheck",
      "Prompt Engineering Intensiv: Strukturierte Prompts, Kontext-Technik, Few-Shot Learning, Chain-of-Thought",
      "Word, Excel, PowerPoint, Outlook, Teams: Jede App im Detail mit 3+ praktischen Übungen pro Anwendung",
      "Datenanalyse & Reporting: Komplexe Excel-Analysen, Pivot-Tabellen, Visualisierungen, automatisierte Reports",
      "Cross-App-Workflows: Dokumente aus E-Mails, Präsentationen aus Briefings, Meeting-Follow-ups automatisieren",
      "Kreative KI-Nutzung: Brainstorming, Ideation, Texte schreiben, Konzepte entwickeln, Perspektivwechsel",
      "Use Case Workshop: 10+ reale Anwendungsszenarien aus Vertrieb, Marketing, HR, Finance, Projektmanagement",
      "Persönliche Prompt-Bibliothek: Templates für Ihre wiederkehrenden Aufgaben entwickeln und dokumentieren",
      "Peer Learning & Gruppenarbeit: Voneinander lernen, Best Practices teilen, gemeinsam Probleme lösen",
      "Zertifikat: Nachweis Ihrer KI-Kompetenz für HR und Personalentwicklung",
      "Buchbar als: 2 Tage intensiv (14h) oder Lernreise (8×2h über 8 Wochen mit Praxisaufgaben)"
    ],
    tiers: ["paid"]
  },
  {
    icon: Laptop,
    title: "GitHub Copilot für Softwareentwickler",
    duration: "1 Tag (7 Stunden)",
    description: "Hands-on Entwickler-Training: Maximieren Sie Ihre Coding-Produktivität mit GitHub Copilot. Sie lernen, KI-gestützt Code zu generieren, zu testen, zu debuggen und zu dokumentieren. Das Training umfasst praktische Übungen mit echten Projekten, optimierte Entwickler-Workflows und die perfekte Stack-Konfiguration für Ihr Team.",
    features: [
      "Stack Setup & Konfiguration: IDE-Einrichtung (VS Code, JetBrains), Extensions, Copilot-Einstellungen optimieren, Team-Policies",
      "Effiziente Code-Generierung: Funktionen, Klassen, APIs und Algorithmen mit Copilot entwickeln – sprachunabhängig",
      "Intelligentes Debugging und Refactoring: Fehler identifizieren, Code optimieren, Legacy-Code modernisieren",
      "Automatisierte Code-Dokumentation: Inline-Kommentare, README-Dateien, API-Dokumentation, Changelogs generieren",
      "Unit Tests schreiben mit Copilot: Test-Cases generieren, Code-Coverage erhöhen, Test-Driven Development beschleunigen",
      "Copilot Chat & Agent Mode: Kontextbezogene Fragen, Code erklären lassen, Multi-File-Refactoring, Workspace-Verständnis",
      "Optimierte Developer Workflows: Git-Workflows beschleunigen, PR-Beschreibungen, Commit Messages, Code Reviews",
      "Prompt Engineering für Entwickler: Präzise Anfragen formulieren, Kontext bereitstellen, projektspezifische Instructions",
      "Security und Code Quality: Sicherheitslücken identifizieren, Code-Standards einhalten, SAST-Integration",
      "CI/CD Integration: Copilot in Pipelines, automatisierte Code-Analyse, GitHub Actions mit Copilot-Support",
      "Team-Konfiguration: Copilot Business/Enterprise Features, Policies, Content Exclusions, Audit Logs"
    ],
    tiers: ["free", "paid"]
  },
  {
    icon: Shield,
    title: "Microsoft Copilot & Compliance - Rechtssichere KI-Nutzung",
    duration: "4 Stunden (Halbtag)",
    description: "Kompakt-Schulung zur rechtssicheren und datenschutzkonformen Nutzung von Microsoft Copilot im Unternehmen. Sie erhalten praktische Checklisten, Templates und Guidelines für DSGVO-konforme KI-Anwendung, verstehen die Anforderungen des EU AI Act und können Compliance-Risiken proaktiv managen.",
    features: [
      "DSGVO-konforme Copilot-Nutzung: Datenverarbeitung verstehen, Rechtsgrundlagen kennen, Dokumentationspflichten erfüllen",
      "EU AI Act Anforderungen im Unternehmenskontext: Risikoklassifizierung, Compliance-Anforderungen, Transparenzpflichten",
      "Datenschutz-Impact-Assessment durchführen: Risiken identifizieren, Maßnahmen definieren, Dokumentation erstellen",
      "Microsoft 365 Sicherheitsarchitektur: Datenflüsse verstehen, Verschlüsselung, Zugriffskontrolle, Audit-Logs",
      "Compliance-Checkliste für Ihr Unternehmen: Praktische Templates, Prozesse etablieren, Team schulen",
      "Umgang mit sensiblen Daten: Klassifizierung, Information Protection, DLP-Richtlinien",
      "Rechtliche Fallstricke vermeiden: Urheberrecht, Haftungsfragen, Vertragsgestaltung mit Microsoft"
    ],
    tiers: ["free", "paid"]
  },
  {
    icon: TrendingUp,
    title: "Copilot Strategie & Change Management Workshop",
    duration: "1 Tag (7 Stunden)",
    description: "Strategischer Workshop zur erfolgreichen Einführung und Skalierung von Microsoft Copilot in Ihrem Unternehmen. Sie entwickeln eine datenbasierte Copilot-Strategie, identifizieren High-Impact Use Cases, berechnen den ROI und erstellen einen konkreten Rollout- und Change-Management-Plan für Ihre Organisation.",
    features: [
      "Prozessanalyse und Potenzialidentifikation: Wo generiert Copilot den größten Mehrwert für Ihr Unternehmen?",
      "ROI-Berechnung und Business Case: Kosteneinsparungen quantifizieren, Produktivitätsgewinne messen, Quick Wins identifizieren",
      "Phasenweiser Rollout-Plan: Pilot-Gruppen definieren, Erfolgskriterien festlegen, Skalierungsstrategie entwickeln",
      "Change Management und Adoption: Widerstände überwinden, Champions aufbauen, kontinuierliche Verbesserung etablieren",
      "Governance Framework aufbauen: Policies definieren, Verantwortlichkeiten klären, Eskalationsprozesse etablieren",
      "Success Metrics und KPIs definieren: Nutzung messen, Produktivität tracken, Anwenderfeedback systematisch einholen",
      "Best Practices aus erfolgreichen Copilot-Rollouts: Lessons learned, typische Stolpersteine, Erfolgsfaktoren"
    ],
    tiers: ["free", "paid"]
  },
  {
    icon: Brain,
    title: "KI-Agenten und Automatisierung mit Microsoft Copilot Studio",
    duration: "1 Tag (7 Stunden)",
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
    tiers: ["paid"]
  },
  {
    icon: Users,
    title: "Chatbot-Workshop: Ihren ersten KI-Assistenten gemeinsam entwickeln",
    duration: "1 Tag (7 Stunden)",
    description: "Hands-on Workshop, in dem Sie nicht nur lernen, sondern direkt Ihren ersten funktionsfähigen Unternehmens-Chatbot mit Microsoft Copilot Studio entwickeln. Am Ende des Tages haben Sie einen einsatzbereiten KI-Assistenten, der auf Ihre internen Wissensdatenbanken zugreift und in Microsoft Teams deployed ist.",
    features: [
      "Copilot Studio Grundlagen: Plattform verstehen, Entwicklungsumgebung einrichten, erste Schritte",
      "Gemeinsame Konzeption: Use Case definieren, Conversation Flow entwerfen, Intents und Antworten strukturieren",
      "Praktische Umsetzung: Chatbot Schritt für Schritt gemeinsam aufbauen mit Trainer-Begleitung",
      "Anbindung Ihrer Datenquellen: SharePoint-Integration, FAQ-Dokumente, Unternehmens-Wiki verbinden",
      "Live-Deployment in Microsoft Teams: Chatbot ausrollen, Berechtigungen konfigurieren, testen",
      "Optimierung und Feintuning: Antwortqualität verbessern, Fehlerbehandlung, Edge Cases abfangen",
      "Übergabe und Dokumentation: Ihr fertiger Chatbot plus Dokumentation für Wartung und Weiterentwicklung",
      "Use Cases: HR-Bot, IT-Helpdesk, Onboarding-Assistent, FAQ-Bot, Wissensmanagement-Agent"
    ],
    tiers: ["paid"]
  },
  {
    icon: Zap,
    title: "Low-Code Entwicklung mit Microsoft Copilot - Flow Coding im Unternehmen",
    duration: "1 Tag (7 Stunden)",
    description: "Praxistraining für Citizen Developer und Business User: Lernen Sie, wie Sie mit Microsoft Power Platform und Copilot-Unterstützung geschäftliche Anwendungen ohne traditionelle Programmierung entwickeln. Sie erstellen Apps, automatisieren Workflows und bauen Datenintegration – alles mit Low-Code und KI-Support.",
    features: [
      "Low-Code Entwicklung mit Power Apps und Copilot: Apps per natürlicher Sprache erstellen, UI designen, Logik implementieren",
      "Geschäftsprozess-Automatisierung mit Power Automate: Workflows erstellen, Genehmigungen automatisieren, Integrationen bauen",
      "Copilot als Entwicklungs-Assistent: Code-Generierung für Formeln, Fehlersuche, Optimierungsvorschläge",
      "Datenmodellierung mit Dataverse: Tabellen erstellen, Beziehungen definieren, Business Rules implementieren",
      "Integration mit Microsoft 365: SharePoint, Teams, Outlook, Excel nahtlos verbinden",
      "Best Practices für Citizen Development: Governance beachten, Wartbarkeit sicherstellen, Sicherheitsaspekte berücksichtigen",
      "Praktische Projekte: Von der Idee zur fertigen App – Teilnehmer entwickeln eigene Anwendungen"
    ],
    tiers: ["paid"]
  },
  {
    icon: Scale,
    title: "EU AI Act Pflichtschulung – Rechtssichere KI-Nutzung im Unternehmen",
    duration: "4 Stunden (Halbtag)",
    description: "Pflichtschulung zur Erfüllung der EU AI Act Anforderungen: Alle Mitarbeiter, die mit KI-Systemen arbeiten, müssen nachweislich geschult werden. Dieses Training vermittelt das erforderliche Wissen zu KI-Kompetenz, Risikobewusstsein und verantwortungsvollem Umgang mit KI-Systemen gemäß Artikel 4 EU AI Act.",
    features: [
      "EU AI Act Grundlagen: Anwendungsbereich, Risikoklassifizierung, Pflichten für Unternehmen und Mitarbeiter",
      "Artikel 4 KI-Kompetenz: Was der Gesetzgeber fordert und wie Sie die Anforderungen erfüllen",
      "Risikobasierter Ansatz verstehen: Hochrisiko-KI vs. KI mit geringem Risiko, Verbotene KI-Praktiken",
      "Transparenz- und Dokumentationspflichten: Was bei der KI-Nutzung dokumentiert werden muss",
      "Praktische Compliance: Checklisten für den Arbeitsalltag, Do's und Don'ts",
      "Microsoft Copilot im EU AI Act Kontext: Einordnung, Verantwortlichkeiten, Best Practices",
      "Nachweisführung: Schulungszertifikat und Dokumentation für Audits und Behörden"
    ],
    tiers: ["free", "paid"]
  },
  {
    icon: Lightbulb,
    title: "Copilot Hackathon für Nicht-Entwickler",
    duration: "1 Tag (7 Stunden)",
    description: "Intensiver Innovations-Workshop für Business-Anwender ohne Programmierkenntnisse: In Teams entwickeln Sie kreative Copilot-Lösungen für echte Geschäftsprobleme. Keine Coding-Skills erforderlich – nur Neugier, Kreativität und der Wille, Arbeitsabläufe neu zu denken.",
    features: [
      "Hackathon-Format: Teambildung, Challenge-Briefing, intensive Arbeitsphase, Pitch vor Jury",
      "Use Case Ideation: Geschäftsprobleme identifizieren, die mit Copilot gelöst werden können",
      "Rapid Prototyping mit Copilot: Schnell funktionierende Lösungen ohne Code entwickeln",
      "Cross-funktionale Teams: Verschiedene Abteilungen arbeiten zusammen an innovativen Lösungen",
      "Prompt Engineering Battle: Wer entwickelt die effektivsten Prompts für typische Business-Szenarien?",
      "Workflow-Automation Challenge: Repetitive Aufgaben identifizieren und mit Copilot automatisieren",
      "Präsentation und Feedback: Teams pitchen ihre Lösungen, Experten-Jury gibt Feedback",
      "Preise und Anerkennung: Beste Lösungen werden ausgezeichnet und können implementiert werden"
    ],
    tiers: ["free", "paid"]
  },
  {
    icon: Mic,
    title: "Keynote: Wie Microsoft Copilot die Arbeitswelt verändert",
    duration: "1,5 Stunden",
    description: "Inspirierende Keynote für Führungskräfte, All-Hands-Meetings oder Kick-off-Veranstaltungen: Erfahren Sie, wie KI die Büroarbeit revolutioniert, welche Chancen Microsoft Copilot bietet und wie erfolgreiche Unternehmen die Transformation gestalten. Mit Live-Demos und konkreten Praxisbeispielen.",
    features: [
      "Vision: Die Zukunft der Wissensarbeit mit KI – was kommt auf uns zu?",
      "Microsoft Copilot im Überblick: Was kann es, was nicht, wo liegen die echten Mehrwerte?",
      "Live-Demonstrationen: Beeindruckende Use Cases aus Word, Excel, PowerPoint, Outlook und Teams",
      "Erfolgsfaktoren: Was unterscheidet erfolgreiche Copilot-Einführungen von gescheiterten?",
      "Change-Perspektive: Wie nehmen Sie Ihre Mitarbeiter mit auf die KI-Reise?",
      "Praxisbeispiele: Konkrete Erfolgsgeschichten aus deutschen Unternehmen",
      "Q&A Session: Ihre Fragen zu Copilot, KI-Strategie und Implementierung"
    ],
    tiers: ["free", "paid"]
  },
  {
    icon: GraduationCap,
    title: "Copilot Lernreise: Von 0 auf 100 in 8 Wochen",
    duration: "8 × 2 Stunden (16 Stunden gesamt)",
    description: "Begleitete Lernreise für nachhaltigen Kompetenzaufbau: In 8 wöchentlichen Sessions à 2 Stunden lernen Sie Microsoft Copilot von Grund auf – mit Theorie, Live-Demos und jede Woche einem neuen praktischen Use Case, den Sie direkt in Ihrem Arbeitsalltag umsetzen. Ideal für Teams, die Copilot schrittweise und nachhaltig in ihre Arbeit integrieren wollen.",
    features: [
      "Woche 1: Copilot Grundlagen – Interface, erste Prompts, Erwartungsmanagement + Use Case: E-Mail-Zusammenfassungen",
      "Woche 2: Copilot in Word – Dokumente erstellen, überarbeiten, zusammenfassen + Use Case: Protokoll aus Meeting-Notizen",
      "Woche 3: Copilot in Excel – Datenanalyse, Formeln, Visualisierungen + Use Case: Monatsbericht automatisieren",
      "Woche 4: Copilot in PowerPoint – Präsentationen erstellen und optimieren + Use Case: Pitch-Deck aus Briefing",
      "Woche 5: Copilot in Outlook – E-Mail-Produktivität steigern + Use Case: Wöchentliche Status-Mail automatisieren",
      "Woche 6: Copilot in Teams – Meetings zusammenfassen, Chat nutzen + Use Case: Meeting-Follow-ups automatisieren",
      "Woche 7: Advanced Prompting – Komplexe Anfragen, Verkettung, Custom Instructions + Use Case: Persönliche Prompt-Bibliothek",
      "Woche 8: Integration & Workflow – Alles zusammenführen + Use Case: Individuellen End-to-End-Workflow entwickeln",
      "Zwischen den Sessions: Praxisaufgaben, Peer-Learning, Support via Teams-Kanal"
    ],
    tiers: ["paid"]
  },
  {
    icon: PartyPopper,
    title: "Eventtag KI – Zum Launch des Copiloten",
    duration: "1 Tag (ganztägig)",
    description: "Der perfekte Kick-off für Ihre Copilot-Einführung: Ein energiegeladener Eventtag, der Begeisterung weckt, Berührungsängste abbaut und Ihre Mitarbeiter von Anfang an mitnimmt. Mit interaktiven Challenges, Spielen, Live-Demos und kompetenter Beratung vor Ort – alles, was Sie brauchen, um den Copilot-Launch zu einem echten Highlight zu machen.",
    features: [
      "Professioneller Infostand: Ganztägig besetzte Station mit kompetenten Ansprechpartnern für alle Fragen rund um Copilot",
      "Live-Demonstrationen: Beeindruckende Use Cases zeigen, was Copilot kann – zum Staunen und Ausprobieren",
      "Interaktive KI-Challenges: Teams treten gegeneinander an – wer löst Aufgaben am schnellsten mit Copilot?",
      "Gamification & Gewinnspiele: Spielerisch lernen mit Quizzen, Rätseln und attraktiven Preisen",
      "Hands-on Stationen: Selbst ausprobieren unter Anleitung – erste Erfolge am Tag 1 erleben",
      "Individuelle Beratung: Persönliche Gespräche zu Use Cases aus Ihrem Arbeitsbereich",
      "Hochwertige Infomaterialien: Cheat Sheets, Quick Guides und Tipps zum Mitnehmen",
      "Foto-Dokumentation: Professionelle Bilder für Ihre interne Kommunikation",
      "Follow-up-Paket: Zusammenfassung, Best Moments und nächste Schritte nach dem Event",
      "Flexible Gestaltung: Anpassbar an Ihre Location, Teilnehmerzahl und Corporate Identity"
    ],
    tiers: ["free", "paid"]
  },
  {
    icon: Wrench,
    title: "Individuelle Copilot-Schulungen nach Maß",
    duration: "Flexibel (nach Bedarf)",
    description: "Maßgeschneiderte Microsoft Copilot Trainings, die exakt auf Ihre Unternehmenssituation, Branche und spezifischen Anforderungen zugeschnitten sind. Ob Sales, Marketing, HR, Finance, Produktion oder Verwaltung – wir entwickeln Use Cases mit Ihren realen Daten und Prozessen und trainieren Ihre Teams abteilungsspezifisch.",
    features: [
      "Abteilungsspezifische Schulungskonzepte: Vertrieb, Marketing, HR, Finanzen, Einkauf, Produktion, IT",
      "Training mit Ihren echten Unternehmensdaten und -prozessen: Realistische Szenarien, direkt übertragbare Ergebnisse",
      "Branchenspezifische Use Cases: Fertigung, Gesundheitswesen, Finanzdienstleistungen, Öffentlicher Sektor, Handel",
      "Individuelle Prompt-Bibliothek entwickeln: Abteilungsspezifische Templates, Best-Practice-Prompts dokumentieren",
      "Follow-up Sessions und kontinuierliche Begleitung: Refresher-Trainings, Coaching, Support nach dem Training",
      "Schulungsformate nach Wunsch: Workshops, Webinare, Train-the-Trainer, Einzelcoaching, Team-Sessions",
      "Flexible Durchführung: Vor Ort, Remote oder Hybrid – passend zu Ihren Rahmenbedingungen"
    ],
    tiers: ["free", "paid"]
  }
];

type TierFilter = "all" | "free" | "paid";

const tierFilterOptions: { value: TierFilter; label: string }[] = [
  { value: "all", label: "Alle Trainings" },
  { value: "free", label: "Copilot Free" },
  { value: "paid", label: "Copilot Paid" },
];

// Training modules data for schema generation - simplified for SEO
const trainingModulesForSchema = modules.map(m => ({
  title: m.title,
  duration: m.duration,
  description: m.description,
  features: m.features
}));

const UnsereAngebote = () => {
  const [tierFilter, setTierFilter] = useState<TierFilter>("all");
  const [showTierHelp, setShowTierHelp] = useState(false);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      // Fallback: navigate to homepage contact
      window.location.href = "/#contact";
    }
  };

  const filteredModules = tierFilter === "all"
    ? modules
    : modules.filter(m => m.tiers.includes(tierFilter));

  // Generate schema for LLM optimization
  const schema = generateTrainingSchemas(trainingModulesForSchema, []);

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Unsere Angebote – Microsoft Copilot Schulungen & Trainings | copilotenschule.de"
        description="Alle Microsoft Copilot Trainings im Überblick: Grundlagen, M365 Apps, GitHub Copilot, Compliance, Strategie, KI-Agenten und mehr. Trainings für Copilot Free und Copilot Paid Lizenzen."
        keywords={[
          "Microsoft Copilot Schulung",
          "Microsoft 365 Copilot Training",
          "Copilot Trainings Übersicht",
          "GitHub Copilot Training",
          "Copilot Studio Schulung",
          "KI Training Unternehmen",
          "Copilot Free Training",
          "Copilot Paid Training"
        ]}
        canonicalUrl="https://copilotenschule.de/unsere-angebote"
        schema={schema}
      />
      <Header />

      <main className="pt-24">
        <section id="trainings" className="py-16 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            {/* Page Header */}
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-4xl font-bold mb-4 animate-slide-up">
                Unsere Angebote
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
                Microsoft Copilot Schulungen & Trainings für Unternehmen –
                konsequent auf die konkreten Bedarfe Ihrer Organisation zugeschnitten.
              </p>
            </div>

            {/* Tier Info Section - prominent at top */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="bg-card border rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4 text-center">
                  Wir trainieren gezielt auf das Copilot-Tier, das Ihre Teilnehmer tatsächlich haben
                </h2>
                <p className="text-muted-foreground text-center mb-6">
                  Microsoft Copilot gibt es in zwei Varianten. Wählen Sie unten Ihr Tier aus, um nur die relevanten Trainings zu sehen.
                </p>

                {/* Tier badges */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                  <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-emerald-50 border border-emerald-200">
                    <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100 text-[11px] px-2 py-0.5">
                      Copilot Free
                    </Badge>
                    <span className="text-sm text-muted-foreground">Microsoft 365 Copilot Chat (Websuche, kostenlos)</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-blue-50 border border-blue-200">
                    <Badge className="bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100 text-[11px] px-2 py-0.5">
                      Copilot Paid
                    </Badge>
                    <span className="text-sm text-muted-foreground">Microsoft 365 Copilot mit Lizenz (Grounding, M365-Integration)</span>
                  </div>
                </div>

                {/* Tier Help */}
                <div className="flex justify-center">
                  {!showTierHelp ? (
                    <button
                      onClick={() => setShowTierHelp(true)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/30 bg-primary/5 hover:bg-primary/10 text-sm font-medium text-primary transition-all duration-200 hover:scale-105"
                    >
                      <HelpCircle className="w-4 h-4" />
                      Welchen Copilot habe ich?
                    </button>
                  ) : (
                    <div className="w-full max-w-md p-4 rounded-lg border border-primary/30 bg-card shadow-lg text-left animate-fade-in">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-sm flex items-center gap-2">
                          <HelpCircle className="w-4 h-4 text-primary" />
                          So finden Sie Ihr Copilot-Tier heraus
                        </h4>
                        <button
                          onClick={() => setShowTierHelp(false)}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                        <li>Öffnen Sie <strong>Microsoft Copilot</strong> in Teams, Word oder im Browser (copilot.microsoft.com)</li>
                        <li>Achten Sie auf den <strong>Toggle „Work / Web"</strong> oben im Chat. Sehen Sie diesen Schalter, haben Sie <strong>Copilot Paid</strong></li>
                        <li>Stellen Sie die Frage: <em>„Welche Termine habe ich heute?"</em></li>
                        <li>Erhalten Sie Ihre <strong>echten Kalender-Termine</strong> als Antwort → <Badge className="bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100 text-[11px] px-2 py-0.5">Copilot Paid</Badge></li>
                        <li>Kommt <strong>keine Kalender-Antwort</strong> oder nur eine Web-Suche → <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100 text-[11px] px-2 py-0.5">Copilot Free</Badge></li>
                      </ol>
                      <button
                        onClick={() => setShowTierHelp(false)}
                        className="mt-3 text-xs text-primary hover:underline"
                      >
                        Schließen
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tier Filter */}
            <div className="flex justify-center mb-10">
              <div className="inline-flex items-center gap-1 p-1 bg-muted/60 rounded-lg border">
                {tierFilterOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setTierFilter(option.value)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      tierFilter === option.value
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Training Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredModules.map((module, index) => (
                <Card
                  key={module.title}
                  className="group hover:shadow-2xl transition-all duration-500 border-2 hover:border-primary/50 animate-fade-in relative bg-card/50 backdrop-blur-sm h-[180px] flex flex-col overflow-visible hover:z-40"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Kompakte Ansicht - immer sichtbar */}
                  <CardHeader className="relative z-10 flex-1 py-4">
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {module.tiers.includes("free") && (
                        <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100 text-[11px] px-2 py-0.5">
                          Copilot Free
                        </Badge>
                      )}
                      {module.tiers.includes("paid") && (
                        <Badge className="bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100 text-[11px] px-2 py-0.5">
                          Copilot Paid
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300 line-clamp-2">{module.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-2">
                      <Clock className="w-4 h-4" />
                      {module.duration}
                    </CardDescription>
                  </CardHeader>

                  {/* Hover-Overlay mit Details - zentriert auf Screen */}
                  <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[700px] max-h-[85vh] overflow-y-auto z-[100] bg-card border-2 border-primary rounded-xl p-6 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-primary pr-4">{module.title}</h3>
                      <span className="text-sm text-muted-foreground whitespace-nowrap flex items-center gap-1 mt-1 bg-muted px-2 py-1 rounded">
                        <Clock className="w-4 h-4" />
                        {module.duration}
                      </span>
                    </div>
                    <p className="text-base text-muted-foreground mb-5">{module.description}</p>
                    <div className="mb-5">
                      <h4 className="text-base font-semibold mb-3">Inhalte & Lernziele:</h4>
                      <ul className="space-y-2 columns-1 md:columns-2 gap-6">
                        {module.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm break-inside-avoid mb-2">
                            <span className="text-primary mt-0.5 flex-shrink-0">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={scrollToContact}
                    >
                      Training anfragen
                    </Button>
                  </div>
                  {/* Backdrop für bessere Sichtbarkeit */}
                  <div className="fixed inset-0 bg-black/40 z-[99] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 pointer-events-none" />

                  {/* SEO: Versteckte Details für Suchmaschinen und LLMs */}
                  <div className="sr-only" aria-hidden="false">
                    <h3>{module.title}</h3>
                    <p>{module.description}</p>
                    <h4>Inhalte und Lernziele:</h4>
                    <ul>
                      {module.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>

            {/* Modularer Konfigurator CTA */}
            <div className="mt-12 relative max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-xl blur-xl" />
              <div className="relative bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-2 border-primary/30 rounded-xl p-6 md:p-8 text-center">
                <h3 className="text-xl md:text-2xl font-bold mb-3">
                  Ihr Training, Ihre Module – individuell zusammengestellt
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                  Kein passendes Training gefunden? Bei der Copilotenschule können Sie Ihr Training aus einzelnen Modulen
                  selbst zusammenstellen – exakt auf die Bedürfnisse Ihres Teams zugeschnitten.
                </p>
                <Link to="/training-konfigurator">
                  <Button size="default" className="group">
                    Module individuell zusammenstellen
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default UnsereAngebote;

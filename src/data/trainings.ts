import { Brain, Users, TrendingUp, Shield, Clock, Laptop, Zap, Scale, Lightbulb, Mic, GraduationCap, PartyPopper, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type CopilotTier = "free" | "paid";

export interface Training {
  slug: string;
  icon: LucideIcon;
  title: string;
  duration: string;
  description: string;
  features: string[];
  tiers: CopilotTier[];
  // SEO-Felder
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

// Alle Trainingsmodule mit SEO-optimierten Slugs
export const trainings: Training[] = [
  {
    slug: "copilot-grundlagen-prompt-design",
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
    tiers: ["free"],
    metaTitle: "Copilot Grundlagen Training – Prompt Design & KI-Kompetenz | copilotenschule.de",
    metaDescription: "Lernen Sie effektives Prompt Engineering für Microsoft Copilot. Einsteiger-Training für KI-Assistenten: Prompts formulieren, Outputs bewerten, produktiv arbeiten.",
    keywords: ["Copilot Grundlagen", "Prompt Engineering Training", "KI-Kompetenz Schulung", "Microsoft Copilot Einsteiger", "Prompt Design lernen"]
  },
  {
    slug: "microsoft-365-copilot-praxis",
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
    tiers: ["paid"],
    metaTitle: "Microsoft 365 Copilot Training – Word, Excel, PowerPoint, Outlook, Teams | copilotenschule.de",
    metaDescription: "Praxistraining für Microsoft 365 Copilot: Lernen Sie Copilot in Word, Excel, PowerPoint, Outlook und Teams produktiv einzusetzen. Mit echten Workflows.",
    keywords: ["Microsoft 365 Copilot Training", "Copilot Word Excel", "Office Copilot Schulung", "Copilot PowerPoint", "Copilot Outlook Teams"]
  },
  {
    slug: "ausbildung-ki-wissensarbeiter",
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
    tiers: ["paid"],
    metaTitle: "Ausbildung KI-Wissensarbeiter – Intensivtraining Microsoft Copilot | copilotenschule.de",
    metaDescription: "2-tägige Intensiv-Ausbildung zum KI-unterstützten Wissensarbeiter. Von Grundlagen bis Expertenniveau: 20+ Übungen, alle M365 Apps, Zertifikat.",
    keywords: ["KI Ausbildung", "Wissensarbeiter Training", "Copilot Intensivkurs", "KI-Kompetenz Zertifikat", "Microsoft Copilot Ausbildung"]
  },
  {
    slug: "github-copilot-entwickler",
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
    tiers: ["free", "paid"],
    metaTitle: "GitHub Copilot Training für Entwickler – Coding-Produktivität steigern | copilotenschule.de",
    metaDescription: "Hands-on GitHub Copilot Training: Code generieren, testen, debuggen und dokumentieren. Für Entwickler-Teams. Mit VS Code, JetBrains, CI/CD-Integration.",
    keywords: ["GitHub Copilot Training", "Entwickler Schulung", "AI Coding", "Copilot VS Code", "GitHub Copilot Unternehmen"]
  },
  {
    slug: "copilot-compliance-datenschutz",
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
    tiers: ["free", "paid"],
    metaTitle: "Copilot Compliance Training – DSGVO & EU AI Act | copilotenschule.de",
    metaDescription: "Rechtssichere KI-Nutzung mit Microsoft Copilot: DSGVO-Compliance, EU AI Act, Datenschutz-Assessment. Mit Checklisten und Templates.",
    keywords: ["Copilot DSGVO", "KI Compliance Training", "EU AI Act Schulung", "Copilot Datenschutz", "rechtssichere KI-Nutzung"]
  },
  {
    slug: "copilot-strategie-change-management",
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
    tiers: ["free", "paid"],
    metaTitle: "Copilot Strategie Workshop – Rollout & Change Management | copilotenschule.de",
    metaDescription: "Strategischer Copilot-Workshop: ROI berechnen, Rollout planen, Change Management gestalten. Für erfolgreiche Microsoft Copilot Einführung.",
    keywords: ["Copilot Strategie", "Copilot Rollout", "Change Management KI", "Copilot ROI", "Copilot Einführung Unternehmen"]
  },
  {
    slug: "copilot-studio-ki-agenten",
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
    tiers: ["paid"],
    metaTitle: "Copilot Studio Training – KI-Agenten entwickeln | copilotenschule.de",
    metaDescription: "Entwickeln Sie KI-Agenten mit Microsoft Copilot Studio: Custom Agents, Teams-Integration, Power Automate. Praxis-Training für Unternehmen.",
    keywords: ["Copilot Studio Training", "KI-Agenten entwickeln", "Microsoft Copilot Agents", "Copilot Automatisierung", "Custom Copilot"]
  },
  {
    slug: "chatbot-workshop",
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
    tiers: ["paid"],
    metaTitle: "Chatbot-Workshop – KI-Assistenten entwickeln mit Copilot Studio | copilotenschule.de",
    metaDescription: "Hands-on Chatbot-Workshop: Entwickeln Sie Ihren ersten Unternehmens-Chatbot mit Microsoft Copilot Studio. Am Ende: fertiger Bot in Teams.",
    keywords: ["Chatbot Workshop", "Copilot Studio Chatbot", "KI-Assistent entwickeln", "Unternehmens-Chatbot", "Teams Bot erstellen"]
  },
  {
    slug: "low-code-power-platform",
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
    tiers: ["paid"],
    metaTitle: "Low-Code Training – Power Platform mit Copilot | copilotenschule.de",
    metaDescription: "Low-Code Entwicklung mit Microsoft Power Platform und Copilot: Power Apps, Power Automate, Dataverse. Training für Citizen Developer.",
    keywords: ["Low-Code Training", "Power Platform Schulung", "Citizen Developer", "Power Apps Copilot", "Power Automate Training"]
  },
  {
    slug: "eu-ai-act-pflichtschulung",
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
    tiers: ["free", "paid"],
    metaTitle: "EU AI Act Pflichtschulung – Artikel 4 KI-Kompetenz | copilotenschule.de",
    metaDescription: "EU AI Act Pflichtschulung nach Artikel 4: KI-Kompetenz, Risikobewusstsein, Compliance. Mit Schulungszertifikat für Audits.",
    keywords: ["EU AI Act Schulung", "Artikel 4 KI-Kompetenz", "KI Pflichtschulung", "AI Act Training", "KI Compliance Zertifikat"]
  },
  {
    slug: "copilot-hackathon",
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
    tiers: ["free", "paid"],
    metaTitle: "Copilot Hackathon – Innovation ohne Code | copilotenschule.de",
    metaDescription: "Copilot Hackathon für Business-Anwender: Kreative KI-Lösungen entwickeln ohne Programmierkenntnisse. Team-Event mit Pitch und Preisen.",
    keywords: ["Copilot Hackathon", "KI Innovation Workshop", "Business Hackathon", "Copilot Team Event", "KI ohne Code"]
  },
  {
    slug: "keynote-copilot-arbeitswelt",
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
    tiers: ["free", "paid"],
    metaTitle: "Copilot Keynote – KI-Vortrag für Führungskräfte | copilotenschule.de",
    metaDescription: "Inspirierende Keynote zu Microsoft Copilot: Vision, Live-Demos, Praxisbeispiele. Für All-Hands, Kick-offs und Führungskräfte-Events.",
    keywords: ["Copilot Keynote", "KI Vortrag", "Copilot Führungskräfte", "KI Transformation", "Microsoft Copilot Speaker"]
  },
  {
    slug: "copilot-lernreise-8-wochen",
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
    tiers: ["paid"],
    metaTitle: "Copilot Lernreise – 8 Wochen Kompetenzaufbau | copilotenschule.de",
    metaDescription: "Nachhaltige Copilot-Lernreise: 8 Wochen, 8 Sessions, 8 Use Cases. Schrittweiser Kompetenzaufbau für Teams mit Praxisaufgaben.",
    keywords: ["Copilot Lernreise", "Copilot 8 Wochen", "nachhaltiges KI-Training", "Copilot Blended Learning", "Copilot Kompetenzaufbau"]
  },
  {
    slug: "copilot-launch-eventtag",
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
    tiers: ["free", "paid"],
    metaTitle: "Copilot Launch Event – Kick-off für Ihre KI-Einführung | copilotenschule.de",
    metaDescription: "Copilot-Launch als Highlight: Eventtag mit Live-Demos, Challenges, Gamification. Perfekter Kick-off für die Copilot-Einführung.",
    keywords: ["Copilot Launch Event", "KI Kick-off", "Copilot Einführung Event", "Copilot Gamification", "KI Eventtag"]
  },
  {
    slug: "individuelle-copilot-schulung",
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
    tiers: ["free", "paid"],
    metaTitle: "Individuelle Copilot-Schulung – Maßgeschneidert für Ihr Unternehmen | copilotenschule.de",
    metaDescription: "Maßgeschneiderte Copilot-Trainings für Ihre Branche und Abteilung. Mit echten Unternehmensdaten, individuellen Use Cases, flexibler Durchführung.",
    keywords: ["individuelle Copilot Schulung", "maßgeschneidertes KI-Training", "Copilot Inhouse", "branchenspezifisches Copilot Training", "Copilot nach Maß"]
  }
];

// Hilfsfunktion: Training nach Slug finden
export function getTrainingBySlug(slug: string): Training | undefined {
  return trainings.find(t => t.slug === slug);
}

// Hilfsfunktion: Alle Slugs für statische Generierung
export function getAllTrainingSlugs(): string[] {
  return trainings.map(t => t.slug);
}

import { Brain, Users, TrendingUp, Shield, Clock, Laptop, Zap, Scale, Lightbulb, Mic, GraduationCap, PartyPopper, Wrench, Megaphone, Rocket, Calendar, Sparkles, Gauge } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Workshop-Typ: differenziert die Art der Veranstaltung für Schema.org und UI
export type WorkshopType = "workshop" | "keynote" | "event" | "change-program";

export interface WorkshopFAQ {
  question: string;
  answer: string;
}

export interface Workshop {
  // Kern-Identität
  slug: string;
  type: WorkshopType;
  icon: LucideIcon;
  title: string;
  subtitle?: string; // kurzer Claim unter dem H1

  // Typische Spannen (generisch, keine Preise)
  duration: string;          // z.B. "1-2 Tage"
  participants?: string;     // z.B. "8-30 Teilnehmende"
  format?: string;           // z.B. "Vor Ort | Remote | Hybrid"

  // Inhalt & Struktur
  description: string;       // prägnante Beschreibung für Listen- und Detailseite
  questionLead: string;      // LLM-Frage als Teaser (GEO)
  framework?: {
    name: string;            // Name der Methodik (z.B. "5-Phasen-Change-Roadmap")
    steps: string[];         // klar benannte Schritte – macht den Workshop zitierbar
  };
  features: string[];        // Inhalte / Agenda
  targetAudience: string[];  // Wer profitiert
  learningOutcomes: string[];// Was Teilnehmende mitnehmen
  businessImpact: string[];  // Erwartbare Wirkung im Unternehmen
  deliverables?: string[];   // Was gibt es schwarz auf weiß am Ende?

  // Cross-Linking (zu Trainings und verwandten Workshops)
  relatedTrainings?: string[];   // slugs aus trainings.ts
  relatedWorkshops?: string[];   // slugs aus workshops.ts

  // SEO & GEO
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  faqs: WorkshopFAQ[];

  // UI
  popular?: boolean;
  featured?: boolean;        // auf Landingpage oben hervorgehoben
}

export const workshops: Workshop[] = [
  // -----------------------------------------------------------------
  // 1) CHANGE PROGRAMM COPILOT EINFÜHRUNG  (NEU)
  // -----------------------------------------------------------------
  {
    slug: "copilot-change-programm",
    type: "change-program",
    icon: Rocket,
    title: "Change Programm Copilot Einführung",
    subtitle: "Das komplette Programm für eine erfolgreiche Microsoft Copilot Einführung – von der Strategie bis zum gelebten Alltag.",
    duration: "Individuell nach Reifegrad (typisch 3-9 Monate)",
    participants: "Gesamte Organisation, Rollouts in Wellen von 50-500 Personen",
    format: "Hybrid: Strategie-Workshops + Launch-Events + Kommunikation + Schulungsbegleitung",
    description: "Ein ganzheitliches Change-Programm begleitet Ihre Copilot-Einführung vom ersten Strategie-Workshop bis zum gelebten KI-Alltag. Enthalten sind Launch-Events, Handouts, Poster, Desktop-Drop-Materialien, Intranet-Content, Texte für die interne Change-Kommunikation und die Begleitung durch Ihre erste Adoption-Welle. Zuschnitt und Tempo richten sich nach Ihrem Reifegrad – vom pragmatischen Quick-Launch bis zum 9-monatigen Konzern-Rollout.",
    questionLead: "Wie setzen wir eine Microsoft-Copilot-Einführung nicht nur technisch, sondern auch kulturell und kommunikativ erfolgreich um?",
    framework: {
      name: "6-Bausteine-Change-Programm der Copilotenschule",
      steps: [
        "Reifegrad-Check: Wo steht Ihre Organisation heute? Lizenzen, Use Cases, Befähigung, Governance, Führung",
        "Strategie & Storyline: Vision, Narrativ und Change-Story – warum Copilot, warum jetzt, was ändert sich?",
        "Launch-Produktion: Eventformate, Poster, Roll-ups, Desktop-Drops, Cheat Sheets, Intranet-Seiten, Newsletter",
        "Kommunikations-Welle: Vorab-Teaser, Launch-Week, Erfolgsgeschichten, Führungskräfte-Briefings, FAQ-Updates",
        "Enablement-Infrastruktur: Champions-Programm, Prompt-Bibliothek, Office Hours, Wissensplattform, Feedback-Loops",
        "Wirkungsmessung: Nutzungs-KPIs, Adoption-Wellen, Qualitätsfeedback, Iterations-Plan für die nächsten 3 Monate",
      ],
    },
    features: [
      "Reifegrad-Assessment: Wo steht Ihre Organisation – und was ist der realistische Startpunkt?",
      "Change-Story und Narrativ: Ein klares 'Warum' pro Zielgruppe (Management, Fachbereiche, Betriebsrat, IT)",
      "Launch-Kit komplett: Poster-Serie, Roll-ups, Desktop-Drop-Materialien, Teams-Hintergründe, Mail-Signaturen",
      "Intranet-Content: Fertige Seitenstruktur inkl. Launch-Seite, FAQ, Use-Case-Bibliothek, Erfolgsgeschichten",
      "Change-Kommunikation: Textbausteine für Führungskräfte-Briefings, All-Hands, Intranet-News und E-Mails",
      "Event-Orchestrierung: Kick-off-Keynote, Launch-Event, Champions-Programm, Office Hours, Follow-up-Serie",
      "Champions-Programm: Auswahl, Briefing, Enablement, Communities und Anerkennungsformate",
      "Handouts und Cheat Sheets: Quick-Start-Guides pro Rolle (Vertrieb, HR, Finance, IT, Führungskräfte)",
      "Adoption-Welle begleitet: 30/60/90-Tage-Plan, Wirkungsmessung, Nachsteuerung, Reporting an die Geschäftsführung",
    ],
    targetAudience: [
      "Geschäftsführungen, die Copilot nicht nur einführen, sondern erfolgreich im Alltag verankern wollen",
      "Change Manager und interne Kommunikation, die einen professionellen, sichtbaren Rollout gestalten sollen",
      "HR- und L&D-Leitungen, die Enablement, Champions und Lernreisen zu einem Gesamt-Programm verzahnen müssen",
      "CIOs und IT-Projektleiter, die neben der technischen Einführung die kulturelle Seite nicht dem Zufall überlassen wollen",
      "Konzern-Programmleitungen mit mehreren Wellen, Ländern oder Gesellschaften, die ein skalierbares Framework brauchen",
    ],
    learningOutcomes: [
      "Sie haben eine klare, belastbare Change-Story und eine Rollout-Roadmap mit definierten Wellen und KPIs",
      "Sie verfügen über ein komplettes Launch-Kit: Eventformate, Print- und Digital-Materialien, Intranet-Content",
      "Ihre Führungskräfte und Champions sind befähigt, die Copilot-Einführung aktiv zu tragen und nach innen zu erklären",
      "Sie messen Adoption, Qualität und Wirkung – und steuern die nächsten Wellen datenbasiert statt aus dem Bauch",
    ],
    businessImpact: [
      "Die Nutzungsrate nach 90 Tagen liegt erfahrungsgemäß deutlich über Rollouts ohne begleitendes Change-Programm",
      "Widerstände werden früh adressiert, bevor sie in Betriebsrat, Mittelmanagement oder IT eskalieren",
      "Führungskräfte haben eine gemeinsame Sprache für Copilot und treiben die Adoption in ihren Bereichen aktiv voran",
      "Die Investition in Copilot-Lizenzen zahlt sich messbar aus, weil produktive Nutzung systematisch erzeugt wird",
    ],
    deliverables: [
      "Reifegrad-Report mit konkreten Handlungsfeldern und Prioritäten",
      "Change-Story-Dokument (inkl. Kernbotschaften pro Zielgruppe)",
      "Rollout-Roadmap mit Wellen, Verantwortlichkeiten, KPIs und Meilensteinen",
      "Launch-Kit (Poster, Roll-ups, Desktop-Drops, Teams-Hintergründe, Cheat Sheets)",
      "Intranet-Seitenstruktur inkl. Textbausteine und FAQ-Sammlung",
      "Kommunikations-Welle (E-Mails, All-Hands-Scripts, Führungskräfte-Briefings, Newsletter-Bausteine)",
      "Champions-Playbook (Auswahl, Onboarding, Aktivitäten, Anerkennung)",
      "KPI- und Adoption-Dashboard-Vorlage",
    ],
    relatedTrainings: [
      "copilot-grundlagen-prompt-design",
      "microsoft-365-copilot-praxis",
      "ausbildung-ki-wissensarbeiter",
      "copilot-lernreise-8-wochen",
    ],
    relatedWorkshops: [
      "copilot-strategie-change-management",
      "copilot-launch-eventtag",
      "keynote-copilot-arbeitswelt",
    ],
    metaTitle: "Change Programm Copilot Einführung – Rollout, Kommunikation & Adoption | copilotenschule.de",
    metaDescription: "Komplettes Change-Programm für die Microsoft Copilot Einführung: Strategie, Launch-Events, Handouts, Poster, Intranet-Content, Change-Kommunikation und Adoption-Begleitung.",
    keywords: [
      "Copilot Change Programm",
      "Copilot Einführung begleiten",
      "Microsoft Copilot Rollout",
      "Change Management Copilot",
      "Copilot Launch Kampagne",
      "Copilot Adoption",
      "Copilot interne Kommunikation",
    ],
    popular: true,
    featured: true,
    faqs: [
      {
        question: "Wir haben Lizenzen, aber die Nutzung bleibt unter den Erwartungen – wie kommen wir aus diesem Muster heraus?",
        answer: "Lizenzen allein erzeugen keine Nutzung. In fast allen Fällen fehlt eine Kombination aus klarer Change-Story, sichtbarem Launch, Champions, Quick-Start-Materialien und einer Welle laufender Kommunikation. Ein Change-Programm orchestriert genau diese Bausteine – vom ersten Reifegrad-Check über den Launch bis zur 90-Tage-Begleitung. Die Copilotenschule begleitet Sie dabei in jeder Phase und liefert Materialien, die sonst Monate intern produziert werden müssten.",
      },
      {
        question: "Was genau bekommen wir in einem Change-Programm – im Unterschied zu einer Schulung?",
        answer: "Ein Change-Programm geht weit über Schulung hinaus: Strategie-Workshop, Rollout-Roadmap, Eventformate, Poster- und Print-Materialien, Desktop-Drops, Intranet-Seiten, Textbausteine für die interne Kommunikation, ein Champions-Playbook und die Messung von Adoption und Wirkung. Schulungen trainieren einzelne Personen – ein Change-Programm verändert die Art, wie Ihre Organisation mit KI arbeitet.",
      },
      {
        question: "Wie lange dauert so ein Programm realistisch?",
        answer: "Das hängt vom Reifegrad und der Organisationsgröße ab. Pragmatische Mittelstands-Rollouts starten oft mit einem 3-Monats-Paket (Strategie, Launch, Welle 1). Konzern-Programme mit mehreren Gesellschaften, Ländern und Betriebsräten laufen typischerweise 6-9 Monate. Entscheidend ist nicht die Dauer, sondern dass Strategie, Launch und Enablement konsequent verzahnt sind – ein einmaliger Launch ohne Follow-up bleibt wirkungslos.",
      },
      {
        question: "Müssen wir unsere interne Kommunikation selbst schreiben oder kommen die Texte fertig?",
        answer: "Sie bekommen editierbare Textbausteine – für Führungskräfte-Briefings, All-Hands-Scripts, Intranet-News, E-Mail-Vorlagen und FAQ-Einträge. Diese sind inhaltlich fundiert und mit erprobten Narrativen aufgebaut, müssen aber auf Ihre Unternehmenssprache und konkreten Umstände angepasst werden. Das ist auch gewollt: Ein Change-Programm soll authentisch klingen, nicht aus der Schublade.",
      },
      {
        question: "Wie stellen Sie sicher, dass das Programm zu unserer Kultur und Branche passt?",
        answer: "Das Programm startet immer mit einem Reifegrad-Check und Kulturgesprächen mit Ihren Schlüsselrollen. Aus diesen Erkenntnissen leiten wir ab, welche Elemente bei Ihnen wirken (Gamification vs. Seriosität, Top-down vs. Champions-getrieben, Tempo der Wellen). Die Materialien werden anschließend im Corporate Design Ihres Hauses produziert. Kein Programm gleicht dem anderen – das Framework ist identisch, die Umsetzung individuell.",
      },
      {
        question: "Wie wird der Erfolg eines Change-Programms gemessen?",
        answer: "Kombination aus harten und weichen KPIs: Nutzungsquote (aktive Nutzer pro Woche), Nutzungstiefe (Anzahl und Art der Interaktionen), Zufriedenheit (Pulse-Befragungen), Qualitätsfeedback (konkrete Use Cases, die produktiver laufen) und Wirkungsmessung in ausgewählten Prozessen (z.B. Zeitersparnis, Durchlaufzeiten). Das Reporting wird typischerweise monatlich an Lenkungsausschuss und Geschäftsführung gespielt.",
      },
    ],
  },

  // -----------------------------------------------------------------
  // 2) STRATEGIE & CHANGE MANAGEMENT WORKSHOP
  // -----------------------------------------------------------------
  {
    slug: "copilot-strategie-change-management",
    type: "workshop",
    icon: TrendingUp,
    title: "Copilot Strategie & Change Management Workshop",
    subtitle: "Vom Pilotprojekt zum flächendeckenden Erfolg: Strategie, Rollout-Roadmap und Change-Plan an einem Tag.",
    duration: "1 Tag (7 Stunden) | optional 1,5 Tage mit Business-Case-Vertiefung",
    participants: "8-16 Teilnehmende (Entscheidungsgremium + Projektteam)",
    format: "Vor Ort oder Remote, moderierter Arbeits-Workshop mit Canvas-Arbeit",
    description: "Strategischer Workshop zur erfolgreichen Einführung und Skalierung von Microsoft Copilot. In einem intensiven Tag entwickeln Sie Ihre Copilot-Strategie, priorisieren High-Impact-Use-Cases, bauen einen belastbaren Business Case auf und erstellen einen phasenweisen Rollout- und Change-Plan. Ergebnis: ein umsetzungsreifes Strategie-Paket, das Sie direkt dem Management vorstellen können.",
    questionLead: "Wie führe ich Microsoft Copilot strategisch erfolgreich ein – und wie überzeuge ich Vorstand und Betriebsrat mit Zahlen?",
    features: [
      "Prozessanalyse und Potenzialidentifikation: Wo generiert Copilot den größten Mehrwert in Ihrer Organisation?",
      "Use-Case-Portfolio aufbauen: 15-25 Use Cases identifizieren, nach Impact und Reife priorisieren",
      "Business Case quantifizieren: Zeitersparnis, Qualitätsgewinn und Produktivität in Zahlen übersetzen",
      "Phasenweiser Rollout-Plan: Pilot-Gruppen, Erfolgskriterien, Skalierungs-Wellen",
      "Governance Framework: Policies, Verantwortlichkeiten, Eskalationspfade, Datenschutz-Weichen",
      "Change-Management-Canvas: Stakeholder-Landkarte, Widerstandsmuster, Kommunikationsplan",
      "Success Metrics: KPIs für Nutzung, Qualität, Zufriedenheit und Geschäftswirkung",
      "Ergebnis-Paket: Foliensatz für die Geschäftsführung inklusive Zahlen und Entscheidungsvorlage",
    ],
    targetAudience: [
      "Vorstände und CIOs, die eine datenbasierte Copilot-Strategie für die Vorstandsentscheidung brauchen",
      "Change-Manager, die den kulturellen Wandel bei der KI-Einführung professionell begleiten sollen",
      "Projektleiter, die den Copilot-Rollout steuern und einen konkreten Implementierungsplan benötigen",
      "HR- und L&D-Verantwortliche, die Trainings, Champions und Adoption-Maßnahmen orchestrieren müssen",
    ],
    learningOutcomes: [
      "Sie haben einen priorisierten Use-Case-Katalog mit klaren Impact- und Umsetzungsscores",
      "Sie besitzen einen quantifizierten Business Case für Ihren Copilot-Rollout – Management-tauglich",
      "Sie verfügen über eine phasenweise Rollout-Roadmap mit Pilot-Welle, Skalierung und KPIs",
      "Sie haben einen Change-Plan, der Kommunikation, Schulung und Widerstandsmanagement abdeckt",
    ],
    businessImpact: [
      "Die Erfolgswahrscheinlichkeit steigt deutlich, weil der Rollout nicht auf Bauchgefühl basiert, sondern auf Daten",
      "Das Management erhält einen belastbaren Business Case – die Entscheidung für Copilot wird fundiert begründet",
      "Widerstände werden frühzeitig erkannt und adressiert, bevor sie den Rollout blockieren",
      "Messbarer ROI durch systematische Erfolgsmessung statt Einführung ins Blaue",
    ],
    deliverables: [
      "Priorisierter Use-Case-Katalog (Impact-Matrix mit 15-25 Kandidaten)",
      "Business-Case-Modell (Excel) mit Parametern und Szenarien",
      "Rollout-Roadmap (Welle 1-3, KPIs, Meilensteine)",
      "Governance-Framework (Policies, Rollen, Eskalationspfade)",
      "Change-Management-Canvas (Stakeholder, Risiken, Kommunikation)",
      "Executive-Foliensatz für die Entscheidungsvorlage",
    ],
    relatedTrainings: [
      "copilot-grundlagen-prompt-design",
      "microsoft-365-copilot-praxis",
      "copilot-compliance-datenschutz",
    ],
    relatedWorkshops: [
      "copilot-change-programm",
      "keynote-copilot-arbeitswelt",
      "copilot-launch-eventtag",
    ],
    metaTitle: "Copilot Strategie Workshop – Rollout & Change Management | copilotenschule.de",
    metaDescription: "Strategischer Copilot-Workshop: ROI berechnen, Rollout priorisieren, Change Management gestalten. Ergebnis: umsetzungsreifes Strategie-Paket für Ihre Geschäftsführung.",
    keywords: [
      "Copilot Strategie",
      "Copilot Rollout Workshop",
      "Change Management KI",
      "Copilot ROI",
      "Copilot Einführung Unternehmen",
      "Copilot Business Case",
    ],
    popular: true,
    faqs: [
      {
        question: "Wir haben schon einen Piloten laufen – bringt der Workshop dann noch etwas?",
        answer: "Gerade dann ist der Workshop wertvoll. Der häufigste Fehler nach erfolgreichen Piloten ist, ohne systematische Skalierung einfach 'mehr Lizenzen' zu rollen. Im Workshop übersetzen wir Ihre Pilot-Erkenntnisse in eine belastbare Skalierungs-Roadmap: Welche Use Cases tragen in die Fläche? Welche Governance wird jetzt notwendig? Welche Change-Muster haben sich gezeigt? Das schützt vor teuren Skalierungs-Irrtümern.",
      },
      {
        question: "Wie berechnen wir einen seriösen ROI, wenn Produktivitätsgewinne so schwer zu messen sind?",
        answer: "Seriöse ROI-Modelle arbeiten mit drei Hebeln: messbare Zeitersparnis in definierten Prozessen (z.B. Ausschreibungen, Angebots-Erstellung, Protokolle), vermiedene Qualitätsfehler und strategischer Wert (Entscheidungsgeschwindigkeit, Innovation). Wir arbeiten mit Spannen statt mit Schein-Präzision – das überzeugt Finanzchefs mehr als überoptimistische Punktwerte. Die Copilotenschule stellt ein erprobtes ROI-Modell bereit, das Sie im Workshop auf Ihre Zahlen anwenden.",
      },
      {
        question: "Was sind die häufigsten Fehler bei der Copilot-Einführung – und wie vermeiden wir sie?",
        answer: "Die wiederkehrenden Muster: Lizenzen vor Use Cases kaufen, keine Priorisierung, kein Change-Plan, kein Champions-Netzwerk, keine Wirkungsmessung und Betriebsrat zu spät einbinden. Jeder dieser Fehler ist vermeidbar, wenn die Einführung als Programm verstanden wird – nicht als Einkaufsvorgang. Der Workshop adressiert alle sechs Muster explizit.",
      },
      {
        question: "Können wir den Workshop mit der konkreten Einführung verzahnen?",
        answer: "Ja – genau dafür ist er gedacht. Viele Organisationen buchen den Strategie-Workshop als Startpunkt ihres Change-Programms. Das Ergebnis-Paket (Use-Case-Katalog, Business Case, Roadmap, Change-Plan) ist die Grundlage für alles, was danach kommt: Launch-Event, Champions-Programm, Lernreisen, Kommunikation. Mehr dazu im Change Programm Copilot Einführung.",
      },
    ],
  },

  // -----------------------------------------------------------------
  // 3) CHATBOT-WORKSHOP
  // -----------------------------------------------------------------
  {
    slug: "chatbot-workshop",
    type: "workshop",
    icon: Sparkles,
    title: "Chatbot-Workshop: Ihr erster KI-Assistent in einem Tag",
    subtitle: "Hands-on Tag: Konzept, Bau und Deployment eines eigenen Microsoft-Copilot-Studio-Agenten.",
    duration: "1 Tag (7 Stunden) | optional 2 Tage mit Daten-Integration und Qualitätssicherung",
    participants: "6-12 Teilnehmende pro Workshop (typisch ein Fachbereichs-Team)",
    format: "Hands-on Build-Workshop – vor Ort oder Remote mit geteilten Environments",
    description: "Sie lernen nicht in der Theorie, sondern bauen gemeinsam mit erfahrenen Trainern Ihren ersten funktionsfähigen Unternehmens-Chatbot mit Microsoft Copilot Studio. Am Ende des Tages läuft Ihr Bot in Microsoft Teams, greift auf Ihre internen Wissensquellen zu und ist für die Produktivnutzung vorbereitet. Der Fokus liegt konsequent auf Umsetzung – kein Konzeptpapier, sondern ein lauffähiges System.",
    questionLead: "Kann mein Team an einem einzigen Tag einen produktiv nutzbaren KI-Chatbot für unser Unternehmen bauen – auch ohne Programmierkenntnisse?",
    features: [
      "Copilot Studio Grundlagen: Plattform verstehen, Entwicklungsumgebung einrichten, erste Schritte",
      "Use-Case-Definition: Welcher konkrete Bot soll heute entstehen, welche Probleme löst er?",
      "Conversation-Flow-Design: Intents, Antworten, Eskalationspfade und Höflichkeits-Fallbacks",
      "Datenanbindung: SharePoint, FAQ-Dokumente, internes Wiki oder CRM als Wissensquelle",
      "Prompt Engineering für Agenten: Systemanweisungen, Kontextmanagement, Guardrails",
      "Testing und Qualitätssicherung: Edge Cases, Halluzinations-Prüfung, Eskalation zum Menschen",
      "Deployment in Microsoft Teams: Live ausrollen, Berechtigungen konfigurieren, Nutzergruppen steuern",
      "Übergabe-Paket: Dokumentation der Architektur und Wartungs-Anleitung für das Team",
    ],
    targetAudience: [
      "Fachabteilungen (HR, IT-Support, Kundenservice), die wiederkehrende Fragen automatisieren möchten",
      "Innovationsteams, die einen schnellen Proof of Concept für KI-Agenten erleben wollen",
      "Wissensmanager, die interne Dokumente und FAQs per Chatbot durchsuchbar machen wollen",
      "Entscheider, die Möglichkeiten und Grenzen von KI-Agenten am konkreten Beispiel erleben wollen",
    ],
    learningOutcomes: [
      "Am Ende des Tages läuft ein funktionsfähiger Bot in Microsoft Teams – kein Mock-up",
      "Sie beherrschen den kompletten Zyklus: Konzept, Bau, Datenanbindung, Qualitätssicherung, Deployment",
      "Sie können Ihren Bot selbstständig warten, erweitern und die Antwortqualität iterativ verbessern",
      "Sie wissen, welche Use Cases sich wirklich für Agenten eignen – und wo die Grenzen liegen",
    ],
    businessImpact: [
      "Sofortiger Proof of Concept statt monatelanger Konzeptphase – der Bot läuft am Abend",
      "Wiederkehrende Fragen (HR-Policies, IT-Anleitungen, Onboarding) werden automatisiert beantwortet",
      "Das Team entwickelt Ownership und kann eigenständig weiterentwickeln – keine externe Abhängigkeit",
      "Interne Dokumentation wird erstmals konsequent durchsuchbar und für alle nutzbar",
    ],
    deliverables: [
      "Lauffähiger Custom-Agent in Microsoft Copilot Studio, deployed in Teams",
      "Dokumentierter Conversation Flow und Prompt-Stack",
      "Datenanbindungs-Konfiguration (SharePoint / Wiki / FAQ)",
      "Wartungs-Anleitung und Erweiterungs-Leitfaden",
      "Qualitätssicherungs-Checkliste mit Edge-Case-Katalog",
    ],
    relatedTrainings: [
      "copilot-studio-ki-agenten",
      "low-code-power-platform",
      "microsoft-365-copilot-praxis",
    ],
    relatedWorkshops: [
      "copilot-hackathon",
      "copilot-change-programm",
    ],
    metaTitle: "Chatbot-Workshop – KI-Assistent in einem Tag bauen | copilotenschule.de",
    metaDescription: "Hands-on Chatbot-Workshop mit Microsoft Copilot Studio: eigener Unternehmens-Bot in einem Tag. Lauffähig in Teams, auf Ihre Datenquellen zugeschnitten.",
    keywords: [
      "Chatbot Workshop",
      "Copilot Studio Chatbot",
      "KI-Assistent entwickeln",
      "Unternehmens-Chatbot",
      "Teams Bot erstellen",
      "Copilot Agent Workshop",
    ],
    faqs: [
      {
        question: "Ist das realistisch – ein lauffähiger Chatbot an einem Tag?",
        answer: "Ja, mit klarer Vorbereitung: Use Case vorab geklärt, Datenquellen zugänglich, Environment vorbereitet. Der Workshop selbst ist darauf getrimmt, in Phasen zu arbeiten (Discovery, Design, Build, Deploy). Wir liefern nicht den Bot, der alle Fragen Ihres Unternehmens beantwortet – aber einen lauffähigen, produktiv nutzbaren Bot für einen klar umrissenen Use Case. Das ist realistisch und belastbar.",
      },
      {
        question: "Können wir einen FAQ-Bot bauen, der auf unsere internen Dokumente zugreift?",
        answer: "Ja, das ist der häufigste Use Case. Microsoft Copilot Studio verbindet sich mit SharePoint, internen Wikis oder FAQ-Ablagen. Wichtig: Je besser Ihre Dokumente strukturiert sind, desto präziser die Antworten. Im Workshop prüfen wir gemeinsam die Datenqualität und zeigen Stellschrauben, mit denen Sie die Antwort-Qualität zielgerichtet verbessern.",
      },
      {
        question: "Was brauchen wir nach dem Workshop, um den Bot weiterzuentwickeln?",
        answer: "Nach dem Workshop haben Sie: einen funktionierenden Bot, eine dokumentierte Architektur, Wartungs-Anleitung und Know-how für Erweiterungen. Die laufende Pflege ist Low-Code – Inhalte ergänzen, Edge Cases nachbessern, Fallbacks verfeinern. Für größere Erweiterungen (neue Datenquellen, Integrationen mit Power Automate) bauen Sie auf dem Workshop-Fundament auf oder buchen eine Follow-up-Session.",
      },
      {
        question: "Für welche Abteilungen lohnt sich ein Chatbot am meisten?",
        answer: "Die Wirkung ist dort am größten, wo viele wiederkehrende, halbwegs standardisierbare Fragen auftreten: HR (Urlaub, Benefits, Onboarding), IT-Support (First-Level, Standardprobleme), Kundenservice (FAQs, Produktinformationen) und Wissensmanagement (interne Richtlinien, Prozesse). Je höher das Frageaufkommen und je klarer die Antworten, desto größer der Nutzen.",
      },
    ],
  },

  // -----------------------------------------------------------------
  // 4) BETRIEBSRAT & KI WORKSHOP
  // -----------------------------------------------------------------
  {
    slug: "betriebsrat-ki-workshop",
    type: "workshop",
    icon: Scale,
    title: "Betriebsrat & KI: Workshop zur Copilot-Mitbestimmung",
    subtitle: "Von der Rechtsgrundlage bis zur Betriebsvereinbarung – an einem Tag, mit Option auf ein Intensiv-Training an Tag 2.",
    duration: "Ganztag (1 Tag) | Optional: 2. Tag Intensivtraining für den BR",
    participants: "Betriebsratsgremium (typisch 8-20 Personen) + optional HR/IT als Gast",
    format: "Classroom oder Live-Online, arbeitnehmerorientiert moderiert",
    description: "Der Workshop speziell für Betriebsräte und Personalvertretungen: Vormittags erarbeiten Sie rechtliche Grundlagen, Mitbestimmungsrechte, Betriebsvereinbarungs-Textbausteine und einen konkreten Maßnahmenplan. Nachmittags erleben Sie Microsoft Copilot live aus Sicht der Belegschaft – Übersetzung, Protokolle, Admin-Sicht. Optional buchbar: ein zweiter Tag als Hands-on-Training, damit das Gremium Copilot selbst für seine Arbeit nutzen lernt.",
    questionLead: "Unser Betriebsrat steht vor der Copilot-Einführung – wie gestalten wir den Prozess aktiv und verhandeln eine fundierte Betriebsvereinbarung?",
    features: [
      "Recht und Mitbestimmung: §87, §80, §90, §97 BetrVG, aktuelle Rechtsprechung und Sachverständigenrecht – verständlich für das Gremium",
      "Technik und Compliance verstehen: Copilot-Produkte, Purview, EU Data Boundary und EU AI Act auf einen Blick",
      "Betriebsvereinbarung erarbeiten: Muster-Textbausteine, Scope, Verhandlungsstrategie und Maßnahmenplan mit Zuständigkeiten und Fristen",
      "Copilot live aus BR-Sicht: Demo von Teams, Outlook und Word inklusive Übersetzung, Protokollen und Admin-Perspektive",
      "Paket zum Mitnehmen: BV-Textbausteine, ausgefüllte Checkliste, Maßnahmenplan und Schulungsunterlage",
      "Optionaler Tag 2 als Intensivtraining: Copilot praktisch für die BR-Arbeit nutzen – wahlweise mit kostenlosem oder lizenziertem Copilot",
    ],
    targetAudience: [
      "Betriebsratsgremien vor oder während einer Copilot-Einführung, die den Prozess aktiv mitgestalten wollen",
      "Betriebsratsvorsitzende, die eine fundierte Verhandlungsgrundlage für die Betriebsvereinbarung brauchen",
      "Gesamt- und Konzernbetriebsräte, die einheitliche Regelungen für mehrere Standorte erarbeiten",
      "Schwerbehindertenvertretungen und Jugend- und Auszubildendenvertretungen, die ihre Perspektive einbringen wollen",
      "Personalvertretungen im öffentlichen Dienst mit vergleichbarer Mitbestimmungssituation",
    ],
    learningOutcomes: [
      "Sie kennen Ihre konkreten Mitbestimmungsrechte bei der KI-Einführung und deren Grenzen (inkl. aktueller Rechtsprechung)",
      "Sie verstehen die technischen Grundlagen: Was sieht ein Admin, was regelt Purview, was sagt die EU Data Boundary?",
      "Sie haben eine auf Ihr Unternehmen zugeschnittene Checkliste und einen Maßnahmenplan erarbeitet",
      "Sie verfügen über Muster-Textbausteine für die Betriebsvereinbarung als Verhandlungsgrundlage",
      "Optional Tag 2: Der BR nutzt Copilot eigenständig – für Protokolle, BV-Entwürfe, Recherche, Kommunikation",
    ],
    businessImpact: [
      "Der Rollout wird nicht durch offene Mitbestimmungsfragen blockiert – der BR agiert als kompetenter Partner",
      "Die Betriebsvereinbarung entsteht auf Basis erprobter Textbausteine statt auf dem leeren Blatt – das spart Wochen",
      "BR-Mitglieder können gegenüber der Belegschaft kompetent auskunftsfähig sein und Bedenken adressieren",
      "Die Qualifizierung zählt nach §37 Abs. 6 BetrVG als erforderliche Schulung – Kosten trägt der Arbeitgeber",
    ],
    deliverables: [
      "Muster-Textbausteine für die Betriebsvereinbarung (editierbar)",
      "Ausgefüllte 14-Punkte-Checkliste zur Copilot-Einführung",
      "Maßnahmenplan mit Zuständigkeiten und Fristen",
      "Schulungsunterlage für die weitere Arbeit des Gremiums",
      "Optional Tag 2: persönliche Prompt-Bibliothek für BR-Arbeit",
    ],
    relatedTrainings: [
      "copilot-compliance-datenschutz",
      "eu-ai-act-pflichtschulung",
      "copilot-grundlagen-prompt-design",
    ],
    relatedWorkshops: [
      "copilot-strategie-change-management",
      "copilot-change-programm",
    ],
    metaTitle: "Betriebsrat & KI Workshop – Copilot-Mitbestimmung aktiv gestalten | copilotenschule.de",
    metaDescription: "Workshop für Betriebsräte: Mitbestimmung bei Copilot-Einführung, Betriebsvereinbarung, Praxis-Demo. Optional Tag 2 als Intensivtraining. Kosten trägt der Arbeitgeber (§37.6 BetrVG).",
    keywords: [
      "Betriebsrat KI Workshop",
      "Copilot Betriebsrat Schulung",
      "Betriebsvereinbarung Copilot",
      "KI Mitbestimmung Workshop",
      "Betriebsrat Copilot Training",
    ],
    popular: true,
    faqs: [
      {
        question: "Wer bezahlt die Schulung des Betriebsrats zur Copilot-Einführung?",
        answer: "Der Arbeitgeber. Nach §37 Abs. 6 BetrVG hat der Betriebsrat Anspruch auf Schulungen, die für seine Arbeit erforderlich sind. Bei der Einführung eines KI-Systems wie Microsoft 365 Copilot ist die Erforderlichkeit regelmäßig gegeben. Eine Begründungshilfe zum Herunterladen finden Sie auf unserer Wissensseite unter copilotenschule.de/wissen/copilot-betriebsrat.",
      },
      {
        question: "Wie ist der Tag aufgebaut – und was bringt der optionale zweite Tag?",
        answer: "Der erste Tag ist ganztägig: Vormittags Rechtslage, Mitbestimmungsrechte, Betriebsvereinbarung und Maßnahmenplan. Nachmittags erleben Sie Copilot live aus BR-Sicht: Teams, Outlook, Word, Übersetzung, Protokolle und Admin-Sicht. Der optionale zweite Tag ist ein Hands-on-Training, bei dem BR-Mitglieder Copilot selbst nutzen lernen – wahlweise mit dem kostenlosen Copilot (Prompt Engineering, Recherche, Textarbeit) oder der lizenzierten M365-Version (Protokolle, Outlook, Word-Entwürfe).",
      },
      {
        question: "Können wir den Workshop auch als Online-Training durchführen?",
        answer: "Ja, der Workshop funktioniert als Classroom-Training und als Live-Online-Training gleichermaßen. Bei der Online-Variante arbeiten wir mit Breakout-Sessions und geteilten Dokumenten, damit die gemeinsame Erarbeitung genauso intensiv wird wie im Seminarraum.",
      },
      {
        question: "Brauchen die Teilnehmenden bereits Copilot-Lizenzen?",
        answer: "Für Tag 1 nicht – der Nachmittagsblock funktioniert als moderierte Demo, die Teilnehmenden müssen Copilot nicht selbst bedienen. Für den optionalen zweiten Tag sind Lizenzen hilfreich, aber nicht zwingend: Wir arbeiten auch mit dem kostenlosen Microsoft Copilot und zeigen M365-Funktionen bei Bedarf per Demo. Der zweite Tag ist bewusst so aufgebaut, dass beide Varianten (kostenlos und lizenziert) tragen.",
      },
      {
        question: "Was bekommt das Gremium am Ende des Tages schwarz auf weiß mit?",
        answer: "Drei Dokumente: Muster-Textbausteine für die Betriebsvereinbarung, die auf Ihre Situation angepasst wurden. Eine ausgefüllte 14-Punkte-Checkliste zum Status Ihrer Copilot-Einführung. Einen Maßnahmenplan mit konkreten Schritten, Zuständigkeiten und Fristen. Plus eine Schulungsunterlage, die das Gremium auch in späteren Sitzungen nutzen kann.",
      },
    ],
  },

  // -----------------------------------------------------------------
  // 5) COPILOT HACKATHON
  // -----------------------------------------------------------------
  {
    slug: "copilot-hackathon",
    type: "workshop",
    icon: Lightbulb,
    title: "Copilot Hackathon für Nicht-Entwickler",
    subtitle: "Ein Tag, gemischte Teams, echte Business-Probleme – und am Ende konkrete Copilot-Lösungen.",
    duration: "1 Tag (7-8 Stunden) | optional 2 Tage mit Umsetzungsphase",
    participants: "20-80 Teilnehmende in Teams von 4-6 Personen",
    format: "Vor Ort (ideal) oder Remote mit virtuellen Breakout-Rooms",
    description: "Ein Innovations-Workshop im Hackathon-Format: Teams aus unterschiedlichen Abteilungen entwickeln in einem Tag Copilot-Lösungen für echte Geschäftsprobleme. Keine Programmierkenntnisse nötig – Neugier, Kreativität und der Wille, Arbeit neu zu denken, reichen. Am Ende stehen Pitches, Preise und eine Sammlung implementierbarer Use Cases für Ihren Arbeitsalltag.",
    questionLead: "Wie erzeuge ich in meinem Unternehmen Begeisterung und konkrete Ergebnisse für Microsoft Copilot – mit einem Event statt klassischer Schulung?",
    features: [
      "Hackathon-Format: Teambildung, Challenge-Briefing, intensive Build-Phase, Pitch vor Jury",
      "Cross-funktionale Teams: Verschiedene Abteilungen arbeiten zusammen an realen Problemen",
      "Use-Case-Ideation: Identifikation konkreter Geschäftsprobleme, die mit Copilot lösbar sind",
      "Rapid Prototyping mit Copilot: Prompt-Stacks, Automationen, Dokumenten-Vorlagen ohne Code",
      "Prompt-Engineering-Battle: Wer entwickelt die effektivsten Prompts für typische Business-Szenarien?",
      "Workflow-Automation-Challenge: Repetitive Aufgaben mit Copilot und Power Automate automatisieren",
      "Präsentation und Jury-Feedback: Teams pitchen ihre Lösungen, Experten-Jury gibt Rückmeldung",
      "Preise und Anerkennung: Beste Lösungen werden ausgezeichnet und in der Organisation sichtbar gemacht",
    ],
    targetAudience: [
      "HR- und L&D-Verantwortliche, die Teambuilding und KI-Kompetenzaufbau verbinden wollen",
      "Innovationsmanager, die kreative KI-Anwendungen aus den eigenen Fachabteilungen herausziehen möchten",
      "Change-Manager, die Begeisterung statt Widerstand bei der KI-Transformation erzeugen wollen",
      "Führungskräfte, die erleben wollen, was ihre Teams mit Copilot in kurzer Zeit leisten",
    ],
    learningOutcomes: [
      "Teams entwickeln kreative Copilot-Lösungen für reale Geschäftsprobleme – in wenigen Stunden",
      "Teilnehmende beherrschen Rapid Prototyping mit KI: schnell ausprobieren, iterieren, Ergebnisse zeigen",
      "Jedes Team erstellt funktionierende Prompt-Stacks und Workflows, die direkt nutzbar sind",
      "Die besten Lösungen werden dokumentiert und können in den Alltag übernommen werden",
    ],
    businessImpact: [
      "Identifikation der wertvollsten Use Cases – aus der Belegschaft, nicht aus der Theorie",
      "Berührungsängste sinken spürbar, weil Mitarbeitende eigene Erfolge erleben",
      "Teamdynamik und abteilungsübergreifende Zusammenarbeit werden durch das Wettbewerbsformat gestärkt",
      "Konkrete, implementierbare Ergebnisse statt nur Wissensvermittlung – der Nutzen ist sofort sichtbar",
    ],
    deliverables: [
      "Dokumentierte Use-Case-Sammlung aller Teams",
      "Beste Prompt-Stacks und Workflows als wiederverwendbare Templates",
      "Foto- und Video-Material für die interne Kommunikation",
      "Empfehlung: Welche Ideen sollten zeitnah umgesetzt werden?",
    ],
    relatedTrainings: [
      "copilot-grundlagen-prompt-design",
      "microsoft-365-copilot-praxis",
      "copilot-studio-ki-agenten",
    ],
    relatedWorkshops: [
      "chatbot-workshop",
      "copilot-launch-eventtag",
      "copilot-change-programm",
    ],
    metaTitle: "Copilot Hackathon – Innovation mit KI ohne Code | copilotenschule.de",
    metaDescription: "Copilot Hackathon für Business-Anwender: Kreative KI-Lösungen in Teams entwickeln – ohne Programmierkenntnisse. Team-Event mit Pitch, Preisen und konkreten Ergebnissen.",
    keywords: [
      "Copilot Hackathon",
      "KI Innovation Workshop",
      "Business Hackathon KI",
      "Copilot Team Event",
      "KI ohne Code",
      "Copilot Ideen Workshop",
    ],
    faqs: [
      {
        question: "Wie können wir unser Team spielerisch an KI heranführen – ohne trockene Schulungen?",
        answer: "Ein Hackathon-Format erzeugt genau das: Teams treten gegeneinander an, lösen reale Probleme mit Copilot, und am Ende werden die besten Lösungen gekürt. Das schafft Energie, baut Berührungsängste ab und zeigt sofort, was KI kann. Keine Folien, sondern Hands-on-Erfahrung mit Wettbewerbscharakter.",
      },
      {
        question: "Gibt es KI-Innovationsformate speziell für Nicht-Entwickler?",
        answer: "Ja, Business-Hackathons sind genau dafür konzipiert – keine Programmierkenntnisse nötig. Die Teilnehmenden nutzen Copilot, um Workflows zu optimieren, Prompts für typische Aufgaben zu entwickeln oder kreative Lösungen für Business-Probleme zu finden. Der Fokus liegt auf Anwendung, nicht auf Technik.",
      },
      {
        question: "Was kommt bei einem KI-Hackathon konkret heraus?",
        answer: "Handfeste Ergebnisse: funktionierende Prompt-Templates für wiederkehrende Aufgaben, automatisierte Workflows, dokumentierte Best Practices, überraschende Ideen, die niemand allein entwickelt hätte. Dazu: Teambuilding, KI-Kompetenz und echte Begeisterung. Die besten Lösungen fließen direkt in den Arbeitsalltag.",
      },
      {
        question: "Wie überzeugen wir unser Management von einem KI-Hackathon?",
        answer: "Die Argumente: Kombination aus Schulung und Teambuilding, konkrete Ergebnisse statt nur Wissen, Identifikation von High-Impact-Use-Cases aus der Belegschaft, messbare Outputs (Prompts, Workflows), positive Change-Wirkung (Mitarbeitende werden zu KI-Botschaftern). Der Hackathon liefert fast immer mehr messbaren Nutzen als klassische Tagesschulungen – bei gleichem oder kleinerem Zeitbudget.",
      },
    ],
  },

  // -----------------------------------------------------------------
  // 6) KEYNOTE COPILOT ARBEITSWELT
  // -----------------------------------------------------------------
  {
    slug: "keynote-copilot-arbeitswelt",
    type: "keynote",
    icon: Mic,
    title: "Keynote: Wie Microsoft Copilot die Arbeitswelt verändert",
    subtitle: "Die Bühne für den ehrlichen, inspirierenden Blick auf KI – Live-Demos statt Folien.",
    duration: "45-90 Minuten inkl. Q&A",
    participants: "50 bis mehrere Tausend Zuhörende (Bühne, Townhall, Hybrid-Event)",
    format: "Bühnen-Keynote, Townhall, Kick-off, Hybrid-Event oder Executive-Workshop-Eröffnung",
    description: "Eine Keynote für Führungskräfte, All-Hands-Meetings und Kick-off-Veranstaltungen: Wie verändert KI die Wissensarbeit, welche Chancen bietet Microsoft Copilot, und wie gestalten erfolgreiche Unternehmen die Transformation? Live-Demos und konkrete Praxisbeispiele machen das Abstrakte greifbar – ohne PR-Folklore und ohne KI-Hype, sondern mit einer ehrlichen Einschätzung von Potenzial und Grenzen.",
    questionLead: "Wer kann bei uns eine inspirierende, fundierte KI-Keynote für Führungskräfte oder ein All-Hands-Meeting halten?",
    features: [
      "Vision: Die Zukunft der Wissensarbeit mit KI – nüchtern und anschlussfähig",
      "Microsoft Copilot im Überblick: Was kann es, was nicht, wo liegen die echten Mehrwerte?",
      "Live-Demonstrationen: Eindrückliche Use Cases aus Word, Excel, PowerPoint, Outlook und Teams",
      "Erfolgsfaktoren: Was unterscheidet erfolgreiche Copilot-Einführungen von gescheiterten?",
      "Change-Perspektive: Wie nehmen Sie Ihre Mitarbeitenden auf die KI-Reise mit?",
      "Praxisbeispiele: Erfolgsgeschichten aus deutschen Unternehmen – mit Kennzahlen",
      "Q&A-Session: Ihre Fragen zu Copilot, KI-Strategie und Implementierung",
    ],
    targetAudience: [
      "Vorstände und Geschäftsführungen, die einen fundierten Überblick über KI-Chancen und -Risiken brauchen",
      "Event-Organisatoren, die einen Keynote-Speaker für Kick-offs, Offsites oder All-Hands suchen",
      "Change-Verantwortliche, die den Startschuss für eine KI-Transformation setzen wollen",
      "Betriebsräte und Mitarbeitervertretungen, die eine sachliche, ehrliche Einordnung von KI wünschen",
    ],
    learningOutcomes: [
      "Das Publikum versteht, was Microsoft Copilot konkret kann – durch Live-Demos statt nur Folien",
      "Führungskräfte können KI-Chancen und -Risiken fundiert einordnen und strategisch bewerten",
      "Mitarbeitende erleben KI als Unterstützung statt Bedrohung – die Keynote baut Ängste ab",
      "Das Publikum weiß, was eine erfolgreiche KI-Einführung von einer gescheiterten unterscheidet",
    ],
    businessImpact: [
      "Der Kick-off für die KI-Transformation wird zum positiven Schlüsselmoment statt Pflichttermin",
      "Führungskräfte treffen fundiertere Entscheidungen zu KI-Investitionen, weil sie das Potenzial verstehen",
      "Mitarbeiter-Akzeptanz für die anstehende Copilot-Einführung steigt messbar nach der Keynote",
      "Interne Kommunikation bekommt Bildmaterial und Zitate für die weitere KI-Kampagne",
    ],
    deliverables: [
      "Individuell vorbereitete Keynote (passgenau auf Ihr Unternehmen und Ihr Publikum)",
      "Live-Demos mit Ihren realen Beispiel-Szenarien (auf Wunsch)",
      "Foto- und Videomaterial-Freigabe für Ihre interne Kommunikation",
      "Schriftliche Kurzfassung der Kernbotschaften als Follow-up",
    ],
    relatedTrainings: [
      "copilot-grundlagen-prompt-design",
      "microsoft-365-copilot-praxis",
      "ausbildung-ki-wissensarbeiter",
    ],
    relatedWorkshops: [
      "copilot-strategie-change-management",
      "copilot-launch-eventtag",
      "copilot-change-programm",
    ],
    metaTitle: "Copilot Keynote – KI-Vortrag für Führungskräfte & All-Hands | copilotenschule.de",
    metaDescription: "Inspirierende, fundierte Keynote zu Microsoft Copilot: Vision, Live-Demos, Praxisbeispiele. Für All-Hands, Kick-offs und Führungskräfte-Events – ehrlich und anschlussfähig.",
    keywords: [
      "Copilot Keynote",
      "KI Vortrag",
      "Copilot Führungskräfte",
      "KI Transformation Speaker",
      "Microsoft Copilot Speaker",
      "KI Keynote Unternehmen",
    ],
    faqs: [
      {
        question: "Wer kann bei uns eine inspirierende, fundierte KI-Keynote halten?",
        answer: "Für eine wirkungsvolle KI-Keynote brauchen Sie jemanden, der Copilot nicht nur kennt, sondern täglich einsetzt und die Transformation in Unternehmen aktiv begleitet. Idealerweise mit Live-Demos, die beeindrucken (nicht nur Folien), konkreten Praxisbeispielen aus deutschen Unternehmen und der Fähigkeit, sowohl technische als auch strategische Fragen präzise zu beantworten. Die Copilotenschule liefert genau dieses Profil.",
      },
      {
        question: "Wie erklären wir unserem Vorstand die Chancen und Risiken von Microsoft Copilot?",
        answer: "Eine Executive-Keynote adressiert genau das: Vision (wie verändert KI Arbeit?), konkreter Nutzen (welche Produktivitätsgewinne sind realistisch?), ROI-Perspektive (wie rechnet sich die Investition?), Risiken (Compliance, Change, Fehlnutzung) und Erfolgsfaktoren. Mit Live-Demos wird das Potenzial greifbar – und Sie sparen sich stundenlange Erklärungen.",
      },
      {
        question: "Was sollte eine Copilot-Keynote für ein All-Hands-Meeting beinhalten?",
        answer: "Für breites Publikum: Einordnung (was ist KI, was kann Copilot?), eindrückliche Live-Demos (Wow-Momente), Praxisbeispiele (konkrete Anwendungen aus Word, Excel, Teams), Ausblick (was kommt als Nächstes?) und die klare Botschaft, dass KI unterstützt statt ersetzt. Typische Dauer: 60-90 Minuten inklusive Q&A.",
      },
      {
        question: "Wie nehmen wir Mitarbeitende mit, die Angst vor KI haben?",
        answer: "Eine gute Keynote adressiert Ängste direkt: KI als Assistent, nicht als Ersatz. Beispiele, wie KI nervige Routineaufgaben abnimmt, statt Jobs zu vernichten. Die Botschaft, dass KI-Kompetenz Chance und Zukunftsversicherung zugleich ist. Wichtig: ehrlich über Grenzen sprechen, keine Übertreibungen, und zeigen, dass Menschen die Kontrolle behalten.",
      },
    ],
  },

  // -----------------------------------------------------------------
  // 7) COPILOT LAUNCH EVENTTAG
  // -----------------------------------------------------------------
  {
    slug: "copilot-launch-eventtag",
    type: "event",
    icon: PartyPopper,
    title: "Copilot Launch Eventtag",
    subtitle: "Der Kick-off, der aus Ihrer Copilot-Einführung ein Highlight macht.",
    duration: "1 Tag (ganztägig) | skalierbar auf mehrere Tage oder Standorte",
    participants: "50 bis mehrere Hundert Mitarbeitende, Flow-Teilnahme über den Tag verteilt",
    format: "Vor Ort mit Infostand, Demo-Inseln, Gamification und Beratung – ggf. Hybrid mit Remote-Dock",
    description: "Der perfekte Kick-off für Ihre Copilot-Einführung: Ein energiegeladener Eventtag mit Infostand, Live-Demos, Hands-on-Stationen, KI-Challenges, Gamification und kompetenter Beratung vor Ort. Mitarbeitende kommen über den Tag verteilt, erleben Copilot zum ersten Mal unter Anleitung und nehmen Quick-Start-Guides, Cheat Sheets und echte Erfolgserlebnisse mit. Das Gegenteil einer stillen Einführung per E-Mail.",
    questionLead: "Wie machen wir den Copilot-Launch zu einem echten Highlight für unsere Mitarbeitenden – mit einem Event statt einer E-Mail.",
    features: [
      "Ausstellungs-Zone mit Postern und Displays: Weckt Neugier und vermittelt auf einen Blick, was mit Copilot möglich ist",
      "Hands-on-Station zum Selbst-Ausprobieren: Mitarbeitende probieren Copilot unter Anleitung eines begleitenden Experten-Teams aus",
      "Gamification-Ecke mit Gewinnspiel und Copilot-Quiz: Spielerisch lernen, mitmachen, gewinnen – Berührungsängste lösen sich im Wettbewerb",
      "Handout-Materialien für den Einstieg: Cheat Sheets, Quick Guides und Tipps zum Mitnehmen – damit die Erkenntnisse vom Eventtag zu Hause im Alltag landen",
    ],
    targetAudience: [
      "Interne Kommunikation und Change Management, die den Copilot-Start als positives Erlebnis inszenieren wollen",
      "HR und Personalentwicklung, die eine niedrigschwellige erste KI-Erfahrung für alle Mitarbeitenden suchen",
      "IT-Projektleitungen, die den Copilot-Rollout mit einem sichtbaren Kick-off begleiten möchten",
      "Führungskräfte, die Begeisterung statt Widerstand bei der KI-Einführung erzeugen wollen",
    ],
    learningOutcomes: [
      "Mitarbeitende erleben Copilot zum ersten Mal unter professioneller Anleitung – mit sofortigen Erfolgsmomenten",
      "Berührungsängste werden durch spielerische Formate (Challenges, Quizze, Hands-on) aktiv abgebaut",
      "Jede:r Teilnehmende nimmt konkrete Quick Guides und Cheat Sheets mit, die den Einstieg sofort erleichtern",
      "Individuelle Fragen zu eigenen Use Cases werden vor Ort von Expert:innen beantwortet",
    ],
    businessImpact: [
      "Der Copilot-Launch wird zum positiven Gesprächsthema im Unternehmen – statt zur stillen Einführung per E-Mail",
      "Die initiale Nutzungsrate nach dem Launch liegt spürbar höher als bei Rollouts ohne Event-Begleitung",
      "Früh-Adopter werden identifiziert und können als Champions für das weitere Programm gewonnen werden",
      "Professionelle Foto-Dokumentation liefert Material für die interne KI-Kommunikation der nächsten Monate",
    ],
    deliverables: [
      "Ganzer Eventtag mit Infostand, Demo-Inseln, Hands-on-Stationen und Challenges",
      "Print-Materialien (Cheat Sheets, Quick Guides, Roll-ups) im Corporate Design",
      "Foto-Paket zur freien Nutzung in der internen Kommunikation",
      "Follow-up-Dokument mit Best Moments, Teilnehmerzahlen und Lessons Learned",
      "Champions-Liste mit interessierten Mitarbeitenden (auf Opt-in-Basis)",
    ],
    relatedTrainings: [
      "copilot-grundlagen-prompt-design",
      "microsoft-365-copilot-praxis",
      "copilot-lernreise-8-wochen",
    ],
    relatedWorkshops: [
      "keynote-copilot-arbeitswelt",
      "copilot-hackathon",
      "copilot-change-programm",
    ],
    metaTitle: "Copilot Launch Eventtag – Kick-off für die Copilot-Einführung | copilotenschule.de",
    metaDescription: "Copilot-Launch als Highlight: Eventtag mit Live-Demos, Challenges, Gamification und Beratung. Der Kick-off, der aus der Einführung ein Gesprächsthema macht.",
    keywords: [
      "Copilot Launch Event",
      "KI Kick-off Event",
      "Copilot Einführung Event",
      "Copilot Gamification",
      "KI Eventtag",
      "Copilot Adoption Event",
    ],
    faqs: [
      {
        question: "Wie machen wir den Copilot-Launch zu einem echten Highlight?",
        answer: "Ein Launch-Eventtag mit interaktiven Elementen: Live-Demos zum Staunen, Hands-on-Stationen zum Selbst-Ausprobieren, KI-Challenges mit Wettbewerbscharakter, Gamification mit Preisen und kompetente Ansprechpartner:innen für individuelle Fragen. Das erzeugt positive Energie, baut Berührungsängste ab und macht aus einer technischen Einführung ein Erlebnis.",
      },
      {
        question: "Wie bauen wir Berührungsängste unserer Mitarbeitenden gegenüber KI ab?",
        answer: "Niedrigschwellige erste Erfahrungen sind der Schlüssel. Nicht Schulung im Klassenraum, sondern ein Infostand, an dem man fragen kann; Hands-on-Stationen unter Anleitung; spielerische Challenges, die Spaß machen. Wenn Mitarbeitende erleben, dass KI ihnen hilft, wandelt sich Skepsis in Neugier – und aus Neugier wird Nutzung.",
      },
      {
        question: "Welche Ideen gibt es für einen KI-Launchtag in unserem Unternehmen?",
        answer: "Bewährte Elemente: Infostand mit kompetenten Ansprechpartner:innen, Live-Demos (Wow-Momente), interaktive KI-Challenges (Teams treten gegeneinander an), Gamification mit Quizzen und Gewinnspielen, Hands-on-Stationen zum Selbst-Ausprobieren, individuelle Beratungsgespräche und hochwertige Infomaterialien zum Mitnehmen. Alles anpassbar an Location und Corporate Identity.",
      },
      {
        question: "Wie viele Mitarbeitende können an einem Launch-Eventtag teilnehmen?",
        answer: "Das Format ist skalierbar: von 50 bis mehrere Hundert Teilnehmende. An einem Eventtag kommen Mitarbeitende flexibel über den Tag verteilt, bleiben so lange, wie sie möchten, und nehmen mit, was sie interessiert. Kein fester Zeitrahmen, keine Frontalschulung, sondern ein lebendiger Marktplatz der Möglichkeiten. Für größere Standorte kann das Event auch über mehrere Tage oder mehrere Orte laufen.",
      },
    ],
  },

  // -----------------------------------------------------------------
  // 8) BESSERE ENTSCHEIDUNGEN MIT COPILOT
  // -----------------------------------------------------------------
  {
    slug: "bessere-entscheidungen-mit-copilot",
    type: "workshop",
    icon: Brain,
    title: "Bessere Entscheidungen mit Copilot",
    subtitle: "Verzerrungen und Noise verstehen – und Copilot gezielt dagegen einsetzen.",
    duration: "4 Stunden als eigenständiger Workshop · 2 Stunden als Modul in der Lernreise",
    participants: "bis 15 Teilnehmende",
    format: "Online · Microsoft Copilot oder ChatGPT",
    description: "Die Lernreise zeigt, wie Teams Copilot produktiv nutzen. Dieses Modul setzt eine Ebene darüber an: Wie lassen sich mit Copilot bessere Entscheidungen treffen – indem systematische Denkfehler sichtbar werden, die sonst unerkannt einfließen? Nach der Lernreise weiß man, wie man Copilot nutzt. Nach diesem Modul weiß man, wie man damit bewusster entscheidet. Das Seminar wird geleitet von Saskia Kaden, Agile Coach und systemische Beraterin, die seit Jahren mit Führungskräften und Teams an Entscheidungsqualität arbeitet. Das Modul basiert auf einem eigenständigen dreitägigen Training zur Entscheidungspsychologie, das Saskia Kaden entwickelt hat.",
    questionLead: "Wie kann Copilot helfen, systematische Denkfehler und Noise in Entscheidungsprozessen sichtbar zu machen – und bessere Entscheidungen zu treffen?",
    framework: {
      name: "Zwei Integrationspfade",
      steps: [
        "Variante A · Aufbaumodul nach der Lernreise: Eigenständiges 3-Stunden-Modul für alle, die die 8-Wochen-Lernreise abgeschlossen haben. Ideal als Upsell, Wiederaktivierung oder Angebot für Alumni-Gruppen.",
        "Variante B · Baustein in der Lernreise: Integration als zusätzliche 9. Woche oder als Erweiterung von Woche 7 \"Advanced Prompting\". Sinnvoll, wenn Kund:innen gezielt Entscheidungsqualität in die Lernreise aufnehmen wollen.",
      ],
    },
    features: [
      "Ankommen & Erwartungen: Was macht eine gute Entscheidung aus? (15 Min.)",
      "System 1 und System 2 nach Kahneman – mit kurzem Selbstversuch (30 Min.)",
      "Die wichtigsten Bias-Fallen: Anker, Verfügbarkeit, Bestätigung, Overconfidence (35 Min.)",
      "Noise – das unterschätzte Rauschen in Organisationen (25 Min.)",
      "Hands-on: Copilot als Entscheidungs-Sparring – Prompts, Pre-Mortem, Kriterien-Check (40 Min.)",
      "Transfer: Was nehme ich mit in meinen Arbeitsalltag? (20 Min.)",
      "Handout mit Methoden-Toolkit als Abschluss-Material",
    ],
    targetAudience: [
      "Teams und Führungskräfte, die die 8-Wochen-Copilot-Lernreise abgeschlossen haben und den nächsten Schritt gehen wollen",
      "Fach- und Führungskräfte, die täglich Entscheidungen unter Unsicherheit treffen und KI gezielt als Sparring nutzen möchten",
      "L&D-Verantwortliche, die Entscheidungsqualität als eigenständiges Modul oder als Erweiterung der Copilot-Lernreise verankern wollen",
      "Organisationen, die nach der technischen Copilot-Einführung den kognitiven Mehrwert aktivieren möchten",
    ],
    learningOutcomes: [
      "Ein geschärftes Gespür dafür, wann das eigene Denken in die Irre führt – und wann bewusste Reflexion nötig ist.",
      "Klarheit über die häufigsten Bias-Fallen und die Wirkung von Noise in Entscheidungsprozessen.",
      "Konkrete Prompts und Anwendungsfälle, mit denen Copilot als Sparringspartner für bessere Entscheidungen wirkt.",
      "Eine erprobte Methode zur Entscheidungsqualität, die sich direkt am nächsten Tag einsetzen lässt.",
    ],
    businessImpact: [
      "Entscheidungen werden weniger von unbewussten Verzerrungen geprägt – Qualität und Nachvollziehbarkeit steigen.",
      "Teams nutzen Copilot nicht nur effizienter, sondern auf einem intellektuell höheren Niveau.",
      "Riskante Entscheidungen werden systematisch durch Pre-Mortem und Kriterien-Check hinterfragt.",
      "Das Modul hebt die Copilot-Nutzung von Automatisierung auf strategische Entscheidungsunterstützung.",
    ],
    deliverables: [
      "Als eigenständiger Workshop: 4-stündiges interaktives Online-Seminar mit Raum für eigene Entscheidungssituationen der Teilnehmenden",
      "Als Modul in der Lernreise: 2-stündige Einheit, integrierbar als zusätzliche Session oder Erweiterung des Advanced-Prompting-Moduls",
      "Handout mit Methoden-Toolkit (Bias-Übersicht, Noise-Checkliste, Prompt-Vorlagen für Entscheidungs-Sparring)",
    ],
    relatedTrainings: [
      "copilot-lernreise-8-wochen",
      "ausbildung-ki-wissensarbeiter",
      "microsoft-365-copilot-praxis",
    ],
    relatedWorkshops: [
      "copilot-strategie-change-management",
    ],
    metaTitle: "Bessere Entscheidungen mit Copilot – Bias, Noise & Entscheidungsqualität | copilotenschule.de",
    metaDescription: "Workshop (4h) oder Lernreise-Modul (2h): Wie Copilot als Sparringspartner hilft, systematische Denkfehler und Noise zu überwinden – für bessere Entscheidungen. Mit Saskia Kaden.",
    keywords: [
      "Bessere Entscheidungen KI",
      "Copilot Entscheidungsqualität",
      "Cognitive Bias Training",
      "Noise Entscheidungen",
      "Copilot Sparring",
      "Kahneman System 1 System 2",
      "KI Entscheidungsunterstützung",
    ],
    faqs: [
      {
        question: "Wie hilft Copilot, bessere Entscheidungen zu treffen?",
        answer: "Copilot kann als strukturierter Sparringspartner eingesetzt werden: Pre-Mortem-Analysen durchführen, Gegenargumente generieren, Entscheidungskriterien explizit machen und blinde Flecken aufdecken. Das Kursseminar zeigt konkret, wie diese Prompts aussehen – und warum es hilft, das eigene Denken vorher zu verstehen (System 1 vs. System 2, Bias-Fallen, Noise).",
      },
      {
        question: "Was ist der Unterschied zwischen diesem Modul und der regulären Copilot-Lernreise?",
        answer: "Die Lernreise vermittelt, wie man Copilot produktiv nutzt – Prompting, Office-Apps, Workflows. Dieses Modul setzt eine Ebene darüber an: Wie nutze ich Copilot, um bewusster und qualitativ bessere Entscheidungen zu treffen? Es geht nicht um mehr Effizienz, sondern um mehr kognitive Schärfe. Die beiden Formate ergänzen sich ideal.",
      },
      {
        question: "Für wen eignet sich dieses Modul als Aufbau nach der Lernreise?",
        answer: "Ideal für Teams, die die 8-Wochen-Copilot-Lernreise abgeschlossen haben und den nächsten Schritt gehen wollen – als Alumni-Modul, Upsell oder Wiederaktivierung. Es kann aber auch eigenständig gebucht werden, wenn Entscheidungsqualität das primäre Thema ist. Voraussetzung: grundlegende Vertrautheit mit Copilot oder ChatGPT.",
      },
      {
        question: "Wer leitet das Seminar?",
        answer: "Das Seminar wird von Saskia Kaden geleitet. Sie ist Agile Coach und systemische Beraterin und arbeitet seit Jahren mit Führungskräften und Teams daran, wie Entscheidungen in Organisationen systematisch besser werden. Das Modul basiert auf einem eigenständigen dreitägigen Training zur Entscheidungspsychologie, das Saskia Kaden entwickelt hat – mit Methoden aus der Verhaltensökonomie (Kahneman, Thaler) und der Noise-Forschung (Kahneman, Sibony, Sunstein). Sie bringt damit eine Expertise mit, die über klassisches Copilot-Training hinausgeht: nicht nur wie man KI nutzt, sondern wie man mit KI besser denkt.",
      },
    ],
  },
];

// -------- Helper-Funktionen -----------------------------------------

export function getWorkshopBySlug(slug: string): Workshop | undefined {
  return workshops.find(w => w.slug === slug);
}

export function getAllWorkshopSlugs(): string[] {
  return workshops.map(w => w.slug);
}

export function getWorkshopsByType(type: WorkshopType): Workshop[] {
  return workshops.filter(w => w.type === type);
}

// Label-Mapping für Type → UI-Anzeige (Badge, Filter, ListItem)
export const WORKSHOP_TYPE_LABELS: Record<WorkshopType, string> = {
  workshop: "Workshop",
  keynote: "Keynote",
  event: "Event",
  "change-program": "Change-Programm",
};

// Reihenfolge für Type-Filter-Buttons (und konsistentes Sortieren)
export const WORKSHOP_TYPE_ORDER: WorkshopType[] = [
  "change-program",
  "workshop",
  "event",
  "keynote",
];

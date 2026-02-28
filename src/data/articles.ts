// ============================================================================
// ZENTRALE ARTIKEL-DATENBANK
// ============================================================================
// Diese Datei ist die einzige Quelle der Wahrheit für alle Wissensartikel.
// Sowohl Wissen.tsx als auch EditorialCalendar.tsx lesen von hier.
//
// Workflow für neue Artikel:
// 1. TSX-Datei in src/pages/ erstellen
// 2. Route in App.tsx hinzufügen
// 3. HIER einen Eintrag hinzufügen (PFLICHT!)
//    → Wissen.tsx und EditorialCalendar zeigen den Artikel automatisch an
//
// SORTIERUNG: Nach publishDate absteigend (neueste zuerst)
// ============================================================================

export interface ArticleData {
  id: string;
  title: string;
  description: string;
  link: string;
  badge: string;
  icon: string;
  readTime?: string;
  lastUpdated: string;
  publishDate: string;      // ISO Format: "2026-02-04"
  publishTime?: string;     // Optional: "10:00"
  isDraft?: boolean;        // true = Artikel ist ein Draft (nicht veröffentlicht), false/undefined = veröffentlicht
}

// Alle Artikel - sortiert nach Veröffentlichungsdatum (neueste zuerst)
export const ALL_ARTICLES: ArticleData[] = [
  {
    id: "copilot-fuer-excel",
    title: "Microsoft Copilot für Excel: Was die KI in Tabellen wirklich kann",
    description: "Was kann Microsoft Copilot in Excel wirklich? Praxisbeispiele, Prompts und ehrliche Einschätzung der Grenzen – von jemandem, der Werbung studiert hat und Pivot-Tabellen früher gefürchtet hat.",
    link: "/wissen/copilot-fuer-excel",
    badge: "Excel",
    icon: "📊",
    lastUpdated: "28. Feb. 2026",
    publishDate: "2026-02-28",
    publishTime: "10:00"
  },
  {
    id: "copilot-agent-digitales-gedaechtnis",
    title: "Copilot Agent für Ihr digitales Gedächtnis: Meeting-Protokolle automatisch erstellen und durchsuchbar machen",
    description: "Schritt-für-Schritt-Anleitung: Eigenen Copilot-Agenten bauen, der Meeting-Transkripte automatisch in Ihr Wunschformat bringt und als durchsuchbares digitales Gedächtnis ablegt.",
    link: "/wissen/copilot-agent-digitales-gedaechtnis",
    badge: "Automatisierung",
    icon: "🤖",
    lastUpdated: "28. Feb. 2026",
    publishDate: "2026-02-28",
    publishTime: "09:00"
  },
  {
    id: "copilot-chat-free-pernod-ricard",
    title: "Copilot Chat im Büroalltag: Was bei Pernod Ricard passiert, wenn man einfach anfängt",
    description: "Wie Pernod Ricard vom kostenlosen Copilot Chat in Microsoft 365 profitieren kann: Praxisbeispiele aus Außendienst, Consumer Care und Geschäftsführung.",
    link: "/wissen/copilot-chat-free-pernod-ricard",
    badge: "Praxisbericht",
    icon: "🥃",
    lastUpdated: "27. Feb. 2026",
    publishDate: "2026-02-27",
    publishTime: "09:00"
  },
  {
    id: "ki-halluzinationen-vermeiden",
    title: "KI-Halluzinationen vermeiden und KI zur Qualitätssicherung nutzen",
    description: "Wie KI-Halluzinationen entstehen, wie man sie durch besseres Prompting vermeidet und wie man KI selbst als Werkzeug zur Qualitätssicherung einsetzt.",
    link: "/wissen/ki-halluzinationen-vermeiden",
    badge: "Qualität",
    icon: "🔍",
    lastUpdated: "17. Feb. 2026",
    publishDate: "2026-02-15",
    publishTime: "09:00"
  },
  {
    id: "copilot-hr-use-cases",
    title: "Copilot im HR: Wo Personalabteilungen wirklich Zeit gewinnen",
    description: "Die wirkungsvollsten Copilot Use Cases für HR: Von Stellenausschreibungen über Zeugnisse bis People Analytics – konkrete Zeitersparnis pro Mitarbeiter.",
    link: "/wissen/copilot-hr-use-cases",
    badge: "HR",
    icon: "👥",
    lastUpdated: "14. Feb. 2026",
    publishDate: "2026-02-14",
    publishTime: "10:00"
  },
  {
    id: "copilot-vertrieb-use-cases",
    title: "Copilot im Vertrieb: Wo die Zeitersparnis wirklich entsteht",
    description: "Die wirkungsvollsten Copilot Use Cases für Vertriebsteams: Konkrete Zeitersparnis für Innendienst und Außendienst mit M365 Copilot und Dynamics 365 Sales.",
    link: "/wissen/copilot-vertrieb-use-cases",
    badge: "Sales",
    icon: "💼",
    lastUpdated: "14. Feb. 2026",
    publishDate: "2026-02-14",
    publishTime: "09:00"
  },
  {
    id: "copilot-adhs",
    title: "Microsoft Copilot und ADHS: Wie KI mir hilft, fokussierter zu arbeiten",
    description: "Ein persönlicher Erfahrungsbericht: Wie Microsoft Copilot bei ADHS unterstützt – von Meeting-Recaps über E-Mail-Zusammenfassungen bis zum digitalen Gedächtnis.",
    link: "/wissen/copilot-adhs-produktiver-arbeiten",
    badge: "Erfahrungsbericht",
    icon: "🧠",
    lastUpdated: "05. Feb. 2026",
    publishDate: "2026-02-05",
    publishTime: "08:00",
    isDraft: true  // Draft - noch nicht veröffentlicht
  },
  {
    id: "warum-verteiltes-lernen",
    title: "Warum verteiltes Lernen bei Copilot-Trainings funktioniert",
    description: "Warum Copilot-Lernreisen nachhaltiger wirken als ganztägige Schulungen – und was die Wissenschaft dazu sagt.",
    link: "/wissen/warum-verteiltes-lernen-bei-copilot-trainings-funktioniert",
    badge: "Erfahrungsbericht",
    icon: "✍️",
    lastUpdated: "05. Feb. 2026",
    publishDate: "2026-02-04",
    publishTime: "10:00"
  },
  {
    id: "copilot-lernreise-vs-tagesschulung",
    title: "Copilot Lernreise vs. Tagesschulung: Warum 4×2 Stunden mehr bringen als 1×8",
    description: "Warum Copilot-Lernreisen nachhaltiger wirken als ganztägige Schulungen. Vergessenskurve, Praxistransfer, Kalenderfreundlichkeit – 8 Gründe für verteiltes Lernen.",
    link: "/wissen/copilot-lernreise-vs-tagesschulung",
    badge: "Enablement",
    icon: "🎯",
    lastUpdated: "04. Feb. 2026",
    publishDate: "2026-02-04",
    publishTime: "09:00"
  },
  {
    id: "copilot-adoption-2026-zahlen",
    title: "Copilot Adoption 2026: Was die Zahlen wirklich zeigen",
    description: "Aktuelle Zahlen Januar 2026: 15 Mio. Copilot-Seats, 160% Wachstum, bis zu 408% ROI. Eine nüchterne Einordnung jenseits des Microsoft-Marketings.",
    link: "/wissen/copilot-adoption-2026-zahlen",
    badge: "Strategie",
    icon: "📊",
    lastUpdated: "03. Feb. 2026",
    publishDate: "2026-02-03",
    publishTime: "10:00"
  },
  {
    id: "copilot-roi-erfolgsgeschichten",
    title: "Copilot ROI: Was CEOs und Vorstände aus dem DACH-Raum berichten",
    description: "Wörtliche Zitate von Führungskräften bei Bayer, Siemens, Schaeffler, thyssenkrupp und der Schweizerischen Post über ihre Erfahrungen mit Microsoft Copilot.",
    link: "/wissen/copilot-roi-erfolgsgeschichten",
    badge: "Neu",
    icon: "💬",
    lastUpdated: "03. Feb. 2026",
    publishDate: "2026-02-03",
    publishTime: "09:00"
  },
  {
    id: "copilot-launch-kampagne",
    title: "Copilot Launch-Kampagne: So bringen Sie Ihr Unternehmen zum Fliegen",
    description: "Warum eine Copilot-Einführung anders ist als SAP oder Salesforce – und wie Sie mit der richtigen Launch-Kampagne nachhaltige Verhaltensänderung erreichen. Mit 15 konkreten Ideen.",
    link: "/wissen/copilot-launch-kampagne",
    badge: "Neu",
    icon: "🚀",
    lastUpdated: "03. Feb. 2026",
    publishDate: "2026-02-03",
    publishTime: "08:00"
  },
  {
    id: "prompt-bibliotheken-vs-training",
    title: "Warum Prompt-Bibliotheken Quatsch sind",
    description: "Prompt-Listen klingen gut, bringen aber wenig. Warum echtes Prompting-Training und Copilot-Agenten die besseren Alternativen sind – inklusive dem Zauberstab-Prompt.",
    link: "/wissen/prompt-bibliotheken-vs-training",
    badge: "Neu",
    icon: "🪄",
    lastUpdated: "03. Feb. 2026",
    publishDate: "2026-02-03",
    publishTime: "07:00"
  },
  {
    id: "copilot-digitales-gedaechtnis",
    title: "Digitales Gedächtnis mit Microsoft Copilot",
    description: "Wie Copilot mit Transkription, E-Mails, Chats und OneNote zum externen Gedächtnis wird. Praktische Prompts für vergessene Zusagen und Entscheidungen.",
    link: "/wissen/copilot-digitales-gedaechtnis",
    badge: "Praxisguide",
    icon: "🧠",
    lastUpdated: "03. Feb. 2026",
    publishDate: "2026-02-03",
    publishTime: "06:00"
  },
  {
    id: "copilot-tipps-tricks-produktivitaet",
    title: "22 Microsoft Copilot Tipps & Tricks für mehr Produktivität",
    description: "22 Profi-Tipps für Microsoft 365 Copilot in Word, Excel, PowerPoint, Outlook & Teams. Prompting-Tricks, Shortcuts & versteckte Features für den Büroalltag.",
    link: "/wissen/copilot-tipps-tricks-produktivitaet",
    badge: "Best Practices",
    icon: "💡",
    lastUpdated: "03. Feb. 2026",
    publishDate: "2026-02-03"
  },
  {
    id: "copilot-unternehmensweit-einfuehren",
    title: "Warum Unternehmen Microsoft Copilot zentral einführen sollten",
    description: "Warum Shadow-IT bei KI gefährlich ist: Zentrale Copilot-Einführung sichert DSGVO-Konformität, Grounding mit Unternehmensdaten und unternehmensweite Synergien.",
    link: "/wissen/copilot-unternehmensweit-einfuehren",
    badge: "Strategie",
    icon: "🏢",
    lastUpdated: "02. Feb. 2026",
    publishDate: "2026-02-02",
    publishTime: "10:00"
  },
  {
    id: "ki-realitaet-beratungsfirmen-2026",
    title: "KI in deutschen Unternehmen 2026: Was die großen Beratungsfirmen wirklich sehen",
    description: "Umfassende Analyse von McKinsey, BCG, Deloitte, PwC, KPMG: Aktuelle KI-Investitionen, ROI-Realität und warum 80% der Unternehmen noch keine Ergebnisse sehen.",
    link: "/wissen/ki-realitaet-beratungsfirmen-2026",
    badge: "Strategie",
    icon: "📊",
    lastUpdated: "02. Feb. 2026",
    publishDate: "2026-02-02",
    publishTime: "09:00"
  },
  {
    id: "microsoft-copilot-lizenzen",
    title: "Microsoft Copilot Lizenzen 2026: Preise, Vergleich & Empfehlungen",
    description: "Welche Microsoft Copilot Lizenz benötigen Sie? Umfassender Vergleich aller Lizenzmodelle für Microsoft 365 Copilot, GitHub Copilot und Copilot Studio mit aktuellen Preisen.",
    link: "/wissen/microsoft-copilot-lizenzen",
    badge: "Lizenzierung",
    icon: "📋",
    lastUpdated: "02. Feb. 2026",
    publishDate: "2026-01-15",
    publishTime: "09:00"
  },
  {
    id: "github-copilot",
    title: "GitHub Copilot: Der ultimative Leitfaden für Entwickler",
    description: "Der ultimative Leitfaden für Entwickler: Setup, Best Practices und Advanced Features für produktiveres Coding mit KI-Unterstützung.",
    link: "/wissen/github-copilot",
    badge: "Entwicklung",
    icon: "💻",
    lastUpdated: "02. Feb. 2026",
    publishDate: "2026-01-10",
    publishTime: "09:00"
  },
  {
    id: "copilot-studio",
    title: "Microsoft Copilot Studio: KI-Agenten und Custom Copilots erstellen",
    description: "Low-Code-Plattform für eigene KI-Agenten: Custom Copilots, Chatbots und Automatisierungen ohne Programmierkenntnisse erstellen.",
    link: "/wissen/copilot-studio",
    badge: "Entwicklung",
    icon: "🤖",
    lastUpdated: "02. Feb. 2026",
    publishDate: "2026-01-08",
    publishTime: "09:00"
  },
  {
    id: "prompt-engineering",
    title: "Prompt Engineering für Microsoft Copilot: Best Practices",
    description: "Meistern Sie die Kunst des Prompt Engineerings: Praxiserprobte Techniken für effektive Copilot-Prompts in Word, Excel, PowerPoint und mehr.",
    link: "/wissen/prompt-engineering",
    badge: "Grundlagen",
    icon: "✨",
    lastUpdated: "02. Feb. 2026",
    publishDate: "2026-01-05",
    publishTime: "09:00"
  },
  {
    id: "ki-agenten",
    title: "KI-Agenten im Unternehmen: Autonome Workflows mit Copilot",
    description: "Von der Automatisierung zur Autonomie: Wie KI-Agenten Ihre Geschäftsprozesse transformieren und was das für Ihr Unternehmen bedeutet.",
    link: "/wissen/ki-agenten",
    badge: "Fortgeschritten",
    icon: "🧠",
    lastUpdated: "02. Feb. 2026",
    publishDate: "2026-01-03",
    publishTime: "09:00"
  },
  {
    id: "copilot-fehler-vermeiden",
    title: "Die 10 häufigsten Copilot-Fehler und wie Sie sie vermeiden",
    description: "Lernen Sie aus den Fehlern anderer: Die häufigsten Stolperfallen bei der Copilot-Nutzung und praxiserprobte Lösungen.",
    link: "/wissen/copilot-fehler-vermeiden",
    badge: "Best Practices",
    icon: "⚠️",
    lastUpdated: "02. Feb. 2026",
    publishDate: "2026-01-01",
    publishTime: "09:00"
  },
  {
    id: "copilot-roi-berechnen",
    title: "Copilot ROI berechnen: Lohnt sich die Investition?",
    description: "Praxisnahe Methoden zur ROI-Berechnung für Microsoft Copilot. Mit konkreten Formeln, Beispielrechnungen und Benchmarks.",
    link: "/wissen/copilot-roi-berechnen",
    badge: "ROI",
    icon: "💰",
    lastUpdated: "02. Feb. 2026",
    publishDate: "2025-12-15",
    publishTime: "09:00"
  },
  {
    id: "copilot-fuer-word",
    title: "Copilot für Word: Dokumente schneller erstellen",
    description: "Praktische Anleitungen für den Einsatz von Copilot in Microsoft Word: Von der Dokumenterstellung bis zur Überarbeitung.",
    link: "/wissen/copilot-fuer-word",
    badge: "Anwendung",
    icon: "📝",
    lastUpdated: "02. Feb. 2026",
    publishDate: "2025-12-10",
    publishTime: "09:00"
  },
  {
    id: "copilot-sicherheit-datenschutz",
    title: "Microsoft Copilot und Datenschutz: Kann die KI jetzt alles sehen?",
    description: "Kann Copilot alle Firmendaten sehen? Liest Microsoft mit? Was ist mit der DSGVO? Ehrliche Antworten auf die häufigsten Datenschutz-Fragen rund um Microsoft 365 Copilot.",
    link: "/wissen/copilot-sicherheit-datenschutz",
    badge: "Compliance",
    icon: "🔒",
    lastUpdated: "28. Feb. 2026",
    publishDate: "2025-12-05",
    publishTime: "09:00"
  },
  {
    id: "copilot-training-schulung",
    title: "Copilot Training & Schulung: Der komplette Leitfaden",
    description: "Alles über Copilot-Schulungen: Formate, Inhalte, Kosten und wie Sie das richtige Training für Ihr Team finden.",
    link: "/wissen/copilot-training-schulung",
    badge: "Training",
    icon: "🎓",
    lastUpdated: "02. Feb. 2026",
    publishDate: "2025-11-25",
    publishTime: "09:00"
  }
];

// Hilfsfunktion: Artikel nach ID finden
export function getArticleById(id: string): ArticleData | undefined {
  return ALL_ARTICLES.find(a => a.id === id);
}

// Hilfsfunktion: Artikel nach Link finden
export function getArticleByLink(link: string): ArticleData | undefined {
  return ALL_ARTICLES.find(a => a.link === link);
}

// Hilfsfunktion: Alle Artikel-IDs
export function getAllArticleIds(): string[] {
  return ALL_ARTICLES.map(a => a.id);
}

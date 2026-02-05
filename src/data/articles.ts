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
  readTime: string;
  lastUpdated: string;
  publishDate: string;      // ISO Format: "2026-02-04"
  publishTime?: string;     // Optional: "10:00"
  isDraft?: boolean;        // true = Artikel ist ein Draft (nicht veröffentlicht), false/undefined = veröffentlicht
}

// Alle Artikel - sortiert nach Veröffentlichungsdatum (neueste zuerst)
export const ALL_ARTICLES: ArticleData[] = [
  {
    id: "copilot-adhs",
    title: "Microsoft Copilot und ADHS: Wie KI mir hilft, fokussierter zu arbeiten",
    description: "Ein persönlicher Erfahrungsbericht: Wie Microsoft Copilot bei ADHS unterstützt – von Meeting-Recaps über E-Mail-Zusammenfassungen bis zum digitalen Gedächtnis.",
    link: "/wissen/copilot-adhs-produktiver-arbeiten",
    badge: "Erfahrungsbericht",
    icon: "🧠",
    readTime: "12 Minuten",
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
    readTime: "10 Minuten",
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
    readTime: "12 Minuten",
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
    readTime: "10 Minuten",
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
    readTime: "12 Minuten",
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
    readTime: "14 Minuten",
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
    readTime: "6 Minuten",
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
    readTime: "14 Minuten",
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
    readTime: "12 Minuten",
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
    readTime: "12 Minuten",
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
    readTime: "18 Minuten",
    lastUpdated: "02. Feb. 2026",
    publishDate: "2026-02-02",
    publishTime: "09:00"
  },
  {
    id: "microsoft-copilot-lizenzen",
    title: "Microsoft Copilot Lizenzen 2026: Preise, Vergleich & Empfehlungen",
    description: "Welche Microsoft Copilot Lizenz benötigen Sie? Umfassender Vergleich aller Lizenzmodelle für Microsoft 365 Copilot, GitHub Copilot und Copilot Studio mit aktuellen Preisen.",
    link: "/microsoft-copilot-lizenzen",
    badge: "Lizenzierung",
    icon: "📋",
    readTime: "12 Minuten",
    lastUpdated: "02. Feb. 2026",
    publishDate: "2026-01-15",
    publishTime: "09:00"
  },
  {
    id: "github-copilot",
    title: "GitHub Copilot: Der ultimative Leitfaden für Entwickler",
    description: "Der ultimative Leitfaden für Entwickler: Setup, Best Practices und Advanced Features für produktiveres Coding mit KI-Unterstützung.",
    link: "/github-copilot",
    badge: "Entwicklung",
    icon: "💻",
    readTime: "12 Minuten",
    lastUpdated: "02. Feb. 2026",
    publishDate: "2026-01-10",
    publishTime: "09:00"
  },
  {
    id: "copilot-studio",
    title: "Microsoft Copilot Studio: KI-Agenten und Custom Copilots erstellen",
    description: "Low-Code-Plattform für eigene KI-Agenten: Custom Copilots, Chatbots und Automatisierungen ohne Programmierkenntnisse erstellen.",
    link: "/copilot-studio",
    badge: "Entwicklung",
    icon: "🤖",
    readTime: "10 Minuten",
    lastUpdated: "02. Feb. 2026",
    publishDate: "2026-01-08",
    publishTime: "09:00"
  },
  {
    id: "prompt-engineering",
    title: "Prompt Engineering für Microsoft Copilot: Best Practices",
    description: "Meistern Sie die Kunst des Prompt Engineerings: Praxiserprobte Techniken für effektive Copilot-Prompts in Word, Excel, PowerPoint und mehr.",
    link: "/prompt-engineering",
    badge: "Grundlagen",
    icon: "✨",
    readTime: "15 Minuten",
    lastUpdated: "02. Feb. 2026",
    publishDate: "2026-01-05",
    publishTime: "09:00"
  },
  {
    id: "ki-agenten",
    title: "KI-Agenten im Unternehmen: Autonome Workflows mit Copilot",
    description: "Von der Automatisierung zur Autonomie: Wie KI-Agenten Ihre Geschäftsprozesse transformieren und was das für Ihr Unternehmen bedeutet.",
    link: "/ki-agenten",
    badge: "Fortgeschritten",
    icon: "🧠",
    readTime: "14 Minuten",
    lastUpdated: "02. Feb. 2026",
    publishDate: "2026-01-03",
    publishTime: "09:00"
  },
  {
    id: "copilot-fehler-vermeiden",
    title: "Die 10 häufigsten Copilot-Fehler und wie Sie sie vermeiden",
    description: "Lernen Sie aus den Fehlern anderer: Die häufigsten Stolperfallen bei der Copilot-Nutzung und praxiserprobte Lösungen.",
    link: "/copilot-fehler-vermeiden",
    badge: "Best Practices",
    icon: "⚠️",
    readTime: "11 Minuten",
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
    readTime: "10 Minuten",
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
    readTime: "8 Minuten",
    lastUpdated: "02. Feb. 2026",
    publishDate: "2025-12-10",
    publishTime: "09:00"
  },
  {
    id: "copilot-sicherheit-datenschutz",
    title: "Copilot Sicherheit & Datenschutz: Was Unternehmen wissen müssen",
    description: "DSGVO-Konformität, Datensicherheit und Governance bei Microsoft Copilot: Ein Leitfaden für IT-Verantwortliche.",
    link: "/wissen/copilot-sicherheit-datenschutz",
    badge: "Compliance",
    icon: "🔒",
    readTime: "12 Minuten",
    lastUpdated: "02. Feb. 2026",
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
    readTime: "11 Minuten",
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

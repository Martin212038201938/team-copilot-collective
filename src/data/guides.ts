// ============================================================================
// ZENTRALE GUIDE-/HONEYPOT-DATENBANK
// ============================================================================
// Einzige Quelle der Wahrheit für alle Gated-Downloads ("Honeypots") der
// Kategorie "Guidelines und Checklisten".
//
// Jeder Guide erzeugt:
//   1. eine Landingpage unter /guidelines/<id> (GuideLandingPage)
//   2. einen Eintrag auf der Übersichtsseite /guidelines
//   3. optional eine CTA-Box (HoneypotCTA) in thematisch passenden Artikeln
//
// Workflow für einen neuen Honeypot:
//   1. PDF nach public/downloads/ legen
//   2. Hier einen Eintrag ergänzen (status: "available")
//   3. Route in App.tsx + reactSnap.include (package.json) + generate-sitemap.js
//      um /guidelines/<id> ergänzen (siehe CLAUDE.md Pflicht-Checkliste)
// ============================================================================

export interface GuideData {
  /** URL-Slug: Landingpage liegt unter /guidelines/<id>. Ohne Pfad-Prefix. */
  id: string;
  /** Kurztitel für Karten & CTA-Boxen */
  shortTitle: string;
  /** Vollständiger Titel (H1 der Landingpage) */
  title: string;
  /** Beschreibung für Karten & Meta-Description (max. ~160 Zeichen) */
  description: string;
  /** Kategorie-Badge */
  badge: string;
  /** Symbol/Icon (Emoji oder Zeichen) */
  icon: string;
  /** Zielgruppe (kurz), z.B. "IT-Administratoren & Datenschutzverantwortliche" */
  audience: string;
  /** Pfad zur PDF im public/downloads-Ordner */
  pdfPath: string;
  /** Dateihinweis unter dem Download-Button, z.B. "PDF-Leitfaden" */
  fileMeta: string;
  /** Seitenzahl des PDF (Anzeige auf der Übersicht) */
  pages: number;
  /** "Das steckt drin"-Punkte (Teaser, KEINE vollständige Wiedergabe der PDF) */
  bullets: string[];
  /** Vollständiges Inhaltsverzeichnis des PDF (Anzeige auf der Landingpage) */
  toc: string[];
  /** SEO */
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  publishDate: string;   // ISO "YYYY-MM-DD"
  lastUpdated: string;   // Anzeige-Datum, z.B. "13. Juli 2026"
  /** available = live | coming-soon = angekündigt, noch ohne PDF */
  status: "available" | "coming-soon";
}

/**
 * Gemeinsamer Consent-Text. MUSS mit dem Text in download-lead.php übereinstimmen
 * (dort wird lediglich "[Leitfaden: …]" angehängt).
 */
export const GUIDE_CONSENT_TEXT =
  "Ich willige ein, dass die Copilotenschule (Yellow Boat) mich per E-Mail zu diesem Thema " +
  "sowie zu passenden Angeboten kontaktieren darf. Diese Einwilligung kann ich jederzeit " +
  "formlos widerrufen.";

export const CATEGORY_LABEL = "Guidelines und Checklisten";

// Alle Guides – neueste zuerst
export const ALL_GUIDES: GuideData[] = [
  {
    id: "copilot-grounding-admin-leitfaden",
    shortTitle: "Grounding und Zugriffsbeschränkung für Admins",
    title: "Grounding und Zugriffsbeschränkung für Admins – Microsoft 365 Copilot",
    description:
      "Praxis-Leitfaden für Admins: Wie Grounding funktioniert, wo Oversharing entsteht und wie Sie den Tenant vor dem Copilot-Rollout sauber absichern.",
    badge: "Guidelines und Checklisten",
    icon: "🛡️",
    audience: "IT-Administratoren, M365-Verantwortliche & Datenschutzbeauftragte",
    pdfPath: "/downloads/Copilot-Grounding-Admin-Leitfaden.pdf",
    fileMeta: "PDF-Leitfaden",
    pages: 23,
    bullets: [
      "Wie das Grounding von Microsoft 365 Copilot technisch funktioniert (Semantic Index, Microsoft Graph, Berechtigungen)",
      "Wo Oversharing entsteht: Freigabe-Linktypen und die Falle „Jeder außer externen Benutzern“ (EEEU)",
      "Risiko-Sites identifizieren mit Data-Access-Governance-Berichten (DAG) und DSPM for AI",
      "Sofortmaßnahmen vor dem Rollout: Restricted Content Discovery (RCD) und eingeschränkte SharePoint-Suche auf Hochrisiko-Sites",
      "Nachvollziehen, wer worauf zugegriffen hat – Audit-Log über AccessedResources",
      "Sanierungsfahrplan für Freigabe-Altlasten und eine kompakte Checkliste für den datenschutzkonformen Copilot-Start",
    ],
    toc: [
      "Wichtiger Hinweis / Haftungsausschluss",
      "Checkliste: Grounding sicher gestalten",
      "Grundlagen: Grounding, semantischer Index & Berechtigungen",
      "So lesen Sie die Kapitel (Lizenz-Kennzeichnung)",
      "Teil A · Leitplanken setzen (Prävention)",
      "1 · Standard-Freigabelinktyp festlegen",
      "2 · „Jeder“-Links (Anyone-Links) einschränken",
      "3 · EEEU & „Everyone“-Claims deaktivieren",
      "4 · Externe Freigabe & Gastzugriff steuern",
      "Teil B · Oversharing sichtbar machen (Assessment)",
      "5 · DSPM for AI – Oversharing-Assessment",
      "6 · Data-Access-Governance-Berichte (DAG)",
      "Teil C · Oversharing eindämmen & sanieren",
      "7 · Restricted Content Discovery (RCD)",
      "8 · Restricted SharePoint Search & Restricted Access Control",
      "9 · Site Access Reviews – Sanierung delegieren",
      "Teil D · Inhalte selbst schützen",
      "10 · Sensitivity Labels & Auto-Labeling",
      "11 · DLP-Richtlinie für Microsoft 365 Copilot",
      "12 · Site-Lifecycle & Archivierung",
      "Teil E · Grenzen, Betrieb & Kontrolle",
      "13 · Tenant-Grenze, Gäste & externe Meetings",
      "14 · Web-Grounding (Bing) & Copilot-Zugang steuern",
      "15 · Audit & Kontrolle: CopilotInteraction",
      "Schulung: Grounding & Freigaberegeln für Ihr Team",
      "Quellen (offizielle Microsoft-Dokumentation)",
    ],
    seo: {
      metaTitle: "Grounding und Zugriffsbeschränkung für Admins (PDF) – Copilot-Tenant absichern",
      metaDescription:
        "Kostenloser Admin-Leitfaden zu Microsoft 365 Copilot Grounding: Oversharing erkennen, Risiko-Sites finden, Berechtigungen sanieren und Copilot datenschutzkonform ausrollen.",
      keywords: [
        "Copilot Grounding",
        "Microsoft 365 Copilot Admin",
        "Copilot Oversharing",
        "Restricted Content Discovery",
        "Data Access Governance",
        "Copilot Berechtigungen",
        "Copilot Rollout Checkliste",
      ],
    },
    publishDate: "2026-07-13",
    lastUpdated: "13. Juli 2026",
    status: "available",
  },
  {
    id: "copilot-grounding-management-leitfaden",
    shortTitle: "Grounding und Zugriffsbeschränkung für Management",
    title: "Grounding und Zugriffsbeschränkung für Management & Datenschutz – Microsoft 365 Copilot",
    description:
      "Entscheidungsgrundlage für die rechtssichere Copilot-Bereitstellung: Grounding-Risiken, DSGVO-Pflichten und ein belastbarer Go-Fahrplan – ohne Technik-Kauderwelsch.",
    badge: "Guidelines und Checklisten",
    icon: "⚖️",
    audience: "Geschäftsführung, Datenschutzbeauftragte & Projektverantwortliche",
    pdfPath: "/downloads/Copilot-Grounding-Management-Leitfaden.pdf",
    fileMeta: "PDF-Leitfaden",
    pages: 17,
    bullets: [
      "Was Grounding für die rechtssichere Bereitstellung von Copilot bedeutet – verständlich erklärt, ohne Technik-Kauderwelsch",
      "Welche DSGVO- und Compliance-Risiken durch Oversharing entstehen und wie sie realistisch einzuschätzen sind",
      "Welche Nachweise und Governance-Bausteine Datenschutzbeauftragte vor der Freigabe brauchen",
      "Wie ein Risiko-Assessment zur belastbaren Entscheidungsgrundlage wird – statt Bauchgefühl",
      "Rollen und Verantwortlichkeiten: was IT, Datenschutz und Geschäftsführung jeweils beitragen müssen",
      "Argumentationshilfe für die Budget- und Go-Entscheidung plus ein gestufter, rechtssicherer Rollout-Fahrplan",
    ],
    toc: [
      "Wichtiger Hinweis / Haftungsausschluss",
      "Entscheider-Checkliste: In Schritten zum sicheren Grounding",
      "Grundlagen: Was „Grounding“ bedeutet – und warum es Chefsache ist",
      "So lesen Sie diesen Leitfaden",
      "Teil A · Die Risiken verstehen",
      "1 · Copilot ist berechtigungstreu – und macht Altlasten sichtbar",
      "2 · Freigabe-Altlasten: Gehalt, Finanzen, Verträge",
      "3 · Teams-Chats & Meeting-Transkripte als Dauer-Freigaben",
      "4 · Gäste, Externe & die Tenant-Grenze",
      "5 · Web-Grounding (Bing): Datenabfluss aus der EU",
      "Teil B · Datenschutz & Mitbestimmung",
      "6 · DSGVO-Pflichten rund um Copilot (Kompaktübersicht)",
      "7 · Mitbestimmung: Copilot & Betriebsrat (§ 87 BetrVG)",
      "Teil C · Verantwortung & Steuerung",
      "8 · Wer ist verantwortlich? Rollen & Zuständigkeiten",
      "9 · Was Sie von der IT einfordern sollten",
      "10 · Copilot-Einführung als Governance-Projekt",
      "Schulung: Grounding & Freigaberegeln für Ihr Team",
      "Quellen (offizielle Microsoft-Dokumentation)",
    ],
    seo: {
      metaTitle: "Grounding und Zugriffsbeschränkung für Management (PDF) – rechtssicher bereitstellen",
      metaDescription:
        "Kostenloser Leitfaden für Management & Datenschutz: Copilot rechtssicher bereitstellen. Grounding-Risiken, DSGVO-Pflichten, Rollen und ein belastbarer Go-Fahrplan als PDF.",
      keywords: [
        "Copilot Grounding",
        "Copilot rechtssicher bereitstellen",
        "Microsoft 365 Copilot DSGVO",
        "Copilot Datenschutz",
        "Copilot Management Entscheidung",
        "Copilot Risiko Assessment",
        "Copilot Compliance",
      ],
    },
    publishDate: "2026-07-13",
    lastUpdated: "13. Juli 2026",
    status: "available",
  },
  {
    id: "copilot-grounding-betriebsrat-leitfaden",
    shortTitle: "Grounding und Zugriffsbeschränkung für Betriebsräte",
    title: "Grounding und Zugriffsbeschränkung für Betriebsräte – Microsoft 365 Copilot",
    description:
      "Was Copilots Datenzugriff für die Beschäftigten bedeutet – und wie der Betriebsrat Grounding, Meeting-Transkripte und die Überwachungseignung mitbestimmt.",
    badge: "Guidelines und Checklisten",
    icon: "🤝",
    audience: "Betriebsräte, Personalvertretungen, JAV & Datenschutzbeauftragte",
    pdfPath: "/downloads/Copilot-Grounding-Betriebsrat-Leitfaden.pdf",
    fileMeta: "PDF-Leitfaden",
    pages: 9,
    bullets: [
      "Warum Copilot berechtigungstreu ist – und trotzdem Freigabe-Altlasten mit Personaldaten sichtbar macht",
      "Teams-Transkripte und Aufzeichnungen als dauerhaft auswertbare Daten – die eigentliche Mitbestimmungsfrage",
      "Wann Copilot der Mitbestimmung unterliegt: § 87 Abs. 1 Nr. 6 BetrVG und die Eignung zur Überwachung",
      "Weitere Hebel: Unterrichtung (§ 90), Qualifizierung (§ 97 Abs. 2) und Schulung (§ 37 Abs. 6 BetrVG)",
      "Was in die Betriebsvereinbarung gehört: Zweckbindung, Kontroll-Ausschluss, Transkript- und Purview-Regeln",
      "Fragenkatalog an IT und Arbeitgeber plus eine Checkliste vom ersten Gespräch bis zur unterschriebenen BV",
    ],
    toc: [
      "Wichtiger Hinweis / Haftungsausschluss",
      "Betriebsrats-Checkliste: Schritt für Schritt zum mitbestimmten Grounding",
      "1 · Copilot ist berechtigungstreu – und macht Altlasten sichtbar",
      "2 · Freigabe-Altlasten: wenn Gehalts- und Personaldaten auffindbar werden",
      "3 · Teams-Chats und Meeting-Transkripte als Dauer-Freigaben",
      "4 · Web-Grounding (Bing): Datenabfluss aus der EU",
      "5 · Wann Copilot der Mitbestimmung unterliegt (§ 87 Abs. 1 Nr. 6 BetrVG)",
      "6 · Weitere Hebel: Unterrichtung, Qualifizierung, Schulung",
      "7 · Was in die Betriebsvereinbarung gehört",
      "8 · Fragen, die der Betriebsrat stellen sollte",
      "9 · Schulungsanspruch nach § 37 Abs. 6 BetrVG nutzen",
      "10 · Vom Bedenkenträger zum Gestalter",
      "Schulung: Copilot & Mitbestimmung für Betriebsräte",
      "Quellen & Rechtsgrundlagen",
    ],
    seo: {
      metaTitle: "Grounding und Zugriffsbeschränkung für Betriebsräte (PDF) – Mitbestimmung",
      metaDescription:
        "Kostenloser Leitfaden für Betriebsräte: Was Microsoft 365 Copilot und Grounding für die Beschäftigten bedeuten, wo die Mitbestimmung greift (§ 87 BetrVG) und was in die Betriebsvereinbarung gehört.",
      keywords: [
        "Copilot Betriebsrat",
        "Copilot Mitbestimmung",
        "Microsoft 365 Copilot BetrVG",
        "Copilot Betriebsvereinbarung",
        "Copilot Überwachung § 87",
        "Copilot Grounding Datenschutz",
        "Teams Transkripte Betriebsrat",
      ],
    },
    publishDate: "2026-07-13",
    lastUpdated: "13. Juli 2026",
    status: "available",
  },
  {
    id: "copilot-einfuehren-management-leitfaden",
    shortTitle: "Copilot einführen: Leitfaden fürs Management",
    title: "Microsoft 365 Copilot einführen – der Leitfaden fürs Management",
    description:
      "High-Level-Leitfaden für Entscheider: Warum die meisten Rollouts unter Wert bleiben und wie aus Lizenzen messbare Produktivität wird – Vorgehen, Change und Governance auf den Punkt.",
    badge: "Guidelines und Checklisten",
    icon: "🚀",
    audience: "Geschäftsführung & C-Level, L&D/HR sowie IT- & Projektverantwortliche",
    pdfPath: "/downloads/Copilot-Einfuehrung-Management-Leitfaden.pdf",
    fileMeta: "PDF-Leitfaden",
    pages: 9,
    bullets: [
      "Die Skalierungslücke: nur ~6 % schaffen den Rollout, 80 % sehen keinen messbaren Effekt – und warum das selten an der Technik liegt",
      "Was Nutzung wirklich bringt und was fehlende Begleitung kostet (Adoptions-Lücke, Zeitersparnis, ROI)",
      "Der Rollout-Fahrplan in vier Phasen: Vorbereitung, Pilot & Training, Rollout, Optimierung",
      "Champions & Multiplikatoren als wirksamster Adoptions-Hebel",
      "Governance, Datenschutz & Compliance im Überblick (Grounding, EU AI Act, Betriebsrat) – mit Verweis auf die Detail-Leitfäden",
      "Die häufigsten Fehler bei der Copilot-Einführung und wie Sie sie vermeiden",
    ],
    toc: [
      "Wichtiger Hinweis / Haftungsausschluss",
      "Entscheider-Checkliste: die Weichen vor dem Rollout",
      "1 · Aktiviert ist nicht genutzt – die Skalierungslücke",
      "2 · Was Nutzung bringt – und was fehlende Begleitung kostet",
      "3 · In vier Phasen zum Erfolg",
      "4 · Champions & Multiplikatoren – der wirksamste Hebel",
      "5 · Training an echten Daten – nicht an Beispieldaten",
      "6 · Erfolg messen: Nutzung statt Aktivierung",
      "7 · Governance, Datenschutz & Compliance – im Überblick",
      "8 · Die häufigsten Fehler – und wie Sie sie vermeiden",
      "So begleiten wir Ihre Einführung",
      "Quellen",
    ],
    seo: {
      metaTitle: "Copilot einführen: Leitfaden fürs Management (PDF) – Rollout ohne Fehlstart",
      metaDescription:
        "Kostenloser Management-Leitfaden zur Microsoft-365-Copilot-Einführung: Rollout-Fahrplan in vier Phasen, Change & Adoption, Governance und die häufigsten Fehler – mit Kennzahlen.",
      keywords: [
        "Copilot einführen",
        "Microsoft 365 Copilot Rollout",
        "Copilot Change Management",
        "Copilot Adoption",
        "Copilot Einführung Management",
        "Copilot Champions",
        "Copilot Governance",
      ],
    },
    publishDate: "2026-07-14",
    lastUpdated: "14. Juli 2026",
    status: "available",
  },
  {
    id: "copilot-einfuehren-betriebsrat-leitfaden",
    shortTitle: "Copilot einführen: Leitfaden für Betriebsräte",
    title: "Microsoft 365 Copilot einführen – der Leitfaden für Betriebsräte",
    description:
      "Wie der Betriebsrat die Copilot-Einführung aktiv mitbestimmt und mitgestaltet – Rechte, Vorgehen entlang der Einführungsphasen und die Betriebsvereinbarung auf den Punkt.",
    badge: "Guidelines und Checklisten",
    icon: "🧭",
    audience: "Betriebsräte, Personalvertretungen, JAV & Datenschutzbeauftragte",
    pdfPath: "/downloads/Copilot-Einfuehrung-Betriebsrat-Leitfaden.pdf",
    fileMeta: "PDF-Leitfaden",
    pages: 9,
    bullets: [
      "Warum Copilot mitbestimmungspflichtig ist (§ 87 Abs. 1 Nr. 6 BetrVG) – und warum frühe Beteiligung die Beschäftigten schützt",
      "Die vier Einführungsphasen aus BR-Sicht: Unterrichtung, Betriebsvereinbarung & Schulung, Begleitung, Evaluation",
      "Die Betriebsvereinbarung als zentrales Instrument – die wichtigsten Regelungspunkte",
      "Ihre Mitbestimmungs- und Beteiligungsrechte im Überblick (§ 90, § 97 Abs. 2, § 37 Abs. 6 BetrVG)",
      "Kompetenz des Gremiums sichern und mit belastbaren Zahlen argumentieren (Adoption, Training, Rollout-Realität)",
      "Vom Bedenkenträger zum Gestalter – plus Verweis auf den Grounding-Detail-Leitfaden für Betriebsräte",
    ],
    toc: [
      "Wichtiger Hinweis / Haftungsausschluss",
      "Betriebsrats-Checkliste für die Copilot-Einführung",
      "1 · Warum Copilot ein Mitbestimmungsthema ist",
      "2 · Warum frühe Beteiligung im Interesse der Beschäftigten ist",
      "3 · Die vier Phasen aus Sicht des Betriebsrats",
      "4 · Die Betriebsvereinbarung als zentrales Instrument",
      "5 · Ihre Mitbestimmungs- und Beteiligungsrechte im Überblick",
      "6 · Kompetenz des Gremiums sichern",
      "7 · Grounding & Datenschutz – kurz erklärt",
      "8 · Vom Bedenkenträger zum Gestalter",
      "Schulung: Copilot & Mitbestimmung für Betriebsräte",
      "Quellen & Rechtsgrundlagen",
    ],
    seo: {
      metaTitle: "Copilot einführen: Leitfaden für Betriebsräte (PDF) – Einführung mitgestalten",
      metaDescription:
        "Kostenloser Leitfaden für Betriebsräte zur Microsoft-365-Copilot-Einführung: Mitbestimmung (§ 87 BetrVG), die vier Phasen aus BR-Sicht, Betriebsvereinbarung und Schulungsrechte.",
      keywords: [
        "Copilot Betriebsrat Einführung",
        "Copilot Mitbestimmung",
        "Betriebsvereinbarung Copilot",
        "§ 87 BetrVG Copilot",
        "Copilot Rollout Betriebsrat",
        "Betriebsrat Schulung Copilot",
        "Copilot Personalvertretung",
      ],
    },
    publishDate: "2026-07-14",
    lastUpdated: "14. Juli 2026",
    status: "available",
  },
  {
    id: "copilot-einfuehren-admin-leitfaden",
    shortTitle: "Copilot einführen: Leitfaden für Admins",
    title: "Microsoft 365 Copilot einführen – der Leitfaden für Admins",
    description:
      "Der technische Fahrplan nach den offiziellen Microsoft-Empfehlungen: Voraussetzungen, Lizenzzuweisung, Governance mit Purview und Monitoring – vom Pilot bis zum Betrieb.",
    badge: "Guidelines und Checklisten",
    icon: "⚙️",
    audience: "IT-Administratoren, M365-/SharePoint-/Purview-/Entra-Verantwortliche & Einführungsteams",
    pdfPath: "/downloads/Copilot-Einfuehrung-Admin-Leitfaden.pdf",
    fileMeta: "PDF-Leitfaden",
    pages: 9,
    bullets: [
      "Die Pflicht-Voraussetzungen von Microsoft: Copilot-Lizenz-Add-on, Exchange-Online-Postfach, Entra ID, aktuelle Apps und freigegebene Netzwerk-Endpunkte",
      "Warum die Datengrundlage die eigentliche Hürde ist – Oversharing, SharePoint Advanced Management und Restricted SharePoint Search",
      "Der technische Rollout in vier Phasen: Vorbereitung, Pilot, Rollout, Betrieb",
      "Governance & Sicherheit mit Microsoft Purview (Sensitivity Labels, DLP, Audit, DSPM for AI) und EU Data Boundary",
      "Rollen (AI-Administrator & Co.) und Monitoring über Readiness-/Nutzungsbericht und Copilot Dashboard",
      "Extensibility governen (Agenten & Connectoren) plus die häufigsten Fehler bei der Bereitstellung",
    ],
    toc: [
      "Wichtiger Hinweis / Haftungsausschluss",
      "Admin-Checkliste für die Copilot-Einführung",
      "1 · Die Pflicht-Voraussetzungen von Microsoft",
      "2 · Die eigentliche Hürde: Datengrundlage & Berechtigungen",
      "3 · Der technische Rollout in vier Phasen",
      "4 · Governance & Sicherheit mit Microsoft Purview",
      "5 · Rollen & Zuständigkeiten",
      "6 · Monitoring: aktiviert ist nicht genutzt",
      "7 · Extensibility governen: Agenten & Connectoren",
      "8 · Die häufigsten Fehler bei der Bereitstellung",
      "So begleiten wir Ihre Einführung",
      "Quellen",
    ],
    seo: {
      metaTitle: "Copilot einführen: Leitfaden für Admins (PDF) – sicher bereitstellen",
      metaDescription:
        "Kostenloser Admin-Leitfaden zur Microsoft-365-Copilot-Einführung nach offiziellen Microsoft-Empfehlungen: Voraussetzungen, Lizenzzuweisung, Purview-Governance, Rollen und Monitoring.",
      keywords: [
        "Copilot einführen Admin",
        "Microsoft 365 Copilot Deployment",
        "Copilot Voraussetzungen",
        "Copilot Lizenz zuweisen",
        "Copilot Purview Governance",
        "AI Administrator Copilot",
        "Copilot Dashboard Monitoring",
      ],
    },
    publishDate: "2026-07-14",
    lastUpdated: "14. Juli 2026",
    status: "available",
  },
];

export const getGuide = (id: string): GuideData | undefined =>
  ALL_GUIDES.find((g) => g.id === id);

export const getAvailableGuides = (): GuideData[] =>
  ALL_GUIDES.filter((g) => g.status === "available");

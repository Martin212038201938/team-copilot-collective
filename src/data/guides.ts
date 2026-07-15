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
  /** "Das steckt drin"-Punkte (Teaser, KEINE vollständige Wiedergabe der PDF) */
  bullets: string[];
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
    shortTitle: "Copilot Grounding: Admin-Leitfaden",
    title: "Microsoft 365 Copilot Grounding – der Admin-Leitfaden",
    description:
      "Praxis-Leitfaden für Admins: Wie Grounding funktioniert, wo Oversharing entsteht und wie Sie den Tenant vor dem Copilot-Rollout sauber absichern.",
    badge: "Guidelines und Checklisten",
    icon: "🛡️",
    audience: "IT-Administratoren, M365-Verantwortliche & Datenschutzbeauftragte",
    pdfPath: "/downloads/Copilot-Grounding-Admin-Leitfaden.pdf",
    fileMeta: "PDF-Leitfaden",
    bullets: [
      "Wie das Grounding von Microsoft 365 Copilot technisch funktioniert (Semantic Index, Microsoft Graph, Berechtigungen)",
      "Wo Oversharing entsteht: Freigabe-Linktypen und die Falle „Jeder außer externen Benutzern“ (EEEU)",
      "Risiko-Sites identifizieren mit Data-Access-Governance-Berichten (DAG) und DSPM for AI",
      "Sofortmaßnahmen vor dem Rollout: Restricted Content Discovery (RCD) und eingeschränkte SharePoint-Suche auf Hochrisiko-Sites",
      "Nachvollziehen, wer worauf zugegriffen hat – Audit-Log über AccessedResources",
      "Sanierungsfahrplan für Freigabe-Altlasten und eine kompakte Checkliste für den datenschutzkonformen Copilot-Start",
    ],
    seo: {
      metaTitle: "Copilot Grounding: Admin-Leitfaden (PDF) – Tenant richtig absichern",
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
    shortTitle: "Copilot Grounding: Management-Leitfaden",
    title: "Microsoft 365 Copilot Grounding – der Leitfaden für Management & Datenschutz",
    description:
      "Entscheidungsgrundlage für die rechtssichere Copilot-Bereitstellung: Grounding-Risiken, DSGVO-Pflichten und ein belastbarer Go-Fahrplan – ohne Technik-Kauderwelsch.",
    badge: "Guidelines und Checklisten",
    icon: "⚖️",
    audience: "Geschäftsführung, Datenschutzbeauftragte & Projektverantwortliche",
    pdfPath: "/downloads/Copilot-Grounding-Management-Leitfaden.pdf",
    fileMeta: "PDF-Leitfaden",
    bullets: [
      "Was Grounding für die rechtssichere Bereitstellung von Copilot bedeutet – verständlich erklärt, ohne Technik-Kauderwelsch",
      "Welche DSGVO- und Compliance-Risiken durch Oversharing entstehen und wie sie realistisch einzuschätzen sind",
      "Welche Nachweise und Governance-Bausteine Datenschutzbeauftragte vor der Freigabe brauchen",
      "Wie ein Risiko-Assessment zur belastbaren Entscheidungsgrundlage wird – statt Bauchgefühl",
      "Rollen und Verantwortlichkeiten: was IT, Datenschutz und Geschäftsführung jeweils beitragen müssen",
      "Argumentationshilfe für die Budget- und Go-Entscheidung plus ein gestufter, rechtssicherer Rollout-Fahrplan",
    ],
    seo: {
      metaTitle: "Copilot Grounding: Management-Leitfaden (PDF) – rechtssicher bereitstellen",
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
    shortTitle: "Copilot Grounding: Leitfaden für Betriebsräte",
    title: "Microsoft 365 Copilot Grounding – der Leitfaden für Betriebsräte",
    description:
      "Was Copilots Datenzugriff für die Beschäftigten bedeutet – und wie der Betriebsrat Grounding, Meeting-Transkripte und die Überwachungseignung mitbestimmt.",
    badge: "Guidelines und Checklisten",
    icon: "🤝",
    audience: "Betriebsräte, Personalvertretungen, JAV & Datenschutzbeauftragte",
    pdfPath: "/downloads/Copilot-Grounding-Betriebsrat-Leitfaden.pdf",
    fileMeta: "PDF-Leitfaden",
    bullets: [
      "Warum Copilot berechtigungstreu ist – und trotzdem Freigabe-Altlasten mit Personaldaten sichtbar macht",
      "Teams-Transkripte und Aufzeichnungen als dauerhaft auswertbare Daten – die eigentliche Mitbestimmungsfrage",
      "Wann Copilot der Mitbestimmung unterliegt: § 87 Abs. 1 Nr. 6 BetrVG und die Eignung zur Überwachung",
      "Weitere Hebel: Unterrichtung (§ 90), Sachverstand (§ 80 Abs. 3), Qualifizierung (§ 97 Abs. 2), Schulung (§ 37 Abs. 6)",
      "Was in die Betriebsvereinbarung gehört: Zweckbindung, Kontroll-Ausschluss, Transkript- und Purview-Regeln",
      "Fragenkatalog an IT und Arbeitgeber plus eine Checkliste vom ersten Gespräch bis zur unterschriebenen BV",
    ],
    seo: {
      metaTitle: "Copilot & Betriebsrat: Grounding-Leitfaden (PDF) – Mitbestimmung sichern",
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
    bullets: [
      "Die Skalierungslücke: nur ~6 % schaffen den Rollout, 80 % sehen keinen messbaren Effekt – und warum das selten an der Technik liegt",
      "Was Nutzung wirklich bringt und was fehlende Begleitung kostet (Adoptions-Lücke, Zeitersparnis, ROI)",
      "Der Rollout-Fahrplan in vier Phasen: Vorbereitung, Pilot & Training, Rollout, Optimierung",
      "Champions & Multiplikatoren als wirksamster Adoptions-Hebel",
      "Governance, Datenschutz & Compliance im Überblick (Grounding, EU AI Act, Betriebsrat) – mit Verweis auf die Detail-Leitfäden",
      "Die häufigsten Fehler bei der Copilot-Einführung und wie Sie sie vermeiden",
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
    bullets: [
      "Warum Copilot mitbestimmungspflichtig ist (§ 87 Abs. 1 Nr. 6 BetrVG) – und warum frühe Beteiligung die Beschäftigten schützt",
      "Die vier Einführungsphasen aus BR-Sicht: Unterrichtung, Betriebsvereinbarung & Schulung, Begleitung, Evaluation",
      "Die Betriebsvereinbarung als zentrales Instrument – die wichtigsten Regelungspunkte",
      "Ihre Mitbestimmungs- und Beteiligungsrechte im Überblick (§ 90, § 97 Abs. 2, § 37 Abs. 6 BetrVG)",
      "Kompetenz des Gremiums sichern und mit belastbaren Zahlen argumentieren (Adoption, Training, Rollout-Realität)",
      "Vom Bedenkenträger zum Gestalter – plus Verweis auf den Grounding-Detail-Leitfaden für Betriebsräte",
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
];

export const getGuide = (id: string): GuideData | undefined =>
  ALL_GUIDES.find((g) => g.id === id);

export const getAvailableGuides = (): GuideData[] =>
  ALL_GUIDES.filter((g) => g.status === "available");

import { Brain, Users, TrendingUp, Shield, Clock, Laptop, Zap, Scale, Lightbulb, Mic, GraduationCap, PartyPopper, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type CopilotTier = "free" | "paid";

export interface TrainingFAQ {
  question: string;
  answer: string;
}

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
  // FAQ für strukturierte Daten
  faqs?: TrainingFAQ[];
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
    keywords: ["Copilot Grundlagen", "Prompt Engineering Training", "KI-Kompetenz Schulung", "Microsoft Copilot Einsteiger", "Prompt Design lernen"],
    faqs: [
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
      }
    ]
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
    keywords: ["KI Ausbildung", "Wissensarbeiter Training", "Copilot Intensivkurs", "KI-Kompetenz Zertifikat", "Microsoft Copilot Ausbildung"],
    faqs: [
      {
        question: "Wie kann ich meine Mitarbeiter systematisch in KI ausbilden – nicht nur einmalig schulen?",
        answer: "Einmalige Trainings verpuffen oft schnell. Nachhaltiger Kompetenzaufbau erfordert ein strukturiertes Ausbildungsprogramm: Grundlagen verstehen, jede Office-App einzeln meistern, praktische Use Cases umsetzen, Peer Learning und am Ende eine persönliche Prompt-Bibliothek für wiederkehrende Aufgaben. So wird KI-Kompetenz zur dauerhaften Fähigkeit statt zum einmaligen Workshop-Erlebnis."
      },
      {
        question: "Gibt es ein KI-Zertifikat, das meine Mitarbeiter für HR nachweisen können?",
        answer: "Ja, nach erfolgreicher Teilnahme an einem umfassenden KI-Ausbildungsprogramm erhalten Mitarbeiter ein Zertifikat, das ihre KI-Kompetenz dokumentiert. Das ist nicht nur für die Personalentwicklung relevant, sondern auch für die EU AI Act Compliance, die nachweisbare KI-Schulungen fordert."
      },
      {
        question: "Welche KI-Kompetenzen brauchen Büromitarbeiter eigentlich konkret?",
        answer: "Für Wissensarbeiter sind fünf Kernkompetenzen entscheidend: 1) Effektive Prompts formulieren, 2) KI-Outputs kritisch bewerten, 3) Copilot in Office-Apps produktiv nutzen, 4) Cross-App-Workflows beherrschen (z.B. Präsentation aus E-Mail-Thread), 5) Eine persönliche Prompt-Bibliothek für wiederkehrende Aufgaben aufbauen. Diese Fähigkeiten machen den Unterschied zwischen KI-Nutzung und KI-Produktivität."
      },
      {
        question: "Wie lange dauert es, bis Mitarbeiter wirklich produktiv mit KI arbeiten können?",
        answer: "Die Grundlagen sind in einem halben Tag vermittelt. Für echte Produktivitätssteigerung im Alltag – also das sichere Beherrschen aller relevanten Apps und Workflows – sollten Sie mit 2 intensiven Tagen oder einer 8-wöchigen Lernreise rechnen. Der Vorteil der Lernreise: Zwischen den Sessions wenden Mitarbeiter das Gelernte direkt an und kommen mit echten Fragen zurück."
      }
    ]
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
    keywords: ["GitHub Copilot Training", "Entwickler Schulung", "AI Coding", "Copilot VS Code", "GitHub Copilot Unternehmen"],
    faqs: [
      {
        question: "Lohnt sich GitHub Copilot für unser Entwicklerteam – was bringt es wirklich?",
        answer: "Studien zeigen 30-55% schnellere Code-Completion und bis zu 46% weniger Zeit für repetitive Coding-Tasks. Der größte Nutzen liegt bei Boilerplate-Code, Unit Tests, Dokumentation und dem Verstehen von Legacy-Code. Ob sich die Investition lohnt, hängt von Ihrem Tech-Stack und den typischen Aufgaben ab – erfahrungsgemäß ist der ROI bei Teams, die viel testen, dokumentieren oder in mehreren Sprachen arbeiten, am höchsten."
      },
      {
        question: "Können unsere Entwickler mit KI auch Code debuggen und refactoren – nicht nur generieren?",
        answer: "Ja, GitHub Copilot ist weit mehr als Code-Completion. Der Copilot Chat erklärt komplexen Code, identifiziert Bugs, schlägt Refactorings vor und kann sogar Security-Vulnerabilities erkennen. Besonders wertvoll: Legacy-Code verstehen und modernisieren, ohne stundenlang Dokumentation zu wälzen."
      },
      {
        question: "Ist es sicher, GitHub Copilot im Unternehmen einzusetzen – was passiert mit unserem Code?",
        answer: "Bei GitHub Copilot Business und Enterprise wird Ihr Code nicht für das Training des Modells verwendet und nicht gespeichert. Sie können Content Exclusions konfigurieren, um sensible Repositories auszuschließen. Audit Logs dokumentieren die Nutzung, und Sie behalten volle Kontrolle über die Policies. Damit ist DSGVO-konformer Einsatz möglich."
      },
      {
        question: "Wie konfiguriere ich GitHub Copilot optimal für mein Entwicklerteam?",
        answer: "Die richtige Konfiguration macht den Unterschied: IDE-spezifische Einstellungen (VS Code, JetBrains), Team-Policies für Code-Suggestions, Content Exclusions für sensible Bereiche, und projektspezifische Instructions in .github/copilot-instructions.md. Dazu kommen Workflows für PR-Beschreibungen, Commit Messages und Code Reviews. Ohne gute Einrichtung nutzen Teams nur 30% des Potenzials."
      }
    ]
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
    keywords: ["Copilot DSGVO", "KI Compliance Training", "EU AI Act Schulung", "Copilot Datenschutz", "rechtssichere KI-Nutzung"],
    faqs: [
      {
        question: "Dürfen meine Mitarbeiter Firmendaten in Microsoft Copilot eingeben?",
        answer: "Bei Microsoft 365 Copilot (der kostenpflichtigen Version) bleiben Ihre Daten innerhalb Ihres Microsoft-Tenants und werden nicht für Modelltraining verwendet. Trotzdem gelten Regeln: Keine personenbezogenen Daten ohne Rechtsgrundlage, keine Betriebsgeheimnisse in Prompts, die intern geteilt werden könnten. Ein klares Datenklassifizierungs-Konzept und Mitarbeiter-Guidelines sind essenziell."
      },
      {
        question: "Ist Microsoft Copilot DSGVO-konform – und wie dokumentiere ich das?",
        answer: "Microsoft 365 Copilot kann DSGVO-konform eingesetzt werden, da die Datenverarbeitung innerhalb der EU erfolgt und Microsoft als Auftragsverarbeiter agiert. Sie benötigen jedoch: eine Rechtsgrundlage für die Verarbeitung, eine Aktualisierung Ihres Verarbeitungsverzeichnisses, ggf. eine Datenschutz-Folgenabschätzung, und geschulte Mitarbeiter. Die Dokumentationspflichten sind konkret – Checklisten und Templates beschleunigen die Compliance."
      },
      {
        question: "Was muss ich beim EU AI Act beachten, wenn wir Copilot einsetzen?",
        answer: "Microsoft Copilot fällt als 'KI-System mit geringem Risiko' unter die Transparenzpflichten des EU AI Act. Für Sie als Unternehmen bedeutet das: Mitarbeiter müssen wissen, dass sie mit KI interagieren, KI-generierte Inhalte sollten als solche erkennbar sein, und Ihre Mitarbeiter brauchen nachweisbare KI-Kompetenz (Artikel 4). Die konkreten Anforderungen variieren je nach Anwendungsfall."
      },
      {
        question: "Welche Risiken gibt es bei der KI-Nutzung im Unternehmen?",
        answer: "Die größten Risiken: Unbeabsichtigte Weitergabe sensibler Daten, Urheberrechtsverletzungen durch KI-generierte Inhalte, Haftungsfragen bei falschen KI-Outputs, und Compliance-Verstöße durch ungeschulte Mitarbeiter. All diese Risiken sind managebar – mit klaren Policies, technischen Guardrails (DLP, Information Protection) und regelmäßigen Schulungen."
      }
    ]
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
    keywords: ["Copilot Strategie", "Copilot Rollout", "Change Management KI", "Copilot ROI", "Copilot Einführung Unternehmen"],
    faqs: [
      {
        question: "Wie führe ich Microsoft Copilot erfolgreich im Unternehmen ein – ohne dass es flopp?",
        answer: "Die meisten gescheiterten Copilot-Rollouts haben drei Ursachen: keine klare Strategie (wer bekommt wann Lizenzen?), fehlende Use-Case-Priorisierung (wo bringt Copilot wirklich Mehrwert?) und mangelndes Change Management (Mitarbeiter fühlen sich überrumpelt). Ein erfolgreicher Rollout startet mit einer Pilotgruppe, misst konkrete Erfolge, baut Champions auf und skaliert dann schrittweise."
      },
      {
        question: "Wie berechne ich den ROI von Microsoft Copilot für unseren Business Case?",
        answer: "Der ROI setzt sich aus Zeitersparnis (typisch 5-10 Stunden pro Mitarbeiter pro Monat), Qualitätsverbesserung (weniger Fehler, bessere Dokumente) und strategischem Wert (schnellere Entscheidungen, Innovation) zusammen. Für den Business Case: Identifizieren Sie 3-5 High-Impact-Prozesse, messen Sie den Zeitaufwand vorher/nachher, und rechnen Sie mit Stundensätzen. Typische Amortisation: 3-6 Monate bei gezieltem Einsatz."
      },
      {
        question: "Was sind die größten Fehler bei der Copilot-Einführung?",
        answer: "Die Top-5-Fehler: 1) Lizenzen ausrollen ohne Schulung, 2) Keine klaren Use Cases definieren, 3) Keinen Erfolg messen (dann kann niemand den Wert belegen), 4) IT entscheidet ohne Einbindung der Fachabteilungen, 5) Keine Champions aufbauen, die andere begeistern. Die gute Nachricht: All diese Fehler sind vermeidbar mit einer durchdachten Rollout-Strategie."
      },
      {
        question: "Wie überwinde ich Widerstände meiner Mitarbeiter gegen KI?",
        answer: "Widerstände entstehen meist aus Angst (Jobverlust), Unsicherheit (Überforderung) oder schlechten Erfahrungen (KI liefert schlechte Ergebnisse). Die Lösung: Transparent kommunizieren (KI als Assistenz, nicht Ersatz), niedrigschwellig einführen (mit einfachen, sofort nützlichen Use Cases starten), schnelle Erfolgserlebnisse ermöglichen, und Champions aus der Belegschaft aufbauen, die Kollegen mitnehmen."
      }
    ]
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
    keywords: ["Chatbot Workshop", "Copilot Studio Chatbot", "KI-Assistent entwickeln", "Unternehmens-Chatbot", "Teams Bot erstellen"],
    faqs: [
      {
        question: "Wie schnell kann ich einen funktionierenden Chatbot für mein Team erstellen?",
        answer: "Mit der richtigen Vorbereitung (Use Case definiert, Datenquellen identifiziert) kann ein funktionsfähiger Chatbot in einem Tag entstehen – inklusive Anbindung an SharePoint und Deployment in Microsoft Teams. Das ist keine leere Versprechung: In einem Hands-on-Workshop bauen Sie den Bot Schritt für Schritt selbst, nicht nur in der Theorie."
      },
      {
        question: "Können wir einen FAQ-Bot bauen, der Fragen aus unseren internen Dokumenten beantwortet?",
        answer: "Ja, genau das ist eine der Kernfunktionen von Microsoft Copilot Studio. Sie verbinden den Bot mit Ihrem SharePoint, internen Wiki oder FAQ-Dokumenten, und er beantwortet Fragen basierend auf diesen Quellen. Wichtig: Je besser Ihre Dokumentation strukturiert ist, desto präziser die Antworten."
      },
      {
        question: "Was brauche ich, um nach dem Workshop den Chatbot selbst weiterzuentwickeln?",
        answer: "Nach einem guten Workshop haben Sie: einen funktionierenden Bot, eine Dokumentation der Architektur und Konfiguration, Verständnis der Copilot Studio-Plattform, und Know-how für Optimierung und Erweiterung. Die Wartung ist dann Low-Code – neue Inhalte hinzufügen, Antworten verbessern, Edge Cases abfangen. Für größere Erweiterungen können Sie auf das erlernte Wissen aufbauen."
      },
      {
        question: "Für welche Abteilungen eignet sich ein Chatbot am besten?",
        answer: "Die höchste Wirkung erzielen Chatbots dort, wo viele wiederkehrende Fragen anfallen: HR (Urlaubsregelungen, Benefits, Onboarding), IT-Support (Anleitungen, Passwort-Reset, Standard-Probleme), Kundenservice (FAQs, Produktinfos) und Wissensmanagement (interne Richtlinien, Prozessdokumentation). Je höher das Frageaufkommen und je standardisierter die Antworten, desto größer der Nutzen."
      }
    ]
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
    keywords: ["Low-Code Training", "Power Platform Schulung", "Citizen Developer", "Power Apps Copilot", "Power Automate Training"],
    faqs: [
      {
        question: "Können meine Fachabteilungen eigene Apps bauen – ohne auf die IT warten zu müssen?",
        answer: "Ja, das ist die Idee von Citizen Development mit der Microsoft Power Platform. Business-User können mit Power Apps eigene Anwendungen erstellen, mit Power Automate Workflows automatisieren – und Copilot hilft dabei mit natürlicher Sprache. Wichtig: Ein Governance-Framework stellt sicher, dass keine Schatten-IT entsteht und Sicherheitsstandards eingehalten werden."
      },
      {
        question: "Wie kann ich Geschäftsprozesse automatisieren, ohne programmieren zu können?",
        answer: "Power Automate ermöglicht Workflow-Automatisierung per Drag-and-Drop und natürlicher Sprache. Genehmigungsprozesse, E-Mail-Benachrichtigungen, Datensynchronisation zwischen Systemen – alles ohne Code. Mit Copilot beschreiben Sie einfach, was passieren soll ('Wenn eine neue Rechnung in SharePoint landet, benachrichtige den Abteilungsleiter und erstelle einen Eintrag in Excel'), und der Flow wird generiert."
      },
      {
        question: "Wie verhindere ich, dass Citizen Development zur Schatten-IT wird?",
        answer: "Governance ist der Schlüssel: Environment-Strategie (wer darf wo entwickeln), DLP-Policies (welche Daten dürfen wohin fließen), Approval-Prozesse für produktive Apps, und regelmäßige Reviews. Das Power Platform Admin Center gibt IT-Abteilungen volle Kontrolle und Transparenz, während Fachabteilungen trotzdem eigenständig arbeiten können."
      },
      {
        question: "Kann Copilot mir wirklich helfen, Apps und Flows zu erstellen?",
        answer: "Ja, Copilot in Power Apps und Power Automate ist erstaunlich leistungsfähig. Sie beschreiben Ihre App oder Ihren Workflow in natürlicher Sprache, und Copilot generiert den ersten Entwurf. Für Formeln und Logik können Sie Copilot fragen, was Sie erreichen wollen – er schlägt die passende Syntax vor. Das beschleunigt die Entwicklung enorm, ersetzt aber nicht das Verständnis der Plattform."
      }
    ]
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
    keywords: ["EU AI Act Schulung", "Artikel 4 KI-Kompetenz", "KI Pflichtschulung", "AI Act Training", "KI Compliance Zertifikat"],
    faqs: [
      {
        question: "Müssen alle Mitarbeiter, die Copilot nutzen, zum EU AI Act geschult werden?",
        answer: "Ja, Artikel 4 des EU AI Act fordert, dass Personen, die KI-Systeme bedienen oder überwachen, über ausreichende KI-Kompetenz verfügen müssen. Das betrifft faktisch alle Mitarbeiter, die Microsoft Copilot oder andere KI-Tools nutzen. Die Schulung muss nachweisbar sein – ein Zertifikat oder Schulungsnachweis ist für Audits wichtig."
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
        answer: "Für die Nachweisführung brauchen Sie: Schulungszertifikate oder -nachweise pro Mitarbeiter, Dokumentation der Schulungsinhalte (welche KI-Kompetenzen wurden vermittelt), Datum und Dauer der Schulung, und idealerweise eine Anwesenheitsliste. Ein professioneller Schulungsnachweis mit konkreten Lerninhalten erfüllt die Anforderungen und gibt Sicherheit bei Behördenanfragen."
      }
    ]
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
    keywords: ["Copilot Hackathon", "KI Innovation Workshop", "Business Hackathon", "Copilot Team Event", "KI ohne Code"],
    faqs: [
      {
        question: "Wie kann ich mein Team spielerisch an KI heranführen – ohne trockene Schulungen?",
        answer: "Ein Hackathon-Format ist ideal: Teams treten gegeneinander an, lösen echte Geschäftsprobleme mit Copilot, und am Ende werden die besten Lösungen gekürt. Das erzeugt Energie, baut Berührungsängste ab und zeigt sofort, was KI kann. Keine PowerPoint-Folien, sondern Hands-on-Erfahrung mit Wettbewerbscharakter."
      },
      {
        question: "Gibt es KI-Innovationsformate speziell für Nicht-Entwickler?",
        answer: "Ja, Business-Hackathons sind für Fachabteilungen konzipiert – keine Programmierkenntnisse nötig. Die Teilnehmer nutzen Copilot, um Workflows zu optimieren, Prompts für typische Aufgaben zu entwickeln oder kreative Lösungen für Geschäftsprobleme zu finden. Der Fokus liegt auf Anwendung, nicht auf Technik."
      },
      {
        question: "Was kommt bei einem KI-Hackathon konkret heraus?",
        answer: "Handfeste Ergebnisse: Funktionierende Prompt-Templates für wiederkehrende Aufgaben, automatisierte Workflows, dokumentierte Best Practices, und oft überraschende Ideen, auf die niemand allein gekommen wäre. Dazu: Teambuilding, KI-Kompetenzaufbau und Begeisterung für die neuen Möglichkeiten. Die besten Lösungen können direkt im Arbeitsalltag eingesetzt werden."
      },
      {
        question: "Wie überzeuge ich mein Management von einem KI-Hackathon?",
        answer: "Die Argumente: 1) Kombination aus Schulung und Teambuilding, 2) Konkrete Ergebnisse statt nur Wissensvermittlung, 3) Identifikation von High-Impact-Use-Cases aus der Belegschaft, 4) Messbare Outputs (Prompts, Workflows, Ideen), 5) Positive Change-Management-Wirkung (Mitarbeiter werden zu KI-Botschaftern). Der ROI ist oft höher als bei klassischen Trainings."
      }
    ]
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
    keywords: ["Copilot Keynote", "KI Vortrag", "Copilot Führungskräfte", "KI Transformation", "Microsoft Copilot Speaker"],
    faqs: [
      {
        question: "Wer kann bei uns eine inspirierende KI-Keynote für Führungskräfte halten?",
        answer: "Für eine wirkungsvolle KI-Keynote brauchen Sie jemanden, der Microsoft Copilot nicht nur kennt, sondern täglich einsetzt und die Transformation in Unternehmen begleitet. Idealerweise mit Live-Demos, die beeindrucken (nicht nur Folien), konkreten Praxisbeispielen aus deutschen Unternehmen, und der Fähigkeit, sowohl technische als auch strategische Fragen zu beantworten."
      },
      {
        question: "Wie erkläre ich unserem Vorstand die Chancen und Risiken von Microsoft Copilot?",
        answer: "Eine Executive-Keynote adressiert genau das: Vision (wie verändert KI die Arbeitswelt?), konkreter Nutzen (welche Produktivitätsgewinne sind realistisch?), ROI-Perspektive (wie rechnet sich die Investition?), Risiken (Compliance, Change, Fehlnutzung) und Erfolgsfaktoren (was unterscheidet erfolgreiche Einführungen?). Mit Live-Demos wird das Potenzial greifbar."
      },
      {
        question: "Was sollte eine Copilot-Keynote für ein All-Hands-Meeting beinhalten?",
        answer: "Für ein breites Publikum: Einordnung (was ist KI, was kann Copilot?), beeindruckende Live-Demos (die 'Wow'-Momente erzeugen), Praxisbeispiele (konkrete Anwendungen aus Word, Excel, Teams), Ausblick (was kommt noch?), und die Botschaft, dass KI unterstützt statt ersetzt. Dauer typisch: 60-90 Minuten inkl. Q&A."
      },
      {
        question: "Wie nehme ich Mitarbeiter mit, die Angst vor KI haben?",
        answer: "Eine gute Keynote adressiert Ängste direkt: KI als Assistent, nicht als Ersatz; Beispiele, wie KI nervige Routineaufgaben abnimmt (statt Jobs zu vernichten); die Botschaft, dass KI-Kompetenz eine Chance ist. Wichtig: Ehrlich über Grenzen sprechen, keine übertriebenen Versprechungen, und zeigen, dass Menschen die Kontrolle behalten."
      }
    ]
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
    keywords: ["Copilot Lernreise", "Copilot 8 Wochen", "nachhaltiges KI-Training", "Copilot Blended Learning", "Copilot Kompetenzaufbau"],
    faqs: [
      {
        question: "Wie stellen wir sicher, dass KI-Training nachhaltig wirkt und nicht nach einer Woche vergessen ist?",
        answer: "Das Problem kennen viele: Nach einem eintägigen Workshop verpufft das Wissen schnell. Die Lösung: Ein Lernreise-Format über mehrere Wochen. Jede Woche ein neues Thema, dazwischen praktische Anwendung im Arbeitsalltag, und in der nächsten Session werden echte Fragen aus der Praxis geklärt. So wird Copilot zur Gewohnheit, nicht zum einmaligen Event."
      },
      {
        question: "Gibt es Copilot-Training, das über mehrere Wochen geht statt an einem Tag?",
        answer: "Ja, eine 8-wöchige Lernreise mit wöchentlichen 2-Stunden-Sessions ist ideal für nachhaltigen Kompetenzaufbau. Jede Woche ein neuer Schwerpunkt (Word, Excel, PowerPoint...), jede Woche ein praktischer Use Case zum Umsetzen. Zwischen den Sessions: echte Anwendung, Peer Learning, Support-Kanal für Fragen. So wird KI-Kompetenz zur dauerhaften Fähigkeit."
      },
      {
        question: "Wie viel Zeit müssen meine Mitarbeiter für eine Copilot-Lernreise einplanen?",
        answer: "2 Stunden pro Woche für die Live-Session, plus ca. 30-60 Minuten für die praktische Umsetzung des wöchentlichen Use Cases im Arbeitsalltag. Insgesamt also 2,5-3 Stunden pro Woche über 8 Wochen. Das ist überschaubar und lässt sich gut in den Arbeitsalltag integrieren – anders als ein Ganztags-Workshop, der den Kalender blockiert."
      },
      {
        question: "Was unterscheidet eine Lernreise von einem kompakten Workshop?",
        answer: "Der entscheidende Unterschied: Transfer in die Praxis. Bei einem Tagesworkshop lernen Mitarbeiter viel auf einmal, aber setzen es danach oft nicht um. Bei einer Lernreise kommt jede Woche ein neues Thema – klein genug, um es sofort anzuwenden. Die nächste Session startet mit Erfahrungsaustausch: Was hat funktioniert? Wo gab es Probleme? So entsteht echte Verhaltensänderung."
      }
    ]
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
    keywords: ["Copilot Launch Event", "KI Kick-off", "Copilot Einführung Event", "Copilot Gamification", "KI Eventtag"],
    faqs: [
      {
        question: "Wie mache ich den Copilot-Launch zu einem echten Highlight für meine Mitarbeiter?",
        answer: "Ein Launch-Eventtag mit interaktiven Elementen: Live-Demos zum Staunen, Hands-on-Stationen zum Selbst-Ausprobieren, KI-Challenges mit Wettbewerbscharakter, Gamification mit Preisen, und kompetente Ansprechpartner für individuelle Fragen. Das erzeugt positive Energie, baut Berührungsängste ab und sorgt dafür, dass Mitarbeiter die KI-Einführung als Chance sehen – nicht als Bedrohung."
      },
      {
        question: "Wie kann ich Berührungsängste meiner Mitarbeiter gegenüber KI abbauen?",
        answer: "Niedrigschwellige erste Erfahrungen sind der Schlüssel. Statt Schulung im Klassenraum: ein Infostand, an dem man Fragen stellen kann; Hands-on-Stationen, an denen man Copilot unter Anleitung ausprobiert; spielerische Challenges, die Spaß machen. Wenn Mitarbeiter erleben, dass KI ihnen hilft (statt sie zu ersetzen), wandelt sich Skepsis in Neugier."
      },
      {
        question: "Was für Ideen gibt es für einen KI-Launchtag in unserem Unternehmen?",
        answer: "Bewährte Elemente: Professioneller Infostand mit kompetenten Ansprechpartnern, Live-Demos (die 'Wow'-Momente erzeugen), interaktive KI-Challenges (Teams treten gegeneinander an), Gamification mit Quizzen und Gewinnspielen, Hands-on-Stationen zum Selbst-Ausprobieren, individuelle Beratungsgespräche, und hochwertige Infomaterialien zum Mitnehmen. Alles anpassbar an Ihre Location und Corporate Identity."
      },
      {
        question: "Wie viele Mitarbeiter können an einem Launch-Eventtag teilnehmen?",
        answer: "Das Format ist skalierbar: Von 50 bis mehrere Hundert Teilnehmer. Bei einem Eventtag kommen Mitarbeiter über den Tag verteilt, bleiben so lange sie möchten, und nehmen das mit, was sie interessiert. Kein fester Zeitrahmen, keine Frontalschulung – sondern ein lebendiger Marktplatz der Möglichkeiten. Für größere Standorte kann das Event auch über mehrere Tage gehen."
      }
    ]
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
    keywords: ["individuelle Copilot Schulung", "maßgeschneidertes KI-Training", "Copilot Inhouse", "branchenspezifisches Copilot Training", "Copilot nach Maß"],
    faqs: [
      {
        question: "Gibt es Copilot-Schulungen speziell für unsere Branche?",
        answer: "Ja, maßgeschneiderte Trainings mit branchenspezifischen Use Cases sind möglich – ob Fertigung, Gesundheitswesen, Finanzdienstleistungen, öffentlicher Sektor oder Handel. Der Unterschied zu Standardtrainings: Wir arbeiten mit Ihren echten Prozessen, Ihren Dokumententypen, Ihren typischen Aufgaben. So ist der Transfer in den Arbeitsalltag sofort gegeben."
      },
      {
        question: "Können wir Copilot-Training mit unseren echten Firmendaten durchführen?",
        answer: "Ja, bei Inhouse-Trainings arbeiten wir mit Ihren realen Unternehmensdaten und -prozessen. Das macht den entscheidenden Unterschied: Statt fiktiver Beispiele lernen Mitarbeiter direkt an ihren eigenen E-Mails, Dokumenten und Tabellen. Die Übungen sind sofort übertragbar, weil sie bereits im echten Arbeitskontext stattfinden."
      },
      {
        question: "Wie unterscheidet sich ein maßgeschneidertes Training von einem Standardkurs?",
        answer: "Standard: Allgemeine Beispiele, vorgegebene Inhalte, one-size-fits-all. Maßgeschneidert: Vorab-Analyse Ihrer Prozesse und Use Cases, Training mit Ihren Daten, abteilungsspezifische Schwerpunkte, und eine individuelle Prompt-Bibliothek für Ihre wiederkehrenden Aufgaben. Der Aufwand ist höher, aber der ROI deutlich besser."
      },
      {
        question: "Können verschiedene Abteilungen unterschiedliche Copilot-Trainings bekommen?",
        answer: "Absolut sinnvoll: Der Vertrieb braucht andere Copilot-Fähigkeiten als HR oder Finance. Abteilungsspezifische Schulungen fokussieren auf die relevanten Apps und Use Cases: E-Mail-Produktivität für Sales, Dokumentenarbeit für Legal, Datenanalyse für Controlling. So ist jede Minute Trainingszeit optimal investiert."
      }
    ]
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

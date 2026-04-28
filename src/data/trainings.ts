import { Brain, Shield, Laptop, Zap, Scale, GraduationCap, Wrench, Users } from "lucide-react";
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
  // Optionaler Preis pro Person (für schema.org Course/Offer); falls leer, greift Default
  pricePerPerson?: number;
  pricePerPersonLabel?: string; // optional: angezeigte Preisbeschreibung im Schema
  // Verknüpfte Workshops (Slugs) – werden als optionale Erweiterungsmodule angezeigt
  relatedWorkshops?: string[];
}

// Alle Trainingsmodule mit SEO-optimierten Slugs
export const trainings: Training[] = [
  {
    slug: "copilot-grundlagen-prompt-design",
    icon: Brain,
    title: "Copilot Grundlagen: Prompt Design & KI-Kompetenz",
    duration: "Halbtag | Ganztag | 4-8×2h Lernreise",
    durationISO: "PT4H",
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
      "Buchbar als: Halbtag (4h), Ganztag (7h) oder Lernreise (4-8×2h über 4-8 Wochen)"
    ],
    tiers: ["free"],
    popular: true,
    questionLead: "Welches Training eignet sich am besten, um Microsoft Copilot von Grund auf zu lernen – auch ohne Lizenz?",
    targetAudience: [
      "Büromitarbeiter, die zum ersten Mal mit KI-Assistenten arbeiten und einen strukturierten Einstieg suchen",
      "Teamleiter, die ihr Team auf die Copilot-Einführung vorbereiten wollen, bevor Lizenzen beschafft werden",
      "L&D-Verantwortliche, die ein Grundlagen-Modul für die KI-Kompetenz im Unternehmen brauchen",
      "Assistenzen und Office Manager, die Routineaufgaben mit KI beschleunigen möchten"
    ],
    learningOutcomes: [
      "Sie formulieren präzise Prompts mit klarer Struktur, Kontext und Beispielen – und erhalten deutlich bessere KI-Antworten",
      "Sie bewerten KI-Outputs kritisch: Halluzinationen erkennen, Fakten prüfen, Grenzen einschätzen",
      "Sie nutzen Copilot Chat produktiv für Recherche, Texterstellung, Zusammenfassungen und kreative Aufgaben",
      "Sie entwickeln eine persönliche Prompt-Bibliothek mit Templates für Ihre wiederkehrenden Aufgaben"
    ],
    businessImpact: [
      "Recherche-Aufgaben, die bisher 30-60 Minuten dauerten, erledigen Sie in unter 10 Minuten",
      "Texterstellung (E-Mails, Berichte, Zusammenfassungen) wird 3-5x schneller bei gleichbleibender Qualität",
      "Die Hemmschwelle gegenüber KI sinkt – Mitarbeiter nutzen Copilot eigenständig im Alltag",
      "Der spätere Umstieg auf Microsoft 365 Copilot (bezahlte Version) gelingt deutlich schneller"
    ],
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
    duration: "Halbtag | Ganztag | 2-tägig | Lernreise (4×, 6× oder 8×2h online)",
    durationISO: "PT4H",
    description: "Praxisorientiertes Training für Copilot-Lizenzinhaber: Sie lernen, wie Sie Microsoft 365 Copilot direkt in Ihren Office-Anwendungen einsetzen – von der Dokumenterstellung in Word über Datenanalyse in Excel bis zur Meeting-Zusammenfassung in Teams. Mit echten Arbeitsszenarien und direkt anwendbaren Workflows.",
    features: [
      "Copilot in Word: Projektpläne, Angebote und Entscheidungsvorlagen in Minuten statt Stunden erstellen – inklusive Struktur, Formatierung und Zusammenfassungen für die Geschäftsleitung",
      "Copilot in Excel: Daten analysieren, Pivot-Tabellen erstellen, Diagramme erzeugen und komplizierte Formeln schreiben lassen – per natürlicher Sprache. Endlich Excel voll nutzen, auch ohne tiefes Excel-Wissen",
      "Copilot in PowerPoint: Aus einem Word-Briefing oder Projektbericht direkt eine präsentationsfertige Slide-Deck generieren, statt Stunden in Layouts zu investieren",
      "Copilot in Outlook: E-Mail-Threads auf Action Items verdichten, Antworten im richtigen Tonfall vorfertigen lassen, Meeting-Vorbereitungen automatisch aus dem Posteingang ziehen, freie Termine aller Teilnehmer suchen lassen und inhaltlich quer durch alle Mails suchen",
      "Copilot in Teams: Meetings automatisch protokollieren lassen, verpasste Besprechungen in 30 Sekunden nachlesen und offene Aufgaben direkt extrahieren",
      "Cross-App-Workflows: Aus einer E-Mail-Kette wird ein strukturiertes Word-Dokument, aus dem Word-Text eine Präsentation – nahtlos zwischen den Apps arbeiten",
      "Prompt Engineering für Office: App-spezifische Prompt-Techniken, die in Word anders funktionieren als in Excel oder PowerPoint – mit sofort einsetzbaren Vorlagen",
      "Eigene Use Cases aus Ihrem Arbeitsalltag praktisch umsetzen",
      "Buchbar als: Halbtag (4h), Ganztag (7h), 2-tägig oder Online-Lernreise (4×, 6× oder 8×2h)"
    ],
    tiers: ["paid"],
    popular: true,
    questionLead: "Wie nutze ich Microsoft 365 Copilot in Word, Excel, PowerPoint, Outlook und Teams produktiv?",
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
      "Dokumenterstellung wird 60-80% schneller: Berichte, Angebote und Protokolle entstehen in Minuten statt Stunden",
      "Meeting-Nachbereitung schrumpft von 30 Minuten auf 2 Minuten durch automatische Teams-Zusammenfassungen",
      "E-Mail-Bearbeitungszeit sinkt um 30-50% durch KI-generierte Entwürfe und Thread-Zusammenfassungen",
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
    duration: "2 Tage | 4-8×2h Lernreise",
    durationISO: "P2D",
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
      "Buchbar als: 2 Tage intensiv (14h) oder Lernreise (4-8×2h über 4-8 Wochen mit Praxisaufgaben)"
    ],
    tiers: ["paid"],
    questionLead: "Gibt es eine umfassende KI-Ausbildung für Büromitarbeiter?",
    targetAudience: [
      "Unternehmen, die eine systematische KI-Qualifizierung ihrer gesamten Belegschaft brauchen",
      "Personalentwickler, die ein nachweisbares KI-Kompetenzprogramm gemäß EU AI Act aufbauen müssen",
      "Mitarbeiter, die sich als KI-Experten in ihrem Team positionieren und andere begleiten wollen",
      "Führungskräfte, die den gesamten Copilot-Funktionsumfang verstehen müssen, um fundiert entscheiden zu können"
    ],
    learningOutcomes: [
      "Sie beherrschen alle Microsoft 365 Copilot-Apps auf Expertenniveau – von einfachen bis zu komplexen Anwendungen",
      "Sie entwickeln Cross-App-Workflows, die mehrere Office-Anwendungen nahtlos verbinden",
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
    metaDescription: "2-tägige Intensiv-Ausbildung zum KI-unterstützten Wissensarbeiter. Von Grundlagen bis Expertenniveau: 20+ Übungen, alle M365 Apps.",
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
        answer: "Die Grundlagen sind in einem halben Tag vermittelt. Für echte Produktivitätssteigerung im Alltag – also das sichere Beherrschen aller relevanten Apps und Workflows – sollten Sie mit 2 intensiven Tagen oder einer 8-wöchigen Lernreise rechnen. Der Vorteil der Lernreise: Zwischen den Sessions wenden Mitarbeiter das Gelernte direkt an und kommen mit echten Fragen zurück."
      }
    ],
    relatedWorkshops: ["bessere-entscheidungen-mit-copilot"],
  },
  {
    slug: "train-the-trainer-copilot",
    icon: Users,
    title: "Train-the-Trainer: Copilot Multiplikatoren ausbilden",
    duration: "4 Tage Vollzeit + bedarfsorientierte Online-Workshops",
    durationISO: "P4D",
    description: "Vier intensive Tage, in denen wir AI Change Verantwortliche, Ambassadoren und Multiplikatoren aus Ihren Fachabteilungen so ausbilden, dass sie Copilot im eigenen Unternehmen souverän vermitteln und einführen können. Entstanden ist die Weiterbildung aus unserem internen Trainingsprogramm für neue Copilot-Trainer – wir geben Ihnen also exakt das Curriculum mit, mit dem wir auch unsere eigenen Leute ausbilden. Drei Kompetenzfelder verzahnen wir an jedem der vier Tage statt sie in getrennte Blöcke zu sortieren: fortgeschrittene und rechtssichere Copilot-Praxis, das Handwerk eines tragfähigen Adoption-Programms und Didaktik für unterschiedliche Nutzergruppen. Nach den vier Tagen bleibt die Verbindung – über eine Community of Practice mit Multiplikatoren aus anderen Unternehmen und einen laufend gepflegten Material- und Update-Pool. Buchbar als geschlossenes Inhouse-Format oder als offenes Training in Köln, in dem Pilotinnen und Piloten aus unterschiedlichen Branchen aufeinandertreffen.",
    features: [
      "Tag 1 – Eigene Praxis: Selbst erfahrene Nutzer entdecken Funktionen, Nutzungsszenarien und blinde Flecken im Microsoft-365- und Copilot-Ökosystem; parallel reflektieren wir didaktisch, wie sich diese Inhalte vermitteln lassen. Der Tag endet mit einer kurzen Lehrprobe.",
      "Tag 2 – Workflows, Use Cases und Teilautomatisierung: Agenten und Copilot Studio, sichere Verbreitungsprozesse sowie die Anbindung statischer und dynamischer Quellen – verständlich für technisch interessierte Büroanwender, nicht nur für die IT.",
      "Tag 3 – Rechtssichere Praxis und Konfliktzonen: DSGVO, EU AI Act, Urheberrecht, Datenklassifizierung und sensible Daten. Plus realistische Stakeholder-Simulationen (Betriebsrat, Datenschutz, Fachabteilung) und Umgang mit Widerständen. Teilnehmende erarbeiten eigene Workshops und Checklisten für den Einsatz im Rollout.",
      "Tag 4 – Adoption- und Change-Prozess: Use Cases identifizieren und bewerten, ein eigenes Programm entwickeln, relevante Kennzahlen definieren und eine erste Roadmap mit konkreten To-dos erstellen – mit echten Zahlen Ihres Unternehmens.",
      "Verzahnt statt getrennt: Praxis, Adoption-Architektur und Didaktik laufen jeden Tag parallel – so wie Multiplikatoren später auch im Alltag zwischen einem komplexen Prompt, einer Rechtsfrage und einem Skeptiker-Argument wechseln.",
      "Lehrproben mit ehrlichem Feedback: Jede Teilnehmerin und jeder Teilnehmer übt das eigene Erklären unter Echt-Bedingungen und bekommt strukturiertes Feedback aus der Gruppe und vom Coach.",
      "Begleitung danach – Baustein 1: Community of Practice der ausgebildeten Multiplikatoren über Unternehmensgrenzen hinweg. Geteilte Use Cases, Sparring vor wichtigen internen Vorhaben, Erfahrungsaustausch unter Kolleginnen und Kollegen, die vor denselben Fragen stehen.",
      "Begleitung danach – Baustein 2: Laufend gepflegter Material- und Update-Pool. Microsoft entwickelt Copilot dynamisch weiter – über den Pool bleiben unsere Multiplikatoren auf einem Stand, den ein einmaliges Zertifikat strukturell nicht halten könnte.",
      "Optionale Online-Workshops: Bedarfsorientiert, dort wo Sie auf Ihrer Reise stehen – Vorbereitung der ersten internen Trainings, knifflige Use Cases, Stakeholder-Workshops, Umgang mit Widerstand. Auf Wunsch begleiten wir Sie auch beim eigentlichen Rollout.",
      "Komplette Materialbibliothek zur freien internen Nutzung: Trainings-Decks (PPTX), fertige Übungsaufgaben, Kommunikations- und Change-Templates (Mail-Vorlagen, Kickoff-Decks), FAQ-Sammlungen und Infomaterialien fürs Intranet. Eine Prompt-Bibliothek bauen Sie im Training mit eigenen Use Cases – das ist mehr wert als jede vorgefertigte Liste.",
      "Buchbar als: Geschlossene Inhouse-Gruppe (vor Ort oder online) oder offenes Training in Köln mit Multiplikatoren aus anderen Unternehmen – der branchenübergreifende Austausch ist im offenen Format ein eigener Wert."
    ],
    tiers: ["free", "paid"],
    isNew: true,
    pricePerPerson: 2990,
    pricePerPersonLabel: "Ab 2.990 € pro Person für 4 Tage Vollzeit (offenes Training, inkl. Trainings-Decks, Templates und FAQ-Sammlungen). Inhouse-Konditionen auf Anfrage.",
    questionLead: "Wir bilden Ihre internen Copilot-Multiplikatoren, Ambassadoren und AI Change Verantwortlichen aus, damit Sie Ihre Mitarbeitenden im Alltag begeistern und befähigen können.",
    targetAudience: [
      "AI Change Verantwortliche und Ambassadoren, die einen Copilot-Rollout in ihrem Unternehmen orchestrieren",
      "Copilot-Multiplikatoren aus Fachabteilungen, die Kolleginnen und Kollegen im Alltag begleiten und befähigen wollen",
      "L&D- und HR-Verantwortliche, die ein internes Copilot-Curriculum aufbauen statt jeden Workshop extern einzukaufen",
      "Führungskräfte, die Adoption nicht dem Zufall überlassen wollen und eine valide Roadmap brauchen",
      "Erfahrene Copilot-Anwender, die zur internen Anlaufstelle werden – auch ohne klassischen Trainer-Hintergrund"
    ],
    learningOutcomes: [
      "Sie nutzen Microsoft 365 Copilot fortgeschritten und rechtssicher – inklusive Cross-App-Workflows, Agenten, Copilot Studio und sensiblen Datenklassen",
      "Sie planen ein eigenes Copilot-Adoption-Programm: Rollen, Komponenten, Zeithorizont, Budget und Erfolgsmetriken – mit echten Zahlen Ihres Unternehmens",
      "Sie holen Skeptiker, Pragmatiker und Power User mit jeweils passender Argumentation und Didaktik ab und führen interne Trainings, Lernreisen und Office Hours souverän",
      "Sie meistern realistische Stakeholder-Gespräche mit Betriebsrat, Datenschutz und Fachabteilungen – aus den Simulationen am dritten Tag",
      "Sie verfügen über die komplette Materialbibliothek (Decks, Übungen, Templates, FAQs, Intranet-Texte) zur freien internen Nutzung",
      "Sie sind nach den vier Tagen weiter angebunden: Community of Practice, Material- und Update-Pool und bedarfsorientierte Online-Workshops halten Ihren Wissensstand auch in Monat 6 und 12"
    ],
    businessImpact: [
      "Adoption-Programme werden plan- und steuerbar: Sie wissen, welche Hebel wann wirken und welche Investitionen lohnen – aufbauend auf unserem [Leitfaden für die Copilot-Einführung im Unternehmen](/wissen/copilot-im-unternehmen-einfuehren-leitfaden)",
      "Die Kosten für externe Schulungen sinken deutlich, weil Sie intern kompetent skalieren – wir liefern dafür die Materialien und das didaktische Fundament aus unserem [Training- und Schulungsangebot](/wissen/copilot-training-schulung)",
      "Mitarbeitende sehen vertraute Gesichter in Trainings statt austauschbarer Externer – Akzeptanz und Transferquote steigen, gerade wenn Sie eine [interne Launch-Kampagne](/wissen/copilot-launch-kampagne) als Rahmen nutzen",
      "Multiplikatoren tragen den Change im Alltag: in der Kaffeeküche, im Teams-Chat, in der Übersetzung neuer Features in den eigenen Prozess – die Wirkungen, die [unser Fachartikel zur Inhouse-Change-Begleitung](/wissen/interne-copilot-trainer-ausbilden) ausführlich beschreibt",
      "Sie etablieren ein dauerhaftes Lern-Ökosystem statt einmaliger Workshop-Events – Verhaltensänderung wird wahrscheinlicher, Risiken im Umgang mit KI sinken sichtbar"
    ],
    metaTitle: "Train-the-Trainer Copilot – Multiplikatoren ausbilden (4 Tage) | copilotenschule.de",
    metaDescription: "4-tägige Train-the-Trainer Ausbildung für Copilot-Multiplikatoren, Ambassadoren und AI Change Verantwortliche. Mit Trainings-Decks, Adoption-Konzept und Didaktik. Inhouse oder offen.",
    keywords: [
      "Train the Trainer Copilot",
      "Copilot Trainer Ausbildung",
      "Copilot Ambassador Programm",
      "Copilot Multiplikator ausbilden",
      "AI Change Manager Schulung",
      "Copilot Adoption Programm aufbauen",
      "interne Copilot Trainer schulen",
      "Microsoft Copilot Train the Trainer"
    ],
    faqs: [
      {
        question: "Wir wollen Copilot intern selbst trainieren – wie bauen wir dafür kompetente Multiplikatoren auf?",
        answer: "Multiplikatoren brauchen drei Dinge gleichzeitig: eigene fortgeschrittene Praxis mit Copilot, ein klares Bild davon wie ein Adoption-Programm funktioniert, und didaktische Werkzeuge für unterschiedliche Zielgruppen. Diese drei Kompetenzfelder verzahnen wir an jedem der vier Tage – statt sie in getrennte Blöcke zu sortieren. Sie verlassen das Training mit echtem Können, einem Adoption-Plan für Ihr Unternehmen und einer kompletten Materialbibliothek (Decks, Übungen, FAQs), die Sie intern frei einsetzen dürfen. Ein ausführliches Bild der Inhouse-Multiplikator-Logik finden Sie in unserem Beitrag zu [interne Copilot-Trainer ausbilden](/wissen/interne-copilot-trainer-ausbilden)."
      },
      {
        question: "Was ist der Unterschied zur Ausbildung zum KI-unterstützten Wissensarbeiter?",
        answer: "Die Wissensarbeiter-Ausbildung macht Sie zum Power User. Train-the-Trainer geht eine Stufe weiter: Hier lernen Sie, andere zu Power Usern zu machen. Sie vertiefen die eigene Praxis, lernen aber zusätzlich Adoption-Architektur, Change Management und Didaktik – und bekommen die kompletten Trainingsunterlagen, die wir selbst nutzen, zur freien internen Verwendung."
      },
      {
        question: "Was passiert konkret an Tag 1 bis Tag 4?",
        answer: "Tag 1 fokussiert die eigene Copilot-Praxis im Microsoft-365-Ökosystem mit didaktischer Reflexion und einer kurzen Lehrprobe. Tag 2 vertieft Workflows, Use Cases, Teilautomatisierung sowie Agenten und Copilot Studio. Tag 3 widmet sich rechtssicherer Praxis (DSGVO, EU AI Act, Datenklassifizierung) und realistischen Stakeholder-Simulationen. Tag 4 entwickelt mit echten Zahlen Ihres Unternehmens das eigene Adoption-Programm, definiert Kennzahlen und erstellt eine Roadmap mit konkreten To-dos."
      },
      {
        question: "Bekommen wir wirklich die kompletten Trainings-Decks und Materialien zur freien Nutzung?",
        answer: "Ja. Wir möchten, dass Ihre Copilot-Einführung erfolgreich wird – und das gelingt am besten, wenn Sie nach dem Training nicht alles neu erfinden müssen. Sie erhalten unsere Trainings-Decks (PPTX), Übungsaufgaben, Kommunikations- und Change-Templates, fertige FAQ-Sammlungen und Infomaterialien fürs Intranet. Diese Materialien dürfen Sie intern beliebig anpassen und einsetzen. Eine Prompt-Bibliothek bauen Sie im Training mit Ihren echten Anwendungsfällen selbst – das ist mehr wert als jede vorgefertigte Sammlung."
      },
      {
        question: "Was passiert nach den vier Tagen – und wie bleiben unsere Multiplikatoren auf Stand?",
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
        answer: "Das stärkste Argument ist Skalierung: Wenn Sie 1.000 Mitarbeitende zu Copilot-Profis machen wollen, sind externe Schulungen für jeden schlicht zu teuer und zu zähflüssig. Mit zwei bis fünf intern ausgebildeten Multiplikatoren können Sie den Großteil der Trainings selbst stemmen – und behalten zusätzlich Adoption-Steuerung, Use-Case-Pflege und Anwender-Support im Haus. Verhaltensänderung gelingt mit vertrauten Gesichtern aus dem eigenen Unternehmen messbar besser als mit Externen, gerade in der entscheidenden Phase nach dem Training."
      }
    ],
    relatedWorkshops: ["copilot-strategie-change-management", "copilot-launch-eventtag"],
  },
  {
    slug: "github-copilot-entwickler",
    icon: Laptop,
    title: "GitHub Copilot für Softwareentwickler",
    duration: "1 Tag (7 Stunden)",
    durationISO: "PT7H",
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
    questionLead: "Wie kann unser Entwicklerteam GitHub Copilot optimal nutzen – und wie konfigurieren wir es sicher?",
    targetAudience: [
      "Softwareentwickler, die ihre Coding-Produktivität mit KI-Unterstützung signifikant steigern wollen",
      "Engineering Manager, die GitHub Copilot für ihr Team ausrollen und Best Practices etablieren möchten",
      "DevOps-Engineers, die Copilot in CI/CD-Pipelines und Entwickler-Workflows integrieren wollen",
      "Tech Leads, die Code-Qualität und Security Standards trotz KI-Einsatz sicherstellen müssen"
    ],
    learningOutcomes: [
      "Sie konfigurieren GitHub Copilot optimal für Ihr Team: IDE-Setup, Policies, Content Exclusions, Audit Logs",
      "Sie generieren, debuggen, refactoren und dokumentieren Code effizient mit Copilot – sprachunabhängig",
      "Sie schreiben Unit Tests mit Copilot und erhöhen Ihre Code-Coverage systematisch",
      "Sie nutzen Copilot Chat und Agent Mode für Multi-File-Refactoring und komplexe Code-Erklärungen",
      "Sie identifizieren Security-Vulnerabilities und halten Code-Standards automatisiert ein"
    ],
    businessImpact: [
      "Code-Completion wird 30-55% schneller – besonders bei Boilerplate, Tests und Dokumentation",
      "Onboarding neuer Entwickler beschleunigt sich erheblich, weil Copilot Legacy-Code erklärt und kontextualisiert",
      "Die Code-Dokumentation verbessert sich drastisch, weil Copilot Inline-Kommentare und READMEs generiert",
      "Security-Findings werden früher erkannt, weil Copilot proaktiv auf Schwachstellen hinweist"
    ],
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
    durationISO: "PT4H",
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
    questionLead: "Ist Microsoft Copilot DSGVO-konform – und was müssen wir als Unternehmen beachten?",
    targetAudience: [
      "Datenschutzbeauftragte, die eine Bewertung von Microsoft Copilot für ihr Verarbeitungsverzeichnis brauchen",
      "IT-Sicherheitsverantwortliche, die Copilot technisch absichern und Policies konfigurieren müssen",
      "Geschäftsführer und Compliance-Officer, die regulatorische Risiken bei der KI-Einführung minimieren wollen",
      "Betriebsräte, die eine fundierte Einschätzung zu Mitarbeiterüberwachung und Datenschutz benötigen"
    ],
    learningOutcomes: [
      "Sie verstehen die Microsoft 365 Sicherheitsarchitektur: Datenflüsse, Verschlüsselung, Zugriffskontrolle",
      "Sie führen ein Datenschutz-Impact-Assessment für Microsoft Copilot eigenständig durch",
      "Sie kennen die EU AI Act Anforderungen und können die Compliance-Pflichten für Ihr Unternehmen ableiten",
      "Sie erstellen praktische Guidelines und Policies für die DSGVO-konforme Copilot-Nutzung"
    ],
    businessImpact: [
      "Rechtssicherheit: Ihr Unternehmen erfüllt nachweisbar DSGVO- und EU AI Act-Anforderungen",
      "Risikominimierung: Compliance-Verstöße und Bußgelder durch ungeschulten KI-Einsatz werden vermieden",
      "Beschleunigter Rollout: Datenschutz-Freigabe kommt schneller, weil alle Fragen proaktiv geklärt sind",
      "Betriebsrat-Akzeptanz: Transparente Dokumentation schafft Vertrauen bei der Arbeitnehmervertretung"
    ],
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
    slug: "copilot-lernreise-8-wochen",
    icon: GraduationCap,
    title: "Copilot Lernreise: Von 0 auf 100 in 8 Wochen",
    duration: "4-8 × 2 Stunden (8-16 Stunden gesamt)",
    durationISO: "PT8H",
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
    popular: true,
    questionLead: "Gibt es ein Copilot-Training, das über mehrere Wochen geht – für nachhaltigen Kompetenzaufbau statt Tagesschulung?",
    targetAudience: [
      "Unternehmen, die nachhaltige KI-Kompetenz aufbauen wollen statt einmaliger Workshop-Events",
      "L&D-Verantwortliche, die eine begleitete Lernreise in bestehende Weiterbildungsprogramme integrieren möchten",
      "Teams, die Copilot schrittweise in den Arbeitsalltag integrieren und dabei begleitet werden wollen",
      "Führungskräfte, die messbare Verhaltensänderung statt nur Wissensvermittlung erreichen möchten"
    ],
    learningOutcomes: [
      "Sie beherrschen nach 8 Wochen alle relevanten Copilot-Funktionen in Word, Excel, PowerPoint, Outlook und Teams",
      "Sie haben jede Woche einen konkreten Use Case in Ihrem echten Arbeitsalltag umgesetzt und verfestigt",
      "Sie verfügen über eine persönliche Prompt-Bibliothek und einen individuellen End-to-End-Workflow",
      "Sie können Kollegen eigenständig unterstützen, weil Sie die häufigsten Probleme bereits selbst gelöst haben"
    ],
    businessImpact: [
      "Nachhaltigkeit: 87% der Teilnehmer nutzen Copilot auch 3 Monate nach der Lernreise aktiv – vs. 30% bei Tagesschulungen",
      "Jede Woche entsteht ein direkt anwendbarer Workflow – der Produktivitätsgewinn beginnt ab Woche 1",
      "Der Betreuungsaufwand für IT und Helpdesk sinkt, weil Teilnehmer lernen, Probleme selbst zu lösen",
      "Die Lernreise ist mit 2,5 Stunden pro Woche minimal invasiv – kein ganzer Arbeitstag geht verloren"
    ],
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
    ],
    relatedWorkshops: ["bessere-entscheidungen-mit-copilot"],
  },
  {
    slug: "copilot-studio-ki-agenten",
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
    slug: "low-code-power-platform",
    icon: Zap,
    title: "Low-Code Entwicklung mit Microsoft Copilot - Flow Coding im Unternehmen",
    duration: "1 Tag (7 Stunden)",
    durationISO: "PT7H",
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
    questionLead: "Wie können Fachabteilungen eigene Apps und Automations bauen – ohne auf die IT warten zu müssen?",
    targetAudience: [
      "Citizen Developer in Fachabteilungen, die eigene digitale Lösungen für ihre Prozesse bauen wollen",
      "IT-Abteilungen, die Citizen Development ermöglichen möchten, ohne die Governance zu verlieren",
      "Prozessverantwortliche, die manuelle Genehmigungsprozesse und Excel-Workarounds automatisieren wollen",
      "Digitalisierungsbeauftragte, die die Microsoft Power Platform als strategische Plattform evaluieren"
    ],
    learningOutcomes: [
      "Sie erstellen funktionsfähige Business-Apps mit Power Apps – per Drag-and-Drop und natürlicher Sprache",
      "Sie automatisieren Geschäftsprozesse mit Power Automate: Genehmigungen, Benachrichtigungen, Datensynchronisation",
      "Sie nutzen Copilot als Entwicklungsassistenten für Formeln, Logik und Fehlersuche",
      "Sie verstehen Governance-Best-Practices: Wann ist Citizen Development erwünscht, wann braucht es die IT?"
    ],
    businessImpact: [
      "Fachabteilungen lösen eigene Digitalisierungsprobleme in Tagen statt Monaten – ohne IT-Backlog",
      "Manuelle Prozesse (Genehmigungen, Reportings, Dateneingabe) werden automatisiert und fehlerresistent",
      "Die IT-Abteilung wird entlastet, weil Standardanforderungen von den Fachbereichen selbst umgesetzt werden",
      "Schatten-IT wird durch eine governierte Plattform ersetzt – mehr Innovation bei weniger Risiko"
    ],
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
    durationISO: "PT4H",
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
    targetAudience: [
      "Compliance-Officer und Rechtsabteilungen, die die EU AI Act Anforderungen operativ umsetzen müssen",
      "Geschäftsführer, die ihre gesetzliche Pflicht zur KI-Schulung nachweisbar erfüllen wollen",
      "Personalentwickler, die eine Pflichtschulung für alle KI-nutzenden Mitarbeiter organisieren müssen",
      "Datenschutzbeauftragte, die KI-Kompetenz in bestehende Schulungskonzepte integrieren wollen"
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
    slug: "individuelle-copilot-schulung",
    icon: Wrench,
    title: "Individuelle Copilot-Schulungen nach Maß",
    duration: "Flexibel (nach Bedarf)",
    durationISO: "PT4H",
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
    questionLead: "Gibt es Copilot-Schulungen, die speziell auf unsere Branche und unsere Unternehmensprozesse zugeschnitten sind?",
    targetAudience: [
      "Unternehmen mit branchenspezifischen Anforderungen, die kein Standardtraining von der Stange wollen",
      "L&D-Verantwortliche, die ein Schulungskonzept brauchen, das sich in bestehende Programme integriert",
      "Abteilungsleiter, die rollenspezifische Copilot-Trainings für Sales, HR, Finance oder Marketing suchen",
      "Konzerne und Großunternehmen, die Copilot in mehreren Wellen an verschiedene Zielgruppen ausrollen"
    ],
    learningOutcomes: [
      "Teilnehmer arbeiten mit ihren eigenen Unternehmensdaten und -dokumenten – kein fiktives Übungsmaterial",
      "Jede Abteilung bekommt Use Cases, die zu ihren tatsächlichen Aufgaben und Prozessen passen",
      "Teams entwickeln eine abteilungsspezifische Prompt-Bibliothek, die sofort im Alltag einsetzbar ist",
      "Follow-up Sessions und Support sichern den nachhaltigen Transfer in die Praxis"
    ],
    businessImpact: [
      "Der ROI des Trainings ist höher als bei Standardkursen, weil jede Minute auf reale Geschäftsprozesse fokussiert ist",
      "Mitarbeiter setzen das Gelernte sofort um, weil sie bereits während des Trainings mit echten Aufgaben arbeiten",
      "Die Trainings skalieren über Abteilungen und Standorte hinweg, weil sie modular aufgebaut sind",
      "Branchenspezifische Compliance-Anforderungen werden direkt im Training berücksichtigt"
    ],
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
  },
];

export function getTrainingBySlug(slug: string): Training | undefined {
  return trainings.find(t => t.slug === slug);
}

// Hilfsfunktion: Alle Slugs für statische Generierung
export function getAllTrainingSlugs(): string[] {
  return trainings.map(t => t.slug);
}

import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";
import { ExternalLink, Zap } from "lucide-react";

const SLUG = "wissen/copilot-fuer-word";
const PAGE_TITLE = "Microsoft Copilot für Word";

const CopilotFuerWord = () => {
  const author = getAuthor("martin-lang");

  const tableOfContents = [
    { id: "was-ist-microsoft-copilot-f-r-word-", title: "Was ist Microsoft Copilot für Word?", level: 2 },
    { id: "-berblick", title: "Überblick", level: 3 },
    { id: "voraussetzungen", title: "Voraussetzungen", level: 3 },
    { id: "copilot-in-word-aktivieren", title: "Copilot in Word aktivieren", level: 2 },
    { id: "zugriff-auf-copilot", title: "Zugriff auf Copilot", level: 3 },
    { id: "erste-schritte", title: "Erste Schritte", level: 3 },
    { id: "hauptfunktionen-im-detail", title: "Hauptfunktionen im Detail", level: 2 },
    { id: "1-dokumente-erstellen-draft-", title: "1. Dokumente erstellen (Draft)", level: 3 },
    { id: "2-texte-zusammenfassen-summarize-", title: "2. Texte zusammenfassen (Summarize)", level: 3 },
    { id: "3-texte-umschreiben-rewrite-", title: "3. Texte umschreiben (Rewrite)", level: 3 },
    { id: "4-aus-anderen-dokumenten-erstellen", title: "4. Aus anderen Dokumenten erstellen", level: 3 },
    { id: "5-formatierung-und-struktur", title: "5. Formatierung und Struktur", level: 3 },
    { id: "praktische-anwendungsf-lle", title: "Praktische Anwendungsfälle", level: 2 },
    { id: "1-business-dokumente", title: "1. Business-Dokumente", level: 3 },
    { id: "2-marketing-content", title: "2. Marketing-Content", level: 3 },
    { id: "3-hr-dokumente", title: "3. HR-Dokumente", level: 3 },
    { id: "4-technische-dokumentation", title: "4. Technische Dokumentation", level: 3 },
    { id: "best-practices-f-r-prompts", title: "Best Practices für Prompts", level: 2 },
    { id: "die-craft-formel", title: "Die CRAFT-Formel", level: 3 },
    { id: "prompt-patterns", title: "Prompt-Patterns", level: 3 },
    { id: "erweiterte-techniken", title: "Erweiterte Techniken", level: 2 },
    { id: "1-multi-document-intelligence", title: "1. Multi-Document Intelligence", level: 3 },
    { id: "2-stil-konsistenz", title: "2. Stil-Konsistenz", level: 3 },
    { id: "3-bedingte-generierung", title: "3. Bedingte Generierung", level: 3 },
    { id: "4-feedback-loop", title: "4. Feedback-Loop", level: 3 },
    { id: "h-ufige-fehler-vermeiden", title: "Häufige Fehler vermeiden", level: 2 },
    { id: "-fehler-1-zu-vage-prompts", title: "❌ Fehler 1: Zu vage Prompts", level: 3 },
    { id: "-fehler-2-keine-iterationen", title: "❌ Fehler 2: Keine Iterationen", level: 3 },
    { id: "-fehler-3-kontext-ignorieren", title: "❌ Fehler 3: Kontext ignorieren", level: 3 },
    { id: "-fehler-4-fakten-nicht-pr-fen", title: "❌ Fehler 4: Fakten nicht prüfen", level: 3 },
    { id: "produktivit-t-steigern-workflows", title: "Produktivität steigern: Workflows", level: 2 },
    { id: "workflow-1-meeting-dokumentation", title: "Workflow 1: Meeting → Dokumentation", level: 3 },
    { id: "workflow-2-research-artikel", title: "Workflow 2: Research → Artikel", level: 3 },
    { id: "workflow-3-e-mail-formeller-brief", title: "Workflow 3: E-Mail → Formeller Brief", level: 3 },
    { id: "integration-mit-microsoft-365", title: "Integration mit Microsoft 365", level: 2 },
    { id: "word-outlook", title: "Word + Outlook", level: 3 },
    { id: "word-sharepoint", title: "Word + SharePoint", level: 3 },
    { id: "word-teams", title: "Word + Teams", level: 3 },
    { id: "word-excel", title: "Word + Excel", level: 3 },
    { id: "sicherheit-und-compliance", title: "Sicherheit und Compliance", level: 2 },
    { id: "datenschutz", title: "Datenschutz", level: 3 },
    { id: "governance", title: "Governance", level: 3 },
    { id: "kosten-lizenzierung", title: "Kosten & Lizenzierung", level: 2 },
    { id: "preismodell", title: "Preismodell", level: 3 },
    { id: "roi-berechnung", title: "ROI-Berechnung", level: 3 },
    { id: "tipps-von-power-usern", title: "Tipps von Power-Usern", level: 2 },
    { id: "tipp-1-copilot-als-brainstorming-partner", title: "Tipp 1: Copilot als Brainstorming-Partner", level: 3 },
    { id: "tipp-2-erkl-re-es-mir-wie-ich-5-bin-", title: "Tipp 2: Erkläre es mir wie ich 5 bin", level: 3 },
    { id: "tipp-3-reverse-outlining", title: "Tipp 3: Reverse Outlining", level: 3 },
    { id: "tipp-4-tone-checker", title: "Tipp 4: Tone-Checker", level: 3 },
    { id: "tipp-5-format-vorlagen", title: "Tipp 5: Format-Vorlagen", level: 3 },
    { id: "h-ufig-gestellte-fragen-faq-", title: "Häufig gestellte Fragen (FAQ)", level: 2 },
    { id: "kann-copilot-in-allen-sprachen-arbeiten-", title: "Kann Copilot in allen Sprachen arbeiten?", level: 3 },
    { id: "funktioniert-copilot-offline-", title: "Funktioniert Copilot offline?", level: 3 },
    { id: "kann-ich-meine-eigenen-daten-zum-training-nutzen-", title: "Kann ich meine eigenen Daten zum Training nutzen?", level: 3 },
    { id: "kann-copilot-bilder-einf-gen-", title: "Kann Copilot Bilder einfügen?", level: 3 },
    { id: "was-passiert-wenn-ich-k-ndige-", title: "Was passiert wenn ich kündige?", level: 3 },
    { id: "zukunft-was-kommt-", title: "Zukunft: Was kommt?", level: 2 },
    { id: "angek-ndigte-features-2025-", title: "Angekündigte Features (2025)", level: 3 },
    { id: "zusammenfassung", title: "Zusammenfassung", level: 2 },
    { id: "ressourcen", title: "Ressourcen", level: 2 },
    { id: "quellen", title: "Quellen und Links", level: 2 }
  ];

  // Schema IDs automatisch generieren
  const ids = generateSchemaIds(SLUG, 'wissen');
  const pageUrl = `https://copilotenschule.de/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  // FAQ-Daten für Schema und Anzeige (kundenorientierte Fragen)
  const faqs = [
    {
      name: "Wie nutzen wir Copilot in Word effektiv für die Dokumentenerstellung im Team?",
      answer: "Copilot in Word kann Dokumente aus Stichpunkten erstellen, bestehende Texte zusammenfassen oder umschreiben und sogar aus anderen Dokumenten Inhalte generieren. Für konsistente Ergebnisse im Team brauchen Sie einheitliche Prompt-Standards. Die Copilotenschule bietet Word-spezifische Trainings mit Best Practices und Prompt-Bibliotheken für Business-Dokumente."
    },
    {
      name: "Können wir mit Copilot in Word die Qualität unserer Geschäftsdokumente verbessern?",
      answer: "Ja, Copilot kann Texte auf Klarheit, Grammatik und Ton prüfen und verbessern. Er kann auch komplexe Inhalte verständlicher formulieren oder für verschiedene Zielgruppen anpassen. Die Copilotenschule zeigt in praxisorientierten Workshops, wie Sie Copilot als Qualitäts-Coach für Ihre Dokumentenerstellung einsetzen."
    },
    {
      name: "Wie integrieren wir unsere bestehenden Vorlagen und Stilrichtlinien in Copilot?",
      answer: "Copilot kann bestehende Dokumente als Stilvorlage nutzen und neue Inhalte im gleichen Format und Ton erstellen. Durch gezielte Prompts wie 'Schreibe im Stil des angehängten Dokuments' lernt Copilot Ihre Corporate Language. Die Copilotenschule entwickelt mit Ihnen unternehmensspezifische Prompt-Templates für einheitliche Dokumente."
    },
    {
      name: "Funktioniert Microsoft Copilot gut mit deutschen Dokumenten und Formulierungen?",
      answer: "Ja, Copilot unterstützt Deutsch vollständig – sowohl bei der Eingabe als auch bei der Ausgabe. Die Qualität ist hoch, wenn Sie konsistent in einer Sprache prompten. Die Copilotenschule bietet deutschsprachige Trainings mit Prompts und Beispielen speziell für den deutschen Geschäftsalltag."
    }
  ];

  // Kombiniertes Schema mit @graph (Article, FAQ, Breadcrumb)
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": ids.article,
        "headline": "Microsoft Copilot für Word: Der ultimative Guide",
        "description": "Entdecken Sie, wie Microsoft Copilot in Word Ihre Dokumentenerstellung revolutioniert. Mit praktischen Beispielen, Prompts und Tipps für maximale Produktivität.",
        "author": getAuthorSchemaMarkup(author),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization"
        },
        "datePublished": "2025-01-05",
        "dateModified": "2026-02-03",
        "keywords": ["Copilot für Word","Microsoft Copilot Word","Word KI Assistent","Dokumente mit KI erstellen","Word Produktivität","Microsoft 365 Copilot"],
        "articleSection": "Microsoft 365",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": pageUrl
        }
      },
      {
        "@type": "FAQPage",
        "@id": ids.faq,
        "mainEntity": faqs.map(faq => ({
          "@type": "Question",
          "name": faq.name,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      },
      {
        "@type": "BreadcrumbList",
        "@id": ids.breadcrumb,
        "itemListElement": breadcrumbItems.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": item.url
        }))
      }
    ]
  };

  return (
    <>
      <SEOHead
        title="Microsoft Copilot für Word: Der ultimative Guide | Copilotenschule"
        description="Entdecken Sie, wie Microsoft Copilot in Word Ihre Dokumentenerstellung revolutioniert. Mit praktischen Beispielen, Prompts und Tipps für maximale Produktivität."
        keywords={["Copilot für Word","Microsoft Copilot Word","Word KI Assistent","Dokumente mit KI erstellen","Word Produktivität","Microsoft 365 Copilot"]}
        canonicalUrl="https://copilotenschule.de/wissen/copilot-fuer-word"
        schema={schema}
        publishedTime="2025-01-05"
        modifiedTime="2026-02-03"
      />
      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "Microsoft Copilot für Word: Der ultimative Guide", href: "/wissen/copilot-fuer-word" }
        ]}
        title="Microsoft Copilot für Word: Der ultimative Guide"
        description="Entdecken Sie, wie Microsoft Copilot in Word Ihre Dokumentenerstellung revolutioniert. Mit praktischen Beispielen, Prompts und Tipps für maximale Produktivität."
        tableOfContents={tableOfContents}
        author={author}
        publishDate="2025-01-05"
        modifiedDate="2026-02-03"
        readTime="15 Minuten"
      >
        {/* Schnellantwort Card */}
        <section className="mb-8">
          <div className="border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-amber-500/5 rounded-lg p-6 flex items-start gap-4">
            <Zap className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Schnellantwort</h3>
              <p className="text-gray-700">Microsoft Copilot für Word ist ein KI-Assistent, der Dokumentenerstellung revolutioniert. Mit natürlicher Sprache können Sie Texte erstellen, zusammenfassen, umschreiben und formatieren – mit bis zu 70% Zeitersparnis pro Aufgabe.</p>
            </div>
          </div>
        </section>

        <section id="einleitung" className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-4">Einleitung</h1>
          <p className="mb-4 text-gray-700 leading-relaxed">Microsoft Copilot für Word ist ein KI-gestützter Assistent, der direkt in Microsoft Word integriert ist und Ihre Dokumentenerstellung auf ein neues Level hebt. Mit natürlicher Sprache können Sie Texte erstellen, bearbeiten, zusammenfassen und formatieren.</p>
        </section>

        <section id="was-ist-microsoft-copilot-f-r-word-" className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-blue-500 mb-6">Was ist Microsoft Copilot für Word?</h2>
          <h3 className="text-xl font-semibold mb-3 mt-6 border-l-4 border-l-blue-500 pl-4">Überblick</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Microsoft Copilot für Word</strong> ist Teil von Microsoft 365 Copilot und nutzt Large Language Models (LLMs), um Sie bei allen Aspekten der Dokumentenerstellung zu unterstützen.</p>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Kernfunktionen:</strong></p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Texterstellung aus Prompts</li>
            <li>Zusammenfassungen erstellen</li>
            <li>Dokumente umschreiben und verbessern</li>
            <li>Formatierung und Strukturierung</li>
            <li>Tonalität anpassen</li>
            <li>Recherche und Faktencheck</li>
          </ul>
          <h3 className="text-xl font-semibold mb-3 mt-6 border-l-4 border-l-green-500 pl-4">Voraussetzungen</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Technische Requirements:</strong></p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Microsoft 365 E3/E5 oder Business Standard/Premium</li>
            <li>Microsoft Copilot Lizenz (€30/Benutzer/Monat)</li>
            <li>Word für Web, Desktop (Windows/Mac) oder Mobile</li>
            <li>Internet-Verbindung</li>
          </ul>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Skills:</strong></p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Grundkenntnisse in Microsoft Word</li>
            <li>Verständnis für Prompt Engineering (hilfreich)</li>
            <li>Klare Formulierung von Anforderungen</li>
          </ul>
        </section>

        <section id="copilot-in-word-aktivieren" className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-green-500 mb-6">Copilot in Word aktivieren</h2>
          <h3 className="text-xl font-semibold mb-3 mt-6 border-l-4 border-l-purple-500 pl-4">Zugriff auf Copilot</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Option 1: Copilot-Symbol im Ribbon</strong></p>
          <p className="mb-4 text-gray-700 leading-relaxed">1. Öffnen Sie Word</p>
          <p className="mb-4 text-gray-700 leading-relaxed">2. Klicken Sie auf das Copilot-Symbol in der Ribbon-Leiste</p>
          <p className="mb-4 text-gray-700 leading-relaxed">3. Das Copilot-Panel öffnet sich rechts</p>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Option 2: Shortcut</strong></p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Drücken Sie `Alt + I` (Windows) oder `Option + I` (Mac)</li>
          </ul>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Option 3: Im Dokument</strong></p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Klicken Sie auf die Copilot-Schaltfläche unterhalb des Titels bei leerem Dokument</li>
          </ul>
          <h3 className="text-xl font-semibold mb-3 mt-6 border-l-4 border-l-cyan-500 pl-4">Erste Schritte</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>1. Leeres Dokument erstellen – mit vollständigem CRAFT-Prompt</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>{`Prompt: "Du bist ein erfahrener Projektmanager mit Expertise in IT-Rollouts.
Erstelle einen detaillierten Projektplan für die unternehmensweite
Einführung von Microsoft Copilot in einem mittelständischen
Maschinenbauunternehmen mit 500 Mitarbeitern.

Kontext:
- Budget: 180.000 € für Lizenzen und Schulungen im ersten Jahr
- Pilotgruppe: 50 Mitarbeiter aus Marketing, Vertrieb und Engineering
- IT-Landschaft: Microsoft 365 E3, Teams bereits etabliert
- Zeitrahmen: 6 Monate vom Kick-off bis Full-Rollout

Der Plan soll enthalten:
1. Executive Summary (max. 150 Wörter)
2. Phasenplan mit konkreten Meilensteinen und Daten
3. Rollen und Verantwortlichkeiten (RACI-Matrix)
4. Schulungskonzept mit Zeitaufwänden pro Mitarbeitergruppe
5. KPIs zur Erfolgsmessung (mindestens 5 messbare Kennzahlen)
6. Risikomatrix mit Mitigationsmaßnahmen
7. Budget-Breakdown pro Phase

Tonalität: Professionell, strukturiert, für Geschäftsführung geeignet.
Format: Mit Überschriften H2/H3, Bullet-Points wo sinnvoll, Tabellen für RACI und Budget."`}</code></pre>
          </div>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>2. Copilot generiert sofort:</strong></p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Strukturierten Text mit Überschriften und professioneller Gliederung</li>
            <li>Realistische Zeitpläne basierend auf dem 6-Monats-Rahmen</li>
            <li>Budget-Aufteilung entsprechend der 180.000 € Vorgabe</li>
            <li>Konkrete KPIs wie Adoptionsrate, Zeitersparnis, NPS-Score</li>
          </ul>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>3. Iterieren und verfeinern:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>{`Prompt: "Ergänze den Projektplan um folgende Aspekte:

1. Detaillierte Zeitachse als Gantt-Chart-Beschreibung mit
   Kalenderwochen von KW 12 bis KW 36
2. Change-Management-Aktivitäten pro Phase:
   - Kommunikationsmaßnahmen (E-Mails, Town Halls, Intranet-Posts)
   - Champions-Programm mit Auswahlkriterien und Schulungsplan
   - Feedback-Schleifen mit konkreten Umfrage-Terminen
3. Eskalationsprozess bei technischen oder organisatorischen Problemen
4. Abhängigkeiten zwischen den Meilensteinen als Tabelle

Halte die gleiche professionelle Tonalität bei."`}</code></pre>
          </div>
        </section>

        <section id="hauptfunktionen-im-detail" className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-emerald-500 mb-6">Hauptfunktionen im Detail</h2>
          <h3 className="text-xl font-semibold mb-3 mt-6 border-t-4 border-t-emerald-500 pt-4">1. Dokumente erstellen (Draft)</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Use Case:</strong> Vom leeren Dokument zum fertigen Entwurf</p>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>CRAFT-konforme Prompts:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>{`"Erstelle einen formellen Entschuldigungsbrief an die Müller GmbH
(Ansprechpartner: Frau Dr. Schmidt, Einkaufsleiterin).

Kontext: Unser Projekt 'ERP-Migration' hat sich um 6 Wochen
verzögert wegen unerwarteter Schnittstellenprobleme mit dem
Legacy-System. Ursprünglicher Go-Live: 15. März 2026,
neuer Termin: 30. April 2026.

Der Brief soll:
- Die Verzögerung bedauern ohne Schuldzuweisungen
- Die technischen Gründe kurz und verständlich erklären
- Konkrete Maßnahmen nennen, die wir ergriffen haben
- Den neuen, realistischen Zeitplan präsentieren
- Ein Kompensationsangebot machen (10% Rabatt auf Wartungsvertrag)
- Mit positivem Ausblick auf die Zusammenarbeit enden

Tonalität: Professionell, lösungsorientiert, wertschätzend.
Format: Klassischer Geschäftsbrief mit Briefkopf-Platzhalter.
Länge: 1 Seite (ca. 300 Wörter)."`}</code></pre>
          </div>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>{`"Du bist ein erfahrener B2B-Content-Marketer.
Schreibe einen Blogartikel zum Thema 'KI-gestützte Qualitätskontrolle
in der Fertigung'.

Zielgruppe: Produktionsleiter und COOs in mittelständischen
Fertigungsunternehmen (50-500 Mitarbeiter), technisch interessiert
aber keine KI-Experten.

Struktur:
1. Hook: Reales Problem (Ausschussquoten, manuelle Prüfkosten)
2. Erklärung: Wie funktioniert KI-Qualitätskontrolle (ohne Fachjargon)
3. 3 konkrete Anwendungsbeispiele aus verschiedenen Branchen
4. ROI-Argumentation mit Beispielrechnung
5. Implementierungs-Roadmap (Pilot → Scale)
6. Call-to-Action: Beratungsgespräch vereinbaren

Tonalität: Kompetent aber zugänglich, praxisnah mit Zahlen,
keine Marketing-Floskeln.
Länge: 1.200 Wörter.
SEO: Keyword 'KI Qualitätskontrolle' 3-4x natürlich einbauen."`}</code></pre>
          </div>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>{`"Erstelle eine detaillierte Meeting-Agenda für unser
Q2 Strategy Review am 15. April 2026, 14:00-17:00 Uhr.

Teilnehmer:
- CEO (Thomas Berger) - erwartet Executive Summary
- CFO (Lisa Müller) - fokussiert auf Zahlen und Forecasts
- VP Sales (Michael Chen) - präsentiert Pipeline-Update
- VP Engineering (Sarah Weber) - Tech-Roadmap
- Marketing Director (Anna Hoffmann) - Campaign Performance

Schwerpunkte:
1. Q1 Performance vs. Plan (30 Min) - wer präsentiert was
2. Market Insights & Wettbewerbsanalyse (20 Min)
3. Q2-Q4 Forecast Adjustment (45 Min) - mit Szenarien
4. Strategische Initiativen: Status und Entscheidungen (60 Min)
5. Open Discussion & Next Steps (25 Min)

Für jeden Agendapunkt angeben:
- Verantwortlicher Präsentator
- Zeitslot mit Puffer
- Erwartetes Ergebnis (Information/Diskussion/Entscheidung)
- Benötigte Vorbereitungen der Teilnehmer

Format: Professionelle Agenda-Tabelle mit Timing."`}</code></pre>
          </div>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Tipps:</strong></p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Je spezifischer der Prompt, desto besser das Ergebnis</li>
            <li>Kontext und Zielgruppe angeben</li>
            <li>Gewünschte Länge nennen</li>
            <li>Tonalität spezifizieren (formal, casual, technisch, etc.)</li>
          </ul>
          <h3 className="text-xl font-semibold mb-3 mt-6 border-t-4 border-t-red-500 pt-4">2. Texte zusammenfassen (Summarize)</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Use Case:</strong> Lange Dokumente schnell erfassen</p>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>CRAFT-konforme Prompts:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>{`"Fasse dieses 20-seitige Marktanalyse-Dokument zusammen für
einen CEO, der in 5 Minuten einen Überblick braucht.

Struktur der Zusammenfassung:
1. Die 3 wichtigsten Erkenntnisse (je max. 2 Sätze)
2. Größte Chance für unser Unternehmen (konkret und quantifiziert)
3. Größtes Risiko (mit empfohlener Gegenmaßnahme)
4. Die eine strategische Entscheidung, die jetzt ansteht
5. Empfehlung: Was sollten wir als nächstes tun?

Wichtig:
- Keine Fachbegriffe ohne Erklärung
- Zahlen aus dem Dokument einbauen wo verfügbar
- Aussagen mit 'laut Seite X' referenzieren
- Unsicherheiten transparent machen

Format: Nummerierte Liste, max. 400 Wörter gesamt."`}</code></pre>
          </div>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>{`"Erstelle eine Executive Summary dieses Audit-Berichts für den
Vorstand unseres Kunden (Branchen-Outsider, keine IT-Experten).

Die Executive Summary soll enthalten:
- Management Summary (max. 3 Sätze): Was wurde geprüft, Gesamturteil
- Positive Feststellungen (3 Bullet Points): Was läuft gut
- Kritische Feststellungen (priorisiert nach Risiko):
  * Hohes Risiko (sofortiger Handlungsbedarf)
  * Mittleres Risiko (innerhalb 3 Monate beheben)
  * Niedriges Risiko (Optimierungspotenzial)
- Kostenimplikation: Geschätzter Aufwand für Behebung
- Nächste Schritte: Konkreter Maßnahmenplan mit Terminen

Tonalität: Sachlich, lösungsorientiert, nicht alarmistisch.
Länge: Exakt 1 Seite (ca. 500 Wörter).
Wichtig: Technische Details nur wo unbedingt nötig, dann mit Erklärung."`}</code></pre>
          </div>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>{`"Analysiere dieses Dokument und extrahiere alle
Handlungsempfehlungen in einem strukturierten Format.

Für jede Handlungsempfehlung dokumentiere:
1. Was genau ist zu tun? (Konkrete Maßnahme)
2. Wer sollte es tun? (Rolle/Abteilung)
3. Bis wann? (Falls im Dokument genannt)
4. Welches Problem löst es? (Bezug zum Dokument)
5. Priorität (Hoch/Mittel/Niedrig basierend auf Kontext)
6. Fundstelle: Auf welcher Seite/in welchem Abschnitt steht das?

Zusätzlich:
- Gruppiere ähnliche Empfehlungen thematisch
- Kennzeichne widersprüchliche Empfehlungen (falls vorhanden)
- Markiere Empfehlungen ohne klare Verantwortungszuweisung

Ausgabe als Tabelle sortiert nach Priorität."`}</code></pre>
          </div>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Anwendungsfälle:</strong></p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Meeting-Protokolle verdichten</li>
            <li>Research-Berichte auf Kernaussagen reduzieren</li>
            <li>Verträge auf wichtige Punkte prüfen</li>
            <li>E-Mail-Threads zusammenfassen</li>
          </ul>
          <h3 className="text-xl font-semibold mb-3 mt-6 border-t-4 border-t-amber-500 pt-4">3. Texte umschreiben (Rewrite)</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Use Case:</strong> Bestehende Texte verbessern</p>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>CRAFT-konforme Varianten:</strong></p>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Kürzer machen (mit Qualitätskriterien):</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>{`"Kürze diesen 500-Wörter-Absatz auf maximal 150 Wörter.

Vorgaben für das Kürzen:
- Behalte die Kernaussage: [hier Kernaussage einfügen]
- Diese Fakten müssen erhalten bleiben: [Fakt 1], [Fakt 2]
- Entferne: Redundanzen, Füllwörter, Nebensächliches
- Stil: Aktive Formulierungen, kurze Sätze (max. 15 Wörter)
- Der gekürzte Text muss ohne Vorwissen verständlich sein

Zeige mir auch, was du gestrichen hast und warum."`}</code></pre>
          </div>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Tonalität ändern (mit konkretem Zielbild):</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>{`"Formuliere diesen internen Projektbericht so um, dass er als
LinkedIn-Post für unser Firmenprofil funktioniert.

Ursprungstext: [technischer Projektbericht]

Anforderungen an den neuen Text:
- Zielgruppe: Potenzielle B2B-Kunden und Talente
- Tonalität: Stolz auf Erreichtes, aber nicht prahlerisch
- Länge: 150-200 Wörter (LinkedIn-optimal)
- Struktur: Hook → Story → Learning → Soft-CTA
- Einbauen: 2-3 relevante Hashtags
- Vermeiden: Interne Abkürzungen, technischer Jargon
- Der Projektname darf genannt werden, aber keine Kundennamen

Mach 2 Versionen: Eine enthusiastischer, eine sachlicher."`}</code></pre>
          </div>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Komplexität anpassen (für definierte Zielgruppe):</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>{`"Erkläre diesen technischen Absatz über unsere Cloud-Migration
für den Aufsichtsrat (Durchschnittsalter 62, keine IT-Hintergründe,
aber hohe Business-Kompetenz).

Der umgeschriebene Text soll:
- Alle Fachbegriffe entweder ersetzen oder in Klammern erklären
- Analogien aus dem klassischen Geschäftsleben verwenden
- Die Business-Relevanz (Kosten, Risiken, Chancen) betonen
- Konkrete Zahlen nennen wo möglich (€, %, Monate)
- In 3 Absätzen aufgebaut sein: Was, Warum, Was bedeutet das für uns
- Ohne Wertung der IT-Entscheidungen bleiben (neutral informierend)

Maximale Länge: 250 Wörter.
Erstelle zusätzlich eine Glossar-Box mit 3-4 Schlüsselbegriffen."`}</code></pre>
          </div>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Struktur verbessern (mit Zielformat):</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>{`"Dieser Text ist als fortlaufender Fließtext schwer lesbar.
Strukturiere ihn nach folgendem Muster um:

Zielstruktur:
1. Einleitender Absatz (max. 3 Sätze): Worum geht es?
2. Hauptteil mit H3-Zwischenüberschriften (3-5 Abschnitte)
3. Jeder Abschnitt: 1 Einleitungssatz + 2-4 Bullet Points
4. Kernzahlen in Fettschrift hervorheben
5. Abschließender Absatz: Fazit und nächster Schritt

Zusätzlich:
- Absätze nach logischen Themenblöcken trennen
- Aufzählungen dort verwenden, wo 3+ ähnliche Punkte aufgelistet werden
- Übergangssätze hinzufügen wo der Gedankenfluss springt
- Eine 'Key Takeaways'-Box am Ende einfügen (3 Punkte)

Inhalt darf nicht verändert werden, nur die Präsentation."`}</code></pre>
          </div>
          <h3 className="text-xl font-semibold mb-3 mt-6 border-t-4 border-t-indigo-500 pt-4">4. Aus anderen Dokumenten erstellen</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Use Case:</strong> Mehrere Quellen kombinieren</p>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>CRAFT-konformer Beispiel-Prompt:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>{`"Erstelle ein professionelles Angebot für die Müller GmbH basierend
auf folgenden Quelldokumenten:

Quellen:
1. /Meeting-Notizen-Müller-15-März.docx
   → Extrahiere: Kundenbedürfnisse, Pain Points, Budget-Rahmen
2. /Kundenanforderungen-Müller.xlsx
   → Extrahiere: Technische Spezifikationen, Mengen, Zeitplan
3. /Preisliste-2026-Q1.pdf
   → Verwende: Aktuelle Listenpreise, Rabattstaffel Enterprise

Struktur des Angebots:
1. Deckblatt mit Kundenname, Datum, Angebotsnummer
2. Management Summary (warum wir der richtige Partner sind)
3. Verständnis der Anforderungen (zeigt, dass wir zugehört haben)
4. Lösungskonzept mit allen Komponenten aus der Anforderungsliste
5. Preistabelle (Positionen aus Excel, Preise aus Preisliste)
6. Timeline mit Meilensteinen (aus Meeting-Notizen ableiten)
7. Nächste Schritte und Gültigkeitsdauer

Regeln:
- Bei widersprüchlichen Informationen: Meeting-Notizen haben Vorrang
- Rabatt von 15% auf Gesamtsumme einrechnen (im Meeting besprochen)
- Zahlungsbedingungen: 30 Tage netto
- Angebotsgültigkeit: 30 Tage

Tonalität: Professionell, kundenorientiert, lösungsfokussiert."`}</code></pre>
          </div>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Copilot kann:</strong></p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Informationen aus SharePoint-Dokumenten ziehen (mit Pfad referenzieren)</li>
            <li>E-Mails aus Outlook referenzieren (nach Datum, Absender oder Betreff)</li>
            <li>Excel-Daten integrieren (Tabellen, Berechnungen, Diagrammbeschreibungen)</li>
            <li>PowerPoint-Inhalte einbinden (Slide-Inhalte als Text)</li>
          </ul>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Weitere Multi-Dokument-Prompts:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>{`"Erstelle einen Wettbewerbsvergleich basierend auf:
- /Analyse-Wettbewerber-A.docx (Stärken, Schwächen, Preise)
- /Analyse-Wettbewerber-B.docx (Stärken, Schwächen, Preise)
- /Unsere-Positionierung.pptx (unsere USPs und Preise)

Format: Vergleichstabelle mit Bewertung (++, +, o, -, --)
für die Kategorien: Preis, Funktionsumfang, Support, Integration, UX.
Unter der Tabelle: 3-Sätze-Fazit für den Vertrieb."`}</code></pre>
          </div>
          <h3 className="text-xl font-semibold mb-3 mt-6 border-t-4 border-t-slate-500 pt-4">5. Formatierung und Struktur</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Use Case:</strong> Professionelles Layout automatisch</p>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>CRAFT-konforme Prompts:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>{`"Strukturiere diesen Fließtext als professionellen Consulting-Report.

Formatierungs-Vorgaben:
- H2-Überschriften für Hauptkapitel (max. 5-6 Wörter)
- H3-Unterüberschriften für Abschnitte innerhalb der Kapitel
- Nummerierte Listen für sequenzielle Schritte oder Priorisierungen
- Bullet Points für ungeordnete Aufzählungen (max. 5-7 Punkte pro Liste)
- Wichtige Zahlen und Kennzahlen in Fettschrift
- Direkte Zitate in Kursiv mit Quellenangabe
- Tabellen für Vergleiche mit 3+ Dimensionen

Zusätzlich einbauen:
- Callout-Box 'Wichtig' für kritische Informationen
- Callout-Box 'Praxis-Tipp' für konkrete Handlungsempfehlungen
- Seitenumbrüche vor jedem H2-Kapitel (Hinweis: hier einfügen)

Corporate Design beachten:
- Keine Emojis oder informellen Marker
- Absätze zwischen 50-100 Wörtern
- Konsistente Terminologie (wenn 'Mitarbeiter', dann immer 'Mitarbeiter')"`}</code></pre>
          </div>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>{`"Füge diesem Dokument professionelle Rahmung hinzu:

1. Einleitung (150-200 Wörter):
   - Kontext: Warum wurde dieses Dokument erstellt?
   - Scope: Was wird behandelt, was nicht?
   - Zielgruppe: Für wen ist es geschrieben?
   - Lesehinweis: Wie sollte man es lesen (linear vs. nach Bedarf)?

2. Executive Summary am Anfang (max. 300 Wörter):
   - Die 3 wichtigsten Erkenntnisse
   - Die zentrale Empfehlung
   - Nächste Schritte mit Verantwortlichkeiten

3. Zusammenfassung am Ende:
   - Recap der Kernpunkte
   - Offene Fragen/nächste Schritte
   - Kontaktinformation für Rückfragen

4. Navigations-Hilfen:
   - Klickbares Inhaltsverzeichnis (auf Seite 2)
   - Kopfzeile mit Dokumenttitel und Datum
   - Fußzeile mit Seitenzahlen 'Seite X von Y'"`}</code></pre>
          </div>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>{`"Erstelle ein strukturiertes Inhaltsverzeichnis für dieses Dokument
im folgenden Format:

Anforderungen:
- Verzeichnis auf separater Seite nach dem Deckblatt
- Hierarchie: Hauptkapitel (1, 2, 3...) und Unterkapitel (1.1, 1.2...)
- Seitenzahlen rechtsbündig mit Punktlinie-Verbindung
- Maximal 3 Ebenen tief (keine 1.1.1.1)

Zusätzlich erstellen:
- Abbildungsverzeichnis (falls Bilder referenziert werden)
- Tabellenverzeichnis (falls Tabellen vorhanden)
- Abkürzungsverzeichnis mit allen im Dokument verwendeten Abkürzungen

Kapitelüberschriften sollen:
- Aussagekräftig sein (nicht nur 'Einleitung', sondern 'Einleitung: Warum dieses Projekt jetzt')
- Parallel formuliert sein (alle als Substantiv ODER alle als Frage)
- Max. 7 Wörter lang sein"`}</code></pre>
          </div>
        </section>

        <section id="praktische-anwendungsf-lle" className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-purple-500 mb-6">Praktische Anwendungsfälle</h2>
          <h3 className="text-xl font-semibold mb-3 mt-6 border-l-4 border-l-purple-500 pl-4">1. Business-Dokumente</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Geschäftsbriefe:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>{`Prompt: "Erstelle einen Angebotsbrief für unsere
'Copilot Enablement Services' an die Technik GmbH.

Empfänger: Herr Dr. Schneider (CIO)
Kontext: Erstkontakt nach Messe-Gespräch auf der Hannover Messe
Budget des Kunden: ca. 50.000 € (im Gespräch erwähnt)

Unsere USPs betonen:
- 200+ erfolgreiche Copilot-Einführungen in der DACH-Region
- Branchenspezifische Prompt-Bibliotheken für Maschinenbau
- Messbarer ROI innerhalb von 6 Monaten garantiert

Struktur:
1. Persönlicher Bezug zum Messe-Gespräch
2. Kurze Wiederholung des Kundenbedarfs (zeigt Zuhören)
3. Passende Leistungspakete (2-3 Optionen mit Preisen)
4. Referenz: Ähnlicher Kunde in der Branche
5. Konkreter nächster Schritt (Termin für Vertiefung)

Tonalität: Professionell-persönlich, nicht aufdringlich.
Länge: 1 Seite, max. 400 Wörter."`}</code></pre>
          </div>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Proposals:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>{`Prompt: "Erstelle ein Projekt-Proposal für 'KI-gestützte
Dokumentenautomatisierung' für die Versicherungs AG.

Problemstellung des Kunden (aus Briefing-Call):
- 15.000 Schadenmeldungen/Monat manuell bearbeitet
- Durchlaufzeit aktuell: 12 Arbeitstage
- Fehlerquote: 8% (führt zu Kundenreklamationen)
- Ziel: Durchlaufzeit auf 3 Tage, Fehlerquote unter 2%

Unsere Lösung:
- Microsoft Copilot für automatische Kategorisierung
- Power Automate für Routing
- Custom GPT für Antwortvorschläge

Das Proposal soll enthalten:
1. Executive Summary (max. 1/2 Seite)
2. Situation Analysis (aktuelle Pain Points quantifiziert)
3. Solution Overview (visuell mit Prozessdiagramm-Beschreibung)
4. Implementation Approach (Phasen mit Meilensteinen)
5. Investment & ROI (Kosten vs. Einsparungen über 3 Jahre)
6. Risk Mitigation (Top 3 Risiken mit Gegenmaßnahmen)
7. Why Us (Differenzierung zum Wettbewerb)
8. Next Steps (konkreter Aktionsplan)

Länge: 8-10 Seiten. Tonalität: Beratend, lösungsorientiert."`}</code></pre>
          </div>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Reports:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>{`Prompt: "Erstelle einen Quarterly Business Review (QBR) Report
für Q1 2026 basierend auf folgenden Daten:

Datenquellen:
- Umsatz: 2,3 Mio € (Plan: 2,5 Mio €) = -8%
- Neukundengewinnung: 12 (Plan: 15) = -20%
- Churn Rate: 3,2% (Vorquartal: 2,8%)
- NPS Score: 47 (Branchendurchschnitt: 42)
- Pipeline Q2: 4,1 Mio € (Conversion erwaret: 35%)

Zielgruppe: Vorstand und Investoren-Board (5 Personen)

Struktur des Reports:
1. Executive Summary (max. 150 Wörter): Lage in 30 Sekunden
2. Financial Performance mit Waterfall-Chart-Beschreibung
3. Customer Metrics mit Trend-Analyse (3-Quartale-Vergleich)
4. Pipeline Analysis mit Wahrscheinlichkeits-Gewichtung
5. Strategic Initiatives: Status-Update zu Top 5 Projekten
6. Challenges & Mitigations (ehrliche Analyse)
7. Outlook Q2 mit Best/Base/Worst Case Szenario
8. Appendix: Detailtabellen

Wichtig:
- Negativentwicklungen nicht beschönigen, aber lösungsorientiert
- Bei jeder Metrik: Kontext geben (warum dieser Wert?)
- Empfehlungen immer mit konkreten Maßnahmen verknüpfen

Format: Professioneller Management-Report, 12-15 Seiten."`}</code></pre>
          </div>
          <h3 className="text-xl font-semibold mb-3 mt-6 border-l-4 border-l-green-500 pl-4">2. Marketing-Content</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Blog-Artikel:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>{`Prompt: "Schreibe einen SEO-optimierten Blogartikel zum Thema
'Microsoft Copilot Kosten-Nutzen-Analyse für KMU'.

SEO-Vorgaben:
- Hauptkeyword: 'Microsoft Copilot Kosten' (4-5x verwenden)
- Nebenkeywords: 'Copilot ROI', 'Copilot Lizenzkosten', 'Copilot KMU'
- Meta-Description: Max. 155 Zeichen, mit Hauptkeyword
- URL-Vorschlag: /blog/microsoft-copilot-kosten-kmu

Struktur:
- H1: Frage oder konkreter Nutzen (nicht das Keyword allein)
- 5-6 H2-Abschnitte mit logischem Aufbau
- Jeder H2-Abschnitt: 150-250 Wörter
- Mindestens 1 H3 pro H2-Abschnitt
- Bullet-Listen wo sinnvoll (max. 7 Punkte)
- 1 Tabelle (z.B. Lizenzkosten-Vergleich)
- 1 FAQ-Sektion am Ende (3-4 Fragen)

Inhaltliche Anforderungen:
- Reale Zahlen verwenden (€30/User/Monat für Copilot)
- Konkrete Beispielrechnung für 20 Mitarbeiter
- Mindestens 2 Praxisbeispiele/Anwendungsfälle
- Backlink-würdige Aussage (quotable für andere Blogs)

Tonalität: Informativ, kompetent, aber nicht akademisch.
Gesamtlänge: 1.500 Wörter (±100)."`}</code></pre>
          </div>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Social Media Posts:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>{`Prompt: "Erstelle 8 LinkedIn-Posts basierend auf diesem Whitepaper
'Die Zukunft der Wissensarbeit mit KI'.

Post-Formate (je 2x):
1. Storytelling-Post: Konkretes Beispiel aus dem Whitepaper
2. Statistik-Post: Eine überraschende Zahl mit Einordnung
3. How-To-Post: Praktischer Tipp zum sofort Umsetzen
4. Contrarian-Post: Gegen-den-Strom-Meinung aus dem Whitepaper

Für jeden Post:
- Hook (erste Zeile): Attention-Grabber, keine Clickbait
- Body: 100-150 Wörter, mit Zeilenumbrüchen für Lesbarkeit
- CTA: Soft (Meinung fragen) oder Hard (Link zum Whitepaper)
- 3-4 relevante Hashtags (nicht mehr!)
- Emoji: Maximal 2 pro Post, keine am Anfang

Tonalität-Varianten:
- Posts 1-4: Sachlich-informativ (für Entscheider)
- Posts 5-8: Persönlicher, meinungsstark (für Engagement)

Posting-Zeiten-Empfehlung beifügen (Di-Do, 8-9 oder 17-18 Uhr)."`}</code></pre>
          </div>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Case Studies:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>{`Prompt: "Erstelle eine Case Study für unsere Copilot-Einführung
bei der Logistik Express GmbH (anonymisiert: 'mittelständisches
Logistikunternehmen').

Fakten aus dem Projekt:
- 350 Mitarbeiter, davon 120 Copilot-User
- Branche: Transport & Logistik
- Projektzeitraum: 3 Monate (Sept-Nov 2025)
- Investition: ca. 65.000 € (Lizenzen + Training)
- Ergebnisse nach 6 Monaten:
  * Zeitersparnis: Ø 45 Min/Tag in der Disposition
  * E-Mail-Bearbeitung: 40% schneller
  * Angebotserstellen: von 2h auf 25 Min
  * Mitarbeiterzufriedenheit: +18 NPS-Punkte
- O-Ton vom CEO (genehmigt): 'Copilot hat unsere Arbeitsweise
  revolutioniert – nach anfänglicher Skepsis will niemand mehr zurück.'

Case Study Struktur:
1. Headline mit messbarem Ergebnis (nicht Firmenname)
2. Snapshot-Box: Branche, Größe, Ergebnisse auf einen Blick
3. The Challenge (250 Wörter): Situation vor Copilot
4. The Solution (300 Wörter): Was wir gemacht haben
5. The Results (250 Wörter): Zahlen, Zahlen, Zahlen
6. Key Learnings (3 Bullet Points)
7. Testimonial-Zitat groß formatiert
8. CTA: Ähnliche Ergebnisse erzielen?

Format: 2 Seiten, viel Weißraum, Infografik-würdige Darstellung."`}</code></pre>
          </div>
          <h3 className="text-xl font-semibold mb-3 mt-6 border-l-4 border-l-cyan-500 pl-4">3. HR-Dokumente</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Stellenbeschreibungen:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>{`Prompt: "Erstelle eine moderne Stellenbeschreibung für die Position
'Senior Data Analyst (m/w/d)' in unserem Analytics-Team.

Kontext zum Unternehmen:
- Mittelständisches E-Commerce-Unternehmen, 280 Mitarbeiter
- Hauptsitz München, Remote-First-Kultur (3 Tage Home Office)
- Startup-Mentalität in etablierter Struktur
- Tech-Stack: Python, SQL, Tableau, dbt, Snowflake

Die Position:
- Report an: Head of Business Intelligence
- Team: 5 Personen (2 Analysts, 2 Engineers, 1 Manager)
- Fokus: Kundenverhalten, Marketing-Attribution, Pricing

Stellenbeschreibung soll enthalten:
1. Catchy Einstieg (nicht 'Wir suchen...', sondern Benefit für Bewerber)
2. Das erwartet dich: Aufgaben als Bullet Points (max. 6)
3. Das bringst du mit: Must-haves (4-5) und Nice-to-haves (3)
4. Das bieten wir: Echte Benefits, keine Floskeln
5. Bewerbungsprozess: Was erwartet die Bewerber?

Tonalität: Modern, auf Augenhöhe, aber professionell.
Sprache: Du-Form, inklusive Sprache (nicht nur m/w/d).
Kein Corporate-Bullshit: 'Spannende Aufgaben' → konkret was
Länge: 600-800 Wörter."`}</code></pre>
          </div>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Performance Reviews:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>{`Prompt: "Formuliere ein konstruktives Performance-Feedback für
eine Mitarbeiterin im Jahresgespräch.

Leistungsdaten (aus HR-System):
- Zielerreichung: 87% (Ziel: 100%)
- Projektabschlüsse: 4 von 5 termingerecht
- Kundenzufriedenheit: 4,2/5 (Teamschnitt: 3,9)
- Weiterbildung: 2 Zertifizierungen absolviert
- 360-Grad-Feedback: Kommunikation ausbaufähig (3,1/5)
- Krankenstand: 12 Tage (über Teamschnitt)

Das Feedback soll:
1. Mit Wertschätzung für Stärken beginnen (konkret, nicht pauschal)
2. Entwicklungsfelder ansprechen (nicht als Kritik, sondern Wachstum)
3. Konkrete Beispiele für jede Aussage geben
4. Bei Krankenstand: sensibel ansprechen, nicht vorwerfen
5. Gemeinsam Ziele für nächstes Jahr ableiten

Struktur:
- Rückblick: Was lief gut? Was hätte besser laufen können?
- Stärken: 3 konkrete Stärken mit Beispielen
- Entwicklungsfelder: 2 Bereiche mit Unterstützungsangebot
- Ausblick: 3-4 SMART-Ziele für nächstes Jahr vorschlagen
- Abschluss: Wertschätzung und Unterstützungszusage

Tonalität: Wertschätzend, klar, zukunftsorientiert.
Länge: 1 Seite (ca. 500 Wörter)."`}</code></pre>
          </div>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Policies:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>{`Prompt: "Erstelle eine praxistaugliche Remote Work Policy für ein
deutsches Unternehmen mit 150 Mitarbeitern.

Rahmenbedingungen:
- Branche: IT-Dienstleistung
- Bestehendes Modell: 2 Tage Büropflicht, 3 Tage frei wählbar
- Kernarbeitszeit: 10-15 Uhr (muss erhalten bleiben)
- IT-Setup: Laptops werden gestellt, BYOD erlaubt
- Internationales Team: 10% der MA im EU-Ausland

Die Policy soll regeln:
1. Geltungsbereich: Wer ist betroffen, welche Ausnahmen gibt es?
2. Zeitliche Regelungen: Kernzeit, Erreichbarkeit, Zeiterfassung
3. Arbeitsort: Deutschland, EU, außerhalb EU (steuerlich!)
4. Equipment: Was stellt die Firma, was der MA?
5. Arbeitssicherheit: Ergonomie-Vorgaben, Gefährdungsbeurteilung
6. Datenschutz: VPN-Pflicht, Screen-Lock, vertrauliche Gespräche
7. Kommunikation: Erreichbarkeitserwartungen, Tool-Standards
8. Kosten: Internet-Pauschale, Büromöbel, Arbeitsmittel
9. Ausnahmen & Eskalation: Wer entscheidet bei Sonderfällen?

Rechtliche Anforderungen beachten:
- Arbeitszeitgesetz (max. 10h/Tag, Pausen)
- Arbeitsschutzgesetz (Gefährdungsbeurteilung)
- DSGVO (Datenverarbeitung im Home Office)
- Betriebsvereinbarung-Hinweis (falls BR vorhanden)

Format: Offizielles Policy-Dokument mit Versionierung.
Tonalität: Klar und verbindlich, aber nicht bürokratisch.
Länge: 3-4 Seiten."`}</code></pre>
          </div>
          <h3 className="text-xl font-semibold mb-3 mt-6 border-l-4 border-l-emerald-500 pl-4">4. Technische Dokumentation</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>User Manuals:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>{`Prompt: "Erstelle eine Schritt-für-Schritt Anleitung für den
Prozess 'Neuen Mitarbeiter im HR-System anlegen'.

Zielgruppe: HR-Sachbearbeiter ohne IT-Hintergrund.
System: SAP SuccessFactors
Durchschnittliche Bearbeitungszeit: ca. 15 Minuten

Die Anleitung soll enthalten:
1. Voraussetzungen: Was muss vor Start bereitliegen?
2. Schritt-für-Schritt-Anleitung:
   - Jeden Klick einzeln beschreiben (Menü → Untermenü → Button)
   - [Screenshot-Platzhalter] mit Beschreibung was zu sehen sein soll
   - Eingabefelder: Wo, was eingeben, Formatvorgaben
   - Pflichtfelder mit (*) kennzeichnen
   - Wartezeiten/Ladebalken erwähnen
3. Validierung: Wie prüft man, ob es geklappt hat?
4. Troubleshooting-Sektion:
   - 'Fehlermeldung X' → Lösung
   - 'Button ist ausgegraut' → mögliche Ursachen
   - 'System reagiert nicht' → Was tun?
5. Kontakt bei weiteren Problemen

Format:
- Nummerierte Schritte (1, 2, 3... nicht 1.1, 1.2)
- Jeder Schritt: Max. 2 Sätze
- Pro Seite max. 5-6 Schritte (lesbar bleiben)
- Callout-Boxen für Tipps und Warnungen

Länge: 4-5 Seiten mit großzügigen Screenshot-Platzhaltern."`}</code></pre>
          </div>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>API Dokumentation:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>{`Prompt: "Dokumentiere folgenden REST API-Endpoint im
OpenAPI/Swagger-Stil für unser Developer Portal.

Endpoint: POST /api/v2/orders
Funktion: Neue Bestellung anlegen

Für diesen Endpoint dokumentiere:
1. Kurzbeschreibung (1-2 Sätze)
2. Authentication: Bearer Token (OAuth 2.0)
3. Request Headers (Content-Type, Authorization)
4. Request Body (JSON Schema):
   - Pflichtfelder: customer_id, items[], payment_method
   - Optionale Felder: shipping_address, coupon_code, notes
   - Datentypen, min/max Werte, Regex-Patterns wo relevant
5. Response (Success - 201):
   - Body-Struktur mit Beispiel
   - Wichtige Felder erklären (order_id, estimated_delivery)
6. Error Responses:
   - 400 Bad Request (mit möglichen Fehlerdetails)
   - 401 Unauthorized
   - 422 Unprocessable Entity (Validierungsfehler)
   - 500 Internal Server Error
7. Vollständiges Request/Response-Beispiel mit cURL
8. Rate Limits und Throttling
9. Hinweis auf verwandte Endpoints (GET /orders/{id}, DELETE /orders/{id})

Code-Beispiele in: cURL, Python (requests), JavaScript (fetch)."`}</code></pre>
          </div>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Changelog/Release Notes:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>{`Prompt: "Erstelle professionelle Release Notes für Version 3.2.0
unserer B2B-Plattform, basierend auf diesen Jira-Tickets:

Tickets:
- PLAT-1234: [Feature] Bulk-Import für Kundendaten (Story Points: 8)
- PLAT-1241: [Feature] PDF-Export für Berichte (Story Points: 5)
- PLAT-1252: [Bugfix] Login-Loop bei 2FA behoben (Critical)
- PLAT-1267: [Bugfix] Datumsformat in Reports falsch (Minor)
- PLAT-1289: [Performance] Dashboard lädt jetzt 40% schneller
- PLAT-1301: [Security] Dependency Update (log4j)
- PLAT-1315: [Deprecation] API v1 Sunset-Warnung hinzugefügt

Release Notes Struktur:
1. Release Summary (3 Sätze: Was ist neu, für wen relevant)
2. 🚀 Neue Features (mit kurzer Erklärung und Screenshot-Hinweis)
3. 🐛 Bugfixes (mit Impact-Beschreibung)
4. ⚡ Performance-Verbesserungen (mit Metriken)
5. 🔒 Security Updates (ohne Details, aber mit Handlungsbedarf)
6. ⚠️ Breaking Changes / Deprecations (mit Migration Guide)
7. Bekannte Einschränkungen (falls vorhanden)
8. Upgrade-Anleitung (für Self-Hosted-Kunden)

Zielgruppen berücksichtigen:
- Admins: Technische Details, Upgrade-Schritte
- Endnutzer: Was ändert sich für mich?
- Entwickler: API-Änderungen, Deprecations

Format: Markdown mit klarer Hierarchie, Emojis für Kategorien."`}</code></pre>
          </div>
        </section>

        <section id="best-practices-f-r-prompts" className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-cyan-500 mb-6">Best Practices für Prompts</h2>
          <h3 className="text-xl font-semibold mb-3 mt-6 border-l-4 border-l-cyan-500 pl-4">Die CRAFT-Formel</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>C - Context (Kontext)</strong></p>
          <p className="mb-4 text-gray-700 leading-relaxed">❌ "Schreibe einen Artikel über KI"</p>
          <p className="mb-4 text-gray-700 leading-relaxed">✅ "Schreibe einen Fachartikel über KI-gestützte Qualitätskontrolle in der Automobilzulieferer-Branche. Kontext: Unsere Kunden haben durchschnittlich 5% Ausschuss und wollen das auf unter 1% senken. Das Dokument ist für den ersten Termin mit einem potenziellen Neukunden (Produktionsleiter, 15 Jahre Erfahrung, skeptisch gegenüber KI)."</p>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>R - Role (Rolle)</strong></p>
          <p className="mb-4 text-gray-700 leading-relaxed">❌ "Erkläre Blockchain"</p>
          <p className="mb-4 text-gray-700 leading-relaxed">✅ "Du bist ein erfahrener CFO-Berater mit 20 Jahren Finanzexpertise. Erkläre Blockchain-Technologie so, dass ein konservativer Finanzvorstand einer deutschen Mittelstandsbank den geschäftlichen Nutzen versteht – ohne technischen Jargon, mit konkreten Anwendungsfällen aus dem Banking."</p>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>A - Action (Aktion)</strong></p>
          <p className="mb-4 text-gray-700 leading-relaxed">❌ "Etwas über Sales"</p>
          <p className="mb-4 text-gray-700 leading-relaxed">✅ "Erstelle einen 3-minütigen Elevator Pitch für unser SaaS-Produkt 'DataSync Pro'. USPs: 50% schnellere Integration, No-Code-Setup, DSGVO-konform. Ziel: Der Prospect soll einen Demo-Termin vereinbaren. Einwand-Behandlung für 'Wir haben schon eine Lösung' einbauen."</p>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>F - Format (Format)</strong></p>
          <p className="mb-4 text-gray-700 leading-relaxed">❌ "Schreibe über Projektmanagement"</p>
          <p className="mb-4 text-gray-700 leading-relaxed">✅ "Erstelle eine Checkliste für die ersten 90 Tage als neuer Projektmanager. Format: 10 Phasen (je 9 Tage), pro Phase 3-5 Checkpunkte. Jeder Checkpunkt mit: Aufgabe, Erfolgskriterium, typischer Stolperstein. Am Ende: One-Pager-Zusammenfassung für den Vorgesetzten."</p>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>T - Target (Zielgruppe)</strong></p>
          <p className="mb-4 text-gray-700 leading-relaxed">❌ "Erkläre Machine Learning"</p>
          <p className="mb-4 text-gray-700 leading-relaxed">✅ "Erkläre Machine Learning für Marketing-Manager im E-Commerce (keine technischen Vorkenntnisse, aber gutes Verständnis von KPIs wie Conversion Rate, ROAS). Fokus auf: Wie hilft ML bei Personalisierung? Welche Daten brauche ich? Was kostet das ungefähr? Konkrete Beispiele von Zalando, About You."</p>
          <h3 className="text-xl font-semibold mb-3 mt-6 border-l-4 border-l-blue-500 pl-4">Prompt-Patterns</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Pattern 1: Rolle + Aufgabe + Details</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>"Du bist [Rolle]. Erstelle [Dokumenttyp] für [Zielgruppe],\nder [Ziel] erreicht, mit [Tonalität] und [Format]"</code></pre>
          </div>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Pattern 2: Basierend auf + Transformation</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>"Basierend auf [Dokument1] und [Dokument2],\nerstelle [neues Dokument] mit Fokus auf [Aspekt]"</code></pre>
          </div>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Pattern 3: Iteratives Verfeinern</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>1. "Erstelle einen Entwurf für [X]"\n2. "Füge mehr Details zu [Aspekt] hinzu"\n3. "Ändere die Tonalität zu [Stil]"\n4. "Kürze auf [Länge]"</code></pre>
          </div>
        </section>

        <section id="erweiterte-techniken" className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-red-500 mb-6">Erweiterte Techniken</h2>
          <h3 className="text-xl font-semibold mb-3 mt-6 border-l-4 border-l-red-500 pl-4">1. Multi-Document Intelligence</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Copilot kann Informationen aus mehreren Quellen kombinieren:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>Prompt: "Erstelle einen Status-Report basierend auf:\n- Projekt-Timeline aus timeline.xlsx\n- Risiken aus risks.docx  \n- Budget-Status aus finance.xlsx\n- Team-Feedback aus E-Mails (letzten 2 Wochen)"</code></pre>
          </div>
          <h3 className="text-xl font-semibold mb-3 mt-6 border-l-4 border-l-amber-500 pl-4">2. Stil-Konsistenz</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Copilot lernt Ihren Schreibstil:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>Prompt: "Analysiere meinen Schreibstil in [vorheriges Dokument]\nund schreibe [neues Dokument] im gleichen Stil"</code></pre>
          </div>
          <h3 className="text-xl font-semibold mb-3 mt-6 border-l-4 border-l-indigo-500 pl-4">3. Bedingte Generierung</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>Prompt: "Erstelle 2 Versionen dieses Briefs:\nVersion A: Falls der Kunde zustimmt\nVersion B: Falls der Kunde ablehnt"</code></pre>
          </div>
          <h3 className="text-xl font-semibold mb-3 mt-6 border-l-4 border-l-slate-500 pl-4">4. Feedback-Loop</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>1. Prompt: "Erstelle [Dokument]"\n2. Copilot generiert\n3. Prompt: "Was fehlt noch? Welche Aspekte sollte ich ergänzen?"\n4. Copilot macht Vorschläge\n5. Iterieren bis perfekt</code></pre>
          </div>
        </section>

        <section id="h-ufige-fehler-vermeiden" className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-gray-500 mb-6">Häufige Fehler vermeiden</h2>
          <h3 className="text-xl font-semibold mb-3 mt-6 border-l-4 border-l-gray-500 pl-4">❌ Fehler 1: Zu vage Prompts</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Schlecht:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>"Schreibe etwas über Produktivität"</code></pre>
          </div>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Gut:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>"Erstelle einen 800-Wörter Ratgeber-Artikel zum Thema\n'Produktivität im Home Office', Zielgruppe: Remote Workers,\nTonalität: Praktisch und motivierend, mit konkreten Tipps"</code></pre>
          </div>
          <h3 className="text-xl font-semibold mb-3 mt-6 border-l-4 border-l-blue-500 pl-4">❌ Fehler 2: Keine Iterationen</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Falsch:</strong> Ersten Output akzeptieren ohne Nachfragen</p>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Richtig:</strong> Iterativ verfeinern:</p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>1. "Erstelle Entwurf"\n2. "Füge mehr Beispiele hinzu"\n3. "Mache es prägnanter"\n4. "Ändere Tonalität"</code></pre>
          </div>
          <h3 className="text-xl font-semibold mb-3 mt-6 border-l-4 border-l-green-500 pl-4">❌ Fehler 3: Kontext ignorieren</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Schlecht:</strong> Copilot weiß nicht, wofür das Dokument ist</p>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Gut:</strong> Immer Kontext geben:</p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>"Ich schreibe an [Zielgruppe] weil [Grund],\ndas Dokument wird verwendet für [Zweck]"</code></pre>
          </div>
          <h3 className="text-xl font-semibold mb-3 mt-6 border-l-4 border-l-purple-500 pl-4">❌ Fehler 4: Fakten nicht prüfen</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Problem:</strong> Copilot kann "halluzinieren" (Fakten erfinden)</p>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Lösung:</strong></p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Zahlen und Fakten immer prüfen</li>
            <li>Bei kritischen Dokumenten: Human Review</li>
            <li>Quellen verifizieren</li>
          </ul>
        </section>

        <section id="produktivit-t-steigern-workflows" className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-blue-500 mb-6">Produktivität steigern: Workflows</h2>
          <h3 className="text-xl font-semibold mb-3 mt-6 border-l-4 border-l-blue-500 pl-4">Workflow 1: Meeting → Dokumentation</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>1. Meeting in Teams (mit Copilot)</strong></p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Copilot erstellt automatisch Transkript</li>
            <li>Action Items werden identifiziert</li>
          </ul>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>2. In Word öffnen</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>Prompt: "Erstelle Meeting-Protokoll basierend auf\nTeams-Meeting [Datum], mit Zusammenfassung,\nBeschlüssen und nächsten Schritten"</code></pre>
          </div>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>3. Automatisch:</strong></p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Strukturiertes Protokoll</li>
            <li>Verteilung an Teilnehmer</li>
          </ul>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Zeitersparnis:</strong> 80% (von 30 Min auf 6 Min)</p>
          <h3 className="text-xl font-semibold mb-3 mt-6 border-l-4 border-l-green-500 pl-4">Workflow 2: Research → Artikel</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>1. Research sammeln</strong></p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Mehrere Quellen in SharePoint speichern</li>
          </ul>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>2. In Word kombinieren</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>Prompt: "Erstelle Übersichtsartikel basierend auf\ndiesen Research-Dokumenten: [Liste], synthetisiere\ndie Kernaussagen und ziehe Schlussfolgerungen"</code></pre>
          </div>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>3. Verfeinern</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>Prompt: "Füge eine Management Summary hinzu"\nPrompt: "Erstelle Handlungsempfehlungen"</code></pre>
          </div>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Zeitersparnis:</strong> 70% (von 4h auf 1,2h)</p>
          <h3 className="text-xl font-semibold mb-3 mt-6 border-l-4 border-l-cyan-500 pl-4">Workflow 3: E-Mail → Formeller Brief</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>1. Informelle E-Mail-Konversation</strong></p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Kunde schreibt informelle Anfrage</li>
          </ul>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>2. Copilot transformiert</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>Prompt: "Basierend auf dieser E-Mail-Konversation,\nerstelle einen formellen Geschäftsbrief der die\nKernanforderungen zusammenfasst und nächste Schritte vorschlägt"</code></pre>
          </div>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>3. Review & Send</strong></p>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Zeitersparnis:</strong> 90% (von 20 Min auf 2 Min)</p>
        </section>

        <section id="integration-mit-microsoft-365" className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-emerald-500 mb-6">Integration mit Microsoft 365</h2>
          <h3 className="text-xl font-semibold mb-3 mt-6 border-l-4 border-l-emerald-500 pl-4">Word + Outlook</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Szenario:</strong> E-Mail zu Dokument</p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>Prompt: "Erstelle Projekt-Vorschlag basierend auf\nE-Mail-Thread mit [Name] vom [Datum]"</code></pre>
          </div>
          <h3 className="text-xl font-semibold mb-3 mt-6 border-l-4 border-l-red-500 pl-4">Word + SharePoint</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Szenario:</strong> Firmenwissen nutzen</p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>Prompt: "Erstelle Angebot basierend auf Template\naus SharePoint [Pfad] und Produktinfos aus [Dokument]"</code></pre>
          </div>
          <h3 className="text-xl font-semibold mb-3 mt-6 border-l-4 border-l-amber-500 pl-4">Word + Teams</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Szenario:</strong> Meeting-Follow-up</p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>Prompt: "Erstelle Action-Item Liste basierend auf\nheutigem Teams-Meeting mit [Team-Name]"</code></pre>
          </div>
          <h3 className="text-xl font-semibold mb-3 mt-6 border-l-4 border-l-indigo-500 pl-4">Word + Excel</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Szenario:</strong> Daten-Report</p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>Prompt: "Erstelle Quarterly Report basierend auf\nVerkaufszahlen aus [Excel-Datei], mit Trend-Analyse\nund Visualisierung-Beschreibungen"</code></pre>
          </div>
        </section>

        <section id="sicherheit-und-compliance" className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-slate-500 mb-6">Sicherheit und Compliance</h2>
          <h3 className="text-xl font-semibold mb-3 mt-6 border-l-4 border-l-slate-500 pl-4">Datenschutz</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Was passiert mit Ihren Daten?</strong></p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Copilot nutzt nur Daten, auf die Sie Zugriff haben</li>
            <li>Keine Daten verlassen Ihr Microsoft 365 Tenant</li>
            <li>Prompts und Outputs sind nicht für LLM-Training</li>
            <li>EU-Data Residency verfügbar</li>
          </ul>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Best Practices:</strong></p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Keine sensitiven Daten in Prompts (PII, Passwörter)</li>
            <li>Information Rights Management (IRM) nutzen</li>
            <li>DLP (Data Loss Prevention) Policies konfigurieren</li>
            <li>Compliance Center für Audit Logs</li>
          </ul>
          <h3 className="text-xl font-semibold mb-3 mt-6 border-l-4 border-l-gray-500 pl-4">Governance</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>IT-Admin Kontrollen:</strong></p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Copilot pro User aktivieren/deaktivieren</li>
            <li>Zugriff auf externe Daten kontrollieren</li>
            <li>Audit Logs für alle Copilot-Interaktionen</li>
            <li>Sensitivity Labels durchsetzen</li>
          </ul>
        </section>

        <section id="kosten-lizenzierung" className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-green-500 mb-6">Kosten & Lizenzierung</h2>
          <h3 className="text-xl font-semibold mb-3 mt-6 border-l-4 border-l-green-500 pl-4">Preismodell</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Microsoft 365 Copilot:</strong></p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>€30 pro Benutzer/Monat</li>
            <li>Zusätzlich zu Microsoft 365 Lizenz (E3/E5/Business Standard/Premium)</li>
            <li>Keine separaten Kosten für Copilot in Word vs. anderen Apps</li>
          </ul>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Mindestanzahl:</strong></p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Enterprise: 300 Lizenzen (Ausnahme: Frontline Worker)</li>
            <li>Business: Keine Mindestanzahl</li>
          </ul>
          <h3 className="text-xl font-semibold mb-3 mt-6 border-l-4 border-l-purple-500 pl-4">ROI-Berechnung</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Annahme:</strong> Marketing-Team, 50 Personen</p>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Kosten:</strong></p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>50 × €30 × 12 = €18.000/Jahr</li>
          </ul>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Nutzen:</strong></p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>2h Zeitersparnis pro Woche pro Person</li>
            <li>50 × 2h × 48 Wochen = 4.800h</li>
            <li>Bei €50/h Stundensatz = <strong>€240.000 Einsparung</strong></li>
          </ul>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>ROI:</strong> 1.233% im ersten Jahr</p>
        </section>

        <section id="tipps-von-power-usern" className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-cyan-500 mb-6">Tipps von Power-Usern</h2>
          <h3 className="text-xl font-semibold mb-3 mt-6 border-l-4 border-l-cyan-500 pl-4">Tipp 1: Copilot als Brainstorming-Partner</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>Prompt: "Ich muss [Aufgabe] erledigen. Gib mir 5 verschiedene\nAnsätze wie ich das angehen könnte, mit Vor- und Nachteilen"</code></pre>
          </div>
          <h3 className="text-xl font-semibold mb-3 mt-6 border-l-4 border-l-blue-500 pl-4">Tipp 2: "Erkläre es mir wie ich 5 bin"</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>Prompt: "Erkläre diesen komplexen Sachverhalt so einfach,\ndass es jeder versteht, nutze Analogien"</code></pre>
          </div>
          <h3 className="text-xl font-semibold mb-3 mt-6 border-l-4 border-l-green-500 pl-4">Tipp 3: Reverse Outlining</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>Prompt: "Analysiere die Struktur dieses Dokuments\nund erstelle ein verbessertes Outline"</code></pre>
          </div>
          <h3 className="text-xl font-semibold mb-3 mt-6 border-l-4 border-l-amber-500 pl-4">Tipp 4: Tone-Checker</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>Prompt: "Wie wirkt dieser Text auf den Leser?\nIst die Tonalität angemessen für [Kontext]?"</code></pre>
          </div>
          <h3 className="text-xl font-semibold mb-3 mt-6 border-l-4 border-l-red-500 pl-4">Tipp 5: Format-Vorlagen</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Erstellen Sie prompt-templates:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>Template: "Erstelle [DOKUMENTTYP] für [ZIELGRUPPE],\nmit [STRUKTUR], Tonalität: [TON], Länge: [WÖRTER]"\n\nBeispiel: "Erstelle Whitepaper für CTOs,\nmit Executive Summary + 3 Hauptkapitel + Case Study,\nTonalität: Technisch aber zugänglich, Länge: 2500 Wörter"</code></pre>
          </div>
        </section>

        <section id="h-ufig-gestellte-fragen-faq-" className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-indigo-500 mb-6">Häufig gestellte Fragen (FAQ)</h2>
          <h3 className="text-xl font-semibold mb-3 mt-6 border-l-4 border-l-indigo-500 pl-4">Kann Copilot in allen Sprachen arbeiten?</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Ja</strong>, Copilot unterstützt 40+ Sprachen, inklusive:</p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Deutsch, Englisch, Französisch, Spanisch, Italienisch</li>
            <li>Chinesisch, Japanisch, Koreanisch</li>
            <li>Und viele mehr</li>
          </ul>
          <h3 className="text-xl font-semibold mb-3 mt-6 border-l-4 border-l-slate-500 pl-4">Funktioniert Copilot offline?</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Nein</strong>, Copilot benötigt eine aktive Internetverbindung, da die KI-Modelle in der Cloud laufen.</p>
          <h3 className="text-xl font-semibold mb-3 mt-6 border-l-4 border-l-gray-500 pl-4">Kann ich meine eigenen Daten zum Training nutzen?</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Nein</strong>, das LLM selbst kann nicht mit Firmendaten trainiert werden. ABER: Copilot nutzt automatisch Ihre Microsoft 365 Daten (Dokumente, E-Mails, etc.) als Kontext - das nennt sich "Grounding".</p>
          <h3 className="text-xl font-semibold mb-3 mt-6 border-l-4 border-l-blue-500 pl-4">Kann Copilot Bilder einfügen?</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Aktuell nein</strong> in Word. Copilot kann Bilder beschreiben und Platzhalter vorschlagen, aber nicht generieren oder einfügen. (In PowerPoint geht das mit DALL-E Integration)</p>
          <h3 className="text-xl font-semibold mb-3 mt-6 border-l-4 border-l-green-500 pl-4">Was passiert wenn ich kündige?</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Nichts verloren!</strong> Alle Dokumente bleiben erhalten. Sie verlieren nur den Zugriff auf die Copilot-Funktionen.</p>
        </section>

        <section id="zukunft-was-kommt-" className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-purple-500 mb-6">Zukunft: Was kommt?</h2>
          <h3 className="text-xl font-semibold mb-3 mt-6 border-l-4 border-l-purple-500 pl-4">Angekündigte Features (2025)</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>1. Plugins & Extensions</strong></p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Copilot kann auf Third-Party Tools zugreifen</li>
            <li>Z.B. Salesforce, SAP, Adobe</li>
          </ul>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>2. Custom GPTs für Word</strong></p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Firmenspezifische Copilot-Versionen</li>
            <li>Mit firmeneigenem Wissen und Prozessen</li>
          </ul>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>3. Advanced Formatting</strong></p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>KI-generierte Layouts</li>
            <li>Style-Templates aus Beispieldokumenten lernen</li>
          </ul>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>4. Collaborative Copilot</strong></p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Mehrere User arbeiten mit einem Copilot</li>
            <li>Team-Prompts und geteilte Assistenz</li>
          </ul>
        </section>

        <section id="zusammenfassung" className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-orange-500 mb-6">Zusammenfassung</h2>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Microsoft Copilot für Word revolutioniert Dokumentenerstellung:</strong></p>
          <p className="mb-4 text-gray-700 leading-relaxed">✅ <strong>Zeitersparnis:</strong> 50-70% weniger Zeit für typische Aufgaben</p>
          <p className="mb-4 text-gray-700 leading-relaxed">✅ <strong>Qualität:</strong> Konsistent professionelle Dokumente</p>
          <p className="mb-4 text-gray-700 leading-relaxed">✅ <strong>Skalierung:</strong> Von E-Mail bis 50-Seiten Report</p>
          <p className="mb-4 text-gray-700 leading-relaxed">✅ <strong>Integration:</strong> Nahtlos mit Microsoft 365 Ökosystem</p>
          <p className="mb-4 text-gray-700 leading-relaxed">✅ <strong>Sicherheit:</strong> Enterprise-Grade Security & Compliance</p>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Erste Schritte:</strong></p>
          <p className="mb-4 text-gray-700 leading-relaxed">1. Lizenz erwerben (€30/Monat)</p>
          <p className="mb-4 text-gray-700 leading-relaxed">2. Mit einfachen Prompts starten</p>
          <p className="mb-4 text-gray-700 leading-relaxed">3. Iterativ verbessern</p>
          <p className="mb-4 text-gray-700 leading-relaxed">4. Best Practices im Team teilen</p>
          <p className="mb-4 text-gray-700 leading-relaxed">5. ROI messen und optimieren</p>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Die wichtigste Regel:</strong> </p>
          <p className="mb-4 text-gray-700 leading-relaxed italic border-l-4 border-orange-500 pl-4">"Je spezifischer der Prompt, desto besser das Ergebnis"</p>
        </section>

        <section id="ressourcen" className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-teal-500 mb-6">Ressourcen</h2>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Offizielle Microsoft Dokumentation:</strong></p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>[Microsoft Copilot für Word Docs](https://learn.microsoft.com/copilot)</li>
            <li>[Prompt Galerie](https://adoption.microsoft.com/copilot-prompts/)</li>
          </ul>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Community:</strong></p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>[Microsoft Community Forum](https://techcommunity.microsoft.com)</li>
            <li>[Copilot YouTube Channel](https://youtube.com/@microsoft365)</li>
          </ul>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Training:</strong></p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>[Microsoft Learn: Copilot Path](https://learn.microsoft.com)</li>
            <li>[Copilotenschule Trainings](/trainer-werden)</li>
          </ul>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Möchten Sie Copilot in Ihrem Unternehmen einführen?</strong>  </p>
          <p className="mb-4 text-gray-700 leading-relaxed">Wir bieten maßgeschneiderte Workshops und Change Management. <a href="/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Kontakt →</a></p>
        </section>

        {/* Quellen und weiterführende Links */}
        <section id="quellen" className="mt-12 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-emerald-500 mb-6">Quellen und weiterführende Links</h2>
          <p className="text-muted-foreground mb-6">
            Offizielle Microsoft-Dokumentation zu Copilot in Word.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="https://support.microsoft.com/en-us/office/welcome-to-copilot-in-word-2135e85f-a467-463b-b2f0-c51a46d625d1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 border-l-4 border-l-blue-500 rounded-lg hover:bg-muted/50 transition-colors group"
            >
              <ExternalLink className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold group-hover:text-primary transition-colors">Microsoft Support: Copilot in Word</div>
                <div className="text-sm text-muted-foreground">Offizielle Einführung und Grundlagen zu Copilot in Word</div>
              </div>
            </a>

            <a
              href="https://support.microsoft.com/en-us/office/create-a-new-document-with-copilot-in-word-9f09e35c-17e1-4e6a-9dba-e3ff7f105ed6"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 border-l-4 border-l-green-500 rounded-lg hover:bg-muted/50 transition-colors group"
            >
              <ExternalLink className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold group-hover:text-primary transition-colors">Dokumente mit Copilot erstellen</div>
                <div className="text-sm text-muted-foreground">Anleitung zum Erstellen neuer Dokumente mit Copilot Draft</div>
              </div>
            </a>

            <a
              href="https://support.microsoft.com/en-us/office/rewrite-your-text-with-copilot-in-word-923d9763-f896-4da7-8a3f-5b12c3bfc475"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 border-l-4 border-l-purple-500 rounded-lg hover:bg-muted/50 transition-colors group"
            >
              <ExternalLink className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold group-hover:text-primary transition-colors">Texte umschreiben mit Copilot</div>
                <div className="text-sm text-muted-foreground">Anleitung zur Rewrite-Funktion für Textoptimierung</div>
              </div>
            </a>

            <a
              href="https://support.microsoft.com/en-us/office/summarize-your-document-with-copilot-in-word-95daea3d-6a12-4eb8-8d82-0503bc0e2c91"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 border-l-4 border-l-cyan-500 rounded-lg hover:bg-muted/50 transition-colors group"
            >
              <ExternalLink className="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold group-hover:text-primary transition-colors">Dokumente zusammenfassen</div>
                <div className="text-sm text-muted-foreground">Anleitung zur Summarize-Funktion für Textzusammenfassungen</div>
              </div>
            </a>
          </div>
        </section>

        {/* Autor-Bio Section */}
        <section className="mt-16 pt-8 border-t-4 border-t-orange-500">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              {author?.image && (
                <img
                  src={author.image}
                  alt={author.name}
                  className="w-full rounded-lg border-2 border-orange-500/30"
                />
              )}
            </div>
            <div className="md:col-span-3">
              <h3 className="text-2xl font-bold mb-2">{author?.name}</h3>
              <p className="text-orange-600 font-semibold mb-4">{author?.role}</p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                {author?.bio}
              </p>
              <div className="mb-4">
                <p className="font-semibold mb-2">Expertise:</p>
                <div className="flex flex-wrap gap-2">
                  {author?.expertise?.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-orange-500/10 border border-orange-500/30 rounded-full text-sm text-gray-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              {author?.social && (
                <div className="flex gap-4">
                  {author.social.linkedin && (
                    <a
                      href={author.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-semibold"
                    >
                      LinkedIn
                    </a>
                  )}
                  {author.social.twitter && (
                    <a
                      href={author.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline font-semibold"
                    >
                      Twitter
                    </a>
                  )}
                  {author.social.website && (
                    <a
                      href={author.social.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:underline font-semibold"
                    >
                      Website
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </ContentLayout>
    </>
  );
};

export default CopilotFuerWord;

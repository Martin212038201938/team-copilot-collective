import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";

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
    { id: "ressourcen", title: "Ressourcen", level: 2 }
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Microsoft Copilot für Word: Der ultimative Guide",
    "description": "Entdecken Sie, wie Microsoft Copilot in Word Ihre Dokumentenerstellung revolutioniert. Mit praktischen Beispielen, Prompts und Tipps für maximale Produktivität.",
    "author": getAuthorSchemaMarkup(author),
    "datePublished": "2025-01-05",
    "dateModified": "2025-01-05",
    "keywords": ["Copilot für Word","Microsoft Copilot Word","Word KI Assistent","Dokumente mit KI erstellen","Word Produktivität","Microsoft 365 Copilot"],
    "articleSection": "Microsoft 365"
  };

  return (
    <>
      <SEOHead
        title="Microsoft Copilot für Word: Der ultimative Guide | Copilotenschule"
        description="Entdecken Sie, wie Microsoft Copilot in Word Ihre Dokumentenerstellung revolutioniert. Mit praktischen Beispielen, Prompts und Tipps für maximale Produktivität."
        keywords={["Copilot für Word","Microsoft Copilot Word","Word KI Assistent","Dokumente mit KI erstellen","Word Produktivität","Microsoft 365 Copilot"]}
        canonicalUrl="https://copilotenschule.de/wissen/copilot-fuer-word"
        schema={articleSchema}
        publishedTime="2025-01-05"
        modifiedTime="2025-01-05"
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
        readTime="15 Minuten"
      >
        <section id="einleitung" className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Einleitung</h1>
          <p className="mb-4 text-gray-700 leading-relaxed">Microsoft Copilot für Word ist ein KI-gestützter Assistent, der direkt in Microsoft Word integriert ist und Ihre Dokumentenerstellung auf ein neues Level hebt. Mit natürlicher Sprache können Sie Texte erstellen, bearbeiten, zusammenfassen und formatieren.</p>
        </section>

        <section id="was-ist-microsoft-copilot-f-r-word-" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Was ist Microsoft Copilot für Word?</h2>
          <h3 className="text-xl font-semibold mb-3 mt-6">Überblick</h3>
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
          <h3 className="text-xl font-semibold mb-3 mt-6">Voraussetzungen</h3>
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
          <h2 className="text-2xl font-bold mb-4">Copilot in Word aktivieren</h2>
          <h3 className="text-xl font-semibold mb-3 mt-6">Zugriff auf Copilot</h3>
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
          <h3 className="text-xl font-semibold mb-3 mt-6">Erste Schritte</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>1. Leeres Dokument erstellen</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>Prompt: "Erstelle einen Projektplan für die Einführung von Microsoft Copilot in einem mittelständischen Unternehmen"</code></pre>
          </div>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>2. Copilot generiert sofort:</strong></p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Strukturierten Text mit Überschriften</li>
            <li>Logischen Aufbau</li>
            <li>Professionelle Formulierungen</li>
          </ul>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>3. Iterieren und verfeinern:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>Prompt: "Füge eine Zeitachse mit konkreten Meilensteinen hinzu"</code></pre>
          </div>
        </section>

        <section id="hauptfunktionen-im-detail" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Hauptfunktionen im Detail</h2>
          <h3 className="text-xl font-semibold mb-3 mt-6">1. Dokumente erstellen (Draft)</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Use Case:</strong> Vom leeren Dokument zum fertigen Entwurf</p>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Beste Prompts:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>"Erstelle einen formellen Geschäftsbrief an [Kunde], \nder sich für die Verzögerung bei [Projekt] entschuldigt \nund neue Termine vorschlägt."</code></pre>
          </div>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>"Schreibe einen Blogartikel zum Thema [Topic], \nZielgruppe: [Persona], Tonalität: [Stil], Länge: 800 Wörter"</code></pre>
          </div>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>"Erstelle eine Agenda für ein Meeting über [Thema] \nmit folgenden Teilnehmern: [Namen] und Schwerpunkten: [Punkte]"</code></pre>
          </div>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Tipps:</strong></p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Je spezifischer der Prompt, desto besser das Ergebnis</li>
            <li>Kontext und Zielgruppe angeben</li>
            <li>Gewünschte Länge nennen</li>
            <li>Tonalität spezifizieren (formal, casual, technisch, etc.)</li>
          </ul>
          <h3 className="text-xl font-semibold mb-3 mt-6">2. Texte zusammenfassen (Summarize)</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Use Case:</strong> Lange Dokumente schnell erfassen</p>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Beispiele:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>"Fasse dieses 20-seitige Dokument in 5 Kernpunkten zusammen"</code></pre>
          </div>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>"Erstelle eine Executive Summary für Führungskräfte (max. 1 Seite)"</code></pre>
          </div>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>"Welche Handlungsempfehlungen enthält dieses Dokument?"</code></pre>
          </div>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Anwendungsfälle:</strong></p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Meeting-Protokolle verdichten</li>
            <li>Research-Berichte auf Kernaussagen reduzieren</li>
            <li>Verträge auf wichtige Punkte prüfen</li>
            <li>E-Mail-Threads zusammenfassen</li>
          </ul>
          <h3 className="text-xl font-semibold mb-3 mt-6">3. Texte umschreiben (Rewrite)</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Use Case:</strong> Bestehende Texte verbessern</p>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Varianten:</strong></p>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Kürzer machen:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>"Schreibe diesen Absatz prägnanter, max. 3 Sätze"</code></pre>
          </div>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Tonalität ändern:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>"Formuliere diesen Text informeller/formeller/enthusiastischer"</code></pre>
          </div>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Komplexität anpassen:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>"Erkläre diesen technischen Absatz für ein nicht-technisches Publikum"</code></pre>
          </div>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Struktur verbessern:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>"Verbessere die Struktur und Lesbarkeit dieses Texts"</code></pre>
          </div>
          <h3 className="text-xl font-semibold mb-3 mt-6">4. Aus anderen Dokumenten erstellen</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Use Case:</strong> Mehrere Quellen kombinieren</p>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Beispiel:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>"Erstelle ein Proposal basierend auf:\n- Meeting-Notizen.docx\n- Kundenanforderungen.xlsx  \n- Preisliste.pdf"</code></pre>
          </div>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Copilot kann:</strong></p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Informationen aus SharePoint-Dokumenten ziehen</li>
            <li>E-Mails aus Outlook referenzieren</li>
            <li>Excel-Daten integrieren</li>
            <li>PowerPoint-Inhalte einbinden</li>
          </ul>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Syntax:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>"Erstelle ein [Dokumenttyp] basierend auf [Dateiname] und [Dateiname]"</code></pre>
          </div>
          <h3 className="text-xl font-semibold mb-3 mt-6">5. Formatierung und Struktur</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Use Case:</strong> Professionelles Layout automatisch</p>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Prompts:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>"Strukturiere diesen Text mit Überschriften, Bullet Points und nummerierten Listen"</code></pre>
          </div>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>"Füge eine Einleitung und Zusammenfassung hinzu"</code></pre>
          </div>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>"Erstelle ein Inhaltsverzeichnis für dieses Dokument"</code></pre>
          </div>
        </section>

        <section id="praktische-anwendungsf-lle" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Praktische Anwendungsfälle</h2>
          <h3 className="text-xl font-semibold mb-3 mt-6">1. Business-Dokumente</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Geschäftsbriefe:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>Prompt: "Erstelle einen Angebotsbrief für [Service] \nan [Kunde], betone [USPs], verwende formelle Sprache"</code></pre>
          </div>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Proposals:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>Prompt: "Erstelle ein Projekt-Proposal für [Projekt],\ninklusive Problemstellung, Lösung, Timeline, Budget"</code></pre>
          </div>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Reports:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>Prompt: "Erstelle einen Quarterly Business Review Report\nbasierend auf diesen Daten: [Einfügen], mit Executive Summary"</code></pre>
          </div>
          <h3 className="text-xl font-semibold mb-3 mt-6">2. Marketing-Content</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Blog-Artikel:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>Prompt: "Schreibe einen SEO-optimierten Blogartikel zu [Keyword],\nmit H2/H3 Struktur, 1200 Wörter, informativ aber zugänglich"</code></pre>
          </div>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Social Media Posts:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>Prompt: "Erstelle 10 LinkedIn-Posts basierend auf diesem Whitepaper,\nje mit Hook, Kernaussage und Call-to-Action"</code></pre>
          </div>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Case Studies:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>Prompt: "Erstelle eine Case Study für [Kunde], \nFormat: Challenge → Solution → Results, mit Zahlen und Testimonial"</code></pre>
          </div>
          <h3 className="text-xl font-semibold mb-3 mt-6">3. HR-Dokumente</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Stellenbeschreibungen:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>Prompt: "Erstelle eine Job Description für [Position],\ninklusive Verantwortlichkeiten, Requirements, Benefits"</code></pre>
          </div>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Performance Reviews:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>Prompt: "Formuliere konstruktives Feedback für Mitarbeiter,\nbasierend auf diesen Leistungsdaten: [Einfügen]"</code></pre>
          </div>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Policies:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>Prompt: "Erstelle eine Remote Work Policy, \ninklusive Regelungen zu Arbeitszeiten, Equipment, Security"</code></pre>
          </div>
          <h3 className="text-xl font-semibold mb-3 mt-6">4. Technische Dokumentation</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>User Manuals:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>Prompt: "Erstelle eine Schritt-für-Schritt Anleitung für [Prozess],\nmit Screenshots-Platzhaltern und Troubleshooting-Sektion"</code></pre>
          </div>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>API Dokumentation:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>Prompt: "Dokumentiere diese API-Endpoints,\ninklusive Request/Response Beispiele, Error Codes"</code></pre>
          </div>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Changelog:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>Prompt: "Erstelle Release Notes für Version [X],\nbasierend auf diesen Jira-Tickets: [Einfügen]"</code></pre>
          </div>
        </section>

        <section id="best-practices-f-r-prompts" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Best Practices für Prompts</h2>
          <h3 className="text-xl font-semibold mb-3 mt-6">Die CRAFT-Formel</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>C - Context (Kontext)</strong></p>
          <p className="mb-4 text-gray-700 leading-relaxed">❌ "Schreibe einen Artikel über KI"</p>
          <p className="mb-4 text-gray-700 leading-relaxed">✅ "Schreibe einen Artikel über KI im Gesundheitswesen für Krankenhausleiter"</p>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>R - Role (Rolle)</strong></p>
          <p className="mb-4 text-gray-700 leading-relaxed">❌ "Erkläre Blockchain"</p>
          <p className="mb-4 text-gray-700 leading-relaxed">✅ "Du bist ein Blockchain-Experte. Erkläre Blockchain für CFOs"</p>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>A - Action (Aktion)</strong></p>
          <p className="mb-4 text-gray-700 leading-relaxed">❌ "Etwas über Sales"</p>
          <p className="mb-4 text-gray-700 leading-relaxed">✅ "Erstelle einen Sales-Pitch für unser neues Produkt"</p>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>F - Format (Format)</strong></p>
          <p className="mb-4 text-gray-700 leading-relaxed">❌ "Schreibe über Projektmanagement"</p>
          <p className="mb-4 text-gray-700 leading-relaxed">✅ "Erstelle eine Checkliste für erfolgreiches Projektmanagement, 10 Punkte"</p>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>T - Target (Zielgruppe)</strong></p>
          <p className="mb-4 text-gray-700 leading-relaxed">❌ "Erkläre Machine Learning"</p>
          <p className="mb-4 text-gray-700 leading-relaxed">✅ "Erkläre Machine Learning für Marketing-Manager ohne technischen Hintergrund"</p>
          <h3 className="text-xl font-semibold mb-3 mt-6">Prompt-Patterns</h3>
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
          <h2 className="text-2xl font-bold mb-4">Erweiterte Techniken</h2>
          <h3 className="text-xl font-semibold mb-3 mt-6">1. Multi-Document Intelligence</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Copilot kann Informationen aus mehreren Quellen kombinieren:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>Prompt: "Erstelle einen Status-Report basierend auf:\n- Projekt-Timeline aus timeline.xlsx\n- Risiken aus risks.docx  \n- Budget-Status aus finance.xlsx\n- Team-Feedback aus E-Mails (letzten 2 Wochen)"</code></pre>
          </div>
          <h3 className="text-xl font-semibold mb-3 mt-6">2. Stil-Konsistenz</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Copilot lernt Ihren Schreibstil:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>Prompt: "Analysiere meinen Schreibstil in [vorheriges Dokument]\nund schreibe [neues Dokument] im gleichen Stil"</code></pre>
          </div>
          <h3 className="text-xl font-semibold mb-3 mt-6">3. Bedingte Generierung</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>Prompt: "Erstelle 2 Versionen dieses Briefs:\nVersion A: Falls der Kunde zustimmt\nVersion B: Falls der Kunde ablehnt"</code></pre>
          </div>
          <h3 className="text-xl font-semibold mb-3 mt-6">4. Feedback-Loop</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>1. Prompt: "Erstelle [Dokument]"\n2. Copilot generiert\n3. Prompt: "Was fehlt noch? Welche Aspekte sollte ich ergänzen?"\n4. Copilot macht Vorschläge\n5. Iterieren bis perfekt</code></pre>
          </div>
        </section>

        <section id="h-ufige-fehler-vermeiden" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Häufige Fehler vermeiden</h2>
          <h3 className="text-xl font-semibold mb-3 mt-6">❌ Fehler 1: Zu vage Prompts</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Schlecht:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>"Schreibe etwas über Produktivität"</code></pre>
          </div>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Gut:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>"Erstelle einen 800-Wörter Ratgeber-Artikel zum Thema\n'Produktivität im Home Office', Zielgruppe: Remote Workers,\nTonalität: Praktisch und motivierend, mit konkreten Tipps"</code></pre>
          </div>
          <h3 className="text-xl font-semibold mb-3 mt-6">❌ Fehler 2: Keine Iterationen</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Falsch:</strong> Ersten Output akzeptieren ohne Nachfragen</p>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Richtig:</strong> Iterativ verfeinern:</p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>1. "Erstelle Entwurf"\n2. "Füge mehr Beispiele hinzu"\n3. "Mache es prägnanter"\n4. "Ändere Tonalität"</code></pre>
          </div>
          <h3 className="text-xl font-semibold mb-3 mt-6">❌ Fehler 3: Kontext ignorieren</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Schlecht:</strong> Copilot weiß nicht, wofür das Dokument ist</p>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Gut:</strong> Immer Kontext geben:</p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>"Ich schreibe an [Zielgruppe] weil [Grund],\ndas Dokument wird verwendet für [Zweck]"</code></pre>
          </div>
          <h3 className="text-xl font-semibold mb-3 mt-6">❌ Fehler 4: Fakten nicht prüfen</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Problem:</strong> Copilot kann "halluzinieren" (Fakten erfinden)</p>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Lösung:</strong></p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Zahlen und Fakten immer prüfen</li>
            <li>Bei kritischen Dokumenten: Human Review</li>
            <li>Quellen verifizieren</li>
          </ul>
        </section>

        <section id="produktivit-t-steigern-workflows" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Produktivität steigern: Workflows</h2>
          <h3 className="text-xl font-semibold mb-3 mt-6">Workflow 1: Meeting → Dokumentation</h3>
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
          <h3 className="text-xl font-semibold mb-3 mt-6">Workflow 2: Research → Artikel</h3>
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
          <h3 className="text-xl font-semibold mb-3 mt-6">Workflow 3: E-Mail → Formeller Brief</h3>
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
          <h2 className="text-2xl font-bold mb-4">Integration mit Microsoft 365</h2>
          <h3 className="text-xl font-semibold mb-3 mt-6">Word + Outlook</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Szenario:</strong> E-Mail zu Dokument</p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>Prompt: "Erstelle Projekt-Vorschlag basierend auf\nE-Mail-Thread mit [Name] vom [Datum]"</code></pre>
          </div>
          <h3 className="text-xl font-semibold mb-3 mt-6">Word + SharePoint</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Szenario:</strong> Firmenwissen nutzen</p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>Prompt: "Erstelle Angebot basierend auf Template\naus SharePoint [Pfad] und Produktinfos aus [Dokument]"</code></pre>
          </div>
          <h3 className="text-xl font-semibold mb-3 mt-6">Word + Teams</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Szenario:</strong> Meeting-Follow-up</p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>Prompt: "Erstelle Action-Item Liste basierend auf\nheutigem Teams-Meeting mit [Team-Name]"</code></pre>
          </div>
          <h3 className="text-xl font-semibold mb-3 mt-6">Word + Excel</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Szenario:</strong> Daten-Report</p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>Prompt: "Erstelle Quarterly Report basierend auf\nVerkaufszahlen aus [Excel-Datei], mit Trend-Analyse\nund Visualisierung-Beschreibungen"</code></pre>
          </div>
        </section>

        <section id="sicherheit-und-compliance" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Sicherheit und Compliance</h2>
          <h3 className="text-xl font-semibold mb-3 mt-6">Datenschutz</h3>
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
          <h3 className="text-xl font-semibold mb-3 mt-6">Governance</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>IT-Admin Kontrollen:</strong></p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Copilot pro User aktivieren/deaktivieren</li>
            <li>Zugriff auf externe Daten kontrollieren</li>
            <li>Audit Logs für alle Copilot-Interaktionen</li>
            <li>Sensitivity Labels durchsetzen</li>
          </ul>
        </section>

        <section id="kosten-lizenzierung" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Kosten & Lizenzierung</h2>
          <h3 className="text-xl font-semibold mb-3 mt-6">Preismodell</h3>
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
          <h3 className="text-xl font-semibold mb-3 mt-6">ROI-Berechnung</h3>
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
          <h2 className="text-2xl font-bold mb-4">Tipps von Power-Usern</h2>
          <h3 className="text-xl font-semibold mb-3 mt-6">Tipp 1: Copilot als Brainstorming-Partner</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>Prompt: "Ich muss [Aufgabe] erledigen. Gib mir 5 verschiedene\nAnsätze wie ich das angehen könnte, mit Vor- und Nachteilen"</code></pre>
          </div>
          <h3 className="text-xl font-semibold mb-3 mt-6">Tipp 2: "Erkläre es mir wie ich 5 bin"</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>Prompt: "Erkläre diesen komplexen Sachverhalt so einfach,\ndass es jeder versteht, nutze Analogien"</code></pre>
          </div>
          <h3 className="text-xl font-semibold mb-3 mt-6">Tipp 3: Reverse Outlining</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>Prompt: "Analysiere die Struktur dieses Dokuments\nund erstelle ein verbessertes Outline"</code></pre>
          </div>
          <h3 className="text-xl font-semibold mb-3 mt-6">Tipp 4: Tone-Checker</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>Prompt: "Wie wirkt dieser Text auf den Leser?\nIst die Tonalität angemessen für [Kontext]?"</code></pre>
          </div>
          <h3 className="text-xl font-semibold mb-3 mt-6">Tipp 5: Format-Vorlagen</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Erstellen Sie prompt-Templates:</strong></p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre className="text-sm"><code>Template: "Erstelle [DOKUMENTTYP] für [ZIELGRUPPE],\nmit [STRUKTUR], Tonalität: [TON], Länge: [WÖRTER]"\n\nBeispiel: "Erstelle Whitepaper für CTOs,\nmit Executive Summary + 3 Hauptkapitel + Case Study,\nTonalität: Technisch aber zugänglich, Länge: 2500 Wörter"</code></pre>
          </div>
        </section>

        <section id="h-ufig-gestellte-fragen-faq-" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Häufig gestellte Fragen (FAQ)</h2>
          <h3 className="text-xl font-semibold mb-3 mt-6">Kann Copilot in allen Sprachen arbeiten?</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Ja</strong>, Copilot unterstützt 40+ Sprachen, inklusive:</p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Deutsch, Englisch, Französisch, Spanisch, Italienisch</li>
            <li>Chinesisch, Japanisch, Koreanisch</li>
            <li>Und viele mehr</li>
          </ul>
          <h3 className="text-xl font-semibold mb-3 mt-6">Funktioniert Copilot offline?</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Nein</strong>, Copilot benötigt eine aktive Internetverbindung, da die KI-Modelle in der Cloud laufen.</p>
          <h3 className="text-xl font-semibold mb-3 mt-6">Kann ich meine eigenen Daten zum Training nutzen?</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Nein</strong>, das LLM selbst kann nicht mit Firmendaten trainiert werden. ABER: Copilot nutzt automatisch Ihre Microsoft 365 Daten (Dokumente, E-Mails, etc.) als Kontext - das nennt sich "Grounding".</p>
          <h3 className="text-xl font-semibold mb-3 mt-6">Kann Copilot Bilder einfügen?</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Aktuell nein</strong> in Word. Copilot kann Bilder beschreiben und Platzhalter vorschlagen, aber nicht generieren oder einfügen. (In PowerPoint geht das mit DALL-E Integration)</p>
          <h3 className="text-xl font-semibold mb-3 mt-6">Was passiert wenn ich kündige?</h3>
          <p className="mb-4 text-gray-700 leading-relaxed"><strong>Nichts verloren!</strong> Alle Dokumente bleiben erhalten. Sie verlieren nur den Zugriff auf die Copilot-Funktionen.</p>
        </section>

        <section id="zukunft-was-kommt-" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Zukunft: Was kommt?</h2>
          <h3 className="text-xl font-semibold mb-3 mt-6">Angekündigte Features (2025)</h3>
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
          <h2 className="text-2xl font-bold mb-4">Zusammenfassung</h2>
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
          <p className="mb-4 text-gray-700 leading-relaxed italic border-l-4 border-primary pl-4">"Je spezifischer der Prompt, desto besser das Ergebnis"</p>
        </section>

        <section id="ressourcen" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Ressourcen</h2>
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
      </ContentLayout>
    </>
  );
};

export default CopilotFuerWord;

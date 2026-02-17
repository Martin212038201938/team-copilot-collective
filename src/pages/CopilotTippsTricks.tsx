import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";
import { Zap, FileText, Table2, Presentation, Mail, Users, Lightbulb, AlertTriangle, CheckCircle2, ExternalLink, Linkedin, Twitter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrustBadge } from "@/components/TrustBadge";

const SLUG = "copilot-tipps-tricks-produktivitaet";
const PAGE_TITLE = "22 Microsoft Copilot Tipps & Tricks";

const CopilotTippsTricks = () => {
  const author = getAuthor("martin-lang");

  const tableOfContents = [
    { id: "word-tipps", title: "Word Tipps (1-5)", level: 2 },
    { id: "excel-tipps", title: "Excel Tipps (6-10)", level: 2 },
    { id: "powerpoint-tipps", title: "PowerPoint Tipps (11-14)", level: 2 },
    { id: "outlook-tipps", title: "Outlook Tipps (15-18)", level: 2 },
    { id: "teams-tipps", title: "Teams Tipps (19-22)", level: 2 },
    { id: "fehler-vermeiden", title: "Häufige Fehler vermeiden", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
    { id: "quellen", title: "Quellen", level: 2 }
  ];

  const ids = generateSchemaIds(SLUG, 'wissen');
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const faqs = [
    {
      name: "Wie kann ich meine Copilot-Produktivität sofort steigern?",
      answer: "Die drei wichtigsten Sofort-Tipps: 1) Geben Sie mehr Kontext in Ihren Prompts - je spezifischer, desto besser. 2) Nutzen Sie die App-übergreifende Suche mit 'Finde alle Informationen zu...' 3) Iterieren Sie über erste Ergebnisse mit Folgefragen statt sie direkt zu akzeptieren."
    },
    {
      name: "Funktioniert Copilot auch auf Deutsch?",
      answer: "Ja, Microsoft 365 Copilot funktioniert vollständig auf Deutsch. Sie können alle Prompts in deutscher Sprache eingeben und erhalten deutsche Antworten. Die Qualität ist mit englischen Prompts vergleichbar."
    },
    {
      name: "Welche Microsoft 365 Apps unterstützen Copilot?",
      answer: "Copilot ist in Word, Excel, PowerPoint, Outlook, Teams, OneNote, Loop und der Microsoft 365 App verfügbar. In jeder App gibt es spezifische Funktionen - von Dokumenterstellung in Word bis Meeting-Zusammenfassungen in Teams."
    },
    {
      name: "Wie erstelle ich effektive Prompt-Vorlagen für mein Team?",
      answer: "Dokumentieren Sie erfolgreiche Prompts mit Platzhaltern: [Typ], [Zielgruppe], [Umfang], [Ton]. Teilen Sie diese in einem gemeinsamen SharePoint oder OneNote und ergänzen Sie Beispiele für verschiedene Anwendungsfälle."
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": ids.article,
        "headline": "22 Microsoft Copilot Tipps & Tricks für mehr Produktivität (2026)",
        "description": "22 praxiserprobte Tipps für Microsoft 365 Copilot: Word, Excel, PowerPoint, Outlook und Teams. Sofort umsetzbare Tricks für mehr Produktivität im Büroalltag.",
        "author": getAuthorSchemaMarkup(author),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization"
        },
        "datePublished": "2025-11-18",
        "dateModified": "2026-02-03",
        "keywords": ["Microsoft Copilot Tipps", "Copilot Tricks", "M365 Copilot Produktivität", "Copilot Word Excel", "Copilot für Einsteiger"],
        "articleSection": "Best Practices",
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
        title="22 Microsoft Copilot Tipps & Tricks für mehr Produktivität (2026)"
        description="22 praxiserprobte Tipps für Microsoft 365 Copilot: Word, Excel, PowerPoint, Outlook und Teams. Sofort umsetzbare Tricks für mehr Produktivität im Büroalltag."
        keywords={["Microsoft Copilot Tipps", "Copilot Tricks", "M365 Copilot Produktivität", "Copilot Word Excel PowerPoint", "Copilot für Einsteiger"]}
        canonicalUrl={pageUrl}
        author={author}
        publishedTime="2025-11-18"
        modifiedTime="2026-02-03T10:00:00+01:00"
        schema={schema}
      />
      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: PAGE_TITLE, href: `/wissen/${SLUG}` }
        ]}
        title="22 Microsoft Copilot Tipps & Tricks für mehr Produktivität"
        description="Praxiserprobte Tipps für Word, Excel, PowerPoint, Outlook und Teams – sofort umsetzbar für Ihren Büroalltag."
        lastUpdated="03. Februar 2026"
        authorName="Martin Lang"
        tableOfContents={tableOfContents}
      >
        {/* Schnellantwort */}
        <Card className="border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-amber-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-orange-600" />
              Schnellantwort
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base leading-relaxed">
              <strong>Die drei wichtigsten Copilot-Prinzipien:</strong> 1) <strong>Kontext geben</strong> – je mehr Hintergrund, desto besser das Ergebnis.
              2) <strong>Spezifisch sein</strong> – "Erstelle einen 2-seitigen Report für das Management" statt "Schreib was".
              3) <strong>Iterieren</strong> – verfeinern Sie das erste Ergebnis mit Folgefragen.
              Diese 22 Tipps zeigen Ihnen, wie Sie das in Word, Excel, PowerPoint, Outlook und Teams konkret umsetzen.
            </p>
          </CardContent>
        </Card>

        {/* Word Tipps Section */}
        <section id="word-tipps">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-blue-500">
            <span className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-600" />
              Word Tipps (1-5)
            </span>
          </h2>

          <div className="space-y-6 mt-8">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">1</span>
                  Der Kontext-Trick: Referenzieren Sie andere Dokumente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Copilot kann auf Dateien in Ihrem OneDrive zugreifen. Nutzen Sie das!</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded border border-red-200 dark:border-red-800">
                    <p className="text-sm font-medium text-red-700 dark:text-red-400">❌ Statt:</p>
                    <p className="text-sm">"Schreibe einen Projektbericht"</p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded border border-green-200 dark:border-green-800">
                    <p className="text-sm font-medium text-green-700 dark:text-green-400">✅ Besser:</p>
                    <p className="text-sm">"Erstelle einen Projektbericht basierend auf /Projekt-Status-Januar.docx. Fokus: Budget und Timeline."</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">2</span>
                  Zielgruppe und Ton definieren
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Sagen Sie Copilot, für wen Sie schreiben:</p>
                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <code className="text-sm">"Schreibe eine Zusammenfassung unserer Q4-Ergebnisse. <strong>Zielgruppe: Vorstand</strong>. <strong>Ton: professionell, prägnant</strong>. <strong>Länge: maximal 1 Seite</strong>."</code>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">3</span>
                  Text umschreiben lassen mit klaren Vorgaben
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Markieren Sie Text und geben Sie präzise Anweisungen:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    "Mache diesen Absatz formeller für eine externe E-Mail"
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    "Kürze auf die Hälfte, behalte die Kernaussagen"
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    "Wandle in Stichpunkte um"
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">4</span>
                  Dokumentenvergleich nutzen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Copilot kann Dokumente vergleichen und Unterschiede hervorheben:</p>
                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <code className="text-sm">"Vergleiche dieses Dokument mit /Vertrag-V1.docx und liste alle Änderungen in einer Tabelle auf."</code>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">5</span>
                  Vorlagen mit Platzhaltern erstellen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Lassen Sie Copilot wiederverwendbare Vorlagen generieren:</p>
                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <code className="text-sm">"Erstelle eine Vorlage für Kundenangebote mit Platzhaltern für [Kundenname], [Projekttitel], [Budget] und [Timeline]."</code>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Excel Tipps Section */}
        <section id="excel-tipps">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-green-500">
            <span className="flex items-center gap-3">
              <Table2 className="w-8 h-8 text-green-600" />
              Excel Tipps (6-10)
            </span>
          </h2>

          <div className="space-y-6 mt-8">
            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm">6</span>
                  Formeln in natürlicher Sprache beschreiben
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Sie müssen keine Formel-Syntax kennen:</p>
                <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                  <code className="text-sm">"Erstelle eine Formel, die den Durchschnitt aus Spalte C berechnet, aber nur für Zeilen, wo in Spalte A 'Deutschland' steht."</code>
                </div>
                <p className="text-sm text-muted-foreground mt-3">→ Copilot generiert: <code className="bg-muted px-1 rounded">=AVERAGEIF(A:A,"Deutschland",C:C)</code></p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm">7</span>
                  Datenanalyse mit konkreten Fragen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Stellen Sie gezielte Fragen zu Ihren Daten:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    "Welche 5 Produkte haben den höchsten Umsatz?"
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    "Gibt es einen Trend bei den monatlichen Verkaufszahlen?"
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    "Welche Ausreißer gibt es in der Spalte 'Kosten'?"
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm">8</span>
                  Automatische Diagramm-Erstellung
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Beschreiben Sie das gewünschte Diagramm:</p>
                <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                  <code className="text-sm">"Erstelle ein Balkendiagramm der Top 10 Kunden nach Umsatz. Sortiere absteigend und füge Datenbeschriftungen hinzu."</code>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm">9</span>
                  Pivot-Tabellen ohne Vorkenntnisse
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Copilot erstellt Pivot-Tabellen auf Anfrage:</p>
                <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                  <code className="text-sm">"Erstelle eine Pivot-Tabelle, die den Umsatz nach Region und Quartal zeigt, mit Summen pro Zeile und Spalte."</code>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm">10</span>
                  Datenbereinigung automatisieren
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Lassen Sie Copilot Ihre Daten aufräumen:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    "Entferne alle Duplikate basierend auf der E-Mail-Spalte"
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    "Teile die Spalte 'Name' in 'Vorname' und 'Nachname'"
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    "Formatiere alle Datumsangaben einheitlich als TT.MM.JJJJ"
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* PowerPoint Tipps Section */}
        <section id="powerpoint-tipps">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-purple-500">
            <span className="flex items-center gap-3">
              <Presentation className="w-8 h-8 text-purple-600" />
              PowerPoint Tipps (11-14)
            </span>
          </h2>

          <div className="space-y-6 mt-8">
            <Card className="border-l-4 border-l-purple-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">11</span>
                  Präsentation aus Dokument erstellen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Verwandeln Sie bestehende Inhalte in Präsentationen:</p>
                <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                  <code className="text-sm">"Erstelle eine 10-Folien Präsentation aus /Quartalsbericht-Q4.docx. Zielgruppe: Geschäftsführung. Fokus auf KPIs und Highlights."</code>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">12</span>
                  Struktur vorgeben
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Definieren Sie die gewünschte Struktur:</p>
                <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                  <code className="text-sm">"Erstelle eine Präsentation mit folgender Struktur: 1) Agenda, 2) Problem, 3) Lösung, 4) Vorteile, 5) Kosten, 6) Timeline, 7) Nächste Schritte, 8) Q&A"</code>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">13</span>
                  Speaker Notes generieren
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Lassen Sie sich Notizen für jede Folie erstellen:</p>
                <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                  <code className="text-sm">"Füge zu jeder Folie ausführliche Speaker Notes hinzu. Circa 3-4 Sätze pro Folie mit Talking Points."</code>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">14</span>
                  Folien für verschiedene Zielgruppen anpassen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Erstellen Sie Varianten für unterschiedliche Audiences:</p>
                <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                  <code className="text-sm">"Erstelle eine vereinfachte Version dieser Präsentation für Kunden ohne technischen Hintergrund. Ersetze Fachbegriffe durch verständliche Erklärungen."</code>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Outlook Tipps Section */}
        <section id="outlook-tipps">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-cyan-500">
            <span className="flex items-center gap-3">
              <Mail className="w-8 h-8 text-cyan-600" />
              Outlook Tipps (15-18)
            </span>
          </h2>

          <div className="space-y-6 mt-8">
            <Card className="border-l-4 border-l-cyan-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-sm">15</span>
                  E-Mail-Entwurf mit Ton-Vorgabe
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Geben Sie den gewünschten Ton explizit an:</p>
                <div className="p-4 bg-cyan-50 dark:bg-cyan-950/30 rounded-lg">
                  <code className="text-sm">"Schreibe eine E-Mail an den Kunden, dass sich die Lieferung um 2 Wochen verzögert. Ton: entschuldigend aber lösungsorientiert. Biete einen Rabatt als Entschädigung an."</code>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-cyan-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-sm">16</span>
                  Intelligente E-Mail-Zusammenfassung
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Fassen Sie lange E-Mail-Threads zusammen:</p>
                <div className="p-4 bg-cyan-50 dark:bg-cyan-950/30 rounded-lg">
                  <code className="text-sm">"Fasse diesen E-Mail-Thread zusammen: 1) Was ist das Hauptthema? 2) Welche Entscheidungen wurden getroffen? 3) Welche offenen Punkte gibt es?"</code>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-cyan-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-sm">17</span>
                  Kalender-Konflikte erkennen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Nutzen Sie Copilot für Terminplanung:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                    "Finde einen freien Slot diese Woche für ein 1-Stunden-Meeting mit Anna und Max"
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                    "Welche Termine kann ich diese Woche verschieben, um mehr Fokuszeit zu haben?"
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-cyan-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-sm">18</span>
                  Priorisierte E-Mail-Übersicht
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Starten Sie den Tag mit einer priorisierten Übersicht:</p>
                <div className="p-4 bg-cyan-50 dark:bg-cyan-950/30 rounded-lg">
                  <code className="text-sm">"Welche E-Mails von gestern benötigen sofortige Aufmerksamkeit? Sortiere nach Dringlichkeit und zeige mir die Absender und Betreffzeilen."</code>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Teams Tipps Section */}
        <section id="teams-tipps">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-amber-500">
            <span className="flex items-center gap-3">
              <Users className="w-8 h-8 text-amber-600" />
              Teams Tipps (19-22)
            </span>
          </h2>

          <div className="space-y-6 mt-8">
            <Card className="border-l-4 border-l-amber-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">19</span>
                  Strukturierte Meeting-Zusammenfassungen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Geben Sie das gewünschte Format vor:</p>
                <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
                  <code className="text-sm">"Fasse das Meeting zusammen mit: 1) Hauptthemen, 2) Getroffene Entscheidungen, 3) Action Items mit Verantwortlichen und Deadlines, 4) Offene Fragen"</code>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-amber-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">20</span>
                  Verpasste Meetings aufholen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Holen Sie verpasste Meetings schnell nach:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    "Was habe ich im Team-Meeting verpasst, das mich direkt betrifft?"
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    "Wurden im Meeting Aufgaben an mich vergeben?"
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    "Was hat [Kollege] im Meeting zu [Thema] gesagt?"
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-amber-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">21</span>
                  Chat-Zusammenfassungen bei langen Threads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Holen Sie bei langen Chat-Verläufen auf:</p>
                <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
                  <code className="text-sm">"Fasse die wichtigsten Punkte aus diesem Chat der letzten 7 Tage zusammen. Was wurde entschieden? Welche Fragen sind offen?"</code>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-amber-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">22</span>
                  App-übergreifende Suche
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Nutzen Sie Copilot als zentrale Suchmaschine:</p>
                <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
                  <code className="text-sm">"Finde alle Informationen über das Projekt 'Phoenix' – in E-Mails, Teams-Chats, Meetings und Dokumenten der letzten 30 Tage."</code>
                </div>
                <p className="text-sm text-muted-foreground mt-3">→ Copilot durchsucht alle M365-Apps gleichzeitig und fasst die Ergebnisse zusammen.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Fehler vermeiden Section */}
        <section id="fehler-vermeiden">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-red-500">
            <span className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              Häufige Fehler vermeiden
            </span>
          </h2>

          <div className="space-y-4 mt-8">
            <Card className="border-l-4 border-l-red-500">
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-lg">
                    <p className="font-semibold text-red-700 dark:text-red-400 mb-2">❌ Zu vage Prompts</p>
                    <p className="text-sm">"Mach etwas mit diesen Daten"</p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                    <p className="font-semibold text-green-700 dark:text-green-400 mb-2">✅ Spezifisch sein</p>
                    <p className="text-sm">"Erstelle ein Balkendiagramm der Top 5 Produkte nach Umsatz"</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500">
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-lg">
                    <p className="font-semibold text-red-700 dark:text-red-400 mb-2">❌ Ergebnis blind übernehmen</p>
                    <p className="text-sm">Ersten Output direkt verwenden</p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                    <p className="font-semibold text-green-700 dark:text-green-400 mb-2">✅ Iterieren</p>
                    <p className="text-sm">"Kürze das auf die Hälfte" / "Füge Beispiele hinzu"</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500">
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-lg">
                    <p className="font-semibold text-red-700 dark:text-red-400 mb-2">❌ Zielgruppe vergessen</p>
                    <p className="text-sm">"Schreibe einen Bericht"</p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                    <p className="font-semibold text-green-700 dark:text-green-400 mb-2">✅ Kontext geben</p>
                    <p className="text-sm">"Schreibe einen Bericht für das Management, max. 2 Seiten, Fokus ROI"</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-slate-500">
            Häufig gestellte Fragen
          </h2>

          <div className="space-y-4 mt-8">
            {faqs.map((faq, idx) => (
              <Card key={idx} className="border-l-4 border-l-slate-500">
                <CardHeader>
                  <CardTitle className="text-base font-semibold">{faq.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quellen Section */}
        <section id="quellen">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-gray-500">
            Quellen und weiterführende Links
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mt-8">
            {[
              {
                href: "https://support.microsoft.com/de-de/copilot",
                title: "Microsoft Copilot Hilfe",
                desc: "Offizielle Dokumentation und Anleitungen",
                color: "blue"
              },
              {
                href: "https://adoption.microsoft.com/copilot/",
                title: "Microsoft Copilot Adoption Hub",
                desc: "Best Practices für die Einführung",
                color: "green"
              },
              {
                href: "https://learn.microsoft.com/de-de/copilot/",
                title: "Microsoft Learn: Copilot",
                desc: "Lernpfade und Tutorials",
                color: "purple"
              },
              {
                href: "https://copilotenschule.de/wissen/prompt-engineering",
                title: "Prompt Engineering Guide",
                desc: "Vertiefte Prompt-Techniken",
                color: "cyan"
              }
            ].map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-start gap-3 p-4 border-l-4 border-l-${link.color}-500 border rounded-lg hover:bg-muted/50 transition-colors group`}
              >
                <ExternalLink className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0 group-hover:text-primary" />
                <div>
                  <div className="font-semibold group-hover:text-primary transition-colors">{link.title}</div>
                  <div className="text-sm text-muted-foreground">{link.desc}</div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <TrustBadge />

        {/* CTA */}
        <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-xl p-8 text-center mt-12 border-2 border-orange-500/20">
          <h3 className="text-2xl font-bold mb-4">Copilot-Training für Ihr Team</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Lernen Sie in praxisorientierten Workshops, wie Sie Microsoft 365 Copilot optimal nutzen
            und diese Tipps im Arbeitsalltag anwenden.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
          >
            Workshop anfragen
          </a>
        </div>
      </ContentLayout>
    </>
  );
};

export default CopilotTippsTricks;

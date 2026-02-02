import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";
import { ExternalLink, Lightbulb, Code, FileText, Zap, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SLUG = "wissen/copilot-tipps-tricks-produktivitaet";
const PAGE_TITLE = "20 Microsoft Copilot Tipps & Tricks";

const CopilotTippsTricks = () => {
  const author = getAuthor("martin-lang");

  const tableOfContents = [
    { id: "github-copilot-tipps", title: "GitHub Copilot Tipps (1-10)", level: 2 },
    { id: "microsoft-365-tipps", title: "Microsoft 365 Copilot Tipps (11-20)", level: 2 },
    { id: "pro-tipps", title: "Pro-Tipps für Power User", level: 2 },
    { id: "fehler-vermeiden", title: "Häufige Fehler vermeiden", level: 2 },
    { id: "zusammenfassung", title: "Zusammenfassung", level: 2 }
  ];

  const ids = generateSchemaIds(SLUG, 'wissen');
  const pageUrl = `https://copilotenschule.de/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const faqs = [
    {
      name: "Wie kann ich meine Copilot-Produktivität sofort steigern?",
      answer: "Die drei wichtigsten Sofort-Tipps: 1) Geben Sie mehr Kontext in Ihren Prompts, 2) Verwenden Sie beschreibende Funktions- und Variablennamen, 3) Iterieren Sie über erste Ergebnisse statt sie direkt zu akzeptieren."
    },
    {
      name: "Was sind die besten Copilot-Shortcuts für den Alltag?",
      answer: "In VS Code: Ctrl/Cmd + I für Copilot Chat, Tab zum Akzeptieren, Alt + ] für alternative Vorschläge. In Microsoft 365 Apps variieren die Shortcuts je nach Anwendung - Alt + H öffnet oft das Copilot-Panel."
    },
    {
      name: "Wie erstelle ich effektive Prompt-Vorlagen für mein Team?",
      answer: "Dokumentieren Sie erfolgreiche Prompts mit Platzhaltern: [Typ], [Zielgruppe], [Umfang]. Teilen Sie diese in einem gemeinsamen Repository und ergänzen Sie Beispiele für verschiedene Anwendungsfälle."
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": ids.article,
        "headline": "20 Microsoft Copilot Tipps & Tricks: Produktivität steigern (2026)",
        "description": "Copilot Produktivität steigern: 20 Profi-Tipps für GitHub Copilot & Microsoft 365 Copilot. Prompting-Tricks, Shortcuts & versteckte Features.",
        "author": getAuthorSchemaMarkup(author),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization"
        },
        "datePublished": "2025-11-18",
        "dateModified": "2026-02-02",
        "keywords": ["Microsoft Copilot Tipps", "Copilot Tricks", "GitHub Copilot Best Practices", "Copilot Produktivität", "Copilot Power User"],
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
        title="20 Microsoft Copilot Tipps & Tricks: Produktivität steigern (2026)"
        description="Copilot Produktivität steigern: 20 Profi-Tipps für GitHub Copilot & Microsoft 365 Copilot. Prompting-Tricks, Shortcuts & versteckte Features."
        keywords={["Microsoft Copilot Tipps", "Copilot Tricks", "GitHub Copilot Best Practices", "Copilot Produktivität steigern", "Copilot Power User"]}
        canonicalUrl={pageUrl}
        author={author}
        publishedTime="2025-11-18"
        modifiedTime="2026-02-02"
        schema={schema}
      />
      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: PAGE_TITLE, href: `/${SLUG}` }
        ]}
        title="20 Microsoft Copilot Tipps & Tricks für mehr Produktivität"
        description="Copilot bietet weit mehr als nur einfache Code-Vervollständigung oder Textzusammenfassungen. Hier sind 20 praxiserprobte Tipps für GitHub Copilot und Microsoft 365 Copilot, die Sie sofort umsetzen können."
        lastUpdated="02. Februar 2026"
        readTime="10 Minuten"
        tableOfContents={tableOfContents}
      >
        {/* GitHub Copilot Tipps Section */}
        <section id="github-copilot-tipps" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-foreground flex items-center gap-2">
            <Code className="w-8 h-8 text-primary" />
            GitHub Copilot Tipps (1-10)
          </h2>

          <div className="space-y-6">
            {/* Tipp 1 */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">1. Verwenden Sie beschreibende Funktionsnamen</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Copilot versteht Ihre Intention besser, wenn Funktionsnamen klar sind:</p>
                <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`# ✅ Gut:
def calculate_customer_lifetime_value(purchases, avg_order_value):
    # Copilot generiert präzisen Code

# ❌ Weniger gut:
def calc(p, v):
    # Copilot muss raten`}</pre>
                </div>
              </CardContent>
            </Card>

            {/* Tipp 2 */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">2. Schreiben Sie Kommentare in natürlicher Sprache</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Beschreiben Sie ZUERST, was Sie erreichen wollen:</p>
                <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`// Erstelle eine Funktion, die ein Array von Zahlen nimmt und
// nur die geraden Zahlen zurückgibt, sortiert in absteigender Reihenfolge
function filterAndSortEvenNumbers(numbers) {
    // Copilot vervollständigt hier
}`}</pre>
                </div>
              </CardContent>
            </Card>

            {/* Tipp 3 */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">3. Nutzen Sie Copilot Chat für Erklärungen</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">Markieren Sie komplexen Code und fragen Sie:</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>"Erkläre diesen Code Schritt für Schritt"</li>
                  <li>"Was sind potenzielle Bugs hier?"</li>
                  <li>"Wie kann ich das performanter machen?"</li>
                </ul>
              </CardContent>
            </Card>

            {/* Tipp 4 */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">4. Test-Driven Development mit Copilot</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Schreiben Sie Tests zuerst, Copilot generiert die Implementation:</p>
                <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`// Test schreiben
test('should validate email format', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('invalid-email')).toBe(false);
});

// Copilot generiert validateEmail() Funktion automatisch`}</pre>
                </div>
              </CardContent>
            </Card>

            {/* Tipps 5-10 kompakt */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="bg-muted/30">
                <CardContent className="pt-4">
                  <h4 className="font-semibold mb-2">5. Context ist King</h4>
                  <p className="text-sm text-muted-foreground">Öffnen Sie relevante Dateien (Interfaces, Types, ähnliche Implementierungen) für besseren Context.</p>
                </CardContent>
              </Card>
              <Card className="bg-muted/30">
                <CardContent className="pt-4">
                  <h4 className="font-semibold mb-2">6. Slash Commands nutzen</h4>
                  <p className="text-sm text-muted-foreground">/explain, /fix, /tests, /doc - Schnelle Befehle für häufige Aufgaben.</p>
                </CardContent>
              </Card>
              <Card className="bg-muted/30">
                <CardContent className="pt-4">
                  <h4 className="font-semibold mb-2">7. Multi-File Editing</h4>
                  <p className="text-sm text-muted-foreground">Refactoring über mehrere Dateien: "Benenne getUserData in allen Dateien zu fetchUserProfile um"</p>
                </CardContent>
              </Card>
              <Card className="bg-muted/30">
                <CardContent className="pt-4">
                  <h4 className="font-semibold mb-2">8. Code Reviews mit Copilot</h4>
                  <p className="text-sm text-muted-foreground">"Reviewe diesen Pull Request", "Finde Sicherheitslücken", "Prüfe auf Performance-Probleme"</p>
                </CardContent>
              </Card>
              <Card className="bg-muted/30">
                <CardContent className="pt-4">
                  <h4 className="font-semibold mb-2">9. Boilerplate eliminieren</h4>
                  <p className="text-sm text-muted-foreground">Lassen Sie Copilot CRUD Operations, API Endpoints und Error Handling generieren.</p>
                </CardContent>
              </Card>
              <Card className="bg-muted/30">
                <CardContent className="pt-4">
                  <h4 className="font-semibold mb-2">10. Alternative Vorschläge</h4>
                  <p className="text-sm text-muted-foreground">Alt + ] / Option + ] für weitere Copilot-Vorschläge.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Microsoft 365 Tipps Section */}
        <section id="microsoft-365-tipps" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-foreground flex items-center gap-2">
            <FileText className="w-8 h-8 text-primary" />
            Microsoft 365 Copilot Tipps (11-20)
          </h2>

          <div className="space-y-6">
            {/* Tipp 11 */}
            <Card className="border-primary/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">11. Kontextreiche Prompts in Word</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 bg-red-50 rounded border border-red-200">
                    <p className="text-sm font-medium text-red-800">❌ Statt:</p>
                    <p className="text-sm text-red-700">"Schreibe einen Bericht"</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded border border-green-200">
                    <p className="text-sm font-medium text-green-800">✅ Besser:</p>
                    <p className="text-sm text-green-700">"Schreibe einen 2-seitigen Quartalsbericht für das Management über unsere Marketing-Performance. Verwende die Daten aus 'Q4_Metrics.xlsx' und füge Vergleiche zum Vorquartal hinzu."</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weitere Tipps kompakt */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-4">
                  <h4 className="font-semibold mb-2">12. Meeting-Zusammenfassungen</h4>
                  <p className="text-sm text-muted-foreground">"Fasse das Meeting zusammen mit: 1) Wichtigsten Entscheidungen, 2) Action Items mit Verantwortlichen, 3) Nächsten Schritten"</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <h4 className="font-semibold mb-2">13. Excel-Formeln generieren</h4>
                  <p className="text-sm text-muted-foreground">"Erstelle eine Formel, die den Durchschnitt der Spalte B berechnet, aber nur für Zeilen, wo Spalte A größer als 100 ist"</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <h4 className="font-semibold mb-2">14. PowerPoint Storytelling</h4>
                  <p className="text-sm text-muted-foreground">"Erstelle eine 10-Folien Präsentation über unsere Produktstrategie. Zielgruppe: Vorstand. Ton: professionell."</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <h4 className="font-semibold mb-2">15. Outlook E-Mail Triage</h4>
                  <p className="text-sm text-muted-foreground">"Fasse meine E-Mails von gestern zusammen. Welche benötigen sofortige Aufmerksamkeit?"</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <h4 className="font-semibold mb-2">16. Datenanalyse in Excel</h4>
                  <p className="text-sm text-muted-foreground">"Analysiere diese Verkaufsdaten: Top 10 Produkte als Pivot-Chart, Trend-Graph der letzten 6 Monate, Prognose für Q1"</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <h4 className="font-semibold mb-2">17. Dokumenten-übergreifende Suche</h4>
                  <p className="text-sm text-muted-foreground">"Finde alle Informationen über Projekt 'Phoenix' in meinen E-Mails, Teams-Chats und OneDrive-Dokumenten"</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <h4 className="font-semibold mb-2">18. Meeting-Vorbereitung</h4>
                  <p className="text-sm text-muted-foreground">"Bereite mich auf das Meeting mit [Kunde] vor. Was waren die letzten Interaktionen? Welche offenen Themen?"</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <h4 className="font-semibold mb-2">19. Content Repurposing</h4>
                  <p className="text-sm text-muted-foreground">"Wandle diese PowerPoint in einen Blog-Artikel um" oder "Erstelle Social Media Posts aus diesem Whitepaper"</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <h4 className="font-semibold mb-2">20. Continuous Learning</h4>
                  <p className="text-sm text-muted-foreground">"Welche neuen Features hat Copilot in den letzten 30 Tagen bekommen, die für meine Rolle relevant sind?"</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pro-Tipps Section */}
        <section id="pro-tipps" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-foreground flex items-center gap-2">
            <Zap className="w-8 h-8 text-yellow-500" />
            Pro-Tipps für Power User
          </h2>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Prompt-Vorlagen erstellen</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Legen Sie sich eine Sammlung bewährter Prompts an:</p>
              <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`Für Reports:
Erstelle einen [Typ]-Bericht über [Thema] für [Zielgruppe].
Umfang: [X] Seiten
Datenquellen: [Files]
Fokus: [Schwerpunkte]
Ton: [formal/locker/technisch]

Für Analysen:
Analysiere [Datensatz] und beantworte:
1. [Frage 1]
2. [Frage 2]
3. [Frage 3]
Erstelle Visualisierungen für jede Antwort.`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Keyboard Shortcuts lernen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">VS Code</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li><code className="bg-muted px-1 rounded">Ctrl/Cmd + I</code> - Copilot Chat öffnen</li>
                    <li><code className="bg-muted px-1 rounded">Tab</code> - Vorschlag akzeptieren</li>
                    <li><code className="bg-muted px-1 rounded">Alt + ]</code> - Nächster Vorschlag</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Microsoft 365</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li><code className="bg-muted px-1 rounded">Alt + H</code> - Copilot Pane öffnen (variiert)</li>
                    <li>Thumbs up/down für Feedback</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Fehler vermeiden Section */}
        <section id="fehler-vermeiden" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-foreground flex items-center gap-2">
            <AlertCircle className="w-8 h-8 text-red-500" />
            Häufige Fehler vermeiden
          </h2>

          <div className="space-y-4">
            <Card className="border-red-200">
              <CardContent className="pt-4">
                <div className="flex items-start gap-3">
                  <span className="text-red-500 font-bold">❌</span>
                  <div>
                    <p className="font-semibold">Zu vage Prompts</p>
                    <p className="text-sm text-muted-foreground">"Mach etwas mit den Daten"</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 mt-3">
                  <span className="text-green-500 font-bold">✅</span>
                  <div>
                    <p className="font-semibold">Spezifisch sein</p>
                    <p className="text-sm text-muted-foreground">"Erstelle ein Balkendiagramm der Top 5 Verkaufsregionen"</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-200">
              <CardContent className="pt-4">
                <div className="flex items-start gap-3">
                  <span className="text-red-500 font-bold">❌</span>
                  <div>
                    <p className="font-semibold">Copilot blind vertrauen</p>
                    <p className="text-sm text-muted-foreground">Code nicht reviewen</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 mt-3">
                  <span className="text-green-500 font-bold">✅</span>
                  <div>
                    <p className="font-semibold">Immer prüfen</p>
                    <p className="text-sm text-muted-foreground">Besonders Sicherheit und Edge Cases</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-200">
              <CardContent className="pt-4">
                <div className="flex items-start gap-3">
                  <span className="text-red-500 font-bold">❌</span>
                  <div>
                    <p className="font-semibold">Keine Iteration</p>
                    <p className="text-sm text-muted-foreground">Ersten Output nehmen</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 mt-3">
                  <span className="text-green-500 font-bold">✅</span>
                  <div>
                    <p className="font-semibold">Verfeinern</p>
                    <p className="text-sm text-muted-foreground">"Mach es prägnanter" / "Füge Beispiele hinzu"</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Zusammenfassung Section */}
        <section id="zusammenfassung" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Zusammenfassung</h2>

          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="pt-6">
              <p className="mb-4 font-medium">Copilot wird mit jedem Einsatz wertvoller, wenn Sie:</p>
              <ol className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary">1.</span>
                  <span><strong>Kontext geben</strong> - Je mehr Information, desto besser die Ergebnisse</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary">2.</span>
                  <span><strong>Spezifisch sein</strong> - Klare Anweisungen führen zu präzisem Output</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary">3.</span>
                  <span><strong>Iterieren</strong> - Erste Antwort verfeinern</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary">4.</span>
                  <span><strong>Experimentieren</strong> - Neue Anwendungsfälle testen</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary">5.</span>
                  <span><strong>Lernen</strong> - Shortcuts und Features kennenlernen</span>
                </li>
              </ol>
            </CardContent>
          </Card>

          <Card className="mt-6 border-yellow-200 bg-yellow-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-800">
                <Lightbulb className="w-5 h-5" />
                Nächste Schritte
              </CardTitle>
            </CardHeader>
            <CardContent className="text-yellow-900">
              <ul className="list-disc list-inside space-y-2">
                <li>Wählen Sie 3 Tipps aus diesem Artikel und setzen Sie sie diese Woche um</li>
                <li>Tauschen Sie sich mit Kollegen über Best Practices aus</li>
                <li>Dokumentieren Sie Ihre eigenen erfolgreichen Prompts</li>
                <li>Investieren Sie 15 Minuten täglich, um neue Copilot-Techniken auszuprobieren</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mt-6 border-primary bg-primary/10">
            <CardContent className="pt-6 text-center">
              <p className="font-semibold">Möchten Sie Copilot-Power-User werden?</p>
              <p className="text-muted-foreground mt-2">Buchen Sie unser Advanced Copilot Training!</p>
            </CardContent>
          </Card>
        </section>

        {/* FAQ Section für SEO */}
        <section id="faq" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Häufig gestellte Fragen</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </ContentLayout>
    </>
  );
};

export default CopilotTippsTricks;

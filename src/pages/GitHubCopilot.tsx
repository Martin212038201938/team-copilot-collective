import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Code, Terminal, MessageSquare, Zap, ExternalLink } from "lucide-react";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";

const SLUG = "github-copilot";
const PAGE_TITLE = "GitHub Copilot";

const GitHubCopilot = () => {
  const martinLang = getAuthor('martin-lang')!;

  // Schema IDs automatisch generieren
  const ids = generateSchemaIds(SLUG, 'wissen');
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const tableOfContents = [
    { id: "was-ist", title: "Was ist GitHub Copilot?", level: 2 },
    { id: "funktionen", title: "Funktionen und Features", level: 2 },
    { id: "setup", title: "Setup und Installation", level: 2 },
    { id: "best-practices", title: "Best Practices für Entwickler", level: 2 },
    { id: "code-qualitaet", title: "Code-Qualität mit Copilot", level: 2 },
    { id: "advanced-features", title: "Advanced Features", level: 2 },
    { id: "prompt-engineering", title: "Prompt Engineering für Copilot", level: 2 },
    { id: "fehler-vermeiden", title: "Häufige Fehler vermeiden", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
    { id: "quellen", title: "Quellen und Links", level: 2 }
  ];

  // FAQ-Daten für Schema und Anzeige (kundenorientierte Fragen)
  const faqs = [
    {
      name: "Unsere Entwickler sind mit GitHub Copilot unzufrieden – wie können wir das verbessern?",
      answer: "Die Unzufriedenheit liegt meist an fehlendem Training für effektive Nutzung. Entwickler müssen lernen, Copilot als Pair-Programming-Partner zu verstehen und Prompts gezielt zu formulieren. Die Copilotenschule bietet spezialisierte GitHub Copilot Trainings für Entwicklerteams, die Produktivitätssteigerungen von bis zu 55% ermöglichen."
    },
    {
      name: "Wie rechtfertigen wir die Kosten für GitHub Copilot gegenüber dem Management?",
      answer: "Der ROI von GitHub Copilot ist messbar: Studien zeigen 55% schnellere Task-Completion und bis zu 40% mehr akzeptierten Code. Bei einem Entwickler-Tagessatz von 800€ amortisiert sich die Lizenz (19-39 USD/Monat) bereits bei wenigen Stunden Zeitersparnis. Die Copilotenschule unterstützt Sie bei der Erstellung überzeugender Business Cases mit konkreten Zahlen."
    },
    {
      name: "Ist GitHub Copilot sicher für unseren proprietären Unternehmens-Code?",
      answer: "Mit GitHub Copilot Business und Enterprise ist Ihr Code sicher: Er wird nicht für das Training öffentlicher Modelle verwendet, bleibt privat und wird verschlüsselt übertragen. GitHub bietet zudem IP-Indemnity-Schutz. Im GitHub Copilot Training der Copilotenschule behandeln wir Security Best Practices und Compliance-Anforderungen für den Enterprise-Einsatz."
    },
    {
      name: "Wie messen wir den Erfolg von GitHub Copilot in unserem Entwicklerteam?",
      answer: "Messen Sie Acceptance Rate (akzeptierte Vorschläge), Lines of Code Suggested, Time-to-Completion bei Standard-Tasks und Entwickler-Zufriedenheit. GitHub Copilot Business bietet ein Admin-Dashboard für Team-Metriken. Die Copilotenschule hilft bei der Definition von KPIs und dem Aufbau eines effektiven Adoption-Trackings."
    }
  ];

  // Kombiniertes Schema mit @graph (Article, FAQ, Breadcrumb) - IDs automatisch generiert
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": ids.article,
        "headline": "GitHub Copilot: Der ultimative Leitfaden für Entwickler 2025",
        "description": "GitHub Copilot für Entwickler: Funktionen, Best Practices und Produktivitäts-Tipps. Vollständiger Leitfaden von Setup bis Advanced Features.",
        "author": getAuthorSchemaMarkup(martinLang),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization"
        },
        "datePublished": "2025-11-07",
        "dateModified": "2026-02-03",
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
        title="GitHub Copilot: Der ultimative Leitfaden für Entwickler 2025"
        description="GitHub Copilot für Entwickler: Funktionen, Best Practices und Produktivitäts-Tipps. Vollständiger Leitfaden von Setup bis Advanced Features."
        keywords={[
          "GitHub Copilot",
          "KI Code-Assistent",
          "GitHub Copilot Tutorial",
          "AI Pair Programming",
          "Code Completion",
          "Developer Productivity",
          "VS Code Copilot"
        ]}
        canonicalUrl={pageUrl}
        schema={schema}
        author={martinLang}
        publishedTime="2025-11-07T10:00:00+01:00"
        modifiedTime="2025-11-07T10:00:00+01:00"
      />

      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "GitHub Copilot", href: "/wissen/github-copilot" }
        ]}
        title="GitHub Copilot: Der ultimative Leitfaden für Entwickler 2025"
        description="GitHub Copilot für Entwickler: Funktionen, Best Practices und Produktivitäts-Tipps. Vollständiger Leitfaden von Setup bis Advanced Features."
        lastUpdated="07. November 2025"
        readTime="12 Minuten"
        tableOfContents={tableOfContents}
      >
        {/* Quick Answer */}
        <Card className="mb-8 border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-amber-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-orange-500" />
              Schnellantwort
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base leading-relaxed">
              GitHub Copilot ist ein KI-gestützter Code-Assistent, der Entwicklern hilft, schneller und effizienter zu programmieren.
              Als Pair-Programming-Partner generiert Copilot Code-Vorschläge in Echtzeit basierend auf Kontext und Kommentaren.
              Entwickler berichten von 30-55% Produktivitätssteigerung. Copilot unterstützt Python, JavaScript, TypeScript, Ruby,
              Go und viele weitere Sprachen. Verfügbar in VS Code, JetBrains IDEs, Neovim und direkt im Terminal via CLI.
            </p>
          </CardContent>
        </Card>

        <section id="was-ist">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-blue-500">Was ist GitHub Copilot?</h2>
          <p>
            GitHub Copilot ist ein KI-gestützter Code-Completion-Tool, das von GitHub und OpenAI entwickelt wurde.
            Es fungiert als Ihr virtueller Pair-Programming-Partner und schlägt Code-Zeilen oder ganze Funktionen vor,
            während Sie tippen.
          </p>
          <p className="mt-4">
            Basierend auf dem OpenAI Codex-Modell wurde Copilot auf Milliarden von Zeilen öffentlichen Code trainiert
            und versteht den Kontext Ihres Projekts, um relevante Vorschläge zu machen.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <Card>
              <CardHeader className="bg-gradient-to-r from-green-500/10 to-green-600/10">
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Code Completion
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm">
                  Automatische Vervollständigung von Code basierend auf Ihrem Kontext. Copilot schlägt die nächsten
                  Zeilen vor, während Sie tippen.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-gradient-to-r from-blue-500/10 to-blue-600/10">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Copilot Chat
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm">
                  Stellen Sie Fragen zu Ihrem Code, lassen Sie sich Erklärungen geben oder fordern Sie
                  Refactorings direkt im Chat an.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="funktionen" className="mt-12">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-green-500">Funktionen und Features</h2>

          <div className="space-y-6 my-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Inline Code Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Während Sie Code schreiben, schlägt Copilot automatisch die nächsten Zeilen vor.
                  Drücken Sie Tab, um einen Vorschlag zu übernehmen.
                </p>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                  <code>
                    {'// Function to calculate fibonacci numbers'}
                    <br />
                    {'function fibonacci(n) { // <- Copilot completes the rest'}
                  </code>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Copilot Chat</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Code-Erklärungen und Dokumentation",
                    "Bug-Fixes vorschlagen",
                    "Code refactoring",
                    "Unit-Tests generieren",
                    "Sicherheitsprobleme identifizieren"
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Terminal className="w-5 h-5" />
                  GitHub Copilot CLI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Nutzen Sie Copilot direkt im Terminal für Shell-Befehle und Git-Operationen.
                </p>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                  <code>
                    {'$ gh copilot explain "git rebase -i"'}
                    <br />
                    {'$ gh copilot suggest "find all large files"'}
                  </code>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="setup" className="mt-12">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-purple-500">Setup und Installation</h2>
          <p>
            Die Installation von GitHub Copilot ist in wenigen Schritten erledigt.
          </p>

          <Card className="my-6">
            <CardHeader>
              <CardTitle>Installation in VS Code</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-3">
                <li>Öffnen Sie VS Code und gehen Sie zu den Extensions (Strg+Shift+X)</li>
                <li>Suchen Sie nach "GitHub Copilot"</li>
                <li>Klicken Sie auf "Install"</li>
                <li>Melden Sie sich mit Ihrem GitHub-Account an</li>
                <li>Akzeptieren Sie die erforderlichen Berechtigungen</li>
              </ol>
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Tipp:</strong> Installieren Sie auch "GitHub Copilot Chat" für erweiterte Funktionen.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="best-practices" className="mt-12">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-cyan-500">Best Practices für Entwickler</h2>

          <div className="space-y-6 my-6">
            {[
              {
                title: "Schreiben Sie aussagekräftige Kommentare",
                description: "Copilot versteht natürliche Sprache. Je klarer Ihre Kommentare, desto bessere Vorschläge erhalten Sie.",
                example: "// Fetch user data from API and handle errors with retry logic"
              },
              {
                title: "Geben Sie Kontext durch Code-Struktur",
                description: "Copilot analysiert Ihren bestehenden Code. Verwenden Sie konsistente Naming Conventions und Patterns.",
                example: "Gut strukturierte Klassen und Funktionen helfen Copilot, bessere Vorschläge zu machen."
              },
              {
                title: "Reviewen Sie alle Vorschläge",
                description: "Copilot ist ein Assistent, kein Ersatz für kritisches Denken. Prüfen Sie jeden Vorschlag auf Korrektheit und Sicherheit.",
                example: "Besonders bei Security-kritischem Code: Immer doppelt prüfen!"
              }
            ].map((practice, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="text-lg">{practice.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-3">{practice.description}</p>
                  <div className="bg-muted p-3 rounded text-sm font-mono">
                    {practice.example}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="code-qualitaet" className="mt-12">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-emerald-500">Code-Qualität mit Copilot</h2>
          <p>
            GitHub Copilot kann Ihre Code-Qualität verbessern, erfordert aber bewussten Einsatz.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-6">
            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="text-base">✓ Do's</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Code-Review bei jedem Vorschlag</li>
                  <li>• Tests für generierten Code schreiben</li>
                  <li>• Refactoring-Vorschläge nutzen</li>
                  <li>• Security-Scans durchführen</li>
                  <li>• Dokumentation generieren lassen</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="text-base">✗ Don'ts</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Blind Code akzeptieren</li>
                  <li>• Sensitive Daten im Prompt</li>
                  <li>• Auf Tests verzichten</li>
                  <li>• Code-Patterns ignorieren</li>
                  <li>• Performance nicht prüfen</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="advanced-features" className="mt-12">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-red-500">Advanced Features</h2>

          <Card className="my-6">
            <CardHeader>
              <CardTitle>Copilot Chat Slash Commands</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { command: "/explain", description: "Code-Erklärung anfordern" },
                  { command: "/fix", description: "Bug-Fix vorschlagen" },
                  { command: "/tests", description: "Unit-Tests generieren" },
                  { command: "/doc", description: "Dokumentation erstellen" }
                ].map((cmd, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 bg-muted rounded-lg">
                    <code className="font-mono font-bold text-primary">{cmd.command}</code>
                    <span className="text-sm">{cmd.description}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="prompt-engineering" className="mt-12">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-amber-500">Prompt Engineering für Copilot</h2>
          <p>
            Die Qualität der Copilot-Vorschläge hängt stark von Ihren Prompts ab.
          </p>

          <Card className="my-6">
            <CardHeader>
              <CardTitle>Effektive Prompt-Patterns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">❌ Schlecht:</h4>
                  <code className="block bg-muted p-3 rounded text-sm">// sort function</code>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">✓ Gut:</h4>
                  <code className="block bg-muted p-3 rounded text-sm">
                    // Sort array of objects by date property in descending order, handling null values
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="fehler-vermeiden" className="mt-12">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-indigo-500">Häufige Fehler vermeiden</h2>

          <div className="space-y-4 my-6">
            {[
              {
                fehler: "Zu wenig Kontext geben",
                lösung: "Schreiben Sie aussagekräftige Kommentare und strukturieren Sie Code logisch"
              },
              {
                fehler: "Alle Vorschläge blind akzeptieren",
                lösung: "Reviewen Sie jeden Vorschlag kritisch auf Korrektheit und Security"
              },
              {
                fehler: "Copilot als Code-Generator missbrauchen",
                lösung: "Nutzen Sie Copilot als Assistenten, nicht als Ersatz für Expertise"
              }
            ].map((item, idx) => (
              <Card key={idx}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="text-red-600 font-semibold mb-2">❌ {item.fehler}</div>
                      <div className="text-green-600 font-semibold">✓ {item.lösung}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="faq" className="mt-12 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-slate-500">Häufig gestellte Fragen (FAQ)</h2>

          <div className="space-y-4 my-6">
            {faqs.map((faq, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">{faq.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quellen und weiterführende Links */}
        <section id="quellen" className="mt-12 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-gray-500">Quellen und weiterführende Links</h2>
          <p className="text-muted-foreground mb-6">
            Offizielle Dokumentationen und Ressourcen für vertiefende Informationen zu GitHub Copilot.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="https://docs.github.com/en/copilot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-colors group"
            >
              <ExternalLink className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold group-hover:text-primary transition-colors">GitHub Copilot Dokumentation</div>
                <div className="text-sm text-muted-foreground">Offizielle Dokumentation von GitHub mit Setup-Guides und Feature-Übersicht</div>
              </div>
            </a>

            <a
              href="https://github.blog/news-insights/product-news/github-copilot-x-the-ai-powered-developer-experience/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-colors group"
            >
              <ExternalLink className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold group-hover:text-primary transition-colors">GitHub Blog: Copilot X Announcement</div>
                <div className="text-sm text-muted-foreground">Offizielle Ankündigung der erweiterten Copilot-Funktionen (März 2023)</div>
              </div>
            </a>

            <a
              href="https://github.com/features/copilot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-colors group"
            >
              <ExternalLink className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold group-hover:text-primary transition-colors">GitHub Copilot Produktseite</div>
                <div className="text-sm text-muted-foreground">Übersicht über Preise, Features und Lizenzoptionen</div>
              </div>
            </a>

            <a
              href="https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-colors group"
            >
              <ExternalLink className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold group-hover:text-primary transition-colors">GitHub Research: Produktivitätsstudie</div>
                <div className="text-sm text-muted-foreground">Studie zur Produktivitätssteigerung durch GitHub Copilot (September 2022)</div>
              </div>
            </a>
          </div>
        </section>

        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-8 text-center my-12">
          <h3 className="text-2xl font-bold mb-4">GitHub Copilot Training für Ihr Team</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Maximieren Sie die Produktivität Ihres Entwicklerteams mit professionellem GitHub Copilot Training.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Jetzt Training anfragen
          </a>
        </div>

        {/* Autor-Bio Section */}
        <Card className="mt-16 border-t-4 border-t-blue-500 overflow-hidden">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-12 gap-6 items-center p-8">
              <div className="md:col-span-3 text-center">
                <div className="w-32 h-32 mx-auto rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                  <img
                    src={martinLang.image}
                    alt={martinLang.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="md:col-span-9">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold">{martinLang.name}</h3>
                  <p className="text-lg text-primary font-semibold">{martinLang.role}</p>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {martinLang.bio}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {martinLang.expertise && martinLang.expertise.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-block px-3 py-1 bg-blue-500/10 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                {martinLang.social && (
                  <div className="flex gap-4">
                    {martinLang.social.linkedin && (
                      <a
                        href={martinLang.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                        LinkedIn
                      </a>
                    )}
                    {martinLang.social.twitter && (
                      <a
                        href={martinLang.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                        Twitter
                      </a>
                    )}
                    {martinLang.social.github && (
                      <a
                        href={martinLang.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                        GitHub
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </ContentLayout>
    </>
  );
};

export default GitHubCopilot;

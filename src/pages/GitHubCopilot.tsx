import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Code, Terminal, MessageSquare, Zap } from "lucide-react";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import { generateBreadcrumbSchema } from "@/lib/schema";

const GitHubCopilot = () => {
  const martinLang = getAuthor('martin-lang')!;

  const tableOfContents = [
    { id: "was-ist", title: "Was ist GitHub Copilot?", level: 2 },
    { id: "funktionen", title: "Funktionen und Features", level: 2 },
    { id: "setup", title: "Setup und Installation", level: 2 },
    { id: "best-practices", title: "Best Practices für Entwickler", level: 2 },
    { id: "code-qualitaet", title: "Code-Qualität mit Copilot", level: 2 },
    { id: "advanced-features", title: "Advanced Features", level: 2 },
    { id: "prompt-engineering", title: "Prompt Engineering für Copilot", level: 2 },
    { id: "fehler-vermeiden", title: "Häufige Fehler vermeiden", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 }
  ];

  // Breadcrumb Schema für Navigation
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Startseite", url: "https://copilotenschule.de/" },
    { name: "Wissen", url: "https://copilotenschule.de/wissen" },
    { name: "GitHub Copilot", url: "https://copilotenschule.de/github-copilot" }
  ]);

  // Kombiniertes Schema mit @graph (Article, FAQ, Breadcrumb)
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": "https://copilotenschule.de/github-copilot#article",
        "headline": "GitHub Copilot: Der ultimative Leitfaden für Entwickler 2025",
        "description": "GitHub Copilot für Entwickler: Funktionen, Best Practices und Produktivitäts-Tipps. Vollständiger Leitfaden von Setup bis Advanced Features.",
        "author": getAuthorSchemaMarkup(martinLang),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization"
        },
        "datePublished": "2025-11-07",
        "dateModified": "2025-11-07",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://copilotenschule.de/github-copilot"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://copilotenschule.de/github-copilot#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Welche Programmiersprachen unterstützt GitHub Copilot?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "GitHub Copilot unterstützt Python, JavaScript, TypeScript, Ruby, Go, C++, C#, Java, PHP, Rust, Swift, Kotlin und viele weitere Sprachen. Die Qualität der Vorschläge ist bei JavaScript, Python und TypeScript am höchsten."
            }
          },
          {
            "@type": "Question",
            "name": "Wie viel kostet GitHub Copilot?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "GitHub Copilot Individual kostet 10 USD/Monat, Business 19 USD pro Nutzer/Monat und Enterprise 39 USD pro Nutzer/Monat. Studenten und Open-Source-Maintainer erhalten kostenlosen Zugang."
            }
          },
          {
            "@type": "Question",
            "name": "Ist mein Code sicher mit GitHub Copilot?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ja. GitHub Copilot Business und Enterprise verwenden Ihren Code nicht zum Training öffentlicher Modelle. Ihr Code bleibt privat und wird nicht mit anderen geteilt. GitHub bietet zudem IP-Indemnity-Schutz."
            }
          },
          {
            "@type": "Question",
            "name": "Kann GitHub Copilot komplette Funktionen schreiben?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ja, GitHub Copilot kann ganze Funktionen basierend auf Kommentaren oder Funktionssignaturen generieren. Die Qualität hängt von der Klarheit Ihrer Beschreibung und dem Kontext im Code ab."
            }
          },
          {
            "@type": "Question",
            "name": "Wie verbessere ich die Qualität der Copilot-Vorschläge?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Schreiben Sie klare Kommentare, verwenden Sie aussagekräftige Variablennamen, strukturieren Sie Ihren Code gut und geben Sie Kontext durch bestehenden Code. Nutzen Sie auch Copilot Chat für komplexe Anfragen."
            }
          }
        ]
      },
      breadcrumbSchema
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
        canonicalUrl="https://copilotenschule.de/github-copilot"
        schema={schema}
        author={martinLang}
        publishedTime="2025-11-07T10:00:00+01:00"
        modifiedTime="2025-11-07T10:00:00+01:00"
      />

      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "GitHub Copilot", href: "/github-copilot" }
        ]}
        title="GitHub Copilot: Der ultimative Leitfaden für Entwickler 2025"
        description="GitHub Copilot für Entwickler: Funktionen, Best Practices und Produktivitäts-Tipps. Vollständiger Leitfaden von Setup bis Advanced Features."
        lastUpdated="07. November 2025"
        readTime="12 Minuten"
        tableOfContents={tableOfContents}
      >
        {/* Quick Answer */}
        <Card className="mb-8 border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-primary" />
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
          <h2>Was ist GitHub Copilot?</h2>
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
          <h2>Funktionen und Features</h2>

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
          <h2>Setup und Installation</h2>
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
          <h2>Best Practices für Entwickler</h2>

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
          <h2>Code-Qualität mit Copilot</h2>
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
          <h2>Advanced Features</h2>

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
          <h2>Prompt Engineering für Copilot</h2>
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
          <h2>Häufige Fehler vermeiden</h2>

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
          <h2>Häufig gestellte Fragen (FAQ)</h2>

          <div className="space-y-4 my-6">
            {faqSchema.mainEntity.map((faq: any, idx: number) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">{faq.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.acceptedAnswer.text}</p>
                </CardContent>
              </Card>
            ))}
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
      </ContentLayout>
    </>
  );
};

export default GitHubCopilot;

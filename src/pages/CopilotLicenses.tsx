import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, Info, Linkedin, Mail, ExternalLink, Zap } from "lucide-react";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";
import { TrustBadge } from "@/components/TrustBadge";

const SLUG = "microsoft-copilot-lizenzen";
const PAGE_TITLE = "Microsoft Copilot Lizenzen";

const CopilotLicenses = () => {
  const martinLang = getAuthor('martin-lang')!;

  // Schema IDs automatisch generieren
  const ids = generateSchemaIds(SLUG, 'wissen');
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const tableOfContents = [
    { id: "quick-answer", title: "Schnellantwort", level: 2 },
    { id: "overview", title: "Überblick Microsoft Copilot Lizenzen", level: 2 },
    { id: "microsoft-365-copilot", title: "Microsoft 365 Copilot", level: 2 },
    { id: "github-copilot", title: "GitHub Copilot", level: 2 },
    { id: "copilot-studio", title: "Microsoft Copilot Studio", level: 2 },
    { id: "comparison", title: "Lizenzvergleich", level: 2 },
    { id: "recommendations", title: "Welche Lizenz brauche ich?", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
    { id: "quellen", title: "Quellen und Links", level: 2 }
  ];

  // FAQ-Daten für Schema und Anzeige (kundenorientierte Fragen)
  const faqs = [
    {
      name: "Welche Microsoft Copilot Lizenz brauchen wir für unser Unternehmen?",
      answer: "Das hängt von Ihrem Use Case ab: Für Office-Produktivität brauchen Sie Microsoft 365 Copilot (30 USD/Nutzer/Monat), für Entwickler GitHub Copilot (19-39 USD/Nutzer/Monat), für eigene KI-Agenten Copilot Studio (ab 200 USD/Monat). Die Copilotenschule berät Sie bei der optimalen Lizenzstrategie für Ihre Anforderungen."
    },
    {
      name: "Lohnt sich Microsoft Copilot auch für kleine Teams unter 50 Mitarbeitern?",
      answer: "Ja, es gibt keine Mindestabnahmemenge mehr. Auch kleine Teams profitieren von Copilot – entscheidend ist die Nutzungsintensität, nicht die Teamgröße. Starten Sie mit einem Pilot für die Mitarbeiter mit den meisten repetitiven Aufgaben. Die Copilotenschule bietet auch Trainings für kleine Teams mit maßgeschneiderten Formaten."
    },
    {
      name: "Können wir Copilot-Lizenzen zunächst nur für eine Abteilung pilotieren?",
      answer: "Ja, ein abteilungsweiser Pilot ist empfehlenswert. Wählen Sie eine Abteilung mit messbaren Routineaufgaben (z.B. HR, Marketing, Finance). Microsoft verlangt keine unternehmensweite Lizenzierung. Die Copilotenschule unterstützt bei der Pilot-Planung mit KPI-Definition und Erfolgsmessung."
    },
    {
      name: "Was sind die versteckten Kosten bei Microsoft Copilot neben der Lizenzgebühr?",
      answer: "Planen Sie Kosten für: Training der Mitarbeiter (essentiell für ROI), evtl. Azure-Infrastruktur für Copilot Studio, Change Management und Governance-Anpassungen. Ohne Training bleibt das Potenzial ungenutzt. Die Copilotenschule bietet transparente Trainingsbudgets und hilft bei der Gesamtkostenplanung."
    }
  ];

  // Kombiniertes Schema mit @graph (Article, FAQ, Breadcrumb)
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": ids.article,
        "headline": "Microsoft Copilot Lizenzen 2026: Preise, Vergleich & Empfehlungen",
        "description": "Microsoft Copilot Lizenzen im Vergleich: M365 Copilot, GitHub Copilot & Copilot Studio. Kosten, Voraussetzungen und Empfehlungen für Unternehmen.",
        "author": getAuthorSchemaMarkup(martinLang),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization"
        },
        "datePublished": "2025-01-06",
        "dateModified": "2026-02-03T10:00:00+01:00",
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
        title="Microsoft Copilot Lizenzen 2026: Preise, Vergleich & Empfehlungen"
        description="Microsoft Copilot Lizenzen im Vergleich: M365 Copilot, GitHub Copilot & Copilot Studio. Kosten, Voraussetzungen und Empfehlungen für Unternehmen."
        keywords={[
          "Microsoft Copilot Lizenz",
          "Microsoft 365 Copilot Preis",
          "GitHub Copilot Lizenz",
          "Copilot Studio Lizenz",
          "Copilot Lizenzvergleich",
          "Microsoft AI Lizenzen",
          "Copilot Business",
          "Copilot Enterprise",
          "Copilot Kosten",
          "Microsoft Copilot Preise",
          "Copilot Lizenzmodell Unternehmen",
          "M365 Copilot Lizenz"
        ]}
        canonicalUrl={pageUrl}
        schema={schema}
        author={martinLang}
        publishedTime="2025-01-06T09:00:00+01:00"
        modifiedTime="2026-02-03T10:00:00+01:00"
      />

      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "Microsoft Copilot Lizenzen", href: "/wissen/microsoft-copilot-lizenzen" }
        ]}
        title="Microsoft Copilot Lizenzen 2026: Preise, Vergleich & Empfehlungen"
        description="Welche Microsoft Copilot Lizenz benötigen Sie? Umfassender Vergleich aller Lizenzmodelle für Microsoft 365 Copilot, GitHub Copilot und Copilot Studio."
        lastUpdated="02. Februar 2026"
        authorName="Martin Lang"
        tableOfContents={tableOfContents}
      >
        {/* Quick Answer Section für AIO-Optimierung */}
        <section id="quick-answer" className="mb-8">
          <Card className="border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-amber-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Zap className="w-6 h-6 text-orange-500" />
                Schnellantwort: Welche Microsoft Copilot Lizenz brauche ich?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-base leading-relaxed">
                <strong>Microsoft bietet drei Hauptlizenzmodelle:</strong> Microsoft 365 Copilot (30 USD/Monat für Office-Produktivität),
                GitHub Copilot (10-39 USD/Monat für Entwickler) und Copilot Studio (ab 200 USD/Monat für eigene KI-Agenten).
                Die richtige Wahl hängt von Ihrem Anwendungsfall ab: Business User benötigen Microsoft 365 Copilot,
                Entwicklerteams GitHub Copilot Business, und für Custom AI-Lösungen ist Copilot Studio die beste Option.
                Alle Lizenzen sind DSGVO-konform und nutzen Unternehmensdaten nicht für öffentliches KI-Training.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div className="p-3 bg-white dark:bg-gray-900 rounded-lg border">
                  <div className="font-bold text-primary mb-1">M365 Copilot</div>
                  <div className="text-sm text-muted-foreground">Office-Produktivität</div>
                  <div className="text-lg font-semibold mt-2">30 USD/Monat</div>
                </div>
                <div className="p-3 bg-white dark:bg-gray-900 rounded-lg border">
                  <div className="font-bold text-primary mb-1">GitHub Copilot</div>
                  <div className="text-sm text-muted-foreground">Code-Entwicklung</div>
                  <div className="text-lg font-semibold mt-2">10-39 USD/Monat</div>
                </div>
                <div className="p-3 bg-white dark:bg-gray-900 rounded-lg border">
                  <div className="font-bold text-primary mb-1">Copilot Studio</div>
                  <div className="text-sm text-muted-foreground">Custom AI-Agents</div>
                  <div className="text-lg font-semibold mt-2">ab 200 USD/Monat</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="overview">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-blue-500">Überblick Microsoft Copilot Lizenzen</h2>
          <p>
            Microsoft bietet verschiedene Copilot-Lizenzen für unterschiedliche Anwendungsfälle an.
            Dieser Leitfaden hilft Ihnen zu verstehen, welche Lizenz Sie für Ihre spezifischen Anforderungen benötigen.
          </p>
          <p>
            Die drei Hauptprodukte sind:
          </p>
          <ul>
            <li><strong>Microsoft 365 Copilot</strong> – KI-Assistent für Word, Excel, PowerPoint, Outlook, Teams</li>
            <li><strong>GitHub Copilot</strong> – KI-Coding-Assistent für Softwareentwickler</li>
            <li><strong>Microsoft Copilot Studio</strong> – Plattform zur Entwicklung eigener KI-Agenten</li>
          </ul>
        </section>

        <section id="microsoft-365-copilot" className="mt-12">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-green-500">Microsoft 365 Copilot</h2>

          <Card className="my-6 border-2 border-primary/20 hover:shadow-xl transition-shadow">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">💼</span>
                Microsoft 365 Copilot Lizenz
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-lg mb-2">Preis</h3>
                  <p className="text-3xl font-bold text-primary">30 USD</p>
                  <p className="text-sm text-muted-foreground">pro Nutzer / Monat</p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Voraussetzungen</h3>
                  <p>Erfordert eine der folgenden Lizenzen:</p>
                  <ul className="text-sm mt-2 space-y-1">
                    <li>✓ Microsoft 365 E3 oder E5</li>
                    <li>✓ Microsoft 365 Business Standard</li>
                    <li>✓ Microsoft 365 Business Premium</li>
                  </ul>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-bold mb-3">Enthaltene Features</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    "Copilot in Word, Excel, PowerPoint",
                    "Copilot in Outlook und Teams",
                    "Microsoft Copilot Chat (früher Bing Chat Enterprise)",
                    "Business Chat für teamübergreifende Zusammenarbeit",
                    "Graph-Grounded Chat über Ihre Microsoft 365 Daten",
                    "Copilot Studio (begrenzt auf 25 Nachrichten/Monat)"
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">Wichtig:</p>
                  <p className="text-blue-800 dark:text-blue-200">
                    Microsoft 365 Copilot kann nur für Nutzer aktiviert werden, die bereits eine der erforderlichen
                    Grundlizenzen besitzen. Die Mindestabnahme beträgt 1 Lizenz (früher 300 Lizenzen).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="github-copilot" className="mt-12">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-purple-500">GitHub Copilot</h2>
          <p>
            GitHub Copilot ist in drei Editionen verfügbar, jeweils mit unterschiedlichen Features für
            individuelle Entwickler und Teams.
          </p>

          <div className="grid md:grid-cols-3 gap-6 my-6">
            {[
              {
                name: "Individual",
                price: "10 USD",
                period: "pro Monat",
                description: "Für einzelne Entwickler",
                features: [
                  "Code-Vervollständigung",
                  "Chat im Editor",
                  "CLI-Integration",
                  "Mobile Unterstützung",
                  "Einzelnutzer-Lizenz"
                ],
                notIncluded: [
                  "Keine Unternehmens-Policies",
                  "Keine zentrale Verwaltung",
                  "Kein IP-Indemnity"
                ]
              },
              {
                name: "Business",
                price: "19 USD",
                period: "pro Nutzer / Monat",
                description: "Für Entwickler-Teams",
                features: [
                  "Alle Individual Features",
                  "Organization-wide Policies",
                  "Zentrale Lizenz-Verwaltung",
                  "IP-Indemnity (Haftungsschutz)",
                  "Audit Logs"
                ],
                notIncluded: [
                  "Keine erweiterten Security-Features"
                ],
                highlight: true
              },
              {
                name: "Enterprise",
                price: "39 USD",
                period: "pro Nutzer / Monat",
                description: "Für große Unternehmen",
                features: [
                  "Alle Business Features",
                  "Fine-tuned Models möglich",
                  "Erweiterte Security",
                  "SAML SSO",
                  "Compliance-Tools",
                  "Priority Support"
                ],
                notIncluded: []
              }
            ].map((plan, idx) => (
              <Card
                key={idx}
                className={`hover:shadow-xl transition-all duration-300 ${
                  plan.highlight ? 'border-2 border-primary shadow-lg scale-105' : 'border-2 border-border'
                }`}
              >
                <CardHeader className={plan.highlight ? 'bg-gradient-to-r from-primary/10 to-accent/10' : ''}>
                  <CardTitle className="text-xl">
                    GitHub Copilot {plan.name}
                    {plan.highlight && (
                      <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                        Empfohlen
                      </span>
                    )}
                  </CardTitle>
                  <div className="mt-4">
                    <div className="text-3xl font-bold text-primary">{plan.price}</div>
                    <div className="text-sm text-muted-foreground">{plan.period}</div>
                    <p className="text-sm mt-2">{plan.description}</p>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <div className="space-y-2">
                      {plan.features.map((feature, fidx) => (
                        <div key={fidx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                      {plan.notIncluded.map((feature, fidx) => (
                        <div key={fidx} className="flex items-start gap-2 opacity-50">
                          <X className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="copilot-studio" className="mt-12">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-cyan-500">Microsoft Copilot Studio</h2>
          <p>
            Microsoft Copilot Studio ermöglicht die Entwicklung eigener KI-Agenten, Chatbots und
            die Erweiterung von Microsoft 365 Copilot mit benutzerdefinierten Funktionen.
          </p>

          <Card className="my-6 border-2 border-primary/20">
            <CardHeader className="bg-gradient-to-r from-purple-500/10 to-purple-600/10">
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🤖</span>
                Copilot Studio Lizenzierungsmodelle
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <h3 className="font-bold text-lg mb-2">Copilot Studio in Microsoft 365 Copilot</h3>
                  <p className="text-2xl font-bold text-primary mb-2">Enthalten</p>
                  <p className="text-sm text-muted-foreground mb-3">
                    Begrenzt auf 25 Nachrichten pro Nutzer und Monat
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Eigene Copilot-Agents erstellen</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Custom Plugins entwickeln</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Low-Code Development</span>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4 bg-primary/5">
                  <h3 className="font-bold text-lg mb-2">Standalone Copilot Studio</h3>
                  <p className="text-2xl font-bold text-primary mb-2">ab 200 USD</p>
                  <p className="text-sm text-muted-foreground mb-3">
                    pro Tenant / Monat + nutzungsbasierte Kosten
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Unbegrenzte Nachrichten möglich</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Erweiterte Integrationen</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Custom AI Models</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Ohne Microsoft 365 Copilot nutzbar</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                <h4 className="font-bold mb-2 text-purple-900 dark:text-purple-100">Nutzungsbasierte Kosten</h4>
                <p className="text-sm text-purple-800 dark:text-purple-200 mb-3">
                  Copilot Studio berechnet zusätzlich nutzungsbasierte "Message Credits":
                </p>
                <ul className="text-sm space-y-1 text-purple-800 dark:text-purple-200">
                  <li>• 1 Message Credit = ca. 0,01 USD</li>
                  <li>• Kosten variieren je nach Nachrichtenkomplexität</li>
                  <li>• Generative AI-Antworten verbrauchen mehr Credits</li>
                  <li>• 25.000 Messages im Basispaket enthalten (200 USD/Monat)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="comparison" className="mt-12">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-emerald-500">Lizenzvergleich im Überblick</h2>
          <div className="overflow-x-auto my-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="border p-3 text-left font-bold">Feature</th>
                  <th className="border p-3 text-center font-bold">M365 Copilot</th>
                  <th className="border p-3 text-center font-bold">GitHub Copilot</th>
                  <th className="border p-3 text-center font-bold">Copilot Studio</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-3 font-medium">Preis pro Nutzer/Monat</td>
                  <td className="border p-3 text-center">30 USD</td>
                  <td className="border p-3 text-center">10-39 USD</td>
                  <td className="border p-3 text-center">ab 200 USD/Tenant</td>
                </tr>
                <tr className="bg-muted/30">
                  <td className="border p-3 font-medium">Hauptanwendungsgebiet</td>
                  <td className="border p-3 text-center">Office-Produktivität</td>
                  <td className="border p-3 text-center">Softwareentwicklung</td>
                  <td className="border p-3 text-center">Custom AI-Agents</td>
                </tr>
                <tr>
                  <td className="border p-3 font-medium">Zielgruppe</td>
                  <td className="border p-3 text-center">Business User</td>
                  <td className="border p-3 text-center">Entwickler</td>
                  <td className="border p-3 text-center">IT/Entwickler</td>
                </tr>
                <tr className="bg-muted/30">
                  <td className="border p-3 font-medium">Voraussetzungen</td>
                  <td className="border p-3 text-center">M365 E3/E5/Business</td>
                  <td className="border p-3 text-center">GitHub Account</td>
                  <td className="border p-3 text-center">Optional M365 Copilot</td>
                </tr>
                <tr>
                  <td className="border p-3 font-medium">Low-Code Development</td>
                  <td className="border p-3 text-center">
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  </td>
                  <td className="border p-3 text-center">
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  </td>
                  <td className="border p-3 text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                </tr>
                <tr className="bg-muted/30">
                  <td className="border p-3 font-medium">Code-Generierung</td>
                  <td className="border p-3 text-center">
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  </td>
                  <td className="border p-3 text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                  <td className="border p-3 text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="recommendations" className="mt-12">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-red-500">Welche Lizenz brauche ich?</h2>

          <div className="space-y-6 my-6">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="text-lg">Sie möchten Produktivität in Word, Excel, PowerPoint steigern?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-3">
                  <strong>Empfehlung: Microsoft 365 Copilot</strong>
                </p>
                <p className="text-sm text-muted-foreground">
                  Ideal für Business User, die täglichmit Microsoft Office arbeiten. Benötigt eine Microsoft 365 E3, E5,
                  Business Standard oder Business Premium Lizenz als Grundlage.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="text-lg">Sie entwickeln Software und möchten schneller coden?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-3">
                  <strong>Empfehlung: GitHub Copilot Business oder Enterprise</strong>
                </p>
                <p className="text-sm text-muted-foreground">
                  Für Teams empfiehlt sich GitHub Copilot Business (19 USD) mit zentraler Verwaltung und IP-Indemnity.
                  Große Unternehmen mit hohen Compliance-Anforderungen sollten Enterprise (39 USD) wählen.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader>
                <CardTitle className="text-lg">Sie möchten eigene KI-Chatbots oder Agents entwickeln?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-3">
                  <strong>Empfehlung: Microsoft Copilot Studio</strong>
                </p>
                <p className="text-sm text-muted-foreground">
                  Wenn Sie bereits Microsoft 365 Copilot haben, ist Copilot Studio (begrenzt) enthalten.
                  Für umfangreichere Projekte benötigen Sie die Standalone-Lizenz ab 200 USD/Monat.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardHeader>
                <CardTitle className="text-lg">Sie möchten alle Copilot-Funktionen kombinieren?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-3">
                  <strong>Empfehlung: Microsoft 365 Copilot + GitHub Copilot Business</strong>
                </p>
                <p className="text-sm text-muted-foreground">
                  Für Unternehmen, die sowohl Business-Produktivität als auch Softwareentwicklung unterstützen möchten,
                  ist eine Kombination sinnvoll: M365 Copilot für Business User, GitHub Copilot für das Dev-Team.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="faq" className="mt-12 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-amber-500">Häufig gestellte Fragen (FAQ)</h2>

          <div className="space-y-4 my-6">
            {[
              {
                question: "Kann ich Microsoft 365 Copilot testen, bevor ich kaufe?",
                answer: "Ja, Microsoft bietet Testversionen an. Wenden Sie sich an Ihren Microsoft-Partner oder kontaktieren Sie uns für eine individuelle Demo-Umgebung."
              },
              {
                question: "Muss ich für alle Mitarbeiter Microsoft 365 Copilot kaufen?",
                answer: "Nein, Sie können Copilot selektiv für einzelne Nutzer oder Teams lizenzieren. Seit 2024 ist die Mindestabnahme von 300 Lizenzen entfallen."
              },
              {
                question: "Kann ich GitHub Copilot und Microsoft 365 Copilot gleichzeitig nutzen?",
                answer: "Ja, beide Produkte sind unabhängig voneinander und können parallel genutzt werden. Sie ergänzen sich für unterschiedliche Anwendungsfälle."
              },
              {
                question: "Werden meine Daten zum Trainieren von KI-Modellen verwendet?",
                answer: "Nein. Weder Microsoft 365 Copilot noch GitHub Copilot Business/Enterprise verwenden Ihre Unternehmensdaten zum Trainieren öffentlicher KI-Modelle. Alle Daten bleiben in Ihrem Tenant."
              },
              {
                question: "Ist Copilot DSGVO-konform?",
                answer: "Ja, alle Microsoft Copilot-Produkte sind DSGVO-konform und entsprechen den Microsoft-Datenschutzstandards. Daten werden in EU-Rechenzentren verarbeitet."
              },
              {
                question: "Welche Schulungen empfehlen Sie für Copilot?",
                answer: "Wir empfehlen praxisorientierte Schulungen für Microsoft 365 Copilot (1-2 Tage) und GitHub Copilot (1 Tag). Kontaktieren Sie uns für ein individuelles Trainingsangebot."
              }
            ].map((faq, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">{faq.question}</CardTitle>
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
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-indigo-500">Quellen und weiterführende Links</h2>
          <p className="text-muted-foreground mb-6">
            Offizielle Microsoft-Ressourcen zu Lizenzierung und Preisen.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="https://www.microsoft.com/en-us/microsoft-365/copilot/business"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-colors group"
            >
              <ExternalLink className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold group-hover:text-primary transition-colors">Microsoft 365 Copilot Preisübersicht</div>
                <div className="text-sm text-muted-foreground">Offizielle Preise und Lizenzoptionen für Microsoft 365 Copilot</div>
              </div>
            </a>

            <a
              href="https://github.com/features/copilot/plans"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-colors group"
            >
              <ExternalLink className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold group-hover:text-primary transition-colors">GitHub Copilot Plans</div>
                <div className="text-sm text-muted-foreground">Übersicht der GitHub Copilot Lizenzmodelle (Individual, Business, Enterprise)</div>
              </div>
            </a>

            <a
              href="https://learn.microsoft.com/en-us/copilot/microsoft-365/microsoft-365-copilot-licensing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-colors group"
            >
              <ExternalLink className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold group-hover:text-primary transition-colors">Microsoft Learn: Copilot Licensing</div>
                <div className="text-sm text-muted-foreground">Detaillierte Dokumentation zu Lizenzanforderungen und Voraussetzungen</div>
              </div>
            </a>

            <a
              href="https://www.microsoft.com/en-us/microsoft-copilot/microsoft-copilot-studio#tabs-pill-bar-ocded0_tab2"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-colors group"
            >
              <ExternalLink className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold group-hover:text-primary transition-colors">Copilot Studio Preise</div>
                <div className="text-sm text-muted-foreground">Lizenzkosten und Message Credits für Copilot Studio</div>
              </div>
            </a>
          </div>
        </section>

        <TrustBadge />

        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-8 text-center my-12">
          <h3 className="text-2xl font-bold mb-4">Benötigen Sie Beratung zur Lizenzierung?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Wir helfen Ihnen, die richtige Copilot-Lizenz für Ihre Anforderungen zu finden und
            bieten umfassende Schulungen für Ihr Team.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Jetzt Beratung anfragen
          </a>
        </div>
      </ContentLayout>
    </>
  );
};

export default CopilotLicenses;

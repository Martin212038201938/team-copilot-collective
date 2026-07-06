import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, Info, ExternalLink, Zap } from "lucide-react";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import AuthorBio from "@/components/AuthorBio";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";
import { Link } from "react-router-dom";

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
    { id: "kosten-unternehmen", title: "Kosten für Unternehmen", level: 2 },
    { id: "comparison", title: "Lizenzvergleich", level: 2 },
    { id: "recommendations", title: "Welche Lizenz brauche ich?", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
    { id: "quellen", title: "Quellen und Links", level: 2 }
  ];

  // FAQ-Daten für Schema und Anzeige (kundenorientierte Fragen)
  const faqs = [
    {
      name: "Welche Microsoft Copilot Lizenz brauchen wir für unser Unternehmen?",
      answer: "Das hängt von Ihrem Use Case und Ihrer Unternehmensgröße ab: Für Office-Produktivität bei bis zu 300 Nutzern empfiehlt sich Microsoft 365 Copilot Business (ab 15,60 €/Nutzer/Monat, Aktionspreis bis September 2026), für größere Unternehmen Microsoft 365 Copilot (26 €/Nutzer/Monat). Für Entwickler ist GitHub Copilot Business (19 USD/Nutzer/Monat) die richtige Wahl. Die Copilotenschule berät Sie bei der optimalen Lizenzstrategie für Ihre Anforderungen."
    },
    {
      name: "Lohnt sich Microsoft Copilot auch für kleine Teams unter 50 Mitarbeitern?",
      answer: "Ja, es gibt keine Mindestabnahmemenge. Auch kleine Teams profitieren von Copilot – entscheidend ist die Nutzungsintensität, nicht die Teamgröße. Mit dem Microsoft 365 Copilot Business-Plan (Aktionspreis bis 30. September 2026) gibt es zudem einen besonders günstigen Einstieg für KMU. Starten Sie mit einem Pilot für die Mitarbeiter mit den meisten repetitiven Aufgaben. Die Copilotenschule bietet auch Trainings für kleine Teams mit maßgeschneiderten Formaten."
    },
    {
      name: "Können wir Copilot-Lizenzen zunächst nur für eine Abteilung pilotieren?",
      answer: "Ja, ein abteilungsweiser Pilot ist empfehlenswert. Wählen Sie eine Abteilung mit messbaren Routineaufgaben (z.B. HR, Marketing, Finance). Microsoft verlangt keine unternehmensweite Lizenzierung. Die Copilotenschule unterstützt bei der Pilot-Planung mit KPI-Definition und Erfolgsmessung."
    },
    {
      name: "Was sind die versteckten Kosten bei Microsoft Copilot neben der Lizenzgebühr?",
      answer: "Planen Sie Kosten für: Training der Mitarbeiter (essentiell für ROI), evtl. Azure-Infrastruktur für Copilot Studio, Change Management und Governance-Anpassungen. Ohne Training bleibt das Potenzial ungenutzt. Die Copilotenschule bietet transparente Trainingsbudgets und hilft bei der Gesamtkostenplanung."
    },
    {
      name: "Was kostet Microsoft Copilot für ein Unternehmen insgesamt?",
      answer: "Für die Gesamtkosten pro Mitarbeiter zählen Sie drei Posten zusammen: die Microsoft 365-Grundlizenz, das Copilot-Add-on und die Einführungskosten. Beispiel (Stand Juli 2026, zzgl. MwSt.): Ein KMU mit Microsoft 365 Business Standard (ca. 12,13 €) plus Microsoft 365 Copilot Business (15,60 € Aktionspreis bis 30. September 2026, regulär 18,20 €) liegt bei rund 27–31 € pro Nutzer und Monat. Ein Enterprise-Arbeitsplatz mit Microsoft 365 E3 (ca. 37,78 €) plus Microsoft 365 Copilot (26,00 €) kostet rund 64 € pro Nutzer und Monat. Hinzu kommen Schulung und Governance, die bis zu 50 % der Gesamtinvestition ausmachen können. Die Copilotenschule hilft Ihnen, die Microsoft Copilot Kosten für Ihr Unternehmen realistisch zu planen und über gezieltes Training in messbaren ROI zu überführen."
    }
  ];

  // Kombiniertes Schema mit @graph (Article, FAQ, Breadcrumb)
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": ids.article,
        "headline": "Microsoft Copilot Lizenzen: Preisvergleich 2026",
        "description": "Welche Copilot-Lizenz lohnt sich? M365 Copilot Business (ab 15,60 €/User, Aktionspreis bis Sept. 2026) und Enterprise (26 €), GitHub Copilot & Copilot Studio im Vergleich – Stand Juli 2026.",
        "author": getAuthorSchemaMarkup(martinLang),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization"
        },
        "datePublished": "2025-01-06",
        "dateModified": "2026-07-01T09:00:00+02:00",
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
        title="Microsoft 365 Copilot Preis 2026: ab 15,60 € – alle Lizenzen"
        description="Copilot-Preise 2026 für Deutschland: M365 Business ab 15,60 €/User (Aktionspreis bis Sept. 2026), Enterprise ab 26 €. Vergleich mit GitHub Copilot & Copilot Studio – Stand Juli 2026."
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
          "Microsoft Copilot Kosten Unternehmen",
          "Copilot Lizenzmodell Unternehmen",
          "M365 Copilot Lizenz"
        ]}
        canonicalUrl={pageUrl}
        schema={schema}
        author={martinLang}
        publishedTime="2025-01-06T09:00:00+01:00"
        modifiedTime="2026-07-01T09:00:00+02:00"
      />

      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "Microsoft Copilot Lizenzen", href: "/wissen/microsoft-copilot-lizenzen" }
        ]}
        title="Microsoft Copilot Lizenzen: Preisvergleich 2026"
        description="Welche Copilot-Lizenz lohnt sich? M365 Copilot, GitHub Copilot und Copilot Studio im direkten Vergleich – mit allen Infos für Ihre Entscheidung."
        lastUpdated="1. Juli 2026"
        authorName="Martin Lang"
        tableOfContents={tableOfContents}
        relatedContent={["wissen:microsoft-365-e7-frontier-suite", "wissen:claude-in-microsoft-copilot", "wissen:copilot-roi-berechnen", "wissen:copilot-studio", "wissen:github-copilot"]}
      >
        {/* Stand Juni 2026 Sticker */}
        <div className="flex justify-end mb-2">
          <span className="inline-flex items-center gap-1.5 bg-orange-500 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-md">
            ✓ Stand Juli 2026
          </span>
        </div>

        {/* Quick Answer Section für AIO-Optimierung */}
        <section id="quick-answer" className="mb-6">
          <Card className="border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-amber-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Zap className="w-6 h-6 text-orange-500" />
                Schnellantwort: Welche Microsoft Copilot Lizenz brauche ich?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-base leading-relaxed">
                <strong>Microsoft bietet drei Hauptlizenzmodelle:</strong> Microsoft 365 Copilot (ab 15,60 €/Monat zzgl. MwSt. für Office-Produktivität),
                GitHub Copilot (kostenlos bis 19 USD/Monat für Entwickler-Teams) und Copilot Studio (173,30 €/Monat für 25.000 Copilot Credits für eigene KI-Agenten).
                Die richtige Wahl hängt von Ihrem Anwendungsfall ab: Business User benötigen Microsoft 365 Copilot,
                Entwicklerteams GitHub Copilot Business, und für Custom AI-Lösungen ist Copilot Studio die beste Option.
                Alle Lizenzen sind DSGVO-konform und nutzen Unternehmensdaten nicht für öffentliches KI-Training.
              </p>
              <div className="grid md:grid-cols-4 gap-3 mt-4">
                <div className="p-3 bg-white dark:bg-gray-900 rounded-lg border">
                  <div className="font-bold text-primary mb-1">M365 Copilot Business</div>
                  <div className="text-sm text-muted-foreground">Bis 300 Nutzer (SMB)</div>
                  <div className="text-lg font-semibold mt-2">15,60 €/Monat</div>
                  <div className="text-xs text-muted-foreground">zzgl. MwSt. (Aktionspreis)</div>
                </div>
                <div className="p-3 bg-white dark:bg-gray-900 rounded-lg border">
                  <div className="font-bold text-primary mb-1">M365 Copilot</div>
                  <div className="text-sm text-muted-foreground">Enterprise</div>
                  <div className="text-lg font-semibold mt-2">26 €/Monat</div>
                  <div className="text-xs text-muted-foreground">zzgl. MwSt.</div>
                </div>
                <div className="p-3 bg-white dark:bg-gray-900 rounded-lg border">
                  <div className="font-bold text-primary mb-1">GitHub Copilot</div>
                  <div className="text-sm text-muted-foreground">Code-Entwicklung</div>
                  <div className="text-lg font-semibold mt-2">kostenlos – 19 USD/Monat</div>
                </div>
                <div className="p-3 bg-white dark:bg-gray-900 rounded-lg border">
                  <div className="font-bold text-primary mb-1">Copilot Studio</div>
                  <div className="text-sm text-muted-foreground">Custom AI-Agents</div>
                  <div className="text-lg font-semibold mt-2">173,30 €/Monat</div>
                  <div className="text-xs text-muted-foreground">25.000 Copilot Credits, zzgl. MwSt.</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Kontextueller Hinweis: Trainings */}
        <div className="mb-6 p-4 bg-muted/40 border rounded-lg text-sm">
          <p className="text-muted-foreground">
            <strong className="text-foreground">Lizenzen gekauft, aber nur 20 % nutzen Copilot aktiv?</strong>{" "}
            Der ROI entsteht erst durch Befähigung: praxisnahe{" "}
            <Link to="/trainings" className="text-primary hover:underline font-medium">Microsoft Copilot Trainings für Unternehmen</Link>{" "}
            machen aus Lizenzkosten produktive Teams.
          </p>
        </div>

        <section id="overview">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Überblick Microsoft Copilot Lizenzen</h2>
          <p>
            Microsoft bietet verschiedene Copilot-Lizenzen für unterschiedliche Anwendungsfälle an.
            Dieser Leitfaden hilft Ihnen zu verstehen, welche Lizenz Sie für Ihre spezifischen Anforderungen benötigen.
            Mit unserem <Link to="/wissen/copilot-roi-berechnen" className="text-primary hover:underline">ROI-Rechner</Link> können Sie konkrete Einsparungen berechnen.
          </p>
          <p>
            Die drei Hauptprodukte sind:
          </p>
          <ul>
            <li><strong>Microsoft 365 Copilot</strong> – KI-Assistent für Word, Excel, PowerPoint, Outlook, Teams (zwei Varianten: Business für KMU, Enterprise für Großunternehmen)</li>
            <li><strong>GitHub Copilot</strong> – KI-Coding-Assistent für Softwareentwickler (ab sofort auch kostenlos verfügbar)</li>
            <li><strong><Link to="/wissen/copilot-studio" className="text-primary hover:underline">Microsoft Copilot Studio</Link></strong> – Plattform zur Entwicklung eigener <Link to="/wissen/ki-agenten" className="text-primary hover:underline">KI-Agenten</Link></li>
          </ul>

          <div className="mt-6 bg-amber-50 dark:bg-amber-950 border-l-4 border-amber-500 rounded-r-lg p-4">
            <p className="font-bold text-amber-900 dark:text-amber-100 mb-2">Aktuelle Änderung: Copilot Chat verliert Office-Integration (Mai 2026)</p>
            <p className="text-sm text-amber-800 dark:text-amber-200">
              Ab 16. Mai 2026 ist Copilot in Word, Excel, PowerPoint und OneNote ausschließlich für bezahlte Microsoft 365 Copilot-Lizenzinhaber verfügbar. Der kostenlose <strong>Microsoft 365 Copilot Chat</strong> bleibt als webbasierter KI-Chat erhalten, verliert aber die tief integrierte Dokumentenbearbeitung in den Office-Apps. Für Unternehmen mit mehr als 2.000 Nutzern erfolgt die Abschaltung vollständig; bei kleineren Organisationen gelten zunächst Nutzungseinschränkungen. Dies ist ein wichtiger Grund, jetzt den ROI einer bezahlten Copilot-Lizenz zu bewerten.
            </p>
          </div>
        </section>

        <section id="microsoft-365-copilot" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Microsoft 365 Copilot</h2>
          <p className="mb-4">
            Seit Ende 2025 unterscheidet Microsoft zwischen zwei Varianten: <strong>Microsoft 365 Copilot Business</strong> für kleine und mittlere Unternehmen (bis 300 Nutzer) und <strong>Microsoft 365 Copilot</strong> für Enterprise-Kunden. Die Features sind weitgehend identisch – der Unterschied liegt vor allem in der Preisgestaltung und der Nutzergrenze.
          </p>
          <p className="mb-6">
            Zusätzlich steht allen Nutzern mit einem berechtigenden Microsoft 365-Abonnement kostenlos <strong>Microsoft 365 Copilot Chat</strong> zur Verfügung – ein sicherer, unternehmenstauglicher KI-Chat. Wichtig: Copilot in Word, Excel, PowerPoint und OneNote ist seit April/Mai 2026 ausschließlich bezahlten Copilot-Lizenznehmern vorbehalten.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-6">
            {/* Business-Tier */}
            <Card className="border-2 border-primary/20 hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
                <CardTitle className="flex items-center gap-2 text-lg">
                  Microsoft 365 Copilot Business
                  <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full font-normal ml-auto">Aktionspreis</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <div>
                  <p className="text-3xl font-bold text-primary">15,60 €</p>
                  <p className="text-sm text-muted-foreground">pro Nutzer / Monat (jährlich, zzgl. MwSt.)</p>
                  <p className="text-xs text-muted-foreground mt-1">Regulärpreis: 18,20 €/Nutzer/Monat · Rabattangebot gilt im 1. Jahr (Jahresabo), vom 1. Juli 2026 bis 30. September 2026</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Für wen geeignet:</p>
                  <p className="text-sm text-muted-foreground">KMU bis zu 300 Nutzer · erfordert Microsoft 365 Business Standard oder Business Premium</p>
                </div>
                <div className="space-y-2">
                  {[
                    "Copilot in Word, Excel, PowerPoint, OneNote",
                    "Copilot in Outlook und Teams",
                    "Microsoft 365 Copilot Chat",
                    "Copilot Studio für interne Agenten",
                    "Work IQ – kontextbewusstes KI-Grounding"
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Enterprise-Tier */}
            <Card className="border-2 border-primary/20 hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
                <CardTitle className="flex items-center gap-2 text-lg">
                  Microsoft 365 Copilot
                  <span className="text-xs bg-gray-500 text-white px-2 py-0.5 rounded-full font-normal ml-auto">Enterprise</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <div>
                  <p className="text-3xl font-bold text-primary">26,00 €</p>
                  <p className="text-sm text-muted-foreground">pro Nutzer / Monat (jährlich, zzgl. MwSt.)</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Für wen geeignet:</p>
                  <p className="text-sm text-muted-foreground">Großunternehmen · erfordert Microsoft 365 E3, E5 oder F3</p>
                </div>
                <div className="space-y-2">
                  {[
                    "Copilot in Word, Excel, PowerPoint, OneNote",
                    "Copilot in Outlook und Teams",
                    "Microsoft 365 Copilot Chat",
                    "Copilot Studio für interne Agenten",
                    "Work IQ – kontextbewusstes KI-Grounding",
                    "Enterprise-Compliance und erweiterte Analysefunktionen"
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex gap-3 mb-4">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">Preiserhöhung seit Juli 2026:</p>
              <p className="text-blue-800 dark:text-blue-200">
                Microsoft hat zum 1. Juli 2026 die Listenpreise aller kommerziellen Microsoft 365-Basispläne um ca. 8–17 % angehoben (z. B. Business Standard: 12,13 €, Business Premium: 19,06 €, M365 E3: 37,78 €). Copilot-Add-on-Preise sind davon nicht betroffen. Bestehende Jahresabonnements behalten ihre Konditionen bis zur nächsten Verlängerung.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">Wichtig:</p>
              <p className="text-blue-800 dark:text-blue-200">
                Microsoft 365 Copilot kann nur für Nutzer aktiviert werden, die bereits eine der erforderlichen
                Grundlizenzen besitzen. Die Mindestabnahme beträgt 1 Lizenz – eine unternehmensweite Lizenzierung ist nicht erforderlich.
              </p>
            </div>
          </div>
        </section>

        <section id="github-copilot" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">GitHub Copilot</h2>
          <p className="mb-3">
            GitHub Copilot ist 2026 in mehreren Editionen verfügbar – vom kostenlosen Einstiegs-Tier bis Enterprise. Für Unternehmen sind weiterhin die Pläne Business und Enterprise relevant. Seit dem 1. Juni 2026 ist die Umstellung von festen „Premium-Requests" auf ein monatliches Budget aus GitHub AI Credits aktiv; die unten genannten Request-Kontingente entsprechen dem bisherigen Modell und werden schrittweise in Credit-Budgets überführt. Neu ist zudem der Plan Copilot Max (nur als Upgrade für bestehende Abos) – Neuanmeldungen für Pro, Pro+ und Max sind seit dem 20. April 2026 vorübergehend pausiert.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-6">
            {/* Individual-Pläne */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Für Einzelentwickler</h3>
              {[
                {
                  name: "Free",
                  price: "Kostenlos",
                  period: "",
                  badge: "Neu",
                  badgeColor: "bg-green-500",
                  description: "Einstieg ohne Kosten",
                  features: [
                    "2.000 Code-Completions / Monat",
                    "Eingeschränkte KI-Credits für Chat & Agenten",
                    "GitHub Copilot CLI",
                    "Keine zentrale Verwaltung"
                  ]
                },
                {
                  name: "Pro",
                  price: "10 USD",
                  period: "pro Monat",
                  badge: "",
                  badgeColor: "",
                  description: "Für aktive Einzelentwickler",
                  features: [
                    "15 USD GitHub KI-Credits / Monat",
                    "Unbegrenzte Code-Completions",
                    "Cloud-Agenten & Code Review",
                    "CLI-Integration & Drittanbieter-Agenten"
                  ]
                },
                {
                  name: "Pro+",
                  price: "39 USD",
                  period: "pro Monat",
                  badge: "Neu",
                  badgeColor: "bg-purple-500",
                  description: "Für Power-User und Vielnutzer",
                  features: [
                    "70 USD GitHub KI-Credits / Monat",
                    "Zugang zu Premium-Modellen inkl. Opus",
                    "Alle Pro-Features enthalten",
                    "4× mehr Funktionen als Pro"
                  ]
                },
                {
                  name: "Max",
                  price: "100 USD",
                  period: "pro Monat",
                  badge: "Neu",
                  badgeColor: "bg-red-600",
                  description: "Für hochvolumige Agentenworkflows",
                  features: [
                    "200 USD GitHub KI-Credits / Monat",
                    "Vorrangiger Zugang zu neuen Modellen",
                    "2,9× mehr Funktionen als Pro+",
                    "Alle Pro+-Features enthalten"
                  ]
                }
              ].map((plan, idx) => (
                <Card key={idx} className="border border-border hover:shadow-md transition-shadow">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="font-bold">GitHub Copilot {plan.name}</span>
                        {plan.badge && (
                          <span className={`ml-2 text-xs ${plan.badgeColor} text-white px-1.5 py-0.5 rounded-full`}>{plan.badge}</span>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">{plan.price}</div>
                        {plan.period && <div className="text-xs text-muted-foreground">{plan.period}</div>}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{plan.description}</p>
                    <div className="space-y-1">
                      {plan.features.map((f, fidx) => (
                        <div key={fidx} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-xs">{f}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Team/Enterprise-Pläne */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Für Teams und Unternehmen</h3>
              {[
                {
                  name: "Business",
                  price: "19 USD",
                  period: "pro Nutzer / Monat",
                  description: "Für Entwickler-Teams",
                  features: [
                    "Unbegrenzte Code-Completions",
                    "Cloud-Agenten & Code Review",
                    "Zugriffskontrolle & Budgetkontrolle",
                    "Zentrale Lizenz-Verwaltung",
                    "IP-Indemnity (Haftungsschutz) & Audit Logs"
                  ],
                  notIncluded: []
                },
                {
                  name: "Enterprise",
                  price: "39 USD",
                  period: "pro Nutzer / Monat",
                  description: "Für große Unternehmen",
                  features: [
                    "Alle Business-Features",
                    "2× mehr GitHub KI-Credits als Business",
                    "Vorrangiger Zugang zu neuen Modellen",
                    "SAML SSO & Compliance-Tools",
                    "Priority Support"
                  ],
                  notIncluded: []
                }
              ].map((plan, idx) => (
                <Card key={idx} className="hover:shadow-xl transition-all duration-300 border-2 border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">GitHub Copilot {plan.name}</CardTitle>
                    <div className="mt-2">
                      <div className="text-2xl font-bold text-primary">{plan.price}</div>
                      <div className="text-sm text-muted-foreground">{plan.period}</div>
                      <p className="text-sm mt-1">{plan.description}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2 space-y-1">
                    {plan.features.map((feature, fidx) => (
                      <div key={fidx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                    {plan.notIncluded.map((feature, fidx) => (
                      <div key={fidx} className="flex items-start gap-2 opacity-50">
                        <X className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}

              <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                <p className="text-xs font-medium text-amber-900 dark:text-amber-100 mb-1">Hinweis: GitHub AI Credits (seit Juni 2026)</p>
                <p className="text-xs text-amber-800 dark:text-amber-200">
                  Seit dem 1. Juni 2026 rechnet GitHub nutzungsbasiert über GitHub KI-Credits ab. Business-Kunden erhalten gemeinsam genutzte Org-Credits, Enterprise-Kunden das Doppelte davon. Die Übergangsphase (Juni–August 2026) läuft noch mit erhöhten Kontingenten.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="copilot-studio" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Microsoft Copilot Studio</h2>
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
                  <h3 className="font-bold text-lg mb-2">In M365 Copilot enthalten</h3>
                  <p className="text-2xl font-bold text-primary mb-2">Enthalten</p>
                  <p className="text-sm text-muted-foreground mb-3">
                    Begrenzt auf 25 Agent-Nachrichten pro Nutzer und Monat
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Eigene Copilot-Agents im Low-Code-Editor erstellen</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Agents in Teams, SharePoint & M365 Chat veröffentlichen</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Interne Workflows ohne Nutzungslimits</span>
                    </div>
                    <div className="flex items-start gap-2 opacity-50">
                      <X className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Keine eigenen Websites oder externe Kanäle</span>
                    </div>
                    <div className="flex items-start gap-2 opacity-50">
                      <X className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Für externe Kanäle: eigenständige Copilot Studio Lizenz erforderlich</span>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4 bg-primary/5">
                  <h3 className="font-bold text-lg mb-2">Standalone Copilot Studio Lizenz</h3>
                  <p className="text-2xl font-bold text-primary mb-1">ab 173,30 €</p>
                  <p className="text-sm text-muted-foreground mb-1">
                    für 25.000 Copilot Credits / Monat (zzgl. MwSt.)
                  </p>
                  <p className="text-xs text-muted-foreground mb-3">
                    verbrauchsbasiert: Pay-as-you-go oder Vorabkauf (bis zu 20 % Rabatt) – kein fester Pro-Nutzer-Preis
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Höheres Message-Kontingent (über 25/Monat)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Agents auf eigenen Websites und externen Kanälen</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Custom AI Models & eigene Knowledge-Quellen</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Auch ohne Microsoft 365 Copilot nutzbar</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                <h4 className="font-bold mb-2 text-purple-900 dark:text-purple-100">Copilot Credits (früher: Message Credits)</h4>
                <p className="text-sm text-purple-800 dark:text-purple-200 mb-3">
                  Seit September 2025 heißt die Verbrauchseinheit in Copilot Studio <strong>Copilot Credits</strong> (vorher: Message Credits). Preislich hat sich nichts geändert:
                </p>
                <ul className="text-sm space-y-1 text-purple-800 dark:text-purple-200">
                  <li>• Verbrauch variiert je nach Agentenaktion und Komplexität</li>
                  <li>• Generative AI-Antworten verbrauchen mehr Credits als einfache Flows</li>
                  <li>• Kapazitätspaket: 25.000 Copilot Credits für 173,30 €/Monat (zzgl. MwSt.)</li>
                  <li>• Nutzungsbasierte Zahlung: Pay-as-you-go ohne Vorabbindung</li>
                  <li>• Vorabkaufplan (Pre-Purchase): bis zu 20 % Rabatt bei jährlicher Vorauszahlung</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="kosten-unternehmen" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Microsoft Copilot Kosten für Unternehmen: Was zahlt man wirklich?</h2>
          <p className="mb-4">
            Die Lizenzgebühr ist nur ein Teil der Microsoft Copilot Kosten für Unternehmen. Wer ein Budget seriös plant, rechnet pro Mitarbeiter mit drei Bausteinen: der <strong>Microsoft 365-Grundlizenz</strong>, dem <strong>Copilot-Add-on</strong> und den laufenden <strong>Einführungskosten</strong> für Schulung und Governance. Die folgende Übersicht zeigt, welche Gesamtkosten pro Nutzer und Monat tatsächlich anfallen – Stand Juli 2026, alle Preise zzgl. MwSt.
          </p>

          <div className="overflow-x-auto my-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="border p-3 text-left font-bold">Szenario</th>
                  <th className="border p-3 text-center font-bold">M365-Grundlizenz (ca.)</th>
                  <th className="border p-3 text-center font-bold">Copilot-Add-on</th>
                  <th className="border p-3 text-center font-bold">Gesamt / Nutzer / Monat</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-3 font-medium">KMU-Einstieg (bis 300 Nutzer)</td>
                  <td className="border p-3 text-center">Business Standard 12,13 €</td>
                  <td className="border p-3 text-center">Copilot Business 15,60 €*</td>
                  <td className="border p-3 text-center font-semibold">ca. 27,73 €*</td>
                </tr>
                <tr className="bg-muted/30">
                  <td className="border p-3 font-medium">KMU mit erhöhter Sicherheit</td>
                  <td className="border p-3 text-center">Business Premium 19,06 €</td>
                  <td className="border p-3 text-center">Copilot Business 15,60 €*</td>
                  <td className="border p-3 text-center font-semibold">ca. 34,66 €*</td>
                </tr>
                <tr>
                  <td className="border p-3 font-medium">Großunternehmen (Enterprise)</td>
                  <td className="border p-3 text-center">Microsoft 365 E3 37,78 €</td>
                  <td className="border p-3 text-center">Copilot 26,00 €</td>
                  <td className="border p-3 text-center font-semibold">ca. 63,78 €</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            * Aktionspreis für Microsoft 365 Copilot Business (regulär 18,20 €), gültig vom 1. Juli bis 30. September 2026. Die Microsoft 365-Grundpreise wurden zum 1. Juli 2026 um ca. 8–17 % angehoben; die obigen Werte entsprechen dem aktuellen Stand. Bestehende Jahresabonnements behalten ihre Konditionen bis zur nächsten Verlängerung.
          </p>

          <h3 className="font-bold text-lg mb-2 mt-6">Versteckte Kosten: Schulung und Governance einplanen</h3>
          <p className="mb-4">
            Die reinen Lizenzkosten sind oft der kleinere Posten. Erfahrungsgemäß entfällt bis zur Hälfte der Gesamtinvestition (Total Cost of Ownership) auf Change Management, Berechtigungs- und Daten-Governance sowie die Schulung der Mitarbeiter. Ohne gezieltes Training bleibt das Produktivitätspotenzial ungenutzt – die Lizenz liegt dann als teurer Knopf neben Word und Excel. Genau hier entscheidet sich, ob sich die Microsoft Copilot Kosten für Ihr Unternehmen rechnen.
          </p>
          <p className="mb-4">
            Eine konservative Rechnung: Spart ein Mitarbeiter nur 15 Minuten pro Tag, entspricht das bei einem internen Stundensatz von 50 € rund 250 € Wertschöpfung pro Monat – ein Vielfaches der Lizenzkosten. Wie hoch Ihr konkreter Effekt ausfällt, ermitteln Sie mit unserem <Link to="/wissen/copilot-roi-berechnen" className="text-primary hover:underline">ROI-Rechner</Link>. Die Copilotenschule unterstützt Sie mit praxisnahen Trainings dabei, aus den Lizenzkosten messbaren Mehrwert zu machen.
          </p>

          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex gap-3 mb-4">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">Kein Mindestabnahme-Zwang:</p>
              <p className="text-blue-800 dark:text-blue-200">
                Unternehmen müssen Copilot nicht für die gesamte Belegschaft lizenzieren. Schon eine einzelne Lizenz ist möglich. So lassen sich die Kosten zunächst auf eine Pilotgruppe mit hohem Routineaufgaben-Anteil begrenzen und der ROI messen, bevor breiter ausgerollt wird.
              </p>
            </div>
          </div>
        </section>

        <section id="comparison" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Lizenzvergleich im Überblick</h2>
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
                  <td className="border p-3 text-center">15,60 €* (Business, SMB) / 26 € (Enterprise) zzgl. MwSt.</td>
                  <td className="border p-3 text-center">kostenlos – 19 USD (Teams)</td>
                  <td className="border p-3 text-center">173,30 €/25.000 Credits zzgl. MwSt.</td>
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
                  <td className="border p-3 text-center">M365 E3/E5/Business Standard oder Premium</td>
                  <td className="border p-3 text-center">GitHub Account (Free: kostenlos)</td>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Welche Lizenz brauche ich?</h2>

          <div className="space-y-6 my-6">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="text-lg">Sie möchten Produktivität in Word, Excel, PowerPoint steigern?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-3">
                  <strong>Passende Lizenz: Microsoft 365 Copilot Business oder Microsoft 365 Copilot</strong>
                </p>
                <p className="text-sm text-muted-foreground">
                  Für KMU bis 300 Nutzer empfiehlt sich Microsoft 365 Copilot Business (ab 15,60 €/Nutzer/Monat Aktionspreis bis September 2026, regulär 18,20 €). Größere Unternehmen lizenzieren über Microsoft 365 Copilot (26 €/Nutzer/Monat). Beides erfordert eine bestehende Microsoft 365-Grundlizenz (Business Standard, Business Premium, E3 oder E5).
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="text-lg">Sie entwickeln Software und möchten schneller coden?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-3">
                  <strong>Passende Lizenz: GitHub Copilot Business oder Enterprise</strong>
                </p>
                <p className="text-sm text-muted-foreground">
                  GitHub Copilot Business (19 USD/Nutzer/Monat) bietet zentrale Verwaltung und IP-Indemnity für Teams.
                  Große Unternehmen mit hohen Compliance-Anforderungen nutzen Enterprise (39 USD/Nutzer/Monat). Einzelentwickler können mit dem kostenlosen Free-Plan einsteigen oder auf Pro (10 USD/Monat) upgraden. Ab Juni 2026 gilt usage-basiertes Billing mit KI-Credits.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader>
                <CardTitle className="text-lg">Sie möchten eigene KI-Chatbots oder Agents entwickeln?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-3">
                  <strong>Passende Lizenz: Microsoft Copilot Studio</strong>
                </p>
                <p className="text-sm text-muted-foreground">
                  Wenn Sie bereits Microsoft 365 Copilot haben, ist Copilot Studio für interne Agenten ohne zusätzliche Kosten und ohne Nutzungslimit enthalten.
                  Für Agenten auf externen Kanälen (Websites, Apps) benötigen Sie ein eigenständiges Copilot Studio Kapazitätspaket: 173,30 €/Monat für 25.000 Copilot Credits (zzgl. MwSt.) oder nutzungsbasierte Abrechnung.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardHeader>
                <CardTitle className="text-lg">Sie möchten alle Copilot-Funktionen kombinieren?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-3">
                  <strong>Passende Kombination: Microsoft 365 Copilot + GitHub Copilot Business</strong>
                </p>
                <p className="text-sm text-muted-foreground">
                  Unternehmen, die sowohl Business-Produktivität als auch Softwareentwicklung abdecken möchten,
                  kombinieren häufig M365 Copilot für Business User mit GitHub Copilot für das Dev-Team.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="faq" className="mt-12 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Häufig gestellte Fragen (FAQ)</h2>

          <div className="space-y-4 my-6">
            {[
              {
                question: "Mit welchen Gesamtkosten muss ein Unternehmen bei Microsoft Copilot rechnen?",
                answer: "Neben dem Copilot-Add-on (15,60 € für Business im Aktionspreis bis 30. September 2026, 26,00 € für Enterprise) fällt die Microsoft 365-Grundlizenz an. In der Praxis liegen die Gesamtkosten pro Arbeitsplatz bei rund 28 € (KMU mit Business Standard) bis über 64 € (Enterprise mit E3) pro Nutzer und Monat – zzgl. MwSt. Der wichtigste Hebel für die Wirtschaftlichkeit ist aber nicht der Preis, sondern die Nutzung: Schulung und saubere Daten-Governance entscheiden über den ROI."
              },
              {
                question: "Kann ich Microsoft 365 Copilot testen, bevor ich kaufe?",
                answer: "Ja, Microsoft bietet Testversionen an. Wenden Sie sich an Ihren Microsoft-Partner oder kontaktieren Sie uns für eine individuelle Demo-Umgebung."
              },
              {
                question: "Muss ich für alle Mitarbeiter Microsoft 365 Copilot kaufen?",
                answer: "Nein, Sie können Copilot selektiv für einzelne Nutzer oder Teams lizenzieren. Es gibt keine Mindestabnahmemenge – schon eine einzelne Lizenz ist möglich. Ein schrittweiser Rollout, beginnend mit Pilot-Gruppen, ist der empfohlene Ansatz."
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
                question: "Welche Schulungen gibt es für Copilot?",
                answer: "Praxisorientierte Schulungen für Microsoft 365 Copilot (1-2 Tage) und GitHub Copilot (1 Tag) haben sich bewährt. Kontaktieren Sie uns für ein individuelles Trainingsangebot."
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
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Quellen und weiterführende Links</h2>
          <p className="text-muted-foreground mb-6">
            Offizielle Microsoft-Ressourcen zu Lizenzierung und Preisen.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="https://www.microsoft.com/de-de/microsoft-365-copilot/pricing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-colors group"
            >
              <ExternalLink className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold group-hover:text-primary transition-colors">Microsoft 365 Copilot Preisübersicht</div>
                <div className="text-sm text-muted-foreground">Offizielle Preise und Lizenzoptionen für Microsoft 365 Copilot (DE)</div>
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
              href="https://learn.microsoft.com/de-de/copilot/microsoft-365/microsoft-365-copilot-licensing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-colors group"
            >
              <ExternalLink className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold group-hover:text-primary transition-colors">Microsoft Learn: Copilot Licensing</div>
                <div className="text-sm text-muted-foreground">Detaillierte Dokumentation zu Lizenzanforderungen und Voraussetzungen (DE)</div>
              </div>
            </a>

            <a
              href="https://www.microsoft.com/de-de/microsoft-365-copilot/pricing/copilot-studio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-colors group"
            >
              <ExternalLink className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold group-hover:text-primary transition-colors">Copilot Studio Preise</div>
                <div className="text-sm text-muted-foreground">Lizenzkosten und Message Credits für Copilot Studio (DE)</div>
              </div>
            </a>
          </div>
        </section>

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
              <AuthorBio author={martinLang} />
      </ContentLayout>
    </>
  );
};

export default CopilotLicenses;

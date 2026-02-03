import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";
import {
  Zap, Quote, Building2, Factory, Truck, Package, Briefcase,
  TrendingUp, Clock, Users, ExternalLink, CheckCircle2,
  AlertTriangle, Linkedin, Twitter, Target, Lightbulb
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SLUG = "wissen/copilot-roi-erfolgsgeschichten";
const PAGE_TITLE = "Copilot ROI: Was CEOs und Vorstände aus dem DACH-Raum berichten";

const CopilotROIErfolgsgeschichten = () => {
  const author = getAuthor("martin-lang");

  const tableOfContents = [
    { id: "einleitung", title: "Die andere Seite der Debatte", level: 2 },
    { id: "bayer", title: "Bayer AG: 700+ Anwendungsfälle identifiziert", level: 2 },
    { id: "siemens", title: "Siemens: Industrial Copilot bei 100+ Kunden", level: 2 },
    { id: "swiss-post", title: "Schweizerische Post: 45.000 Mitarbeitende", level: 2 },
    { id: "weitere-stimmen", title: "Weitere Stimmen aus der DACH-Region", level: 2 },
    { id: "erfolgsfaktoren", title: "Was die erfolgreichen Unternehmen anders machen", level: 2 },
    { id: "kernaussagen", title: "Kernaussagen für Entscheider", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
    { id: "quellen", title: "Quellen", level: 2 }
  ];

  const ids = generateSchemaIds(SLUG, 'wissen');
  const pageUrl = `https://copilotenschule.de/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const faqs = [
    {
      name: "Wie messen die zitierten Unternehmen den ROI von Microsoft Copilot?",
      answer: "Die Unternehmen nutzen unterschiedliche Metriken: Bayer misst qualitative Produktivitätsverbesserungen und Zeitersparnis bei Dokumentenanalysen. Siemens fokussiert auf Prozessbeschleunigung (von Wochen auf Minuten). Die Schweizerische Post kombiniert Adoption-Raten mit konkreten Zeitersparnissen pro Mitarbeiter."
    },
    {
      name: "Sind diese Ergebnisse auf mittelständische Unternehmen übertragbar?",
      answer: "Die Grundprinzipien – Change Management, Führung von oben, klare Use Cases – gelten auch für den Mittelstand. Die Skalierung ist anders, aber die Erfolgsfaktoren bleiben gleich. Die Copilotenschule begleitet auch Mittelständler bei der Einführung mit angepassten Konzepten."
    },
    {
      name: "Warum berichten manche Unternehmen von Enttäuschungen, während andere Erfolge melden?",
      answer: "Der Unterschied liegt fast immer im Einführungsansatz: Erfolgreiche Unternehmen investieren in Change Management, schulen ihre Mitarbeitenden und definieren klare Anwendungsfälle. Enttäuschte Unternehmen rollen oft nur die Technik aus und erwarten, dass die Nutzung von selbst kommt."
    },
    {
      name: "Welche Branchen profitieren besonders von Microsoft Copilot?",
      answer: "Die Zitate zeigen Erfolge in Pharma/Life Sciences (Bayer), Industrie/Fertigung (Siemens, thyssenkrupp, Schaeffler), Logistik (Schweizerische Post) und Consumer Goods (Campari). Überall dort, wo Wissensarbeit, Dokumentation und Kommunikation eine große Rolle spielen, zeigt sich Potenzial."
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": ids.article,
        "headline": "Copilot ROI: Was CEOs und Vorstände aus dem DACH-Raum berichten",
        "description": "Wörtliche Zitate von Führungskräften bei Bayer, Siemens, Schaeffler, thyssenkrupp und der Schweizerischen Post über ihre Erfahrungen mit Microsoft Copilot und messbarem ROI.",
        "author": getAuthorSchemaMarkup(author),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization"
        },
        "datePublished": "2026-02-03",
        "dateModified": "2026-02-03",
        "keywords": ["Copilot ROI", "Microsoft Copilot Erfolgsgeschichten", "Copilot Deutschland", "Copilot DACH", "CEO Zitate Copilot", "Copilot Business Case"],
        "articleSection": "Success Stories",
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
        title="Copilot ROI: Was CEOs und Vorstände aus dem DACH-Raum berichten (2026)"
        description="Wörtliche Zitate von Führungskräften bei Bayer, Siemens, Schaeffler, thyssenkrupp und der Schweizerischen Post über ihre Erfahrungen mit Microsoft Copilot."
        keywords={["Copilot ROI", "Microsoft Copilot Erfolgsgeschichten", "Copilot Deutschland", "Copilot DACH", "CEO Zitate Copilot"]}
        canonicalUrl={pageUrl}
        author={author}
        publishedTime="2026-02-03"
        modifiedTime="2026-02-03T12:00:00+01:00"
        schema={schema}
      />
      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: PAGE_TITLE, href: `/${SLUG}` }
        ]}
        title="Copilot ROI: Was CEOs und Vorstände berichten"
        description="Wörtliche Zitate von Führungskräften aus Deutschland, Österreich und der Schweiz über ihre Erfahrungen mit Microsoft Copilot."
        lastUpdated="03. Februar 2026"
        readTime="12 Minuten"
        tableOfContents={tableOfContents}
      >
        {/* Schnellantwort */}
        <Card className="border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 to-green-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-emerald-600" />
              Schnellantwort
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base leading-relaxed">
              <strong>Ja, es gibt dokumentierte Erfolgsgeschichten aus dem DACH-Raum.</strong> Führungskräfte bei
              Bayer, Siemens, Schaeffler, thyssenkrupp und der Schweizerischen Post berichten von messbaren
              Produktivitätssteigerungen, Zeitersparnissen und strategischen Vorteilen durch Microsoft Copilot.
              Dieser Artikel sammelt ihre wörtlichen Aussagen – mit Quellenangaben und Links zu den Originalquellen.
            </p>
          </CardContent>
        </Card>

        {/* Einleitung */}
        <section id="einleitung" className="my-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-blue-500">
            Die andere Seite der Debatte
          </h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed mb-6">
              Es wird viel gejammert. Die Investitionen in KI-Tools wie Microsoft Copilot würden sich nicht lohnen.
              Der Nutzen sei nicht messbar. Die Mitarbeitenden würden es nicht nutzen. Der ROI sei eine Illusion.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              Diese Kritik hat ihre Berechtigung – für Unternehmen, die Copilot ohne Strategie, ohne Change Management
              und ohne klare Use Cases ausgerollt haben. Aber es gibt eine andere Seite dieser Geschichte.
            </p>

            <div className="bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 p-6 my-8 rounded-r-lg">
              <p className="text-base leading-relaxed m-0">
                <strong>Dieser Artikel sammelt wörtliche Zitate</strong> von CEOs, Vorständen und Führungskräften
                aus dem DACH-Raum, die von konkreten Erfolgen mit Microsoft Copilot berichten. Alle Zitate sind
                mit Quellenangaben versehen und können in den verlinkten Originalquellen nachgelesen werden.
              </p>
            </div>
          </div>
        </section>

        {/* Bayer AG */}
        <section id="bayer" className="my-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-green-500">
            <Building2 className="inline-block w-8 h-8 mr-2 text-green-600" />
            Bayer AG: 700+ Anwendungsfälle identifiziert
          </h2>

          <Card className="bg-gradient-to-br from-green-500/5 to-emerald-500/5 border-green-200 dark:border-green-800 mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Christoph Sieger</CardTitle>
              <p className="text-sm text-muted-foreground">Vice President & Head of Global Digital Workplace, Bayer AG</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <blockquote className="border-l-4 border-green-500 pl-4 italic text-base">
                <Quote className="w-5 h-5 text-green-500 mb-2" />
                "We are very open to trying new technologies, such as Microsoft Copilot, to stay at the forefront
                of innovation. Our employees have more power to support farmers, help cure diseases, and see
                consumers healthier."
              </blockquote>

              <blockquote className="border-l-4 border-green-500 pl-4 italic text-base">
                "We are seeing a lot of curiosity in our HR, R&D, IT, Procurement, and Marketing groups.
                Already, people are saying they are getting more productive every day."
              </blockquote>

              <blockquote className="border-l-4 border-green-500 pl-4 italic text-base">
                "Copilot gives our employees more power and more freedom to focus on our mission:
                'Health for all, hunger for none.'"
              </blockquote>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <Card className="text-center p-4">
              <div className="text-3xl font-bold text-green-600">700+</div>
              <div className="text-sm text-muted-foreground">Anwendungsfälle identifiziert</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-3xl font-bold text-green-600">45 Min.</div>
              <div className="text-sm text-muted-foreground">Zeitersparnis bei Dokumentenanalyse</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-3xl font-bold text-green-600">100.000+</div>
              <div className="text-sm text-muted-foreground">Mitarbeitende weltweit</div>
            </Card>
          </div>

          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            Quelle: <a href="https://www.microsoft.com/en/customers/story/1703594261178267318-bayer-microsoft-copilot-germany"
              target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
              Microsoft Customer Stories: Bayer
            </a> |
            <a href="https://www.cio.de/a/bayer-setzt-auf-microsoft-copilot,3728645"
              target="_blank" rel="noopener noreferrer" className="underline hover:text-primary ml-1">
              CIO.de: Bayer setzt auf Microsoft Copilot
            </a>
          </p>
        </section>

        {/* Siemens */}
        <section id="siemens" className="my-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-cyan-500">
            <Factory className="inline-block w-8 h-8 mr-2 text-cyan-600" />
            Siemens: Industrial Copilot bei 100+ Kunden
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card className="bg-gradient-to-br from-cyan-500/5 to-blue-500/5 border-cyan-200 dark:border-cyan-800">
              <CardHeader>
                <CardTitle className="text-lg">Roland Busch</CardTitle>
                <p className="text-sm text-muted-foreground">CEO, Siemens AG</p>
              </CardHeader>
              <CardContent>
                <blockquote className="border-l-4 border-cyan-500 pl-4 italic text-base">
                  <Quote className="w-5 h-5 text-cyan-500 mb-2" />
                  "Die gemeinsame Vision von Siemens und Microsoft ist es, Kunden die breite Nutzung von
                  generativer KI zu ermöglichen. Die Technologie hat das Potenzial zu revolutionieren, wie
                  Unternehmen designen, entwickeln, fertigen – letztlich den ganzen Betrieb."
                </blockquote>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-cyan-500/5 to-blue-500/5 border-cyan-200 dark:border-cyan-800">
              <CardHeader>
                <CardTitle className="text-lg">Cedrik Neike</CardTitle>
                <p className="text-sm text-muted-foreground">Vorstand & CEO Digital Industries, Siemens AG</p>
              </CardHeader>
              <CardContent>
                <blockquote className="border-l-4 border-cyan-500 pl-4 italic text-base">
                  <Quote className="w-5 h-5 text-cyan-500 mb-2" />
                  "Gemeinsam mit Microsoft skalieren wir industrielle KI und befähigen unsere Kunden in der
                  gesamten Industrie, widerstandsfähiger, wettbewerbsfähiger und nachhaltiger zu werden."
                </blockquote>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-orange-500/5 to-amber-500/5 border-orange-200 dark:border-orange-800 mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Klaus Rosenfeld</CardTitle>
              <p className="text-sm text-muted-foreground">CEO, Schaeffler Group (Siemens Industrial Copilot Kunde)</p>
            </CardHeader>
            <CardContent>
              <blockquote className="border-l-4 border-orange-500 pl-4 italic text-base">
                <Quote className="w-5 h-5 text-orange-500 mb-2" />
                "Mit diesem gemeinsamen Pilotprojekt treten wir in ein neues Zeitalter der Produktivität und
                Innovation ein. Siemens Industrial Copilot wird die Zahl der Routineaufgaben reduzieren und
                dazu beitragen, die Effizienz unseres Teams zu steigern und die Kreativität zu fördern."
              </blockquote>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/5 to-indigo-500/5 border-purple-200 dark:border-purple-800 mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Dr. Volkmar Dinstuhl</CardTitle>
              <p className="text-sm text-muted-foreground">Vorstand, thyssenkrupp AG</p>
            </CardHeader>
            <CardContent>
              <blockquote className="border-l-4 border-purple-500 pl-4 italic text-base">
                <Quote className="w-5 h-5 text-purple-500 mb-2" />
                "Der Siemens Industrial Copilot wird uns in Zukunft den Arbeitsalltag erheblich erleichtern
                und uns bei den drängenden Herausforderungen wie dem Fachkräftemangel und der zunehmenden
                Komplexität von Batterieprüfungen unterstützen. Die KI-gestützte Lösung wird unsere Branche
                revolutionieren."
              </blockquote>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <Card className="text-center p-4">
              <div className="text-3xl font-bold text-cyan-600">100+</div>
              <div className="text-sm text-muted-foreground">Unternehmen nutzen Industrial Copilot</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-3xl font-bold text-cyan-600">30 Sek.</div>
              <div className="text-sm text-muted-foreground">statt Wochen für Maschinenvisualisierung</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-3xl font-bold text-cyan-600">80%</div>
              <div className="text-sm text-muted-foreground">weniger Code-Anpassung nötig</div>
            </Card>
          </div>

          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            Quellen: <a href="https://news.microsoft.com/de-de/siemens-und-microsoft-setzen-auf-ki-skalierung/"
              target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
              Microsoft News Center DE
            </a> |
            <a href="https://www.handelsblatt.com/unternehmen/industrie/siemens-rollt-ki-copilot-in-der-industrie-breit-aus-microsoft-profitiert/100043461.html"
              target="_blank" rel="noopener noreferrer" className="underline hover:text-primary ml-1">
              Handelsblatt
            </a>
          </p>
        </section>

        {/* Schweizerische Post */}
        <section id="swiss-post" className="my-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-red-500">
            <Package className="inline-block w-8 h-8 mr-2 text-red-600" />
            Schweizerische Post: 45.000 Mitarbeitende
          </h2>

          <Card className="bg-gradient-to-br from-red-500/5 to-yellow-500/5 border-red-200 dark:border-red-800 mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Daniel Bammert Marty</CardTitle>
              <p className="text-sm text-muted-foreground">Product Manager Copilot, Schweizerische Post</p>
            </CardHeader>
            <CardContent>
              <blockquote className="border-l-4 border-red-500 pl-4 italic text-base">
                <Quote className="w-5 h-5 text-red-500 mb-2" />
                "Together with Campana & Schott, we introduced a wide range of adoption and enablement measures
                as well as technical envisioning to enable Microsoft 365 Copilot usage. The motivation and drive
                to deliver innovative solutions and prioritize user enablement at Swiss Post was outstanding and
                one of the key success factors."
              </blockquote>
            </CardContent>
          </Card>

          <div className="bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 p-6 my-6 rounded-r-lg">
            <h4 className="font-semibold mb-3">Was die Schweizerische Post auszeichnet:</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <span>Eine der ambitioniertesten KI-Adoptionen im öffentlichen Sektor</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <span>Copilot Chat für alle 45.000 Mitarbeitenden – inklusive Frontline-Worker</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <span>"Agent Factory" für beschleunigte Innovation aufgebaut</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <span>Fokus auf User Enablement als kritischer Erfolgsfaktor</span>
              </li>
            </ul>
          </div>

          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            Quelle: <a href="https://www.microsoft.com/en/customers/story/25880-swiss-post-microsoft-365-copilot"
              target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
              Microsoft Customer Stories: Swiss Post
            </a>
          </p>
        </section>

        {/* Weitere Stimmen */}
        <section id="weitere-stimmen" className="my-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-amber-500">
            <Users className="inline-block w-8 h-8 mr-2 text-amber-600" />
            Weitere Stimmen aus der DACH-Region
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-amber-500/5 to-yellow-500/5 border-amber-200 dark:border-amber-800">
              <CardHeader>
                <CardTitle className="text-lg">Carsten Schulz</CardTitle>
                <p className="text-sm text-muted-foreground">Bereichsleiter, novaCapta GmbH</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Gewinner Microsoft 2025 CSP Copilot Success Story Challenge (Projekt: HÜBNER Group)
                </p>
              </CardHeader>
              <CardContent>
                <blockquote className="border-l-4 border-amber-500 pl-4 italic text-base">
                  <Quote className="w-5 h-5 text-amber-500 mb-2" />
                  "Diese Anerkennung bestätigt unsere Überzeugung, dass Technologie erst dann zum Erfolgsfaktor
                  wird, wenn sie ganzheitlich gedacht und im Alltag der Menschen verankert ist."
                </blockquote>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-rose-500/5 to-pink-500/5 border-rose-200 dark:border-rose-800">
              <CardHeader>
                <CardTitle className="text-lg">Jeremie Moritz</CardTitle>
                <p className="text-sm text-muted-foreground">Global Consumer Engagement Senior Director, Campari Group</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Aktiv in DACH-Region mit Marken wie Aperol, Campari
                </p>
              </CardHeader>
              <CardContent>
                <blockquote className="border-l-4 border-rose-500 pl-4 italic text-base">
                  <Quote className="w-5 h-5 text-rose-500 mb-2" />
                  "Copilot is a game changer. It can multiply your strengths and give you that partner to push
                  ideas further and break out of your daily routine. We're focusing on what matters most —
                  creativity and decision-making rather than spending time on time-consuming tasks."
                </blockquote>
                <p className="text-sm text-muted-foreground mt-4">
                  <strong>Ergebnis:</strong> 18% Reduktion der Marketing-Content-Produktionskosten,
                  2 Stunden Zeitersparnis pro Woche für Early Adopters
                </p>
              </CardContent>
            </Card>
          </div>

          <p className="text-sm text-muted-foreground flex items-center gap-2 mt-6">
            <ExternalLink className="w-4 h-4" />
            Quellen:
            <a href="https://www.novacapta.de/unternehmen/news/novacapta-gewinnt-microsoft-2025-csp-copilot-success-story-challenge"
              target="_blank" rel="noopener noreferrer" className="underline hover:text-primary ml-1">
              novaCapta News
            </a> |
            <a href="https://www.microsoft.com/en/customers/story/19797-campari-microsoft-viva"
              target="_blank" rel="noopener noreferrer" className="underline hover:text-primary ml-1">
              Microsoft Customer Stories: Campari
            </a>
          </p>
        </section>

        {/* Erfolgsfaktoren */}
        <section id="erfolgsfaktoren" className="my-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-indigo-500">
            <Target className="inline-block w-8 h-8 mr-2 text-indigo-600" />
            Was die erfolgreichen Unternehmen anders machen
          </h2>

          <p className="text-lg leading-relaxed mb-6">
            Die Zitate zeigen ein klares Muster: Erfolgreiche Copilot-Einführungen sind keine IT-Projekte,
            sondern Transformationsprogramme. Hier die gemeinsamen Erfolgsfaktoren:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-l-4 border-l-indigo-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                  Führung von oben
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  CEOs wie Roland Busch (Siemens) und Klaus Rosenfeld (Schaeffler) kommunizieren
                  persönlich die strategische Bedeutung. Das ist kein Zufall – Adoption braucht Vorbilder.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-indigo-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                  Klare Use Cases
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Bayer hat 700+ Anwendungsfälle identifiziert, bevor sie breit ausgerollt haben.
                  Die Schweizerische Post fokussiert auf spezifische Enablement-Maßnahmen pro Zielgruppe.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-indigo-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                  User Enablement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Daniel Bammert Marty von Swiss Post nennt "User Enablement" explizit als
                  "key success factor". Technologie allein reicht nicht – Menschen müssen befähigt werden.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-indigo-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                  Strategische Einbettung
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Christoph Sieger (Bayer) verbindet Copilot direkt mit der Unternehmensmission.
                  Jeremie Moritz (Campari) fokussiert auf "creativity and decision-making" statt Zeitersparnis.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-6 my-8 rounded-r-lg">
            <p className="text-base leading-relaxed m-0 flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <span>
                <strong>Der Unterschied zu enttäuschten Unternehmen:</strong> Diese Firmen haben nicht einfach
                Lizenzen verteilt und gehofft. Sie haben Change Management betrieben, Use Cases definiert und
                ihre Führungskräfte als Vorbilder eingesetzt.
              </span>
            </p>
          </div>
        </section>

        {/* Kernaussagen für Entscheider */}
        <section id="kernaussagen" className="my-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-teal-500">
            <Lightbulb className="inline-block w-8 h-8 mr-2 text-teal-600" />
            Kernaussagen für Entscheider
          </h2>

          <div className="space-y-4">
            <Card className="border-l-4 border-l-teal-500">
              <CardContent className="pt-6">
                <p className="font-semibold mb-2">1. ROI ist messbar – wenn man die richtigen Metriken wählt</p>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Praktische Konsequenz:</strong> Definieren Sie vorab, was Erfolg bedeutet:
                  Zeitersparnis, Qualitätsverbesserung, Mitarbeiterzufriedenheit oder Prozessbeschleunigung.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Typischer Fehler:</strong> Nur auf Nutzungszahlen schauen statt auf Geschäftsergebnisse.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-teal-500">
              <CardContent className="pt-6">
                <p className="font-semibold mb-2">2. Erfolg braucht Führung und Change Management</p>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Praktische Konsequenz:</strong> CEOs und Vorstände müssen Copilot selbst nutzen
                  und kommunizieren. User Enablement ist kritischer Erfolgsfaktor.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Typischer Fehler:</strong> Copilot als IT-Projekt behandeln statt als Transformation.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-teal-500">
              <CardContent className="pt-6">
                <p className="font-semibold mb-2">3. Use Cases vor Rollout – nicht umgekehrt</p>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Praktische Konsequenz:</strong> Identifizieren Sie konkrete Anwendungsfälle pro
                  Abteilung, bevor Sie breit ausrollen. Bayer fand 700+, bevor sie skalierten.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Typischer Fehler:</strong> Lizenzen verteilen und auf organische Adoption hoffen.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="my-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-violet-500">
            Häufig gestellte Fragen
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-l-4 border-l-violet-500">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quellen */}
        <section id="quellen" className="my-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-slate-500">
            Quellen
          </h2>

          <p className="text-muted-foreground mb-6">
            Alle Zitate in diesem Artikel stammen aus öffentlich zugänglichen Quellen.
            Hier die vollständige Quellenübersicht:
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="https://www.microsoft.com/en/customers/story/1703594261178267318-bayer-microsoft-copilot-germany"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-colors group"
            >
              <ExternalLink className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold group-hover:text-primary transition-colors">Microsoft Customer Stories: Bayer</div>
                <div className="text-sm text-muted-foreground">Offizielle Case Study zu Bayer und Microsoft Copilot</div>
              </div>
            </a>

            <a
              href="https://www.cio.de/a/bayer-setzt-auf-microsoft-copilot,3728645"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-colors group"
            >
              <ExternalLink className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold group-hover:text-primary transition-colors">CIO.de: Bayer setzt auf Microsoft Copilot</div>
                <div className="text-sm text-muted-foreground">Deutschsprachiger Artikel mit Christoph Sieger Zitaten</div>
              </div>
            </a>

            <a
              href="https://news.microsoft.com/de-de/siemens-und-microsoft-setzen-auf-ki-skalierung/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-colors group"
            >
              <ExternalLink className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold group-hover:text-primary transition-colors">Microsoft News Center DE: Siemens</div>
                <div className="text-sm text-muted-foreground">Zitate von Roland Busch und Cedrik Neike</div>
              </div>
            </a>

            <a
              href="https://www.handelsblatt.com/unternehmen/industrie/siemens-rollt-ki-copilot-in-der-industrie-breit-aus-microsoft-profitiert/100043461.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-colors group"
            >
              <ExternalLink className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold group-hover:text-primary transition-colors">Handelsblatt: Siemens Industrial Copilot</div>
                <div className="text-sm text-muted-foreground">Wirtschaftspresse-Berichterstattung zum Industrial Copilot</div>
              </div>
            </a>

            <a
              href="https://www.microsoft.com/en/customers/story/25880-swiss-post-microsoft-365-copilot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-colors group"
            >
              <ExternalLink className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold group-hover:text-primary transition-colors">Microsoft Customer Stories: Swiss Post</div>
                <div className="text-sm text-muted-foreground">Case Study zur Schweizerischen Post</div>
              </div>
            </a>

            <a
              href="https://www.novacapta.de/unternehmen/news/novacapta-gewinnt-microsoft-2025-csp-copilot-success-story-challenge"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-colors group"
            >
              <ExternalLink className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold group-hover:text-primary transition-colors">novaCapta: Microsoft Success Story Challenge</div>
                <div className="text-sm text-muted-foreground">HÜBNER Group Projekt gewinnt Microsoft Award</div>
              </div>
            </a>

            <a
              href="https://www.microsoft.com/en/customers/story/19797-campari-microsoft-viva"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-colors group"
            >
              <ExternalLink className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold group-hover:text-primary transition-colors">Microsoft Customer Stories: Campari</div>
                <div className="text-sm text-muted-foreground">Case Study zu Campari Group und Microsoft Copilot</div>
              </div>
            </a>
          </div>
        </section>

        {/* Autor Bio */}
        <section className="my-12">
          <Card className="border-l-4 border-l-primary">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <img
                    src={author?.image}
                    alt={author?.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-primary/20"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Über den Autor</h3>
                  <div className="text-lg font-semibold text-primary mb-1">{author?.name}</div>
                  <div className="text-sm text-muted-foreground mb-3">{author?.role}</div>
                  <p className="text-sm leading-relaxed mb-4">{author?.bio}</p>
                  <div className="mb-3">
                    <div className="text-sm font-semibold mb-2">Expertise:</div>
                    <div className="flex flex-wrap gap-2">
                      {author?.expertise.map((exp, idx) => (
                        <span key={idx} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    {author?.linkedin && (
                      <a href={author.linkedin} target="_blank" rel="noopener noreferrer"
                         className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
                        <Linkedin className="w-4 h-4" /> LinkedIn
                      </a>
                    )}
                    {author?.twitter && (
                      <a href={`https://twitter.com/${author.twitter}`} target="_blank" rel="noopener noreferrer"
                         className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
                        <Twitter className="w-4 h-4" /> Twitter
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-xl p-8 text-center my-12 border-2 border-emerald-500/20">
          <h3 className="text-2xl font-bold mb-4">Copilot erfolgreich einführen – wie Bayer, Siemens & Co.</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Die Erfolgsgeschichten zeigen: Es kommt auf die richtige Einführungsstrategie an. Wir begleiten
            Unternehmen im DACH-Raum dabei, Microsoft Copilot mit Change Management, Use-Case-Definition
            und User Enablement erfolgreich auszurollen.
          </p>
          <a
            href="/unsere-angebote"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Unsere Copilot-Angebote
          </a>
        </div>
      </ContentLayout>
    </>
  );
};

export default CopilotROIErfolgsgeschichten;

import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, AlertTriangle, CheckCircle2, BarChart3, Quote, Target, Users, Clock, Lightbulb } from "lucide-react";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";

const SLUG = "copilot-adoption-2026-zahlen";
const PAGE_TITLE = "Copilot Adoption 2026: Was die Zahlen wirklich zeigen";

const CopilotAdoption2026 = () => {
  const author = getAuthor("martin-lang");

  const ids = generateSchemaIds(SLUG, 'wissen');
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const tableOfContents = [
    { id: "microsoft-kommunikation", title: "Ein Wort zur Microsoft-Kommunikation", level: 2 },
    { id: "zahlen-q2-2026", title: "Die Zahlen: Microsoft Q2 FY2026", level: 2 },
    { id: "nadella-zitate", title: "Was Satya Nadella sagt", level: 2 },
    { id: "roi-prognosen", title: "ROI-Prognosen: Was die Studien sagen", level: 2 },
    { id: "gartner-adoption", title: "Die Schattenseite: Gartner-Daten", level: 2 },
    { id: "strategie", title: "Was das für Ihre Copilot-Strategie bedeutet", level: 2 },
    { id: "checkliste", title: "Checkliste: Sind Sie bereit?", level: 2 },
    { id: "fazit", title: "Fazit", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
    { id: "quellen", title: "Quellen", level: 2 }
  ];

  const faqs = [
    {
      name: "Wie viele Unternehmen nutzen Microsoft Copilot Anfang 2026?",
      answer: "Stand Januar 2026 gibt es 15 Millionen bezahlte Microsoft 365 Copilot Seats weltweit. Das entspricht etwa 3,3% aller Microsoft 365 Commercial-Nutzer. GitHub Copilot hat zusätzlich 4,7 Millionen zahlende Abonnenten. Die Copilotenschule unterstützt Unternehmen dabei, von diesen Erfahrungen zu lernen und typische Einführungsfehler zu vermeiden."
    },
    {
      name: "Lohnt sich Microsoft Copilot finanziell für unser Unternehmen?",
      answer: "Die Forrester TEI-Studie von 2025 prognostiziert einen ROI zwischen 122% (konservativ) und 408% (High Impact) über drei Jahre. Selbst im konservativen Szenario ist der ROI positiv. Entscheidend ist jedoch die richtige Einführung: 72% der Nutzer kämpfen mit der Adoption. Die Copilotenschule bietet strukturierte Einführungsprogramme, die den ROI messbar steigern."
    },
    {
      name: "Warum scheitern viele Unternehmen bei der Copilot-Einführung?",
      answer: "Laut Gartner schaffen nur 6% der Unternehmen den Sprung vom Pilot zum unternehmensweiten Rollout. Hauptgründe: fehlende Schulung, keine klaren Use Cases, mangelnde Führungsunterstützung. Die Copilotenschule begleitet Sie durch alle Phasen – von der Pilotplanung bis zur Skalierung mit nachhaltigem Enablement."
    },
    {
      name: "Wie lange dauert es, bis sich Copilot amortisiert?",
      answer: "Bei durchschnittlich 14 Minuten Zeitersparnis pro Tag und Lizenzkosten von 30 EUR/Monat liegt der Break-even bei einem Stundensatz von ca. 45 EUR bereits im ersten Monat. Voraussetzung ist jedoch aktive Nutzung – und genau hier setzt das Training der Copilotenschule an."
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": ids.article,
        "headline": PAGE_TITLE,
        "description": "Aktuelle Zahlen Januar 2026: 15 Mio. Copilot-Seats, 160% Wachstum, bis zu 408% ROI. Eine nüchterne Einordnung jenseits des Microsoft-Marketings.",
        "author": getAuthorSchemaMarkup(author),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization"
        },
        "datePublished": "2026-02-03",
        "dateModified": "2026-02-03",
        "keywords": ["Microsoft Copilot 2026", "Copilot Adoption", "Satya Nadella Copilot", "Microsoft 365 Copilot ROI", "Copilot Statistiken", "Copilot Einführung", "Forrester Copilot Studie", "Gartner Copilot"],
        "articleSection": "Strategie",
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
        title={`${PAGE_TITLE} | Copilotenschule`}
        description="Aktuelle Zahlen Januar 2026: 15 Mio. Copilot-Seats, 160% Wachstum, bis zu 408% ROI. Eine nüchterne Einordnung jenseits des Microsoft-Marketings."
        keywords={["Microsoft Copilot 2026", "Copilot Adoption", "Satya Nadella Copilot", "Microsoft 365 Copilot ROI", "Copilot Statistiken"]}
        canonicalUrl={pageUrl}
        schema={schema}
      />

      <ContentLayout
        title={PAGE_TITLE}
        description="Aktuelle Zahlen Januar 2026: 15 Mio. Copilot-Seats, 160% Wachstum, bis zu 408% ROI. Eine nüchterne Einordnung jenseits des Microsoft-Marketings."
        keywords={["Microsoft Copilot 2026", "Copilot Adoption", "Satya Nadella Copilot", "Microsoft 365 Copilot ROI"]}
        datePublished="2026-02-03"
        dateModified="2026-02-03"
        author={author}
        tableOfContents={tableOfContents}
        breadcrumbItems={breadcrumbItems}
        faqs={faqs}
      >
        {/* Einleitung: Microsoft-Kommunikation */}
        <section id="microsoft-kommunikation" className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-amber-500" />
            Vorab: Ein Wort zur Microsoft-Kommunikation
          </h2>

          <Card className="bg-amber-50 border-amber-200 mb-6">
            <CardContent className="pt-6">
              <p className="text-amber-900 leading-relaxed">
                Wer Microsoft-Keynotes verfolgt, kennt das Muster: Satya Nadella verkündet mit leuchtenden Augen die nächste Revolution. Jedes Feature wird zum Game-Changer, jede Zahl zum Beweis des unaufhaltsamen Fortschritts. Das ist amerikanische Tech-Kommunikation – vollmundig, optimistisch, manchmal an der Grenze zur Übertreibung.
              </p>
            </CardContent>
          </Card>

          <p className="text-muted-foreground mb-4">
            Die Realität sieht oft anders aus: Angekündigte Features erscheinen Monate später als versprochen. "General Availability" bedeutet nicht selten "Beta mit anderem Namen". Und die beeindruckenden Zahlen aus Redmond? Sie erzählen immer nur einen Teil der Geschichte.
          </p>

          <p className="text-foreground font-medium">
            <strong>Trotzdem:</strong> Die nackten Zahlen vom Januar 2026 sind bemerkenswert – auch wenn man den Marketing-Glanz abzieht. 15 Millionen zahlende Copilot-Nutzer sind 15 Millionen zahlende Copilot-Nutzer, unabhängig davon, wie enthusiastisch sie präsentiert werden.
          </p>
        </section>

        {/* Die Zahlen */}
        <section id="zahlen-q2-2026" className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-primary" />
            Die Zahlen: Microsoft Q2 FY2026 (Januar 2026)
          </h2>

          <p className="text-muted-foreground mb-6">
            Am 28. Januar 2026 veröffentlichte Microsoft seine Quartalszahlen. Die Copilot-Metriken im Überblick:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Microsoft 365 Copilot
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-muted-foreground">Bezahlte Seats</span>
                  <span className="text-2xl font-bold text-primary">15 Mio.</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-muted-foreground">Wachstum YoY</span>
                  <span className="text-xl font-bold text-green-600">+160%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Anteil an M365 Commercial</span>
                  <span className="text-lg font-medium">3,3%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  GitHub Copilot
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-muted-foreground">Zahlende Abonnenten</span>
                  <span className="text-2xl font-bold text-primary">4,7 Mio.</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-muted-foreground">Wachstum YoY</span>
                  <span className="text-xl font-bold text-green-600">+75%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Tägliche Nutzer</span>
                  <span className="text-lg font-medium">10x YoY</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Nadella Zitate */}
        <section id="nadella-zitate" className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Quote className="w-6 h-6 text-primary" />
            Was Satya Nadella sagt – wörtlich zitiert
          </h2>

          <Card className="bg-slate-50 mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Q2 FY2026 Earnings Call (28. Januar 2026)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                "We are only at the beginning phases of AI diffusion and already Microsoft has built an AI business that is larger than some of our biggest franchises."
              </blockquote>
              <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                "These new agents systems, M365 Copilot, GitHub Copilot, Security Copilot, all coming together to compound the benefits of all the data and all the deployment, I think, is probably the most transformative effect right now."
              </blockquote>
            </CardContent>
          </Card>

          <Card className="bg-slate-50 mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Blog "Looking Ahead to 2026" (2. Januar 2026)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                "We have moved past the initial phase of discovery and are entering a phase of widespread diffusion."
              </blockquote>
              <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                "What matters is not the power of any given model, but how people choose to apply it to achieve their goals."
              </blockquote>
              <blockquote className="border-l-4 border-amber-500 pl-4 italic text-amber-800 bg-amber-50 p-3 rounded">
                "We are still in the opening miles of a marathon. Much remains unpredictable."
              </blockquote>
              <p className="text-sm text-muted-foreground">
                <strong>Einordnung:</strong> Die letzte Aussage ist erfrischend ehrlich – und sollte bei jeder Copilot-Entscheidung mitgedacht werden.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* ROI Prognosen */}
        <section id="roi-prognosen" className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-green-600" />
            ROI-Prognosen: Was die Studien sagen
          </h2>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Forrester TEI Study (Juli 2025)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Forrester projiziert für Microsoft 365 Copilot einen ROI über drei Jahre:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-4">Szenario</th>
                      <th className="text-right py-2 px-4">ROI</th>
                      <th className="text-right py-2 px-4">NPV</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b bg-green-50">
                      <td className="py-2 px-4 font-medium">High Impact</td>
                      <td className="text-right py-2 px-4 text-green-700 font-bold">408%</td>
                      <td className="text-right py-2 px-4">$98,7 Mio.</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4 font-medium">Medium Impact</td>
                      <td className="text-right py-2 px-4 font-bold">243%</td>
                      <td className="text-right py-2 px-4">$58,8 Mio.</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="py-2 px-4 font-medium">Low Impact</td>
                      <td className="text-right py-2 px-4 font-bold">122%</td>
                      <td className="text-right py-2 px-4">$29,4 Mio.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-amber-700 mt-4 bg-amber-50 p-3 rounded">
                <strong>Wichtig:</strong> Diese Zahlen stammen aus einer von Microsoft beauftragten Studie. Sie basieren auf Interviews und Umfragen, nicht auf gemessenen Daten. Trotzdem: Selbst das konservative Szenario zeigt positiven ROI.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Microsoft Work Trend Index</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-700">77%</div>
                  <div className="text-sm text-muted-foreground">höhere Produktivität</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-700">29%</div>
                  <div className="text-sm text-muted-foreground">schneller bei Tasks</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-700">4x</div>
                  <div className="text-sm text-muted-foreground">Meeting-Nachbereitung</div>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <div className="text-3xl font-bold text-amber-700">14 Min.</div>
                  <div className="text-sm text-muted-foreground">Ersparnis pro Tag</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Gartner Schattenseite */}
        <section id="gartner-adoption" className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-amber-500" />
            Die Schattenseite: Gartner-Daten zur Adoption
          </h2>

          <Card className="bg-red-50 border-red-200 mb-6">
            <CardHeader>
              <CardTitle className="text-red-800">Adoptionsprobleme</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                  <span className="text-2xl font-bold text-red-600">72%</span>
                  <span className="text-sm text-muted-foreground">kämpfen mit der Integration in den Alltag</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                  <span className="text-2xl font-bold text-red-600">57%</span>
                  <span className="text-sm text-muted-foreground">berichten sinkendes Engagement</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                  <span className="text-2xl font-bold text-red-600">60%</span>
                  <span className="text-sm text-muted-foreground">führen nur Piloten durch</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                  <span className="text-2xl font-bold text-red-600">Nur 6%</span>
                  <span className="text-sm text-muted-foreground">schaffen unternehmensweiten Rollout</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-amber-50 border-amber-200">
            <CardHeader>
              <CardTitle className="text-amber-800">Das Paradox</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-amber-900 mb-4">
                <strong>97%</strong> der Nutzer sparen Zeit (bis zu 14 Minuten pro Tag). <strong>Aber:</strong> Die meisten können diese Zeitersparnis nicht in messbaren Business-Wert übersetzen.
              </p>
              <p className="font-medium text-amber-900">
                Fazit: Die Technologie funktioniert. Das Problem liegt in der Einführung und Verankerung im Arbeitsalltag.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Strategie */}
        <section id="strategie" className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-primary" />
            Was das für Ihre Copilot-Strategie bedeutet
          </h2>

          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                  Die Diffusionsphase hat begonnen
                </h3>
                <p className="text-muted-foreground">
                  15 Millionen Seats sind keine Early-Adopter-Spielerei mehr. Wenn Ihre Wettbewerber Copilot nutzen und Sie nicht, entsteht ein Produktivitätsgap.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                  Training ist nicht optional
                </h3>
                <p className="text-muted-foreground">
                  72% Adoptionsprobleme bedeuten: Lizenz kaufen und hoffen reicht nicht. Ohne strukturiertes Enablement verbrennen Sie Geld.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
                  Piloten müssen skalieren
                </h3>
                <p className="text-muted-foreground">
                  Nur 6% schaffen den Rollout. Planen Sie von Anfang an, wie aus dem Pilot ein unternehmensweites Programm wird.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
                  Realistische Erwartungen setzen
                </h3>
                <p className="text-muted-foreground">
                  Copilot ist kein Wundermittel. 14 Minuten Zeitersparnis pro Tag sind gut – aber keine Revolution. Kalkulieren Sie konservativ.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Checkliste */}
        <section id="checkliste" className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            Checkliste: Sind Sie bereit für Copilot?
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">✅ Starten Sie, wenn:</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Sie bereits Microsoft 365 aktiv nutzen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Budget für Training (nicht nur Lizenzen) vorhanden ist</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Führungskräfte das Projekt sponsoren</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Sie bereit sind, 12+ Wochen in einen strukturierten Pilot zu investieren</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Klare Use Cases identifiziert sind</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-amber-50 border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-800">⚠️ Warten Sie noch, wenn:</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>Keine Ressourcen für begleitendes Training verfügbar sind</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>Datenschutz- und Compliance-Fragen ungeklärt sind</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>"Weil alle es machen" die einzige Begründung ist</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>Sie ROI in 3 Monaten erwarten</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Fazit */}
        <section id="fazit" className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-primary" />
            Fazit: Nüchtern betrachtet
          </h2>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-4">
                Ja, Microsoft übertreibt gerne. Ja, die Realität hinkt den Ankündigungen hinterher. Und ja, viele Unternehmen kämpfen mit der Adoption.
              </p>
              <p className="font-medium text-foreground mb-4">
                <strong>Aber:</strong> 160% Wachstum, 15 Millionen zahlende Nutzer und positive ROI-Prognosen (selbst im konservativen Szenario) sind Fakten. Die Frage ist nicht mehr, ob Copilot relevant wird – sondern wie schnell Sie die Lernkurve durchlaufen.
              </p>
              <p className="text-primary font-semibold">
                Die Unternehmen, die jetzt strukturiert starten, bauen einen Vorsprung auf. Die, die noch warten, werden später aufholen müssen.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Quellen */}
        <section id="quellen" className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Quellen</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Microsoft Q2 FY2026 Earnings Call, 28. Januar 2026</li>
            <li>• Satya Nadella Blog "Looking Ahead to 2026", 2. Januar 2026</li>
            <li>• Forrester TEI Study: Microsoft 365 Copilot, Juli 2025</li>
            <li>• Gartner: Copilot for Microsoft 365 Impact Assessment, 2024</li>
            <li>• Microsoft Work Trend Index, 2025</li>
          </ul>
        </section>
      </ContentLayout>
    </>
  );
};

export default CopilotAdoption2026;

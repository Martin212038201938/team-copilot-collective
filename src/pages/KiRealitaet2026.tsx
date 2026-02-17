import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Zap, AlertTriangle, TrendingUp, TrendingDown, Building2, Target,
  ExternalLink, Linkedin, Mail, CheckCircle2, XCircle, BarChart3,
  Users, Euro, Clock, Brain, LineChart, PieChart, Lightbulb, Scale
} from "lucide-react";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";
import { TrustBadge } from "@/components/TrustBadge";

const SLUG = "ki-realitaet-beratungsfirmen-2026";
const PAGE_TITLE = "KI in deutschen Unternehmen 2026: Was die großen Beratungsfirmen wirklich sehen";

const KiRealitaet2026 = () => {
  const martinLang = getAuthor('martin-lang')!;

  const ids = generateSchemaIds(SLUG, 'wissen');
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const tableOfContents = [
    { id: "definition", title: "Definition: Der Status Quo", level: 2 },
    { id: "investitionen", title: "Investitionen: Die harten Zahlen", level: 2 },
    { id: "roi-realitaet", title: "ROI-Realität: Erwartung vs. Wirklichkeit", level: 2 },
    { id: "praxis-szenarien", title: "Praxis-Szenarien aus deutschen Unternehmen", level: 2 },
    { id: "implementierung", title: "Implementierung: Was erfolgreiche Unternehmen anders machen", level: 2 },
    { id: "typische-fehler", title: "Typische Fehler bei KI-Investitionen", level: 2 },
    { id: "kernaussagen", title: "Kernaussagen für Entscheider", level: 2 },
    { id: "entscheidungshilfe", title: "Entscheidungshilfe: Wann lohnt sich KI-Investment?", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
    { id: "quellen", title: "Quellen und Studien", level: 2 }
  ];

  const faqs = [
    {
      name: "Wie viel investieren deutsche Unternehmen durchschnittlich in KI?",
      answer: "Laut BCG AI Radar 2026 planen Unternehmen weltweit, etwa 1,7% ihres Umsatzes in KI zu investieren – doppelt so viel wie 2025. Der deutsche Mittelstand liegt laut Horváth-Studie mit 0,35% des Umsatzes jedoch deutlich darunter. Große Konzerne investieren typischerweise mehr, während KMUs mit 100.000 bis 500.000 Euro für grundlegende KI-Infrastruktur rechnen sollten."
    },
    {
      name: "Wann amortisieren sich KI-Investitionen in der Regel?",
      answer: "Laut Deloitte-Studie erreichen die meisten Unternehmen einen zufriedenstellenden ROI innerhalb von 2-4 Jahren. Nur 6% berichten von einer Amortisation unter einem Jahr. 13% der deutschen Unternehmen erwarten ROI in weniger als 12 Monaten, etwa die Hälfte rechnet mit 1-2 Jahren. BCG-Daten zeigen, dass KI-Leader doppelt so hohe Umsatzsteigerungen erzielen wie Nachzügler."
    },
    {
      name: "Warum scheitern so viele KI-Projekte in Deutschland?",
      answer: "Die McKinsey-Studie zeigt: 80% der Unternehmen sehen noch keinen messbaren Effekt ihrer KI-Investitionen auf das Ergebnis. Hauptgründe sind laut IW Köln und KPMG: fehlende KI-Kompetenzen (79% der Unternehmen), unklare Use Cases, mangelnde Datenqualität und zu wenig Unterstützung durch Führungskräfte. Der Anteil abgebrochener KI-Projekte stieg 2024 von 17 auf 42 Prozent."
    },
    {
      name: "Welche Branchen profitieren am meisten von KI?",
      answer: "Laut BCG AI Radar 2026 führen Technologie (2,1% Umsatzanteil für KI), Finanzdienstleister (2,0%) und Versicherungen (1,9%) bei den KI-Investitionen. Die PwC-Studie zeigt: Branchen mit hoher KI-Integration verzeichnen dreimal höheres Umsatzwachstum pro Mitarbeiter. In der deutschen Industrie nutzen bereits 42% KI in der Produktion (Bitkom)."
    },
    {
      name: "Was unterscheidet KI-Leader von Nachzüglern?",
      answer: "Laut BCG qualifizieren sich nur 5% der Unternehmen als 'future-built' für KI. Diese investieren mehr als doppelt so viel wie Nachzügler und erzielen dafür doppelte Umsatzsteigerungen und 40% mehr Kosteneinsparungen. 94% der Unternehmen investieren weiter in KI, auch ohne sofortige Returns – die Frage ist nur, ob strategisch oder taktisch."
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": ids.article,
        "headline": PAGE_TITLE,
        "description": "Umfassende Analyse der KI-Realität in deutschen Unternehmen 2026: Was McKinsey, BCG, Deloitte, PwC, KPMG und andere Beratungshäuser wirklich sehen. Mit aktuellen Statistiken zu Investitionen, ROI und Implementierungserfolg.",
        "author": getAuthorSchemaMarkup(martinLang),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization"
        },
        "datePublished": "2026-02-02",
        "dateModified": "2026-02-02",
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
        title="KI in deutschen Unternehmen 2026: Was die großen Beratungsfirmen wirklich sehen | copilotenschule.de"
        description="Umfassende Analyse der KI-Realität: McKinsey, BCG, Deloitte, PwC, KPMG zeigen aktuelle Investitionen, ROI und Implementierungserfolg in deutschen Unternehmen 2026."
        keywords={[
          "KI Deutschland 2026",
          "künstliche Intelligenz Unternehmen",
          "KI Investitionen ROI",
          "McKinsey KI Studie",
          "BCG AI Radar",
          "Deloitte KI Deutschland",
          "KPMG generative KI",
          "PwC KI Barometer",
          "KI Implementierung",
          "AI ROI deutsche Unternehmen",
          "Beratungsfirmen KI Analyse",
          "KI Mittelstand Deutschland",
          "Capgemini AI Studie",
          "EY AI Barometer"
        ]}
        canonicalUrl={pageUrl}
        schema={schema}
        author={martinLang}
        publishedTime="2026-02-02T10:00:00+01:00"
        modifiedTime="2026-02-02T10:00:00+01:00"
      />

      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "KI-Realität 2026", href: `/wissen/${SLUG}` }
        ]}
        title={PAGE_TITLE}
        description="Eine datenbasierte Analyse der führenden Beratungshäuser: Wie steht es wirklich um KI-Investitionen und deren Return in deutschen Unternehmen?"
        lastUpdated="02. Februar 2026"
        authorName="Martin Lang"
        tableOfContents={tableOfContents}
      >
        {/* Schnellantwort-Card */}
        <Card className="mb-8 border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-amber-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-orange-600" />
              Schnellantwort
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base leading-relaxed">
              <strong>Die ernüchternde Realität:</strong> Während 92% der deutschen Führungskräfte ihre KI-Budgets 2026 erhöhen wollen (Deloitte), sehen laut McKinsey 80% noch keinen messbaren Effekt auf ihr Ergebnis. Der Anteil abgebrochener KI-Projekte stieg von 17% auf 42%. Gleichzeitig erzielen die 5% "KI-Leader" (BCG) doppelte Umsatzsteigerungen. Die Kluft zwischen Investition und Wertschöpfung wird 2026 zum strategischen Scheideweg.
            </p>
          </CardContent>
        </Card>

        {/* Sektion 1: Definition */}
        <section id="definition">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-blue-500 text-blue-700 dark:text-blue-400">
            Definition: Der Status Quo der KI in deutschen Unternehmen
          </h2>

          <p className="mb-6">
            Künstliche Intelligenz hat 2025/2026 den Sprung vom Hype-Thema zur strategischen Priorität geschafft – zumindest auf dem Papier. Was die großen Beratungshäuser in ihren aktuellen Studien zeigen, ist ein differenziertes Bild: Hohe Investitionsbereitschaft trifft auf ernüchternde Ergebnisse, und eine kleine Gruppe von Vorreitern zieht davon.
          </p>

          <blockquote className="my-6 border-l-4 border-primary bg-primary/5 p-6 rounded-r-lg italic text-lg">
            Laut KPMG sehen inzwischen 91 Prozent der deutschen Unternehmen generative KI als entscheidend für ihr Geschäftsmodell an – im Vorjahr waren es noch 55 Prozent. Dieser Sprung von 36 Prozentpunkten zeigt die Dramatik des Wandels.
          </blockquote>

          <Card className="my-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <PieChart className="w-5 h-5 text-blue-600" />
                KI-Nutzung in Deutschland: Aktuelle Zahlen (2025/2026)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  {
                    metric: "36%",
                    label: "nutzen bereits KI",
                    detail: "Fast verdoppelt vs. Vorjahr (20%)",
                    color: "green",
                    quelle: "Bitkom 2025"
                  },
                  {
                    metric: "81%",
                    label: "nutzen KI im Berufsalltag",
                    detail: "+14 Prozentpunkte vs. Vorjahr",
                    color: "blue",
                    quelle: "EY AI Barometer 2025"
                  },
                  {
                    metric: "91%",
                    label: "sehen KI als geschäftskritisch",
                    detail: "Sprung von 55% im Vorjahr",
                    color: "purple",
                    quelle: "KPMG 2025"
                  },
                  {
                    metric: "17%",
                    label: "KI ist kein Thema",
                    detail: "Gefallen von 41% im Vorjahr",
                    color: "amber",
                    quelle: "Bitkom 2025"
                  }
                ].map((stat, idx) => (
                  <div key={idx} className={`p-5 border-2 border-${stat.color}-500/30 rounded-xl text-center bg-gradient-to-br from-${stat.color}-500/5 to-${stat.color}-600/10`}>
                    <div className={`text-3xl font-bold text-${stat.color}-600 dark:text-${stat.color}-400`}>{stat.metric}</div>
                    <div className="font-semibold mt-2 text-sm">{stat.label}</div>
                    <div className="text-xs text-muted-foreground mt-1">{stat.detail}</div>
                    <div className="text-xs text-muted-foreground mt-2 italic">Quelle: {stat.quelle}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <p className="mb-6">
            Die Bitkom-Studie 2025 zeigt: KI ist in der Breite angekommen. Doch Nutzung bedeutet nicht automatisch Wertschöpfung. Die PwC-Studie zum "KI-Paradox" offenbart: Obwohl 49% der deutschen Beschäftigten neugierig auf KI blicken, setzen nur 9% generative KI täglich ein. Die Lücke zwischen Interesse und Implementation bleibt groß.
          </p>
        </section>

        {/* Sektion 2: Investitionen */}
        <section id="investitionen" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-emerald-500 text-emerald-700 dark:text-emerald-400">
            Investitionen: Die harten Zahlen der Beratungshäuser
          </h2>

          <p className="mb-6">
            Die Investitionsbereitschaft in KI erreicht 2026 neue Höchststände. Doch die Studien zeigen auch: Es gibt erhebliche Unterschiede zwischen Großunternehmen und Mittelstand, zwischen Vorreitern und Nachzüglern.
          </p>

          <Card className="my-6 border-2 border-emerald-500/20">
            <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-emerald-600/10">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Euro className="w-5 h-5 text-emerald-600" />
                Investitionspläne 2026: Studienvergleich
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {[
                  {
                    firma: "Deloitte",
                    studie: "Finance Trends 2026",
                    ergebnis: "92% wollen KI-Budgets erhöhen, 51% um mehr als 25%",
                    highlight: "92%"
                  },
                  {
                    firma: "BCG",
                    studie: "AI Radar 2026",
                    ergebnis: "Unternehmen verdoppeln KI-Ausgaben auf 1,7% des Umsatzes",
                    highlight: "2x"
                  },
                  {
                    firma: "KPMG",
                    studie: "GenKI Deutschland 2025",
                    ergebnis: "82% erhöhen Budgets, 51% um mindestens 40%",
                    highlight: "82%"
                  },
                  {
                    firma: "Accenture",
                    studie: "Pulse of Change 2026",
                    ergebnis: "87% deutscher Unternehmen erhöhen KI-Investitionen",
                    highlight: "87%"
                  },
                  {
                    firma: "Capgemini",
                    studie: "AI Perspectives 2026",
                    ergebnis: "5% des Jahresbudgets für KI geplant (vs. 3% in 2025)",
                    highlight: "5%"
                  },
                  {
                    firma: "Bitkom",
                    studie: "KI 2025",
                    ergebnis: "29% erhöhen Investitionen, 60% halten Niveau",
                    highlight: "29%"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-shrink-0 w-16 h-16 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                      <span className="text-lg font-bold text-emerald-600">{item.highlight}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-emerald-700 dark:text-emerald-400">{item.firma}</span>
                        <span className="text-sm text-muted-foreground">({item.studie})</span>
                      </div>
                      <p className="text-sm mt-1">{item.ergebnis}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <blockquote className="my-6 border-l-4 border-emerald-500 bg-emerald-500/5 p-6 rounded-r-lg italic text-lg">
            BCG-CEO Christoph Schweizer fasst zusammen: „Trotz wirtschaftlicher Unsicherheit zeigt dieser erwartete Anstieg der Ausgaben, wie sehr KI zur Priorität in der Geschäftswelt geworden ist. KI ist nicht mehr auf IT- oder Innovationsteams beschränkt – sie verändert Strategie und Betrieb von oben nach unten."
          </blockquote>

          {/* Mittelstand vs. Großunternehmen */}
          <Card className="my-6 border-l-4 border-l-amber-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                Warnsignal: Der deutsche Mittelstand fällt zurück
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg">
                  <p className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Die Horváth-Studie 2026 zeigt:</p>
                  <ul className="text-sm text-amber-800 dark:text-amber-200 space-y-2">
                    <li>• Mittelstand senkte KI-Investitionen auf <strong>0,35% des Umsatzes</strong> (von 0,41% in 2024)</li>
                    <li>• Gesamtmarkt stieg auf <strong>0,5% des Umsatzes</strong></li>
                    <li>• Mittelstand investiert <strong>30% weniger als der Gesamtmarkt</strong></li>
                  </ul>
                </div>
                <p className="text-sm text-muted-foreground">
                  Horváth-Studienleiter Heiko Fink warnt: „Wenn die KI-Transformation jetzt nicht massiv beschleunigt wird, entwickelt sich die Technologiekluft zu einem existenziellen strategischen Risiko."
                </p>
              </div>
            </CardContent>
          </Card>

          <p className="mb-6">
            Die Gründe für die Zurückhaltung des Mittelstands sind laut Horváth vielfältig: Geopolitische Verunsicherung, Fokus auf Kostenoptimierung, enttäuschende frühe Use Cases und ein Mangel an europäischen KI-Anbietern. Drei von vier befragten Unternehmen legen großen Wert auf europäische Anbieter – doch das Angebot bleibt begrenzt.
          </p>
        </section>

        {/* Sektion 3: ROI-Realität */}
        <section id="roi-realitaet" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-red-500 text-red-700 dark:text-red-400">
            ROI-Realität: Die ernüchternde Wahrheit hinter den Investitionen
          </h2>

          <p className="mb-6">
            Hier zeigt sich die größte Diskrepanz zwischen Anspruch und Wirklichkeit. Während die Investitionen steigen, bleibt der messbare Return für die Mehrheit aus. Die Studien zeichnen ein konsistentes Bild der Ernüchterung.
          </p>

          <Card className="my-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingDown className="w-5 h-5 text-red-600" />
                Die Realität: Investitionen ohne messbaren Return
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    metric: "80%",
                    label: "sehen keinen Effekt aufs Ergebnis",
                    detail: "Trotz 94% mehr Investitionen in GenAI",
                    color: "red",
                    quelle: "McKinsey Global Survey 2025"
                  },
                  {
                    metric: "42%",
                    label: "KI-Projekte abgebrochen",
                    detail: "Gestiegen von 17% im Vorjahr",
                    color: "red",
                    quelle: "McKinsey 2024"
                  },
                  {
                    metric: "67%",
                    label: "deutsche CEOs ohne messbare Effekte",
                    detail: "Weltweit: über 50%",
                    color: "amber",
                    quelle: "PwC CEO Survey 2026"
                  }
                ].map((stat, idx) => (
                  <div key={idx} className={`p-5 border-2 border-${stat.color}-500/30 rounded-xl text-center bg-gradient-to-br from-${stat.color}-500/5 to-${stat.color}-600/10`}>
                    <div className={`text-4xl font-bold text-${stat.color}-600 dark:text-${stat.color}-400`}>{stat.metric}</div>
                    <div className="font-semibold mt-2">{stat.label}</div>
                    <div className="text-sm text-muted-foreground mt-1">{stat.detail}</div>
                    <div className="text-xs text-muted-foreground mt-2 italic">Quelle: {stat.quelle}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <blockquote className="my-6 border-l-4 border-red-500 bg-red-500/5 p-6 rounded-r-lg italic text-lg">
            Laut PwC Global CEO Survey 2026 haben erst 11 Prozent der deutschen CEOs Umsatzsteigerungen durch KI erzielt, 16 Prozent berichten von gesunkenen Kosten. Weltweit erreicht nur jedes achte Unternehmen (12%) sowohl Kostenvorteile als auch Umsatzzuwächse.
          </blockquote>

          {/* ROI-Zeitrahmen */}
          <Card className="my-6 border-2 border-blue-500/20">
            <CardHeader className="bg-gradient-to-r from-blue-500/10 to-blue-600/10">
              <CardTitle className="text-base">Wann amortisiert sich KI? Die Zeitrahmen laut Deloitte</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                {[
                  { zeitraum: "Unter 1 Jahr", global: "20%", deutschland: "13%", color: "green" },
                  { zeitraum: "1-2 Jahre", global: "~50%", deutschland: "~50%", color: "blue" },
                  { zeitraum: "3-5 Jahre", global: "~25%", deutschland: "28%", color: "amber" },
                  { zeitraum: "2-4 Jahre (typisch)", global: "-", deutschland: "Mehrheit", color: "purple" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className={`w-3 h-3 rounded-full bg-${item.color}-500`}></div>
                    <div className="flex-1 font-medium">{item.zeitraum}</div>
                    <div className="text-sm text-muted-foreground">Global: {item.global}</div>
                    <div className={`text-sm font-semibold text-${item.color}-600`}>DE: {item.deutschland}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Quelle: Deloitte AI ROI Study 2025 – Nur 6% berichten von einer Amortisation unter einem Jahr
              </p>
            </CardContent>
          </Card>

          {/* Die Gewinner */}
          <Card className="my-6 border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Die andere Seite: KI-Leader vs. Nachzügler (BCG-Daten)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="font-semibold text-green-900 dark:text-green-100 mb-3">✓ "Future-built" Unternehmen (5%)</p>
                  <ul className="text-sm text-green-800 dark:text-green-200 space-y-2">
                    <li>• Investieren <strong>mehr als doppelt so viel</strong> in KI</li>
                    <li>• Erzielen <strong>doppelte Umsatzsteigerungen</strong></li>
                    <li>• Erreichen <strong>40% mehr Kosteneinsparungen</strong></li>
                    <li>• 30% des KI-Budgets für agentic AI</li>
                  </ul>
                </div>
                <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="font-semibold text-red-900 dark:text-red-100 mb-3">✗ "Laggards" (60%)</p>
                  <ul className="text-sm text-red-800 dark:text-red-200 space-y-2">
                    <li>• Minimale Umsatz- und Kostengewinne</li>
                    <li>• KI bleibt in Pilotprojekten stecken</li>
                    <li>• Fehlende CEO-Ownership</li>
                    <li>• Kaum Investitionen in Upskilling</li>
                  </ul>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Quelle: BCG AI Radar 2026 – 35% sind "Scalers" (dazwischen), die beginnen Wert zu generieren
              </p>
            </CardContent>
          </Card>

          <p className="mb-6">
            Die Accenture-Studie "Reinventing Enterprise Operations with Gen AI" bestätigt: Unternehmen mit vollständig modernisierten, KI-geführten Prozessen erzielen 2,5x höheres Umsatzwachstum und 2,4x höhere Produktivität. Die Zahl dieser Unternehmen hat sich von 9% (2023) auf 16% (2024) fast verdoppelt – aber die Mehrheit bleibt zurück.
          </p>
        </section>

        {/* Sektion 4: Praxis-Szenarien */}
        <section id="praxis-szenarien" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-orange-500 text-orange-700 dark:text-orange-400">
            Praxis-Szenarien: Wo KI-Investitionen scheitern und gelingen
          </h2>

          {/* Szenario 1 */}
          <Card className="my-6 border-l-4 border-l-red-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                Szenario 1: Das Kompetenz-Vakuum
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="font-semibold text-red-900 dark:text-red-100 mb-2">❌ Was passiert:</p>
                  <p className="text-sm text-red-800 dark:text-red-200">
                    Ein mittelständisches Unternehmen investiert 200.000€ in KI-Tools, ohne vorher in Kompetenzen zu investieren. Nach 12 Monaten: Adoption bei 15%, kein messbarer ROI, Lizenzkosten laufen weiter.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <p className="font-semibold text-blue-900 dark:text-blue-100 mb-2">📊 Die Daten dahinter:</p>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li>• <strong>79%</strong> der Unternehmen fehlen KI-Kompetenzen (McKinsey/Stifterverband)</li>
                    <li>• <strong>86%</strong> sehen ungenutztes KI-Potenzial (McKinsey/Stifterverband)</li>
                    <li>• <strong>44%</strong> erhielten keinerlei Weiterbildung im letzten Jahr (McKinsey HR-Monitor)</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="font-semibold text-green-900 dark:text-green-100 mb-2">✓ Die Lösung:</p>
                  <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                    <li>• Mindestens 20% des KI-Budgets für Upskilling einplanen</li>
                    <li>• "AI Fluency" als Kernkompetenz definieren (McKinsey-Empfehlung)</li>
                    <li>• Hybride Teams aus Menschen und KI-Tools aufbauen</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Szenario 2 */}
          <Card className="my-6 border-l-4 border-l-amber-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Scale className="w-5 h-5 text-amber-600" />
                Szenario 2: Die Skalierungsfalle
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg">
                  <p className="font-semibold text-amber-900 dark:text-amber-100 mb-2">❌ Was passiert:</p>
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    Ein Konzern startet 15 KI-Pilotprojekte parallel. Nach 18 Monaten: Alle Piloten "erfolgreich", aber keiner skaliert unternehmensweiter. KI bleibt auf einzelne Abteilungen beschränkt.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <p className="font-semibold text-blue-900 dark:text-blue-100 mb-2">📊 Die Daten dahinter:</p>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li>• <strong>60%</strong> führen nur Piloten durch (Gartner)</li>
                    <li>• <strong>6%</strong> schaffen den Sprung zum unternehmensweiten Rollout (Gartner)</li>
                    <li>• <strong>35%</strong> nutzen KI nur in einzelnen Abteilungen (Deloitte)</li>
                    <li>• <strong>7%</strong> haben End-to-End transformiert (Deloitte)</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="font-semibold text-green-900 dark:text-green-100 mb-2">✓ Die Lösung:</p>
                  <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                    <li>• Weniger Piloten, mehr Skalierungsfokus von Anfang an</li>
                    <li>• CEO als Hauptentscheider (72% der CEOs übernehmen jetzt diese Rolle laut BCG)</li>
                    <li>• Klare Governance vor Skalierung etablieren</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Szenario 3 */}
          <Card className="my-6 border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Szenario 3: Der Produktivitäts-Hebel (Erfolgsbeispiel)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="font-semibold text-green-900 dark:text-green-100 mb-2">✓ Was funktioniert:</p>
                  <p className="text-sm text-green-800 dark:text-green-200">
                    Ein Unternehmen fokussiert KI-Investitionen auf konkrete Use Cases mit klarem ROI: Texterstellung, Datenanalyse, Meeting-Nachbereitung. Strukturiertes Training, klare Nutzungsrichtlinien, messbare KPIs.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <p className="font-semibold text-blue-900 dark:text-blue-100 mb-2">📊 Die Daten dahinter:</p>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li>• <strong>82%</strong> berichten von Produktivitätssteigerungen durch GenAI (IW Köln)</li>
                    <li>• <strong>13%</strong> durchschnittliche Produktivitätssteigerung pro Jahr (IW Köln)</li>
                    <li>• <strong>56%</strong> höhere Gehälter für KI-kompetente Mitarbeiter (PwC)</li>
                    <li>• <strong>3x</strong> höheres Umsatzwachstum in KI-integrierten Branchen (PwC)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Sektion 5: Implementierung */}
        <section id="implementierung" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-cyan-500 text-cyan-700 dark:text-cyan-400">
            Implementierung: Was erfolgreiche Unternehmen anders machen
          </h2>

          <p className="mb-6">
            Die BCG-Studie identifiziert drei CEO-Archetypen: "Followers" (15%), "Pragmatists" (70%) und "Trailblazers" (15%). Die Trailblazers treiben KI-Transformation durch entschiedene Investitionen, schnelles Upskilling und starken Glauben an den ROI.
          </p>

          <Card className="my-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="w-5 h-5 text-cyan-600" />
                Die 5 Erfolgsfaktoren der KI-Leader
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    faktor: "CEO-Ownership",
                    beschreibung: "72% der CEOs sind jetzt Hauptentscheider bei KI (verdoppelt vs. Vorjahr)",
                    quelle: "BCG 2026",
                    icon: Users
                  },
                  {
                    faktor: "Agentic AI Investment",
                    beschreibung: "30%+ des KI-Budgets für KI-Agenten, 90% der CEOs erwarten messbaren ROI 2026",
                    quelle: "BCG 2026",
                    icon: Brain
                  },
                  {
                    faktor: "Unternehmensweite Governance",
                    beschreibung: "Nur 26% haben Strategy, aber 95% beschäftigen sich mit Trusted AI",
                    quelle: "KPMG 2025",
                    icon: Scale
                  },
                  {
                    faktor: "Fokussierte Use Cases",
                    beschreibung: "Texterstellung (64%), Chatbots (44%), Übersetzung (33%) als Top-Anwendungen",
                    quelle: "EY AI Barometer",
                    icon: Target
                  },
                  {
                    faktor: "Kontinuierliches Upskilling",
                    beschreibung: "KI-kompetente Mitarbeiter: 66% schnellerer Skill-Wandel, 56% höhere Gehälter",
                    quelle: "PwC 2025",
                    icon: TrendingUp
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-shrink-0 w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-cyan-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-cyan-700 dark:text-cyan-400">{item.faktor}</div>
                      <p className="text-sm mt-1">{item.beschreibung}</p>
                      <span className="text-xs text-muted-foreground italic">Quelle: {item.quelle}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Implementierungs-Timeline */}
          <Card className="my-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="w-5 h-5 text-cyan-600" />
                Typischer Implementierungs-Zeitrahmen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    phase: "Phase 1: Foundation",
                    zeitraum: "Monat 1-6",
                    dauer: "6 Monate",
                    farbe: "blue",
                    inhalte: ["Strategie & Use-Case-Definition", "Governance-Framework etablieren", "Erste Pilotprojekte starten", "Budget: 100-200k€ (Mittelstand)"],
                    quelle: "Deloitte-Empfehlung"
                  },
                  {
                    phase: "Phase 2: Skalierung",
                    zeitraum: "Monat 7-18",
                    dauer: "12 Monate",
                    farbe: "cyan",
                    inhalte: ["Erfolgreiche Piloten skalieren", "Breites Upskilling-Programm", "Prozessintegration", "Budget: 200-500k€ (Mittelstand)"],
                    quelle: "Capgemini-Empfehlung"
                  },
                  {
                    phase: "Phase 3: Transformation",
                    zeitraum: "Monat 18-36",
                    dauer: "18 Monate",
                    farbe: "green",
                    inhalte: ["End-to-End Integration", "KI-Agenten im Einsatz", "Messbarer ROI", "Typisch: 2-4 Jahre bis Amortisation"],
                    quelle: "BCG/Deloitte-Daten"
                  }
                ].map((p, idx) => (
                  <div key={idx} className={`border-l-4 border-l-${p.farbe}-500 pl-4`}>
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                      <span className={`font-bold text-${p.farbe}-700 dark:text-${p.farbe}-400`}>{p.phase}</span>
                      <span className="text-sm text-muted-foreground">{p.zeitraum} ({p.dauer})</span>
                    </div>
                    <ul className="text-sm space-y-1">
                      {p.inhalte.map((i, iidx) => (
                        <li key={iidx} className="flex items-start gap-2">
                          <CheckCircle2 className={`w-4 h-4 text-${p.farbe}-600 mt-0.5 flex-shrink-0`} />
                          {i}
                        </li>
                      ))}
                    </ul>
                    <span className="text-xs text-muted-foreground italic">Quelle: {p.quelle}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Sektion 6: Typische Fehler */}
        <section id="typische-fehler" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-red-500 text-red-700 dark:text-red-400">
            Typische Fehler bei KI-Investitionen
          </h2>

          <div className="space-y-4 my-6">
            {[
              {
                fehler: "Fehler 1: Investition ohne Kompetenzaufbau",
                beschreibung: "79% der Unternehmen fehlen KI-Kompetenzen, aber 44% der Mitarbeiter erhielten keinerlei Weiterbildung.",
                konsequenz: "Tools werden nicht genutzt, Adoption bleibt gering, ROI verpufft.",
                quelle: "McKinsey HR-Monitor 2025",
                icon: XCircle
              },
              {
                fehler: "Fehler 2: Pilotitis statt Skalierung",
                beschreibung: "60% der Unternehmen führen nur Piloten durch, nur 6% schaffen den unternehmensweiten Rollout.",
                konsequenz: "Permanente Pilotkosten ohne Wertschöpfung, 42% der Projekte werden abgebrochen.",
                quelle: "Gartner/McKinsey 2025",
                icon: XCircle
              },
              {
                fehler: "Fehler 3: Fehlende CEO-Ownership",
                beschreibung: "Erst 2026 übernehmen 72% der CEOs die KI-Hauptentscheidung – ein Jahr zu spät für viele.",
                konsequenz: "KI bleibt IT-Thema, keine strategische Integration, verpasste First-Mover-Vorteile.",
                quelle: "BCG AI Radar 2026",
                icon: XCircle
              },
              {
                fehler: "Fehler 4: Unklare Use Cases und ROI-Erwartungen",
                beschreibung: "62,7% nennen schwer einschätzbaren Nutzen als Hemmnis, nur 13% erwarten ROI unter 1 Jahr.",
                konsequenz: "Unrealistische Erwartungen führen zu Enttäuschung und Budget-Kürzungen.",
                quelle: "IW Köln/Deloitte 2025",
                icon: XCircle
              },
              {
                fehler: "Fehler 5: Keine Governance vor Skalierung",
                beschreibung: "Nur 26% haben unternehmensweite KI-Strategie, 62% fühlen sich nicht auf AI Act vorbereitet.",
                konsequenz: "Compliance-Risiken, inkonsistente Nutzung, Sicherheitsprobleme (67% sehen erhöhte Cyber-Risiken).",
                quelle: "KPMG/PwC 2025",
                icon: XCircle
              }
            ].map((item, idx) => (
              <Card key={idx} className="border-l-4 border-l-red-500">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <item.icon className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">{item.fehler}</h4>
                      <p className="text-sm mb-2">{item.beschreibung}</p>
                      <p className="text-sm text-muted-foreground mb-2"><strong>Konsequenz:</strong> {item.konsequenz}</p>
                      <span className="text-xs text-muted-foreground italic">Quelle: {item.quelle}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Sektion 7: Kernaussagen */}
        <section id="kernaussagen" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-indigo-500 text-indigo-700 dark:text-indigo-400">
            Kernaussagen für Entscheider
          </h2>

          <Card className="my-6 border-2 border-indigo-500/30 bg-gradient-to-br from-indigo-500/5 to-purple-500/5">
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="p-4 border-l-4 border-indigo-500 bg-white/50 dark:bg-black/20 rounded-r-lg">
                  <p className="font-bold text-indigo-700 dark:text-indigo-400 mb-2">1. Faktische Kernaussage</p>
                  <p className="mb-2">Die Mehrheit der deutschen Unternehmen (80%) sieht trotz steigender KI-Investitionen noch keinen messbaren Effekt auf das Geschäftsergebnis. Nur 5% qualifizieren sich als "KI-Leader" mit doppelten Umsatzsteigerungen.</p>
                  <p className="text-sm text-muted-foreground"><strong>Praktische Konsequenz:</strong> Investitionshöhe allein ist kein Erfolgsfaktor – entscheidend sind Skalierungsfähigkeit, Upskilling und CEO-Ownership.</p>
                  <p className="text-sm text-red-600 dark:text-red-400"><strong>Typischer Fehler:</strong> "Wir haben viel investiert, also müssen Ergebnisse kommen" – ohne strukturierte Implementation bleibt ROI aus.</p>
                </div>

                <div className="p-4 border-l-4 border-purple-500 bg-white/50 dark:bg-black/20 rounded-r-lg">
                  <p className="font-bold text-purple-700 dark:text-purple-400 mb-2">2. Faktische Kernaussage</p>
                  <p className="mb-2">Der deutsche Mittelstand investiert 30% weniger in KI als der Gesamtmarkt (0,35% vs. 0,5% vom Umsatz) und riskiert damit eine existenzielle Technologiekluft gegenüber Wettbewerbern.</p>
                  <p className="text-sm text-muted-foreground"><strong>Praktische Konsequenz:</strong> Mittelständler müssen KI-Investitionen mindestens auf Marktniveau anheben und europäische Anbieter als Alternative evaluieren.</p>
                  <p className="text-sm text-red-600 dark:text-red-400"><strong>Typischer Fehler:</strong> "Wir warten auf Klarheit bei Regulierung und Anbietern" – jedes Quartal Verzögerung vergrößert die Lücke zu Wettbewerbern.</p>
                </div>

                <div className="p-4 border-l-4 border-cyan-500 bg-white/50 dark:bg-black/20 rounded-r-lg">
                  <p className="font-bold text-cyan-700 dark:text-cyan-400 mb-2">3. Faktische Kernaussage</p>
                  <p className="mb-2">Die typische Amortisation von KI-Investitionen liegt bei 2-4 Jahren. Unternehmen, die Kompetenzen aufbauen (nur 56% tun dies), erzielen 13% jährliche Produktivitätssteigerung und bis zu 56% höhere Gehälter für KI-kompetente Mitarbeiter.</p>
                  <p className="text-sm text-muted-foreground"><strong>Praktische Konsequenz:</strong> Mindestens 20% des KI-Budgets für Upskilling einplanen, realistische ROI-Erwartungen setzen (2-4 Jahre, nicht 6 Monate).</p>
                  <p className="text-sm text-red-600 dark:text-red-400"><strong>Typischer Fehler:</strong> "Unsere Mitarbeiter werden das schon selbst lernen" – 79% der Unternehmen fehlen KI-Kompetenzen, 44% bieten keinerlei Schulung.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Sektion 8: Entscheidungshilfe */}
        <section id="entscheidungshilfe" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-green-500 text-green-700 dark:text-green-400">
            Entscheidungshilfe: Wann lohnt sich KI-Investment?
          </h2>

          <Card className="my-6 border-2 border-green-500/20">
            <CardHeader className="bg-gradient-to-r from-green-500/10 to-green-600/10">
              <CardTitle className="text-base">Wann KI-Investment sinnvoll ist</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-green-600 mb-3">✓ Investieren Sie jetzt, wenn:</h5>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      Sie klare, messbare Use Cases identifiziert haben
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      CEO-Level Commitment für KI-Transformation vorhanden ist
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      Budget für Upskilling (mind. 20% des KI-Budgets) eingeplant ist
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      Datenqualität und -verfügbarkeit gegeben sind
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      ROI-Erwartungen realistisch sind (2-4 Jahre)
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-red-600 mb-3">✗ Warten Sie, wenn:</h5>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                      "Weil alle es machen" die einzige Begründung ist
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                      Kein Budget für Schulung und Change Management vorhanden ist
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                      Datengrundlage nicht vorhanden oder qualitativ mangelhaft ist
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                      Quick-Win-Erwartung (ROI in 6 Monaten) dominiert
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                      KI als "IT-Projekt" ohne Führungs-Ownership geplant ist
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <blockquote className="my-6 border-l-4 border-green-500 bg-green-500/5 p-6 rounded-r-lg italic text-lg">
            Die Erfahrung zeigt: 94% der Unternehmen investieren weiter in KI, auch ohne sofortige Returns (BCG). Die Frage ist nicht ob, sondern wie. Die 5% "Future-built" Unternehmen zeigen: Mit der richtigen Strategie ist doppelter Umsatz-Impact erreichbar.
          </blockquote>
        </section>

        {/* FAQ-Sektion */}
        <section id="faq" className="mt-12 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-slate-500 text-slate-700 dark:text-slate-400">
            Häufig gestellte Fragen (FAQ)
          </h2>

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

        {/* Quellen-Sektion */}
        <section id="quellen" className="mt-12 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-slate-500 text-slate-700 dark:text-slate-400">
            Quellen und Studien
          </h2>
          <p className="text-muted-foreground mb-6">
            Dieser Artikel basiert auf den aktuellen Studien der führenden Beratungshäuser und Forschungsinstitute. Alle Statistiken sind direkt aus den Originalquellen entnommen.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                titel: "BCG AI Radar 2026: As AI Investments Surge, CEOs Take the Lead",
                beschreibung: "2.360 Executives, 16 Märkte, 9 Branchen – die umfassendste KI-Investitionsstudie",
                url: "https://www.bcg.com/publications/2026/as-ai-investments-surge-ceos-take-the-lead"
              },
              {
                titel: "McKinsey Global Survey on AI 2025",
                beschreibung: "Weltweite Analyse: 80% ohne messbaren ROI, 42% abgebrochene Projekte",
                url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai"
              },
              {
                titel: "McKinsey & Stifterverband: KI-Kompetenzen in deutschen Unternehmen 2025",
                beschreibung: "86% ungenutztes Potenzial, 79% fehlende Kompetenzen",
                url: "https://www.stifterverband.org/medien/studie-ki-kompetenzen-unternehmen"
              },
              {
                titel: "Deloitte Finance Trends 2026",
                beschreibung: "92% erhöhen KI-Budgets, ROI-Analyse und Implementierungsstand",
                url: "https://www.deloitte.com/de/de/services/executive-and-board-programs/research/finance-trends-2026.html"
              },
              {
                titel: "Deloitte: AI ROI – The Paradox of Rising Investment",
                beschreibung: "Detaillierte ROI-Zeitrahmen und Amortisationsanalyse",
                url: "https://www.deloitte.com/de/de/issues/generative-ai/ai-roi-the-paradox-of-rising-investment-and-elusive-returns.html"
              },
              {
                titel: "KPMG: Generative KI in der deutschen Wirtschaft 2025",
                beschreibung: "653 Entscheider aus 18 Branchen – 91% sehen KI als geschäftskritisch",
                url: "https://kpmg.com/de/de/home/themen/2025/04/studie-generative-ki-in-der-deutschen-wirtschaft-2025.html"
              },
              {
                titel: "PwC Global CEO Survey 2026",
                beschreibung: "22% optimistisch, 67% ohne messbare KI-Effekte",
                url: "https://www.pwc.de/de/pressemitteilungen/2026/zwischen-ki-hoffnung-und-cyberangst-wie-deutsche-ceos-erfolg-neu-erfinden.html"
              },
              {
                titel: "PwC AI Jobs Barometer 2025",
                beschreibung: "56% höhere Gehälter für KI-kompetente Mitarbeiter, 3x Produktivität",
                url: "https://www.pwc.de/de/workforce-transformation/ai-jobs-barometer.html"
              },
              {
                titel: "Accenture Pulse of Change 2026",
                beschreibung: "87% deutscher Unternehmen erhöhen KI-Investitionen, Europa-Analyse",
                url: "https://newsroom.accenture.com/news/2025/europe-seeking-greater-ai-sovereignty-accenture-report-finds"
              },
              {
                titel: "Capgemini: AI Perspectives 2026",
                beschreibung: "5% Budget für KI geplant, Verfünffachung der GenAI-Adoption",
                url: "https://www.capgemini.com/de-de/insights/research/ai-perspectives-2026/"
              },
              {
                titel: "EY European AI Barometer 2025",
                beschreibung: "81% nutzen KI im Berufsalltag, 4.942 Befragte",
                url: "https://www.ey.com/de_de/newsroom/2025/07/ey-european-ai-barometer-2025"
              },
              {
                titel: "Bitkom: Künstliche Intelligenz 2025",
                beschreibung: "36% nutzen KI, verdoppelt vs. Vorjahr, 604 Unternehmen befragt",
                url: "https://www.bitkom.org/Presse/Presseinformation/Durchbruch-Kuenstliche-Intelligenz"
              },
              {
                titel: "IW Köln: KI als Wettbewerbsfaktor 2025",
                beschreibung: "82% Produktivitätssteigerung, 13% jährlich, Handlungsempfehlungen",
                url: "https://www.iwkoeln.de/studien/barbara-engels-marc-scheufen-edgar-schmitz-kuenstliche-intelligenz-als-wettbewerbsfaktor-fuer-die-deutsche-wirtschaft.html"
              },
              {
                titel: "Horváth: KI im deutschen Mittelstand 2025/2026",
                beschreibung: "Mittelstand senkt Investitionen auf 0,35% – 30% unter Markt",
                url: "https://www.horvath-partners.com/en/press"
              },
              {
                titel: "Gartner Digital Workplace GenAI Survey 2024",
                beschreibung: "72% kämpfen mit Alltags-Integration, 6% schaffen Rollout",
                url: "https://www.gartner.com/en/documents/5659223"
              }
            ].map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-4 border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-colors group"
              >
                <ExternalLink className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold group-hover:text-primary transition-colors text-sm">{link.titel}</div>
                  <div className="text-xs text-muted-foreground mt-1">{link.beschreibung}</div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Autor-Bio */}
        <TrustBadge />

        {/* CTA */}
        <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-xl p-8 text-center my-12 border-2 border-orange-500/20">
          <h3 className="text-2xl font-bold mb-4">Ihre KI-Transformation strategisch angehen</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Die Studien zeigen: 79% der Unternehmen fehlen KI-Kompetenzen. Wir helfen Ihnen, diese Lücke zu schließen – mit praxisnahem Training, das nachweislich Produktivität steigert.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Jetzt Beratungsgespräch vereinbaren
          </a>
        </div>
      </ContentLayout>
    </>
  );
};

export default KiRealitaet2026;
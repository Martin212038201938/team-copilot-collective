import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Zap, AlertTriangle, Users, Target, TrendingUp,
  ExternalLink, Linkedin, Mail, CheckCircle2, XCircle,
  Calendar, Clock, Brain, Route, BookOpen, GraduationCap
} from "lucide-react";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";

const SLUG = "copilot-lernreise-vs-tagesschulung";
const PAGE_TITLE = "Copilot Lernreise vs. Tagesschulung: Warum 4×2 Stunden mehr bringen als 1×8";

const CopilotLernreisen = () => {
  const martinLang = getAuthor('martin-lang')!;

  const ids = generateSchemaIds(SLUG, 'wissen');
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const tableOfContents = [
    { id: "vergessenskurve", title: "Die Vergessenskurve: Warum Tagesschulungen scheitern", level: 2 },
    { id: "wissenschaft", title: "Was die Wissenschaft über Spaced Learning sagt", level: 2 },
    { id: "lernreise-vorteile", title: "8 Gründe, warum Lernreisen besser funktionieren", level: 2 },
    { id: "praxis-szenarien", title: "Praxis-Szenarien: Lernreise vs. Tagesschulung", level: 2 },
    { id: "implementierung", title: "So planen Sie eine Copilot-Lernreise", level: 2 },
    { id: "typische-fehler", title: "Typische Fehler bei der Trainingsplanung", level: 2 },
    { id: "entscheidungshilfe", title: "Entscheidungshilfe: Lernreise oder Tagesschulung?", level: 2 },
    { id: "kernaussagen", title: "Kernaussagen für Entscheider", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
    { id: "quellen", title: "Quellen und Links", level: 2 }
  ];

  const faqs = [
    {
      name: "Ist eine Lernreise nicht teurer als eine Tagesschulung?",
      answer: "Auf den ersten Blick ja – der Trainingsaufwand verteilt sich über mehrere Wochen. Auf den zweiten Blick: Nein. Bei einer Tagesschulung müssen Sie mit Nachschulungen rechnen, weil bis zu 90 % des Gelernten innerhalb eines Monats wieder vergessen werden. Eine Lernreise kostet einmal – und wirkt nachhaltig, weil zwischen den Einheiten echte Anwendung passiert. Meta-Analysen zeigen: Spaced Learning kann die Lerneffizienz verdoppeln."
    },
    {
      name: "Wie lang sollte eine einzelne Lernreise-Einheit sein?",
      answer: "Unsere Erfahrung: 90 bis 120 Minuten sind ideal. Lang genug für einen inhaltlichen Schwerpunkt mit Übungen, kurz genug, um in jeden Kalender zu passen. Die kognitive Forschung zeigt, dass die Aufmerksamkeit nach etwa 90 Minuten rapide sinkt – ein 8-Stunden-Tag kämpft also gegen fundamentale Grenzen der menschlichen Konzentrationsfähigkeit."
    },
    {
      name: "Was passiert, wenn jemand eine Einheit verpasst?",
      answer: "Genau hier liegt ein großer Vorteil der Lernreise: Wer eine von vier oder acht Einheiten verpasst, kann den Stoff bis zur nächsten Session nachholen – das ist überschaubar. Bei einer Tagesschulung verpasst man dagegen gleich 100 % des Trainings. Das senkt das Planungsrisiko für Unternehmen erheblich."
    },
    {
      name: "Funktioniert eine Lernreise auch remote?",
      answer: "Ja, sogar besonders gut. 2-Stunden-Blöcke lassen sich hervorragend als Online-Sessions durchführen. Tagesschulungen über 8 Stunden am Bildschirm sind dagegen für alle Beteiligten extrem anstrengend – die Aufmerksamkeit sinkt nach spätestens 90 Minuten drastisch, und die letzten Stunden eines Online-Schulungstages sind meist verschwendete Zeit."
    },
    {
      name: "Welche Copilot-Trainings bietet die copilotenschule.de als Lernreise an?",
      answer: "Alle unsere Basic-Trainings – von Microsoft 365 Copilot Grundlagen bis zu den App-spezifischen Trainings für Word, Excel, PowerPoint, Outlook und Teams – sind als Lernreise buchbar. Das Format umfasst typischerweise 4×2 Stunden über 4 Wochen, für tiefere Inhalte auch 8×2 Stunden über 8 Wochen. Jede Session baut auf der vorherigen auf und enthält konkrete Praxisaufträge für die Zeit dazwischen."
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": ids.article,
        "headline": PAGE_TITLE,
        "description": "Warum Copilot-Lernreisen (4×2 oder 8×2 Stunden) nachhaltiger wirken als ganztägige Schulungen. Wissenschaftliche Grundlagen, Praxis-Szenarien und Entscheidungshilfe für Unternehmen.",
        "author": getAuthorSchemaMarkup(martinLang),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization"
        },
        "datePublished": "2026-02-04",
        "dateModified": "2026-02-04",
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
        title="Copilot Lernreise vs. Tagesschulung: Warum 4×2 Stunden mehr bringen als 1×8 | copilotenschule.de"
        description="Warum Copilot-Lernreisen nachhaltiger wirken als ganztägige Schulungen. Vergessenskurve, Praxistransfer, Kalenderfreundlichkeit – 8 Gründe für verteiltes Lernen."
        keywords={[
          "Copilot Lernreise",
          "Microsoft 365 Copilot Training",
          "Copilot Schulung Format",
          "Spaced Learning Copilot",
          "Vergessenskurve Training",
          "Copilot Adoption",
          "Microlearning Copilot",
          "Copilot Workshop vs Lernreise",
          "Copilot Trainingsformat",
          "Nachhaltiges KI-Training",
          "Copilot Enablement",
          "Verteiltes Lernen Unternehmen",
          "Copilot Schulung buchen",
          "Spacing Effect Training"
        ]}
        canonicalUrl={pageUrl}
        schema={schema}
        author={martinLang}
        publishedTime="2026-02-04T10:00:00+01:00"
        modifiedTime="2026-02-04T10:00:00+01:00"
      />

      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "Lernreise vs. Tagesschulung", href: `/wissen/${SLUG}` }
        ]}
        title={PAGE_TITLE}
        description="Warum verteiltes Lernen in kurzen Einheiten bei Copilot-Trainings deutlich mehr bewirkt als ein einzelner Schulungstag – und wie Ihr Unternehmen davon profitiert."
        lastUpdated="04. Februar 2026"
        readTime="12 Minuten"
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
              <strong>Eine Copilot-Lernreise über 4×2 oder 8×2 Stunden schlägt die klassische Tagesschulung in fast jeder Dimension:</strong> Teilnehmer behalten mehr, weil die Vergessenskurve durch regelmäßige Wiederholung abgeflacht wird. Sie setzen Gelerntes zwischen den Sessions direkt in echten Workflows ein. Und organisatorisch passt ein 2-Stunden-Block in jeden Kalender – während ein kompletter Schulungstag für viele Teams schlicht nicht machbar ist. Meta-Analysen zeigen: Spaced Learning verbessert die Langzeitretention um bis zu 200 %.
            </p>
          </CardContent>
        </Card>

        {/* Sektion 1: Vergessenskurve */}
        <section id="vergessenskurve">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-red-500 text-red-700 dark:text-red-400">
            Die Vergessenskurve: Warum Tagesschulungen scheitern
          </h2>

          <p className="mb-6">
            Der deutsche Psychologe Hermann Ebbinghaus entdeckte bereits 1885 ein Phänomen, das jeder aus eigener Erfahrung kennt: Frisch Gelerntes verschwindet erschreckend schnell aus dem Gedächtnis. Seine Vergessenskurve zeigt: Schon nach 20 Minuten können wir nur noch etwa 60 % abrufen. Nach einem Tag sind es rund 34 %. Nach sechs Tagen bleiben gerade einmal 23 % übrig.
          </p>

          <Card className="my-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Brain className="w-5 h-5 text-red-600" />
                Die Vergessenskurve nach Ebbinghaus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {[
                  { zeit: "20 Min.", behalten: "~60%", farbe: "green" },
                  { zeit: "1 Stunde", behalten: "~45%", farbe: "yellow" },
                  { zeit: "1 Tag", behalten: "~34%", farbe: "orange" },
                  { zeit: "6 Tage", behalten: "~23%", farbe: "red" },
                  { zeit: "1 Monat", behalten: "~10-15%", farbe: "red" }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 border-2 border-gray-200 rounded-xl text-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                    <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">{item.behalten}</div>
                    <div className="text-sm font-semibold mt-1">nach {item.zeit}</div>
                    <div className="text-xs text-muted-foreground mt-1">noch abrufbar</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3 italic text-center">
                Quelle: Ebbinghaus, H. (1885). Über das Gedächtnis. Repliziert von Murre & Dros (2015), PLOS ONE.
              </p>
            </CardContent>
          </Card>

          <p className="mb-6">
            Was bedeutet das für eine 8-stündige Copilot-Tagesschulung? Am nächsten Morgen erinnern sich Ihre Mitarbeitenden an etwa ein Drittel der Inhalte. Nach einer Woche an weniger als ein Viertel. Nach einem Monat an nur noch 10-15 %. Die restlichen 6–7 Stunden Schulung? Verpufft. Nicht weil die Teilnehmenden nicht aufgepasst haben – sondern weil das menschliche Gehirn schlicht nicht dafür gebaut ist, 8 Stunden am Stück neues Wissen aufzunehmen und dauerhaft zu speichern.
          </p>

          <blockquote className="my-6 border-l-4 border-primary bg-primary/5 p-6 rounded-r-lg italic text-lg">
            Die Erfahrung zeigt: Vier Sessions à zwei Stunden mit je einer Woche Pause dazwischen schlagen einen einzigen Acht-Stunden-Tag – bei identischem Gesamtumfang, aber fundamental besserem Ergebnis.
          </blockquote>
        </section>

        {/* Sektion 2: Wissenschaftliche Grundlagen */}
        <section id="wissenschaft" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-purple-500 text-purple-700 dark:text-purple-400">
            Was die Wissenschaft über Spaced Learning sagt
          </h2>

          <p className="mb-6">
            Der Spacing-Effekt ist eines der am besten dokumentierten Phänomene der Lernforschung. Über 300 Studien im 20. Jahrhundert allein haben gezeigt: Verteiltes Lernen schlägt geballtes Lernen – konsistent und reproduzierbar.
          </p>

          <Card className="my-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <GraduationCap className="w-5 h-5 text-purple-600" />
                Wissenschaftliche Evidenz zum Spacing-Effekt
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    studie: "Meta-Analyse Cepeda et al. (2006)",
                    ergebnis: "Verteiltes Lernen führt zu signifikant besserer Langzeitretention als Massed Practice",
                    quelle: "Psychological Bulletin"
                  },
                  {
                    studie: "Classroom Meta-Analyse (2025)",
                    ergebnis: "Moderate Effektstärke (d = 0.54) für Spaced Practice in realen Unterrichtssituationen",
                    quelle: "Educational Psychology Review"
                  },
                  {
                    studie: "Kornmeier & Sosic-Vasic",
                    ergebnis: "Spaced Learning kann die Effizienz von Lernsessions verdoppeln",
                    quelle: "Frontiers in Human Neuroscience"
                  },
                  {
                    studie: "Thalheimer (2006)",
                    ergebnis: "Information wird 2-3x besser behalten wenn Training über Zeit verteilt statt geblockt stattfindet",
                    quelle: "Work-Learning Research"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <div className="font-semibold text-purple-700 dark:text-purple-400 mb-2">{item.studie}</div>
                    <p className="text-sm text-muted-foreground mb-2">{item.ergebnis}</p>
                    <div className="text-xs italic">Quelle: {item.quelle}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <p className="mb-6">
            Die Neurowissenschaft erklärt, warum: Verteiltes Lernen aktiviert das Langzeitgedächtnis durch wiederholte Encoding-Prozesse. Eine aktuelle Studie zeigt, dass Spaced Learning die Ähnlichkeit neuronaler Repräsentationen im ventromedialen präfrontalen Cortex erhöht – und diese Veränderungen korrelieren direkt mit den Lernvorteilen.
          </p>

          <Card className="my-6 border-2 border-purple-500/20">
            <CardHeader className="bg-gradient-to-r from-purple-500/10 to-purple-600/10">
              <CardTitle className="text-base">Warum funktioniert Spacing?</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Encoding Variability:</strong> Bei zeitlich getrennten Wiederholungen wird Information in verschiedenen Kontexten encodiert, was zu mehr Abrufpfaden führt.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Retrieval Practice:</strong> Jede Session zwingt zum Abruf der vorherigen Inhalte – dieser aktive Prozess stärkt die Gedächtnisspur.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Konsolidierung:</strong> Das Gehirn braucht Zeit zwischen Lernsessions, um Informationen vom Kurzzeit- ins Langzeitgedächtnis zu überführen.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Sektion 3: 8 Gründe */}
        <section id="lernreise-vorteile" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-green-500 text-green-700 dark:text-green-400">
            8 Gründe, warum Lernreisen besser funktionieren
          </h2>

          <div className="space-y-4 my-6">
            {[
              {
                nummer: "1",
                titel: "Spaced Learning schlägt die Vergessenskurve",
                text: "Verteiltes Lernen über mehrere Wochen aktiviert das Langzeitgedächtnis. Jede Session wiederholt und vertieft die vorherige – genau so, wie unser Gehirn Informationen dauerhaft abspeichert. Meta-Analysen zeigen: Spaced Learning führt zu 60–80 % Wissenserhalt nach 30 Tagen, verglichen mit nur 10–20 % bei klassischen Einmal-Schulungen.",
                icon: <Brain className="w-5 h-5" />,
                farbe: "green"
              },
              {
                nummer: "2",
                titel: "Sofortiger Praxistransfer zwischen den Sessions",
                text: "Nach jeder 2-Stunden-Einheit gehen Ihre Mitarbeitenden zurück an den Arbeitsplatz – und setzen das Gelernte direkt in echten Aufgaben ein. Copilot in Outlook testen, Prompts in Word ausprobieren, Meetings in Teams zusammenfassen. Dieser Praxistransfer ist der entscheidende Hebel: Wissen wird zu Können, und Können verändert Workflows.",
                icon: <Target className="w-5 h-5" />,
                farbe: "blue"
              },
              {
                nummer: "3",
                titel: "Passt in jeden Kalender",
                text: "Einen ganzen Tag für eine Schulung zu blocken ist für viele Teams schlicht unrealistisch. Kundentermine, Projektdeadlines, Führungsverantwortung – irgendetwas kollidiert immer. Zwei Stunden pro Woche dagegen lassen sich fast immer unterbringen, ohne den Betrieb zu stören.",
                icon: <Calendar className="w-5 h-5" />,
                farbe: "orange"
              },
              {
                nummer: "4",
                titel: "Ausfälle sind aufholbar",
                text: "Bei einer Tagesschulung verpasst eine abwesende Person 100 % des Trainings. Bei einer Lernreise mit 4 Sessions verpasst sie 25 % – und kann diesen Block in Eigenregie oder in der nächsten Session nachholen. Das senkt das Planungsrisiko erheblich.",
                icon: <Users className="w-5 h-5" />,
                farbe: "cyan"
              },
              {
                nummer: "5",
                titel: "Höhere Aufnahmefähigkeit pro Session",
                text: "Nach 90 Minuten sinkt die Aufmerksamkeit rapide. Eine 2-Stunden-Einheit nutzt die Zeit maximaler Konzentration. Eine 8-Stunden-Schulung kämpft in der zweiten Hälfte gegen nachlassende Aufmerksamkeit, Post-Lunch-Müdigkeit und Informationsüberflutung.",
                icon: <Brain className="w-5 h-5" />,
                farbe: "purple"
              },
              {
                nummer: "6",
                titel: "Fragen entstehen durch Anwendung",
                text: "Die besten Fragen kommen nicht während der Schulung, sondern danach – wenn Teilnehmende versuchen, das Gelernte einzusetzen. In einer Lernreise können diese Praxisfragen in der nächsten Session besprochen werden. Bei einer Tagesschulung gibt es dieses Forum nicht.",
                icon: <BookOpen className="w-5 h-5" />,
                farbe: "amber"
              },
              {
                nummer: "7",
                titel: "Behavioral Change statt Information Overload",
                text: "Das Ziel eines Copilot-Trainings ist nicht Wissensvermittlung – es ist Verhaltensänderung. Mitarbeitende sollen ihren Arbeitsalltag anders gestalten. Das passiert nicht an einem Tag, sondern über Wochen, in denen neue Gewohnheiten Schritt für Schritt entstehen.",
                icon: <Route className="w-5 h-5" />,
                farbe: "emerald"
              },
              {
                nummer: "8",
                titel: "Messbare Fortschritte motivieren",
                text: "In einer Lernreise sehen Teilnehmende ihren eigenen Fortschritt von Session zu Session. Sie erleben, wie Copilot ihnen tatsächlich Zeit spart. Diese Erfolgserlebnisse zwischen den Einheiten sind der stärkste Motivator für nachhaltige Adoption.",
                icon: <TrendingUp className="w-5 h-5" />,
                farbe: "indigo"
              }
            ].map((grund, idx) => (
              <Card key={idx} className="border-l-4 border-l-primary">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
                  <CardTitle className="text-lg flex items-center gap-2 text-primary">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20">
                      {grund.icon}
                    </span>
                    {grund.titel}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm leading-relaxed">{grund.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Statistik-Grid */}
          <Card className="my-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="w-5 h-5 text-orange-600" />
                Warum nachhaltiges Training sich lohnt – die Zahlen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    metric: "72%",
                    label: "kämpfen mit Alltags-Integration",
                    detail: "ohne strukturiertes Training",
                    color: "red",
                    quelle: "Gartner Survey 2024"
                  },
                  {
                    metric: "200%",
                    label: "bessere Langzeitretention",
                    detail: "durch Spaced Learning vs. Cramming",
                    color: "green",
                    quelle: "Meta-Analyse (800+ Studien)"
                  },
                  {
                    metric: "9h/Monat",
                    label: "Zeitersparnis pro Nutzer",
                    detail: "bei erfolgreichem Training",
                    color: "blue",
                    quelle: "Forrester TEI Study"
                  }
                ].map((stat, idx) => (
                  <div key={idx} className="p-5 border-2 border-gray-200 rounded-xl text-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                    <div className="text-4xl font-bold text-primary">{stat.metric}</div>
                    <div className="font-semibold mt-2">{stat.label}</div>
                    <div className="text-sm text-muted-foreground mt-1">{stat.detail}</div>
                    <div className="text-xs text-muted-foreground mt-2 italic">Quelle: {stat.quelle}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Sektion 4: Praxis-Szenarien */}
        <section id="praxis-szenarien" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-blue-500 text-blue-700 dark:text-blue-400">
            Praxis-Szenarien: Lernreise vs. Tagesschulung
          </h2>

          {/* Szenario 1 */}
          <Card className="my-6 border-l-4 border-l-red-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                Szenario 1: Die Marketing-Abteilung
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="font-semibold text-red-900 dark:text-red-100 mb-2">❌ Tagesschulung:</p>
                  <p className="text-sm text-red-800 dark:text-red-200">
                    Das 12-köpfige Marketing-Team blockiert einen Freitag für die Copilot-Schulung. Drei Personen müssen kurzfristig absagen – Kundentermin, Krankheit, Urlaub. Die übrigen neun sitzen 8 Stunden lang in einem Workshop. Am Montag erinnern sie sich an die Word- und PowerPoint-Funktionen, die zuletzt gezeigt wurden. Die Outlook- und Teams-Features vom Vormittag? Vergessen. Die drei abwesenden Personen bekommen nie eine Nachschulung.
                  </p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="font-semibold text-green-900 dark:text-green-100 mb-2">✓ Lernreise (4×2 Stunden):</p>
                  <ul className="text-sm text-green-800 dark:text-green-200 space-y-2">
                    <li>• Woche 1: Copilot-Grundlagen & Prompting – das Team testet sofort in echten Aufgaben</li>
                    <li>• Woche 2: Copilot in Outlook & Teams – Fragen aus der Praxis der Vorwoche fließen ein</li>
                    <li>• Woche 3: Copilot in Word & PowerPoint – Teilnehmer bringen eigene Dokumente mit</li>
                    <li>• Woche 4: Fortgeschrittene Workflows & Best Practices – alle haben echte Erfahrung</li>
                    <li>• Die eine Person, die in Woche 2 fehlte, holt den Outlook-Block eigenständig nach</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Szenario 2 */}
          <Card className="my-6 border-l-4 border-l-red-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                Szenario 2: Verteiltes Team mit Homeoffice
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="font-semibold text-red-900 dark:text-red-100 mb-2">❌ Tagesschulung (remote, 8 Stunden):</p>
                  <p className="text-sm text-red-800 dark:text-red-200">
                    Ein ganzer Tag vor dem Bildschirm. Nach 3 Stunden checken die ersten nebenbei E-Mails. Nach dem Mittagessen schalten einige die Kamera aus. Am Ende des Tages ist die Hälfte mental nicht mehr dabei. Die Bewertung: „Ganz nett, aber viel zu lang."
                  </p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="font-semibold text-green-900 dark:text-green-100 mb-2">✓ Lernreise (4×2 Stunden, remote):</p>
                  <ul className="text-sm text-green-800 dark:text-green-200 space-y-2">
                    <li>• 2 Stunden sind online gut durchzuhalten – volle Aufmerksamkeit, Kameras an</li>
                    <li>• Zwischen den Sessions: echte Anwendung im Arbeitsalltag</li>
                    <li>• Nächste Session startet mit „Was hat bei euch funktioniert?" – Peer Learning entsteht</li>
                    <li>• Teilnehmer aus verschiedenen Standorten lernen voneinander</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Szenario 3 */}
          <Card className="my-6 border-l-4 border-l-red-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                Szenario 3: Führungskräfte mit vollen Kalendern
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="font-semibold text-red-900 dark:text-red-100 mb-2">❌ Tagesschulung:</p>
                  <p className="text-sm text-red-800 dark:text-red-200">
                    Der Schulungstag wird dreimal verschoben, weil nie alle Führungskräfte gleichzeitig frei sind. Am Ende findet die Schulung sechs Wochen nach dem geplanten Termin statt – mit nur 60 % der Zielgruppe. Die Copilot-Lizenzen laufen seit Monaten, ohne genutzt zu werden.
                  </p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="font-semibold text-green-900 dark:text-green-100 mb-2">✓ Lernreise (4×2 Stunden):</p>
                  <ul className="text-sm text-green-800 dark:text-green-200 space-y-2">
                    <li>• 2-Stunden-Slot findet sich in fast jedem Führungskräfte-Kalender</li>
                    <li>• Start bereits in der ersten Woche nach Lizenzvergabe möglich</li>
                    <li>• Wer eine Session verpasst, steigt in der nächsten wieder ein</li>
                    <li>• Führungskräfte werden zu Copilot-Vorbildern für ihre Teams</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Sektion 5: Implementierung */}
        <section id="implementierung" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-orange-500 text-orange-700 dark:text-orange-400">
            So planen Sie eine Copilot-Lernreise
          </h2>

          <p className="mb-6">
            Eine Lernreise ist keine lose Folge von Workshops. Damit das Format seine volle Wirkung entfaltet, braucht es eine durchdachte Struktur, die auf dem Spacing-Effekt aufbaut und den Praxistransfer aktiv fördert.
          </p>

          <div className="space-y-6 my-6">
            {[
              {
                phase: "Woche 1: Fundament legen",
                zeitraum: "Session 1",
                dauer: "2 Stunden",
                farbe: "blue",
                inhalte: [
                  "Copilot verstehen: Was kann es, was nicht?",
                  "Prompting-Grundlagen: Struktur, Kontext, Zielformulierung",
                  "Erste Hands-on-Übungen in der vertrauten Arbeitsumgebung",
                  "Praxis-Auftrag: Bis nächste Woche 3 echte Aufgaben mit Copilot lösen"
                ]
              },
              {
                phase: "Woche 2: Erste Vertiefung",
                zeitraum: "Session 2",
                dauer: "2 Stunden",
                farbe: "green",
                inhalte: [
                  "Erfahrungsaustausch: Was hat funktioniert, was nicht?",
                  "Vertiefung: Copilot in Outlook und Teams für den Arbeitsalltag",
                  "Häufige Fehler besprechen und korrigieren",
                  "Praxis-Auftrag: E-Mail-Workflows und Meeting-Nachbereitung mit Copilot"
                ]
              },
              {
                phase: "Woche 3: Anwendung ausbauen",
                zeitraum: "Session 3",
                dauer: "2 Stunden",
                farbe: "orange",
                inhalte: [
                  "Copilot in Word und PowerPoint: Dokumente und Präsentationen",
                  "Teilnehmer bringen eigene Aufgaben und Dokumente mit",
                  "Fortgeschrittene Prompts und Verkettung von Arbeitsschritten",
                  "Praxis-Auftrag: Ein komplettes Arbeitsergebnis mit Copilot erstellen"
                ]
              },
              {
                phase: "Woche 4: Festigung & Best Practices",
                zeitraum: "Session 4",
                dauer: "2 Stunden",
                farbe: "purple",
                inhalte: [
                  "Showcase: Teilnehmer zeigen ihre besten Copilot-Workflows",
                  "Fortgeschrittene Szenarien und Tipps aus der Praxis",
                  "Prompt-Bibliothek für das Team erstellen",
                  "Ausblick: Wie bleibt Copilot dauerhaft im Arbeitsalltag?"
                ]
              }
            ].map((p, idx) => (
              <Card key={idx} className="border-l-4 border-l-primary">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <CardTitle className="text-lg text-primary">
                      {p.phase}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" /> {p.zeitraum}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" /> {p.dauer}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-1 text-sm">
                    {p.inhalte.map((i, iidx) => (
                      <li key={iidx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        {i}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Sektion 6: Typische Fehler */}
        <section id="typische-fehler" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-amber-500 text-amber-700 dark:text-amber-400">
            Typische Fehler bei der Trainingsplanung
          </h2>

          <div className="space-y-4 my-6">
            {[
              {
                fehler: "Tagesschulung als 'effizienter' betrachten",
                konsequenz: "Ein Tag fühlt sich schnell und effizient an – aber wenn 80–90 % des Wissens nach einem Monat verschwunden sind, war es das Gegenteil. Die wahren Kosten liegen in der verlorenen Lizenznutzung und den nötigen Nachschulungen.",
                icon: <XCircle className="w-5 h-5 text-red-600" />
              },
              {
                fehler: "Keine Praxisphasen zwischen den Sessions",
                konsequenz: "Selbst bei verteiltem Lernen: Wenn Teilnehmende zwischen den Einheiten nicht aktiv mit Copilot arbeiten, fehlt der entscheidende Transfermoment. Jede Session braucht einen konkreten Praxis-Auftrag.",
                icon: <XCircle className="w-5 h-5 text-red-600" />
              },
              {
                fehler: "Zu viele Inhalte pro Session packen",
                konsequenz: "Zwei Stunden sind kein Mini-Tagestraining. Pro Session sollte ein klarer Fokus stehen. Lieber ein Thema wirklich durchdringen als fünf Themen anreißen.",
                icon: <XCircle className="w-5 h-5 text-red-600" />
              },
              {
                fehler: "Lernreise ohne Rückbezug auf vorherige Sessions",
                konsequenz: "Jede Session muss mit einer kurzen Wiederholung der letzten Einheit starten. Dieser Rückbezug ist der Kern des Spacing-Effekts – er flacht die Vergessenskurve aktiv ab.",
                icon: <XCircle className="w-5 h-5 text-red-600" />
              }
            ].map((item, idx) => (
              <Card key={idx} className="border-l-4 border-l-amber-500">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    {item.icon}
                    <div>
                      <h4 className="font-semibold mb-2">{item.fehler}</h4>
                      <p className="text-sm text-muted-foreground">{item.konsequenz}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Sektion 7: Entscheidungshilfe */}
        <section id="entscheidungshilfe" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-indigo-500 text-indigo-700 dark:text-indigo-400">
            Entscheidungshilfe: Lernreise oder Tagesschulung?
          </h2>

          <p className="mb-6">
            In bestimmten Situationen kann eine kompakte Tagesschulung sinnvoll sein – etwa als reiner Impuls-Workshop oder wenn es um eine einmalige Sensibilisierung geht. Aber für nachhaltigen Kompetenzaufbau ist die Lernreise fast immer die bessere Wahl.
          </p>

          <Card className="my-6 border-2 border-indigo-500/20">
            <CardHeader className="bg-gradient-to-r from-indigo-500/10 to-indigo-600/10">
              <CardTitle className="text-base">Vergleich: Tagesschulung vs. Lernreise</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2">
                      <th className="text-left py-2 pr-4 font-semibold">Kriterium</th>
                      <th className="text-center py-2 px-4 font-semibold text-red-600">Tagesschulung</th>
                      <th className="text-center py-2 pl-4 font-semibold text-green-600">Lernreise</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { kriterium: "Wissenserhalt nach 30 Tagen", tag: "ca. 10–20 %", reise: "ca. 60–80 %" },
                      { kriterium: "Praxistransfer", tag: "Minimal", reise: "Hoch (wöchentlich)" },
                      { kriterium: "Kalender-Kompatibilität", tag: "Schwierig", reise: "Einfach" },
                      { kriterium: "Ausfallrisiko", tag: "100 % bei Abwesenheit", reise: "25 % pro Session" },
                      { kriterium: "Aufmerksamkeit", tag: "Sinkt nach 90 Min.", reise: "Konstant hoch" },
                      { kriterium: "Verhaltensänderung", tag: "Unwahrscheinlich", reise: "Wahrscheinlich" },
                      { kriterium: "Remote-Tauglichkeit", tag: "Sehr anstrengend", reise: "Ideal" },
                      { kriterium: "Kosten pro Stunde Schulung", tag: "Gleich", reise: "Gleich" }
                    ].map((row, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="py-3 pr-4 font-medium">{row.kriterium}</td>
                        <td className="py-3 px-4 text-center text-red-600">{row.tag}</td>
                        <td className="py-3 pl-4 text-center text-green-600 font-medium">{row.reise}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="my-6 border-2 border-green-500/20">
            <CardHeader className="bg-gradient-to-r from-green-500/10 to-green-600/10">
              <CardTitle className="text-base">Wann welches Format?</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-orange-600 mb-2">Tagesschulung passt, wenn:</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Reiner Impuls-Workshop ohne Adoption-Ziel</li>
                    <li>• Einmalige Demo für Entscheider (2–4 Stunden)</li>
                    <li>• Kick-off vor einer anschließenden Lernreise</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-green-600 mb-2">Lernreise passt, wenn:</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Copilot soll dauerhaft in Workflows integriert werden</li>
                    <li>• Teams sollen ihre Arbeitsweise nachhaltig verändern</li>
                    <li>• Maximaler ROI aus Copilot-Lizenzen das Ziel ist</li>
                    <li>• Remote- oder Hybrid-Teams geschult werden</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Kernaussagen für Entscheider */}
        <section id="kernaussagen" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-emerald-500 text-emerald-700 dark:text-emerald-400">
            Kernaussagen für Entscheider
          </h2>

          <Card className="my-6 border-2 border-emerald-500/20">
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold text-emerald-700 dark:text-emerald-400 mb-2">Faktische Kernaussage</h4>
                  <p className="text-sm">Verteiltes Lernen über mehrere Wochen führt laut über 300 Studien und Meta-Analysen zu 2–3× höherer Wissensretention als kompakte Einmal-Schulungen bei identischem Zeitaufwand.</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold text-emerald-700 dark:text-emerald-400 mb-2">Praktische Konsequenz</h4>
                  <p className="text-sm">Ein Copilot-Training im Lernreise-Format (4×2 oder 8×2 Stunden) maximiert den ROI der Lizenzen, weil Mitarbeitende das Gelernte zwischen den Sessions in echten Aufgaben anwenden und festigen.</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold text-emerald-700 dark:text-emerald-400 mb-2">Typischer Fehler</h4>
                  <p className="text-sm">Tagesschulungen werden als „effizienter" geplant, weil sie die Trainingszeit auf einen Tag komprimieren – aber sie ignorieren die Vergessenskurve und erzeugen keinen nachhaltigen Praxistransfer.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* FAQ */}
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

        {/* Quellen */}
        <section id="quellen" className="mt-12 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-slate-500 text-slate-700 dark:text-slate-400">
            Quellen und weiterführende Links
          </h2>
          <p className="text-muted-foreground mb-6">
            Studien und wissenschaftliche Grundlagen, auf die sich dieser Artikel stützt.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                titel: "Ebbinghaus: Über das Gedächtnis (1885)",
                beschreibung: "Grundlagenwerk zur Vergessenskurve – repliziert von Murre & Dros (2015)",
                url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4492928/"
              },
              {
                titel: "Cepeda et al.: Distributed Practice in Verbal Recall Tasks (2006)",
                beschreibung: "Wegweisende Meta-Analyse zum Spacing-Effekt (Psychological Bulletin)",
                url: "https://www.researchgate.net/publication/290511665_Spaced_Repetition_Promotes_Efficient_and_Effective_Learning_Policy_Implications_for_Instruction"
              },
              {
                titel: "Thalheimer: Spacing Learning Events Over Time (2006)",
                beschreibung: "Praxisorientierte Forschungsübersicht für Corporate Learning",
                url: "https://www.worklearning.com/wp-content/uploads/2017/10/Spacing_Learning_Over_Time__March2009v1_.pdf"
              },
              {
                titel: "Gartner: Copilot Impact Assessment 2024",
                beschreibung: "72 % kämpfen mit Alltags-Integration, 57 % sinkendes Engagement",
                url: "https://www.gartner.com/en/documents/5659223"
              },
              {
                titel: "Forrester TEI Study: Microsoft 365 Copilot",
                beschreibung: "ROI-Studie: 132–353 % ROI, 9 Stunden Zeitersparnis pro Monat",
                url: "https://tei.forrester.com/go/microsoft/M365Copilot/?lang=en-us"
              },
              {
                titel: "Educational Psychology Review: Meta-Analysis (2025)",
                beschreibung: "Classroom-Studie zeigt d = 0.54 Effektstärke für Spaced Practice",
                url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12189222/"
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
                  <div className="font-semibold group-hover:text-primary transition-colors">{link.titel}</div>
                  <div className="text-sm text-muted-foreground">{link.beschreibung}</div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Autor-Bio */}
        <section className="my-12">
          <Card className="border-l-4 border-l-primary">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <img
                    src={martinLang.image}
                    alt={martinLang.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-primary/20"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Über den Autor</h3>
                  <div className="text-lg font-semibold text-primary mb-1">{martinLang.name}</div>
                  <div className="text-sm text-muted-foreground mb-3">{martinLang.role}</div>
                  <p className="text-sm leading-relaxed mb-4">{martinLang.bio}</p>
                  <div className="mb-3">
                    <div className="text-sm font-semibold mb-2">Expertise:</div>
                    <div className="flex flex-wrap gap-2">
                      {martinLang.expertise.map((exp, idx) => (
                        <span key={idx} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    {martinLang.linkedin && (
                      <a href={martinLang.linkedin} target="_blank" rel="noopener noreferrer"
                         className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
                        <Linkedin className="w-4 h-4" /> LinkedIn
                      </a>
                    )}
                    {martinLang.email && (
                      <a href={`mailto:${martinLang.email}`}
                         className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
                        <Mail className="w-4 h-4" /> Kontakt
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-xl p-8 text-center my-12 border-2 border-orange-500/20">
          <h3 className="text-2xl font-bold mb-4">Copilot-Lernreise für Ihr Team starten</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Alle unsere Basic-Trainings sind als Lernreise buchbar: 4×2 Stunden über 4 Wochen, mit Praxisphasen und persönlicher Betreuung. Für Teams, die Copilot wirklich in ihren Arbeitsalltag integrieren wollen.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Lernreise anfragen
          </a>
        </div>
      </ContentLayout>
    </>
  );
};

export default CopilotLernreisen;

import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Zap, AlertTriangle, Users, Target, TrendingUp,
  ExternalLink, Linkedin, Mail, CheckCircle2, XCircle,
  Calendar, Clock, Brain, Route, BookOpen, GraduationCap,
  Lightbulb, Building2, UserCheck, BarChart3, Repeat, Timer
} from "lucide-react";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";

const SLUG = "spacing-effekt-copilot-training";
const PAGE_TITLE = "Spacing-Effekt: Warum Ihr Copilot-Training wissenschaftlich scheitert";

const SpacingEffektCopilotTraining = () => {
  const martinLang = getAuthor('martin-lang')!;

  const ids = generateSchemaIds(SLUG, 'wissen');
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const tableOfContents = [
    { id: "definition", title: "Was ist der Spacing-Effekt?", level: 2 },
    { id: "wissenschaft", title: "300 Studien, ein Ergebnis", level: 2 },
    { id: "vergessenskurve", title: "Die Vergessenskurve und Copilot-Trainings", level: 2 },
    { id: "praxis-szenarien", title: "Spacing-Effekt in der Praxis", level: 2 },
    { id: "implementierung", title: "So nutzen Sie den Spacing-Effekt", level: 2 },
    { id: "typische-fehler", title: "Typische Fehler bei KI-Trainings", level: 2 },
    { id: "entscheidungshilfe", title: "Entscheidungshilfe: Trainingsformat wählen", level: 2 },
    { id: "kernaussagen", title: "Kernaussagen für Entscheider", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
    { id: "quellen", title: "Quellen und Links", level: 2 }
  ];

  const faqs = [
    {
      name: "Was genau ist der Spacing-Effekt?",
      answer: "Der Spacing-Effekt beschreibt das wissenschaftlich belegte Phänomen, dass Lerninhalte besser im Langzeitgedächtnis verankert werden, wenn sie über mehrere zeitlich getrennte Sessions verteilt statt in einem kompakten Block vermittelt werden. Meta-Analysen zeigen: Verteiltes Lernen kann die Wissensretention um das 2- bis 3-fache steigern."
    },
    {
      name: "Gilt der Spacing-Effekt auch für Software-Trainings?",
      answer: "Ja, der Spacing-Effekt ist universell und gilt für alle Lernkontexte – von Vokabeln über Mathematik bis hin zu Software-Schulungen. Bei Copilot-Trainings ist er sogar besonders relevant, weil zwischen den Sessions echte Anwendung im Arbeitsalltag stattfindet, was den Transfer zusätzlich verstärkt."
    },
    {
      name: "Wie lang sollten die Abstände zwischen Lerneinheiten sein?",
      answer: "Die Forschung zeigt: Für Wissen, das über Wochen bis Monate behalten werden soll, sind Abstände von 1-2 Wochen zwischen den Sessions optimal. Bei Copilot-Trainings empfehlen wir wöchentliche Sessions, da dies Praxistransfer ermöglicht und gleichzeitig die Vergessenskurve effektiv abflacht."
    },
    {
      name: "Warum buchen trotzdem viele Unternehmen Tagesschulungen?",
      answer: "Tagesschulungen fühlen sich effizienter an – ein Tag blocken, Training abhaken. Diese Effizienz ist jedoch eine Illusion: Wenn nach einem Monat nur noch 10-20% des Gelernten abrufbar sind, war der vermeintlich effiziente Schulungstag ein teurer Fehlschlag. Die wahren Kosten zeigen sich in der mangelnden Nutzung der Copilot-Lizenzen."
    },
    {
      name: "Wie viel besser ist verteiltes Lernen wirklich?",
      answer: "Meta-Analysen über 800+ Studien zeigen konsistent: Verteiltes Lernen führt zu 2- bis 3-fach höherer Langzeitretention. Bei einer Tagesschulung bleiben nach 30 Tagen ca. 10-20% hängen, bei verteiltem Lernen mit wöchentlichen Sessions 60-80%. Das ist keine marginale Verbesserung, sondern ein fundamentaler Unterschied."
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": ids.article,
        "headline": PAGE_TITLE,
        "description": "Der Spacing-Effekt ist eines der am besten belegten Phänomene der Lernforschung. Erfahren Sie, warum klassische Copilot-Tagesschulungen wissenschaftlich zum Scheitern verurteilt sind.",
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
        title="Spacing-Effekt: Warum Ihr Copilot-Training wissenschaftlich scheitert | copilotenschule.de"
        description="Der Spacing-Effekt ist eines der am besten belegten Phänomene der Lernforschung. Erfahren Sie, warum klassische Copilot-Tagesschulungen zum Scheitern verurteilt sind."
        keywords={[
          "Spacing-Effekt",
          "Spaced Learning",
          "Copilot Training",
          "Vergessenskurve",
          "Ebbinghaus",
          "Microsoft 365 Copilot Schulung",
          "Verteiltes Lernen",
          "Langzeitretention",
          "Corporate Learning",
          "KI-Training Unternehmen",
          "Copilot Adoption",
          "Training Wissenschaft",
          "Lernforschung",
          "Copilot Enablement"
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
          { label: "Spacing-Effekt im Copilot-Training", href: `/wissen/${SLUG}` }
        ]}
        title={PAGE_TITLE}
        description="Der Spacing-Effekt ist eines der am besten belegten Phänomene der Lernforschung. Erfahren Sie, warum klassische Copilot-Tagesschulungen wissenschaftlich zum Scheitern verurteilt sind."
        lastUpdated="04. Februar 2026"
        readTime="10 Minuten"
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
              <strong>Der Spacing-Effekt ist wissenschaftlich belegt:</strong> Über 300 Studien zeigen, dass verteiltes Lernen zu 2-3× höherer Wissensretention führt als kompakte Einmal-Schulungen. Bei klassischen Copilot-Tagesschulungen sind nach einem Monat nur noch 10-20% des Gelernten abrufbar. Das ist kein Versagen der Teilnehmer – es ist die natürliche Funktionsweise des menschlichen Gehirns. Wer diese Erkenntnisse ignoriert, verbrennt Trainingsbudget.
            </p>
          </CardContent>
        </Card>

        {/* Sektion 0: Definition (PFLICHT nach Skill) */}
        <section id="definition">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-cyan-500 text-cyan-700 dark:text-cyan-400">
            Was ist der Spacing-Effekt?
          </h2>

          <Card className="mb-6 border-2 border-cyan-500/20">
            <CardHeader className="bg-gradient-to-r from-cyan-500/10 to-cyan-600/10">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Lightbulb className="w-5 h-5 text-cyan-600" />
                Definition
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-base leading-relaxed">
                Der <strong>Spacing-Effekt</strong> (auch Verteilungseffekt) beschreibt das Phänomen, dass Informationen besser im Langzeitgedächtnis verankert werden, wenn das Lernen über mehrere zeitlich getrennte Sessions verteilt statt in einem kompakten Block stattfindet. Der Effekt wurde erstmals 1885 von Hermann Ebbinghaus dokumentiert und ist heute eines der am besten replizierten Phänomene der kognitiven Psychologie. Für Copilot-Trainings bedeutet das: Ein 4×2-Stunden-Format über 4 Wochen führt zu signifikant besseren Ergebnissen als eine 8-stündige Tagesschulung.
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4 my-6">
            <Card className="border-l-4 border-l-red-500">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <XCircle className="w-6 h-6 text-red-600" />
                  <h4 className="font-semibold text-red-700 dark:text-red-400">Massed Practice (Geblockt)</h4>
                </div>
                <p className="text-sm text-muted-foreground">8 Stunden Copilot-Schulung an einem Tag. Fühlt sich effizient an, aber: Nach 30 Tagen sind nur noch 10-20% abrufbar.</p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                  <h4 className="font-semibold text-green-700 dark:text-green-400">Spaced Practice (Verteilt)</h4>
                </div>
                <p className="text-sm text-muted-foreground">4×2 Stunden über 4 Wochen verteilt. Gleicher Zeitaufwand, aber: Nach 30 Tagen sind 60-80% abrufbar.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Sektion 1: Wissenschaftliche Grundlagen */}
        <section id="wissenschaft" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-purple-500 text-purple-700 dark:text-purple-400">
            300 Studien, ein Ergebnis
          </h2>

          <p className="mb-6">
            Der Spacing-Effekt ist keine Theorie – er ist eines der am besten dokumentierten Phänomene der Lernforschung. Über 300 Studien allein im 20. Jahrhundert, Meta-Analysen mit über 800 Einzelstudien, Replikationen in unterschiedlichsten Kontexten: Die Evidenz ist überwältigend.
          </p>

          <Card className="my-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <GraduationCap className="w-5 h-5 text-purple-600" />
                Wissenschaftliche Evidenz
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    studie: "Cepeda et al. (2006)",
                    ergebnis: "Meta-Analyse: Verteiltes Lernen führt zu signifikant besserer Langzeitretention als Massed Practice",
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
                    ergebnis: "Information wird 2-3x besser behalten wenn Training über Zeit verteilt stattfindet",
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

          <Card className="my-6 border-2 border-purple-500/20">
            <CardHeader className="bg-gradient-to-r from-purple-500/10 to-purple-600/10">
              <CardTitle className="text-base">Warum funktioniert der Spacing-Effekt?</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Repeat className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Encoding Variability:</strong> Bei zeitlich getrennten Wiederholungen wird Information in verschiedenen Kontexten encodiert, was zu mehr Abrufpfaden führt.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Brain className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Retrieval Practice:</strong> Jede Session zwingt zum aktiven Abruf der vorherigen Inhalte – dieser Prozess stärkt die Gedächtnisspur.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Timer className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Konsolidierung:</strong> Das Gehirn braucht Zeit zwischen Lernsessions, um Informationen vom Kurzzeit- ins Langzeitgedächtnis zu überführen.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Sektion 2: Vergessenskurve */}
        <section id="vergessenskurve" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-red-500 text-red-700 dark:text-red-400">
            Die Vergessenskurve und Copilot-Trainings
          </h2>

          <p className="mb-6">
            Hermann Ebbinghaus entdeckte 1885 die Vergessenskurve: Frisch Gelerntes verschwindet erschreckend schnell aus dem Gedächtnis. Nach 20 Minuten sind nur noch 60% abrufbar, nach einem Tag 34%, nach sechs Tagen 23%. Diese Kurve gilt universell – auch für Ihre Copilot-Schulung.
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
                  { zeit: "20 Min.", behalten: "~60%" },
                  { zeit: "1 Stunde", behalten: "~45%" },
                  { zeit: "1 Tag", behalten: "~34%" },
                  { zeit: "6 Tage", behalten: "~23%" },
                  { zeit: "1 Monat", behalten: "~10-15%" }
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
            Was bedeutet das für eine 8-stündige Copilot-Tagesschulung? Am nächsten Morgen erinnern sich Ihre Mitarbeitenden an etwa ein Drittel der Inhalte. Nach einer Woche an weniger als ein Viertel. Nach einem Monat an nur noch 10-15%. Die restlichen 6–7 Stunden Schulung? Vergessen – nicht weil die Teilnehmenden nicht aufgepasst haben, sondern weil das menschliche Gehirn nicht dafür gebaut ist, 8 Stunden am Stück neues Wissen dauerhaft zu speichern.
          </p>

          <blockquote className="my-6 border-l-4 border-primary bg-primary/5 p-6 rounded-r-lg italic text-lg">
            Die Vergessenskurve ist keine Schwäche Ihrer Mitarbeiter – sie ist eine fundamentale Eigenschaft des menschlichen Gehirns. Trainingsformate, die sie ignorieren, sind zum Scheitern verurteilt.
          </blockquote>

          {/* Statistik-Grid */}
          <Card className="my-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart3 className="w-5 h-5 text-orange-600" />
                Zahlen, die jeder Entscheider kennen sollte
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    metric: "72%",
                    label: "kämpfen mit Alltags-Integration",
                    detail: "ohne strukturiertes Training",
                    quelle: "Gartner Survey 2024"
                  },
                  {
                    metric: "9h/Monat",
                    label: "Zeitersparnis pro Nutzer",
                    detail: "bei erfolgreicher Copilot-Adoption",
                    quelle: "Forrester TEI Study 2024"
                  },
                  {
                    metric: "77%",
                    label: "höhere Produktivität",
                    detail: "mit strukturiertem Onboarding",
                    quelle: "Microsoft Work Trend Index 2024"
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

        {/* Sektion 3: Praxis-Szenarien (PFLICHT: mind. 3) */}
        <section id="praxis-szenarien" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-blue-500 text-blue-700 dark:text-blue-400">
            Spacing-Effekt in der Praxis
          </h2>

          {/* Szenario 1 */}
          <Card className="my-6 border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Building2 className="w-5 h-5 text-blue-600" />
                Szenario 1: Der IT-Dienstleister
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium">Problem: 50 Berater sollen Copilot lernen, um Kunden besser zu unterstützen. Budget für maximal 8 Stunden Training pro Person.</p>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="font-semibold text-red-900 dark:text-red-100 mb-2">❌ Ohne Spacing-Effekt (Tagesschulung):</p>
                  <p className="text-sm text-red-800 dark:text-red-200">
                    Ein intensiver Schulungstag. Alle Copilot-Funktionen werden durchgearbeitet. Nach 4 Wochen: Die meisten Berater nutzen Copilot kaum, weil sie die spezifischen Anwendungsfälle vergessen haben. Kundenanfragen können nicht bedient werden.
                  </p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="font-semibold text-green-900 dark:text-green-100 mb-2">✓ Mit Spacing-Effekt (4×2 Stunden):</p>
                  <ul className="text-sm text-green-800 dark:text-green-200 space-y-2">
                    <li>• Woche 1: Grundlagen – Berater wenden Copilot sofort bei Kunden an</li>
                    <li>• Woche 2: Praxisfragen aus der ersten Woche werden geklärt</li>
                    <li>• Woche 3: Fortgeschrittene Funktionen mit echten Kundenszenarien</li>
                    <li>• Woche 4: Best Practices und individuelle Optimierung</li>
                    <li>• Nach 4 Wochen: 80% der Berater nutzen Copilot aktiv und kompetent</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Szenario 2 */}
          <Card className="my-6 border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="w-5 h-5 text-blue-600" />
                Szenario 2: Die Versicherung
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium">Problem: 200 Sachbearbeiter sollen Copilot für E-Mail-Bearbeitung und Dokumentenerstellung nutzen. Hoher Zeitdruck im Tagesgeschäft.</p>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="font-semibold text-red-900 dark:text-red-100 mb-2">❌ Ohne Spacing-Effekt (Tagesschulung):</p>
                  <p className="text-sm text-red-800 dark:text-red-200">
                    Ein Schulungstag pro Gruppe. Viele Features werden gezeigt, aber der Praxistransfer fehlt. Nach 2 Monaten: Nur 15% nutzen Copilot regelmäßig. Die Lizenzen werden als "zu teuer" kritisiert.
                  </p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="font-semibold text-green-900 dark:text-green-100 mb-2">✓ Mit Spacing-Effekt (4×2 Stunden):</p>
                  <ul className="text-sm text-green-800 dark:text-green-200 space-y-2">
                    <li>• Jede Session fokussiert auf einen konkreten Anwendungsfall</li>
                    <li>• Zwischen den Sessions: Anwendung im echten Tagesgeschäft</li>
                    <li>• Probleme werden in der nächsten Session besprochen</li>
                    <li>• Nach 2 Monaten: 70% nutzen Copilot täglich, Zeitersparnis messbar</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Szenario 3 */}
          <Card className="my-6 border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <UserCheck className="w-5 h-5 text-blue-600" />
                Szenario 3: Das Führungsteam
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium">Problem: 12 Geschäftsführer und Bereichsleiter sollen Copilot-Vorreiter werden. Sehr enge Kalender, wenig gemeinsame Zeit.</p>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="font-semibold text-red-900 dark:text-red-100 mb-2">❌ Ohne Spacing-Effekt (Tagesschulung):</p>
                  <p className="text-sm text-red-800 dark:text-red-200">
                    Der Schulungstag wird 3× verschoben, weil nie alle können. Am Ende nehmen nur 7 von 12 teil. Die anderen "holen es irgendwann nach" – was nie passiert. Copilot-Adoption im Unternehmen stockt.
                  </p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="font-semibold text-green-900 dark:text-green-100 mb-2">✓ Mit Spacing-Effekt (4×2 Stunden):</p>
                  <ul className="text-sm text-green-800 dark:text-green-200 space-y-2">
                    <li>• 2-Stunden-Slots passen in fast jeden Führungskräfte-Kalender</li>
                    <li>• Wer eine Session verpasst, holt nur 2 Stunden nach, nicht 8</li>
                    <li>• Führungskräfte wenden Copilot zwischen Sessions an und berichten</li>
                    <li>• Nach 4 Wochen: Alle 12 sind aktive Copilot-Nutzer und Vorbilder</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Sektion 4: Implementierung (PFLICHT) */}
        <section id="implementierung" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-orange-500 text-orange-700 dark:text-orange-400">
            So nutzen Sie den Spacing-Effekt
          </h2>

          <p className="mb-6">
            Den Spacing-Effekt zu nutzen bedeutet nicht einfach, eine Tagesschulung auf mehrere Tage zu verteilen. Es braucht ein durchdachtes Konzept, das die wissenschaftlichen Erkenntnisse gezielt umsetzt.
          </p>

          <div className="space-y-6 my-6">
            {[
              {
                phase: "Schritt 1: Optimale Abstände wählen",
                icon: <Calendar className="w-5 h-5" />,
                inhalte: [
                  "Für Wissen, das Wochen/Monate halten soll: 1-2 Wochen Abstand",
                  "Nicht zu kurz (kein Spacing-Effekt) und nicht zu lang (zu viel vergessen)",
                  "Wöchentliche Sessions haben sich für Copilot-Trainings bewährt"
                ]
              },
              {
                phase: "Schritt 2: Retrieval Practice einbauen",
                icon: <Brain className="w-5 h-5" />,
                inhalte: [
                  "Jede Session beginnt mit aktivem Abruf der vorherigen Inhalte",
                  "Nicht nur wiederholen, sondern aktiv erinnern lassen",
                  "Quiz, Diskussion, Praxisberichte – Hauptsache aktiver Abruf"
                ]
              },
              {
                phase: "Schritt 3: Praxistransfer erzwingen",
                icon: <Target className="w-5 h-5" />,
                inhalte: [
                  "Konkrete Aufgaben für die Zeit zwischen den Sessions",
                  "Echte Arbeitsaufgaben mit Copilot lösen, nicht Übungsszenarien",
                  "Erfahrungen in der nächsten Session teilen und besprechen"
                ]
              },
              {
                phase: "Schritt 4: Fokus pro Session",
                icon: <Lightbulb className="w-5 h-5" />,
                inhalte: [
                  "Jede Session hat ein klares Thema, nicht fünf halbe",
                  "Lieber weniger Inhalt, dafür richtig verstanden und angewendet",
                  "Zeit für Fragen und individuelle Anwendung einplanen"
                ]
              }
            ].map((p, idx) => (
              <Card key={idx} className="border-l-4 border-l-primary">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20">
                      {p.icon}
                    </span>
                    <CardTitle className="text-lg text-primary">
                      {p.phase}
                    </CardTitle>
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

        {/* Sektion 5: Typische Fehler (PFLICHT: mind. 3 mit Konsequenz) */}
        <section id="typische-fehler" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-amber-500 text-amber-700 dark:text-amber-400">
            Typische Fehler bei KI-Trainings
          </h2>

          <div className="space-y-4 my-6">
            {[
              {
                fehler: "Den Spacing-Effekt ignorieren",
                konsequenz: "Die meisten Unternehmen buchen Tagesschulungen, weil sie effizienter erscheinen. Das Ergebnis: 80-90% des Gelernten sind nach einem Monat vergessen. Die Lizenzkosten laufen, aber Copilot wird kaum genutzt.",
                icon: <XCircle className="w-5 h-5 text-red-600" />
              },
              {
                fehler: "Verteiltes Lernen ohne Praxisphasen",
                konsequenz: "Selbst wer Sessions verteilt, verschenkt Potenzial, wenn zwischen den Einheiten keine echte Anwendung stattfindet. Der Spacing-Effekt wirkt am stärksten, wenn Teilnehmer das Gelernte aktiv nutzen.",
                icon: <XCircle className="w-5 h-5 text-red-600" />
              },
              {
                fehler: "Zu viel Inhalt pro Session",
                konsequenz: "Zwei Stunden sind kein komprimierter Schulungstag. Wer zu viele Themen in eine Session packt, überfordert das Arbeitsgedächtnis und verhindert tiefes Verständnis.",
                icon: <XCircle className="w-5 h-5 text-red-600" />
              },
              {
                fehler: "Keinen aktiven Abruf einbauen",
                konsequenz: "Sessions ohne Rückbezug auf vorherige Inhalte verspielen den Kern des Spacing-Effekts. Das Gehirn muss aktiv erinnern, nicht nur passiv wiederholen.",
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

        {/* Sektion 6: Entscheidungshilfe (PFLICHT) */}
        <section id="entscheidungshilfe" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-indigo-500 text-indigo-700 dark:text-indigo-400">
            Entscheidungshilfe: Trainingsformat wählen
          </h2>

          <p className="mb-6">
            Die Wissenschaft ist eindeutig: Für nachhaltigen Kompetenzaufbau ist verteiltes Lernen überlegen. Aber es gibt Situationen, in denen ein kompaktes Format Sinn ergibt.
          </p>

          <Card className="my-6 border-2 border-indigo-500/20">
            <CardHeader className="bg-gradient-to-r from-indigo-500/10 to-indigo-600/10">
              <CardTitle className="text-base">Vergleich: Massed Practice vs. Spaced Practice</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2">
                      <th className="text-left py-2 pr-4 font-semibold">Kriterium</th>
                      <th className="text-center py-2 px-4 font-semibold text-red-600">Massed (1 Tag)</th>
                      <th className="text-center py-2 pl-4 font-semibold text-green-600">Spaced (4×2h)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { kriterium: "Wissenserhalt nach 30 Tagen", massed: "10–20%", spaced: "60–80%" },
                      { kriterium: "Praxistransfer", massed: "Minimal", spaced: "Hoch" },
                      { kriterium: "Kalender-Kompatibilität", massed: "Schwierig", spaced: "Einfach" },
                      { kriterium: "Verhaltensänderung", massed: "Unwahrscheinlich", spaced: "Wahrscheinlich" },
                      { kriterium: "Kosten pro Stunde", massed: "Gleich", spaced: "Gleich" },
                      { kriterium: "Effektiver ROI", massed: "Niedrig", spaced: "Hoch" }
                    ].map((row, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="py-3 pr-4 font-medium">{row.kriterium}</td>
                        <td className="py-3 px-4 text-center text-red-600">{row.massed}</td>
                        <td className="py-3 pl-4 text-center text-green-600 font-medium">{row.spaced}</td>
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
                  <h5 className="font-semibold text-orange-600 mb-2">Kompaktes Format passt, wenn:</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Reiner Impuls oder Demo ohne Adoption-Ziel</li>
                    <li>• Einmalige Sensibilisierung für Entscheider</li>
                    <li>• Kick-off vor einem verteilten Programm</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-green-600 mb-2">Verteiltes Format ist Pflicht, wenn:</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Nachhaltige Verhaltensänderung das Ziel ist</li>
                    <li>• Copilot in den Arbeitsalltag integriert werden soll</li>
                    <li>• ROI aus den Lizenzkosten maximiert werden soll</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Kernaussagen für Entscheider (PFLICHT: exakt 3 Bulletpoints) */}
        <section id="kernaussagen" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-emerald-500 text-emerald-700 dark:text-emerald-400">
            Kernaussagen für Entscheider
          </h2>

          <Card className="my-6 border-2 border-emerald-500/20">
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold text-emerald-700 dark:text-emerald-400 mb-2">Faktische Kernaussage</h4>
                  <p className="text-sm">Der Spacing-Effekt ist eines der am besten belegten Phänomene der Lernforschung: Über 300 Studien und Meta-Analysen zeigen konsistent, dass verteiltes Lernen zu 2-3× höherer Langzeitretention führt als kompakte Einmal-Schulungen.</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold text-emerald-700 dark:text-emerald-400 mb-2">Praktische Konsequenz</h4>
                  <p className="text-sm">Ein Copilot-Training im 4×2-Stunden-Format über 4 Wochen führt bei gleichem Zeitaufwand zu deutlich besseren Ergebnissen als eine Tagesschulung. Gartner-Daten zeigen: 72% der Nutzer kämpfen ohne strukturiertes Training mit der Alltags-Integration.</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold text-emerald-700 dark:text-emerald-400 mb-2">Typischer Fehler</h4>
                  <p className="text-sm">Unternehmen buchen Tagesschulungen, weil sie effizienter erscheinen. Sie ignorieren damit 140 Jahre Lernforschung und verspielen 80-90% ihres Trainingsbudgets – das Wissen ist nach einem Monat vergessen.</p>
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
            Wissenschaftliche Grundlagen und Studien zum Spacing-Effekt.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                titel: "Ebbinghaus: Über das Gedächtnis (1885)",
                beschreibung: "Grundlagenwerk zur Vergessenskurve – repliziert von Murre & Dros (2015)",
                url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4492928/"
              },
              {
                titel: "Cepeda et al.: Distributed Practice (2006)",
                beschreibung: "Wegweisende Meta-Analyse zum Spacing-Effekt (Psychological Bulletin)",
                url: "https://www.researchgate.net/publication/290511665_Spaced_Repetition_Promotes_Efficient_and_Effective_Learning_Policy_Implications_for_Instruction"
              },
              {
                titel: "Gartner: Copilot Impact Assessment 2024",
                beschreibung: "72% kämpfen mit Alltags-Integration, 57% sinkendes Engagement",
                url: "https://www.gartner.com/en/documents/5659223"
              },
              {
                titel: "Forrester TEI Study: Microsoft 365 Copilot",
                beschreibung: "ROI-Studie: 132–353% ROI, 9 Stunden Zeitersparnis pro Monat",
                url: "https://tei.forrester.com/go/microsoft/M365Copilot/?lang=en-us"
              },
              {
                titel: "Microsoft Work Trend Index 2024",
                beschreibung: "77% höhere Produktivität bei strukturiertem Copilot-Onboarding",
                url: "https://www.microsoft.com/en-us/worklab/work-trend-index"
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
          <h3 className="text-2xl font-bold mb-4">Copilot-Training mit Spacing-Effekt</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Alle unsere Trainings nutzen den Spacing-Effekt: 4×2 Stunden über 4 Wochen, mit Praxisphasen und aktivem Abruf. Wissenschaftlich fundiert, für nachhaltige Ergebnisse.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Training anfragen
          </a>
        </div>
      </ContentLayout>
    </>
  );
};

export default SpacingEffektCopilotTraining;

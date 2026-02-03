import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Zap, AlertTriangle, TrendingUp, Users, Target,
  ExternalLink, Linkedin, Mail, CheckCircle2, XCircle,
  Rocket, Clock, Brain, BarChart3, MessageSquare, Calendar
} from "lucide-react";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";

const SLUG = "teams-mit-copilot-starten-2026";
const PAGE_TITLE = "Warum Sie 2026 unbedingt mit Microsoft 365 Copilot in Teams starten sollten";

const CopilotTeamsStart2026 = () => {
  const martinLang = getAuthor('martin-lang')!;

  const ids = generateSchemaIds(SLUG, 'wissen');
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const tableOfContents = [
    { id: "definition", title: "Definition: Copilot in Teams", level: 2 },
    { id: "zahlen-januar-2026", title: "Die Zahlen: Januar 2026", level: 2 },
    { id: "praxis-szenarien", title: "Praxis-Szenarien: Wo Teams + Copilot Mehrwert schafft", level: 2 },
    { id: "implementierung", title: "Implementierung: Der richtige Start", level: 2 },
    { id: "typische-fehler", title: "Typische Fehler vermeiden", level: 2 },
    { id: "kernaussagen", title: "Kernaussagen für Entscheider", level: 2 },
    { id: "entscheidungshilfe", title: "Entscheidungshilfe: Jetzt starten?", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
    { id: "quellen", title: "Quellen und Links", level: 2 }
  ];

  const faqs = [
    {
      name: "Unsere Mitarbeiter nutzen Teams schon, aber kaum jemand versteht Copilot – wie schaffen wir den Einstieg?",
      answer: "Der Schlüssel liegt im strukturierten Onboarding. Laut Gartner kämpfen 72% der Nutzer damit, Copilot in ihren Alltag zu integrieren. Die copilotenschule.de bietet praxisnahe Trainings, die direkt an den täglichen Teams-Workflows ansetzen: Meeting-Zusammenfassungen, Chat-Suche, Aufgaben-Generierung. Starten Sie mit einem Pilotteam und konkreten Use Cases statt flächendeckendem Rollout."
    },
    {
      name: "Lohnt sich die Investition in Copilot wirklich – oder ist das nur ein Hype?",
      answer: "Die Forrester TEI-Studie (Juli 2025) projiziert für Microsoft Teams mit Copilot einen ROI von bis zu 408% bei High-Impact-Szenarien. Microsoft meldete im Januar 2026: 15 Millionen bezahlte Copilot-Seats mit 160% Wachstum gegenüber dem Vorjahr. Die Frage ist nicht ob, sondern wie schnell. Satya Nadella: 'We have moved past the initial phase of discovery and are entering a phase of widespread diffusion.'"
    },
    {
      name: "Wie überzeugen wir das Management, in Copilot zu investieren?",
      answer: "Nutzen Sie die aktuellen Zahlen: 15 Millionen Unternehmen zahlen bereits für M365 Copilot. Die täglichen aktiven Nutzer sind laut Microsoft um das 10-fache gegenüber dem Vorjahr gestiegen. Forrester projiziert $98,7 Millionen NPV bei großen Implementierungen. Präsentieren Sie einen konkreten Business Case mit 2-3 messbaren Use Cases aus Ihrem Unternehmen."
    },
    {
      name: "Was unterscheidet erfolgreiche Copilot-Einführungen von gescheiterten?",
      answer: "Laut Gartner schaffen nur 6% der Unternehmen den Sprung vom Pilot zum unternehmensweiten Rollout. Die erfolgreichen 6% haben gemeinsam: CEO-Ownership, strukturiertes Training (nicht nur Tool-Bereitstellung), klare Governance-Richtlinien und messbare KPIs. Die copilotenschule.de begleitet Sie durch alle diese Phasen."
    },
    {
      name: "Wann ist der richtige Zeitpunkt zum Starten – sollten wir noch warten?",
      answer: "Satya Nadella sagte im Januar 2026: 'We are still in the opening miles of a marathon.' Aber: Die Early Adopter haben bereits einen Vorsprung. 160% Wachstum bei Copilot-Seats zeigt: Wer jetzt nicht startet, fällt zurück. Empfehlung: Starten Sie mit einem Pilotteam in Q1 2026 und skalieren Sie basierend auf gemessenen Ergebnissen."
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": ids.article,
        "headline": PAGE_TITLE,
        "description": "Warum 2026 der richtige Zeitpunkt ist, mit Microsoft 365 Copilot in Teams zu starten. Mit aktuellen Zahlen von Januar 2026, Satya Nadella-Zitaten und ROI-Prognosen.",
        "author": getAuthorSchemaMarkup(martinLang),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization"
        },
        "datePublished": "2026-02-03",
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
        title="Warum Sie 2026 mit Microsoft 365 Copilot in Teams starten sollten | copilotenschule.de"
        description="Aktuelle Zahlen Januar 2026: 15 Mio. Copilot-Seats, 160% Wachstum, bis zu 408% ROI. Warum jetzt der richtige Zeitpunkt ist – mit Satya Nadella-Zitaten und Praxis-Szenarien."
        keywords={[
          "Microsoft Teams Copilot 2026",
          "Copilot starten",
          "Microsoft 365 Copilot ROI",
          "Teams Meeting Zusammenfassung",
          "Copilot Einführung Unternehmen",
          "Microsoft Copilot Training",
          "Satya Nadella Copilot",
          "Copilot Adoption",
          "Teams KI Assistent",
          "Microsoft 365 KI",
          "Copilot Business Case",
          "Forrester Copilot ROI"
        ]}
        canonicalUrl={pageUrl}
        schema={schema}
        author={martinLang}
        publishedTime="2026-02-03T10:00:00+01:00"
        modifiedTime="2026-02-03T10:00:00+01:00"
      />

      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "Teams + Copilot 2026", href: `/wissen/${SLUG}` }
        ]}
        title={PAGE_TITLE}
        description="Aktuelle Zahlen, verifizierte Zitate und konkrete Handlungsempfehlungen für Ihre Copilot-Einführung in Microsoft Teams."
        lastUpdated="03. Februar 2026"
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
              <strong>Jetzt ist der Zeitpunkt.</strong> Microsoft meldete im Januar 2026: 15 Millionen bezahlte Copilot-Seats, 160% Wachstum gegenüber dem Vorjahr. CEO Satya Nadella: <em>"We have moved past the initial phase of discovery and are entering a phase of widespread diffusion."</em> Forrester projiziert bis zu 408% ROI für Teams mit Copilot. Die Frage ist nicht mehr ob, sondern wie schnell Sie starten.
            </p>
          </CardContent>
        </Card>

        {/* Sektion 1: Definition */}
        <section id="definition">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-blue-500 text-blue-700 dark:text-blue-400">
            Definition: Was Copilot in Microsoft Teams kann
          </h2>

          <p className="mb-6">
            Microsoft 365 Copilot in Teams ist ein KI-Assistent, der direkt in Ihre tägliche Kommunikation integriert ist. Er fasst Meetings zusammen, beantwortet Fragen zu vergangenen Gesprächen, generiert Aufgaben aus Diskussionen und hilft beim Verfassen von Nachrichten – alles ohne die Teams-Oberfläche zu verlassen.
          </p>

          <Card className="my-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                Copilot-Funktionen in Teams (Stand Februar 2026)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    funktion: "Meeting-Zusammenfassung",
                    beschreibung: "Automatische Protokolle, Aktionspunkte und Entscheidungen aus jedem Meeting",
                    icon: Calendar
                  },
                  {
                    funktion: "Chat-Suche & Kontext",
                    beschreibung: "Fragen wie 'Was wurde zu Projekt X besprochen?' – Copilot durchsucht alle relevanten Chats",
                    icon: MessageSquare
                  },
                  {
                    funktion: "Aufgaben-Generierung",
                    beschreibung: "Aus Meeting-Notizen werden automatisch Aufgaben für Planner oder To-Do erstellt",
                    icon: CheckCircle2
                  },
                  {
                    funktion: "Nachrichten-Entwürfe",
                    beschreibung: "Hilfe beim Formulieren von Nachrichten, Anpassung von Tonalität und Länge",
                    icon: Brain
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 border rounded-lg">
                    <item.icon className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">{item.funktion}</div>
                      <p className="text-sm text-muted-foreground mt-1">{item.beschreibung}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <blockquote className="my-6 border-l-4 border-blue-500 bg-blue-500/5 p-6 rounded-r-lg text-lg">
            <p className="italic mb-2">
              "These new agents systems, M365 Copilot, GitHub Copilot, Security Copilot, all coming together to compound the benefits of all the data and all the deployment, I think, is probably the most transformative effect right now."
            </p>
            <p className="text-sm text-muted-foreground mt-3">
              — Satya Nadella, Microsoft Q2 FY2026 Earnings Call, 28. Januar 2026
            </p>
          </blockquote>
        </section>

        {/* Sektion 2: Zahlen Januar 2026 */}
        <section id="zahlen-januar-2026" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-green-500 text-green-700 dark:text-green-400">
            Die Zahlen: Was Microsoft im Januar 2026 bekanntgab
          </h2>

          <p className="mb-6">
            Am 28. Januar 2026 veröffentlichte Microsoft seine Q2 FY2026 Ergebnisse. Die Copilot-Zahlen zeigen: Die Adoption beschleunigt sich massiv.
          </p>

          <Card className="my-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Microsoft Copilot: Offizielle Zahlen (Q2 FY2026)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    metric: "15 Mio.",
                    label: "bezahlte M365 Copilot Seats",
                    detail: "+160% gegenüber Vorjahr",
                    color: "green",
                    quelle: "Microsoft Q2 FY2026 Earnings"
                  },
                  {
                    metric: "10x",
                    label: "tägliche aktive Nutzer",
                    detail: "Gegenüber Vorjahr",
                    color: "blue",
                    quelle: "Microsoft Q2 FY2026 Earnings"
                  },
                  {
                    metric: "4,7 Mio.",
                    label: "GitHub Copilot Abonnenten",
                    detail: "+75% gegenüber Vorjahr",
                    color: "purple",
                    quelle: "Microsoft Q2 FY2026 Earnings"
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

          <blockquote className="my-6 border-l-4 border-green-500 bg-green-500/5 p-6 rounded-r-lg text-lg">
            <p className="italic mb-2">
              "We are only at the beginning phases of AI diffusion and already Microsoft has built an AI business that is larger than some of our biggest franchises."
            </p>
            <p className="text-sm text-muted-foreground mt-3">
              — Satya Nadella, Microsoft Q2 FY2026 Earnings Call, 28. Januar 2026
            </p>
          </blockquote>

          <Card className="my-6 border-2 border-emerald-500/20">
            <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-emerald-600/10">
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart3 className="w-5 h-5 text-emerald-600" />
                Forrester ROI-Prognose: Microsoft Teams mit Copilot
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    szenario: "High Impact",
                    roi: "408%",
                    npv: "$98,7 Mio.",
                    color: "green"
                  },
                  {
                    szenario: "Medium Impact",
                    roi: "243%",
                    npv: "$58,8 Mio.",
                    color: "blue"
                  },
                  {
                    szenario: "Low Impact",
                    roi: "122%",
                    npv: "$29,4 Mio.",
                    color: "amber"
                  }
                ].map((item, idx) => (
                  <div key={idx} className={`p-4 border rounded-lg text-center`}>
                    <div className="text-sm text-muted-foreground mb-2">{item.szenario}</div>
                    <div className={`text-3xl font-bold text-${item.color}-600`}>{item.roi}</div>
                    <div className="text-sm mt-1">ROI (3 Jahre)</div>
                    <div className="text-xs text-muted-foreground mt-2">NPV: {item.npv}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4 text-center">
                Quelle: Forrester TEI Study "Microsoft Teams with Microsoft 365 Copilot", Juli 2025
              </p>
            </CardContent>
          </Card>

          <blockquote className="my-6 border-l-4 border-primary bg-primary/5 p-6 rounded-r-lg text-lg">
            <p className="italic mb-2">
              "We have moved past the initial phase of discovery and are entering a phase of widespread diffusion."
            </p>
            <p className="text-sm text-muted-foreground mt-3">
              — Satya Nadella, Blog "Looking Ahead to 2026", 2. Januar 2026
            </p>
          </blockquote>
        </section>

        {/* Sektion 3: Praxis-Szenarien */}
        <section id="praxis-szenarien" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-orange-500 text-orange-700 dark:text-orange-400">
            Praxis-Szenarien: Wo Teams + Copilot echten Mehrwert schafft
          </h2>

          {/* Szenario 1 */}
          <Card className="my-6 border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Szenario 1: Meeting-Nachbereitung automatisieren
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="font-semibold text-red-900 dark:text-red-100 mb-2">❌ Ohne Copilot:</p>
                  <p className="text-sm text-red-800 dark:text-red-200">
                    Projektleiter verbringt 30 Minuten nach jedem Meeting damit, Notizen zu strukturieren, Aufgaben zu verteilen und Protokolle zu versenden. Bei 5 Meetings pro Woche: 10+ Stunden pro Monat.
                  </p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="font-semibold text-green-900 dark:text-green-100 mb-2">✓ Mit Copilot:</p>
                  <ul className="text-sm text-green-800 dark:text-green-200 space-y-2">
                    <li>• Automatische Zusammenfassung sofort nach Meeting-Ende</li>
                    <li>• Aktionspunkte werden erkannt und Personen zugeordnet</li>
                    <li>• Ein Klick: Aufgaben in Planner erstellen</li>
                    <li>• Zeitersparnis: 4x schneller (laut Microsoft Work Trend Index)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Szenario 2 */}
          <Card className="my-6 border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                Szenario 2: Informationen in Chats wiederfinden
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="font-semibold text-red-900 dark:text-red-100 mb-2">❌ Ohne Copilot:</p>
                  <p className="text-sm text-red-800 dark:text-red-200">
                    "Wo war nochmal die Entscheidung zum Budget?" – 15 Minuten Scrollen durch Chat-Verläufe, mehrere Kanäle durchsuchen, am Ende trotzdem unsicher.
                  </p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="font-semibold text-green-900 dark:text-green-100 mb-2">✓ Mit Copilot:</p>
                  <ul className="text-sm text-green-800 dark:text-green-200 space-y-2">
                    <li>• Frage: "Was wurde letzte Woche zum Q2-Budget besprochen?"</li>
                    <li>• Copilot durchsucht alle relevanten Chats und Meetings</li>
                    <li>• Antwort mit Zusammenfassung und Links zu Originalquellen</li>
                    <li>• Zeitersparnis: 29% schneller bei Suche und Zusammenfassung</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Szenario 3 */}
          <Card className="my-6 border-l-4 border-l-purple-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="w-5 h-5 text-purple-600" />
                Szenario 3: Neue Mitarbeiter schneller einarbeiten
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="font-semibold text-red-900 dark:text-red-100 mb-2">❌ Ohne Copilot:</p>
                  <p className="text-sm text-red-800 dark:text-red-200">
                    Neue Mitarbeiter fragen ständig nach: "Wie machen wir das hier?" – Kollegen unterbrechen ihre Arbeit, um Kontext zu erklären, der längst in Chats und Meetings dokumentiert ist.
                  </p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="font-semibold text-green-900 dark:text-green-100 mb-2">✓ Mit Copilot:</p>
                  <ul className="text-sm text-green-800 dark:text-green-200 space-y-2">
                    <li>• Neuer Mitarbeiter fragt Copilot: "Wie läuft das Release-Management?"</li>
                    <li>• Copilot fasst relevante Diskussionen und Entscheidungen zusammen</li>
                    <li>• Verweist auf die richtigen Dokumente und Ansprechpartner</li>
                    <li>• Reduziert Onboarding-Zeit und entlastet das Team</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Sektion 4: Implementierung */}
        <section id="implementierung" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-cyan-500 text-cyan-700 dark:text-cyan-400">
            Implementierung: Der richtige Start in 2026
          </h2>

          <p className="mb-6">
            Die Zahlen von Gartner zeigen: 72% der Nutzer kämpfen damit, Copilot in ihren Alltag zu integrieren. Nur 6% schaffen den Sprung vom Pilot zum unternehmensweiten Rollout. Ein strukturierter Ansatz ist entscheidend.
          </p>

          <div className="space-y-6 my-6">
            {[
              {
                phase: "Phase 1: Pilotteam starten",
                zeitraum: "Woche 1-4",
                dauer: "4 Wochen",
                farbe: "blue",
                inhalte: [
                  "5-10 Power-User aus Teams-affinen Abteilungen identifizieren",
                  "Copilot-Lizenzen zuweisen und Governance-Richtlinien definieren",
                  "Strukturiertes Onboarding mit konkreten Use Cases",
                  "Wöchentliche Feedback-Runden etablieren"
                ]
              },
              {
                phase: "Phase 2: Messen und Optimieren",
                zeitraum: "Woche 5-12",
                dauer: "8 Wochen",
                farbe: "cyan",
                inhalte: [
                  "Nutzungsmetriken erfassen: Wie oft wird Copilot verwendet?",
                  "Zeitersparnis dokumentieren (Meeting-Protokolle, Chat-Suche)",
                  "Best Practices aus dem Pilotteam sammeln",
                  "Training-Material für breiteren Rollout erstellen"
                ]
              },
              {
                phase: "Phase 3: Skalieren",
                zeitraum: "Ab Woche 13",
                dauer: "Fortlaufend",
                farbe: "green",
                inhalte: [
                  "Rollout auf weitere Abteilungen basierend auf Pilot-Ergebnissen",
                  "Champions-Programm: Pilotnutzer schulen Kollegen",
                  "Kontinuierliches Training und neue Feature-Updates kommunizieren",
                  "ROI messen und an Management berichten"
                ]
              }
            ].map((p, idx) => (
              <Card key={idx} className={`border-l-4 border-l-${p.farbe}-500`}>
                <CardHeader className={`bg-gradient-to-r from-${p.farbe}-500/10 to-${p.farbe}-600/5`}>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <CardTitle className={`text-lg text-${p.farbe}-700 dark:text-${p.farbe}-400`}>
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
                        <CheckCircle2 className={`w-4 h-4 text-${p.farbe}-600 mt-0.5 flex-shrink-0`} />
                        {i}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Sektion 5: Typische Fehler */}
        <section id="typische-fehler" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-red-500 text-red-700 dark:text-red-400">
            Typische Fehler vermeiden
          </h2>

          <div className="space-y-4 my-6">
            {[
              {
                fehler: "Fehler 1: Tool bereitstellen ohne Training",
                beschreibung: "Lizenzen zuweisen und hoffen, dass Mitarbeiter Copilot selbst entdecken.",
                konsequenz: "72% kämpfen mit der Alltags-Integration (Gartner). Adoption bleibt gering, Lizenzen ungenutzt.",
                loesung: "Strukturiertes Onboarding mit konkreten Use Cases aus dem Arbeitsalltag der Nutzer."
              },
              {
                fehler: "Fehler 2: Flächendeckender Rollout ohne Pilot",
                beschreibung: "Alle Mitarbeiter gleichzeitig mit Copilot ausstatten.",
                konsequenz: "Nur 6% schaffen den unternehmensweiten Rollout erfolgreich (Gartner). Überforderung und Frustration.",
                loesung: "Mit 5-10 Power-Usern starten, lernen, dann skalieren."
              },
              {
                fehler: "Fehler 3: Keine Governance vor dem Start",
                beschreibung: "Copilot einführen ohne klare Richtlinien für Datenschutz und Nutzung.",
                konsequenz: "Mitarbeiter sind unsicher, was sie fragen dürfen. Compliance-Risiken entstehen.",
                loesung: "Vor dem Rollout: Klare Policy zu Daten, Vertraulichkeit und erlaubten Use Cases."
              }
            ].map((item, idx) => (
              <Card key={idx} className="border-l-4 border-l-red-500">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">{item.fehler}</h4>
                      <p className="text-sm mb-2">{item.beschreibung}</p>
                      <p className="text-sm text-muted-foreground mb-2"><strong>Konsequenz:</strong> {item.konsequenz}</p>
                      <p className="text-sm text-green-700 dark:text-green-400"><strong>✓ Besser:</strong> {item.loesung}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Sektion 6: Kernaussagen */}
        <section id="kernaussagen" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-indigo-500 text-indigo-700 dark:text-indigo-400">
            Kernaussagen für Entscheider
          </h2>

          <Card className="my-6 border-2 border-indigo-500/30 bg-gradient-to-br from-indigo-500/5 to-purple-500/5">
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="p-4 border-l-4 border-indigo-500 bg-white/50 dark:bg-black/20 rounded-r-lg">
                  <p className="font-bold text-indigo-700 dark:text-indigo-400 mb-2">1. Faktische Kernaussage</p>
                  <p className="mb-2">Microsoft 365 Copilot hat im Januar 2026 die 15-Millionen-Marke bei bezahlten Seats überschritten – ein Wachstum von 160% gegenüber dem Vorjahr. Die Phase der Early Adoption ist vorbei.</p>
                  <p className="text-sm text-muted-foreground"><strong>Praktische Konsequenz:</strong> Wer jetzt noch nicht gestartet ist, fällt gegenüber Wettbewerbern zurück, die bereits Erfahrungen sammeln.</p>
                  <p className="text-sm text-red-600 dark:text-red-400"><strong>Typischer Fehler:</strong> "Wir warten, bis die Technologie ausgereift ist" – die Diffusionsphase hat bereits begonnen.</p>
                </div>

                <div className="p-4 border-l-4 border-purple-500 bg-white/50 dark:bg-black/20 rounded-r-lg">
                  <p className="font-bold text-purple-700 dark:text-purple-400 mb-2">2. Faktische Kernaussage</p>
                  <p className="mb-2">Forrester projiziert für Microsoft Teams mit Copilot einen ROI von bis zu 408% im High-Impact-Szenario. Selbst im konservativen Low-Impact-Szenario liegt der ROI bei 122%.</p>
                  <p className="text-sm text-muted-foreground"><strong>Praktische Konsequenz:</strong> Der Business Case ist da – entscheidend ist die Umsetzungsqualität, nicht die Frage ob investiert werden soll.</p>
                  <p className="text-sm text-red-600 dark:text-red-400"><strong>Typischer Fehler:</strong> "Wir können den ROI nicht messen" – Forrester liefert das Framework, das Sie anwenden können.</p>
                </div>

                <div className="p-4 border-l-4 border-cyan-500 bg-white/50 dark:bg-black/20 rounded-r-lg">
                  <p className="font-bold text-cyan-700 dark:text-cyan-400 mb-2">3. Faktische Kernaussage</p>
                  <p className="mb-2">72% der Nutzer kämpfen mit der Alltags-Integration, nur 6% schaffen den Sprung vom Pilot zum unternehmensweiten Rollout. Training und strukturierte Einführung sind erfolgskritisch.</p>
                  <p className="text-sm text-muted-foreground"><strong>Praktische Konsequenz:</strong> Mindestens 20% des Copilot-Budgets sollten für Training und Change Management eingeplant werden.</p>
                  <p className="text-sm text-red-600 dark:text-red-400"><strong>Typischer Fehler:</strong> "Wir stellen die Lizenzen bereit, den Rest machen die Mitarbeiter selbst."</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Sektion 7: Entscheidungshilfe */}
        <section id="entscheidungshilfe" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-green-500 text-green-700 dark:text-green-400">
            Entscheidungshilfe: Sollten Sie jetzt starten?
          </h2>

          <Card className="my-6 border-2 border-green-500/20">
            <CardHeader className="bg-gradient-to-r from-green-500/10 to-green-600/10">
              <CardTitle className="text-base">Checkliste: Bereitschaft für Copilot in Teams</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-green-600 mb-3">✓ Starten Sie jetzt, wenn:</h5>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      Ihre Teams bereits aktiv Microsoft Teams nutzen
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      Sie 5-10 motivierte Power-User identifizieren können
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      Budget für Training (nicht nur Lizenzen) vorhanden ist
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      Führungskräfte das Projekt unterstützen
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      Sie bereit sind, 12 Wochen in einen strukturierten Pilot zu investieren
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-amber-600 mb-3">⚠ Erst Grundlagen schaffen, wenn:</h5>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      Teams-Nutzung im Unternehmen noch gering ist
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      Keine Ressourcen für begleitendes Training verfügbar
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      Datenschutz- und Compliance-Fragen noch ungeklärt sind
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      Management keinen Sponsor für das Projekt stellt
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <blockquote className="my-6 border-l-4 border-primary bg-primary/5 p-6 rounded-r-lg text-lg">
            <p className="italic mb-2">
              "What matters is not the power of any given model, but how people choose to apply it to achieve their goals."
            </p>
            <p className="text-sm text-muted-foreground mt-3">
              — Satya Nadella, Blog "Looking Ahead to 2026", 2. Januar 2026
            </p>
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
            Quellen und weiterführende Links
          </h2>
          <p className="text-muted-foreground mb-6">
            Alle Statistiken und Zitate in diesem Artikel sind direkt aus den Originalquellen entnommen und verifiziert.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                titel: "Microsoft Q2 FY2026 Earnings Call (28. Januar 2026)",
                beschreibung: "Offizielle Zahlen: 15 Mio. Copilot Seats, 160% YoY Wachstum, Nadella-Zitate",
                url: "https://www.microsoft.com/en-us/investor/events/fy-2026/earnings-fy-2026-q2"
              },
              {
                titel: "Satya Nadella: Looking Ahead to 2026 (2. Januar 2026)",
                beschreibung: "Blog-Post mit Zitat: 'We have moved past the initial phase of discovery...'",
                url: "https://www.theregister.com/2026/01/02/microsoft_ceo_satya_nadella_calls/"
              },
              {
                titel: "Forrester TEI: Microsoft Teams with Microsoft 365 Copilot",
                beschreibung: "ROI-Prognose: Bis zu 408% ROI, $98,7 Mio. NPV im High-Impact-Szenario",
                url: "https://tei.forrester.com/go/Microsoft/TeamsandCopilot/"
              },
              {
                titel: "Gartner: Copilot for Microsoft 365 Impact Assessment",
                beschreibung: "72% kämpfen mit Alltags-Integration, nur 6% schaffen unternehmensweiten Rollout",
                url: "https://www.gartner.com/en/documents/5659223"
              },
              {
                titel: "Microsoft Work Trend Index",
                beschreibung: "77% höhere Produktivität, 4x schnellere Meeting-Nachbereitung",
                url: "https://www.microsoft.com/en-us/worklab/work-trend-index/"
              },
              {
                titel: "CNBC: Microsoft Q2 Earnings Report 2026",
                beschreibung: "Unabhängige Berichterstattung zu den Earnings-Zahlen",
                url: "https://www.cnbc.com/2026/01/28/microsoft-msft-q2-earnings-report-2026.html"
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
          <h3 className="text-2xl font-bold mb-4">Bereit für den Start mit Copilot in Teams?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Die copilotenschule.de begleitet Sie von der Pilot-Phase bis zum unternehmensweiten Rollout. Mit praxisnahen Trainings, die direkt an Ihren Teams-Workflows ansetzen.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            <Rocket className="w-5 h-5 mr-2" />
            Jetzt Beratungsgespräch anfragen
          </a>
        </div>
      </ContentLayout>
    </>
  );
};

export default CopilotTeamsStart2026;

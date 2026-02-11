import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { TrustBadge } from "@/components/TrustBadge";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";
import {
  Zap, Brain, MessageSquare, Mail, Calendar, FileText,
  Search, Users, CheckCircle2, AlertTriangle, ExternalLink,
  Linkedin, Twitter, Lightbulb, Clock, Video, BookOpen,
  ListTodo, Target, XCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SLUG = "copilot-digitales-gedaechtnis";
const PAGE_TITLE = "Digitales Gedächtnis mit Microsoft Copilot";

const CopilotDigitalesGedaechtnis = () => {
  const author = getAuthor("martin-lang");

  const tableOfContents = [
    { id: "das-problem", title: "Das Problem: Zu viel auf einmal", level: 2 },
    { id: "wie-es-funktioniert", title: "Wie Copilot zum Gedächtnis wird", level: 2 },
    { id: "meetings-transkription", title: "Meetings: Nie wieder \"Was hatten wir gesagt?\"", level: 2 },
    { id: "emails-chats", title: "E-Mails & Chats: Kontext wiederfinden", level: 2 },
    { id: "kalender-onenote", title: "Kalender & OneNote: Alles verknüpft", level: 2 },
    { id: "praxis-prompts", title: "Meine 10 Lieblings-Prompts", level: 2 },
    { id: "typische-fehler", title: "Typische Fehler vermeiden", level: 2 },
    { id: "implementierung", title: "So richten Sie es ein", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
    { id: "quellen", title: "Quellen", level: 2 }
  ];

  const ids = generateSchemaIds(SLUG, 'wissen');
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const faqs = [
    {
      name: "Wie weit zurück kann Copilot sich erinnern?",
      answer: "Copilot durchsucht Ihre Microsoft 365-Daten der letzten Jahre – E-Mails, Chats, Meeting-Transkripte, Dokumente. Die genaue Reichweite hängt von Ihren Aufbewahrungsrichtlinien ab. In der Praxis finde ich Informationen von vor 2-3 Jahren problemlos wieder."
    },
    {
      name: "Kann Copilot auch private Gespräche durchsuchen?",
      answer: "Copilot hat Zugriff auf alle Daten, auf die Sie selbst Zugriff haben – also auch 1:1-Chats und persönliche E-Mails. Er teilt diese Informationen aber nie mit anderen. Jeder Nutzer sieht nur, was er auch manuell finden könnte."
    },
    {
      name: "Funktioniert das auch ohne Meeting-Transkription?",
      answer: "Ja, aber eingeschränkt. Ohne Transkription fehlt der wichtigste Baustein – die gesprochenen Inhalte Ihrer Meetings. E-Mails und Chats funktionieren trotzdem. Ich empfehle dringend, Transkription zu aktivieren."
    },
    {
      name: "Wie genau sind die Meeting-Zusammenfassungen?",
      answer: "Sehr genau, aber nicht perfekt. Copilot erfasst Kernpunkte und Entscheidungen zuverlässig. Bei Fachjargon oder Akzenten kann es Fehler geben. Ich überprüfe wichtige Punkte kurz gegen meine eigene Erinnerung."
    },
    {
      name: "Kann ich das auch für vergangene Projekte nutzen?",
      answer: "Absolut – das ist einer der größten Vorteile. Bei Projekten, die vor Monaten endeten, kann ich sofort den Kontext wiederherstellen: Wer war beteiligt, welche Entscheidungen wurden getroffen, welche Probleme gab es."
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": ids.article,
        "headline": "Digitales Gedächtnis mit Microsoft Copilot: Nie wieder vergessen",
        "description": "Wie ich Microsoft Copilot als externes Gedächtnis nutze – für Meeting-Zusagen, Entscheidungen und Projektdetails. Praktische Prompts und Erfahrungen aus dem Alltag.",
        "author": getAuthorSchemaMarkup(author),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization"
        },
        "datePublished": "2026-02-03",
        "dateModified": "2026-02-03",
        "keywords": ["Microsoft Copilot Gedächtnis", "Copilot Transkription", "Meeting-Zusammenfassung", "Copilot E-Mail Suche", "Copilot OneNote", "Digitales Gedächtnis"],
        "articleSection": "Praxisguide",
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
        title="Digitales Gedächtnis mit Microsoft Copilot: Nie wieder vergessen (2026)"
        description="Wie ich Microsoft Copilot als externes Gedächtnis nutze – für Meeting-Zusagen, Entscheidungen und Projektdetails. Praktische Prompts und Erfahrungen aus dem Alltag."
        keywords={["Microsoft Copilot Gedächtnis", "Copilot Transkription", "Meeting-Zusammenfassung", "Copilot E-Mail Suche", "Copilot OneNote", "Digitales Gedächtnis KI"]}
        canonicalUrl={pageUrl}
        author={author}
        publishedTime="2026-02-03"
        modifiedTime="2026-02-03T10:00:00+01:00"
        schema={schema}
      />
      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: PAGE_TITLE, href: `/${SLUG}` }
        ]}
        title="Digitales Gedächtnis mit Microsoft Copilot"
        description="Wie Copilot mir hilft, trotz ADHS, Multitasking und 20 parallelen Projekten nichts Wichtiges zu vergessen."
        lastUpdated="03. Februar 2026"
        readTime="14 Minuten"
        tableOfContents={tableOfContents}
      >
        {/* Schnellantwort */}
        <Card className="border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-amber-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-orange-600" />
              Schnellantwort
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base leading-relaxed">
              <strong>Microsoft Copilot als digitales Gedächtnis:</strong> Durch die Verknüpfung von Meeting-Transkripten,
              E-Mails, Chats, Kalendern und OneNote wird Copilot zu Ihrem persönlichen Assistenten, der sich an alles erinnert.
              Stellen Sie Fragen wie <em>"Was hatte ich für Projekt X zugesagt?"</em> oder <em>"Wie waren wir bei Entscheidung Y verblieben?"</em> –
              und Copilot findet die Antwort in Sekundenschnelle über alle Ihre Datenquellen hinweg.
            </p>
          </CardContent>
        </Card>

        {/* Persönliche Einleitung */}
        <div className="my-8 p-6 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl border border-blue-200 dark:border-blue-800">
          <p className="text-lg leading-relaxed mb-4">
            Ich werde dieses Jahr 50. Unglaublich, aber leider auch wahr.
          </p>
          <p className="leading-relaxed mb-4">
            Was das für mein Gedächtnis bedeutet? Nun ja. Dazu kommt: ADHS, das mir mein Leben lang treue Dienste geleistet hat
            beim Hyperfokussieren – aber eben auch beim Vergessen von allem anderen. Multitasking bis zum Umfallen.
            20 Stakeholder, die alle gestern etwas wollen. 15 Projekte gleichzeitig, jedes mit eigenen Deadlines,
            Entscheidungen und Zusagen.
          </p>
          <p className="leading-relaxed">
            Klingt bekannt? Dann ist dieser Artikel für Sie. Denn ich habe mir ein System gebaut – mit Microsoft Copilot als
            externalem Gedächtnis. Und es hat mein Arbeitsleben verändert.
          </p>
        </div>

        {/* Das Problem */}
        <section id="das-problem">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-red-500">
            Das Problem: Zu viel auf einmal
          </h2>

          <p className="my-6">
            Kennen Sie diese Momente? Sie sitzen im Meeting und jemand sagt: "Martin, du hattest doch zugesagt,
            das Konzept bis Freitag zu liefern." Und Sie denken: <em>Habe ich das? Welches Konzept? Welcher Freitag?</em>
          </p>

          <Card className="my-6 border-l-4 border-l-red-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                Die typischen Gedächtnis-Killer im modernen Arbeitsalltag
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { problem: "Zu viele Meetings", detail: "8-10 Meetings pro Tag, jedes mit eigenen Entscheidungen und Zusagen" },
                  { problem: "Context Switching", detail: "Alle 15 Minuten ein anderes Thema, Projekt, Stakeholder" },
                  { problem: "Informationsflut", detail: "150+ E-Mails, 50+ Teams-Nachrichten täglich" },
                  { problem: "Keine Dokumentation", detail: "Mündliche Absprachen verschwinden in der Erinnerung" }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800">
                    <p className="font-semibold text-red-900 dark:text-red-100">{item.problem}</p>
                    <p className="text-sm text-red-700 dark:text-red-300 mt-1">{item.detail}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <p className="my-6">
            Früher habe ich versucht, alles in Notizbücher zu schreiben. Dann in OneNote. Dann in To-Do-Apps.
            Das Problem: Ich vergesse nicht nur die Aufgaben – ich vergesse auch, wo ich sie aufgeschrieben habe.
          </p>

          <blockquote className="my-6 border-l-4 border-primary bg-primary/5 p-6 rounded-r-lg italic text-lg">
            Die Erfahrung zeigt: Das menschliche Arbeitsgedächtnis ist für den modernen Arbeitsalltag nicht gemacht.
            Wir brauchen Systeme, die sich für uns erinnern.
          </blockquote>
        </section>

        {/* Wie es funktioniert */}
        <section id="wie-es-funktioniert" className="mt-12">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-blue-500">
            Wie Copilot zum Gedächtnis wird
          </h2>

          <p className="my-6">
            Microsoft Copilot ist nicht einfach nur ein Chatbot. Er hat Zugriff auf Ihr gesamtes Microsoft 365-Universum:
            E-Mails, Chats, Meeting-Transkripte, Kalender, OneNote, Dokumente. Das nennt Microsoft "Grounding" –
            Copilot basiert seine Antworten auf Ihren echten Daten, nicht auf allgemeinem Wissen.
          </p>

          <Card className="my-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-600" />
                Die Bausteine Ihres digitalen Gedächtnisses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    icon: <Video className="w-8 h-8 text-purple-600" />,
                    titel: "Meeting-Transkripte",
                    detail: "Alles Gesprochene wird durchsuchbar",
                    color: "purple"
                  },
                  {
                    icon: <Mail className="w-8 h-8 text-blue-600" />,
                    titel: "E-Mails & Chats",
                    detail: "Schriftliche Kommunikation als Kontext",
                    color: "blue"
                  },
                  {
                    icon: <Calendar className="w-8 h-8 text-green-600" />,
                    titel: "Kalender & OneNote",
                    detail: "Termine, Notizen, Zusammenhänge",
                    color: "green"
                  }
                ].map((item, idx) => (
                  <div key={idx} className={`p-5 rounded-xl border-2 border-${item.color}-500/30 bg-gradient-to-br from-${item.color}-500/5 to-${item.color}-600/10 text-center`}>
                    <div className="flex justify-center mb-3">{item.icon}</div>
                    <div className="font-bold">{item.titel}</div>
                    <div className="text-sm text-muted-foreground mt-1">{item.detail}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <p className="my-6">
            Das Geniale: Ich muss nicht mehr wissen, <em>wo</em> ich etwas aufgeschrieben habe. Ich frage einfach Copilot.
            Er durchsucht alle Quellen gleichzeitig und liefert mir die Antwort – oft mit Verweis auf das Meeting oder
            die E-Mail, wo das Thema besprochen wurde.
          </p>
        </section>

        {/* Meetings & Transkription */}
        <section id="meetings-transkription" className="mt-12">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-purple-500">
            Meetings: Nie wieder "Was hatten wir gesagt?"
          </h2>

          <p className="my-6">
            Der größte Game-Changer für mich: Meeting-Transkription in Teams. Jedes Gespräch wird automatisch
            protokolliert – nicht nur Stichpunkte, sondern <strong>alles</strong>. Wer was gesagt hat, wann, in welchem Kontext.
          </p>

          <Card className="my-6 border-l-4 border-l-purple-500">
            <CardHeader>
              <CardTitle className="text-lg">Mein Workflow für jedes Meeting</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <p className="font-semibold">Transkription aktivieren</p>
                    <p className="text-sm text-muted-foreground">Am Anfang jedes Meetings: "Transkription starten" klicken, nachdem ich die Teilnehmer darüber informiert und ihre Erlaubnis eingeholt habe</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <p className="font-semibold">Automatische Zusammenfassung</p>
                    <p className="text-sm text-muted-foreground">Copilot erstellt am Ende: Kernpunkte, Aufgaben, Entscheidungen. Ich habe mir aber auch einen Agenten gebaut, der mit eigenem Schema die Transkripte so strukturiert wie ich das möchte und sauber in OneNote ablegt.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <p className="font-semibold">Später nachfragen</p>
                    <p className="text-sm text-muted-foreground">Im Copilot Chat in Teams, in der Copilot App, Copilot im Web oder in OneNote fragen was ich wissen muss. Auch Wochen später: "Was wurde im Projekt-Kickoff zu X beschlossen?"</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="my-8 p-6 bg-purple-50 dark:bg-purple-950/30 rounded-xl border border-purple-200 dark:border-purple-800">
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-purple-600" />
              Beispiel-Prompts für Meeting-Kontext
            </h4>
            <div className="space-y-3">
              {[
                "Was hatte ich im letzten Projekt-Meeting zugesagt zu liefern?",
                "Wer sollte den Vertragsentwurf reviewen und bis wann?",
                "Fasse mir das Budget-Meeting von letzter Woche zusammen",
                "Welche offenen Punkte gibt es aus dem Workshop mit dem Kunden?",
                "Was waren die Einwände gegen Variante B im Strategie-Meeting?"
              ].map((prompt, idx) => (
                <div key={idx} className="p-3 bg-white dark:bg-slate-800 rounded-lg font-mono text-sm border">
                  "{prompt}"
                </div>
              ))}
            </div>
          </div>

          <Card className="my-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="w-5 h-5 text-blue-600" />
                Was die Zahlen sagen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-5 border-2 border-blue-500/30 rounded-xl text-center bg-gradient-to-br from-blue-500/5 to-blue-600/10">
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">4x</div>
                  <div className="font-semibold mt-2">schneller</div>
                  <div className="text-sm text-muted-foreground mt-1">bei Meeting-Nachbereitung</div>
                  <div className="text-xs text-muted-foreground mt-2 italic">Quelle: Microsoft Work Trend Index</div>
                </div>
                <div className="p-5 border-2 border-green-500/30 rounded-xl text-center bg-gradient-to-br from-green-500/5 to-green-600/10">
                  <div className="text-4xl font-bold text-green-600 dark:text-green-400">9h</div>
                  <div className="font-semibold mt-2">Zeitersparnis/Monat</div>
                  <div className="text-sm text-muted-foreground mt-1">für trainierte Copilot-Nutzer</div>
                  <div className="text-xs text-muted-foreground mt-2 italic">Quelle: Forrester TEI Study</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* E-Mails & Chats */}
        <section id="emails-chats" className="mt-12">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-cyan-500">
            E-Mails & Chats: Kontext wiederfinden
          </h2>

          <p className="my-6">
            Laut Microsoft Work Trend Index verbringen Wissensarbeiter <strong>57% ihrer Zeit</strong> mit Kommunikation –
            E-Mails, Chats, Meetings. Das ist auch der Ort, wo die meisten Informationen verloren gehen.
          </p>

          <p className="mb-6">
            Mit Copilot kann ich diese Informationsflut durchsuchen wie eine Datenbank. Der Unterschied zur normalen Suche:
            Ich muss nicht das exakte Keyword kennen. Ich kann fragen wie ein Mensch.
          </p>

          <Card className="my-6 border-2 border-cyan-500/20">
            <CardHeader className="bg-gradient-to-r from-cyan-500/10 to-cyan-600/10">
              <CardTitle className="text-base flex items-center gap-2">
                <Mail className="w-5 h-5 text-cyan-600" />
                Normale Suche vs. Copilot-Suche
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-red-600 mb-3 flex items-center gap-2">
                    <XCircle className="w-4 h-4" /> Klassische Suche
                  </h5>
                  <ul className="text-sm space-y-2">
                    <li className="p-2 bg-red-50 dark:bg-red-950/30 rounded">Suche: "Budget Q3" → 500 Treffer</li>
                    <li className="p-2 bg-red-50 dark:bg-red-950/30 rounded">Manuelles Durchscrollen</li>
                    <li className="p-2 bg-red-50 dark:bg-red-950/30 rounded">Exaktes Keyword nötig</li>
                    <li className="p-2 bg-red-50 dark:bg-red-950/30 rounded">Kein Kontext-Verständnis</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Copilot-Suche
                  </h5>
                  <ul className="text-sm space-y-2">
                    <li className="p-2 bg-green-50 dark:bg-green-950/30 rounded">"Was war das finale Budget für Projekt Alpha?"</li>
                    <li className="p-2 bg-green-50 dark:bg-green-950/30 rounded">Direkte Antwort mit Quelle</li>
                    <li className="p-2 bg-green-50 dark:bg-green-950/30 rounded">Natürliche Sprache</li>
                    <li className="p-2 bg-green-50 dark:bg-green-950/30 rounded">Versteht Zusammenhänge</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="my-8 p-6 bg-cyan-50 dark:bg-cyan-950/30 rounded-xl border border-cyan-200 dark:border-cyan-800">
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Search className="w-5 h-5 text-cyan-600" />
              Beispiel-Prompts für E-Mail & Chat-Kontext
            </h4>
            <div className="space-y-3">
              {[
                "Suche mir die Adresse vom Offsite, das heute stattfindet",
                "Was war der letzte Stand zur Gehaltsverhandlung mit dem Bewerber?",
                "Hat mir jemand diese Woche etwas zu den Quartalszahlen geschickt?",
                "Fasse die E-Mail-Diskussion zum Lieferantenwechsel zusammen",
                "Welche Anhänge hat mir Thomas zum Thema DSGVO geschickt?"
              ].map((prompt, idx) => (
                <div key={idx} className="p-3 bg-white dark:bg-slate-800 rounded-lg font-mono text-sm border">
                  "{prompt}"
                </div>
              ))}
            </div>
          </div>

          <p className="my-6">
            Besonders praktisch: Copilot versteht auch zeitliche Bezüge. "Letzte Woche", "vor dem Urlaub",
            "im Januar" – das funktioniert alles. Ich muss nicht mehr überlegen, wann genau etwas war.
          </p>
        </section>

        {/* Kalender & OneNote */}
        <section id="kalender-onenote" className="mt-12">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-green-500">
            Kalender & OneNote: Alles verknüpft
          </h2>

          <p className="my-6">
            Der Kalender ist mehr als ein Terminplaner – er ist ein Kontext-Speicher. Copilot verknüpft Termine
            mit den zugehörigen E-Mails, Dokumenten und Meeting-Notizen.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-green-600" />
                  Kalender-Prompts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {[
                    "Bereite mich auf mein nächstes Meeting vor",
                    "Welche Termine habe ich diese Woche mit dem Vorstand?",
                    "Wann habe ich zuletzt mit dem Kunden gesprochen?",
                    "Finde einen freien Slot für ein 1-Stunden-Meeting mit Team A"
                  ].map((prompt, idx) => (
                    <li key={idx} className="p-2 bg-green-50 dark:bg-green-950/30 rounded font-mono">
                      "{prompt}"
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-indigo-500">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  OneNote-Prompts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {[
                    "Was steht in meinen Notizen zum Projekt Beta?",
                    "Fasse meine Workshop-Notizen von letztem Monat zusammen",
                    "Finde meine Checkliste für Go-Live-Aktivitäten",
                    "Welche Ideen hatte ich zum Thema Automatisierung notiert?"
                  ].map((prompt, idx) => (
                    <li key={idx} className="p-2 bg-indigo-50 dark:bg-indigo-950/30 rounded font-mono">
                      "{prompt}"
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <p className="my-6">
            Der Clou: Diese Quellen werden kombiniert. Wenn ich frage "Bereite mich auf das Meeting mit Kunde X vor",
            durchsucht Copilot nicht nur den Kalender, sondern auch alle vorherigen Meetings, E-Mails und
            Dokumente zu diesem Kunden.
          </p>
        </section>

        {/* Praxis-Prompts */}
        <section id="praxis-prompts" className="mt-12">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-amber-500">
            Meine 10 Lieblings-Prompts für das digitale Gedächtnis
          </h2>

          <p className="my-6">
            Nach einem Jahr intensiver Nutzung haben sich diese Prompts als besonders wertvoll herausgestellt.
            Ich nutze sie fast täglich:
          </p>

          <div className="space-y-4 my-8">
            {[
              {
                nr: 1,
                prompt: "Was hatte ich für Projekt [X] zugesagt zu machen?",
                kontext: "Findet Zusagen aus Meetings, E-Mails und Chats",
                icon: <ListTodo className="w-5 h-5" />
              },
              {
                nr: 2,
                prompt: "Wie waren wir bei der Entscheidungsfindung zu [Y] verblieben?",
                kontext: "Rekonstruiert Diskussionsverlauf und finales Ergebnis",
                icon: <Target className="w-5 h-5" />
              },
              {
                nr: 3,
                prompt: "Erstelle eine Taskliste für Projekt [Z] und füge, soweit bekannt, Verantwortliche und Due Dates hinzu",
                kontext: "Aggregiert Aufgaben aus allen Quellen",
                icon: <CheckCircle2 className="w-5 h-5" />
              },
              {
                nr: 4,
                prompt: "Wer waren alle Beteiligten am Thema [A] und was war deren Position?",
                kontext: "Erstellt Stakeholder-Übersicht mit Standpunkten",
                icon: <Users className="w-5 h-5" />
              },
              {
                nr: 5,
                prompt: "Was ist der aktuelle Status von [B] basierend auf den letzten Kommunikationen?",
                kontext: "Fasst aktuellen Stand zusammen",
                icon: <Search className="w-5 h-5" />
              },
              {
                nr: 6,
                prompt: "Welche offenen Punkte gibt es noch aus dem Workshop zu [C]?",
                kontext: "Findet unerledigte Action Items",
                icon: <AlertTriangle className="w-5 h-5" />
              },
              {
                nr: 7,
                prompt: "Bereite mich auf das Meeting mit [Person/Firma] vor – was sollte ich wissen?",
                kontext: "Erstellt Briefing aus Historie",
                icon: <Calendar className="w-5 h-5" />
              },
              {
                nr: 8,
                prompt: "Was waren die Hauptgründe für/gegen [Entscheidung D]?",
                kontext: "Rekonstruiert Pro/Contra-Argumente",
                icon: <Lightbulb className="w-5 h-5" />
              },
              {
                nr: 9,
                prompt: "Fasse alle Updates zu [Thema E] aus den letzten 2 Wochen zusammen",
                kontext: "Erstellt chronologisches Update-Protokoll",
                icon: <Clock className="w-5 h-5" />
              },
              {
                nr: 10,
                prompt: "Erstelle eine Timeline aller wichtigen Ereignisse zu Projekt [F]",
                kontext: "Visualisiert Projektverlauf",
                icon: <FileText className="w-5 h-5" />
              }
            ].map((item) => (
              <Card key={item.nr} className="border-l-4 border-l-amber-500">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold flex-shrink-0">
                      {item.nr}
                    </div>
                    <div className="flex-1">
                      <p className="font-mono text-sm bg-amber-50 dark:bg-amber-950/30 p-3 rounded-lg mb-2">
                        "{item.prompt}"
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        {item.icon}
                        {item.kontext}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Typische Fehler */}
        <section id="typische-fehler" className="mt-12">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-red-500">
            Typische Fehler vermeiden
          </h2>

          <p className="my-6">
            Nach vielen Experimenten weiß ich, was <em>nicht</em> funktioniert. Diese Fehler kosten Zeit und Nerven:
          </p>

          <div className="space-y-4 my-8">
            {[
              {
                fehler: "Transkription nicht aktivieren",
                konsequenz: "Ohne Transkription fehlt der wichtigste Baustein. Meetings bleiben unsichtbar für Copilot.",
                lösung: "Automatische Transkription für alle Meetings aktivieren (IT-Admin-Einstellung)"
              },
              {
                fehler: "Zu vage fragen",
                konsequenz: "\"Was war nochmal mit dem Projekt?\" liefert keine brauchbaren Ergebnisse.",
                lösung: "Spezifisch sein: Projektnamen, Zeiträume, beteiligte Personen nennen"
              },
              {
                fehler: "Ergebnisse nicht verifizieren",
                konsequenz: "Copilot kann sich irren oder wichtige Details auslassen.",
                lösung: "Bei kritischen Entscheidungen immer die Quelle checken (Copilot zeigt Referenzen)"
              },
              {
                fehler: "Nur eine Quelle nutzen",
                konsequenz: "Wer nur in Teams fragt, verpasst E-Mail-Kontext und umgekehrt.",
                lösung: "Microsoft 365 Chat nutzen – durchsucht alle Quellen gleichzeitig"
              },
              {
                fehler: "Datenschutz ignorieren",
                konsequenz: "Vertrauliche Infos könnten versehentlich in Copilot-Antworten für andere auftauchen.",
                lösung: "Copilot respektiert Berechtigungen, aber Sensibilisierung bleibt wichtig"
              }
            ].map((item, idx) => (
              <Card key={idx} className="border-l-4 border-l-red-500">
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
                      <p className="font-semibold text-red-900 dark:text-red-100 flex items-center gap-2">
                        <XCircle className="w-4 h-4" /> Fehler: {item.fehler}
                      </p>
                      <p className="text-sm text-red-700 dark:text-red-300 mt-1">{item.konsequenz}</p>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
                      <p className="font-semibold text-green-900 dark:text-green-100 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> Lösung:
                      </p>
                      <p className="text-sm text-green-700 dark:text-green-300 mt-1">{item.lösung}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Implementierung */}
        <section id="implementierung" className="mt-12">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-emerald-500">
            So richten Sie es ein
          </h2>

          <p className="my-6">
            Das digitale Gedächtnis funktioniert nicht von allein. Diese Voraussetzungen müssen erfüllt sein:
          </p>

          <Card className="my-6">
            <CardHeader>
              <CardTitle>Checkliste: Technische Voraussetzungen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  {
                    phase: "1. Lizenzen & Grundlagen",
                    items: [
                      "Microsoft 365 Copilot Lizenz aktiv",
                      "Microsoft 365 E3/E5 oder Business Premium als Basis",
                      "Copilot in allen relevanten Apps aktiviert (Teams, Outlook, etc.)"
                    ]
                  },
                  {
                    phase: "2. Meeting-Transkription",
                    items: [
                      "Transkription in Teams Admin Center aktiviert",
                      "Aufbewahrungsrichtlinien definiert (min. 90 Tage)",
                      "Nutzer geschult, Transkription zu starten"
                    ]
                  },
                  {
                    phase: "3. Grounding-Quellen",
                    items: [
                      "Microsoft 365 Chat/Copilot-App verfügbar",
                      "OneDrive und SharePoint indexiert",
                      "E-Mail- und Chat-History zugänglich"
                    ]
                  }
                ].map((phase, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <h4 className="font-bold text-primary mb-3">{phase.phase}</h4>
                    <div className="space-y-2">
                      {phase.items.map((item, iidx) => (
                        <label key={iidx} className="flex items-center gap-3 text-sm">
                          <input type="checkbox" className="rounded" />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <blockquote className="my-6 border-l-4 border-primary bg-primary/5 p-6 rounded-r-lg italic text-lg">
            Die Erfahrung zeigt: Die meisten Unternehmen haben die technischen Grundlagen bereits.
            Was fehlt, ist oft nur das Wissen, wie man Copilot als Gedächtnis nutzt.
          </blockquote>
        </section>

        {/* Kernaussagen für Entscheider */}
        <section className="my-12">
          <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-6 h-6 text-primary" />
                Kernaussagen für Entscheider
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border-l-4 border-l-blue-500 bg-white dark:bg-slate-800 rounded-r-lg">
                  <p className="font-semibold">Faktische Kernaussage:</p>
                  <p className="text-sm text-muted-foreground">Microsoft Copilot kann alle M365-Daten (Meetings, E-Mails, Chats, Dokumente) als durchsuchbare Wissensbasis nutzen.</p>
                </div>
                <div className="p-4 border-l-4 border-l-green-500 bg-white dark:bg-slate-800 rounded-r-lg">
                  <p className="font-semibold">Praktische Konsequenz:</p>
                  <p className="text-sm text-muted-foreground">Mitarbeiter müssen nicht mehr wissen, wo Informationen liegen – sie können natürlichsprachlich danach fragen.</p>
                </div>
                <div className="p-4 border-l-4 border-l-red-500 bg-white dark:bg-slate-800 rounded-r-lg">
                  <p className="font-semibold">Typischer Fehler:</p>
                  <p className="text-sm text-muted-foreground">Ohne aktivierte Meeting-Transkription fehlt die wichtigste Datenquelle – mündliche Absprachen bleiben unsichtbar.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* FAQ */}
        <section id="faq" className="mt-12 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-slate-500">
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
          <h2 className="text-3xl md:text-4xl font-bold pb-4 border-b-4 border-slate-500">
            Quellen und weiterführende Links
          </h2>
          <p className="text-muted-foreground mb-6">
            Studien und offizielle Ressourcen, auf die sich dieser Artikel stützt.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                titel: "Microsoft Work Trend Index",
                beschreibung: "Produktivitätsstudie: 4x schnellere Meeting-Nachbereitung",
                url: "https://www.microsoft.com/en-us/worklab/work-trend-index/copilots-earliest-users-teach-us-about-generative-ai-at-work"
              },
              {
                titel: "Forrester TEI Study: Microsoft 365 Copilot",
                beschreibung: "Total Economic Impact™ mit 9h Zeitersparnis/Monat",
                url: "https://tei.forrester.com/go/microsoft/M365Copilot/?lang=en-us"
              },
              {
                titel: "Microsoft 365 Copilot Dokumentation",
                beschreibung: "Offizielle Dokumentation zu Grounding und Datenquellen",
                url: "https://learn.microsoft.com/de-de/microsoft-365-copilot/"
              },
              {
                titel: "Teams Meeting Transkription",
                beschreibung: "Admin-Guide zur Aktivierung von Transkription",
                url: "https://learn.microsoft.com/de-de/microsoftteams/cloud-recording"
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

        <TrustBadge />

        {/* CTA */}
        <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-xl p-8 text-center my-12 border-2 border-orange-500/20">
          <h3 className="text-2xl font-bold mb-4">Workshop: Digitales Gedächtnis einrichten</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            In unserem Workshop zeigen wir Ihnen und Ihrem Team, wie Sie Microsoft Copilot als
            externes Gedächtnis einrichten und die besten Prompts für Ihren Arbeitsalltag entwickeln.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Workshop anfragen
          </a>
        </div>
      </ContentLayout>
    </>
  );
};

export default CopilotDigitalesGedaechtnis;

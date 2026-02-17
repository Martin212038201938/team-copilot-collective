import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ExternalLink, Linkedin, Mail, Brain, Calendar, MessageSquare, FileText, Smartphone, Clock, AlertTriangle
} from "lucide-react";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";

const SLUG = "copilot-adhs-produktiver-arbeiten";
const PAGE_TITLE = "Microsoft Copilot und ADHS: Wie KI mir hilft, fokussierter zu arbeiten";

const CopilotADHS = () => {
  const martinLang = getAuthor('martin-lang')!;

  const ids = generateSchemaIds(SLUG, 'wissen');
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const tableOfContents = [
    { id: "intro", title: "ADHS - bevor es cool war", level: 2 },
    { id: "herausforderungen", title: "Die täglichen Kämpfe", level: 2 },
    { id: "copilot-hilft", title: "Wo Copilot wirklich hilft", level: 2 },
    { id: "digitales-gedaechtnis", title: "Mein digitales Gedächtnis", level: 2 },
    { id: "mobile", title: "Unterwegs nicht vergessen", level: 2 },
    { id: "grenzen", title: "Was Copilot nicht löst", level: 2 },
    { id: "puenktlichkeit", title: "Bonus: Nie wieder zu spät", level: 2 },
    { id: "fazit", title: "Fazit", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
    { id: "weiterlesen", title: "Weiterlesen", level: 2 }
  ];

  const faqs = [
    {
      name: "Brauche ich eine ADHS-Diagnose, um von Copilot zu profitieren?",
      answer: "Nein. Die Strategien in diesem Artikel helfen jedem, der mit Ablenkung, Vergesslichkeit oder Informationsüberflutung kämpft. ADHS ist ein Spektrum - und die meisten von uns haben zumindest Tendenzen in diese Richtung, besonders in einer Arbeitswelt voller Benachrichtigungen."
    },
    {
      name: "Ist Copilot nicht selbst eine Ablenkung?",
      answer: "Kann es sein - wenn man anfängt, mit der KI zu spielen statt zu arbeiten. Der Trick: Copilot für konkrete, wiederkehrende Aufgaben nutzen (E-Mail-Zusammenfassung, Meeting-Recap), nicht als Spielzeug. Dann spart es Zeit statt sie zu fressen."
    },
    {
      name: "Welche Copilot-Lizenz brauche ich für die beschriebenen Features?",
      answer: "Die meisten Features (Outlook-Zusammenfassungen, Teams-Recaps, Word-Hilfe) erfordern Microsoft 365 Copilot. OneNote-Abfragen funktionieren mit Copilot Chat. Für eigene Agenten brauchst du zusätzlich Copilot Studio oder nutzt die in Microsoft 365 Copilot enthaltenen Agent-Funktionen."
    },
    {
      name: "Funktioniert das auch ohne Microsoft 365?",
      answer: "Teilweise. Copilot Chat (copilot.microsoft.com) ist kostenlos nutzbar und hilft beim Strukturieren von Gedanken. Aber die echte Magie - Zugriff auf deine E-Mails, Kalender, Meetings - gibt es nur mit der Microsoft 365 Copilot Lizenz."
    },
    {
      name: "Wie fange ich am besten an?",
      answer: "Pick dir EINE Sache aus diesem Artikel und probiere sie eine Woche lang konsequent aus. Nicht alles auf einmal - das überfordert (besonders mit ADHS). Meine Empfehlung: Starte mit Meeting-Recaps in Teams. Das hat den schnellsten Aha-Effekt."
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": ids.article,
        "headline": PAGE_TITLE,
        "description": "Ein persönlicher Erfahrungsbericht: Wie Microsoft Copilot mir als ADHS-Betroffener hilft, fokussierter und produktiver zu arbeiten - mit konkreten Workflows und ehrlichen Grenzen.",
        "author": getAuthorSchemaMarkup(martinLang),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization"
        },
        "datePublished": "2026-02-05",
        "dateModified": "2026-02-05",
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
        title="Microsoft Copilot und ADHS: Wie KI mir hilft, fokussierter zu arbeiten | copilotenschule.de"
        description="Ein persönlicher Erfahrungsbericht: Wie Microsoft Copilot mir als ADHS-Betroffener hilft, fokussierter und produktiver zu arbeiten - mit konkreten Workflows und ehrlichen Grenzen."
        keywords={[
          "ADHS Produktivität",
          "Microsoft Copilot ADHS",
          "ADHS Arbeitsplatz Tools",
          "KI Assistenz ADHS",
          "Copilot Fokus",
          "ADHS digitale Hilfsmittel",
          "External Brain ADHS",
          "Copilot Meeting Zusammenfassung",
          "ADHS Zeitmanagement",
          "Neurodiversität Arbeitsplatz"
        ]}
        canonicalUrl={pageUrl}
        schema={schema}
        author={martinLang}
        publishedTime="2026-02-05T10:00:00+01:00"
        modifiedTime="2026-02-05T10:00:00+01:00"
      />

      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "Copilot und ADHS", href: `/wissen/${SLUG}` }
        ]}
        title={PAGE_TITLE}
        description="Ein persönlicher Erfahrungsbericht: Wie Microsoft Copilot mir als ADHS-Betroffener hilft, fokussierter und produktiver zu arbeiten - mit konkreten Workflows und ehrlichen Grenzen."
        lastUpdated="05. Februar 2026"
        authorName="Martin Lang"
        tableOfContents={tableOfContents}
      >
        {/* Einleitung */}
        <section id="intro" className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-purple-500 text-purple-700 dark:text-purple-400">
            ADHS - bevor es cool war
          </h2>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="text-lg leading-relaxed">
              Ich bin nicht nur auf den KI-Zug aufgesprungen, bevor es Mainstream wurde - ich hatte auch ADHS, bevor jeder zweite LinkedIn-Post damit anfing. Willkommen im Club der Frühstarter.
            </p>
            <p className="leading-relaxed">
              Keine Sorge, das wird kein Jammern über mein schweres Schicksal. Im Gegenteil: Ich habe über die Jahre ein Arsenal an Workarounds aufgebaut, um trotz (oder manchmal wegen) meines Gehirns produktiv zu sein. Und seit Microsoft Copilot in mein Leben getreten ist, hat sich einiges verändert.
            </p>
            <p className="leading-relaxed">
              Dieser Artikel ist für alle, die wie ich manchmal das Gefühl haben, ihr Gehirn sei ein Browser mit 47 offenen Tabs - von denen drei Musik spielen und einer nicht mehr reagiert. Wenn du dich fragst, ob KI-Tools dir helfen können, fokussierter zu arbeiten: Hier ist mein ehrlicher Erfahrungsbericht.
            </p>
          </div>
        </section>

        {/* Herausforderungen */}
        <section id="herausforderungen" className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-red-500 text-red-700 dark:text-red-400">
            Die täglichen Kämpfe
          </h2>

          <div className="prose prose-lg max-w-none dark:prose-invert mb-6">
            <p>
              Bevor ich zu den Lösungen komme, kurz zu den Problemen. Vielleicht erkennst du dich wieder:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 my-6">
            {[
              { icon: <MessageSquare className="w-5 h-5" />, title: "200 ungelesene E-Mails", desc: "Und die Angst, dass irgendwo eine wichtige dabei ist" },
              { icon: <Calendar className="w-5 h-5" />, title: "Meetings vergessen", desc: "Oder dabei sein, aber nicht wirklich da sein" },
              { icon: <FileText className="w-5 h-5" />, title: "Aufgaben anfangen, nicht beenden", desc: "Fünf Projekte parallel, keins fertig" },
              { icon: <Brain className="w-5 h-5" />, title: "Was habe ich zugesagt?", desc: "Deadlines, die plötzlich auftauchen" },
              { icon: <Clock className="w-5 h-5" />, title: "Zeitblindheit", desc: "Fünf Minuten oder zwei Stunden - fühlt sich gleich an" },
              { icon: <AlertTriangle className="w-5 h-5" />, title: "Prokrastination bei Komplexem", desc: "Je wichtiger, desto später" }
            ].map((item, idx) => (
              <Card key={idx} className="border-l-4 border-l-red-500/50">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <div className="text-red-600 mt-0.5">{item.icon}</div>
                    <div>
                      <div className="font-semibold">{item.title}</div>
                      <div className="text-sm text-muted-foreground">{item.desc}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Klingt vertraut? Dann lies weiter. Denn für fast jeden dieser Punkte habe ich inzwischen einen Copilot-Workflow, der hilft.
            </p>
          </div>
        </section>

        {/* Wo Copilot hilft */}
        <section id="copilot-hilft" className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-green-500 text-green-700 dark:text-green-400">
            Wo Copilot wirklich hilft
          </h2>

          <div className="prose prose-lg max-w-none dark:prose-invert mb-6">
            <p>
              Hier die Features, die für mich den größten Unterschied machen:
            </p>
          </div>

          <div className="space-y-6">
            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-green-600" />
                  Outlook: E-Mail-Zusammenfassungen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Statt 200 E-Mails einzeln durchzugehen, lasse ich Copilot zusammenfassen: "Was ist heute wichtig? Worauf muss ich reagieren?" Die Inbox-Angst ist weg. Ich sehe sofort, was Priorität hat.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-green-600" />
                  Teams: Meeting-Recaps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Das ist mein Lebensretter. Wenn ich in einem Meeting gedanklich abgedriftet bin (es passiert), hole ich mir danach das Recap. Wer hat was gesagt? Welche Entscheidungen wurden getroffen? Welche Action Items habe ich? Alles da - auch wenn ich nicht aufgepasst habe.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-green-600" />
                  Word: Texte starten und strukturieren
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Die leere Seite ist mein Feind. Mit Copilot sage ich: "Erstelle mir eine Gliederung für..." und schon habe ich einen Startpunkt. Das überwindet die Prokrastinations-Hürde. Einmal angefangen, läuft es meistens.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Brain className="w-5 h-5 text-green-600" />
                  Copilot Chat: Gedanken sortieren
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Manchmal habe ich einen Gedankenknäuel im Kopf und weiß nicht, wo ich anfangen soll. Ich kippe alles unstrukturiert in Copilot und bitte um Sortierung. Das Ergebnis ist oft besser als das, was ich selbst produziert hätte.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Digitales Gedächtnis */}
        <section id="digitales-gedaechtnis" className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-blue-500 text-blue-700 dark:text-blue-400">
            Mein digitales Gedächtnis
          </h2>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Der größte Game-Changer: Ich habe mir ein externes Gedächtnis gebaut. Die Standard-Meeting-Zusammenfassungen von Teams sind mir zu kurz und oberflächlich. Also lasse ich mir zusätzlich ein komplettes Transkript erstellen und füttere das in einen Berichtsagenten.
            </p>
            <p>
              Dieser Agent strukturiert das gesamte Meeting so auf, dass ich auch Tage später noch fragen kann:
            </p>
          </div>

          <Card className="my-6 bg-blue-500/5 border-blue-500/20">
            <CardContent className="pt-6">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">→</span>
                  <span>"In welchem Meeting haben wir das Thema XY besprochen?"</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">→</span>
                  <span>"Wer hat gesagt, dass wir den Launch verschieben?"</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">→</span>
                  <span>"Welche Tasks habe ich letzte Woche zugesagt?"</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">→</span>
                  <span>"Welche Deadlines habe ich vergessen?"</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Alles landet in OneNote, organisiert in einer klaren Ordnerstruktur. Copilot kann dann mein gesamtes OneNote durchsuchen. Das ist wie ein zweites Gehirn, das nicht vergisst.
            </p>
            <p>
              Alternativ kannst du auch Copilot Pages nutzen - das ist Microsofts neuere Lösung für kollaborative Notizen mit KI-Integration. Ich bin bei OneNote geblieben, weil ich es schon jahrelang nutze. Aber ich gebe zu: OneNote hat seine Macken. Exporte sind ein Krampf, und es ist nicht das eleganteste System. Es funktioniert - aber "ideal" ist anders.
            </p>
            <p>
              Wie du so einen Berichtsagenten baust? Es gibt mehrere Wege: über Copilot Studio, als Custom GPT, oder ganz simpel als Prompt, den du regelmäßig nutzt. Ein bewährter Prompt ist übrigens der erste Schritt zu einem eigenen Agenten - du kannst ihn später einfach in einen Agent umwandeln.
            </p>
          </div>
        </section>

        {/* Mobile */}
        <section id="mobile" className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-orange-500 text-orange-700 dark:text-orange-400">
            Unterwegs nicht vergessen
          </h2>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              ADHS-Gehirne haben die besten Ideen zu den ungünstigsten Zeitpunkten. Unter der Dusche, im Auto, beim Einschlafen. Früher waren diese Ideen am nächsten Morgen weg.
            </p>
            <p>
              Seit Ende 2025 hat Microsoft Copilot Voice-Features in der mobilen App. Ich kann jetzt per Sprache:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 my-6">
            {[
              "E-Mails zusammenfassen lassen",
              "Termine in den Kalender stellen",
              "To-dos auf meine Liste setzen",
              "Meetings vorbereiten"
            ].map((item, idx) => (
              <Card key={idx} className="border-l-4 border-l-orange-500/50">
                <CardContent className="pt-4 flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-orange-600" />
                  <span>{item}</span>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Das funktioniert überall und jederzeit - wenn mir etwas einfällt, sage ich es Copilot, bevor ich es vergesse.
            </p>
            <p>
              Fairerweise: Die Kalender-Integration auf iOS ist noch nicht perfekt. Manchmal klappt es, manchmal nicht. Microsoft arbeitet daran. Aber für schnelle Notizen und To-dos ist es schon jetzt Gold wert.
            </p>
            <p>
              Übrigens: Es gibt sogar einen offiziellen Trello Copilot Connector. Falls du wie ich Trello für die Tagesplanung nutzt, kannst du deine Trello-Karten in Copilot durchsuchbar machen. Ein Agent, der morgens fragt "Was steht heute an?" und Trello, Kalender und E-Mails kombiniert - das ist das Ziel.
            </p>
          </div>
        </section>

        {/* Grenzen */}
        <section id="grenzen" className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-amber-500 text-amber-700 dark:text-amber-400">
            Was Copilot nicht löst
          </h2>

          <div className="prose prose-lg max-w-none dark:prose-invert mb-6">
            <p>
              Ehrlichkeit ist mir wichtig. Copilot ist kein Wundermittel. Hier sind die Grenzen:
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                title: "Die Einrichtung braucht Zeit und Geduld",
                desc: "Workflows aufsetzen, Agenten bauen, OneNote strukturieren - das ist nicht gerade ADHS-freundlich. Ich habe mehrere Anläufe gebraucht."
              },
              {
                title: "Manchmal lenkt es selbst ab",
                desc: "Copilot kann zum Spielzeug werden. 'Mal schauen, was die KI dazu sagt' ist ein gefährlicher Satz, wenn man eigentlich arbeiten sollte."
              },
              {
                title: "Nicht alles funktioniert perfekt",
                desc: "Mobile Kalender-Integration hat Macken. Manche Features gibt es nur auf Englisch. Die KI halluziniert manchmal. Es ist Work in Progress."
              },
              {
                title: "Es ersetzt keine Therapie oder Medikation",
                desc: "Copilot ist ein Werkzeug, kein Heilmittel. Wer ADHS hat, braucht ein ganzes System aus Strategien - KI ist nur ein Teil davon."
              },
              {
                title: "Der Dopamin-Effekt lässt nach",
                desc: "Neue Tools sind aufregend. Nach ein paar Wochen wird Copilot normal. Dann muss die Gewohnheit tragen, nicht die Begeisterung."
              }
            ].map((item, idx) => (
              <Card key={idx} className="border-l-4 border-l-amber-500/50">
                <CardContent className="pt-4">
                  <div className="font-semibold mb-1">{item.title}</div>
                  <div className="text-sm text-muted-foreground">{item.desc}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Pünktlichkeit */}
        <section id="puenktlichkeit" className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-indigo-500 text-indigo-700 dark:text-indigo-400">
            Bonus: Nie wieder zu spät
          </h2>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Zeitblindheit ist eines der klassischen ADHS-Symptome. "Ich muss in 20 Minuten los" - und plötzlich ist eine Stunde vergangen.
            </p>
            <p>
              Deshalb habe ich mir eine kleine App gebaut, die mir auf die Minute genau sagt, wann ich losgehen muss. Sie berücksichtigt:
            </p>
          </div>

          <Card className="my-6 bg-indigo-500/5 border-indigo-500/20">
            <CardContent className="pt-6">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  <span>Aktueller ÖPNV-Status (Verspätungen, Ausfälle)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  <span>Zeit für Parkplatzsuche (wenn ich mit dem Auto fahre)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  <span>Vorbereitungszeit, bevor ich das Haus verlassen kann</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  <span>Pufferzeit für unvorhergesehene Hindernisse</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Das Ergebnis: Ein Countdown, der mir zeigt, wie viel Zeit ich noch habe. Wenn der auf Null geht, muss ich raus - keine Diskussion.
            </p>
            <p>
              Die App ist nur teilweise mit Copilot-Mitteln gebaut, aber sie zeigt, was möglich ist, wenn man KI und Automatisierung kombiniert. Wenn du Interesse hast, schreib mir eine DM - ich teile gerne den Link.
            </p>
          </div>
        </section>

        {/* Fazit */}
        <section id="fazit" className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-emerald-500 text-emerald-700 dark:text-emerald-400">
            Fazit
          </h2>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Microsoft Copilot ist kein ADHS-Heilmittel. Aber es ist das beste externe Gehirn, das ich bisher hatte. Meeting-Recaps, die mich retten, wenn ich nicht aufgepasst habe. E-Mail-Zusammenfassungen, die die Inbox-Angst nehmen. Ein durchsuchbares Gedächtnis in OneNote, das nicht vergisst.
            </p>
            <p>
              Wenn du mit ähnlichen Herausforderungen kämpfst: Probier es aus. Nicht alles auf einmal - such dir eine Sache aus und mach die zur Gewohnheit. Dann die nächste.
            </p>
            <p>
              Und wenn du Fragen hast oder deine eigenen ADHS-Copilot-Hacks teilen willst: Meine DMs sind offen.
            </p>
          </div>

          <blockquote className="my-8 border-l-4 border-primary bg-primary/5 p-6 rounded-r-lg italic text-lg">
            ADHS ist keine Ausrede - aber es ist auch kein Grund, alles auf die harte Tour zu machen. Wenn es Tools gibt, die helfen, wäre es doch blöd, sie nicht zu nutzen.
          </blockquote>
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-12">
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

        {/* Weiterlesen */}
        <section id="weiterlesen" className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-slate-500 text-slate-700 dark:text-slate-400">
            Weiterlesen
          </h2>
          <p className="text-muted-foreground mb-6">
            Wissenschaftliche Hintergründe zu ADHS und externen Systemen - für alle, die tiefer einsteigen wollen.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                titel: "Working Memory Deficits in ADHD",
                beschreibung: "Forschung zu Arbeitsgedächtnis-Defiziten bei ADHS",
                url: "https://pubmed.ncbi.nlm.nih.gov/16856785/"
              },
              {
                titel: "Time Blindness and ADHD",
                beschreibung: "Warum Zeitwahrnehmung bei ADHS anders funktioniert",
                url: "https://pubmed.ncbi.nlm.nih.gov/31751205/"
              },
              {
                titel: "External Brain: Cognitive Offloading",
                beschreibung: "Wie externe Systeme das Arbeitsgedächtnis entlasten",
                url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5765007/"
              },
              {
                titel: "Voice in Microsoft 365 Copilot",
                beschreibung: "Offizielle Ankündigung der Voice-Features",
                url: "https://techcommunity.microsoft.com/blog/microsoft365copilotblog/introducing-voice-in-microsoft-365-copilot-a-more-productive-way-to-work-on-the-/4466034"
              },
              {
                titel: "Trello Copilot Connector",
                beschreibung: "Offizielle Microsoft-Dokumentation zur Trello-Integration",
                url: "https://learn.microsoft.com/en-us/microsoftsearch/trello-connector"
              },
              {
                titel: "Dopamin und Motivation bei ADHS",
                beschreibung: "Warum neue Tools anfangs super funktionieren",
                url: "https://pubmed.ncbi.nlm.nih.gov/19620072/"
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
        <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-xl p-8 text-center my-12 border-2 border-purple-500/20">
          <h3 className="text-2xl font-bold mb-4">Copilot-Training für Ihr Team</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Sie wollen, dass Ihr Team Copilot wirklich nutzt - nicht nur die Lizenz bezahlt? Unsere Trainings zeigen praktische Workflows, die im Alltag funktionieren. Auch für Teams mit unterschiedlichen Arbeitsweisen.
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

export default CopilotADHS;

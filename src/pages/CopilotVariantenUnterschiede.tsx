import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import AuthorBio from "@/components/AuthorBio";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";
import { Check } from "lucide-react";

const SLUG = "microsoft-copilot-varianten-unterschiede";
const PAGE_TITLE = "Microsoft Copilot: Die Unterschiede zwischen Copilot Chat, 365-Lizenz und Claude-Modellen";

// Kleine Helfer für die Vergleichstabelle
const Yes = () => (
  <Check className="w-4 h-4 text-green-600 inline-block" aria-label="ja" />
);
const No = () => (
  <span className="text-muted-foreground" aria-label="nein">–</span>
);

const CopilotVariantenUnterschiede = () => {
  const martinLang = getAuthor('martin-lang')!;
  const ids = generateSchemaIds(SLUG, 'wissen');
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const tableOfContents = [
    { id: "welchen-copilot", title: "Die meisten haben nicht den Copilot, den sie meinen", level: 2 },
    { id: "vier-stufen", title: "Vier Stufen, ein Name", level: 2 },
    { id: "vergleich", title: "Was kann welche Variante? Der direkte Vergleich", level: 2 },
    { id: "lizenz", title: "Was die bezahlte Lizenz zusätzlich kann", level: 2 },
    { id: "agenten-claude", title: "Agenten und das agentische Claude-Modell", level: 2 },
    { id: "workflows", title: "Drei Workflows, vier Automatisierungsgrade", level: 2 },
    { id: "claude-datenschutz", title: "Warum viele Claude noch nicht anschalten dürfen", level: 2 },
    { id: "gruppen-nicht-mischen", title: "Warum wir die Lerngruppen nicht mischen", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
  ];

  const faqs = [
    {
      name: "Wir zahlen für Microsoft 365 Copilot, aber unsere Leute nutzen ihn wie den kostenlosen Chat. Woran liegt das?",
      answer: "Fast immer am fehlenden Einstieg, nicht an der Technik. Wer Copilot nur als besseren Chat kennt, fragt ihn nach Formulierungen und Zusammenfassungen – und übersieht, dass die bezahlte Lizenz auf die echten Mails, Termine und Dateien im Microsoft-365-Graphen zugreift. Genau dieser Unterschied entscheidet über den Nutzen. Wir setzen in unseren Trainings deshalb nicht bei der Tool-Oberfläche an, sondern bei den konkreten Arbeitsabläufen Ihrer Teams und zeigen, welche Aufgaben sich mit der vorhandenen Lizenz wirklich verändern. Einen Überblick über die Formate finden Sie unter unseren Angeboten."
    },
    {
      name: "Lohnt sich für uns der Wechsel vom kostenlosen Copilot Chat zur bezahlten Lizenz?",
      answer: "Das hängt davon ab, wie viel Ihrer Arbeit in Microsoft 365 steckt. Wer vor allem Texte formuliert, sich Inhalte erklären lässt und mit öffentlichem Wissen arbeitet, kommt mit dem kostenlosen Copilot Chat oft erstaunlich weit. Der Aufpreis lohnt sich, sobald die KI an Ihren echten Dokumenten, Mails und Terminen arbeiten soll – denn diesen Graph-Zugriff gibt es nur in der Lizenzversion. Die ehrliche Reihenfolge ist deshalb: zuerst herausfinden, welche wiederkehrenden Abläufe wirklich vom Datenzugriff profitieren, dann lizenzieren, nicht umgekehrt. Wir helfen, diese Abläufe vorab zu identifizieren, damit Sie die Lizenz dort einsetzen, wo sie sich rechnet."
    },
    {
      name: "Wie erkennen unsere Mitarbeiter überhaupt, welche Copilot-Variante sie haben?",
      answer: "Zwei einfache Tests genügen. Erstens das Logo: Taucht der Copilot-Knopf direkt im Menüband von Word, Excel und Outlook auf, liegt in der Regel eine bezahlte Lizenz vor. Zweitens die Kalenderfrage: Wer in den Copilot-Chat „Liste mir meine heutigen Termine auf“ eingibt und keine echten Termine bekommt, sondern den Hinweis, dass kein Zugriff auf das Postfach besteht, nutzt den kostenlosen Copilot Chat ohne Graph-Anbindung. Wir bauen diesen Selbsttest bewusst in unsere Einstiegstrainings ein, weil er den Unterschied in dreißig Sekunden sichtbar macht."
    },
    {
      name: "Wir würden gern das agentische Claude-Modell nutzen, dürfen es aber aus Datenschutzgründen nicht aktivieren. Was jetzt?",
      answer: "Damit sind Sie nicht allein – für Tenants in der EU, im EWR und in Großbritannien ist die Anthropic-Integration standardmäßig deaktiviert, weil die Verarbeitung derzeit außerhalb der EU-Datengrenze stattfindet. Sinnvoll ist trotzdem, jetzt mit der vorhandenen, OpenAI-gestützten Copilot-Lizenz die Grundlagen aufzubauen: agentische Workflows funktionieren im Kern gleich, egal welches Modell dahinterläuft. So sind Ihre Teams vorbereitet, wenn die EU-konforme Aktivierung kommt. Den datenschutzrechtlichen Hintergrund haben wir im Detail aufgeschrieben, und wir begleiten die Einführung gemeinsam mit Ihren IT- und Datenschutzverantwortlichen."
    },
    {
      name: "Lohnt es sich, alle Mitarbeiter gemeinsam zu schulen, egal welche Variante sie haben?",
      answer: "Nein, und das ist einer der häufigsten Fehler. Wer mit dem kostenlosen Copilot Chat arbeitet, erlebt in einem Training, das Agenten und app-übergreifende Workflows zeigt, vor allem Funktionen, die er anschließend nicht aufrufen kann. Umgekehrt langweilen sich Lizenzinhaber in einem Chat-Grundlagenkurs. Beide Gruppen gehen frustriert heraus. Wir teilen Trainings deshalb nach tatsächlicher Lizenz- und Nutzungssituation auf, sodass jede Gruppe genau das übt, was auf ihren Geräten auch funktioniert."
    },
    {
      name: "Wie überzeugen wir die Geschäftsführung, dass die bezahlte Lizenz den Aufpreis wert ist?",
      answer: "Mit dem konkreten Unterschied im Arbeitsalltag, nicht mit Funktionslisten. Der kostenlose Chat hilft beim Formulieren; die bezahlte Lizenz arbeitet an den echten Dokumenten, Mails und Daten und übernimmt mit Agenten ganze Abläufe. Den Wert sieht man erst, wenn ein Team einen wiederkehrenden Prozess – etwa das Wochenreporting oder die Angebotserstellung – einmal vollständig mit Copilot durchgespielt hat. Genau das machen wir in unseren Praxistrainings messbar, damit Sie der Geschäftsführung eine belastbare Rechnung statt einer Vermutung vorlegen können."
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": ids.article,
        "headline": PAGE_TITLE,
        "description": "Copilot Chat, die Microsoft 365 Copilot-Lizenz mit OpenAI-Modellen oder Copilot mit Claude: Welche Variante was kann und welche sich wann lohnt.",
        "author": getAuthorSchemaMarkup(martinLang),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization"
        },
        "datePublished": "2026-06-01",
        "dateModified": "2026-06-01",
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
        title="Copilot Chat, 365-Lizenz & Claude: die Unterschiede"
        description="Copilot Chat, die Microsoft 365 Copilot-Lizenz mit OpenAI-Modellen oder Copilot mit Claude – welche Variante was kann und welche sich für wen lohnt."
        keywords={[
          "Microsoft Copilot Varianten",
          "Copilot Versionen Unterschied",
          "Copilot Chat vs Microsoft 365 Copilot",
          "Copilot Chat oder Lizenz",
          "welche Copilot Version",
          "welchen Copilot habe ich",
          "Copilot Chat kostenlos Unterschied",
          "Microsoft 365 Copilot Lizenz",
          "Copilot mit Claude",
          "Copilot Claude",
          "Claude Copilot",
          "Microsoft Copilot Claude",
          "Copilot Anthropic Modelle",
          "Copilot Agent Mode",
          "Copilot Studio Agenten",
          "agentisches Claude Modell Copilot"
        ]}
        canonicalUrl={pageUrl}
        schema={schema}
        author={martinLang}
        publishedTime="2026-06-01T09:00:00+02:00"
        modifiedTime="2026-06-01T09:00:00+02:00"
      />

      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "Copilot-Varianten", href: `/wissen/${SLUG}` }
        ]}
        title={PAGE_TITLE}
        description="Warum die meisten gar nicht wissen, welche Copilot-Variante sie nutzen – und was Copilot Chat, die 365-Lizenz und die Claude-Modelle praktisch voneinander unterscheidet."
        lastUpdated="1. Juni 2026"
        authorName="Martin Lang"
        tableOfContents={tableOfContents}
        relatedContent={[
          "wissen:claude-in-microsoft-copilot",
          "wissen:microsoft-copilot-lizenzen",
          "wissen:copilot-flex-routing-eu-verarbeitung",
          "wissen:copilot-agent-mode-word-excel-powerpoint",
          "wissen:copilot-chat-free-pernod-ricard"
        ]}
      >
        {/* Schnellantwort */}
        <Card className="mb-8 border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-amber-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Schnellantwort
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base leading-relaxed">
              „Copilot“ ist kein einzelnes Produkt, sondern eine Treppe mit mehreren Stufen. Der kostenlose Copilot
              Chat liefert einen sicheren KI-Chat, kennt aber Ihre Firmendaten nicht. Die bezahlte Microsoft 365
              Copilot-Lizenz mit den OpenAI-Modellen arbeitet über den Microsoft Graph an Ihren echten Mails,
              Terminen und Dokumenten. Schaltet das Unternehmen zusätzlich die Claude-Modelle von Anthropic frei,
              kommt der agentische Modus dazu, der Aufgaben über mehrere Apps hinweg eigenständig abarbeitet – und
              mit Copilot Studio lassen sich daraus eigene, wiederkehrende Agenten bauen. Wer wissen will, welche
              Stufe er hat, fragt den Chat nach seinen heutigen Terminen: Kommt keine Antwort, ist es der kostenlose
              Chat.
            </p>
          </CardContent>
        </Card>

        {/* Welchen Copilot */}
        <section id="welchen-copilot" className="mb-6">
          <h2 className="!mt-10 !mb-2 text-2xl md:text-3xl font-bold">
            Die meisten haben nicht den Copilot, den sie meinen
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="text-lg leading-relaxed">
              In den allermeisten Erstgesprächen, die ich mit Unternehmen führe, taucht früher oder später derselbe
              Satz auf: „Wir haben den Copilot doch schon.“ Und in den allermeisten Fällen stimmt das nur halb. Was
              die Leute haben, ist der kostenlose Copilot Chat, der inzwischen in fast jedem Microsoft-365-Abo
              mitläuft. Was sie meinen, ist das bezahlte Microsoft 365 Copilot, das in Word, Excel und Outlook
              sitzt und ihre echten Dokumente kennt. Zwischen diesen beiden liegt ein Unterschied, der über Erfolg
              oder Enttäuschung einer ganzen KI-Einführung entscheidet – und kaum jemand bemerkt ihn, weil beide
              schlicht „Copilot“ heißen.
            </p>
            <p>
              Bevor man also über Claude, Agenten und die große KI-Strategie spricht, lohnt der nüchterne Blick auf
              die eigene Lizenz. Zwei Tests reichen dafür. Der erste ist das Logo: Erscheint der Copilot-Knopf
              direkt im Menüband von Word, Excel, PowerPoint und Outlook, ist mit hoher Wahrscheinlichkeit eine
              bezahlte Lizenz im Spiel. Seit Microsoft die tiefe Office-Integration im Mai 2026 ausschließlich
              zahlenden Lizenzen vorbehält, ist dieser Knopf zu einem ziemlich verlässlichen Indikator geworden.
              Der zweite Test ist noch schneller: Geben Sie in den Copilot-Chat den Satz „Liste mir meine heutigen
              Termine auf“ ein. Bekommen Sie Ihre echten Termine, greift Copilot auf Ihr Postfach zu – Sie haben
              die Lizenzversion. Bekommen Sie eine höfliche Auskunft, dass kein Zugriff auf den Kalender besteht,
              sitzen Sie vor dem kostenlosen Chat.
            </p>
            <p>
              Diese Unterscheidung klingt banal, hat aber handfeste Folgen. Ich habe Unternehmen gesehen, die pro
              Kopf einen zweistelligen Betrag im Monat für Microsoft 365 Copilot bezahlen und deren Mitarbieter ihn
              trotzdem nur benutzen, um E-Mails umzuformulieren – also für etwas, das der kostenlose Chat genauso
              könnte. Ein bezahlter Sportwagen, der die Garage nie verlässt. Das ist die unbequeme Wahrheit hinter vielen gescheiterten Rollouts: Es wird für eine
              Fähigkeit bezahlt, die nie aktiviert wird, weil niemand den Leuten gezeigt hat, dass es sie gibt.
            </p>
          </div>
        </section>

        {/* Vier Stufen */}
        <section id="vier-stufen" className="mb-6">
          <h2 className="!mt-10 !mb-2 text-2xl md:text-3xl font-bold">
            Vier Stufen, ein Name
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Sobald man begriffen hat, dass „Copilot“ ein Sammelbegriff ist, wird die ganze Diskussion klarer. Ich
              arbeite in Trainings mit vier Stufen, die sich nicht durch das Marketing, sondern durch das
              tatsächliche Können unterscheiden – und durch den Grad, in dem die KI Arbeit nicht nur unterstützt,
              sondern übernimmt.
            </p>
            <p>
              Die erste Stufe ist der <strong>Copilot Chat</strong>, der kostenlos in den gängigen
              Microsoft-365-Abos enthalten ist. Er bietet einen sicheren, webgestützten KI-Chat mit
              Datenschutzgarantie für Geschäftsdaten, aber ohne Zugriff auf Ihre internen Inhalte. Ich möchte ihn
              ausdrücklich nicht kleinreden: Wer gelernt hat, gute Anweisungen zu formulieren, kann mit dem
              kostenlosen Chat erstaunlich viel erledigen – Texte strukturieren, Entwürfe verbessern, komplizierte
              Sachverhalte erklären lassen, Argumente sortieren. Für einen großen Teil der Belegschaft ist das ein
              realer Produktivitätsgewinn, und es kostet keinen Cent extra. Der häufigste Grund, warum dieser Chat
              brachliegt, ist nicht seine Begrenzung, sondern fehlende Übung. Wie das in der Praxis aussieht, haben
              wir am Beispiel von{" "}
              <Link to="/wissen/copilot-chat-free-pernod-ricard" className="text-primary hover:underline">
                Pernod Ricard
              </Link>{" "}
              beschrieben.
            </p>
            <p>
              Die zweite Stufe ist <strong>Microsoft 365 Copilot mit den OpenAI-Modellen</strong> – die bezahlte
              Lizenz, so wie sie in den meisten Firmen standardmäßig freigeschaltet ist. Hier kommt der
              Graph-Zugriff dazu, und damit verändert sich die Natur der Arbeit. Copilot schreibt im Dokument, an
              dem Sie arbeiten, fasst Ihre realen Mails zusammen, baut in Excel an Ihren echten Zahlen. Aus einem
              klugen Gesprächspartner wird ein Assistent, der Ihren Arbeitskontext kennt.
            </p>
            <p>
              Die dritte Stufe ist dieselbe Lizenz, aber mit den freigeschalteten{" "}
              <strong>Claude-Modellen von Anthropic</strong>. Microsoft hat seinen Copiloten 2025 und 2026 zu einer
              Plattform umgebaut, die je nach Aufgabe zwischen Modellen wählt. Für mehrstufige Aufgaben, lange
              Dokumente und Abläufe, die über mehrere Apps hinweg laufen, lässt sich Claude auswählen – im
              Researcher, im Agent Mode und im neuen Copilot Cowork. Wichtig ist die Abgrenzung: Es geht hier um
              Claude als Modelloption innerhalb von Copilot, nicht um das eigenständige Claude-Produkt von
              Anthropic. Oberfläche, Datenzugriff und Governance bleiben die von Microsoft 365 – nur das Modell im
              Hintergrund ist ein anderes. Was Anthropics KI im Copilot-Ökosystem konkret
              verändert, haben wir{" "}
              <Link to="/wissen/claude-in-microsoft-copilot" className="text-primary hover:underline">
                ausführlich eingeordnet
              </Link>.
            </p>
            <p>
              Die vierte Stufe schließlich sind <strong>eigene Agenten aus Copilot Studio</strong>. Hier hört die
              KI auf, auf Zuruf zu reagieren, und beginnt, definierte Abläufe eigenständig und wiederkehrend
              abzuarbeiten. Das ist der Punkt, an dem aus Assistenz Automatisierung wird – und an dem die
              Anforderungen an Governance und Schulung sprunghaft steigen. Wichtig ist: Alle vier Stufen tragen
              denselben Namen, verlangen aber eine völlig unterschiedliche Arbeitsweise.
            </p>
          </div>
        </section>

        {/* Vergleich */}
        <section id="vergleich" className="mb-6">
          <h2 className="!mt-10 !mb-2 text-2xl md:text-3xl font-bold">
            Was kann welche Variante? Der direkte Vergleich
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Die folgende Übersicht zeigt, was die vier Copilot-Stufen jeweils können. Sie ist bewusst auf die
              Punkte verdichtet, die im Alltag den Unterschied machen, nicht auf die vollständige Funktionsliste.
              Von links nach rechts steigt der Grad, in dem die KI Arbeit nicht nur unterstützt, sondern übernimmt:
              vom kostenlosen Chat über die Lizenz mit OpenAI-Modellen und die freigeschalteten Claude-Modelle bis
              zu selbst gebauten Agenten.
            </p>
          </div>

          <div className="overflow-x-auto my-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-3 text-left font-bold">Funktion</th>
                  <th className="border p-3 text-center font-bold">Copilot Chat<br />(kostenlos)</th>
                  <th className="border p-3 text-center font-bold">M365 Copilot<br />(OpenAI)</th>
                  <th className="border p-3 text-center font-bold">Copilot mit<br />Claude-Modellen</th>
                  <th className="border p-3 text-center font-bold">Copilot Studio /<br />eigene Agenten</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-3 font-medium">Sicherer KI-Chat mit Datenschutz für Geschäftsdaten</td>
                  <td className="border p-3 text-center"><Yes /></td>
                  <td className="border p-3 text-center"><Yes /></td>
                  <td className="border p-3 text-center"><Yes /></td>
                  <td className="border p-3 text-center"><Yes /></td>
                </tr>
                <tr>
                  <td className="border p-3 font-medium">Zugriff auf öffentliches Web-Wissen</td>
                  <td className="border p-3 text-center"><Yes /></td>
                  <td className="border p-3 text-center"><Yes /></td>
                  <td className="border p-3 text-center"><Yes /></td>
                  <td className="border p-3 text-center"><Yes /></td>
                </tr>
                <tr>
                  <td className="border p-3 font-medium">Zugriff auf Ihre Mails, Termine und Dateien (Microsoft Graph)</td>
                  <td className="border p-3 text-center"><No /></td>
                  <td className="border p-3 text-center"><Yes /></td>
                  <td className="border p-3 text-center"><Yes /></td>
                  <td className="border p-3 text-center"><Yes /></td>
                </tr>
                <tr>
                  <td className="border p-3 font-medium">Eingebettet in Word, Excel, PowerPoint und Outlook</td>
                  <td className="border p-3 text-center"><No /></td>
                  <td className="border p-3 text-center"><Yes /></td>
                  <td className="border p-3 text-center"><Yes /></td>
                  <td className="border p-3 text-center"><Yes /></td>
                </tr>
                <tr>
                  <td className="border p-3 font-medium">Agent Mode für mehrstufige Aufgaben (z. B. in Excel)</td>
                  <td className="border p-3 text-center"><No /></td>
                  <td className="border p-3 text-center">teilweise</td>
                  <td className="border p-3 text-center"><Yes /></td>
                  <td className="border p-3 text-center"><Yes /></td>
                </tr>
                <tr>
                  <td className="border p-3 font-medium">Wählbares Claude-Modell (Sonnet 4.5 / Opus 4.5)</td>
                  <td className="border p-3 text-center"><No /></td>
                  <td className="border p-3 text-center"><No /></td>
                  <td className="border p-3 text-center"><Yes /></td>
                  <td className="border p-3 text-center"><Yes /></td>
                </tr>
                <tr>
                  <td className="border p-3 font-medium">App-übergreifende, eigenständige Workflows (Copilot Cowork)</td>
                  <td className="border p-3 text-center"><No /></td>
                  <td className="border p-3 text-center"><No /></td>
                  <td className="border p-3 text-center"><Yes /></td>
                  <td className="border p-3 text-center"><Yes /></td>
                </tr>
                <tr>
                  <td className="border p-3 font-medium">Eigene Agenten bauen und wiederkehrend automatisieren</td>
                  <td className="border p-3 text-center"><No /></td>
                  <td className="border p-3 text-center"><No /></td>
                  <td className="border p-3 text-center">eingeschränkt</td>
                  <td className="border p-3 text-center"><Yes /></td>
                </tr>
                <tr>
                  <td className="border p-3 font-medium">Kosten pro Nutzer und Monat</td>
                  <td className="border p-3 text-center">in M365 enthalten</td>
                  <td className="border p-3 text-center">ca. 16–26 € + Basislizenz</td>
                  <td className="border p-3 text-center">Lizenz, Claude freigeschaltet</td>
                  <td className="border p-3 text-center">Lizenz + Studio-/Agent-Kosten</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Die genaue Preisstaffel hängt von Unternehmensgröße und vorhandener Basislizenz ab; die Spanne von
              rund 16 bis 26 Euro pro Nutzer und Monat plus der jeweiligen Microsoft-365-Lizenz haben wir im
              Detail im Artikel zu den{" "}
              <Link to="/wissen/microsoft-copilot-lizenzen" className="text-primary hover:underline">
                Copilot-Lizenzen
              </Link>{" "}
              aufgeschlüsselt.
            </p>
          </div>
        </section>

        {/* Lizenz */}
        <section id="lizenz" className="mb-6">
          <h2 className="!mt-10 !mb-2 text-2xl md:text-3xl font-bold">
            Was die bezahlte Lizenz zusätzlich kann
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Der Sprung vom kostenlosen Chat zur Lizenz lässt sich an einem einzigen Satz festmachen: Die Lizenz
              arbeitet an Ihren Sachen. Statt einen Text in den Chat zu kopieren und das Ergebnis zurückzukopieren,
              steht Copilot direkt in der Datei, im Postfach, in der Tabelle. In Word schreibt er Entwürfe auf Basis
              vorhandener Dokumente, in Outlook fasst er Mail-Verläufe zusammen und bereitet Antworten vor, in Excel
              baut er Formeln und Pivot-Auswertungen an Ihren echten Zahlen, und in Teams destilliert er aus einem
              einstündigen Meeting die Entscheidungen und offenen Punkte.
            </p>
            <p>
              Seit Mai 2026 ist diese tiefe Einbettung in Word, Excel, PowerPoint und OneNote ausdrücklich den
              bezahlten Lizenzen vorbehalten. Der kostenlose Copilot Chat bleibt erhalten, verliert aber genau die
              Funktion, die ihn für viele attraktiv gemacht hatte: das direkte Mitarbeiten in den Office-Dokumenten.
              Das ist eine wichtige Information für jede Budgetplanung, weil sich damit die Grenze zwischen „gratis“
              und „bezahlt“ klarer zieht als noch vor einem Jahr.
            </p>
            <p>
              Dazu kommt der Agent Mode, der seit dem Frühjahr 2026 allgemein verfügbar ist und Copilot von
              einzelnen Handgriffen zu zusammenhängenden Aufgaben führt – ein Thema, das wir im Artikel zum{" "}
              <Link to="/wissen/copilot-agent-mode-word-excel-powerpoint" className="text-primary hover:underline">
                Copilot Agent Mode in Word, Excel und PowerPoint
              </Link>{" "}
              genauer behandeln. Wichtig ist die nüchterne Erkenntnis: All diese Fähigkeiten entfalten erst dann
              Wert, wenn die Mitarbeiter sie kennen und in ihre Abläufe einbauen. Die Lizenz allein verändert nichts.
            </p>
          </div>
        </section>

        {/* Agenten und Claude */}
        <section id="agenten-claude" className="mb-6">
          <h2 className="!mt-10 !mb-2 text-2xl md:text-3xl font-bold">
            Agenten und das agentische Claude-Modell
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Der eigentliche Bruch in der Entwicklung liegt nicht zwischen Chat und Lizenz, sondern zwischen
              Assistenz und Agentur. Ein Assistent antwortet, wenn man ihn fragt. Ein Agent bekommt ein Ziel und
              arbeitet sich eigenständig dorthin – über mehrere Schritte, mehrere Apps, mit Zwischenentscheidungen
              und Fehlerkorrektur. Genau für diese Art von Arbeit hat Microsoft mit Anthropics Claude ein zweites
              Modell tief in Copilot integriert, weil Claude bei langen Kontexten und mehrstufigem Schlussfolgern
              Stärken zeigt und seltener überzeugend klingende Falschantworten produziert. Für einen Agenten, der
              eigenständig in Unternehmensdaten arbeitet, ist dieses vorsichtigere Verhalten kein Detail, sondern
              eine Kernqualifikation.
            </p>
            <p>
              In der Praxis begegnet das den Nutzern an drei Stellen: im Researcher, der für tiefe Recherchen über
              lange Dokumente Claude heranziehen kann; im Agent Mode in Excel und Word für strukturierte,
              mehrstufige Aufgaben; und in Copilot Cowork, dem agentischen Modus, der eine Aufgabe über Outlook,
              Teams, Excel und SharePoint hinweg abarbeitet und am Ende ein fertiges Ergebnis liefert statt nur
              einen Entwurf. Microsoft stellt für unterschiedliche Aufgaben unterschiedliche Claude-Modelle bereit –
              Sonnet für allgemeine Anfragen, Opus für strukturierte Aufgaben und tiefes Schlussfolgern.
            </p>
            <p>
              Die vierte Stufe, Copilot Studio, geht noch einen Schritt weiter: Hier baut man eigene Agenten, die
              definierte Prozesse wiederkehrend und ohne erneuten Anstoß erledigen. Wie diese Agenten in echte
              Abläufe passen, beschreiben wir im Artikel zu{" "}
              <Link to="/wissen/ki-agenten" className="text-primary hover:underline">
                KI-Agenten in Microsoft 365
              </Link>. An diesem Punkt verschiebt sich die entscheidende Frage von „Was kann das Tool?“ zu „Welche
              Prozesse wollen wir überhaupt einem Agenten überlassen – und wie kontrollieren wir das?“
            </p>
          </div>
        </section>

        {/* Workflows */}
        <section id="workflows" className="mb-6">
          <h2 className="!mt-10 !mb-2 text-2xl md:text-3xl font-bold">
            Drei Workflows, vier Automatisierungsgrade
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Theorie hilft nur begrenzt. Greifbarer wird der Unterschied, wenn man denselben Arbeitsablauf einmal
              durch alle vier Stufen schiebt und beobachtet, wie sich die Last vom Menschen zur Maschine verlagert.
              Ich nehme dafür drei Aufgaben, die in fast jedem Unternehmen vorkommen.
            </p>
            <p>
              <strong>Die wiederkehrende Excel-Auswertung.</strong> Mit dem kostenlosen Copilot Chat lassen Sie sich
              Formeln erklären und Auswertungslogik beschreiben, geben die Zahlen aber selbst ein und übertragen die
              Ergebnisse von Hand – Sie sind der Übersetzer zwischen Chat und Datei. Mit Microsoft 365 Copilot sitzt
              die KI in Excel, liest Ihre geöffnete Arbeitsmappe, baut Pivot-Tabellen und Diagramme auf Zuruf und
              markiert Auffälligkeiten direkt in Ihren Daten. Mit den freigeschalteten Claude-Modellen im Agent Mode
              geben Sie eine vagere Aufgabe vor – etwa die Frage, warum eine Region im zweiten Quartal eingebrochen
              ist –, und das System zerlegt sie selbst in Auswertungsschritte, korrigiert sich und liefert eine
              begründte Analyse. Auf der Agentenstufe schließlich zieht ein eingerichteter Agent jeden Montag die
              Rohdaten aus der bekannten Quelle, baut das Standard-Reporting, schreibt eine kurze Zusammenfassung
              und legt alles im richtigen Ordner ab, ohne dass jemand Excel öffnet.
            </p>
            <p>
              <strong>Das Angebot.</strong> Im kostenlosen Chat bekommen Sie Formulierungen und eine saubere
              Struktur, füttern aber alle Eckdaten selbst. Microsoft 365 Copilot erstellt den Entwurf direkt im
              Word-Dokument, greift auf Ihre bestehenden Angebotsvorlagen und Referenzdokumente im SharePoint zu und
              trifft den richtigen Ton. Mit den Claude-Modellen wird daraus ein zusammenhängender Entwurf, der sich
              die Kundenhistorie und passende Referenzprojekte selbst zusammensucht und über viele Abschnitte hinweg
              konsistent bleibt – die Stärke langer Kontexte. Als Agent schließlich kann eine eingehende Anfrage den
              ersten Angebotsentwurf automatisch auslösen, samt passender Module und Preise, und ihn dem zuständigen
              Vertriebler zur Freigabe vorlegen.
            </p>
            <p>
              <strong>Der Wochen-Statusbericht aus Mails und Teams.</strong> Mit dem kostenlosen Chat kopieren Sie
              die wichtigen Punkte zusammen und lassen sie ordnen – das Sammeln bleibt Ihre Arbeit. Microsoft 365
              Copilot greift über den Graph auf Ihre echte Kommunikation der Woche zu und gruppiert sie nach
              Projekt. Die Claude-Modelle in Copilot Cowork stellen den Überblick über Outlook, Teams und SharePoint
              hinweg selbst zusammen, markieren offene Punkte und bereiten Antwortentwürfe vor. Und als
              eingerichteter Agent läuft der Bericht freitags von allein, wird an die festgelegten Empfänger
              verteilt und abgelegt. In allen drei Beispielen sehen Sie dasselbe Muster: Mit jeder Stufe verschiebt
              sich die Arbeit vom Menschen zur Maschine, und der Mensch rückt von der Ausführung in die Rolle
              dessen, der Ziele setzt und Ergebnisse freigibt. Vorausgesetzt, er traut sich, das auch wirklich loszulassen.
            </p>
          </div>
        </section>

        {/* Claude Datenschutz */}
        <section id="claude-datenschutz" className="mb-6">
          <h2 className="!mt-10 !mb-2 text-2xl md:text-3xl font-bold">
            Warum viele Claude noch nicht anschalten dürfen
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              An dieser Stelle muss ich die Begeisterung dämpfen, und zwar genau für die Leser, die jetzt am
              liebsten die Claude-Modelle ausprobieren würden. Für sehr viele Unternehmen in Deutschland, Österreich
              und der Schweiz ist Claude in Copilot derzeit schlicht nicht aktiviert – und das ist kein Versehen,
              sondern Microsofts Voreinstellung. Für Tenants in der EU, im EWR und in Großbritannien ist die
              Anthropic-Integration standardmäßig ausgeschaltet.
            </p>
            <p>
              Der Grund liegt in der Datenverarbeitung. Anthropic ist bisher nicht in Microsofts EU-Datengrenze
              eingebunden. Werden die Claude-Modelle in Copilot genutzt, kann die Verarbeitung außerhalb des
              europäischen Rechtsraums stattfinden, auf Infrastruktur in den USA. Microsoft sichert für diese
              Modelle also noch nicht zu, dass die Verarbeitung innerhalb der europäischen Datengrenze und der
              gewohnten Azure-Umgebung des Unternehmens bleibt. Solange das so ist, bleibt für viele
              Datenschutzverantwortliche die saubere Entscheidung, den Schalter aus zu lassen, bis die rechtlichen
              Fragen geklärt sind. Wer tiefer einsteigen will, findet die Details in unserem Artikel zum{" "}
              <Link to="/wissen/copilot-flex-routing-eu-verarbeitung" className="text-primary hover:underline">
                Flex Routing und der EU-Verarbeitung
              </Link>.
            </p>
            <p>
              Meine Einschätzung nach allem, was bislang sichtbar ist: Diese Einschränkung wird wahrscheinlich nicht
              von Dauer sein. Microsoft und Anthropic haben ihre Zusammenarbeit mit einem milliardenschweren
              Azure-Abkommen unterlegt, und der Druck, Anthropics Modelle auch innerhalb der EU-Datengrenze
              anzubieten, ist erheblich. Es spricht einiges dafür, dass die europäische Aktivierung kommt – ein
              festes Datum nennt Microsoft bislang aber nicht, und darauf sollte man keine Einführungspläne bauen.
              Die kluge Vorbereitung besteht darin, agentische Arbeitsweisen schon jetzt mit den verfügbaren,
              OpenAI-gestützten Funktionen einzuüben. Die zugrunde liegende Logik ändert sich nicht, wenn später das
              Modell wechselt.
            </p>
          </div>
        </section>

        {/* Gruppen nicht mischen */}
        <section id="gruppen-nicht-mischen" className="mb-6">
          <h2 className="!mt-10 !mb-2 text-2xl md:text-3xl font-bold">
            Warum wir die Lerngruppen nicht mischen
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Wir bieten Trainings und Workshops für alle drei Nutzungsvarianten an: für den kostenlosen Copilot
              Chat, für Microsoft 365 Copilot mit den OpenAI-Modellen und für die agentische Arbeit mit den
              Claude-Modellen. Was wir bewusst nicht tun, ist, diese Gruppen in einen Raum zu setzen. Das klingt
              nach organisatorischem Detail, ist aber eine Lehre aus vielen Trainings. Und, ehrlich gesagt, aus ein
              paar, die ziemlich schiefgegangen sind.
            </p>
            <p>
              Die Nutzungsweise und die verfügbaren Funktionen unterscheiden sich zwischen den Stufen so stark, dass
              ein gemeinsames Training fast zwangsläufig eine der Gruppen frustriert. Wer nur den kostenlosen Chat
              hat und eine Stunde lang Agenten und app-übergreifende Workflows vorgeführt bekommt, sieht vor allem
              Dinge, die auf seinem Rechner nicht funktionieren – das demotiviert, statt zu befähigen. Umgekehrt
              langweilt sich ein erfahrener Lizenznutzer in einem Chat-Grundlagenkurs und nimmt wenig mit. Lernen
              funktioniert dann am besten, wenn das Gezeigte exakt dem entspricht, was die Teilnehmer hinterher auch
              vor sich haben. Deshalb sortieren wir nach tatsächlicher Lizenz- und Nutzungssituation und passen
              Inhalte, Beispiele und Übungen daran an. Welche Formate dafür zur Verfügung stehen, sehen Sie in{" "}
              <Link to="/unsere-angebote" className="text-primary hover:underline">
                unseren Angeboten
              </Link>; bei Unsicherheit klären wir vorab gemeinsam, welche Variante in Ihrem Haus tatsächlich im
              Einsatz ist.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-6">
          <h2 className="!mt-10 !mb-2 text-2xl md:text-3xl font-bold">
            Häufig gestellte Fragen
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Autor-Card */}
        <section className="mt-12 mb-6">
          <Card className="bg-muted/30">
            <CardContent className="flex flex-col sm:flex-row gap-6 pt-6">
              <img
                src={martinLang.image}
                alt={martinLang.name}
                className="w-24 h-24 rounded-full object-cover"
                loading="lazy"
              />
              <div>
                <h3 className="text-lg font-semibold">{martinLang.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{martinLang.role}</p>
                <p className="text-sm leading-relaxed">{martinLang.bio}</p>
                {martinLang.qualifications && martinLang.qualifications.length > 0 && (
                  <p className="text-sm text-muted-foreground mt-2">
                    <strong>Qualifikationen:</strong> {martinLang.qualifications.join(", ")}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </section>

        <AuthorBio author={martinLang} />
      </ContentLayout>
    </>
  );
};

export default CopilotVariantenUnterschiede;

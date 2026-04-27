import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";
import { Link } from "react-router-dom";

const SLUG = "copilot-pages-loop-notebooks-sharepoint-workflows";
const PAGE_TITLE = "Copilot Pages, Loop, Notebooks, SharePoint: Warum Ihre Workflows ein Update brauchen";

const CopilotPagesLoopNotebooksSharepointWorkflows = () => {
  const martinLang = getAuthor("martin-lang")!;

  const ids = generateSchemaIds(SLUG, 'wissen');
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const tableOfContents = [
    { id: "was-sich-veraendert-hat", title: "Was sich seit 2023 verändert hat", level: 2 },
    { id: "loop", title: "Microsoft Loop: wenn ein Team gleichzeitig denkt", level: 2 },
    { id: "sharepoint", title: "SharePoint-Seiten: Wissen, das die Person überlebt", level: 2 },
    { id: "notebook", title: "Copilot Notebook: wenn aus Material Erkenntnis werden soll", level: 2 },
    { id: "pages", title: "Copilot Pages: der unterschätzte Pairing-Modus mit der KI", level: 2 },
    { id: "integration", title: "So greifen die vier Werkzeuge ineinander", level: 2 },
    { id: "unbequeme-wahrheit", title: "Die unbequeme Wahrheit über Tool-Wechsel", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
  ];

  const faqs = [
    {
      name: "Wie überzeuge ich mein Team, von Word und E-Mail auf Loop umzusteigen?",
      answer: "Argumente überzeugen hier weniger als Anlässe. Wir starten in Trainings nie mit einer Generalumstellung, sondern mit einem wiederkehrenden Termin – meist einem Wochenmeeting –, in dem das Protokoll künftig direkt als Loop-Komponente entsteht. Sobald die Teilnehmer einmal erleben, dass es kein Nachsenden mehr gibt und die Aufgaben mit Verantwortlichem in derselben Komponente leben, kippt die Akzeptanz von selbst. Genau diese geführten Umstellungen begleiten wir in unseren Praxistrainings."
    },
    {
      name: "Brauchen wir das Copilot-Add-on, um diese vier Tools sinnvoll zu nutzen?",
      answer: "Loop und SharePoint funktionieren in den meisten Microsoft-365-Tarifen ohne Add-on. Pages und das Copilot Notebook in vollem Funktionsumfang sind an die Copilot-Lizenz gebunden. Vor einer Investitionsentscheidung lohnt sich ein nüchterner Use-Case-Schnitt: Welche Rollen brauchen die KI-Funktionen tatsächlich, und welche kommen mit den Bordmitteln aus. Wir beraten dazu in Workshops, in denen die Lizenzfrage gemeinsam mit der täglichen Arbeitspraxis diskutiert wird."
    },
    {
      name: "Was passiert mit unseren bestehenden SharePoint-Seiten und Dateiablagen?",
      answer: "In den allermeisten Organisationen gibt es einen Bestand an SharePoint-Seiten, der über Jahre gewachsen ist und niemandem so richtig gehört. Eine pauschale Migration ist selten der richtige Weg. Wir empfehlen einen Audit, der unterscheidet, welche Inhalte tatsächlich aktiv genutzt werden, welche stillgelegt gehören und welche eine klare Pflegeverantwortung bekommen müssen. Erst danach lohnt sich die Investition in eine moderne Struktur."
    },
    {
      name: "Wie verhindern wir, dass Copilot in Notebooks falsche Antworten gibt?",
      answer: "Die wichtigste Stellschraube ist die Qualität der Quellen, die Sie in den Notebook-Kontext aufnehmen. Halluzinationen entstehen vor allem dann, wenn das Notebook Lücken im Material überbrücken muss. Wir trainieren in unseren Sessions Strategien, wie Sie Quellen auswählen, strukturieren und mit präzisen Anweisungen arbeiten, damit das Notebook seine Stärken ausspielt."
    },
    {
      name: "Wer pflegt eigentlich die Inhalte, die in Loop oder Pages entstehen?",
      answer: "Genau das ist die Frage, an der viele Einführungen scheitern. Loop und Pages sind nicht für dauerhafte Dokumentation gedacht. Wenn Inhalte stabil werden sollen, müssen sie in eine SharePoint-Struktur überführt werden, mit benannter Verantwortung und einem Pflege-Rhythmus. Diesen Übergang aktiv zu organisieren, statt ihn dem Zufall zu überlassen, ist einer der wichtigsten Hebel, um aus den vier Werkzeugen einen tragfähigen Workflow zu bauen."
    },
    {
      name: "Wie führen wir eine solche Workflow-Umstellung an mehreren Standorten zugleich ein?",
      answer: "Skalierung gelingt selten über eine zentrale Schulungswelle. Tragfähig ist meist ein Multiplikatorenmodell: Pro Team gibt es eine Person, die die neuen Workflows zuerst eingeübt hat und sie im Alltag vorlebt. Diese Multiplikatoren bilden wir in unseren Lernreisen über mehrere Wochen aus, sodass die Umstellung in den Standorten nicht als Mitteilung von oben ankommt, sondern als gelebte Praxis im jeweiligen Team."
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": ids.article,
        "headline": PAGE_TITLE,
        "description": "Copilot Pages, Loop, Notebooks und SharePoint im Vergleich: Welches Microsoft-365-Tool wofür gemacht ist – und wie Sie Ihre Workflows an die neue KI-Realität anpassen.",
        "author": getAuthorSchemaMarkup(martinLang),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization"
        },
        "datePublished": "2026-04-27",
        "dateModified": "2026-04-27",
        "keywords": ["Copilot Pages", "Microsoft Loop", "Copilot Notebook", "SharePoint Seiten", "Microsoft 365 Workflows", "Copilot Zusammenarbeit", "Teams Loop Komponenten", "Copilot Lizenz"],
        "articleSection": "Microsoft 365 Copilot",
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
        title={PAGE_TITLE}
        description="Copilot Pages, Loop, Notebooks und SharePoint im Vergleich: Welches Microsoft-365-Tool wofür gemacht ist – und wie Sie Ihre Workflows an die neue KI-Realität anpassen."
        keywords={["Copilot Pages", "Microsoft Loop", "Copilot Notebook", "SharePoint Seiten", "Microsoft 365 Workflows", "Copilot Zusammenarbeit"]}
        canonicalUrl={pageUrl}
        schema={schema}
        author={martinLang}
        publishedTime="2026-04-27T09:00:00+02:00"
        modifiedTime="2026-04-27T09:00:00+02:00"
      />

      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "Pages, Loop, Notebooks, SharePoint", href: `/wissen/${SLUG}` }
        ]}
        title={PAGE_TITLE}
        description="Welches Microsoft-365-Tool ist wofür gemacht – und warum Ihre Workflows aus 2023 in 2026 nicht mehr funktionieren."
        lastUpdated="27. April 2026"
        authorName="Martin Lang"
        tableOfContents={tableOfContents}
        relatedContent={[
          "wissen:copilot-im-unternehmen-einfuehren-leitfaden",
          "wissen:copilot-digitales-gedaechtnis",
          "wissen:microsoft-copilot-lizenzen",
          "wissen:copilot-tipps-tricks-produktivitaet"
        ]}
      >
        {/* Schnellantwort */}
        <Card className="mb-6 border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-red-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Schnellantwort
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base leading-relaxed">
              Microsoft hat seine Zusammenarbeitslandschaft in den letzten zwei Jahren neu zugeschnitten. Wer heute noch mit den Reflexen von 2023 arbeitet – also alles in Word, vieles per E-Mail, Wissen verstreut auf Laufwerken – verschenkt Zeit und die Antwortqualität, die Copilot eigentlich liefern könnte. Vier Werkzeuge spielen die Hauptrolle: Microsoft Loop für gemeinsames Denken, SharePoint für dauerhaftes Wissen, das Copilot Notebook für tiefe Analyse und Copilot Pages als persönlicher Denkraum mit der KI. Wer diese vier sauber auseinanderhält, arbeitet messbar schneller und bekommt von Copilot die Antworten, die im offenen Chat allein nicht entstehen.
            </p>
          </CardContent>
        </Card>

        {/* Einleitung ohne H2 */}
        <div className="prose prose-lg max-w-none dark:prose-invert mb-6">
          <p>
            In den Trainings, die wir bei der Copilotenschule mit Führungsteams machen, fällt mir derselbe Moment immer wieder auf. Jemand zeigt mir, wie er gerade ein Konzept entwickelt – und tut das in einem Word-Dokument, das per Mail an drei Personen ging, die jeweils ihre Version zurückgeschickt haben. Dazwischen liegt ein Copilot-Chat, der irgendwo im Verlauf verschwunden ist. Das Ergebnis kennen Sie: drei Versionen heißen „final", die wirklich gute Idee steht in einer E-Mail, und in vier Wochen findet niemand mehr den aktuellen Stand. Das ist kein Bedienungsfehler, sondern ein Workflow, der für die Microsoft-Welt von 2022 gebaut wurde und in der Microsoft-Welt von 2026 nicht mehr funktioniert.
          </p>
        </div>

        {/* Was sich verändert hat */}
        <section id="was-sich-veraendert-hat" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Was sich seit 2023 verändert hat</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert mb-6">
            <p>
              Microsoft hat in kurzer Zeit nicht ein neues Tool veröffentlicht, sondern vier, die jeweils ein eigenes Stück Arbeit beanspruchen. Loop, Pages, das Copilot Notebook und die überarbeiteten SharePoint-Seiten sind keine kosmetischen Erweiterungen bestehender Anwendungen, sondern eigenständige Antworten auf Probleme, die Word, Outlook und das klassische Dateiablage-Modell nie gut gelöst haben. Wer das ignoriert und alles weiter in den vertrauten Containern bearbeitet, lässt nicht nur Komfort liegen, sondern verschenkt vor allem die Stärke, die Copilot hat, wenn er im richtigen Kontext arbeitet.
            </p>
            <p>
              Genau dort liegt der Punkt, der in den meisten Diskussionen über Microsoft 365 untergeht: Copilot wird in jedem dieser vier Tools spürbar unterschiedlich gut. Die Antwortqualität hängt nicht nur vom Modell ab, sondern davon, wie eng der Kontext gefasst ist, in dem die KI arbeitet. Im offenen Chat ist alles möglich, aber wenig präzise. In einem Notebook mit ausgewählten Quellen wird die Antwort scharf. In einer Loop-Seite wird sie zu einer gemeinsamen Arbeitsgrundlage. Auf einer SharePoint-Seite wird sie über die Person hinaus haltbar.
            </p>
            <p>
              Bevor ich auf die einzelnen Werkzeuge eingehe, ein kurzer Lizenzhinweis, weil er in der Praxis immer wieder für Verwirrung sorgt: Loop und SharePoint sind in den meisten Microsoft-365-Tarifen ohne Zusatzkosten enthalten. Pages und das Copilot Notebook in vollem Funktionsumfang setzen ein Copilot-Add-on voraus. Welche Variante in Ihrer Organisation aktiv ist, sollten Sie kennen, bevor Sie Workflows umstellen – die Details dazu finden Sie in unserem Überblick zu den{" "}
              <Link to="/wissen/microsoft-copilot-lizenzen" className="text-primary hover:underline font-medium">
                Microsoft-Copilot-Lizenzen
              </Link>.
            </p>
          </div>
        </section>

        {/* Loop */}
        <section id="loop" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Microsoft Loop: wenn ein Team gleichzeitig denkt</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert mb-6">
            <p>
              Loop ist die Antwort auf das Problem, das man am besten an einem Symptom erkennt: Wenn eine Datei „Konzept_v3_final_neu_FINAL.docx" heißt, war Loop das Werkzeug, das hier die ganze Zeit gefehlt hat. Loop-Seiten bestehen aus Bausteinen – Listen, Tabellen, Notizen, Aufgaben – die mehrere Personen gleichzeitig bearbeiten und die sich überall einbetten lassen, wo Microsoft 365 läuft. Eine Tabelle, die in einer Loop-Seite entsteht, kann genauso in einer Teams-Unterhaltung oder in einer Outlook-Mail leben, ohne den Kontext zu verlieren. Was an einer Stelle geändert wird, ist überall sofort aktuell.
            </p>
            <p>
              In der Praxis ändert das die Mechanik einer Besprechung. Statt im Nachgang ein Protokoll zu schreiben, das jemand abtippt und versendet, entsteht das Protokoll während des Gesprächs als Loop-Komponente, an der alle gleichzeitig schreiben. Die offenen Punkte werden direkt zu Aufgaben mit Verantwortlichem und Frist. Wer später dazustößt, sieht den aktuellen Stand und nicht eine Version vom letzten Donnerstag. Diese Verschiebung wirkt klein, spart aber an einer Stelle Zeit, an der bisher fast jede Organisation routinemäßig Stunden verlor.
            </p>
            <p>
              Was Loop ausdrücklich nicht ist: ein Ort für dauerhafte Dokumentation. Wer eine Prozessbeschreibung erstellt, die in zwei Jahren noch gültig sein soll, ist hier falsch. Loop lebt von Bewegung, und genau diese Bewegung wird zum Nachteil, sobald Inhalte stabil bleiben sollen.
            </p>
          </div>
        </section>

        {/* SharePoint */}
        <section id="sharepoint" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">SharePoint-Seiten: Wissen, das die Person überlebt</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert mb-6">
            <p>
              SharePoint hat in den letzten Jahren einen Imagewandel hinter sich, den viele in Unternehmen noch nicht mitbekommen haben. Wer SharePoint vor allem als verkappten Dateiserver kennt, in dem Berechtigungen mysteriös sind und Suchen selten zum Ziel führt, hat eine veraltete Vorstellung des Werkzeugs. Aktuelle SharePoint-Seiten sind als publizierende Wissensplattform gedacht: strukturiert, durchsuchbar, mit klaren Verantwortlichkeiten und – seit der Integration von Copilot-Agents – auch über natürliche Sprache abfragbar.
            </p>
            <p>
              Der entscheidende Unterschied zu Loop liegt im Lebenszyklus der Inhalte. SharePoint-Seiten beantworten die Frage, wo das Onboarding-Dokument liegt, nach welchem Verfahren ein Reisekostenantrag bearbeitet wird oder welche Sicherheitsrichtlinie für externe Zugriffe gilt. Das sind Inhalte, die nicht jede Woche neu verhandelt werden, sondern eine ganze Organisation tragen sollen, oft über Jahre.
            </p>
            <p>
              Hier liegt auch die unbequeme Wahrheit, die in den meisten Beratungsprojekten irgendwann auf den Tisch muss: Eine SharePoint-Seite ohne klare Pflegeverantwortung ist auf Sicht schädlicher als gar keine Seite. Veraltete Richtlinien, die offiziell erscheinen, kosten Vertrauen und produzieren falsche Entscheidungen. Wer SharePoint ernst nimmt, muss die Pflege ernst nehmen, sonst wird das Werkzeug zum Risiko.
            </p>
          </div>
        </section>

        {/* Notebook */}
        <section id="notebook" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Copilot Notebook: wenn aus Material Erkenntnis werden soll</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert mb-6">
            <p>
              Das Copilot Notebook ist das Werkzeug, das in der öffentlichen Wahrnehmung am wenigsten Aufmerksamkeit bekommt und in der täglichen Praxis am meisten unterschätzt wird. Es ist gedacht für die Situation, in der jemand vor einem Stapel zusammenhängender Quellen sitzt – zehn PDFs, drei Meeting-Mitschriften, ein paar Mails, ein internes Dokument – und daraus eine Bewertung, eine Empfehlung oder eine Entscheidung ableiten soll.
            </p>
            <p>
              In dieser Situation versagt der normale Copilot-Chat regelmäßig. Er wirkt zu allgemein, weil er nicht weiß, welche Quellen relevant sind. Er halluziniert, weil er Lücken mit Wahrscheinlichkeit füllt. Im Notebook ist genau das anders gelöst: Sie definieren den Kontext einmal sauber – diese Dateien, diese Notizen, dieser Chat – und alle Antworten beziehen sich auf dieses abgegrenzte Material. Das senkt die Halluzinationsrate, schärft die Antworten und erlaubt Auswertungen, die im offenen Chat schlicht nicht möglich sind. Wer mehr darüber wissen will, wie sich Halluzinationen systematisch eindämmen lassen, findet in unserem Beitrag zu{" "}
              <Link to="/wissen/ki-halluzinationen-vermeiden" className="text-primary hover:underline font-medium">
                KI-Halluzinationen
              </Link>{" "}
              die methodischen Grundlagen.
            </p>
            <p>
              Die Erfahrung aus den Trainings ist eindeutig: Wer das Notebook ein- oder zweimal für eine ernsthafte Recherche eingesetzt hat, verändert seine Einschätzung von Copilot grundlegend. Die wiederkehrende Diskussion über „halluziniert die KI nicht zu viel" verstummt, weil sie sich an einem Werkzeug entzündet hatte, das für andere Aufgaben gebaut ist.
            </p>
          </div>
        </section>

        {/* Pages */}
        <section id="pages" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Copilot Pages: der unterschätzte Pairing-Modus mit der KI</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert mb-6">
            <p>
              Pages ist das Werkzeug, das ich selbst am intensivsten nutze – und gleichzeitig das, das auch erfahrene Anwenderinnen und Anwender in unseren Trainings am meisten überrascht. Wer mit Copilot Texte oder Ergebnisse entwickelt, kennt die Reibung: Eine gute Antwort steht im Chat, man kopiert sie in Word, ändert dort eine Stelle, lässt Copilot eine neue Variante generieren – und verliert beim Hin- und Herkopieren regelmäßig die Abschnitte, die längst gut waren.
            </p>
            <p>
              Genau diese Reibung verschwindet mit der Funktion „in Pages bearbeiten". Aus dem Chat heraus übernehmen Sie das Ergebnis in eine Page und arbeiten dort im Pairing-Modus weiter: Sie schreiben direkt in den Text hinein, markieren einzelne Passagen und lassen Copilot an genau dieser Stelle umformulieren, kürzen oder ergänzen – ohne dass die übrigen Abschnitte beim nächsten Generieren verschwinden. Das ist kein Chat mehr und kein klassisches Dokument, sondern ein gemeinsamer Arbeitsraum, in dem Mensch und KI an demselben Text bleiben. ChatGPT hat dafür übrigens eine fast identische Funktion namens „Canvas".
            </p>
            <p>
              Was im Training regelmäßig für den größten Aha-Moment sorgt: Selbst Teilnehmende, die seit über einem Jahr täglich mit Copilot arbeiten, haben diese Funktion oft noch nie genutzt. Sobald sie einmal erlebt haben, wie viel ruhiger und präziser das Schreiben damit wird, stellen sie ihren Workflow innerhalb weniger Tage komplett um. Genau deshalb ist Pages für mich der unterschätzteste Hebel unter den vier Werkzeugen – und in vielen Fällen der erste, den ich in einer Session zeige, weil sich danach das Verhältnis zur KI verändert.
            </p>
          </div>
        </section>

        {/* Integration */}
        <section id="integration" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">So greifen die vier Werkzeuge ineinander</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert mb-6">
            <p>
              In Workshops kommt fast immer dieselbe Frage: welches Tool man jetzt nehmen soll. Die Antwort enttäuscht zunächst – sie stellt sich in der Praxis selten als Entweder-oder, weil ein typisches Projekt fast immer alle vier durchläuft, nur in unterschiedlicher Intensität. Eine Recherche beginnt im Notebook, wo das vorhandene Material gesichtet und mit Copilot ausgewertet wird. Aus den Erkenntnissen entsteht in Pages ein erstes Konzept, das eine einzelne Person mit der KI durchspielt, verwirft und neu schreibt. Sobald das Konzept tragfähig ist, wandert es in eine Loop-Seite, in der das Team es gemeinsam zur Umsetzung bringt. Was am Ende stabil ist und für andere gelten soll, wird auf einer SharePoint-Seite veröffentlicht und damit Teil des organisationalen Gedächtnisses.
            </p>
            <p>
              Wer diese Sequenz einmal bewusst durchgespielt hat, merkt, dass sich der Charakter der eigenen Arbeit verschiebt. Weniger Datei-Versionen, weniger Mails mit Anhängen, weniger Suchen nach dem aktuellen Stand. Stattdessen klare Übergänge zwischen Phasen, in denen die KI jeweils auf andere Weise hilfreich wird.
            </p>
          </div>
        </section>

        {/* Unbequeme Wahrheit */}
        <section id="unbequeme-wahrheit" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Die unbequeme Wahrheit über Tool-Wechsel</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert mb-6">
            <p>
              Es wäre zu einfach zu sagen, dass diese vier Werkzeuge die Probleme der Zusammenarbeit von selbst lösen. In den meisten Unternehmen scheitert die Umstellung nicht an den Tools, sondern an der Gewohnheit. Wer zwanzig Jahre Word und Outlook gelebt hat, greift in Stresssituationen zu dem, was vertraut ist, nicht zu dem, was passt. Die neuen Werkzeuge bleiben in Trainings sympathisch und im Alltag ungenutzt.
            </p>
            <p>
              Ein Workflow-Update gelingt nicht durch eine Mitteilung im Intranet. Es gelingt, wenn Teams gemeinsam an einem realen Anlass umstellen, wenn Führungskräfte vorleben, dass das Protokoll künftig in Loop entsteht und nicht im Mail-Anhang, und wenn jemand benennt, welche Inhalte bewusst auf SharePoint wandern und damit verbindlich werden. Das ist Arbeit, die sich auszahlt, aber sie passiert nicht nebenbei.
            </p>
            <p>
              Genau an diesem Punkt setzen die Trainings der Copilotenschule an. Wir reden in den Sessions wenig über die Oberflächen und viel über die Frage, welcher Workflow zu welchem Anlass passt – und wie Sie Ihre Teams dorthin bekommen, dass die neuen Reflexe nicht nur im Schulungsraum funktionieren, sondern in der nächsten Projektsitzung. Wer die Umstellung strukturiert angehen will, findet in unserer{" "}
              <Link to="/trainings/copilot-lernreise-8-wochen" className="text-primary hover:underline font-medium">
                Copilot-Lernreise
              </Link>{" "}
              das passende Format dafür.
            </p>
          </div>

          <Card className="bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 mb-6">
            <CardContent className="pt-6">
              <p className="text-amber-900 dark:text-amber-200 leading-relaxed text-sm">
                <strong>Ein erster Schritt zum Ausprobieren:</strong> Wählen Sie aus Ihrem Kalender ein wiederkehrendes Meeting aus und vereinbaren Sie für die nächsten vier Termine, dass das Protokoll als Loop-Komponente in der Einladung entsteht – gemeinsam, in Echtzeit, mit Aufgaben direkt im Dokument. Nach vier Wochen entscheiden Sie, ob es zurück in die alte Welt geht oder ob die neue Mechanik zum Standard wird.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Häufig gestellte Fragen</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-base font-semibold leading-snug">{faq.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </ContentLayout>
    </>
  );
};

export default CopilotPagesLoopNotebooksSharepointWorkflows;

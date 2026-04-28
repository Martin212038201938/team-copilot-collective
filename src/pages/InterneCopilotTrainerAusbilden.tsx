import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import AuthorBio from "@/components/AuthorBio";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";
import { Link } from "react-router-dom";

const SLUG = "interne-copilot-trainer-ausbilden";
const PAGE_TITLE = "Wir bilden Ihre internen Copilot-Multiplikatoren aus. Wie gute Inhouse-Change-Begleitung im Alltag den Unterschied macht";
const PAGE_DESCRIPTION = "Interne Copilot-Multiplikatoren tragen den Change im Alltag und schlagen die Brücke zwischen Trainings und Anwenderpraxis. Was die Copilotenschule-Train-the-Trainer-Ausbildung in vier Tagen plus Begleitung bewirkt.";

const InterneCopilotTrainerAusbilden = () => {
  const martinLang = getAuthor("martin-lang")!;

  const ids = generateSchemaIds(SLUG, 'wissen');
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const tableOfContents = [
    { id: "was-multiplikatoren-tun", title: "Was Multiplikatoren im Rollout wirklich tun", level: 2 },
    { id: "budget-realismus", title: "Multiplikatoren aus Budget-Realismus", level: 2 },
    { id: "warum-vier-tage", title: "Warum die Ausbildung vier Tage braucht – und verzahnt ist", level: 2 },
    { id: "curriculum", title: "Was an Tag 1 bis 4 passiert", level: 2 },
    { id: "wen-schicken", title: "Wen Sie ins Training schicken sollten", level: 2 },
    { id: "begleitung", title: "Was nach den vier Tagen kommt – die fortlaufende Begleitung", level: 2 },
    { id: "zusammenspiel", title: "Wie Multiplikatoren und externe Trainings ineinandergreifen", level: 2 },
    { id: "naechster-schritt", title: "Der nächste Schritt", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
  ];

  const faqs = [
    {
      name: "Was leisten interne Multiplikatoren konkret im Alltag?",
      answer: "Sie sorgen dafür, dass das Gelernte nicht verblasst, sondern im Arbeitsalltag ankommt. Sie treiben die Adoption in den Abteilungen voran und unterstützen dort, wo Trainingsbudgets nicht ausreichen."
    },
    {
      name: "Vier Tage wirken lang – warum nicht kürzer?",
      answer: "Weil drei Kompetenzfelder parallel aufgebaut werden müssen: Praxis, Adoption-Verständnis und Didaktik."
    },
    {
      name: "Wie greifen interne Multiplikatoren und externe Trainings ineinander?",
      answer: "Trainings schaffen Fokuszeit, Multiplikatoren sichern die Umsetzung im Alltag."
    },
    {
      name: "Wie messen wir Wirkung?",
      answer: "Über Adoption-Kennzahlen, qualitative Signale und Geschäftswirkung."
    },
    {
      name: "Was passiert, wenn Multiplikatoren das Unternehmen verlassen?",
      answer: "Wissen bleibt durch mehrere Personen und Materialien im Unternehmen erhalten."
    },
    {
      name: "Wie binden wir Betriebsrat, Datenschutz und IT-Security ein?",
      answer: "Frühzeitig, mit klarer Stakeholder-Kommunikation."
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": ids.article,
        "headline": PAGE_TITLE,
        "description": PAGE_DESCRIPTION,
        "author": getAuthorSchemaMarkup(martinLang),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization"
        },
        "datePublished": "2026-04-28",
        "dateModified": "2026-04-28",
        "keywords": ["Train the Trainer Copilot", "Copilot Multiplikatoren ausbilden", "Copilot Ambassador Programm", "AI Change Begleitung", "Copilot Adoption Multiplikatoren", "Copilot Rollout Begleitung", "Microsoft Copilot Multiplikator"],
        "articleSection": "Enablement & Adoption",
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
        description={PAGE_DESCRIPTION}
        keywords={["Train the Trainer Copilot", "Copilot Multiplikatoren ausbilden", "Copilot Ambassador Programm", "AI Change Begleitung", "Copilot Adoption Multiplikatoren", "Copilot Rollout Begleitung"]}
        canonicalUrl={pageUrl}
        schema={schema}
        author={martinLang}
        publishedTime="2026-04-28T10:00:00+02:00"
        modifiedTime="2026-04-28T10:00:00+02:00"
      />

      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "Train-the-Trainer Copilot", href: `/wissen/${SLUG}` }
        ]}
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        lastUpdated="28. April 2026"
        authorName="Martin Lang"
        tableOfContents={tableOfContents}
        relatedContent={[
          "wissen:copilot-im-unternehmen-einfuehren-leitfaden",
          "wissen:copilot-launch-kampagne",
          "wissen:copilot-training-schulung",
          "wissen:copilot-lernreise-vs-tagesschulung"
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
              Ein Copilot-Rollout lebt von zwei Pfeilern: starken Trainings, die fachliche Tiefe und Begeisterung schaffen, und internen Multiplikatoren, die den Change im Arbeitsalltag begleiten. Idealerweise ersetzen Inhouse-Multiplikatoren keine Trainings – sie sind der Anker dazwischen. Sie sind in der Kaffeeküche greifbar, übersetzen neue Funktionen in die eigene Sprache und tragen den Pulsschlag des Rollouts auch in den Wochen zwischen Lernanlässen. Wer Multiplikatoren aufbauen möchte, sollte das mit derselben Sorgfalt tun wie ein gutes Training. Wir bilden seit Jahren unsere eigenen Trainerinnen und Trainer in vier Tagen Vollzeit plus Online-Begleitung aus – mit verzahnter Didaktik und Fachlichkeit, mit Lehrproben, mit einer kompletten Materialbibliothek und einer fortlaufenden Begleitung über Community of Practice und Update-Pool. Genau dieses Programm öffnen wir jetzt auch für Firmenkunden, die ihre eigenen Copilot-Multiplikatoren mit derselben Sorgfalt aufbauen wollen.
            </p>
          </CardContent>
        </Card>

        {/* Einleitung ohne H2 */}
        <div className="prose prose-lg max-w-none dark:prose-invert mb-4">
          <p>
            In den Gesprächen, die wir derzeit mit L&D-Leitungen und Geschäftsführungen aus dem DACH-Raum führen, kehrt ein Bild mit fast identischen Worten wieder: Der Pilot lief gut, die ersten Trainings haben gewirkt, einzelne Bereiche zeigen erste Erfolge – und jetzt steht das Unternehmen vor der Frage, wer den Rollout in der Breite trägt, wenn die Aufmerksamkeit nicht mehr auf jedem einzelnen Bereich liegen kann. An dieser Stelle kommen Multiplikatoren – manchmal auch Ambassadoren oder Botschafter genannt – ins Spiel: Menschen aus dem eigenen Haus, die das, was in Trainings vermittelt wurde, in den Alltag tragen.
          </p>
        </div>

        {/* Was Multiplikatoren tun */}
        <section id="was-multiplikatoren-tun" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Was Multiplikatoren im Rollout wirklich tun</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert mb-4">
            <p>
              Trainings haben eine klare Stärke: Sie schaffen Fokuszeit, in der Mitarbeitende einmal aus dem Tagesgeschäft heraustreten und sich konzentriert mit Copilot beschäftigen können. In dieser Zeit entstehen die fachlichen Grundlagen, das methodische Selbstvertrauen und – im besten Fall – die Begeisterung, mit der jemand am nächsten Tag mit anderen Augen vor dem eigenen Posteingang sitzt. Diese Wirkung ist real, sie ist messbar und die Voraussetzung dafür, dass aus einem Lizenzkostenposten überhaupt eine Veränderung wird.
            </p>
            <p>
              Was Trainings allein nicht leisten können – aufgrund ihrer Form, nicht aufgrund ihrer Qualität –, ist die laufende Präsenz im Arbeitsalltag zwischen den Sessions: die Frage in der Kaffeeküche, der schnelle Blick auf einen Prompt, der nicht zündet, die Übersetzung eines neuen Features in den eigenen Prozess. Genau an dieser Stelle setzen Multiplikatoren an. Sie sind die Person im Team, die im richtigen Moment greifbar ist, die Sprache der eigenen Prozesse spricht und das im Training Gelernte in einen Anwendungsfall überführt, den die Mitarbeitenden tatsächlich vor sich haben. Eine systematische Einordnung der Rollout-Phasen finden Sie in unserem{" "}
              <Link to="/wissen/copilot-im-unternehmen-einfuehren-leitfaden" className="text-primary hover:underline font-medium">
                Leitfaden für die Copilot-Einführung im Unternehmen
              </Link>.
            </p>
          </div>
        </section>

        {/* Budget-Realismus */}
        <section id="budget-realismus" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Multiplikatoren aus Budget-Realismus – wenn die optimale Lösung nicht ins Budget passt</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert mb-4">
            <p>
              In offenen Gesprächen mit Geschäftsführern und L&D-Verantwortlichen kommt der Punkt früher oder später auf den Tisch: Selten wird das Multiplikatoren-Modell ohne finanziellen Druck aufgesetzt – was eigentlich schade ist. Oft ist es eine Antwort auf ein Budget, das nicht reicht, um eine ganze Belegschaft vollständig durch externe Trainings mit professionellen Anbietern zu führen. Diese Realität gehört in einen ehrlichen Text.
            </p>
            <p>
              Ist jemand, der als Trainer Erfahrungen sammelt und viele Firmenkunden bereits bei der KI-Einführung begleitet hat, besser als eine interne Person, die diese Aufgabe zusätzlich zum Tagesgeschäft übernimmt? Ja. Fachkenntnis, didaktische Fähigkeiten und die Übersicht über relevante Use Cases je Personengruppe sind auf einem anderen Niveau. Es gibt Menschen, die sich ausschließlich mit Trainings beschäftigen und diese kontinuierlich verbessern. Allerdings kosten solche Trainer entsprechend – auch bei uns.
            </p>
            <p>
              In vielen Unternehmen sind die Budgets derzeit jedoch so knapp, dass darüber nachgedacht wird, Copilot-Einführungen ohne ausreichende Begleitung durchzuführen. „Da muss man ja nur etwas in das Chatfeld schreiben, kann ja nicht so schwer sein. X und Y haben doch Ahnung davon, die sollen das den Kolleginnen und Kollegen beibringen." Davon raten wir ab. Wir haben 2025 gesehen, wohin das führt: in vielen Fällen zu Frust, niedriger Adoption und zu riskanten Rechts- und Sicherheitsverstößen durch unzureichend geschulte Nutzer. Eine solide und strukturierte Ausbildung dieser Inhouse-Multiplikatoren ist zwar nicht so wirksam wie eine umfassende externe Trainingsserie, aber deutlich besser als gar keine Begleitung.
            </p>
          </div>
        </section>

        {/* Warum vier Tage */}
        <section id="warum-vier-tage" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Warum die Ausbildung vier Tage braucht – und verzahnt ist</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert mb-4">
            <p>
              Wer am Tag nach der Ausbildung im eigenen Haus zwischen einer Skeptikerrunde, einem Power User und einem Adoption-Gespräch mit der Geschäftsleitung wechselt, benötigt drei Kompetenzfelder gleichzeitig: fortgeschrittene Copilot-Praxis, ein belastbares Verständnis von Adoption-Programmen und didaktisches Werkzeug für unterschiedliche Zielgruppen. Diese drei Dimensionen lassen sich seriös nicht in einem Tag aufbauen.
            </p>
            <p>
              Deshalb verzahnen wir diese Dimensionen täglich, statt sie zu trennen. Ein typischer Vormittag bewegt sich zwischen fachlicher Vertiefung, didaktischer Reflexion und Elementen der Adoption-Architektur. Am Ende der vier Tage entsteht ein integriertes Bild davon, wie Lernen, Werkzeug und Programmlogik zusammenwirken.
            </p>
          </div>
        </section>

        {/* Curriculum */}
        <section id="curriculum" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Was an Tag 1 bis 4 passiert</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert mb-4">
            <p>
              Der erste Tag fokussiert die eigene Praxis. Selbst erfahrene Nutzer entdecken Funktionen, Nutzungsszenarien und Wissenslücken im Microsoft-365- und Copilot-Ökosystem. Parallel reflektieren wir didaktisch, wie diese Inhalte vermittelt werden können. Der Tag endet mit einer kurzen Lehrprobe.
            </p>
            <p>
              Der zweite Tag vertieft Workflows, Use Cases und Teilautomatisierung von Prozessen. Wir behandeln Agenten und Copilot Studio, sichere Verbreitungsprozesse sowie die Anbindung statischer und dynamischer Quellen – verständlich für technisch interessierte Büroanwender.
            </p>
            <p>
              Der dritte Tag fokussiert rechtssichere Praxis und typische Konfliktzonen: DSGVO, EU AI Act, Datenklassifizierung und sensible Daten. Zudem bearbeiten wir den Umgang mit Widerständen und führen realistische Stakeholder-Simulationen durch. Teilnehmende erarbeiten Workshops und Checklisten für den praktischen Einsatz im Rollout.
            </p>
            <p>
              Der vierte Tag widmet sich dem Adoption- und Change-Prozess. Wir zeigen, wie Use Cases identifiziert und bewertet werden und wie diese Fähigkeit in die Organisation getragen wird. Die Teilnehmenden entwickeln ihr eigenes Programm, definieren relevante Kennzahlen und erstellen eine erste Roadmap mit konkreten To-dos. Wer einen methodischen Hintergrund zur didaktischen Architektur sucht, findet in unserem Beitrag zum{" "}
              <Link to="/wissen/copilot-lernreise-vs-tagesschulung" className="text-primary hover:underline font-medium">
                Vergleich zwischen Lernreise und Tagesschulung
              </Link>{" "}
              und in der{" "}
              <Link to="/wissen/copilot-launch-kampagne" className="text-primary hover:underline font-medium">
                Copilot-Launch-Kampagne
              </Link>{" "}
              die fachliche Grundierung.
            </p>
          </div>

          <Card className="bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 mb-4">
            <CardContent className="pt-6">
              <p className="text-amber-900 dark:text-amber-200 leading-relaxed text-sm">
                <strong>Was Teilnehmende mitnehmen:</strong> Unsere kompletten Trainings-Decks (PPTX) zur freien internen Nutzung, fertige Übungsaufgaben, Kommunikations- und Change-Templates, FAQ-Sammlungen sowie Infomaterialien fürs Intranet. Eine Prompt-Bibliothek bauen Sie im Training mit echten Anwendungsfällen aus Ihrer Organisation – das ist mehr wert als jede vorgefertigte Liste.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Wen schicken? Checkliste */}
        <section id="wen-schicken" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Wen Sie ins Training schicken sollten</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert mb-4">
            <p>
              Eine der häufigsten Fragen, die uns Verantwortliche stellen, lautet: „Wer in unserem Haus eignet sich eigentlich?" Eine ehrliche Antwort vorweg: Es geht nicht um Rang, sondern um Eignung. Die wirksamsten Multiplikatoren, die wir in den letzten Jahren ausgebildet haben, kamen aus ganz unterschiedlichen Funktionen – aus dem Vertriebsinnendienst, aus HR, aus dem Controlling, aus der Assistenz, aus IT und Fachabteilung. Was sie verband, waren weniger Job-Titel als bestimmte Eigenschaften.
            </p>
          </div>

          <Card className="border-2 border-emerald-300 bg-emerald-50/40 dark:bg-emerald-950/20 dark:border-emerald-800 mb-4">
            <CardHeader>
              <CardTitle className="text-base">Eine kurze Checkliste für die Auswahl</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Technisch interessiert, aber nicht zwingend aus der IT.</strong> Mitarbeitende aus allen Fachabteilungen sind willkommen – entscheidend ist die Neugier auf neue Werkzeuge, nicht der formale Hintergrund.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Gute Kommunikationsskills.</strong> Multiplikatoren erklären, übersetzen und verhandeln – täglich. Wer Freude daran hat, komplexe Dinge in einfache Worte zu fassen, bringt das wichtigste Werkzeug schon mit.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Geduldige Zuhörer und Erklärer.</strong> Die gleiche Frage zum dritten Mal freundlich zu beantworten ist ein zentraler Teil der Rolle. Wer das mag, ist hier richtig.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Ansprechbar und präsent im Alltag.</strong> Die wirksamsten Multiplikatoren sind die, die in der Kaffeeküche und im Teams-Chat erreichbar sind – nicht die gestresstesten High Performer mit doppeltem Kalender. Eine ruhige Verfügbarkeit schlägt formelle Brillanz.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Eigene Copilot-Praxis aus echter Motivation.</strong> Wer Copilot bereits aus eigenem Antrieb länger nutzt und schon ein paar greifbare Erfolge erzielt hat, hat die Energie, andere mitzunehmen – das lässt sich schlecht ersetzen durch ein einmaliges Onboarding.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Weitblick und Grundgefühl für Prozesse.</strong> Wer versteht, wie ein Workflow im eigenen Bereich von A nach Z läuft, erkennt schneller, an welcher Stelle Copilot wirklich hilft – und an welcher er nur zusätzlichen Lärm erzeugt.</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="prose prose-lg max-w-none dark:prose-invert mb-4">
            <p>
              Ein freundlicher Hinweis aus vielen Erfahrungen: Es ist verlockend, ausschließlich Führungskräfte in solche Programme zu schicken – weil sie ohnehin im Kalender präsent sind, weil ihre Teilnahme als Statement wirkt oder weil sie das Budget genehmigt haben. Trotzdem trägt das Multiplikatoren-Modell selten, wenn es nur aus Führungskräften besteht. Die Personen, die im Alltag über Adoption entscheiden, sind oft eine Ebene tiefer: Senior Sachbearbeiter:innen, erfahrene Spezialist:innen, Teamlead-Stellvertretungen. Schicken Sie diejenigen, die am besten geeignet sind – unabhängig vom Rang. Eine bewusst gemischte Gruppe aus Fach- und Führungsebene wirkt erfahrungsgemäß am stärksten.
            </p>
          </div>
        </section>

        {/* Begleitung */}
        <section id="begleitung" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Was nach den vier Tagen kommt – die fortlaufende Begleitung</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert mb-4">
            <p>
              Der erste Baustein ist eine Community of Practice der ausgebildeten Multiplikatoren.
            </p>
            <p>
              Der zweite Baustein ist ein kontinuierlich gepflegter Material- und Update-Pool. Microsoft entwickelt Copilot dynamisch weiter – unsere Multiplikatoren bleiben dadurch auf aktuellem Stand.
            </p>
            <p>
              Diese Bausteine sind kein Zusatz, sondern entscheidend dafür, dass aus einer Ausbildung ein nachhaltiges Programm wird.
            </p>
          </div>
        </section>

        {/* Zusammenspiel */}
        <section id="zusammenspiel" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Wie Multiplikatoren und externe Trainings ineinandergreifen</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert mb-4">
            <p>
              Externe Trainings schaffen Fokuszeit, methodische Frische und fachliche Tiefe.
            </p>
            <p>
              Multiplikatoren übertragen das Gelernte in den Arbeitsalltag und halten den Rollout zwischen Trainings aktiv.
            </p>
            <p>
              Wirksam ist die Kombination. Und wenn das Trainingsbudget begrenzt ist, schließen ausgebildete Multiplikatoren die Lücke deutlich besser als unvorbereitete Mitarbeitende.
            </p>
          </div>
        </section>

        {/* Nächster Schritt */}
        <section id="naechster-schritt" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Der nächste Schritt</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert mb-4">
            <p>
              Wenn Sie prüfen, ob Sie eigene Copilot-Multiplikatoren aufbauen möchten, ist die Train-the-Trainer-Ausbildung der konkrete Ansatzpunkt.
            </p>
          </div>

          <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 mb-4">
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-3">Train-the-Trainer Copilot: Multiplikator:innen mit Tiefe ausbilden</h3>
              <p className="text-base leading-relaxed mb-4">
                Vier Tage Vollzeit, drei verzahnte Dimensionen, komplette Materialbibliothek zur internen Nutzung – ergänzt durch fortlaufende Begleitung.
              </p>
              <Link
                to="/trainings/train-the-trainer-copilot"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Zum Training: Train-the-Trainer Copilot →
              </Link>
            </CardContent>
          </Card>
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Häufig gestellte Fragen</h2>
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

        <AuthorBio author={martinLang} />
      </ContentLayout>
    </>
  );
};

export default InterneCopilotTrainerAusbilden;

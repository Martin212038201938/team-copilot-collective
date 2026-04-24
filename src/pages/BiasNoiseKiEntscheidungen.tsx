import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";
import { Link } from "react-router-dom";

const SLUG = "bessere-entscheidungen-mit-ki";
const PAGE_TITLE = "Bias, Noise und KI: Warum gute Entscheidungen mehr brauchen als ein gutes Bauchgefühl";

const BiasNoiseKiEntscheidungen = () => {
  const saskiaKaden = getAuthor("saskia-kaden")!;

  const ids = generateSchemaIds(SLUG, 'wissen');
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const tableOfContents = [
    { id: "die-entscheidung", title: "Eine Führungskraft entscheidet – und liegt daneben", level: 2 },
    { id: "system-1-2", title: "Learning 1: Ihr Gehirn trifft 95 % Ihrer Entscheidungen ohne Sie", level: 2 },
    { id: "bias-kosten", title: "Learning 2: Bias ist kein Charakterproblem – er kostet Geld, Zeit und Vertrauen", level: 2 },
    { id: "noise", title: "Learning 3: Noise – das Problem, das niemand sieht", level: 2 },
    { id: "ki-kein-filter", title: "Learning 4: KI ist kein Bias-Filter", level: 2 },
    { id: "handwerk", title: "Learning 5: Bessere Entscheidungen sind Handwerk", level: 2 },
    { id: "workshop", title: "Das Workshop-Angebot der Copilotenschule", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
  ];

  const faqs = [
    {
      name: "Wie überzeuge ich das Management, in Entscheidungstraining zu investieren – wenn alle meinen, sie entscheiden schon gut?",
      answer: "Genau das ist das Kernproblem: Menschen, die von kognitiven Verzerrungen betroffen sind, merken es in der Regel nicht. Overconfidence Bias bedeutet, dass wir unsere eigene Urteilsfähigkeit systematisch überschätzen. Hilfreicher als abstrakte Überzeugungsarbeit sind konkrete Zahlen: Welche Projekte in Ihrer Organisation haben Kosten- oder Zeitbudgets deutlich überschritten? Was kostete die letzte Fehlbesetzung auf einer Führungsposition? Was hätte ein strukturiertes Pre-Mortem gebracht? Die Copilotenschule begleitet Sie mit einem Workshop, der genau diese Zahlen sichtbar macht."
    },
    {
      name: "Wir nutzen bereits Copilot – warum sollten wir uns zusätzlich mit Entscheidungspsychologie beschäftigen?",
      answer: "Weil Produktivität und Entscheidungsqualität zwei verschiedene Dinge sind. Copilot macht viele Arbeitsschritte schneller – aber wenn die zugrundeliegenden Urteile verzerrt sind, werden Fehler nur schneller produziert. Wer Copilot als Sparringspartner für Entscheidungen einzusetzen lernt – Pre-Mortem, Gegenargumente, Kriterien-Check – hebt die KI-Nutzung auf ein strategisch höheres Niveau. Genau das vermittelt der Workshop 'Bessere Entscheidungen mit Copilot'."
    },
    {
      name: "Unsere Teams treffen täglich hunderte kleine Entscheidungen – wo soll da der Ansatzpunkt sein?",
      answer: "Nicht jede Entscheidung braucht ein Pre-Mortem. Der Ansatzpunkt sind wiederkehrende Entscheidungstypen mit hohem Einsatz: Personalentscheidungen, Budgetplanung, Projektpriorisierungen, Lieferantenauswahl. Hier sind Bias und Noise am teuersten – und hier wirken strukturierte Methoden am stärksten. Ein Noise Audit, der die Urteilsstreuung im eigenen Team misst, liefert oft überraschende Erkenntnisse. Die Copilotenschule hilft dabei, die richtigen Stellschrauben zu identifizieren."
    },
    {
      name: "Wie messen wir, ob Entscheidungen in unserer Organisation wirklich besser werden?",
      answer: "Über drei Hebel: Erstens Noise Audits – messen, wie stark Urteile bei gleicher Faktenlage variieren. Zweitens Prozessqualität – nutzen Teams Pre-Mortem, strukturierte Kriterien und Devil's Advocate systematisch? Drittens Ergebnisqualität – wie viele Projekte halten Budget- und Zeitrahmen? Wie entwickelt sich die Qualität von Personalentscheidungen? Verbesserungen sind messbar, wenn die Ausgangslage erst einmal sauber dokumentiert ist. Die Copilotenschule zeigt, wie das gelingt."
    },
    {
      name: "Ist das auch als Modul buchbar – ohne einen ganzen Workshoptag zu belegen?",
      answer: "Ja. Der Workshop 'Bessere Entscheidungen mit Copilot' ist auch als 4-Stunden-Kompaktformat buchbar. Außerdem ist das Thema als Modul in die Copilot Lernreise integrierbar – für Organisationen, die Entscheidungsqualität als Teil eines längeren Befähigungsprogramms verankern wollen. Im Training-Konfigurator können Sie die Lernreise modular zusammenstellen."
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": ids.article,
        "headline": PAGE_TITLE,
        "description": "Bias, Noise und KI: Was die Entscheidungsforschung wirklich sagt – und warum Copilot ohne das richtige Handwerk die eigenen Denkfehler automatisiert.",
        "author": getAuthorSchemaMarkup(saskiaKaden),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization"
        },
        "datePublished": "2026-04-24",
        "dateModified": "2026-04-24",
        "keywords": ["Cognitive Bias", "Noise Entscheidungen", "KI Entscheidungsqualität", "Copilot Sparring", "Kahneman System 1 System 2", "Entscheidungspsychologie", "Verhaltensökonomie", "Pre-Mortem"],
        "articleSection": "KI & Entscheidungsqualität",
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
        description="Bias, Noise und KI: Was die Entscheidungsforschung wirklich sagt – und warum Copilot ohne das richtige Handwerk die eigenen Denkfehler automatisiert."
        keywords={["Cognitive Bias", "Noise Entscheidungen", "KI Entscheidungsqualität", "Copilot Sparring", "Kahneman System 1 System 2", "Entscheidungspsychologie"]}
        canonicalUrl={pageUrl}
        schema={schema}
        author={saskiaKaden}
        publishedTime="2026-04-24T09:00:00+02:00"
        modifiedTime="2026-04-24T09:00:00+02:00"
      />

      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "Bessere Entscheidungen mit KI", href: `/wissen/${SLUG}` }
        ]}
        title={PAGE_TITLE}
        description="Bias, Noise und KI: Was die Entscheidungsforschung wirklich sagt – und warum Copilot ohne das richtige Handwerk die eigenen Denkfehler automatisiert."
        lastUpdated="24. April 2026"
        authorName="Saskia Kaden"
        tableOfContents={tableOfContents}
        relatedContent={[
          "workshop:bessere-entscheidungen-mit-copilot",
          "wissen:prompt-bibliotheken-vs-training",
          "wissen:warum-verteiltes-lernen-bei-copilot-trainings-funktioniert",
          "wissen:copilot-adoption-2026-zahlen"
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
              95 % unserer Entscheidungen laufen über System 1 – schnell, automatisch, fehleranfällig. Kognitive Verzerrungen (Bias) sind systematisch und vorhersagbar; zufällige Urteilsstreuung (Noise) kostet Organisationen mindestens genauso viel. KI reduziert Noise, verstärkt aber Bias – es sei denn, man setzt sie bewusst ein. Bessere Entscheidungen sind kein Talent, sondern Handwerk. Und Handwerk lernt man nicht durch Lesen.
            </p>
          </CardContent>
        </Card>

        {/* Opener */}
        <section id="die-entscheidung" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Eine Führungskraft entscheidet – und liegt daneben</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert mb-4">
            <p>
              Eine Abteilungsleiterin hört sich zehn Minuten die Zahlen zur neuen Produktlinie an. Die Präsentation ist überzeugend. Der Kollege, der referiert, ist kompetent. Sie kennt das Unternehmen seit zwölf Jahren. Am Ende nickt sie: „Machen wir." Achtzehn Monate später hat das Projekt das doppelte Budget verbraucht und liefert die Hälfte des versprochenen Umsatzes.
            </p>
            <p>
              War es Pech? Fehlende Daten? Oder ist es das, was passiert, wenn ein gut trainiertes Gehirn so tut, als würde es analysieren – während es in Wirklichkeit wiedererkennt, bestätigt und aus dem Bauch heraus schließt?
            </p>
            <p>
              Die Frage ist nicht, ob das in Ihrer Organisation passiert. Die Frage ist: Wie oft – und was kostet es?
            </p>
          </div>
        </section>

        {/* Learning 1 */}
        <section id="system-1-2" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Learning 1: Ihr Gehirn trifft 95 % Ihrer Entscheidungen ohne Sie</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert mb-4">
            <p>
              Daniel Kahnemans Unterscheidung zwischen System 1 und System 2 ist keine Theorie. Sie ist eine nüchterne Beschreibung, wie Entscheidungen zustande kommen. System 1 arbeitet schnell, intuitiv, automatisch – es erkennt Muster, zieht Schlüsse, bewertet. System 2 denkt langsam, analytisch, anstrengend – es rechnet, prüft, hinterfragt.
            </p>
            <p>
              Der Stroop-Test macht das greifbar: Nennen Sie die Farbe, in der das Wort „ROT" geschrieben steht – wenn es in Blau steht. System 1 liest automatisch das Wort; System 2 muss aktiv korrigieren. Autofahren, Lesen, die meisten Routineentscheidungen im Büro: alles System 1. 17 × 23: System 2.
            </p>
            <p>
              Das Problem: System 2 ermüdet. Nach einem langen Tag voller Meetings, Mails und Abstimmungsrunden läuft fast alles über System 1. Und System 1 ist zuverlässig – für Routinen. Für komplexe, neuartige Entscheidungen ist es ein Risiko.
            </p>
          </div>

          <Card className="bg-slate-50 dark:bg-slate-900 mb-4">
            <CardContent className="pt-6">
              <p className="text-muted-foreground italic leading-relaxed">
                „Solange wir allein entscheiden, ist das ein persönliches Thema. Sobald Organisationen ins Spiel kommen, wird es teuer."
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Learning 2 */}
        <section id="bias-kosten" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Learning 2: Bias ist kein Charakterproblem – er kostet Geld, Zeit und Vertrauen</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert mb-4">
            <p>
              Kognitive Verzerrungen sind keine Schwäche einzelner Personen. Sie sind systematisch, vorhersagbar – und sie hinterlassen messbare Spuren in Organisationen. Die fünf Bias-Typen mit dem größten Schaden:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Ankereffekt</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Budgets orientieren sich am Vorjahr – klassischer Ankereffekt. Niemand fragt mehr, ob die Ausgangsgröße überhaupt noch stimmt.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Bestätigungsfehler</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Informationen, die zur bestehenden Meinung passen, werden stärker gewichtet. Gegenargumente werden übersehen oder abgetan.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Planungsoptimismus</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">BER, Stuttgart 21, Elbphilharmonie – Kosten- und Zeitüberschreitungen sind kein Pech, sondern statistisch vorhersagbar.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Overconfidence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Wir überschätzen systematisch die Zuverlässigkeit unserer eigenen Urteile – vor allem in Bereichen, in denen wir uns kompetent fühlen.</p>
              </CardContent>
            </Card>
          </div>

          <div className="prose prose-lg max-w-none dark:prose-invert mb-4">
            <p>
              Der Amazon-Recruiting-Fall ist inzwischen ein Lehrbuchbeispiel: Der Algorithmus benachteiligte Frauen, weil er auf historischen, männerdominierten Daten trainiert wurde. Bias wurde nicht erfunden – er wurde reproduziert. Studien der Universität Mannheim zeigen denselben Mechanismus bei menschlichen Entscheidungen: Bewerbungen mit ausländisch klingenden Namen werden bei identischer Qualifikation seltener eingeladen.
            </p>
            <p>
              Der Schritt vom individuellen zum organisationalen Problem ist entscheidend: Bias ist kein HR-Thema. Er ist ein Risikomanagement-Thema.
            </p>
          </div>
        </section>

        {/* Learning 3 */}
        <section id="noise" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Learning 3: Noise – das Problem, das niemand sieht</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert mb-4">
            <p>
              Bias bekommt die ganze Aufmerksamkeit. Noise bekommt fast keine – und richtet mindestens genauso viel Schaden an.
            </p>
            <p>
              Der Unterschied: Bei Bias zielen alle systematisch daneben. Bei Noise zielt jede Person woanders hin – bei gleicher Faktenlage, gleicher Aufgabe, gleichen Kriterien. Noise ist die zufällige Streuung in Urteilen. Kahneman, Sibony und Sunstein haben ihrem 2021 erschienenen Buch <em>Noise</em> den Untertitel gegeben: „A Flaw in Human Judgment". Es gibt drei Typen:
            </p>
          </div>

          <Card className="mb-4">
            <CardContent className="pt-6 space-y-4">
              <div>
                <p className="font-semibold text-sm mb-1">Level Noise</p>
                <p className="text-sm text-muted-foreground">Manche Entscheider:innen urteilen grundsätzlich strenger als andere – unabhängig vom Fall.</p>
              </div>
              <div>
                <p className="font-semibold text-sm mb-1">Pattern Noise</p>
                <p className="text-sm text-muted-foreground">Individuelle, inkonsistente Bewertungsmuster: Dieselbe Person bewertet denselben Fall unterschiedlich, je nach Kontext.</p>
              </div>
              <div>
                <p className="font-semibold text-sm mb-1">Occasion Noise</p>
                <p className="text-sm text-muted-foreground">Stimmung, Tageszeit, Reihenfolge. Die berühmte israelische Studie: Richter urteilen milder nach dem Mittagessen.</p>
              </div>
            </CardContent>
          </Card>

          <div className="prose prose-lg max-w-none dark:prose-invert mb-4">
            <p>
              Die Zahlen sind ernüchternd: In US-Asylverfahren variieren Anerkennungsquoten zwischen 5 % und 88 % – bei vergleichbaren Fällen, je nach Richter. Eine Noise-Audit-Studie in der Investmentbranche ergab 44 % Bewertungsunterschied zwischen Analysten beim gleichen Investment. In der Versicherungsbranche: bis zu 50 % Unterschied bei der Schadenbewertung zwischen Gutachtern. In der Radiologie: dieselben Röntgenbilder, unterschiedliche Diagnosen – selbst beim gleichen Arzt an verschiedenen Tagen.
            </p>
            <p>
              Noise ist messbar. Und Organisationen, die ihre Urteilsstreuung einmal gemessen haben, ändern ihre Prozesse nachhaltig.
            </p>
          </div>
        </section>

        {/* Learning 4 */}
        <section id="ki-kein-filter" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Learning 4: KI ist kein Bias-Filter</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert mb-4">
            <p>
              An dieser Stelle denken viele: „Dann lassen wir die KI entscheiden." Das ist der teuerste Trugschluss.
            </p>
            <p>
              Generative KI reduziert tatsächlich Noise – sie liefert bei gleicher Frage konsistentere Antworten als ein Team von Menschen. Aber sie übernimmt Bias aus den Trainingsdaten. Und sie erzeugt neuen Bias durch den Kontext, den wir ihr geben.
            </p>
            <p>
              „Garbage in, Garbage out" ist nicht nur eine IT-Metapher. Der Amazon-Fall ist das Lehrbuchbeispiel: Der Algorithmus reproduzierte menschliche Verzerrungen mit Hochgeschwindigkeit. Algorithmen diskriminieren oft nicht direkt, sondern über Stellvertretervariablen – Postleitzahl statt Ethnizität, Lücken im Lebenslauf statt Geschlecht.
            </p>
            <p>
              Besonders relevant ist das Prompt-Framing: „Nenne die Risiken dieses Projekts" und „Warum wird dieses Projekt erfolgreich sein?" liefern bei identischer Faktenlage sehr unterschiedliche Antworten – nicht weil die KI lügt, sondern weil sie dem Framing folgt. Wer Copilot oder ChatGPT ohne Bewusstsein für Bias und Noise einsetzt, automatisiert die eigenen Denkfehler.
            </p>
            <p>
              Die gute Nachricht: Richtig eingesetzt ist KI ein mächtiger Sparringspartner. Pre-Mortem, Gegenargumente, Kriterien-Check, Teufelsgespräch – all das geht mit Copilot, in Minuten, systematisch. Aber dafür muss man wissen, was man fragt. Und warum.
            </p>
          </div>

          <Card className="bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 mb-4">
            <CardContent className="pt-6">
              <p className="text-amber-900 dark:text-amber-200 leading-relaxed text-sm">
                <strong>Prompt-Framing als Risiko:</strong> Wer Copilot fragt „Warum ist diese Entscheidung richtig?", bekommt Bestätigungen. Wer fragt „Was könnte an dieser Entscheidung falsch liegen?", bekommt Gegenargumente. Die Qualität der KI-Antwort hängt direkt von der Qualität der Frage ab – und die setzt Bewusstsein für die eigenen blinden Flecken voraus.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Learning 5 */}
        <section id="handwerk" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Learning 5: Bessere Entscheidungen sind Handwerk</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert mb-4">
            <p>
              Die Forschung hat klare Antworten geliefert, was gegen Bias und Noise wirkt: Noise Audits, Pre-Mortem, strukturierte Entscheidungsprozesse, Devil's Advocate, Checklisten, Entscheidungsarchitektur. In Kombination mit KI werden diese Methoden sogar stärker.
            </p>
            <p>
              Aber: Diese Methoden wirken nicht, wenn man von ihnen gelesen hat. Das ist die zentrale Erkenntnis der Debiasing-Forschung der letzten 20 Jahre. Menschen, die über Bias Bescheid wissen, unterliegen ihm fast genauso oft wie Menschen, die nichts davon gehört haben – solange sie keine Werkzeuge und keine Übung haben.
            </p>
            <p>
              Gary Kleins Pre-Mortem-Methode – „Stellen wir uns vor, das Projekt ist in einem Jahr krachend gescheitert. Warum?" – senkt nachweislich den Overconfidence Bias. Strukturierte Interviews reduzieren Noise in Personalentscheidungen dramatisch. Kalibrierungsrunden bringen Bewertungsmaßstäbe in Einklang – das ist der Kern der Leistungsbeurteilung, wenn sie gut gemacht ist.
            </p>
            <p>
              Wer es ernst meint, investiert in die Fähigkeit, Entscheidungen zu treffen. Das ist kein Bauchgefühl. Das ist Handwerk.
            </p>
          </div>
        </section>

        {/* Workshop CTA */}
        <section id="workshop" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Das Workshop-Angebot der Copilotenschule</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert mb-4">
            <p>
              Auf Basis dieser fünf Learnings hat Saskia Kaden den Workshop{" "}
              <Link to="/workshops/bessere-entscheidungen-mit-copilot" className="text-primary hover:underline font-medium">
                „Bessere Entscheidungen mit Copilot"
              </Link>{" "}
              entwickelt. In vier oder sieben Stunden lernen Führungskräfte und Teams, wie Bias und Noise in ihrem Alltag wirken – und wie Copilot gezielt dagegen eingesetzt werden kann: als strukturierter Sparringspartner, nicht als Entscheidungsautomat.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <Card className="border-primary/30">
              <CardHeader>
                <CardTitle className="text-base">4 Stunden · Kompakter Halbtag</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">System 1 und 2 nach Kahneman, die wichtigsten Bias-Fallen, Noise verstehen, Copilot als Entscheidungs-Sparring – direkt anwendbar.</p>
                <p className="text-sm text-muted-foreground">Ideal für Teams mit wenig Zeitbudget, die einen konkreten Impuls suchen.</p>
              </CardContent>
            </Card>
            <Card className="border-primary/30">
              <CardHeader>
                <CardTitle className="text-base">7 Stunden · Vertiefter Ganztag</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">Mehr Raum für eigene Entscheidungssituationen, intensiveres Hands-on mit Copilot und erweiterter Methodenteil mit vertieften Übungen.</p>
                <p className="text-sm text-muted-foreground">Format: Online · Microsoft Copilot oder ChatGPT · bis 15 Teilnehmende</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 mb-4">
            <CardContent className="pt-6">
              <p className="text-sm leading-relaxed mb-4">
                <strong>Auch als Modul der Copilot Lernreise buchbar:</strong> Entscheidungsqualität als Baustein eines strukturierten 8-Wochen-Programms – für Organisationen, die Copilot nicht nur einführen, sondern nachhaltig in die Arbeitsweise verankern wollen.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/workshops/bessere-entscheidungen-mit-copilot"
                  className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Zum Workshop
                </Link>
                <Link
                  to="/training-konfigurator"
                  className="inline-flex items-center justify-center rounded-md border border-primary text-primary px-4 py-2 text-sm font-medium hover:bg-primary/10 transition-colors"
                >
                  Lernreise konfigurieren
                </Link>
              </div>
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

        {/* Quellen */}
        <section className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Quellen</h2>
          <div className="prose prose-sm max-w-none dark:prose-invert text-muted-foreground">
            <ul>
              <li>Daniel Kahneman: <em>Thinking, Fast and Slow</em> (2011)</li>
              <li>Kahneman, Sibony, Sunstein: <em>Noise: A Flaw in Human Judgment</em> (2021)</li>
              <li>Gary Klein: Pre-Mortem-Methode, Harvard Business Review (2007)</li>
              <li>Flyvbjerg et al.: Forschung zu Planungsfehlern bei Großprojekten</li>
              <li>„Refugee Roulette": Ramji-Nogales, Schoenholtz, Schrag (Stanford Law Review, 2007)</li>
            </ul>
          </div>
        </section>
      </ContentLayout>
    </>
  );
};

export default BiasNoiseKiEntscheidungen;

import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Linkedin } from "lucide-react";
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
    { id: "was-mich-umgetrieben-hat", title: "Was mich seit Jahren umtreibt", level: 2 },
    { id: "system-1-2", title: "Wie das Gehirn Entscheidungen trifft – und warum das ein Problem ist", level: 2 },
    { id: "bias-kosten", title: "Bias ist kein Persönlichkeitsmerkmal", level: 2 },
    { id: "noise", title: "Noise: der blinde Fleck, den kaum jemand kennt", level: 2 },
    { id: "ki-kein-filter", title: "KI löst das Problem nicht – sie verschiebt es", level: 2 },
    { id: "handwerk", title: "Was wirklich hilft – und was nicht", level: 2 },
    { id: "workshop", title: "Workshop und Lernreise", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
  ];

  const faqs = [
    {
      name: "Wie überzeuge ich das Management, in Entscheidungstraining zu investieren – wenn alle der Meinung sind, sie entscheiden bereits gut?",
      answer: "Das ist die eigentliche Crux: Wer von Overconfidence Bias betroffen ist, merkt es nicht – das ist ja gerade das Wesen dieser Verzerrung. Abstrakte Überzeugungsarbeit hilft selten. Was hilft, sind eigene Zahlen: Welche Projekte haben in den letzten drei Jahren Budget oder Zeit massiv überschritten? Was hat die letzte Fehlbesetzung auf einer Schlüsselposition gekostet – nicht nur finanziell, sondern in Reibungsverlusten und Fluktuation? Wenn diese Zahlen auf dem Tisch liegen, entsteht meistens eine andere Gesprächsebene. Im Workshop arbeiten wir genau das heraus – nicht mit abstrakten Studien, sondern mit konkreten Situationen aus dem eigenen Unternehmen."
    },
    {
      name: "Wir nutzen Copilot schon produktiv – warum sollte Entscheidungspsychologie da noch eine Rolle spielen?",
      answer: "Weil Tempo und Qualität zwei verschiedene Dimensionen sind. Copilot kann Ihre Arbeitsschritte beschleunigen – aber wenn das zugrundeliegende Urteil von einem Ankereffekt oder Bestätigungsfehler geprägt ist, produzieren Sie den gleichen Fehler, nur schneller. Der eigentliche Hebel ist, Copilot als Denkpartner zu nutzen: Pre-Mortem, strukturierte Gegenargumente, Kriterien-Checks. Das macht aus einem Produktivitätswerkzeug ein Werkzeug für bessere Urteile. Und das setzt voraus, dass man weiß, wonach man überhaupt fragen muss."
    },
    {
      name: "Unsere Teams treffen täglich unzählige Entscheidungen – das klingt alles sehr aufwändig. Wo fängt man sinnvollerweise an?",
      answer: "Nicht jede Entscheidung braucht ein Pre-Mortem. Der sinnvolle Ansatzpunkt sind wiederkehrende Entscheidungstypen mit echtem Gewicht: Personalbesetzungen, Budgetplanung, Projektpriorisierungen, Auswahl von Lieferanten oder Technologien. Genau dort ist der Schaden am größten, wenn Urteile verzerrt oder inkonsistent sind. Ein erster Schritt kann ein einfacher Noise Audit sein – also messen, wie stark Beurteilungen im eigenen Team tatsächlich streuen. Das Ergebnis ist fast immer überraschend."
    },
    {
      name: "Wie lässt sich überhaupt messen, ob Entscheidungsqualität in einem Unternehmen steigt?",
      answer: "Schwieriger als man denkt – aber nicht unmöglich. Ein Ansatz: Noise Audits vor und nach der Intervention, also messen wie stark Urteile bei gleicher Faktenlage streuen. Ein weiterer: Prozessqualität verfolgen – nutzen Teams Pre-Mortem und strukturierte Kriterien tatsächlich, oder nur in Ausnahmefällen? Und schließlich Ergebnisse: Halten Projekte Budget und Zeitrahmen häufiger? Nehmen Korrekturen nach Personalentscheidungen ab? Das braucht Zeit und eine saubere Ausgangsmessung. Aber wer das einmal aufgebaut hat, sieht die Wirkung."
    },
    {
      name: "Ist das Thema auch modular buchbar – ohne einen ganzen Workshoptag dafür zu reservieren?",
      answer: "Ja. Der Workshop 'Bessere Entscheidungen mit Copilot' gibt es als Halbtagsformat mit vier Stunden – Kernthemen kompakt, direkt anwendbar. Wer das Thema tiefer verankern möchte, kann es als Modul in die Copilot Lernreise integrieren: als eines von mehreren Bausteinen in einem strukturierten Programm über mehrere Wochen. Im Training-Konfigurator lässt sich das individuell zusammenstellen."
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
        description="Was die Entscheidungsforschung wirklich sagt – und warum Copilot ohne das richtige Handwerk die eigenen Denkfehler nur schneller macht."
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
              Der größte Teil unserer Entscheidungen läuft über schnelle, automatische Denkprozesse – nicht über rationale Analyse. Kognitive Verzerrungen (Bias) sind in Organisationen systematisch und teuer; zufällige Urteilsstreuung (Noise) richtet mindestens genauso viel Schaden an, ist aber kaum bekannt. KI reduziert Noise, verstärkt aber Bias – es sei denn, man setzt sie bewusst als Denkpartner ein. Bessere Entscheidungen sind kein Talent. Es ist ein Handwerk. Und Handwerk lernt man nicht durch Lesen.
            </p>
          </CardContent>
        </Card>

        {/* Opener */}
        <section id="was-mich-umgetrieben-hat" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Was mich seit Jahren umtreibt</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert mb-6">
            <p>
              Ich arbeite seit über acht Jahren mit Teams und Führungskräften – in Konzernen, in Startups, in Organisationen, die gerade mitten in irgendeiner Transformation stecken. Und in dieser Zeit habe ich ein Muster beobachtet, das mich nicht loslässt: Die meisten Menschen, die ich begleite, sind klug. Gut ausgebildet. Erfahren. Und sie treffen trotzdem immer wieder dieselben Fehler.
            </p>
            <p>
              Nicht weil sie schlecht sind. Nicht weil sie nicht nachdenken. Sondern weil das Gehirn Abkürzungen nimmt – und uns dabei nicht immer informiert, dass es das gerade tut.
            </p>
            <p>
              Ich habe Budgetrunden erlebt, in denen niemand die Ausgangszahl hinterfragte, obwohl sie aus einem völlig anderen Geschäftsjahr stammte. Ich habe Personalentscheidungen begleitet, bei denen zwei Bewerber nachweislich unterschiedlich bewertet wurden – abhängig davon, in welcher Reihenfolge sie vorgestellt wurden. Und ich habe Teams beobachtet, die sich drei Stunden lang gegenseitig in derselben Fehleinschätzung bestätigten, weil niemand den Raum hatte – oder den Mut –, das Naheliegende in Frage zu stellen.
            </p>
            <p>
              Was mich an diesem Thema festhält: Es ist lösbar. Nicht vollständig, nicht für immer. Aber messlösbar und trainierbar. Dieser Artikel fasst zusammen, was ich aus der Forschung und aus der Praxis mitgenommen habe – und warum KI dabei helfen kann, wenn man sie richtig einsetzt.
            </p>
          </div>
        </section>

        {/* System 1 / 2 */}
        <section id="system-1-2" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Wie das Gehirn Entscheidungen trifft – und warum das ein Problem ist</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert mb-6">
            <p>
              Daniel Kahneman hat mit seinem Buch <em>Thinking, Fast and Slow</em> etwas beschrieben, das viele von uns intuitiv ahnen, aber selten wirklich ernst nehmen: Das Gehirn arbeitet in zwei Modi. System 1 ist schnell, automatisch, mustergetrieben. System 2 ist langsam, anstrengend, analytisch. Und das Verhältnis dieser beiden ist weit unausgeglichener, als wir glauben.
            </p>
            <p>
              Ein klassisches Experiment: Man zeigt einer Person das Wort „ROT" – aber druckt es in blauer Farbe. Dann bittet man sie, die Farbe zu nennen. Klingt trivial. Ist es nicht. System 1 liest reflexartig das Wort, obwohl die Aufgabe die Farbe verlangt. System 2 muss aktiv bremsen und korrigieren. Das kostet Kraft. Und diese Kraft ist endlich.
            </p>
            <p>
              Das wird zum Problem, wenn man sich den Alltag von Führungskräften vor Augen hält. Nach dem vierten Meeting, nach einem halben Dutzend E-Mails, nach Abstimmungen, die kein klares Ergebnis hatten – dann kommen die wirklich wichtigen Entscheidungen. Und dann läuft fast alles über System 1. Nicht weil die Person nachlässig wäre. Sondern weil System 2 schlicht erschöpft ist.
            </p>
            <p>
              Das Unbehagliche daran: Wir merken es nicht. System 1 produziert kein Signal, das sagt „Achtung, ich nehme gerade eine Abkürzung." Es fühlt sich genauso an wie sorgfältige Überlegung. Das ist strukturell – und lässt sich nicht durch guten Willen allein auflösen.
            </p>
          </div>
        </section>

        {/* Bias */}
        <section id="bias-kosten" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Bias ist kein Persönlichkeitsmerkmal</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert mb-6">
            <p>
              „Bias" ist ein Wort, das viele abschreckt, weil es nach Vorwurf klingt. Das ist ein Missverständnis, das viel Schaden anrichtet. Kognitive Verzerrungen sind keine Eigenschaft schlechter Menschen. Sie sind systematische Muster, die sich im menschlichen Denken entwickelt haben – und die unter bestimmten Bedingungen ziemlich zuverlässig auftreten, unabhängig von Intelligenz oder Erfahrung.
            </p>
            <p>
              Ein paar der folgenreichsten: Der Ankereffekt sorgt dafür, dass Budgets sich Jahr für Jahr am Vorjahr orientieren – nicht weil das inhaltlich sinnvoll wäre, sondern weil die erste Zahl, die auf dem Tisch liegt, als Referenz hängen bleibt. Der Bestätigungsfehler lässt uns Informationen, die unsere bestehende Meinung stützen, stärker gewichten als Gegenargumente – und Gegenargumente oft gar nicht wahrnehmen. Planungsoptimismus ist der Grund, warum Großprojekte strukturell zu teuer, zu lang und zu komplex werden: BER, Stuttgart 21, Elbphilharmonie. Keine Ausreißer. Muster.
            </p>
            <p>
              Und dann ist da noch Overconfidence – die vielleicht hartnäckigste Verzerrung überhaupt. Wir überschätzen systematisch die Genauigkeit unserer eigenen Urteile, besonders in Bereichen, in denen wir uns kompetent fühlen. Das macht Overconfidence besonders tückisch: Je erfahrener jemand ist, desto fester kann er in einer Fehleinschätzung verankert sein, ohne es zu bemerken.
            </p>
            <p>
              Was das für Organisationen bedeutet, zeigt sich besonders eindrücklich an zwei Beispielen. Amazon baute ein KI-Recruiting-System, das Frauen systematisch benachteiligte – nicht weil das so programmiert wurde, sondern weil der Algorithmus auf historischen Daten trainiert wurde, die eine jahrzehntelange Männerdominanz in technischen Berufen widerspiegelten. Bias wurde nicht erfunden. Er wurde reproduziert. Dasselbe zeigen Studien der Universität Mannheim zu Bewerbungsverfahren: Identische Unterlagen, aber Bewerber mit ausländisch klingenden Namen bekommen seltener Einladungen. Kein böser Wille. Ein eingeübtes Muster.
            </p>
          </div>
        </section>

        {/* Noise */}
        <section id="noise" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Noise: der blinde Fleck, den kaum jemand kennt</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert mb-6">
            <p>
              Wenn ich in Workshops über Bias spreche, nicken die meisten. Den Begriff kennen sie, zumindest in groben Zügen. Wenn ich dann anfange, über Noise zu sprechen, entstehen oft fragende Blicke. Und das, obwohl Noise in vielen Organisationen mindestens genauso teuer ist wie Bias – manchmal teurer.
            </p>
            <p>
              Der Unterschied ist fundamental: Bias bedeutet, alle zielen systematisch daneben – in dieselbe Richtung. Noise bedeutet, alle zielen woanders hin – bei gleicher Faktenlage, gleicher Aufgabe, gleichen Kriterien. Die Streuung ist zufällig. Und genau das macht sie so schwer zu fassen.
            </p>
            <p>
              Kahneman, Sibony und Sunstein haben 2021 ein ganzes Buch darüber geschrieben – <em>Noise: A Flaw in Human Judgment</em> – weil Bias die gesamte Aufmerksamkeit bekommt, während Noise weitgehend ignoriert wird. Die Daten, die sie zusammentragen, sind schwer wegzuschieben: In US-amerikanischen Asylverfahren variierten Anerkennungsquoten zwischen 5 und 88 Prozent bei vergleichbaren Fällen – je nachdem, welchem Richter die Akte zugeteilt wurde. In der Investmentbranche ergab eine Noise-Audit-Studie 44 Prozent Bewertungsunterschied zwischen Analysten beim gleichen Investment. In der Versicherungsbranche: bis zu 50 Prozent Abweichung zwischen Gutachtern bei der Schadenbewertung. Radiologinnen und Radiologen kommen bei denselben Röntgenbildern zu unterschiedlichen Diagnosen – und dasselbe gilt für Bilder, die sie selbst bereits früher befundet haben.
            </p>
            <p>
              Besonders aufschlussreich ist die israelische Studie zu Richterurteilen: Richter entscheiden nach dem Mittagessen milder als kurz vor der Pause. Das ist Occasion Noise – die Urteilsstreuung, die durch Stimmung, Tageszeit oder schlicht die Reihenfolge der Fälle entsteht. Daneben gibt es Level Noise (manche Entscheider urteilen grundsätzlich strenger) und Pattern Noise (inkonsistente, individuelle Bewertungsmuster, die sich nicht vorhersagen lassen). Was alle drei gemeinsam haben: Sie lassen sich messen. Und sobald Organisationen ihre eigene Urteilsstreuung einmal gemessen haben, ändern sie ihre Prozesse – weil die Zahlen kaum zu ignorieren sind.
            </p>
          </div>
        </section>

        {/* KI */}
        <section id="ki-kein-filter" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">KI löst das Problem nicht – sie verschiebt es</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert mb-6">
            <p>
              Sobald ich diese Zahlen in Workshops präsentiere, kommt meistens die gleiche Reaktion: „Dann delegieren wir das an die KI." Das verstehe ich. Es fühlt sich logisch an. Und es ist, in dieser Form, falsch.
            </p>
            <p>
              Generative KI reduziert tatsächlich Noise. Das ist ein echter Vorteil: Sie liefert bei gleicher Frage konsistentere Antworten als ein Team aus menschlichen Beurteiler:innen. Aber Bias übernimmt sie aus den Daten, mit denen sie trainiert wurde. Und Bias erzeugt sie neu – durch das Framing, das wir ihr mitgeben.
            </p>
            <p>
              Der Amazon-Fall ist dafür das klarste Beispiel. Aber noch greifbarer für den Alltag ist das Prompt-Framing-Problem: Wenn ich Copilot frage „Warum wird dieses Projekt erfolgreich sein?", bekomme ich Argumente, die das stützen. Wenn ich frage „Was könnte an diesem Vorhaben grundlegend schiefgehen?", bekomme ich Gegenargumente. Die KI lügt dabei nicht – sie folgt dem Frame, den ich setze. Und da kommt der menschliche Bias wieder ins Spiel: Wer von vornherein überzeugt ist, stellt unbewusst die erste Frage.
            </p>
            <p>
              Wer Copilot nutzt, ohne sich dessen bewusst zu sein, automatisiert seine eigenen Denkfehler. Schneller. Mit mehr Text. Und mit einem Hauch von Autorität, den KI-Antworten oft ausstrahlen.
            </p>
            <p>
              Das klingt düster, ist es aber nicht. Denn dieselbe Technologie lässt sich auch anders einsetzen: als strukturierter Gesprächspartner, der Gegenargumente liefert, Entscheidungskriterien explizit macht, Pre-Mortems durchführt und blinde Flecken benennt. Das funktioniert. Aber es setzt voraus, dass man weiß, was man fragt – und warum.
            </p>
          </div>

          <Card className="bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 mb-6">
            <CardContent className="pt-6">
              <p className="text-amber-900 dark:text-amber-200 leading-relaxed text-sm">
                <strong>Ein konkreter Test für die nächste Entscheidung:</strong> Formulieren Sie dieselbe Frage zweimal – einmal so, dass sie eine positive Antwort nahelegt, einmal so, dass sie Zweifel weckt. Vergleichen Sie, was Copilot antwortet. Dieser Unterschied ist kein Fehler der KI. Er zeigt, wie stark Framing wirkt.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Handwerk */}
        <section id="handwerk" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Was wirklich hilft – und was nicht</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert mb-6">
            <p>
              Es gibt erprobte Methoden gegen Bias und Noise. Das ist die gute Nachricht. Die schlechte: Sie wirken nicht, wenn man sie kennt. Das ist eine der zentralen und unbequemen Erkenntnisse der Debiasing-Forschung der letzten 20 Jahre. Menschen, die wissen, was Confirmation Bias ist, unterliegen ihm fast genauso häufig wie Menschen, die den Begriff noch nie gehört haben – solange sie keine konkreten Werkzeuge und keine eingeübte Praxis haben.
            </p>
            <p>
              Was funktioniert: Gary Kleins Pre-Mortem ist einer der am besten belegten Ansätze. Die Frage lautet: „Stellen wir uns vor, das Projekt ist in einem Jahr krachend gescheitert. Was ist passiert?" Diese Formulierung senkt nachweislich den Overconfidence Bias, weil sie das Gehirn zwingt, sich konkret in ein Szenario hineinzudenken – statt abstrakt über Risiken nachzudenken. Strukturierte Interviews reduzieren Noise in Personalentscheidungen deutlich, weil alle Bewerber:innen nach denselben Kriterien beurteilt werden, in derselben Reihenfolge, mit denselben Fragen. Kalibrierungsrunden – Teams, die ihre Bewertungsmaßstäbe gemeinsam abgleichen – sind der Kern jeder guten Leistungsbeurteilung, werden aber selten konsequent umgesetzt.
            </p>
            <p>
              All das lässt sich mit KI kombinieren, und dann wird es stärker. Copilot kann ein Pre-Mortem strukturieren, Gegenargumente auf Anfrage liefern, einen Devil's Advocate spielen. Aber nur, wenn man das gezielt einbaut – nicht als Nebenprodukt des normalen Copilot-Alltags.
            </p>
            <p>
              Wer es ernst meint, investiert nicht in Wissen über Bias. Er investiert in die Fähigkeit, unter Druck, in echten Situationen, mit echten Stakes methodisch besser zu entscheiden. Das ist kein Seminar über Kognitionspsychologie. Es ist Training.
            </p>
          </div>
        </section>

        {/* Workshop CTA */}
        <section id="workshop" className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Workshop und Lernreise</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert mb-4">
            <p>
              Aus dieser Überzeugung heraus habe ich den Workshop{" "}
              <Link to="/workshops/bessere-entscheidungen-mit-copilot" className="text-primary hover:underline font-medium">
                „Bessere Entscheidungen mit Copilot"
              </Link>{" "}
              entwickelt. Er läuft als Halbtag mit vier Stunden oder als Ganztag mit sieben – je nachdem, wie tief Teams in ihre eigenen Entscheidungssituationen einsteigen wollen. Der Fokus liegt nicht auf Theorie, sondern auf konkreten Prompts, echten Situationen und eingeübter Praxis.
            </p>
            <p>
              Das Format lässt sich auch als Modul in die Copilot Lernreise integrieren – für Organisationen, die Copilot nicht als einzelnes Werkzeug einführen, sondern als Teil einer veränderten Arbeitsweise. Im{" "}
              <Link to="/training-konfigurator" className="text-primary hover:underline font-medium">
                Training-Konfigurator
              </Link>{" "}
              lässt sich das modular zusammenstellen.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <Card className="border-primary/30">
              <CardHeader>
                <CardTitle className="text-base">4 Stunden</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Kompakter Halbtag: System 1 und 2, die häufigsten Bias-Fallen, Noise als Konzept, Copilot als Entscheidungs-Sparring. Direkt anwendbar – auch ohne Vorwissen in Kognitionspsychologie.
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary/30">
              <CardHeader>
                <CardTitle className="text-base">7 Stunden</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Ganztag mit mehr Raum für eigene Entscheidungssituationen der Teilnehmenden, vertieftem Hands-on mit Copilot und erweitertem Methodenteil. Online, bis 15 Personen, mit Microsoft Copilot oder ChatGPT.
                </p>
              </CardContent>
            </Card>
          </div>

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

        {/* Quellen */}
        <section className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Quellen</h2>
          <div className="prose prose-sm max-w-none dark:prose-invert text-muted-foreground">
            <ul>
              <li>Daniel Kahneman: <em>Thinking, Fast and Slow</em> (2011)</li>
              <li>Kahneman, Sibony, Sunstein: <em>Noise: A Flaw in Human Judgment</em> (2021)</li>
              <li>Gary Klein: Pre-Mortem-Methode, Harvard Business Review (2007)</li>
              <li>Flyvbjerg et al.: Forschung zu Planungsfehlern bei Großprojekten</li>
              <li>Ramji-Nogales, Schoenholtz, Schrag: „Refugee Roulette", Stanford Law Review (2007)</li>
            </ul>
          </div>
        </section>

        {/* Autorin */}
        <section className="mb-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Über die Autorin</h2>
          <div className="flex flex-col sm:flex-row gap-6 items-start p-6 bg-card border rounded-2xl shadow-sm">
            {/* Profilbild */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-muted border-2 border-border">
                <img
                  src={saskiaKaden.image}
                  alt={`Porträtfoto ${saskiaKaden.name}`}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
              </div>
            </div>

            {/* Text */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h3 className="text-xl font-bold">{saskiaKaden.name}</h3>
                {saskiaKaden.linkedin && (
                  <a
                    href={saskiaKaden.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                    aria-label={`LinkedIn-Profil von ${saskiaKaden.name}`}
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                )}
              </div>
              <p className="text-sm text-muted-foreground font-medium mb-3">
                {saskiaKaden.role}
              </p>
              <p className="text-sm leading-relaxed mb-4">
                {saskiaKaden.bio}
              </p>

              {/* Qualifikationen */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wide">
                  Qualifikationen & Erfahrung
                </p>
                <ul className="space-y-1">
                  {saskiaKaden.qualifications.map((q, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                      {q}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Expertise-Badges */}
              <div className="flex flex-wrap gap-1.5">
                {saskiaKaden.expertise.map((topic, i) => (
                  <Badge key={i} variant="secondary" className="text-xs font-medium">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ContentLayout>
    </>
  );
};

export default BiasNoiseKiEntscheidungen;

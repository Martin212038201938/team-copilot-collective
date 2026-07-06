# B3b Hub-Artikel-Entwurf — Copilot-Schulung über das Qualifizierungschancengesetz (QCG) fördern

> **Status:** Entwurf zum Review. Zum Aktivieren die Schritte in `copilot-schulung-foerderung-qcg-2026-deployment-checklist.md` ausführen.
> **Zieldatei:** `src/pages/CopilotSchulungFoerderungQcg.tsx`
> **Slug:** `/wissen/copilot-schulung-foerderung-qcg-2026`
> **Autor:** Martin Lang
> **Erstellt:** 06.07.2026 (Cron `copilotenschule-seo-b3b-b3c-hubs-draft`)
>
> **Faktencheck (recherchiert 06.07.2026, Quellen in der Quellen-Sektion):**
> - Rechtsgrundlage: **§ 82 SGB III** (Förderung der beruflichen Weiterbildung Beschäftigter), eingeführt durch das Qualifizierungschancengesetz (in Kraft seit 01.01.2019), zuletzt erweitert durch das Arbeit-von-morgen-Gesetz und das Weiterbildungsgesetz.
> - **Förderquote Lehrgangskosten nach Betriebsgröße** (Stand Fachliche Weisungen der BA, gültig ab 01.01.2026): unter 50 Beschäftigte bis zu **100 %** · 50 bis unter 500 Beschäftigte **50 %** · ab 500 Beschäftigte **25 %**.
> - **+5 Prozentpunkte** auf die Lehrgangskosten-Quote bei Betriebsvereinbarung/Tarifvertrag zur beruflichen Weiterbildung; **+10 Prozentpunkte**, wenn mindestens 10 % der Belegschaft betroffen sind (§ 82 Abs. 4 SGB III). Für 50–<500 mit TV/BV daher **55 %**, ab 500 mit TV/BV **30 %**.
> - **Arbeitsentgeltzuschuss** (für weiterbildungsbedingte Ausfallzeiten): bis zu **75 %** (unter 50) · **50 %** (50–<500) · **25 %** (ab 500).
> - **Voraussetzung Maßnahmenumfang:** Die Weiterbildung muss **insgesamt mehr als 120 Stunden** umfassen (§ 82 Abs. 2 SGB III) — nicht am Stück. **Wichtig/ehrlich:** Ein einzelner 1–2-Tages-Copilot-Workshop erfüllt das NICHT; förderfähig sind längere, kombinierte Qualifizierungsprogramme (z. B. mehrmodulige Lernreisen).
> - Weitere Voraussetzungen: sozialversicherungspflichtige Beschäftigung · Träger und Maßnahme **AZAV-zertifiziert** · keine geförderte Weiterbildung nach § 82 in den vorangegangenen 2 Jahren (Regelfall) · Vermittlung zukunftsrelevanter Kompetenzen (nicht nur arbeitsplatzbezogene Anpassung).
> - **Antrag stellt der Arbeitgeber** (bzw. der Beschäftigte mit Zustimmung/Bescheinigung), VOR Maßnahmenbeginn bei der zuständigen Agentur für Arbeit / dem Arbeitgeber-Service.
> - Rechtsstand kann sich ändern — Artikel enthält Rechtshinweis (keine Rechts-/Förderberatung). Verbindliche Auskunft nur über die Agentur für Arbeit.

---

```tsx
import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import AuthorBio from "@/components/AuthorBio";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";
import { Link } from "react-router-dom";

const SLUG = "copilot-schulung-foerderung-qcg-2026";
const PAGE_TITLE = "Copilot-Schulung über das Qualifizierungschancengesetz fördern lassen";

const CopilotSchulungFoerderungQcg = () => {
  const martinLang = getAuthor("martin-lang")!;

  const ids = generateSchemaIds(SLUG, "wissen");
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const tableOfContents = [
    { id: "was-ist-qcg", title: "Was das Qualifizierungschancengesetz ist", level: 2 },
    { id: "wer-anspruch", title: "Wer anspruchsberechtigt ist", level: 2 },
    { id: "foerderfaehig", title: "Welche Copilot-Schulungen förderfähig sind", level: 2 },
    { id: "antragsprozess", title: "Der Antragsprozess Schritt für Schritt", level: 2 },
    { id: "copilotenschule", title: "Wie die Copilotenschule bei der Förderung unterstützt", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
  ];

  const faqs = [
    {
      name: "Wie finanziere ich eine flächendeckende Copilot-Qualifizierung, ohne mein Weiterbildungsbudget zu sprengen?",
      answer: "Das Qualifizierungschancengesetz (§ 82 SGB III) übernimmt einen erheblichen Teil der Lehrgangskosten – bei Betrieben unter 50 Beschäftigten bis zu 100 Prozent, bei 50 bis unter 500 Beschäftigten die Hälfte, dazu ein Zuschuss zum Arbeitsentgelt für die Ausfallzeiten. Der Hebel ist also da, aber an Bedingungen geknüpft: Die Maßnahme muss insgesamt mehr als 120 Stunden umfassen und über einen AZAV-zertifizierten Träger laufen. Ein einzelner Workshop reicht dafür nicht – ein mehrmoduliges Qualifizierungsprogramm schon. Die Copilotenschule hilft, ein förderfähiges Programm so zuzuschneiden, dass es sowohl die 120-Stunden-Schwelle erreicht als auch didaktisch sinnvoll bleibt."
    },
    {
      name: "Woher weiß ich, ob mein Unternehmen die Förderung überhaupt bekommt?",
      answer: "Verbindlich entscheidet das nur die zuständige Agentur für Arbeit – aber die groben Leitplanken lassen sich vorab prüfen: sozialversicherungspflichtig Beschäftigte, ein Maßnahmenumfang über 120 Stunden, ein zertifizierter Bildungsträger und Inhalte, die über die reine Anpassung an den aktuellen Arbeitsplatz hinausgehen und zukunftsrelevante Kompetenzen vermitteln. KI- und Copilot-Kompetenz fällt klar in diese Kategorie. Wir empfehlen, früh den Arbeitgeber-Service der Agentur für Arbeit einzubinden; die Copilotenschule liefert die Unterlagen zum Programm, die Sie dafür brauchen."
    },
    {
      name: "Lohnt sich der Antragsaufwand für die Förderung wirklich, oder zahle ich am Ende drauf?",
      answer: "Der Antrag verursacht Aufwand – das gehört zur ehrlichen Antwort dazu. Ob er sich lohnt, hängt an der Betriebsgröße: Für kleinere Unternehmen, die bis zu 100 Prozent der Lehrgangskosten plus Entgeltzuschuss erhalten können, ist das Verhältnis fast immer positiv. Bei großen Konzernen mit 25-Prozent-Quote muss man genauer rechnen. Entscheidend ist, den Antrag VOR Maßnahmenbeginn zu stellen und die Voraussetzungen sauber zu erfüllen. Die Copilotenschule unterstützt mit einem strukturierten Programm und den nötigen Nachweisen, sodass der administrative Teil überschaubar bleibt."
    },
    {
      name: "Können wir die EU-AI-Act-Schulungspflicht und die QCG-Förderung sinnvoll kombinieren?",
      answer: "Ja, und das ist einer der stärksten Gründe, jetzt zu handeln. Die KI-Kompetenz-Pflicht aus dem EU AI Act verlangt ohnehin ein nachweisbares Schulungsprogramm – wenn dieses Programm groß genug angelegt wird, um die 120-Stunden-Schwelle zu erreichen, lässt sich derselbe Pflichtaufwand teilweise über das Qualifizierungschancengesetz refinanzieren. Aus einer regulatorischen Pflicht wird so eine geförderte Investition. Die Copilotenschule denkt beide Anforderungen von Anfang an zusammen."
    },
    {
      name: "Unsere Belegschaft hat sehr unterschiedliche Vorkenntnisse – lässt sich das trotzdem als ein förderfähiges Programm abbilden?",
      answer: "Gerade das ist ein Vorteil eines mehrmoduligen Programms. Statt alle durch dieselbe Schulung zu schicken, lassen sich rollengerechte Lernpfade – Einsteiger, Power-User, Führungskräfte, Administratoren – zu einem zusammenhängenden Qualifizierungsprogramm bündeln, das in Summe die geforderten 120 Stunden überschreitet und trotzdem für jede Gruppe passt. Die Copilotenschule baut solche gestuften Lernreisen und dokumentiert sie so, dass sie als ein förderfähiges Ganzes gegenüber der Agentur für Arbeit darstellbar sind."
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": ids.article,
        "headline": PAGE_TITLE,
        "description":
          "Das Qualifizierungschancengesetz (§ 82 SGB III) fördert Copilot- und KI-Weiterbildung mit bis zu 100 % der Lehrgangskosten plus Entgeltzuschuss. Wer anspruchsberechtigt ist, welche Schulungen förderfähig sind und wie der Antrag läuft.",
        "author": getAuthorSchemaMarkup(martinLang),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization",
        },
        "datePublished": "2026-07-06",
        "dateModified": "2026-07-06",
        "keywords": [
          "Qualifizierungschancengesetz Copilot",
          "QCG Förderung KI-Schulung",
          "§ 82 SGB III Weiterbildung",
          "Copilot Schulung Förderung",
          "Weiterbildungsförderung Beschäftigte",
          "Agentur für Arbeit KI-Weiterbildung",
          "Lehrgangskosten Zuschuss",
          "geförderte Microsoft-Copilot-Schulung",
        ],
        "articleSection": "Förderung & Finanzierung",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": pageUrl,
        },
      },
      {
        "@type": "FAQPage",
        "@id": ids.faq,
        "mainEntity": faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.name,
          "acceptedAnswer": { "@type": "Answer", "text": faq.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": ids.breadcrumb,
        "itemListElement": breadcrumbItems.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": item.url,
        })),
      },
    ],
  };

  return (
    <>
      <SEOHead
        title="Copilot-Schulung über das Qualifizierungschancengesetz fördern | copilotenschule.de"
        description="§ 82 SGB III (QCG) fördert Copilot- und KI-Weiterbildung mit bis zu 100 % der Lehrgangskosten plus Entgeltzuschuss. Voraussetzungen, Anspruch und Antragsprozess – verständlich erklärt."
        keywords={[
          "Qualifizierungschancengesetz Copilot",
          "QCG Förderung KI-Schulung",
          "§ 82 SGB III Weiterbildung",
          "Copilot Schulung Förderung",
          "geförderte Microsoft-Copilot-Schulung",
        ]}
        canonicalUrl={pageUrl}
        schema={schema}
        author={martinLang}
        publishedTime="2026-07-06T09:00:00+02:00"
        modifiedTime="2026-07-06T09:00:00+02:00"
      />
      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "QCG-Förderung für Copilot-Schulungen", href: `/wissen/${SLUG}` },
        ]}
        title={PAGE_TITLE}
        description="Wie das Qualifizierungschancengesetz KI- und Copilot-Weiterbildung finanziert – und unter welchen Bedingungen Ihr Unternehmen davon profitiert."
        lastUpdated="6. Juli 2026"
        authorName="Martin Lang"
        tableOfContents={tableOfContents}
      >
        {/* Schnellantwort */}
        <Card className="mb-8 border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-green-800 dark:text-green-300">
              Kurz und klar
            </CardTitle>
          </CardHeader>
          <CardContent className="text-green-900 dark:text-green-200">
            <p>
              Das Qualifizierungschancengesetz (rechtlich verankert in § 82 SGB III) ermöglicht
              es Arbeitgebern, die Weiterbildung ihrer Beschäftigten fördern zu lassen –
              KI- und Copilot-Kompetenz ausdrücklich eingeschlossen. Die Agentur für Arbeit
              übernimmt einen Teil der Lehrgangskosten (bei Betrieben unter 50 Beschäftigten bis
              zu 100 Prozent, bei 50 bis unter 500 die Hälfte, ab 500 ein Viertel) und zahlt
              zusätzlich einen Zuschuss zum Arbeitsentgelt für die Ausfallzeiten. Die wichtigste
              Bedingung, die viele übersehen: Die Maßnahme muss insgesamt <strong>mehr als 120
              Stunden</strong> umfassen und über einen zertifizierten Träger laufen. Ein einzelner
              Tagesworkshop ist damit nicht förderfähig – ein mehrmoduliges Qualifizierungsprogramm
              schon. Den Antrag stellt der Arbeitgeber, und zwar <strong>vor</strong> Beginn der Maßnahme.
            </p>
          </CardContent>
        </Card>

        {/* Einleitung */}
        <div className="prose prose-lg max-w-none dark:prose-invert mb-4">
          <p>
            Über Copilot-Schulungen wird meistens unter dem Gesichtspunkt Nutzen und
            Produktivität gesprochen, seltener unter dem der Finanzierung. Dabei gibt es in
            Deutschland ein Förderinstrument, das genau für diese Art von Weiterbildung wie
            geschaffen ist – und das viele Unternehmen nicht auf dem Schirm haben, weil sie es
            mit klassischer Arbeitslosen-Förderung verwechseln. Das Qualifizierungschancengesetz
            fördert nämlich die Weiterbildung von Menschen, die in fester Beschäftigung sind.
            Es zielt auf genau die Kompetenzlücke, die Digitalisierung und KI gerade in nahezu
            jedem Betrieb aufreißen.
          </p>
          <p>
            Dieser Text ordnet ein, was das Gesetz leistet, für wen es gilt und wie man an die
            Förderung kommt – nüchtern und ohne die Fördersummen schönzurechnen. Denn die
            Förderung ist real und in vielen Fällen erheblich, aber sie ist an klare
            Voraussetzungen geknüpft. Wer diese kennt, kann eine Copilot-Qualifizierung
            aufsetzen, die nicht nur den EU AI Act erfüllt, sondern zu einem großen Teil vom
            Staat mitfinanziert wird.
          </p>
        </div>

        {/* Sektion 1 */}
        <section id="was-ist-qcg" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Was das Qualifizierungschancengesetz ist
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Das Qualifizierungschancengesetz ist kein eigenes, für sich stehendes Gesetzbuch,
              sondern eine Erweiterung des Sozialgesetzbuchs III. Der zentrale Paragraf ist
              § 82 SGB III – „Förderung der beruflichen Weiterbildung Beschäftigter“. Seit dem
              1. Januar 2019 können Arbeitgeber darüber Zuschüsse zur Weiterbildung ihrer eigenen
              Belegschaft erhalten, unabhängig von Alter, Qualifikation und Betriebsgröße. Der
              politische Grundgedanke: Wer heute qualifiziert wird, muss morgen nicht arbeitslos
              werden – Prävention statt Reparatur.
            </p>
            <p>
              Gefördert werden zwei Dinge: die <strong>Lehrgangskosten</strong> selbst und – als
              Ausgleich für die Zeit, in der geschult statt gearbeitet wird – ein
              <strong> Arbeitsentgeltzuschuss</strong>. Wie hoch die Förderung ausfällt, hängt
              maßgeblich von der Betriebsgröße ab. Nach den Fachlichen Weisungen der
              Bundesagentur für Arbeit gilt für die Lehrgangskosten grob: Betriebe mit unter 50
              Beschäftigten können bis zu 100 Prozent erstattet bekommen, Betriebe mit 50 bis
              unter 500 Beschäftigten die Hälfte, und Betriebe ab 500 Beschäftigten ein Viertel.
              Wer über eine Betriebsvereinbarung oder einen Tarifvertrag zur beruflichen
              Weiterbildung verfügt, erhält jeweils fünf Prozentpunkte obendrauf.
            </p>
            <p>
              Der Arbeitsentgeltzuschuss folgt derselben Logik der Betriebsgröße: bis zu 75
              Prozent bei den kleinsten, 50 Prozent im Mittelfeld, 25 Prozent bei den größten
              Betrieben. In der Summe kann ein kleineres Unternehmen so einen Großteil der
              Gesamtkosten einer Qualifizierung auf die Förderung abwälzen – ein Hebel, der bei
              einer flächendeckenden KI-Einführung schnell relevant wird.
            </p>
          </div>
        </section>

        {/* Sektion 2 */}
        <section id="wer-anspruch" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Wer anspruchsberechtigt ist
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Anspruchsberechtigt sind grundsätzlich alle sozialversicherungspflichtig
              Beschäftigten – unabhängig davon, ob sie eine Ausbildung, ein Studium oder gar
              keinen formalen Abschluss haben. Das ist der entscheidende Unterschied zu vielen
              anderen Förderprogrammen: Es geht nicht um Arbeitssuchende, sondern um Menschen,
              die im Job sind und fit für die Zukunft gemacht werden sollen.
            </p>
            <p>
              Damit die Förderung greift, müssen jedoch einige Bedingungen zusammenkommen. Die
              Weiterbildung muss Kenntnisse vermitteln, die über eine rein arbeitsplatzbezogene,
              kurzfristige Anpassung hinausgehen – also echte, übertragbare Kompetenzen. Im
              Regelfall darf die betreffende Person in den vorangegangenen zwei Jahren keine nach
              § 82 geförderte Weiterbildung absolviert haben. Und die Maßnahme muss von einem
              nach der Akkreditierungs- und Zulassungsverordnung Arbeitsförderung (AZAV)
              zertifizierten Träger durchgeführt werden – ein Punkt, an dem die Wahl des Anbieters
              entscheidend wird.
            </p>
            <p>
              Für bestimmte Gruppen ist die Förderung besonders großzügig: In Betrieben mit
              weniger als 500 Beschäftigten entfällt für Ältere (ab 45 Jahren) und schwerbehinderte
              Menschen der Eigenanteil an den Lehrgangskosten unter bestimmten Voraussetzungen ganz.
              Wer eine gemischte Belegschaft qualifizieren will, sollte diese Konstellationen
              kennen, weil sie die Förderquote im Einzelfall deutlich anheben.
            </p>
          </div>
        </section>

        {/* Sektion 3 */}
        <section id="foerderfaehig" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Welche Copilot-Schulungen förderfähig sind
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Hier liegt der Punkt, an dem viele Anfragen scheitern – und deshalb steht er hier
              bewusst deutlich: Eine klassische Copilot-Schulung im Format eines ein- oder
              zweitägigen Workshops ist über das Qualifizierungschancengesetz <em>nicht</em>
              förderfähig. § 82 SGB III verlangt, dass die Maßnahme insgesamt mehr als 120
              Stunden umfasst. Diese Stunden müssen nicht am Stück abgeleistet werden, aber sie
              müssen in Summe erreicht werden. Ein einzelner Workshop mit 7 bis 14 Stunden liegt
              weit darunter.
            </p>
            <p>
              Förderfähig wird eine Copilot-Qualifizierung dann, wenn sie als längeres,
              zusammenhängendes Programm angelegt ist: mehrere Module über Wochen oder Monate,
              die Grundlagen, rollenspezifische Vertiefung, begleitete Praxisphasen und
              Lernkontrollen kombinieren. Genau diese Form – oft als „Lernreise“ bezeichnet –
              erfüllt nicht nur die Stundenschwelle, sondern ist didaktisch ohnehin wirksamer
              als ein einmaliger Frontal-Termin. Die inhaltliche Anforderung, „zukunftsrelevante
              Kompetenzen“ zu vermitteln, erfüllt KI- und Copilot-Kompetenz problemlos: Der
              souveräne Umgang mit KI-Assistenten gilt branchenübergreifend als Schlüsselkompetenz
              des Strukturwandels.
            </p>
            <p>
              Die zweite harte Bedingung ist die AZAV-Zertifizierung: Sowohl der Träger als auch
              die konkrete Maßnahme müssen zugelassen sein. Das ist kein Formalie-Detail, sondern
              der Prüfstein, an dem die Agentur für Arbeit die Förderung fest macht. Wer eine
              Förderung anstrebt, sollte diesen Status daher früh mit dem Anbieter klären – und
              nicht erst, wenn das Programm bereits läuft.
            </p>
            <p className="text-sm text-muted-foreground">
              Hinweis: Ob eine konkrete Maßnahme förderfähig ist, entscheidet ausschließlich die
              zuständige Agentur für Arbeit im Einzelfall. Die hier genannten Schwellen und Quoten
              geben den allgemeinen Rahmen wieder, ersetzen aber keine verbindliche Auskunft.
            </p>
          </div>
        </section>

        {/* Sektion 4 */}
        <section id="antragsprozess" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Der Antragsprozess Schritt für Schritt
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Der Antrag folgt einer klaren Reihenfolge, und die wichtigste Regel steht am
              Anfang: Er muss <strong>vor Beginn der Maßnahme</strong> gestellt werden. Wer die
              Schulung erst startet und dann eine Förderung beantragt, hat den Anspruch in aller
              Regel bereits verloren.
            </p>
            <p>
              Praktisch läuft es meist so ab: Zuerst nimmt der Arbeitgeber Kontakt zum
              Arbeitgeber-Service der zuständigen Agentur für Arbeit auf und klärt die
              grundsätzliche Förderfähigkeit von Betrieb und geplanter Maßnahme. Parallel wählt
              er einen AZAV-zertifizierten Bildungsträger und ein konkretes, die 120-Stunden-Schwelle
              erfüllendes Programm aus. Anschließend wird der Förderantrag mit den Angaben zu
              Betriebsgröße, Beschäftigten, Maßnahme und Kosten eingereicht – häufig unterstützt
              durch einen Erhebungsbogen der Agentur. Erst nach der schriftlichen Förderzusage
              startet die Weiterbildung; die Auszahlung von Lehrgangskostenzuschuss und
              Arbeitsentgeltzuschuss erfolgt nach den Vorgaben des Bescheids.
            </p>
            <p>
              Der administrative Aufwand ist real, aber beherrschbar – vor allem, wenn der
              Bildungsträger die programmbezogenen Unterlagen (Curriculum, Stundennachweis,
              Zertifizierungsnachweis) fertig liefert. Genau diese Arbeitsteilung entlastet die
              Personalabteilung: Der Betrieb kümmert sich um Betriebsdaten und Antragstellung,
              der Anbieter um die maßnahmenbezogenen Nachweise.
            </p>
          </div>
        </section>

        {/* Sektion 5 */}
        <section id="copilotenschule" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Wie die Copilotenschule bei der Förderung unterstützt
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Die Copilotenschule ist auf genau die Konstellation spezialisiert, in der das
              Qualifizierungschancengesetz greift: Unternehmen, die ihre Belegschaft breit und
              nachhaltig in Microsoft Copilot und KI-Werkzeugen qualifizieren wollen – nicht in
              einem einmaligen Termin, sondern als strukturiertes Programm. Unsere mehrmoduligen
              Lernreisen sind so aufgebaut, dass sie rollengerechte Lernpfade für Einsteiger,
              Power-User, Führungskräfte und Administratoren zu einem zusammenhängenden Ganzen
              bündeln – die Form, die sowohl didaktisch wirkt als auch die 120-Stunden-Schwelle
              erreichbar macht.
            </p>
            <p>
              Konkret unterstützen wir bei der Förderung an drei Stellen: Wir gestalten das
              Programm so, dass es die inhaltlichen und formalen Anforderungen des § 82 SGB III
              erfüllt; wir liefern die maßnahmenbezogenen Unterlagen, die Ihre Personalabteilung
              für den Antrag bei der Agentur für Arbeit braucht; und wir denken die EU-AI-Act-
              Schulungspflicht von Anfang an mit, sodass aus einer regulatorischen Pflicht eine
              geförderte Investition wird. Ob eine Förderung im Einzelfall bewilligt wird,
              entscheidet immer die Agentur für Arbeit – aber wir sorgen dafür, dass Ihr Programm
              die besten Voraussetzungen dafür mitbringt.
            </p>
          </div>
        </section>

        {/* CTA */}
        <Card className="mb-8 border-primary/30 bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">
              Förderfähiges Copilot-Programm planen
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Sie möchten prüfen, ob sich Ihre Copilot-Qualifizierung über das
              Qualifizierungschancengesetz fördern lässt? Wir strukturieren mit Ihnen ein
              Programm, das die 120-Stunden-Schwelle erreicht und die formalen Anforderungen
              erfüllt. Sehen Sie sich unsere{" "}
              <Link to="/trainings/microsoft-365-copilot-praxis" className="underline">
                Copilot-Trainings
              </Link>{" "}
              an oder erfahren Sie, warum eine{" "}
              <Link to="/wissen/copilot-lernreise-vs-tagesschulung" className="underline">
                Lernreise mehr bewirkt als eine Tagesschulung
              </Link>
              . Hintergrund zur gesetzlichen Pflicht liefert unser Beitrag zur{" "}
              <Link to="/wissen/ki-schulung-mitarbeiter-pflicht" className="underline">
                KI-Schulungspflicht für Mitarbeitende
              </Link>
              .
            </p>
          </CardContent>
        </Card>

        {/* FAQ */}
        <section id="faq" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Häufig gestellte Fragen</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{faq.name}</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none dark:prose-invert">
                  <p>{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Rechtshinweis */}
        <div className="prose prose-sm max-w-none dark:prose-invert mb-8 text-muted-foreground">
          <p>
            <strong>Rechtshinweis:</strong> Dieser Beitrag gibt den Rechts- und Förderstand zum
            Zeitpunkt der Veröffentlichung wieder und dient der allgemeinen Information. Er stellt
            keine Rechts-, Steuer- oder Förderberatung dar. Förderquoten, Voraussetzungen und
            Zuständigkeiten können sich ändern; eine verbindliche Auskunft erteilt ausschließlich
            die zuständige Agentur für Arbeit.
          </p>
        </div>

        {/* Quellen */}
        <div className="prose prose-sm max-w-none dark:prose-invert mb-8">
          <h3 className="font-semibold">Quellen</h3>
          <ul>
            <li>
              Bundesagentur für Arbeit – Förderung von Weiterbildung: Informationen für Unternehmen
              (arbeitsagentur.de/unternehmen/finanziell/foerderung-von-weiterbildung)
            </li>
            <li>
              Bundesagentur für Arbeit – Fachliche Weisungen zur Förderung der beruflichen
              Weiterbildung nach § 82 SGB III (gültig ab 01.01.2026)
            </li>
            <li>
              Bundesagentur für Arbeit – Qualifizierungschancengesetz für Arbeitnehmer
              (arbeitsagentur.de)
            </li>
            <li>
              Bundesministerium für Wirtschaft und Klimaschutz / Bundeswirtschaftsministerium –
              Informationen zur Weiterbildungsförderung im Strukturwandel (bmwk.de)
            </li>
            <li>§ 82 SGB III – Förderung der beruflichen Weiterbildung Beschäftigter (gesetze-im-internet.de)</li>
          </ul>
        </div>

        <AuthorBio author={martinLang} />
      </ContentLayout>
    </>
  );
};

export default CopilotSchulungFoerderungQcg;
```

---

## Vorbereiteter articles.ts-Block (an den ANFANG von ALL_ARTICLES)

```typescript
{
  id: "copilot-schulung-foerderung-qcg-2026",
  title: "Copilot-Schulung über das Qualifizierungschancengesetz fördern lassen",
  description: "§ 82 SGB III (QCG) fördert Copilot- und KI-Weiterbildung mit bis zu 100 % der Lehrgangskosten plus Entgeltzuschuss. Voraussetzungen, Anspruch und Antragsprozess.",
  link: "/wissen/copilot-schulung-foerderung-qcg-2026",
  badge: "Förderung & Finanzierung",
  icon: "€",
  lastUpdated: "6. Juli 2026",
  publishDate: "2026-07-06",
  publishTime: "09:00"
},
```

## Interne Verlinkung (verifiziert vorhandene Slugs, Stand 06.07.2026)
- `/trainings/microsoft-365-copilot-praxis` (Trainings-CTA)
- `/wissen/copilot-lernreise-vs-tagesschulung` ✅
- `/wissen/ki-schulung-mitarbeiter-pflicht` ✅ (Protected Page – nur additiv verlinken, nicht bearbeiten)
- Optional zusätzlich: `/wissen/copilot-training-schulung`, `/wissen/microsoft-copilot-schulung-online`, `/wissen/eu-ai-act-mitarbeiter-schulung-august-2026`

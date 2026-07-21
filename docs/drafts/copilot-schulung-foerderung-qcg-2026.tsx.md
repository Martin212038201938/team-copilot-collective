# B3b Hub-Artikel-Entwurf — Copilot-Schulung fördern lassen: Die Förderprogramme 2026 im Überblick

> **Status:** Entwurf zum Review (überarbeitet 21.07.2026). NICHT deployen, bis Martin freigibt. Zum Aktivieren die Schritte in `copilot-schulung-foerderung-qcg-2026-deployment-checklist.md` ausführen.
> **Zieldatei:** `src/pages/CopilotSchulungFoerderungQcg.tsx`
> **Slug:** `/wissen/copilot-schulung-foerderung-qcg-2026`
> **Autor:** Martin Lang
> **Erstellt:** 06.07.2026 · **Überarbeitet:** 21.07.2026 (von QCG-Einzelartikel zu Multi-Programm-Überblick, DE-Fokus, ehrliche AZAV-Einordnung)
>
> **⚠️ Redaktioneller Hinweis zur AZAV-Einordnung (wichtig, mit Martin abgestimmt):**
> Die Copilotenschule ist **NICHT** AZAV-zertifiziert. Der Artikel darf daher NICHT den Eindruck erwecken, wir seien zugelassener Träger für QCG/Qualifizierungsgeld/Bildungsgutschein. Diese drei Wege setzen zwingend einen AZAV-zertifizierten Träger + zugelassene Maßnahme voraus. Ehrliche Linie: Für diese Wege liefern wir Fachinhalte in ein zertifiziertes Programm ein bzw. arbeiten mit AZAV-Partnern; **direkt und ohne AZAV** bedienbar sind über die Copilotenschule die **Länderprogramme** (Bildungsscheck NRW 2.0 & Co.). Das ist der ehrliche USP dieses Artikels.
>
> **Faktencheck (verifiziert 21.07.2026, Quellen unten):**
> - **QCG · § 82 SGB III** (Weiterbildung Beschäftigter). Lehrgangskosten-Förderung nach Betriebsgröße (aus AG-Kostenbeteiligung, § 82 Abs. 2, direkt am Gesetzestext geprüft): **< 50 Beschäftigte → bis 100 %** (keine AG-Beteiligung nötig) · **50 bis < 500 → 50 %** · **≥ 500 → 25 %**. Mit Betriebsvereinbarung/Tarifvertrag zur Weiterbildung je **+5 Prozentpunkte** (§ 82 Abs. 4) → 55 % bzw. 30 %. Arbeitsentgeltzuschuss (§ 82 Abs. 3): **75 % / 50 % / 25 %**. Bei Betrieben < 500: keine AG-Kostenbeteiligung, wenn AN **≥ 45 Jahre** oder **schwerbehindert**. Maßnahme muss **> 120 Stunden** dauern (§ 82 Abs. 1 Nr. 4); Träger + Maßnahme **AZAV-zugelassen** (Nr. 5); Berufsabschluss i.d.R. ≥ 2 Jahre her (Nr. 2); keine § 82-Förderung in den letzten 2 Jahren (Nr. 3). Antrag VOR Beginn; Arbeitgeber kann Sammelantrag stellen (§ 82 Abs. 5). Seit 01.01.2026 neue Fachliche Weisungen der BA: Arbeitsentgeltzuschuss strikter an tatsächlichen weiterbildungsbedingten Ausfall gekoppelt.
> - **Qualifizierungsgeld · § 82a SGB III** (neu seit 01.04.2024, Weiterbildungsgesetz). **Lohnersatz 60 % / 67 %** (mit Kind) der Nettoentgeltdifferenz während der Weiterbildung — deckt **NICHT** die Lehrgangskosten (die trägt der Arbeitgeber selbst). Für **strukturwandelbedingten** Qualifizierungsbedarf; mind. **10 %** der Belegschaft betroffen (Betriebe < 250) bzw. **20 %** (ab 250); Maßnahme **> 120 Stunden**, AZAV-zugelassen; i.d.R. Betriebsvereinbarung/Tarifvertrag nötig.
> - **Bildungsgutschein · § 81 SGB III**: v.a. für Arbeitslose und von Arbeitslosigkeit Bedrohte; übernimmt Lehrgangskosten (bis 100 %); Träger + Maßnahme **AZAV**-zugelassen. Für Beschäftigte nur in Sonderfällen (drohender Arbeitsplatzverlust durch Strukturwandel, fehlender Berufsabschluss).
> - **Länderprogramme (KEIN AZAV nötig, individuell):** **Bildungsscheck NRW 2.0** — seit **01.02.2026**, ESF-kofinanziert: **50 % bis max. 500 €** der berufsbezogenen Weiterbildung, Wohnsitz NRW, zvE **≤ 50.000 €** (Ehepaare 100.000 €), 1×/Kalenderjahr; Anmeldung online im ESF-Portal **mind. 1 Tag vor** Kursbeginn; nur Rechnung + Teilnahmebestätigung nötig, keine AZAV-/Trägerzulassung. Weitere Länder analog: **Hamburg Weiterbildungsbonus** (bis 40 %, max. 1.500 €), **Rheinland-Pfalz QualiScheck**, **Sachsen Weiterbildungsscheck** (aktuell haushaltsbedingt pausiert — vor Verweis prüfen). Programme je Land unterschiedlich, teils befristet/pausiert.
> - **Bildungsprämie (Bund):** Ende 2021 ausgelaufen, **kein** direkter Nachfolger — NICHT mehr als gültig darstellen. Alter Bildungsscheck NRW (individuell/betrieblich) 2023/2024 eingestellt; Restabwicklung bis 31.03.2029.
> - Rechtsstand kann sich ändern — Artikel enthält Rechtshinweis (keine Rechts-/Förderberatung). Verbindliche Auskunft nur über Agentur für Arbeit bzw. die jeweilige Landesstelle.

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
const PAGE_TITLE = "Copilot-Schulung fördern lassen: Die Förderprogramme 2026 im Überblick";

const CopilotSchulungFoerderungQcg = () => {
  const martinLang = getAuthor("martin-lang")!;

  const ids = generateSchemaIds(SLUG, "wissen");
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const tableOfContents = [
    { id: "ueberblick", title: "Die Förderwege 2026 im Überblick", level: 2 },
    { id: "qcg", title: "Qualifizierungschancengesetz (§ 82 SGB III)", level: 2 },
    { id: "qualifizierungsgeld", title: "Qualifizierungsgeld (§ 82a SGB III)", level: 2 },
    { id: "bildungsgutschein", title: "Bildungsgutschein (§ 81 SGB III)", level: 2 },
    { id: "laenderprogramme", title: "Länderprogramme: Bildungsscheck & Co.", level: 2 },
    { id: "azav", title: "Die AZAV-Voraussetzung – ehrlich erklärt", level: 2 },
    { id: "copilotenschule", title: "Wie die Copilotenschule bei der Förderung unterstützt", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
  ];

  const faqs = [
    {
      name: "Wie finanziere ich eine flächendeckende Copilot-Qualifizierung, ohne mein Weiterbildungsbudget zu sprengen?",
      answer: "Es gibt 2026 mehrere Wege, die sich kombinieren lassen. Der größte Hebel ist das Qualifizierungschancengesetz (§ 82 SGB III): Es übernimmt je nach Betriebsgröße einen erheblichen Teil der Lehrgangskosten – bei Betrieben unter 50 Beschäftigten bis zu 100 Prozent, bei 50 bis unter 500 die Hälfte – plus einen Zuschuss zum Arbeitsentgelt für die Ausfallzeiten. Voraussetzung: Die Maßnahme muss insgesamt mehr als 120 Stunden umfassen und über einen AZAV-zertifizierten Träger laufen, ein einzelner Workshop reicht nicht. Für kleinere Teams oder einzelne Mitarbeitende in NRW ist zusätzlich der Bildungsscheck 2.0 interessant (50 Prozent, bis 500 Euro) – der kommt ohne AZAV aus und lässt sich direkt auf unsere Trainings anwenden. Die Copilotenschule hilft, das passende Programm zuzuschneiden."
    },
    {
      name: "Ist die Copilotenschule ein zugelassener Träger, über den ich die Förderung bekomme?",
      answer: "Ehrliche Antwort: Für die AZAV-gebundenen Wege (Qualifizierungschancengesetz, Qualifizierungsgeld, Bildungsgutschein) sind wir nicht der zertifizierte Träger – wir sind auf praxisnahe Copilot- und KI-Qualifizierung spezialisiert, nicht auf das AZAV-Zulassungsverfahren. Für diese Programme liefern wir die Fachinhalte in ein zertifiziertes Programm ein oder arbeiten mit AZAV-Partnern zusammen. Ohne AZAV direkt förderfähig über die Copilotenschule sind dagegen die Länderprogramme wie der Bildungsscheck NRW 2.0: Dort brauchen Teilnehmende nur eine Rechnung und eine Teilnahmebestätigung von uns. Wir sagen Ihnen offen, welcher Weg zu Ihrer Situation passt."
    },
    {
      name: "Woher weiß ich, ob mein Unternehmen die Förderung überhaupt bekommt?",
      answer: "Verbindlich entscheidet das die zuständige Agentur für Arbeit bzw. die Landesstelle – aber die groben Leitplanken lassen sich vorab prüfen. Für das Qualifizierungschancengesetz gilt: sozialversicherungspflichtig Beschäftigte, ein Maßnahmenumfang über 120 Stunden, ein AZAV-zugelassener Träger und Inhalte, die über die reine Anpassung an den aktuellen Arbeitsplatz hinausgehen. KI- und Copilot-Kompetenz fällt klar in diese Kategorie. Für den Bildungsscheck NRW 2.0 sind es Wohnsitz in NRW und ein zu versteuerndes Jahreseinkommen bis 50.000 Euro. Wir empfehlen, früh den Arbeitgeber-Service der Agentur bzw. die G.I.B.-Beratung einzubinden; die Unterlagen zum Programm liefern wir."
    },
    {
      name: "Können wir die EU-AI-Act-Schulungspflicht und die Weiterbildungsförderung sinnvoll kombinieren?",
      answer: "Ja, und das ist einer der stärksten Gründe, jetzt zu handeln. Die KI-Kompetenz-Pflicht aus dem EU AI Act verlangt ohnehin ein nachweisbares Schulungsprogramm – wenn dieses Programm groß genug angelegt wird, um die 120-Stunden-Schwelle zu erreichen, lässt sich derselbe Pflichtaufwand teilweise über das Qualifizierungschancengesetz refinanzieren. Aus einer regulatorischen Pflicht wird so eine geförderte Investition. Die Copilotenschule denkt beide Anforderungen von Anfang an zusammen."
    },
    {
      name: "Wir sitzen nicht in NRW – gibt es den Bildungsscheck auch in anderen Bundesländern?",
      answer: "Der Bildungsscheck 2.0 ist ein NRW-Programm, aber viele Länder haben vergleichbare individuelle Zuschüsse: Hamburg etwa den Weiterbildungsbonus (bis 40 Prozent, maximal 1.500 Euro), Rheinland-Pfalz den QualiScheck, Sachsen den Weiterbildungsscheck (der allerdings zeitweise haushaltsbedingt pausiert). Diese Programme ändern sich häufiger als die Bundesförderung – manche werden pausiert oder neu aufgelegt. Es lohnt sich, vor der Anmeldung die aktuelle Landesstelle zu prüfen. Da diese Zuschüsse keine AZAV-Zulassung verlangen, sind unsere Trainings dort in der Regel direkt anrechenbar."
    },
    {
      name: "Unsere Belegschaft hat sehr unterschiedliche Vorkenntnisse – lässt sich das trotzdem als ein förderfähiges Programm abbilden?",
      answer: "Gerade das ist ein Vorteil eines mehrmoduligen Programms. Statt alle durch dieselbe Schulung zu schicken, lassen sich rollengerechte Lernpfade – Einsteiger, Power-User, Führungskräfte, Administratoren – zu einem zusammenhängenden Qualifizierungsprogramm bündeln, das in Summe die geforderten 120 Stunden überschreitet und trotzdem für jede Gruppe passt. Die Copilotenschule baut solche gestuften Lernreisen und dokumentiert sie so, dass sie als ein förderfähiges Ganzes darstellbar sind – gegenüber der Agentur für Arbeit ebenso wie gegenüber einem AZAV-Partner, der die Maßnahme zertifiziert durchführt."
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
          "Welche Förderprogramme 2026 Copilot- und KI-Weiterbildung finanzieren: Qualifizierungschancengesetz (§ 82 SGB III), Qualifizierungsgeld (§ 82a), Bildungsgutschein (§ 81) und Länderprogramme wie der Bildungsscheck NRW 2.0 – mit Förderquoten, Voraussetzungen und dem AZAV-Faktor.",
        "author": getAuthorSchemaMarkup(martinLang),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization",
        },
        "datePublished": "2026-07-06",
        "dateModified": "2026-07-21",
        "keywords": [
          "Copilot Schulung Förderung",
          "Qualifizierungschancengesetz Copilot",
          "QCG Förderung KI-Schulung",
          "§ 82 SGB III Weiterbildung",
          "Qualifizierungsgeld § 82a SGB III",
          "Bildungsgutschein KI-Weiterbildung",
          "Bildungsscheck NRW 2.0",
          "Weiterbildungsförderung Beschäftigte 2026",
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
        title="Copilot-Schulung fördern lassen 2026: QCG, Qualifizierungsgeld & Bildungsscheck | copilotenschule.de"
        description="Welche Förderprogramme 2026 KI- und Copilot-Weiterbildung finanzieren: § 82 SGB III (bis 100 % Lehrgangskosten), Qualifizierungsgeld, Bildungsgutschein und Bildungsscheck NRW 2.0. Quoten, Voraussetzungen und der AZAV-Faktor – ehrlich erklärt."
        keywords={[
          "Copilot Schulung Förderung",
          "Qualifizierungschancengesetz Copilot",
          "Qualifizierungsgeld § 82a SGB III",
          "Bildungsscheck NRW 2.0",
          "Weiterbildungsförderung Beschäftigte 2026",
          "geförderte Microsoft-Copilot-Schulung",
        ]}
        canonicalUrl={pageUrl}
        schema={schema}
        author={martinLang}
        publishedTime="2026-07-06T09:00:00+02:00"
        modifiedTime="2026-07-21T09:00:00+02:00"
      />
      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "Förderung für Copilot-Schulungen", href: `/wissen/${SLUG}` },
        ]}
        title={PAGE_TITLE}
        description="Vier Förderwege finanzieren 2026 KI- und Copilot-Weiterbildung – vom Qualifizierungschancengesetz bis zum Bildungsscheck. Welcher zu Ihrem Unternehmen passt und worauf es bei der Anbieterwahl ankommt."
        lastUpdated="21. Juli 2026"
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
              2026 finanzieren gleich mehrere Programme KI- und Copilot-Weiterbildung. Der größte
              Hebel ist das <strong>Qualifizierungschancengesetz (§ 82 SGB III)</strong>: bis zu
              100 Prozent der Lehrgangskosten plus Entgeltzuschuss, aber nur für Programme über{" "}
              <strong>120 Stunden</strong> und über einen <strong>AZAV-zertifizierten Träger</strong>.
              Das <strong>Qualifizierungsgeld (§ 82a)</strong> ersetzt bei Strukturwandel den Lohn
              während der Weiterbildung, der <strong>Bildungsgutschein (§ 81)</strong> zielt auf
              von Arbeitslosigkeit bedrohte Beschäftigte. Ohne AZAV auskommen die{" "}
              <strong>Länderprogramme</strong> – etwa der <strong>Bildungsscheck NRW 2.0</strong>{" "}
              (50 Prozent, bis 500 Euro pro Person und Jahr). Wichtig zur Einordnung: Die
              Copilotenschule ist kein AZAV-Träger; über uns direkt förderfähig sind die
              Länderprogramme, für die großen Bundesprogramme liefern wir die Inhalte in ein
              zertifiziertes Programm ein.
            </p>
          </CardContent>
        </Card>

        {/* Einleitung */}
        <div className="prose prose-lg max-w-none dark:prose-invert mb-4">
          <p>
            Über Copilot-Schulungen wird meistens unter dem Gesichtspunkt Nutzen und Produktivität
            gesprochen, seltener unter dem der Finanzierung. Dabei gibt es in Deutschland gleich
            mehrere Förderinstrumente, die für genau diese Art von Weiterbildung gemacht sind – und
            die viele Unternehmen nicht auf dem Schirm haben, weil sie sie mit klassischer
            Arbeitslosen-Förderung verwechseln. Die wichtigsten davon fördern die Weiterbildung von
            Menschen, die in fester Beschäftigung sind, und zielen auf genau die Kompetenzlücke, die
            Digitalisierung und KI gerade in nahezu jedem Betrieb aufreißen.
          </p>
          <p>
            Dieser Text ordnet die vier relevanten Wege nüchtern ein: was sie leisten, für wen sie
            gelten, welche Voraussetzungen daran hängen – und, das ist der Punkt, den die meisten
            Ratgeber verschweigen, welche Rolle die AZAV-Zertifizierung des Anbieters spielt. Denn
            manche Programme setzen sie zwingend voraus, andere nicht. Wer das früh weiß, wählt den
            passenden Weg und den passenden Anbieter, statt am Ende an einer Formalie zu scheitern.
          </p>
        </div>

        {/* Sektion 0: Überblick */}
        <section id="ueberblick" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Die Förderwege 2026 im Überblick
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Vier Wege sind für eine Copilot-Qualifizierung praktisch relevant. Drei davon sind
              Bundesprogramme im Sozialgesetzbuch III und an eine AZAV-Zulassung gebunden, der
              vierte umfasst die individuellen Länderzuschüsse, die ohne AZAV auskommen. Die
              folgende Tabelle zeigt die Unterschiede auf einen Blick; die Abschnitte danach gehen
              ins Detail.
            </p>
          </div>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-border text-left">
                  <th className="py-2 pr-4 font-semibold">Programm</th>
                  <th className="py-2 pr-4 font-semibold">Was wird gefördert</th>
                  <th className="py-2 pr-4 font-semibold">Für wen</th>
                  <th className="py-2 pr-4 font-semibold">AZAV nötig?</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border align-top">
                  <td className="py-2 pr-4 font-medium">Qualifizierungschancengesetz<br /><span className="text-muted-foreground">§ 82 SGB III</span></td>
                  <td className="py-2 pr-4">Lehrgangskosten (bis 100 %) + Entgeltzuschuss</td>
                  <td className="py-2 pr-4">Beschäftigte, alle Betriebsgrößen</td>
                  <td className="py-2 pr-4">Ja</td>
                </tr>
                <tr className="border-b border-border align-top">
                  <td className="py-2 pr-4 font-medium">Qualifizierungsgeld<br /><span className="text-muted-foreground">§ 82a SGB III</span></td>
                  <td className="py-2 pr-4">Lohnersatz (60/67 %), <em>nicht</em> die Lehrgangskosten</td>
                  <td className="py-2 pr-4">Betriebe im Strukturwandel</td>
                  <td className="py-2 pr-4">Ja</td>
                </tr>
                <tr className="border-b border-border align-top">
                  <td className="py-2 pr-4 font-medium">Bildungsgutschein<br /><span className="text-muted-foreground">§ 81 SGB III</span></td>
                  <td className="py-2 pr-4">Lehrgangskosten (bis 100 %)</td>
                  <td className="py-2 pr-4">Arbeitslose / von Arbeitslosigkeit Bedrohte</td>
                  <td className="py-2 pr-4">Ja</td>
                </tr>
                <tr className="align-top">
                  <td className="py-2 pr-4 font-medium">Länderprogramme<br /><span className="text-muted-foreground">z. B. Bildungsscheck NRW 2.0</span></td>
                  <td className="py-2 pr-4">50 % bis 500 € (NRW) bzw. je Land verschieden</td>
                  <td className="py-2 pr-4">Einzelpersonen, teils Einkommensgrenze</td>
                  <td className="py-2 pr-4">Nein</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Sektion 1: QCG */}
        <section id="qcg" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Qualifizierungschancengesetz (§ 82 SGB III)
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Das Qualifizierungschancengesetz ist kein eigenes Gesetzbuch, sondern eine Erweiterung
              des Sozialgesetzbuchs III. Der zentrale Paragraf ist § 82 SGB III – „Förderung der
              beruflichen Weiterbildung Beschäftigter“. Seit dem 1. Januar 2019 können Arbeitgeber
              darüber Zuschüsse zur Weiterbildung ihrer eigenen Belegschaft erhalten, unabhängig von
              Alter, Qualifikation und Betriebsgröße. Der Grundgedanke: Wer heute qualifiziert wird,
              muss morgen nicht arbeitslos werden – Prävention statt Reparatur.
            </p>
            <p>
              Gefördert werden zwei Dinge: die <strong>Lehrgangskosten</strong> und – als Ausgleich
              für die Zeit, in der geschult statt gearbeitet wird – ein{" "}
              <strong>Arbeitsentgeltzuschuss</strong>. Die Höhe hängt an der Betriebsgröße. Bei den
              Lehrgangskosten gilt: Betriebe mit unter 50 Beschäftigten können bis zu 100 Prozent
              erstattet bekommen, Betriebe mit 50 bis unter 500 Beschäftigten die Hälfte, Betriebe
              ab 500 ein Viertel. Wer eine Betriebsvereinbarung oder einen Tarifvertrag zur
              beruflichen Weiterbildung hat, erhält jeweils fünf Prozentpunkte obendrauf (also 55
              bzw. 30 Prozent). Der Arbeitsentgeltzuschuss folgt derselben Logik: bis zu 75 Prozent
              bei den Kleinsten, 50 Prozent im Mittelfeld, 25 Prozent bei den Großen.
            </p>
            <p>
              Zwei Details heben die Quote im Einzelfall an: In Betrieben mit weniger als 500
              Beschäftigten entfällt der Eigenanteil an den Lehrgangskosten ganz, wenn die
              betreffende Person <strong>mindestens 45 Jahre</strong> alt oder{" "}
              <strong>schwerbehindert</strong> ist. Wer eine gemischte Belegschaft qualifiziert,
              sollte diese Konstellationen kennen.
            </p>
            <p>
              Der entscheidende Haken, an dem die meisten Anfragen scheitern: § 82 verlangt, dass
              die Maßnahme insgesamt <strong>mehr als 120 Stunden</strong> umfasst – nicht am Stück,
              aber in Summe. Ein ein- oder zweitägiger Copilot-Workshop mit 7 bis 14 Stunden liegt
              weit darunter und ist damit <em>nicht</em> förderfähig. Förderfähig wird eine
              Copilot-Qualifizierung erst als längeres, zusammenhängendes Programm: mehrere Module
              über Wochen oder Monate, die Grundlagen, rollenspezifische Vertiefung, begleitete
              Praxisphasen und Lernkontrollen kombinieren. Genau diese Form – oft „Lernreise“
              genannt – erfüllt nicht nur die Stundenschwelle, sondern ist didaktisch ohnehin
              wirksamer als ein einmaliger Frontal-Termin. Dass KI- und Copilot-Kompetenz
              „zukunftsrelevante Kompetenzen“ vermittelt und über eine kurzfristige
              Arbeitsplatzanpassung hinausgeht, erfüllt die inhaltliche Anforderung problemlos.
            </p>
            <p>
              Die zweite harte Bedingung: Sowohl der Träger als auch die konkrete Maßnahme müssen
              nach der <strong>AZAV</strong> (Akkreditierungs- und Zulassungsverordnung
              Arbeitsförderung) zugelassen sein. Das ist der Prüfstein, an dem die Agentur für
              Arbeit die Förderung festmacht – mehr dazu weiter unten. Den Antrag stellt der
              Arbeitgeber (bei mehreren vergleichbaren Beschäftigten als Sammelantrag), und zwar{" "}
              <strong>vor Beginn</strong> der Maßnahme. Seit Januar 2026 koppeln die Fachlichen
              Weisungen der Bundesagentur den Entgeltzuschuss strikter an den tatsächlichen,
              weiterbildungsbedingten Arbeitsausfall.
            </p>
          </div>
        </section>

        {/* Sektion 2: Qualifizierungsgeld */}
        <section id="qualifizierungsgeld" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Qualifizierungsgeld (§ 82a SGB III)
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Das Qualifizierungsgeld ist das jüngste Instrument: Es existiert seit dem 1. April
              2024 und wurde mit dem Gesetz zur Stärkung der Aus- und Weiterbildungsförderung
              eingeführt. Es setzt an einer anderen Stelle an als das Qualifizierungschancengesetz.
              Nicht die Lehrgangskosten werden bezuschusst, sondern der <strong>Lohn</strong>: Wer
              sich weiterbildet, erhält für die weiterbildungsbedingte Ausfallzeit einen Lohnersatz
              von <strong>60 Prozent</strong> – oder 67 Prozent, wenn ein Kind im Haushalt lebt –
              der Nettoentgeltdifferenz, finanziert von der Agentur für Arbeit. Die Kosten der
              Weiterbildung selbst trägt in diesem Modell der Arbeitgeber.
            </p>
            <p>
              Das Qualifizierungsgeld ist gezielt auf den <strong>Strukturwandel</strong>
              zugeschnitten. Es greift, wenn in einem Betrieb ein nachweisbarer, strukturwandel­
              bedingter Qualifizierungsbedarf besteht – etwa weil Technologien, Märkte oder
              Produktionsweisen sich verändern. Betroffen sein muss ein relevanter Teil der
              Belegschaft: mindestens 10 Prozent in Betrieben unter 250 Beschäftigten, mindestens
              20 Prozent in größeren. Auch hier gilt die 120-Stunden-Schwelle und die
              AZAV-Zulassung der Maßnahme; in der Regel braucht es zudem eine Betriebsvereinbarung
              oder tarifvertragliche Grundlage. Für Unternehmen, die ganze Abteilungen durch die
              KI-Transformation führen, kann das Qualifizierungsgeld die Lohnkosten einer breit
              angelegten Copilot-Lernreise spürbar abfedern.
            </p>
          </div>
        </section>

        {/* Sektion 3: Bildungsgutschein */}
        <section id="bildungsgutschein" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Bildungsgutschein (§ 81 SGB III)
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Der Bildungsgutschein nach § 81 SGB III ist das bekannteste, aber am engsten
              zugeschnittene Instrument. Er richtet sich primär an <strong>Arbeitslose</strong> und
              an Menschen, deren Arbeitsplatz konkret bedroht ist, und übernimmt bei Bewilligung die
              Lehrgangskosten in der Regel vollständig. Für fest Beschäftigte ist er nur in
              Sonderfällen zugänglich – etwa wenn der Arbeitsplatz durch den Strukturwandel
              wegzufallen droht oder ein Berufsabschluss fehlt.
            </p>
            <p>
              Für die breite Copilot-Qualifizierung einer bestehenden Belegschaft ist der
              Bildungsgutschein deshalb selten der richtige Hebel – dafür ist das
              Qualifizierungschancengesetz gemacht. Relevant wird er dort, wo einzelne Personen aus
              gefährdeten Tätigkeitsfeldern (etwa klassisches Marketing, Verwaltung, Druck) sich
              gezielt in Richtung KI-Kompetenz umqualifizieren. Auch hier gilt: Nur AZAV-zugelassene
              Träger und Maßnahmen werden über den Bildungsgutschein gefördert.
            </p>
          </div>
        </section>

        {/* Sektion 4: Länderprogramme */}
        <section id="laenderprogramme" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Länderprogramme: Bildungsscheck &amp; Co.
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Neben den Bundesprogrammen unterhalten die Länder eigene, individuelle Zuschüsse – und
              die sind für Copilot-Schulungen oft der unkomplizierteste Weg, weil sie{" "}
              <strong>keine AZAV-Zulassung</strong> verlangen. Das prominenteste Beispiel ist der{" "}
              <strong>Bildungsscheck NRW 2.0</strong>, der seit dem 1. Februar 2026 wieder verfügbar
              ist und aus Landes- und ESF-Mitteln finanziert wird. Er übernimmt{" "}
              <strong>50 Prozent</strong> der Weiterbildungsausgaben, maximal 500 Euro, einmal pro
              Kalenderjahr. Anspruch haben Personen mit Wohnsitz in NRW und einem zu versteuernden
              Jahreseinkommen bis 50.000 Euro (bei zusammen veranlagten Ehepaaren 100.000 Euro).
            </p>
            <p>
              Der Ablauf ist bewusst schlank: Man meldet die Weiterbildung online im ESF-Portal des
              Landes an – spätestens einen Tag vor Kursbeginn –, nimmt teil und reicht danach
              Rechnung, Teilnahmebestätigung und Einkommensteuerbescheid ein. Eine Trägerzulassung
              oder AZAV-Zertifizierung ist nicht erforderlich; es genügt, dass es sich um
              berufsbezogene Weiterbildung handelt. Damit sind Copilot-Trainings der Copilotenschule
              für NRW-Beschäftigte innerhalb der Einkommensgrenze direkt anrechenbar.
            </p>
            <p>
              Andere Länder haben vergleichbare Programme mit eigenen Konditionen: der{" "}
              <strong>Hamburger Weiterbildungsbonus</strong> (bis zu 40 Prozent, maximal 1.500 Euro),
              der <strong>QualiScheck in Rheinland-Pfalz</strong> oder der{" "}
              <strong>Weiterbildungsscheck in Sachsen</strong> (der zeitweise haushaltsbedingt
              pausiert). Diese Programme ändern sich häufiger als die Bundesförderung und werden
              gelegentlich pausiert oder neu aufgelegt – ein Blick auf die aktuelle Landesstelle vor
              der Anmeldung lohnt sich. Für einzelne Mitarbeitende und kleine Teams sind sie oft der
              schnellste Einstieg in eine geförderte Copilot-Weiterbildung.
            </p>
          </div>
        </section>

        {/* Sektion 5: AZAV ehrlich */}
        <section id="azav" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Die AZAV-Voraussetzung – ehrlich erklärt
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Ein Punkt entscheidet bei den drei Bundesprogrammen über alles andere: die
              AZAV-Zulassung. Qualifizierungschancengesetz, Qualifizierungsgeld und
              Bildungsgutschein fördern ausschließlich Maßnahmen, bei denen sowohl der Bildungsträger
              als auch die konkrete Maßnahme nach der Akkreditierungs- und Zulassungsverordnung
              Arbeitsförderung zugelassen sind. Ohne diese Zulassung gibt es kein Geld von der
              Agentur für Arbeit – unabhängig davon, wie gut die Schulung inhaltlich ist.
            </p>
            <p>
              Dazu gehört Transparenz: Die <strong>Copilotenschule ist selbst kein
              AZAV-zertifizierter Träger</strong>. Wir sind auf die inhaltliche und didaktische
              Qualität praxisnaher Copilot- und KI-Qualifizierung spezialisiert, nicht auf das
              formale AZAV-Zulassungsverfahren. Für die AZAV-gebundenen Programme heißt das: Wir
              liefern die Fachinhalte und das didaktische Konzept in ein zertifiziertes Programm ein
              oder arbeiten mit AZAV-zugelassenen Partnern zusammen, die die Maßnahme förderfähig
              durchführen. Die <strong>Länderprogramme</strong> hingegen – Bildungsscheck NRW 2.0
              und Verwandte – verlangen keine AZAV-Zulassung; hier sind unsere Trainings direkt
              anrechenbar.
            </p>
            <p>
              Für Sie als Entscheider bedeutet das eine einfache Faustregel: Geht es um die breite,
              geförderte Qualifizierung über ein Bundesprogramm, muss ein AZAV-Träger im Spiel sein –
              wir bringen die Copilot-Kompetenz in dieses Konstrukt ein. Geht es um einzelne
              Mitarbeitende oder kleinere Teams, ist der Weg über ein Länderprogramm meist direkter
              und schneller.
            </p>
          </div>
        </section>

        {/* Sektion 6: Copilotenschule */}
        <section id="copilotenschule" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Wie die Copilotenschule bei der Förderung unterstützt
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Die Copilotenschule ist auf genau die Konstellation spezialisiert, in der sich
              Weiterbildungsförderung lohnt: Unternehmen, die ihre Belegschaft breit und nachhaltig
              in Microsoft Copilot und KI-Werkzeugen qualifizieren wollen – nicht in einem einmaligen
              Termin, sondern als strukturiertes Programm. Unsere mehrmoduligen Lernreisen bündeln
              rollengerechte Lernpfade für Einsteiger, Power-User, Führungskräfte und Administratoren
              zu einem zusammenhängenden Ganzen – die Form, die didaktisch wirkt und zugleich die
              120-Stunden-Schwelle erreichbar macht.
            </p>
            <p>
              Konkret unterstützen wir an drei Stellen: Wir gestalten das Programm so, dass es die
              inhaltlichen und formalen Anforderungen erfüllt – ob für ein Länderprogramm oder als
              Baustein in einer AZAV-zertifizierten Maßnahme. Wir liefern die maßnahmenbezogenen
              Unterlagen (Curriculum, Stundennachweis, Teilnahmebestätigung), die Ihre
              Personalabteilung oder ein AZAV-Partner für den Antrag braucht. Und wir denken die
              EU-AI-Act-Schulungspflicht von Anfang an mit, sodass aus einer regulatorischen Pflicht
              eine geförderte Investition wird. Ob eine Förderung im Einzelfall bewilligt wird,
              entscheidet immer die zuständige Stelle – aber wir sorgen dafür, dass Ihr Programm die
              besten Voraussetzungen mitbringt und Sie den richtigen Weg wählen.
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
              Sie möchten prüfen, welcher Förderweg zu Ihrer Copilot-Qualifizierung passt? Wir
              strukturieren mit Ihnen ein Programm, das die Anforderungen erfüllt – von der
              120-Stunden-Lernreise bis zum anrechenbaren Einzeltraining über ein Länderprogramm.
              Sehen Sie sich unsere{" "}
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
              , den Rollout-Rahmen unser{" "}
              <Link to="/wissen/copilot-im-unternehmen-einfuehren-leitfaden" className="underline">
                Leitfaden zur Copilot-Einführung
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
            Zeitpunkt der Veröffentlichung (Juli 2026) wieder und dient der allgemeinen Information.
            Er stellt keine Rechts-, Steuer- oder Förderberatung dar. Förderquoten, Voraussetzungen,
            Einkommensgrenzen und Zuständigkeiten können sich ändern; einzelne Länderprogramme
            werden pausiert oder neu aufgelegt. Eine verbindliche Auskunft erteilt ausschließlich die
            zuständige Agentur für Arbeit bzw. die jeweilige Landesstelle.
          </p>
        </div>

        {/* Quellen */}
        <div className="prose prose-sm max-w-none dark:prose-invert mb-8">
          <h3 className="font-semibold">Quellen</h3>
          <ul>
            <li>§ 82 SGB III – Förderung der beruflichen Weiterbildung Beschäftigter (gesetze-im-internet.de)</li>
            <li>§ 82a SGB III – Qualifizierungsgeld (gesetze-im-internet.de; eingeführt durch das Gesetz zur Stärkung der Aus- und Weiterbildungsförderung, in Kraft seit 01.04.2024)</li>
            <li>§ 81 SGB III – Grundsatz der Weiterbildungsförderung / Bildungsgutschein (gesetze-im-internet.de)</li>
            <li>Bundesagentur für Arbeit – Förderung von Weiterbildung: Informationen für Unternehmen; Fachliche Weisungen zu § 82 SGB III (gültig ab 01.01.2026) (arbeitsagentur.de)</li>
            <li>Ministerium für Arbeit, Gesundheit und Soziales NRW – Bildungsscheck 2.0 (mags.nrw/bildungsscheck; Stand 2026)</li>
            <li>Bundesministerium für Arbeit und Soziales – Förderung der beruflichen Weiterbildung (bmas.de)</li>
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
  title: "Copilot-Schulung fördern lassen: Die Förderprogramme 2026 im Überblick",
  description: "QCG (§ 82 SGB III), Qualifizierungsgeld, Bildungsgutschein und Bildungsscheck NRW 2.0: Welche Programme KI- und Copilot-Weiterbildung 2026 finanzieren – mit dem AZAV-Faktor.",
  link: "/wissen/copilot-schulung-foerderung-qcg-2026",
  badge: "Förderung & Finanzierung",
  icon: "€",
  lastUpdated: "21. Juli 2026",
  publishDate: "2026-07-06",
  publishTime: "09:00"
},
```

## Interne Verlinkung (verifiziert vorhandene Slugs, Stand 21.07.2026)
- `/trainings/microsoft-365-copilot-praxis` (Trainings-CTA)
- `/wissen/copilot-lernreise-vs-tagesschulung` ✅
- `/wissen/ki-schulung-mitarbeiter-pflicht` ✅ (Protected Page – nur additiv verlinken, nicht bearbeiten)
- `/wissen/copilot-im-unternehmen-einfuehren-leitfaden` ✅
- Optional zusätzlich: `/wissen/eu-ai-act-mitarbeiter-schulung-august-2026`, `/wissen/copilot-training-schulung`

## Offene Punkte für Martin (vor Deployment entscheiden)
1. **Slug:** Bleibt aktuell `copilot-schulung-foerderung-qcg-2026`, obwohl der Artikel jetzt breiter ist. Für einen Multi-Programm-Hub wäre `copilot-schulung-foerderung` sauberer. Slug-Änderung = Datei umbenennen + articles.ts + App.tsx + sitemap + react-snap anpassen. Sag Bescheid, ob ich das umstellen soll.
2. **AZAV-Formulierung:** Ist die ehrliche Linie („wir sind kein AZAV-Träger, liefern Inhalte / Partner") so für dich ok, oder möchtest du das anders positionieren (z. B. konkreten AZAV-Partner benennen)?
3. **Trainings-Link-Slug** `/trainings/microsoft-365-copilot-praxis` bitte gegen aktuelle Route gegenchecken.

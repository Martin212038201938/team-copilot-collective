# B3c Hub-Artikel-Entwurf — Microsoft Copilot Inhouse-Schulung buchen

> **Status:** Entwurf zum Review. Zum Aktivieren die Schritte in `copilot-inhouse-schulung-buchen-deployment-checklist.md` ausführen.
> **Zieldatei:** `src/pages/CopilotInhouseSchulungBuchen.tsx`
> **Slug:** `/wissen/copilot-inhouse-schulung-buchen`
> **Autor:** Martin Lang
> **Erstellt:** 06.07.2026 (Cron `copilotenschule-seo-b3b-b3c-hubs-draft`)
>
> **⚠️ KUNDEN-FREIGABE ERFORDERLICH VOR LIVE-SCHALTUNG:**
> Die Kunden-Cases in Sektion 5 sind als **Platzhalter** hinterlegt: `[Kunden-Case: anonymisiert oder mit Freigabe einfügen]`. REWE, Pernod Ricard, Lekkerland, Marriott, Med360Grad, IHK Nord Westfalen o. Ä. dürfen NUR nach ausdrücklicher schriftlicher Freigabe namentlich genannt werden (vgl. Status-Log 22.06. — Referenzkunden bewusst nicht ohne Freigabe genannt). Ohne Freigabe: anonymisierte Formulierung („ein bundesweiter Lebensmittelhändler …") verwenden.
>
> **Preis-Hinweis (recherchiert aus `src/data/trainings.ts`, Stand 06.07.2026):**
> - Offenes Training: „Ab 1.495 € pro Person für 2 Tage" (bestehende Angabe im Repo).
> - Inhouse: laut Repo „Inhouse-Konditionen auf Anfrage". Der Draft nennt daher einen **transparenten Rahmen als Tagessatz-Range mit ausdrücklichem „ab"/„Richtwert"-Vorbehalt** und verweist für die verbindliche Zahl auf ein Angebot. **Vor Live-Schaltung: Preis-Range mit Martin/Vertrieb abgleichen** — die genannten Zahlen sind ein plausibler Marktrahmen, KEINE bestätigte Preisliste.

---

```tsx
import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import AuthorBio from "@/components/AuthorBio";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";
import { Link } from "react-router-dom";

const SLUG = "copilot-inhouse-schulung-buchen";
const PAGE_TITLE = "Microsoft Copilot Inhouse-Schulung buchen: Ablauf, Preise, Kunden-Cases";

const CopilotInhouseSchulungBuchen = () => {
  const martinLang = getAuthor("martin-lang")!;

  const ids = generateSchemaIds(SLUG, "wissen");
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const tableOfContents = [
    { id: "was-heisst-inhouse", title: "Was eine Inhouse-Schulung bedeutet", level: 2 },
    { id: "wann-sinnvoll", title: "Ab wann sich Inhouse lohnt (Schwellenwert)", level: 2 },
    { id: "ablauf", title: "Der Ablauf einer Inhouse-Schulung", level: 2 },
    { id: "preise", title: "Was eine Inhouse-Schulung kostet", level: 2 },
    { id: "cases", title: "Kunden-Cases aus der Praxis", level: 2 },
    { id: "buchen", title: "So buchen Sie Ihre Inhouse-Schulung", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
  ];

  const faqs = [
    {
      name: "Ab wie vielen Teilnehmern lohnt sich eine Inhouse-Schulung gegenüber offenen Seminaren?",
      answer: "Als Faustregel wird eine Inhouse-Schulung ab etwa acht Mitarbeitenden wirtschaftlich attraktiver als die Buchung einzelner Plätze in offenen Trainings. Ab dieser Größe liegt der Pro-Kopf-Preis einer geschlossenen Gruppe meist unter dem Einzelplatzpreis – und Sie bekommen zusätzlich ein auf Ihre Systeme, Daten und Anwendungsfälle zugeschnittenes Programm. Bei kleineren Gruppen kann das offene Training günstiger sein. Die Copilotenschule rechnet Ihnen beide Varianten transparent gegenüber, bevor Sie sich entscheiden."
    },
    {
      name: "Was kostet eine Copilot-Inhouse-Schulung für unser Team konkret?",
      answer: "Inhouse-Schulungen werden als Tagessatz für die gesamte Gruppe kalkuliert, nicht pro Person – das ist der Grund, warum sie ab einer gewissen Gruppengröße günstiger werden. Als Orientierung liegt der Tagessatz für einen erfahrenen Copilot-Trainer je nach Vorbereitungsaufwand, Individualisierung und Ort im Rahmen üblicher Marktsätze; eine verbindliche Zahl nennen wir im Angebot, weil sie von Teilnehmerzahl, Modulanzahl und Reisekosten abhängt. Bei mehrtägigen oder mehrmoduligen Programmen sinkt der effektive Pro-Kopf-Preis weiter. Eine unverbindliche Kalkulation erhalten Sie innerhalb weniger Tage."
    },
    {
      name: "Können Sie die Schulung auf unsere konkreten Anwendungsfälle und Daten zuschneiden?",
      answer: "Ja, und genau das ist der Kern des Inhouse-Formats. Vor der Schulung klären wir in einem Vorgespräch, welche Rollen, Abteilungen und typischen Aufgaben im Fokus stehen – ob Excel-Auswertungen im Controlling, Angebotserstellung im Vertrieb oder Dokumenten-Workflows im Backoffice. Die Übungen arbeiten dann mit Ihren realen Szenarien statt mit generischen Beispielen. Das erhöht die Übertragung in den Arbeitsalltag deutlich und ist der Hauptgrund, warum Inhouse-Teilnehmer das Gelernte häufiger tatsächlich anwenden."
    },
    {
      name: "Führen Sie die Schulung bei uns vor Ort durch oder auch remote?",
      answer: "Beides ist möglich. Vor-Ort-Schulungen haben den Vorteil der ungeteilten Aufmerksamkeit und der direkten Zusammenarbeit an den Rechnern der Teilnehmer; Remote-Schulungen sparen Reisekosten und lassen sich leichter auf mehrere Standorte verteilen. Viele Kunden wählen eine Mischform: einen Präsenz-Auftakt, gefolgt von kürzeren Remote-Vertiefungen. Die Copilotenschule empfiehlt das Format passend zu Ihrer Standortstruktur und Ihrem Budget – nicht umgekehrt."
    },
    {
      name: "Wie schnell können wir eine Inhouse-Schulung starten, wenn wir uns entscheiden?",
      answer: "Nach dem Erstgespräch und der Freigabe eines Angebots liegt der übliche Vorlauf bei zwei bis vier Wochen – genug Zeit für das inhaltliche Feintuning und die Terminabstimmung, ohne unnötige Verzögerung. Bei zeitkritischen Anlässen, etwa mit Blick auf die EU-AI-Act-Frist im August 2026, lässt sich der Start beschleunigen. Wenn Sie einen Wunschtermin haben, nennen Sie ihn im Erstkontakt; wir prüfen die Verfügbarkeit sofort."
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
          "Microsoft Copilot Inhouse-Schulung buchen: Was Inhouse bedeutet, ab wann es sich lohnt (Richtwert 8+ Mitarbeitende), wie der Ablauf aussieht, welche Preise realistisch sind und wie Sie buchen.",
        "author": getAuthorSchemaMarkup(martinLang),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization",
        },
        "datePublished": "2026-07-06",
        "dateModified": "2026-07-06",
        "keywords": [
          "Copilot Inhouse-Schulung",
          "Microsoft Copilot Inhouse Training",
          "Copilot Schulung buchen",
          "Copilot Firmenschulung",
          "Inhouse-Training Kosten",
          "Copilot Team-Schulung",
          "Copilot Schulung Preise",
        ],
        "articleSection": "Trainings & Buchung",
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
        title="Microsoft Copilot Inhouse-Schulung buchen: Ablauf, Preise, Cases | copilotenschule.de"
        description="Copilot Inhouse-Schulung buchen: Was Inhouse bedeutet, ab wann es sich lohnt (ab 8 Mitarbeitenden), Ablauf, transparente Preise und Kunden-Cases. Jetzt unverbindlich anfragen."
        keywords={[
          "Copilot Inhouse-Schulung",
          "Microsoft Copilot Inhouse Training",
          "Copilot Schulung buchen",
          "Copilot Firmenschulung",
          "Inhouse-Training Kosten",
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
          { label: "Copilot Inhouse-Schulung buchen", href: `/wissen/${SLUG}` },
        ]}
        title={PAGE_TITLE}
        description="Was Inhouse bedeutet, ab wann es sich rechnet, wie der Ablauf aussieht, was es kostet – und wie Sie in wenigen Schritten buchen."
        lastUpdated="6. Juli 2026"
        authorName="Martin Lang"
        tableOfContents={tableOfContents}
      >
        {/* Schnellantwort */}
        <Card className="mb-8 border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-blue-800 dark:text-blue-300">
              Kurz und klar
            </CardTitle>
          </CardHeader>
          <CardContent className="text-blue-900 dark:text-blue-200">
            <p>
              Eine Inhouse-Schulung ist ein geschlossenes Training exklusiv für Ihr Team –
              zugeschnitten auf Ihre Rollen, Systeme und Anwendungsfälle, durchgeführt bei Ihnen
              vor Ort oder remote. Wirtschaftlich lohnt sich das in der Regel <strong>ab rund acht
              Teilnehmenden</strong>, weil dann der Pro-Kopf-Preis unter dem Einzelplatzpreis
              offener Seminare liegt. Abgerechnet wird als Tagessatz für die Gruppe, nicht pro
              Person; die konkrete Zahl hängt von Teilnehmerzahl, Modulanzahl und Reisekosten ab
              und steht im Angebot. Der Buchungsprozess ist schlank: Erstgespräch, Angebot,
              inhaltliche Abstimmung, Termin – üblicher Vorlauf zwei bis vier Wochen.
            </p>
          </CardContent>
        </Card>

        {/* Einleitung */}
        <div className="prose prose-lg max-w-none dark:prose-invert mb-4">
          <p>
            Wenn ein Unternehmen ernsthaft mit Microsoft Copilot arbeiten will, kommt irgendwann
            die Frage auf, ob man einzelne Leute in offene Seminare schickt oder das ganze Team
            gemeinsam schult. Beides hat seine Berechtigung – aber sie zielen auf
            unterschiedliche Situationen. Dieser Text erklärt, was eine Inhouse-Schulung
            ausmacht, ab wann sie sich rechnet, wie sie abläuft und was sie realistisch kostet,
            damit Sie eine fundierte Entscheidung treffen können statt einer aus dem Bauch.
          </p>
        </div>

        {/* Sektion 1 */}
        <section id="was-heisst-inhouse" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Was eine Inhouse-Schulung bedeutet
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Inhouse heißt: Das Training findet exklusiv für die Mitarbeitenden eines
              Unternehmens statt – nicht als offene Veranstaltung, zu der sich Teilnehmer
              verschiedener Firmen anmelden. Der Trainer kommt zu Ihnen (oder in einen digitalen
              Raum, den nur Ihr Team betritt), und die gesamte Schulung dreht sich um Ihre
              Realität: Ihre Microsoft-365-Umgebung, Ihre Lizenzsituation, Ihre typischen
              Aufgaben und die Fragen, die genau in Ihrem Haus aufkommen.
            </p>
            <p>
              Der Unterschied zum offenen Seminar ist nicht nur organisatorisch, sondern
              didaktisch. In einem offenen Training muss der Trainer für ein gemischtes Publikum
              generische Beispiele wählen. Inhouse kann er mit den Anwendungsfällen arbeiten, die
              Ihre Leute morgen wieder auf dem Tisch haben – und genau dieser Praxisbezug
              entscheidet darüber, ob das Gelernte hängen bleibt oder in der Schublade
              verschwindet.
            </p>
          </div>
        </section>

        {/* Sektion 2 */}
        <section id="wann-sinnvoll" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Ab wann sich Inhouse lohnt (Schwellenwert)
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Der wirtschaftliche Kipppunkt liegt als Faustregel bei etwa acht Teilnehmenden. Der
              Grund ist einfache Arithmetik: Eine Inhouse-Schulung wird als Tagessatz für die
              gesamte Gruppe kalkuliert. Teilt man diesen Tagessatz durch die Teilnehmerzahl,
              sinkt der Pro-Kopf-Preis mit jeder zusätzlichen Person. Ab ungefähr acht Personen
              unterschreitet er in den meisten Fällen den Preis, den Sie für ebenso viele
              Einzelplätze in offenen Seminaren zahlen würden – und Sie bekommen ein
              maßgeschneidertes Programm obendrauf.
            </p>
            <p>
              Unterhalb dieser Schwelle kann das offene Training die günstigere Wahl sein,
              besonders wenn nur zwei oder drei Personen geschult werden sollen. Neben dem reinen
              Preis sprechen aber auch andere Faktoren für Inhouse: ein einheitlicher Wissensstand
              im ganzen Team, die Möglichkeit, sensible interne Anwendungsfälle offen zu
              besprechen, und der Effekt, dass eine gemeinsam geschulte Gruppe sich danach
              gegenseitig unterstützt. Wer eine flächendeckende Copilot-Einführung plant, ist
              mit Inhouse fast immer besser bedient.
            </p>
          </div>
        </section>

        {/* Sektion 3 */}
        <section id="ablauf" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Der Ablauf einer Inhouse-Schulung
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Eine gute Inhouse-Schulung beginnt vor dem eigentlichen Schulungstag. Im Vorgespräch
              klären wir, welche Rollen und Abteilungen teilnehmen, wie der Kenntnisstand ist,
              welche Lizenzen im Einsatz sind und welche Anwendungsfälle im Vordergrund stehen
              sollen. Auf dieser Basis passen wir die Inhalte an – ein Controlling-Team bekommt
              andere Schwerpunkte als der Vertrieb oder das Sekretariat.
            </p>
            <p>
              Am Schulungstag selbst wechseln sich kurze Impulse mit viel eigener Übungszeit ab.
              Die Teilnehmer arbeiten an ihren eigenen Rechnern mit realen (oder realitätsnahen)
              Aufgaben, statt einem Trainer beim Vorführen zuzusehen. Nach der Schulung erhalten
              die Teilnehmer Begleitmaterial – Trainings-Decks, Prompt-Vorlagen und
              FAQ-Sammlungen –, damit das Gelernte im Alltag abrufbar bleibt. Bei mehrmoduligen
              Programmen folgen auf den Auftakt weitere Vertiefungen, oft im Wechsel aus Präsenz
              und Remote.
            </p>
            <p>
              Dieser gestufte Aufbau ist kein Zufall: Verteiltes Lernen mit Praxisphasen
              zwischen den Terminen führt nachweislich zu höherer Anwendungsquote als ein
              einmaliger Volltag. Warum das so ist, vertiefen wir im Beitrag{" "}
              <Link to="/wissen/warum-verteiltes-lernen-bei-copilot-trainings-funktioniert" className="underline">
                warum verteiltes Lernen bei Copilot-Trainings funktioniert
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Sektion 4 */}
        <section id="preise" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Was eine Inhouse-Schulung kostet
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Bei den Kosten lohnt sich der Vergleich zweier Logiken. Ein offenes Training buchen
              Sie pro Person – bei der Copilotenschule etwa ab 1.495 Euro pro Person für ein
              zweitägiges Format, inklusive Trainings-Decks, Templates und FAQ-Sammlungen. Eine
              Inhouse-Schulung dagegen wird als Tagessatz für die gesamte Gruppe kalkuliert. Das
              bedeutet: Der Gesamtpreis ändert sich mit der Teilnehmerzahl kaum, der Pro-Kopf-Preis
              aber sinkt mit jeder zusätzlichen Person.
            </p>
            <p>
              Der Tagessatz hängt von mehreren Faktoren ab – vom Vorbereitungs- und
              Individualisierungsaufwand, von der Modulanzahl, vom Ort (vor Ort mit Anreise oder
              remote) und von der Frage, ob es sich um einen einzelnen Tag oder ein mehrtägiges
              Programm handelt. Weil diese Faktoren stark variieren, nennen wir die verbindliche
              Zahl im individuellen Angebot statt einer pauschalen Listenpreis-Angabe, die in der
              Praxis ohnehin niemandem hilft. Als grobe Orientierung: Für eine geschlossene Gruppe
              ab acht Personen liegt der effektive Pro-Kopf-Preis in aller Regel spürbar unter dem
              Einzelplatzpreis eines offenen Seminars.
            </p>
            <p>
              Ein zusätzlicher Hebel, den viele übersehen: Wird die Schulung als längeres,
              mehrmoduliges Programm angelegt, kann sie unter Umständen über das
              Qualifizierungschancengesetz gefördert werden – bis zu 100 Prozent der
              Lehrgangskosten bei kleineren Betrieben. Die Details dazu stehen in unserem Beitrag{" "}
              <Link to="/wissen/copilot-schulung-foerderung-qcg-2026" className="underline">
                Copilot-Schulung über das Qualifizierungschancengesetz fördern lassen
              </Link>
              .
            </p>
            <p className="text-sm text-muted-foreground">
              Hinweis: Alle Preisangaben sind Orientierungswerte zum Zeitpunkt der
              Veröffentlichung und verstehen sich zzgl. USt. Verbindlich ist ausschließlich das
              individuelle Angebot.
            </p>
          </div>
        </section>

        {/* Sektion 5 — KUNDEN-CASES: NUR NACH FREIGABE NAMENTLICH */}
        <section id="cases" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Kunden-Cases aus der Praxis
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              {/* [Kunden-Case: anonymisiert oder mit Freigabe einfügen] */}
              [Kunden-Case 1: anonymisiert oder mit Freigabe einfügen] – Beispiel-Struktur:
              Ausgangslage (Branche, Teamgröße, Anlass) → gebuchtes Format (Module, Präsenz/Remote)
              → Ergebnis (was sich messbar verändert hat). Bis zur schriftlichen Freigabe des
              jeweiligen Kunden anonymisiert formulieren, z. B. „ein bundesweiter Lebensmittelhändler
              schulte rund 40 Mitarbeitende aus Vertrieb und Verwaltung in drei Modulen …".
            </p>
            <p>
              {/* [Kunden-Case: anonymisiert oder mit Freigabe einfügen] */}
              [Kunden-Case 2: anonymisiert oder mit Freigabe einfügen] – z. B. ein
              Dienstleistungsunternehmen, das eine rollengerechte Lernreise für Führungskräfte und
              Sachbearbeitung kombinierte.
            </p>
            <p>
              {/* [Kunden-Case: anonymisiert oder mit Freigabe einfügen] */}
              [Kunden-Case 3: anonymisiert oder mit Freigabe einfügen].
            </p>
            <p className="text-sm text-muted-foreground">
              (Redaktioneller Hinweis, vor Live-Schaltung entfernen: Namentliche Nennung von
              Referenzkunden wie REWE, Pernod Ricard, Lekkerland, Marriott, Med360Grad oder IHK
              Nord Westfalen NUR nach ausdrücklicher schriftlicher Freigabe. Ohne Freigabe
              anonymisiert bleiben.)
            </p>
          </div>
        </section>

        {/* Sektion 6 */}
        <section id="buchen" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            So buchen Sie Ihre Inhouse-Schulung
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Der Weg zur gebuchten Schulung ist bewusst schlank gehalten. Sie nehmen über das
              Kontaktformular oder telefonisch Kontakt auf und skizzieren kurz Team, Anlass und
              gewünschten Zeitrahmen. Im Erstgespräch klären wir Ziele, Teilnehmerkreis und
              Format und Sie erhalten anschließend ein transparentes Angebot. Nach Ihrer Freigabe
              stimmen wir die Inhalte final ab und legen den Termin fest – üblicher Vorlauf zwei
              bis vier Wochen, bei zeitkritischen Anlässen schneller.
            </p>
          </div>
        </section>

        {/* CTA */}
        <Card className="mb-8 border-primary/30 bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Inhouse-Schulung anfragen</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Sie möchten ein unverbindliches Angebot für Ihr Team? Sehen Sie sich unsere{" "}
              <Link to="/trainings/microsoft-365-copilot-praxis" className="underline">
                Copilot-Trainings
              </Link>{" "}
              an, vergleichen Sie{" "}
              <Link to="/wissen/copilot-lernreise-vs-tagesschulung" className="underline">
                Lernreise und Tagesschulung
              </Link>{" "}
              oder lesen Sie, wie eine{" "}
              <Link to="/wissen/copilot-unternehmensweit-einfuehren" className="underline">
                unternehmensweite Copilot-Einführung
              </Link>{" "}
              gelingt. Für den Anbietervergleich hilft unser{" "}
              <Link to="/wissen/copilot-schulungsanbieter-deutschland-vergleich" className="underline">
                Überblick der Copilot-Schulungsanbieter in Deutschland
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

        <AuthorBio author={martinLang} />
      </ContentLayout>
    </>
  );
};

export default CopilotInhouseSchulungBuchen;
```

---

## Vorbereiteter articles.ts-Block (an den ANFANG von ALL_ARTICLES)

```typescript
{
  id: "copilot-inhouse-schulung-buchen",
  title: "Microsoft Copilot Inhouse-Schulung buchen: Ablauf, Preise, Kunden-Cases",
  description: "Copilot Inhouse-Schulung buchen: Was Inhouse bedeutet, ab wann es sich lohnt (ab 8 Mitarbeitenden), Ablauf, transparente Preise und Kunden-Cases.",
  link: "/wissen/copilot-inhouse-schulung-buchen",
  badge: "Trainings & Buchung",
  icon: "▶",
  lastUpdated: "6. Juli 2026",
  publishDate: "2026-07-06",
  publishTime: "09:00"
},
```

## Interne Verlinkung (verifiziert vorhandene Slugs, Stand 06.07.2026)
- `/trainings/microsoft-365-copilot-praxis` (Trainings-CTA)
- `/wissen/warum-verteiltes-lernen-bei-copilot-trainings-funktioniert` ✅
- `/wissen/copilot-lernreise-vs-tagesschulung` ✅
- `/wissen/copilot-unternehmensweit-einfuehren` ✅
- `/wissen/copilot-schulungsanbieter-deutschland-vergleich` ✅
- `/wissen/copilot-schulung-foerderung-qcg-2026` (B3b — erst live setzen, wenn B3b deployt ist; sonst Link temporär entfernen)

## ⚠️ Vor Live-Schaltung zwingend
1. **Kunden-Cases (Sektion 5):** Platzhalter durch anonymisierte Fälle ODER freigegebene Namen ersetzen. Redaktionellen Hinweis-Absatz entfernen.
2. **Preis-Range (Sektion 4):** Zahlen mit Martin/Vertrieb bestätigen (Repo nennt nur „Inhouse-Konditionen auf Anfrage" + offenes Training „ab 1.495 €/Person").
3. **B3b-Querlink:** nur behalten, wenn B3b (`copilot-schulung-foerderung-qcg-2026`) ebenfalls live ist.

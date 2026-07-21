# B3b Hub-Artikel-Entwurf — Copilot-Schulung fördern lassen: Landesförderungen 2026

> **Status:** Entwurf zum Review (überarbeitet 21.07.2026, v3). NICHT deployen, bis Martin freigibt.
> **Zieldatei:** `src/pages/CopilotSchulungFoerderungQcg.tsx`
> **Slug:** `/wissen/copilot-schulung-foerderung-qcg-2026`
> **Autor:** Martin Lang
> **Ausrichtung (mit Martin abgestimmt):** KEIN neutraler Förder-Ratgeber. Fokus AUSSCHLIESSLICH auf Landesförderungen, die sich direkt für Copilotenschule-Trainings nutzen lassen — **ohne AZAV-/zertifizierten Träger**. Bundesprogramme (QCG § 82, Qualifizierungsgeld § 82a, Bildungsgutschein § 81) und die 120-Stunden-Thematik wurden ersatzlos gestrichen. AZAV-Hinweise auf ein Minimum reduziert, AZAV-FAQ entfernt.
>
> **Faktencheck (verifiziert 21.07.2026, Quellen unten). Entscheidendes Kriterium = Anbieter-Voraussetzung:**
> - **NRW – Bildungsscheck 2.0:** 50 %, max. **500 €**, 1×/Jahr. Wohnsitz NRW, zu verst. Einkommen ≤ 50.000 € (Ehepaare 100.000 €). **Keine Anbieter-Zertifizierung** — Teilnehmende beantragen selbst, wir liefern Rechnung + Teilnahmebestätigung. Aktiv seit 01.02.2026. → **direkt nutzbar** (offiziell: mags.nrw).
> - **Brandenburg – Bildungsscheck (Weiterbildungsrichtlinie 2026):** **60 %**, min. 500 €, **keine Obergrenze** mehr. Erstwohnsitz ODER Arbeitsort Brandenburg. **Keine Anbieter-Zertifizierung.** Anträge jederzeit bis 30.06.2027 an die ILB. → **direkt nutzbar** (offiziell: ilb.de, esf.brandenburg.de).
> - **Sachsen-Anhalt – WEITERBILDUNG (individueller Zugang):** **60–90 %** je Einkommen (90 % < 2.000 €/Monat brutto; 80 % < 3.000 € bzw. ab 45 J./Teilzeit u. a.; sonst 60 %), max. **25.000 €**/Maßnahme. Wohnsitz Sachsen-Anhalt, Einkommen ≤ 77.400 € brutto/Jahr (2026). **Keine allgemeine Anbieter-Zertifizierung** (nur Fernlehrgänge → ZFU). → **direkt nutzbar, großzügigstes Programm** (offiziell: ib-sachsen-anhalt.de, foerderdatenbank.de).
> - **Baden-Württemberg – Fachkurse (ESF Plus):** 30 % (Regel) / 70 % (ab 55 J. oder ohne Berufsabschluss); ab 01.09.2026 laut ESF-BW einheitlich **45 %** angekündigt (Übergang – vor Go-Live final prüfen). Wohn-/Arbeitsort BW. Keine AZAV/ISO nötig, ABER **der Anbieter selbst muss Antragsteller sein und ≥ 3 Jahre am Weiterbildungsmarkt** — nur nutzbar, wenn Copilotenschule diese Trägerrolle erfüllt (Alter der GmbH prüfen!). → **bedingt nutzbar** (offiziell: esf-bw.de).
> - **Mecklenburg-Vorpommern – Bildungsschecks (GSA):** 50 %, max. 3.000 €. Zugang über das Unternehmen. Keine Zertifizierung, aber betriebsvermittelt. → **bedingt nutzbar** (gsa-schwerin.de).
> - **Hamburg – Weiterbildungsbonus PLUS:** ~40–50 % (Angabe schwankt je Quelle — prüfen), max. 750–1.000 €. Zielgruppe eingeschränkt (v. a. Geringqualifizierte / max. Ausbildungsabschluss) — passt selten zu Copilot-Zielgruppen (Wissensarbeiter/Führungskräfte). Zertifizierung Standard, Einzelfallprüfung möglich. → **randständig** (weiterbildung-hamburg.de).
> - **Anbieter-Zertifizierung ZWINGEND (daher NICHT für uns nutzbar):** Rheinland-Pfalz QualiScheck (akkreditierter Träger: ISO 9001/AZAV/VHS-Hochschule), Schleswig-Holstein Weiterbildungsbonus (ISO 9001/AZAV), Bremen Weiterbildungsscheck (Bindung an gelistete Träger).
> - **Aktuell KEIN nutzbares individuelles Programm:** Sachsen (ausgesetzt, kein Budget 2025/26), Thüringen (pausiert, evtl. ab Herbst 2026), Niedersachsen (ausgelaufen), Hessen (Qualifizierungsscheck 2021 beendet), Bayern (Bildungsscheck 2021 beendet), Berlin (kein Kurskosten-Zuschuss).
> - Rechtsstand kann sich ändern; Länderprogramme werden pausiert/neu aufgelegt. Artikel enthält Rechtshinweis. Verbindliche Auskunft nur über die jeweilige Landesstelle.

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
const PAGE_TITLE = "Copilot-Schulung fördern lassen: Landesförderungen 2026 im Überblick";

const CopilotSchulungFoerderungQcg = () => {
  const martinLang = getAuthor("martin-lang")!;

  const ids = generateSchemaIds(SLUG, "wissen");
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const tableOfContents = [
    { id: "ueberblick", title: "Landesförderungen für Copilot-Trainings im Überblick", level: 2 },
    { id: "nrw", title: "Nordrhein-Westfalen: Bildungsscheck 2.0", level: 2 },
    { id: "brandenburg", title: "Brandenburg: Bildungsscheck", level: 2 },
    { id: "sachsen-anhalt", title: "Sachsen-Anhalt: WEITERBILDUNG individuell", level: 2 },
    { id: "weitere", title: "Weitere Länder: Baden-Württemberg, MV, Hamburg", level: 2 },
    { id: "copilotenschule", title: "So nutzen Sie die Förderung mit der Copilotenschule", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
  ];

  const faqs = [
    {
      name: "Wie kann ich eine Copilot-Weiterbildung bezuschussen lassen, ohne ein aufwändiges Förderverfahren zu durchlaufen?",
      answer: "Der unkomplizierteste Weg führt über die individuellen Landesförderungen. Programme wie der Bildungsscheck in NRW und Brandenburg oder die WEITERBILDUNG individuell in Sachsen-Anhalt bezuschussen berufsbezogene Weiterbildung direkt – die oder der Beschäftigte meldet die Weiterbildung online bei der Landesstelle an, nimmt teil und reicht danach Rechnung und Teilnahmebestätigung ein. Kein monatelanges Antragsverfahren, keine besondere Trägerzulassung. Da Copilot-Kompetenz eindeutig berufsbezogen ist, sind unsere Trainings über diese Schecks anrechenbar. Die Copilotenschule liefert die nötigen Unterlagen und sagt Ihnen, welches Landesprogramm zu Ihrem Standort passt."
    },
    {
      name: "Wir sitzen in einem bestimmten Bundesland – gibt es dort überhaupt eine passende Förderung?",
      answer: "Das hängt stark vom Bundesland ab, und die Programme ändern sich häufig. Besonders attraktiv sind aktuell Sachsen-Anhalt (bis zu 90 Prozent, maximal 25.000 Euro), Brandenburg (60 Prozent ohne Obergrenze) und Nordrhein-Westfalen (50 Prozent, bis 500 Euro). In Baden-Württemberg, Mecklenburg-Vorpommern und Hamburg gibt es Programme mit besonderen Bedingungen. Einige Länder haben ihre Förderung dagegen pausiert oder eingestellt. Nennen Sie uns Ihren Standort, dann prüfen wir mit Ihnen, welches Programm aktuell offen ist und ob Ihre Copilot-Qualifizierung dort hineinpasst."
    },
    {
      name: "Reicht ein einzelnes Copilot-Training für die Förderung, oder muss es ein umfangreiches Programm sein?",
      answer: "Über die individuellen Landesschecks ist auch ein einzelnes, berufsbezogenes Training förderfähig – Sie müssen also nicht erst ein monatelanges Großprogramm aufsetzen, um überhaupt eine Förderung zu bekommen. Das macht diese Programme so praktisch für Copilot-Schulungen: Ein gezieltes Praxistraining für ein Team oder eine Fachabteilung lässt sich direkt bezuschussen. Wenn Sie ohnehin breiter qualifizieren wollen, kombinieren wir die Trainings zu einem stimmigen Lernpfad – aber der Einstieg ist bewusst niedrigschwellig."
    },
    {
      name: "Wie überzeuge ich unsere Geschäftsführung, in Copilot-Schulungen zu investieren, wenn das Budget knapp ist?",
      answer: "Die Förderung verändert die Rechnung spürbar: Wenn ein Landesprogramm 50 bis 90 Prozent der Kurskosten übernimmt, sinkt die Netto-Investition oft auf einen Bruchteil – während der Produktivitätsgewinn durch kompetente Copilot-Nutzung voll beim Unternehmen bleibt. Genau diese Kombination aus geförderten Kosten und messbarem Nutzen ist das stärkste Argument gegenüber der Geschäftsführung. Die Copilotenschule hilft Ihnen, beides zu belegen: den passenden Förderweg und den erwartbaren Nutzen eines strukturierten Trainings."
    },
    {
      name: "Wie läuft die Beantragung praktisch ab, und was müssen wir dabei beachten?",
      answer: "In der Regel meldet die oder der Beschäftigte die Weiterbildung VOR Kursbeginn online bei der zuständigen Landesstelle bzw. Förderbank an – das ist der wichtigste Punkt, denn eine nachträgliche Förderung ist meist ausgeschlossen. Nach der Teilnahme werden Rechnung und Teilnahmebestätigung eingereicht, danach wird der Zuschuss ausgezahlt. Die maßnahmenbezogenen Unterlagen liefern wir passgenau. Sie kümmern sich um die Anmeldung im Landesportal, wir um alles rund um das Training – so bleibt der Aufwand gering."
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
          "Welche Landesförderungen 2026 Copilot- und KI-Weiterbildung direkt bezuschussen – ohne zertifizierten Träger: Bildungsscheck NRW 2.0, Bildungsscheck Brandenburg und WEITERBILDUNG individuell Sachsen-Anhalt (bis 90 %), plus Baden-Württemberg, MV und Hamburg. Förderhöhen, Bedingungen und praktische Nutzung.",
        "author": getAuthorSchemaMarkup(martinLang),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization",
        },
        "datePublished": "2026-07-06",
        "dateModified": "2026-07-21",
        "keywords": [
          "Copilot Schulung Förderung",
          "Landesförderung Weiterbildung 2026",
          "Bildungsscheck NRW 2.0",
          "Bildungsscheck Brandenburg",
          "WEITERBILDUNG individuell Sachsen-Anhalt",
          "Fachkurse Baden-Württemberg",
          "geförderte Microsoft-Copilot-Schulung",
          "KI-Weiterbildung Zuschuss Bundesländer",
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
        title="Copilot-Schulung fördern lassen 2026: Landesförderungen im Überblick | copilotenschule.de"
        description="Welche Landesförderungen 2026 Copilot- und KI-Weiterbildung direkt bezuschussen: Bildungsscheck NRW & Brandenburg, WEITERBILDUNG Sachsen-Anhalt (bis 90 %) u. a. Förderhöhen, Bedingungen und wie Sie sie für ein Copilotenschule-Training nutzen."
        keywords={[
          "Copilot Schulung Förderung",
          "Landesförderung Weiterbildung 2026",
          "Bildungsscheck NRW 2.0",
          "Bildungsscheck Brandenburg",
          "WEITERBILDUNG individuell Sachsen-Anhalt",
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
        description="Mehrere Bundesländer bezuschussen berufsbezogene Weiterbildung direkt – ohne besondere Trägerzulassung. Welche Programme sich 2026 für ein Copilot-Training nutzen lassen und wie viel sie übernehmen."
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
              Mehrere Bundesländer bezuschussen berufsbezogene Weiterbildung direkt – und weil
              Copilot-Kompetenz berufsbezogen ist, lassen sich unsere Trainings darüber fördern,
              <strong> ohne dass ein besonders zertifizierter Bildungsträger nötig ist</strong>. Am
              stärksten sind aktuell <strong>Sachsen-Anhalt</strong> (bis zu 90 Prozent, maximal
              25.000 Euro), <strong>Brandenburg</strong> (60 Prozent, keine Obergrenze mehr) und{" "}
              <strong>Nordrhein-Westfalen</strong> (50 Prozent, bis 500 Euro). In Baden-Württemberg,
              Mecklenburg-Vorpommern und Hamburg gelten besondere Bedingungen. Die oder der
              Beschäftigte meldet die Weiterbildung vor Kursbeginn bei der Landesstelle an; wir
              liefern Rechnung und Teilnahmebestätigung. Welches Programm für Ihren Standort offen
              ist, prüfen wir mit Ihnen.
            </p>
          </CardContent>
        </Card>

        {/* Einleitung */}
        <div className="prose prose-lg max-w-none dark:prose-invert mb-4">
          <p>
            Über Copilot-Schulungen wird meistens unter dem Gesichtspunkt Nutzen und Produktivität
            gesprochen, seltener unter dem der Finanzierung. Dabei fördern mehrere Bundesländer
            genau diese Art von Weiterbildung – schlank, individuell und ohne aufwändiges Verfahren.
            Der Clou: Diese Landesprogramme verlangen keine besondere Trägerzulassung, sondern nur,
            dass es sich um eine berufsbezogene Weiterbildung handelt. Ein Copilot-Training erfüllt
            das zweifelsfrei.
          </p>
          <p>
            Dieser Überblick zeigt, welche Länder 2026 wie viel übernehmen, für wen die Förderung
            gilt und wie Sie sie konkret für ein Training der Copilotenschule nutzen. Er konzentriert
            sich bewusst auf die Programme, die Sie unmittelbar einsetzen können – nicht auf jene, die
            an zusätzliche formale Hürden geknüpft sind.
          </p>
        </div>

        {/* Sektion 0: Überblickstabelle */}
        <section id="ueberblick" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Landesförderungen für Copilot-Trainings im Überblick
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Die folgende Tabelle listet die Landesförderungen, die sich für ein Copilot-Training
              der Copilotenschule eignen – mit Förderhöhe, Zielgruppe und dem Hinweis, ob das
              Programm direkt oder nur unter Bedingungen nutzbar ist.
            </p>
          </div>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-border text-left">
                  <th className="py-2 pr-4 font-semibold">Bundesland</th>
                  <th className="py-2 pr-4 font-semibold">Programm</th>
                  <th className="py-2 pr-4 font-semibold">Förderung</th>
                  <th className="py-2 pr-4 font-semibold">Für wen</th>
                  <th className="py-2 pr-4 font-semibold">Nutzbar</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border align-top">
                  <td className="py-2 pr-4 font-medium">Sachsen-Anhalt</td>
                  <td className="py-2 pr-4">WEITERBILDUNG (individueller Zugang)</td>
                  <td className="py-2 pr-4">60–90 %, max. 25.000 €</td>
                  <td className="py-2 pr-4">Beschäftigte mit Wohnsitz in S-A, Einkommen ≤ 77.400 €/Jahr</td>
                  <td className="py-2 pr-4 font-medium text-green-700 dark:text-green-400">direkt</td>
                </tr>
                <tr className="border-b border-border align-top">
                  <td className="py-2 pr-4 font-medium">Brandenburg</td>
                  <td className="py-2 pr-4">Bildungsscheck (Weiterbildungsrichtlinie 2026)</td>
                  <td className="py-2 pr-4">60 %, min. 500 €, keine Obergrenze</td>
                  <td className="py-2 pr-4">Wohnsitz oder Arbeitsort in Brandenburg</td>
                  <td className="py-2 pr-4 font-medium text-green-700 dark:text-green-400">direkt</td>
                </tr>
                <tr className="border-b border-border align-top">
                  <td className="py-2 pr-4 font-medium">Nordrhein-Westfalen</td>
                  <td className="py-2 pr-4">Bildungsscheck 2.0</td>
                  <td className="py-2 pr-4">50 %, max. 500 € (1×/Jahr)</td>
                  <td className="py-2 pr-4">Wohnsitz NRW, Einkommen ≤ 50.000 € (Ehepaare 100.000 €)</td>
                  <td className="py-2 pr-4 font-medium text-green-700 dark:text-green-400">direkt</td>
                </tr>
                <tr className="border-b border-border align-top">
                  <td className="py-2 pr-4 font-medium">Baden-Württemberg</td>
                  <td className="py-2 pr-4">Fachkurse (ESF Plus)</td>
                  <td className="py-2 pr-4">30 % / 70 %; ab 09/2026 einheitlich 45 %</td>
                  <td className="py-2 pr-4">Wohn-/Arbeitsort BW</td>
                  <td className="py-2 pr-4">bedingt<sup>1</sup></td>
                </tr>
                <tr className="border-b border-border align-top">
                  <td className="py-2 pr-4 font-medium">Mecklenburg-Vorpommern</td>
                  <td className="py-2 pr-4">Bildungsschecks</td>
                  <td className="py-2 pr-4">50 %, max. 3.000 €</td>
                  <td className="py-2 pr-4">Beschäftigte, Zugang über das Unternehmen</td>
                  <td className="py-2 pr-4">bedingt<sup>2</sup></td>
                </tr>
                <tr className="align-top">
                  <td className="py-2 pr-4 font-medium">Hamburg</td>
                  <td className="py-2 pr-4">Weiterbildungsbonus PLUS</td>
                  <td className="py-2 pr-4">bis ~50 %, max. 750–1.000 €</td>
                  <td className="py-2 pr-4">v. a. Geringqualifizierte, KMU ≤ 250</td>
                  <td className="py-2 pr-4">bedingt<sup>3</sup></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <p className="text-muted-foreground">
              <sup>1</sup> Baden-Württemberg: Der Zuschuss läuft über den Bildungsanbieter als
              Antragsteller, der seit mindestens drei Jahren am Markt sein muss.{" "}
              <sup>2</sup> Mecklenburg-Vorpommern: Antrag über das beschäftigende Unternehmen.{" "}
              <sup>3</sup> Hamburg: Zielgruppe vorwiegend gering qualifizierte Beschäftigte – passt
              nur eingeschränkt zu typischen Copilot-Zielgruppen. Nicht in dieser Übersicht: einige
              Länder (u. a. Rheinland-Pfalz, Schleswig-Holstein, Bremen) fördern nur über besonders
              zugelassene Träger; andere Programme sind derzeit pausiert oder ausgelaufen (u. a.
              Sachsen, Thüringen, Niedersachsen, Hessen, Bayern, Berlin). Stand: Juli 2026.
            </p>
          </div>
        </section>

        {/* Sektion 1: NRW */}
        <section id="nrw" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Nordrhein-Westfalen: Bildungsscheck 2.0
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Seit dem 1. Februar 2026 ist in NRW der Bildungsscheck 2.0 verfügbar, finanziert aus
              Landes- und ESF-Mitteln. Er übernimmt 50 Prozent der Weiterbildungsausgaben, maximal
              500 Euro, einmal pro Kalenderjahr. Anspruch haben Personen mit Wohnsitz in NRW und
              einem zu versteuernden Jahreseinkommen bis 50.000 Euro (bei zusammen veranlagten
              Ehepaaren 100.000 Euro).
            </p>
            <p>
              Der Ablauf ist schlank: Man meldet die Weiterbildung online im Landesportal an –
              spätestens einen Tag vor Kursbeginn –, nimmt teil und reicht danach Rechnung,
              Teilnahmebestätigung und Einkommensteuerbescheid ein. Eine besondere Trägerzulassung
              ist nicht erforderlich; es genügt, dass es sich um berufsbezogene Weiterbildung
              handelt. Damit sind Copilot-Trainings der Copilotenschule für NRW-Beschäftigte
              innerhalb der Einkommensgrenze direkt anrechenbar – ideal für einzelne Mitarbeitende
              oder kleine Teams.
            </p>
          </div>
        </section>

        {/* Sektion 2: Brandenburg */}
        <section id="brandenburg" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Brandenburg: Bildungsscheck
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Brandenburg hat seine Förderung Anfang 2026 mit der neuen Weiterbildungsrichtlinie
              deutlich verbessert. Der Bildungsscheck übernimmt 60 Prozent der zuwendungsfähigen
              Ausgaben, mindestens 500 Euro – und die frühere Obergrenze von 3.000 Euro ist
              ersatzlos weggefallen. Das macht Brandenburg gerade für umfangreichere
              Copilot-Qualifizierungen interessant.
            </p>
            <p>
              Antragsberechtigt sind Beschäftigte mit Erstwohnsitz in Brandenburg sowie – neu seit
              2026 – Personen, die in Brandenburg arbeiten, aber anderswo wohnen. Der Bildungsscheck
              ist ausdrücklich für individuelle, arbeitgeberunabhängige Weiterbildungsbedarfe
              gedacht; beantragt wird jederzeit bis zum 30. Juni 2027 bei der Investitionsbank des
              Landes Brandenburg. Eine gesonderte Trägerzulassung verlangt das Programm nicht, sodass
              unsere Trainings direkt genutzt werden können.
            </p>
          </div>
        </section>

        {/* Sektion 3: Sachsen-Anhalt */}
        <section id="sachsen-anhalt" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Sachsen-Anhalt: WEITERBILDUNG individuell
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Das großzügigste Programm im Vergleich kommt aus Sachsen-Anhalt. Die WEITERBILDUNG im
              individuellen Zugang bezuschusst berufsbezogene Weiterbildung mit 60 bis 90 Prozent der
              Kosten – gestaffelt nach Einkommen: 90 Prozent bei einem Bruttomonatseinkommen unter
              2.000 Euro, 80 Prozent unter 3.000 Euro oder für bestimmte Gruppen (etwa ab 45 Jahren,
              Teilzeit, Alleinerziehende), 60 Prozent für alle übrigen. Der Höchstbetrag liegt bei
              beachtlichen 25.000 Euro je Maßnahme.
            </p>
            <p>
              Antragsberechtigt sind Beschäftigte mit Wohnsitz in Sachsen-Anhalt bis zu einem
              Bruttojahreseinkommen von 77.400 Euro (2026). Eine allgemeine Trägerzertifizierung ist
              nicht nötig – nur reine Fernlehrgänge benötigen eine ZFU-Zulassung. Für Unternehmen in
              Sachsen-Anhalt, die breit in Copilot qualifizieren wollen, ist das der mit Abstand
              stärkste Hebel.
            </p>
          </div>
        </section>

        {/* Sektion 4: Weitere Länder */}
        <section id="weitere" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Weitere Länder: Baden-Württemberg, MV, Hamburg
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Drei weitere Länder fördern Copilot-Weiterbildung, allerdings mit besonderen
              Bedingungen. In <strong>Baden-Württemberg</strong> bezuschusst das Programm Fachkurse
              berufliche Weiterbildung – regulär mit 30 Prozent, für Ältere (ab 55) und Personen ohne
              Berufsabschluss mit 70 Prozent; ab September 2026 ist ein einheitlicher Satz von 45
              Prozent angekündigt. Hier läuft die Förderung nicht über die teilnehmende Person,
              sondern über den Bildungsanbieter, der den Zuschuss als Rabatt weitergibt und dafür
              seit mindestens drei Jahren am Weiterbildungsmarkt sein muss.
            </p>
            <p>
              In <strong>Mecklenburg-Vorpommern</strong> fördern Bildungsschecks bis zu 50 Prozent
              (maximal 3.000 Euro), wobei der Zugang über das beschäftigende Unternehmen läuft. In{" "}
              <strong>Hamburg</strong> existiert der Weiterbildungsbonus PLUS mit bis zu rund 50
              Prozent Zuschuss – dieser richtet sich allerdings vorrangig an gering qualifizierte
              Beschäftigte und passt damit nur eingeschränkt zu den typischen Zielgruppen einer
              Copilot-Schulung. Für alle drei Länder gilt: Wir prüfen die aktuellen Konditionen
              gemeinsam mit Ihnen, bevor Sie planen.
            </p>
          </div>
        </section>

        {/* Sektion 5: Copilotenschule */}
        <section id="copilotenschule" className="mb-4 mt-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            So nutzen Sie die Förderung mit der Copilotenschule
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Weil die individuellen Landesförderungen keine besondere Trägerzulassung verlangen,
              lassen sich unsere Copilot-Trainings direkt darüber bezuschussen. In der Praxis
              unterstützen wir an drei Stellen: Wir sagen Ihnen, welches Landesprogramm für Ihren
              Standort aktuell offen ist und zu Ihrer Situation passt. Wir gestalten das Training so,
              dass es klar als berufsbezogene Weiterbildung dokumentiert ist. Und wir liefern die
              maßnahmenbezogenen Unterlagen – Rechnung, Teilnahmebestätigung, bei Bedarf eine
              Inhaltsbeschreibung –, die Sie für die Abrechnung mit der Landesstelle brauchen.
            </p>
            <p>
              Ob als einzelnes Praxistraining für ein Team oder als gestufter Lernpfad für die
              gesamte Belegschaft: Der Einstieg bleibt niedrigschwellig, und ein erheblicher Teil der
              Kosten wandert auf die Förderung. Die Bewilligung im Einzelfall entscheidet immer die
              zuständige Landesstelle – aber wir sorgen dafür, dass Ihr Training die Voraussetzungen
              sauber erfüllt.
            </p>
          </div>
        </section>

        {/* CTA */}
        <Card className="mb-8 border-primary/30 bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">
              Geförderte Copilot-Schulung planen
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Sie möchten wissen, welche Landesförderung sich für Ihre Copilot-Qualifizierung nutzen
              lässt? Nennen Sie uns Ihren Standort – wir prüfen das passende Programm und strukturieren
              ein förderfähiges Training. Sehen Sie sich unsere{" "}
              <Link to="/trainings/microsoft-365-copilot-praxis" className="underline">
                Copilot-Trainings
              </Link>{" "}
              an oder erfahren Sie, warum eine{" "}
              <Link to="/wissen/copilot-lernreise-vs-tagesschulung" className="underline">
                Lernreise mehr bewirkt als eine Tagesschulung
              </Link>
              . Den Rahmen zur Einführung liefert unser{" "}
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
            <strong>Rechtshinweis:</strong> Dieser Beitrag gibt den Förderstand zum Zeitpunkt der
            Veröffentlichung (Juli 2026) wieder und dient der allgemeinen Information. Er stellt keine
            Förder- oder Rechtsberatung dar. Förderhöhen, Einkommensgrenzen und Voraussetzungen können
            sich ändern; einzelne Länderprogramme werden pausiert oder neu aufgelegt. Eine verbindliche
            Auskunft erteilt ausschließlich die zuständige Landesstelle bzw. Förderbank.
          </p>
        </div>

        {/* Quellen */}
        <div className="prose prose-sm max-w-none dark:prose-invert mb-8">
          <h3 className="font-semibold">Quellen</h3>
          <ul>
            <li>Ministerium für Arbeit, Gesundheit und Soziales NRW – Bildungsscheck 2.0 (mags.nrw/bildungsscheck)</li>
            <li>Investitionsbank des Landes Brandenburg (ILB) / ESF Brandenburg – Weiterbildungsrichtlinie 2026, Bildungsscheck (ilb.de, esf.brandenburg.de)</li>
            <li>Investitionsbank Sachsen-Anhalt – Sachsen-Anhalt WEITERBILDUNG (individueller Zugang) (ib-sachsen-anhalt.de); foerderdatenbank.de</li>
            <li>ESF Baden-Württemberg – Förderprogramm Fachkurse (esf-bw.de)</li>
            <li>Gesellschaft für Struktur- und Arbeitsmarktentwicklung MV – Bildungsschecks (gsa-schwerin.de)</li>
            <li>W.H.S.B. Weiterbildung Hamburg – Weiterbildungsbonus PLUS (weiterbildung-hamburg.de)</li>
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
  title: "Copilot-Schulung fördern lassen: Landesförderungen 2026 im Überblick",
  description: "Welche Bundesländer Copilot- und KI-Weiterbildung direkt bezuschussen – ohne zertifizierten Träger: Bildungsscheck NRW & Brandenburg, WEITERBILDUNG Sachsen-Anhalt (bis 90 %) u. a.",
  link: "/wissen/copilot-schulung-foerderung-qcg-2026",
  badge: "Förderung & Finanzierung",
  icon: "€",
  lastUpdated: "21. Juli 2026",
  publishDate: "2026-07-06",
  publishTime: "09:00"
},
```

## Interne Verlinkung (verifiziert vorhandene Slugs, Stand 21.07.2026)
- `/trainings/microsoft-365-copilot-praxis` ✅ (Trainings-CTA, im Code verwendet)
- `/wissen/copilot-lernreise-vs-tagesschulung` ✅
- `/wissen/copilot-im-unternehmen-einfuehren-leitfaden` ✅
- Optional zusätzlich: `/wissen/ki-schulung-mitarbeiter-pflicht` (Protected Page – nur additiv verlinken)

## Offene Punkte für Martin (vor Deployment entscheiden / prüfen)
1. **Slug** heißt weiterhin `copilot-schulung-foerderung-qcg-2026`, obwohl QCG jetzt gar nicht mehr Thema ist. Sauberer wäre `copilot-schulung-landesfoerderung` o. Ä. Umbenennen = Datei + articles.ts + App.tsx + sitemap + react-snap. Sag Bescheid.
2. **Baden-Württemberg:** Ist die Copilotenschule GmbH **≥ 3 Jahre** am Markt und bereit, als Antragsteller/Träger im Fachkurse-Programm aufzutreten? Nur dann stimmt „bedingt nutzbar". Sonst BW aus der Tabelle nehmen.
3. **Zahlen mit Rest-Unsicherheit vor Go-Live final gegenchecken:** Hamburg-Fördersatz (40 % vs. 50 %), BW-Übergang auf 45 % ab 09/2026. NRW/Brandenburg/Sachsen-Anhalt sind offiziell verifiziert.
4. **Hamburg** überhaupt aufnehmen? Zielgruppe (Geringqualifizierte) passt kaum zu euren Kunden – ggf. streichen.
5. **DACH:** Aktuell nur Deutschland. Österreich/Schweiz bewusst außen vor (wie besprochen).

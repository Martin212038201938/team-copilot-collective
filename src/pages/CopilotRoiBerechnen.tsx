import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import AuthorBio from "@/components/AuthorBio";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";
import { Link } from "react-router-dom";
import RoiGeneratorTeaserBanner from "@/components/roi-generator/RoiGeneratorTeaserBanner";
import RoiBusinessCaseGenerator from "@/components/roi-generator/RoiBusinessCaseGenerator";

const SLUG = "copilot-roi-berechnen";
const PAGE_TITLE = "Copilot ROI berechnen";

const CopilotRoiBerechnen = () => {
  const martinLang = getAuthor("martin-lang")!;

  const ids = generateSchemaIds(SLUG, 'wissen');
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const tableOfContents = [
    { id: "was-kostet-copilot", title: "Was kostet Microsoft Copilot?", level: 2 },
    { id: "roi-formel", title: "ROI-Berechnung: Die Formel", level: 2 },
    { id: "produktivitaetsgewinne", title: "Messbare Produktivitätsgewinne", level: 2 },
    { id: "studienlage", title: "Was aktuelle Studien zeigen", level: 2 },
    { id: "kpis", title: "KPIs zur Erfolgsmessung", level: 2 },
    { id: "szenarien", title: "Zwei plausible ROI-Szenarien", level: 2 },
    { id: "business-case-generator", title: "PowerPoint-Business-Case erstellen", level: 2 },
    { id: "branchen-roi", title: "Branchenspezifische ROI-Beispiele", level: 2 },
    { id: "erfolgsfaktoren", title: "Kritische Erfolgsfaktoren", level: 2 },
    { id: "fehler", title: "Häufige Fehler bei der ROI-Berechnung", level: 2 },
    { id: "best-practices", title: "ROI steigern: Best Practices", level: 2 },
    { id: "download", title: "Download: ROI-Rechner Excel", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
    { id: "quellen", title: "Quellen und Links", level: 2 }
  ];

  const faqs = [
    {
      name: "Wie überzeuge ich das Management, in Microsoft Copilot zu investieren?",
      answer: "Mit einem fundierten Business Case: Berechnen Sie konkrete Zeiteinsparungen pro Mitarbeiter, multiplizieren Sie mit Stundensätzen und stellen Sie diese den Lizenzkosten (26 €/Monat zzgl. MwSt.) gegenüber. Wichtig: Planen Sie Budget für Schulungen und Change Management ein – ohne begleitende Maßnahmen bleiben die Produktivitätsgewinne weit hinter den Erwartungen zurück. Die Copilotenschule bietet ROI-Rechner, Business-Case-Templates und praxisnahe Schulungsprogramme."
    },
    {
      name: "Wie berechne ich den ROI von Microsoft Copilot für unser Unternehmen realistisch?",
      answer: "Der ROI ergibt sich aus: (Zeitersparnis × Stundensatz × Nutzerzahl) - Lizenzkosten - Implementierungskosten. Aktuelle Untersuchungen liegen je nach Methodik bei rund 6,9 bis 9,4 Stunden Zeitersparnis pro Nutzer und Monat. Für eine realistische Planung setzen wir 8 Stunden als Zielwert an und rechnen wirtschaftlich vorsichtig nur mit 50% des rechnerischen Kapazitätswerts. Die Copilotenschule unterstützt Sie mit Excel-Vorlagen, Benchmarks und begleitenden Schulungsprogrammen."
    },
    {
      name: "Wann amortisiert sich die Copilot-Investition typischerweise?",
      answer: "Der Break-even hängt vor allem von Nutzerzahl, Stundensatz, Lizenzkosten, Einführungsaufwand und erreichter Zeitersparnis ab. Deshalb sollte er aus den konkreten Unternehmensdaten berechnet und über mindestens drei Jahre verfolgt werden. Die Copilotenschule hilft Ihnen, ein realistisches und ein studiennahes Szenario aufzubauen und die Lernkurve durch gezielte Schulung zu beschleunigen."
    },
    {
      name: "Welche KPIs sollten wir für die Copilot-Erfolgsmessung definieren?",
      answer: "Messen Sie quantitativ: Nutzungsrate, Time-to-Completion bei Standardtasks, Dokumentenerstellungszeit. Qualitativ: Mitarbeiterzufriedenheit, Dokumentenqualität, Innovationsrate. Die Copilotenschule entwickelt mit Ihnen ein KPI-Framework und unterstützt beim Aufbau eines Adoption-Dashboards."
    },
    {
      name: "Wie argumentiere ich gegenüber dem CFO, wenn die Zeitersparnis pro Mitarbeiter nur 14 Minuten am Tag beträgt?",
      answer: "14 Minuten klingen wenig – aber rechnen Sie es hoch: Bei 300 Mitarbeitern sind das 70 Stunden pro Tag oder knapp 9 Vollzeitstellen. Hinzu kommt der Qualitätseffekt, der sich in Zahlen schwerer fassen lässt: schnellere Reaktionszeiten, bessere Dokumentenqualität, kürzere Einarbeitungszeiten. Die Copilotenschule unterstützt Sie beim Aufbau eines Business Case, der beide Dimensionen – Zeitersparnis und Qualitätsverbesserung – überzeugend darstellt."
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": ids.article,
        "headline": "Copilot ROI berechnen: Lohnt sich die Investition?",
        "description": "Konkrete Methoden zur ROI-Berechnung von Microsoft Copilot. Mit Excel-Vorlage, Praxisbeispielen und messbaren KPIs für Ihr Business Case.",
        "author": getAuthorSchemaMarkup(martinLang),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization"
        },
        "datePublished": "2025-11-07",
        "dateModified": "2026-07-27",
        "keywords": ["Copilot ROI","Microsoft Copilot ROI berechnen","Copilot Business Case","Copilot Kosten Nutzen","Return on Investment Copilot","Copilot Produktivitätssteigerung"],
        "articleSection": "Business",
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
        title="Copilot ROI berechnen: Lohnt sich die Investition?"
        description="Konkrete Methoden zur ROI-Berechnung von Microsoft Copilot. Mit Excel-Vorlage, Praxisbeispielen und messbaren KPIs für Ihr Business Case."
        keywords={["Copilot ROI","Microsoft Copilot ROI berechnen","Copilot Business Case","Copilot Kosten Nutzen","Return on Investment Copilot","Copilot Produktivitätssteigerung"]}
        canonicalUrl={pageUrl}
        schema={schema}
        publishedTime="2025-11-07"
        modifiedTime="2026-07-27"
        author={martinLang}
      />
      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "Copilot ROI berechnen", href: "/wissen/copilot-roi-berechnen" }
        ]}
        title="Copilot ROI berechnen: Lohnt sich die Investition?"
        description="Konkrete Methoden zur ROI-Berechnung von Microsoft Copilot. Mit Excel-Vorlage, Praxisbeispielen und messbaren KPIs für Ihr Business Case."
        authorName="Martin Lang"
        tableOfContents={tableOfContents}
        lastUpdated="27. Juli 2026"
        relatedContent={["wissen:copilot-roi-erfolgsgeschichten", "wissen:copilot-adoption-2026-zahlen", "wissen:ki-realitaet-beratungsfirmen-2026", "workshop:copilot-strategie-change-management", "wissen:copilot-unternehmensweit-einfuehren"]}
      >
        {/* Schnellantwort-Card */}
        <Card className="border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-amber-500/5">
          <CardHeader>
            <CardTitle>
              Schnellantwort
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base leading-relaxed">
              Aktuelle Untersuchungen verorten die Zeitersparnis durch Microsoft 365 Copilot je nach Methodik bei ungefähr <strong>6,9 bis 9,4 Stunden pro Nutzer und Monat</strong>.
              Für einen belastbaren Business Case rechnen wir mit einem realistischen Zielwert von <strong>8 Stunden</strong> und setzen davon nur 50% als wirtschaftlich realisierbaren Kapazitätswert an.
              Gezielte Schulung und konsequentes <Link to="/workshops/copilot-strategie-change-management" className="text-primary hover:underline">Change Management</Link> sind nötig, damit aus technischem Zugang tatsächlich nutzbare Kompetenz entsteht.
              Echte <Link to="/wissen/copilot-roi-erfolgsgeschichten" className="text-primary hover:underline">Erfolgsgeschichten</Link> zeigen,
              wie Unternehmen diese Zahlen konkret erreicht haben. Diese Seite liefert Ihnen die Formeln, zwei nachvollziehbare Szenarien und eine <strong>kostenlose Excel-Vorlage</strong> für Ihren Business Case.
            </p>
          </CardContent>
        </Card>

        <RoiGeneratorTeaserBanner />

        {/* Kosten */}
        <section id="was-kostet-copilot">
          <h2 id="was-kostet-copilot-heading" className="text-2xl md:text-3xl font-bold mb-3">
            Was kostet Microsoft Copilot?
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="text-lg">Microsoft 365 Copilot</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-blue-600 mb-2">€26</p>
                <p className="text-sm text-muted-foreground mb-4">pro Benutzer/Monat (zzgl. MwSt.)</p>
                <ul className="text-sm space-y-2">
                  <li>• Zusätzlich zu M365 Lizenz</li>
                  <li>• Keine Mindestabnahme</li>
                  <li>• Jährliche Abrechnung</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader>
                <CardTitle className="text-lg">GitHub Copilot</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-purple-600 mb-2">$19</p>
                <p className="text-sm text-muted-foreground mb-4">pro Benutzer/Monat (Business)</p>
                <ul className="text-sm space-y-2">
                  <li>• Individual: $10/Monat</li>
                  <li>• Business: $19/Monat</li>
                  <li>• Enterprise: $39/Monat</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="text-lg">Copilot Studio</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600 mb-2">€26</p>
                <p className="text-sm text-muted-foreground mb-4">pro Nutzer/Monat (zzgl. MwSt.)</p>
                <ul className="text-sm space-y-2">
                  <li>• oder €173,30 für 25.000 Credits</li>
                  <li>• Custom Agents erstellen</li>
                  <li>• Enterprise-Integration</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8 border-amber-500/30 bg-amber-50 dark:bg-amber-950/20">
            <CardHeader>
              <CardTitle className="text-amber-700 dark:text-amber-400">
                Versteckte Kosten einkalkulieren
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p><strong>Change &amp; Adoption:</strong> im Rechner 12% der jährlichen Basis aus Lizenzen, Training und IT-Setup</p>
                  <p><strong>Training &amp; Schulung:</strong> €5.000 je Gruppe im gängigen Modell – bei 12 Teilnehmenden €416,67 pro Platz</p>
                </div>
                <div className="space-y-2">
                  <p><strong>IT-Setup &amp; Einführung:</strong> einmaliger Grundaufwand plus degressive Größenstaffel je Nutzer</p>
                  <p><strong>Weiterbildung:</strong> in Jahr 2 und 3 jeweils 50% des Trainingsbudgets aus Jahr 1</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Die IT-Staffel im Rechner beginnt mit €2.500 Grundaufwand. Hinzu kommen €150 je Nutzer 1–50,
                €75 je Nutzer 51–250, €40 je Nutzer 251–1.000 und €20 je weiterem Nutzer. So steigt der
                Gesamtaufwand mit der Größe, während die Kosten pro Nutzer durch Skaleneffekte sinken.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* ROI Formel */}
        <section id="roi-formel">
          <h2 id="roi-formel-heading" className="text-2xl md:text-3xl font-bold mb-3">
            ROI-Berechnung: Die Formel
          </h2>

          <Card className="bg-gray-900 text-gray-100 border-0">
            <CardContent className="p-8">
              <div className="text-center">
                <p className="text-sm text-gray-400 mb-2">Grundformel</p>
                <p className="text-2xl md:text-3xl font-mono font-bold">
                  ROI = (Nutzen - Kosten) / Kosten × 100%
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6 border-green-500/40 bg-green-50 dark:bg-green-950/20">
            <CardHeader>
              <CardTitle className="text-lg text-green-700 dark:text-green-400">
                Wann ist ein ROI positiv oder negativ?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p><strong>ROI größer als 0%:</strong> Der Nutzen ist höher als die gesamten Kosten. Die Investition hat sich im betrachteten Zeitraum amortisiert und erzeugt einen Netto-Nutzen. Ein ROI von 69% bedeutet beispielsweise: Nach Abzug aller Kosten bleiben 69 Cent Netto-Nutzen je investiertem Euro.</p>
                <p><strong>ROI gleich 0%:</strong> Nutzen und Kosten sind gleich hoch. Das ist der Break-even – es entsteht weder ein Gewinn noch ein Verlust.</p>
                <p><strong>ROI kleiner als 0%:</strong> Der Nutzen reicht noch nicht aus, um die gesamten Kosten zu decken. Die Investition ist im betrachteten Zeitraum defizitär. Ein ROI von −20% bedeutet beispielsweise: Von jedem investierten Euro wurden erst 80 Cent durch Nutzen zurückgewonnen.</p>
                <p><strong>ROI von 100%:</strong> Der Netto-Nutzen entspricht zusätzlich der gesamten Investition. Der gesamte Nutzen beträgt damit das Doppelte der Kosten. 100% ist also nicht die Gewinnschwelle – die liegt bereits bei 0%.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>
                Beispielrechnung: 300 Mitarbeiter
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Kosten – identisch für beide Szenarien */}
              <div className="mb-6">
                <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-4">Kosten (Jahr 1) – identisch für beide Prognosen</h4>
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b"><td className="py-2">Lizenzen (300 × €26 × 12)</td><td className="text-right">€93.600</td></tr>
                    <tr className="border-b"><td className="py-2">Training (25 Gruppen × €5.000)</td><td className="text-right">€125.000</td></tr>
                    <tr className="border-b"><td className="py-2">IT-Setup nach Größenstaffel</td><td className="text-right">€27.000</td></tr>
                    <tr className="border-b"><td className="py-2">Change &amp; Adoption (12% der Basis)</td><td className="text-right">€29.472</td></tr>
                    <tr className="font-bold"><td className="py-2">Gesamt (zzgl. MwSt.)</td><td className="text-right">€275.072</td></tr>
                  </tbody>
                </table>
              </div>

              {/* Zwei Prognosen nebeneinander */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="border-2 border-blue-500/30 rounded-lg p-4">
                  <h4 className="font-bold text-blue-600 mb-1">Studiennah</h4>
                  <p className="text-xs text-muted-foreground mb-4">9 Stunden Zielwert; durch Lernkurve Ø 7,99 Stunden im ersten Jahr</p>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b"><td className="py-2">Rechnerischer Kapazitätswert</td><td className="text-right">€1.438.513</td></tr>
                      <tr className="border-b"><td className="py-2">Wirtschaftlich realisierbar</td><td className="text-right">50%</td></tr>
                      <tr className="font-bold"><td className="py-2">Angesetzter Nutzen</td><td className="text-right text-blue-600">€719.257</td></tr>
                    </tbody>
                  </table>
                  <div className="mt-4 p-4 bg-green-50 dark:bg-green-950/20 border border-green-500/30 rounded-lg text-center">
                    <p className="text-xs font-semibold text-green-700 dark:text-green-400 mb-1">Positiver ROI</p>
                    <p className="text-3xl font-bold text-green-600">161%</p>
                  </div>
                </div>

                <div className="border-2 border-orange-500/30 rounded-lg p-4 bg-orange-500/5">
                  <h4 className="font-bold text-orange-600 mb-1">Realistisch</h4>
                  <p className="text-xs text-muted-foreground mb-4">8 Stunden Zielwert; durch Lernkurve Ø 7,10 Stunden im ersten Jahr</p>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b"><td className="py-2">Rechnerischer Kapazitätswert</td><td className="text-right">€1.278.678</td></tr>
                      <tr className="border-b"><td className="py-2">Wirtschaftlich realisierbar</td><td className="text-right">50%</td></tr>
                      <tr className="font-bold"><td className="py-2">Angesetzter Nutzen</td><td className="text-right text-orange-600">€639.339</td></tr>
                    </tbody>
                  </table>
                  <div className="mt-4 p-4 bg-green-50 dark:bg-green-950/20 border border-green-500/30 rounded-lg text-center">
                    <p className="text-xs font-semibold text-green-700 dark:text-green-400 mb-1">Positiver ROI</p>
                    <p className="text-3xl font-bold text-green-600">132%</p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-4 text-center">
                Annahmen wie im Excel-Rechner: €50 Vollkosten-Stundensatz, alle 300 geschulten Personen, monatliche Lernkurve
                mit 60% des Zielwerts zum Start und zwei Monaten Halbwertszeit. Nur 50% des rechnerischen Kapazitätswerts
                werden wirtschaftlich angesetzt. Qualitätsgewinne, Fehlerreduktion und agentische Tätigkeiten sind nicht eingerechnet.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>
                Zweites Beispiel: 50 Mitarbeiter
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-4">Kosten im ersten Jahr</h4>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b"><td className="py-2">Lizenzen (50 × €26 × 12)</td><td className="text-right">€15.600</td></tr>
                      <tr className="border-b"><td className="py-2">Training (5 Gruppen × €5.000)</td><td className="text-right">€25.000</td></tr>
                      <tr className="border-b"><td className="py-2">IT-Setup nach Größenstaffel</td><td className="text-right">€10.000</td></tr>
                      <tr className="border-b"><td className="py-2">Change &amp; Adoption (12% der Basis)</td><td className="text-right">€6.072</td></tr>
                      <tr className="font-bold"><td className="py-2">Gesamtkosten</td><td className="text-right">€56.672</td></tr>
                    </tbody>
                  </table>
                </div>

                <div>
                  <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-4">Ergebnis im ersten Jahr</h4>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="py-2 text-left">Szenario</th>
                        <th className="py-2 text-right">Nutzen</th>
                        <th className="py-2 text-right">ROI</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 font-semibold text-orange-600">Realistisch</td>
                        <td className="py-2 text-right">€106.557</td>
                        <td className="py-2 text-right font-bold text-green-600">88%</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold text-blue-600">Studiennah</td>
                        <td className="py-2 text-right">€119.876</td>
                        <td className="py-2 text-right font-bold text-green-600">112%</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="text-xs text-muted-foreground mt-4">
                    Das Trainingsbudget beträgt €500 pro Person, weil für 50 Personen fünf volle Gruppen kalkuliert werden.
                    Der geringere ROI gegenüber 300 Nutzern entsteht vor allem durch den höheren IT-Grundaufwand pro Person.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Produktivitätsgewinne */}
        <section id="produktivitaetsgewinne">
          <h2 id="produktivitaetsgewinne-heading" className="text-2xl md:text-3xl font-bold mb-3">
            Messbare Produktivitätsgewinne
          </h2>

          {/* Hervorgehobene Studienergebnisse – dual */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-2 border-blue-500/30 bg-gradient-to-br from-blue-500/5 to-cyan-500/5">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-xs font-semibold text-blue-600 mb-1 uppercase tracking-wider">Studiennahes Szenario</p>
                  <p className="text-5xl font-bold text-blue-600 mb-2">9h</p>
                  <p className="text-lg font-semibold mb-1">Zeitersparnis pro Monat</p>
                  <p className="text-sm text-muted-foreground">pro aktivem Nutzer (≈ 5,2% bei 40h/Woche)</p>
                  <p className="text-xs text-muted-foreground mt-3 border-t pt-3">Quelle: Forrester TEI Study</p>
                </div>
                <div className="mt-4 p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg text-center">
                  <p className="text-xs font-semibold text-orange-600 uppercase tracking-wider">Realistisches Szenario</p>
                  <p className="text-2xl font-bold text-orange-600">8h</p>
                  <p className="text-xs text-muted-foreground">Zielwert bei strukturierter Lernreise und Workflow-Anpassung</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-500/30 bg-gradient-to-br from-green-500/5 to-emerald-500/5">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-xs font-semibold text-green-600 mb-1 uppercase tracking-wider">Microsoft-Prognose</p>
                  <p className="text-5xl font-bold text-green-600 mb-2">77%</p>
                  <p className="text-lg font-semibold mb-1">berichten höhere Produktivität</p>
                  <p className="text-sm text-muted-foreground">bei trainierten Copilot-Nutzern</p>
                  <p className="text-xs text-muted-foreground mt-3 border-t pt-3">Quelle: Microsoft Work Trend Index</p>
                </div>
                <div className="mt-4 p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg text-center">
                  <p className="text-xs font-semibold text-orange-600 uppercase tracking-wider">Unsere Einschätzung</p>
                  <p className="text-2xl font-bold text-orange-600">~40%</p>
                  <p className="text-xs text-muted-foreground">Voraussetzung: gezielte Schulungen und begleitendes Change Management</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <p className="text-sm text-muted-foreground mb-8">
            <strong>Warum liegt das realistische Szenario nur knapp unter dem Studienwert?</strong> Neuere Untersuchungen mit großen Nutzergruppen
            bestätigen eine Größenordnung nahe acht bis neun Stunden pro Monat. Vorsicht entsteht im Business Case nicht durch eine künstlich
            niedrige Zeitersparnis, sondern dadurch, dass nur 50% des rechnerischen Kapazitätswerts als wirtschaftlich realisierbar angesetzt werden.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">GitHub Copilot (Studien)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center">
                      <span>Task-Completion</span>
                      <span className="text-2xl font-bold text-purple-600">55% schneller</span>
                    </div>
                    <p className="text-xs text-orange-600 text-right">Unsere Einschätzung: ~28%</p>
                  </div>
                  <div>
                    <div className="flex justify-between items-center">
                      <span>Produktivität (selbstberichtet)</span>
                      <span className="text-2xl font-bold text-purple-600">88% höher</span>
                    </div>
                    <p className="text-xs text-orange-600 text-right">Unsere Einschätzung: ~44%</p>
                  </div>
                  <div>
                    <div className="flex justify-between items-center">
                      <span>Code schreiben</span>
                      <span className="text-2xl font-bold text-purple-600">46% schneller</span>
                    </div>
                    <p className="text-xs text-orange-600 text-right">Unsere Einschätzung: ~23%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Microsoft 365 Copilot (Studien)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center">
                      <span>Dokumentenerstellung</span>
                      <span className="text-2xl font-bold text-blue-600">29% schneller</span>
                    </div>
                    <p className="text-xs text-orange-600 text-right">Unsere Einschätzung: ~15%</p>
                  </div>
                  <div>
                    <div className="flex justify-between items-center">
                      <span>E-Mail-Bearbeitung</span>
                      <span className="text-2xl font-bold text-blue-600">24% schneller</span>
                    </div>
                    <p className="text-xs text-orange-600 text-right">Unsere Einschätzung: ~12%</p>
                  </div>
                  <div>
                    <div className="flex justify-between items-center">
                      <span>Informationssuche</span>
                      <span className="text-2xl font-bold text-blue-600">22% schneller</span>
                    </div>
                    <p className="text-xs text-orange-600 text-right">Unsere Einschätzung: ~11%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <Card className="border-l-4 border-l-purple-500">
              <CardHeader>
                <CardTitle className="text-base">Praxisbeispiel: 50 Entwickler</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">GitHub Copilot Business: $19/Monat × 50 = <strong>$950/Monat ($11.400/Jahr)</strong></p>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                    <p className="text-xs font-semibold text-blue-600 mb-1">Microsoft-Prognose</p>
                    <p className="text-xs">30 Min/Tag × 220 Tage = 5.500h</p>
                    <p className="text-xs">Bei €80/h = €440.000</p>
                    <p className="font-bold text-green-700 dark:text-green-400 mt-1">ROI: 3.760%</p>
                  </div>
                  <div className="p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg">
                    <p className="text-xs font-semibold text-orange-600 mb-1">Unsere Einschätzung</p>
                    <p className="text-xs">15 Min/Tag × 220 Tage = 2.750h</p>
                    <p className="text-xs">Bei €80/h = €220.000</p>
                    <p className="font-bold text-green-700 dark:text-green-400 mt-1">ROI: 1.830%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="text-base">Praxisbeispiel: 300 Knowledge Worker</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-2"><strong>Kosten Jahr 1:</strong></p>
                <p className="text-sm mb-1">Lizenzen: €26/Monat × 300 × 12 = €93.600</p>
                <p className="text-sm mb-4">Training: €1.000 × 300 = €300.000 → <strong>Gesamt: €393.600</strong></p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                    <p className="text-xs font-semibold text-blue-600 mb-1">Studiennah</p>
                    <p className="text-xs">9h/Monat ergeben €1.620.000 Kapazitätswert</p>
                    <p className="text-xs">Davon 50% angesetzt: €810.000</p>
                    <p className="font-bold text-green-700 dark:text-green-400 mt-1">ROI: 106%</p>
                  </div>
                  <div className="p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg">
                    <p className="text-xs font-semibold text-orange-600 mb-1">Realistisch</p>
                    <p className="text-xs">8h/Monat ergeben €1.440.000 Kapazitätswert</p>
                    <p className="text-xs">Davon 50% angesetzt: €720.000</p>
                    <p className="font-bold text-green-700 dark:text-green-400 mt-1">ROI: 83%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Aktuelle Studienlage */}
        <section id="studienlage">
          <h2 id="studienlage-heading" className="text-2xl md:text-3xl font-bold mb-3">
            Was aktuelle Studien zur Zeitersparnis zeigen
          </h2>

          <p className="text-muted-foreground mb-6">
            Die neueren Untersuchungen liefern keinen universellen Wert für jedes Unternehmen. Sie grenzen aber eine belastbare
            Größenordnung ein: Bei regelmäßiger Nutzung von Microsoft 365 Copilot als persönlichem Arbeitsassistenten liegen die
            beobachteten oder berichteten Einsparungen überwiegend nahe sieben bis neun Stunden pro Monat.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-t-4 border-t-blue-500">
              <CardHeader>
                <CardTitle className="text-lg">DWP-Evaluation 2026</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-blue-600 mb-2">19 Min./Tag</p>
                <p className="text-sm text-muted-foreground mb-3">
                  Rund 6,9 Stunden pro Monat. Die Evaluation umfasste 3.549 Beschäftigte und arbeitete mit einer Vergleichsgruppe
                  und Regressionsanalysen. Die Zeitangaben waren dennoch selbstberichtet; außerdem gab es keine zufällige Zuteilung
                  und keine Messung vor Beginn des Versuchs.
                </p>
                <a
                  href="https://www.gov.uk/government/publications/an-evaluation-of-dwps-microsoft-copilot-365-trial/an-evaluation-of-dwps-microsoft-365-copilot-trial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  DWP-Evaluation öffnen
                </a>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-indigo-500">
              <CardHeader>
                <CardTitle className="text-lg">Britische Regierung 2025</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-indigo-600 mb-2">26 Min./Tag</p>
                <p className="text-sm text-muted-foreground mb-3">
                  Rund 9,4 Stunden pro Monat in einem Versuch mit 20.000 Beschäftigten. Nach Rollout- und Change-Maßnahmen stieg
                  die aktive Nutzung schnell auf 83% und stabilisierte sich bei etwa 80%. Auch hier wurde die Zeitersparnis von
                  den Teilnehmenden selbst eingeschätzt.
                </p>
                <a
                  href="https://www.gov.uk/government/publications/microsoft-365-copilot-experiment-cross-government-findings-report/microsoft-365-copilot-experiment-cross-government-findings-report-html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  Regierungsstudie öffnen
                </a>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-teal-500">
              <CardHeader>
                <CardTitle className="text-lg">OECD-Übersicht 2025</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-teal-600 mb-2">Stark abhängig</p>
                <p className="text-sm text-muted-foreground mb-3">
                  Die OECD-Auswertung experimenteller Forschung zeigt: Der Effekt hängt wesentlich von Aufgabe, Erfahrung und
                  Qualität der Zusammenarbeit zwischen Mensch und KI ab. Deshalb sollte ein Business Case mit Szenarien arbeiten
                  und die tatsächliche Wirkung nach dem Rollout messen.
                </p>
                <a
                  href="https://www.oecd.org/en/publications/the-effects-of-generative-ai-on-productivity-innovation-and-entrepreneurship_b21df222-en.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  OECD-Studie öffnen
                </a>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6 border-orange-500/40 bg-orange-50 dark:bg-orange-950/20">
            <CardHeader>
              <CardTitle className="text-lg text-orange-700 dark:text-orange-400">
                Diese Studien messen überwiegend KI als Assistent – nicht als Agent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">
                Die genannten Werte entstehen vor allem beim Zusammenfassen, Formulieren, Suchen, Vorbereiten und Überarbeiten:
                Ein Mensch gibt einzelne Aufgaben an die KI und prüft das Ergebnis. Agentische Systeme gehen weiter. Sie können
                mehrstufige Abläufe planen, Informationen aus mehreren Quellen verarbeiten und definierte Arbeitsschritte selbstständig
                ausführen. Dadurch ist zusätzliche Zeitersparnis möglich. Für den heutigen Business Case rechnen wir diesen möglichen
                Mehrwert bewusst noch nicht ein, weil belastbare Langzeitdaten und unternehmensübergreifende Vergleichswerte dafür fehlen.
            </p>
            </CardContent>
          </Card>
        </section>

        {/* KPIs */}
        <section id="kpis">
          <h2 id="kpis-heading" className="text-2xl md:text-3xl font-bold mb-3">
            KPIs zur Erfolgsmessung
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  Quantitative Metriken
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Produktivität</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Dokumentenerstellung: Seiten/Stunde</li>
                      <li>• Code-Output: Lines of Code / Sprint</li>
                      <li>• E-Mail-Bearbeitung: Mails/Stunde</li>
                      <li>• Meeting-Effizienz: Follow-up Zeit</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Qualität</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Code-Fehlerrate: Bugs pro 1.000 Zeilen</li>
                      <li>• Dokumenten-Qualität: Revision-Zyklen</li>
                      <li>• Kunden-Satisfaction: NPS-Score</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Adoption</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Aktive Nutzer: % der Lizenzen</li>
                      <li>• Nutzungsfrequenz: Interaktionen/Tag</li>
                      <li>• Feature-Adoption: Welche Features?</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  Qualitative Metriken
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="text-sm">
                    <p className="font-semibold">Mitarbeiterzufriedenheit</p>
                    <p className="text-muted-foreground">Surveys vor/nach Einführung</p>
                  </li>
                  <li className="text-sm mt-3">
                    <p className="font-semibold">Onboarding-Geschwindigkeit</p>
                    <p className="text-muted-foreground">Time-to-Productivity neuer Mitarbeiter</p>
                  </li>
                  <li className="text-sm mt-3">
                    <p className="font-semibold">Innovation</p>
                    <p className="text-muted-foreground">Neue Ideen durch KI-Brainstorming</p>
                  </li>
                  <li className="text-sm mt-3">
                    <p className="font-semibold">Wettbewerbsfähigkeit</p>
                    <p className="text-muted-foreground">Schnellere Time-to-Market</p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Szenarien */}
        <section id="szenarien">
          <h2 id="szenarien-heading" className="text-2xl md:text-3xl font-bold mb-3">
            Zwei plausible ROI-Szenarien
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-t-4 border-t-orange-500 ring-2 ring-orange-500/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  Realistisch
                  <span className="text-xs bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 px-2 py-0.5 rounded">Unsere Einschätzung</span>
                </CardTitle>
                <p className="text-xs text-muted-foreground">Mit gezielter Schulung &amp; Change Management</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <p className="text-sm"><strong>Geschulte Nutzer:</strong> Alle werden berücksichtigt</p>
                  <p className="text-sm"><strong>Ziel-Zeitersparnis:</strong> 8 Stunden/Monat</p>
                  <p className="text-sm"><strong>Wirtschaftlich realisierbar:</strong> 50%</p>
                  <p className="text-sm"><strong>Kompetenzaufbau:</strong> schneller Ramp-up zur heute belegbaren Assistenz-Baseline</p>
                </div>
                <div className="p-4 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Planungslogik</p>
                  <p className="text-xl font-bold text-orange-700 dark:text-orange-400">Realistisches Szenario</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-blue-500">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  Studiennah
                  <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">Vergleichswert</span>
                </CardTitle>
                <p className="text-xs text-muted-foreground">Nahe an Forrester und der britischen Regierungsstudie</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <p className="text-sm"><strong>Geschulte Nutzer:</strong> Alle werden berücksichtigt</p>
                  <p className="text-sm"><strong>Ziel-Zeitersparnis:</strong> 9 Stunden/Monat</p>
                  <p className="text-sm"><strong>Wirtschaftlich realisierbar:</strong> 50%</p>
                  <p className="text-sm"><strong>Kompetenzaufbau:</strong> identisch zum realistischen Szenario</p>
                </div>
                <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Planungslogik</p>
                  <p className="text-xl font-bold text-blue-700 dark:text-blue-400">Studiennaher Vergleich</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <p className="text-sm text-muted-foreground mt-4">
            Die Szenarien unterscheiden sich nicht durch eine künstliche Quote aktiver Personen. Für alle geschulten Nutzer wird eine
            durchschnittliche Zeitersparnis angesetzt. Der tatsächliche wirtschaftliche Nutzen bleibt trotzdem vorsichtig, weil nur die
            Hälfte des rechnerischen Kapazitätswerts in die ROI-Berechnung eingeht. Die 8 beziehungsweise 9 Stunden sind dabei keine
            langfristige Obergrenze: Sie bilden nur eine heute belegbare Assistenz-Baseline. Zusätzlicher Nutzen durch leistungsfähigere
            Modelle, neue Funktionen und Tools, tiefere Prozessintegration sowie agentische, mehrstufige Arbeitsabläufe bleibt bewusst
            außerhalb der Formel, solange dafür keine belastbaren und allgemein übertragbaren Benchmarks vorliegen.
          </p>
        </section>

        {/* PowerPoint-Business-Case-Generator */}
        <section id="business-case-generator">
          <h2 id="business-case-generator-heading" className="text-2xl md:text-3xl font-bold mb-2">
            Ihren Copilot Business Case als PowerPoint erstellen
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Ihre Berechnung erfolgt lokal im Browser. Ein hochgeladenes Logo wird nicht an den Server übertragen.
            Die Ergebnisse sind Planungswerte und kein Wirkungsversprechen.
          </p>
          <RoiBusinessCaseGenerator />
        </section>

        {/* Branchen-ROI */}
        <section id="branchen-roi">
          <h2 id="branchen-roi-heading" className="text-2xl md:text-3xl font-bold mb-3">
            Branchenspezifische ROI-Beispiele
          </h2>

          <p className="text-sm text-muted-foreground mb-6">
            Die folgenden Werte orientieren sich an veröffentlichten Studien und werden als Planungswerte eingeordnet.
            Die tatsächlichen Gewinne hängen stark von der Qualität der Einführung, der Schulung und dem Change Management ab.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                branche: "Software-Entwicklung",
                roi: "1.000-2.500%",
                benefits: ["20% schnellere Feature-Entwicklung", "15% weniger Bugs", "25% schnellere Code-Reviews"],
                color: "purple"
              },
              {
                branche: "Consulting & Professional Services",
                roi: "750-1.500%",
                benefits: ["18% schnellere Proposals", "20% weniger Admin-Zeit", "13% mehr billable hours"],
                color: "blue"
              },
              {
                branche: "Finance & Banking",
                roi: "500-1.250%",
                benefits: ["23% schnellere Reports", "15% bessere Datenanalyse", "10% weniger Compliance-Fehler"],
                color: "green"
              },
              {
                branche: "Marketing & Sales",
                roi: "400-1.000%",
                benefits: ["25% schnellere Content-Erstellung", "18% mehr Leads", "13% höhere Campaign-Performance"],
                color: "orange"
              }
            ].map((item, idx) => (
              <Card key={idx} className={`border-l-4 border-l-${item.color}-500`}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{item.branche}</span>
                    <span className="text-green-600 font-bold">{item.roi}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {item.benefits.map((b, bidx) => (
                      <li key={bidx} className="text-sm">
                        {b}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Erfolgsfaktoren */}
        <section id="erfolgsfaktoren">
          <h2 id="erfolgsfaktoren-heading" className="text-2xl md:text-3xl font-bold mb-3">
            Kritische Erfolgsfaktoren
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">1. Klare Zielsetzung</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded-lg">
                    <p className="text-sm"><span className="text-red-600">❌ Vage:</span> "Wir wollen produktiver werden"</p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                    <p className="text-sm"><span className="text-green-600">✓ Konkret:</span> "30% Zeitersparnis bei Dokumentenerstellung innerhalb 6 Monaten"</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">2. Realistische Erwartungen</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="text-sm">Nicht alle Tasks profitieren gleich stark</li>
                  <li className="text-sm">Lernkurve einplanen (2-3 Monate)</li>
                  <li className="text-sm">Individuelle Unterschiede berücksichtigen</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">3. Change Management</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="text-sm">Executive Sponsorship sicherstellen</li>
                  <li className="text-sm">Champions in jedem Team etablieren</li>
                  <li className="text-sm">Kontinuierliches Training anbieten</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">4. Messung & Iteration</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="text-sm">Baseline VORHER messen</li>
                  <li className="text-sm">Monatliche KPI-Reviews</li>
                  <li className="text-sm">Feedback-Loops etablieren</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Fehler */}
        <section id="fehler">
          <h2 id="fehler-heading" className="text-2xl md:text-3xl font-bold mb-3">
            Häufige Fehler bei der ROI-Berechnung
          </h2>

          <div className="space-y-4">
            {[
              {
                fehler: "Nur Lizenzkosten berücksichtigen",
                falsch: "Copilot kostet €26/Monat – fertig",
                richtig: "Total Cost of Ownership inkl. Schulung, Change Management und IT-Aufwand"
              },
              {
                fehler: "Unrealistische Produktivitätsgewinne",
                falsch: "100% aller Aufgaben werden 50% schneller",
                richtig: "Differenzierte Betrachtung nach Task-Typen"
              },
              {
                fehler: "Keine Baseline-Messung",
                falsch: "Schätzungen aus dem Bauchgefühl",
                richtig: "Vorher-Messung mit Time-Tracking"
              },
              {
                fehler: "Adoption ignorieren",
                falsch: "Annahme: 100% Nutzung ab Tag 1",
                richtig: "Realistische Adoption-Kurve über Zeit"
              }
            ].map((item, idx) => (
              <Card key={idx} className="border-l-4 border-l-red-500">
                <CardContent className="pt-6">
                  <h4 className="font-bold mb-3">{idx + 1}. {item.fehler}</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded-lg">
                      <p className="text-sm"><span className="text-red-600 font-semibold">❌</span> {item.falsch}</p>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                      <p className="text-sm"><span className="text-green-600 font-semibold">✓</span> {item.richtig}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Best Practices */}
        <section id="best-practices">
          <h2 id="best-practices-heading" className="text-2xl md:text-3xl font-bold mb-3">
            ROI steigern: Best Practices
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Wins identifizieren</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">High-Impact, Low-Effort Tasks:</p>
                <ul className="space-y-2">
                  {["E-Mail-Zusammenfassungen", "Meeting-Protokolle", "Standard-Reports", "Code-Dokumentation"].map((item, idx) => (
                    <li key={idx} className="text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm font-semibold text-teal-600">→ Hier sofort hoher ROI!</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Power User fördern</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li>Top 20% der User generieren 80% des Nutzens</li>
                  <li>Identifizieren und gezielt fördern</li>
                  <li>Als Multiplikatoren einsetzen</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Use Cases dokumentieren</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li>Erfolgsgeschichten sammeln</li>
                  <li>Intern teilen (Intranet, Newsletter)</li>
                  <li>Motivation für andere schaffen</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Kontinuierliche Optimierung</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li>Prompts optimieren und teilen</li>
                  <li>Best Practices etablieren</li>
                  <li>Neue Features testen</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Download */}
        <section id="download">
          <h2 id="download-heading" className="text-2xl md:text-3xl font-bold mb-3">
            Download: ROI-Rechner Excel
          </h2>

          <Card className="border-2 border-green-500/30 bg-gradient-to-br from-green-500/5 to-emerald-500/5">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-4 text-center">
                <div>
                  <h3 className="font-bold text-xl mb-2">Copilot ROI-Rechner</h3>
                  <p className="text-muted-foreground text-sm">Professionelle Excel-Vorlage mit automatischen Berechnungen</p>
                </div>
                <a
                  href="/downloads/Copilot-ROI-Rechner.xlsx"
                  download="Copilot-ROI-Rechner.xlsx"
                  className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Jetzt herunterladen
                </a>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { nr: "1", title: "Eingaben", desc: "Nur vier Pflichtangaben" },
              { nr: "2", title: "Summary", desc: "ROI & Entscheidung" },
              { nr: "3", title: "3-Jahres-Verlauf", desc: "Kumulierter Nutzen" },
              { nr: "4", title: "Szenarien", desc: "Realistisch & studiennah" },
              { nr: "5", title: "Berechnung", desc: "36 Monate transparent" },
              { nr: "6", title: "Quellen", desc: "Methodik & Prüfungen" }
            ].map((tab) => (
              <div key={tab.nr} className="p-4 bg-muted/50 rounded-lg text-center">
                <span className="inline-block w-8 h-8 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full font-bold text-sm leading-8 mb-2">{tab.nr}</span>
                <p className="font-semibold text-sm">{tab.title}</p>
                <p className="text-xs text-muted-foreground">{tab.desc}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center">
            <strong>Benötigen Sie Unterstützung bei Ihrer ROI-Berechnung?</strong><br />
            <a href="/kontakt" className="text-primary hover:underline">Kontaktieren Sie uns für individuelle Beratung →</a>
          </p>
        </section>


        {/* FAQ */}
        <section id="faq">
          <h2 id="faq-heading" className="text-2xl md:text-3xl font-bold mb-3">
            Häufig gestellte Fragen
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="text-base font-semibold">{faq.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quellen */}
        <section id="quellen">
          <h2 id="quellen-heading" className="text-2xl md:text-3xl font-bold mb-3">
            Quellen und weiterführende Links
          </h2>
          <p className="text-muted-foreground mb-6">
            Offizielle Studien und Ressourcen zur ROI-Berechnung und Produktivitätsmessung.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                href: "https://www.microsoft.com/en-us/worklab/work-trend-index/",
                title: "Microsoft Work Trend Index",
                desc: "77% der trainierten Nutzer berichten höhere Produktivität"
              },
              {
                href: "https://www.forrester.com/report/the-total-economic-impact-of-microsoft-365-copilot/RES181868",
                title: "Forrester TEI Study",
                desc: "9 Stunden Zeitersparnis pro Nutzer/Monat"
              },
              {
                href: "https://www.gov.uk/government/publications/an-evaluation-of-dwps-microsoft-copilot-365-trial/an-evaluation-of-dwps-microsoft-365-copilot-trial",
                title: "DWP Microsoft 365 Copilot Evaluation",
                desc: "19 Minuten Zeitersparnis pro Tag bei 3.549 Beschäftigten"
              },
              {
                href: "https://www.gov.uk/government/publications/microsoft-365-copilot-experiment-cross-government-findings-report/microsoft-365-copilot-experiment-cross-government-findings-report-html",
                title: "UK Cross-Government Copilot Experiment",
                desc: "26 Minuten täglich bei 20.000 Beschäftigten"
              },
              {
                href: "https://www.oecd.org/en/publications/the-effects-of-generative-ai-on-productivity-innovation-and-entrepreneurship_b21df222-en.html",
                title: "OECD: Generative AI und Produktivität",
                desc: "Übersicht experimenteller Forschung und ihrer Grenzen"
              },
              {
                href: "https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/",
                title: "GitHub Copilot Productivity Research",
                desc: "Studie: 55% schnellere Task-Completion"
              },
              {
                href: "https://adoption.microsoft.com/en-us/copilot/success-kit/",
                title: "Microsoft Copilot Success Kit",
                desc: "Offizielles Toolkit für ROI-Messung"
              }
            ].map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-colors group"
              >
                <div className="font-semibold group-hover:text-primary transition-colors">{link.title}</div>
                <div className="text-sm text-muted-foreground">{link.desc}</div>
              </a>
            ))}
          </div>
        </section>
              <AuthorBio author={martinLang} />
      </ContentLayout>
    </>
  );
};

export default CopilotRoiBerechnen;

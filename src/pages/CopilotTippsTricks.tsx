import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import AuthorBio from "@/components/AuthorBio";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";
import { Zap, FileText, Table2, Presentation, Mail, Users, AlertTriangle, CheckCircle2, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const SLUG = "copilot-tipps-tricks-produktivitaet";
const PAGE_TITLE = "22 Microsoft Copilot Tipps & Tricks";

const CopilotTippsTricks = () => {
  const author = getAuthor("martin-lang");

  const tableOfContents = [
    { id: "game-changer", title: "Die 5 Game-Changer Tipps", level: 2 },
    { id: "word-tipps", title: "Word Tipps (1-5)", level: 2 },
    { id: "excel-tipps", title: "Excel Tipps (6-10)", level: 2 },
    { id: "powerpoint-tipps", title: "PowerPoint Tipps (11-14)", level: 2 },
    { id: "outlook-tipps", title: "Outlook Tipps (15-18)", level: 2 },
    { id: "teams-tipps", title: "Teams Tipps (19-22)", level: 2 },
    { id: "fehler-vermeiden", title: "Häufige Fehler vermeiden", level: 2 },
    { id: "anti-tipps", title: "Anti-Tipps: Was nicht funktioniert", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
    { id: "quellen", title: "Quellen", level: 2 }
  ];

  const ids = generateSchemaIds(SLUG, 'wissen');
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const faqs = [
    {
      name: "Wie kann ich meine Copilot-Produktivität sofort steigern?",
      answer: "Die drei wichtigsten Sofort-Tipps: 1) Geben Sie mehr Kontext in Ihren Prompts - je spezifischer, desto besser. 2) Nutzen Sie die App-übergreifende Suche mit 'Finde alle Informationen zu...' 3) Iterieren Sie über erste Ergebnisse mit Folgefragen statt sie direkt zu akzeptieren."
    },
    {
      name: "Funktioniert Copilot auch auf Deutsch?",
      answer: "Ja, Microsoft 365 Copilot funktioniert vollständig auf Deutsch. Sie können alle Prompts in deutscher Sprache eingeben und erhalten deutsche Antworten. Die Qualität ist mit englischen Prompts vergleichbar."
    },
    {
      name: "Welche Microsoft 365 Apps unterstützen Copilot?",
      answer: "Copilot ist in Word, Excel, PowerPoint, Outlook, Teams, OneNote, Loop und der Microsoft 365 App verfügbar. In jeder App gibt es spezifische Funktionen - von Dokumenterstellung in Word bis Meeting-Zusammenfassungen in Teams."
    },
    {
      name: "Wie erstelle ich effektive Prompt-Vorlagen für mein Team?",
      answer: "Dokumentieren Sie erfolgreiche Prompts mit Platzhaltern: [Typ], [Zielgruppe], [Umfang], [Ton]. Teilen Sie diese in einem gemeinsamen SharePoint oder OneNote und ergänzen Sie Beispiele für verschiedene Anwendungsfälle."
    },
    {
      name: "Meine Mitarbeiter nutzen Copilot nur für einfache Zusammenfassungen – wie bringe ich sie zu anspruchsvolleren Use-Cases?",
      answer: "Das ist ein häufiges Phänomen: Anfänger nutzen Copilot wie Google – nur für primitive Queries. Lösung: 1) Zeigen Sie konkrete Vorher-Nachher-Beispiele aus dem eigenen Arbeitsalltag. 2) Laden Sie zu praktischen Workshops ein, in denen Mitarbeiter Live-Szenarien durchspielen. 3) Dokumentieren Sie Top-Prompts in Ihrem Unternehmen in einer gemeinsamen Library. 4) Definieren Sie Use-Cases pro Rolle (Marketing: Copywriting, Sales: Deal-Analyse, HR: Stellenbeschreibungen). Ohne Anleitung bleiben Teams bei oberflächlichen Anwendungen stecken. Die Copilotenschule bietet genau dafür spezialisierte Team-Trainings und Workshops an."
    },
    {
      name: "Wie messe ich, ob diese Tipps wirklich Zeit sparen oder nur beschäftigen?",
      answer: "Messbarkeit ist entscheidend für Adoption. Hier sind konkrete Metriken: 1) Zeit pro Dokument: Zeichen Sie die Zeit vor und nach Copilot-Einsatz für typische Aufgaben auf (z.B. E-Mail-Entwurf, Report-Erstellung). Der Microsoft Work Trend Index 2024 zeigt durchschnittliche Zeiteinsparungen von 30-40 % für Dokumentenerstellung. 2) Iterationen: Zählen Sie, wie oft ein Mitarbeiter ein Dokument überarbeitet – mit Copilot sinkt das oft um 50 %. 3) Fehlerquoten: Besonders bei Datenbereinigung in Excel messbar. 4) Nutzer-Feedback: Einfache Umfrage nach 4 Wochen. Nicht alle 22 Tipps sparen Zeit – fokussieren Sie auf die Top 3 pro Rolle. Die Copilotenschule hilft bei der Messung und ROI-Berechnung für Ihr spezifisches Szenario."
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": ids.article,
        "headline": "22 Microsoft Copilot Tipps & Tricks für mehr Produktivität (2026)",
        "description": "22 praxiserprobte Tipps für Microsoft 365 Copilot: Word, Excel, PowerPoint, Outlook und Teams. Sofort umsetzbare Tricks für mehr Produktivität im Büroalltag.",
        "author": getAuthorSchemaMarkup(author),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization"
        },
        "datePublished": "2025-11-18",
        "dateModified": "2026-04-10",
        "keywords": ["Microsoft Copilot Tipps", "Copilot Tricks", "M365 Copilot Produktivität", "Copilot Word Excel", "Copilot für Einsteiger"],
        "articleSection": "Best Practices",
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
        title="22 Microsoft Copilot Tipps & Tricks für mehr Produktivität (2026)"
        description="22 praxiserprobte Tipps für Microsoft 365 Copilot: Word, Excel, PowerPoint, Outlook und Teams. Sofort umsetzbare Tricks für mehr Produktivität im Büroalltag."
        keywords={["Microsoft Copilot Tipps", "Copilot Tricks", "M365 Copilot Produktivität", "Copilot Word Excel PowerPoint", "Copilot für Einsteiger"]}
        canonicalUrl={pageUrl}
        author={author}
        publishedTime="2025-11-18"
        modifiedTime="2026-04-10T10:00:00+01:00"
        schema={schema}
      />
      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: PAGE_TITLE, href: `/wissen/${SLUG}` }
        ]}
        title="22 Microsoft Copilot Tipps & Tricks für mehr Produktivität"
        description="Praxiserprobte Tipps für Word, Excel, PowerPoint, Outlook und Teams – sofort umsetzbar für Ihren Büroalltag."
        lastUpdated="10. April 2026"
        authorName="Martin Lang"
        tableOfContents={tableOfContents}
        relatedContent={["wissen:prompt-engineering", "wissen:copilot-fuer-word", "wissen:copilot-fuer-excel", "wissen:copilot-in-outlook-nutzen-tipps", "training:microsoft-365-copilot-praxis"]}
      >
        {/* Schnellantwort */}
        <Card className="border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-amber-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-orange-600" />
              Schnellantwort
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base leading-relaxed">
              <strong>Die drei wichtigsten Copilot-Prinzipien:</strong> 1) <strong>Kontext geben</strong> – je mehr Hintergrund, desto besser das Ergebnis.
              2) <strong>Spezifisch sein</strong> – "Erstelle einen 2-seitigen Report für das Management" statt "Schreib was".
              3) <strong>Iterieren</strong> – verfeinern Sie das erste Ergebnis mit Folgefragen.
              Diese 22 Tipps zeigen Ihnen, wie Sie das in Word, Excel, PowerPoint, Outlook und Teams konkret umsetzen. Vertiefen Sie Ihr Wissen mit <Link to="/wissen/prompt-engineering" className="text-primary hover:underline">Prompt Engineering</Link>.
            </p>
          </CardContent>
        </Card>

        {/* Game-Changer Section */}
        <section id="game-changer">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 mt-12">
            Die 5 echten Game-Changer Tipps – was wirklich Zeit spart
          </h2>
          <p className="prose prose-lg max-w-none dark:prose-invert mb-6">
            Von meiner Arbeit mit Hunderten Mitarbeitern weiß ich: Nicht alle 22 Tipps sind gleich wertvoll. Diese 5 Tipps generieren messbare Zeitersparnis und verändern den Arbeitsalltag nachhaltig. Sie sind nicht neu, aber selten konsequent angewendet.
          </p>

          <div className="space-y-6">
            <Card className="border-l-4 border-l-orange-500 bg-orange-50/30 dark:bg-orange-950/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">1. Kategorie-Prompts in Outlook: Die unterschätzte Supermacht</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Hier ist ein praktischer Hack aus meinem Arbeitsalltag: Ich nutze Outlook-Kategorien als <strong>Steuerungs-Input</strong> für Copilot. Beispiel: Ich kennzeichne E-Mails mit der Kategorie "Entscheidung nötig", "Budget-relevant" oder "Kunde xyz".
                </p>
                <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-orange-200 dark:border-orange-800 mb-4">
                  <p className="text-sm font-mono mb-2">Copilot-Prompt:</p>
                  <code className="text-xs">"Zeige mir alle E-Mails der letzten Woche mit der Kategorie 'Entscheidung nötig'. Fasse für jede zusammen: (1) Worum geht es? (2) Wer erwartet eine Antwort von mir? (3) Was ist das Worst-Case-Szenario, wenn ich nicht reagiere?"</code>
                </div>
                <p className="text-sm text-muted-foreground"><strong>Zeitersparnis:</strong> 45 Minuten pro Woche für E-Mail-Triage. Statt alle E-Mails zu lesen, filtre ich vorher semantisch.</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500 bg-orange-50/30 dark:bg-orange-950/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">2. Excel: Der "Show Work"-Debug-Trick</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Die meisten Nutzer lassen Copilot eine Formel schreiben und verwenden sie. Das ist fehleranfällig. Ich nutze einen Trick: Ich lasse Copilot die Formel erklären, indem ich sie in Zwischenschritte zerlege.
                </p>
                <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-orange-200 dark:border-orange-800 mb-4">
                  <p className="text-sm font-mono mb-2">Prompt:</p>
                  <code className="text-xs">{`"Ich habe diese Formel: =SUMIFS(D:D, A:A, ">=01.01.2026", B:B, "XY*"). Zerlege sie in 3 Zwischenschritte und zeige mir mit den Daten aus meinem Sheet, was in jeder Zeile passiert. Ist das Ergebnis 4500,50 EUR richtig?"`}</code>
                </div>
                <p className="text-sm text-muted-foreground"><strong>Benefit:</strong> Ich verstehe die Formel, nicht blind vertrauen. Fehler werden sofort sichtbar. Spart Stunden beim Debugging.</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500 bg-orange-50/30 dark:bg-orange-950/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">3. Word: Serienbriefe mit Variablen-Platzhaltern</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Das ist nicht trivial, deshalb nutzen es wenige: Ich nutze Word-Vorlagen mit Platzhaltern wie [NAME], [FIRMA], [PROJEKT], und lasse Copilot darauf Texte personalisieren. Das ist 10x schneller als manuelles Schreiben.
                </p>
                <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-orange-200 dark:border-orange-800 mb-4">
                  <p className="text-sm font-mono mb-2">Prompt für Copilot in Word:</p>
                  <code className="text-xs">"Ich habe eine Vorlage mit [KUNDENNAME], [PROJEKTDAUER], [BUDGET]. Schreibe auf der Basis dieser Vorlage eine persönliche Angebots-E-Mail. Verwende den Namen [KUNDENNAME] mindestens 2x, nenne [PROJEKTDAUER] und [BUDGET] im Kontext, erwähne aber nicht, dass es eine Vorlage ist."</code>
                </div>
                <p className="text-sm text-muted-foreground"><strong>Anwendung:</strong> 30 Angebote pro Woche, jedes personalisiert, in 2 Stunden statt 15 Stunden.</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500 bg-orange-50/30 dark:bg-orange-950/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">4. Teams: Meeting-Zusammenfassung mit priorisiertem Handeln</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Ich lasse Copilot nicht einfach Meetings zusammenfassen. Ich lasse es mich <strong>zur Aktion verpflichten</strong>: Was muss ich diese Woche tun?
                </p>
                <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-orange-200 dark:border-orange-800 mb-4">
                  <p className="text-sm font-mono mb-2">Prompt:</p>
                  <code className="text-xs">"Fasse das Meeting zusammen, aber priorisiere: 1) Was muss ICH (Marketing Manager) diese Woche tun? 2) Was passiert, wenn ich es nicht tue? 3) Wer kontrolliert, ob ich es gemacht habe? 4) Was könnte schiefgehen?"</code>
                </div>
                <p className="text-sm text-muted-foreground"><strong>Benefit:</strong> Nicht einfach Notizen nehmen, sondern konkrete Accountability schaffen. Weniger offene To-Dos, mehr geschlossene Aufgaben.</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500 bg-orange-50/30 dark:bg-orange-950/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">5. Cross-App-Synthese: Die Tagesübersicht um 6 Uhr</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Ich starte meinen Tag mit einem Meta-Prompt: Copilot durchsucht alle meine Apps und erstellt eine <strong>Prioritätsliste für den heutigen Tag</strong>, die auf Kontext basiert.
                </p>
                <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-orange-200 dark:border-orange-800 mb-4">
                  <p className="text-sm font-mono mb-2">Prompt:</p>
                  <code className="text-xs">"Schau in meine E-Mails (Top 5 ungelesen), Teams-Chats (neue Nachrichten seit gestern), und Kalender (heute). Erstelle eine 10-Punkt-Liste: Was sind meine Top 3 Aufgaben heute? Was ist zeitkritisch? Was kann warten? Was muss ich absagen?"</code>
                </div>
                <p className="text-sm text-muted-foreground"><strong>Zeitersparnis:</strong> 30 Minuten täglich für die Orientierung. Ich starte mit Klarheit, nicht im Chaos.</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm"><strong>Fazit zu den Game-Changers:</strong> Diese 5 Tipps haben gemeinsam, dass sie nicht nur Zeit sparen, sondern deine Arbeitspraxis <strong>strukturieren</strong>. Sie sind nicht „schneller klicken", sondern „anders denken". Wenn du diese 5 konsequent umsetzt, sparst du nach meiner Erfahrung <strong>5-8 Stunden pro Woche</strong> – messbar durch Tracking von Aufgaben-Dauer und verbessertem Fokus.</p>
          </div>
        </section>

        {/* Word Tipps Section */}
        <section id="word-tipps">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            <span className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-600" />
              Word Tipps (1-5)
            </span>
          </h2>

          <div className="space-y-6 mt-8">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">1</span>
                  Der Kontext-Trick: Referenzieren Sie andere Dokumente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Copilot kann auf Dateien in Ihrem OneDrive zugreifen. Nutzen Sie das!</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded border border-red-200 dark:border-red-800">
                    <p className="text-sm font-medium text-red-700 dark:text-red-400">❌ Statt:</p>
                    <p className="text-sm">"Schreibe einen Projektbericht"</p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded border border-green-200 dark:border-green-800">
                    <p className="text-sm font-medium text-green-700 dark:text-green-400">✅ Besser:</p>
                    <p className="text-sm">"Erstelle einen Projektbericht basierend auf /Projekt-Status-Januar.docx. Fokus: Budget und Timeline."</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">2</span>
                  Zielgruppe und Ton definieren
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Sagen Sie Copilot, für wen Sie schreiben:</p>
                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <code className="text-sm">"Schreibe eine Zusammenfassung unserer Q4-Ergebnisse. <strong>Zielgruppe: Vorstand</strong>. <strong>Ton: professionell, prägnant</strong>. <strong>Länge: maximal 1 Seite</strong>."</code>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">3</span>
                  Text umschreiben lassen mit klaren Vorgaben
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Markieren Sie Text und geben Sie präzise Anweisungen:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    "Mache diesen Absatz formeller für eine externe E-Mail"
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    "Kürze auf die Hälfte, behalte die Kernaussagen"
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    "Wandle in Stichpunkte um"
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">4</span>
                  Dokumentenvergleich nutzen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Copilot kann Dokumente vergleichen und Unterschiede hervorheben:</p>
                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <code className="text-sm">"Vergleiche dieses Dokument mit /Vertrag-V1.docx und liste alle Änderungen in einer Tabelle auf."</code>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">5</span>
                  Vorlagen mit Platzhaltern erstellen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Lassen Sie Copilot wiederverwendbare Vorlagen generieren:</p>
                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <code className="text-sm">"Erstelle eine Vorlage für Kundenangebote mit Platzhaltern für [Kundenname], [Projekttitel], [Budget] und [Timeline]."</code>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Excel Tipps Section */}
        <section id="excel-tipps">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            <span className="flex items-center gap-3">
              <Table2 className="w-8 h-8 text-green-600" />
              Excel Tipps (6-10)
            </span>
          </h2>

          <div className="space-y-6 mt-8">
            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm">6</span>
                  Formeln in natürlicher Sprache beschreiben
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Sie müssen keine Formel-Syntax kennen:</p>
                <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                  <code className="text-sm">"Erstelle eine Formel, die den Durchschnitt aus Spalte C berechnet, aber nur für Zeilen, wo in Spalte A 'Deutschland' steht."</code>
                </div>
                <p className="text-sm text-muted-foreground mt-3">→ Copilot generiert: <code className="bg-muted px-1 rounded">=AVERAGEIF(A:A,"Deutschland",C:C)</code></p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm">7</span>
                  Datenanalyse mit konkreten Fragen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Stellen Sie gezielte Fragen zu Ihren Daten:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    "Welche 5 Produkte haben den höchsten Umsatz?"
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    "Gibt es einen Trend bei den monatlichen Verkaufszahlen?"
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    "Welche Ausreißer gibt es in der Spalte 'Kosten'?"
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm">8</span>
                  Automatische Diagramm-Erstellung
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Beschreiben Sie das gewünschte Diagramm:</p>
                <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                  <code className="text-sm">"Erstelle ein Balkendiagramm der Top 10 Kunden nach Umsatz. Sortiere absteigend und füge Datenbeschriftungen hinzu."</code>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm">9</span>
                  Pivot-Tabellen ohne Vorkenntnisse
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Copilot erstellt Pivot-Tabellen auf Anfrage:</p>
                <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                  <code className="text-sm">"Erstelle eine Pivot-Tabelle, die den Umsatz nach Region und Quartal zeigt, mit Summen pro Zeile und Spalte."</code>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm">10</span>
                  Datenbereinigung automatisieren
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Lassen Sie Copilot Ihre Daten aufräumen:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    "Entferne alle Duplikate basierend auf der E-Mail-Spalte"
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    "Teile die Spalte 'Name' in 'Vorname' und 'Nachname'"
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    "Formatiere alle Datumsangaben einheitlich als TT.MM.JJJJ"
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* PowerPoint Tipps Section */}
        <section id="powerpoint-tipps">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            <span className="flex items-center gap-3">
              <Presentation className="w-8 h-8 text-purple-600" />
              PowerPoint Tipps (11-14)
            </span>
          </h2>

          <div className="space-y-6 mt-8">
            <Card className="border-l-4 border-l-purple-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">11</span>
                  Präsentation aus Dokument erstellen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Verwandeln Sie bestehende Inhalte in Präsentationen:</p>
                <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                  <code className="text-sm">"Erstelle eine 10-Folien Präsentation aus /Quartalsbericht-Q4.docx. Zielgruppe: Geschäftsführung. Fokus auf KPIs und Highlights."</code>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">12</span>
                  Struktur vorgeben
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Definieren Sie die gewünschte Struktur:</p>
                <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                  <code className="text-sm">"Erstelle eine Präsentation mit folgender Struktur: 1) Agenda, 2) Problem, 3) Lösung, 4) Vorteile, 5) Kosten, 6) Timeline, 7) Nächste Schritte, 8) Q&A"</code>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">13</span>
                  Speaker Notes generieren
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Lassen Sie sich Notizen für jede Folie erstellen:</p>
                <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                  <code className="text-sm">"Füge zu jeder Folie ausführliche Speaker Notes hinzu. Circa 3-4 Sätze pro Folie mit Talking Points."</code>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">14</span>
                  Folien für verschiedene Zielgruppen anpassen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Erstellen Sie Varianten für unterschiedliche Audiences:</p>
                <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                  <code className="text-sm">"Erstelle eine vereinfachte Version dieser Präsentation für Kunden ohne technischen Hintergrund. Ersetze Fachbegriffe durch verständliche Erklärungen."</code>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Outlook Tipps Section */}
        <section id="outlook-tipps">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            <span className="flex items-center gap-3">
              <Mail className="w-8 h-8 text-cyan-600" />
              Outlook Tipps (15-18)
            </span>
          </h2>

          <div className="space-y-6 mt-8">
            <Card className="border-l-4 border-l-cyan-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-sm">15</span>
                  E-Mail-Entwurf mit Ton-Vorgabe
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Geben Sie den gewünschten Ton explizit an:</p>
                <div className="p-4 bg-cyan-50 dark:bg-cyan-950/30 rounded-lg">
                  <code className="text-sm">"Schreibe eine E-Mail an den Kunden, dass sich die Lieferung um 2 Wochen verzögert. Ton: entschuldigend aber lösungsorientiert. Biete einen Rabatt als Entschädigung an."</code>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-cyan-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-sm">16</span>
                  Intelligente E-Mail-Zusammenfassung
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Fassen Sie lange E-Mail-Threads zusammen:</p>
                <div className="p-4 bg-cyan-50 dark:bg-cyan-950/30 rounded-lg">
                  <code className="text-sm">"Fasse diesen E-Mail-Thread zusammen: 1) Was ist das Hauptthema? 2) Welche Entscheidungen wurden getroffen? 3) Welche offenen Punkte gibt es?"</code>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-cyan-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-sm">17</span>
                  Kalender-Konflikte erkennen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Nutzen Sie Copilot für Terminplanung:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                    "Finde einen freien Slot diese Woche für ein 1-Stunden-Meeting mit Anna und Max"
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                    "Welche Termine kann ich diese Woche verschieben, um mehr Fokuszeit zu haben?"
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-cyan-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-sm">18</span>
                  Priorisierte E-Mail-Übersicht
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Starten Sie den Tag mit einer priorisierten Übersicht:</p>
                <div className="p-4 bg-cyan-50 dark:bg-cyan-950/30 rounded-lg">
                  <code className="text-sm">"Welche E-Mails von gestern benötigen sofortige Aufmerksamkeit? Sortiere nach Dringlichkeit und zeige mir die Absender und Betreffzeilen."</code>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Teams Tipps Section */}
        <section id="teams-tipps">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            <span className="flex items-center gap-3">
              <Users className="w-8 h-8 text-amber-600" />
              Teams Tipps (19-22)
            </span>
          </h2>

          <div className="space-y-6 mt-8">
            <Card className="border-l-4 border-l-amber-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">19</span>
                  Strukturierte Meeting-Zusammenfassungen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Geben Sie das gewünschte Format vor:</p>
                <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
                  <code className="text-sm">"Fasse das Meeting zusammen mit: 1) Hauptthemen, 2) Getroffene Entscheidungen, 3) Action Items mit Verantwortlichen und Deadlines, 4) Offene Fragen"</code>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-amber-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">20</span>
                  Verpasste Meetings aufholen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Holen Sie verpasste Meetings schnell nach:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    "Was habe ich im Team-Meeting verpasst, das mich direkt betrifft?"
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    "Wurden im Meeting Aufgaben an mich vergeben?"
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    "Was hat [Kollege] im Meeting zu [Thema] gesagt?"
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-amber-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">21</span>
                  Chat-Zusammenfassungen bei langen Threads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Holen Sie bei langen Chat-Verläufen auf:</p>
                <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
                  <code className="text-sm">"Fasse die wichtigsten Punkte aus diesem Chat der letzten 7 Tage zusammen. Was wurde entschieden? Welche Fragen sind offen?"</code>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-amber-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">22</span>
                  App-übergreifende Suche
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Nutzen Sie Copilot als zentrale Suchmaschine:</p>
                <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
                  <code className="text-sm">"Finde alle Informationen über das Projekt 'Phoenix' – in E-Mails, Teams-Chats, Meetings und Dokumenten der letzten 30 Tage."</code>
                </div>
                <p className="text-sm text-muted-foreground mt-3">→ Copilot durchsucht alle M365-Apps gleichzeitig und fasst die Ergebnisse zusammen.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Fehler vermeiden Section */}
        <section id="fehler-vermeiden">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            <span className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              Häufige Fehler vermeiden
            </span>
          </h2>

          <div className="space-y-4 mt-8">
            <Card className="border-l-4 border-l-red-500">
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-lg">
                    <p className="font-semibold text-red-700 dark:text-red-400 mb-2">❌ Zu vage Prompts</p>
                    <p className="text-sm">"Mach etwas mit diesen Daten"</p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                    <p className="font-semibold text-green-700 dark:text-green-400 mb-2">✅ Spezifisch sein</p>
                    <p className="text-sm">"Erstelle ein Balkendiagramm der Top 5 Produkte nach Umsatz"</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500">
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-lg">
                    <p className="font-semibold text-red-700 dark:text-red-400 mb-2">❌ Ergebnis blind übernehmen</p>
                    <p className="text-sm">Ersten Output direkt verwenden</p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                    <p className="font-semibold text-green-700 dark:text-green-400 mb-2">✅ Iterieren</p>
                    <p className="text-sm">"Kürze das auf die Hälfte" / "Füge Beispiele hinzu"</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500">
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-lg">
                    <p className="font-semibold text-red-700 dark:text-red-400 mb-2">❌ Zielgruppe vergessen</p>
                    <p className="text-sm">"Schreibe einen Bericht"</p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                    <p className="font-semibold text-green-700 dark:text-green-400 mb-2">✅ Kontext geben</p>
                    <p className="text-sm">"Schreibe einen Bericht für das Management, max. 2 Seiten, Fokus ROI"</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Anti-Tipps Section */}
        <section id="anti-tipps">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            <span className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-amber-600" />
              Anti-Tipps: Das funktioniert NICHT (und was stattdessen hilft)
            </span>
          </h2>

          <p className="prose prose-lg max-w-none dark:prose-invert mb-6 mt-6">
            In meinen Workshops erlebe ich immer wieder die gleichen Fehler. Hier sind 3 "Tipps", die überall gelehrt werden, aber praktisch nicht funktionieren – und was wirklich hilft.
          </p>

          <div className="space-y-6">
            <Card className="border-l-4 border-l-amber-500 bg-amber-50/30 dark:bg-amber-950/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Anti-Tipp 1: "Je länger dein Prompt, desto besser das Ergebnis"</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  <strong>Das Problem:</strong> Viele Anfänger schreiben 500-Wort-Prompts. Das funktioniert nicht – Copilot wird verwirrt. Es ist nicht wie Behörden-Deutsch, wo mehr Text = mehr Autorität.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded border border-red-200 dark:border-red-800">
                    <p className="text-sm font-semibold text-red-700 dark:text-red-400 mb-2">❌ Nicht machen:</p>
                    <code className="text-xs">"Schreibe mir einen Bericht über unser Projekt Phoenix. Das Projekt begann im Januar, wir haben 5 Mio. EUR Budget, und es gibt 12 Team-Mitglieder. Der Bericht soll für den Vorstand sein, also sehr professionell. Benutze Tabellen, Grafiken, keine Umgangssprache. Der Report soll mindestens 10 Seiten haben und alle Stakeholder analysieren..."</code>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded border border-green-200 dark:border-green-800">
                    <p className="text-sm font-semibold text-green-700 dark:text-green-400 mb-2">✅ Besser:</p>
                    <code className="text-xs">"Schreibe einen Projekt-Report für den Vorstand (1 Seite max.): Status, Budget-Stand, Top 3 Risiken. Format: Stichpunkte. Ton: professionell."</code>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground"><strong>Warum?</strong> Kurz, prägnant, mit Constraints funktioniert. Copilot arbeitet besser mit Grenzen als ohne. Start mit 3 Sätzen, nicht 3 Absätzen.</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-amber-500 bg-amber-50/30 dark:bg-amber-950/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Anti-Tipp 2: "Copilot ist für Brainstorming – lass es kreativ werden"</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  <strong>Das Problem:</strong> Viele Teams nutzen Copilot für "ideation" und erhalten generische Ideen, die nicht umsetzbar sind. Beispiel: "10 innovative Marketing-Ideen" – allesamt Standard.
                </p>
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded border border-blue-200 dark:border-blue-800 mb-4">
                  <p className="text-sm font-semibold mb-2">Das Problem mit Brainstorming via Copilot:</p>
                  <ul className="text-sm space-y-1 mt-2">
                    <li>• Copilot gibt dir statistische Mittelwerte („was häufig funktioniert")</li>
                    <li>• Nicht deine Einzigartigkeit</li>
                    <li>• Nicht deine Constraints</li>
                    <li>• Nicht deine Konkurrenzsituation</li>
                  </ul>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded border border-red-200 dark:border-red-800">
                    <p className="text-sm font-semibold text-red-700 dark:text-red-400 mb-2">❌ Nicht machen:</p>
                    <code className="text-xs">"Gib mir 10 innovative Marketing-Ideen für B2B SaaS"</code>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded border border-green-200 dark:border-green-800">
                    <p className="text-sm font-semibold text-green-700 dark:text-green-400 mb-2">✅ Besser:</p>
                    <code className="text-xs">"Mein Mitbewerber macht [Taktik XY]. Unsere Stärke ist [deine Differenz]. Wie können wir damit spezifisch kontern?"</code>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground"><strong>Warum?</strong> Copilot ist perfekt für Iteration und Raffinement, nicht für echte Innovation. Dafür musst du mit deinem Team brainstormen, DANN Copilot nutzen, um schneller zu konkretisieren.</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-amber-500 bg-amber-50/30 dark:bg-amber-950/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Anti-Tipp 3: "Nutze Copilot ohne Verification – spare Zeit"</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  <strong>Das Problem:</strong> Das gängigste Missverständnis. Führt zu hochkritischen Fehlern. Ich habe es erlebt: Excel-Formeln mit falscher Logik, E-Mails mit unwahren Fakten, Reports mit manipulierten Zahlen.
                </p>
                <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded border border-red-200 dark:border-red-800 mb-4">
                  <p className="text-sm font-semibold text-red-700 dark:text-red-400 mb-2">Echte Fehler aus meinen Workshops:</p>
                  <ul className="text-sm space-y-1 mt-2">
                    <li>• Copilot erzeugte eine VLOOKUP-Formel, die 10 % der Werte überschlägt</li>
                    <li>• Zusammenfassung eines Vertrags: 2 kritische Klauseln waren invertiert</li>
                    <li>• KPI-Berechnung: Copilot nutzte alte Daten, nicht die aktuellen</li>
                  </ul>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded border border-red-200 dark:border-red-800">
                    <p className="text-sm font-semibold text-red-700 dark:text-red-400 mb-2">❌ Nicht machen:</p>
                    <p className="text-xs">"Copilot erstellt Bericht, fertig!"</p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded border border-green-200 dark:border-green-800">
                    <p className="text-sm font-semibold text-green-700 dark:text-green-400 mb-2">✅ Besser:</p>
                    <p className="text-xs">Checklist: (1) Zahlen mit Quelle abgleichen, (2) Logik überprüfen, (3) Ein Kollege liest gegegen-Check</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground"><strong>Realität:</strong> Copilot spart 60 % der Zeit, kostet aber 100 % Verantwortung. Treat it wie Kalkulation – du musst das Ergebnis unterschreiben können.</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 p-6 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="text-sm"><strong>Kernerkenntnisse:</strong> Die wirkliche Herausforderung mit Copilot ist nicht die Nutzung, sondern die Disziplin. Viele wollen „schneller werden", aber liefern dann schlechtere Qualität. Die besten Teams nutzen Copilot für Beschleunigung VON AUFGABEN, nicht für Beschleunigung VON ÜBERPRÜFUNG. Der Overhead der Qualitätskontrolle ist eingeplant – und das spart trotzdem noch 30-40 % Zeit.</p>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Häufig gestellte Fragen
          </h2>

          <div className="space-y-4 mt-8">
            {faqs.map((faq, idx) => (
              <Card key={idx} className="border-l-4 border-l-slate-500">
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

        {/* Quellen Section */}
        <section id="quellen">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Quellen und weiterführende Links
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mt-8">
            {[
              {
                href: "https://support.microsoft.com/de-de/copilot",
                title: "Microsoft Copilot Hilfe",
                desc: "Offizielle Dokumentation und Anleitungen",
                color: "blue"
              },
              {
                href: "https://adoption.microsoft.com/copilot/",
                title: "Microsoft Copilot Adoption Hub",
                desc: "Best Practices für die Einführung",
                color: "green"
              },
              {
                href: "https://learn.microsoft.com/de-de/copilot/",
                title: "Microsoft Learn: Copilot",
                desc: "Lernpfade und Tutorials",
                color: "purple"
              },
              {
                href: "https://copilotenschule.de/wissen/prompt-engineering",
                title: "Prompt Engineering Guide",
                desc: "Vertiefte Prompt-Techniken",
                color: "cyan"
              }
            ].map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-start gap-3 p-4 border-l-4 border-l-${link.color}-500 border rounded-lg hover:bg-muted/50 transition-colors group`}
              >
                <ExternalLink className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0 group-hover:text-primary" />
                <div>
                  <div className="font-semibold group-hover:text-primary transition-colors">{link.title}</div>
                  <div className="text-sm text-muted-foreground">{link.desc}</div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-xl p-8 text-center mt-12 border-2 border-orange-500/20">
          <h3 className="text-2xl font-bold mb-4">Copilot-Training für Ihr Team</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Lernen Sie in praxisorientierten Workshops, wie Sie Microsoft 365 Copilot optimal nutzen
            und diese Tipps im Arbeitsalltag anwenden.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
          >
            Workshop anfragen
          </a>
        </div>
              <AuthorBio author={author} />
      </ContentLayout>
    </>
  );
};

export default CopilotTippsTricks;

import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { TrustBadge } from "@/components/TrustBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Zap, AlertTriangle, Shield, Database, Users, TrendingUp,
  ExternalLink, Linkedin, Mail, CheckCircle2, XCircle, Building2,
  Lock, Network, BookOpen, Workflow, Scale, BrainCircuit, AlertCircle
} from "lucide-react";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";

const SLUG = "copilot-unternehmensweit-einfuehren";
const PAGE_TITLE = "Warum Unternehmen Microsoft Copilot zentral einführen sollten";

const CopilotUnternehmensweitEinfuehren = () => {
  const martinLang = getAuthor('martin-lang')!;

  const ids = generateSchemaIds(SLUG, 'wissen');
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const tableOfContents = [
    { id: "definition", title: "Was bedeutet zentrale Copilot-Einführung?", level: 2 },
    { id: "kernaussagen", title: "Kernaussagen für Entscheider", level: 2 },
    { id: "sicherheit", title: "Sicherheit: Shadow-IT vermeiden", level: 2 },
    { id: "dsgvo", title: "DSGVO und Compliance", level: 2 },
    { id: "grounding", title: "Grounding und Unternehmensdaten", level: 2 },
    { id: "skalierbarkeit", title: "Skalierbarkeit und Synergien", level: 2 },
    { id: "praxis-szenarien", title: "Praxis-Szenarien", level: 2 },
    { id: "implementierung", title: "Implementierung im Unternehmen", level: 2 },
    { id: "typische-fehler", title: "Typische Fehler", level: 2 },
    { id: "entscheidungshilfe", title: "Entscheidungshilfe", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
    { id: "quellen", title: "Quellen und Links", level: 2 }
  ];

  const faqs = [
    {
      name: "Können einzelne Abteilungen nicht einfach selbst mit KI-Tools experimentieren?",
      answer: "Technisch ja, aber strategisch ist das riskant. Wenn Mitarbeiter eigenständig ChatGPT, Claude oder andere Tools nutzen, entstehen Datenschutzrisiken, da vertrauliche Unternehmensdaten in externe Systeme gelangen können. Außerdem fehlt die Möglichkeit, Wissen und Prompts unternehmensweit zu teilen. Microsoft Copilot bietet durch die Integration in Microsoft 365 einen sicheren Rahmen – aber nur, wenn es zentral eingeführt und geschult wird."
    },
    {
      name: "Ist Microsoft Copilot wirklich sicherer als andere KI-Tools?",
      answer: "Ja, weil Copilot in der Microsoft 365 Compliance-Boundary arbeitet. Daten verlassen nicht die bestehende Tenant-Struktur, Berechtigungen werden automatisch berücksichtigt, und es gibt keine Nutzung von Kundendaten für Modell-Training. ChatGPT, Claude und andere Consumer-Tools bieten diese Garantien nicht standardmäßig."
    },
    {
      name: "Wie lange dauert eine unternehmensweite Copilot-Einführung?",
      answer: "Typischerweise 3-6 Monate für einen strukturierten Rollout: Pilotphase (4-6 Wochen), Schulung der Kerngruppen (2-4 Wochen), Rollout auf weitere Abteilungen (6-8 Wochen), Nachschulung und Optimierung (laufend). Der entscheidende Faktor ist nicht die technische Bereitstellung, sondern das Change Management und Training."
    },
    {
      name: "Lohnt sich die Investition in zentrale Schulungen?",
      answer: "Laut Forrester liegt der ROI bei 132-353% über drei Jahre. Die Gartner-Studie zeigt jedoch: 72% der Nutzer kämpfen ohne Training mit der Alltags-Integration. Die Schulungsinvestition entscheidet darüber, ob die Lizenzkosten zu echtem Produktivitätsgewinn führen oder verschwendet werden."
    },
    {
      name: "Was ist der Unterschied zwischen Copilot und ChatGPT für Unternehmen?",
      answer: "Microsoft Copilot ist nativ in Microsoft 365 integriert und nutzt Ihre bestehenden Unternehmensdaten (E-Mails, Dokumente, Teams-Chats) als Kontext. ChatGPT hat keinen Zugriff auf diese Daten und kann daher keine unternehmensspezifischen Antworten liefern. Zudem bietet Copilot Governance-Funktionen, Audit-Logs und die Möglichkeit, eigene Copilot-Agenten zu erstellen."
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": ids.article,
        "headline": PAGE_TITLE,
        "description": "Warum Shadow-IT bei KI gefährlich ist und wie eine zentrale Microsoft Copilot Einführung Sicherheit, DSGVO-Konformität und unternehmensweite Synergien gewährleistet.",
        "author": getAuthorSchemaMarkup(martinLang),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization"
        },
        "datePublished": "2026-02-02",
        "dateModified": "2026-02-02",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": pageUrl
        },
        "keywords": [
          "Microsoft Copilot Einführung",
          "Copilot Rollout Unternehmen",
          "KI Strategie Unternehmen",
          "Shadow IT KI",
          "Copilot DSGVO",
          "Microsoft 365 Copilot Sicherheit"
        ]
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
        title="Warum Microsoft Copilot unternehmensweit einführen? | copilotenschule.de"
        description="Warum Shadow-IT bei KI gefährlich ist: Zentrale Copilot-Einführung sichert DSGVO-Konformität, Grounding mit Unternehmensdaten und unternehmensweite Synergien."
        keywords={[
          "Microsoft Copilot Einführung",
          "Copilot Rollout Unternehmen",
          "KI Strategie Unternehmen",
          "Shadow IT KI",
          "Copilot DSGVO",
          "Microsoft 365 Copilot Sicherheit",
          "Copilot Grounding",
          "Copilot Agenten",
          "KI Governance",
          "Copilot Training Unternehmen",
          "Microsoft 365 KI",
          "Enterprise KI Einführung"
        ]}
        canonicalUrl={pageUrl}
        schema={schema}
        author={martinLang}
        publishedTime="2026-02-02T10:00:00+01:00"
        modifiedTime="2026-02-02T10:00:00+01:00"
      />

      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "Copilot zentral einführen", href: `/wissen/${SLUG}` }
        ]}
        title={PAGE_TITLE}
        description="Warum Unternehmen KI nicht dem Zufall überlassen sollten: Sicherheit, DSGVO, Grounding und der Mehrwert einer koordinierten Copilot-Strategie."
        lastUpdated="02. Februar 2026"
        readTime="12 Minuten"
        tableOfContents={tableOfContents}
      >
        {/* Schnellantwort */}
        <Card className="mb-8 border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-amber-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-orange-600" />
              Schnellantwort
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base leading-relaxed">
              <strong>Eine zentrale Microsoft Copilot Einführung ist kein Nice-to-have, sondern strategische Notwendigkeit.</strong>{" "}
              Wenn einzelne Mitarbeiter eigenständig KI-Tools nutzen, entstehen Sicherheitsrisiken (Datenabfluss),
              Compliance-Probleme (DSGVO) und verpasste Synergien (kein gemeinsames Wissen). Microsoft 365 Copilot
              bietet als einzige Lösung natives Grounding mit Unternehmensdaten, einheitliche Governance und
              die Möglichkeit, unternehmenseigene Agenten zu entwickeln – aber nur bei strukturierter Einführung.
            </p>
          </CardContent>
        </Card>

        {/* Definition */}
        <section id="definition">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-blue-500 text-blue-700 dark:text-blue-400">
            Was bedeutet zentrale Copilot-Einführung?
          </h2>

          <p className="mb-6">
            Eine <strong>zentrale Copilot-Einführung</strong> bedeutet, dass Unternehmen Microsoft 365 Copilot
            als strategisches KI-Tool für alle Mitarbeiter bereitstellen – mit einheitlicher Governance,
            koordiniertem Rollout und professionellem Training. Das Gegenteil ist die sogenannte <strong>Shadow-IT</strong>:
            Mitarbeiter nutzen eigenständig ChatGPT, Claude oder andere Tools, ohne Freigabe durch IT oder Datenschutz.
          </p>

          <Card className="my-6 border-2 border-blue-500/20">
            <CardHeader className="bg-gradient-to-r from-blue-500/10 to-blue-600/10">
              <CardTitle className="text-base flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Zentral vs. Dezentral: Der Unterschied
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-red-600 dark:text-red-400 mb-3 flex items-center gap-2">
                    <XCircle className="w-4 h-4" /> Dezentral (Shadow-IT)
                  </h5>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">•</span>
                      Mitarbeiter nutzen beliebige KI-Tools
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">•</span>
                      Unternehmensdaten fließen in externe Systeme
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">•</span>
                      Keine Kontrolle über Prompts und Outputs
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">•</span>
                      Wissen bleibt bei Einzelpersonen
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">•</span>
                      Kein Zugriff auf interne Datenquellen
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-green-600 dark:text-green-400 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Zentral (Microsoft Copilot)
                  </h5>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">•</span>
                      Ein Tool für alle mit klaren Richtlinien
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">•</span>
                      Daten bleiben im Microsoft 365 Tenant
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">•</span>
                      Audit-Logs und Governance-Funktionen
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">•</span>
                      Gemeinsame Prompt-Bibliotheken möglich
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">•</span>
                      Grounding mit SharePoint, OneDrive, Teams
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Kernaussagen für Entscheider */}
        <section id="kernaussagen" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-indigo-500 text-indigo-700 dark:text-indigo-400">
            Kernaussagen für Entscheider
          </h2>

          <div className="space-y-4 my-6">
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="pt-6">
                <p className="font-semibold mb-2">1. Faktische Kernaussage</p>
                <p className="text-muted-foreground mb-3">
                  Microsoft 365 Copilot ist das einzige KI-Tool, das natives Grounding mit Unternehmensdaten
                  (E-Mails, Dokumente, Teams-Chats) bietet und dabei in der Microsoft 365 Compliance-Boundary bleibt.
                </p>
                <p className="font-semibold mb-2">Praktische Konsequenz</p>
                <p className="text-muted-foreground mb-3">
                  Nur mit Copilot können Mitarbeiter fragen: "Fasse alle E-Mails von letzter Woche zum Projekt X zusammen"
                  – ohne Daten manuell zu kopieren oder Sicherheitsrisiken einzugehen.
                </p>
                <p className="font-semibold mb-2">Typischer Fehler</p>
                <p className="text-muted-foreground">
                  Unternehmen erlauben ChatGPT für "einfache Aufgaben" und merken nicht, dass Mitarbeiter
                  vertrauliche Informationen hineinkopieren, um bessere Ergebnisse zu erhalten.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardContent className="pt-6">
                <p className="font-semibold mb-2">2. Faktische Kernaussage</p>
                <p className="text-muted-foreground mb-3">
                  Laut Gartner schaffen nur 6% der Unternehmen den Sprung vom Copilot-Pilot zum unternehmensweiten Rollout.
                  72% kämpfen mit der Alltags-Integration.
                </p>
                <p className="font-semibold mb-2">Praktische Konsequenz</p>
                <p className="text-muted-foreground mb-3">
                  Erfolgreiche Einführung erfordert strukturiertes Training und Change Management –
                  nicht nur die technische Bereitstellung von Lizenzen.
                </p>
                <p className="font-semibold mb-2">Typischer Fehler</p>
                <p className="text-muted-foreground">
                  Lizenzen werden verteilt ohne Schulung. Nach 3 Monaten nutzen nur noch 10% der Mitarbeiter
                  Copilot regelmäßig – der Rest hat aufgegeben.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardContent className="pt-6">
                <p className="font-semibold mb-2">3. Faktische Kernaussage</p>
                <p className="text-muted-foreground mb-3">
                  Mit Copilot Studio können Unternehmen eigene KI-Agenten erstellen, die auf interne Datenquellen
                  zugreifen – SharePoint-Wikis, Datenbanken, APIs.
                </p>
                <p className="font-semibold mb-2">Praktische Konsequenz</p>
                <p className="text-muted-foreground mb-3">
                  Ein "Onboarding-Agent" beantwortet neuen Mitarbeitern Fragen zu Urlaubsregelungen, IT-Prozessen
                  und Ansprechpartnern – basierend auf aktuellen internen Dokumenten.
                </p>
                <p className="font-semibold mb-2">Typischer Fehler</p>
                <p className="text-muted-foreground">
                  Unternehmen ignorieren Copilot Studio und verschenken das Potenzial für automatisierte
                  Self-Service-Prozesse, die Hunderte Support-Anfragen pro Monat einsparen könnten.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Sicherheit */}
        <section id="sicherheit" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-red-500 text-red-700 dark:text-red-400">
            Sicherheit: Shadow-IT vermeiden
          </h2>

          <p className="mb-6">
            Der größte Risikofaktor bei KI ist nicht die Technologie selbst, sondern der unkontrollierte Einsatz.
            Wenn Mitarbeiter eigenständig ChatGPT oder andere Tools nutzen, entstehen Sicherheitslücken,
            die selbst die beste IT-Infrastruktur aushebeln.
          </p>

          <Card className="my-6 border-l-4 border-l-red-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="w-5 h-5 text-red-600" />
                Das Shadow-IT Problem
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="font-semibold text-red-900 dark:text-red-100 mb-2">❌ Was passiert:</p>
                  <p className="text-sm text-red-800 dark:text-red-200">
                    Ein Vertriebsmitarbeiter kopiert eine Kundenliste in ChatGPT, um eine personalisierte
                    E-Mail-Kampagne zu erstellen. Die Daten werden auf OpenAI-Servern verarbeitet –
                    außerhalb der Unternehmenskontrolle. Bei einem Datenleck haftet das Unternehmen.
                  </p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="font-semibold text-green-900 dark:text-green-100 mb-2">✓ Mit Microsoft Copilot:</p>
                  <ul className="text-sm text-green-800 dark:text-green-200 space-y-2">
                    <li>• Daten bleiben im Microsoft 365 Tenant</li>
                    <li>• Keine Nutzung für KI-Modell-Training durch Microsoft</li>
                    <li>• Bestehende Berechtigungen werden automatisch berücksichtigt</li>
                    <li>• Audit-Logs dokumentieren jede Copilot-Interaktion</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <blockquote className="my-6 border-l-4 border-primary bg-primary/5 p-6 rounded-r-lg italic text-lg">
            Die Erfahrung zeigt: Unternehmen, die KI-Nutzung nicht regulieren, haben faktisch bereits
            Shadow-IT – sie wissen es nur nicht. Die Frage ist nicht ob, sondern welche Daten bereits
            in externen KI-Systemen gelandet sind.
          </blockquote>
        </section>

        {/* DSGVO */}
        <section id="dsgvo" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-purple-500 text-purple-700 dark:text-purple-400">
            DSGVO und Compliance
          </h2>

          <p className="mb-6">
            Die Datenschutz-Grundverordnung stellt klare Anforderungen an die Verarbeitung personenbezogener Daten.
            Bei KI-Tools entsteht oft eine rechtliche Grauzone – es sei denn, Sie nutzen ein Tool, das von Anfang an
            für Enterprise-Compliance konzipiert wurde.
          </p>

          <Card className="my-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Scale className="w-5 h-5 text-purple-600" />
                Compliance-Vergleich: Copilot vs. ChatGPT
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Kriterium</th>
                      <th className="text-center py-3 px-4">Microsoft Copilot</th>
                      <th className="text-center py-3 px-4">ChatGPT (Free/Plus)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4">Datenverarbeitung in EU</td>
                      <td className="text-center py-3 px-4"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                      <td className="text-center py-3 px-4"><XCircle className="w-5 h-5 text-red-500 mx-auto" /></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Keine Nutzung für Modell-Training</td>
                      <td className="text-center py-3 px-4"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                      <td className="text-center py-3 px-4"><XCircle className="w-5 h-5 text-red-500 mx-auto" /></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Auftragsverarbeitungsvertrag (AVV)</td>
                      <td className="text-center py-3 px-4"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                      <td className="text-center py-3 px-4"><XCircle className="w-5 h-5 text-red-500 mx-auto" /></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Audit-Logs verfügbar</td>
                      <td className="text-center py-3 px-4"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                      <td className="text-center py-3 px-4"><XCircle className="w-5 h-5 text-red-500 mx-auto" /></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Integration mit bestehender Governance</td>
                      <td className="text-center py-3 px-4"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                      <td className="text-center py-3 px-4"><XCircle className="w-5 h-5 text-red-500 mx-auto" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Grounding */}
        <section id="grounding" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-cyan-500 text-cyan-700 dark:text-cyan-400">
            Grounding und Unternehmensdaten
          </h2>

          <p className="mb-6">
            <strong>Grounding</strong> bezeichnet die Fähigkeit eines KI-Systems, Antworten auf Basis aktueller,
            unternehmensspezifischer Daten zu generieren. Microsoft Copilot nutzt dafür den Microsoft Graph –
            die Verbindung zu all Ihren Microsoft 365 Daten.
          </p>

          <Card className="my-6 border-2 border-cyan-500/20">
            <CardHeader className="bg-gradient-to-r from-cyan-500/10 to-cyan-600/10">
              <CardTitle className="text-base flex items-center gap-2">
                <Database className="w-5 h-5" />
                Was Copilot durch Grounding kann
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h5 className="font-semibold mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-cyan-600" /> E-Mails (Outlook)
                  </h5>
                  <p className="text-sm text-muted-foreground">
                    "Fasse alle E-Mails von letzer Woche zusammen, in denen es um das Budget ging."
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h5 className="font-semibold mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4 text-cyan-600" /> Meetings (Teams)
                  </h5>
                  <p className="text-sm text-muted-foreground">
                    "Was waren die Action Items aus dem letzten Projektmeeting?"
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h5 className="font-semibold mb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-cyan-600" /> Dokumente (SharePoint)
                  </h5>
                  <p className="text-sm text-muted-foreground">
                    "Erstelle eine Zusammenfassung unserer aktuellen Reiserichtlinie."
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h5 className="font-semibold mb-2 flex items-center gap-2">
                    <Network className="w-4 h-4 text-cyan-600" /> Chats (Teams)
                  </h5>
                  <p className="text-sm text-muted-foreground">
                    "Was hat das Team letzte Woche im Kanal besprochen?"
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="my-6 border-l-4 border-l-cyan-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BrainCircuit className="w-5 h-5 text-cyan-600" />
                Copilot Studio: Eigene Agenten erstellen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Mit <strong>Microsoft Copilot Studio</strong> können Unternehmen eigene KI-Agenten entwickeln,
                die auf zusätzliche Datenquellen zugreifen:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Intranet-Wikis</strong> – Der Agent beantwortet HR-Fragen basierend auf internen Richtlinien</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Datenbanken</strong> – Der Agent liefert Echtzeit-Kennzahlen aus dem ERP-System</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                  <span><strong>APIs</strong> – Der Agent bucht Besprechungsräume oder erstellt Support-Tickets</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Skalierbarkeit */}
        <section id="skalierbarkeit" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-green-500 text-green-700 dark:text-green-400">
            Skalierbarkeit und Synergien
          </h2>

          <p className="mb-6">
            Der größte Vorteil einer zentralen Copilot-Einführung liegt in den Netzwerkeffekten:
            Je mehr Mitarbeiter das gleiche Tool nutzen, desto größer der Mehrwert für alle.
          </p>

          {/* Statistik-Grid */}
          <Card className="my-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Verifizierte ROI-Zahlen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    metric: "132-353%",
                    label: "ROI über 3 Jahre",
                    detail: "für kleine und mittlere Unternehmen",
                    color: "green",
                    quelle: "Forrester TEI Study"
                  },
                  {
                    metric: "77%",
                    label: "berichten höhere Produktivität",
                    detail: "bei trainierten Copilot-Nutzern",
                    color: "blue",
                    quelle: "Microsoft Work Trend Index"
                  },
                  {
                    metric: "9h",
                    label: "Zeitersparnis pro Monat",
                    detail: "pro Nutzer",
                    color: "cyan",
                    quelle: "Forrester TEI Study"
                  }
                ].map((stat, idx) => (
                  <div key={idx} className={`p-5 border-2 border-${stat.color}-500/30 rounded-xl text-center bg-gradient-to-br from-${stat.color}-500/5 to-${stat.color}-600/10`}>
                    <div className={`text-4xl font-bold text-${stat.color}-600 dark:text-${stat.color}-400`}>{stat.metric}</div>
                    <div className="font-semibold mt-2">{stat.label}</div>
                    <div className="text-sm text-muted-foreground mt-1">{stat.detail}</div>
                    <div className="text-xs text-muted-foreground mt-2 italic">Quelle: {stat.quelle}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="my-6 border-2 border-green-500/20">
            <CardHeader className="bg-gradient-to-r from-green-500/10 to-green-600/10">
              <CardTitle className="text-base">Synergien durch gemeinsame Infrastruktur</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Gemeinsame Prompt-Bibliotheken</strong>
                    <p className="text-muted-foreground">Bewährte Prompts werden unternehmensweit geteilt – ein Team entwickelt, alle profitieren.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Abteilungsübergreifende Agenten</strong>
                    <p className="text-muted-foreground">Ein HR-Agent beantwortet Fragen für alle Mitarbeiter, nicht nur für eine Abteilung.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Einheitliche Schulung</strong>
                    <p className="text-muted-foreground">Alle Mitarbeiter lernen die gleichen Techniken – Wissenstransfer wird einfacher.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Zentrale Governance</strong>
                    <p className="text-muted-foreground">Eine Richtlinie, ein Audit-Log, ein Ansprechpartner – statt Wildwuchs in jeder Abteilung.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Praxis-Szenarien */}
        <section id="praxis-szenarien" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-orange-500 text-orange-700 dark:text-orange-400">
            Praxis-Szenarien
          </h2>

          {/* Szenario 1 */}
          <Card className="my-6 border-l-4 border-l-red-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                Szenario 1: Der Vertrieb nutzt ChatGPT
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="font-semibold text-red-900 dark:text-red-100 mb-2">❌ Problem:</p>
                  <p className="text-sm text-red-800 dark:text-red-200">
                    Das Vertriebsteam nutzt ChatGPT, um Angebote zu formulieren. Sie kopieren Kundennamen,
                    Projektdetails und Preise in das Tool. Die Daten liegen nun auf OpenAI-Servern –
                    ohne Auftragsverarbeitungsvertrag, ohne Kontrolle.
                  </p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="font-semibold text-green-900 dark:text-green-100 mb-2">✓ Lösung mit Copilot:</p>
                  <ul className="text-sm text-green-800 dark:text-green-200 space-y-2">
                    <li>• Copilot greift auf CRM-Daten zu, ohne dass Mitarbeiter sie kopieren müssen</li>
                    <li>• Angebote werden im Word-Copilot erstellt – Daten bleiben im Tenant</li>
                    <li>• Bestehende Berechtigungen werden berücksichtigt (Vertraulichkeitsstufen)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Szenario 2 */}
          <Card className="my-6 border-l-4 border-l-amber-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                Szenario 2: Jede Abteilung macht ihr eigenes Ding
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg">
                  <p className="font-semibold text-amber-900 dark:text-amber-100 mb-2">❌ Problem:</p>
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    Marketing nutzt ChatGPT, Entwicklung nutzt GitHub Copilot, HR nutzt Claude.
                    Drei verschiedene Tools, drei verschiedene Lernkurven, kein Wissenstransfer.
                    Wenn ein Mitarbeiter die Abteilung wechselt, muss er von vorne anfangen.
                  </p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="font-semibold text-green-900 dark:text-green-100 mb-2">✓ Lösung mit zentraler Copilot-Einführung:</p>
                  <ul className="text-sm text-green-800 dark:text-green-200 space-y-2">
                    <li>• Ein Tool für alle Abteilungen (mit GitHub Copilot für Entwickler)</li>
                    <li>• Gemeinsame Schulungen schaffen einheitliche Kompetenz</li>
                    <li>• Best Practices werden in einer zentralen Prompt-Bibliothek gesammelt</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Szenario 3 */}
          <Card className="my-6 border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertTriangle className="w-5 h-5 text-blue-600" />
                Szenario 3: Lizenzen ohne Training
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <p className="font-semibold text-blue-900 dark:text-blue-100 mb-2">❌ Problem:</p>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Das Unternehmen kauft 500 Copilot-Lizenzen und verteilt sie per E-Mail.
                    Ohne Schulung probieren Mitarbeiter das Tool kurz aus, sind frustriert
                    von den Ergebnissen und kehren zu ihren alten Arbeitsweisen zurück.
                  </p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="font-semibold text-green-900 dark:text-green-100 mb-2">✓ Lösung mit strukturiertem Rollout:</p>
                  <ul className="text-sm text-green-800 dark:text-green-200 space-y-2">
                    <li>• Pilotgruppe von 20-50 Power-Usern startet mit intensivem Training</li>
                    <li>• Diese werden zu internen Champions, die andere Mitarbeiter unterstützen</li>
                    <li>• Schrittweise Erweiterung mit begleitender Schulung</li>
                    <li>• Regelmäßige Nachschulungen und Best-Practice-Sessions</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Implementierung */}
        <section id="implementierung" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-emerald-500 text-emerald-700 dark:text-emerald-400">
            Implementierung im Unternehmen
          </h2>

          <p className="mb-6">
            Eine erfolgreiche Copilot-Einführung folgt einem strukturierten Prozess. Die technische
            Bereitstellung ist dabei der kleinste Teil – Change Management und Training machen den Unterschied.
          </p>

          <div className="space-y-4 my-6">
            {[
              {
                phase: "Phase 1: Vorbereitung",
                zeitraum: "Woche 1-2",
                farbe: "blue",
                inhalte: [
                  "Governance-Framework definieren (Richtlinien, Berechtigungen)",
                  "Datenqualität prüfen (SharePoint-Struktur, Berechtigungen)",
                  "Pilotgruppe auswählen (20-50 motivierte Power-User)",
                  "Erfolgsmetriken festlegen (wie wird Erfolg gemessen?)"
                ]
              },
              {
                phase: "Phase 2: Pilot & Training",
                zeitraum: "Woche 3-6",
                farbe: "orange",
                inhalte: [
                  "Intensives Training für Pilotgruppe (Prompt Engineering, Use Cases)",
                  "Begleitung durch Experten während der ersten Wochen",
                  "Feedback sammeln und Richtlinien anpassen",
                  "Interne Champions identifizieren und aufbauen"
                ]
              },
              {
                phase: "Phase 3: Rollout",
                zeitraum: "Woche 7-14",
                farbe: "green",
                inhalte: [
                  "Schrittweise Erweiterung auf weitere Abteilungen",
                  "Train-the-Trainer: Champions schulen Kollegen",
                  "Prompt-Bibliothek mit bewährten Use Cases aufbauen",
                  "Support-Struktur etablieren (FAQ, Ansprechpartner)"
                ]
              },
              {
                phase: "Phase 4: Optimierung",
                zeitraum: "Laufend",
                farbe: "purple",
                inhalte: [
                  "Nutzungsanalyse (wer nutzt was, wo gibt es Hürden?)",
                  "Nachschulungen für neue Funktionen",
                  "Copilot Studio: Erste eigene Agenten entwickeln",
                  "ROI-Messung und Reporting an Geschäftsführung"
                ]
              }
            ].map((p, idx) => (
              <Card key={idx} className={`border-l-4 border-l-${p.farbe}-500`}>
                <CardHeader className={`bg-gradient-to-r from-${p.farbe}-500/10 to-${p.farbe}-600/5`}>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <CardTitle className={`text-lg text-${p.farbe}-700 dark:text-${p.farbe}-400`}>
                      {p.phase}
                    </CardTitle>
                    <span className="text-sm text-muted-foreground">{p.zeitraum}</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-2 text-sm">
                    {p.inhalte.map((i, iidx) => (
                      <li key={iidx} className="flex items-start gap-2">
                        <CheckCircle2 className={`w-4 h-4 text-${p.farbe}-600 mt-0.5 flex-shrink-0`} />
                        {i}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Typische Fehler */}
        <section id="typische-fehler" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-red-500 text-red-700 dark:text-red-400">
            Typische Fehler
          </h2>

          <div className="grid md:grid-cols-2 gap-4 my-6">
            {[
              {
                fehler: "Lizenzen verteilen ohne Schulung",
                konsequenz: "72% der Nutzer kämpfen mit der Alltags-Integration, Engagement sinkt schnell",
                quelle: "Gartner Survey 2024"
              },
              {
                fehler: "Shadow-IT tolerieren",
                konsequenz: "Unternehmensdaten fließen unkontrolliert in externe KI-Systeme, DSGVO-Risiko",
                quelle: null
              },
              {
                fehler: "Copilot Studio ignorieren",
                konsequenz: "Potenzial für automatisierte Self-Service-Prozesse wird verschenkt",
                quelle: null
              },
              {
                fehler: "Keine Governance definieren",
                konsequenz: "Wildwuchs bei Nutzung, keine einheitlichen Standards, Compliance-Probleme",
                quelle: null
              },
              {
                fehler: "Nur IT entscheidet",
                konsequenz: "Fachabteilungen werden nicht eingebunden, Use Cases entsprechen nicht der Realität",
                quelle: null
              },
              {
                fehler: "Erfolg nicht messen",
                konsequenz: "Keine Argumente für weitere Investitionen, Budget wird gestrichen",
                quelle: null
              }
            ].map((item, idx) => (
              <Card key={idx} className="border-l-4 border-l-red-500">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-red-700 dark:text-red-400">{item.fehler}</p>
                      <p className="text-sm text-muted-foreground mt-1">{item.konsequenz}</p>
                      {item.quelle && (
                        <p className="text-xs text-muted-foreground mt-2 italic">Quelle: {item.quelle}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Entscheidungshilfe */}
        <section id="entscheidungshilfe" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-amber-500 text-amber-700 dark:text-amber-400">
            Entscheidungshilfe: Wann zentrale Einführung?
          </h2>

          <Card className="my-6 border-2 border-amber-500/20">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-green-600 dark:text-green-400 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" /> Zentrale Einführung sinnvoll, wenn:
                  </h5>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      Sie bereits Microsoft 365 nutzen
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      Mitarbeiter bereits ChatGPT o.ä. nutzen (Shadow-IT)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      Sie DSGVO-Konformität sicherstellen müssen
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      Sie mehr als 50 Wissensarbeiter haben
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      Sie KI als strategisches Tool etablieren wollen
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-amber-600 dark:text-amber-400 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" /> Noch warten, wenn:
                  </h5>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500">!</span>
                      Sie noch kein Microsoft 365 nutzen
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500">!</span>
                      Ihre Daten chaotisch organisiert sind (SharePoint-Chaos)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500">!</span>
                      Kein Budget für begleitendes Training vorhanden
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500">!</span>
                      Geschäftsführung KI als "Spielerei" betrachtet
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500">!</span>
                      Keine Ressourcen für Change Management
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* FAQ */}
        <section id="faq" className="mt-12 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-slate-500 text-slate-700 dark:text-slate-400">
            Häufig gestellte Fragen (FAQ)
          </h2>

          <div className="space-y-4 my-6">
            {faqs.map((faq, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">{faq.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quellen */}
        <section id="quellen" className="mt-12 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-slate-500 text-slate-700 dark:text-slate-400">
            Quellen und weiterführende Links
          </h2>
          <p className="text-muted-foreground mb-6">
            Studien und offizielle Ressourcen, auf die sich dieser Artikel stützt.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                titel: "Gartner: Copilot Impact Assessment",
                beschreibung: "Unabhängige Analyse: 72% kämpfen mit Alltags-Integration, nur 6% schaffen Large-Scale Rollout",
                url: "https://www.gartner.com/en/documents/5659223"
              },
              {
                titel: "Forrester TEI Study: Microsoft 365 Copilot",
                beschreibung: "Total Economic Impact™ Studie mit ROI-Zahlen (132-353%) und Zeitersparnis (9h/Monat)",
                url: "https://tei.forrester.com/go/microsoft/M365Copilot/?lang=en-us"
              },
              {
                titel: "Microsoft Work Trend Index",
                beschreibung: "Produktivitätsstudie: 77% berichten höhere Produktivität mit Copilot",
                url: "https://www.microsoft.com/en-us/worklab/work-trend-index/copilots-earliest-users-teach-us-about-generative-ai-at-work"
              },
              {
                titel: "Microsoft 365 Copilot Compliance",
                beschreibung: "Offizielle Dokumentation zu Datenschutz, Sicherheit und Compliance",
                url: "https://learn.microsoft.com/de-de/copilot/microsoft-365/microsoft-365-copilot-privacy"
              }
            ].map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-4 border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-colors group"
              >
                <ExternalLink className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold group-hover:text-primary transition-colors">{link.titel}</div>
                  <div className="text-sm text-muted-foreground">{link.beschreibung}</div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <TrustBadge />
                  <div className="mb-3">
                    <div className="text-sm font-semibold mb-2">Expertise:</div>
                    <div className="flex flex-wrap gap-2">
                      {martinLang.expertise.map((exp, idx) => (
                        <span key={idx} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    {martinLang.linkedin && (
                      <a href={martinLang.linkedin} target="_blank" rel="noopener noreferrer"
                         className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
                        <Linkedin className="w-4 h-4" /> LinkedIn
                      </a>
                    )}
                    {martinLang.email && (
                      <a href={`mailto:${martinLang.email}`}
                         className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
                        <Mail className="w-4 h-4" /> Kontakt
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-xl p-8 text-center my-12 border-2 border-orange-500/20">
          <h3 className="text-2xl font-bold mb-4">Bereit für eine strategische Copilot-Einführung?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Wir begleiten Ihr Unternehmen von der Pilotphase bis zum unternehmensweiten Rollout –
            mit praxisnahen Trainings, Change Management und nachhaltiger Adoption.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Kostenlose Erstberatung anfragen
          </a>
        </div>
      </ContentLayout>
    </>
  );
};

export default CopilotUnternehmensweitEinfuehren;

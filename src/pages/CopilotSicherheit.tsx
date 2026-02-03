import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";
import {
  Zap, Shield, Lock, CheckCircle2, AlertTriangle, ExternalLink,
  Linkedin, Twitter, XCircle, Eye, FileText, Users, Server,
  ShieldCheck, FileWarning, Scale, Target, Settings, Key
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrustBadge } from "@/components/TrustBadge";

const SLUG = "wissen/copilot-sicherheit-datenschutz";
const PAGE_TITLE = "Microsoft Copilot Datenschutz & Sicherheit";

const CopilotSicherheit = () => {
  const author = getAuthor("martin-lang");

  const tableOfContents = [
    { id: "definition", title: "Was bedeutet Copilot-Sicherheit?", level: 2 },
    { id: "dsgvo-compliance", title: "DSGVO-Compliance im Detail", level: 2 },
    { id: "praxis-szenarien", title: "3 Praxis-Szenarien: Problem → Lösung", level: 2 },
    { id: "enterprise-data-protection", title: "Enterprise Data Protection (EDP)", level: 2 },
    { id: "implementierung", title: "So implementieren Sie es richtig", level: 2 },
    { id: "typische-fehler", title: "5 typische Fehler vermeiden", level: 2 },
    { id: "entscheidungshilfe", title: "Entscheidungshilfe für IT-Verantwortliche", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
    { id: "quellen", title: "Quellen und Links", level: 2 }
  ];

  const ids = generateSchemaIds(SLUG, 'wissen');
  const pageUrl = `https://copilotenschule.de/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const faqs = [
    {
      name: "Werden meine Unternehmensdaten zum Training von Copilot verwendet?",
      answer: "Nein. Microsoft nutzt Ihre Unternehmensdaten nicht zum Training von Foundation LLMs. Eingaben, Antworten und Daten aus Microsoft Graph werden ausschließlich innerhalb Ihres Tenants verarbeitet. Dies ist vertraglich in den Microsoft DPA-Bedingungen festgehalten."
    },
    {
      name: "Kann Copilot auf Daten zugreifen, die ich nicht sehen darf?",
      answer: "Nein. Copilot respektiert alle Microsoft 365-Berechtigungen. Sie sehen nur Informationen, auf die Sie auch ohne Copilot Zugriff hätten. Allerdings macht Copilot Oversharing-Probleme sichtbarer – deshalb ist eine Berechtigungsprüfung vor dem Rollout kritisch."
    },
    {
      name: "Brauche ich eine Datenschutz-Folgenabschätzung (DSFA) für Copilot?",
      answer: "In den meisten Fällen ja. Da Copilot eine neue Technologie darstellt und personenbezogene Daten verarbeitet, ist eine DSFA nach Art. 35 DSGVO empfehlenswert. Microsoft bietet seit November 2025 offizielle DSFA-Vorlagen in Zusammenarbeit mit deutschen Datenschutzbehörden."
    },
    {
      name: "Ist Microsoft Copilot für EU-Unternehmen geeignet?",
      answer: "Ja. Microsoft bietet die EU Data Boundary, die sicherstellt, dass EU-Kundendaten innerhalb der EU verarbeitet werden. Copilot erfüllt DSGVO, ISO 27001 und seit 2025 auch ISO 42001 für KI-Managementsysteme."
    },
    {
      name: "Was ist mit der EchoLeak-Sicherheitslücke?",
      answer: "Die EchoLeak-Schwachstelle (CVE-2025-32711) wurde Anfang 2025 entdeckt und von Microsoft sofort gepatcht. Es gab keine bekannten Ausnutzungen in freier Wildbahn. Dies zeigt, dass auch bei Enterprise-Software regelmäßige Updates wichtig sind."
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": ids.article,
        "headline": "Microsoft Copilot Datenschutz & Sicherheit: DSGVO-konform einsetzen (2026)",
        "description": "Copilot DSGVO-konform einführen: Enterprise Data Protection, EU Data Boundary, DSFA-Vorlagen, Governance-Richtlinien. Aktueller Praxis-Leitfaden für IT-Entscheider mit dem neuen M365-Kit.",
        "author": getAuthorSchemaMarkup(author),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization"
        },
        "datePublished": "2025-11-11",
        "dateModified": "2026-02-03",
        "keywords": ["Microsoft Copilot Sicherheit", "Copilot Datenschutz", "Copilot DSGVO", "Copilot Enterprise Data Protection", "Copilot Zero Trust", "M365-Kit Datenschutz", "DSFA Copilot"],
        "articleSection": "Sicherheit",
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
        title="Microsoft Copilot Datenschutz & Sicherheit: DSGVO-konform einsetzen (2026)"
        description="Copilot DSGVO-konform einführen: Enterprise Data Protection, EU Data Boundary, DSFA-Vorlagen, Governance-Richtlinien. Aktueller Praxis-Leitfaden für IT-Entscheider."
        keywords={["Microsoft Copilot Sicherheit", "Copilot Datenschutz", "Copilot DSGVO Compliance", "Microsoft 365 Copilot Governance", "Copilot Zero Trust", "Copilot Enterprise Data Protection", "M365-Kit", "DSFA Copilot"]}
        canonicalUrl={pageUrl}
        author={author}
        publishedTime="2025-11-11"
        modifiedTime="2026-02-03T10:00:00+01:00"
        schema={schema}
      />
      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: PAGE_TITLE, href: `/${SLUG}` }
        ]}
        title="Microsoft Copilot: Sicherheit & Datenschutz für Unternehmen"
        description="Der aktuelle Leitfaden für IT-Entscheider zu DSGVO-Compliance, Enterprise Data Protection und dem neuen M365-Kit von Microsoft."
        lastUpdated="03. Februar 2026"
        readTime="14 Minuten"
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
              <strong>Microsoft Copilot ist DSGVO-konform</strong> und bietet Enterprise-Grade-Sicherheit mit ISO 27001, ISO 42001 (KI), TISAX, C5 und EU Data Boundary.
              Ihre Daten werden <em>nicht</em> zum Training verwendet. Seit November 2025 gibt es das offizielle <strong>M365-Kit</strong> – entwickelt mit deutschen Datenschutzbehörden –
              das DSFA-Vorlagen und Compliance-Dokumentation bietet. Kritisch bleibt: Vor dem Rollout müssen <strong>Berechtigungen geprüft</strong> werden,
              da Copilot Oversharing-Probleme sichtbar macht.
            </p>
          </CardContent>
        </Card>

        {/* Definition */}
        <section id="definition">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-blue-500 text-blue-700 dark:text-blue-400">
            Was bedeutet Copilot-Sicherheit?
          </h2>

          <p className="mb-6">
            Copilot-Sicherheit umfasst drei Dimensionen: <strong>Datenschutz</strong> (Einhaltung der DSGVO und lokaler Gesetze),
            <strong>Datensicherheit</strong> (technischer Schutz vor Zugriff und Verlust) und <strong>Governance</strong> (organisatorische Kontrolle über Nutzung und Richtlinien).
          </p>

          <div className="grid md:grid-cols-3 gap-4 my-6">
            {[
              {
                icon: <Scale className="w-8 h-8 text-purple-600" />,
                titel: "Datenschutz",
                detail: "DSGVO-Compliance, Verarbeitungsverzeichnis, DSFA, Betroffenenrechte",
                color: "purple"
              },
              {
                icon: <Shield className="w-8 h-8 text-blue-600" />,
                titel: "Datensicherheit",
                detail: "Verschlüsselung, Zero Trust, Berechtigungen, Audit Logs",
                color: "blue"
              },
              {
                icon: <Settings className="w-8 h-8 text-green-600" />,
                titel: "Governance",
                detail: "Richtlinien, DLP, Purview, Nutzungsüberwachung",
                color: "green"
              }
            ].map((item, idx) => (
              <Card key={idx} className={`border-2 border-${item.color}-500/30`}>
                <CardContent className="pt-6 text-center">
                  <div className="flex justify-center mb-3">{item.icon}</div>
                  <div className="font-bold text-lg">{item.titel}</div>
                  <div className="text-sm text-muted-foreground mt-2">{item.detail}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <blockquote className="my-6 border-l-4 border-primary bg-primary/5 p-6 rounded-r-lg italic text-lg">
            Die Erfahrung zeigt: Die größte Sicherheitslücke bei Copilot ist nicht die Technologie selbst,
            sondern fehlende oder falsch konfigurierte Berechtigungen in Microsoft 365.
          </blockquote>
        </section>

        {/* DSGVO-Compliance */}
        <section id="dsgvo-compliance" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-purple-500 text-purple-700 dark:text-purple-400">
            DSGVO-Compliance im Detail
          </h2>

          <p className="mb-6">
            Microsoft Copilot erfüllt alle DSGVO-Anforderungen für kommerzielle Kunden. Seit November 2025 bietet Microsoft
            zusätzlich das <strong>M365-Kit</strong>, entwickelt in Abstimmung mit dem Bayerischen Landesamt für Datenschutzaufsicht
            und dem Hessischen Beauftragten für Datenschutz.
          </p>

          <Card className="my-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="w-5 h-5 text-purple-600" />
                Neues M365-Kit (November 2025)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { titel: "DSFA-Vorlagen", beschreibung: "Anpassbare Datenschutz-Folgenabschätzungen für verschiedene Szenarien" },
                  { titel: "Verarbeitungsverzeichnis", beschreibung: "Dokumentation aller Copilot-Datenverarbeitungen" },
                  { titel: "Rechenschaftspflicht", beschreibung: "Nachweis der DSGVO-Konformität für Aufsichtsbehörden" },
                  { titel: "Cloud Compendium", beschreibung: "Technische Details zur Datenverarbeitung in der EU" }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800">
                    <p className="font-semibold text-purple-900 dark:text-purple-100">{item.titel}</p>
                    <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">{item.beschreibung}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="my-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <ShieldCheck className="w-5 h-5 text-green-600" />
                Zertifizierungen und Compliance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { name: "ISO 27001, 27017, 27018", desc: "Informationssicherheit", neu: false },
                  { name: "ISO 42001", desc: "KI-Managementsysteme", neu: true },
                  { name: "SOC 1, 2 und 3", desc: "Service Organization Controls", neu: false },
                  { name: "TISAX", desc: "Automotive (Europa)", neu: false },
                  { name: "C5", desc: "BSI Cloud Computing", neu: false },
                  { name: "EU Data Boundary", desc: "EU-Datenverarbeitung", neu: false }
                ].map((cert, idx) => (
                  <div key={idx} className="p-4 border rounded-lg text-center relative">
                    {cert.neu && (
                      <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">NEU</span>
                    )}
                    <CheckCircle2 className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <p className="font-semibold">{cert.name}</p>
                    <p className="text-xs text-muted-foreground">{cert.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Praxis-Szenarien */}
        <section id="praxis-szenarien" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-red-500 text-red-700 dark:text-red-400">
            3 Praxis-Szenarien: Problem → Lösung
          </h2>

          <div className="space-y-6">
            {/* Szenario 1 */}
            <Card className="border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Eye className="w-5 h-5 text-red-600" />
                  Szenario 1: Copilot zeigt vertrauliche Gehaltsdaten
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="font-semibold text-red-900 dark:text-red-100 mb-2 flex items-center gap-2">
                      <XCircle className="w-4 h-4" /> Das Problem:
                    </p>
                    <p className="text-sm text-red-800 dark:text-red-200">
                      Ein Mitarbeiter fragt Copilot: "Fasse die Diskussion zum Budget zusammen."
                      Copilot antwortet mit Details aus einer HR-Excel, die versehentlich für "Jeder" freigegeben war –
                      inklusive Gehaltsinfos von Kollegen.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
                    <p className="font-semibold text-green-900 dark:text-green-100 mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Die Lösung:
                    </p>
                    <ul className="text-sm text-green-800 dark:text-green-200 space-y-2">
                      <li>• <strong>Vor dem Rollout:</strong> SharePoint Access Review mit dem Microsoft 365 Admin Center durchführen</li>
                      <li>• <strong>Sensitivity Labels:</strong> HR-Dokumente mit "Vertraulich - nur HR" klassifizieren</li>
                      <li>• <strong>Microsoft Purview:</strong> DLP-Richtlinien für Gehaltsinformationen aktivieren</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Szenario 2 */}
            <Card className="border-l-4 border-l-amber-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileWarning className="w-5 h-5 text-amber-600" />
                  Szenario 2: DSFA-Anforderung vom Datenschutzbeauftragten
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg">
                    <p className="font-semibold text-amber-900 dark:text-amber-100 mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" /> Das Problem:
                    </p>
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                      Der DSB fordert eine Datenschutz-Folgenabschätzung für Copilot. Das IT-Team weiß nicht,
                      wo anfangen – Copilot verarbeitet Daten aus dutzenden Quellen.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
                    <p className="font-semibold text-green-900 dark:text-green-100 mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Die Lösung:
                    </p>
                    <ul className="text-sm text-green-800 dark:text-green-200 space-y-2">
                      <li>• <strong>M365-Kit nutzen:</strong> Offizielle DSFA-Vorlagen von Microsoft (entwickelt mit deutschen Behörden)</li>
                      <li>• <strong>Szenarien-basiert:</strong> Separate DSFA für Copilot in Teams, Outlook, Word erstellen</li>
                      <li>• <strong>Cloud Compendium:</strong> Technische Details zur Datenverarbeitung referenzieren</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Szenario 3 */}
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Server className="w-5 h-5 text-blue-600" />
                  Szenario 3: Bedenken wegen US-Datenverarbeitung
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <p className="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" /> Das Problem:
                    </p>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      Die Geschäftsführung hat Bedenken: "Werden unsere Daten in die USA übertragen?
                      Was ist mit dem Schrems-II-Urteil?"
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
                    <p className="font-semibold text-green-900 dark:text-green-100 mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Die Lösung:
                    </p>
                    <ul className="text-sm text-green-800 dark:text-green-200 space-y-2">
                      <li>• <strong>EU Data Boundary:</strong> EU-Kundendaten werden innerhalb der EU verarbeitet</li>
                      <li>• <strong>Multi-Geo:</strong> Datenresidenz für SharePoint und Exchange konfigurieren</li>
                      <li>• <strong>Vertragswerk:</strong> EU Data Protection Addendum (DPA) prüfen</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Enterprise Data Protection */}
        <section id="enterprise-data-protection" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-green-500 text-green-700 dark:text-green-400">
            Enterprise Data Protection (EDP)
          </h2>

          <p className="mb-6">
            Enterprise Data Protection ist Microsofts Sicherheitsarchitektur für Copilot. Sie stellt sicher,
            dass Prompts und Antworten denselben Schutz genießen wie E-Mails in Exchange oder Dateien in SharePoint.
          </p>

          <Card className="my-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Lock className="w-5 h-5 text-green-600" />
                Was EDP garantiert
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    titel: "Kein Training mit Ihren Daten",
                    detail: "Prompts, Antworten und Graph-Daten werden nicht für Foundation LLMs verwendet",
                    icon: <XCircle className="w-5 h-5 text-green-600" />
                  },
                  {
                    titel: "Verschlüsselung",
                    detail: "TLS 1.3 in Transit, AES-256 at Rest, Tenant-Isolation",
                    icon: <Key className="w-5 h-5 text-green-600" />
                  },
                  {
                    titel: "Berechtigungen respektiert",
                    detail: "Copilot sieht nur, was der Nutzer auch manuell sehen könnte",
                    icon: <Users className="w-5 h-5 text-green-600" />
                  },
                  {
                    titel: "Purview-Integration",
                    detail: "Sensitivity Labels und IRM werden durchgesetzt",
                    icon: <Shield className="w-5 h-5 text-green-600" />
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 p-4 border rounded-lg">
                    <div className="flex-shrink-0 mt-1">{item.icon}</div>
                    <div>
                      <p className="font-semibold">{item.titel}</p>
                      <p className="text-sm text-muted-foreground">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="my-6 border-2 border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-amber-600/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                <AlertTriangle className="w-5 h-5" />
                Achtung: Bing-Suche ist anders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Wenn Copilot die Bing-Suche nutzt (Web-Inhalte abruft), verlässt die Anfrage den M365-Tenant.
                Microsoft verarbeitet diese Daten dann in eigener datenschutzrechtlicher Verantwortlichkeit.
                <strong> Empfehlung:</strong> Bing-Integration für sensible Anwendungsfälle deaktivieren oder
                Nutzer entsprechend schulen.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Implementierung */}
        <section id="implementierung" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-emerald-500 text-emerald-700 dark:text-emerald-400">
            So implementieren Sie es richtig
          </h2>

          <p className="mb-6">
            Eine sichere Copilot-Einführung erfordert Vorbereitung in drei Bereichen: technische Konfiguration,
            rechtliche Dokumentation und organisatorische Richtlinien.
          </p>

          <Card className="my-6">
            <CardHeader>
              <CardTitle>Checkliste: Sichere Copilot-Einführung</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  {
                    phase: "Phase 1: Vorbereitung (vor dem Rollout)",
                    items: [
                      "SharePoint/OneDrive Berechtigungen prüfen (Access Reviews)",
                      "Sensitivity Labels in Microsoft Purview einrichten",
                      "DSFA mit M365-Kit erstellen und mit DSB abstimmen",
                      "DLP-Richtlinien für sensible Daten konfigurieren"
                    ]
                  },
                  {
                    phase: "Phase 2: Technische Konfiguration",
                    items: [
                      "Conditional Access Policies für Copilot aktivieren",
                      "Audit Logging im Microsoft 365 Compliance Center einschalten",
                      "Multi-Faktor-Authentifizierung für alle Nutzer erzwingen",
                      "Optional: Bing-Integration deaktivieren oder einschränken"
                    ]
                  },
                  {
                    phase: "Phase 3: Governance & Schulung",
                    items: [
                      "Nutzungsrichtlinien erstellen und kommunizieren",
                      "Datenschutz-Schulung für alle Copilot-Nutzer durchführen",
                      "Ansprechpartner für Sicherheitsfragen benennen",
                      "Regelmäßige Security Reviews planen (quartalsweise)"
                    ]
                  }
                ].map((phase, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <h4 className="font-bold text-primary mb-3">{phase.phase}</h4>
                    <div className="space-y-2">
                      {phase.items.map((item, iidx) => (
                        <label key={iidx} className="flex items-center gap-3 text-sm">
                          <input type="checkbox" className="rounded" />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Typische Fehler */}
        <section id="typische-fehler" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-red-500 text-red-700 dark:text-red-400">
            5 typische Fehler vermeiden
          </h2>

          <div className="space-y-4">
            {[
              {
                fehler: "Berechtigungen nicht prüfen vor Rollout",
                konsequenz: "Copilot macht Oversharing-Probleme sichtbar. Nutzer sehen plötzlich Daten, die 'versehentlich' freigegeben waren.",
                lösung: "SharePoint Access Reviews VOR dem Copilot-Rollout durchführen. Mindestens 2-4 Wochen einplanen."
              },
              {
                fehler: "Keine DSFA erstellen",
                konsequenz: "Bei einer Datenschutzprüfung fehlt der Nachweis der DSGVO-Konformität. Bußgeldrisiko.",
                lösung: "M365-Kit von Microsoft nutzen. DSFA-Vorlagen sind bereits mit deutschen Behörden abgestimmt."
              },
              {
                fehler: "DLP-Richtlinien vergessen",
                konsequenz: "Sensible Informationen (Kreditkarten, Sozialversicherungsnummern) können in Copilot-Antworten auftauchen.",
                lösung: "Microsoft Purview DLP für Copilot aktivieren. Vordefinierte Richtlinien für DSGVO-relevante Daten nutzen."
              },
              {
                fehler: "Nutzer nicht schulen",
                konsequenz: "Mitarbeiter geben sensible Daten in Prompts ein oder verstehen nicht, was Copilot 'sehen' kann.",
                lösung: "Verpflichtende Datenschutz-Schulung für alle Copilot-Nutzer. Klare Richtlinien kommunizieren."
              },
              {
                fehler: "Audit Logging nicht aktivieren",
                konsequenz: "Bei Vorfällen keine Nachvollziehbarkeit. Wer hat wann was mit Copilot gemacht?",
                lösung: "Microsoft 365 Audit Log aktivieren. Copilot-Interaktionen werden automatisch protokolliert."
              }
            ].map((item, idx) => (
              <Card key={idx} className="border-l-4 border-l-red-500">
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
                      <p className="font-semibold text-red-900 dark:text-red-100 flex items-center gap-2">
                        <XCircle className="w-4 h-4" /> Fehler #{idx + 1}: {item.fehler}
                      </p>
                      <p className="text-sm text-red-700 dark:text-red-300 mt-1">{item.konsequenz}</p>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
                      <p className="font-semibold text-green-900 dark:text-green-100 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> Lösung:
                      </p>
                      <p className="text-sm text-green-700 dark:text-green-300 mt-1">{item.lösung}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Entscheidungshilfe */}
        <section id="entscheidungshilfe" className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b-4 border-indigo-500 text-indigo-700 dark:text-indigo-400">
            Entscheidungshilfe für IT-Verantwortliche
          </h2>

          <p className="mb-6">
            Wann ist Copilot aus Sicherheitsperspektive sinnvoll – und wann sollten Sie vorsichtig sein?
          </p>

          <Card className="my-6 border-2 border-indigo-500/20">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" /> Copilot ist sinnvoll, wenn...
                  </h4>
                  <ul className="text-sm space-y-2">
                    <li className="p-2 bg-green-50 dark:bg-green-950/30 rounded">✓ Ihre M365-Berechtigungen sauber konfiguriert sind</li>
                    <li className="p-2 bg-green-50 dark:bg-green-950/30 rounded">✓ Sie Microsoft Purview bereits nutzen</li>
                    <li className="p-2 bg-green-50 dark:bg-green-950/30 rounded">✓ Ihre IT-Abteilung Kapazität für Governance hat</li>
                    <li className="p-2 bg-green-50 dark:bg-green-950/30 rounded">✓ Der DSB eingebunden ist und DSFA erstellt wurde</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-600 mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" /> Vorsicht geboten, wenn...
                  </h4>
                  <ul className="text-sm space-y-2">
                    <li className="p-2 bg-amber-50 dark:bg-amber-950/30 rounded">⚠️ SharePoint-Berechtigungen historisch gewachsen und unklar sind</li>
                    <li className="p-2 bg-amber-50 dark:bg-amber-950/30 rounded">⚠️ Kein Sensitivity-Label-Konzept existiert</li>
                    <li className="p-2 bg-amber-50 dark:bg-amber-950/30 rounded">⚠️ Besonders sensible Branchen (Gesundheit, Finanzen, Recht)</li>
                    <li className="p-2 bg-amber-50 dark:bg-amber-950/30 rounded">⚠️ Betriebsrat noch nicht eingebunden wurde</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Kernaussagen für Entscheider */}
        <section className="my-12">
          <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-6 h-6 text-primary" />
                Kernaussagen für Entscheider
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border-l-4 border-l-blue-500 bg-white dark:bg-slate-800 rounded-r-lg">
                  <p className="font-semibold">Faktische Kernaussage:</p>
                  <p className="text-sm text-muted-foreground">Microsoft Copilot ist DSGVO-konform und nutzt Unternehmensdaten nicht für KI-Training. Seit November 2025 gibt es das offizielle M365-Kit mit DSFA-Vorlagen.</p>
                </div>
                <div className="p-4 border-l-4 border-l-green-500 bg-white dark:bg-slate-800 rounded-r-lg">
                  <p className="font-semibold">Praktische Konsequenz:</p>
                  <p className="text-sm text-muted-foreground">Vor dem Copilot-Rollout müssen SharePoint-Berechtigungen geprüft werden, da Copilot bestehende Oversharing-Probleme sichtbar macht.</p>
                </div>
                <div className="p-4 border-l-4 border-l-red-500 bg-white dark:bg-slate-800 rounded-r-lg">
                  <p className="font-semibold">Typischer Fehler:</p>
                  <p className="text-sm text-muted-foreground">Unternehmen rollen Copilot aus, ohne vorher Berechtigungen zu prüfen und DLP-Richtlinien zu aktivieren – und wundern sich dann über Datenlecks.</p>
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
            Offizielle Dokumentation und Ressourcen zu Microsoft Copilot Sicherheit und Datenschutz.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                titel: "Microsoft: Daten, Datenschutz und Sicherheit für Copilot",
                beschreibung: "Offizielle Dokumentation zu Enterprise Data Protection",
                url: "https://learn.microsoft.com/de-de/copilot/microsoft-365/microsoft-365-copilot-privacy"
              },
              {
                titel: "Microsoft: Neue Datenschutz-Hilfen (Nov 2025)",
                beschreibung: "M365-Kit, Cloud Compendium und DSFA-Vorlagen",
                url: "https://news.microsoft.com/source/emea/2025/11/neue-datenschutz-hilfen-von-microsoft/?lang=de"
              },
              {
                titel: "Microsoft: Enterprise Data Protection",
                beschreibung: "Technische Details zur Datenverarbeitung in Copilot",
                url: "https://learn.microsoft.com/de-de/copilot/microsoft-365/enterprise-data-protection"
              },
              {
                titel: "Dr. Datenschutz: Copilot unter DSGVO-Betrachtung",
                beschreibung: "Juristische Analyse für deutsche Unternehmen",
                url: "https://www.dr-datenschutz.de/microsoft-365-copilot-unter-datenschutzrechtlicher-betrachtung/"
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

        {/* CTA */}
        <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-xl p-8 text-center my-12 border-2 border-orange-500/20">
          <h3 className="text-2xl font-bold mb-4">Sicherheits-Assessment für Copilot</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Sie planen die Copilot-Einführung und möchten sichergehen, dass Berechtigungen, DSFA und Governance stimmen?
            Wir unterstützen Sie mit einem praxiserprobten Assessment.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Assessment anfragen
          </a>
        </div>
      </ContentLayout>
    </>
  );
};

export default CopilotSicherheit;

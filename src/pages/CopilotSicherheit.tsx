import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";
import { ExternalLink, Shield, Lock, CheckCircle, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SLUG = "wissen/copilot-sicherheit-datenschutz";
const PAGE_TITLE = "Microsoft Copilot Datenschutz & Sicherheit";

const CopilotSicherheit = () => {
  const author = getAuthor("martin-lang");

  const tableOfContents = [
    { id: "dsgvo-compliance", title: "Copilot DSGVO-Compliance", level: 2 },
    { id: "zero-trust", title: "Zero Trust Architektur", level: 2 },
    { id: "zertifizierungen", title: "Zertifizierungen", level: 2 },
    { id: "governance", title: "Governance-Leitfaden für IT-Administratoren", level: 2 },
    { id: "faq", title: "FAQ: Häufige Sicherheitsfragen", level: 2 },
    { id: "audit", title: "Audit und Logging", level: 2 },
    { id: "checkliste", title: "Sicherheits-Checkliste", level: 2 },
    { id: "zusammenfassung", title: "Zusammenfassung", level: 2 }
  ];

  const ids = generateSchemaIds(SLUG, 'wissen');
  const pageUrl = `https://copilotenschule.de/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const faqs = [
    {
      name: "Werden meine Unternehmensdaten zum Training von Copilot verwendet?",
      answer: "Nein. Microsoft nutzt Ihre Unternehmensdaten nicht zum Training von Copilot. Ihre Eingaben und Daten bleiben ausschließlich in Ihrem Tenant und werden nicht für KI-Modell-Verbesserungen verwendet."
    },
    {
      name: "Kann Copilot auf Daten zugreifen, die ich nicht sehen darf?",
      answer: "Nein. Copilot respektiert alle Microsoft 365 Berechtigungen. Sie sehen nur Informationen, auf die Sie auch ohne Copilot Zugriff hätten. Das Berechtigungsmodell wird durchgängig eingehalten."
    },
    {
      name: "Ist Microsoft Copilot DSGVO-konform für deutsche Unternehmen?",
      answer: "Ja. Microsoft Copilot erfüllt alle DSGVO-Anforderungen. Daten werden in europäischen Rechenzentren verarbeitet, Prompts werden nicht gespeichert, und Microsoft bietet vollständige Transparenz über die Datenverarbeitung."
    },
    {
      name: "Welche Zertifizierungen hat Microsoft Copilot für den Unternehmenseinsatz?",
      answer: "Microsoft Copilot erfüllt ISO 27001, 27017, 27018, SOC 1/2/3, HIPAA, TISAX (Automotive) und C5 (BSI Deutschland). Diese Zertifizierungen bestätigen Enterprise-Grade-Sicherheit."
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": ids.article,
        "headline": "Microsoft Copilot Datenschutz & Sicherheit: DSGVO-konform einsetzen",
        "description": "Copilot DSGVO-konform einführen: Zero Trust, Datenschutz-Folgenabschätzung, Governance-Richtlinien. Praxis-Leitfaden für IT-Entscheider.",
        "author": getAuthorSchemaMarkup(author),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization"
        },
        "datePublished": "2025-11-11",
        "dateModified": "2026-02-02",
        "keywords": ["Microsoft Copilot Sicherheit", "Copilot Datenschutz", "Copilot DSGVO Compliance", "Copilot Zero Trust", "Copilot Enterprise Security"],
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
        title="Microsoft Copilot Datenschutz & Sicherheit: DSGVO-konform einsetzen"
        description="Copilot DSGVO-konform einführen: Zero Trust, Datenschutz-Folgenabschätzung, Governance-Richtlinien. Praxis-Leitfaden für IT-Entscheider."
        keywords={["Microsoft Copilot Sicherheit", "Copilot Datenschutz", "Copilot DSGVO Compliance", "Microsoft 365 Copilot Governance", "Copilot Zero Trust", "Copilot Enterprise Security"]}
        canonicalUrl={pageUrl}
        author={author}
        publishedTime="2025-11-11"
        modifiedTime="2026-02-02"
        schema={schema}
      />
      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: PAGE_TITLE, href: `/${SLUG}` }
        ]}
        title="Microsoft Copilot: Sicherheit & Datenschutz für Unternehmen"
        description="Die Sicherheit und der Datenschutz sind zentrale Anliegen bei der Einführung von KI-Tools wie Microsoft Copilot. In diesem Leitfaden erfahren IT-Entscheider alles Wichtige zu DSGVO-Compliance, Zero Trust und Governance-Richtlinien."
        lastUpdated="02. Februar 2026"
        readTime="8 Minuten"
        tableOfContents={tableOfContents}
      >
        {/* DSGVO Compliance Section */}
        <section id="dsgvo-compliance" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Copilot DSGVO-Compliance: Was Unternehmen wissen müssen</h2>

          <Card className="mb-6 border-green-200 bg-green-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <CheckCircle className="w-5 h-5" />
                DSGVO-Konformität bestätigt
              </CardTitle>
            </CardHeader>
            <CardContent className="text-green-900">
              <p>Microsoft Copilot ist vollständig DSGVO-konform und erfüllt alle europäischen Datenschutzanforderungen.</p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">🇪🇺 EU-Datenverarbeitung</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Ihre Daten werden ausschließlich in europäischen Rechenzentren verarbeitet</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">🔒 Keine Prompt-Speicherung</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Eingaben werden nicht zur Verbesserung der KI-Modelle verwendet</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">👁️ Volle Transparenz</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Vollständige Nachvollziehbarkeit der Datenverarbeitung</p>
              </CardContent>
            </Card>
          </div>

          <h3 className="text-xl font-semibold mb-4">Unternehmensdaten-Schutz</h3>
          <p className="mb-4 text-muted-foreground">
            Copilot for Microsoft 365 nutzt Ihre Unternehmensdaten nur innerhalb Ihrer Tenant-Grenzen:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
            <li>Daten verlassen niemals Ihre Microsoft 365-Umgebung</li>
            <li>Berechtigungen werden durchgängig respektiert</li>
            <li>Administratoren haben volle Kontrolle über Zugriffe</li>
          </ul>
        </section>

        {/* Zero Trust Section */}
        <section id="zero-trust" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Zero Trust Architektur bei Microsoft Copilot</h2>

          <Card className="mb-6 border-blue-200 bg-blue-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Shield className="w-5 h-5" />
                Zero Trust Prinzipien
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold text-blue-900">1. Verifizierung</h4>
                  <p className="text-sm text-blue-800">Jeder Zugriff wird authentifiziert</p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900">2. Least Privilege</h4>
                  <p className="text-sm text-blue-800">Minimale notwendige Berechtigungen</p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900">3. Kontinuierliche Überwachung</h4>
                  <p className="text-sm text-blue-800">Annahme von Kompromittierung</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <h3 className="text-xl font-semibold mb-4">Verschlüsselung</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li><strong>In Transit:</strong> TLS 1.3 Verschlüsselung für alle Datenübertragungen</li>
            <li><strong>At Rest:</strong> AES-256 Verschlüsselung für gespeicherte Daten</li>
            <li><strong>End-to-End:</strong> Optional für besonders sensible Daten</li>
          </ul>
        </section>

        {/* Zertifizierungen Section */}
        <section id="zertifizierungen" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Zertifizierungen: ISO 27001, TISAX, C5 und mehr</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "ISO 27001, 27017, 27018", desc: "Informationssicherheit" },
              { name: "SOC 1, 2 und 3", desc: "Service Organization Controls" },
              { name: "HIPAA", desc: "Healthcare (USA)" },
              { name: "TISAX", desc: "Automotive (Europa)" },
              { name: "C5", desc: "BSI (Deutschland)" },
              { name: "FedRAMP", desc: "US Government" }
            ].map((cert, idx) => (
              <Card key={idx} className="text-center">
                <CardContent className="pt-6">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h4 className="font-semibold">{cert.name}</h4>
                  <p className="text-sm text-muted-foreground">{cert.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Governance Section */}
        <section id="governance" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Governance-Leitfaden für IT-Administratoren</h2>

          <h3 className="text-xl font-semibold mb-4">Zugriffskontrolle</h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground mb-6">
            <li><strong>Rollout-Strategie:</strong> Schrittweise Einführung nach Abteilungen</li>
            <li><strong>Lizenzierung:</strong> Gezielte Vergabe von Lizenzen</li>
            <li><strong>Monitoring:</strong> Nutzungsüberwachung via Microsoft 365 Admin Center</li>
          </ol>

          <h3 className="text-xl font-semibold mb-4">Richtlinien und Schulung</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
            <li>Erstellen Sie klare Nutzungsrichtlinien</li>
            <li>Schulen Sie Mitarbeiter zu Sicherheitsaspekten</li>
            <li>Etablieren Sie einen Ansprechpartner für Sicherheitsfragen</li>
          </ul>

          <Card className="bg-slate-900 text-slate-100">
            <CardHeader>
              <CardTitle className="text-slate-100">Data Loss Prevention (DLP) Schritte</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-1 font-mono text-sm">
                <li>Definieren Sie sensible Datentypen</li>
                <li>Erstellen Sie Richtlinien in Microsoft Purview</li>
                <li>Testen Sie die Richtlinien</li>
                <li>Aktivieren Sie Blocking-Modus</li>
                <li>Überwachen Sie Verstöße</li>
              </ol>
            </CardContent>
          </Card>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-foreground">FAQ: Die häufigsten Sicherheitsfragen zu Copilot</h2>

          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Audit Section */}
        <section id="audit" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Audit und Logging</h2>

          <h3 className="text-xl font-semibold mb-4">Aktivitätsüberwachung</h3>
          <p className="mb-4 text-muted-foreground">Nutzen Sie das Microsoft 365 Audit Log:</p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
            <li><strong>Copilot-Interaktionen:</strong> Wer nutzt Copilot wann?</li>
            <li><strong>Datenzugriffe:</strong> Welche Dateien werden abgerufen?</li>
            <li><strong>Admin-Änderungen:</strong> Wer ändert Einstellungen?</li>
          </ul>

          <h3 className="text-xl font-semibold mb-4">Retention Policies</h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Gesetzliche Anforderungen prüfen</li>
            <li>Retention Labels erstellen</li>
            <li>Automatische Anwendung konfigurieren</li>
            <li>Regelmäßige Reviews durchführen</li>
          </ol>
        </section>

        {/* Checkliste Section */}
        <section id="checkliste" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Sicherheits-Checkliste</h2>

          <Card className="border-green-200 bg-green-50/30">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Multi-Faktor-Authentifizierung für alle Nutzer aktiviert",
                  "Conditional Access Policies konfiguriert",
                  "DLP-Richtlinien implementiert",
                  "Audit Logging aktiviert",
                  "Nutzungsrichtlinien erstellt und kommuniziert",
                  "Schulungen durchgeführt",
                  "Notfallplan erstellt",
                  "Regelmäßige Security Reviews geplant"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Zusammenfassung Section */}
        <section id="zusammenfassung" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Zusammenfassung</h2>

          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="pt-6">
              <p className="mb-4">Microsoft Copilot bietet Enterprise-Grade-Sicherheit:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-primary mt-0.5" />
                  <span><strong>Höchste Sicherheitsstandards</strong> durch Microsoft's Zero Trust Architektur</span>
                </li>
                <li className="flex items-start gap-2">
                  <Lock className="w-5 h-5 text-primary mt-0.5" />
                  <span><strong>DSGVO-konform</strong> mit Datenverarbeitung in der EU</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <span><strong>Volle Kontrolle</strong> für Administratoren über Zugriffe und Richtlinien</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="mt-8 p-6 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Weiterführende Ressourcen</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://www.microsoft.com/trust-center" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
                  Microsoft Trust Center <ExternalLink className="w-4 h-4" />
                </a>
              </li>
              <li>
                <a href="https://learn.microsoft.com/copilot/security" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
                  Copilot Security Documentation <ExternalLink className="w-4 h-4" />
                </a>
              </li>
            </ul>
          </div>

          <Card className="mt-8 border-primary bg-primary/10">
            <CardContent className="pt-6 text-center">
              <p className="font-semibold">Benötigen Sie Unterstützung bei der sicheren Copilot-Einführung?</p>
              <p className="text-muted-foreground mt-2">Kontaktieren Sie uns für ein individuelles Sicherheits-Assessment.</p>
            </CardContent>
          </Card>
        </section>
      </ContentLayout>
    </>
  );
};

export default CopilotSicherheit;

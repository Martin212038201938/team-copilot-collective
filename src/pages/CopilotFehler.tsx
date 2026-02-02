import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, AlertTriangle, Shield, Users, FileText, TrendingUp, Target, ExternalLink } from "lucide-react";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";
import { generateSchemaIds, generateWissenBreadcrumbItems } from "@/lib/schema";

const SLUG = "copilot-fehler-vermeiden";
const PAGE_TITLE = "Microsoft Copilot-Fehler vermeiden";

const CopilotFehler = () => {
  const martinLang = getAuthor('martin-lang')!;

  // Schema IDs automatisch generieren
  const ids = generateSchemaIds(SLUG, 'wissen');
  const pageUrl = `https://copilotenschule.de/wissen/${SLUG}`;
  const breadcrumbItems = generateWissenBreadcrumbItems(PAGE_TITLE, pageUrl);

  const tableOfContents = [
    { id: "fehler-1", title: "Fehler 1: Keine klare Governance", level: 2 },
    { id: "fehler-2", title: "Fehler 2: Unzureichendes Training", level: 2 },
    { id: "fehler-3", title: "Fehler 3: Oversharing sensibler Daten", level: 2 },
    { id: "fehler-4", title: "Fehler 4: Halluzinationen ignorieren", level: 2 },
    { id: "fehler-5", title: "Fehler 5: Compliance-Verstöße", level: 2 },
    { id: "fehler-6", title: "Fehler 6: Fehlendes Change Management", level: 2 },
    { id: "fehler-7", title: "Fehler 7: Keine Success Metrics", level: 2 },
    { id: "checkliste", title: "Checkliste für erfolgreiche Einführung", level: 2 },
    { id: "faq", title: "Häufig gestellte Fragen", level: 2 },
    { id: "quellen", title: "Quellen und Links", level: 2 }
  ];

  // FAQ-Daten für Schema und Anzeige (kundenorientierte Fragen)
  const faqs = [
    {
      name: "Unsere Copilot-Einführung stockt und die Nutzung ist gering – was machen wir falsch?",
      answer: "Die häufigsten Ursachen sind fehlendes Training, mangelndes Change Management und keine klaren Use Cases. Ohne gezielte Befähigung nutzen Mitarbeiter Copilot nicht oder falsch. Die Copilotenschule bietet Adoption-Programme mit Training, Champions-Konzepten und messbaren Erfolgsmetriken für nachhaltige Nutzungssteigerung."
    },
    {
      name: "Wie vermeiden wir, dass vertrauliche Daten über Copilot ungewollt geteilt werden?",
      answer: "Implementieren Sie Data Governance vor dem Rollout: Sensitivity Labels, DLP-Policies und klare Zugriffsrechte in SharePoint. Copilot greift nur auf Daten zu, für die Nutzer berechtigt sind. Die Copilotenschule behandelt in Compliance-Trainings die technischen und organisatorischen Maßnahmen für sicheren Copilot-Einsatz."
    },
    {
      name: "Warum nutzen unsere Mitarbeiter den Copilot kaum, obwohl wir teure Lizenzen bezahlen?",
      answer: "Geringe Nutzung resultiert meist aus Unsicherheit: Mitarbeiter wissen nicht, wofür und wie sie Copilot einsetzen sollen. Ohne konkrete Anwendungsbeispiele und Prompt-Training bleibt das Potenzial ungenutzt. Die Copilotenschule aktiviert Ihre Teams mit praxisorientierten Use-Case-Workshops und begleiteten Lernreisen."
    },
    {
      name: "Wie stellen wir sicher, dass Copilot-Antworten in unseren Dokumenten korrekt sind?",
      answer: "KI kann Halluzinationen erzeugen – plausible, aber falsche Informationen. Etablieren Sie Verifizierungsprozesse: kritische Prüfung bei Zahlen und Fakten, Quellenangaben einfordern, 4-Augen-Prinzip bei wichtigen Dokumenten. Die Copilotenschule schult Ihre Teams in kritischer KI-Nutzung und Quality Assurance."
    }
  ];

  // Kombiniertes Schema mit @graph (Article, FAQ, Breadcrumb)
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": ids.article,
        "headline": "Die 7 größten Fehler bei der Microsoft Copilot-Einführung | So vermeiden Sie sie",
        "description": "Microsoft 365 Copilot sicher einführen: DSGVO-Compliance, Governance, Oversharing & Halluzinationen vermeiden. Praxisleitfaden mit Checklisten für deutsche Unternehmen.",
        "author": getAuthorSchemaMarkup(martinLang),
        "publisher": {
          "@id": "https://copilotenschule.de/#organization"
        },
        "datePublished": "2025-11-07",
        "dateModified": "2026-02-02",
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
        title="Die 7 größten Fehler bei der Microsoft Copilot-Einführung | So vermeiden Sie sie"
        description="Microsoft 365 Copilot sicher einführen: DSGVO-Compliance, Governance, Oversharing & Halluzinationen vermeiden. Praxisleitfaden mit Checklisten für deutsche Unternehmen."
        keywords={[
          "Microsoft 365 Copilot Fehler",
          "Copilot Einführung Fehler vermeiden",
          "Copilot DSGVO Compliance",
          "Copilot Governance",
          "Copilot Implementierung Risiken",
          "Copilot Oversharing verhindern",
          "Copilot Halluzinationen erkennen",
          "Copilot Change Management",
          "Copilot ROI berechnen",
          "Microsoft Copilot Training"
        ]}
        canonicalUrl={pageUrl}
        schema={schema}
        author={martinLang}
        publishedTime="2025-11-07T10:00:00+01:00"
        modifiedTime="2026-02-02T10:00:00+01:00"
      />

      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "Copilot-Fehler vermeiden", href: "/copilot-fehler-vermeiden" }
        ]}
        title="Die 7 größten Fehler bei der Microsoft Copilot-Einführung | So vermeiden Sie sie"
        description="Microsoft 365 Copilot sicher einführen: DSGVO-Compliance, Governance, Oversharing & Halluzinationen vermeiden. Praxisleitfaden mit Checklisten für deutsche Unternehmen."
        lastUpdated="02. Februar 2026"
        readTime="18 Minuten"
        tableOfContents={tableOfContents}
      >
        <Card className="mb-8 border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-red-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-orange-600" />
              Schnellantwort
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base leading-relaxed">
              Die Copilot-Einführung scheitert häufig an vermeidbaren Fehlern: Fehlende Governance führt zu Datenschutzproblemen,
              ungeschulte Mitarbeiter nutzen das Tool falsch, sensitive Daten werden versehentlich geteilt, und
              KI-Halluzinationen bleiben unerkannt. Deutsche Unternehmen müssen besonders Compliance-Anforderungen beachten.
              Dieser Leitfaden zeigt die 7 kritischsten Fehler mit konkreten Praxisbeispielen und bewährten Gegenmaßnahmen
              für eine sichere, erfolgreiche Implementierung.
            </p>
          </CardContent>
        </Card>

        <section id="fehler-1">
          <h2>Fehler 1: Keine klare Governance und Richtlinien</h2>
          <p>
            Der schwerwiegendste Fehler: Copilot wird aktiviert, ohne klare Regeln für Nutzung, Datenschutz und Verantwortlichkeiten
            zu definieren.
          </p>

          <blockquote className="my-6 border-l-4 border-primary bg-primary/5 p-6 rounded-r-lg italic text-lg">
            "Governance ist kein Bremsklotz, sondern die Voraussetzung für Skalierung. Wer ohne Regeln startet,
            baut technische und rechtliche Schulden auf, die später teuer werden – oft in Form von Datenschutzvorfällen
            oder einem vollständigen Rollback."
          </blockquote>

          <Card className="my-6 border-l-4 border-l-red-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                Typisches Szenario
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="font-semibold text-red-900 dark:text-red-100 mb-2">❌ Was passiert:</p>
                  <p className="text-sm text-red-800 dark:text-red-200">
                    IT aktiviert Microsoft 365 Copilot für 500 Mitarbeiter ohne Richtlinien. Ein Vertriebsmitarbeiter
                    fügt vertrauliche Kundendaten in einen Prompt ein. Copilot indexiert diese Daten, die nun für andere
                    Nutzer über Microsoft Graph auffindbar werden.
                  </p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="font-semibold text-green-900 dark:text-green-100 mb-2">✓ Die Lösung:</p>
                  <ul className="text-sm text-green-800 dark:text-green-200 space-y-2">
                    <li>• Copilot Governance Committee gründen (IT, Legal, CISO, Business)</li>
                    <li>• Acceptable Use Policy für Copilot definieren</li>
                    <li>• Data Classification und Sensitivity Labels implementieren</li>
                    <li>• Klare Eskalationswege bei Sicherheitsvorfällen</li>
                    <li>• Audit-Logs aktivieren und regelmäßig reviewen</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="my-6">
            <CardHeader>
              <CardTitle className="text-base">Governance-Framework: Die 5 Säulen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    säule: "Data Governance",
                    maßnahmen: ["Sensitivity Labels", "DLP Policies", "Information Barriers", "Retention Policies"]
                  },
                  {
                    säule: "Access Control",
                    maßnahmen: ["Role-Based Access", "Conditional Access", "MFA Enforcement", "Privileged Access Management"]
                  },
                  {
                    säule: "Compliance",
                    maßnahmen: ["DSGVO Compliance", "Audit Logs", "eDiscovery", "Legal Hold"]
                  },
                  {
                    säule: "Usage Guidelines",
                    maßnahmen: ["Acceptable Use Policy", "Prompt Engineering Guidelines", "Prohibited Use Cases", "Best Practices"]
                  }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <h4 className="font-bold text-primary mb-2">{item.säule}</h4>
                    <ul className="text-sm space-y-1">
                      {item.maßnahmen.map((m, midx) => (
                        <li key={midx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="fehler-2" className="mt-12">
          <h2>Fehler 2: Unzureichendes Training der Mitarbeiter</h2>
          <p>
            Copilot wird ausgerollt, aber Nutzer wissen nicht, wie sie es effektiv und sicher einsetzen können.
          </p>

          <blockquote className="my-6 border-l-4 border-primary bg-primary/5 p-6 rounded-r-lg italic text-lg">
            "Die Mitarbeiter nicht professionell schulen ist der teuerste Fehler. Der Einstieg scheint niederschwellig,
            aber die veränderte Arbeitsweise ist so tiefgreifend, dass man das nicht einer externen Taskforce und
            einigen Interessierten überlassen kann. Ohne systematisches Training zahlen Sie für Lizenzen,
            die niemand nutzt."
          </blockquote>

          <Card className="my-6 border-l-4 border-l-orange-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="w-5 h-5 text-orange-600" />
                Das Problem
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm">
                  <strong>Realität in vielen Unternehmen:</strong> IT aktiviert Copilot, sendet eine E-Mail "Copilot ist jetzt verfügbar"
                  und hofft auf Selbstorganisation. Resultat:
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• 70% der Nutzer probieren Copilot einmal, frustriert geben sie auf</li>
                  <li>• Falsche Prompts führen zu schlechten Ergebnissen → "Copilot ist nutzlos"</li>
                  <li>• Sicherheitsrelevante Features (Sensitivity Labels) werden ignoriert</li>
                  <li>• Produktivitätspotenzial wird nicht ausgeschöpft</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="my-6">
            <CardHeader>
              <CardTitle className="text-base">Effektives Trainingskonzept</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  {
                    phase: "Phase 1: Kick-Off (Woche 1)",
                    dauer: "2 Stunden",
                    inhalte: ["Was ist Copilot?", "Use Cases für Ihre Rolle", "Governance & Security Basics", "Erste Prompt-Übungen"]
                  },
                  {
                    phase: "Phase 2: Hands-On Workshop (Woche 2-3)",
                    dauer: "4 Stunden",
                    inhalte: ["Advanced Prompting", "App-spezifische Features", "Best Practices", "Häufige Fehler vermeiden"]
                  },
                  {
                    phase: "Phase 3: Champions Program (Woche 4-12)",
                    dauer: "Kontinuierlich",
                    inhalte: ["Power User identifizieren", "Peer-to-Peer Mentoring", "Use Case Library aufbauen", "Feedback-Loops"]
                  },
                  {
                    phase: "Phase 4: Continuous Learning",
                    dauer: "Ongoing",
                    inhalte: ["Monatliche Tipps & Tricks", "New Features Communication", "Advanced Training Sessions", "Success Stories teilen"]
                  }
                ].map((p, idx) => (
                  <div key={idx} className="border-l-4 border-l-primary pl-4">
                    <div className="font-bold text-primary">{p.phase}</div>
                    <div className="text-xs text-muted-foreground mb-2">Dauer: {p.dauer}</div>
                    <ul className="text-sm space-y-1">
                      {p.inhalte.map((i, iidx) => (
                        <li key={iidx}>• {i}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="fehler-3" className="mt-12">
          <h2>Fehler 3: Oversharing sensibler Daten</h2>
          <p>
            Mitarbeiter geben unbewusst vertrauliche Informationen in Prompts ein, die dann für andere zugänglich werden können.
          </p>

          <blockquote className="my-6 border-l-4 border-primary bg-primary/5 p-6 rounded-r-lg italic text-lg">
            "Copilot macht Ihre bestehenden Berechtigungsprobleme sichtbar – und verstärkt sie. Wer vor dem Rollout
            nicht aufräumt, gibt jedem Mitarbeiter einen Turbo-Suchmodus für alle Daten, auf die er Zugriff hat.
            Die meisten Unternehmen unterschätzen massiv, wie weitreichend ihre SharePoint-Berechtigungen gewachsen sind."
          </blockquote>

          <Card className="my-6 border-l-4 border-l-red-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="w-5 h-5 text-red-600" />
                Reales Beispiel aus der Praxis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                  <p className="font-semibold text-red-900 dark:text-red-100 mb-2">Szenario: Gehaltsliste im Prompt</p>
                  <p className="text-sm text-red-800 dark:text-red-200 mb-3">
                    HR-Mitarbeiterin kopiert Excel-Tabelle mit Gehältern in Copilot-Prompt: "Erstelle eine Zusammenfassung
                    dieser Gehaltsstruktur für die Geschäftsführung."
                  </p>
                  <p className="text-sm text-red-800 dark:text-red-200 font-semibold">
                    Problem: Diese Daten werden in Copilot's semantic index aufgenommen und können bei ähnlichen Queries
                    von anderen Nutzern gefunden werden.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="my-6">
            <CardHeader>
              <CardTitle className="text-base">Technische Schutzmaßnahmen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    maßnahme: "Sensitivity Labels",
                    beschreibung: "Klassifizieren Sie Dokumente als 'Vertraulich', 'Intern', 'Öffentlich'",
                    implementation: "Automatische Labelierung via Azure Information Protection einrichten"
                  },
                  {
                    maßnahme: "DLP Policies",
                    beschreibung: "Verhindern Sie das Teilen sensibler Daten (Kreditkarten, Gehälter, Patientendaten)",
                    implementation: "Microsoft Purview DLP für Copilot konfigurieren"
                  },
                  {
                    maßnahme: "Information Barriers",
                    beschreibung: "Trennen Sie Abteilungen logisch (Finance nicht sichtbar für Sales)",
                    implementation: "Compliance-Richtlinien in Microsoft 365 Admin Center"
                  },
                  {
                    maßnahme: "Privileged Access",
                    beschreibung: "Beschränken Sie Copilot-Zugriff für hochsensible Bereiche",
                    implementation: "Conditional Access Policies mit Geräteanforderungen"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <h4 className="font-bold text-primary mb-1">{item.maßnahme}</h4>
                    <p className="text-sm mb-2">{item.beschreibung}</p>
                    <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
                      <strong>Setup:</strong> {item.implementation}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="my-6 border-2 border-blue-500/20">
            <CardHeader className="bg-gradient-to-r from-blue-500/10 to-blue-600/10">
              <CardTitle className="text-base">Mitarbeiter-Schulung: Was darf NICHT in Prompts?</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-red-600 mb-2">❌ Niemals in Prompts:</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Gehaltsdaten</li>
                    <li>• Personenbezogene Gesundheitsdaten</li>
                    <li>• Kreditkarteninformationen</li>
                    <li>• Passwörter oder API-Keys</li>
                    <li>• Vertrauliche Kundendaten</li>
                    <li>• M&A-Informationen</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-green-600 mb-2">✓ Alternative Ansätze:</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Anonymisierte Beispieldaten nutzen</li>
                    <li>• Platzhalter verwenden</li>
                    <li>• Aggregierte Statistiken statt Rohdaten</li>
                    <li>• Sensitivity Labels prüfen vor Copilot-Nutzung</li>
                    <li>• Separate sichere Umgebung für kritische Daten</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="fehler-4" className="mt-12">
          <h2>Fehler 4: Halluzinationen nicht erkennen und validieren</h2>
          <p>
            KI-Modelle können plausibel klingende, aber faktisch falsche Informationen generieren. Ungeprüfte Übernahme
            führt zu Fehlentscheidungen.
          </p>

          <blockquote className="my-6 border-l-4 border-primary bg-primary/5 p-6 rounded-r-lg italic text-lg">
            "Das Gefährliche an Halluzinationen: Sie klingen absolut überzeugend. Ein Copilot-generierter Text
            über DSGVO-Artikel 55 liest sich wie vom Anwalt – ist aber komplett falsch. Ohne geschulte Mitarbeiter,
            die wissen, dass sie IMMER kritisch prüfen müssen, werden diese Fehler zu Unternehmensrisiken."
          </blockquote>

          <Card className="my-6 border-l-4 border-l-yellow-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                Was sind Halluzinationen?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">
                Halluzinationen sind KI-generierte Informationen, die fakten nicht entsprechen, aber überzeugend
                formuliert sind. Sie entstehen, wenn das Modell Lücken mit "gelernten Mustern" füllt.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <p className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">Beispiel 1: Falsche Rechtsauskunft</p>
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    <strong>Prompt:</strong> "Fasse die DSGVO-Regelungen zu Datenübermittlung in Drittstaaten zusammen"
                    <br/><br/>
                    <strong>Copilot:</strong> "Nach Art. 55 DSGVO ist die Übermittlung in die USA ohne weitere Prüfung zulässig..."
                    <br/><br/>
                    <strong>Reality Check:</strong> ❌ Artikel 55 regelt die Zuständigkeit von Aufsichtsbehörden, NICHT Drittstaaten-Transfers.
                    Korrekt wäre Art. 44-50.
                  </p>
                </div>
                <div className="p-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <p className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">Beispiel 2: Erfundene Quellen</p>
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    <strong>Prompt:</strong> "Zitiere Studien zur Copilot-Produktivität"
                    <br/><br/>
                    <strong>Copilot:</strong> "Laut McKinsey-Studie 2024 steigert Copilot die Produktivität um 67%..."
                    <br/><br/>
                    <strong>Reality Check:</strong> ❌ Diese spezifische Studie existiert nicht. Copilot kombiniert bekannte Muster
                    (McKinsey + Produktivitätsstudien) zu einer plausiblen, aber falschen Aussage.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="my-6">
            <CardHeader>
              <CardTitle className="text-base">Validation Framework: 4-Stufen-Prüfung</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    stufe: "1. Source Verification",
                    fragen: ["Nennt Copilot konkrete Quellen?", "Sind Links/Referenzen verifizierbar?", "Existieren die zitierten Dokumente?"],
                    aktion: "Alle Quellen manuell prüfen, besonders bei Compliance-Themen"
                  },
                  {
                    stufe: "2. Logic Check",
                    fragen: ["Ist die Argumentation logisch konsistent?", "Widersprechen sich Aussagen?", "Klingen Zahlen plausibel?"],
                    aktion: "Kritisches Hinterfragen, gesunden Menschenverstand einsetzen"
                  },
                  {
                    stufe: "3. Expert Review",
                    fragen: ["Würde ein Fachexperte zustimmen?", "Entspricht es Best Practices?", "Ist es rechtlich korrekt?"],
                    aktion: "Bei kritischen Themen: Experten reviewen lassen"
                  },
                  {
                    stufe: "4. Cross-Check",
                    fragen: ["Gibt es alternative Quellen?", "Bestätigen andere Systeme die Info?", "Was sagt die offizielle Dokumentation?"],
                    aktion: "Vergleich mit offiziellen Quellen (z.B. Microsoft Docs, Gesetze)"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="border-l-4 border-l-yellow-500 pl-4 py-2">
                    <h4 className="font-bold text-yellow-700 dark:text-yellow-300 mb-2">{item.stufe}</h4>
                    <div className="text-sm mb-2">
                      <strong>Prüffragen:</strong>
                      <ul className="ml-4 mt-1 space-y-1">
                        {item.fragen.map((f, fidx) => (
                          <li key={fidx}>• {f}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="text-xs bg-yellow-50 dark:bg-yellow-950 p-2 rounded">
                      <strong>Aktion:</strong> {item.aktion}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="fehler-5" className="mt-12">
          <h2>Fehler 5: Compliance und rechtliche Anforderungen ignorieren</h2>
          <p>
            Besonders in Deutschland: DSGVO, Betriebsrat, Branchenspezifische Regulations (BAFIN, MDR) werden übersehen.
          </p>

          <blockquote className="my-6 border-l-4 border-primary bg-primary/5 p-6 rounded-r-lg italic text-lg">
            "In Deutschland können Sie Copilot nicht einfach 'einschalten'. Betriebsrat, Datenschutzbeauftragter,
            eventuell Branchenregulierung – das sind keine Formalitäten, sondern echte Hürden. Wer den Betriebsrat
            übergeht, riskiert eine einstweilige Verfügung und muss alles wieder abschalten."
          </blockquote>

          <Card className="my-6 border-l-4 border-l-purple-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="w-5 h-5 text-purple-600" />
                Compliance-Herausforderungen in Deutschland
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  {
                    thema: "DSGVO (Datenschutz-Grundverordnung)",
                    anforderungen: [
                      "Datenschutz-Folgenabschätzung (DSFA) durchführen",
                      "Verarbeitungsverzeichnis aktualisieren",
                      "Betroffenenrechte sicherstellen (Auskunft, Löschung)",
                      "TOMs (Technische und organisatorische Maßnahmen) dokumentieren"
                    ],
                    risiko: "Bußgelder bis 20 Mio € oder 4% des Jahresumsatzes"
                  },
                  {
                    thema: "Betriebsrat & Mitbestimmung",
                    anforderungen: [
                      "Betriebsrat frühzeitig einbinden (BetrVG §87)",
                      "Betriebsvereinbarung für KI-Tool-Nutzung",
                      "Mitarbeiter-Überwachung ausschließen",
                      "Transparenz über Datenverarbeitung"
                    ],
                    risiko: "Nutzung kann untersagt werden, Rechtsstreitigkeiten"
                  },
                  {
                    thema: "Branchenspezifische Regulations",
                    anforderungen: [
                      "BAFIN (Banking): MaRisk-Konformität",
                      "Gesundheit: MDR, FDA-Richtlinien",
                      "Versicherungen: VAG-Anforderungen",
                      "Öffentlicher Dienst: Landesgesetze"
                    ],
                    risiko: "Lizenz-Entzug, Geschäftseinschränkungen"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <h4 className="font-bold text-purple-600 mb-3">{item.thema}</h4>
                    <div className="mb-3">
                      <p className="text-sm font-semibold mb-2">Erforderliche Maßnahmen:</p>
                      <ul className="text-sm space-y-1">
                        {item.anforderungen.map((a, aidx) => (
                          <li key={aidx} className="flex items-start gap-2">
                            <span className="text-purple-600 mt-0.5">✓</span>
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-3 bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded text-sm">
                      <strong className="text-purple-900 dark:text-purple-100">Risiko bei Nicht-Beachtung:</strong>
                      <span className="text-purple-800 dark:text-purple-200 ml-2">{item.risiko}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="my-6">
            <CardHeader>
              <CardTitle className="text-base">Compliance-Checkliste vor Copilot-Rollout</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { kategorie: "Legal", items: ["DSFA durchgeführt", "AV-Vertrag geprüft", "Betriebsvereinbarung", "Rechtsgutachten"] },
                  { kategorie: "Technical", items: ["Audit Logs aktiviert", "DLP konfiguriert", "Backup-Strategie", "Encryption at rest"] },
                  { kategorie: "Organizational", items: ["Governance Committee", "Schulungen absolviert", "Policies kommuniziert", "Incident Response Plan"] },
                  { kategorie: "Monitoring", items: ["Usage Analytics", "Security Alerts", "Compliance Reports", "Regular Audits"] }
                ].map((cat, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <h5 className="font-bold mb-3">{cat.kategorie}</h5>
                    <ul className="space-y-2">
                      {cat.items.map((item, iidx) => (
                        <li key={iidx} className="flex items-center gap-2 text-sm">
                          <input type="checkbox" className="rounded" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="fehler-6" className="mt-12">
          <h2>Fehler 6: Fehlendes Change Management und Kommunikation</h2>
          <p>
            70% der Copilot-Implementierungen scheitern an mangelnder Nutzer-Akzeptanz, nicht an Technologie.
          </p>

          <blockquote className="my-6 border-l-4 border-primary bg-primary/5 p-6 rounded-r-lg italic text-lg">
            "Copilot verändert nicht nur Werkzeuge, sondern Arbeitsweisen. Das ist keine IT-Einführung,
            das ist ein Kulturwandel. Unternehmen, die das wie ein Software-Update behandeln, wundern sich,
            warum nach sechs Monaten 80% der Lizenzen brach liegen."
          </blockquote>

          <Card className="my-6 border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="w-5 h-5 text-blue-600" />
                Warum Change Management kritisch ist
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm">
                  <strong>Typisches Failure-Szenario:</strong> IT rollt Copilot aus, sendet Ankündigungs-E-Mail,
                  hofft auf selbstständige Adoption. Resultat nach 3 Monaten:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { metric: "5%", label: "Active Users", farbe: "red" },
                    { metric: "82%", label: "Haben es nie probiert", farbe: "orange" },
                    { metric: "13%", label: "Einmal genutzt, dann aufgegeben", farbe: "yellow" }
                  ].map((stat, idx) => (
                    <div key={idx} className={`p-4 border-2 border-${stat.farbe}-500/30 rounded-lg text-center`}>
                      <div className={`text-3xl font-bold text-${stat.farbe}-600`}>{stat.metric}</div>
                      <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="my-6">
            <CardHeader>
              <CardTitle className="text-base">8-Stufen Change Management Playbook</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { stufe: "1. Create Urgency", aktion: "Vision kommunizieren: 'Warum Copilot?' Business Case zeigen", owner: "Leadership" },
                  { stufe: "2. Build Coalition", aktion: "Guiding Coalition aus Champions verschiedener Abteilungen", owner: "Cross-functional Team" },
                  { stufe: "3. Form Vision", aktion: "Klare Vision und Strategie: 'Wie verändert Copilot unsere Arbeit?'", owner: "Change Team" },
                  { stufe: "4. Communicate", aktion: "Multi-Channel-Kommunikation: Town Halls, Intranet, Videos, Demos", owner: "Communications" },
                  { stufe: "5. Empower Action", aktion: "Barriers entfernen: Training, Support, Protected Time zum Lernen", owner: "HR + IT" },
                  { stufe: "6. Generate Wins", aktion: "Quick Wins feiern und kommunizieren: Success Stories, ROI-Beispiele", owner: "Champions" },
                  { stufe: "7. Sustain Change", aktion: "Continuous Improvement: Feedback-Loops, New Features, Advanced Training", owner: "All" },
                  { stufe: "8. Anchor Culture", aktion: "In Kultur verankern: KPIs, Performance Reviews, Onboarding neuer MA", owner: "Leadership" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{item.stufe.replace(/^\d+\.\s*/, '')}</div>
                      <div className="text-xs text-muted-foreground mb-1">{item.aktion}</div>
                      <div className="text-xs bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2 py-1 rounded inline-block">
                        Owner: {item.owner}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="fehler-7" className="mt-12">
          <h2>Fehler 7: ROI und Success Metrics nicht definieren</h2>
          <p>
            Ohne messbare Ziele ist Erfolg nicht bewertbar. Copilot wird zum "Nice-to-have" ohne Business Impact.
          </p>

          <blockquote className="my-6 border-l-4 border-primary bg-primary/5 p-6 rounded-r-lg italic text-lg">
            "'500 Lizenzen aktiviert' ist keine Erfolgsmeldung – das ist eine Kostenstelle. Ohne definierte
            Metriken VOR dem Rollout können Sie später nicht beweisen, ob sich die Investition gelohnt hat.
            Und ohne Beweise wird Copilot beim nächsten Budget-Review als erstes gestrichen."
          </blockquote>

          <Card className="my-6 border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Das Problem der "Vanity Metrics"
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                  <h5 className="font-semibold text-red-900 dark:text-red-100 mb-2">❌ Falsche Metriken</h5>
                  <ul className="text-sm text-red-800 dark:text-red-200 space-y-1">
                    <li>• "Wir haben 500 Lizenzen aktiviert"</li>
                    <li>• "30% Login-Rate"</li>
                    <li>• "10.000 Prompts pro Monat"</li>
                  </ul>
                  <p className="text-xs text-red-700 dark:text-red-300 mt-3">
                    <strong>Problem:</strong> Diese Zahlen sagen nichts über tatsächlichen Business Value aus.
                  </p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                  <h5 className="font-semibold text-green-900 dark:text-green-100 mb-2">✓ Aussagekräftige Metriken</h5>
                  <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                    <li>• "25% weniger Zeit für Meeting-Protokolle"</li>
                    <li>• "15% schnellere Proposal-Erstellung"</li>
                    <li>• "€200k Einsparung in Q1 durch Automatisierung"</li>
                  </ul>
                  <p className="text-xs text-green-700 dark:text-green-300 mt-3">
                    <strong>Vorteil:</strong> Direkte Verbindung zu Business Outcomes und ROI.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="my-6">
            <CardHeader>
              <CardTitle className="text-base">Success Metrics Framework</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  {
                    kategorie: "Productivity Metrics",
                    kpis: [
                      { metric: "Time Saved", beispiel: "Durchschnittliche Zeitersparnis pro Aufgabe (z.B. E-Mail-Antworten: -40%)" },
                      { metric: "Tasks Completed", beispiel: "Anzahl Dokumente/Präsentationen mit Copilot vs. ohne" },
                      { metric: "Meeting Efficiency", beispiel: "Zeit für Meeting-Vorbereitung und Follow-up" }
                    ]
                  },
                  {
                    kategorie: "Quality Metrics",
                    kpis: [
                      { metric: "Error Rate", beispiel: "Fehlerquote in Copilot-generierten Texten" },
                      { metric: "Customer Satisfaction", beispiel: "CSAT-Score für Copilot-unterstützte Responses" },
                      { metric: "Revision Cycles", beispiel: "Anzahl Überarbeitungsschleifen bei Dokumenten" }
                    ]
                  },
                  {
                    kategorie: "Adoption Metrics",
                    kpis: [
                      { metric: "Daily Active Users", beispiel: "% der lizenzierten Nutzer, die täglich aktiv sind" },
                      { metric: "Feature Utilization", beispiel: "Nutzung von Chat, Excel Copilot, PowerPoint Copilot" },
                      { metric: "Power User Growth", beispiel: "Anzahl Nutzer mit >50 Prompts/Woche" }
                    ]
                  },
                  {
                    kategorie: "Financial Metrics",
                    kpis: [
                      { metric: "Cost per Saved Hour", beispiel: "Lizenzkosten / eingesparte Arbeitsstunden" },
                      { metric: "Revenue Impact", beispiel: "Zusätzlicher Umsatz durch schnellere Proposals" },
                      { metric: "Total ROI", beispiel: "(Benefits - Costs) / Costs * 100%" }
                    ]
                  }
                ].map((cat, idx) => (
                  <div key={idx} className="border rounded-lg p-4">
                    <h4 className="font-bold text-primary mb-3">{cat.kategorie}</h4>
                    <div className="space-y-3">
                      {cat.kpis.map((kpi, kidx) => (
                        <div key={kidx} className="pl-4 border-l-2 border-l-primary">
                          <div className="font-semibold text-sm">{kpi.metric}</div>
                          <div className="text-xs text-muted-foreground mt-1">{kpi.beispiel}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="my-6 border-2 border-green-500/20">
            <CardHeader className="bg-gradient-to-r from-green-500/10 to-green-600/10">
              <CardTitle className="flex items-center gap-2 text-base">
                <Target className="w-5 h-5" />
                ROI-Berechnung: Praxis-Beispiel
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <h5 className="font-semibold mb-3">Unternehmen: Mittelständischer Dienstleister (250 MA)</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="font-semibold text-sm mb-2">Investition:</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Lizenzen: 150 x 30€ = 4.500€/Monat</li>
                        <li>• Training: 15.000€ (einmalig)</li>
                        <li>• Change Management: 10.000€</li>
                        <li>• <strong>Jahr 1 Total: 79.000€</strong></li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="font-semibold text-sm mb-2">Einsparungen (Jahr 1):</h6>
                      <ul className="text-sm space-y-1">
                        <li>• 2h/Woche pro MA gespart</li>
                        <li>• 150 MA x 2h x 46 Wochen = 13.800h</li>
                        <li>• @ 50€/h Durchschnitt = 690.000€</li>
                        <li>• <strong>Net Benefit: 611.000€</strong></li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded text-center">
                    <span className="font-bold text-green-800 dark:text-green-200 text-lg">ROI: 773%</span>
                    <span className="text-sm text-green-700 dark:text-green-300 ml-3">Break-Even nach 6 Wochen</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="checkliste" className="mt-12">
          <h2>Checkliste für erfolgreiche Copilot-Einführung</h2>

          <Card className="my-6">
            <CardHeader>
              <CardTitle>Pre-Rollout Checklist (4-6 Wochen vor Go-Live)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    phase: "Governance & Compliance",
                    tasks: [
                      "Governance Committee etabliert",
                      "Acceptable Use Policy definiert",
                      "DSFA durchgeführt und dokumentiert",
                      "Betriebsvereinbarung abgeschlossen",
                      "DLP Policies konfiguriert",
                      "Sensitivity Labels ausgerollt"
                    ]
                  },
                  {
                    phase: "Training & Enablement",
                    tasks: [
                      "Training-Konzept erstellt",
                      "Trainingsmaterialien entwickelt",
                      "Champions identifiziert und geschult",
                      "Pilot-Gruppe trainiert",
                      "Knowledge Base aufgebaut",
                      "Support-Prozess definiert"
                    ]
                  },
                  {
                    phase: "Technical Setup",
                    tasks: [
                      "Lizenzen zugewiesen",
                      "Conditional Access konfiguriert",
                      "Audit Logs aktiviert",
                      "Monitoring Dashboard eingerichtet",
                      "Backup-Strategie definiert",
                      "Incident Response Plan dokumentiert"
                    ]
                  },
                  {
                    phase: "Change Management",
                    tasks: [
                      "Kommunikationsplan erstellt",
                      "Stakeholder identifiziert und informiert",
                      "Success Stories vorbereitet",
                      "Feedback-Mechanismus etabliert",
                      "Rollout-Timeline kommuniziert",
                      "Leadership Buy-In gesichert"
                    ]
                  },
                  {
                    phase: "Measurement & Analytics",
                    tasks: [
                      "Success Metrics definiert",
                      "Baseline Messungen durchgeführt",
                      "Analytics Tools konfiguriert",
                      "Reporting-Rhythmus festgelegt",
                      "ROI-Berechnungsmodell erstellt",
                      "Review-Termine geplant"
                    ]
                  }
                ].map((p, idx) => (
                  <div key={idx} className="border rounded-lg p-4">
                    <h4 className="font-bold text-primary mb-3">{p.phase}</h4>
                    <div className="space-y-2">
                      {p.tasks.map((task, tidx) => (
                        <label key={tidx} className="flex items-center gap-3 text-sm">
                          <input type="checkbox" className="rounded" />
                          <span>{task}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="faq" className="mt-12 mb-12">
          <h2>Häufig gestellte Fragen (FAQ)</h2>

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

        {/* Quellen und weiterführende Links */}
        <section id="quellen" className="mt-12 mb-12">
          <h2>Quellen und weiterführende Links</h2>
          <p className="text-muted-foreground mb-6">
            Offizielle Microsoft-Ressourcen zu Governance, Compliance und Best Practices für Copilot.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="https://learn.microsoft.com/en-us/copilot/microsoft-365/microsoft-365-copilot-privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-colors group"
            >
              <ExternalLink className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold group-hover:text-primary transition-colors">Microsoft 365 Copilot Datenschutz</div>
                <div className="text-sm text-muted-foreground">Offizielle Dokumentation zu Datenschutz und Datenverarbeitung</div>
              </div>
            </a>

            <a
              href="https://learn.microsoft.com/en-us/copilot/microsoft-365/microsoft-365-copilot-setup"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-colors group"
            >
              <ExternalLink className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold group-hover:text-primary transition-colors">Copilot Setup und Bereitstellung</div>
                <div className="text-sm text-muted-foreground">Microsoft-Leitfaden für die sichere Einführung von Copilot</div>
              </div>
            </a>

            <a
              href="https://learn.microsoft.com/en-us/purview/sensitivity-labels"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-colors group"
            >
              <ExternalLink className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold group-hover:text-primary transition-colors">Microsoft Purview Sensitivity Labels</div>
                <div className="text-sm text-muted-foreground">Dokumentation zu Sensitivitätskennzeichnungen für Data Governance</div>
              </div>
            </a>

            <a
              href="https://adoption.microsoft.com/en-us/copilot/responsible-ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-colors group"
            >
              <ExternalLink className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold group-hover:text-primary transition-colors">Responsible AI für Copilot</div>
                <div className="text-sm text-muted-foreground">Microsoft-Leitfaden für verantwortungsvolle KI-Nutzung</div>
              </div>
            </a>
          </div>
        </section>

        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl p-8 text-center my-12 border-2 border-orange-500/20">
          <h3 className="text-2xl font-bold mb-4">Vermeiden Sie diese Fehler mit professioneller Begleitung</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Wir unterstützen Sie bei einer sicheren, compliance-konformen Copilot-Einführung mit bewährten Best Practices.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Kostenlose Beratung anfragen
          </a>
        </div>
      </ContentLayout>
    </>
  );
};

export default CopilotFehler;

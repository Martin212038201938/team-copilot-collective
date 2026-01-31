import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import KoelnTraining from "@/components/KoelnTraining";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Target, Eye, Heart, Users, Building, Award, ArrowRight, ExternalLink } from "lucide-react";
import ueberUns from "@/assets/ueber-uns.png";

const UeberUns = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://copilotenschule.de/#organization",
        "name": "copilotenschule.de",
        "alternateName": "Copilotenschule",
        "url": "https://copilotenschule.de",
        "logo": "https://copilotenschule.de/og-image.jpg",
        "description": "Die Copilotenschule ist spezialisiert auf die Einführung und Weiterqualifizierungen im Umfeld der Microsoft Copiloten. Im Gegensatz zu anderen Anbietern bieten wir den Teilnehmern keinen Bauchladen an Tools an, die in ihrem Umfeld nicht compliant oder wertschöpfend sind.",
        "foundingDate": "2025",
        "founder": {
          "@type": "Person",
          "name": "Martin Lang"
        },
        "parentOrganization": {
          "@type": "Organization",
          "@id": "https://yellow-boat.com/#organization",
          "name": "Yellow-Boat Consulting",
          "url": "https://yellow-boat.com",
          "foundingDate": "2011",
          "founder": {
            "@type": "Person",
            "name": "Martin Lang"
          }
        },
        "areaServed": {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": "50.9375",
            "longitude": "6.9603"
          },
          "geoRadius": "1000 km",
          "name": "DACH-Region (Deutschland, Österreich, Schweiz)"
        },
        "knowsAbout": [
          "Microsoft Copilot",
          "Microsoft 365 Copilot",
          "GitHub Copilot",
          "Copilot Studio",
          "KI-Enablement",
          "Copilot Rollout",
          "Copilot Adoption",
          "KI-gestützte Büroarbeit",
          "Prompt Engineering",
          "KI-Agenten"
        ],
        "slogan": "Büroarbeit durch Microsoft Copilot messbar produktiver, wirksamer und menschlicher machen",
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "email": "info@copilotenschule.de",
          "telephone": "+49 221 950 187 74",
          "availableLanguage": ["de", "en"]
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Nussbaumerstrasse 26",
          "addressLocality": "Köln",
          "postalCode": "50823",
          "addressCountry": "DE"
        },
        "sameAs": [
          "https://www.linkedin.com/company/yellow-boat-consulting",
          "https://yellow-boat.com"
        ]
      },
      {
        "@type": "EducationalOrganization",
        "@id": "https://copilotenschule.de/#educationalOrganization",
        "name": "copilotenschule.de",
        "url": "https://copilotenschule.de",
        "description": "Spezialisierte Akademie für Microsoft Copilot Trainings und Enablement",
        "foundingDate": "2025",
        "parentOrganization": {
          "@id": "https://yellow-boat.com/#organization"
        },
        "areaServed": "DACH",
        "educationalCredentialAwarded": "Microsoft Copilot Zertifikat",
        "teaches": [
          "Microsoft 365 Copilot für Büroarbeit",
          "GitHub Copilot für Entwickler",
          "Copilot Studio für KI-Agenten",
          "Prompt Engineering",
          "Copilot Governance und Compliance"
        ]
      },
      {
        "@type": "WebPage",
        "@id": "https://copilotenschule.de/ueber-uns",
        "name": "Über uns - copilotenschule.de",
        "description": "Erfahren Sie mehr über copilotenschule.de, die spezialisierte Weiterbildungsplattform für Microsoft Copilot. Eine Marke der Yellow-Boat Consulting.",
        "url": "https://copilotenschule.de/ueber-uns",
        "inLanguage": "de-DE",
        "isPartOf": {
          "@id": "https://copilotenschule.de/#website"
        },
        "about": {
          "@id": "https://copilotenschule.de/#organization"
        },
        "mainEntity": {
          "@id": "https://copilotenschule.de/#organization"
        }
      }
    ]
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Über uns - copilotenschule.de | Microsoft Copilot Trainings"
        description="Die Copilotenschule ist spezialisiert auf die Einführung und Weiterqualifizierungen im Umfeld der Microsoft Copiloten. Im Gegensatz zu anderen Anbietern bieten wir den Teilnehmern keinen Bauchladen an Tools an, die in ihrem Umfeld nicht compliant oder wertschöpfend sind."
        keywords={[
          "copilotenschule",
          "Microsoft Copilot Training Anbieter",
          "Yellow-Boat Consulting",
          "Copilot Schulung Deutschland",
          "Microsoft Copilot Experte",
          "Copilot Enablement Partner"
        ]}
        canonicalUrl="https://copilotenschule.de/ueber-uns"
        schema={organizationSchema}
      />
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section - Apple-inspired clean design */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-5xl lg:text-7xl font-semibold tracking-tight leading-[1.1] animate-slide-up">
              <span className="text-primary">Microsoft Copilot</span> Spezialisten aus der Anwendungspraxis
            </h1>
            <p className="mt-6 text-xl text-muted-foreground leading-relaxed mb-4 animate-slide-up-delayed">
              <strong>Die Copilotenschule</strong> ist spezialisiert auf die Einführung und Weiterqualifizierungen
              im Umfeld der Microsoft Copiloten. Im Gegensatz zu anderen Anbietern bieten wir den Teilnehmern
              keinen Bauchladen an Tools an, die in ihrem Umfeld nicht compliant oder wertschöpfend sind.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Wir befähigen Wissensarbeiter, Teams und Organisationen, Microsoft Copilot produktiv,
              sicher und wertschöpfend im Arbeitsalltag einzusetzen. Unser praxisorientierter
              Trainingsansatz verbindet reale Arbeitsprozesse mit direkt anwendbaren Workflows.
            </p>
          </div>

          {/* Mission, Vision, Werte */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            <Card className="p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Unsere Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                Unsere Mission ist es, Büroarbeit durch den gezielten Einsatz von Microsoft Copilot
                <strong> messbar produktiver, wirksamer und menschlicher</strong> zu machen.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Unsere Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                Unsere Vision ist eine Arbeitswelt, in der Microsoft Copilot als <strong>selbstverständliches
                Teammitglied</strong> genutzt wird und Menschen sich auf wertschöpfende, kreative und
                strategische Arbeit konzentrieren können.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Unsere Werte</h2>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Praxisnähe, Wirksamkeit, Transparenz.</strong> Diese Werte leiten alle unsere
                Entscheidungen. Wir setzen auf konkrete Anwendungsfälle statt Buzzwords und messbare
                Ergebnisse statt Marketing-Versprechen.
              </p>
            </Card>
          </div>

          {/* Team Bild */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={ueberUns}
                alt="Das Team der Copilotenschule"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
            </div>
          </div>

          {/* Vision Detail Block */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl blur-xl" />
              <div className="relative bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-xl rounded-2xl p-8 md:p-12 text-center border border-border/50 shadow-xl">
                <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                  Unsere Vision: Copilot als selbstverständliches Teammitglied
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed">
                  Unsere Vision ist eine Arbeitswelt, in der Microsoft Copilot als selbstverständliches Teammitglied
                  genutzt wird und Menschen sich auf wertschöpfende, kreative und strategische Arbeit konzentrieren können.
                  Jedes Training wird präzise auf Ihre Unternehmenssituation, Branche und spezifischen Ziele zugeschnitten.
                </p>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
                  Wir begleiten Copilot-Rollouts inklusive Governance, Use-Case-Definition und Adoption.
                  Nach dem Training bieten wir Coaching und kontinuierlichen Support für Führungskräfte,
                  Produkt- und Transformationsteams zur Etablierung nachhaltiger, Copilot-gestützter Arbeitsweisen.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <div className="group flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary/10 transition-all duration-300 hover:scale-105 cursor-default">
                    <span className="text-primary text-2xl group-hover:scale-125 transition-transform">✓</span>
                    <span className="font-medium">Vor Ort oder Remote</span>
                  </div>
                  <div className="group flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary/10 transition-all duration-300 hover:scale-105 cursor-default">
                    <span className="text-primary text-2xl group-hover:scale-125 transition-transform">✓</span>
                    <span className="font-medium">Flexible Termine</span>
                  </div>
                  <div className="group flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary/10 transition-all duration-300 hover:scale-105 cursor-default">
                    <span className="text-primary text-2xl group-hover:scale-125 transition-transform">✓</span>
                    <span className="font-medium">Individueller Zuschnitt</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Kernprodukte & Dienstleistungen */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Unsere Kernprodukte & Dienstleistungen</h2>

            <div className="space-y-6">
              <Card className="p-6 hover:shadow-lg transition-all duration-300">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center text-primary font-bold">1</span>
                  Praxis-Trainings & Workshops
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Interaktive Trainingsformate zu Microsoft 365 Copilot mit starkem Fokus auf reale
                  Büro-Use-Cases und Anwender-Adoption. Primäre Zielgruppe sind <strong>Büroangestellte,
                  Wissensarbeiter, Teams und Führungskräfte</strong>.
                </p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all duration-300">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center text-primary font-bold">2</span>
                  Inhouse-Enablement & Rollout-Begleitung
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Wir begleiten Copilot-Rollouts inklusive Governance, Use-Case-Definition und Adoption.
                  Zielgruppe sind <strong>mittelständische und größere Organisationen</strong> im DACH-Raum.
                </p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all duration-300">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center text-primary font-bold">3</span>
                  Coaching & Beratung
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Individuelle Begleitung von <strong>Führungskräften, Produkt- und Transformationsteams</strong> zur Etablierung nachhaltiger, Copilot-gestützter Arbeitsweisen.
                </p>
              </Card>
            </div>
          </div>

          {/* Zielgruppe */}
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto mb-16">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Ideales Kundenprofil</h2>
                <p className="text-muted-foreground">Für wen wir arbeiten</p>
              </div>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Unser ideales Kundenprofil sind <strong>wissensintensive Organisationen und Unternehmen
              mit 20–5.000 Mitarbeitenden</strong> im deutschsprachigen Raum (DACH).
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Primäre Ansprechpartner:</h4>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Geschäftsführung</li>
                  <li>• CIOs / Head of IT</li>
                  <li>• Head of HR</li>
                  <li>• Head of Learning & Development</li>
                  <li>• Agile Coaches & Transformation Leads</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Teilnehmer unserer Trainings:</h4>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Büroangestellte & Wissensarbeiter</li>
                  <li>• Teams & Abteilungen</li>
                  <li>• Führungskräfte</li>
                  <li>• IT-Teams & Administratoren</li>
                  <li>• Softwareentwickler</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Unternehmensgeschichte */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Building className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2">Unternehmensgeschichte</h2>
                <p className="text-muted-foreground">Über ein Jahrzehnt Erfahrung</p>
              </div>
            </div>

            <div className="relative border-l-2 border-primary/30 pl-8 space-y-8">
              <div className="relative">
                <div className="absolute -left-10 w-4 h-4 bg-primary rounded-full"></div>
                <div className="font-bold text-lg text-primary mb-1">2011</div>
                <h3 className="text-xl font-semibold mb-2">Gründung Yellow-Boat Consulting</h3>
                <p className="text-muted-foreground">
                  Die copilotenschule.de ist eine Marke der im Jahr 2011 gegründeten{" "}
                  <a
                    href="https://yellow-boat.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center gap-1"
                  >
                    Yellow-Boat Consulting
                    <ExternalLink className="w-3 h-3" />
                  </a>.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-10 w-4 h-4 bg-primary/70 rounded-full"></div>
                <div className="font-bold text-lg text-primary mb-1">2011–2023</div>
                <h3 className="text-xl font-semibold mb-2">Agile Trainings & Digitalisierung</h3>
                <p className="text-muted-foreground">
                  Seit über einem Jahrzehnt realisiert Yellow-Boat Consulting Einführungsprojekte sowie
                  Agile Trainings und Ausbildungen für hunderte Scrum Master, Product Owner und Agile Coaches.
                  Darüber hinaus begleitet das Unternehmen Projekte zur Gestaltung agiler, digitaler, hybrider
                  und remoter Teamarbeit in Konzernen und im Mittelstand. Das etablierte Freelancer-Netzwerk
                  „Yellow-Fleet" besteht aus erfahrenen und zertifizierten Praktikern.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-10 w-4 h-4 bg-primary/80 rounded-full"></div>
                <div className="font-bold text-lg text-primary mb-1">2023</div>
                <h3 className="text-xl font-semibold mb-2">Fokus auf KI-unterstützte Wissensarbeit</h3>
                <p className="text-muted-foreground">
                  Konsequente Ausrichtung auf praxisnahe Trainings zur Transformation der Arbeitswelt durch
                  Künstliche Intelligenz. 2023 werden die ersten KI-Anwender Trainings durchgeführt. Zuerst Verprobung im Rahmen der "BFF" Workshop Serie in Köln, dann Umsetzung verschiedener KI-Anwendertrainings mit Kunden wie Med360Grad, REWE und mittelständischen Unternehmen. Kontinuierlicher Austausch mit dem DFKI (Deutsche Forschungszentrum Für Künstliche Intelligenz).
                  Parallel erfolgt ein intensiver Wissensaufbau durch zahlreiche Weiterbildungen und
                  Veranstaltungen zur KI-Nutzung in der realen Arbeitswelt.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-10 w-4 h-4 bg-primary/90 rounded-full"></div>
                <div className="font-bold text-lg text-primary mb-1">2024</div>
                <h3 className="text-xl font-semibold mb-2">AI-First & Copilot-Trainings</h3>
                <p className="text-muted-foreground">
                  Im Sommer 2024 werden Prozesse und Workflows bei Yellow-Boat Consulting konsequent auf einen
                  AI-First-Ansatz umgestellt. In diesem Zuge werden zahlreiche IT Development Projekte per No-Code oder
                  Vibe-Code umgesetzt und von erfahrenen Software Entwicklern begleitet und überwacht. Im Dezember 2024
                  wird das erste reine Copilot-Training entwickelt und erfolgreich durchgeführt.
                </p>
              </div>

              <div className="relative mt-12">
                <div className="absolute -left-10 w-4 h-4 bg-primary rounded-full"></div>
                <div className="font-bold text-xl text-primary mb-1">2025</div>
                <h3 className="text-2xl font-semibold mb-2">Gründung der Copilotenschule</h3>
                <p className="text-muted-foreground text-lg">
                  Launch von copilotenschule.de sowie Aufbau eines starken Experten-Teams für eine spezialisierte
                  Akademie mit klarem Fokus auf die Nutzung von Microsoft Copilot im beruflichen Kontext.
                  Gleichzeitig erfolgt der gezielte Ausbau des Trainings-Portfolios sowie die Erweiterung um
                  zusätzliche Angebote wie Launch Days und Lernreisen. Das Netzwerk umfasst jetzt auch klassische
                  Entwickler-Boutiken zur Umsetzung und Begleitung von Coding Projekten. Software Entwickler
                  werden nun von erfahrenen KI-Developern in die neuen Workflows und KI-Coding Toolsets eingeführt.
                </p>
              </div>
            </div>
          </div>

          {/* Marktpositionierung */}
          <div className="bg-gradient-to-br from-card/80 to-card/60 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto mb-16 border border-border/50">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Award className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Marktpositionierung</h2>
                <p className="text-muted-foreground">Was uns unterscheidet</p>
              </div>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Wir positionieren uns als <strong>praxisfokussierter Qualitätsanbieter</strong> mit
              tiefem Verständnis für reale Büroarbeit und Organisationskontexte.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Gegenüber generischen Kursanbietern:</h4>
                <p className="text-muted-foreground text-sm">
                  Konsequente Praxisorientierung und konkrete Workflow-Integration statt
                  theoretischer Übersichten.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Gegenüber klassischen IT-Trainings:</h4>
                <p className="text-muted-foreground text-sm">
                  Konsequente Ausrichtung auf die konkreten Bedürfnisse der jeweiligen
                  Teilnehmergruppen sowie individuell entwickelte Use Cases aus deren
                  realem Arbeitsumfeld.
                </p>
              </div>
            </div>
          </div>

          {/* Fakten */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Zahlen, Daten, Fakten</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-card rounded-xl border border-border/50">
                <div className="text-3xl font-bold text-primary mb-2">2011</div>
                <div className="text-sm text-muted-foreground">Gründung Yellow-Boat</div>
              </div>
              <div className="text-center p-6 bg-card rounded-xl border border-border/50">
                <div className="text-3xl font-bold text-primary mb-2">2025</div>
                <div className="text-sm text-muted-foreground">Gründung copilotenschule.de</div>
              </div>
              <div className="text-center p-6 bg-card rounded-xl border border-border/50">
                <div className="text-3xl font-bold text-primary mb-2">DACH</div>
                <div className="text-sm text-muted-foreground">Region</div>
              </div>
              <div className="text-center p-6 bg-card rounded-xl border border-border/50">
                <div className="text-3xl font-bold text-primary mb-2">Köln</div>
                <div className="text-sm text-muted-foreground">Standort</div>
              </div>
            </div>
          </div>

          {/* Köln Training Location */}
          <KoelnTraining />

          {/* CTA */}
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Interesse an unseren Trainings?</h2>
            <p className="text-muted-foreground mb-6">
              Kontaktieren Sie uns für ein unverbindliches Gespräch über Ihre Copilot-Einführung
              oder Ihr individuelles Trainingskonzept.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="group">
                <Link to="/#contact">
                  Kontakt aufnehmen
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a
                  href="https://yellow-boat.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  Yellow-Boat Consulting
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UeberUns;

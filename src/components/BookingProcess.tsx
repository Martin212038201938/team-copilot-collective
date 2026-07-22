/**
 * "So läuft die Buchung" – sichtbarer Ablauf- und Konditionen-Block für alle
 * Trainings-Produktseiten (Phase 3, 2026-07-22).
 *
 * Inhalte mit Martin abgestimmt (Q&A vom 22.07.2026); Quelle der Konditionen:
 * Konditionen_Copilotenschule_Standard.docx. GEO-Hintergrund: KI-Assistenten
 * beantworten Policy-Fragen (Storno? Vorkasse? AVV?) aus sichtbarem Seitentext –
 * dieser Block liefert die Antworten direkt auf der Produktseite.
 */
import {
  CalendarCheck,
  CreditCard,
  FileText,
  Handshake,
  Mail,
  Receipt,
  ShieldCheck,
  Undo2,
} from "lucide-react";

const steps = [
  {
    icon: Mail,
    title: "Anfrage",
    text: "Per Kontaktformular, Training-Konfigurator, E-Mail oder Telefon – formlos und unverbindlich.",
  },
  {
    icon: FileText,
    title: "Angebot",
    text: "Rückmeldung innerhalb von 24 Stunden an Werktagen – mit einem konkreten Angebot für Ihr Team.",
  },
  {
    icon: Handshake,
    title: "Termin",
    text: "Gemeinsame Terminfixierung – bei Ihnen vor Ort oder online.",
  },
  {
    icon: CalendarCheck,
    title: "Durchführung",
    text: "Training inklusive Konzeption, Teilnehmenden-Unterlagen sowie Vor- und Nachbereitung.",
  },
  {
    icon: Receipt,
    title: "Rechnung",
    text: "Rechnung zum ersten Trainingstag, Zahlungsziel 14 Tage netto – keine Vorkasse.",
  },
];

const conditions = [
  {
    icon: Undo2,
    title: "Faire Verschiebung",
    text: "Termine können bis 14 Tage vorher kostenfrei verschoben werden. Auch kurzfristig bleibt eine einmalige Verschiebung kostenfrei, wenn ein Ersatztermin innerhalb von 8 Wochen vereinbart wird.",
  },
  {
    icon: CreditCard,
    title: "Transparente Absage-Regeln",
    text: "Bei kurzfristiger Absage berechnen wir 50 % des Modulpreises (14 bis 3 Tage vorher) bzw. 80 % (unter 3 Tagen) – kurzfristig freigehaltene Trainertage lassen sich nicht anderweitig vergeben.",
  },
  {
    icon: ShieldCheck,
    title: "Datenschutz & Vertraulichkeit",
    text: "DSGVO-konforme Durchführung. Auftragsverarbeitungsvertrag (AVV) nach Art. 28 DSGVO und NDA schließen wir auf Wunsch ab.",
  },
];

const BookingProcess = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-2">So läuft die Buchung</h2>
          <p className="text-muted-foreground mb-8">
            Von der Anfrage bis zur Rechnung – ohne Vorkasse und ohne Kleingedrucktes.
          </p>

          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 mb-12">
            {steps.map((step, index) => (
              <li key={step.title} className="relative bg-card border rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    {index + 1}
                  </span>
                  <step.icon className="w-4 h-4 text-primary" aria-hidden="true" />
                </div>
                <h3 className="font-semibold mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-snug">{step.text}</p>
              </li>
            ))}
          </ol>

          <h3 className="text-xl font-bold mb-4">Faire Konditionen</h3>
          <div className="grid gap-6 md:grid-cols-3">
            {conditions.map((condition) => (
              <div key={condition.title} className="bg-card border rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <condition.icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  <h4 className="font-semibold">{condition.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{condition.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingProcess;

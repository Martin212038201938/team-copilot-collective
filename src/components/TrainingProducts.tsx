import { Link } from "react-router-dom";

/**
 * TrainingProducts – kompakte Produktsektion auf der Startseite (11/2026).
 *
 * Zweck: Besucher aus Google Ads (und alle anderen) sehen in Sekunden, welche
 * Copilot-Schulungen es gibt, für wen und in welchem Format – und kommen mit
 * einem Klick auf die passende Trainingsseite. Gleichzeitig stehen die
 * Suchbegriffe der Anzeigen (Schulung, Training, Kurs, Seminar, Workshop,
 * Inhouse, Copilot Studio, Excel, EU AI Act) als sichtbarer Text im
 * vorgerenderten HTML der Startseite.
 *
 * Bewusst statisch: kein State, keine Icons, keine Bilder, keine zusätzlichen
 * Bibliotheken. react-snap rendert die Sektion damit vollständig vor, es gibt
 * keinen Layout-Sprung beim Laden.
 *
 * Hinweis: index.css setzt globale Abstände für `article h3` und `article p`
 * (Wissensartikel-Typografie). Die Kacheln sind <article>, deshalb stehen
 * mt-0/mb-0 explizit an h3 und p, sonst wächst jede Kachel um ~90 px.
 *
 * Die ganze Kachel ist klickbar (Stretched-Link über das ::after-Pseudo-
 * Element des Titel-Links), der echte <a href> sitzt auf dem <h3>-Titel.
 */

const products = [
  {
    title: "Copilot Grundlagen und KI-Kompetenz",
    href: "/trainings/copilot-grundlagen-prompt-design",
    text: "Gute Prompts für alle Mitarbeitenden. Der Halbtag erfüllt zugleich die Schulungspflicht nach EU AI Act.",
    meta: "Halbtag oder Ganztag · auch ohne Copilot-Lizenz",
  },
  {
    title: "Microsoft 365 Copilot Training",
    href: "/trainings/microsoft-365-copilot-praxis",
    text: "Copilot in Word, Excel, PowerPoint, Outlook und Teams, geübt an Ihren eigenen Arbeitsabläufen.",
    meta: "Ganztag oder 2 Tage · mit Copilot-Lizenz",
  },
  {
    title: "Copilot Studio Schulung: KI-Agenten",
    href: "/trainings/copilot-studio-ki-agenten",
    text: "Eigene Agenten für Ihre Fachabteilung bauen und mit Unternehmensdaten verbinden.",
    meta: "1 Tag · für Power User",
  },
  {
    title: "Copilot Online-Kurs in 6 Wochen",
    href: "/trainings/copilot-lernreise",
    text: "Die Lernreise: jede Woche ein neuer Anwendungsfall, dazwischen Praxisaufgaben im eigenen Alltag.",
    meta: "6 × 2 Stunden live online",
  },
  {
    title: "Copilot in Excel für Controlling",
    href: "/trainings/copilot-excel-rechnungswesen-controlling",
    text: "Auswertungen, Soll-Ist-Vergleiche und Reporting im Rechnungswesen mit Copilot in Excel.",
    meta: "Ganztag · inhouse, online oder in Köln",
  },
  {
    title: "Train-the-Trainer für Copilot",
    href: "/trainings/train-the-trainer-copilot",
    text: "Interne Trainer und Key User ausbilden, die Copilot-Schulungen im eigenen Haus durchführen.",
    meta: "1 oder 2 Tage · inhouse oder in Köln",
  },
];

const linkClass =
  "font-medium text-[#313E72] underline underline-offset-4 decoration-[#313E72]/30 hover:text-[#67C7EF] hover:decoration-[#67C7EF] transition-colors";

const TrainingProducts = () => (
  <section
    id="copilot-schulungen"
    aria-labelledby="copilot-schulungen-heading"
    className="py-6 md:py-7 bg-background border-b border-border/40"
  >
    <div className="container mx-auto px-4">
      <h2
        id="copilot-schulungen-heading"
        className="text-2xl md:text-3xl font-bold text-center leading-tight [hyphens:manual]"
      >
        Copilot Schulungen und Trainings für Unternehmen
      </h2>
      <p className="mt-2 mb-0 text-center text-sm md:text-base text-muted-foreground max-w-5xl mx-auto">
        Als Inhouse-Schulung oder Workshop bei Ihnen, als Seminar in unserer Akademie in Köln oder
        live online über Teams und Zoom.
      </p>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {products.map((p) => (
          <article
            key={p.href}
            className="relative rounded-lg border border-border bg-card px-4 py-3 transition-colors hover:border-[#67C7EF] hover:shadow-sm focus-within:border-[#67C7EF]"
          >
            <h3 className="mt-0 mb-0 text-base font-semibold leading-snug">
              <Link
                to={p.href}
                className="text-[#313E72] hover:text-[#67C7EF] transition-colors after:absolute after:inset-0 after:content-['']"
              >
                {p.title}
              </Link>
            </h3>
            <p className="mt-1 mb-0 text-sm leading-snug text-foreground/80">{p.text}</p>
            <p className="mt-1.5 mb-0 text-xs leading-snug text-neutral-500">{p.meta}</p>
          </article>
        ))}
      </div>

      <p className="mt-4 mb-0 text-center text-sm md:text-base">
        Für Führungskräfte gibt es einen eigenen{" "}
        <Link to="/trainings/copilot-fuehrungskraefte" className={linkClass}>
          Workshop zur Copilot-Einführung
        </Link>
        .
      </p>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm md:text-base">
        <Link to="/trainings" className={linkClass}>
          Alle Trainings ansehen
        </Link>
        <Link to="/training-konfigurator" className={linkClass}>
          Training konfigurieren
        </Link>
      </div>
    </div>
  </section>
);

export default TrainingProducts;

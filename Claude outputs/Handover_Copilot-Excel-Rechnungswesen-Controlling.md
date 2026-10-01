# Handover: neues Training „Copilot in Excel für Rechnungswesen & Controlling“

Für: team-copilot-collective (Umsetzung auf copilotenschule.de)
Von: Martin / Yellow-Boat Consulting
Stand: 01.10.2026

## Kontext

Neues Ganztagesprodukt für die Zielgruppe Rechnungswesen & Controlling (gemischt, ein Tag). Fokus: Copilot in Excel, Berichtswesen (nur Excel, kein Power BI), Agent Builder. Trainerin wird **nicht namentlich** genannt, nur über ihre Qualifikationen vorgestellt – **Grund: Kunden sollen sie nicht direkt kontaktieren können, ohne über die Copilotenschule zu gehen** (Geschäftsschutz, nicht fachliche Unsicherheit). Laut CV/Anschreiben hat sie belegte Controlling-Erfahrung (Budgetkontrolle, Mittelabstimmung, Jahresplanung sowie frühere operative Controlling-Tätigkeit im Einzelhandel) und hat selbst Schulungsinhalte zu Copilot/Excel, Prompting, Datenschutz, EU AI Act und KI-Qualitätskontrolle für den IHK-Lehrplan „Digitale und KI-gestützte Büro- und Finanzprozesse“ erarbeitet – siehe Formulierung unten, weiterhin ohne Overselling.

Datengrundlage/Vollversion mit Preis-Logik und didaktischer Begründung: `Produktkonzept Copilot in Excel für Rechnungswesen und Controlling.docx` (liegt in `Copilotenschule Sales/Claude outputs/`).

## Trainer-Zuordnung: sichtbar anonym, unsichtbar mit Namen (Entscheidung von Martin)

Grund für die Anonymität: Kunden sollen die Trainerin nicht direkt kontaktieren können, sondern immer über die Copilotenschule laufen (Geschäftsschutz, keine fachliche Unsicherheit).

Im **sichtbaren** Bereich der Seite (Text, UI, keine namentliche AuthorBox) wird die Trainerin **nicht benannt**, nur über ihre Qualifikationen vorgestellt. Im **unsichtbaren** Bereich (strukturierte Daten/Schema.org, nicht im gerenderten Text) darf sie als Natalia Fratz mit LinkedIn-Verlinkung auftauchen, **sofern das für GEO/LLM-Sichtbarkeit etwas bringt** – das bitte technisch einschätzen:

Hinweis dazu (von Martin bereits geklärt, kein offener Punkt mehr): Schema.org/JSON-LD ist nicht auf der gerenderten Seite sichtbar, aber maschinenlesbar und wird von Suchmaschinen/Crawlern mitindexiert – wer gezielt danach sucht, könnte Namen und LinkedIn-Profil trotzdem finden. **Das ist ausdrücklich in Ordnung so** – Hauptsache, es steht nicht im sichtbaren Bereich der Seite.

- `authors.ts` ist aktuell an eine sichtbare `AuthorBox`-Komponente gekoppelt (Name, Foto, Bio, LinkedIn werden gerendert). Für dieses Training darf diese Box **nicht** erscheinen.
- Falls das Schema (`Person`, `sameAs`) unabhängig von der sichtbaren Box erzeugt werden kann (z. B. nur im JSON-LD der Seite, ohne zugehörige UI-Komponente), bitte so umsetzen: Natalia Fratz als `Person` im Schema, `sameAs` mit ihrem LinkedIn-Profil, ggf. als Teil eines `Course`/`EducationalOccupationalCredential`-Markups.
- Falls Name/Foto/Bio und Schema in `authors.ts` technisch nicht trennbar sind, bitte **nicht** erzwingen – dann bleibt es bei anonym (sichtbar und unsichtbar), Rücksprache mit Martin.
- LinkedIn-Profil: `https://www.linkedin.com/in/natalia-fratz-491b11354/`

### Sichtbarer Text: fachlicher Hintergrund statt Personen-Profil

Wichtig für den Ton: bewusst **nicht** als Profil einer einzelnen Person framen (kein „Die Trainerin ist…“), sondern als fachlichen Hintergrund, der in das Training einfließt – das lenkt den Fokus weg davon, dass es sich um eine einzelne Person handelt, ohne etwas Falsches zu behaupten. Deshalb auch **keine** Überschrift à la „Die Trainerin“/„Der Trainer“ verwenden, sondern z. B. „Fachlicher Hintergrund“ oder „Expertise im Hintergrund“.

Das `Training`-Interface hat kein Feld für einen Profiltext (anders als `authors.ts`, das aber hier nicht sichtbar verwendet werden soll). Für den sichtbaren Bereich der Seite bitte folgenden Text irgendwo unterbringen – entweder als neues optionales Feld (z. B. `backgroundExpertise?: string`, gerendert in `TrainingDetail.tsx`) oder, falls das zu groß für diesen Sprint ist, als zusätzlicher Absatz am Ende von `description`:

> In dieses Training fließt Praxiserfahrung aus Finanzbuchhaltung, Controlling-nahen Aufgaben und eigener Entwicklung von KI-Schulungsinhalten ein: IHK-geprüfte Finanzbuchhalter-Qualifikation und staatlich geprüfte Bilanzbuchhalter-Qualifikation, ingenieurwissenschaftliche und informatische Ausbildung (Diplom-Ingenieurwesen sowie Bachelor in Informatik & Mathematik). Mehrjährige Praxis in der Finanzbuchhaltung mehrerer Unternehmen und Steuerberatungsgesellschaften – unter anderem mit DATEV, SAP, ABAS und weiteren Buchhaltungssystemen, inklusive vorbereitender Jahresabschlussarbeiten, Kontenabstimmung und Mandantenbetreuung. Dazu mehrjährige Erfahrung in Controlling-nahen Aufgaben: Budgetkontrolle, Mittelabstimmung und Unterstützung der Jahresplanung sowie, aus einer früheren Tätigkeit im Einzelhandel, operative Controlling- und Prozesskoordination. Ergänzt durch eine Weiterbildung zur KI-Spezialistin (AI-Engineering mit Python und SQL) und Erfahrung mit Automatisierungswerkzeugen wie Power BI, Zapier und Make. Dieser Hintergrund ist zugleich Grundlage eines vollständigen IHK-Lehrplans zu digitalen und KI-gestützten Büro- und Finanzprozessen – mit eigens erarbeiteten Lektionen zu Microsoft Copilot in Excel, Prompting, Datenschutz, EU AI Act und der Qualitätskontrolle von KI-Ergebnissen.

Keine Namensnennung, kein Foto, kein Studiengang-/Herkunftsdetail über das Obige hinaus. Text bewusst in unpersönlicher Formulierung gehalten (keine „sie“/„er“-Pronomen, kein „die Trainerin“) – bitte beim Einbauen nicht wieder personalisieren.

## Offene Punkte für das Dev-Team (technisch, nicht mehr bei Martin offen)

1. Trainer-Schema: technisch prüfen, ob sichtbar/unsichtbar sauber trennbar ist (siehe Abschnitt oben), inkl. der Frage, wo der sichtbare Hintergrund-Text rendert (neues Feld vs. Teil von `description`).
2. **Datenmodell-Lücke Zwei-Preise-Problem**: `Training.visiblePrice` kennt nur einen Preis pro Eintrag, `BookingFormat` hat aktuell gar kein Preisfeld (siehe Interface-Definition in `trainings.ts`). Dieses Training braucht aber zwei Preise – 3.200 € Ganztag, 1.950 € Halbtag. Drei Optionen, bitte technisch entscheiden:
   - a) `BookingFormat` um ein optionales `price`-Feld erweitern, damit jede Variante ihr eigenes `Offer`-Schema bekommt (sauberste Lösung, wirkt sich auf alle Trainings mit mehreren Formaten aus, z. B. `microsoft-365-copilot-praxis`).
   - b) Nur der Ganztag bekommt den maschinenlesbaren Preis über `visiblePrice` (3.200 €), der Halbtag-Preis taucht nur als Text in der `bookingFormats`-Beschreibung auf, nicht im Schema.
   - c) Zwei separate `Training`-Einträge/Slugs – nicht empfohlen, würde die SEO-Bündelung auf eine URL (siehe Recherche oben) konterkarieren.
   - Unten mit Option b) befüllt (nur Ganztag-Preis im Schema), bis das geklärt ist.

## Zusatzauftrag: vorhandenen Traffic gezielt auf dieses Angebot lenken

Martins Auftrag: den bestehenden Traffic zu „copilot in excel aktivieren“ und ähnlichen Visitor-Treibern smart auf dieses konkrete Angebot bringen, Verlinkung von den Fachartikeln sehr prominent.

**Mechanismus ist bereits vorhanden** – bitte nutzen, nicht neu bauen: die Komponente `TrainingCTA` (`src/components/TrainingCTA.tsx`), die laut ihrem eigenen Kommentar genau für dieses Problem gebaut wurde („Monatsreview 06/2026 — 297 Sessions/30T erreichten Wissensartikel, 0 % navigierten weiter zum Angebot“), inkl. Click-Tracking (`setSessionTag("content_cta_click", href)`).

Betroffene Artikel und konkreter Vorschlag:

- **`src/pages/CopilotInExcelAktivieren.tsx`** – der stärkste organische Treiber der Domain („copilot excel“, Position 1,5 laut GSC). Enthält bereits zwei `TrainingCTA`-Blöcke, beide zum allgemeinen Praxis-Training (`/trainings/microsoft-365-copilot-praxis`). Diese **nicht entfernen** (breiter Traffic, nicht nur Finance), aber **eine dritte, zugespitzte CTA ergänzen**, die Rechnungswesen/Controlling-Leser gezielt abholt, z. B. direkt nach dem Abschnitt zu den Aktivierungs-Voraussetzungen:
  ```tsx
  <TrainingCTA
    topic="Copilot in Excel für Rechnungswesen & Controlling"
    benefit="Arbeiten Sie im Rechnungswesen oder Controlling? Im spezialisierten Workshop geht es direkt um Kontenabstimmung, Soll-Ist-Vergleiche und Berichtswesen – mit echten Finance-Daten."
    href="/copilot-excel-rechnungswesen-controlling"
    label="Zum Finance-Workshop"
  />
  ```
- **`src/pages/CopilotFuerExcel.tsx`** – zweiter großer Excel-Artikel, erwähnt Controlling bereits in einer FAQ-Antwort, hat aber noch **gar keine** `TrainingCTA`. Dort eine `TrainingCTA` mit denselben Props wie oben ergänzen, platziert nah an der Controlling-Erwähnung.
- **`relatedWorkshops`** im neuen Trainings-Eintrag (siehe Code-Block unten) verlinkt zusätzlich cross-funktional von anderen Trainingsseiten.
- Sofern es weitere Fachartikel mit Buchhaltungs-/Controlling-Bezug gibt (Liste oben per Grep ermittelt: u. a. `CopilotRoiBerechnen.tsx`, `KiRealitaet2026.tsx`), dort nur verlinken, wo es thematisch wirklich passt – keine Linkspam-CTAs in unpassenden Artikeln.

Priorität: da „copilot excel“ der nachweislich stärkste SEO-Hebel der Domain ist, sollte diese Verlinkung nicht nebenbei, sondern vor dem nächsten Content-Sprint umgesetzt werden.

## SEO-Grundlage (recherchiert, nicht geschätzt)

- **copilot excel** ist laut Google Search Console (16 Monate, copilotenschule.de) mit Position 1,5 die stärkste Query der gesamten Domain – einziger bereits nachweislich performender Begriff im Themenfeld.
- Google Ads Keyword-Planer (Deutschland, Konto „Martin2“): „copilot buchhaltung“, „copilot controlling“, „copilot rechnungswesen“, „copilot excel schulung“ liegen jeweils bei **0–10 Suchanfragen/Monat** – keine direkte Nachfrage nach diesen Kombinationen.
- „ki buchhaltung“, „ki controlling“, „künstliche intelligenz buchhaltung“ haben reales Volumen (100–1.000/Monat), zielen aber auf allgemeine KI-Informationssuche, nicht auf Schulungsbuchung – daher nicht als Seitentitel geeignet.
- Konsequenz: Titel/URL bauen auf „copilot excel“ auf, Rechnungswesen/Controlling als Zielgruppen-Ergänzung.

### Software-Begriffe als weitere potenzielle Suchbegriffe (noch nicht geprüft)

Aus dem Hintergrund-CV ergibt sich eine vollständige Liste an Software-Namen, die Besucher als Suchbegriffe verwenden könnten (z. B. „Copilot DATEV“, „Copilot Lexoffice“) – unabhängig davon, ob der Workshop diese Systeme behandelt:

- Buchhaltung/ERP: DATEV, NLB, ABAS, SAP (Grundkenntnisse), Lexware, Lexoffice, Sage, cloudbasierte Tools
- Datenanalyse & Automatisierung: Python, SQL, Power BI, Zapier, Make, draw.io
- Office: MS Office (Word, Excel, Outlook, PowerPoint, Access)
- Sonstiges: Zeiterfassung (Bosch, ZEUS), Windows, Linux

**Noch offen/nicht recherchiert**: Diese Kombinationen (v. a. „copilot“ + DATEV/Lexware/Lexoffice/SAP) wurden im Google Ads Keyword-Planer noch nicht geprüft – bisher nur die generischen Begriffe oben. Bevor das Dev-Team `keywords` final befüllt, lohnt sich diese Zusatzrecherche; könnte ungenutztes Suchvolumen aufdecken, das die aktuelle Keyword-Liste unten noch nicht abbildet.

## Inhalt, gemappt auf das `Training`-Interface (`src/data/trainings.ts`)

```ts
{
  slug: "copilot-excel-rechnungswesen-controlling",
  icon: Brain, // oder passenderes Icon nach Konvention der Datei prüfen
  title: "Copilot in Excel für Rechnungswesen & Controlling",
  duration: "Ganztag (8 Stunden)",
  durationISO: "PT8H",
  description: "Ein Praxistag für Mitarbeitende aus Rechnungswesen und Controlling, die mit Microsoft 365 Copilot ihre tägliche Arbeit in Excel und im Berichtswesen beschleunigen wollen. Der Workshop bleibt nah an den tatsächlichen Copilot-Funktionen: Formeln und Datenanalyse in Excel, Aufbereitung wiederkehrender Berichte sowie ein erstes eigenes Agenten-Konzept für eine wiederkehrende Aufgabe aus dem Arbeitsalltag. Kein Buchhaltungs- oder Controlling-Grundlagentraining – vorausgesetzt werden die fachlichen Kenntnisse der Teilnehmenden, vermittelt wird der sichere und wirksame Umgang mit Copilot in diesem Umfeld. Unabhängig vom eingesetzten Buchhaltungs- oder ERP-System – ob DATEV, SAP, Lexware, Lexoffice, ABAS, Sage oder ein anderes System: Der Workshop setzt an Excel an, nicht am jeweiligen Vorsystem.",
  features: [
    "Formeln aus natürlicher Sprache generieren – z. B. für Kontenabstimmung oder Soll-Ist-Vergleiche",
    "Datenanalyse: Trends und Auffälligkeiten in Buchungs- und Planungsdaten erkennen",
    "Pivot-Tabellen automatisch erstellen und anpassen",
    "Die COPILOT()-Funktion: KI-gestützte Auswertung direkt in der Zelle, die sich bei neuen Daten automatisch aktualisiert",
    "Wiederkehrende Reports (Monats-/Quartalsberichte) mit Copilot vorbereiten",
    "Soll-Ist-Vergleiche und Abweichungsanalysen aufbereiten",
    "Diagramme und kurze Management-Zusammenfassungen aus Zahlen erzeugen",
    "Agent Builder in Microsoft 365 Copilot – No-Code-Einstieg für Fachanwender",
    "Konzept für einen eigenen Agenten zu einer wiederkehrenden Aufgabe (z. B. Checkliste Monatsabschluss, Erinnerung bei offenen Posten) – Umsetzung optional im Nachgang"
  ],
  tiers: ["paid"],
  // Zwei buchbare Varianten: Ganztag (alle Module) und Halbtag (nur Excel + Berichtswesen,
  // ohne Grundlagen/Grounding/EU-AI-Act-Pflichtschulung/Halluzinationsvermeidung und ohne
  // Agenten-Modul). Preise unten in bookingFormats, nicht sichtbar auf der Seite (siehe Hinweis unten).
  questionLead: "Wie nutze ich Microsoft 365 Copilot in Excel und im Berichtswesen für Rechnungswesen und Controlling?",
  prerequisites: "Microsoft 365 Copilot-Lizenz (Business/Enterprise) für alle Teilnehmenden. Grundkenntnisse in Excel sowie fachliche Kenntnisse in Rechnungswesen/Controlling werden vorausgesetzt und nicht vermittelt.",
  format: "Live-Online (Microsoft Teams), vor Ort beim Kunden oder bei uns in Köln-Nippes",
  level: "Fortgeschrittene (mit Lizenz, fachliche Vorkenntnisse vorausgesetzt)",
  audienceShort: "Mitarbeitende aus Rechnungswesen und Controlling",
  groupSize: "bis 12 Teilnehmende",
  certificate: "Personalisiertes Teilnahmezertifikat auf Wunsch",
  targetAudience: [
    "Mitarbeitende aus Finanzbuchhaltung, Rechnungswesen und Controlling",
    "Arbeiten regelmäßig in Excel mit Buchungs-, Planungs- oder Reportingdaten",
    "Verfügen über eine Microsoft 365 Copilot Lizenz (Business oder Enterprise)"
  ],
  learningOutcomes: [
    "Copilot sicher und compliant mit sensiblen Finanzdaten einsetzen",
    "Excel-Formeln, Datenanalysen und Pivot-Tabellen per Copilot erstellen und prüfen",
    "Wiederkehrende Reports und Soll-Ist-Vergleiche mit Copilot vorbereiten",
    "Das Konzept für einen eigenen Agenten zu einer wiederkehrenden Aufgabe entwickeln"
  ],
  visiblePrice: {
    perPerson: 267, // Rechengrundlage bei 12 TN, nicht sichtbar auf der Seite
    perGroup: 3200,
    unitLabel: "pro Teilnehmer",
    note: "zzgl. Reisekostenpauschale 350 € bei Präsenz beim Kunden"
  },
  bookingFormats: [
    {
      name: "Ganztag Live-Online (8 Stunden)",
      modes: ["online"],
      durationISO: "PT8H",
      description: "Alle vier Module. Über Microsoft Teams, bis 12 Teilnehmende."
    },
    {
      name: "Ganztag vor Ort beim Kunden (8 Stunden)",
      modes: ["onsite"],
      durationISO: "PT8H",
      description: "Alle vier Module. Inhouse beim Kunden, bis 12 Teilnehmende, zzgl. Reisekostenpauschale."
    },
    {
      name: "Ganztag bei uns in Köln-Nippes (8 Stunden)",
      modes: ["onsite"],
      durationISO: "PT8H",
      description: "Alle vier Module. In unseren eigenen Räumen in Köln-Nippes, bis 12 Teilnehmende."
    },
    {
      name: "Halbtag (4 Stunden)",
      modes: ["onsite", "online"],
      durationISO: "PT4H",
      description: "Kompakte Variante ohne Grundlagenmodul und ohne Agenten-Konzept – nur Copilot in Excel und Berichtswesen. Live-Online, beim Kunden oder bei uns in Köln-Nippes."
    }
  ],
  // Optionale Erweiterung (noch nicht ins BookingFormat-Modell eingepasst, siehe offener Punkt
  // Preis-Datenmodell oben): "Berichtswesen mit Power BI", +2 Stunden, 800 € zzgl. (offen zur
  // Entscheidung). Basis-Workshop bleibt bewusst Excel-only; Power BI ist zubuchbar, weil die
  // Qualifikation dafür vorhanden ist – Kunden sollen selbst entscheiden können, ob sie es wollen.
  metaTitle: "Copilot in Excel für Rechnungswesen & Controlling | copilotenschule.de",
  metaDescription: "Ganztagesworkshop: Microsoft 365 Copilot in Excel für Rechnungswesen & Controlling. Formeln, Datenanalyse, Berichtswesen, eigene Agenten. Online, beim Kunden oder in Köln-Nippes.",
  keywords: ["Copilot in Excel", "Copilot Excel Schulung", "Copilot Rechnungswesen", "Copilot Controlling", "Microsoft 365 Copilot Buchhaltung", "Copilot DATEV", "Copilot Lexoffice", "Copilot SAP"], // DATEV/Lexoffice/SAP-Kombinationen noch nicht im Keyword-Planer geprüft, siehe SEO-Abschnitt oben
  faqs: [
    {
      question: "Vermittelt der Workshop Buchhaltungs- oder Controlling-Grundlagen?",
      answer: "Nein. Vorausgesetzt werden die fachlichen Kenntnisse der Teilnehmenden aus Rechnungswesen und Controlling. Vermittelt wird ausschließlich der sichere und wirksame Umgang mit Microsoft 365 Copilot in diesem Arbeitsumfeld."
    },
    {
      question: "Baut der Workshop auf Power BI auf?",
      answer: "Nein, der Fokus liegt bewusst auf Excel: Pivot-Tabellen, Power Query und die Copilot-Funktionen direkt in Excel. Power BI ist nicht Teil dieses Trainings."
    },
    {
      question: "Bauen wir im Workshop einen fertigen, einsatzbereiten Agenten?",
      answer: "Im Workshop entsteht das Konzept für einen eigenen Agenten zu einer wiederkehrenden Aufgabe aus dem Arbeitsalltag der Teilnehmenden. Die technische Umsetzung erfolgt im Nachgang; eine freiwillige Follow-up-Session für Vorstellung und offene Fragen kann optional ergänzt werden."
    }
  ],
  relatedWorkshops: ["microsoft-365-copilot-praxis"] // Vorschlag, bitte prüfen
}
```

## Hinweise zur Umsetzung

- Icon: Branchenkonvention in `trainings.ts` prüfen – ggf. eigenes Icon statt `Brain` wählen, wenn ein passenderes vorhanden ist (z. B. Richtung Tabelle/Diagramm).
- Route/Detailseite läuft vermutlich automatisch über `TrainingDetail.tsx` + `trainings.ts`-Eintrag, analog zu bestehenden Einträgen wie `microsoft-365-copilot-praxis` – bitte gegenprüfen, ob zusätzlich eine Listung in `Workshops.tsx`/`UnsereAngebote.tsx` nötig ist.
- Canonical/Meta exakt wie oben übernehmen (nicht umformulieren) – Titel und URL sind das Ergebnis der SEO-Recherche, nicht freier Vorschlag.
- Verweis „geprüfte Qualifikationen statt Name“: Falls die Seite technisch zwingend einen Autor/Trainer verlangt, bitte vor Umsetzung mit Martin klären (siehe Abschnitt zur Trainer-Zuordnung oben).
- Beide Preise (3.200 € Ganztag, 1.950 € Halbtag) sind nur Rechengrundlage fürs Schema/strukturierte Daten, werden laut Seitenkonvention (seit 30.09.2026) nicht mehr sichtbar auf der Seite angezeigt.

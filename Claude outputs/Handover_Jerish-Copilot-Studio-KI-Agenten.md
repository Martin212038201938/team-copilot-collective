# Handover: Jerish George als Trainer für "KI-Agenten und Automatisierung mit Microsoft Copilot Studio"

**Datum:** 2026-10-01
**Betroffene Datei:** `src/data/trainings.ts`
**Betroffener Eintrag:** `slug: "copilot-studio-ki-agenten"` (Zeile ~589–665 im aktuellen Stand)
**Betroffene weitere Dateien:** 4 Wissen-Artikel (TrainingCTA ergänzen, siehe unten)

---

## 1. Entscheidung und Kontext

Geprüft wurde, ob für den neuen Trainer Jerish George ein eigenes neues Ganztagsprodukt im Copilot-Agenten-/Automatisierungsumfeld aufgebaut werden soll. Dabei hat sich gezeigt: Im Code existiert bereits ein inhaltlich fast deckungsgleiches Training – **"KI-Agenten und Automatisierung mit Microsoft Copilot Studio"** (`copilot-studio-ki-agenten`) – das aktuell **keinem Trainer zugeordnet ist** (kein `instructorPerson`, kein `backgroundExpertise`).

Entscheidung (mit Martin abgestimmt): **Kein neues Produkt.** Stattdessen wird Jerish diesem bestehenden Training als Trainer zugeordnet – nach demselben "sichtbar anonym, unsichtbar mit Namen"-Muster, das bereits bei Natalia Fratz (`copilot-excel-rechnungswesen-controlling`) umgesetzt ist. Zusätzlich wird der Trainingsinhalt selbst anhand von Jerishs konkreter Expertise geschärft (Low-Code-Grenzen, eigene Schnittstellen/APIs, datengetriebene Agenten) – das war ein expliziter Nachtrag von Martin.

Diese Handover-Datei enthält alle Textvorschläge als fertigen, einfügbaren Code. Alle Formulierungen basieren auf dokumentierten Fakten aus Jerishs Trainer-Bewerbung und CV – nichts wurde erfunden.

---

## 2. Warum Jerish fachlich passt

- Microsoft Certified Trainer (MCT) – offizielle Microsoft-Trainerzulassung
- Über 7 Jahre Erfahrung als Full-Stack-Softwareentwickler (Vue.js, PHP/Symfony, Node.js), inkl. Schnittstellen und Automatisierungen
- IHK-geprüfter Ausbilder (AEVO)
- Zertifizierter Microsoft Power BI Data Analyst (PL-300)
- Agile-Scrum-Zertifizierung (EXIN)
- Mehr als 2.000 Unterrichtseinheiten in über 20 Kursmodulen, 99 % Zufriedenheit (50+ Bewertungen)

---

## 3. Offener Punkt: LinkedIn-Profil

Ich konnte über Websuche und seine eigenen E-Mails **kein öffentliches LinkedIn-Profil von Jerish George zuverlässig finden** (mehrere Namensvetter, kein eindeutiger Treffer, auch nicht auf seiner eigenen Website verlinkt). **Falls Martin den LinkedIn-Link hat, bitte nachreichen** – dann `sameAs` entsprechend ergänzen.

Bis dahin wird ersatzweise seine eigene Website als `sameAs` verwendet:
`https://jerishgeorge.de/`

---

## 4. Code-Vorschlag: neue Felder für den bestehenden Eintrag

Einfügen **nach `businessImpact`, vor `metaTitle`** im `copilot-studio-ki-agenten`-Eintrag (gleiche Position, an der bei Natalias Eintrag `backgroundExpertise`/`instructorPerson` stehen, nur dort kurz vor `visiblePrice`/`bookingFormats`):

```ts
    backgroundExpertise: "In dieses Training fließt eine Kombination ein, die am Markt selten in einer Person zusammenkommt: tiefe Software-Entwicklungspraxis und offizielle Microsoft-Trainings-Qualifikation. Über sieben Jahre Erfahrung als Full-Stack-Softwareentwickler, unter anderem mit Vue.js, PHP/Symfony und Node.js, bilden das technische Fundament, um Copilot-Studio-Agenten und Power-Automate-Workflows nicht nur zu bedienen, sondern ihre Funktionsweise wirklich zu verstehen. Dazu kommen die offizielle Microsoft-Trainerzulassung (Microsoft Certified Trainer), eine IHK-geprüfte Ausbildereignung (AEVO) für methodisch fundierte Vermittlung sowie eine Zertifizierung als Microsoft Power BI Data Analyst, die zusätzliche analytische Tiefe im Umgang mit Daten und Automatisierungen mitbringt. Ergänzt durch eine Agile-Scrum-Zertifizierung und praktische Projekterfahrung – hilfreich, wenn Automatisierungsvorhaben im Team eingeführt werden sollen. Diese Kombination aus Entwickler-Perspektive und Trainer-Erfahrung erlaubt es, im Training nicht nur zu zeigen, wie man klickt, sondern zu erklären, was im Hintergrund passiert – und wo typische Stolperfallen bei Agenten und Automatisierungen liegen.",
    instructorPerson: {
      name: "Jerish George",
      sameAs: ["https://jerishgeorge.de/"]
      // TODO: durch LinkedIn-Link ersetzen/ergänzen, sobald Martin ihn nachreicht
    },
```

(`backgroundExpertise` bewusst unpersönlich formuliert – keine "er/sie"-Pronomen, keine Überschrift "Der Trainer" – analog zur Konvention bei Natalias Training.)

---

## 5. Inhaltliche Schärfung des Trainings anhand von Jerishs Expertise

Das bestehende Training ist aktuell eher allgemein auf Copilot Studio als Low-Code-Plattform ausgerichtet. Jerishs Stärke liegt aber genau dort, wo Low-Code an Grenzen stößt – eigene Schnittstellen, Datenbanken und bestehende Unternehmenssoftware anbinden sowie Power-BI-gestützte, datengetriebene Agenten. Das ist eine Differenzierung, die kaum ein anderer Trainer im Portfolio glaubwürdig anbieten kann. Alle folgenden Vorschläge sind **Ergänzungen/Schärfungen**, keine Neuerfindung – Grundstruktur, Preise und Formate (Ganztag/Hackathon) bleiben wie bisher.

### 5.1 `description` – ersetzen durch:

```ts
    description: "Fortgeschrittenes Training zur Entwicklung intelligenter KI-Agenten und Automatisierungs-Workflows mit Microsoft Copilot Studio. Sie lernen, wie Sie benutzerdefinierte Copilot-Agenten für spezifische Geschäftsprozesse erstellen, diese mit Unternehmensdaten verbinden und über Power Automate sowie eigene API-Anbindungen in bestehende Systeme integrieren. Der Workshop geht bewusst über reine Low-Code-Klicks hinaus: Wo Copilot Studio an seine Grenzen stößt, zeigen wir, wie sich Agenten sauber mit externen Schnittstellen, Datenbanken und bestehender Unternehmenssoftware verbinden lassen.",
```

### 5.2 `features` – zwei zusätzliche Punkte an die bestehende Liste anhängen:

```ts
      "Eigene APIs und Schnittstellen anbinden: wo Copilot Studio an Grenzen stößt und wie sich Agenten sauber mit bestehender Unternehmenssoftware verbinden lassen",
      "Datengetriebene Agenten: Auswertungen und Kennzahlen aus Power BI bzw. strukturierten Daten als Kontext für Agenten nutzen",
```

### 5.3 `learningOutcomes` – einen zusätzlichen Punkt anhängen:

```ts
      "Sie verstehen, wie sich Copilot-Agenten technisch sauber mit eigenen APIs, Datenbanken und bestehender Unternehmenssoftware verbinden lassen – nicht nur über Standard-Konnektoren",
```

### 5.4 `faqs` – eine zusätzliche FAQ anhängen:

```ts
      {
        question: "Was unterscheidet diesen Workshop von einem reinen No-Code/Low-Code-Einstieg?",
        answer: "Copilot Studio ist zwar Low-Code, aber bei komplexeren Integrationen – eigene APIs, Datenbanken, bestehende Unternehmenssoftware – braucht es echtes technisches Verständnis. Der Workshop wird von einem Trainer mit über sieben Jahren eigener Softwareentwicklungserfahrung geleitet und geht deshalb dort in die Tiefe, wo reine Low-Code-Formate an Grenzen stoßen."
      },
```

---

## 6. SEO: Keyword-Abgleich mit dem bestehenden Training

Recherche über Google Ads Keyword-Planer (Konto „Martin2") und Google Search Console von copilotenschule.de:

| Keyword | Suchvolumen/Monat | Wettbewerb | Bereits im Training? |
|---|---|---|---|
| Copilot Agent erstellen | 100–1.000 | gering | Nein → ergänzen |
| Power Automate Schulung | 100–1.000 | – | Nein → ergänzen |
| KI Agenten erstellen | 1.000–10.000 | hoch | sinngemäß abgedeckt, Begriff selbst sehr umkämpft |
| Copilot Studio Schulung/Training, Power Automate Kurs, Copilot Agenten bauen | 10–100 | – | teilweise abgedeckt |
| Copilot Workflow Automatisierung, Microsoft 365 Automatisierung | 0–10 | – | Nische |

In der Google Search Console tauchen aktuell keine Agenten-/Automatisierungs-Begriffe unter den Top-Suchanfragen der Domain auf (dominiert von „copilot excel aktivieren", „copilot kosten" etc.) – das Thema ist organisch noch unerschlossen.

**Empfehlung:** `keywords` um die zwei Begriffe mit nachweisbarem Volumen und erreichbarem Wettbewerb ergänzen:

```ts
    keywords: ["Copilot Studio Training", "KI-Agenten entwickeln", "Microsoft Copilot Agents", "Copilot Automatisierung", "Custom Copilot", "Copilot Agent erstellen", "Power Automate Schulung"],
```

---

## 7. TrainingCTA in bestehenden Wissen-Artikeln ergänzen

Folgende 4 Artikel passen inhaltlich zum Training, enthalten aber aktuell noch keine `TrainingCTA`. Import (falls noch nicht vorhanden): `import TrainingCTA from "@/components/TrainingCTA";`

**`src/pages/KIAgenten.tsx`** (generische Pillar-Seite, höchstes Traffic-Potenzial für "ki agenten erstellen"):
```tsx
<TrainingCTA
  topic="KI-Agenten mit Microsoft Copilot Studio bauen"
  benefit="Vom Konzept zum funktionsfähigen Agenten: Im Praxis-Workshop entwickeln Sie eigene Copilot-Studio-Agenten für echte Geschäftsprozesse."
  href="/trainings/copilot-studio-ki-agenten"
  label="Zum Workshop"
/>
```

**`src/pages/CopilotAgentDigitalesGedaechtnis.tsx`**:
```tsx
<TrainingCTA
  topic="Eigene Copilot Agenten entwickeln"
  benefit="Meeting-Protokolle sind nur ein Use Case – im Workshop bauen Sie Copilot-Studio-Agenten für beliebige wiederkehrende Aufgaben in Ihrem Unternehmen."
  href="/trainings/copilot-studio-ki-agenten"
  label="Zum Workshop"
/>
```

**`src/pages/CopilotAgentModeOffice.tsx`**:
```tsx
<TrainingCTA
  topic="Vom Agent Mode zum eigenen Copilot Agenten"
  benefit="Agent Mode zeigt, was in Word, Excel und PowerPoint möglich ist – im Workshop bauen Sie mit Copilot Studio eigene Agenten für Ihre Geschäftsprozesse."
  href="/trainings/copilot-studio-ki-agenten"
  label="Zum Workshop"
/>
```

**`src/pages/CopilotPagesLoopNotebooksSharepointWorkflows.tsx`**:
```tsx
<TrainingCTA
  topic="Workflows mit Copilot Studio automatisieren"
  benefit="Pages, Loop und Notebooks organisieren Ihre Arbeit – im Workshop automatisieren Sie ganze Prozesse mit eigenen Copilot-Studio-Agenten und Power Automate."
  href="/trainings/copilot-studio-ki-agenten"
  label="Zum Workshop"
/>
```

Platzierung: jeweils an einer inhaltlich passenden Stelle im Artikel (nicht zwingend am Ende), analog zum bestehenden Muster in `CopilotInExcelAktivieren.tsx`.

---

## 8. Hinweise zur Umsetzung

- Die bestehenden `bookingFormats` (Ganztag 7h, Hackathon 7h) sowie Preise/Format bleiben unverändert – es handelt sich um eine Trainer-Zuordnung und inhaltliche Schärfung, kein neues Produkt.
- `instructorPerson` erscheint ausschließlich in strukturierten Daten (schema.org), nicht im sichtbaren Seitentext – gleiches Prinzip wie bei Natalia Fratz.
- Der LinkedIn-Link in `sameAs` ist ein Platzhalter (eigene Website) und sollte ersetzt werden, sobald Martin den tatsächlichen LinkedIn-Link von Jerish hat.
- Vorheriges Dokument "Produktkonzept Copilot Agenten und Workflow-Automatisierung (Jerish).docx" ist damit **überholt** – nicht umsetzen, es basierte auf der inzwischen verworfenen Annahme eines neuen, separaten Produkts.

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)

https://claude.ai/code/session_01W6sMge8HTBL2gXaJgg5nXa

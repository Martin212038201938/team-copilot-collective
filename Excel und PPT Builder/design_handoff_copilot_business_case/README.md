# Handoff: Automatisierte Erzeugung des Copilot-Business-Case-Decks

## Overview
Dieses Paket beschreibt eine 20-seitige Entscheidungsvorlage („Business Case Microsoft 365 Copilot") der Copilotenschule, die pro Kundenanfrage automatisch erzeugt werden soll. Vier Eingaben (Unternehmensname, geplante Nutzer, Vollkosten-Stundensatz, Copilot-Lizenzpreis) plus Datum und Ansprechpartner erzeugen alle Kennzahlen; Story, Layout und Formulierungen bleiben unverändert.

Ziel der Automatisierung: aus einem Formular oder einer JSON-Payload eine fertige Präsentation (HTML, PDF, optional PPTX) und die zugehörige Excel-Berechnung ausliefern.

## About the Design Files
Die HTML-Datei in diesem Bundle ist eine **Design-Referenz**, kein Produktionscode. Sie ist als „Design Component" (`.dc.html`) mit einem hauseigenen Runtime (`support.js`) und einer Slide-Stage (`deck-stage.js`) gebaut. Für die Automatisierung sollte das Deck in der Zielumgebung neu implementiert werden — z. B. als React/Next-Route, als serverseitiges Template (Nunjucks/Handlebars/Jinja) oder als reines HTML-Template mit Platzhalter-Ersetzung. Verbindlich sind: Inhalt, Reihenfolge, Layoutstruktur, Typografie, Farben und die Rechenlogik. Nicht verbindlich: das DC-Runtime.

Das Deck ist auf **1920 × 1080 px** gebaut, jede Folie ist ein `<section>`; die Stage skaliert und paginiert für den PDF-Druck (eine Seite pro Folie).

## Fidelity
**High-fidelity.** Farben, Typografie, Abstände und Copy sind final. Die Folien sind randvoll kalkuliert: das Layout hält 1080 px Höhe nur bei den angegebenen Textlängen. Wer Copy verlängert, muss die Höhe nachrechnen (Budget: 904 px zwischen 96 px oberem und 80 px unterem Padding).

## Inputs (die einzigen dynamischen Werte)

| Key | Typ | Default im Muster | Bedeutung |
|---|---|---|---|
| `firma` | string | „Muster GmbH" | Unternehmensname, erscheint auf Titel, Executive Summary und in jeder Fußzeile |
| `nutzer` | int | 300 | geplante Copilot-Nutzer |
| `stundensatz` | int (€/h) | 50 | Vollkosten-Stundensatz inkl. Lohnnebenkosten |
| `lizenzpreis` | float (€/Nutzer/Monat) | 26 | Vertragspreis M365 Copilot |
| `datum` | string | „Juli 2026" | Stand |
| `ansprechpartner` | string | „Martin Lang · copilotenschule.de" | |
| `szenario` | enum | „Realistisch" \| „Forrester TEI" | 8 bzw. 9 Std./Monat Zielwert |
| `preiseZeigen` | bool | true | Beispielpreise auf der Bausteine-Folie ein/aus |

## Rechenmodell (identisch zur Excel „Copilot-ROI-Rechner")

Konstanten (Planungsannahmen, nicht Eingaben):

```
ZIEL_STD_REALISTISCH   = 8      # Std./Person/Monat (Forrester: typische Nutzer)
ZIEL_STD_FORRESTER_TEI = 9      # Forrester-Modellwert
STARTNIVEAU            = 0.60   # Anteil des Zielwerts direkt nach dem Kick-off
HALBWERTSZEIT          = 2      # Monate, in denen sich die Restlücke halbiert
REALISIERUNG           = 0.50   # wirtschaftlich angesetzter Anteil (Forrester: Productivity Recapture)
GRUPPENGROESSE         = 12
KICKOFF_JE_GRUPPE      = 1800   # €
LERNREISE_TERMINE      = 4
PREIS_JE_TERMIN        = 800    # €  -> 5.000 € je Gruppe
WEITERBILDUNG_FOLGEJAHR= 0.50   # Anteil des Jahr-1-Trainingsbudgets in Jahr 2 und 3
CHANGE_ANTEIL          = 0.12   # von Lizenz + Training + IT des Jahres
IT_GRUNDAUFWAND        = 2500   # €, einmalig
IT_STAFFEL             = [(50, 150), (200, 75), (750, 40), (inf, 20)]  # Grenzkosten je Nutzer
HORIZONT               = 36     # Monate
```

Ableitungen:

```
gruppen      = ceil(nutzer / 12)
trainingJ1   = gruppen * (1800 + 4 * 800)
trainingJ2/3 = trainingJ1 * 0.5
itSetup      = 2500 + 150*min(n,50) + 75*clamp(n-50,0,200) + 40*clamp(n-250,0,750) + 20*max(n-1000,0)
lizenzJahr   = nutzer * lizenzpreis * 12
changeJ1     = 0.12 * (lizenzJahr + trainingJ1 + itSetup)
changeJ2/3   = 0.12 * (lizenzJahr + trainingJ2)
kostenJ1     = lizenzJahr + trainingJ1 + itSetup + changeJ1
kosten3J     = kostenJ1 + 2 * (lizenzJahr + trainingJ2 + changeJ2)

stunden(m)   = ziel * (1 - (1 - 0.60) * 0.5^((m-1)/2))          # m = 1..36
nutzen(m)    = nutzer * stunden(m) * 0.50 * stundensatz
kosten(m)    = nutzer * lizenzpreis
               + (m == 1  ? trainingJ1 + itSetup + changeJ1 : 0)
               + (m in {13,25} ? trainingJ2 + changeJ2 : 0)

nutzenJ1     = sum(nutzen(1..12));   nutzen3J = sum(nutzen(1..36))
roiJ1        = (nutzenJ1 - kostenJ1) / kostenJ1
roi3J        = (nutzen3J - kosten3J) / kosten3J
breakEven    = erster Monat m, in dem cum(nutzen) - cum(kosten) >= 0, sonst "> 36 Monate"
```

Referenzwerte zum Gegentesten (nutzer = 300, stundensatz = 50, lizenzpreis = 26, Szenario realistisch):

```
trainingJ1 125.000 €   itSetup 27.000 €   lizenzJahr 93.600 €   changeJ1 29.472 €
kostenJ1   275.072 €   kosten3J 624.736 €
nutzenJ1   639.339 €   nutzen3J 2.078.059 €   Netto 3 Jahre 1.453.323 €
roiJ1      132 %       roi3J 233 %            Break-even Monat 5
Ø Zeitersparnis Jahr 1: 7,1 Std./Person/Monat
Kostenblöcke 3 Jahre: Lizenzen 280.800 € (45 %) · Training 250.000 € (40 %) · IT 27.000 € (4 %) · Change 66.936 € (11 %)
```

Formatierung: deutsche Zahlformate (`toLocaleString('de-DE')`), Beträge auf ganze Euro gerundet, Prozentwerte ganzzahlig, Beträge ab 1 Mio. als „x,xx Mio. €".

## Screens / Views

Reihenfolge ist Teil der Argumentation: **Warum handeln → Warum jetzt → Warum so → Was kostet es → Wie machen wir das → Warum wir.**

| # | Titel | Zweck | Layout |
|---|---|---|---|
| 01 | Business Case Microsoft 365 Copilot | Deckblatt | Navy-Vollfläche, Racing-Stripe oben links, Wortmarke oben rechts, H1 104 px, zwei Sublines, unten 3-spaltige Meta-Zeile (Unternehmen / Stand / Ansprechpartner) |
| 02 | Executive Summary | vier KPIs + Herleitung | 4-spaltige KPI-Zeile (Hairline oben/unten, Werte 62 px, `nowrap`), darunter weiße Box mit 3 Spalten: Herleitung / Annahmen / Quellen |
| 03 | Warum jetzt handeln | Lernreise-Stufen | 4-spaltiges Hairline-Raster (Die erste Frage · Der täglicher Chat · Eigene Agenten · Agentische Arbeit), darunter Treppen-Statement mit rotem Rail |
| 04 | Die nächste Stufe: Agenten | Agenten setzen Erfahrung voraus | 2 Spalten: links 4-stufige Kette, rechts Text + weiße Box |
| 05 | Der Einstieg in zwei Tracks | Copilot Chat vs. M365 Copilot | 2 Karten (weiß mit Navy-Rahmen / Navy-Fläche), je mit Stripe |
| 06 | Warum Unternehmen Copilot einführen | 4 gleichgewichtige Motive | 4-spaltiges Hairline-Raster + rotes Rail-Statement + Beispiel-Fußnote |
| 07 | Was Unternehmen gewinnen | qualitative Wirkung | Navy-Fläche, 3×2 Hairline-Raster |
| 08 | Risiken des Abwartens | Risiko ↔ Gegenmaßnahme | 2-spaltige Tabelle, 4 Zeilen |
| 09 | Return on Investment | Rechnung | links 5-zeilige Wertetabelle, rechts zwei ROI-Blöcke + Erläuterung |
| 10 | Investition über drei Jahre | Kostenblöcke | 4-spaltige KPI-Zeile mit Anteilen + 2 Erläuterungsspalten |
| 11 | Wie aus Zeitersparnis Nutzen wird | Formel | horizontale Formelleiste (Nutzer × Stunden × Satz × 50 %), darunter 2 Spalten |
| 12 | Zwei plausible Szenarien | Realistisch vs. Forrester TEI | 3-spaltige Tabelle, 5 Zeilen |
| 13 | Wirtschaftliche Entwicklung über 36 Monate | Break-even | Legende (Nutzen / Kosten / Break-even / Skala), darunter SVG mit zwei Polylines, roter Break-even-Linie |
| 14 | Adoption als Erfolgsfaktor | Kette + drei Dimensionen | 5-gliedrige Kette (Lizenz → Training → Übung → Community → Gewohnheiten), darunter 3 Spalten (Technologie / Kompetenz / Verhalten) |
| 15 | Unsere Lernreise | Programm | Navy-Fläche, 5-spaltiges Hairline-Raster |
| 16 | Wir helfen, den Change zu starten und zu sichern | Bausteine + Beispielpreise | 2 × 4 Kacheln |
| 17 | Warum Copilotenschule | Anbieterprofil | 4 Zahlen-Kacheln (2011 / 2.000+ / 100 % / DACH) + Zitat mit rotem Rail |
| 18 | Unternehmen, die mit uns trainieren | Referenzen | 4×3 Hairline-Raster, Wortmarken typografisch |
| 19 | Entscheidungsvorlage | Beschlussfolie | 2 Spalten: links Beantragt (Umfang, Investition + Aufteilung, Nutzen, Break-even, Gruppen), rechts 4 nächste Schritte |
| 20 | Laden Sie mich zu Ihrer Beratung ein | CTA | 2 Spalten: Ansprechpartner + Buchungsbutton |

**Dynamische Werte** stehen ausschließlich in: 01 (Firma, Datum, Ansprechpartner), 02, 09, 10, 11, 12, 13, 16 (Preise), 19 sowie in der Fußzeile jeder Inhaltsfolie (Firmenname). Alles andere ist statischer Text.

**Fußzeile** jeder Inhaltsfolie: Hairline oben, `JetBrains Mono` 24 px, links „Business Case Microsoft 365 Copilot", rechts Firmenname. Auf den acht Rechenfolien (02, 09, 10, 11, 12, 13, 16, 19) zusätzlich mittig: „Näherungswerte zur Grobkalkulation · Details klären wir im Gespräch".

## Interactions & Behavior
Statisches Dokument. Nur: Folien-Navigation (Pfeiltasten/Klick), PDF-Druck (eine Seite pro Folie), Hover auf dem Buchungsbutton (Navy → `#031127`). Keine Animationen, keine Übergangseffekte.

Buchungslink: `https://outlook.office.com/book/CopilotErstgesprch@yellow-boat.com/s/L_QescD89USYChbx2CRsNg2?ismsaljsauthenabled`
E-Mail: `martin@yellow-boat.com` · Telefon: `+49 221 950 187 74`

## State Management
Kein Laufzeit-State. Ein Datenobjekt (die acht Inputs) → abgeleitete Kennzahlen → Rendering. Für die Automatisierung genügt eine reine Funktion `berechne(inputs) -> kennzahlen` plus Template-Rendering.

## Design Tokens

```
Navy      #0A2E5C   Struktur, Typografie, dunkle Flächen
Ink       #031127   tiefster Ton, Hover
Sky       #488BCB   Marken, Stripe, Nummerierungen, Nutzen-Linie
Signal    #E2202A   nur Akzent: Eyebrows/§-Codes, mittlerer Stripe-Balken, Rails
Paper     #F3F5F8   Standard-Folienhintergrund
Weiß      #FFFFFF   Karten und Boxen
Fog       #E6E8EC   Hairlines auf Paper
Fließtext #33465F   ·  Sekundär #5A6B82  ·  Fußzeile #8A97A8
Auf Navy: Text #FFFFFF, sekundär #B9CCE0 / #9FC0E0 / #7F9FC2, Hairlines rgba(255,255,255,0.18–0.28)

Typo: DM Sans 400/500/600 (Display + Body), JetBrains Mono 400/500 (Eyebrows, Codes, Fußzeilen; ALL CAPS, +0.12em)
Skala: H1 104 · H2 64 · Karten-H3 32–46 · KPI 56–82 · Lead 32–40 · Body 27–30 · Mono 24
Tracking: -0.02 bis -0.03em auf Displaygrößen
Radien: 0 (dokumentarisch scharf) · Schatten: keine
Padding je Folie: 96 oben / 100 seitlich / 80 unten (Titel: 110/120/90)
Spacing-Schritte: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128
Motiv: Racing-Stripe = drei Balken (Sky, Signal, Sky), 6–8 px hoch, 2–3 px Abstand
```

Regeln: nie einzelne Wörter in Headlines farbig hervorheben, kein Rot in Fließtext, keine Gradients, keine Emoji, keine Icons in Signal-Rot, alle Schriftgrößen ≥ 24 px.

## Assets
Keine Bilddateien. Logo/Wortmarke ist typografisch gesetzt (`copilotenschule.de`, DM Sans 600). Referenzkunden sind ebenfalls als Wortmarken gesetzt. Wer echte Logos einsetzt: lokale Dateien verwenden, keine Hotlinks — extern verlinkte Bilder erscheinen in PDF-/PPTX-Exporten leer. Diagramme sind Inline-SVG.

## Files
- `Business Case Copilot.dc.html` — das Deck (Template + Rechenlogik in einer Datei)
- `deck-stage.js` — Slide-Stage (Skalierung, Navigation, Druck)
- `support.js` — Runtime der Design Component (nur nötig, um die Datei unverändert im Browser zu öffnen)
- `Copilot-ROI-Rechner-plausibel.xlsx` — Quelle des Rechenmodells, geht als Anlage an den Kunden
- `roi-modell-extrakt.txt` — alle Zellen und Formeln der Excel als Text, zum Abgleich der Implementierung

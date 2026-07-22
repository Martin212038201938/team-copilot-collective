# Doku: Produktseiten-Überarbeitung (Schema, GEO, Inhalte) — 22.07.2026

**Projekt:** copilotenschule.de · Teilprojekt „Produktseiten-Schema für UCP-Lesbarkeit & Preisvergleiche"
**Basis:** Bericht + Umsetzungsplan vom 22.07.2026 (Befunde B1–B7, Phasen 1–4)
**Commits:** `19e5fbf` (B1+B2) · `eda20a8` (B7) · `4e74fbd` (B3 + Produkte + Fixes) · `8e61168` (B4+B5) · `ba8f0b7` (Phase 3 Referenzen) — alle gepusht, Deploy via GitHub Action

---

## 1. Schema-Hygiene (Befunde B1–B6)

- **B1 — Preise aus dem Schema entfernt:** 1.800-€-Fallback und 1.495-€-Angabe aus allen Course-/Workshop-Offers gelöscht, solange der A/B-Test „Preise auszeichnen" läuft. Regel: Nur sichtbare Preise dürfen ins Markup. Ausnahme (bewusst): EU-AI-Act-Schulung mit sichtbarem 49-€-Störer trägt den Preis auch im Schema.
- **B2 — Voraussetzungen individualisiert:** Pauschaltext „Keine Vorkenntnisse erforderlich" ersetzt durch gepflegtes `prerequisites`-Feld je Training (z. B. Lizenzpflicht beim Praxis-Training).
- **B3 — Entitäten aufgeräumt:** `/trainings`-Übersicht liefert jetzt CollectionPage + ItemList mit den echten Detailseiten-URLs statt Course-/EducationEvent-Duplikaten; doppelte/widersprüchliche Organization-Definition entfernt. Homepage: Phantom-Katalog aus 9 veralteten Kursen (existierten nicht als Produkte) komplett gelöscht — nur noch sichtbare FAQs im Markup.
- **B4 — Eine Quelle der Wahrheit:** Gesamte Schema-Logik der Trainingsseiten zentral in `generateTrainingDetailSchema()` (lib/schema.ts) inkl. dokumentierter Regeln; Inline-Duplikat in TrainingDetail.tsx und drei verwaiste Alt-Generatoren gelöscht. Funktionstest per Node bestanden.
- **B5 — Angebotskatalog korrigiert:** `hasOfferCatalog` der Organisation baut sich dynamisch aus trainings.ts — 7 echte Titel mit @id-Verweis auf die Course-Entitäten, kann nie mehr vom Angebot abweichen (vorher: 3 erfundene Kursnamen).
- **B6 — Fehlende Felder ergänzt:** `image` am Course (Standard: Site-Logo, individuelles Feld je Training vorbereitet), `educationalCredentialAwarded` (Zertifikate), `courseWorkload` (über Buchungsvarianten).

## 2. Sichtbare Produktseiten-Struktur (B7 / Phase 2)

- **„Auf einen Blick"-Faktenbox** im Hero jeder Trainingsseite: Format, Dauer, Zielgruppe, Niveau, Voraussetzungen, Sprache, Gruppengröße, ggf. Zertifikat, Buchungsweg. Bewusst ohne Preiszeile; `priceLine`-Slot für die Zeit nach dem A/B-Test vorbereitet.
- **Abschnitt „Formate und Buchungsvarianten":** Karten je Variante (mit Modus, Umfang, Beschreibung, optionalem Badge-Störer); je Variante eine eigene CourseInstance im Schema. Die alten „Buchbar als:"-Bullets aus den Feature-Listen dorthin migriert.
- **Gruppengröße:** überall „bis 12 Teilnehmende" (Lernreise: „maximal 12, ideal bis 8").

## 3. Inhaltliche Überarbeitung aller 7 Trainings

- **Grundlagen (Prompt Design):** Copilot Agenten im Prompt-Bibliothek-Bullet + neues Automatisierungs-Bullet; Halbtag „Meistgebucht", neu Ganztag 7 h „Empfohlen"; Umstiegs-Hinweis (Kickoff muss nach Lizenz-Umstieg nicht wiederholt werden) als Impact-Punkt + neue FAQ.
- **M365 Copilot Praxis:** Formate korrigiert — Kickoff (4 h, Präsenz/online) + Online-Lernreise (4 × 2 h) als meistverkaufte Variante an Position 1 mit „Meistverkauft"-Störer; Online-Lernreise 6–8 h; 3 starke Business-Impact-Cases ergänzt (PPT aus Dokumenten: 4–40 h → 30 min–4 h; Excel-Forecast: 5 min statt 1 h; Vertrieb: 3–6 h/Woche — mit Links auf die belegenden Fachartikel).
- **Ausbildung KI-Wissensarbeiter:** Lernreise 6–10 × 2 h; „mindestens 30 % Zeit in praktischen Übungen + begleitete Umsetzung eigener Use Cases" (statt „20+ Übungen"); neues Modul Agenten/Copilot Studio.
- **Train-the-Trainer:** Curriculum-Blöcke „Agenten bauen und betreiben" (inkl. Policies für Verwendung/Teilen von Agenten, rechtskonformer Betrieb) und „Detaillierte Session zu Grounding, Zugriffsrechten, Datenschutzeinstellungen".
- **Copilot Lernreise:** 6–10 × 2 Stunden online; Inhalte von Wochen-Bullets auf modulare Themen umgestellt; neues Agenten/Studio-Modul; Sessions korrekt mit 2 Stunden (2,5-h-Angabe raus, Vor-/Nachbereitung wird nicht genannt).
- **Copilot Studio / KI-Agenten:** Zweite Buchungsvariante „Hackathon (7 h)" — wenig Theorie, begleitete Umsetzung eigener Use Cases.
- **EU-AI-Act-Pflichtschulung:** 2–3 Stunden online; Zielgruppe auf die einzige Nutzergruppe korrigiert (Mitarbeitende, die künftig mit KI arbeiten sollen); **Preis-Störer „ab 49 € pro Teilnehmenden, inkl. Zertifikat"** + Preis im Schema (einziges Training mit Preis).

## 4. Phase 3 — Vertrauen & Policies (alle Produktseiten)

- **„So läuft die Buchung":** 5 Schritte (Anfrage → Angebot mit 24-h-Werktags-Versprechen → Termin → Durchführung → Rechnung zum 1. Trainingstag, 14 Tage netto, keine Vorkasse).
- **„Faire Konditionen":** Verschiebung bis 14 Tage kostenfrei (einmalig auch kurzfristig bei Ersatztermin binnen 8 Wochen); transparente Stornostaffel (50 % / 80 %); DSGVO, AVV nach Art. 28, NDA auf Wunsch. Quelle: Standard-Konditionen-Dokument.
- **„Das sagen Teilnehmende":** 5,0-Sterne-Zeile + Google-Profil-Link + 3 Zitate (Judi Ju, Andi W., Hannes Wenner) — bewusst ohne Trainer-Namensnennung; kein aggregateRating im Schema (Self-Serving-Regel).

## 5. Fixes nebenbei

- **Logo-Bug:** „Über die Copilotenschule"-Box referenzierte nicht existierendes `/logo.svg` → jetzt das Flugzeug-Logo wie im Header (alle Produktseiten).
- **node_modules-Reparatur:** `NODE_ENV=production` in der Shell ließ npm die devDependencies weglassen (Build kaputt) → Neuinstallation mit `NODE_ENV=development npm ci --include=dev`; Regel für künftige Builds dokumentiert.
- **Push-Diagnose:** Commit von 15:20 hing lokal fest (GitHub Desktop hatte nicht gepusht) — identifiziert und behoben.

## 6. Entscheidungen mit Begründung (Kurzreferenz)

- UCP (Google Universal Commerce Protocol): aktuell nur physische Produkte, nur USA, Merchant Center Pflicht → nicht direkt relevant; Wiedervorlage Q4 2026.
- Course-Info- und FAQ-Rich-Results sind von Google eingestellt (09/2025 bzw. 05/2026) → Schema dient semantischer Klarheit, nicht Snippets.
- LLMs (außer Gemini) lesen JSON-LD nicht direkt → sichtbarer, strukturierter Text (Faktenbox, Policies) ist der eigentliche GEO-Hebel; Schema bleibt Konsistenz-Layer.
- Product-Markup für Dienstleister: von Google nicht empfohlen → Course + Offer bleibt der richtige Typ.

## 7. Offen / Nächste Schritte

- [ ] **Nach dem laufenden Deploy: IndexNow-Ping** für `/`, `/trainings` und die 7 Detailseiten (macht Claude auf Zuruf).
- [ ] **Preis-Layer für die übrigen 6 Trainings** — wartet auf den A/B-Test-Entscheid (`ab_pricing`, Entscheidung ab ~100 Sessions / ~10 Conversions je Variante; Wochenreport montags). Infrastruktur (`visiblePrice` + Faktenbox-Slot) steht.
- [ ] **Kleiner Rendering-Bug (Altbestand):** FAQ-Antworten mit Markdown-Links (Train-the-Trainer) erscheinen als Rohtext → RichText-Rendering für FAQs nachziehen.
- [ ] **UCP-Wiedervorlage Q4 2026:** Prüfen, ob Google das Protokoll auf Dienstleistungen/EU ausweitet.
- [ ] Optional: echte Trainingsbilder für das Course-`image`-Feld (aktuell Standard-Logo); Springest-/Portal-Listungen als Vergleichs-Distribution erst nach Preis-Entscheid.

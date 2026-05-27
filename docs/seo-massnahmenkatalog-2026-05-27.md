# SEO-Maßnahmenkatalog copilotenschule.de

**Erstellt:** 27. Mai 2026
**Erstellt von:** SEO-Analyse auf Basis von ~40 Health-Check-Reports (März–Mai 2026), Strategie-Papier vom 25.05., Live-Checks und Code-Audit
**Zielsetzung:** Massive strukturelle Verbesserung der Indexierung und Sichtbarkeit, **ohne** die bestehenden Top-Rankings zu gefährden
**Rahmen:** copilotenschule.de — Vite + React + react-helmet-async + react-snap, FTP-Deployment via GitHub Actions zu AlwaysData

---

## 1. Zusammenfassung der bisherigen Analysen

### 1.1 Was die Reports konsistent zeigen

Die täglichen Health Checks vom 14. März bis 27. Mai 2026 zeichnen ein erstaunlich konsistentes Bild. Der SEO-Score von copilotenschule.de stagniert seit Wochen bei **42–45 von 100**, der GEO-Score (LLM-Sichtbarkeit) dagegen liegt stabil bei **78–82 von 100**. Das ist das zentrale Paradoxon dieses Projekts: Die Seite wird in ChatGPT, Perplexity und Claude prominent als spezialisierter Copilot-Anbieter zitiert, aber Google indexiert nur etwa **die Hälfte der ausgelieferten Seiten** (33 von 67 Sitemap-URLs, ca. 49 %).

### 1.2 Was sich seit März verändert hat

Drei strukturelle Entwicklungen lassen sich aus den Reports klar nachzeichnen:

Erstens hat sich der Wettbewerb verschärft. Anfang April war copilotenschule.de für „Copilot Training Empfehlung beste Anbieter" noch auf Platz 1–3. Im Mai ist `skill-sprinters.de` (gehört zur Haufe-Gruppe) neu in die Top 3 eingestiegen, parallel dazu sind `kebel.de`, `it-schulungen.com` und `roover.de` thematisch nachgezogen. Die rankende Seite `/wissen/microsoft-copilot-lizenzen` ist semantisch der falsche Kandidat für diese Suchanfrage — es ist eine Lizenz-, keine Anbieter-Vergleichsseite. Das Strategie-Papier vom 25.05. hat dafür bereits eine Hub-Artikel-Lösung skizziert.

Zweitens haben sich an zentralen Stellen Rankings verbessert: „Copilot Training ROI Unternehmen" hält stabil Platz 1, „Copilot Training Mitarbeiter Unternehmen" ist auf Platz 2 gestiegen, „lohnt sich Microsoft Copilot KMU" ist neu in die Top 6 eingezogen. Wir haben aktuell 4 Keywords in den Top 3 und 7 in den Top 10 — das ist die Basis, die wir schützen müssen.

Drittens — und das ist das entscheidende strukturelle Thema — wird der SSR-Bug seit Anfang Mai in jedem Report erneut als kritisches Problem markiert. Die Reports gehen davon aus, dass Meta-Description und Canonical-Tag **sitewide** fehlen. Der eigene Live-Check vom 27.05. zeigt allerdings ein differenzierteres Bild, siehe nächster Abschnitt.

### 1.3 Was die Strategie-Datei vom 25.05. liefert

Das Strategie-Papier "Zurück in die Top 3 — Empfehlung beste Anbieter Deutschland 2026" ist nicht nur eine Diagnose, sondern bereits ein konkreter 8-Wochen-Aktionsplan mit Hub-Artikel-Konzept, Konkurrenz-Tier-Analyse, Trust-Signal-Roadmap und Off-Page-Empfehlungen. Dieser Maßnahmenkatalog hier baut darauf auf, erweitert ihn aber um die strukturellen Code- und Indexierungs-Themen, die in der Strategie-Datei nur angerissen sind.

---

## 2. Identifizierung der Hauptprobleme

Im Code-Audit und in den Live-Checks am 27.05. wurden gegenüber den Reports zwei zusätzliche, bisher nicht klar benannte Probleme bestätigt. Die Hauptprobleme stehen geordnet nach Schwere:

### Hauptproblem 1 — Pre-Rendering ist nicht sitewide kaputt, sondern **partiell**

Die Reports formulieren das Problem als „SSR-Bug, alle Seiten betroffen". Der Live-Check zeigt ein präziseres Bild und damit eine andere Behebungsstrategie. Geprüft per `curl -A "Googlebot" ...` auf dem ausgelieferten HTML (also dem, was Googlebot tatsächlich sieht):

- `/trainings/copilot-grundlagen-prompt-design` → Title vorhanden, **aber doppelter Suffix-Bug**: „Copilot Grundlagen Training – Prompt Design & KI-Kompetenz | copilotenschule.de | copilotenschule.de"
- `/trainer/martin-lang` → Title korrekt: „Martin Lang – Gründer copilotenschule.de | copilotenschule.de"
- `/wissen/microsoft-copilot-lizenzen` → **nur generischer Default-Title** aus `index.html`: „copilotenschule.de — Microsoft Copilot Schulungen für Unternehmen". Kein `<meta name="description">`, kein `<link rel="canonical">`, kein `Article`-Schema
- `/wissen/copilot-roi-berechnen` → identisches Bild: kein Title-Update, kein Description-Tag, kein Canonical-Tag
- `/` (Homepage) → ebenfalls nur der Default-Title aus `index.html`, kein Helmet-Update durchgesetzt

Diagnose: `react-snap` läuft, es schreibt das `index.html`-Boilerplate weg, und auf `/trainings/...` sowie `/trainer/...` werden die `react-helmet-async`-Tags korrekt in den Snapshot übernommen. Auf vielen `/wissen/...`-Routen und der Homepage greift das nicht — vermutlich wegen eines Timing-Issues (Helmet-Mount nach Snapshot) oder weil der ContentLayout-Wrapper bei Wissens-Seiten den Render-Pfad anders aufbaut. Konsequenz: Google bekommt für genau diese Seiten **identische** Title-Tags und keinen Canonical — das Duplicate-Content-Risiko ist real und korreliert exakt mit den 34 nicht indexierten Seiten.

### Hauptproblem 2 — Title-Konkatenation mit doppeltem Suffix

`SEOHead.tsx` hängt automatisch ` | copilotenschule.de` an jeden Titel an (`<title>{`${title} | copilotenschule.de`}</title>`). Wenn ein Aufrufer (z. B. `TrainingDetail.tsx`) als `title`-Prop einen Wert übergibt, der bereits den Suffix enthält (über `training.metaTitle` aus `trainings.ts`), wird der Suffix zweimal angehängt. Auf `/trainings/copilot-grundlagen-prompt-design` ist das live nachweisbar. Solche doppelten Brand-Suffixe werten Suchmaschinen als minder qualitativ, und sie nehmen wertvollen Platz im SERP-Snippet weg.

### Hauptproblem 3 — Route-Doppelung schafft Canonical-Risiko

`App.tsx` definiert sowohl konkrete Wissens-Routen (z. B. `<Route path="/wissen/copilot-roi-berechnen" ...>`) als auch eine generische Catch-All-Route `<Route path="/wissen/:slug" ...>` (über `DynamicKnowledgePage.tsx`). Solange beide aktiv sind, kann theoretisch dieselbe URL zwei verschiedene Komponenten rendern. Im Code wird üblicherweise zuerst die spezifische Route gewinnen, aber wenn die Catch-All-Route in einer GSC-Inspection trotzdem auftaucht, generiert Google eventuell „Indexed without content" oder „Crawled — currently not indexed" Statusmeldungen. Gleiches gilt für `/trainings/:slug` und `/workshops/:slug`.

### Hauptproblem 4 — Sitemap, react-snap-Liste und Routes sind nicht synchron

- `public/sitemap.xml`: 67 URLs
- `package.json` → `reactSnap.include`: 95 Einträge
- `src/App.tsx`: 57 konkrete Routen + 5 dynamische Catch-Alls
- Diskrepanzen, die im Audit gefunden wurden:
  - `/wissen/copilot-schulungsanbieter-deutschland-vergleich` ist in `reactSnap.include` enthalten (wartet auf Hub-Artikel), aber nicht in der Sitemap. Die TSX-Datei existiert (`CopilotSchulungsanbieterVergleich.tsx`)
  - `/workshops/bessere-entscheidungen-mit-copilot` ist in `reactSnap.include`, aber nicht in der Sitemap
  - `/trainer/saskia-kaden` fehlt komplett (weder Sitemap noch react-snap), obwohl im Strategie-Papier als zweite Trainer-Profilseite vorgesehen
  - `/impressum`, `/datenschutz`, `/unsere-angebote` fehlen in der Sitemap

Die CLAUDE.md-Checkliste verlangt explizit Synchronität dieser drei Stellen. Das `validate-seo.js` deckt nur `/wissen/...`-Routen ab — für Workshops, Trainings, Trainer und sonstige Seiten gibt es keine automatische Prüfung.

### Hauptproblem 5 — Keyword-Gaps für transaktionale Queries

Reports und Strategie-Datei stimmen überein: Wir ranken nicht für „Copilot Schulung Inhouse Unternehmen buchen", „KI Schulung Mitarbeiter Förderung QCG" und das semantische Match für „beste Anbieter Deutschland 2026" fehlt. Drei klar identifizierbare Content-Lücken mit kommerzieller Intent.

### Hauptproblem 6 — Trust-Signal-Asymmetrie zu spezialisierten Wettbewerbern

`copilotexperte.de` führt mit „6× Microsoft MVP" Alexander Eggers ein massives EEAT-Signal, das in LLM-Antworten häufig zitiert wird. `kebel.de` hat 1.500+ eKomi-Bewertungen. `medienreich.de` hat ProvenExpert mit 8.624 Bewertungen. Copilotenschule.de hat starke DAX-Referenzen (REWE, Pernod Ricard, Lekkerland, Marriott Hotels, Med360Grad, IHK Nord Westfalen) — aber diese sind aktuell nur in der Autoren-Bio von Martin Lang vergraben und nicht als sichtbares Trust-Element auf der Startseite oder einer Anbieter-Vergleichs-Hub-Seite ausgewiesen.

### Hauptproblem 7 — Core Web Vitals nicht messbar (PageSpeed API Quota)

Seit über einer Woche erschöpft die PageSpeed-Insights-API ihr tägliches Kontingent. Wir können aktuell weder LCP, INP noch CLS objektiv messen. Damit fehlt uns Visibility über einen offiziellen Google-Ranking-Faktor. TTFB ist mit ~280ms im akzeptablen Bereich, aber leicht steigend (vor 4 Tagen noch 165ms).

### Hauptproblem 8 — Schwächere Sekundär-Signale

- `Cache-Control: no-cache` im Live-Header verhindert Browser-Caching statischer Assets — schadet Page Load und Bandwidth
- Die LLM-spezifische `llms.txt` existiert, aber `llm.txt` (Singular, von einigen LLMs zusätzlich abgefragt) wird ausgeliefert (HTTP 200), Status nicht weiter geprüft

---

## 3. Detaillierter Maßnahmenkatalog

Jede Maßnahme ist nach folgendem Schema dokumentiert. Die Risikobewertung bezieht sich explizit auf das **Ranking-Risiko für bestehende Top-3- und Top-10-Positionen**, nicht auf Implementierungs-Risiko.

> **Format:** Problem · Konkreter Schritt · Aufwand · Ranking-Risiko · Reihenfolge

### Block A — Indexierungs- und Pre-Rendering-Maßnahmen (Wochen 1–2)

#### A1 · Pre-Rendering-Audit auf dist/-Ebene **vor jedem Eingriff**

Problem: Wir wissen, **dass** Wissens-Seiten nicht korrekt pre-gerendert werden, aber nicht **welche** und **wie viele**. Ohne diese Liste arbeiten wir blind.

Konkreter Schritt:

```bash
# Lokaler Build
npm run build:prerender

# Dann für jede Sitemap-URL: prüfen ob title, description, canonical im dist-HTML stehen
for url in $(curl -s https://copilotenschule.de/sitemap.xml | \
  grep -oE '<loc>[^<]+</loc>' | sed 's|<loc>||; s|</loc>||' | \
  sed 's|https://copilotenschule.de||'); do
  file="dist${url}.html"
  [ "$url" = "/" ] && file="dist/index.html"
  if [ -f "$file" ]; then
    has_desc=$(grep -c 'name="description"' "$file")
    has_canon=$(grep -c 'rel="canonical"' "$file")
    title=$(grep -oE '<title>[^<]+</title>' "$file" | head -1)
    echo "$url | desc=$has_desc | canon=$has_canon | title=$title"
  else
    echo "$url | MISSING FILE"
  fi
done > seo-audit-$(date +%Y-%m-%d).log
```

Das Logfile zeigt verbindlich, welche Seiten die Helmet-Tags korrekt übernehmen und welche nicht. Genau die mit `desc=0` und `canon=0` sind das Indexierungs-Leck.

Aufwand: 30 Minuten.
Ranking-Risiko: **null** (reine Diagnose, kein Deployment).
Reihenfolge: **Schritt 1, vor allem anderen.**

#### A2 · Pre-Rendering-Fix für Wissens-Seiten

Problem: Helmet-Tags greifen auf vielen `/wissen/...`-Routen und auf `/` nicht in den `react-snap`-Snapshot.

Konkreter Schritt — drei mögliche Ursachen prüfen, in dieser Reihenfolge:

1. **`HelmetProvider`-Wrapping**: In `main.tsx` (oder wo die App gemountet wird) muss `<HelmetProvider>` als äußerster Wrapper stehen. Wenn `react-snap` einen Snapshot zieht, bevor `HelmetProvider` mountet, schreibt es das leere `index.html` weg. Prüfen mit `grep -rn "HelmetProvider" src/`.
2. **`reactSnap.waitFor`** hinzufügen: In `package.json` die Option `"waitFor": 1000` (oder `"waitForRoot": true`) ergänzen, damit `react-snap` auf Helmet-Mount wartet.
3. **`useEffect`-asynchrone Daten**: Falls eine Wissens-Seite Daten via `useEffect` lädt und SEOHead nur nach Datenstand rendert, wird der Snapshot zu früh gezogen. Lösung: SEOHead immer am Anfang des Render-Trees rendern, nicht conditional.

Wichtig: **Nicht direkt auf main pushen.** Stattdessen ein Bug-Fix-Branch erstellen, lokal `npm run build:prerender` laufen lassen, dann den Diagnose-Befehl aus A1 wiederholen. Erst wenn 100 % der Sitemap-URLs `desc=1 canon=1` zeigen, mergen.

Aufwand: 4–8 Stunden Entwicklung + 2 Stunden Verifikation.
Ranking-Risiko: **mittel**. Das Risiko entsteht nicht durch den Fix selbst, sondern durch potenzielle Helmet-Konflikte mit bereits gut rankenden Seiten. Schutzmaßnahme: vor Deploy für jede Top-10-Ranking-Seite den alten und neuen Title vergleichen und sicherstellen, dass sich nur die fehlenden Tags ergänzen, nicht die existierenden ändern.
Reihenfolge: Schritt 2.

#### A3 · Title-Suffix-Duplikation beheben

Problem: `SEOHead.tsx` hängt ` | copilotenschule.de` an, und manche Aufrufer übergeben bereits einen Suffix.

Konkreter Schritt: In `SEOHead.tsx` defensiv konstruieren:

```typescript
const SITE_SUFFIX = " | copilotenschule.de";
const finalTitle = title.endsWith(SITE_SUFFIX)
  ? title
  : `${title}${SITE_SUFFIX}`;
```

Anwenden an allen vier Stellen, an denen aktuell `${title} | copilotenschule.de` steht (Title, og:title, twitter:title und implizit im Helmet-Block).

Aufwand: 15 Minuten + Testen.
Ranking-Risiko: **niedrig**. Die Title-Tags ändern sich auf einigen Trainings-Seiten, aber zum Besseren (kürzer, sauberer). Schutzmaßnahme: Bei Trainings, die aktuell in Top 10 ranken, manuell prüfen, ob der bereinigte Title den Hauptkeyword-Begriff weiterhin im sichtbaren Bereich (< 60 Zeichen) hat.
Reihenfolge: Schritt 3, gemeinsam mit A2 deployen.

#### A4 · Sitemap-, react-snap- und Route-Synchronisierung

Problem: Drei Quellen mit unterschiedlichem Stand.

Konkreter Schritt:

1. `validate-seo.js` erweitern, sodass es **alle** Routen-Typen prüft, nicht nur `/wissen`. Konkret: für jede Route in `App.tsx` muss es einen Eintrag in `reactSnap.include` UND `sitemap.xml` geben (außer `*`, `:slug`-Catch-Alls und `/admin`).
2. Fehlende Einträge ergänzen: `/trainer/saskia-kaden` (falls die Seite existieren soll), `/workshops/bessere-entscheidungen-mit-copilot` zur Sitemap, `/wissen/copilot-schulungsanbieter-deutschland-vergleich` zur Sitemap, `/impressum`, `/datenschutz`, `/unsere-angebote` zur Sitemap.
3. Die Catch-All-Routen `/wissen/:slug`, `/trainings/:slug`, `/workshops/:slug` so anpassen, dass sie nur dann etwas rendern, wenn der Slug **nicht** in der Liste der konkreten Routen ist. Alternativ: ganz entfernen, falls jede Wissens-Seite eine eigene TSX-Datei hat (was laut CLAUDE.md ohnehin Pflicht ist).

Aufwand: 2–3 Stunden.
Ranking-Risiko: **niedrig** (es werden Lücken geschlossen, keine bestehenden URLs geändert). Schutzmaßnahme: 301-Redirects nicht nötig, da keine URLs umgezogen werden.
Reihenfolge: Schritt 4.

#### A5 · IndexNow-Ping als deploy-step automatisieren

Problem: IndexNow ist in CLAUDE.md vorgeschrieben, aber rein manueller Schritt → wird vergessen.

Konkreter Schritt: In `.github/workflows/deploy.yml` nach erfolgreichem LFTP-Upload einen zusätzlichen Step ergänzen, der die Liste der geänderten Routen aus `git diff` extrahiert und an `api.indexnow.org/IndexNow` pingt. Vorlage:

```yaml
- name: IndexNow ping
  if: success()
  run: |
    URLS=$(git diff --name-only HEAD~1 HEAD -- 'src/pages/**/*.tsx' \
      | xargs -I{} grep -l "const SLUG" {} 2>/dev/null \
      | xargs -I{} grep -E "SLUG\s*=" {} \
      | grep -oE '"[^"]+"' | sed 's/"//g' \
      | awk '{print "\"https://copilotenschule.de/wissen/"$0"\""}' | paste -sd,)
    [ -n "$URLS" ] && curl -s -X POST "https://api.indexnow.org/IndexNow" \
      -H "Content-Type: application/json" \
      -d "{\"host\":\"copilotenschule.de\",\"key\":\"02184b6b954d4a158c75668dbf809161\",\"keyLocation\":\"https://copilotenschule.de/02184b6b954d4a158c75668dbf809161.txt\",\"urlList\":[$URLS]}"
```

Aufwand: 1 Stunde.
Ranking-Risiko: **null**. IndexNow zwingt Bing/Yandex zum Re-Crawl — das ist genau das, was wir wollen.
Reihenfolge: Schritt 5.

---

### Block B — Ranking-Schutz und Content-Konsolidierung (Wochen 1–3)

#### B1 · Top-10-Seiten als „protected" markieren

Problem: Jeder Fix birgt das Risiko, eine gut rankende Seite versehentlich zu verschlechtern.

Konkreter Schritt: Eine Liste der aktuell rankenden Seiten als Markdown-Datei (`docs/protected-pages.md`) anlegen mit Stand 27.05.2026. **Die URL-Zuordnung in der Tabelle ist aus den Health-Check-Reports abgeleitet und nicht in allen Fällen eindeutig** — beim Anlegen der Datei zwingend per GSC URL-Inspection oder `site:`-Abfrage pro Keyword verifizieren, welche konkrete URL Google tatsächlich rankt. Eine URL kann auch für mehrere Keywords stehen, und für „Microsoft Copilot unternehmensweit einführen" stehen zwei mögliche Kandidaten zur Auswahl:

| URL (zu verifizieren) | Keyword | Position laut Report | Quelle |
|---|---|---|---|
| /wissen/copilot-roi-berechnen | Copilot Training ROI Unternehmen | 1 | 2026-05-27 |
| /wissen/copilot-roi-berechnen | Microsoft Copilot ROI berechnen | 7 | 2026-05-27 |
| /wissen/copilot-training-schulung *(Hypothese)* | Copilot Training Mitarbeiter Unternehmen | 2 | 2026-05-27 |
| /wissen/copilot-im-unternehmen-einfuehren-leitfaden | Microsoft Copilot unternehmensweit einführen | 2 | 2026-05-25 (explizit genannt) |
| /wissen/microsoft-copilot-lizenzen | Microsoft Copilot Kosten/Lizenz 2026 | 3 | 2026-05-27 |
| /wissen/microsoft-copilot-lizenzen | lohnt sich Microsoft Copilot KMU | 6 | 2026-05-20 (explizit genannt) |
| /wissen/ki-schulung-mitarbeiter-pflicht | KI Schulung Mitarbeiter Pflicht EU AI Act | 8 | 2026-05-23 (explizit genannt) |

Regel: Bei jedem Pull Request, der eine dieser Dateien anfasst, wird in der PR-Beschreibung explizit dokumentiert, was sich am Title, Description, H1, Canonical oder am ersten Absatz ändert. Wenn nichts davon geändert wird, klare Notiz: „Nur strukturelle Änderung, kein SEO-relevanter Content angefasst."

Aufwand: 30 Minuten Einmal-Anlage, dauerhaft 5 Minuten pro PR.
Ranking-Risiko: **null** (ist genau das Werkzeug, das Risiko verhindert).
Reihenfolge: Schritt 6, parallel zu A.

#### B2 · Hub-Artikel „Anbieter-Vergleich Deutschland 2026"

Problem: `/wissen/microsoft-copilot-lizenzen` rankt für „beste Anbieter" semantisch falsch und fällt deshalb. Das Strategie-Papier vom 25.05. hat das Konzept dafür schon ausgearbeitet.

Konkreter Schritt: Die Seite `/wissen/copilot-schulungsanbieter-deutschland-vergleich` neu anlegen nach der Pflicht-Checkliste in CLAUDE.md, mit Quick Answer, 7 Auswahlkriterien, Vergleichstabelle Top 10, Detail-Profilen, Entscheidungs-Matrix, FAQ-Block und `ItemList`-Schema. Genauer Aufbau und Selbstpositionierung sind in `website-health-check/strategie-beste-anbieter-2026-05-25.md` Abschnitt 2 verbindlich beschrieben.

Auf der Lizenz-Seite parallel einen Schnellanker einbauen: „Sie suchen nicht nach Lizenzen, sondern nach dem passenden Schulungsanbieter? → Zum Anbieter-Vergleich".

Aufwand: 1–2 Tage für TSX, Schema, FAQ + 0,5 Tage Recherche/Verifikation der Wettbewerber-Daten.
Ranking-Risiko: **niedrig**. Der Hub-Artikel kannibalisiert die Lizenz-Seite nicht, weil er ein anderes Keyword bedient. Schutzmaßnahme: Die Lizenz-Seite bleibt unverändert, lediglich der Anker-Block kommt dazu.
Reihenfolge: Schritt 7, sobald A2/A3/A4 ausgerollt sind.

#### B3 · Drei weitere Hub-Artikel, geordnet nach kommerziellem Potenzial

Problem: Drei klar abgegrenzte transaktionale Keyword-Gaps, alle in den Reports mehrfach genannt.

Konkreter Schritt:

| Slug | Title-Vorschlag | Keyword | Geschätztes Volumen |
|---|---|---|---|
| `/wissen/copilot-inhouse-schulung-buchen` | „Microsoft Copilot Inhouse-Schulung buchen: Ablauf, Preise, Kunden-Cases" | Copilot Schulung Inhouse Unternehmen buchen | hoch, transaktional |
| `/wissen/copilot-schulung-foerderung-qcg-2026` | „Copilot-Schulung über das Qualifizierungschancengesetz fördern lassen" | KI Schulung Förderung QCG | hoch, kaufrelevant |
| `/wissen/eu-ai-act-mitarbeiter-schulung-august-2026` | „EU AI Act August 2026: KI-Schulungspflicht für Mitarbeiter rechtzeitig erfüllen" | EU AI Act Schulungspflicht 2026 | sehr hoch, zeitkritisch |

Alle drei nach dem CLAUDE.md-Wissensartikel-Template, mit kundenorientierten FAQs.

Aufwand: jeweils 1 Tag, gestaffelt über 3 Wochen.
Ranking-Risiko: **niedrig**. Neue Seiten gefährden bestehende Rankings nicht direkt. Risiko entsteht nur, wenn der Hub-Artikel zur QCG-Förderung mit `/wissen/ki-schulung-mitarbeiter-pflicht` (aktuell #8) kannibalisiert. Schutzmaßnahme: Klare Themenseparierung (Pflicht = Recht, Förderung = Finanzierung) und interne Verlinkung in beide Richtungen.
Reihenfolge: Schritt 8, gestaffelt.

#### B4 · Trust-Signal-Block auf Startseite und /ueber-uns

Problem: DAX-Referenzen sind in der Autoren-Bio vergraben.

Konkreter Schritt:

1. Auf der Homepage (`src/pages/Index.tsx`, oberhalb von Benefits) ein Block „Diese Unternehmen vertrauen uns" mit Kunden-Logos einbauen — vor Veröffentlichung jedes Logo schriftlich freigeben lassen, Reihenfolge: REWE, Pernod Ricard, Lekkerland, Marriott Hotels, Med360Grad, IHK Nord Westfalen.
2. „2.000+ ausgebildete Wissensarbeiter" als KPI über dem Fold.
3. Auf `/ueber-uns` einen ausführlichen Abschnitt „Unsere Referenzkunden" mit Branche und Kurz-Case (1–2 Sätze pro Kunde).

Aufwand: 1 Tag Code + Logo-Freigaben (Kalenderzeit 1–2 Wochen).
Ranking-Risiko: **niedrig**. Homepage-Änderungen sind sensibel, aber Trust-Elemente wirken positiv auf User-Signals (Bounce-Rate, Dwell-Time). Schutzmaßnahme: H1, Hero-Headline und erster Absatz bleiben unverändert.
Reihenfolge: Schritt 9.

---

### Block C — Technisches SEO und Performance (Wochen 2–4)

#### C1 · PageSpeed-API-Quota lösen

Problem: Seit über einer Woche keine Core-Web-Vitals-Messung.

Konkreter Schritt: In der Google Cloud Console (Projekt 583797351490 oder neues Projekt) einen eigenen API-Key für PageSpeed Insights anlegen und das tägliche Limit auf ≥1.000 Requests anheben. Key in `website-health-check/config.json` ergänzen. Falls die Quota-Erhöhung wegen Billing-Issues blockiert ist, alternativ direkt PageSpeed-web.dev manuell für die Top-10-Seiten abfragen und einmal pro Woche manuell ins Health-Check-Dashboard eintragen.

Aufwand: 1 Stunde.
Ranking-Risiko: **null**.
Reihenfolge: Schritt 10, parallel.

#### C2 · `Cache-Control`-Strategie für statische Assets

Problem: Live-Header zeigt `Cache-Control: no-cache` — verhindert effektives Browser-Caching.

Konkreter Schritt: Auf AlwaysData die `.htaccess` so anpassen, dass JS/CSS/Bilder im `/assets/`-Pfad einen langen `Cache-Control: public, max-age=31536000, immutable` Header bekommen. Da Vite hash-basierte Dateinamen erzeugt, ist das sicher. HTML-Dateien hingegen mit `Cache-Control: public, max-age=300, must-revalidate` für moderates Caching.

Aufwand: 1 Stunde + Test.
Ranking-Risiko: **niedrig**. Performance-Verbesserung wirkt positiv auf Core Web Vitals.
Reihenfolge: Schritt 11.

#### C3 · Sitemap-Generator hinter `npm run build` erzwingen

Problem: `generate-sitemap.js` wird via `prebuild` ausgeführt, aber laut Audit haben sich URL-Lücken angesammelt — das Skript scheint einige Seitentypen nicht abzudecken.

Konkreter Schritt: `scripts/generate-sitemap.js` lesen, prüfen welche Quellen es einliest. Ergänzen, sodass es zusätzlich:
- alle Workshops aus `src/data/workshops.ts`
- alle Trainer aus `src/data/trainers.ts` (falls vorhanden, sonst aus `authors.ts`)
- alle Trainings aus `src/data/trainings.ts`
- alle Wissens-Artikel aus `src/data/articles.ts`
- statische Seiten: `/impressum`, `/datenschutz`, `/unsere-angebote`, `/ueber-uns`, `/trainer-werden`, `/training-konfigurator`
einliest.

Aufwand: 2 Stunden.
Ranking-Risiko: **niedrig**.
Reihenfolge: Schritt 12, zusammen mit A4.

#### C4 · Schema.org-Konsolidierung

Problem: Schema-Markup ist vorhanden, aber unterschiedlich tief je nach Seitentyp.

Konkreter Schritt:

1. Auf der Homepage ergänzen: `WebSite` mit `potentialAction` → `SearchAction` (für Sitelinks-Searchbox).
2. Auf `/ueber-uns` und der Homepage: `Organization` mit `aggregateRating` (sobald ProvenExpert-Bewertungen vorhanden, siehe D2).
3. Auf jeder Trainings- und Workshop-Seite: `Course` mit `hasCourseInstance.courseSchedule` (sobald konkrete Termine vorhanden).
4. Auf der neuen Hub-Seite (B2): `ItemList` mit allen 10 Anbietern + jeweils `Organization` als Item.

Aufwand: 1 Tag.
Ranking-Risiko: **niedrig**.
Reihenfolge: Schritt 13.

---

### Block D — Off-Page und Trust-Signal-Aufbau (Wochen 2–8, parallel)

#### D1 · ProvenExpert-Profil anlegen

Problem: Wettbewerber zeigen aggregierte Bewertungen, wir nicht.

Konkreter Schritt: Kostenfreies ProvenExpert-Profil für copilotenschule.de anlegen, Verifizierungs-Abzeichen einbinden. Aus dem bestehenden Teilnehmerstamm (2.000+ Wissensarbeiter, IHK, Yellow-Boat-Kontakte) eine Welle Bewertungseinladungen anstoßen. Ziel: erste 15 Bewertungen innerhalb 4 Wochen.

Aufwand: 2 Stunden Setup + laufende Einladungen.
Ranking-Risiko: **null**.
Reihenfolge: Schritt 14, sofort starten — die Aufholzeit ist die längste.

#### D2 · Anbieter-Profile in DACH-Weiterbildungsverzeichnissen

Konkreter Schritt: Profile aktualisieren oder anlegen auf:
- kursfinder.de (LLM-Quelle, wichtig für GEO-Score)
- weiterbildung.de
- springest.de (Firmen-Profil, Martin hat schon ein Personenprofil)
- semigator.de
- proweb-kurse.de

Jeweils mit Backlink zur Startseite und zu mindestens einem Wissensartikel.

Aufwand: 4 Stunden insgesamt.
Ranking-Risiko: **null**.
Reihenfolge: Schritt 15, parallel zu D1.

#### D3 · Listicle-Outreach an „Beste-KI-Anbieter"-Publisher

Konkreter Schritt: An die Redaktionen von `mod-education.de` (Leon Froschauer / Julius Merkl), `ki-trainingszentrum.com` und `cmt.de` jeweils eine Mail mit Bitte um Aufnahme schicken — Argumentation: einzige spezialisierte Copilot-Schule mit DAX-Kundenstamm und eigenem Trainingsraum in Köln. Anschreiben-Vorlage im Strategie-Papier vom 25.05.

Aufwand: 2 Stunden Vorbereitung + Follow-Up.
Ranking-Risiko: **null**.
Reihenfolge: Schritt 16, nach Go-Live des Hub-Artikels.

#### D4 · IHK Nord Westfalen ins Bildungs-Verzeichnis

Konkreter Schritt: Bestehenden IHK-Kontakt (laufender Kunde) ansprechen mit Bitte um Aufnahme im Weiterbildungsverzeichnis. Wenn IHK uns als Bildungsanbieter listet, ist das ein massiver Authority-Boost.

Aufwand: 1 Stunde Mail + ggf. Formular.
Ranking-Risiko: **null**.
Reihenfolge: Schritt 17.

#### D5 · Yellow-Boat-Gastartikel als thematischer Backlink

Konkreter Schritt: Auf yellow-boat.com (Mutter-Marke) einen Artikel veröffentlichen mit Titel wie „Wie wählt ein Unternehmen den richtigen Copilot-Schulungsanbieter?" und Verlinkung zum Hub-Artikel auf copilotenschule.de. Da yellow-boat.com seit 2011 existiert, hat die Domain Authority — und der Backlink kommt von einer thematisch verwandten, aber separaten Domain.

Aufwand: 2 Stunden Artikel + Veröffentlichung.
Ranking-Risiko: **null**.
Reihenfolge: Schritt 18.

---

### Block E — Monitoring und Iteration (laufend)

#### E1 · Tägliches Monitoring fortführen

Das Website-Health-Check-Skript läuft bereits. Sobald A1 (Audit) und A2 (Pre-Render-Fix) live sind, in den täglichen Report eine neue Spalte aufnehmen: „SSR-Health" (Prozentsatz der Sitemap-URLs mit korrektem Title/Description/Canonical im Live-HTML). Ziel: dauerhaft 100 %.

#### E2 · LLM-Erwähnungs-Tracking ausweiten

Wöchentlich die im Strategie-Papier Abschnitt 5B genannten Standard-Prompts in ChatGPT, Perplexity, Gemini, Claude eintippen und Ergebnisse in `data/llm-mentions-history.json` festhalten.

#### E3 · GSC-Indexierungsstatus

Jede Woche im Bericht: Anzahl indexierter Seiten laut GSC-Property — sobald GSC-Zugang wieder funktioniert (laut Report vom 20.05. aktuell falscher Google-Account verknüpft). Bis dahin behelfsmäßig per `site:copilotenschule.de` Suche zählen.

---

## 4. Empfehlungen zur Umsetzung der Maßnahmen

### 4.1 Verbindliche Reihenfolge

Die Reihenfolge ist nicht willkürlich. Sie minimiert Ranking-Risiko und maximiert Hebel:

**Woche 1** — Diagnose und Sicherheitsnetz:
A1 (Pre-Render-Audit), B1 (Protected-Pages-Liste), C1 (PageSpeed-Quota), D1 (ProvenExpert anlegen).

**Woche 2** — Core-Fix mit Ranking-Schutz:
A2 (Pre-Render-Fix in Bug-Fix-Branch), A3 (Title-Suffix), A4 (Sitemap-Sync), A5 (IndexNow im Deploy).

**Woche 3** — Erste Content-Erweiterung:
B2 (Hub-Artikel Anbieter-Vergleich) live; C2 (Cache-Control); C3 (Sitemap-Generator); B4 (Trust-Block Homepage); D2 (Verzeichnis-Profile).

**Woche 4** — Zweiter Content-Block:
B3 (EU AI Act-Hub als nächster, weil zeitkritisch bis August 2026); D3 (Listicle-Outreach starten).

**Woche 5–6** — Verbleibende Hub-Artikel + Trust-Aufbau:
B3 (Inhouse-Schulung-Hub, QCG-Förderung-Hub); C4 (Schema-Konsolidierung); D4 (IHK).

**Woche 7–8** — Off-Page-Vertiefung:
D5 (Yellow-Boat-Gastartikel); Case Studies; Re-Review aller Maßnahmen.

### 4.2 Strikte Spielregeln zum Ranking-Schutz

Diese Regeln gelten für jede einzelne Maßnahme:

1. **Kein Commit auf `main` ohne lokalen `npm run build:prerender`-Test.** Das fängt `validate-seo.js`-Fehler, TypeScript-Fehler und react-snap-Fehler ab, bevor sie deployed werden.
2. **Vor jedem Deploy: Diff-Check der dist-HTMLs für die Protected Pages aus B1.** Ein einfaches `diff <(cat dist/wissen/copilot-roi-berechnen.html | tr '>' '>\n' | grep -E "title|description|canonical") <(curl -s https://copilotenschule.de/wissen/copilot-roi-berechnen | tr '>' '>\n' | grep -E "title|description|canonical")` reicht.
3. **Kein Bulk-Refactor von Wissens-Artikeln.** Pro PR maximal 3 Artikel berühren, immer mit klarer Diff-Dokumentation.
4. **Keine URL-Änderung an einer rankenden Seite ohne 301-Redirect** und ohne Eintrag in der Protected-Pages-Liste.
5. **Nach jedem Deploy IndexNow-Ping** für die geänderten Routen (siehe A5).

### 4.3 Definition of Done

Der Maßnahmenkatalog gilt als erfolgreich umgesetzt, wenn nach 8 Wochen die folgenden Messpunkte erreicht sind:

- Indexierungsquote copilotenschule.de bei GSC ≥ 90 % (von aktuell 49 %)
- SEO-Score laut Health Check ≥ 75 (von aktuell 42)
- GEO-Score stabil ≥ 80 (gewahrt)
- Top-3-Keywords ≥ 5 (von aktuell 4) und Top-10-Keywords ≥ 10 (von aktuell 7)
- „Microsoft Copilot Training Empfehlung beste Anbieter Deutschland 2026" wieder in Top 3
- Erwähnung in mindestens einem externen Listicle (mod-education, ki-trainingszentrum oder cmt)
- ProvenExpert-Profil mit ≥ 15 Bewertungen
- Keine der Protected Pages (B1) hat in Rankings mehr als 2 Positionen verloren

### 4.4 Was nicht gemacht werden sollte

Aus den Reports und der Strategie-Datei ist klar erkennbar, was **nicht** sinnvoll ist und im Zweifel unterlassen wird:

- Kein Wechsel des Tech-Stacks auf Astro / Next.js — dafür gibt es keinen Business-Case, die bestehende Vite-Stack-Lösung kann mit korrekt konfiguriertem `react-snap` alle relevanten SEO-Anforderungen erfüllen
- Keine bezahlten SEO-Tools (Ahrefs, SISTRIX) für die nächsten 2 Monate — die Erkenntnis aus Health Check + WebSearch reicht
- Keine PR-Agentur, keine Sponsored Listings — ROI unklar
- Keine massiven Title-/H1-Änderungen an Top-3-Rankings — wenn überhaupt, dann nur Description-Optimierung
- Keine globalen Schema-Refactors ohne Diff-Test pro Seite

---

## Quellenangaben

Die in diesem Bericht aggregierten Erkenntnisse stammen aus:

- 38 Tagesreports des Health-Check-Skripts (`/Users/martin/Documents/Cowork Bereich/website-health-check/reports/`) zwischen dem 14. März und 27. Mai 2026
- Strategie-Papier `strategie-beste-anbieter-2026-05-25.md` (Strategie zur Rückeroberung der Top-3-Position für „Empfehlung beste Anbieter Deutschland 2026")
- Konfigurationsdatei `config.json` mit Tracking-Keywords und Wettbewerbern
- Live-Checks am 27.05.2026, 10:38 Uhr: robots.txt, sitemap.xml, llms.txt, vier ausgewählte URLs mit Googlebot-User-Agent
- Code-Audit der Dateien `src/components/SEOHead.tsx`, `src/lib/schema.ts`, `src/App.tsx`, `package.json` (reactSnap-Konfiguration), `scripts/validate-seo.js` sowie ausgewählter Wissens-TSX-Dateien
- Projekt-Anweisungen aus `CLAUDE.md` (verbindliche URL-Konventionen, Pflicht-Checkliste für neue Seiten, ContentLayout-Regeln, IndexNow-Vorschrift)

---

*Bericht aus Anlass der dauerhaft schwachen Indexierungsquote von ~49 % sowie des Ranking-Drops für „beste Anbieter Deutschland 2026" — als verbindliche Grundlage für die kommenden 8 Wochen.*

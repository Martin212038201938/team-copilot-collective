# Pattern-Transfer: Angebots-CTA-Brücke auf den 4 Goldenen Pages

**Erstellt:** 26.08.2026 (Cron `copilotenschule-pattern-transfer-2026-08-26`)
**Auftrag:** Additive, kontextuelle Angebots-CTA-Komponente nach dem ersten Sinnabschnitt in die 4 Goldenen Pages einbauen (aus Monatsreview 08/2026, Funnel-Totalbruch Content→Angebot: Stufe 1 1.621 Sess./57,67 % → Stufe 2 nur 3 Sess./0,19 % → 0 % E2E).
**Goldene Pages (GSC-Top × Clarity-Traffic, organic):** `/wissen/microsoft-copilot-lizenzen` *(Protected)*, `/wissen/claude-in-microsoft-copilot`, `/wissen/copilot-in-outlook-nutzen-tipps`, `/wissen/copilot-tipps-tricks-produktivitaet`.

---

## 0. Wichtigster Befund: Repo-Realität weicht vom Cron-Auftrag ab

Der Cron-Auftrag ging davon aus, dass den 4 Goldenen Pages die prominente, kontextuelle CTA-Brücke im Body fehlt. **Das stimmt nicht mehr.** Ein Repo-Grep zeigt: Genau diese Komponente wurde bereits gebaut und in **allen 4** Goldenen Pages eingebaut — inklusive der Protected Page.

| Datei | Route | AngebotsBruecke (Brücke nach 1. Abschnitt) | Zusätzlicher TrainingCTA (2. Touchpoint vor FAQ) |
|---|---|---|---|
| `src/pages/CopilotLicenses.tsx` *(Protected)* | `/wissen/microsoft-copilot-lizenzen` | ✅ Zeile 306 (nach `#overview`) | ❌ fehlt |
| `src/pages/CopilotTippsTricks.tsx` | `/wissen/copilot-tipps-tricks-produktivitaet` | ✅ Zeile 246 (nach `#game-changer`) | ❌ fehlt |
| `src/pages/CopilotClaudeIntegration.tsx` | `/wissen/claude-in-microsoft-copilot` | ✅ Zeile 262 (nach `#was-ist-passiert`) | ✅ Zeile 355 + 490 |
| `src/pages/CopilotInOutlook.tsx` | `/wissen/copilot-in-outlook-nutzen-tipps` | ✅ Zeile 244 (nach `#voraussetzungen`) | ✅ Zeile 397 + 891 |

**Quelle/Verifikation:**
- Commit `002098a` „cta brücken", 12.08.2026, Autor Martin — fügt `AngebotsBruecke` in alle 4 Dateien ein.
- `git merge-base --is-ancestor 002098a origin/main` → **YES**. Der Commit ist Teil von `main` = `origin/main` — **live**, kein Push-Stau.
- Komponente: `src/components/AngebotsBruecke.tsx` (eigene Card-Optik, `<aside>`-Element, Clarity-Event `angebot_bruecke_click`). Laut Docstring genau für diesen Zweck gebaut: „traffic-starke Wissensartikel (Goldene Pages)", KPI „Funnel-Stufe-2-Rate von 0,19 % auf ≥ 2 % in 4 Wochen".
- **Protected-Page-Regel eingehalten:** In `CopilotLicenses.tsx` sitzt der Block nach `#overview` (der dritte Abschnitt nach `#quick-answer` und `#was-kostet-copilot`), rendert als `<aside>`, verändert weder `<section>`-Struktur noch H1/Title/Meta/Canonical/erste 100 Wörter. Title/Meta wurden separat und bereits am 12.08. über `docs/drafts/protected-page-diff-microsoft-copilot-lizenzen-2026-08-12.md` geändert und sind ebenfalls live (verifiziert: `src/pages/CopilotLicenses.tsx` Zeile 112/113 entspricht dem dortigen „neu"-Diff). Diese Draft-Datei behält weiterhin ihre Gültigkeit als Protected-Page-Dokumentation für die Title/Meta-Änderung — der vorliegende Draft ändert daran nichts und dupliziert sie nicht.
- Erste Live-Daten bestätigen das Feuern: Weekly-Audit 24.08. (`clarity-insights.md`) zählt bereits **1× `angebot_bruecke_click`** in 7 Tagen — die Brücke ist nicht nur eingebaut, sondern wird auch schon geklickt.

**Konsequenz für diesen Cron:** Der ursprünglich beauftragte Diff („CTA-Brücke nach erstem Sinnabschnitt einbauen") ist **bereits erledigt und live** — ein erneuter Diff wäre redundant und würde das Risiko einer Doppel-Einbindung auf der Protected Page erzeugen. Kein Code-Änderungsbedarf für die Kern-Aufgabe.

---

## 1. Tatsächliche Lücke: fehlender zweiter Touchpoint auf 2 der 4 Seiten

Die ursprüngliche Pattern-Doku (`docs/drafts/pattern-transfer-content-to-offer-cta.md`, 11.06.2026) sah **zwei** Touchpoints pro Artikel vor: einen nach dem 2.–3. Abschnitt, einen zweiten kurz vor dem FAQ-Block. `CopilotClaudeIntegration.tsx` und `CopilotInOutlook.tsx` haben inzwischen beide Touchpoints (AngebotsBruecke + 2× TrainingCTA). `CopilotLicenses.tsx` und `CopilotTippsTricks.tsx` haben nur den ersten (AngebotsBruecke), keinen zweiten vor dem FAQ.

Das ist die einzige verbleibende, echte Lücke auf den 4 Goldenen Pages. Nachfolgend der additive Einbau-Entwurf dafür — **nur Entwurf, kein Push, keine Live-Änderung.**

### 1.1 `src/pages/CopilotLicenses.tsx` (Protected Page — zusätzliche Sorgfaltspflicht)

**Berührte Protected URL:** `/wissen/microsoft-copilot-lizenzen` (Rankings: Pos. 3 „Microsoft Copilot Kosten/Lizenz 2026", Pos. 6 „lohnt sich Microsoft Copilot KMU", laut `docs/protected-pages.md`).

**Was ändert sich:** Nichts an Title/Meta/H1/Canonical/ersten 100 Wörtern/Schema — reiner additiver `<TrainingCTA>`-Einbau zwischen dem letzten inhaltlichen Abschnitt (`#recommendations`, endet vor dem ROI-Generator) und dem FAQ-Block (`#faq`, Zeile 887). Die bereits vorhandene `AngebotsBruecke` nach `#overview` bleibt unverändert.

Diff-Entwurf (nach Zeile 883, vor `<section id="faq"` in Zeile 887 — siehe Ist-Zustand oben, der ROI-Generator-Abschnitt endet mit `</section>` direkt davor):

```tsx
// NEU, additiv einfügen zwischen </section> (Ende #business-case-generator) und <section id="faq" ...>
import TrainingCTA from "@/components/TrainingCTA"; // ergänzen zum bestehenden Import-Block (Zeile 7–12)

// ...

<TrainingCTA
  topic="Welches Training passt zu Ihrer Lizenz-Entscheidung?"
  benefit="Im Konfigurator stellen Sie Ihr Training passend zu Ihrem Lizenzmodell zusammen – von der Basis-Einführung bis zur rollenspezifischen Vertiefung."
  href="/training-konfigurator"
  label="Konfigurator starten"
/>
```

Begründung für `/training-konfigurator` statt eines Einzeltrainings: Die `AngebotsBruecke` weiter oben verlinkt bereits auf `microsoft-365-copilot-praxis` UND den Konfigurator (Zweit-Button). Ein zweiter Touchpoint mit identischem Ziel wäre redundant; der Konfigurator als alleiniges Ziel des zweiten Touchpoints passt zur Leser-Situation kurz vor dem FAQ (Entscheidungsphase, nicht mehr Erstkontakt) und dupliziert kein Linkziel 1:1.

**Pflicht-Verifikation vor jedem Merge (aus `docs/protected-pages.md`):**
1. Betroffene Protected URL im PR nennen: `/wissen/microsoft-copilot-lizenzen`.
2. Explizit dokumentieren: „Keine inhaltliche Änderung an Title, Meta-Description, H1, Canonical oder ersten 100 Wörtern — rein additiver `<TrainingCTA>`-Block vor dem FAQ."
3. Vor Merge lokal `npm run build:prerender`, danach `dist/wissen/microsoft-copilot-lizenzen.html` gegen Live-HTML diffen (Snippet aus `docs/protected-pages.md`, Abschnitt „PR-Regel").
4. Nach Deploy: GSC-URL-Inspection + IndexNow-Ping für die URL (Key `02184b6b954d4a158c75668dbf809161`).

### 1.2 `src/pages/CopilotTippsTricks.tsx` (nicht geschützt, aber Content-Ranking-relevant)

**Was ändert sich:** Rein additiv. Einbau zwischen dem Ende von `#anti-tipps` (dem „Kernerkenntnisse"-Kasten, endet kurz vor Zeile 869) und `<section id="faq">` (Zeile 870).

```tsx
// NEU, additiv einfügen zwischen </section> (Ende #anti-tipps) und {/* FAQ Section */}
import TrainingCTA from "@/components/TrainingCTA"; // ergänzen zum bestehenden Import-Block (Zeile 3–10)

// ...

<TrainingCTA
  topic="Copilot-Tipps im Team verankern"
  benefit="Im Praxis-Training übertragen wir genau diese Kurzformeln auf Ihre echten Word-, Excel- und Outlook-Abläufe – mit Ihrem Team, an einem Tag."
  href="/trainings/microsoft-365-copilot-praxis"
  label="Zum Praxis-Training"
/>
```

Ziel `microsoft-365-copilot-praxis` passt zum ursprünglichen Mapping aus `pattern-transfer-content-to-offer-cta.md` (dort für den Outlook-Artikel vorgesehen, hier analog für den allgemeinen Tipps-Artikel — inhaltlich deckungsgleich: Praxis-Training über alle Office-Apps).

**Vor Merge:** `npm run build:prerender` fehlerfrei, `validate-seo.js` ohne Fehler (Route ist keine Protected Page, aber die Checkliste aus `CLAUDE.md` für CSS-Abstände/authorName/keine readTime bleibt unberührt, da nur eine neue Komponente eingefügt wird, keine bestehenden Layout-Props geändert werden).

---

## 2. Koordination mit `copilotenschule-clarity-fix-microsoft-copilot-lizenzen`

Der parallele Cron (angekündigt für 19.08., laut `seo-projektplan.md`-Log vom 19.08. **nicht im Scheduler gefunden** — sein Deliverable existiert aber bereits als `docs/drafts/protected-page-diff-microsoft-copilot-lizenzen-2026-08-12.md`, erstellt am 12.08. im Rahmen des Monatsreviews) behandelt **ausschließlich** Title/Meta/Such-Snippet und die neue Kosten-Sektion `#was-kostet-copilot` auf derselben Seite. Explizit dort vermerkt: „Angebots-CTA-Brücke und andere Seiten sind NICHT Teil dieser Änderung."

Dieser Draft hier ergänzt genau die Lücke, die der andere Draft bewusst ausgespart hat (den zweiten CTA-Touchpoint) — **keine Widersprüche**, da beide Drafts unterschiedliche, nicht überlappende Diff-Bereiche der Datei betreffen (Title/Meta/`#was-kostet-copilot` vs. neuer `<TrainingCTA>` vor dem FAQ). Beide Änderungen sind ohnehin bereits bzw. noch zu committen unabhängig voneinander möglich. Da der Title/Meta-Diff laut Repo-Check bereits live ist, betrifft die verbleibende Merge-Reihenfolge nur noch: dieser Draft (zweiter CTA-Touchpoint) ist der einzige noch offene Diff für `CopilotLicenses.tsx`.

---

## 3. Was NICHT Teil dieses Drafts ist

- Keine Änderung an der bereits eingebauten `AngebotsBruecke` (Copy, Styling, Platzierung) — sie läuft, hat bereits Klicks, KPI-Fenster (4 Wochen ab 12.08.) noch nicht abgelaufen.
- Kein Eingriff in Title/Meta/H1/Canonical der Protected Page — das ist bereits durch den anderen Draft/Commit abgedeckt.
- Keine neuen Seiten, keine Sitemap-/App.tsx-/react-snap-Änderungen — betrifft nur bestehende, bereits gerouteten Seiten.
- Kein Git-Push, keine Live-Änderung — beide Diffs oben sind Entwürfe zur User-Review.

## 4. Empfehlung / nächster Schritt

1. Diesen Draft reviewen, insbesondere die Copy der beiden neuen `<TrainingCTA>`-Blöcke.
2. Bei Freigabe: Diffs in `CopilotLicenses.tsx` und `CopilotTippsTricks.tsx` einbauen, `npm run build:prerender` lokal testen, Protected-Page-Diff-Check gegen Live-HTML für `microsoft-copilot-lizenzen` durchführen (Snippet in Abschnitt 1.1).
3. Danach: Commit + Push via GitHub Desktop (User-Aufgabe laut `CLAUDE.md`).
4. Nach Deploy: IndexNow-Ping für beide URLs, GSC-Reindexierung für die Protected Page anfordern.
5. Messung: Weekly-Audit trackt `angebot_bruecke_click` bereits; `content_cta_click` (TrainingCTA-Tag) zusätzlich für die beiden neuen Touchpoints im nächsten Audit mit auswerten, damit sichtbar wird, ob der zweite Touchpoint vor dem FAQ ergänzend zieht oder ob ein Sessions unter beiden Events kannibalisiert.

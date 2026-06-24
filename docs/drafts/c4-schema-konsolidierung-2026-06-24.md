# C4 — Schema.org-Konsolidierung (Befund + Diff-Entwurf)

**Datum:** 2026-06-24
**Maßnahme:** C4 (Schema.org-Konsolidierung), Phase 3
**Status:** Entwurf — STRIKT Draft-only. KEIN `git push`, KEINE Änderung in `src/` durch diesen Lauf. Anwendung erfolgt durch den User auf einem Branch.
**Zahlt auf DoD ein:** #1 Indexierungsquote (Stand 59,8 %, Ziel 90 %) und #3 SEO-Score (Stand 42, Ziel 75).
**Bereits erledigt (09.06.):** logo.png/`#organization`-Konsolidierung in `index.html`, `organizationSchema.ts`, `authors.ts`. **Offen (= dieser Entwurf):** die breitere Schema-Konsolidierung über die Seiten — insbesondere die Reste der alten `og-image.jpg`-Logo-Referenz und doppelte `@id`-Knoten.

---

## 0. Kontext & Mechanik (warum überhaupt Doppelungen entstehen)

Jede Seite rendert ihr Schema über `SEOHead` → `combineWithGlobalSchema(pageSchema)` (`src/lib/organizationSchema.ts`). Diese Funktion **stellt auf JEDER Seite** das globale `@graph` voran:

```
globalSchema["@graph"] = [ organizationSchema (#organization),
                           parentOrganizationSchema (www.yellow-boat.com/#organization),
                           founderSchema (#martin-lang) ]
```

Danach hängt sie das seitenspezifische `@graph` an. **Problem:** Mehrere Seiten definieren in ihrem eigenen `@graph` erneut Knoten mit denselben `@id`s (`#organization`, `#martin-lang`) — teils mit **abweichenden Eigenschaften**. Im selben `@graph` zwei Knoten mit identischer `@id`, aber unterschiedlichem Inhalt → Google/LLM dedupliziert unkontrolliert, Entitätssignal verwässert, Rich-Results-Validierung wird unzuverlässig.

---

## 1. Befundliste

### F1 — Doppelter, widersprüchlicher `#martin-lang`-Person-Knoten (~46 Artikelseiten) 🔴 hoch
- `globalSchema.founderSchema` definiert `https://copilotenschule.de/#martin-lang` (jobTitle „Gründer & Microsoft Copilot Experte", 7× `knowsAbout`, 3 Credentials) — wird via `combineWithGlobalSchema` auf **jeder** Seite injiziert.
- 47 `/wissen/`-Seiten setzen zusätzlich **inline** einen vollständigen Person-Knoten mit **derselben** `@id` über `"author": getAuthorSchemaMarkup(martinLang)` (jobTitle „Gründer copilotenschule.de", 10× `knowsAbout`, 6 Credentials, andere `description`/`sameAs`). Davon ~46 Martin-Seiten, 1 Saskia-Seite (`BiasNoiseKiEntscheidungen.tsx` → `#saskia-kaden`, **keine** Kollision, da global nicht definiert).
- **Folge:** Auf jeder Martin-Artikelseite stehen zwei `#martin-lang`-Knoten mit konfligierenden Properties im selben `@graph`.

### F2 — `www` vs. non-`www` bei `yellow-boat.com/#organization` (dangling reference) 🟠 mittel
- Kanonisch in `globalSchema`/`parentOrganizationSchema`: `https://www.yellow-boat.com/#organization`.
- Abweichend (ohne `www`): `src/lib/schema.ts:583` und `:635`, sowie `src/pages/UeberUns.tsx:31` und `:90`.
- **Folge:** Auf Home, `/unsere-angebote`, `/ueber-uns` zeigt `parentOrganization` auf eine `@id`, die im selben Graph nicht existiert → ins Leere laufende Referenz.

### F3 — Doppelter `#organization`-Knoten mit VERALTETEM, NICHT EXISTIERENDEM Logo (`og-image.jpg`) 🔴 hoch
> **Verifiziert 24.06.:** `og-image.jpg` existiert **nirgends** im Repo (weder `public/og-image.jpg` noch sonstwo, `node_modules`/`.git` ausgenommen). Alle unten gelisteten `og-image.jpg`-Referenzen laufen damit auf ein **404-Logo** → nicht nur Doppelung, sondern ein defektes `logo`/`image`-Asset. Korrekt vorhanden: `public/images/copilotenschule_flugzeug.png`.

- `globalSchema.organizationSchema` nutzt korrekt `…/images/copilotenschule_flugzeug.png` (ImageObject, 512×512) — Ergebnis der 09.06.-Konsolidierung.
- Es existieren aber noch **inline-`#organization`-Knoten mit dem alten String-Logo** `…/og-image.jpg`:
  - `src/lib/schema.ts:552` (in `generateTrainingSchemas` → betrifft **Home** `Index.tsx` und **`/unsere-angebote`** `UnsereAngebote.tsx`).
  - `src/pages/UeberUns.tsx:22` (eigener inline-`#organization`).
  - (zusätzlich in totem Code, s. F5: `authors.ts:185`, sowie als `image` in `CopilotSchulungsanbieterVergleich.tsx:159`).
- **Folge:** `#organization` wird doppelt mit zwei verschiedenen Logos und unterschiedlich getyptem `logo` (String vs. ImageObject, s. F6) ausgeliefert. **Das ist genau der „breitere Konsolidierungs"-Rest, den C4 noch schuldet.**

### F4 — Redundante Organisations-Repräsentationen 🟡 niedrig
- `generateTrainingSchemas` definiert sowohl `#organization` (Organization) als auch `#educationalOrganization` (EducationalOrganization) für dieselbe reale Organisation.
- `generateCourseSchema` (pro Modul) bettet zusätzlich eine **anonyme** `Organization` (ohne `@id`, nur `sameAs`-LinkedIn) als `provider` ein — statt per `@id` auf `#organization` zu verweisen.
- **Folge:** Mehrere konkurrierende Org-Knoten verwässern die Entitätskonsolidierung. Kein Validierungsfehler, aber unsauber.

### F5 — Tote / doppelte Schema-Generator-Pfade 🟡 niedrig (Wartungsrisiko, kein Live-Risiko)
- Faktisch ungenutzt durch Seiten: `generateKnowledgePageSchema`, `getArticleSchema`, `getPublisherSchema`, `generateTrainingPageSchema`, `generateSimpleFAQSchema`, `generateFAQPageSchema` (Letzteres nur intern in `generateTrainingSchemas`).
- Zwei parallele „Article-Schema"-Generatoren (`schema.ts` vs. `authors.ts`) → Drift-Risiko; die veraltete `og-image.jpg`-Referenz lebt u. a. in diesen toten Helfern weiter.
- **Folge:** Quelle künftiger Inkonsistenzen; sollte mittelfristig vereinheitlicht werden.

### F6 — `logo` als String vs. ImageObject 🟡 niedrig
- `schema.ts:552` liefert `logo` als blanke URL-String; `organizationSchema.ts` als `ImageObject` mit `width`/`height`. Bei Dedup mehrdeutig.

---

## 2. Geltungsbereich: Protected Pages (im ersten Durchlauf AUSGESPART)

Laut `docs/protected-pages.md` werden folgende `/wissen/`-Seiten in **Pass 1 NICHT angefasst** (Schema ist dort ausdrücklich geschützte Fläche). Sie tragen zwar denselben F1-Doppelknoten, werden aber **erst in Pass 2** mit dokumentiertem Title/Meta/Canonical/Schema-Diff + GSC-URL-Inspection behandelt:

| Slug | Datei |
|---|---|
| `copilot-roi-berechnen` | `CopilotRoiBerechnen.tsx` |
| `copilot-training-schulung` *(Hypothese)* | `CopilotTraining.tsx` |
| `copilot-im-unternehmen-einfuehren-leitfaden` | `CopilotRolloutLeitfaden.tsx` |
| `microsoft-copilot-lizenzen` | `CopilotLicenses.tsx` |
| `ki-schulung-mitarbeiter-pflicht` | `KiSchulungMitarbeiterPflicht.tsx` |

> **Hinweis Abgrenzung:** `CopilotUnternehmensweitEinfuehren.tsx` (Slug `copilot-unternehmensweit-einfuehren`) ist **nicht** die geschützte Leitfaden-Seite — die geschützte ist `CopilotRolloutLeitfaden.tsx`. Nicht verwechseln.

**Globale Knoten nicht in Pass 1 anfassen:** `founderSchema` und `organizationSchema` in `organizationSchema.ts` werden auf JEDER Seite (auch Protected) injiziert. Jede Änderung daran ist faktisch eine Änderung an Protected Pages → daher in Pass 1 **unverändert** lassen. Die in Pass 1 vorgeschlagenen Org-Fixes betreffen ausschließlich die veralteten **inline**-Knoten auf **nicht-geschützten** Seiten (Home, `/unsere-angebote`, `/ueber-uns`) bzw. in `generateTrainingSchemas` (nur von diesen Seiten genutzt).

---

## 3. Vorgeschlagene Diffs

> Alle Diffs auf einem Branch `seo/c4-schema-konsolidierung` anwenden. Nach **jedem** Schritt: `npm run build:prerender` (führt `validate-seo` + `validate-prerender` aus). Zusätzlich für betroffene URLs den Rich-Results-Test / Schema-Validator gegen das gerenderte `dist/<route>.html` laufen lassen. **Kein Push durch Cron** — Push/Merge bleibt User-Aufgabe.

### Schritt 1 — Org-Konsolidierung in `generateTrainingSchemas` (betrifft nur Home + /unsere-angebote)

`src/lib/schema.ts`, Funktion `generateTrainingSchemas` (~Z. 546–608): **inline-`#organization`-Knoten komplett entfernen** und auf den korrekten globalen `#organization` (aus `combineWithGlobalSchema`) vertrauen.

- Entfernt damit zugleich die veraltete `logo: og-image.jpg`-Referenz (F3) und den darin verschachtelten non-`www`-Parent (F2, Z. 583).
- `#website` und `#educationalOrganization` **behalten** (sind einzigartig, nicht im globalen Graph).
- Im verbleibenden `#educationalOrganization`-Knoten die `parentOrganization`-`@id` (Z. 635) von `https://yellow-boat.com/#organization` → `https://www.yellow-boat.com/#organization` korrigieren (F2).

```diff
   return {
     "@context": "https://schema.org",
     "@graph": [
-      // Organization - Primary entity for LLM trust
-      {
-        "@type": "Organization",
-        "@id": "https://copilotenschule.de/#organization",
-        "name": "copilotenschule.de",
-        ... (gesamter inline-Organization-Block, inkl. logo: og-image.jpg
-             und parentOrganization @id yellow-boat.com/#organization) ...
-      },
       // Website
       { "@type": "WebSite", "@id": "https://copilotenschule.de/#website", ... },
       // Educational Organization
       {
         "@type": "EducationalOrganization",
         "@id": "https://copilotenschule.de/#educationalOrganization",
         ...
         "parentOrganization": {
-          "@id": "https://yellow-boat.com/#organization"
+          "@id": "https://www.yellow-boat.com/#organization"
         },
         ...
       },
       ...courses, ...events, ...(faqSchema ? [faqSchema] : [])
     ]
   };
```

> **Alternative (konservativer)**, falls man den inline-Knoten nicht entfernen will: nur `logo` auf `ImageObject` mit `copilotenschule_flugzeug.png` setzen und beide `yellow-boat`-`@id`s auf `www` ziehen. Entfernen ist aber sauberer (genau ein `#organization` pro Graph).

### Schritt 2 — `UeberUns.tsx` Org-Knoten angleichen (Seite nicht geschützt)

`src/pages/UeberUns.tsx`:
- Z. 22: `"logo": "https://copilotenschule.de/og-image.jpg"` → `ImageObject` mit `…/images/copilotenschule_flugzeug.png` (analog `organizationSchema.ts`). **Oder** den inline-`#organization`-Block ganz entfernen und auf global vertrauen (empfohlen, da identisch).
- Z. 31 und Z. 90: `https://yellow-boat.com/#organization` → `https://www.yellow-boat.com/#organization` (F2).

### Schritt 3 — `og-image.jpg` als `image` in nicht-geschützter Artikelseite

`src/pages/CopilotSchulungsanbieterVergleich.tsx:159`: `image`-URL `…/og-image.jpg` → `…/images/copilotenschule_flugzeug.png` **oder** ein artikelspezifisches OG-Bild. (Nicht geschützt; B2-Hub.) Kosmetisch/Konsistenz.

### Schritt 4 — F1: `#martin-lang`-Dedup auf NICHT-geschützten Martin-Artikelseiten

Auf allen Martin-authored `/wissen/`-Seiten **außer den 5 Protected Pages** und außer der Saskia-Seite den inline-Person-Knoten durch eine reine `@id`-Referenz ersetzen:

```diff
-        "author": getAuthorSchemaMarkup(martinLang),
+        "author": { "@id": "https://copilotenschule.de/#martin-lang" },
```

- Kanonischer Person-Knoten ist dann der global injizierte `founderSchema` (genau eine `#martin-lang`-Definition pro Graph). `import { getAuthorSchemaMarkup }` und die `const martinLang = …`-Zeile können bleiben (kein Build-Fehler) oder mit aufgeräumt werden.
- **Saskia-Seite (`BiasNoiseKiEntscheidungen.tsx`) NICHT ändern:** `#saskia-kaden` ist nirgends global definiert → der inline-Knoten ist dort die einzige Definition, keine Kollision. (Optional sauberer: Saskia analog zu Martin in `globalSchema` aufnehmen — separater Vorschlag, s. u.)
- **Trade-off (bewusst):** `founderSchema` ist etwas schlanker als `getAuthorSchemaMarkup(martin)` (7 vs. 10 `knowsAbout`, 3 vs. 6 Credentials). Auf den de-duplizierten Seiten geht damit minimal Autor-Detail verloren, dafür verschwindet der Konflikt. **Bessere Lösung** = `founderSchema` zur reichen Single-Source machen (s. Pass 2), aber das ist ein globaler Knoten → erst mit Protected-Page-Review zusammen.

**Betroffene Dateien (Pass 1, nicht-geschützt, Martin):** alle in `src/pages/` mit `"author": getAuthorSchemaMarkup(...)` AUSSER `CopilotRoiBerechnen.tsx`, `CopilotTraining.tsx`, `CopilotRolloutLeitfaden.tsx`, `CopilotLicenses.tsx`, `KiSchulungMitarbeiterPflicht.tsx`, `BiasNoiseKiEntscheidungen.tsx`.

### Schritt 5 (optional, Pass 2) — `founderSchema` als reiche Single-Source

In `organizationSchema.ts` `founderSchema` ersetzen durch `getAuthorSchemaMarkup(authors['martin-lang'])` (kein Zirkel-Import, da `authors.ts` `organizationSchema` nicht importiert). Dann ist der globale `#martin-lang`-Knoten der reiche Knoten, und die `@id`-Referenz aus Schritt 4 verliert kein Detail.
**Wichtig:** Das ist ein **globaler** Knoten → ändert auch Protected Pages → daher in **Pass 2** gemeinsam mit der Protected-Page-Behandlung und Diff-Doku.

### Schritt 6 (optional, F4/F5) — Aufräumen
- `generateCourseSchema`: `provider` von anonymer `Organization` auf `{ "@id": "https://copilotenschule.de/#organization" }` umstellen.
- Toten Code (F5) entfernen oder die zwei Article-Generatoren vereinheitlichen. **Isoliert halten**, damit sich am ausgelieferten HTML nichts ändert; separat validieren.

---

## 4. Anwendungsreihenfolge (risikoärmstes zuerst)

1. **Pass 1a — Org-Ebene, nicht-geschützt** (Schritte 1–3): Home, `/unsere-angebote`, `/ueber-uns`, B2-Hub. Behebt F2 + F3 + F6 dort, wo das veraltete Logo tatsächlich ausgeliefert wird. Keine Protected Page berührt. → `build:prerender` + Schema-Validator.
2. **Pass 1b — F1-Dedup, nicht-geschützt** (Schritt 4): ~41 Martin-Artikelseiten. Saskia + 5 Protected ausgespart. → `build:prerender` + Stichprobe Schema-Validator auf 3–5 Seiten.
3. **Beobachten** (≥ 1 Wochenaudit-Zyklus): Indexierungsquote, Rich-Results-Status, keine Ranking-Regression auf nicht-geschützten Top-Seiten (`copilot-in-excel-aktivieren` ist GSC-Klickbringer #1 → besonders im Blick behalten).
4. **Pass 2 — Protected Pages + Single-Source** (Schritte 4 für die 5 Protected + Schritt 5): separater Branch, **pro Protected URL** Diff-Doku gemäß `protected-pages.md` (Title/Meta/H1/Canonical/erste 100 Wörter/Schema) + lokaler Title/Meta/Canonical-Diff (`dist` vs. Live, Snippet in `protected-pages.md`) + nach Deploy GSC-URL-Inspection + IndexNow-Ping.
5. **Pass 3 (optional)** — F4/F5-Aufräumen (Schritt 6).

---

## 5. validate-seo / Build-Hinweis

- `npm run build:prerender` ruft via `prebuild` automatisch `validate-seo` + `generate-sitemap` und nach dem Snap `validate-prerender.js`.
- `scripts/validate-seo.js` prüft **nur `/wissen`-Routen** (SLUG-Format, `canonicalUrl={pageUrl}`, Breadcrumb-`/wissen/`-Prefix, Route, react-snap-include) — **es prüft KEINE Schema-`@id`-Konsistenz.** Die hier vorgeschlagenen Schema-Diffs werden also **nicht** automatisch abgesichert → manuell mit dem Rich-Results-Test / einem JSON-LD-Validator gegen `dist/<route>.html` gegenprüfen.
- Für die 3 Org-Seiten (Home, `/unsere-angebote`, `/ueber-uns`) greift `validate-seo` gar nicht → dort besonders sorgfältig manuell verifizieren.

---

## 6. Erwarteter DoD-Effekt

- **#1 Indexierung (59,8 % → Ziel 90 %):** Saubere, eindeutige `@id`-Knoten verbessern die maschinelle Entitäts-/Seitenverständlichkeit. Konsistentes `#organization` + valider `parentOrganization`-Link stärken die Publisher-Entität, auf die jede `Article`/`Course`-Seite referenziert → indirekt unterstützend für „gecrawlt/gefunden – nicht indexiert" (25 Seiten). Kein Wunderhebel, aber additiv positiv und risikoarm.
- **#3 SEO-Score (42 → Ziel 75):** Health-Check/SEO-Scores werten Schema-Validität und Rich-Results-Eligibility. Beseitigung doppelter/konfligierender `@id`-Knoten (F1, F3) und dangling references (F2) adressiert genau die Punkte, die solche Scores typischerweise abwerten.
- **Risiko:** 🟢 niedrig für Pass 1 (keine Protected Page, keine Title/Meta/Canonical-Änderung, nur JSON-LD-Bereinigung auf nicht-geschützten Seiten). 🟡 erhöht für Pass 2 (Protected Pages) → dort strikt nach `protected-pages.md`-PR-Regel.

---

## 7. Offene Punkte / Annahmen

- `copilot-training-schulung` (→ `CopilotTraining.tsx`) ist in `protected-pages.md` als **Hypothese** markiert; vor Pass 2 per GSC-URL-Inspection bestätigen.
- ~~Existiert `public/og-image.jpg` überhaupt noch?~~ **Verifiziert 24.06.: nein, existiert nirgends im Repo** → alle `og-image.jpg`-Referenzen sind 404. Bereinigung damit nicht nur Konsolidierung, sondern Bugfix.
- Saskia in `globalSchema` aufnehmen ist optional und nicht Teil von Pass 1; erst erwägen, wenn mehr Saskia-Artikel entstehen.
- Exakte Zahl der zu ändernden Pass-1-Dateien in Schritt 4 vor Anwendung per `grep -rl '"author": getAuthorSchemaMarkup' src/pages/` minus Ausschlussliste verifizieren.

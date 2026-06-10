# Deployment-Checkliste — B3a EU AI Act Hub-Artikel

Schritte zum Live-Schalten des Entwurfs aus `eu-ai-act-mitarbeiter-schulung-august-2026.tsx.md`.
Reihenfolge einhalten — sonst wird die Seite nicht pre-gerendert (kein SEO im initialen HTML).

**Slug:** `/wissen/eu-ai-act-mitarbeiter-schulung-august-2026`
**Komponente:** `EuAiActMitarbeiterSchulung`

---

## Schritt 1 — TSX-Datei anlegen
TSX-Block aus dem Draft kopieren nach:
```
src/pages/EuAiActMitarbeiterSchulung.tsx
```

## Schritt 2 — Import + Route in `src/App.tsx`
```typescript
import EuAiActMitarbeiterSchulung from "./pages/EuAiActMitarbeiterSchulung";
// ...
<Route path="/wissen/eu-ai-act-mitarbeiter-schulung-august-2026" element={<EuAiActMitarbeiterSchulung />} />
```

## Schritt 3 — Eintrag in `src/data/articles.ts`
Den vorbereiteten Block (am Ende des Drafts) an den **Anfang** des `ALL_ARTICLES`-Arrays setzen (neueste zuerst). `publishDate: "2026-06-10"`.

## Schritt 4 — react-snap include in `package.json`
Im Block `reactSnap.include` ergänzen:
```json
"/wissen/eu-ai-act-mitarbeiter-schulung-august-2026"
```
→ Ohne diesen Eintrag bricht der Build via validate-seo.js ab bzw. die Seite wird nicht vorgerendert.

## Schritt 5 — Sitemap
`scripts/generate-sitemap.js` → Slug in die `knowledgeSlugs`-Liste aufnehmen (oder direkt in `public/sitemap.xml`, falls manuell gepflegt):
```xml
<url>
  <loc>https://copilotenschule.de/wissen/eu-ai-act-mitarbeiter-schulung-august-2026</loc>
  <lastmod>2026-06-10</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

## Schritt 6 — Lokaler Build-Test (PFLICHT vor Commit)
```bash
cd ~/Documents/Cowork\ Bereich/team-copilot-collective
npm run build:prerender
```
Muss fehlerfrei durchlaufen. validate-seo.js prüft: cleaner SLUG (ohne `wissen/`-Prefix), canonicalUrl nutzt `{pageUrl}`, Breadcrumb-Href mit `/wissen/`, Route unter `/wissen/`, Eintrag in react-snap include. Bei Fehler: meist fehlt Schritt 4.

## Schritt 7 — Commit & Push
Claude pusht NICHT eigenständig. Du committest via GitHub Desktop, reviewst die Änderungen, dann Push zu `main`. GitHub Actions baut (`build:prerender`) + deployt via FTP zu AlwaysData.

## Schritt 8 — IndexNow-Ping (nach Go-Live)
deploy.yml pingt automatisch alle Sitemap-URLs. Für sofortiges Einzelsignal an Bing optional manuell:
```bash
curl -X POST "https://api.indexnow.org/IndexNow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d '{
    "host": "copilotenschule.de",
    "key": "02184b6b954d4a158c75668dbf809161",
    "keyLocation": "https://copilotenschule.de/02184b6b954d4a158c75668dbf809161.txt",
    "urlList": [
      "https://copilotenschule.de/wissen/eu-ai-act-mitarbeiter-schulung-august-2026"
    ]
  }'
```
Erwartete Antwort: HTTP 202 Accepted. Google nutzt IndexNow nicht → zusätzlich in der Google Search Console einreichen.

---

## Inhaltliche Review-Punkte vor dem Push
- [ ] Faktencheck bestätigen: Pflicht seit 02.02.2025, Durchsetzung ab 02.08.2026, BSI als Aufsicht in DE.
- [ ] Statistiken (64 % / 43 % / 27 % / 56 %) für deine Tonalität ok? Sind aus Sekundärquellen (Sektion Quellen); ggf. mit primärer Bitkom-Studie gegenprüfen.
- [ ] FAQ-Tonalität: 5 entscheiderorientierte Fragen, alle mit Copilotenschule-Bezug (CLAUDE.md-Regel erfüllt).
- [ ] Interne Links zeigen auf existierende Slugs: `copilot-schulungsanbieter-deutschland-vergleich`, `copilot-unternehmensweit-einfuehren`, `copilot-sicherheit-datenschutz`, `copilot-training-schulung` (alle verifiziert vorhanden).
- [ ] Rechtshinweis (keine Rechtsberatung) ist enthalten.
- [ ] Optional: Bei den Wettbewerbern in Sektion 6 wurde bewusst neutral formuliert (kein Namedropping) — falls gewünscht, konkreten Wettbewerber wie copilotexperte.de ergänzen.

## Hinweis zum Cron
Der geplante Cron `copilotenschule-seo-b3a-eu-ai-act-draft` (15.06.) ist durch diesen vorgezogenen Entwurf gegenstandslos. Er wurde auf Verifikation umgestellt bzw. kann deaktiviert werden (siehe Status-Log-Eintrag 09.06.).

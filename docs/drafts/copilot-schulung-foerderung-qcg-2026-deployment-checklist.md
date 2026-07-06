# Deployment-Checkliste — B3b QCG-Förderung Hub-Artikel

Schritte zum Live-Schalten des Entwurfs aus `copilot-schulung-foerderung-qcg-2026.tsx.md`.
Reihenfolge einhalten — sonst wird die Seite nicht pre-gerendert (kein SEO im initialen HTML).
Basiert auf der CLAUDE.md-Pflicht-Checkliste (8 Schritte).

**Slug:** `/wissen/copilot-schulung-foerderung-qcg-2026`
**Komponente:** `CopilotSchulungFoerderungQcg`

---

## Schritt 1 — TSX-Datei anlegen
TSX-Block aus dem Draft kopieren nach:
```
src/pages/CopilotSchulungFoerderungQcg.tsx
```

## Schritt 2 — Import + Route in `src/App.tsx`
```typescript
import CopilotSchulungFoerderungQcg from "./pages/CopilotSchulungFoerderungQcg";
// ...
<Route path="/wissen/copilot-schulung-foerderung-qcg-2026" element={<CopilotSchulungFoerderungQcg />} />
```

## Schritt 3 — Eintrag in `src/data/articles.ts`
Den vorbereiteten Block (am Ende des Drafts) an den **Anfang** des `ALL_ARTICLES`-Arrays setzen (neueste zuerst). `publishDate: "2026-07-06"`. Kein `readTime` (CLAUDE.md-Regel).

## Schritt 4 — react-snap include in `package.json`
Im Block `reactSnap.include` ergänzen:
```json
"/wissen/copilot-schulung-foerderung-qcg-2026"
```
→ Ohne diesen Eintrag bricht der Build via validate-seo.js ab bzw. die Seite wird nicht vorgerendert.

## Schritt 5 — Sitemap (`public/sitemap.xml` bzw. `scripts/generate-sitemap.js`)
```xml
<url>
  <loc>https://copilotenschule.de/wissen/copilot-schulung-foerderung-qcg-2026</loc>
  <lastmod>2026-07-06</lastmod>
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
```bash
curl -X POST "https://api.indexnow.org/IndexNow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d '{
    "host": "copilotenschule.de",
    "key": "02184b6b954d4a158c75668dbf809161",
    "keyLocation": "https://copilotenschule.de/02184b6b954d4a158c75668dbf809161.txt",
    "urlList": [
      "https://copilotenschule.de/wissen/copilot-schulung-foerderung-qcg-2026"
    ]
  }'
```
Erwartete Antwort: HTTP 202 Accepted. Google zusätzlich in der Search Console einreichen (nutzt IndexNow nicht).

---

## Inhaltliche Review-Punkte vor dem Push
- [ ] **Faktencheck Förderquoten bestätigen** gegen aktuelle Fachliche Weisungen der BA (§ 82 SGB III, gültig ab 01.01.2026): <50 bis 100 % · 50–<500 50 % (55 % m. TV/BV) · ≥500 25 % (30 % m. TV/BV); Arbeitsentgeltzuschuss 75/50/25 %.
- [ ] **120-Stunden-Schwelle** korrekt dargestellt (Einzel-Workshop NICHT förderfähig, mehrmodulige Lernreise schon) — der ehrliche Kernpunkt des Artikels, unbedingt beibehalten.
- [ ] **AZAV-Zertifizierung:** Prüfen, ob copilotenschule.de / der Träger AZAV-zertifiziert ist. Falls NICHT: Sektion 5 „Wie die Copilotenschule unterstützt" entsprechend ehrlich formulieren (Programm-Design + Partnerträger), keine falsche Zertifizierungs-Behauptung aufstellen.
- [ ] Rechtshinweis (keine Rechts-/Förderberatung) ist enthalten ✅
- [ ] FAQ: 5 entscheiderorientierte Fragen mit Copilotenschule-Bezug (CLAUDE.md-Regel) ✅
- [ ] Interne Links auf existierende Slugs geprüft: `copilot-lernreise-vs-tagesschulung`, `ki-schulung-mitarbeiter-pflicht` (Protected — nur additiv), `microsoft-365-copilot-praxis` (Training).
- [ ] Quellen-Sektion: konkrete Deep-Links zu arbeitsagentur.de / bmwk.de vor Push einsetzen (im Draft nur als Klartext-Quellen hinterlegt).

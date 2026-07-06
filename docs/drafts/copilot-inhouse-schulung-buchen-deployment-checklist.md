# Deployment-Checkliste — B3c Inhouse-Schulung Hub-Artikel

Schritte zum Live-Schalten des Entwurfs aus `copilot-inhouse-schulung-buchen.tsx.md`.
Reihenfolge einhalten — sonst wird die Seite nicht pre-gerendert (kein SEO im initialen HTML).
Basiert auf der CLAUDE.md-Pflicht-Checkliste (8 Schritte).

**Slug:** `/wissen/copilot-inhouse-schulung-buchen`
**Komponente:** `CopilotInhouseSchulungBuchen`

---

## ⚠️ VOR Schritt 1 — Kunden-Freigabe + Preis-Check (BLOCKER)
Diese Seite darf NICHT live gehen, bevor:
1. **Kunden-Cases (Sektion 5):** Die drei Platzhalter `[Kunden-Case: …]` durch anonymisierte Fälle ODER schriftlich freigegebene Namen ersetzt sind. Namentliche Nennung (REWE, Pernod Ricard, Lekkerland, Marriott, Med360Grad, IHK Nord Westfalen o. Ä.) NUR mit ausdrücklicher Freigabe. Redaktionellen Hinweis-Absatz entfernen.
2. **Preis-Range (Sektion 4):** Zahlen mit Martin/Vertrieb bestätigt sind. Repo nennt nur „Inhouse-Konditionen auf Anfrage" + offenes Training „ab 1.495 €/Person". Die im Draft genannte „ab 1.495 €"-Angabe fürs offene Training ist repo-belegt; alle Inhouse-Aussagen sind bewusst als Rahmen ohne feste Zahl formuliert.

---

## Schritt 1 — TSX-Datei anlegen
```
src/pages/CopilotInhouseSchulungBuchen.tsx
```

## Schritt 2 — Import + Route in `src/App.tsx`
```typescript
import CopilotInhouseSchulungBuchen from "./pages/CopilotInhouseSchulungBuchen";
// ...
<Route path="/wissen/copilot-inhouse-schulung-buchen" element={<CopilotInhouseSchulungBuchen />} />
```

## Schritt 3 — Eintrag in `src/data/articles.ts`
Vorbereiteten Block an den **Anfang** von `ALL_ARTICLES` setzen. `publishDate: "2026-07-06"`. Kein `readTime`.

## Schritt 4 — react-snap include in `package.json`
```json
"/wissen/copilot-inhouse-schulung-buchen"
```

## Schritt 5 — Sitemap (`public/sitemap.xml`)
```xml
<url>
  <loc>https://copilotenschule.de/wissen/copilot-inhouse-schulung-buchen</loc>
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
Muss fehlerfrei durchlaufen (validate-seo.js prüft SLUG/Canonical/Breadcrumb/Route/react-snap).

## Schritt 7 — Commit & Push
Claude pusht NICHT eigenständig. Commit + Review + Push via GitHub Desktop.

## Schritt 8 — IndexNow-Ping (nach Go-Live)
```bash
curl -X POST "https://api.indexnow.org/IndexNow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d '{
    "host": "copilotenschule.de",
    "key": "02184b6b954d4a158c75668dbf809161",
    "keyLocation": "https://copilotenschule.de/02184b6b954d4a158c75668dbf809161.txt",
    "urlList": [
      "https://copilotenschule.de/wissen/copilot-inhouse-schulung-buchen"
    ]
  }'
```
Erwartete Antwort: HTTP 202 Accepted. Zusätzlich in der Google Search Console einreichen.

---

## Inhaltliche Review-Punkte vor dem Push
- [ ] **Kunden-Cases freigegeben oder anonymisiert** (BLOCKER, s. o.).
- [ ] **Preis-Range bestätigt** (BLOCKER, s. o.). „zzgl. USt."-Hinweis beibehalten.
- [ ] Schwellenwert „ab ca. 8 Teilnehmende" mit Vertrieb plausibilisiert.
- [ ] FAQ: 5 transaktionale/kaufrelevante Fragen ✅
- [ ] B3b-Querlink (`copilot-schulung-foerderung-qcg-2026`) nur behalten, wenn B3b live ist — sonst temporär entfernen.
- [ ] Interne Links auf existierende Slugs geprüft: `warum-verteiltes-lernen-bei-copilot-trainings-funktioniert`, `copilot-lernreise-vs-tagesschulung`, `copilot-unternehmensweit-einfuehren`, `copilot-schulungsanbieter-deutschland-vergleich`, `microsoft-365-copilot-praxis`.

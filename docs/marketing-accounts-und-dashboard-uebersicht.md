# Marketing-Accounts & Dashboard – Übersicht / Backup

**Stand:** 2026-06-24 · **Für:** Martin & Chris · **Domain:** copilotenschule.de

Diese Datei dokumentiert, **welche Marketing-/SEO-/SEA-Zugänge wo liegen**, wie das
Marketing-Dashboard technisch funktioniert und welche Backups/Notfall-Wege es gibt.
**Keine Geheimwerte** stehen hier – nur Strukturen, Konten und Secret-Namen.

---

## 1. Account-Migration: alt → neu

Alle Google-/Marketing-Aktivitäten laufen künftig über den neuen Account.

| Bereich | Neuer Account (aktiv) | Alter Account (Backup) |
|---|---|---|
| Google-Login | **yellowboatschulung@gmail.com** | dams.telefon@gmail.com |
| Google Search Console | **Inhaber** (verifiziert) | Inhaber (als Backup behalten) |
| Google Ads | **Neues Konto „Copilotenschule" (480-547-8290)** | „Martin2" (346-501-6593, aufgelöst) |
| Bing Webmaster Tools | verbunden (Property www.copilotenschule.de) | – |
| Microsoft Clarity | Projekt „Copilotenschule" (ID **wxppg5394j**) | – |
| Google Cloud (für APIs) | Projekt **copilotenschule-dashboard** (`bubbly-observer-500418-b8`) | – |

> **Backup-Prinzip:** Der alte Account `dams.telefon` bleibt in der Search Console als
> verifizierter Inhaber erhalten – falls der Zugriff über den neuen Account je verloren
> geht, kommt man darüber wieder rein.

---

## 2. Google Ads – Startguthaben

- **Neues Konto „Copilotenschule" (480-547-8290)** unter `yellowboatschulung`.
- Gutschein **„400 € Guthaben bei 400 € Spend"** (Code `3T6PK-4FEQX-V44V`) ist **eingelöst**.
- Status: *„Eingelöst – weitere Anforderungen erfüllen"* → bis **15.08.2026** mind. **400 € Spend**, dann Gutschrift.
- Kampagne aktuell **pausiert** (kein Spend, bis bewusst gestartet wird).
- Hinweis: Finale Gutschrift erst nach Googles Neukunden-Prüfung; getrenntes Zahlungsprofil erhöht die Chance.

---

## 3. Marketing-Dashboard

**URL:** https://copilotenschule.de/dashboard (passwortgeschützt, `noindex`)
**Aktualisierung:** täglich automatisch, ~07:00 Berlin (GitHub Action), zusätzlich manuell auslösbar.

### Datenquellen (alle DIREKT angebunden – kein Supermetrics mehr)

| Quelle | Zugang | GitHub-Secret |
|---|---|---|
| Google Search Console | Service Account `dashboard-gsc-reader@bubbly-observer-500418-b8.iam.gserviceaccount.com` (als GSC-Nutzer „Vollständig") | `GSC_SERVICE_ACCOUNT_JSON` |
| Bing Webmaster Tools | API-Key (Bing WMT → Einstellungen → API-Zugriff) | `BING_API_KEY` |
| Microsoft Clarity | Data-Export-API-Token (Clarity → Datenexport) | `CLARITY_API_TOKEN` |
| PageSpeed Insights | API-Key (GCP-Projekt, auf PageSpeed-API beschränkt) | `PAGESPEED_API_KEY` |
| Google Ads | (neues Konto, noch kein Spend → 0; direkte Ads-API folgt später) | – |
| LLM-Sichtbarkeit | OpenAI (mit Websuche), **wöchentlicher** Job – eigene Datei `llm-visibility.json` | `OPENAI_API_KEY` |

> **Warum kein Supermetrics mehr?** Der Supermetrics-Trial lief am 30.06.2026 aus und
> die GSC-Verbindung lieferte über die REST-API nur 403. Die Pipeline wurde deshalb auf
> die **direkten, kostenlosen** Google-/Bing-/Clarity-APIs umgestellt.

### Technik

- **Script (täglich):** `scripts/build-dashboard-data.js` – dependency-frei (nur Node-Bordmittel),
  holt GSC (Service-Account-JWT → Search-Console-API), Bing, Clarity, PageSpeed; schreibt
  `public/dashboard/data.json` + `public/dashboard/history.json` (90 Tage Verlauf).
- **Workflow (täglich):** `.github/workflows/dashboard-refresh.yml` – täglicher Cron, commit + FTP-Deploy.
- **Script (wöchentlich):** `scripts/build-llm-visibility.js` – fragt OpenAI (mit Websuche) 8 typische
  Entscheider-Fragen und prüft, ob copilotenschule.de **genannt** und/oder **als Quelle zitiert** wird;
  schreibt `public/dashboard/llm-visibility.json` (Score, Einzel-Checks, Wettbewerber-Domains, 26-Wochen-Historie).
  Fällt automatisch auf reines Modellwissen zurück, falls die Websuche nicht verfügbar ist.
- **Workflow (wöchentlich):** `.github/workflows/llm-visibility.yml` – Cron montags 06:00 UTC, commit + FTP-Deploy
  von `llm-visibility.json`. Bewusst getrennt vom täglichen Job, damit dieser die LLM-Daten nicht überschreibt.
- **Schutz:** Liefert GSC keine Daten, wird das Update sauber übersprungen (Lauf bleibt grün,
  bestehende Daten bleiben erhalten).
- **Service-Account-Key:** liegt nur als GitHub-Secret + lokal als gitignorete Datei
  (`bubbly-observer-*.json`). **Niemals committen** (Google deaktiviert geleakte Keys automatisch).

---

## 4. GitHub-Secrets (Namen, Repo: Martin212038201938/team-copilot-collective)

Aktiv genutzt: `GSC_SERVICE_ACCOUNT_JSON`, `BING_API_KEY`, `CLARITY_API_TOKEN`,
`PAGESPEED_API_KEY`, `OPENAI_API_KEY` (LLM-Check), `FTP_SERVER/USERNAME/PASSWORD`, `VITE_CLARITY_ID`.

**Nicht mehr genutzt (gelöscht):** `SUPERMETRICS_API_KEY`, `SUPERMETRICS_DS_USER`.

> **Wichtig:** `OPENAI_API_KEY` muss als GitHub-Secret ein **gültiger** Key sein (der lokale
> `.env`-Key war zuletzt abgelaufen → 401). Prüfbar per manuellem Lauf des Workflows „LLM-Sichtbarkeit".

---

## 5. Notfall / Troubleshooting

- **Dashboard zeigt altes Datum:** Action prüfen (Actions → „Dashboard-Daten aktualisieren").
  Läuft sie grün, schreibt aber nichts → eine Quelle liefert keine Daten (Log ansehen).
- **GSC 403:** Service-Account-E-Mail muss in der Search Console als Nutzer (Vollständig) hinterlegt sein.
- **Merge-Konflikt bei `data.json`:** entsteht, wenn lokal UND der dashboard-bot dieselbe Datei ändern.
  Lösung: `data.json` ist generiert – einfach neu erzeugen lassen bzw. eine Version übernehmen, dann pushen.
- **Service-Account-Key verloren:** in der GCP-Console (`bubbly-observer-500418-b8` → IAM → Dienstkonten →
  dashboard-gsc-reader → Schlüssel) neuen JSON-Key erzeugen und als Secret hinterlegen.

---

## 6. Offen / nächste Schritte

- [x] **LLM-Sichtbarkeit** als wöchentlicher Check gebaut (Skript + Workflow + Dashboard-Sektion).
      → offen: `OPENAI_API_KEY`-Secret als gültigen Key prüfen, Workflow einmal manuell starten.
- [x] **Google Analytics**: kein Migrationsbedarf – einzige GA4-Property ist `yellow-boat.com`,
      nicht copilotenschule (das nutzt Clarity). Bewusst übersprungen.
- [x] Alte `SUPERMETRICS_*`-Secrets in GitHub gelöscht.
- [ ] Startseite: hohe Lab-LCP (~19 s) prüfen – größter PageSpeed-Hebel.
- [ ] Optional: Perplexity/Gemini als weitere LLM-Engines ergänzen (Struktur ist vorbereitet).

# Marketing-Dashboard — Setup & Betrieb

Dashboard-URL (nach Deploy): **https://copilotenschule.de/dashboard**
Zugriff: für Martin **und** Chris, jederzeit, passwortgeschützt, `noindex`.

Das Dashboard ist eine eigenständige Seite (`public/dashboard/`), die zwei
Datendateien liest und daraus KPIs, Trends und Empfehlungen rendert:

- `public/dashboard/data.json` — aktueller Tages-Snapshot
- `public/dashboard/history.json` — Zeitreihe (Verlauf, bis 90 Tage) → Trendkurven

> **Historisierung ist eingebaut:** Jeder tägliche Lauf schreibt einen neuen
> Snapshot und hängt einen Punkt an `history.json` an. So sieht man Entwicklungen
> und Trends über die Zeit.

---

## 1. Passwortschutz

Es gibt zwei Ebenen — Ebene B ist die eigentliche Absicherung:

**A) Client-seitiges Passwort (sofort aktiv).**
In `public/dashboard/index.html` ist ein Passwort-Gate eingebaut.
- Das Passwort ist gesetzt (Martin/Chris bekannt). Der **Klartext wird bewusst NICHT im Repo gespeichert** — nur der SHA-256-Hash steht in `index.html`.
- Ändern: neuen SHA-256-Hash erzeugen und in der Zeile `const PW_HASH = "…"` ersetzen.
  Hash erzeugen z. B. mit: `node -e "console.log(require('crypto').createHash('sha256').update('DEIN-PASSWORT').digest('hex'))"`
- Hinweis: schützt nur die Anzeige, nicht die JSON-Dateien direkt. Da das
  Dashboard keine kritischen Infos enthält, ist das als erste Stufe ok.

**B) Server-Passwort (empfohlen — schützt ALLES inkl. JSON).**
Am einfachsten über AlwaysData ohne Code:
1. AlwaysData-Panel → **Web → Sites → copilotenschule.de bearbeiten**
2. Abschnitt **„Schutz"/„Protection"**: Benutzername + Passwort setzen, Pfad `/dashboard`
3. Speichern — fertig. Ein gemeinsames Login für Martin & Chris.

Alternativ per `.htaccess` Basic Auth: Vorlage liegt auskommentiert in
`public/dashboard/.htaccess` (absoluten `.htpasswd`-Pfad eintragen).

---

## 2. Datenquellen anbinden („wo müssen Zugänge eingerichtet werden")

Ziel: 1× täglich automatisch echte Werte. Reihenfolge nach Aufwand/Nutzen.

| Quelle | Was wir bekommen | Einfachster Weg | Aufwand |
|--------|------------------|-----------------|---------|
| **PageSpeed Insights** | Core Web Vitals, Performance-Score | Kostenloser Google-API-Key | 5 Min |
| **Google Ads + Search Console + Bing** | Klicks, Kosten, Conversions, Impressionen, Positionen, Indexierung | **Supermetrics-MCP** (1 Connector deckt alle drei ab) | 15 Min |
| **Microsoft Clarity** | Sessions, Conversion-Events, Verhaltenssignale | Clarity **Data-Export-Token** | 10 Min |
| **SEO-/Keyword-/LLM-Sichtbarkeit** | Rankings, GEO-Sichtbarkeit (ChatGPT/Perplexity), Content-Lücken | Health-Check-Skill (Websuche) **oder** Ahrefs-MCP | 0–15 Min |

### Empfohlener Weg (am wenigsten Aufwand)

1. **Supermetrics-MCP verbinden** (Google Ads, Search Console, Bing in einem):
   - Über die Connector-Vorschläge in Cowork „Verbinden" klicken und das
     jeweilige Google-/Bing-Konto autorisieren.
   - Vorteil: **keine Google-Ads-API-Developer-Token-Beantragung** nötig
     (die dauert sonst Tage), keine rohen API-Keys auf dem Server.
2. **PageSpeed-API-Key** (kostenlos): Google Cloud Console → APIs aktivieren
   („PageSpeed Insights API") → API-Key erstellen.
3. **Clarity-Token**: clarity.microsoft.com → Projekt → Settings →
   Data Export → API-Token generieren.
4. *(Optional)* **Ahrefs-MCP** für tiefere SEO-/GEO-Daten (kostenpflichtig).

> Alle Zugangsdaten bleiben in den Cowork-Connectors bzw. in der geplanten
> Aufgabe — **nichts Sensibles landet auf dem öffentlichen Webserver.**

---

## 3. Tägliche Automatik — VOLLAUTOMATISCH via GitHub Action

Aktiv über die **Supermetrics REST-API + GitHub Action** — läuft auf GitHubs
Servern, ohne Cowork, ohne manuellen Push.

**Bausteine (bereits im Repo):**
- `scripts/build-dashboard-data.js` — ruft die Supermetrics-API (GSC, Google Ads,
  Bing), baut `data.json` und mergt `history.json` (bis 90 Tage Verlauf).
- `.github/workflows/dashboard-refresh.yml` — läuft **täglich ~07:00 Uhr**
  (`cron: 0 5 * * *`), generiert die Daten, committet die JSONs zurück
  (Historie bleibt erhalten) und lädt sie per FTP direkt auf den Server.

**EINMALIG nötig: 2 GitHub-Secrets eintragen** (GitHub → Repo → Settings →
Secrets and variables → Actions → „New repository secret"):

| Secret | Wert |
|--------|------|
| `SUPERMETRICS_API_KEY` | dein API-Key aus dem Supermetrics Query Manager (beginnt mit `api_…`) |
| `SUPERMETRICS_DS_USER` | die `ds_user`-ID aus derselben Query-Manager-URL |

> Die FTP-Secrets (`FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`) existieren bereits
> aus dem Deploy-Workflow und werden wiederverwendet. Keine Zugangsdaten liegen
> im Code oder auf dem öffentlichen Server.

**Testen:** GitHub → Actions → „Dashboard-Daten aktualisieren" → „Run workflow".
Danach zeigt `copilotenschule.de/dashboard` die frischen Werte.

> Der frühere Cowork-Task „dashboard-daily-refresh" wurde deaktiviert (durch
> diese Action ersetzt) und dient nur noch als manueller Fallback.

---

## 4. Was JETZT schon steht

- Dashboard-Seite, Layout, Trend-Charts, alle Sektionen — fertig & deploybar.
- Datenstruktur + Historisierung (`data.json`, `history.json`) — angelegt.
- Bereits echte Werte: Sitemap-URLs (74), Erreichbarkeit (HTTPS/200),
  Google-Ads-Conversion `/danke` verdrahtet.
- Noch „zu verbinden": GSC, Ads-Kennzahlen, Bing, Clarity, PageSpeed —
  erscheinen automatisch, sobald Schritt 2 erledigt ist.

## 5. Neue Domain/Metrik ergänzen

Die Felder in `data.json`/`history.json` folgen dem Schema des
`website-health-check`-Skills (`references/data-schema.md`). Neue Kennzahl:
Feld in `data.json` ergänzen + Renderer-Block in `index.html`. Neue Domain:
eigenes Dashboard-Verzeichnis oder Domain-Umschalter — auf Wunsch baue ich das.

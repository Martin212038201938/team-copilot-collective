# SEO-Analyse copilotenschule.de – 17. Februar 2026

## Zusammenfassung

Die Website hat massive Indexierungsprobleme. Von 47 Seiten in der Sitemap sind nur **20 bei Google indexiert** und **20 bei Bing**. Der Traffic ist minimal: **6 Klicks in 3 Monaten** bei Google. Die Hauptursache ist ein **systemisches Trailing-Slash-Problem**, das einen Canonical-Mismatch auf jeder einzelnen Seite erzeugt.

---

## 🔴 Problem #1: Trailing-Slash-Redirect (KRITISCH – Hauptursache)

### Was passiert
React-snap erstellt für jede pre-gerenderte Seite ein Verzeichnis:
```
dist/wissen/copilot-fehler-vermeiden/index.html
```

Apache's `mod_dir` erkennt das Verzeichnis und leitet automatisch um:
```
/wissen/copilot-fehler-vermeiden  →  301  →  /wissen/copilot-fehler-vermeiden/
```

### Warum das ein Problem ist

| Element | URL-Version | Conflict |
|---------|-------------|----------|
| **Sitemap** | `/wissen/slug` (ohne Slash) | ❌ |
| **Canonical-Tag** | `https://copilotenschule.de/wissen/slug` (ohne Slash) | ❌ |
| **Interne Links** | `/wissen/slug` (ohne Slash) | ❌ |
| **Tatsächlich ausgeliefert** | `/wissen/slug/` (MIT Slash, nach 301) | ✅ |

Google findet die URL in der Sitemap (ohne Slash), folgt ihr, bekommt einen 301-Redirect zur Slash-Version, sieht aber einen Canonical-Tag der auf die Nicht-Slash-Version zeigt. Ergebnis: **Google ist verwirrt und indexiert die Seite gar nicht.**

### Beweis
```bash
curl -sI "https://copilotenschule.de/wissen/github-copilot"
# → 301 → /wissen/github-copilot/

curl -sI "https://copilotenschule.de/wissen/github-copilot/"
# → 200 OK

# Betrifft JEDE Seite:
curl -sI "https://copilotenschule.de/trainings/copilot-grundlagen-prompt-design"
# → 301 → /trainings/copilot-grundlagen-prompt-design/

curl -sI "https://copilotenschule.de/unsere-angebote"
# → 301 → /unsere-angebote/
```

### GSC-Bestätigung
In GSC Performance → Seiten erscheinen URLs doppelt:
- `/copilot-fehler-vermeiden/` → 13 Impressionen (alte URL mit Slash)
- `/wissen/copilot-fehler-vermeiden/` → 9 Impressionen (neue URL mit Slash)
- `/wissen/copilot-fehler-vermeiden` → 4 Impressionen (Canonical-Version ohne Slash)

Google splittest die Ranking-Signale auf 3+ URL-Varianten pro Artikel!

### Lösung
**Option A (empfohlen): `DirectorySlash Off` in .htaccess**
```apache
# VOR dem SPA-Fallback einfügen:
DirectorySlash Off

# Dann: Wenn Anfrage ein Verzeichnis ist, index.html daraus liefern
RewriteCond %{REQUEST_FILENAME} -d
RewriteCond %{REQUEST_FILENAME}/index.html -f
RewriteRule ^(.*)$ $1/index.html [L]
```

Das bewirkt: `/wissen/slug` liefert direkt 200 OK mit dem Inhalt von `/wissen/slug/index.html` – ohne Redirect.

**Option B (Alternative): Sitemap + Canonicals auf Trailing-Slash umstellen**
Alle URLs konsistent mit Trailing Slash generieren. Aufwändiger, da Sitemap-Generator, Canonical-Tags und interne Links alle angepasst werden müssen.

---

## 🔴 Problem #2: 38 von 47 Seiten "Gefunden – zurzeit nicht indexiert" (GSC)

### Fakten
- **20 Seiten indexiert**, **40 nicht indexiert** (davon 38× "Gefunden – zurzeit nicht indexiert")
- Erstmals erkannt am: **07.02.2026**
- "Zuletzt gecrawlt": **Nicht zutreffend** für alle 38 Seiten

### Betroffene Seiten (alle 38)
Darunter fallen ALLE Trainingsseiten, ALLE neueren Wissensartikel, sowie:
- `/impressum`, `/trainer-werden`, `/ueber-uns`, `/unsere-angebote`, `/wissen`
- Alle `/trainings/*` Seiten (14 Stück)
- 18 von 21 `/wissen/*` Artikeln
- `/trainer/martin-lang`, `/training-konfigurator`

### Ursache
Das Trailing-Slash-Problem (siehe #1) ist die wahrscheinlichste Ursache. Google entdeckt die URLs via Sitemap, sieht aber bei jedem Crawl-Versuch einen 301-Redirect und eine Canonical-Diskrepanz. In Kombination mit der Tatsache, dass die Site erst seit ~10 Tagen wirklich sichtbar ist, ergibt sich eine Warteschlange.

### Zusätzliche Maßnahme
Nach Behebung des Trailing-Slash-Problems in GSC "Fehlerbehebung überprüfen" klicken, um Google zu signalisieren, dass die Seiten erneut gecrawlt werden sollen.

---

## 🟡 Problem #3: Bing – 19 Seiten ausgeschlossen, 3 Warnungen

### Fakten aus dem Bing Site Explorer
- **20 indiziert** | **0 Fehler** | **3 Warnungen** | **19 ausgeschlossen**
- 42 URLs bekannt, 478 Aufrufe, 22 Klicks, **nur 1 Backlink**
- `microsoft-copilot-lizenzen` → HTTP **301** (zeigt auf alte URL ohne /wissen/)
- `training-konfigurator` → HTTP **301**

### IndexNow-Konfiguration
261 URLs via IndexNow übermittelt, aber es gibt einen **Key-Mismatch**:
- `robots.txt` referenziert Key: `71f2f35d291ff3779699a8e4692d6cf7`
- `deploy.yml` verwendet Key: `695afc50b8ee44729593fd861c4e96e9`

**→ IndexNow-Key in deploy.yml und robots.txt vereinheitlichen.**

---

## 🟡 Problem #4: Extrem wenig Traffic & schlechte Rankings

### GSC Performance (3 Monate)
- **6 Klicks** insgesamt
- **1.130 Impressionen**
- **0,5% CTR**
- **Durchschnittliche Position: 16,5** (= Seite 2 bei Google!)

### Top-Suchanfragen ohne Klicks
| Suchanfrage | Impressionen | Position |
|-------------|-------------|----------|
| microsoft | 452 | 6,1 |
| copilot training | 85 | 12,1 |
| copilot | 46 | 9,6 |
| copilot schulung | 23 | 42,5 |
| microsoft copilot kurs | 21 | 40,9 |
| copilot workshop | 21 | 61,0 |

Problem: Die relevanten Keywords ranken auf Position 30–60+ – das ist Seite 3–6 bei Google.

### Ursachen
1. **Nur 1 Backlink** laut Bing – extrem wenig Domain Authority
2. Durch den Indexierungsfehler sind die meisten Seiten gar nicht im Index
3. Die wenigen indexierten Seiten konkurrieren mit URL-Duplikaten

---

## 🟡 Problem #5: Duplicate Sitemap in GSC

### Fakten
Zwei Sitemaps in GSC eingereicht:
1. `https://copilotenschule.de/sitemap.xml` – eingereicht 11.02.2026
2. `http://copilotenschule.de/sitemap.xml` – eingereicht 03.02.2026

Die HTTP-Version sollte entfernt werden, da sie verwirrend ist und Ressourcen verschwendet.

---

## 🟢 Problem #6: Kleinere Probleme

### `/kontakt` in react-snap aber 404
Die URL `/kontakt` ist in der react-snap include-Liste in `package.json`, aber die Route existiert nicht. Das erzeugt eine pre-gerenderte 404-Seite.

**→ `/kontakt` aus der react-snap include-Liste entfernen.**

### Fehlende neuere Wissensartikel in Redirect-Regeln
Die .htaccess hat nur Redirects für die 6 ältesten Wissensartikel. Neuere Artikel wie `copilot-roi-berechnen`, `copilot-fuer-word` etc. haben keine Alt-URL-Redirects. Das ist ok, solange sie nie unter Root-URLs existiert haben.

---

## Prioritäten-Maßnahmenliste

### Sofort (heute)
1. **`DirectorySlash Off`** in .htaccess einfügen + Directory-Index-Regel hinzufügen
2. **`/kontakt`** aus react-snap include-Liste entfernen
3. **IndexNow-Key** in robots.txt und deploy.yml vereinheitlichen
4. **HTTP-Sitemap** in GSC löschen (nur HTTPS behalten)

### Diese Woche
5. Nach Deploy: In GSC "Fehlerbehebung überprüfen" für die 38 nicht-indexierten Seiten klicken
6. Manuell 5–10 wichtigste URLs in GSC "URL-Prüfung" → "Indexierung beantragen"
7. In Bing Webmaster Tools die wichtigsten URLs via "URL-Übermittlung" einreichen

### Mittelfristig
8. **Backlink-Aufbau**: Aktuell nur 1 Backlink – das ist der größte Hebel für bessere Rankings
9. Google Unternehmensprofil einrichten (falls nicht vorhanden)
10. Strukturierte FAQ-Snippets in den Suchergebnissen verifizieren
11. Core Web Vitals prüfen und optimieren

---

## Technischer Fix: .htaccess Änderung

Die wichtigste Änderung, die sofort gemacht werden muss:

```apache
# NACH den 301-Redirects, VOR dem SPA-Fallback:

# ============================================
# TRAILING SLASH FIX
# Verhindert automatischen Directory-Redirect
# ============================================
DirectorySlash Off

# Wenn Anfrage ein Verzeichnis ist und index.html existiert → direkt ausliefern
RewriteCond %{REQUEST_FILENAME} -d
RewriteCond %{REQUEST_FILENAME}/index.html -f
RewriteRule ^(.+?)/?$ $1/index.html [L]
```

Dies bewirkt, dass `/wissen/copilot-fehler-vermeiden` direkt `200 OK` liefert statt `301 → /wissen/copilot-fehler-vermeiden/`.

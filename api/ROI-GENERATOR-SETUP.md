# ROI-Business-Case-Generator — einmalige Server-Einrichtung (AlwaysData)

**Status:** Schritte 1 und 3 sind bereits erledigt (direkt gegen die Live-DB bzw. über den
AlwaysData-Adminbereich). Offen ist nur noch Schritt 2 (passiert automatisch beim ersten
Request) und das Deployment selbst (Schritt 5 der Haupt-Checkliste: Review in GitHub Desktop
→ Commit → Push).

## 1. Datenbank-Migration ausführen — ✅ erledigt

`api/database-migration-roi-deliveries.sql` wurde bereits gegen die Live-Datenbank
ausgeführt. Tabelle `roi_deliveries` existiert mit allen erwarteten Spalten.

## 2. Privaten Speicherordner anlegen (AUSSERHALB des Web-Docroots!)

Das Deployment führt `lftp mirror -R --delete dist/ /www/<domain>/` aus — alles
außerhalb von `dist/` wird dabei aus `/www/<domain>/` gelöscht. Die generierten
PowerPoint-Dateien dürfen deshalb **nicht** unter `/www/copilotenschule.de/` liegen.

Per SSH auf AlwaysData:

```bash
mkdir -p ~/private/roi-files
chmod 700 ~/private/roi-files
```

Falls der Pfad von `/home/y-b/private/roi-files` abweicht: als Server-Umgebungsvariable
`ROI_STORAGE_DIR` setzen (AlwaysData-Adminbereich → Environment) oder direkt in
`api/roi-config.php` anpassen.

## 3. Geplante Aufgabe (Cron) für Erinnerungen einrichten — ✅ erledigt (aktuell pausiert)

Bereits angelegt unter AlwaysData → "Scheduled Tasks":

```
Command: php /home/y-b/www/copilotenschule.de/api/roi-reminder-cron.php
Schedule: alle 1 Stunde
Fehler-Mail: martin@yellow-boat.com
```

**Bewusst pausiert**, weil die neuen PHP-Dateien noch nicht live auf dem Server liegen
(erst nach Review + Push über GitHub Desktop + automatisches Deployment). Ein aktiver
stündlicher Aufruf einer noch nicht existierenden Datei hätte sonst jede Stunde eine
Fehler-Mail an martin@yellow-boat.com verschickt.

**Nach dem Deployment:** AlwaysData → Scheduled Tasks → Häkchen bei "Paused" bei der
Aufgabe "ROI-Business-Case-Generator: Erinnerungen …" entfernen. Sag Bescheid, dann mache
ich das nach dem Push auch selbst.

Der Cron sendet Erinnerung 1 nach 24h und Erinnerung 2 (letzte) nach 48h — nur
falls die Datei noch nicht abgeholt wurde — und löscht abgelaufene Dateien
(> 7 Tage) automatisch von der Platte.

## 4. PHP-Erweiterung prüfen

`ZipArchive` muss aktiv sein (Standard bei den meisten PHP-Installationen,
kurz in `phpinfo()` prüfen).

## 5. Buchungslink

Es wird der bereits überall auf der Seite verwendete Microsoft-Bookings-Link
wiederverwendet (`ROI_BOOKING_URL` in `api/roi-config.php`):
`https://outlook.office.com/book/CopilotErstgesprch@yellow-boat.com/`

Kein neuer Link nötig — falls sich der Bookings-Link künftig ändert, hier UND in
allen anderen Vorkommen (`src/lib/booking.ts`-Verwendungsstellen) aktualisieren.

## E-Mail-Ablauf im Überblick

```
T0        → "Ihre PowerPoint ist fertig" (Download-Link + Opt-in-Bestätigung)
T0 + 24h  → Erinnerung 1 (nur wenn noch nicht abgeholt)
T0 + 48h  → Erinnerung 2, letzte (nur wenn noch nicht abgeholt)
Download  → keine weiteren Erinnerungen; stattdessen einmalig Termin-Einladung
            ("Zahlen kurz mit Martin besprechen?", Bookings-Link)
Ablauf    → Datei wird nach 7 Tagen automatisch gelöscht
```

---

## ⚠️ Bekannte Fehlerquelle: fehlende DB-Zugangsdaten auf dem Webspace

**Symptom:** Der Generator meldet „Anfrage konnte nicht gespeichert werden“. Ebenso werden
Newsletter-/Kontakt-Leads still nicht mehr in `newsletter_subscriptions` geschrieben
(die Formulare melden trotzdem Erfolg, weil der DB-Schreibvorgang dort nicht blockiert).

**Ursache:** `api/db-config.php` holt die Zugangsdaten entweder aus `api/db-config-local.php`
(bewusst nicht im Repo) oder aus den Umgebungsvariablen `DB_HOST`, `DB_NAME`, `DB_USER`,
`DB_PASS`. Das Deployment spiegelt `dist/` mit `lftp mirror -R --delete` — dabei wurde
`api/db-config-local.php` auf dem Server bei jedem Deploy gelöscht, weil sie nicht Teil von
`dist/` ist. Ohne gesetzte `DB_*`-Umgebungsvariablen fällt `DB_PASS` auf `''` zurück und
jede Verbindung scheitert.

**Behoben:** `.github/workflows/deploy.yml` schließt `api/db-config-local.php` jetzt vom
Mirror aus, sodass die Datei auf dem Server erhalten bleibt.

**Noch einmalig nötig (nur Martin, da Passwort):** Im AlwaysData-Adminbereich unter
Web → Sites → `copilotenschule.de/api` → „Environment variables“ zusätzlich zu den bereits
vorhandenen Einträgen ergänzen:

```
DB_HOST=mysql-y-b.alwaysdata.net
DB_NAME=y-b_copilotenschule
DB_USER=y-b
DB_PASS=<das MySQL-Passwort>
```

Danach speichern — die Änderung greift sofort, kein Deploy nötig.

---

## Automatische Unternehmensrecherche (Kostenmodell)

Die Recherche läuft in Stufen, damit möglichst selten Geld ausgegeben wird:

| Stufe | Was passiert | Kosten |
|---|---|---|
| 1 | Domain aus der Geschäfts-E-Mail ableiten (Freemail wird ignoriert) | 0 |
| 2 | Startseite einmal laden, Meta-Titel/-Description und Logo auslesen | 1 HTTP-Request |
| 3 | **Nur wenn Stufe 2 zu dünn war** und aktiviert: ein OpenAI-Aufruf auf dem bereits geladenen Text | ~1.000 Token |
| 4 | Ergebnis pro Domain 90 Tage cachen, auch Misserfolge | 0 bei Wiederholung |

Wichtig: Es findet **keine Websuche und kein Crawling** statt. Das Modell sieht nur Text,
den wir ohnehin kostenlos geladen haben. Deshalb entfallen die teuren Such-Tools komplett.

Die Domain kommt aus der E-Mail-Adresse statt aus einer Suche — das spart pro Anfrage einen
kompletten Recherchevorgang und ist treffsicherer als ein Ratespiel über den Firmennamen.

**Standardmäßig ist die KI-Stufe AUS.** Ohne sie funktioniert alles weiter, nur die
Kurzbeschreibung stammt dann ausschließlich aus der Meta-Description der Website.
Aktivieren über Umgebungsvariablen der `/api`-Site:

```
ROI_RESEARCH_AI_ENABLED=true
ROI_RESEARCH_AI_MODEL=gpt-5.6-luna
OPENAI_API_KEY=...
```

Weitere Bremsen: 10 Recherchen pro IP und Stunde, global 200 pro Tag
(`ROI_RESEARCH_GLOBAL_DAILY_CAP` in `api/roi-company-profile.php`).

### Zeitbudget und Prefetch

Die Recherche darf bis zu ~150 Sekunden laufen (`set_time_limit`), der Browser wartet
maximal 120 Sekunden. Das ist unkritisch, weil die Präsentation ohnehin erst über den
E-Mail-Link abgeholt wird — die Wartezeit liegt also nicht zwischen Nutzer und Ergebnis.

Damit trotzdem niemand vor einem Spinner sitzt, startet der Browser die Recherche
**vorgezogen**, sobald das E-Mail-Feld verlassen wird. Während der Nutzer die optionalen
Angaben ausfüllt und absendet, läuft sie im Hintergrund; beim Absenden liegt das Ergebnis
meist schon vor. Mehrfachaufrufe mit denselben Werten lösen nur eine Anfrage aus.

Dank des größeren Budgets werden zusätzlich Impressum und „Über uns" ausgewertet (max. zwei
Unterseiten, einmalig geladen und für Text und Logo gemeinsam genutzt). Das verbessert vor
allem die Branchen- und Geschäftsfeld-Einschätzung — das Token-Budget bleibt trotzdem klein,
weil der Text weiterhin hart gekürzt wird.

### Logo

Nur PNG/JPEG/GIF ab 64 Pixel Kantenlänge werden akzeptiert, in dieser Reihenfolge:
schema.org-`logo` aus JSON-LD, dann `apple-touch-icon`, dann `og:image`.
Favicons werden bewusst NICHT verwendet — 16×16-Pixel-Icons sehen auf einer Titelfolie
schlecht aus. Wird nichts Sauberes gefunden, erscheint **kein Platzhalter**; die Titelfolie
wirkt dann so, als sei nie ein Logo vorgesehen gewesen.

### Migrationen

`api/database-migration-roi-context.sql` und `api/database-migration-roi-research-cache.sql`
sind auf der Live-Datenbank bereits ausgeführt.

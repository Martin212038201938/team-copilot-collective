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

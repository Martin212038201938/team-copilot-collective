# E-Mail-API für copilotenschule.de auf AlwaysData

Diese PHP-Endpoints verarbeiten die Kontaktformulare und versenden E-Mails über den AlwaysData SMTP-Server.

## Übersicht

Die Website läuft komplett auf AlwaysData. Die PHP-Scripts nutzen die native PHP `mail()` Funktion, die automatisch den AlwaysData SMTP-Server verwendet.

## Dateien

- `send-contact-email.php` - Verarbeitet das Haupt-Kontaktformular
- `send-trainer-email.php` - Verarbeitet Trainer-Bewerbungen

## Deployment auf AlwaysData

### 1. Dateien hochladen

Alle Dateien aus dem `api/` Verzeichnis müssen auf den AlwaysData-Server hochgeladen werden:

**Via SSH:**
```bash
# Mit AlwaysData verbinden
ssh y-b@ssh-y-b.alwaysdata.net

# Navigiere zum Website-Verzeichnis (normalerweise ~/www oder ~/public_html)
cd www/copilotenschule.de

# Erstelle api-Verzeichnis falls nicht vorhanden
mkdir -p api

# Dateien per SFTP/SCP hochladen oder direkt bearbeiten
```

**Via FTP/SFTP:**
- Host: `ssh-y-b.alwaysdata.net`
- Port: 22 (SFTP) oder 21 (FTP)
- Username: `y-b`
- Hochladen nach: `/www/copilotenschule.de/api/`

**Via AlwaysData File Manager:**
1. Login: https://admin.alwaysdata.com
2. Gehe zu **Sites** → **Dateien**
3. Navigiere zu deinem Website-Verzeichnis
4. Erstelle `api/` Ordner
5. Lade die beiden PHP-Dateien hoch

### 2. SMTP-Konfiguration in AlwaysData

PHP's `mail()` Funktion nutzt automatisch den AlwaysData SMTP-Server. Normalerweise ist keine zusätzliche Konfiguration nötig.

**Wichtig:** Die E-Mail-Adresse `noreply@copilotenschule.de` muss in AlwaysData als E-Mail-Konto existieren, oder du musst die Domain als autorisierte Absender-Domain konfiguriert haben.

**Setup-Schritte:**

1. Login AlwaysData: https://admin.alwaysdata.com
2. Gehe zu **E-Mails** → **Postfächer**
3. Stelle sicher, dass eine dieser Optionen existiert:
   - **Option A:** E-Mail-Konto `noreply@copilotenschule.de` existiert
   - **Option B:** Domain `copilotenschule.de` ist als Absender-Domain konfiguriert

4. Überprüfe die Weiterleitung:
   - Gehe zu **E-Mails** → **Weiterleitungen**
   - Stelle sicher, dass `info@copilotenschule.de` → `martin@yellow-boat.com` eingerichtet ist

### 3. Verzeichnisstruktur

Die finale Struktur auf AlwaysData sollte sein:
```
/home/y-b/www/copilotenschule.de/
├── index.html
├── assets/
├── api/
│   ├── send-contact-email.php
│   └── send-trainer-email.php
└── ... (andere Dateien)
```

### 4. Berechtigungen setzen

Die PHP-Dateien müssen ausführbar sein:
```bash
chmod 644 api/send-contact-email.php
chmod 644 api/send-trainer-email.php
```

## Endpunkte

### send-contact-email.php
**URL:** `https://copilotenschule.de/api/send-contact-email.php`

**Request:**
```json
POST /api/send-contact-email.php
Content-Type: application/json

{
  "name": "Max Mustermann",
  "email": "max@example.com",
  "company": "Beispiel GmbH",
  "phone": "+49 123 456789",
  "message": "Ich interessiere mich für ein Training..."
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "E-Mail erfolgreich versendet"
}
```

**Response (Error):**
```json
{
  "error": "Fehlermeldung"
}
```

### send-trainer-email.php
**URL:** `https://copilotenschule.de/api/send-trainer-email.php`

**Request:**
```json
POST /api/send-trainer-email.php
Content-Type: application/json

{
  "name": "Max Mustermann",
  "email": "max@example.com",
  "phone": "+49 123 456789",
  "path": "praktiker",
  "linkedinUrl": "https://linkedin.com/in/...",
  "websiteUrl": "https://...",
  "message": "Ich möchte gerne als Trainer..."
}
```

## Testen

### Lokal testen (mit PHP)
Falls du PHP lokal installiert hast:
```bash
cd api/
php -S localhost:8000
```

Dann teste mit curl:
```bash
curl -X POST http://localhost:8000/send-contact-email.php \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message"
  }'
```

### Auf AlwaysData testen
1. Öffne https://copilotenschule.de
2. Fülle das Kontaktformular aus
3. Klicke auf "Anfrage absenden"
4. Prüfe das Postfach `martin@yellow-boat.com`

## Troubleshooting

### E-Mails werden nicht versendet

**1. PHP mail() Logs prüfen:**
```bash
# SSH zu AlwaysData
ssh y-b@ssh-y-b.alwaysdata.net

# PHP Error Log prüfen (Pfad kann variieren)
tail -f ~/admin/logs/error.log
```

**2. AlwaysData Mail-Logs prüfen:**
- Login: https://admin.alwaysdata.com
- Gehe zu **E-Mails** → **Logs**
- Suche nach ausgehenden E-Mails

**3. Absender-Adresse prüfen:**
Falls E-Mails nicht versendet werden, ändere in beiden PHP-Dateien:
```php
// Von:
$headers[] = 'From: Copilotenschule Kontaktformular <noreply@copilotenschule.de>';

// Zu einer verifizierten Adresse, z.B.:
$headers[] = 'From: Copilotenschule Kontaktformular <martin@yellow-boat.com>';
```

**4. PHP-Version prüfen:**
```bash
php -v
```
Sollte PHP 7.4 oder höher sein.

### "Method not allowed" Fehler

Stelle sicher, dass die PHP-Dateien per POST aufgerufen werden (nicht GET).

### CORS-Fehler

Die PHP-Scripts haben bereits CORS-Header. Falls Probleme auftreten:
1. Prüfe, dass die Requests von derselben Domain kommen
2. Überprüfe die Browser-Konsole auf spezifische CORS-Fehler

### E-Mails landen im Spam

**SPF-Record konfigurieren:**
1. Login AlwaysData: https://admin.alwaysdata.com
2. Gehe zu **Domains** → **copilotenschule.de** → **DNS**
3. Füge SPF-Record hinzu (falls nicht vorhanden):
   ```
   Type: TXT
   Name: @
   Value: v=spf1 include:_spf.alwaysdata.com ~all
   ```

**DKIM aktivieren:**
1. Gehe zu **E-Mails** → **DKIM**
2. Aktiviere DKIM für `copilotenschule.de`
3. Kopiere die DNS-Einträge und füge sie in den DNS-Settings hinzu

## Sicherheit

**Wichtige Punkte:**
- ✅ Alle User-Inputs werden mit `htmlspecialchars()` sanitized
- ✅ E-Mail-Adressen werden mit `filter_var()` validiert
- ✅ CORS ist auf `*` gesetzt (nur für Kontaktformulare ok)
- ✅ Keine Datenbankverbindungen = kein SQL Injection Risiko
- ✅ Keine File-Uploads in der aktuellen Version

**Optional - Rate Limiting:**
Falls Spam-Anfragen zunehmen, kannst du Rate Limiting hinzufügen:
```php
// Am Anfang der PHP-Datei
session_start();
if (isset($_SESSION['last_submit']) && time() - $_SESSION['last_submit'] < 60) {
    http_response_code(429);
    echo json_encode(['error' => 'Bitte warten Sie 60 Sekunden zwischen Anfragen']);
    exit;
}
$_SESSION['last_submit'] = time();
```

## E-Mail-Fluss

```
User füllt Formular aus
       ↓
Frontend sendet POST zu /api/send-contact-email.php
       ↓
PHP validiert Daten
       ↓
PHP nutzt mail() Funktion
       ↓
AlwaysData SMTP-Server versendet E-Mail
       ↓
E-Mail geht an info@copilotenschule.de
       ↓
AlwaysData leitet weiter an martin@yellow-boat.com
       ↓
E-Mail landet im Postfach
```

## Support

Bei Problemen mit dem AlwaysData SMTP-Server:
- AlwaysData Support: https://admin.alwaysdata.com/support/
- Dokumentation: https://help.alwaysdata.com/en/e-mails/

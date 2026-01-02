# Newsletter Double-Opt-In Setup - AlwaysData

## Übersicht

Dieses System implementiert Double-Opt-In für Newsletter-Abonnements über die Kontaktformulare.

**Features:**
- ✅ Automatische Speicherung in MySQL-Datenbank
- ✅ Double-Opt-In Bestätigung (DSGVO-konform)
- ✅ Benachrichtigung an martin@yellow-boat.com
- ✅ Bestätigungsmail an Kunden von info@copilotenschule.de
- ✅ Schöne Bestätigungsseite
- ✅ Tracking von IP und User-Agent

---

## Setup-Schritte

### 1. Datenbank erstellen/konfigurieren in AlwaysData

**a) Login AlwaysData:**
- Gehe zu: https://admin.alwaysdata.com
- Login mit deinen Credentials

**b) Datenbank erstellen (falls noch keine existiert):**
1. Gehe zu **"Databases"** → **"MySQL"**
2. Klicke auf **"Add a database"**
3. Name: `y-b_copilotenschule` (oder einen anderen Namen)
4. User: `y-b` (dein Standard-User)
5. Password: Setze ein sicheres Passwort
6. **Speichere diese Zugangsdaten!**

**c) Tabellen erstellen:**
1. Öffne **"Databases"** → **"MySQL"** → deine Datenbank
2. Klicke auf **"phpMyAdmin"**
3. Wähle deine Datenbank aus
4. Klicke auf **"SQL"** Tab
5. Kopiere den Inhalt von `database-setup.sql` und führe ihn aus

**Oder via SSH:**
```bash
ssh y-b@ssh-y-b.alwaysdata.net
mysql -u y-b -p y-b_copilotenschule < /path/to/database-setup.sql
```

### 2. Datenbank-Credentials konfigurieren

**Option A: Environment Variables (empfohlen):**
In AlwaysData kannst du Environment Variables setzen:
1. Gehe zu **"Sites"** → deine Site
2. **"Environment"** Tab
3. Füge hinzu:
   ```
   DB_HOST=mysql-y-b.alwaysdata.net
   DB_NAME=y-b_copilotenschule
   DB_USER=y-b
   DB_PASS=dein-passwort
   ```

**Option B: Direkt in db-config.php:**
Bearbeite `api/db-config.php` und setze die Werte:
```php
define('DB_HOST', 'mysql-y-b.alwaysdata.net');
define('DB_NAME', 'y-b_copilotenschule');
define('DB_USER', 'y-b');
define('DB_PASS', 'dein-passwort-hier');
```

**⚠️ WICHTIG:** Falls du Option B wählst, committe die Datei NICHT ins Git-Repository!

### 3. E-Mail-Absender konfigurieren

Stelle sicher, dass `info@copilotenschule.de` als Absender-Adresse existiert:

1. Gehe zu **"E-Mails"** → **"Postfächer"**
2. Erstelle `info@copilotenschule.de` (falls nicht vorhanden)
3. Oder: Konfiguriere die Domain `copilotenschule.de` als autorisierte Absender-Domain

### 4. Dateien hochladen

Lade alle Dateien aus dem `api/` Ordner auf AlwaysData hoch:
```
api/
├── db-config.php
├── database-setup.sql
├── send-contact-email.php
├── send-trainer-email.php
├── confirm-subscription.php
└── README.md
```

**Ziel auf AlwaysData:**
```
/www/copilotenschule.de/api/
```

### 5. Testen

**a) Teste Kontaktformular:**
1. Gehe zu https://copilotenschule.de
2. Fülle das Kontaktformular aus
3. Du solltest 2 E-Mails erhalten:
   - martin@yellow-boat.com: Benachrichtigung
   - Deine Test-E-Mail: Bestätigungsmail von info@copilotenschule.de
4. Klicke auf den Bestätigungslink
5. Du solltest die Erfolgsseite sehen

**b) Prüfe Datenbank:**
```sql
SELECT * FROM newsletter_subscriptions ORDER BY created_at DESC LIMIT 10;
```

Sollte zeigen:
- E-Mail-Adresse
- Name
- Status: 'confirmed' (nach Bestätigung)
- Timestamp

---

## Datenbank-Schema

### Tabelle: `newsletter_subscriptions`

| Spalte | Typ | Beschreibung |
|--------|-----|--------------|
| id | INT | Auto-increment Primary Key |
| email | VARCHAR(255) | E-Mail-Adresse (unique) |
| name | VARCHAR(255) | Name des Abonnenten |
| source | VARCHAR(50) | 'contact' oder 'trainer' |
| opt_in_status | ENUM | 'pending', 'confirmed', 'unsubscribed' |
| confirmation_token | VARCHAR(64) | Eindeutiger Token (unique) |
| ip_address | VARCHAR(45) | IP-Adresse bei Anmeldung |
| user_agent | TEXT | Browser User-Agent |
| created_at | TIMESTAMP | Erstellungsdatum |
| confirmed_at | TIMESTAMP | Bestätigungsdatum |
| unsubscribed_at | TIMESTAMP | Abmeldedatum |

---

## Funktionsweise

```
1. User füllt Kontaktformular aus
       ↓
2. PHP speichert in Datenbank (status: pending)
       ↓
3. Sendet 2 E-Mails:
   - An martin@yellow-boat.com (Benachrichtigung)
   - An User (Bestätigungsmail von info@copilotenschule.de)
       ↓
4. User klickt auf Bestätigungslink
       ↓
5. confirm-subscription.php:
   - Validiert Token
   - Setzt status = 'confirmed'
   - Zeigt Erfolgsseite
       ↓
6. User ist jetzt confirmed und kann Newsletter erhalten
```

---

## Newsletter versenden (Zukunft)

Um später Newsletter zu versenden:

```sql
-- Alle bestätigten Abonnenten abrufen
SELECT email, name FROM newsletter_subscriptions
WHERE opt_in_status = 'confirmed'
ORDER BY confirmed_at DESC;
```

---

## Abmelden (optional, für Zukunft)

Erstelle eine Abmeldeseite ähnlich wie `confirm-subscription.php`:

```php
// api/unsubscribe.php
function unsubscribe($token) {
    $db = getDbConnection();
    $stmt = $db->prepare("
        UPDATE newsletter_subscriptions
        SET opt_in_status = 'unsubscribed', unsubscribed_at = CURRENT_TIMESTAMP
        WHERE confirmation_token = ? AND opt_in_status = 'confirmed'
    ");
    return $stmt->execute([$token]);
}
```

---

## DSGVO-Konformität

✅ **Erfüllt:**
- Double-Opt-In (Bestätigung erforderlich)
- Transparenz (Datenschutzhinweis in E-Mail)
- Logging (IP, User-Agent, Timestamps)
- Abmeldemöglichkeit (vorbereitet)

---

## Troubleshooting

### E-Mails kommen nicht an

1. **Prüfe AlwaysData Mail-Logs:**
   - Dashboard → E-Mails → Logs

2. **Prüfe SPAM-Ordner**

3. **Prüfe PHP Error Log:**
   ```bash
   ssh y-b@ssh-y-b.alwaysdata.net
   tail -f ~/admin/logs/error.log
   ```

### Datenbank-Verbindung fehlt

1. **Teste Verbindung:**
   ```php
   <?php
   require_once 'db-config.php';
   $db = getDbConnection();
   if ($db) {
       echo "✅ Verbindung erfolgreich!";
   } else {
       echo "❌ Verbindung fehlgeschlagen!";
   }
   ```

2. **Prüfe Credentials in db-config.php**

### Bestätigungslink funktioniert nicht

1. **Prüfe SITE_URL in db-config.php:**
   ```php
   define('SITE_URL', 'https://copilotenschule.de');
   ```

2. **Prüfe, ob confirm-subscription.php erreichbar ist:**
   ```
   https://copilotenschule.de/api/confirm-subscription.php
   ```

---

## Support

Bei Problemen:
1. Prüfe AlwaysData Logs
2. Prüfe PHP Error Log
3. Prüfe Datenbank-Verbindung
4. Teste E-Mail-Versand manuell

---

## Changelog

- **2026-01-02:** Initial setup mit Double-Opt-In

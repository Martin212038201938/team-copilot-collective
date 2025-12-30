# Netlify Functions für E-Mail-Versand

Diese Netlify Functions verarbeiten die Kontaktformulare und versenden E-Mails über den AlwaysData SMTP-Server.

## Setup-Anleitung

### 1. AlwaysData SMTP-Zugangsdaten ermitteln

Die SMTP-Konfiguration für AlwaysData ist normalerweise:

- **SMTP Host:** `smtp-[ihr-username].alwaysdata.net`
- **SMTP Port:** `587` (TLS, empfohlen) oder `465` (SSL)
- **SMTP User:** Ihr AlwaysData-Account (E-Mail oder Username)
- **SMTP Password:** Ihr AlwaysData-Passwort

**So finden Sie Ihre Daten:**

1. Loggen Sie sich in Ihr [AlwaysData-Dashboard](https://admin.alwaysdata.com) ein
2. Gehen Sie zu **"E-Mails"** → **"Einstellungen"** oder **"Konfiguration"**
3. Dort finden Sie die SMTP-Server-Details und Zugangsdaten

**Tipp:** AlwaysData erlaubt es oft, E-Mails direkt über Ihren Haupt-Account zu versenden. Alternativ können Sie auch ein spezifisches E-Mail-Konto (z.B. `noreply@copilotenschule.de`) erstellen und dessen Zugangsdaten verwenden.

### 2. Environment Variables in Netlify setzen

1. Gehen Sie zu Ihrem [Netlify Dashboard](https://app.netlify.com)
2. Wählen Sie Ihr Projekt aus
3. Gehen Sie zu **"Site configuration"** → **"Environment variables"**
4. Fügen Sie folgende Variablen hinzu:

   | Key | Value | Beispiel |
   |-----|-------|----------|
   | `SMTP_HOST` | Ihr AlwaysData SMTP-Server | `smtp-username.alwaysdata.net` |
   | `SMTP_PORT` | SMTP Port | `587` |
   | `SMTP_USER` | Ihr AlwaysData-Username | `username@alwaysdata.net` |
   | `SMTP_PASS` | Ihr AlwaysData-Passwort | `IhrPasswort123!` |
   | `SMTP_FROM` | Absender-Adresse (optional) | `noreply@copilotenschule.de` |

   **Wichtig:** Setzen Sie die **Scopes** auf: Production, Deploy Previews, Branch deploys

### 3. Deploy

Nachdem die Environment Variables gesetzt wurden, deployen Sie Ihre Seite neu:
```bash
git push origin main
```

Oder triggern Sie ein Re-Deploy im Netlify Dashboard unter **"Deploys"** → **"Trigger deploy"** → **"Deploy site"**.

## Verfügbare Functions

### `send-contact-email`
Verarbeitet das Haupt-Kontaktformular und sendet E-Mails an `info@copilotenschule.de`.

**Endpoint:** `/.netlify/functions/send-contact-email`

**Request Body:**
```json
{
  "name": "Max Mustermann",
  "email": "max@example.com",
  "company": "Beispiel GmbH",
  "phone": "+49 123 456789",
  "message": "Ich interessiere mich für ein Training..."
}
```

### `send-trainer-email`
Verarbeitet Bewerbungen von Trainern.

**Endpoint:** `/.netlify/functions/send-trainer-email`

**Request Body:**
```json
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

## Lokales Testen

Sie können die Functions lokal testen mit:
```bash
npm install -g netlify-cli
netlify dev
```

Erstellen Sie eine `.env` Datei im Projekt-Root mit Ihren SMTP-Zugangsdaten:
```bash
SMTP_HOST=smtp-username.alwaysdata.net
SMTP_PORT=587
SMTP_USER=username@alwaysdata.net
SMTP_PASS=IhrPasswort
SMTP_FROM=noreply@copilotenschule.de
```

## E-Mail-Weiterleitung

Da Sie bereits eine Weiterleitung von `info@copilotenschule.de` zu `martin@yellow-boat.com` in AlwaysData eingerichtet haben, werden alle E-Mails, die an `info@copilotenschule.de` gesendet werden, automatisch an Ihre Hauptadresse weitergeleitet.

**Vorteile:**
- Keine externe Abhängigkeit von Drittanbieter-Services
- Nutzt Ihre bereits vorhandene E-Mail-Infrastruktur
- Kostenlos (im AlwaysData-Paket enthalten)
- Bewährte SMTP-Technologie

## Troubleshooting

### E-Mails werden nicht versendet

1. **Environment Variables überprüfen:**
   - Gehen Sie zu Netlify → Site configuration → Environment variables
   - Stellen Sie sicher, dass alle SMTP-Variablen gesetzt sind
   - Überprüfen Sie die Scopes (Production, Deploy Previews, Branch deploys)

2. **SMTP-Zugangsdaten testen:**
   - Loggen Sie sich in AlwaysData ein
   - Testen Sie die Zugangsdaten mit einem E-Mail-Client (z.B. Thunderbird)
   - Überprüfen Sie, ob SMTP aktiviert ist

3. **Function Logs prüfen:**
   - Gehen Sie zu Netlify → Functions → Function Name → Logs
   - Suchen Sie nach Fehlermeldungen (z.B. Authentication failed, Connection timeout)

### SMTP Authentication Fehler

- Überprüfen Sie Username und Passwort
- AlwaysData erlaubt manchmal nur bestimmte Authentifizierungsmethoden
- Versuchen Sie, ein app-spezifisches Passwort zu erstellen (falls unterstützt)

### Connection Timeout

- Überprüfen Sie den SMTP Port (587 oder 465)
- Stellen Sie sicher, dass AlwaysData SMTP-Verbindungen von externen IPs erlaubt
- Netlify Functions laufen auf AWS Lambda - manche Provider blockieren diese IPs

### E-Mails landen im Spam

Um zu verhindern, dass E-Mails im Spam landen:
1. Konfigurieren Sie SPF-Records für Ihre Domain
2. Aktivieren Sie DKIM in AlwaysData (falls verfügbar)
3. Verwenden Sie eine verifizierte Absender-Adresse
4. AlwaysData sollte bereits gute Reputation haben

### CORS Fehler

Die Functions sind bereits mit CORS-Headern konfiguriert. Falls Sie dennoch CORS-Fehler sehen:
1. Überprüfen Sie, ob die Request-Header korrekt sind (`Content-Type: application/json`)
2. Stellen Sie sicher, dass die Function deployed wurde
3. Überprüfen Sie im Browser DevTools → Network die Response Headers

## Sicherheit

**Wichtig:**
- Committen Sie **NIEMALS** Ihre `.env` Datei mit echten Zugangsdaten!
- Die `.env.example` Datei enthält nur Platzhalter
- Environment Variables werden nur in Netlify gespeichert, nicht im Code
- SMTP-Passwörter sollten stark und einzigartig sein

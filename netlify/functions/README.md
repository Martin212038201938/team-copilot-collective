# Netlify Functions für E-Mail-Versand

Diese Netlify Functions verarbeiten die Kontaktformulare und versenden E-Mails über Resend.

## Setup-Anleitung

### 1. Resend Account einrichten

1. Gehen Sie zu [resend.com](https://resend.com) und erstellen Sie einen Account
2. Verifizieren Sie Ihre Domain `copilotenschule.de` in Resend:
   - Gehen Sie zu "Domains" im Resend Dashboard
   - Fügen Sie `copilotenschule.de` hinzu
   - Folgen Sie den Anweisungen zum Hinzufügen der DNS-Records (SPF, DKIM, etc.)
   - Warten Sie auf die Verifizierung (kann einige Minuten dauern)

### 2. API Key erstellen

1. Gehen Sie zu [resend.com/api-keys](https://resend.com/api-keys)
2. Erstellen Sie einen neuen API Key
3. Kopieren Sie den API Key (er wird nur einmal angezeigt!)

### 3. Environment Variable in Netlify setzen

1. Gehen Sie zu Ihrem Netlify Dashboard
2. Wählen Sie Ihr Projekt aus
3. Gehen Sie zu "Site configuration" → "Environment variables"
4. Fügen Sie eine neue Variable hinzu:
   - **Key:** `RESEND_API_KEY`
   - **Value:** Ihr Resend API Key (beginnt mit `re_`)
   - **Scopes:** Production, Deploy Previews, Branch deploys

### 4. Deploy

Nachdem die Environment Variable gesetzt wurde, deployen Sie Ihre Seite neu:
```bash
git push origin main
```

Oder triggern Sie ein Re-Deploy im Netlify Dashboard.

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

## Testen

Sie können die Functions lokal testen mit:
```bash
npm install -g netlify-cli
netlify dev
```

Stellen Sie sicher, dass Sie eine `.env` Datei mit Ihrem `RESEND_API_KEY` haben.

## Troubleshooting

### E-Mails werden nicht versendet
1. Überprüfen Sie, ob die `RESEND_API_KEY` Environment Variable in Netlify gesetzt ist
2. Überprüfen Sie, ob Ihre Domain in Resend verifiziert ist
3. Prüfen Sie die Function Logs in Netlify (Site → Functions → Function Name → Logs)

### Domain nicht verifiziert
Wenn Ihre Domain noch nicht verifiziert ist, können Sie temporär von einer Resend Test-Domain senden:
- Ändern Sie in den Functions `from: 'Copilotenschule Kontaktformular <noreply@copilotenschule.de>'` zu `from: 'onboarding@resend.dev'`
- **WICHTIG:** Dies ist nur für Tests! In Production muss die echte Domain verwendet werden.

### CORS Fehler
Die Functions sind bereits mit CORS-Headern konfiguriert. Falls Sie dennoch CORS-Fehler sehen:
1. Überprüfen Sie, ob die Request-Header korrekt sind
2. Stellen Sie sicher, dass die Function deployed wurde

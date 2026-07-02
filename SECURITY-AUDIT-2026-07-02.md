# Security-Audit copilotenschule.de – 2026-07-02

Vollständige Überprüfung von Repo, Dependencies, PHP-Backend, CI/CD und Live-Site.
Diese Liste wird Punkt für Punkt abgearbeitet. Jeder Punkt: Beschreibung → betroffene Dateien → Impact → Lösungsvorschlag.

**Legende Status:** `[ ]` offen · `[~]` in Arbeit · `[x]` erledigt

---

## 🔴 KRITISCH

### [~] SEC-01 – Admin-Login wirkungslos, Zugangsdaten im öffentlichen JS-Bundle

> **Umsetzung 2026-07-02 (Code erledigt, 1 manueller Serverschritt offen):**
> - `src/components/AdminAuth.tsx`: clientseitige Credentials & Username-Feld entfernt; Login geht jetzt gegen `api/admin-login.php`, Login-Status hängt an einem signierten, ablaufenden Server-Token (verifiziert via `api/admin-verify.php`). Ein manuell gesetztes `localStorage`-Flag genügt nicht mehr.
> - Neu: `api/admin-login.php` (bcrypt-Prüfung + IP-Rate-Limit 10/15min + HMAC-Token 12h), `api/admin-verify.php`.
> - Passwort-Hash liegt **nur** als Server-ENV `ADMIN_PASSWORD_HASH` vor – nicht in Git, nicht im Bundle.
> - **NOCH ZU TUN (Martin, auf AlwaysData):** Umgebungsvariable setzen, dann deployen. Ohne die ENV-Variable ist der Login serverseitig gesperrt (fail-safe). Anleitung siehe Chat / unten.


**Beschreibung**
Die Admin-Authentifizierung läuft rein clientseitig. Benutzername und Passwort stehen im Klartext im Quellcode und landen damit nach dem Build in der minifizierten JS-Datei, die jeder Besucher herunterladen und lesen kann. Der eingeloggte Zustand ist nur ein `localStorage`-Flag.

**Betroffene Dateien**
- `src/components/AdminAuth.tsx` (Zeile ~13–16: `ADMIN_CREDENTIALS` mit Klartext-Passwort; Zeile ~26/37: `localStorage`-Flag `admin_auth`)
- `src/pages/Admin.tsx` (nutzt `AdminAuth`)
- `src/App.tsx` (Zeile ~168: `<Route path="/admin" …>`)
- Footer verlinkt „Admin Login" öffentlich → `/admin` leicht auffindbar

**Impact**
- Passwort ist im ausgelieferten Bundle für jeden lesbar → öffentlich verbrannt, darf nirgendwo sonst genutzt werden.
- Prüfung umgehbar per `localStorage.setItem('admin_auth','authenticated')` in der Browser-Konsole.
- Direkter Schaden aktuell begrenzt (Admin verwaltet nur Draft/Editorial im localStorage), aber grundsätzlich falsches Sicherheitsmodell.

**Lösungsvorschlag**
1. Passwort sofort rotieren und, falls es an anderer Stelle (FTP, Mail, DB) genutzt wurde, dort ebenfalls ändern.
2. Clientseitige Credentials entfernen. Optionen:
   - **Empfohlen:** `/admin` und alle `api/`-Endpunkte serverseitig per HTTP-Basic-Auth in `.htaccess` (AlwaysData) schützen.
   - Alternativ: Admin-Seite gar nicht deployen (aus `reactSnap.include` und Route nehmen, nur lokal nutzen).
3. `localStorage`-Flag durch echtes serverseitiges Session-/Token-Verfahren ersetzen, falls Admin online bleiben soll.

---

## 🟠 HOCH

### [ ] SEC-02 – `api/openai-proxy.php` ist offenes Relay ohne Auth & Rate-Limit

**Beschreibung**
Der Proxy hängt den serverseitigen OpenAI-Key an jeden eingehenden POST-Request und leitet ihn an die OpenAI-API weiter. Einziger „Schutz" ist eine CORS-Origin-Prüfung – CORS wirkt aber ausschließlich im Browser und verhindert keine direkten Requests (curl, Skripte). Anders als `generate-content-api.php` (10 Requests/h pro IP) hat der Proxy **kein** Rate-Limit und **keine** Authentifizierung.

**Betroffene Dateien**
- `api/openai-proxy.php`
- Vergleich/Positivbeispiel: `api/generate-content-api.php` (hat einfaches Rate-Limit)

**Impact**
- Aktuell **nicht ausnutzbar**, da auf der Live-Site kein Key konfiguriert ist (`/api/config.php` → `openai_configured: false`).
- Sobald ein Key gesetzt wird: jeder kann per direktem POST unbegrenzt die OpenAI-API auf eure Kosten nutzen (Kostenmissbrauch, potenzieller DoS des Budgets).

**Lösungsvorschlag**
1. Auth voraussetzen (z. B. serverseitiges Session-Token oder Shared Secret Header), nicht auf CORS verlassen.
2. Rate-Limit analog zu `generate-content-api.php` ergänzen.
3. Modell, `max_tokens` und erlaubte Endpunkte serverseitig erzwingen statt beliebigen Request-Body durchzureichen.

### [ ] SEC-03 – npm-Dependencies: 35 Schwachstellen (3 kritisch, 20 hoch, 9 moderat, 3 low)

**Beschreibung**
`npm audit` meldet zahlreiche verwundbare Pakete. Die meisten sind Build-Time-Devabhängigkeiten, einige aber clientrelevant.

**Details (Auswahl)**
- **Kritisch:** `minimist` – Prototype Pollution
- **Hoch:** `ws` – Uninitialized Memory Disclosure + DoS; `qs` – DoS via arrayLimit-Bypass; `picomatch` – ReDoS
- **Moderat, clientrelevant:** `react-router` 6.7.0–6.30.3 – Open Redirect via `//`-Pfad (protocol-relative URL); `postcss` – XSS via CSS-Stringify; `yaml` – Stack Overflow

**Betroffene Dateien**
- `package.json` / `package-lock.json`

**Impact**
- Client: Open-Redirect über `react-router` (moderat) ist die einzige direkt im ausgelieferten Bundle relevante Lücke.
- Rest überwiegend Build-Umgebung.

**Lösungsvorschlag**
1. `npm audit fix` ausführen (löst den Großteil ohne Breaking Changes).
2. Danach lokal `npm run build:prerender` testen (Build muss fehlerfrei durchlaufen).
3. Für verbleibende Lücken einzeln prüfen, ob Major-Update nötig ist; nicht blind `--force`.

---

## 🟡 MITTEL

### [ ] SEC-04 – E-Mail-Header-Injection in Kontakt- und Trainer-Formular

**Beschreibung**
Das Feld `$name` fließt in den `Reply-To`-Mailheader. `htmlspecialchars()` entfernt **keine** Zeilenumbrüche (`\r`, `\n`), daher kann ein Name mit eingebetteten Umbrüchen zusätzliche Header (z. B. `Bcc:`) einschleusen und das Formular zum Spam-Versand missbrauchen. Auch der Dateiname des CV-Uploads geht ungefiltert in den `Content-Disposition`-Header.

**Betroffene Dateien**
- `api/send-contact-email.php` (Header `Reply-To: ' . $name . ' <' . $email . '>'`)
- `api/send-trainer-email.php` (Zeile ~217 `Reply-To`; Zeile ~242–244 `Content-Type`/`filename` aus `$cvFile`)

**Impact**
- Missbrauch des Mailversands (Spam/Phishing über eure Domain), Reputationsschaden der Sender-Domain.

**Lösungsvorschlag**
1. Aus allen in Header verwendeten Feldern `\r` und `\n` entfernen, z. B. `str_replace(["\r","\n"], '', $name)`.
2. Upload-Dateinamen bereinigen (`basename()` + Whitelist erlaubter Zeichen, Länge begrenzen).
3. Optional: `mail()` durch eine Bibliothek (PHPMailer) mit sauberer Header-Behandlung ersetzen.

### [ ] SEC-05 – `api/config.php` öffentlich erreichbar (Information Disclosure)

**Beschreibung**
Der Endpunkt ist ungeschützt aufrufbar und gibt Konfigurationsstatus, Modellnamen und Token-Limits als JSON aus. Kein Key-Leak, aber unnötige Preisgabe interner Konfiguration.

**Betroffene Dateien**
- `api/config.php` (gibt am Ende `json_encode([...])` öffentlich aus)

**Impact**
- Gering. Zeigt Angreifern interne Setup-Details (Modell, Limits, ob Key gesetzt ist).

**Lösungsvorschlag**
1. Endpunkt hinter Auth legen oder nur intern aufrufbar machen.
2. Ausgabe auf das nötige Minimum reduzieren (idealerweise gar kein öffentlicher Status-Endpunkt).

### [ ] SEC-06 – CI: Auto-Merge für `claude-*`-Branches ohne menschliche Freigabe

**Beschreibung**
Der Workflow genehmigt und merged automatisch jeden PR, dessen Branchname mit `claude-`/`claude/` beginnt oder auf `-claude` endet, sobald die Checks grün sind – ohne menschliches Review.

**Betroffene Dateien**
- `.github/workflows/auto-approve-merge.yml`

**Impact**
- Wer einen entsprechend benannten Branch pushen kann, deployt direkt nach `main` → live.

**Lösungsvorschlag**
1. Prüfen, ob dieses Verhalten gewünscht ist.
2. Falls ja: auf vertrauenswürdige Autoren einschränken (`github.actor`-Whitelist) und/oder Branch-Protection-Rules mit Pflicht-Review ergänzen.
3. Falls nein: Workflow deaktivieren.

---

## 🟢 Geprüft & unkritisch (kein Handlungsbedarf)

- `.env` mit echten Secrets (FTP-Pass, AlwaysData-Token) ist korrekt in `.gitignore`, **nicht** committet. `/.env` liefert live nur die SPA-Fallback-Seite → wird nicht ausgeliefert.
- Keine echten API-Keys/Passwörter (außer Admin-PW, siehe SEC-01) in getrackten Dateien oder Git-Historie.
- Deploy-Workflow nutzt GitHub Secrets sauber; korrekter Hinweis, den OpenAI-Key nie als `VITE_`-Variable zu setzen.
- DB-Zugriff via PDO Prepared Statements → keine SQL-Injection. Newsletter-Confirm gegen GET-Prefetch (Safe-Links-Scanner) abgesichert.
- Nur eine `dangerouslySetInnerHTML`-Stelle (`src/components/ui/chart.tsx`), Werte aus Entwickler-Config, kein User-Input. Kein `eval`/`new Function`.
- `.htaccess`: erzwingt HTTPS, setzt `X-Frame-Options: SAMEORIGIN` und `X-Content-Type-Options: nosniff`.

### Optional / Nice-to-have
- Zusätzliche Security-Header in `.htaccess` erwägen: `Referrer-Policy`, `Strict-Transport-Security` (HSTS), `Content-Security-Policy`, `Permissions-Policy`.

---

## Empfohlene Reihenfolge
1. **SEC-01** (Passwort rotieren + Admin absichern) – höchste Priorität
2. **SEC-04** + **SEC-03** (schnell erledigt: Mail-Fix + `npm audit fix`)
3. **SEC-02** (vor dem Setzen eines prod OpenAI-Keys)
4. **SEC-05**, **SEC-06** (Konfig-/CI-Härtung)

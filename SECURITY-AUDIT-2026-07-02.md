# Security-Audit copilotenschule.de – 2026-07-02

Vollständige Überprüfung von Repo, Dependencies, PHP-Backend, CI/CD und Live-Site.
Diese Liste wird Punkt für Punkt abgearbeitet. Jeder Punkt: Beschreibung → betroffene Dateien → Impact → Lösungsvorschlag.

**Legende Status:** `[ ]` offen · `[~]` in Arbeit · `[x]` erledigt

---

## 🔴 KRITISCH

### [x] SEC-01 – Admin-Login wirkungslos, Zugangsdaten im öffentlichen JS-Bundle  ✅ ERLEDIGT & LIVE-GETESTET (2026-07-02)

> **Umsetzung & Verifikation 2026-07-02:**
> - `src/components/AdminAuth.tsx`: clientseitige Credentials & Username-Feld entfernt; Login geht jetzt gegen `api/admin-login.php`, Login-Status hängt an einem signierten, ablaufenden Server-Token (verifiziert via `api/admin-verify.php`). Ein manuell gesetztes `localStorage`-Flag genügt nicht mehr.
> - Neu: `api/admin-login.php` (bcrypt-Prüfung + IP-Rate-Limit 10/15min + HMAC-Token 12h), `api/admin-verify.php`.
> - Passwort-Hash liegt **nur** als Server-ENV `ADMIN_PASSWORD_HASH` vor (gesetzt im AlwaysData-Panel am PHP-Site `copilotenschule.de/api` #1020643, Feld „Environment variables") – nicht in Git, nicht im Bundle.
> - Deployt und live getestet: falsches Passwort → abgewiesen; `Alaaf4711!` → Zugriff. ✅
> - **Ort der ENV-Variable (für später):** AlwaysData → Web → Sites → `copilotenschule.de/api` (PHP-Eintrag) → Zahnrad → Configuration → „Environment variables" (Format `KEY=value`).


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

### [x] SEC-02 – `api/openai-proxy.php` ist offenes Relay ohne Auth & Rate-Limit  ✅ CODE ERLEDIGT (2026-07-02), Deploy ausstehend

> **Umsetzung 2026-07-02:**
> - Neu: `api/admin-auth-lib.php` mit `verifyAdminToken()`, `getAdminTokenFromRequest()` (Header `X-Admin-Token` oder `Authorization: Bearer`) und `requireAdminToken()` (401 bei ungültig).
> - `api/openai-proxy.php`: ruft `requireAdminToken()` vor dem OpenAI-Call → nur eingeloggte Admins; zusätzlich IP-Rate-Limit 30/Stunde; CORS erlaubt jetzt `X-Admin-Token`.
> - `api/generate-content-api.php`: ebenfalls `requireAdminToken()` (war zuvor nur rate-limitiert, keine Auth). Wird vom Frontend nicht genutzt, aber hatte Key-Zugriff.
> - `api/admin-verify.php`: nutzt jetzt die zentrale `verifyAdminToken()` (DRY, identische Logik).
> - Frontend `src/components/DraftEditor.tsx`: neue Helper `proxyHeaders()` sendet das Admin-Token (aus `localStorage`) bei allen 4 Proxy-Aufrufen mit.
> - Verifiziert: `tsc --noEmit` fehlerfrei; PHP-Klammern balanciert.
> - Absicherung greift doppelt: Auf Prod ist aktuell ohnehin kein OpenAI-Key gesetzt (`openai_configured: false`), und der Proxy verlangt nun ein gültiges Admin-Token (das nur nach Login via SEC-01 existiert).
> - **NOCH ZU TUN:** commit + push → Deploy. Danach: als eingeloggter Admin einen AI-Generierungslauf im Redaktionssystem testen (Token wird automatisch mitgesendet); ein Aufruf ohne Token muss 401 liefern.

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

### [x] SEC-03 – npm-Dependencies: 35 Schwachstellen  ✅ SO WEIT WIE SINNVOLL BEHOBEN (2026-07-02)

> **Umsetzung 2026-07-02:**
> - `npm audit fix` (ohne `--force`) ausgeführt → **35 → 20** Schwachstellen. Client-relevante Lücke `react-router` Open-Redirect ist behoben (jetzt 6.30.4); ebenso `ws`, `postcss`, `yaml`, `picomatch`.
> - Die verbleibenden 20 (inkl. 3 kritisch) hängen ausschließlich an der **Build-Zeit-devDependency `react-snap`** (Kette: `html-minifier`, `minimist`, `qs`, `send`, `body-parser`, `cookie`, `path-to-regexp`, `node-fetch`, `nth-check`) plus `esbuild` unter Vite (nur Dev-Server). **Keine davon landet im Produktions-Bundle.**
> - `npm audit fix --force` bewusst **nicht** ausgeführt: es würde `react-snap` auf 1.13.1 **downgraden** und die SEO-kritische Prerender-Pipeline brechen. Die Lücken sind nur zur Build-Zeit auf eigenem, vertrauenswürdigem Content erreichbar → real nicht ausnutzbar.
> - Verifiziert: `npx vite build` läuft fehlerfrei (exit 0); `react-snap` unverändert 1.23.0.
> - Geänderte Datei: `package-lock.json` (+ ggf. `package.json`). **NOCH ZU TUN:** commit + push.
> - Optional später: `react-snap` durch eine gepflegte Alternative ersetzen (z. B. eigenes Puppeteer-Prerender-Script), um die Build-Kette zu bereinigen.


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

### [x] SEC-04 – E-Mail-Header-Injection in Kontakt- und Trainer-Formular  ✅ CODE ERLEDIGT (2026-07-02), Deploy ausstehend

> **Umsetzung 2026-07-02:**
> - Neue Helper-Funktion `mailHeaderSafe()` in `api/db-config.php` (entfernt CR/LF/Nullbytes, wird von beiden Mail-Skripten inkludiert).
> - `api/send-contact-email.php`: `Subject` und `Reply-To` (Name + E-Mail) sowie `X-Originating-IP` bereinigt.
> - `api/send-trainer-email.php`: `Subject`, `Reply-To`, `X-Originating-IP` bereinigt; CV-Upload-Dateiname zusätzlich um Pfadanteile/Anführungszeichen bereinigt (`Content-Type`/`Content-Disposition`).
> - Mail-Body bleibt unverändert (Zeilenumbrüche dort gewollt). Empfänger-Adressen sind bereits per `FILTER_VALIDATE_EMAIL` abgesichert.
> - Gepusht & deployt; Endpunkt live erreichbar (GET → 405, kein Fallback auf SPA).
> - **Verifiziert 2026-07-02:** Logik von `mailHeaderSafe()` gegen CRLF-Payloads getestet — vorher entstehen eigene `Bcc:`/`Cc:`-Header (Injection gelingt), nachher bleibt alles in einer Zeile → keine zusätzlichen Header injizierbar; Upload-Dateiname wird von CRLF & Anführungszeichen befreit. ✅
> - **End-to-End live bestätigt 2026-07-02:** same-origin POST mit Name-Payload `SEC04 Test\r\nBcc: injection-probe@example.com` gesendet. Empfangene Mail hat Betreff „Neue Kontaktanfrage von SEC04 **TestBcc: injection-probe@example.com**" → CRLF entfernt, kein separater Bcc-Header. Injection neutralisiert. ✅ (Test-DB-Eintrag `sec04-test@example.com` pending → kann gelöscht werden.)


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

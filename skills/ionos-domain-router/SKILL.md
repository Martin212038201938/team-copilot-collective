# IONOS Domain Router

Konfiguriert IONOS DNS und AlwaysData Site-Einstellungen fuer neue Domains. Umfasst DNS-Umstellung, Domain-Registrierung in AlwaysData, Site-Konfiguration und SSL/HTTPS-Aktivierung.

## Max Iterations
10

## AlwaysData IP
`185.31.40.15` (Shared Hosting, Account: y-b)

---

## Schritt 1: DNS bei IONOS umstellen

### A-Record `@` aendern
1. IONOS Admin → Domains & SSL → Domain auswaehlen → Tab **"DNS"**
2. Bestehenden A-Record `@` bearbeiten (Stift-Icon)
3. "Zeigt auf" aendern auf: `185.31.40.15`
4. TTL: **1 Stunde** (3600) – ist IONOS-Default

### www-Record
- IONOS bietet beim Speichern automatisch an, den `www`-Record auf dieselbe IP zu setzen (als A-Record)
- Das reicht aus – **ein separater CNAME ist NICHT noetig**

### Webhosting-Konflikt-Warnung
IONOS zeigt: *"Der Service wird deaktiviert"* – das ist **gewollt**. Folgende alte Records werden automatisch deaktiviert:

- AAAA `@` (IPv6 IONOS)
- A `@` (alte IONOS-IP)
- AAAA `www`
- A `www` (alte IONOS-IP)
- TXT `_dep_ws_mutex`

**Mail-Records bleiben unberuehrt:** MX, SPF, DKIM, DMARC werden nicht angefasst.

→ Bestaetigen und **Speichern**.

---

## Schritt 2: Domain in AlwaysData hinzufuegen

1. AlwaysData Admin → **Domains** → "+ Add a domain"
2. Domain eingeben (z.B. `meine-domain.de`) → Submit
3. **"Manage"** auswaehlen (nicht Transfer) → Next step
4. Domain erscheint als "N/A (external domain name)"

---

## Schritt 3: AlwaysData Site konfigurieren

### Variante A: Site existiert bereits (Normalfall bei Clone)
1. AlwaysData Admin → **Web → Sites**
2. **Zahnrad-Icon** (Modify) bei der Site klicken – **NICHT** den Domain-Link (der navigiert zur Live-Domain!)
3. Tab "Configuration" → **Addresses**: `www.[domain]` als zweite Adresse hinzufuegen
4. Tab "SSL" → **"Force HTTPS"** aktivieren
5. **Submit**

### Variante B: Neue Site anlegen
1. AlwaysData Admin → Web → Sites → "+ Add a site"
2. Addresses: `[domain]` + `www.[domain]`
3. Typ: "Static files" (fuer Vite/React-Builds) oder "PHP" (falls .htaccess-Rewrites noetig)
4. Document Root: `/www/[domain]/`
5. SSL → "Force HTTPS" aktivieren
6. Submit

---

## Schritt 4: Warten & Verifizieren

### DNS-Propagation pruefen
```bash
dig +short [domain] A
# Erwartet: 185.31.40.15

dig +short www.[domain] A
# Erwartet: 185.31.40.15
```

### HTTPS pruefen (direkt gegen AlwaysData, umgeht DNS-Cache)
```bash
curl -svI --resolve [domain]:443:185.31.40.15 https://[domain] 2>&1 | grep -E "subject|issuer|HTTP"
```

**Zertifikat bereit:**
```
subject: CN=[domain]
HTTP/2 200
```

**Zertifikat noch nicht bereit:**
```
subject: CN=*.alwaysdata.net
SSL: no alternative certificate subject name matches
```
→ DNS noch nicht propagiert. Let's Encrypt braucht erfolgreiche DNS-Validierung.

### Timing
| Schritt | Dauer |
|---|---|
| DNS-Propagation | 10–60 Min (TTL 3600) |
| Let's Encrypt Zertifikat | wenige Minuten nach DNS-Propagation |
| **Gesamt bis HTTPS live** | **ca. 15–90 Minuten** |

---

## Bekannte Fallstricke

| Problem | Loesung |
|---|---|
| IONOS-Session laeuft schnell ab | Erneut einloggen, URL bleibt erhalten |
| AlwaysData Site-Links navigieren zur Domain | Immer Zahnrad-Icon fuer Einstellungen verwenden |
| SSL zeigt `*.alwaysdata.net` Wildcard | DNS noch nicht propagiert – abwarten |
| `curl` Exit Code 60 (Cert-Fehler) | Zertifikat noch nicht ausgestellt – mit `-k` Flag testen ob Site antwortet |
| AAAA-Records (IPv6) stoeren | IONOS deaktiviert sie automatisch bei A-Record-Aenderung |
| www geht, aber Hauptdomain nicht | DNS-Caches unterschiedlich – einfach warten |
| IONOS braucht keinen separaten CNAME fuer www | Wird beim Speichern automatisch angeboten |
| AlwaysData Domain-Registrierung vergessen | Ohne Domains → Add a domain → Manage funktioniert NICHTS |

## WICHTIG: Domain-Setup hat 7 Schritte, nicht 3!

Die vollstaendige Reihenfolge fuer ein neues Deployment:
1. GitHub Repo erstellen + Secrets setzen
2. AlwaysData: FTP-User anlegen
3. AlwaysData: Site anlegen (Domain + www + Force HTTPS)
4. AlwaysData: Domain registrieren (Domains → Add a domain → Manage) ← PFLICHT!
5. IONOS: A-Record `@` → 185.31.40.15
6. IONOS: Webhosting-Warnung bestaetigen
7. Warten: 15-90 Min fuer DNS + Let's Encrypt

Besonders Schritte 3 und 4 werden haeufig vergessen.

---

## Checkliste fuer neue Deployments

- [ ] Site-Dateien per FTP/CI auf AlwaysData deployen
- [ ] `.htaccess` pruefen (Rewrites fuer SPA, Caching-Header)
- [ ] DNS bei IONOS umstellen (A-Record `@` + `www` → 185.31.40.15)
- [ ] Domain in AlwaysData hinzufuegen ("Manage")
- [ ] Site-Adressen konfigurieren (Domain + www)
- [ ] Force HTTPS aktivieren
- [ ] DNS-Propagation abwarten
- [ ] HTTPS mit curl verifizieren
- [ ] Seite im Browser testen (ggf. Cache leeren / Inkognito)

---

## Fallback (CLI-only, ohne Browser)

Falls Browser-Automation nicht verfuegbar ist, gebe Martin diese Anleitung:

```
DNS in IONOS eintragen:
1. IONOS Admin → Domains & SSL → [domain] → DNS
2. A-Record @ bearbeiten → 185.31.40.15
3. Warnung "Service wird deaktiviert" bestaetigen
4. www wird automatisch angeboten

AlwaysData konfigurieren:
1. Domains → Add a domain → [domain] → Manage
2. Sites → Zahnrad bei [domain] → Addresses: www.[domain] hinzufuegen
3. SSL → Force HTTPS → Submit
```

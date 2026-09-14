# Double-Opt-In-Streckentest — 14.09.2026

> **Nachtrag 14.09.2026:** Deploy #574 erfolgreich (9m 9s), Code ist live.
> Domain-weiter Auth-Status aller Domains siehe Abschnitt „Mail-Authentifizierung über alle Domains" am Ende.

**Testfall:** Guide „Copilot einführen: Leitfaden für Betriebsräte" (`guide-copilot-einfuehren-betriebsrat-leitfaden`), Adresse `martin@yellow-boat.com`, echtes Live-Formular auf copilotenschule.de.

## Ergebnis in einem Satz

Die Strecke funktioniert technisch einwandfrei — der Grund für die 0-%-DOI-Quote liegt woanders: die Domain **copilotenschule.de hat weder SPF noch DKIM noch DMARC**, und der Testlead ist **gar nicht im Reporting aufgetaucht**.

## Was funktioniert (verifiziert)

| Schritt | Ergebnis |
|---|---|
| Formular abgesendet | HTTP 200, `{"success":true,"saved":true,"warning":null}` |
| Benachrichtigung an Martin | angekommen 09:51:21, Absender `y-b@alwaysdata.net` |
| DOI-Mail an Interessenten | angekommen 09:51:22 (≈7 Sek.), Absender `info@copilotenschule.de` |
| Landeort | **Posteingang**, nicht Junk |
| Safe Links / Defender | Links umgeschrieben, aber **kein Auto-Confirm** — der GET/POST-Schutz in `confirm-subscription.php` greift wie gebaut |
| Bestätigungsseite (GET) | „Nur noch ein Schritt" → Status war noch `pending` |
| Bestätigung (POST) | „E-Mail erfolgreich bestätigt!" → `confirmed_now` |

Mail, Token, Confirm-Endpoint und der Scanner-Schutz sind also alle in Ordnung. Kein Bug in der Strecke selbst.

---

## Befund 1 (kritisch): Testlead ist im Reporting verschwunden

Lead-Report **vor** dem Test (09:23) und **nach** dem kompletten Durchlauf (09:52) sind Ziffer für Ziffer identisch: gesamt 12, Betriebsrat-Guide 3 / 0 bestätigt. Der Lead ist nirgends aufgetaucht.

**Ursache:** `newsletter_subscriptions.email` ist `UNIQUE`. In `db-config.php` → `saveNewsletterSubscription()` steht:

```sql
ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    confirmation_token = VALUES(confirmation_token),
    consent_text = VALUES(consent_text),
    form_submitted_at = CURRENT_TIMESTAMP,
    opt_in_status = 'pending',
    created_at = CURRENT_TIMESTAMP
```

`source` fehlt in der UPDATE-Liste. Eine Adresse, die schon in der Tabelle steht, behält **für immer** ihre erste Quelle.

Da `martin@yellow-boat.com` offenbar schon mit einer Nicht-Guide-Quelle (`contact` o. ä.) existierte, wurde der Betriebsrat-Download auf diese alte Zeile geschrieben und ist im Report unsichtbar — `lead-report.php` filtert auf `WHERE source LIKE 'guide-%'`.

**Folgen im laufenden Betrieb:**

- Jeder Download von einer Adresse, die schon bekannt ist (Kontaktformular, früherer Guide), fehlt in der Statistik. Die 12 Leads sind eine Untergrenze, keine echte Zahl.
- Wer zwei Guides zieht, zählt nur einmal — beim ersten.
- Schlimmer: `opt_in_status` wird auf `pending` zurückgesetzt. Ein bereits bestätigter Kontakt verliert durch einen zweiten Download sein Opt-In. Das drückt die confirmed-Quote zusätzlich nach unten und ist DSGVO-seitig unschön, weil auch der alte `consent_text` überschrieben wird.

**Fix:** entweder `source = VALUES(source)` ergänzen (einfach, aber Historie geht verloren) oder — besser — Leads in einer eigenen Tabelle `guide_leads` mit `UNIQUE(email, source)` erfassen, damit ein Kontakt mehrere Guides haben kann. Und `opt_in_status` beim Update **nicht** zurücksetzen, wenn er schon `confirmed` ist.

---

## Befund 2 (kritisch): keine Mail-Authentifizierung für copilotenschule.de

```
copilotenschule.de        TXT   → nur google-site-verification, KEIN v=spf1
_dmarc.copilotenschule.de TXT   → leer
*._domainkey.…            → kein DKIM (a1, default, mail, alwaysdata, selector1/2 geprüft)
MX                        → mx1/mx2.alwaysdata.com
```

Zum Vergleich, die andere Domain ist sauber aufgesetzt:

```
yellow-boat.com  TXT → v=spf1 include:spf.protection.outlook.com -all
```

Die DOI-Mail geht mit `From: info@copilotenschule.de` raus, PHP `mail()` auf AlwaysData setzt als Envelope-Absender aber `y-b@alwaysdata.net` (sichtbar an der Message-ID). Ohne SPF und ohne DKIM ist die Mail damit **vollständig unauthentifiziert**.

Dass sie bei mir im Posteingang lag, sagt wenig — das ist Martins eigener Tenant. Ein fremdes Exchange Online oder Google Workspace mit strengem Gateway wirft so eine Mail mit hoher Wahrscheinlichkeit in den Junk-Ordner. Und genau da sitzen die Zielgruppen der Guides mit 0 % DOI: Betriebsräte, Admins, Management in Unternehmen. Die Excel-Zielgruppe schreibt eher von GMX/Gmail/web.de aus — tendenziell laxer.

**Das ist die plausibelste Erklärung für das 0-%-Muster.** Beweisen lässt es sich erst nach dem Fix bzw. über DMARC-Reports.

**Fix, in dieser Reihenfolge:**

1. SPF-TXT-Record für copilotenschule.de setzen, mit AlwaysData drin — Startwert: `v=spf1 include:_spf.alwaysdata.com ~all` (den korrekten Include bei AlwaysData verifizieren, nicht raten).
2. DKIM bei AlwaysData für die Domain aktivieren und den Selektor als CNAME/TXT eintragen.
3. Erst danach DMARC weich starten: `v=DMARC1; p=none; rua=mailto:martin@yellow-boat.com`, später auf `quarantine` ziehen.
4. In `download-lead.php` den Envelope-Absender mitgeben: `mail($email, $subject, $body, $headers, '-finfo@copilotenschule.de')` — sonst bleibt die Ausrichtung (Alignment) kaputt, auch mit SPF.

---

## Befund 3 (Konzept): niemand hat einen Grund zu bestätigen

Das PDF wird nach dem Absenden **sofort** freigegeben (`GatedDownloadForm.tsx` startet den Download direkt bei `success`). Die Bestätigungsmail ist damit reine Höflichkeit — der Interessent hat schon alles, was er wollte.

Selbst wer die Mail öffnet, findet zwei Buttons: „Leitfaden öffnen" und „E-Mail-Adresse bestätigen". Der erste führt zum Ziel, der zweite bringt ihm nichts. Dass daraus niedrige Quoten werden, ist erwartbar.

Dazu ein kleiner Fehler: `$downloadUrl` in `download-lead.php` zeigt auf `/guidelines/<id>`, also auf die **Landingpage mit dem Formular**, nicht auf das PDF. Wer in der Mail auf „Leitfaden öffnen" klickt, landet wieder vor dem Gate.

**Optionen:**

- `sourcePath` auf `guide.pdfPath` umstellen, damit der Mail-Button wirklich das PDF öffnet (kleiner Fix, klare Verbesserung).
- Wenn DOI-Quote das Ziel ist: einen echten Anreiz hinter die Bestätigung legen (Update-Versand zum Thema, Checklisten-Nachschlag, Webinar-Einladung) und das in der Mail benennen. Ohne Gegenwert bleibt die Quote niedrig, egal wie gut die Technik läuft.
- Alternativ ehrlich akzeptieren, dass die DOI-Quote hier keine sinnvolle KPI ist, und stattdessen Downloads als Lead-Metrik führen — dann aber Befund 1 fixen, sonst zählt man falsch.

---

## Aufräumen

Der Testlead hat die bestehende Zeile für `martin@yellow-boat.com` überschrieben: neuer Token, `consent_text` jetzt der des Betriebsrats-Leitfadens, `form_submitted_at` auf heute, Status `confirmed`. Ohne DB-Zugriff von hier aus nicht rückgängig zu machen — bei Bedarf direkt in phpMyAdmin auf AlwaysData korrigieren.

---

## ✅ ERLEDIGT am 14.09.2026: Befund 2 behoben

Mail-Authentifizierung für copilotenschule.de eingerichtet und verifiziert.

### DKIM
Ein Schlüsselpaar existierte bei AlwaysData bereits (Selektor `alwaysdata`, 2048 Bit RSA) — es war nur nie im DNS veröffentlicht, weil die Zone bei IONOS liegt und AlwaysData seine eigenen Records dort nicht ausrollen kann. Kein Neu-Generieren nötig, nur kopieren.

### Bei IONOS angelegte Records

| Hostname | Typ | Wert |
|---|---|---|
| `@` | TXT | `v=spf1 include:_spf.alwaysdata.com ~all` |
| `alwaysdata._domainkey` | TXT | `v=DKIM1; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A…` (403 Zeichen) |
| `_dmarc` | TXT | `v=DMARC1; p=none; rua=mailto:dmarc@copilotenschule.de; fo=1; adkim=r; aspf=r` |

Bewusst defensiv: `~all` statt `-all`, `p=none` statt `quarantine`. Erst messen, dann verschärfen.

### Zusätzlich
- Postfach `dmarc@copilotenschule.de` bei AlwaysData angelegt (Weiterleitung an martin@yellow-boat.com), damit die Aggregat-Reports filterbar in einem eigenen Empfänger landen.
- Envelope-Absender (`-finfo@copilotenschule.de`) in `download-lead.php`, `send-contact-email.php`, `send-trainer-email.php` und `roi-mailer.php` ergänzt. **Noch nicht deployed** — muss über GitHub Desktop commitet und gepusht werden.

### Verifikation (mail-tester.com, 14.09.2026)

```
Ergebnis: 9.8 / 10   "Sie sind vollständig berechtigt"

[SPF]   Server 188.72.70.5 ist berechtigt, y-b@alwaysdata.net zu nutzen  ✅
[DKIM]  Die DKIM Signatur ist gültig                                     ✅
[DMARC] Ihre Nachricht bestand den DMARC Test                            ✅
        PTR sauber (r2-2.smtpout1.paris1.alwaysdata.com), keine Blocklist
```

Damit ist die zentrale offene Frage beantwortet: **AlwaysData signiert die ausgehenden Mails tatsächlich mit DKIM.** Der Schlüssel war die ganze Zeit aktiv, nur die Gegenprüfung im DNS fehlte — jede Mail trug eine Signatur, die niemand verifizieren konnte.

DMARC besteht aktuell über die DKIM-Seite. SPF zeigt noch auf `alwaysdata.net`, weil der Envelope-Fix im Code noch nicht live ist. Nach dem Deployment greifen beide Beine.

### Monitoring
Wöchentlicher Scheduled Task `mail-auth-check-copilotenschule` (montags 08:00) prüft die drei Records gegen den Soll-Zustand, wertet die DMARC-Reports aus und schlägt die Erhöhung auf `p=quarantine` vor, sobald vier saubere Wochen vorliegen.

### Offen / aufzuräumen
- **Code deployen** (Envelope-Absender) — liegt uncommitted im Repo.
- **Testzeile löschen:** `test-ucow6f8so@srv1.mail-tester.com` steht jetzt als Lead unter `guide-copilot-einfuehren-betriebsrat-leitfaden` in `newsletter_subscriptions`. In phpMyAdmin entfernen.
- Die Zeile für `martin@yellow-boat.com` ist durch die Tests überschrieben (siehe oben).
- **Befund 1 und 3 sind unverändert offen.**

---

## Nächste Schritte, priorisiert

1. ~~SPF + DKIM setzen (Befund 2)~~ — **erledigt, siehe oben.**
2. **Code-Änderungen deployen** (Envelope-Absender) — commit + push via GitHub Desktop.
3. **`source` im ON-DUPLICATE-Update fixen** (Befund 1) — sonst bleibt das Reporting dauerhaft falsch.
4. ~~`opt_in_status` beim Update nicht auf `pending` zurücksetzen~~ — **erledigt, siehe unten.**
5. **Mail-Button aufs PDF zeigen lassen** (Befund 3).
6. Zwei Testzeilen in `newsletter_subscriptions` aufräumen.
7. In vier Wochen: DMARC-Reports auswerten und über `p=quarantine` entscheiden (macht der wöchentliche Task).

---

## ✅ ERLEDIGT am 14.09.2026: Opt-In-Reset abgestellt

In `db-config.php` → `saveNewsletterSubscription()` wurde `opt_in_status` bisher bei jedem Wiedereintrag bedingungslos auf `'pending'` gesetzt. Jetzt:

```sql
opt_in_status = IF(
    newsletter_subscriptions.opt_in_status IN ('confirmed', 'unsubscribed'),
    newsletter_subscriptions.opt_in_status,
    'pending'
),
```

**Verhalten pro Ausgangszustand**

| vorher | nachher | warum |
|---|---|---|
| `confirmed` | `confirmed` | Ein erteiltes Opt-In wird durch einen weiteren Download nicht entwertet. |
| `unsubscribed` | `unsubscribed` | Ein Widerruf soll nicht durch ein Formular still aufgehoben werden. `confirmSubscription()` behandelt den Zustand ohnehin als final — ohne diesen Zweig hätte ein Formular-Eintrag die Sperre umgehen können. |
| `pending` | `pending` | unverändert; der neue Token macht die Bestätigung möglich. |

**Warum die qualifizierte Schreibweise.** Laut MySQL-Handbuch ist `ON DUPLICATE KEY UPDATE` ein UPDATE der alten Zeile — `c=c+1` verhält sich wie `UPDATE ... SET c=c+1`. Der mit dem Tabellennamen qualifizierte Spaltenname rechts vom `=` liefert damit den bisherigen Wert; für den einzufügenden bräuchte es `VALUES(col)`. Die Qualifizierung ist bewusst gewählt, damit die Logik nicht von der Auswertungsreihenfolge der Zuweisungen abhängt.

**Grenze der Prüfung:** Im Sandbox war kein MySQL installierbar, die Anweisung wurde also **nicht live ausgeführt**, sondern gegen die MySQL-8.0-Dokumentation verifiziert. Nach dem Deployment einmal gegenprüfen: bestätigte Adresse nehmen, zweiten Guide anfordern, `opt_in_status` in phpMyAdmin kontrollieren — muss `confirmed` bleiben.

**Noch offen in derselben Funktion** (bewusst nicht angefasst, gehört zu Befund 1):
- `source` wird weiterhin nicht aktualisiert — der Kern des Reporting-Problems.
- `created_at` wird bei jedem Wiedereintrag überschrieben, das Ersterfassungsdatum geht verloren.
- `consent_text` wird überschrieben, der ursprüngliche Einwilligungstext ist damit als DSGVO-Nachweis weg.

---

# Mail-Authentifizierung über alle Domains — Stand 14.09.2026

Geprüft per `dig` gegen 8.8.8.8. DKIM-Selektoren getestet: `alwaysdata`, `selector1`, `selector2`, `default`, `google`.

| Domain | Mailserver | SPF | DKIM | DMARC | Status |
|---|---|---|---|---|---|
| copilotenschule.de | AlwaysData | ✅ | ✅ | ✅ `p=none`, mit rua | **fertig** |
| no-vibes.dev | AlwaysData | ✅ | ✅ | ✅ `p=none`, mit rua | **fertig** |
| yellow-plane.com | AlwaysData | ✅ | ✅ | ⚠️ `p=none`, **ohne rua** | fast fertig |
| **yellow-boat.com** | **Microsoft 365** | ✅ `-all` | ❌ **fehlt** | ❌ **fehlt** | **wichtigste Lücke** |
| **yellow-boat.org** | AlwaysData | ❌ **falscher Include** | ❌ fehlt | ❌ fehlt | **aktiv kaputt** |
| ki-entwickler-kurse.de | IONOS + AlwaysData | ✅ | ❌ fehlt | ⚠️ IONOS-Managed, ohne rua | offen |
| chatgpt-trainings.de | IONOS | ✅ | ❌ fehlt | ⚠️ IONOS-Managed, ohne rua | offen |
| no-vibes.de | IONOS | ✅ | ❌ fehlt | ⚠️ IONOS-Managed, ohne rua | offen |

---

## 🔴 Priorität 1: yellow-boat.org — SPF zeigt auf den falschen Include

**Ist-Zustand:**
```
v=spf1 include:alwaysdata.com -all
```

`alwaysdata.com` ist die **Firmendomain** von AlwaysData, nicht die Freigabe für Kundenversand. Ihr SPF listet Gandi-Ranges plus `ip4:188.72.70.45` und `ip4:188.72.70.96`. Der reale Versand-Relay für Kundenmails ist aber ein anderer — im mail-tester-Lauf war es **188.72.70.5**, und `a:ad.alwaysdata.net` löst auf 185.31.40.185 auf. Die tatsächliche Versand-IP ist also **nicht abgedeckt**.

Kombiniert mit `-all` (Hard Fail) heißt das: Mail von `@yellow-boat.org` über AlwaysData wird von strengen Empfängern **abgelehnt**, nicht nur markiert.

**Fix:** Include korrigieren.
```
v=spf1 include:_spf.alwaysdata.com ~all
```
Der Unterstrich vor `spf` ist der ganze Unterschied. Zusätzlich `-all` auf `~all` ziehen, bis DMARC-Reports zeigen, dass alles sauber läuft.

---

## 🔴 Priorität 2: yellow-boat.com — deine Hauptadresse hat kein DKIM

Das ist die Domain, unter der deine gesamte Kundenkommunikation rausgeht. SPF ist sauber (`-all`, Outlook-Include), aber **DKIM und DMARC fehlen komplett**.

SPF allein bricht, sobald eine Mail weitergeleitet wird — der weiterleitende Server ist dann nicht im SPF, und ohne DKIM gibt es kein zweites Standbein. Genau das passiert bei Verteilern, Weiterleitungen und Mailinglisten.

**Vorgehen (zwei Systeme, Reihenfolge zwingend):**

1. **Microsoft 365 Defender-Portal** → `security.microsoft.com` → E-Mail-Authentifizierungseinstellungen → DKIM → yellow-boat.com auswählen. Microsoft zeigt dort **zwei CNAME-Ziele** an (`selector1._domainkey` und `selector2._domainkey`, Ziele enden auf `.onmicrosoft.com`). Die Werte sind tenant-spezifisch — abschreiben, nicht raten.
2. **DNS bei All-Inkl** (yellow-boat.com liegt auf `ns5/ns6.kasserver.com`, nicht bei IONOS) → beide CNAMEs eintragen.
3. Zurück ins Defender-Portal → DKIM **aktivieren**. Das geht erst, wenn die CNAMEs aufgelöst werden.
4. Danach DMARC als TXT auf `_dmarc.yellow-boat.com`:
   ```
   v=DMARC1; p=none; rua=mailto:dmarc@copilotenschule.de; fo=1
   ```
   Da die rua-Adresse auf einer **anderen** Domain liegt, verlangt der Standard eine Freigabe auf der Empfängerseite. Zusätzlich bei IONOS eintragen:
   ```
   Name:  yellow-boat.com._report._dmarc.copilotenschule.de
   Typ:   TXT
   Wert:  v=DMARC1
   ```
   Ohne diesen Record verwerfen Google und Microsoft die Reports stillschweigend. Alternative ohne Zusatzrecord: `rua=mailto:martin@yellow-boat.com` verwenden.

---

## 🟡 Priorität 3: Die drei IONOS-Domains

`ki-entwickler-kurse.de`, `chatgpt-trainings.de`, `no-vibes.de` haben alle einen DMARC-Record, der per CNAME auf `dmarc.ionos.de` zeigt und dort zu `v=DMARC1; p=none;` auflöst — **ohne rua**. Das ist DMARC als Dekoration: Es misst nichts, meldet nichts, schützt nichts. Der Record existiert nur, damit einer existiert.

DKIM fehlt bei allen dreien.

Relevanz nach Domain:
- **ki-entwickler-kurse.de** versendet aktiv (steht mit AlwaysData-Include im SPF, Kontaktformular-Mails liegen im Ausgangs-Log) → **sollte DKIM bekommen**.
- **chatgpt-trainings.de** hat aktive Postfächer (info/martin/noreply, alle Weiterleitungen) → mittlere Priorität.
- **no-vibes.de** hat keine Postfächer → niedrig, aber ein DMARC-Record mit `p=reject` wäre hier sinnvoll, gerade weil nicht gesendet wird: Das verhindert Spoofing unter dem Namen.

Für Domains, die über AlwaysData senden, ist der Weg derselbe wie bei copilotenschule.de: In AlwaysData unter Domains → Details → Konfiguration den DKIM-Schlüssel erzeugen bzw. auslesen, dann als TXT auf `alwaysdata._domainkey.<domain>` bei IONOS eintragen.

---

## 🟢 Priorität 4: yellow-plane.com

SPF, DKIM und DMARC sind da, dem DMARC fehlt nur die `rua`. Ein-Zeilen-Fix, damit auch hier Reports ankommen.

---

## Grundregel für alle Domains

Drei Dinge gehören zusammen, und die Reihenfolge ist nicht beliebig:

1. **SPF** deckt ab, welche Server senden dürfen. Startwert immer `~all`, nie sofort `-all`.
2. **DKIM** signiert die Mail. Ohne DKIM überlebt keine Authentifizierung eine Weiterleitung.
3. **DMARC** verknüpft beides mit einer Regel — und liefert über `rua` überhaupt erst die Daten, um zu sehen, ob es funktioniert. **Ein DMARC-Record ohne rua ist wertlos.**

Nie mit `p=reject` oder `-all` anfangen. Erst vier Wochen mit `p=none` messen, dann `quarantine`, dann ggf. `reject`.

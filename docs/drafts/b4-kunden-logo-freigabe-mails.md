# B4 — Kunden-Logo-Freigabe: Mail-Templates

**Erstellt:** 2026-06-10 (Cron `copilotenschule-seo-b4-trust-signals-retry`)
**Zweck:** Schriftliche Logo-Freigabe von 6 Referenzkunden einholen, bevor der Trust-Signal-Block (B4) auf Homepage und `/ueber-uns` eingebaut wird.

## ⚠️ Warum schriftlich freigeben lassen?

Kunden-Logos ohne nachweisbare Freigabe auf der eigenen Website zu zeigen, ist **rechtlich riskant** (Marken-/Wettbewerbsrecht, mögliche Abmahnung). Erst wenn für mindestens 3 Kunden eine dokumentierte Freigabe vorliegt, baut der B4-Cron den Code-Entwurf. Logos werden bewusst **ohne Verlinkung** und in **Graustufen** dargestellt — eine reine Referenznennung, kein Backlink-Tausch.

## So gehst du vor

1. Pro Kunde den passenden Ansprechpartner (Marketing / Kommunikation / dein bisheriger Projektkontakt) eintragen — Platzhalter `[Ansprechpartner]` ersetzen.
2. Mail versenden (von martin@yellow-boat.com).
3. **Antwort dokumentieren:** Sobald eine Freigabe (oder Absage) eingeht, einen Eintrag in `docs/seo-status-log.md` ergänzen, z. B.:
   `B4 Logo-Freigabe: REWE ✅ erteilt 2026-06-xx (Mail von [Name])` bzw. `… ❌ abgelehnt`.
   Der Follow-up-Cron (`copilotenschule-seo-b4-trust-signals-logo-followup`, 2026-07-01) liest diesen Log und startet bei ≥ 3 Freigaben automatisch den Code-Entwurf.

**Hinweis zur Form:** Eine formlose schriftliche Bestätigung per E-Mail genügt in der Regel. Wenn ein Kunde eine konkrete Nutzungsbeschränkung nennt (z. B. „nur Wort-Bild-Marke", „nur in dieser Auflösung", „nicht in Verbindung mit Aussage X"), bitte zusätzlich im Status-Log vermerken.

---

## Template 1 — REWE

**Betreff:** Kurze Bitte: Dürfen wir REWE als Referenz auf unserer Website nennen?

Hallo [Ansprechpartner],

ich hoffe, bei Ihnen läuft alles gut. Wir bauen gerade unsere Website (copilotenschule.de) etwas aus und möchten dort einen kleinen Bereich mit ausgewählten Referenzkunden einrichten.

Da wir mit Ihrem Team gemeinsam an der Copilot-Einführung gearbeitet haben, würde ich Sie gerne fragen: Dürfen wir das REWE-Logo dort als Referenz zeigen?

Ein paar Worte zum Rahmen, damit Sie das gut einschätzen können:

- Die Darstellung ist dezent — Graustufen-Logo in einer Referenzleiste, **ohne Verlinkung** und ohne weitere Aussagen über das Projekt.
- Es geht ausschließlich um die reine Nennung als Kunde, keine Fallstudie, keine Detailangaben.
- Eine kurze formlose Bestätigung per Mail genügt mir völlig. Falls es bei Ihnen Vorgaben zur Logo-Nutzung gibt (Variante, Auflösung, Freigabeprozess), richte ich mich selbstverständlich danach.

Wenn das aus Ihrer Sicht nicht passt, ist das ebenfalls völlig in Ordnung — dann lassen wir es einfach weg.

Vielen Dank und herzliche Grüße
Martin Lang
Gründer copilotenschule.de
martin@yellow-boat.com

---

## Template 2 — Pernod Ricard

**Betreff:** Kurze Bitte: Logo-Nennung als Referenz auf copilotenschule.de

Hallo [Ansprechpartner],

wir richten auf unserer Website (copilotenschule.de) gerade einen kleinen Referenzbereich ein und würden dort gerne einige Kunden zeigen, mit denen wir an der Microsoft-Copilot-Einführung gearbeitet haben.

Dürfen wir das Logo von Pernod Ricard in dieser Referenzleiste verwenden?

Damit Sie wissen, worum es konkret geht:

- Dezente Darstellung als Graustufen-Logo, **ohne Verlinkung**, ohne weitere Projektdetails.
- Reine Referenznennung, keine Case Study.
- Eine kurze schriftliche Bestätigung per Mail reicht aus. Falls Sie Markenrichtlinien oder einen festen Freigabeweg haben, halte ich mich gerne daran.

Sollte eine Nennung nicht möglich sein, ist das absolut kein Problem — sagen Sie einfach kurz Bescheid.

Vielen Dank vorab und beste Grüße
Martin Lang
Gründer copilotenschule.de
martin@yellow-boat.com

---

## Template 3 — Lekkerland

**Betreff:** Dürfen wir Lekkerland als Referenz auf unserer Website zeigen?

Hallo [Ansprechpartner],

ich melde mich mit einer kurzen Bitte: Wir ergänzen die Website der copilotenschule.de um einen kleinen Bereich mit Referenzkunden und würden dort gerne auch Lekkerland aufführen.

Konkret hieße das:

- Das Lekkerland-Logo erscheint dezent in Graustufen in einer Referenzleiste — **ohne Verlinkung** und ohne weitere Angaben zum Projekt.
- Es ist eine reine Kundennennung, keine ausführliche Fallstudie.
- Eine formlose Freigabe per Mail genügt. Wenn es bei Ihnen Vorgaben zur Verwendung des Logos gibt, setze ich diese gerne um.

Falls das für Sie nicht infrage kommt, lassen wir es selbstverständlich weg — eine kurze Rückmeldung genügt.

Herzlichen Dank und viele Grüße
Martin Lang
Gründer copilotenschule.de
martin@yellow-boat.com

---

## Template 4 — Marriott Hotels

**Betreff:** Bitte um kurze Freigabe: Logo-Nennung als Referenz

Hallo [Ansprechpartner],

wir bauen auf unserer Website (copilotenschule.de) gerade einen kleinen Referenzbereich auf und würden dort gerne einige Kunden zeigen, die wir bei der Einführung von Microsoft Copilot begleitet haben.

Dürfen wir in diesem Rahmen das Logo von Marriott Hotels als Referenz verwenden?

Zum Hintergrund:

- Dezente Darstellung als Graustufen-Logo in einer Referenzleiste, **ohne Verlinkung** und ohne weitere Projektdetails.
- Reine Referenznennung, keine Case Study.
- Eine kurze schriftliche Bestätigung per Mail reicht. Da bei Hotelmarken häufig zentrale Brand-Guidelines gelten, richte ich mich selbstverständlich nach Ihren Vorgaben zur Logo-Nutzung und freigebenden Stelle.

Wenn eine Nennung nicht möglich ist, ist das völlig in Ordnung — geben Sie mir einfach kurz Bescheid.

Vielen Dank und beste Grüße
Martin Lang
Gründer copilotenschule.de
martin@yellow-boat.com

---

## Template 5 — Med360Grad

**Betreff:** Kurze Bitte: Dürfen wir Med360Grad als Referenz nennen?

Hallo [Ansprechpartner],

eine kurze Frage von meiner Seite: Wir richten auf unserer Website (copilotenschule.de) einen kleinen Referenzbereich ein und würden dort gerne auch Med360Grad aufführen.

Das sähe so aus:

- Das Med360Grad-Logo erscheint dezent in Graustufen in einer Referenzleiste — **ohne Verlinkung** und ohne weitere Angaben zum Projekt.
- Reine Kundennennung, keine Fallstudie.
- Eine formlose Bestätigung per Mail genügt mir. Falls Sie Vorgaben zur Logo-Verwendung haben, setze ich diese gerne um.

Sollte das nicht passen, lassen wir es problemlos weg — eine kurze Rückmeldung reicht völlig.

Herzlichen Dank und viele Grüße
Martin Lang
Gründer copilotenschule.de
martin@yellow-boat.com

---

## Template 6 — IHK Nord Westfalen

**Betreff:** Bitte um Freigabe: Nennung der IHK Nord Westfalen als Referenz

Sehr geehrte/r [Ansprechpartner],

wir ergänzen die Website der copilotenschule.de derzeit um einen kleinen Bereich mit ausgewählten Referenzen aus unseren Microsoft-Copilot-Schulungen und würden dort gerne auch die IHK Nord Westfalen aufführen.

Damit Sie das gut einordnen können:

- Die Darstellung erfolgt dezent als Graustufen-Logo in einer Referenzleiste, **ohne Verlinkung** und ohne weitere Angaben zum Projekt.
- Es handelt sich um eine reine Referenznennung, nicht um eine Fallstudie.
- Eine kurze schriftliche Bestätigung per E-Mail genügt. Da bei öffentlich-rechtlichen Institutionen häufig eigene Vorgaben zur Logo- und Namensnutzung bestehen, richte ich mich selbstverständlich nach Ihren Richtlinien und dem zuständigen Freigabeweg.

Sollte eine Nennung nicht möglich sein, ist das selbstverständlich kein Problem — eine kurze Rückmeldung genügt.

Mit freundlichen Grüßen
Martin Lang
Gründer copilotenschule.de
martin@yellow-boat.com

---

## Checkliste für den User

- [ ] Ansprechpartner pro Kunde eintragen
- [ ] 6 Mails versenden
- [ ] Eingehende Freigaben/Absagen in `docs/seo-status-log.md` dokumentieren (Format: `B4 Logo-Freigabe: <Kunde> ✅/❌ <Datum>`)
- [ ] Bei ≥ 3 Freigaben: Follow-up-Cron am 2026-07-01 erzeugt automatisch den Code-Entwurf (`docs/drafts/b4-trust-signal-block.tsx.md` + `docs/drafts/b4-deployment-checklist.md`). Alternativ manuell anstoßen.

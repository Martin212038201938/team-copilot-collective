# Draft: SEA-Tracking-Konzept + Clarity-Tag-Diagnose

**Erstellt:** 11.06.2026 (Berater-Review) · **Anlass:** SEA-Start KW 25 + Outbound-Mailkampagne
**Befund:** Es existiert KEIN Google-Ads-/GA4-Tag im Code. Ohne Conversion-Tracking kann Google Ads nicht auf Leads optimieren und der SEA-Erfolg ist nicht messbar.

---

## 1. Entscheidung zuerst: Consent-Frage (blockierend)

Die Site ist bewusst schlank gebaut: kein Cookie-Banner, Clarity läuft cookiebasiert-minimal, Datenschutzerklärung Stand 27.05. Google-Ads-Conversion-Tracking ändert die Rechtslage:

| Option | Was es bedeutet | Trade-off |
|---|---|---|
| **A) CMP + Consent Mode v2 (empfohlen)** | Consent-Banner (z. B. consentmanager, Cookiebot, oder schlankes Eigenbau-Banner) + gtag mit `default: denied` → Update nach Einwilligung. Google verlangt Consent Mode v2 für Werbefunktionen im EWR. | Einmalaufwand M; Banner kostet etwas UX/Conversion, ist aber Standard und rechtssicher. Volle Smart-Bidding-Fähigkeit. |
| B) SEA ohne Google-Conversion-Import | Nur UTM + Clarity + AlwaysData als Controlling. Manuelles Bidding (max. CPC), Bewertung über Ziel-URLs. | Kein Consent-Banner nötig (Status quo bleibt). Aber: Google optimiert blind, Skalierung teuer, Attributionslücke bleibt. |
| C) Verschieben des SEA-Starts bis A steht | — | Ehrlichste Variante, falls A nicht bis KW 25 schaffbar. |

**Empfehlung:** A. Wenn KW 25 fix ist und A nicht rechtzeitig steht: Start mit B auf kleinem Budget (Brand + 1–2 exakte Keywords), Umstellung auf A in Woche 2–3. Datenschutzerklärung in jedem Fall um Google Ads ergänzen (Abschnitt in `Datenschutz.tsx`).

> Hinweis: keine Rechtsberatung — CMP-/TTDSG-Entscheidung ggf. kurz mit dem Anwalt spiegeln, der die Datenschutzerklärung geprüft hat.

## 2. Implementierungs-Skizze (Variante A)

1. **gtag-Snippet** in `index.html` mit Platzhalter analog Clarity-Muster (`%VITE_GOOGLE_ADS_ID%`, Format `AW-XXXXXXXXX`), Consent-Default `denied` vor gtag-Load.
2. **GitHub-Secret** `VITE_GOOGLE_ADS_ID` + Injection in `deploy.yml` (gleiches Muster wie `VITE_CLARITY_ID`).
3. **`src/lib/analytics.ts` erweitern** um defensiven Helper:
   ```ts
   export function trackAdsConversion(label: string): void {
     try {
       // @ts-expect-error gtag global
       window.gtag?.("event", "conversion", { send_to: `${ADS_ID}/${label}` });
     } catch { /* still */ }
   }
   ```
4. **Conversion-Punkte** (parallel zu bestehenden Clarity-Calls, keine neuen Stellen nötig):
   - `Contact.tsx:92` contact_form_submit → Ads-Conversion „Lead"
   - `TrainingKonfigurator.tsx` konfigurator_submit → „Lead-Konfigurator"
   - `Contact.tsx`/`Footer.tsx` phone_click / mail_click → „Kontakt-Intent" (sekundär)
   - `SmlHrTipps2026.tsx` sml_booking_click → eigene Kampagnen-Conversion (Outbound-LP!)
5. **react-snap-Guard:** wie bei Clarity — kein gtag-Init während Pre-Render (Muster aus `main.tsx` übernehmen).
6. In Google Ads: Conversions anlegen, „Lead" als primär, Telefon/Mail als sekundär (sonst optimiert Smart Bidding auf billige Pseudo-Conversions).

## 3. UTM-Konvention (gilt ab sofort für SEA UND Outbound-Mails)

```
SEA:      ?utm_source=google&utm_medium=cpc&utm_campaign=<kampagne>&utm_term=<keyword>
Outbound: ?utm_source=outbound&utm_medium=email&utm_campaign=sml-hr-2026
LinkedIn: ?utm_source=linkedin&utm_medium=social&utm_campaign=<post>
```

Zweck: (a) Clarity/AlwaysData können Paid/Outbound von Organic trennen, (b) Weekly-/Monthly-Crons vergleichen sonst ab KW 25 Äpfel mit Birnen, (c) GSC bleibt davon unberührt (misst eh nur organisch). Die Outbound-Mails sollten die LP `/sml/hr-tipps_2026` NUR mit UTM verlinken.

## 4. SEA-Kampagnen-Leitplanken (Budget-Schutz)

- **Zielseiten:** Trainings-Detailseiten, `/training-konfigurator`, ggf. dedizierte noindex-LP (Muster: `/sml/hr-tipps_2026`). **NICHT auf /wissen/-Artikel** schicken, solange die CTA-Brücke (siehe `pattern-transfer-content-to-offer-cta.md`) nicht live ist.
- **Brand-Kampagne** („copilotenschule") zuerst — billig, schützt vor Wettbewerber-Bidding, liefert saubere Erst-Daten.
- Generische Keywords eng starten (exact/phrase: „copilot schulung", „copilot training unternehmen", „eu ai act schulung") + Negativliste (kostenlos, kurs, privat, gehalt …).
- EU-AI-Act-Cluster ist DIE SEA-Chance bis 02.08.: kaufnahe Nachfrage wächst (GSC-Belege), B3a + Training `/trainings/eu-ai-act-pflichtschulung` als LP-Paar.
- Budget erst skalieren, wenn Conversion-Import nachweislich läuft (sonst lernt der Algorithmus auf Klicks).

## 5. Clarity-Custom-Tag-Diagnose (seit 06.06. offen)

**Code-Review-Ergebnis (11.06.):** Alle 6 Events nutzen identisch `trackConversion()` → `Clarity.event()`. `trainer_application_submit` kommt nachweislich an (1×). **Der Code ist sehr wahrscheinlich NICHT kaputt.** Wahrscheinlichste Erklärungen:

1. **Es gab schlicht keine Conversions dieser Typen.** 30T: „Formular absenden" (auto) = 1 — das war vermutlich genau die Trainer-Bewerbung. contact_form_submit bei 0 echten Submits = korrekt 0.
2. **Falscher Dashboard-Filter:** Custom-Events erscheinen in Clarity unter *Custom-Events/Tags*, nicht im Smart-Events-Filter, mit dem die Crons auswerten. → Cron-Prompts prüfen lassen.
3. **mailto:/tel:-Race:** Bei `mail_click`/`phone_click` öffnet sofort das Mail-/Telefon-Programm — Event-Flush kann verloren gehen. Mitigation falls Test es bestätigt: Clarity-Event vor `window.location`-Wechsel absichern (Clarity sendet via Beacon, meist ok).

**10-Minuten-Verifikationstest (User):** Auf der Live-Site selbst 1× Telefon-Link klicken, 1× Mail-Link, 1× Test-Formular absenden → 30 Min warten → Clarity-Dashboard → Filter „Custom Events" → prüfen, welche der 3 ankommen. Ergebnis ins Status-Log. Erst danach ggf. Code-Fix.

## 6. Offene To-dos (Reihenfolge)

1. [ ] User: Consent-Entscheidung (A/B/C) — blockiert alles Weitere
2. [ ] User: 10-Min-Clarity-Test (Abschnitt 5)
3. [ ] Draft → Code: gtag + Consent + analytics.ts (nach Entscheidung; 1 Session)
4. [ ] User: Google-Ads-Konto — Conversions anlegen, `AW-`-ID als Secret hinterlegen
5. [ ] Datenschutz.tsx ergänzen (gleicher Push)
6. [ ] UTM-Konvention an Mail-Kampagnen-Verantwortlichen geben
7. [ ] Weekly/Monthly-Cron-Prompts: Paid/Organic-Trennung (wird heute separat angepasst)

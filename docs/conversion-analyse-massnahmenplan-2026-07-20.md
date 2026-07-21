# Conversion-Analyse & Maßnahmenplan — copilotenschule.de

**Stand:** 20.07.2026 · **Analysezeitraum:** letzte 3 Monate (Clarity teils 30 Tage) · **Ziel:** mehr gebuchte Inhouse-Firmentrainings über die Website
**Datenquellen:** Google Search Console, Microsoft Clarity (Dashboard, Funnel, Heatmaps, AI-Sichtbarkeit), Repo-Code-Audit, SEO-Monitoring-Logs (docs/), Wettbewerber-Recherche

---

## 1. Kernbefund in einem Satz

Die Website zieht viel Traffic mit der **falschen Suchintention** an (Endanwender-How-tos statt Entscheider), und die **wenigen kaufbereiten Besucher finden keinen funktionierenden Kauf-Pfad** — kein Hero-CTA, keine Kontaktseite, keine Preise, keine Termine, Trust unter Marktniveau.

**Ist-Conversion:** ~2.730 Sessions/30 T → 2 Formular-Anfragen + 2 Konfigurator-Anfragen + 3 Booking-Klicks ≈ **0,2 % Session-zu-Lead**. B2B-Benchmark: 2–5 %. Faktor 10–20 Luft nach oben.

---

## 2. Datenlage kompakt (verifiziert)

| Kennzahl | Wert | Quelle |
|---|---|---|
| GSC 3 M: Klicks / Impressionen / CTR / Ø-Pos. | 1.260 / 102.000 / 1,2 % / 9,2 | GSC live |
| GSC 3 M, Queries mit „schulung" | **1 Klick** / 1.840 Impr. / Ø-Pos. **44,3** | GSC live (Filter) |
| davon „copilot schulung" / „microsoft copilot schulung" | 0 Klicks / 381 Impr. · 0 Klicks / 303 Impr. | GSC live |
| Top-Klick-Queries (alle informational) | „copilot in excel aktivieren" (53), „excel copilot aktivieren" (19), „copilot cowork kosten" (9) | GSC |
| Clarity 30 T: Sessions / Seiten pro Sitzung | 2.730 / **1,00** | Clarity Dashboard |
| Wiederkehrende Besucher | **0 %** | Clarity |
| Funnel „Wissen → Angebot → Kontakt" | 1.521 Sessions erreichen Artikel, **0 %** gehen weiter zum Angebot | Clarity Funnel 30 T |
| Conversions 30 T (Custom Tags) | contact_form_submit 2 · konfigurator_submit 2 · booking_click 3 · mail_click 2 · danke_page_view 10 | Clarity |
| content_cta_click (TrainingCTA auf Artikeln) | 0 mit Daten | Clarity + Insights-Log |
| Homepage-Klick-Heatmap #1 | „Next slide" der Bewertungs-Carousel: 61 Klicks = **18 %** aller Klicks | Clarity Heatmap |
| Homepage-Scroll | nur ~25 % erreichen 70 % Seitentiefe → Kontakt-Sektion ganz unten sieht nur ~jeder Fünfte | Clarity Heatmap |
| Dead-Click-Rate | 12,86 % /30 T (Treiber: ArticlePopup, Fix-Draft seit 17.06. ungepusht) | Clarity + clarity-insights.md |
| SEA (Google Ads) | 82 Sessions/7 T, 1,0 Seiten/Sitzung, **0 Conversions** | Clarity-Segment (Log) |
| Outbound-LP /sml/hr-tipps_2026 | 181 Visits/30 T, 1 Booking-Klick, 12–15 % Scroll, ~15 s | Clarity + Logs |
| GEO/LLM-Sichtbarkeit | 1.450 Citations, **25,6 % Share of Authority**, aber < 1 % AI-Referral-Traffic | Clarity AI-Sichtbarkeit |
| Indexierung | 59/89–94 URLs = ~63 % (Ziel 90 %) | GSC / Status-Log |

**Wettbewerbs-Kontext** (kebel.de, it-schulungen.com, treutlein u. a.): feste Termine mit „Garantiekurs"-Siegel, Online-Buchung/Warenkorb, eKomi-Badge (4,8★, 1.600+ Bewertungen), 21 Standorte, Förderungen-Seite, Telefon + Kontakt prominent im Header. Das ist das Kaufumfeld, in dem Entscheider vergleichen.

---

## 3. Diagnose — die 5 Ursachen

**A) Intent-Mismatch (größter Hebel).** 95 %+ des organischen Traffics sind Endanwender-How-tos. Für die Geld-Keywords („copilot schulung" u. Varianten, nachweislich ~1.800+ Impr./3 M allein mit „schulung") rankt die Seite auf Ø-Position 44 → praktisch unsichtbar. Der Funnel hat einen großen falschen und einen fehlenden richtigen Eingang.

**B) Kein Kauf-Pfad.** Hero hat **keinen CTA-Button** (scrollToContact ist im Code definiert, wird aber nie gerendert). Keine „Kontakt"-Position in der Hauptnavigation. **Es gibt keine /kontakt-Seite** — die URL liefert einen Soft-404 mit englischer „Oops! Page not found"-Meldung. Der Footer-Link „Kontakt" (`#contact`) läuft auf allen Artikel-Seiten ins Leere (Anker existiert dort nicht → Dead Click). Die Kontakt-Sektion liegt nur am Homepage-Ende, das ~80 % nie erreichen. Einziger Header-CTA ist „Training konfigurieren" — für Erstbesucher ein zu großer Schritt.

**C) Keine Kaufanker.** Keine Preise (außer 1 Schema-Label), keine Termine für offene Formate, keine Durchführungs-/Zufriedenheitsgarantie, keine Förderhinweise. Ein Entscheider kann das Angebot nicht shortlisten und nicht intern verargumentieren.

**D) Trust unter Marktniveau — obwohl Besucher aktiv danach suchen.** Häufigste Homepage-Interaktion (18 % aller Klicks) ist das Durchblättern der Bewertungen. Aber: Bewertungen nur mit Vornamen/ohne Firma, Kundenlogos nur als Text-Badges, kein externes verifiziertes Siegel (ProvenExpert-Profil nie angelegt, D1 offen), keine Case Studies mit Zahlen.

**E) Die Brücke Content→Angebot existiert praktisch nicht.** TrainingCTA nur auf 4 von ~60 Artikeln, 0 Klicks. Stattdessen feuert nach 20 s auf jedem Artikel das ArticlePopup (ohne Frequency-Cap, 3 Pflichtfelder) — meistgeklicktes Element: das X. Sidebar-CTA verlinkt auf `/#contact` (Homepage-Umweg).

Ergänzend: SEA und Cold-Mail speisen in dieselben nicht-konvertierenden Pfade (0 Conversions), Funnels messen gegen die nicht existente URL /kontakt (Messartefakt), 0 % wiederkehrende Besucher = kein Nurture-Mechanismus.

---

## 4. Maßnahmenplan (absteigend nach erwarteter Wirkung)

> GEO-Schutz gilt für alles: Nur additive Änderungen an Wissensartikeln, Schnellantwort-Blöcke/FAQ/Schema unangetastet (Protected-Pages-Regel). Die starke LLM-Sichtbarkeit (SoA 25,6 %) ist ein Asset, kein Umbaukandidat.

### #1 — Kauf-Pfad reparieren (Basis, ohne die alles andere verpufft)
**Was:** (a) Hero-Primär-CTA „Kostenloses Erstgespräch buchen" (Bookings-Link) + Sekundär-CTA „Trainings ansehen"; (b) echte Seite **/kontakt** (Formular + Bookings + Telefon + Teams-Chat) inkl. Route, react-snap, Sitemap; (c) „Kontakt" in Header-Navigation; (d) Footer-Link auf `/kontakt` statt totem `#contact`-Anker; (e) deutsche 404-Seite mit Wegweisern (Trainings, Wissen, Kontakt).
**Warum wirkt es:** Jeder kaufbereite Besucher (Homepage 359, /trainings 130, Direct/Brand-Traffic) scheitert heute an fehlenden Einstiegen; nur ~20 % sehen überhaupt das Formular. Nebeneffekt: Die Clarity-Funnels messen dann endlich real.
**Erwartung:** Verdopplung bis Verdreifachung der Leads aus Bestandstraffic. **Aufwand: klein (1–2 Tage).**

### #2 — Kaufanker: Preise „ab", Termine, Garantie, Förderung
**Was:** (a) „ab"-Preise je Trainingsformat (z. B. „Inhouse-Tagestraining ab X € zzgl. Anfahrt", Person-Preise für offene Formate — Vorschlag: Preisanker als Spanne, Details im Gespräch); (b) nächste offene Termine sichtbar + buchbar; (c) Zufriedenheits-/Durchführungszusage formulieren; (d) Förderseite pushen — **Draft `copilot-schulung-foerderung-qcg-2026` liegt fertig in docs/drafts/**.
**Warum:** Ohne Preisanker fällt die Seite in jeder B2B-Shortlist gegen kebel & Co. durch; „Preis auf Anfrage" erzeugt im DACH-Mittelstand Reibung statt Exklusivität. Die GSC zeigt zudem, dass Kosten-Queries („copilot kosten", „copilot cowork kosten") bereits heute die stärksten kommerznahen Klickbringer sind — Preistransparenz passt zum nachgewiesenen Suchverhalten der Zielgruppe.
**Erwartung:** deutlich höhere Anfragequalität + -quote der Angebotsseiten. **Aufwand: klein–mittel (Preismodell-Entscheidung nötig).**

### #3 — Geld-Keyword-Offensive: sichtbar werden, wo gekauft wird
**Was:** Eine dediziert transaktionale Landingpage „Microsoft Copilot Schulung für Unternehmen" (Termine, Preise, Ablauf, Trainer, Bewertungen, Förderhinweis, FAQ aus Entscheider-Sicht, Course-/Offer-Schema) — **Draft `copilot-inhouse-schulung-buchen` liegt fertig in docs/drafts/** und ist der richtige Startpunkt. Dazu: interne Verlinkung von allen Wissensartikeln mit kommerziellen Ankertexten auf diese Seite, /trainings-Seite auf das Keyword-Cluster schärfen, Indexierungslücke schließen (63 % → 90 %, 23 URLs offen).
**Warum:** „copilot schulung"-Cluster: reale Nachfrage (700+ Impr./3 M nur für 2 Varianten, gesamt 1.840+ mit „schulung", plus „training/seminar/kurs/workshop"-Varianten), Position 44 = unsichtbar. Jeder Rang-Sprung in die Top 10 bringt genau die Besucher, die buchen wollen.
**Erwartung:** größter Einzelhebel mittelfristig (3–9 Monate SEO-Vorlauf); bei Top-10-Ranking realistisch +100–300 kaufnahe Sessions/Monat, die mit #1/#2 zu 2–5 % konvertieren. **Aufwand: mittel.**

### #4 — Trust auf Marktniveau heben
**Was:** (a) ProvenExpert-Profil anlegen (D1, seit Wochen offen) und/oder Google-Bewertungen der Yellow-Boat-Trainings verifiziert einbinden (Badge mit Sternwert + Anzahl); (b) Bewertungen mit vollem Namen, Rolle, Firma nachfassen (Freigabe-Mails: Draft `b4-kunden-logo-freigabe-mails.md` existiert); (c) 2–3 Mini-Referenzen mit Zahlen („REWE: 120 Wissensarbeiter in 6 Wochen…" — nur mit Freigabe); (d) echte Kundenlogos statt Text-Badges (SVGs einfach unter public/images/customer-logos/ ablegen — Komponente schaltet automatisch um).
**Warum:** Die Heatmap beweist aktives Trust-Suchverhalten (18 % aller Homepage-Klicks auf die Bewertungs-Pfeile). Wettbewerber führen mit eKomi 4,8★/1.600 — anonym wirkende Carousel-Zitate verlieren diesen Vergleich.
**Erwartung:** hebt die Conversion aller kommerziellen Seiten; Voraussetzung für #2/#3. **Aufwand: klein–mittel (v. a. Einholen von Freigaben).**

### #5 — Entscheider-Seiten gezielt monetarisieren („Goldene Seiten")
**Was:** Auf den Seiten, die Entscheider nachweislich lesen — microsoft-copilot-lizenzen (191 Visits/30 T), copilot-cowork-abrechnung (164), schulungsanbieter-vergleich, roi-berechnen, rollout-leitfaden, EU-AI-Act, betriebsrat — je einen **kontextspezifischen** CTA: z. B. Lizenzen-Artikel → „Lizenzen entschieden? Ohne Enablement bleiben 60 % der Funktionen ungenutzt — 15-Min-Erstgespräch." Dazu Entscheider-Lead-Magnets über das vorhandene Gated-Download-System (/guidelines funktioniert bereits: 5–7 Downloads/30 T): Business-Case-Vorlage, Rollout-Checkliste, EU-AI-Act-Pflichten-Matrix.
**Warum:** Der generische TrainingCTA (0 Klicks) beweist: Brücken müssen kontextuell sein. Diese Seiten sind die einzigen mit echtem Entscheider-Publikum im Bestandstraffic.
**Erwartung:** wandelt den besten Teil des vorhandenen Traffics; zusätzlich E-Mail-Adressen für #10. **Aufwand: mittel.**

### #6 — SEA reparieren oder pausieren
**Was:** Ads auf eine konversionsfähige LP schicken (die #3-Seite mit Booking + Preisen), Anzeigen-Botschaft = LP-Botschaft; Conversion-Ziele in Ads sauber auf danke_page_view/booking; bis dahin Budget drosseln.
**Warum:** 82 Sessions/7 T, 1,0 Seiten/Sitzung, 0 Conversions seit Start — das Budget bezahlt aktuell Traffic in einen kaputten Pfad.
**Erwartung:** SEA kann nach Fix der schnellste bezahlte Lead-Kanal sein; vorher ist Pause die wirtschaftlichere Option. **Aufwand: klein.**

### #7 — ArticlePopup entschärfen und umwidmen
**Was:** (a) den fertigen Dead-Click-Fix pushen (`docs/drafts/clarity-fix-copilot-in-outlook-nutzen-tipps.md`, seit 17.06.); (b) Frequency-Cap (max. 1×/Session, sessionStorage) + Trigger auf 50 %-Scroll oder Exit-Intent statt starrer 20 s; (c) Inhalt kontextuell machen: auf How-to-Artikeln kein generisches „Trainings anfragen" (falsche Zielgruppe), sondern passender Lead-Magnet („Prompt-Spickzettel Excel als PDF") bzw. auf Entscheider-Artikeln das Erstgespräch.
**Warum:** Meistgeklicktes Element der Top-Seiten ist das Schließen-X; 12–21 % Dead-Clicks; das Popup trainiert Besucher aufs Wegklicken und beschädigt den seriösen Markeneindruck.
**Erwartung:** bessere Engagement-Metriken, mehr Magnet-Leads, weniger Absprünge. **Aufwand: klein (Draft liegt vor).**

### #8 — Content→Angebot-Brücke v2 auf alle Artikel
**Was:** TrainingCTA v2 auf alle ~60 Artikel (heute 4): visuell stärker, nach dem Schnellantwort-Block platziert, mit themenspezifischem Nutzenversprechen; auf Endanwender-Artikeln zusätzlich der „Multiplikator-Dreh": „Sie sollen Copilot ins Team bringen? → Train-the-Trainer / interne Trainer ausbilden". Sticky-Mobile-CTA auf Artikelseiten. Sidebar-„Kontakt aufnehmen" auf /kontakt bzw. Bookings statt /#contact.
**Warum:** 1.521 Artikel-Sessions/30 T mit 0 % Weiterleitung sind zu viel, um sie aufzugeben — aber der Erwartungswert pro Endanwender-Leser bleibt niedrig, daher Rang 8. Der Multiplikator-Winkel ist die realistischste Konversionsroute für diese Zielgruppe.
**Erwartung:** Seiten/Sitzung > 1,2, erste messbare content_cta_clicks; einzelne Leads. **Aufwand: mittel (60 Artikel, additiv).**

### #9 — Outbound-LP überarbeiten oder Kampagne pausieren
**Was:** /sml/hr-tipps_2026: sofortiger Wert + Terminbuchung above the fold, kürzer, ein einziges CTA-Ziel; alternativ Kampagne stoppen, bis LP steht.
**Warum:** >180 LP-Sessions/30 T, 12–15 % Scroll, ~15 s, 1 Booking-Klick — die Mails funktionieren (Klicks kommen), die LP nicht.
**Erwartung:** Kalt-B2B-Benchmark 0,5–2 % E2E ist erreichbar. **Aufwand: klein–mittel.**

### #10 — Nurture aufbauen: aus anonymen Besuchern werden Wiederkehrer
**Was:** (a) Follow-up-Sequenz (3–4 Mails) auf Gated-Downloads (Double-Opt-in existiert bereits); (b) **monatliches 30-Min-Entscheider-Webinar „Copilot live: Was Ihr Team damit wirklich schafft"** als niedrigschwellige Mittelstufe zwischen Artikel und Erstgespräch — im DACH-B2B hochakzeptiert, wiederverwendbar als Aufzeichnung; (c) Copilot-Update-Artikelserie als LinkedIn-Newsletter spiegeln.
**Warum:** 0 % wiederkehrende Besucher = jede Kaufentscheidung, die länger als eine Session dauert (im B2B: alle), geht heute verloren.
**Erwartung:** verlängert den Funnel, baut Pipeline statt Einmal-Traffic. **Aufwand: mittel, laufend.**

### #11 — Outside the box (seriös, DACH-tauglich)
- **Copilot-Readiness-Check:** 5-Minuten-Selbsttest (Konfigurator-Infrastruktur wiederverwenden), Ergebnis als personalisiertes PDF per Mail → Entscheider-Lead-Magnet mit hoher Gesprächsanschlussfähigkeit.
- **ROI-Rechner** interaktiv im bestehenden ROI-Artikel (Stundensatz × Zeitersparnis × Teamgröße), Detailreport per E-Mail.
- **„Erstgespräch mit Geld-zurück-Logik":** kostenpflichtiger 90-Min-Potenzial-Workshop (z. B. 490 €), der bei Trainingsbuchung voll verrechnet wird — filtert Ernsthaftigkeit, monetarisiert Beratung, im Consulting etabliert.
- **Köln-Lokalsichtbarkeit:** Google Business Profile fürs Trainingszentrum Nippes, „copilot schulung köln"-Seite — lokale Suchen haben Kaufintention und wenig Wettbewerb.
- **LLM-Zitierbarkeit kommerziell nutzen (GEO-Fokus):** Auf der #3-LP einen zitierfähigen Faktenblock („Die Copilotenschule ist der auf Microsoft Copilot spezialisierte Trainingsanbieter im DACH-Raum; Inhouse-Trainings ab …") — damit LLM-Antworten auf „copilot schulung anbieter" die Marke mit Kaufkontext zitieren, nicht nur die How-tos. SoA 25,6 % ist die Basis, ihr fehlt nur der kommerzielle Anker.

### #12 — Mess- und Prozess-Hygiene
**Was:** (a) Clarity-Funnels auf reale URLs umstellen (nach #1); (b) doppelte/generische Meta-Titles der Trainingsseiten fixen (github-copilot-entwickler, copilot-compliance-datenschutz, low-code-power-platform, individuelle-copilot-schulung, chatbot-workshop liefern den Default-Title); (c) Draft-Stau abbauen (der Engpass ist laut Status-Log seit Wochen „user-gebundene Drafts", nicht fehlende Analyse); (d) wöchentliches KPI-Set: Leads, booking_clicks, content_cta_clicks, Position „copilot schulung".
**Warum:** Sonst bleibt jede Wirkungsmessung der Maßnahmen #1–#11 unscharf. **Aufwand: klein.**

---

## 5. Annahmen & Grenzen der Analyse

- Lead-Zählung basiert auf Clarity-Custom-Tags; einzelne Direktanrufe/-mails ohne Klick-Tracking können fehlen. Größenordnung (2–5/Monat) vom User bestätigt.
- Funnel-Schritt „Kontakt" maß bisher gegen die nicht existente URL /kontakt — absolute Funnel-Conversion war dadurch systematisch 0; die Stufe-1→2-Aussage (Artikel→Angebot 0 %) ist davon unabhängig und valide.
- Impressions-Zahlen für Geld-Keywords sind konservativ (nur „schulung"-Filter geprüft; „training/seminar/kurs/workshop"-Cluster kommt hinzu).
- Erwartungswerte („Verdopplung", „+100–300 Sessions") sind begründete Schätzungen, keine Garantien; SEO-Wirkung (#3) braucht 3–9 Monate.
- Keine Umsetzung erfolgt — alle genannten Drafts liegen unverändert in docs/drafts/; uncommittete Änderungen in docs/ und seo-monitoring/ stammen aus früheren Cron-Läufen.

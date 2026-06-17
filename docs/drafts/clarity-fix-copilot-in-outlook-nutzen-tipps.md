# Clarity Dead-Click-Fix — `/wissen/copilot-in-outlook-nutzen-tipps`

**Erstellt:** 2026-06-17 (autonomer Cron `copilotenschule-seo-clarity-fix-copilot-in-outlook-nutzen-tipps`)
**Status:** Fix vorgeschlagen — **kein Code gepusht, kein src/ verändert.** Reine Draft-/Reviewvorlage.
**Quelle des Issues:** Heatmap-Drilldown 10.06.2026 (Clarity-Projekt wxppg5394j), Eintrag in `docs/clarity-insights.md` (2026-06-10).

---

## TL;DR

Die beiden im Heatmap-Drilldown gemeldeten Dead-Click-Treiber — `svg.lucide.lucide-x[1]` (8 Klicks / 22,86 %) und `DIV.absolute.backdrop-blur-sm[1]` (2 Klicks) — gehören **nicht** zum Artikel-TSX, sondern zur **globalen Komponente `src/components/ArticlePopup.tsx`**, einem Lead-Gen-Popup, das nach 20 Sekunden auf **jeder** Wissensseite erscheint (eingehängt in `ContentLayout.tsx`, Zeile 238).

**Wichtige Korrektur zur bisherigen Hypothese (10.06.):** Das X-Icon ist **kein** funktionsloses Icon und der Backdrop fängt Klicks **nicht** wirkungslos ab. Beide haben einen funktionierenden `onClick={handleClose}`. Das Popup schließt sich bei Klick auf das X **und** bei Klick auf den Backdrop korrekt. Die Dead-Click-Meldung hat andere, subtilere Ursachen (siehe Diagnose).

**Vorgeschlagener Fix (3 kleine, risikoarme Änderungen in `ArticlePopup.tsx`):**
1. `pointer-events-none` auf das `<X>`-SVG → der Klick landet immer auf dem `<button>` (echtes interaktives Element), nicht auf dem `svg.lucide-x`, das Clarity sonst als Nicht-Navigations-Ziel protokolliert.
2. Hit-Area des Schließen-Buttons auf 44×44 px vergrößern (Touch-Target-Guideline) → weniger Fehl-/Mehrfach-Taps auf Mobile.
3. Während der 300-ms-Schließanimation den Overlay-Wrapper `pointer-events-none` setzen → Klicks im Ausblend-Fenster werden nicht erneut als (scheinbar wirkungslose) Klicks registriert.

**Backdrop bleibt dismissibel** (NICHT auf `pointer-events-none` setzen — das würde „Klick-außerhalb-schließt" zerstören).

**Strategische Empfehlung (separat, NICHT im Code-Diff enthalten):** Das eigentliche Anti-Pattern ist, dass auf der Top-Traffic-Seite die #1-Interaktion „Popup schließen" ist. Frequency-Capping + sanfterer Trigger senken die Dead-Click-Rate nachhaltiger als der reine UI-Fix. Details unten.

---

## 1. Fundort

| Was | Wo |
|-----|-----|
| Route | `src/App.tsx:119` → `<Route path="/wissen/copilot-in-outlook-nutzen-tipps" element={<CopilotInOutlook />} />` |
| Artikel-Seite | `src/pages/CopilotInOutlook.tsx` — enthält **kein** `lucide-x` und **kein** `backdrop-blur`. |
| **Tatsächliches Element** | `src/components/ArticlePopup.tsx` — `<X>` (Zeile 122) + Backdrop-Div (Zeile 105–108) |
| Einhängung (global) | `src/components/ContentLayout.tsx:4` (Import) + `:238` (`<ArticlePopup />`) |

> ⚠️ **Scope-Hinweis:** `ArticlePopup` ist eine **geteilte, globale** Komponente. Sie wird über `ContentLayout` auf **allen** Seiten gerendert, die dieses Layout nutzen (sämtliche `/wissen/*`-Artikel u. a.). Der Fix wirkt also **site-weit**, nicht nur auf der Outlook-Seite. Das ist erwünscht (das Popup verhält sich überall gleich), muss aber bewusst freigegeben werden.

---

## 2. Diagnose

### Ist-Verhalten (aus dem Quellcode verifiziert)

```tsx
// Backdrop — Zeile 105–108: HAT einen funktionierenden Schließen-Handler
<div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

// Schließen-Button — Zeile 117–123: HAT einen funktionierenden Schließen-Handler
<button onClick={handleClose} className="absolute top-4 right-4 p-1.5 rounded-full ..." aria-label="Schließen">
  <X className="w-5 h-5 text-gray-500" />
</button>

// handleClose — Zeile 30–36: setzt erst isClosing (Fade), entfernt das Element erst nach 300 ms
const handleClose = () => {
  setIsClosing(true);
  setTimeout(() => { setIsVisible(false); setIsClosing(false); }, 300);
};
```

**Beide Elemente schließen das Popup korrekt.** Die ursprüngliche Hypothese („X ohne sinnvolle Funktion", „Backdrop fängt Klicks ab ohne zu schließen") trifft so nicht zu.

### Warum Clarity sie trotzdem als Dead-Clicks meldet bzw. warum sie die Heatmap dominieren

1. **SVG ist das protokollierte Klick-Ziel, nicht der Button.** Das `<X>`-SVG hat kein `pointer-events-none`, also ist der tiefste getroffene Knoten das `svg.lucide-x`. Der Handler liegt aber auf dem **Eltern-`<button>`**. Clarity attribuiert den Klick dem SVG (= ein Element ohne eigenen Handler) — exakt das Muster, das Clarity als „Dead Click" / Nicht-Navigations-Ziel klassifiziert. (Funktional schließt der gebubbelte Klick das Popup trotzdem.)

2. **300-ms-Fade wirkt wie eine Nicht-Reaktion.** `handleClose()` startet nur eine Opacity-Transition und lässt das Overlay (`fixed inset-0 z-50`) noch 300 ms im DOM und über dem Viewport. Eine reine Opacity-Änderung ohne sofortige Layout-/Navigationsänderung am Klick-Ziel triggert die Dead-Click-Heuristik — und ungeduldige Nutzer klicken in diesem Fenster ein zweites/drittes Mal aufs X, was die Klickzahl zusätzlich aufbläht.

3. **Kleines Touch-Target.** `p-1.5` (6 px) um ein `w-5 h-5`-Icon (20 px) ≈ **32 px** Trefferfläche — unter der 44-px-Empfehlung. Auf Mobile → Fehl-Taps und Wiederholungsklicks.

4. **Eigentliche Ursache (Verhalten, nicht UI-Bug):** Ein Lead-Gen-Interstitial erscheint nach 20 s automatisch auf der meistbesuchten Seite. Die häufigste Nutzeraktion der Seite ist folglich „dieses Popup wegklicken" (22,86 % aller Klicks aufs X + Backdrop-Klicks). Selbst mit perfekten Handlern ist das ein negatives Engagement-Signal und der Haupttreiber, der die Dead-Click-Rate von 11 % auf 21,4 % (3T) gezogen hat.

---

## 3. Code-Diff (Vorschlag) — `src/components/ArticlePopup.tsx`

> Nur Klassen-/Markup-Änderungen + eine 1-Zeilen-Ergänzung in `handleClose`. Keine neuen Imports, keine geänderten Typen, keine API-Änderung.

### Änderung A — Overlay-Wrapper während des Schließens nicht-interaktiv machen

```diff
   return (
     <div
-      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
-        isClosing ? "opacity-0" : "opacity-100"
-      }`}
+      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
+        isClosing ? "opacity-0 pointer-events-none" : "opacity-100"
+      }`}
     >
```

*Wirkung:* Im 300-ms-Ausblendfenster schluckt das Overlay keine weiteren Klicks mehr → keine wiederholten „Dead Clicks" auf X/Backdrop während des Schließens.

### Änderung B — Backdrop: dismissibel lassen, aber als Klick-Ziel klar kennzeichnen

```diff
       {/* Backdrop */}
       <div
-        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
+        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
         onClick={handleClose}
+        aria-hidden="true"
       />
```

*Wirkung:* `onClick={handleClose}` bleibt erhalten (Klick-außerhalb-schließt = gewolltes, valides Verhalten). `cursor-pointer` signalisiert die Klickbarkeit; `aria-hidden` markiert den Backdrop als rein dekorativ für Screenreader.
**Bewusst NICHT gemacht:** `pointer-events-none` auf dem Backdrop — das würde das Schließen-durch-Außenklick entfernen.

### Änderung C — Schließen-Button: 44px-Hit-Area + SVG als Klick-Durchreiche

```diff
         {/* Close Button */}
         <button
           onClick={handleClose}
-          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-10"
-          aria-label="Schließen"
+          className="absolute top-2.5 right-2.5 inline-flex items-center justify-center w-11 h-11 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 transition-colors z-10"
+          aria-label="Popup schließen"
         >
-          <X className="w-5 h-5 text-gray-500" />
+          <X className="w-5 h-5 pointer-events-none" />
         </button>
```

*Wirkung:*
- `w-11 h-11` (= 44×44 px) + `inline-flex items-center justify-center` → konforme Touch-Trefferfläche, das 20-px-Icon bleibt optisch zentriert/gleich groß.
- `pointer-events-none` am `<X>` → der getroffene Knoten ist immer der `<button>` mit Handler; Clarity protokolliert den Klick nicht mehr auf dem `svg.lucide-x`.
- `text-gray-500` wandert auf den Button (greift via `currentColor` aufs Icon), zusätzlich `hover:text-gray-700` als Feedback.

### Optional (Änderung D) — Schließen wahrnehmbar sofortiger machen

Falls die Fade-bedingte „Nicht-Reaktion" weiter auffällt, kann das Overlay bereits beim Klick `pointer-events-none` haben (durch A abgedeckt) **oder** die Animationsdauer auf 150 ms verkürzt werden (`duration-300` → `duration-150` an Wrapper und Modal, `setTimeout(..., 300)` → `150`). Niedrig-Risiko, aber spürbarer.

---

## 4. Strategische Empfehlung (separat — NICHT Teil des UI-Diffs oben)

Der UI-Fix beseitigt die Fehlklassifikation und verbessert die Bedienbarkeit. Den **eigentlichen** Treiber (auf der Top-Seite ist „Popup schließen" die häufigste Aktion) adressiert er nur indirekt. Nachhaltiger:

1. **Frequency-Capping per `sessionStorage`** — Popup pro Session nur einmal zeigen und nach einem Dismiss nicht erneut. Senkt Schließen-Klicks direkt.

   ```tsx
   // useEffect: nicht starten, wenn in dieser Session bereits gezeigt/geschlossen
   useEffect(() => {
     if (sessionStorage.getItem("articlePopupDismissed")) return;
     const timer = setTimeout(() => setIsVisible(true), POPUP_DELAY_MS);
     return () => clearTimeout(timer);
   }, []);

   // in handleClose nach dem Schließen:
   sessionStorage.setItem("articlePopupDismissed", "1");
   ```
   *(In der echten React-App ist `sessionStorage` zulässig — das Verbot betrifft nur Claude.ai-Artifacts.)*

2. **Sanfterer Trigger** statt fixer 20-s-Timer: Scroll-Tiefe (z. B. > 50 %) oder Exit-Intent. Zeigt das Popup nur bei echtem Lese-Engagement → weniger reflexartiges Wegklicken.

3. **Optional: Top-Ranking-/Protected-Seiten ausnehmen.** Auf den stärksten organischen Einstiegsseiten kann ein sofort weggeklicktes Interstitial das Engagement-Signal verschlechtern. Erwägen, das Popup dort später/nicht zu zeigen. (Liste siehe `docs/protected-pages.md`.)

> Diese drei Punkte ändern das Lauf-Verhalten des Popups site-weit und sollten als **eigene** Entscheidung/PR behandelt werden, nicht zusammen mit dem reinen Dead-Click-UI-Fix.

---

## 5. Build- & Risiko-Check

- **Baubarkeit (gedanklicher Check):** Reine Tailwind-Klassen + ein `pointer-events-none` + eine Zeile in `handleClose`. Keine neuen Imports, kein geänderter TypeScript-Typ, keine geänderte Prop-Signatur → kann den Build nicht brechen. Alle verwendeten Utilities (`pointer-events-none`, `w-11`, `h-11`, `inline-flex`, `cursor-pointer`) sind bereits an anderer Stelle im Repo in Verwendung (u. a. `ArticlePopup.tsx` nutzt schon `h-11`), d. h. die Tailwind-Konfiguration deckt sie ab.
- **Voller Prerender-Build NICHT ausgeführt:** Dieser Cron hat bewusst **kein** `src/` verändert (Draft-only). Ein Build ohne angewandte Änderung würde den Vorschlag ohnehin nicht testen. Nach Anwenden des Diffs lokal verifizieren mit:
  ```bash
  npm run build:prerender    # bzw. schnell: npx vite build --outDir /tmp/dist-test
  ```
- **Protected Page?** **Nein** — `/wissen/copilot-in-outlook-nutzen-tipps` steht nicht in `docs/protected-pages.md`. Trotzdem gilt: **Title, H1, Meta-Description, Canonical werden NICHT verändert** — der Fix betrifft ausschließlich eine UI-Overlay-Komponente, kein SEO-relevantes Markup.
- **SEO-Wirkung:** keine. Das Popup ist clientseitiges Verhalten, nicht im pre-gerenderten Initial-HTML conversionrelevant; keine Änderung an Schema/Meta/Routing.
- **CLAUDE.md-Konformität:** keine destruktiven Git-Ops, kein Push, kein Secret. Nur Draft + Doku-Logs geschrieben.

### Hinweis: vorbestehende uncommittete Änderungen im Repo
`git status` zeigt **fremde, nicht von diesem Cron stammende** Änderungen:
`D public/images/copilot-cowork-credits-timeline.png` und `M src/pages/CopilotCoworkAbrechnungCredits.tsx`.
Diese wurden **nicht angefasst**. Vor dem Anwenden dieses Fixes sollte der User klären, ob diese committet oder verworfen werden (CLAUDE.md: „Vor jeder Arbeit … bei Änderungen User fragen").

---

## 6. Umsetzungs-Checkliste (für den User, wenn freigegeben)

1. Diff aus Abschnitt 3 in `src/components/ArticlePopup.tsx` anwenden (Änderungen A–C; D optional).
2. `npm run dev` → Popup nach 20 s testen: X klicken (schließt sofort, Hover-Feedback), Außenklick (schließt), Doppelklick im Fade-Fenster (keine Doppelreaktion).
3. `npm run build:prerender` lokal grün.
4. Optional: strategische Maßnahmen (Abschnitt 4) als separaten PR.
5. Commit via GitHub Desktop (Claude pusht nicht selbst).
6. Nach Deploy: Clarity-Heatmap der Seite in ~3–7 Tagen erneut prüfen → Dead-Click-Anteil auf `svg.lucide-x`/Backdrop sollte deutlich fallen.

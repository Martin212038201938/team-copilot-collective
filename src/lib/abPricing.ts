/**
 * A/B-Test "Preise auszeichnen ja/nein" — BEENDET am 14.08.2026
 * -------------------------------------------------------------
 * Laufzeit 21.07.–14.08.2026. Ergebnis: abgebrochen, Variante B (Preise sichtbar)
 * dauerhaft übernommen.
 *
 * Begründung:
 *  - Statistisch aussichtslos: ~40 Sessions/Woche über beide Varianten, 0 Conversions
 *    in beiden Armen. Ein belastbares Ergebnis hätte Monate gebraucht.
 *  - SEO-Schaden: Die B-Routen (/trainings/preis/:slug) waren nicht pre-gerendert und
 *    lieferten im initialen HTML den Homepage-Head samt Canonical auf die Startseite;
 *    das noindex entstand erst per JavaScript. Der Prerender-Guard erkannte nur
 *    "ReactSnap", nicht Googlebot – der konnte auf die noindex-Route umgeleitet werden.
 *    Folge: train-the-trainer-copilot fiel von 17 auf 0–1 Impressionen pro Woche.
 *
 * Diese Datei ist absichtlich leer und bleibt als Hinweis erhalten, damit die
 * Entscheidung nachvollziehbar ist. Preise laufen jetzt ausschließlich über
 * `visiblePrice` in src/data/trainings.ts (sichtbar + maschinenlesbar im Schema).
 * Alte B-URLs werden per 301 in public/.htaccess auf die reguläre Trainingsseite
 * zurückgeführt.
 */

export {};

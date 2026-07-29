import type { DeckSlideContent } from "./deckContent";

/**
 * Sprachliche Anpassungen an der Designvorlage.
 *
 * Warum getrennt von deckContent.ts: Diese Datei wird automatisch aus
 * "Business Case Copilot.dc.html" erzeugt. Änderungen dort gingen beim nächsten
 * Extrahieren verloren. Hier stehen die bewussten Abweichungen explizit und
 * überprüfbar an einer Stelle.
 *
 * Anlass: Die Vorlage kennt nur EINE Nutzergruppe mit einheitlichem Zielwert. Das Modell
 * unterscheidet inzwischen zwischen lizenzierten Copilot-Nutzern (voller Zielwert, volle
 * Lernreise) und Microsoft-365-Nutzern, die nur Copilot Chat verwenden (deutlich
 * niedrigerer Zielwert, nur Kick-off). Formulierungen wie „alle geschulten Personen“ oder
 * „8 Std. Zielwert je Person“ wären damit schlicht falsch.
 *
 * Ersetzt wird über exakte Textgleichheit — passt ein Eintrag nicht mehr, weil die Vorlage
 * sich geändert hat, greift er einfach nicht und der Originaltext bleibt stehen. Der Test
 * in __tests__/deckContentOverrides.test.ts schlägt in diesem Fall an.
 */
export type DeckOverride = {
  slide: number;
  from: string;
  to: string;
};

export const DECK_OVERRIDES: DeckOverride[] = [
  // --- Folie 02: Executive Summary, Block "Annahmen" ------------------------
  {
    slide: 2,
    from: "8 Std. Zielwert je Person und Monat über eine Anlaufkurve ab 60 %. Kein agentisches Zusatzpotenzial eingerechnet.",
    to: "{{ nutzenbasisText }} Beide Gruppen folgen derselben Anlaufkurve ab 60 %. Kein agentisches Zusatzpotenzial eingerechnet.",
  },

  // --- Folie 12: Szenarien-Tabelle -----------------------------------------
  // Die Zeile "Ziel-Zeitersparnis je Person" gilt nur für lizenzierte Nutzer.
  {
    slide: 12,
    from: "Ziel-Zeitersparnis je Person",
    to: "Ziel-Zeitersparnis je lizenzierter Person",
  },
  {
    slide: 12,
    from: "Für alle geschulten Personen wird eine durchschnittliche Zeitersparnis angesetzt — keine künstliche Adoptionsquote. Grundlage sind die Forrester-Werte.",
    to:
      "Die Szenarien unterscheiden sich allein in der angesetzten Zeitersparnis lizenzierter Nutzer, " +
      "nicht in einer Adoptionsquote. Grundlage ist die Forrester-Studie „Total Economic Impact of " +
      "Microsoft 365 Copilot“. {{ nutzenbasisText }}",
  },

  // --- Folie 11: Herleitung des Nutzens ------------------------------------
  {
    slide: 11,
    from: "Im ersten Jahr werden durchschnittlich {{ hoursY1 }} brutto je Person und Monat angesetzt — nach einem Startniveau von 60 % direkt nach dem Kick-off.",
    to:
      "Im ersten Jahr werden durchschnittlich {{ hoursY1 }} brutto je lizenzierter Person und Monat " +
      "angesetzt — nach einem Startniveau von 60 % direkt nach dem Kick-off. {{ nutzenbasisText }}",
  },
];

/** Wendet die Overrides auf eine Folie an. Unbekannte Texte bleiben unverändert. */
export function applyOverrides(slide: DeckSlideContent): DeckSlideContent {
  const relevant = DECK_OVERRIDES.filter((o) => o.slide === slide.nr);
  if (relevant.length === 0) return slide;

  return {
    ...slide,
    items: slide.items.map((item) => {
      const match = relevant.find((o) => o.from === item);
      return match ? match.to : item;
    }),
  };
}

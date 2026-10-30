/**
 * Selbstauskunft „Wie haben Sie uns gefunden?“ für Kontaktformular und Konfigurator.
 *
 * Funktioniert ohne Cookie-Einwilligung und auch für spätere Bookings-Termine, die über
 * die E-Mail zugeordnet werden. Ergänzt die Klick-Attribution (lib/attribution.ts),
 * ersetzt sie nicht: Ob jemand über eine Anzeige oder ein normales Suchergebnis kam,
 * wissen Besucher oft nicht. Das SEA-Cockpit kombiniert beides.
 *
 * Die Werte werden 1:1 in die Benachrichtigungsmail (Zeile „Gefunden über: …“) und von
 * dort in die Trello-Karte übernommen. api/send-contact-email.php prüft gegen dieselbe
 * Liste, also bei Änderungen beide Stellen anpassen.
 */
export const FOUND_VIA_OPTIONS = [
  "Google-Suche",
  "Bing-Suche",
  "ChatGPT, Copilot oder andere KI",
  "LinkedIn",
  "Empfehlung",
  "Veranstaltung oder Vortrag",
  "Wir kennen uns bereits",
  "Sonstiges",
] as const;

export type FoundVia = (typeof FOUND_VIA_OPTIONS)[number] | "";

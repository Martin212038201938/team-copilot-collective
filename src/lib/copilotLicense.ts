/**
 * Pflichtangabe „Welche Copilot-Version soll geschult werden?“ für Kontaktformular und Konfigurator.
 *
 * Die Werte werden 1:1 in die Benachrichtigungsmail (Zeile „Copilot-Lizenz: …“) und von dort
 * in die Trello-Karte übernommen. api/send-contact-email.php prüft gegen dieselbe Liste,
 * also bei Änderungen beide Stellen anpassen.
 */
export const COPILOT_LICENSE_OPTIONS = [
  "Copilot Chat (kostenlos in Microsoft 365)",
  "Microsoft 365 Copilot (kostenpflichtige Lizenz pro Nutzer)",
  "Gemischt oder noch unklar",
] as const;

export type CopilotLicense = (typeof COPILOT_LICENSE_OPTIONS)[number] | "";

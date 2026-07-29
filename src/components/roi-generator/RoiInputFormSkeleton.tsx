/**
 * Platzhalter, der im vorgerenderten HTML anstelle der Eingabemaske steht.
 *
 * Warum kein fertiges Formular: Die vorgerenderte Seite ist da, bevor React übernimmt.
 * Ein echtes Eingabefeld wäre in dieser Lücke bedienbar, die Eingabe ginge beim
 * Hydratisieren aber verloren. Der Platzhalter zeigt dieselbe Anordnung, nimmt aber
 * bewusst nichts entgegen — sichtbar am gedimmten Absenden-Feld und am Ladehinweis.
 *
 * Die Maße entsprechen der echten Maske, damit beim Umschalten nichts springt.
 */
const Field = ({ label, hint }: { label: string; hint?: string }) => (
  <div className="space-y-1.5">
    <span className="block text-sm font-medium">{label}</span>
    <div className="h-10 w-full rounded-md border border-input bg-muted/40" aria-hidden="true" />
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
  </div>
);

const RoiInputFormSkeleton = () => (
  <div className="space-y-5" aria-busy="true" aria-live="polite">
    <Field label="Unternehmensname" />

    <div className="grid md:grid-cols-2 gap-5">
      <Field
        label="Microsoft-365-Nutzer insgesamt"
        hint="Alle Beschäftigten mit Microsoft 365 — sie können Copilot Chat bereits ohne Lizenz nutzen."
      />
      <Field
        label="Davon mit Microsoft-365-Copilot-Lizenz"
        hint="Personen mit kostenpflichtiger Lizenz und vollständiger Lernreise."
      />
      <Field label="Vollkosten-Stundensatz (€)" />
      <Field label="Lizenzpreis pro Nutzer/Monat (€)" />
    </div>

    <div className="h-11 w-full md:w-56 rounded-md bg-muted" aria-hidden="true" />

    <p className="text-xs text-muted-foreground">Der Rechner wird geladen …</p>
  </div>
);

export default RoiInputFormSkeleton;

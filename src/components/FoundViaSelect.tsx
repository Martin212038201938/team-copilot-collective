import { FOUND_VIA_OPTIONS, type FoundVia } from "@/lib/foundVia";

interface FoundViaSelectProps {
  id?: string;
  value: FoundVia;
  onChange: (value: FoundVia) => void;
  required?: boolean;
  className?: string;
}

/** Auswahlfeld „Wie haben Sie uns gefunden?“, optisch wie die übrigen Eingabefelder. */
const FoundViaSelect = ({ id = "foundVia", value, onChange, required = false, className = "" }: FoundViaSelectProps) => (
  <select
    id={id}
    name="foundVia"
    value={value}
    required={required}
    onChange={(e) => onChange(e.target.value as FoundVia)}
    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base md:text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${value ? "" : "text-muted-foreground"} ${className}`}
  >
    <option value="" disabled>
      Bitte auswählen
    </option>
    {FOUND_VIA_OPTIONS.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);

export default FoundViaSelect;

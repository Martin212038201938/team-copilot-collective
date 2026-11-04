import { COPILOT_LICENSE_OPTIONS, type CopilotLicense } from "@/lib/copilotLicense";

interface CopilotLicenseSelectProps {
  id?: string;
  value: CopilotLicense;
  onChange: (value: CopilotLicense) => void;
  required?: boolean;
  className?: string;
}

/** Auswahlfeld „Welche Copilot-Version soll geschult werden?“, optisch wie die übrigen Eingabefelder. */
const CopilotLicenseSelect = ({ id = "copilotLicense", value, onChange, required = false, className = "" }: CopilotLicenseSelectProps) => (
  <select
    id={id}
    name="copilotLicense"
    value={value}
    required={required}
    onChange={(e) => onChange(e.target.value as CopilotLicense)}
    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base md:text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${value ? "" : "text-muted-foreground"} ${className}`}
  >
    <option value="" disabled>
      Bitte auswählen
    </option>
    {COPILOT_LICENSE_OPTIONS.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);

export default CopilotLicenseSelect;

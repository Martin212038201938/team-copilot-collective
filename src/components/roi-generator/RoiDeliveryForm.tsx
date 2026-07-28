import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { trackConversion, markConvertedSession } from "@/lib/analytics";
import type { RoiBusinessCase } from "@/lib/roi/types";
import {
  ROI_INDUSTRIES,
  ROI_GOALS,
  ROI_ADOPTION_STAGES,
  type RoiIndustry,
  type RoiGoal,
  type RoiAdoptionStage,
} from "@/lib/roi/context";
import { buildDeterministicCopy } from "@/lib/roi/deterministicCopy";
import { createRoiBusinessCaseDeck } from "@/lib/pptx/createRoiBusinessCaseDeck";
import { fetchCompanyProfile } from "@/lib/roi/companyProfileClient";

type Props = {
  businessCase: RoiBusinessCase;
  /** Gesamtzahl Microsoft-365-Nutzer aus Schritt 1 – reiner Kontext, keine Rechengröße. */
  m365Users: number;
};

const RoiDeliveryForm = ({ businessCase, m365Users }: Props) => {
  const { toast } = useToast();
  const renderedAtRef = useRef<number>(Date.now());

  const [contactName, setContactName] = useState("");
  const [contactRole, setContactRole] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);

  const [industry, setIndustry] = useState<RoiIndustry | "">("");
  const [goals, setGoals] = useState<RoiGoal[]>([]);
  const [adoptionStage, setAdoptionStage] = useState<RoiAdoptionStage | "">("");

  const [step, setStep] = useState<"idle" | "researching" | "building" | "uploading" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    renderedAtRef.current = Date.now();
  }, []);

  const toggleGoal = (goal: RoiGoal) => {
    setGoals((prev) => (prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim()) {
      toast({ title: "Name erforderlich", description: "Bitte geben Sie Ihren Namen an.", variant: "destructive" });
      return;
    }
    if (!email) {
      toast({ title: "E-Mail erforderlich", description: "Bitte geben Sie Ihre E-Mail-Adresse ein.", variant: "destructive" });
      return;
    }
    if (!consent) {
      toast({ title: "Einwilligung erforderlich", description: "Bitte bestätigen Sie die Einwilligung zur Kontaktaufnahme.", variant: "destructive" });
      return;
    }

    setErrorMessage(null);
    setStep("researching");

    try {
      // Automatische Unternehmensrecherche: rein optionale Veredelung. Findet der Server
      // nichts oder antwortet er nicht rechtzeitig, wird ohne Logo/Kurzprofil weitergebaut —
      // ohne Platzhalter und ohne Hinweis an den Nutzer.
      const profile = await fetchCompanyProfile(businessCase.inputs.companyName, email);

      setStep("building");

      const copy = buildDeterministicCopy(businessCase);
      const presentationDate = new Date().toLocaleDateString("de-DE", { year: "numeric", month: "long", day: "numeric" });

      const { blob, fileName } = await createRoiBusinessCaseDeck({
        businessCase,
        options: {
          presentationDate,
          contactName: contactName.trim(),
          contactRole: contactRole.trim() || undefined,
          logoDataUrl: profile.logoDataUrl ?? undefined,
          companySummary: profile.summary ?? undefined,
          // Selbst gewählte Branche schlägt die recherchierte.
          industry: industry || profile.industry || undefined,
          goals,
          adoptionStage: adoptionStage || undefined,
          m365Users,
        },
        copy,
      });

      setStep("uploading");

      const formData = new FormData();
      formData.append("email", email);
      formData.append("consent", "true");
      formData.append("companyName", businessCase.inputs.companyName);
      formData.append("users", String(businessCase.inputs.users));
      formData.append("m365Users", String(m365Users));
      formData.append("contactName", contactName.trim());
      formData.append("contactRole", contactRole.trim());
      formData.append("industry", industry);
      formData.append("goals", goals.join("|"));
      formData.append("adoptionStage", adoptionStage);
      formData.append("renderedAt", String(renderedAtRef.current));
      formData.append("website", ""); // Honeypot – für Menschen leer lassen
      formData.append("file", blob, fileName);

      const response = await fetch("/api/roi-deliver.php", { method: "POST", body: formData });
      const text = await response.text();
      let data: { success?: boolean; error?: string } = {};
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Server-Antwort konnte nicht verarbeitet werden.");
      }
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.");
      }

      trackConversion("lead", "roi-generator");
      trackConversion(
        "roi_generator_ppt_success",
        businessCase.inputs.users <= 12 ? "1-12"
          : businessCase.inputs.users <= 50 ? "13-50"
          : businessCase.inputs.users <= 250 ? "51-250"
          : businessCase.inputs.users <= 1000 ? "251-1000"
          : "1001+"
      );
      markConvertedSession("roi_generator");

      setStep("done");
    } catch (error) {
      setStep("error");
      setErrorMessage(error instanceof Error ? error.message : "Unbekannter Fehler bei der Erstellung.");
    }
  };

  if (step === "done") {
    return (
      <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 p-6 md:p-8 text-center">
        <div className="flex justify-center mb-3">
          <CheckCircle2 className="w-12 h-12 text-primary" />
        </div>
        <h3 className="text-xl font-bold mb-2">Ihre PowerPoint wird jetzt erstellt</h3>
        <p className="text-muted-foreground">
          Sie erhalten in Kürze eine E-Mail mit dem Download-Link, sobald die Datei wirklich bereitsteht. Prüfen
          und ergänzen Sie die Planungsannahmen vor einer Budgetentscheidung.
        </p>
      </div>
    );
  }

  const isBusy = step === "researching" || step === "building" || step === "uploading";

  return (
    <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 p-6 md:p-8">
      <h3 className="text-xl md:text-2xl font-bold mb-2">Editierbare PowerPoint erstellen</h3>
      <p className="text-muted-foreground mb-6">
        Sie erhalten Ihre Präsentation per E-Mail-Link, sobald die Datei fertig gestellt ist.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="roi-contactName">Ihr Name</Label>
            <Input id="roi-contactName" autoComplete="name" maxLength={80} value={contactName} onChange={(e) => setContactName(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="roi-contactRole">
              Ihre Rolle <span className="text-muted-foreground font-normal">(optional)</span>
            </Label>
            <Input id="roi-contactRole" placeholder="z. B. Leitung HR" maxLength={80} value={contactRole} onChange={(e) => setContactRole(e.target.value)} />
          </div>
        </div>

        {/* Optionale Angaben: schärfen die Standardfolien, ändern aber weder Aufbau noch Rechnung. */}
        <div className="rounded-xl border bg-background/60 p-4 space-y-4">
          <p className="text-sm font-medium">
            Für eine passgenauere Präsentation{" "}
            <span className="text-muted-foreground font-normal">— optional, alles überspringbar</span>
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="roi-industry">Branche</Label>
              <Select value={industry} onValueChange={(v) => setIndustry(v as RoiIndustry)}>
                <SelectTrigger id="roi-industry">
                  <SelectValue placeholder="Bitte wählen" />
                </SelectTrigger>
                <SelectContent>
                  {ROI_INDUSTRIES.map((item) => (
                    <SelectItem key={item} value={item}>{item}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="roi-stage">Aktueller Stand</Label>
              <Select value={adoptionStage} onValueChange={(v) => setAdoptionStage(v as RoiAdoptionStage)}>
                <SelectTrigger id="roi-stage">
                  <SelectValue placeholder="Bitte wählen" />
                </SelectTrigger>
                <SelectContent>
                  {ROI_ADOPTION_STAGES.map((item) => (
                    <SelectItem key={item} value={item}>{item}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <fieldset className="space-y-2">
            <legend className="text-sm mb-2">Hauptziel der Copilot-Einführung</legend>
            <div className="flex flex-wrap gap-2">
              {ROI_GOALS.map((goal) => {
                const active = goals.includes(goal);
                return (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => toggleGoal(goal)}
                    aria-pressed={active}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-sm transition-colors min-h-[36px]",
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-input bg-background hover:bg-muted"
                    )}
                  >
                    {goal}
                  </button>
                );
              })}
            </div>
          </fieldset>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="roi-email">E-Mail-Adresse</Label>
            <Input id="roi-email" type="email" required autoComplete="email" placeholder="ihre.email@unternehmen.de" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          {/* Honeypot: für Menschen unsichtbar, Bots füllen es häufig aus. */}
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label htmlFor="roi-website">Website</label>
            <input id="roi-website" name="website" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="flex items-start gap-3">
            <Checkbox id="roi-consent" checked={consent} onCheckedChange={(v) => setConsent(v === true)} className="mt-1" />
            <label htmlFor="roi-consent" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
              Ich willige ein, dass die Copilotenschule (Yellow Boat) mich per E-Mail zu meinem Copilot Business Case
              sowie zu passenden Angeboten kontaktieren darf. Diese Einwilligung kann ich jederzeit formlos widerrufen.
              Es gilt unsere{" "}
              <Link to="/datenschutz" className="text-primary underline hover:no-underline">Datenschutzerklärung</Link>.
            </label>
          </div>
        </div>

        <Button type="submit" size="lg" disabled={isBusy} className="w-full md:w-auto">
          {isBusy ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {step === "researching"
                ? "Angaben werden geprüft…"
                : step === "building"
                ? "Präsentation wird erstellt…"
                : "Wird übermittelt…"}
            </>
          ) : (
            "Editierbare PowerPoint erstellen"
          )}
        </Button>

        {step === "error" && errorMessage && (
          <p className="text-sm text-destructive" role="alert">{errorMessage}</p>
        )}
      </form>
    </div>
  );
};

export default RoiDeliveryForm;

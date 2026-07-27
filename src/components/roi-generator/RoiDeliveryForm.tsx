import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { trackConversion, markConvertedSession } from "@/lib/analytics";
import type { RoiBusinessCase } from "@/lib/roi/types";
import { buildDeterministicCopy } from "@/lib/roi/deterministicCopy";
import { createRoiBusinessCaseDeck } from "@/lib/pptx/createRoiBusinessCaseDeck";

type Props = {
  businessCase: RoiBusinessCase;
};

const RoiDeliveryForm = ({ businessCase }: Props) => {
  const { toast } = useToast();
  const renderedAtRef = useRef<number>(Date.now());

  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [initiativeTitle, setInitiativeTitle] = useState("");
  const [presenterName, setPresenterName] = useState("");

  const [step, setStep] = useState<"idle" | "building" | "uploading" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    renderedAtRef.current = Date.now();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      toast({ title: "Einwilligung erforderlich", description: "Bitte bestätigen Sie die Einwilligung zur Kontaktaufnahme.", variant: "destructive" });
      return;
    }
    if (!email) {
      toast({ title: "E-Mail erforderlich", description: "Bitte geben Sie Ihre E-Mail-Adresse ein.", variant: "destructive" });
      return;
    }

    setErrorMessage(null);
    setStep("building");

    try {
      const copy = buildDeterministicCopy(businessCase);
      const presentationDate = new Date().toLocaleDateString("de-DE", { year: "numeric", month: "long", day: "numeric" });

      const { blob, fileName } = await createRoiBusinessCaseDeck({
        businessCase,
        options: {
          initiativeTitle: initiativeTitle || undefined,
          presenterName: presenterName || undefined,
          presentationDate,
        },
        copy,
      });

      setStep("uploading");

      const formData = new FormData();
      formData.append("email", email);
      formData.append("consent", "true");
      formData.append("companyName", businessCase.inputs.companyName);
      formData.append("users", String(businessCase.inputs.users));
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
      trackConversion("roi_generator_ppt_success", businessCase.inputs.users <= 12 ? "1-12" : businessCase.inputs.users <= 50 ? "13-50" : businessCase.inputs.users <= 250 ? "51-250" : businessCase.inputs.users <= 1000 ? "251-1000" : "1001+");
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

  const isBusy = step === "building" || step === "uploading";

  return (
    <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 p-6 md:p-8">
      <h3 className="text-xl md:text-2xl font-bold mb-2">Editierbare PowerPoint erstellen</h3>
      <p className="text-muted-foreground mb-5">
        Optional: passen Sie die Titelfolie an. Ihr Unternehmensname aus Schritt 1 erscheint auf der Titelfolie
        und im Footer jeder Folie.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="roi-initiativeTitle">Titel der Initiative (optional)</Label>
            <Input id="roi-initiativeTitle" maxLength={90} value={initiativeTitle} onChange={(e) => setInitiativeTitle(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="roi-presenterName">Name der präsentierenden Person (optional)</Label>
            <Input id="roi-presenterName" maxLength={80} value={presenterName} onChange={(e) => setPresenterName(e.target.value)} />
          </div>
        </div>

        <div className="border-t pt-4 space-y-4">
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
              {step === "building" ? "Präsentation wird erstellt…" : "Wird übermittelt…"}
            </>
          ) : (
            "Editierbare PowerPoint erstellen"
          )}
        </Button>

        {step === "error" && errorMessage && (
          <p className="text-sm text-destructive" role="alert">{errorMessage}</p>
        )}

        <p className="text-xs text-muted-foreground">
          Sie erhalten Ihre PowerPoint per E-Mail-Link, sobald die Datei wirklich fertig gestellt und gespeichert ist.
        </p>
      </form>
    </div>
  );
};

export default RoiDeliveryForm;

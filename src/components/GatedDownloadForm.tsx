import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { Download, CheckCircle2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { trackConversion, markConvertedSession } from "@/lib/analytics";
import { GUIDE_CONSENT_TEXT, type GuideData } from "@/data/guides";

interface GatedDownloadFormProps {
  guide: GuideData;
}

/**
 * Wiederverwendbares E-Mail-+-Consent-Formular für Gated-Downloads.
 *
 * Ablauf:
 *   1. Besucher gibt E-Mail ein und bestätigt die Consent-Checkbox (Pflicht).
 *   2. POST an /api/download-lead.php – speichert Lead + Consent identisch zum
 *      Kontaktformular und benachrichtigt Martin.
 *   3. Bei Erfolg wird das PDF SOFORT auf der Seite freigegeben (Button + Auto-Start).
 */
const GatedDownloadForm = ({ guide }: GatedDownloadFormProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const startDownload = () => {
    const a = document.createElement("a");
    a.href = guide.pdfPath;
    a.setAttribute("download", "");
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      toast({
        title: "Einwilligung erforderlich",
        description: "Bitte bestätigen Sie die Einwilligung zur Kontaktaufnahme.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/download-lead.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          consent: true,
          leadId: guide.id,
          leadTitle: guide.title,
          sourcePath: `/guidelines/${guide.id}`,
        }),
      });

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

      // Conversion-Tracking
      trackConversion("lead", guide.id);
      trackConversion("pdf_download", guide.id);
      markConvertedSession("guide_download");

      setIsDone(true);
      startDownload();
    } catch (error) {
      toast({
        title: "Fehler",
        description:
          error instanceof Error
            ? error.message
            : "Bitte versuchen Sie es später erneut oder schreiben Sie an info@copilotenschule.de",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isDone) {
    return (
      <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 p-6 md:p-8 text-center">
        <div className="flex justify-center mb-3">
          <CheckCircle2 className="w-12 h-12 text-primary" />
        </div>
        <h3 className="text-xl font-bold mb-2">Vielen Dank – Ihr Leitfaden ist bereit</h3>
        <p className="text-muted-foreground mb-5">
          Der Download sollte automatisch gestartet sein. Falls nicht, hier direkt:
        </p>
        <a
          href={guide.pdfPath}
          download
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackConversion("pdf_download", guide.id)}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
        >
          <Download className="w-5 h-5" />
          {guide.shortTitle} herunterladen
        </a>
        <p className="mt-4 text-xs text-muted-foreground">{guide.fileMeta}</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 p-6 md:p-8">
      <div className="flex items-center gap-2 mb-1 text-primary font-semibold">
        <Download className="w-5 h-5" />
        <span>Kostenloser Download</span>
      </div>
      <h3 className="text-xl md:text-2xl font-bold mb-2">{guide.shortTitle}</h3>
      <p className="text-muted-foreground mb-5">
        Tragen Sie Ihre E-Mail-Adresse ein und Sie erhalten den Leitfaden sofort als PDF.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="guide-email" className="sr-only">
            E-Mail-Adresse
          </label>
          <Input
            id="guide-email"
            type="email"
            required
            autoComplete="email"
            placeholder="ihre.email@unternehmen.de"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-background"
          />
        </div>

        <div className="flex items-start gap-3">
          <Checkbox
            id="guide-consent"
            checked={consent}
            onCheckedChange={(v) => setConsent(v === true)}
            className="mt-1"
          />
          <label htmlFor="guide-consent" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
            {GUIDE_CONSENT_TEXT} Es gilt unsere{" "}
            <Link to="/datenschutz" className="text-primary underline hover:no-underline">
              Datenschutzerklärung
            </Link>
            .
          </label>
        </div>

        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Wird gesendet…
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              Leitfaden herunterladen
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default GatedDownloadForm;

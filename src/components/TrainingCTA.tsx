import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { setSessionTag } from "@/lib/analytics";

interface TrainingCTAProps {
  /** Kurzer thematischer Aufhänger, z. B. "Copilot in Excel produktiv einsetzen" */
  topic: string;
  /** 1 Satz Nutzen aus Leser-Perspektive */
  benefit: string;
  /** Ziel-Route, z. B. "/trainings/microsoft-365-copilot-praxis" */
  href: string;
  /** Button-/Link-Beschriftung, z. B. "Zum Praxis-Training" */
  label: string;
}

/**
 * Content→Angebot-Brücke für Wissensartikel.
 *
 * Hintergrund: Monatsreview 06/2026 — 297 Sessions/30T erreichten Wissensartikel,
 * 0 % navigierten weiter zum Angebot (Funnel Stufe 1→2 = 0 %). Diese Komponente
 * ist der kontextuelle Übergang vom Artikel zum passenden Training.
 *
 * Bewusst: kein Popup, kein Overlay, kein Schließen-Icon (Dead-Click-Lektion
 * aus /wissen/copilot-in-outlook-nutzen-tipps). Rein additiver Block.
 *
 * KPI: Funnel Stufe 1→2 ≥ 5 % in 30T, Seiten/Sitzung > 1,2.
 * Messung: Clarity-Tag "content_cta_click" (Wert = Ziel-Route).
 */
const TrainingCTA = ({ topic, benefit, href, label }: TrainingCTAProps) => (
  <Card className="my-6 border-primary/30 bg-primary/5">
    <CardContent className="py-4 flex flex-col sm:flex-row sm:items-center gap-3">
      <div className="flex-1">
        <p className="font-semibold text-base mb-1">Passendes Training: {topic}</p>
        <p className="text-sm text-muted-foreground">{benefit}</p>
      </div>
      <Link
        to={href}
        onClick={() => setSessionTag("content_cta_click", href)}
        className="inline-flex items-center gap-1.5 shrink-0 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        {label}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </CardContent>
  </Card>
);

export default TrainingCTA;

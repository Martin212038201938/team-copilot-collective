import { Link } from "react-router-dom";
import { ArrowRight, Check, SlidersHorizontal } from "lucide-react";
import { trackConversion } from "@/lib/analytics";

interface AngebotsBrueckeProps {
  /** Kleine Kicker-Zeile über der Headline. Default: "Passendes Training" */
  eyebrow?: string;
  /** Zugespitzte Aussage, die den Artikel-Kontext aufgreift (kein <h2>, damit die Heading-Struktur der Seite unberührt bleibt) */
  headline: string;
  /** 1–2 Sätze: Was passiert im Training, warum jetzt */
  text: string;
  /** 2–3 sehr kurze Belege (Format, Dauer, Zielgruppe, Ergebnis) */
  points: string[];
  /** Slug des passenden Trainings, z. B. "microsoft-365-copilot-praxis" */
  trainingSlug: string;
  /** Beschriftung des Haupt-Buttons, z. B. "Praxis-Training ansehen" */
  trainingLabel: string;
  /** Artikel-Slug für die Zuordnung in Clarity, z. B. "microsoft-copilot-lizenzen" */
  source: string;
  /** Beschriftung des Zweit-Buttons. Default: "Training konfigurieren" */
  konfiguratorLabel?: string;
}

/**
 * Angebots-Brücke für die traffic-starken Wissensartikel ("Goldene Pages").
 *
 * Hintergrund (Monatsreview 08/2026): 1.621 Sessions/30T erreichten einen
 * Wissensartikel, 3 davon (0,19 %) gingen weiter zu Trainings oder Konfigurator.
 * Der bestehende TrainingCTA (dezente Card, tief im Artikel) und die grauen
 * Inline-Hinweise haben das nicht gedreht — deshalb hier bewusst prominenter:
 * eigener Block mit Rahmen und Farbfläche, direkt nach dem ersten Sinnabschnitt,
 * mit zwei Zielen statt einem (konkretes Training + Konfigurator für Unentschlossene).
 *
 * Bewusst NICHT: Popup, Overlay, Sticky, Schließen-Icon (Dead-Click-Lektion aus
 * /wissen/copilot-in-outlook-nutzen-tipps). Rein additiver Block; Content, H1,
 * Title und Heading-Struktur der Protected Pages bleiben unberührt — der Block
 * rendert als <aside>, nicht als Artikel-Abschnitt.
 *
 * KPI: Funnel-Stufe-2-Rate (Content → Angebot) von 0,19 % auf ≥ 2 % in 4 Wochen.
 * Messung: Clarity-Event "angebot_bruecke_click", Wert = "<artikel>:<ziel>".
 */
const AngebotsBruecke = ({
  eyebrow = "Passendes Training",
  headline,
  text,
  points,
  trainingSlug,
  trainingLabel,
  source,
  konfiguratorLabel = "Training konfigurieren",
}: AngebotsBrueckeProps) => {
  const track = (target: string) => {
    trackConversion("angebot_bruecke_click", `${source}:${target}`);
  };

  return (
    <aside
      aria-label="Passendes Trainingsangebot der Copilotenschule"
      data-cta="angebots-bruecke"
      className="not-prose my-8 rounded-2xl border-2 border-primary/40 bg-gradient-to-br from-primary/10 to-orange-500/10 p-6 md:p-8 shadow-sm"
    >
      <p className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary mb-4">
        {eyebrow}
      </p>

      <p className="text-lg md:text-xl font-bold leading-snug mb-2">{headline}</p>
      <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-5">{text}</p>

      {points.length > 0 && (
        <ul className="grid sm:grid-cols-3 gap-3 mb-6">
          {points.map((point) => (
            <li key={point} className="flex gap-2 text-sm text-muted-foreground">
              <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          to={`/trainings/${trainingSlug}`}
          onClick={() => track(trainingSlug)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm md:text-base font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-xl transition-all"
        >
          {trainingLabel}
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
        <Link
          to="/training-konfigurator"
          onClick={() => track("training-konfigurator")}
          className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-primary/40 bg-background/60 px-5 py-3 text-sm md:text-base font-semibold text-primary hover:bg-primary/5 transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
          {konfiguratorLabel}
        </Link>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Inhouse, online oder als Lernreise über mehrere Wochen — Inhalte werden vor jedem Training auf Ihre
        Arbeitsabläufe zugeschnitten.
      </p>
    </aside>
  );
};

export default AngebotsBruecke;

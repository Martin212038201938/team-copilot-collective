# Draft: Content→Angebot-CTA-Brücke („Passendes Training")

**Erstellt:** 11.06.2026 (Berater-Review — vorgezogen von Cron `copilotenschule-seo-pattern-transfer-2026-06-24`)
**Problem:** Funnel Stufe 1→2 = 0 % (297 Sessions/30T auf Wissensartikeln, niemand erreicht Trainings/Konfigurator). Seiten/Sitzung 1,0.
**Ziel-KPI:** Stufe 1→2 ≥ 5 % in 30T · Seiten/Sitzung > 1,2 · zusätzlich relevant für SEA-Start (Paid-Traffic trifft sonst auf dieselbe Sackgasse).

---

## 1. Neue Komponente: `src/components/TrainingCTA.tsx`

Dezent, kontextuell, kein Popup. Wiederverwendbar mit Props. Feuert ein Clarity-Event für die Funnel-Messung.

```tsx
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
```

**Hinweise:**
- `setSessionTag` aus `src/lib/analytics.ts` ist idempotent/crash-sicher — Signatur vor Einbau prüfen (nimmt sie `(key, value)`?). Alternativ `trackConversion("content_cta_click")`.
- Styling nutzt vorhandene Tokens (primary/muted) — kein neues CSS, konsistent mit Card-Optik der Artikel.
- Bewusst KEIN `lucide-x`, kein Overlay, kein Dismiss — die Dead-Click-Lektion der Outlook-Seite.

## 2. Einbau-Muster (pro Artikel 2 Touchpoints)

1. **Mittig:** nach der 2.–3. Hauptsektion (dort ist Scroll-Tiefe ~50 % laut Clarity noch erreicht).
2. **Am Ende:** vor dem FAQ-Block.

Protected-Pages-Regel eingehalten: Title/H1/Meta/Canonical/erste 100 Wörter bleiben unangetastet — der CTA ist rein additiv ab Artikelmitte.

## 3. Mapping Top-Artikel → Ziel-Angebot

| Artikel (30T-Visits) | Ziel | topic / label |
|---|---|---|
| `/wissen/copilot-in-outlook-nutzen-tipps` (73) | `/trainings/microsoft-365-copilot-praxis` | „Microsoft 365 Copilot in der Praxis" / „Zum Praxis-Training" |
| `/wissen/claude-in-microsoft-copilot` (36) | `/trainings/copilot-grundlagen-prompt-design` | „Copilot-Grundlagen & Prompt-Design" / „Training ansehen" |
| `/wissen/ki-halluzinationen-vermeiden` (33) | `/trainings/copilot-grundlagen-prompt-design` | „KI-Ausgaben sicher bewerten lernen" / „Zum Grundlagen-Training" |
| `/wissen/microsoft-copilot-lizenzen` (23, protected) | `/training-konfigurator` | „Welches Training passt zu Ihrer Lizenz-Entscheidung?" / „Konfigurator starten" |
| `/wissen/copilot-in-excel-aktivieren` (18, GSC #1) | `/trainings/microsoft-365-copilot-praxis` | „Copilot in Excel produktiv einsetzen" / „Zum Praxis-Training" |
| `/wissen/bessere-entscheidungen-mit-ki` (15) | `/trainings/ausbildung-ki-wissensarbeiter` | „Ausbildung zum KI-Wissensarbeiter" / „Ausbildung ansehen" |
| `/wissen/copilot-sicherheit-datenschutz` (11) | `/trainings/copilot-compliance-datenschutz` | „Compliance & Datenschutz-Training" / „Zum Training" |
| `/wissen/eu-ai-act-mitarbeiter-schulung-august-2026` (neu, B3a) | `/trainings/eu-ai-act-pflichtschulung` | „EU-AI-Act-Pflichtschulung" / „Pflichtschulung ansehen" |

## 4. Einbau-Beispiel (Excel-Artikel, exemplarisch)

```tsx
// src/pages/CopilotInExcelAktivieren.tsx (Dateiname prüfen)
import TrainingCTA from "@/components/TrainingCTA";

// … nach Sektion 2/3:
<TrainingCTA
  topic="Copilot in Excel produktiv einsetzen"
  benefit="Im Praxis-Training lernt Ihr Team an echten Dateien, wie Copilot Auswertungen, Formeln und Berichte übernimmt."
  href="/trainings/microsoft-365-copilot-praxis"
  label="Zum Praxis-Training"
/>

// … und identisch (oder Variante) direkt vor <section id="faq">
```

## 5. Rollout-Empfehlung (risikominimiert)

1. **Welle 1 (vor SEA-Start):** Komponente + Einbau in die 3 Nicht-Protected-Top-Seiten (Outlook, Claude, Excel). Build-Test `npm run build:prerender`, Push, IndexNow.
2. **Welle 2 (+1 Woche, nach Clarity-Check):** restliche 5 Artikel inkl. der 2 Protected Pages (Lizenzen, Halluzinationen) — dann ist das Pattern verifiziert, bevor geschützte Seiten angefasst werden.
3. Messung: Clarity-Funnel „SEO → Angebot → Kontakt" + Tag `content_cta_click`; Weekly-Audit beobachtet Stufe 1→2.

## 6. Abgrenzung

- Kein Einbau in `KnowledgePageTemplate`/`ContentLayout` global — bewusst pro Artikel, damit das Mapping thematisch exakt ist und Protected Pages kontrolliert in Welle 2 kommen.
- Der Cron `copilotenschule-seo-pattern-transfer-2026-06-24` wird zum Verifikationslauf umgewidmet (prüft Einbau + erste Klick-Daten statt Neu-Erstellung).

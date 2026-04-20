// ============================================================================
// ZENTRALE CONTENT-REGISTRY FÜR QUER-VERLINKUNGEN
// ============================================================================
// Bringt Artikel, Trainings und Workshops unter ein einheitliches Interface,
// damit sie in der "Das könnte Sie auch interessieren"-Rubrik am Ende jeder
// Wissensseite gemischt dargestellt werden können.
//
// ID-Konvention: "<kind>:<slug>"
//   - "wissen:copilot-betriebsrat"
//   - "training:copilot-grundlagen-prompt-design"
//   - "workshop:copilot-change-programm"
// ============================================================================

import { ALL_ARTICLES } from "@/data/articles";
import { trainings } from "@/data/trainings";
import { workshops, WORKSHOP_TYPE_LABELS } from "@/data/workshops";

export type ContentKind = "wissen" | "training" | "workshop";

export interface ContentItem {
  id: string;
  kind: ContentKind;
  title: string;
  description: string;
  link: string;
  badge?: string;
}

/** Kürzt einen Text auf max. maxLen Zeichen, versucht Wortgrenze zu respektieren. */
function truncate(text: string, maxLen = 180): string {
  if (text.length <= maxLen) return text;
  const slice = text.slice(0, maxLen - 1);
  const lastSpace = slice.lastIndexOf(" ");
  return (lastSpace > maxLen * 0.6 ? slice.slice(0, lastSpace) : slice) + "…";
}

/**
 * Löst eine Content-ID auf ein vereinheitlichtes Item auf.
 * Gibt `undefined` zurück, wenn das Item nicht existiert – so werden
 * kaputte Referenzen in der UI stillschweigend ausgefiltert, bevor
 * der Build-Check beim nächsten `npm run build` anschlägt.
 */
export function getContentItem(id: string): ContentItem | undefined {
  const separatorIdx = id.indexOf(":");
  if (separatorIdx < 0) return undefined;

  const kind = id.slice(0, separatorIdx) as ContentKind;
  const slug = id.slice(separatorIdx + 1);

  if (kind === "wissen") {
    const article = ALL_ARTICLES.find((a) => a.id === slug);
    if (!article) return undefined;
    return {
      id,
      kind: "wissen",
      title: article.title,
      description: truncate(article.description),
      link: article.link,
      badge: article.badge,
    };
  }

  if (kind === "training") {
    const training = trainings.find((t) => t.slug === slug);
    if (!training) return undefined;
    return {
      id,
      kind: "training",
      title: training.title,
      description: truncate(training.description),
      link: `/trainings/${training.slug}`,
      badge: "Training",
    };
  }

  if (kind === "workshop") {
    const workshop = workshops.find((w) => w.slug === slug);
    if (!workshop) return undefined;
    return {
      id,
      kind: "workshop",
      title: workshop.title,
      description: truncate(workshop.description),
      link: `/workshops/${workshop.slug}`,
      badge: WORKSHOP_TYPE_LABELS[workshop.type] ?? "Workshop",
    };
  }

  return undefined;
}

/** Löst eine Liste von Content-IDs auf und filtert kaputte Referenzen. */
export function getContentItems(ids: string[]): ContentItem[] {
  return ids
    .map((id) => getContentItem(id))
    .filter((item): item is ContentItem => !!item);
}

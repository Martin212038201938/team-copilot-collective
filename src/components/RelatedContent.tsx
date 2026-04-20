import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, GraduationCap, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getContentItems, type ContentKind } from "@/lib/contentRegistry";

interface RelatedContentProps {
  /** Liste von Content-IDs im Format "<kind>:<slug>". Siehe contentRegistry.ts */
  ids: string[];
  /** Überschrift der Rubrik – Standard: "Das könnte Sie auch interessieren". */
  heading?: string;
}

const kindIcon: Record<ContentKind, ReactNode> = {
  wissen: <BookOpen className="w-3.5 h-3.5" />,
  training: <GraduationCap className="w-3.5 h-3.5" />,
  workshop: <Sparkles className="w-3.5 h-3.5" />,
};

const kindCta: Record<ContentKind, string> = {
  wissen: "Weiterlesen",
  training: "Zum Training",
  workshop: "Zum Workshop",
};

/**
 * Gemischte "Das könnte Sie auch interessieren"-Rubrik am Ende jeder
 * Wissensseite. Nimmt eine nach Relevanz sortierte Liste von IDs entgegen
 * und rendert sie als Cards. Mischung aus Artikeln, Trainings und Workshops
 * ist explizit gewollt – es entsteht ein natürlicher Pfad vom
 * Wissen-Inhalt zum passenden Angebot.
 */
const RelatedContent = ({
  ids,
  heading = "Das könnte Sie auch interessieren",
}: RelatedContentProps) => {
  const items = getContentItems(ids);
  if (items.length === 0) return null;

  return (
    <section
      className="mt-16 pt-10 border-t border-border/50 not-prose"
      aria-labelledby="related-content-heading"
    >
      <h2
        id="related-content-heading"
        className="text-2xl md:text-3xl font-bold mb-6"
      >
        {heading}
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <Link
            key={item.id}
            to={item.link}
            className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
          >
            <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50 bg-card/70 backdrop-blur-sm">
              <CardContent className="p-5 flex flex-col h-full">
                <div className="mb-3">
                  <Badge variant="secondary" className="gap-1.5">
                    {kindIcon[item.kind]}
                    <span>{item.badge}</span>
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold mb-2 leading-snug group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-grow mb-3">
                  {item.description}
                </p>
                <div className="flex items-center gap-1 text-sm font-medium text-primary mt-auto">
                  <span>{kindCta[item.kind]}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedContent;

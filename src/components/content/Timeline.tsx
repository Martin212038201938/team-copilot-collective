import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface TimelineItem {
  date?: string;
  title: string;
  description: string | ReactNode;
  icon?: ReactNode;
  highlight?: boolean;
}

interface TimelineProps {
  items: TimelineItem[];
  title?: string;
}

export const Timeline = ({ items, title }: TimelineProps) => {
  return (
    <div className="my-8">
      {title && (
        <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
          <span className="w-1.5 h-8 bg-gradient-to-b from-primary to-accent rounded-full" />
          {title}
        </h3>
      )}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-muted hidden md:block" />

        <div className="space-y-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="relative animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex gap-6">
                {/* Timeline dot */}
                <div className="flex-shrink-0 relative">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg z-10 relative transition-all duration-300 ${
                    item.highlight
                      ? "bg-gradient-to-br from-primary to-accent scale-110"
                      : "bg-gradient-to-br from-muted to-muted-foreground/20"
                  }`}>
                    {item.icon || <Calendar className={`w-7 h-7 ${item.highlight ? "text-white" : "text-muted-foreground"}`} />}
                  </div>
                  {item.highlight && (
                    <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                  )}
                </div>

                {/* Content */}
                <Card className={`flex-1 border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  item.highlight
                    ? "border-primary/50 bg-gradient-to-br from-primary/5 to-accent/5"
                    : "border-border hover:border-primary/30"
                }`}>
                  <CardContent className="pt-6">
                    {item.date && (
                      <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                        {item.date}
                      </div>
                    )}
                    <h4 className="text-xl font-bold mb-3 text-foreground">
                      {item.title}
                    </h4>
                    <div className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;

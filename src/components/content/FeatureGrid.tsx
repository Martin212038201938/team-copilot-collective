import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon | ReactNode;
  title: string;
  description: string;
  highlight?: string;
}

interface FeatureGridProps {
  features: Feature[];
  columns?: 2 | 3 | 4;
  title?: string;
}

export const FeatureGrid = ({ features, columns = 3, title }: FeatureGridProps) => {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4"
  };

  return (
    <div className="my-8">
      {title && (
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <span className="w-1.5 h-8 bg-gradient-to-b from-primary to-accent rounded-full" />
          {title}
        </h3>
      )}
      <div className={`grid gap-6 ${gridCols[columns]}`}>
        {features.map((feature, index) => {
          const IconComponent = typeof feature.icon === 'function' ? feature.icon : null;

          return (
            <Card
              key={index}
              className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-card/50 backdrop-blur-sm animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              {/* Icon background glow */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-500" />

              <CardHeader className="relative">
                <div className="mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/90 to-accent/80 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    {IconComponent ? (
                      <IconComponent className="w-7 h-7 text-white" />
                    ) : (
                      <div className="text-white">{feature.icon}</div>
                    )}
                  </div>
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="relative">
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {feature.description}
                </p>
                {feature.highlight && (
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                      ✨ {feature.highlight}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default FeatureGrid;

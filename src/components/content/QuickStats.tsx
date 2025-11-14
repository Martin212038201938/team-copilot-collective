import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface Stat {
  label: string;
  value: string;
  change?: {
    value: string;
    trend: "up" | "down" | "neutral";
  };
  icon?: LucideIcon;
  color?: "primary" | "green" | "blue" | "purple" | "amber";
}

interface QuickStatsProps {
  stats: Stat[];
  columns?: 2 | 3 | 4;
}

const colorConfig = {
  primary: {
    bg: "from-primary/10 to-primary/5",
    border: "border-primary/30",
    text: "text-primary",
    icon: "bg-primary/20"
  },
  green: {
    bg: "from-green-500/10 to-green-600/5",
    border: "border-green-500/30",
    text: "text-green-600 dark:text-green-400",
    icon: "bg-green-500/20"
  },
  blue: {
    bg: "from-blue-500/10 to-blue-600/5",
    border: "border-blue-500/30",
    text: "text-blue-600 dark:text-blue-400",
    icon: "bg-blue-500/20"
  },
  purple: {
    bg: "from-purple-500/10 to-purple-600/5",
    border: "border-purple-500/30",
    text: "text-purple-600 dark:text-purple-400",
    icon: "bg-purple-500/20"
  },
  amber: {
    bg: "from-amber-500/10 to-amber-600/5",
    border: "border-amber-500/30",
    text: "text-amber-600 dark:text-amber-400",
    icon: "bg-amber-500/20"
  }
};

export const QuickStats = ({ stats, columns = 4 }: QuickStatsProps) => {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4"
  };

  const getTrendIcon = (trend: "up" | "down" | "neutral") => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <div className={`grid gap-4 my-8 ${gridCols[columns]}`}>
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        const colors = colorConfig[stat.color || "primary"];

        return (
          <Card
            key={index}
            className={`group relative overflow-hidden border-2 bg-gradient-to-br ${colors.bg} ${colors.border} hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <CardContent className="pt-6 pb-6 relative">
              <div className="flex items-start justify-between mb-3">
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  {stat.label}
                </div>
                {IconComponent && (
                  <div className={`w-10 h-10 rounded-lg ${colors.icon} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <IconComponent className={`w-5 h-5 ${colors.text}`} />
                  </div>
                )}
              </div>

              <div className={`text-3xl font-bold mb-2 ${colors.text} group-hover:scale-105 transition-transform origin-left`}>
                {stat.value}
              </div>

              {stat.change && (
                <div className="flex items-center gap-1.5 text-sm">
                  {getTrendIcon(stat.change.trend)}
                  <span className={
                    stat.change.trend === "up"
                      ? "text-green-600 dark:text-green-400"
                      : stat.change.trend === "down"
                      ? "text-red-600 dark:text-red-400"
                      : "text-muted-foreground"
                  }>
                    {stat.change.value}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default QuickStats;

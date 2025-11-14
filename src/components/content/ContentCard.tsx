import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Info,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  Rocket,
  Target,
  TrendingUp
} from "lucide-react";

type CardVariant = "info" | "warning" | "success" | "tip" | "feature" | "goal" | "highlight";

interface ContentCardProps {
  variant?: CardVariant;
  title?: string;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}

const variantConfig = {
  info: {
    icon: Info,
    bgClass: "from-blue-500/10 to-blue-600/5 border-blue-500/30",
    iconClass: "text-blue-500",
    titleClass: "text-blue-700 dark:text-blue-400"
  },
  warning: {
    icon: AlertTriangle,
    bgClass: "from-amber-500/10 to-amber-600/5 border-amber-500/30",
    iconClass: "text-amber-500",
    titleClass: "text-amber-700 dark:text-amber-400"
  },
  success: {
    icon: CheckCircle2,
    bgClass: "from-green-500/10 to-green-600/5 border-green-500/30",
    iconClass: "text-green-500",
    titleClass: "text-green-700 dark:text-green-400"
  },
  tip: {
    icon: Lightbulb,
    bgClass: "from-purple-500/10 to-purple-600/5 border-purple-500/30",
    iconClass: "text-purple-500",
    titleClass: "text-purple-700 dark:text-purple-400"
  },
  feature: {
    icon: Rocket,
    bgClass: "from-primary/10 to-accent/5 border-primary/30",
    iconClass: "text-primary",
    titleClass: "text-primary"
  },
  goal: {
    icon: Target,
    bgClass: "from-pink-500/10 to-pink-600/5 border-pink-500/30",
    iconClass: "text-pink-500",
    titleClass: "text-pink-700 dark:text-pink-400"
  },
  highlight: {
    icon: TrendingUp,
    bgClass: "from-indigo-500/10 to-indigo-600/5 border-indigo-500/30",
    iconClass: "text-indigo-500",
    titleClass: "text-indigo-700 dark:text-indigo-400"
  }
};

export const ContentCard = ({
  variant = "info",
  title,
  children,
  className,
  icon
}: ContentCardProps) => {
  const config = variantConfig[variant];
  const IconComponent = config.icon;

  return (
    <Card
      className={cn(
        "border-2 bg-gradient-to-br backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in",
        config.bgClass,
        className
      )}
    >
      {title && (
        <CardHeader className="pb-3">
          <CardTitle className={cn("flex items-center gap-3 text-lg", config.titleClass)}>
            <div className="flex-shrink-0">
              {icon || <IconComponent className={cn("w-5 h-5", config.iconClass)} />}
            </div>
            <span>{title}</span>
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className={cn(!title && "pt-6")}>
        <div className="text-sm leading-relaxed space-y-3">
          {children}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentCard;

import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

interface Step {
  title: string;
  description: string | ReactNode;
  icon?: ReactNode;
}

interface StepByStepProps {
  steps: Step[];
  title?: string;
}

export const StepByStep = ({ steps, title }: StepByStepProps) => {
  return (
    <div className="my-8 space-y-6">
      {title && (
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <span className="w-1.5 h-8 bg-gradient-to-b from-primary to-accent rounded-full" />
          {title}
        </h3>
      )}
      <div className="relative">
        {/* Vertical connector line */}
        <div className="absolute left-6 top-12 bottom-12 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20 hidden md:block" />

        <div className="space-y-6">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="relative border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-x-2 bg-card/50 backdrop-blur-sm animate-fade-in group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  {/* Step number/icon */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300 z-10 relative">
                        {step.icon || (index + 1)}
                      </div>
                      {/* Pulsing ring animation */}
                      <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-0 group-hover:opacity-100" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                      {step.title}
                    </h4>
                    <div className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </div>
                  </div>

                  {/* Check mark for completed look */}
                  <div className="flex-shrink-0 self-start opacity-0 group-hover:opacity-100 transition-opacity">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepByStep;

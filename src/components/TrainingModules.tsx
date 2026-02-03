import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * TrainingModules Component - CTA Section for Homepage
 *
 * This simplified component displays only the call-to-action section
 * that links to the full training offerings on /unsere-angebote
 *
 * For the complete training catalog, see /unsere-angebote
 */
const TrainingModules = () => {
  return (
    <section id="trainings" className="py-16 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Modularer Konfigurator CTA */}
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-xl blur-xl" />
          <div className="relative bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-2 border-primary/30 rounded-xl p-6 md:p-8 text-center">
            <h2 className="text-xl md:text-2xl font-bold mb-3">
              Ihr Training, Ihre Module – individuell zusammengestellt
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Bei der Copilotenschule können Sie Ihr Microsoft Copilot Training aus einzelnen Modulen
              selbst zusammenstellen – exakt auf die Bedürfnisse Ihres Teams zugeschnitten.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md sm:max-w-none mx-auto">
              <Link to="/unsere-angebote" className="w-full sm:w-auto">
                <Button size="default" variant="outline" className="group w-full">
                  Alle Trainings ansehen
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </Button>
              </Link>
              <Link to="/training-konfigurator" className="w-full sm:w-auto">
                <Button size="default" className="group w-full whitespace-normal h-auto py-2">
                  <span>Module individuell zusammenstellen</span>
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingModules;

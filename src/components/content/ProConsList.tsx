import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";

interface ProConsListProps {
  pros: string[];
  cons: string[];
  title?: string;
}

export const ProConsList = ({ pros, cons, title }: ProConsListProps) => {
  return (
    <div className="my-8">
      {title && (
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <span className="w-1.5 h-8 bg-gradient-to-b from-primary to-accent rounded-full" />
          {title}
        </h3>
      )}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Pros */}
        <Card className="border-2 border-green-500/30 bg-gradient-to-br from-green-500/5 to-green-600/5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in">
          <CardHeader className="border-b border-green-500/20 bg-green-500/5">
            <CardTitle className="text-xl flex items-center gap-3 text-green-700 dark:text-green-400">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              Vorteile
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-3">
              {pros.map((pro, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 group animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5 group-hover:scale-125 transition-transform" />
                  <span className="text-sm leading-relaxed">{pro}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Cons */}
        <Card className="border-2 border-red-500/30 bg-gradient-to-br from-red-500/5 to-red-600/5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <CardHeader className="border-b border-red-500/20 bg-red-500/5">
            <CardTitle className="text-xl flex items-center gap-3 text-red-700 dark:text-red-400">
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              Nachteile
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-3">
              {cons.map((con, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 group animate-fade-in"
                  style={{ animationDelay: `${(index + pros.length) * 50}ms` }}
                >
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5 group-hover:scale-125 transition-transform" />
                  <span className="text-sm leading-relaxed">{con}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProConsList;

import { Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TableColumn {
  header: string;
  highlight?: boolean;
}

interface TableRow {
  feature: string;
  values: (string | boolean)[];
}

interface ComparisonTableProps {
  title?: string;
  columns: TableColumn[];
  rows: TableRow[];
}

export const ComparisonTable = ({ title, columns, rows }: ComparisonTableProps) => {
  return (
    <div className="my-8">
      {title && (
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <span className="w-1.5 h-8 bg-gradient-to-b from-primary to-accent rounded-full" />
          {title}
        </h3>
      )}
      <Card className="border-2 shadow-xl overflow-hidden animate-fade-in">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5 border-b-2">
          <div className="grid gap-4" style={{ gridTemplateColumns: `2fr ${columns.map(() => '1fr').join(' ')}` }}>
            <div className="font-bold text-sm text-muted-foreground uppercase tracking-wide">
              Feature
            </div>
            {columns.map((col, idx) => (
              <div
                key={idx}
                className={`font-bold text-sm text-center uppercase tracking-wide ${
                  col.highlight ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {col.header}
              </div>
            ))}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {rows.map((row, rowIdx) => (
            <div
              key={rowIdx}
              className={`grid gap-4 p-4 hover:bg-muted/30 transition-colors border-b last:border-0 ${
                rowIdx % 2 === 0 ? 'bg-background' : 'bg-muted/10'
              }`}
              style={{ gridTemplateColumns: `2fr ${columns.map(() => '1fr').join(' ')}` }}
            >
              <div className="font-medium text-sm flex items-center">
                {row.feature}
              </div>
              {row.values.map((value, valIdx) => (
                <div key={valIdx} className="flex items-center justify-center">
                  {typeof value === 'boolean' ? (
                    value ? (
                      <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                        <X className="w-4 h-4 text-red-600 dark:text-red-400" />
                      </div>
                    )
                  ) : (
                    <span className="text-sm text-center">{value}</span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ComparisonTable;

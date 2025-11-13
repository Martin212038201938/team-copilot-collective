import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface BestPracticesBoxProps {
  title?: string;
  practices: string[];
  className?: string;
}

export function BestPracticesBox({ 
  title = 'Best Practices', 
  practices, 
  className = '' 
}: BestPracticesBoxProps) {
  return (
    <div className={`bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800 mb-8 ${className}`}>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
        <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
        {title}
      </h3>
      <ul className="space-y-3">
        {practices.map((practice, index) => (
          <li key={index} className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700 dark:text-gray-300">{practice}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

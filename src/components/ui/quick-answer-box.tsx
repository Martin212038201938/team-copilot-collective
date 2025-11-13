import React from 'react';
import { HelpCircle } from 'lucide-react';

interface QuickAnswerBoxProps {
  question: string;
  answer: string;
  className?: string;
}

export function QuickAnswerBox({ question, answer, className = '' }: QuickAnswerBoxProps) {
  return (
    <div className={`bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-lg p-6 mb-8 ${className}`}>
      <div className="flex items-start gap-3">
        <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {question}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeatureCardsProps {
  cards: FeatureCard[];
  className?: string;
}

export function FeatureCards({ cards, className = '' }: FeatureCardsProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 my-8 ${className}`}>
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-100 dark:border-purple-800 hover:shadow-lg transition-shadow"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
              <Icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {card.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {card.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}

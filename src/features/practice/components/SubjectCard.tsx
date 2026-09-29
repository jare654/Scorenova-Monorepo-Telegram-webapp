import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Lock } from 'lucide-react';

interface SubjectCardProps {
  id: string;
  name: string;
  emoji: string;
  topicCount: number;
  questionCount: number;
  isPremium: boolean;
  onClick: () => void;
}

export function SubjectCard({
  name,
  emoji,
  topicCount,
  questionCount,
  isPremium,
  onClick,
}: SubjectCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        'relative flex w-full flex-col items-start rounded-[20px] bg-white p-4 text-left shadow-[0_2px_8px_rgba(0,26,66,0.08)] transition-colors dark:bg-[#08101F]',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D367A]'
      )}
    >
      <div className="mb-3 flex w-full items-start justify-between">
        <span className="text-3xl">{emoji}</span>
        <div className="flex gap-2">
          {isPremium ? (
            <span className="flex items-center gap-1 rounded-full bg-[#FFD000]/10 px-2 py-1 text-xs font-semibold text-[#FFC107]">
              <Lock className="h-3 w-3" />
              PRO
            </span>
          ) : (
            <span className="rounded-full bg-[#3CCF91]/10 px-2 py-1 text-xs font-semibold text-[#3CCF91]">
              FREE
            </span>
          )}
        </div>
      </div>
      
      <h3 className="mb-1 text-lg font-bold text-[#0D367A] dark:text-white">
        {name}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {topicCount} Topics • {questionCount} Questions
      </p>
    </motion.button>
  );
}

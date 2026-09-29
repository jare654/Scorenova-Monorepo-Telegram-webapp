import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Lock, Clock, FileText } from 'lucide-react';

interface TopicCardProps {
  id: string;
  name: string;
  duration: string;
  questionCount: number;
  progress?: number;
  isPremium: boolean;
  isLocked: boolean;
  onClick: () => void;
}

export function TopicCard({
  name,
  duration,
  questionCount,
  progress = 0,
  isPremium,
  isLocked,
  onClick,
}: TopicCardProps) {
  return (
    <motion.button
      whileHover={!isLocked ? { scale: 1.01 } : undefined}
      whileTap={!isLocked ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={cn(
        'relative mb-4 flex w-full flex-col overflow-hidden rounded-[20px] bg-white p-4 text-left shadow-[0_2px_8px_rgba(0,26,66,0.08)] dark:bg-[#08101F]',
        isLocked && 'opacity-75',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D367A]'
      )}
    >
      <div className="flex w-full items-start justify-between">
        <h3 className="mb-2 max-w-[70%] text-base font-semibold text-[#0D367A] dark:text-white">
          {name}
        </h3>
        <div className="flex gap-2">
          {isPremium ? (
            <span className="flex items-center gap-1 rounded-full bg-[#FFD000]/10 px-2 py-1 text-xs font-semibold text-[#FFC107]">
              {isLocked ? <Lock className="h-3 w-3" /> : null}
              PRO
            </span>
          ) : (
            <span className="rounded-full bg-[#3CCF91]/10 px-2 py-1 text-xs font-semibold text-[#3CCF91]">
              FREE
            </span>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          {duration}
        </span>
        <span className="flex items-center gap-1">
          <FileText className="h-4 w-4" />
          {questionCount} Qs
        </span>
      </div>

      {progress > 0 && (
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
          <div 
            className="h-full rounded-full bg-[#3CCF91] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </motion.button>
  );
}

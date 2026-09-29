import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface QuestionPaletteProps {
  totalQuestions: number;
  currentQuestionIndex: number;
  answers: Record<string, string>;
  markedForReview: Record<string, boolean>;
  questions: { id: string }[];
  onSelectQuestion: (index: number) => void;
}

export function QuestionPalette({
  totalQuestions,
  currentQuestionIndex,
  answers,
  markedForReview,
  questions,
  onSelectQuestion,
}: QuestionPaletteProps) {
  return (
    <div className="p-4 grid grid-cols-5 gap-3 max-h-[60vh] overflow-y-auto">
      {Array.from({ length: totalQuestions }).map((_, idx) => {
        const qId = questions[idx]?.id;
        const isAnswered = qId && !!answers[qId];
        const isMarked = qId && !!markedForReview[qId];
        const isCurrent = idx === currentQuestionIndex;

        return (
          <button
            key={idx}
            onClick={() => onSelectQuestion(idx)}
            className={cn(
              'w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold transition-all',
              {
                'bg-gray-200 text-gray-500': !isAnswered && !isMarked && !isCurrent,
                'bg-amber-500 text-white': isMarked && !isCurrent,
                'ring-2 ring-offset-2 ring-[#0D367A]': isCurrent,
                'bg-[#0D367A] text-white': isAnswered || (isCurrent && isAnswered),
                'bg-white text-[#0D367A] border-2 border-[#0D367A]': isCurrent && !isAnswered && !isMarked,
              }
            )}
          >
            {idx + 1}
          </button>
        );
      })}
    </div>
  );
}

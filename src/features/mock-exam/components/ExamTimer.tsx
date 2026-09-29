import React from 'react';
import { cn } from '@/lib/utils';
import { useExamTimer } from '../hooks/useExamTimer';

interface ExamTimerProps {
  durationMinutes: number;
  onTimeUp: () => void;
}

export function ExamTimer({ durationMinutes, onTimeUp }: ExamTimerProps) {
  const { timeLeft, isWarning, isCritical } = useExamTimer(durationMinutes, onTimeUp);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div
      className={cn(
        'font-poppins text-lg font-bold px-3 py-1 rounded-md transition-colors',
        {
          'bg-white/10 text-white': !isWarning && !isCritical,
          'bg-amber-500/20 text-amber-400': isWarning,
          'bg-red-500/20 text-red-500 animate-pulse': isCritical,
        }
      )}
    >
      {formatTime(timeLeft)}
    </div>
  );
}

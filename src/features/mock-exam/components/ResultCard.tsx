import React from 'react';
import { ExamResult } from '../hooks/useMockExam';
import { cn } from '@/lib/utils';
import { CheckCircle2, XCircle, MinusCircle } from 'lucide-react';

interface ResultCardProps {
  result: ExamResult;
}

export function ResultCard({ result }: ResultCardProps) {
  const percentage = Math.round((result.correctAnswers / result.totalQuestions) * 100) || 0;
  
  return (
    <div className="bg-white rounded-[20px] p-6 shadow-[0_2px_8px_rgba(0,26,66,0.08)] font-poppins text-center">
      <div className="relative inline-flex items-center justify-center w-32 h-32 rounded-full mb-4">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            className="text-gray-200 stroke-current"
            strokeWidth="8"
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
          ></circle>
          <circle
            className={cn("stroke-current", result.passed ? "text-[#3CCF91]" : "text-[#D32F2F]")}
            strokeWidth="8"
            strokeDasharray={251.2}
            strokeDashoffset={251.2 - (251.2 * percentage) / 100}
            strokeLinecap="round"
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
          ></circle>
        </svg>
        <div className="absolute text-3xl font-bold text-[#0D367A]">{percentage}%</div>
      </div>
      
      <div className={cn(
        "inline-block px-4 py-1 rounded-full text-sm font-semibold mb-6",
        result.passed ? "bg-[#3CCF91]/10 text-[#3CCF91]" : "bg-[#D32F2F]/10 text-[#D32F2F]"
      )}>
        {result.passed ? 'PASSED' : 'FAILED'}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center">
          <CheckCircle2 className="w-6 h-6 text-[#3CCF91] mb-1" />
          <span className="text-xl font-bold text-[#0D367A]">{result.correctAnswers}</span>
          <span className="text-xs text-gray-500">Correct</span>
        </div>
        <div className="flex flex-col items-center">
          <XCircle className="w-6 h-6 text-[#D32F2F] mb-1" />
          <span className="text-xl font-bold text-[#0D367A]">{result.incorrectAnswers}</span>
          <span className="text-xs text-gray-500">Incorrect</span>
        </div>
        <div className="flex flex-col items-center">
          <MinusCircle className="w-6 h-6 text-gray-400 mb-1" />
          <span className="text-xl font-bold text-[#0D367A]">{result.unanswered}</span>
          <span className="text-xs text-gray-500">Skipped</span>
        </div>
      </div>
    </div>
  );
}

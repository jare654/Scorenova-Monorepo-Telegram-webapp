import React from 'react';
import { Target, Clock, CheckCircle } from 'lucide-react';

interface DailyStatsProps {
  questionsToday: number;
  accuracy: number;
  studyTimeMin: number;
}

export default function DailyStats({ questionsToday, accuracy, studyTimeMin }: DailyStatsProps) {
  const stats = [
    {
      id: 'questions',
      label: 'Questions',
      value: questionsToday.toString(),
      icon: Target,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      id: 'accuracy',
      label: 'Accuracy',
      value: `${accuracy}%`,
      icon: CheckCircle,
      color: 'text-[#3CCF91]',
      bg: 'bg-[#3CCF91]/10',
    },
    {
      id: 'time',
      label: 'Study Time',
      value: `${studyTimeMin}m`,
      icon: Clock,
      color: 'text-[#FD761A]',
      bg: 'bg-[#FD761A]/10',
    },
  ];

  return (
    <div className="mb-8">
      <h3 className="text-lg font-bold mb-3 text-slate-900 dark:text-white">Today's Progress</h3>
      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white dark:bg-slate-800 rounded-[20px] p-3 flex flex-col justify-center gap-2 shadow-[0_2px_8px_rgba(0,26,66,0.04)]"
          >
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-full ${stat.bg} ${stat.color}`}>
                <stat.icon size={14} />
              </div>
              <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
            <div className="text-lg font-bold text-slate-900 dark:text-white pl-1">
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

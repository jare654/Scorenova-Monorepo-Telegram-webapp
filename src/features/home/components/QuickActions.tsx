import React from 'react';
import { useNavigate } from 'react-router-dom';
import { haptic } from '@/lib/telegram';

const actions = [
  {
    id: 'practice',
    label: 'Practice',
    emoji: '📚',
    path: '/practice',
    color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
  },
  {
    id: 'mock',
    label: 'Mock Exams',
    emoji: '📝',
    path: '/mock-exams',
    color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
  },
  {
    id: 'progress',
    label: 'Progress',
    emoji: '📊',
    path: '/profile/progress',
    color: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
  }
];

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold mb-3 text-slate-900 dark:text-white">Quick Actions</h3>
      <div className="grid grid-cols-3 gap-3">
        {actions.map((action) => (
          <div
            key={action.id}
            onClick={() => {
              haptic('selection');
              navigate(action.path);
            }}
            className="bg-white dark:bg-slate-800 rounded-[20px] p-4 flex flex-col items-center justify-center gap-2 shadow-[0_2px_8px_rgba(0,26,66,0.04)] cursor-pointer active:scale-95 transition-transform"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${action.color}`}>
              {action.emoji}
            </div>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {action.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { useProgress } from './hooks/useProgress';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Flame, Clock, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ProgressPage() {
  const { data: progress, isLoading } = useProgress();

  const mockWeeklyData = [
    { day: 'Mon', hours: 2 },
    { day: 'Tue', hours: 3.5 },
    { day: 'Wed', hours: 1 },
    { day: 'Thu', hours: 4 },
    { day: 'Fri', hours: 2.5 },
    { day: 'Sat', hours: 5 },
    { day: 'Sun', hours: 6 },
  ];

  if (isLoading) return <div className="p-8 text-center text-gray-500">Loading progress...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-24 font-poppins min-h-screen bg-[#F8FAFC] dark:bg-[#08101F]">
      <div className="bg-[#0D367A] pt-10 pb-16 px-4 rounded-b-[40px] text-white">
        <h1 className="text-2xl font-bold mb-6 text-center">Your Progress</h1>
        
        <div className="flex justify-center mb-6 relative">
          <div className="w-32 h-32 rounded-full border-8 border-[#3CCF91]/20 flex items-center justify-center relative">
            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
              <circle cx="60" cy="60" r="56" className="stroke-[#3CCF91]" strokeWidth="8" fill="none" strokeDasharray="351" strokeDashoffset={351 - (351 * 85) / 100} strokeLinecap="round" />
            </svg>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#FFD000]">85%</div>
              <div className="text-xs text-white/80">Accuracy</div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1 bg-white/10 rounded-2xl p-4 flex flex-col items-center">
            <Flame className="w-8 h-8 text-[#FFC107] mb-2" />
            <div className="text-2xl font-bold">12</div>
            <div className="text-xs text-white/80">Day Streak</div>
          </div>
          <div className="flex-1 bg-white/10 rounded-2xl p-4 flex flex-col items-center">
            <Clock className="w-8 h-8 text-[#3CCF91] mb-2" />
            <div className="text-2xl font-bold">48h</div>
            <div className="text-xs text-white/80">Study Time</div>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-8 relative z-10 space-y-6">
        <div className="bg-white dark:bg-[#0F172A] p-4 rounded-2xl shadow-[0_2px_8px_rgba(0,26,66,0.08)]">
          <h2 className="text-lg font-bold text-[#0D367A] dark:text-white mb-4">Weekly Activity</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockWeeklyData}>
                <XAxis dataKey="day" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Line type="monotone" dataKey="hours" stroke="#0D367A" strokeWidth={3} dot={{ r: 4, fill: '#0D367A' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
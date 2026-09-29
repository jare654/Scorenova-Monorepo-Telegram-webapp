import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { apiClient } from '@/lib/api';

import GreetingHeader from './components/GreetingHeader';
import ContinueLearningCard from './components/ContinueLearningCard';
import QuickActions from './components/QuickActions';
import UpgradeBanner from './components/UpgradeBanner';
import DailyStats from './components/DailyStats';

export default function HomePage() {
  const { data: progressData, isLoading } = useQuery({
    queryKey: ['progress', 'me'],
    queryFn: async () => {
      const response = await apiClient.get('/progress/me');
      return (response as any).data || response;
    },
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-slate-50 dark:bg-[#08101F] font-poppins pb-24"
    >
      <div className="p-4 pt-6">
        <GreetingHeader />
        
        {progressData?.lastPracticed && (
          <ContinueLearningCard 
            subject={progressData.lastPracticed.subject}
            topic={progressData.lastPracticed.topic}
            progress={progressData.lastPracticed.progress}
          />
        )}
        
        <QuickActions />
        
        <UpgradeBanner />
        
        {!isLoading && progressData?.dailyStats ? (
          <DailyStats 
            questionsToday={progressData.dailyStats.questionsToday}
            accuracy={progressData.dailyStats.accuracy}
            studyTimeMin={progressData.dailyStats.studyTimeMin}
          />
        ) : (
          <div className="h-24 bg-slate-200 dark:bg-slate-800 rounded-[20px] animate-pulse mb-8" />
        )}
      </div>
    </motion.div>
  );
}

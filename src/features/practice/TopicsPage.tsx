import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useTopics } from './hooks/usePractice';
import { TopicCard } from './components/TopicCard';

// Dummy store imports
// import { usePremiumStore } from '@/lib/store';

export default function TopicsPage() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  // const isPremiumUser = usePremiumStore(state => state.isPremium);
  const isPremiumUser = false; // Placeholder
  const [showPremiumGate, setShowPremiumGate] = useState(false);

  const { data: topics, isLoading, error } = useTopics(subjectId || '');

  if (isLoading) {
    return (
      <div className="flex h-screen flex-col bg-[#F8FAFC] dark:bg-[#08101F]">
        <div className="flex items-center p-4">
          <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse dark:bg-gray-800" />
          <div className="ml-4 h-6 w-32 rounded bg-gray-200 animate-pulse dark:bg-gray-800" />
        </div>
        <div className="p-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="mb-4 h-24 rounded-[20px] bg-gray-200 animate-pulse dark:bg-gray-800" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-500">Failed to load topics.</div>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC] dark:bg-[#08101F] pb-24">
      <div className="sticky top-0 z-10 flex items-center bg-[#F8FAFC]/80 px-4 py-4 backdrop-blur-md dark:bg-[#08101F]/80">
        <button 
          onClick={() => navigate(-1)}
          className="rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          <ChevronLeft className="h-6 w-6 text-[#0D367A] dark:text-white" />
        </button>
        <h1 className="ml-2 text-xl font-bold text-[#0D367A] dark:text-white">Topics</h1>
      </div>

      <div className="p-4">
        {topics?.map((topic: any) => {
          const isLocked = topic.isPremium && !isPremiumUser;
          
          return (
            <TopicCard
              key={topic.id}
              id={topic.id}
              name={topic.name}
              duration={topic.duration || '15 min'}
              questionCount={topic.questionCount || 0}
              progress={topic.progress || 0}
              isPremium={topic.isPremium || false}
              isLocked={isLocked}
              onClick={() => {
                if (isLocked) {
                  setShowPremiumGate(true);
                } else {
                  navigate(`/practice/${topic.id}/questions`);
                }
              }}
            />
          );
        })}
      </div>

      {showPremiumGate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-[20px] bg-white p-6 shadow-xl dark:bg-[#08101F]">
            <h2 className="mb-2 text-xl font-bold text-[#0D367A] dark:text-white">Premium Content</h2>
            <p className="mb-6 text-gray-500 dark:text-gray-400">Upgrade to Premium to access this topic and much more.</p>
            <div className="flex gap-4">
              <button 
                onClick={() => setShowPremiumGate(false)}
                className="flex-1 rounded-full bg-gray-200 py-3 font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                Cancel
              </button>
              <button 
                className="flex-1 rounded-full bg-[#FFD000] py-3 font-semibold text-[#0D367A]"
              >
                Upgrade
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

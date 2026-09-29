import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubjects } from './hooks/usePractice';
import { SubjectCard } from './components/SubjectCard';

// Dummy store imports, replace with actual
// import { useAuthStore } from '@/lib/store';

export default function PracticePage() {
  const navigate = useNavigate();
  // const userStream = useAuthStore(state => state.user?.stream) || 'natural';
  const userStream = 'natural'; // Placeholder
  
  const { data: subjects, isLoading, error } = useSubjects(userStream);

  if (isLoading) {
    return (
      <div className="p-4 pt-6 pb-24">
        <h1 className="mb-6 text-2xl font-bold text-[#0D367A] dark:text-white">Practice</h1>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 rounded-[20px] bg-gray-200 animate-pulse dark:bg-gray-800" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-500">Failed to load subjects.</div>;
  }

  return (
    <div className="p-4 pt-6 pb-24">
      <h1 className="mb-6 text-2xl font-bold text-[#0D367A] dark:text-white">Practice Subjects</h1>
      <div className="grid grid-cols-2 gap-4">
        {subjects?.map((subject: any) => (
          <SubjectCard
            key={subject.id}
            id={subject.id}
            name={subject.name}
            emoji={subject.emoji || '📚'}
            topicCount={subject.topicCount || 0}
            questionCount={subject.questionCount || 0}
            isPremium={subject.isPremium || false}
            onClick={() => navigate(`/practice/${subject.id}/topics`)}
          />
        ))}
      </div>
    </div>
  );
}

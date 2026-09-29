import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubjects } from './hooks/usePractice';
import { SubjectCard } from './components/SubjectCard';

export default function PracticePage() {
  const navigate = useNavigate();
  const { data: subjects, isLoading, error } = useSubjects();

  return (
    <div className="flex flex-col min-h-screen bg-white font-poppins pb-[100px]">
      
      {/* HEADER SECTION */}
      <div className="w-full bg-[#0D367A] rounded-b-[32px] px-6 pt-10 pb-8 relative z-10">
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <h1 className="text-white text-[28px] font-bold">Practice</h1>
            <div className="h-1.5" />
            <p className="text-white/70 text-[14px] leading-[1.4]">
              Choose a subject<br/>to start practicing
            </p>
          </div>
          <div className="w-[90px] h-[90px] ml-4 flex-shrink-0">
            <img 
              src="/assets/practice_books.png" 
              alt="Books" 
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="flex-1 px-5 pt-6">
        {isLoading ? (
          <div className="flex flex-col space-y-3.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-[82px] rounded-[20px] bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center pt-20">
            <p className="text-red-500 font-bold mb-2">Error loading subjects</p>
            <p className="text-[#64748B] text-[12px] text-center max-w-[250px]">{String(error)}</p>
          </div>
        ) : !subjects || subjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-20">
            <p className="text-[#64748B] text-[16px]">No subjects found.</p>
          </div>
        ) : (
          <div className="flex flex-col">
            {subjects?.map((subject: any) => (
              <SubjectCard
                key={subject.id}
                id={subject.id}
                title={subject.name}
                topicsCount={subject.topicCount || 0}
                isLocked={subject.accessType === 'paid'}
                onTap={() => navigate(`/practice/${subject.id}/topics`)}
                onLockedTap={() => navigate('/upgrade')}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

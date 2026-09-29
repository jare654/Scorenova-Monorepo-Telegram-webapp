import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Lock } from 'lucide-react';
import { useTopics } from './hooks/usePractice';

const getTopicIconUrl = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('biology')) return 'https://api.iconify.design/mdi:dna.svg?color=white';
  if (t.includes('math') || t.includes('aptitude')) return 'https://api.iconify.design/mdi:calculator.svg?color=white';
  if (t.includes('science') || t.includes('physics') || t.includes('chemistry')) return 'https://api.iconify.design/mdi:flask.svg?color=white';
  return 'https://api.iconify.design/mdi:book-open-variant.svg?color=white';
};

export default function TopicsPage() {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  // Pass subject name somehow, maybe from location state, or just fetch it
  // For now, if we don't have it, we just display 'Subject'
  
  const { data: topics, isLoading } = useTopics(subjectId!);

  return (
    <div className="flex flex-col min-h-screen bg-[#0B3175] font-poppins">
      {/* HEADER */}
      <div className="w-full pt-[48px] pb-[20px]">
        <button 
          onClick={() => navigate(-1)}
          className="ml-2 p-2"
        >
          <ArrowLeft size={28} color="white" />
        </button>
        <div className="px-6 mt-3">
          <h1 className="text-white text-[34px] font-extrabold tracking-[-0.5px]">
            Topics
          </h1>
          <div className="h-2.5" />
          <p className="text-white/70 text-[16px] font-medium leading-[1.3]">
            Choose a topic to<br/>start practicing
          </p>
        </div>
      </div>

      {/* CONTENT ROUNDED CONTAINER */}
      <div className="flex-1 bg-white rounded-t-[32px] w-full px-5 pt-8 pb-10">
        {isLoading ? (
          <div className="flex flex-col space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-[74px] bg-gray-100 animate-pulse rounded-[16px]" />
            ))}
          </div>
        ) : topics?.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-20">
            <p className="text-[#64748B] text-[16px]">No topics found.</p>
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            {topics?.map((topic: any) => {
              const isPremium = topic.accessType === 'paid';
              const iconUrl = getTopicIconUrl('subject'); // Using default icon mapping
              
              return (
                <button
                  key={topic.id}
                  onClick={() => navigate(`/practice/${topic.id}/questions`)}
                  className="w-full bg-white rounded-[16px] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-3 flex items-center text-left active:scale-[0.98] transition-transform"
                >
                  <div className="w-[50px] h-[50px] bg-[#0D367A] rounded-[12px] flex items-center justify-center shrink-0">
                    <img src={iconUrl} alt="Icon" className="w-[24px] h-[24px]" />
                  </div>
                  
                  <div className="ml-4 flex-1 overflow-hidden pr-2">
                    <h3 className="text-[16px] font-bold text-[#1F2937] truncate">
                      {topic.name}
                    </h3>
                    <div className="flex items-center mt-1">
                      <span className="text-[13px] font-medium text-[#6B7280] truncate max-w-[120px]">
                        {topic.questionCount > 0 ? `${topic.questionCount} Questions` : 'Questions Available'}
                      </span>
                      <div className="w-2" />
                      <div className={`px-2 py-[3px] rounded-full text-[10px] font-bold ${
                        isPremium 
                          ? 'bg-[#FACC15]/15 text-[#EAB308]' 
                          : 'bg-[#22C55E]/10 text-[#22C55E]'
                      }`}>
                        {isPremium ? 'PREMIUM' : 'FREE'}
                      </div>
                    </div>
                  </div>

                  {isPremium && (
                    <div className="shrink-0 mr-2">
                      <Lock size={18} color="#9CA3AF" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

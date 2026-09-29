import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, ChevronRight } from 'lucide-react';
import { useAuthStore } from '@/lib/store';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';

export default function HomePage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  // Fetch progress logic placeholder
  const { data: progress } = useQuery<any>({
    queryKey: ['progress-me'],
    queryFn: () => apiClient.get('/progress/me').catch(() => null),
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning,';
    if (hour < 17) return 'Good afternoon,';
    return 'Good evening,';
  };

  const toTitleCase = (str: string) => {
    return str.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-poppins pb-[100px]">
      
      {/* HEADER WIDGET */}
      <div className="w-full bg-[#0D367A] rounded-b-[32px] px-6 pt-10 pb-8 relative z-10">
        <div className="flex justify-between items-center mb-3">
          <span className="text-white/70 text-[16px] font-medium">{getGreeting()}</span>
          <button 
            onClick={() => navigate('/notifications')}
            className="w-[38px] h-[38px] bg-white/10 rounded-full flex items-center justify-center relative"
          >
            <Bell size={20} color="white" />
            <span className="absolute top-[8px] right-[10px] w-2 h-2 bg-[#FF5252] rounded-full border border-[#0D367A]" />
          </button>
        </div>

        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h1 className="text-white text-[28px] font-bold leading-tight">
              {toTitleCase(user?.name || 'Student')}
            </h1>
            <p className="text-white/60 text-[14px] mt-1 pr-4">
              Keep practicing. Keep improving. Keep scoring.
            </p>
          </div>
          <div className="w-[90px] h-[90px] ml-4 flex-shrink-0">
            <img 
              src="/assets/trophy.png" 
              alt="Trophy" 
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col space-y-6">
        
        {/* CONTINUE LEARNING CARD */}
        <div className="px-6">
          <div className="bg-white rounded-[20px] p-4 border-[2px] border-[#FFD000] shadow-[0_4px_10px_rgba(0,0,0,0.05)] flex justify-between items-center">
            <div className="flex-1">
              <h3 className="text-[#0D367A] text-[18px] font-bold mb-1">
                {progress?.lastTopic ? "Continue Learning" : "No progress yet"}
              </h3>
              <p className="text-[14px] font-bold mb-1">
                {progress?.lastTopic?.title || "Start practicing to see"}
              </p>
              <p className="text-[13px] text-[#71717A]">
                {progress?.lastTopic?.subject || "your progress"}
              </p>
            </div>
            
            <div className="flex flex-col items-center justify-center ml-4">
              <div className="relative w-[50px] h-[50px] flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="25" cy="25" r="22" stroke="#F1F5F9" strokeWidth="4" fill="none" />
                  <circle 
                    cx="25" cy="25" r="22" 
                    stroke="#FFD000" strokeWidth="4" fill="none" 
                    strokeDasharray="138" 
                    strokeDashoffset={138 - (138 * (progress?.lastTopic?.percentage || 0)) / 100}
                    strokeLinecap="round" 
                  />
                </svg>
                <span className="absolute text-[12px] font-bold text-[#0D367A]">
                  {progress?.lastTopic?.percentage || 0}%
                </span>
              </div>
              <button 
                onClick={() => navigate('/practice')}
                className="mt-2 bg-[#0D367A] text-white text-[12px] font-bold px-4 py-1.5 rounded-full"
              >
                {progress?.lastTopic ? "Continue" : "Start Practice"}
              </button>
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS SECTION */}
        <div className="px-6">
          <h2 className="text-[20px] font-bold text-black mb-4">Quick Actions</h2>
          <div className="bg-white rounded-[16px] border border-[#E5E7EB] shadow-[0_4px_10px_rgba(0,0,0,0.02)] overflow-hidden">
            
            <button onClick={() => navigate('/practice')} className="w-full flex items-center p-4 active:bg-gray-50 transition-colors">
              <div className="w-[48px] h-[48px] bg-[#0D367A] rounded-[12px] flex items-center justify-center flex-shrink-0">
                <img src="https://api.iconify.design/material-symbols:menu-book-rounded.svg?color=white" className="w-6 h-6" alt="Practice" />
              </div>
              <div className="ml-4 flex-1 text-left">
                <div className="text-[16px] font-bold text-black">Practice</div>
                <div className="text-[13px] text-[#71717A] mt-0.5">Topic-based questions</div>
              </div>
              <ChevronRight size={24} color="#CBD5E1" />
            </button>

            <div className="h-[1px] bg-[#F1F5F9] mx-4" />

            <button onClick={() => navigate('/mock-exams')} className="w-full flex items-center p-4 active:bg-gray-50 transition-colors">
              <div className="w-[48px] h-[48px] bg-[#FACC15] rounded-[12px] flex items-center justify-center flex-shrink-0">
                <img src="https://api.iconify.design/material-symbols:verified-user-rounded.svg?color=white" className="w-6 h-6" alt="Mock Exam" />
              </div>
              <div className="ml-4 flex-1 text-left">
                <div className="text-[16px] font-bold text-black">Mock Exam</div>
                <div className="text-[13px] text-[#71717A] mt-0.5">Full simulation tests</div>
              </div>
              <ChevronRight size={24} color="#CBD5E1" />
            </button>

            <div className="h-[1px] bg-[#F1F5F9] mx-4" />

            <button onClick={() => navigate('/profile/progress')} className="w-full flex items-center p-4 active:bg-gray-50 transition-colors">
              <div className="w-[48px] h-[48px] bg-[#0D367A] rounded-[12px] flex items-center justify-center flex-shrink-0">
                <img src="https://api.iconify.design/material-symbols:bar-chart-rounded.svg?color=white" className="w-6 h-6" alt="Progress" />
              </div>
              <div className="ml-4 flex-1 text-left">
                <div className="text-[16px] font-bold text-black">Progress</div>
                <div className="text-[13px] text-[#71717A] mt-0.5">View your analytics</div>
              </div>
              <ChevronRight size={24} color="#CBD5E1" />
            </button>
          </div>
        </div>

        {/* PREMIUM PROMOTIONAL BANNER */}
        {!user?.is_premium && (
          <div className="px-6 mb-8">
            <button 
              onClick={() => navigate('/upgrade')}
              className="w-full bg-[#EBF3FF] rounded-[16px] overflow-hidden active:opacity-90 transition-opacity"
            >
              <img 
                src="/assets/premium_banner.png" 
                alt="Upgrade to Premium" 
                className="w-full h-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/lib/store';
import { Bell } from 'lucide-react';
import { haptic } from '@/lib/telegram';

export default function GreetingHeader() {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const firstName = user?.firstName || 'Student';
  const initials = firstName.charAt(0).toUpperCase();

  const handleNotificationClick = () => {
    haptic('light');
    navigate('/notifications');
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl overflow-hidden shadow-sm">
          {user?.photoUrl ? (
            <img src={user.photoUrl} alt={firstName} className="w-full h-full object-cover" />
          ) : (
            initials
          )}
        </div>
        <div>
          <p className="text-slate-500 dark:text-slate-400 text-sm">{getGreeting()},</p>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">{firstName}</h2>
            {user?.streak && user.streak > 0 && (
              <span className="bg-[#FFD000]/20 text-[#FFC107] text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                🔥 {user.streak}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <button 
        onClick={handleNotificationClick}
        className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 shadow-[0_2px_8px_rgba(0,26,66,0.08)]"
      >
        <Bell size={20} />
      </button>
    </div>
  );
}

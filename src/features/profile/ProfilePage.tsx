import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Settings, HelpCircle, Info, MessageSquare, LogOut, Trash2, Award, Bookmark, Target, Edit3, Lock } from 'lucide-react';
import { useAuthStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { haptic, showAlert, showConfirm } from '@/lib/telegram';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const isPremium = user?.isPremium || false;

  const handleLogout = async () => {
    haptic('medium');
    showConfirm('Are you sure you want to log out?').then((confirmed) => {
      if (confirmed) {
        logout();
        navigate('/login');
      }
    });
  };

  const menuItems = [
    { icon: <Target className="w-5 h-5" />, label: 'My Progress', path: '/profile/progress' },
    { icon: <Award className="w-5 h-5" />, label: 'Study Goals', path: '/profile/goals' },
    { icon: <Award className="w-5 h-5" />, label: 'Achievements', path: '/profile/achievements' },
    { icon: <Bookmark className="w-5 h-5" />, label: 'Bookmarks', path: '/profile/bookmarks' },
    { icon: <Edit3 className="w-5 h-5" />, label: 'Edit Profile', path: '/profile/edit' },
    { icon: <Lock className="w-5 h-5" />, label: 'Change Password', path: '/profile/password' },
    { icon: <Settings className="w-5 h-5" />, label: 'Settings', path: '/settings' },
    { icon: <HelpCircle className="w-5 h-5" />, label: 'Help & Support', path: '/help' },
    { icon: <Info className="w-5 h-5" />, label: 'About', path: '/about' },
    { icon: <MessageSquare className="w-5 h-5" />, label: 'Feedback', path: '/feedback' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-24 font-poppins text-[#08101F] dark:text-[#F8FAFC]">
      <div className="bg-[#0D367A] pt-12 pb-6 px-4 rounded-b-[30px] text-white">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold">
            {user?.firstName?.charAt(0) || 'U'}
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold">{user?.firstName} {user?.lastName}</h1>
            <p className="text-white/80 text-sm">{user?.stream || 'Natural Science'}</p>
            <div className={cn("mt-1 text-xs px-2 py-1 rounded-full inline-block font-semibold", isPremium ? "bg-[#FFD000] text-[#0D367A]" : "bg-gray-400 text-white")}>
              {isPremium ? 'Premium Member' : 'Free Plan'}
            </div>
          </div>
        </div>
        
        <div className="flex justify-between mt-6 bg-white/10 rounded-2xl p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#FFC107]">3</div>
            <div className="text-xs text-white/80">Day Streak</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#3CCF91]">142</div>
            <div className="text-xs text-white/80">Questions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#FFD000]">85%</div>
            <div className="text-xs text-white/80">Accuracy</div>
          </div>
        </div>
      </div>

      <div className="px-4 mt-6 space-y-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => { haptic('light'); navigate(item.path); }}
            className="w-full flex items-center justify-between p-4 bg-white dark:bg-[#08101F] rounded-[20px] shadow-[0_2px_8px_rgba(0,26,66,0.08)]"
          >
            <div className="flex items-center space-x-3 text-[#0D367A] dark:text-white">
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        ))}

        <button
          onClick={() => { haptic('light'); navigate('/profile/delete-account'); }}
          className="w-full flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-[20px] mt-4"
        >
          <div className="flex items-center space-x-3 text-[#D32F2F]">
            <Trash2 className="w-5 h-5" />
            <span className="font-medium">Delete Account</span>
          </div>
          <ChevronRight className="w-5 h-5 text-[#D32F2F]" />
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-800 rounded-[20px] mt-6 mb-8 text-gray-700 dark:text-gray-300 font-bold"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Log Out
        </button>
      </div>
    </motion.div>
  );
}
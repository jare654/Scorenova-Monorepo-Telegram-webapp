import React from 'react';
import { motion } from 'framer-motion';
import { useThemeStore } from '@/lib/store';
import { haptic } from '@/lib/telegram';
import { Bell, Moon, Shield, FileText, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
  const { isDark, toggleTheme } = useThemeStore();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  const toggleDarkMode = () => {
    haptic('light');
    toggleTheme();
  };

  const toggleNotifications = () => {
    haptic('light');
    setNotificationsEnabled(!notificationsEnabled);
  };

  const Item = ({ icon, label, onClick, right }: { icon: React.ReactNode, label: string, onClick?: () => void, right?: React.ReactNode }) => (
    <div 
      onClick={onClick}
      className={cn("flex items-center justify-between p-4 bg-white dark:bg-[#0F172A] rounded-[20px] shadow-[0_2px_8px_rgba(0,26,66,0.08)] mb-3", onClick && "cursor-pointer active:scale-[0.98] transition-transform")}
    >
      <div className="flex items-center space-x-3 text-[#0D367A] dark:text-white">
        {icon}
        <span className="font-medium text-sm">{label}</span>
      </div>
      {right}
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-24 pt-6 px-4 font-poppins min-h-screen bg-[#F8FAFC] dark:bg-[#08101F]">
      <h1 className="text-2xl font-bold text-[#0D367A] dark:text-white mb-6">Settings</h1>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3 ml-2">Preferences</h2>
          
          <Item 
            icon={<Moon className="w-5 h-5 text-indigo-500" />} 
            label="Dark Mode" 
            onClick={toggleDarkMode}
            right={
              <div className={cn("w-12 h-6 rounded-full relative transition-colors duration-300", isDark ? "bg-[#3CCF91]" : "bg-gray-300")}>
                <div className={cn("w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all duration-300 shadow-sm", isDark ? 'right-0.5' : 'left-0.5')} />
              </div>
            }
          />
          
          <Item 
            icon={<Bell className="w-5 h-5 text-orange-500" />} 
            label="Push Notifications" 
            onClick={toggleNotifications}
            right={
              <div className={cn("w-12 h-6 rounded-full relative transition-colors duration-300", notificationsEnabled ? "bg-[#3CCF91]" : "bg-gray-300")}>
                <div className={cn("w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all duration-300 shadow-sm", notificationsEnabled ? 'right-0.5' : 'left-0.5')} />
              </div>
            }
          />
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3 ml-2">About</h2>
          <Item icon={<FileText className="w-5 h-5 text-blue-500" />} label="Terms of Service" onClick={() => haptic('light')} right={<span className="text-gray-400">→</span>} />
          <Item icon={<Shield className="w-5 h-5 text-green-500" />} label="Privacy Policy" onClick={() => haptic('light')} right={<span className="text-gray-400">→</span>} />
          
          <div className="flex flex-col items-center justify-center mt-8 text-gray-400 dark:text-gray-500">
            <Smartphone className="w-8 h-8 mb-2 opacity-50" />
            <span className="text-sm font-semibold">Scorenova Telegram Web App</span>
            <span className="text-xs">Version 1.0.0</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
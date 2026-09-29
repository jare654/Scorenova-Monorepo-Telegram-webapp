import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePremiumStore } from '@/lib/store';
import { haptic } from '@/lib/telegram';

export default function UpgradeBanner() {
  const isPremium = usePremiumStore((state) => state.isPremium);
  const navigate = useNavigate();

  if (isPremium) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-[#FFD000] to-[#FF9D00] rounded-[20px] p-5 mb-6 text-slate-900 shadow-[0_4px_12px_rgba(255,208,0,0.2)]"
    >
      <div className="flex justify-between items-center">
        <div className="flex-1 pr-4">
          <h3 className="font-bold text-lg mb-1 flex items-center gap-1">
            Unlock Premium 👑
          </h3>
          <p className="text-sm font-medium opacity-90">
            Get unlimited AI solvers, mock exams, and analytics.
          </p>
        </div>
        <button
          onClick={() => {
            haptic('light');
            navigate('/upgrade');
          }}
          className="bg-slate-900 text-white text-sm font-bold px-4 py-2.5 rounded-full whitespace-nowrap active:scale-95 transition-transform"
        >
          Upgrade Now
        </button>
      </div>
    </motion.div>
  );
}

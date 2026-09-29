import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';
import { haptic } from '@/lib/telegram';

interface ContinueLearningCardProps {
  subject: string;
  topic: string;
  progress: number; // 0-100
}

export default function ContinueLearningCard({ subject, topic, progress }: ContinueLearningCardProps) {
  const navigate = useNavigate();

  const handleContinue = () => {
    haptic('light');
    navigate('/practice/continue');
  };

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={handleContinue}
      className="bg-gradient-to-r from-primary to-[#1A56B8] rounded-[20px] p-5 text-white shadow-[0_4px_12px_rgba(13,54,122,0.2)] mb-6 cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="bg-white/20 text-xs font-semibold px-2.5 py-1 rounded-full mb-2 inline-block">
            {subject}
          </span>
          <h3 className="font-bold text-lg line-clamp-1">{topic}</h3>
        </div>
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
          <Play size={20} className="fill-white translate-x-0.5" />
        </div>
      </div>
      
      <div className="mt-2">
        <div className="flex justify-between text-sm mb-1.5 font-medium">
          <span className="text-white/80">Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div 
            className="bg-[#3CCF91] h-2 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}

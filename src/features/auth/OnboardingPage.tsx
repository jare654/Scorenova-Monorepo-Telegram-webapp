import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { haptic } from '@/lib/telegram';

const slides = [
  {
    title: 'AI Exam Solver & Step-by-Step Walkthroughs',
    emoji: '🧠',
    color: 'bg-primary/10 text-primary',
  },
  {
    title: 'National Curriculum Topic-by-Topic Question Bank',
    emoji: '📚',
    color: 'bg-[#FFD000]/10 text-[#FFC107]',
  },
  {
    title: 'Real-time Timed Mock Exam Simulator',
    emoji: '⏱️',
    color: 'bg-[#FD761A]/10 text-[#FD761A]',
  },
  {
    title: 'Actionable Performance Analytics',
    emoji: '📊',
    color: 'bg-[#3CCF91]/10 text-[#3CCF91]',
  },
];

export default function OnboardingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    haptic('light');
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleGetStarted = () => {
    haptic('success');
    navigate('/setup');
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-[#08101F] text-slate-900 dark:text-white font-poppins relative overflow-hidden">
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            <div
              className={cn(
                'w-48 h-48 rounded-full flex items-center justify-center text-8xl mb-8',
                slides[currentIndex]?.color
              )}
            >
              {slides[currentIndex]?.emoji}
            </div>
            <h1 className="text-2xl font-bold mb-4 max-w-sm">
              {slides[currentIndex]?.title}
            </h1>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="p-8 pb-12 flex flex-col items-center gap-6">
        {/* Dots */}
        <div className="flex gap-2">
          {slides.map((_, idx) => (
            <div
              key={idx}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                idx === currentIndex
                  ? 'w-6 bg-primary dark:bg-white'
                  : 'w-2 bg-slate-300 dark:bg-slate-700'
              )}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="w-full flex flex-col gap-3">
          {currentIndex < slides.length - 1 ? (
            <>
              <button
                onClick={handleNext}
                className="w-full h-[58px] bg-primary text-white rounded-[20px] font-semibold text-lg shadow-[0_2px_8px_rgba(0,26,66,0.08)]"
              >
                Next
              </button>
              <button
                onClick={handleGetStarted}
                className="w-full h-[58px] bg-transparent text-slate-500 dark:text-slate-400 font-semibold text-lg"
              >
                Skip
              </button>
            </>
          ) : (
            <button
              onClick={handleGetStarted}
              className="w-full h-[58px] bg-primary text-white rounded-[20px] font-semibold text-lg shadow-[0_2px_8px_rgba(0,26,66,0.08)]"
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

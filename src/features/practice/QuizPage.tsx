import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useQuestions } from './hooks/usePractice';

export default function QuizPage() {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();

  const { data: questions, isLoading, error } = useQuestions(topicId || '');

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes mock
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (isLoading || isFinished) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isLoading, isFinished]);

  if (isLoading) return <div className="flex h-screen items-center justify-center dark:bg-[#08101F]">Loading Quiz...</div>;
  if (error || !questions) return <div className="p-4">Failed to load quiz.</div>;

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionId: string) => {
    setSelectedOptions(prev => ({ ...prev, [currentIndex]: optionId }));
    // Auto advance in quiz mode if needed, or wait for next button
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  if (isFinished) {
    // Calculate score
    let score = 0;
    questions.forEach((q: any, i: number) => {
      if (selectedOptions[i] === q.correctAnswer) score++;
    });

    return (
      <div className="flex h-screen flex-col items-center justify-center bg-[#F8FAFC] p-6 dark:bg-[#08101F]">
        <h2 className="mb-4 text-3xl font-bold text-[#0D367A] dark:text-white">Quiz Completed!</h2>
        <div className="mb-8 flex h-40 w-40 flex-col items-center justify-center rounded-full bg-white shadow-xl dark:bg-[#15233D]">
          <span className="text-4xl font-bold text-[#3CCF91]">{score}</span>
          <span className="text-gray-500 dark:text-gray-400">out of {questions.length}</span>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="w-full max-w-xs rounded-full bg-[#0D367A] py-4 font-bold text-white shadow-md"
        >
          Return to Topics
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-[#F8FAFC] dark:bg-[#08101F]">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4">
        <button onClick={() => navigate(-1)} className="p-2">
          <X className="h-6 w-6 text-gray-500" />
        </button>
        <div className="flex flex-col items-center">
          <div className="font-semibold text-gray-600 dark:text-gray-300">
            {currentIndex + 1} of {questions.length}
          </div>
          <div className="flex items-center gap-1 text-sm font-bold text-red-500">
            <Clock className="h-4 w-4" />
            {formatTime(timeLeft)}
          </div>
        </div>
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Progress Bar */}
      <div className="h-1 w-full bg-gray-200 dark:bg-gray-800">
        <div className="h-full bg-[#0D367A] transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      {/* Question Content */}
      <div className="flex-1 overflow-y-auto p-4 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-6 text-lg font-medium text-[#0D367A] dark:text-white">
              {currentQuestion.text}
            </div>

            <div className="flex flex-col gap-3">
              {currentQuestion.options?.map((option: any) => {
                const isSelected = selectedOptions[currentIndex] === option.id;
                
                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelectOption(option.id)}
                    className={cn(
                      "flex w-full items-center rounded-xl border-2 p-4 text-left font-medium transition-colors",
                      isSelected
                        ? "border-[#0D367A] bg-[#0D367A]/10 text-[#0D367A] dark:border-blue-400 dark:text-blue-400"
                        : "border-gray-200 bg-white text-gray-700 hover:border-[#0D367A] dark:border-gray-700 dark:bg-[#15233D] dark:text-gray-200"
                    )}
                  >
                    <span className={cn(
                      "mr-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border",
                      isSelected ? "border-[#0D367A] bg-[#0D367A] text-white dark:border-blue-400 dark:bg-blue-400" : "border-current"
                    )}>
                      {option.label}
                    </span>
                    <span>{option.text}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between border-t border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-[#08101F]">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="rounded-full px-6 py-3 font-semibold text-gray-500 disabled:opacity-50 dark:text-gray-400"
        >
          Previous
        </button>
        
        <button
          onClick={handleNext}
          className="rounded-full bg-[#0D367A] px-8 py-3 font-bold text-white shadow-md dark:bg-blue-600"
        >
          {currentIndex === questions.length - 1 ? 'Finish Quiz' : 'Next'}
        </button>
      </div>
    </div>
  );
}

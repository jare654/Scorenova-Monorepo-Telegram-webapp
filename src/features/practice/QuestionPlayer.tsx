import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Heart, Flag, Sparkles, X } from 'lucide-react';
import { cn } from '@/lib/utils';
// import { haptic } from '@/lib/telegram';
// import { useNavStore } from '@/lib/store';
import { useQuestions, useBookmark, useAiExplain } from './hooks/usePractice';

// Mock Telegram Haptic since we don't have the actual import available
const haptic = (type: string) => {
  console.log(`Haptic feedback: ${type}`);
};

export default function QuestionPlayer() {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  // const setNavVisible = useNavStore(state => state.setNavVisible);

  const { data: questions, isLoading, error } = useQuestions(topicId || '');
  const bookmarkMutation = useBookmark();
  const explainMutation = useAiExplain();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({});
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});
  const [aiExplainResult, setAiExplainResult] = useState<any>(null);
  const [isAiExplainLoading, setIsAiExplainLoading] = useState(false);
  const [showAiSheet, setShowAiSheet] = useState(false);

  useEffect(() => {
    // setNavVisible(false);
    // return () => setNavVisible(true);
  }, []);

  if (isLoading) return <div className="flex h-screen items-center justify-center dark:bg-[#08101F]">Loading...</div>;
  if (error || !questions || questions.length === 0) return <div className="p-4">Failed to load questions.</div>;

  const currentQuestion = questions[currentIndex];
  const hasAnsweredCurrent = !!selectedOptions[currentIndex];
  const isCorrect = selectedOptions[currentIndex] === currentQuestion.correctAnswer;
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleSelectOption = (optionId: string) => {
    if (hasAnsweredCurrent) return;

    haptic('selection');
    setSelectedOptions(prev => ({ ...prev, [currentIndex]: optionId }));
    setShowExplanation(prev => ({ ...prev, [currentIndex]: true }));
    
    if (optionId === currentQuestion.correctAnswer) {
      haptic('success');
    } else {
      haptic('error');
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Finish
      navigate(-1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleAiExplain = async () => {
    setIsAiExplainLoading(true);
    setShowAiSheet(true);
    try {
      const result = await explainMutation.mutateAsync(currentQuestion.id);
      setAiExplainResult(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAiExplainLoading(false);
    }
  };

  const handleToggleBookmark = () => {
    haptic('light');
    bookmarkMutation.mutate({ 
      id: currentQuestion.id, 
      isBookmarked: currentQuestion.isBookmarked 
    });
  };

  return (
    <div className="flex h-screen flex-col bg-[#F8FAFC] dark:bg-[#08101F]">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4">
        <button onClick={() => navigate(-1)} className="p-2">
          <X className="h-6 w-6 text-gray-500" />
        </button>
        <div className="font-semibold text-gray-600 dark:text-gray-300">
          {currentIndex + 1} of {questions.length}
        </div>
        <div className="flex gap-2">
          <button onClick={handleToggleBookmark} className="p-2">
            <Heart className={cn("h-6 w-6", currentQuestion.isBookmarked ? "fill-red-500 text-red-500" : "text-gray-500")} />
          </button>
          <button className="p-2">
            <Flag className="h-6 w-6 text-gray-500" />
          </button>
        </div>
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
                const isOptionCorrect = option.id === currentQuestion.correctAnswer;
                
                let optionClass = "border-gray-200 bg-white text-gray-700 dark:border-gray-700 dark:bg-[#15233D] dark:text-gray-200";
                
                if (hasAnsweredCurrent) {
                  if (isOptionCorrect) {
                    optionClass = "border-[#3CCF91] bg-[#3CCF91]/10 text-[#3CCF91]";
                  } else if (isSelected) {
                    optionClass = "border-red-500 bg-red-500/10 text-red-500";
                  } else {
                    optionClass = "border-gray-200 opacity-50 dark:border-gray-800";
                  }
                }

                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelectOption(option.id)}
                    disabled={hasAnsweredCurrent}
                    className={cn(
                      "flex w-full items-center rounded-xl border-2 p-4 text-left font-medium transition-colors",
                      optionClass
                    )}
                  >
                    <span className="mr-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-current">
                      {option.label}
                    </span>
                    <span>{option.text}</span>
                  </button>
                );
              })}
            </div>

            {hasAnsweredCurrent && showExplanation[currentIndex] && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 rounded-[20px] bg-blue-50 p-5 dark:bg-blue-900/20"
              >
                <h4 className="mb-2 font-bold text-[#0D367A] dark:text-blue-300">Explanation</h4>
                <p className="text-gray-700 dark:text-gray-300">{currentQuestion.explanation}</p>
                
                <button
                  onClick={handleAiExplain}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 font-semibold text-[#0D367A] shadow-sm dark:bg-[#0D367A] dark:text-white"
                >
                  <Sparkles className="h-5 w-5 text-[#FFD000]" />
                  Ask AI Tutor
                </button>
              </motion.div>
            )}
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
        
        {hasAnsweredCurrent && (
          <button
            onClick={handleNext}
            className="rounded-full bg-[#0D367A] px-8 py-3 font-bold text-white shadow-md dark:bg-blue-600"
          >
            {currentIndex === questions.length - 1 ? 'Finish' : 'Next'}
          </button>
        )}
      </div>

      {/* AI Explanation Bottom Sheet */}
      <AnimatePresence>
        {showAiSheet && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAiSheet(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="fixed bottom-0 left-0 right-0 z-50 rounded-t-[30px] bg-white p-6 pb-12 shadow-xl dark:bg-[#15233D]"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-xl font-bold text-[#0D367A] dark:text-white">
                  <Sparkles className="h-6 w-6 text-[#FFD000]" />
                  AI Tutor Explanation
                </h3>
                <button onClick={() => setShowAiSheet(false)} className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                  <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
              
              {isAiExplainLoading ? (
                <div className="flex flex-col gap-3 py-6">
                  <div className="h-4 w-3/4 rounded bg-gray-200 animate-pulse dark:bg-gray-700" />
                  <div className="h-4 w-full rounded bg-gray-200 animate-pulse dark:bg-gray-700" />
                  <div className="h-4 w-5/6 rounded bg-gray-200 animate-pulse dark:bg-gray-700" />
                </div>
              ) : (
                <div className="py-4 text-gray-700 dark:text-gray-300">
                  {aiExplainResult?.text || "The AI explained this question beautifully."}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

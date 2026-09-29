import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Flag, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { useQuestions, useAiExplain, useBookmark, useSubmitAttempt } from './hooks/usePractice';
import { MathText } from '@/components/shared/MathText';
import { useNavStore } from '@/lib/store';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

export default function QuestionPlayer() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const setNavVisible = useNavStore(state => state.setNavVisible);
  
  const { data: queryData, isLoading } = useQuestions(topicId!);
  const questions = queryData?.data || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});
  
  const explainMutation = useAiExplain();
  const bookmarkMutation = useBookmark();
  const submitMutation = useSubmitAttempt();

  const [showAiSheet, setShowAiSheet] = useState(false);
  const [aiExplainResult, setAiExplainResult] = useState<any>(null);
  const [isAiExplainLoading, setIsAiExplainLoading] = useState(false);

  useEffect(() => {
    setNavVisible(false);
    return () => setNavVisible(true);
  }, [setNavVisible]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="w-10 h-10 border-4 border-[#0D367A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-[#F8FAFC] p-6">
        <h2 className="text-xl font-bold text-black mb-2 text-center">Questions will be loaded soon</h2>
        <p className="text-[#6B7280] text-center mb-6">Please check back later.</p>
        <button 
          onClick={() => navigate(-1)}
          className="bg-[#0D367A] text-white px-6 py-3 rounded-[12px] font-bold"
        >
          Go Back
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const hasAnsweredCurrent = selectedOptions[currentIndex] !== undefined;
  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  const handleSelectOption = (index: number) => {
    if (hasAnsweredCurrent) return;
    
    setSelectedOptions(prev => ({ ...prev, [currentIndex]: index }));
    setShowExplanation(prev => ({ ...prev, [currentIndex]: true }));
    
    // Simulate haptic via standard browser API if available (Telegram webapp handles this usually)
    if (window.navigator?.vibrate) {
      window.navigator.vibrate(index === currentQuestion.correctIndex ? [50] : [100]);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      navigate(-1); // Or results screen
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#F8FAFC] font-poppins relative">
      {/* Top Header */}
      <div className="bg-white px-4 pt-6 pb-4 flex flex-col shadow-[0_2px_10px_rgba(0,0,0,0.02)] z-10">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => navigate(-1)} className="p-1 rounded-full bg-gray-100">
            <X size={24} color="#64748B" />
          </button>
          <div className="flex gap-3">
            <button className="p-1.5 rounded-full bg-gray-100">
              <Heart size={20} color="#64748B" />
            </button>
            <button className="p-1.5 rounded-full bg-gray-100">
              <Flag size={20} color="#64748B" />
            </button>
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div>
            <p className="text-[12px] font-bold text-[#64748B] uppercase tracking-wider mb-1">Practice Mode</p>
            <h2 className="text-[18px] font-extrabold text-[#0F172A] leading-tight">Question {currentIndex + 1}</h2>
          </div>
          <div className="text-[14px] font-bold text-[#0D367A]">
            {currentIndex + 1} / {questions.length}
          </div>
        </div>

        <div className="h-[6px] w-full bg-[#E2E8F0] rounded-full mt-4 overflow-hidden">
          <div 
            className="h-full bg-[#0D367A] rounded-full transition-all duration-300" 
            style={{ width: `${progressPercent}%` }} 
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-[100px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Question Card */}
            <div className="bg-white rounded-[20px] p-5 shadow-[0_4px_15px_rgba(0,0,0,0.03)] border border-[#F1F5F9] mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[12px] font-bold text-[#64748B] bg-[#F1F5F9] px-2.5 py-1 rounded-md">
                  {currentQuestion.difficulty || 'Normal'}
                </span>
              </div>
              <div className="text-[16px] font-medium text-[#1F2937] leading-relaxed">
                <MathText text={currentQuestion.questionText} />
              </div>
            </div>

            {/* Options */}
            <div className="flex flex-col space-y-3">
              {currentQuestion.choices?.map((choice: string, index: number) => {
                const isSelected = selectedOptions[currentIndex] === index;
                const isCorrect = index === currentQuestion.correctIndex;
                const letter = LETTERS[index] || '';

                let stateStyle = "bg-white border-[#E2E8F0] text-[#1F2937]";
                let letterStyle = "bg-[#F1F5F9] text-[#64748B]";

                if (hasAnsweredCurrent) {
                  if (isCorrect) {
                    stateStyle = "bg-[#F0FDF4] border-[#22C55E] shadow-[0_4px_12px_rgba(34,197,94,0.15)] z-10";
                    letterStyle = "bg-[#22C55E] text-white";
                  } else if (isSelected) {
                    stateStyle = "bg-[#FEF2F2] border-[#EF4444] shadow-[0_4px_12px_rgba(239,68,68,0.15)] z-10";
                    letterStyle = "bg-[#EF4444] text-white";
                  } else {
                    stateStyle = "bg-white border-[#E2E8F0] opacity-60";
                    letterStyle = "bg-[#F1F5F9] text-[#64748B]";
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleSelectOption(index)}
                    disabled={hasAnsweredCurrent}
                    className={`relative w-full rounded-[16px] border-[2px] p-4 text-left transition-all duration-200 flex items-center ${stateStyle} ${!hasAnsweredCurrent ? 'active:scale-[0.98]' : ''}`}
                  >
                    <div className={`w-[32px] h-[32px] rounded-[10px] flex items-center justify-center text-[14px] font-bold shrink-0 transition-colors ${letterStyle}`}>
                      {letter}
                    </div>
                    <div className="ml-4 flex-1">
                      <MathText text={choice} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation Section */}
            {hasAnsweredCurrent && showExplanation[currentIndex] && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 bg-white border border-[#E2E8F0] rounded-[20px] p-5 shadow-[0_4px_15px_rgba(0,0,0,0.03)]"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-[32px] h-[32px] bg-[#EBF3FF] rounded-[10px] flex items-center justify-center">
                    <img src="https://api.iconify.design/material-symbols:lightbulb-circle-rounded.svg?color=%230D367A" className="w-5 h-5" alt="Idea" />
                  </div>
                  <h4 className="font-bold text-[#0D367A] text-[16px]">Explanation</h4>
                </div>
                <div className="text-[#475569] text-[14px] leading-relaxed mb-5">
                  <MathText text={currentQuestion.explanation || "No explanation provided."} />
                </div>
                
                <button
                  onClick={() => setShowAiSheet(true)}
                  className="w-full h-[50px] bg-gradient-to-r from-[#0D367A] to-[#1a4a9c] text-white rounded-[14px] font-bold flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(13,54,122,0.2)] active:scale-[0.98] transition-transform"
                >
                  <Sparkles size={20} color="#FFD000" />
                  Ask AI Tutor
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Nav Buttons */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent pt-10">
        <div className="flex gap-3">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="w-[60px] h-[56px] bg-white border border-[#E2E8F0] rounded-[16px] flex items-center justify-center text-[#0D367A] disabled:opacity-50 shadow-[0_4px_10px_rgba(0,0,0,0.03)] active:bg-gray-50"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={handleNext}
            className={`flex-1 h-[56px] rounded-[16px] font-bold text-[16px] flex items-center justify-center gap-2 transition-all ${
              hasAnsweredCurrent 
                ? 'bg-[#0D367A] text-white shadow-[0_4px_15px_rgba(13,54,122,0.25)]' 
                : 'bg-[#F1F5F9] text-[#94A3B8]'
            }`}
          >
            {currentIndex === questions.length - 1 ? 'Finish Practice' : 'Next Question'}
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
    </div>
  );
}

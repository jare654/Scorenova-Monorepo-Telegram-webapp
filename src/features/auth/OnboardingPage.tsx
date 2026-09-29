import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useAuthStore } from '@/lib/store';

const onboardingData = [
  {
    titleFirst: "Practice with\n",
    titleHighlight: "purpose",
    subtitle: "Topical questions, mock exams and instant feedback.",
    image: "/assets/onboarding1.png",
    isHeadingFirst: true,
  },
  {
    titleFirst: "Track, Improve\n",
    titleHighlight: "Succeed.",
    subtitle: "See your progress, stay consistent and achieve your goals.",
    image: "/assets/onboarding2.png",
    isHeadingFirst: true,
  },
  {
    titleFirst: "Welcome to Score",
    titleHighlight: "nova 👋",
    subtitle: "Your all-in-one learning companion.\nPractice, analyze and excel.",
    image: "/assets/onboarding3.png",
    isHeadingFirst: false,
  },
];

export default function OnboardingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);

  const nextSlide = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const skipToLast = () => {
    setCurrentIndex(onboardingData.length - 1);
  };

  const handleGetStarted = () => {
    // If we're here, we usually need to go to setup if not fully configured,
    // or to home if somehow logged in. The Telegram web app usually logs in automatically.
    // AuthProvider should handle the redirection logic, but let's send them to setup for safety.
    if (user) {
       navigate('/');
    } else {
       navigate('/setup');
    }
  };

  const currentItem = onboardingData[currentIndex]! || onboardingData[0]!;

  return (
    <div className="flex flex-col h-screen bg-white font-poppins overflow-hidden">
      {/* Top Bar with Skip */}
      <div className="h-[60px] flex items-center justify-end px-5">
        {currentIndex < onboardingData.length - 1 && (
          <button 
            onClick={skipToLast}
            className="text-[#71717A] text-[16px] font-medium"
          >
            Skip
          </button>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 relative flex flex-col items-center justify-start pt-[5vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col w-full h-full"
          >
            {/* Conditional Order: Title first or Image first */}
            {currentItem.isHeadingFirst ? (
              <>
                <div className="px-6 text-center">
                  <h1 className="text-[32px] font-bold leading-tight">
                    <span className="text-[#0D367A]">{currentItem.titleFirst}</span>
                    <span className="text-[#FACC15]">{currentItem.titleHighlight}</span>
                  </h1>
                  <p className="text-[#71717A] text-[15px] mt-3 max-w-[280px] mx-auto leading-relaxed">
                    {currentItem.subtitle}
                  </p>
                </div>
                <div className="flex-1 flex items-center justify-center mt-6">
                  <img src={currentItem.image} alt="Onboarding" className="max-h-[50vh] w-auto object-contain" />
                </div>
              </>
            ) : (
              <>
                <div className="flex-1 flex items-center justify-center mb-6">
                  <img src={currentItem.image} alt="Onboarding" className="max-h-[50vh] w-auto object-contain" />
                </div>
                <div className="px-6 text-center">
                  <h1 className="text-[32px] font-bold leading-tight">
                    <span className="text-[#0D367A]">{currentItem.titleFirst}</span>
                    <span className="text-[#FACC15]">{currentItem.titleHighlight}</span>
                  </h1>
                  <p className="text-[#71717A] text-[15px] mt-3 whitespace-pre-line leading-relaxed">
                    {currentItem.subtitle}
                  </p>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation Area */}
      <div className={`px-6 transition-all duration-300 pb-[${currentIndex === onboardingData.length - 1 ? '64px' : '24px'}]`}>
        <div className="flex flex-col">
          {/* Welcome Screen Actions (Last Page) */}
          {currentIndex === onboardingData.length - 1 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full mb-8"
            >
              <button
                onClick={handleGetStarted}
                className="w-full h-[56px] bg-[#0D367A] text-white rounded-[12px] text-[18px] font-bold shadow-none"
              >
                Get Started
              </button>
            </motion.div>
          )}

          {/* Indicators and Next Button Row */}
          <div className="flex items-center justify-between pb-8">
            {/* Pagination Indicators */}
            <div className="flex space-x-2">
              {onboardingData.map((_, index) => (
                <div
                  key={index}
                  className={`h-[10px] rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'w-[24px] bg-[#0D367A]' 
                      : 'w-[10px] bg-[#CBD5E1]'
                  }`}
                />
              ))}
            </div>

            {/* Next Button */}
            {currentIndex < onboardingData.length - 1 && (
              <button
                onClick={nextSlide}
                className="w-[56px] h-[56px] bg-[#0D367A] rounded-full flex items-center justify-center text-white"
              >
                <ChevronRight size={28} strokeWidth={2.5} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { History, Brain, Sparkles, AlertCircle, ChevronRight } from 'lucide-react';
import { haptic } from '@/lib/telegram';
import { useScanQuestion } from './hooks/useScanner';
import ImageCapture from './components/ImageCapture';

export default function ScannerPage() {
  const navigate = useNavigate();
  const { mutateAsync: scanQuestion, isPending } = useScanQuestion();

  // Mock user limit
  const scansRemaining = 3;
  const isPremium = false;

  const handleImageCaptured = async (file: File) => {
    try {
      const result = await scanQuestion(file);
      navigate('/scanner/result', { state: { result } });
    } catch (error) {
      // Error handling is managed by the hook, but you could add local state for UI feedback
      alert('Failed to scan question. Please try again.');
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#FFD000] overflow-hidden">
      {/* Hero Section */}
      <div className="pt-safe-top px-6 pb-8 pt-8 relative">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">
              AI Question<br />Solver
            </h1>
            <p className="text-gray-800 mt-2 font-medium opacity-80">
              Scan any question and<br />get step-by-step logic
            </p>
          </div>
          <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm">
            <Brain size={48} className="text-gray-900" />
          </div>
        </div>

        {!isPremium && (
          <div className="inline-flex items-center gap-2 bg-gray-900/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
            <Sparkles size={14} className="text-gray-900" />
            <span className="text-xs font-bold text-gray-900">
              {scansRemaining} daily scans remaining
            </span>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-[#F8FAFC] rounded-t-[32px] px-6 py-8 flex flex-col relative">
        <ImageCapture onImageCaptured={handleImageCaptured} />

        {/* Quick Tips */}
        <div className="mt-8 mb-4">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <AlertCircle size={18} className="text-primary" />
            Tips for best results
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              Ensure good lighting and avoid shadows
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              Keep the camera steady while capturing
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              Capture one question at a time
            </li>
          </ul>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* History Link */}
        <button
          onClick={() => {
            haptic('light');
            navigate('/scanner/history');
          }}
          className="w-full bg-white p-4 rounded-2xl shadow-[0_2px_8px_rgba(0,26,66,0.04)] flex items-center gap-3 mt-4"
        >
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
            <History size={20} className="text-primary" />
          </div>
          <span className="flex-1 font-bold text-left text-gray-900">
            Scan History
          </span>
          <ChevronRight size={20} className="text-gray-400" />
        </button>
      </div>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isPending && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-2xl mb-6"
            >
              <Brain size={48} className="text-primary" />
            </motion.div>
            <h2 className="text-white text-xl font-bold mb-2">Analyzing Question</h2>
            <p className="text-white/70 text-sm">Our AI is solving this step-by-step...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

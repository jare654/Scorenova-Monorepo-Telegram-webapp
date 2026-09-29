import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Database, 
  FunctionSquare, 
  ListOrdered, 
  CheckCircle2,
  Share2,
  RefreshCw,
  ArrowLeft
} from 'lucide-react';
import SolutionCard from './components/SolutionCard';
import { useScanHistory, ScanResult } from './hooks/useScanner';
import { haptic } from '@/lib/telegram';

export default function ScanResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { saveToHistory } = useScanHistory();
  
  // The result should be passed in location.state
  const result = location.state?.result as ScanResult;

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <p className="text-gray-500">No result found.</p>
        <button 
          onClick={() => navigate(-1)}
          className="mt-4 text-primary font-bold"
        >
          Go Back
        </button>
      </div>
    );
  }

  const handleSave = () => {
    haptic('success');
    saveToHistory(result);
    // Optionally show a toast or alert
  };

  const handleShare = () => {
    haptic('light');
    const text = `Q: ${result.question}\n\nA: ${result.answer}`;
    // Use Telegram Web App's share feature if available, else fallback
    if (window.Telegram?.WebApp?.openTelegramLink) {
      window.Telegram.WebApp.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(text)}`);
    } else {
      navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      {/* Header */}
      <div className="pt-safe-top bg-white px-4 py-4 flex items-center justify-between shadow-sm z-10">
        <button onClick={() => { haptic('light'); navigate(-1); }}>
          <ArrowLeft size={24} className="text-gray-900" />
        </button>
        <h1 className="font-bold text-lg text-gray-900">Solution</h1>
        <button onClick={handleShare}>
          <Share2 size={24} className="text-primary" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-32">
        <SolutionCard
          icon={FileText}
          title="Question"
          content={result.question}
          color="#0D367A"
        />

        {result.givenData && (
          <SolutionCard
            icon={Database}
            title="Given Data"
            content={result.givenData}
            color="#FD761A"
          />
        )}

        {result.formula && (
          <SolutionCard
            icon={FunctionSquare}
            title="Formula Used"
            content={result.formula}
            color="#8B5CF6"
          />
        )}

        {result.steps && result.steps.length > 0 && (
          <SolutionCard
            icon={ListOrdered}
            title="Step-by-Step Solution"
            content={
              <ul className="space-y-3">
                {result.steps.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="font-bold text-primary shrink-0">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            }
            color="#0D367A"
          />
        )}

        <div className="bg-green-50 rounded-3xl p-6 shadow-[0_2px_8px_rgba(0,26,66,0.08)] border border-green-100">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle2 size={20} className="text-green-600" />
            <span className="text-sm font-bold text-green-700 tracking-wider uppercase">
              Final Answer
            </span>
          </div>
          <div className="text-xl font-bold text-gray-900">
            {result.answer}
          </div>
          {result.explanation && (
            <div className="mt-4 text-[15px] leading-relaxed text-gray-700">
              {result.explanation}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 pb-safe-bottom">
        <div className="flex gap-3">
          <button
            onClick={() => {
              haptic('light');
              navigate('/scanner');
            }}
            className="flex-1 h-[58px] bg-blue-50 text-primary font-bold rounded-2xl flex items-center justify-center gap-2"
          >
            <RefreshCw size={20} />
            Scan Another
          </button>
          <button
            onClick={handleSave}
            className="flex-1 h-[58px] bg-primary text-white font-bold rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/20"
          >
            Save to History
          </button>
        </div>
      </div>
    </div>
  );
}

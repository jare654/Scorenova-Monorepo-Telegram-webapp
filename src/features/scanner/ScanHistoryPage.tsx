import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, ChevronRight, InboxIcon } from 'lucide-react';
import { useScanHistory, ScanResult } from './hooks/useScanner';
import { haptic } from '@/lib/telegram';
import { motion } from 'framer-motion';

export default function ScanHistoryPage() {
  const navigate = useNavigate();
  const { data: history, isLoading } = useScanHistory();

  const handleItemClick = (item: ScanResult) => {
    haptic('light');
    navigate('/scanner/result', { state: { result: item } });
  };

  const formatDate = (timestamp?: number) => {
    if (!timestamp) return '';
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date(timestamp));
  };

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      {/* Header */}
      <div className="pt-safe-top bg-white px-4 py-4 flex items-center justify-between shadow-sm z-10">
        <button onClick={() => { haptic('light'); navigate(-1); }}>
          <ArrowLeft size={24} className="text-gray-900" />
        </button>
        <h1 className="font-bold text-lg text-gray-900">Scan History</h1>
        <div className="w-6" /> {/* Spacer */}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {isLoading ? (
          <div className="flex justify-center p-8">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : !history || history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <InboxIcon size={32} className="text-blue-300" />
            </div>
            <p className="text-gray-900 font-bold text-lg">No history yet</p>
            <p className="text-gray-500 text-sm mt-1">Your saved scan results will appear here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((item, index) => (
              <motion.button
                key={item.id || index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleItemClick(item)}
                className="w-full bg-white p-4 rounded-2xl shadow-[0_2px_8px_rgba(0,26,66,0.04)] flex items-center gap-4 text-left outline-none"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                  <Clock size={20} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 truncate">
                    {item.question}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatDate(item.timestamp)}
                  </p>
                </div>
                <ChevronRight size={20} className="text-gray-300" />
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

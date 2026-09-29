import React, { useEffect } from 'react';
import { useMockSubjects } from './hooks/useMockExam';
import { useAuthStore } from '@/lib/store';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Lock, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MockExamPage() {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const { data: subjects, isLoading } = useMockSubjects(user?.stream_id);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 font-poppins">
      <div className="bg-[#0D367A] rounded-b-[32px] px-6 pt-16 pb-7 text-white">
        <h1 className="text-3xl font-bold mb-1">Mock Exams</h1>
        <p className="text-white/70 text-sm">Ethiopian University Entrance Examination</p>
      </div>

      <div className="px-5 mt-6">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-[20px] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {subjects?.map((subject: any) => (
              <motion.div
                key={subject.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (subject.isFullyLocked) {
                    navigate('/upgrade');
                  } else {
                    navigate(`/mock-exams/subject/${subject.id}`);
                  }
                }}
                className="bg-white rounded-[20px] p-4 border border-[#D7DEE8] shadow-[0_8px_16px_rgba(0,0,0,0.045)] flex items-center"
              >
                <div className="w-[52px] h-[52px] bg-[#0D367A] rounded-[14px] flex items-center justify-center mr-4 shrink-0">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[#0F172A] truncate">{subject.title}</h3>
                  <p className="text-xs text-[#64748B] mt-1">
                    {subject.examCount} {subject.examCount === 1 ? 'Exam' : 'Exams'} Available
                  </p>
                </div>
                {subject.isFullyLocked ? (
                  <Lock className="w-5 h-5 text-[#94A3B8] ml-2" />
                ) : (
                  <ChevronRight className="w-6 h-6 text-[#E2E8F0] ml-2" />
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMockExams } from './hooks/useMockExam';
import { ChevronLeft, Clock, FileText, Lock } from 'lucide-react';

export default function MockExamListPage() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const { data: exams, isLoading } = useMockExams(subjectId || '');

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-poppins pb-24">
      <div className="bg-white border-b border-gray-100 px-4 py-4 flex items-center sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="mr-3">
          <ChevronLeft className="w-6 h-6 text-[#0D367A]" />
        </button>
        <h1 className="text-lg font-bold text-[#0D367A]">Available Exams</h1>
      </div>

      <div className="px-5 mt-6 space-y-4">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          exams?.map((exam: any) => (
            <div key={exam.id} className="bg-white rounded-[20px] p-5 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-[#0F172A] text-lg">{exam.title}</h3>
                {exam.isPremium && (
                  <div className="bg-amber-100 text-amber-600 px-2 py-1 rounded text-xs font-bold flex items-center">
                    <Lock className="w-3 h-3 mr-1" /> PRO
                  </div>
                )}
              </div>
              
              <div className="flex items-center text-sm text-gray-500 mb-6 space-x-4">
                <div className="flex items-center">
                  <FileText className="w-4 h-4 mr-1.5 text-gray-400" />
                  {exam.questionCount} Qs
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1.5 text-gray-400" />
                  {exam.durationMinutes} mins
                </div>
              </div>

              <button
                onClick={() => {
                  if (exam.isPremium) navigate('/upgrade');
                  else navigate(`/mock-exams/take/${exam.id}`);
                }}
                className="w-full bg-[#0D367A] text-white font-bold h-[50px] rounded-xl"
              >
                {exam.isPremium ? 'Unlock Exam' : 'Start Exam'}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ResultCard } from './components/ResultCard';
import { useNavStore } from '@/lib/store';
import { ExamResult } from './hooks/useMockExam';
import { CheckCircle2, XCircle, Share2, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

export default function ExamResultsPage() {
  const { sessionId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const setNavVisible = useNavStore((state) => state.setIsNavVisible);

  const result = location.state?.result as ExamResult;

  useEffect(() => {
    setNavVisible(true);
    if (result?.passed) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3CCF91', '#0D367A', '#FFD000']
      });
    }
  }, [result, setNavVisible]);

  if (!result) return <div>No result data found.</div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-poppins pb-24">
      <div className="bg-[#0D367A] pt-12 pb-24 px-5 text-white">
        <button onClick={() => navigate('/mock-exams')} className="mb-6 flex items-center text-white/80 hover:text-white">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Mock Exams
        </button>
        <h1 className="text-2xl font-bold">Exam Results</h1>
      </div>

      <div className="px-5 -mt-16">
        <ResultCard result={result} />
      </div>

      <div className="px-5 mt-8 space-y-4">
        <h2 className="font-bold text-lg text-[#0F172A] mb-4">Detailed Review</h2>
        {result.breakdown?.map((q, i) => {
          const isCorrect = q.userAnswerId === q.correctAnswerId;
          const isSkipped = !q.userAnswerId;

          return (
            <div key={q.questionId} className="bg-white rounded-[20px] p-5 shadow-sm border border-gray-100">
              <div className="flex items-start mb-3">
                <span className="font-bold text-gray-400 mr-3">{i + 1}.</span>
                <p className="flex-1 text-[#0F172A] font-medium">{q.questionText}</p>
              </div>

              <div className="space-y-2 mt-4 pl-7">
                {q.options.map(opt => {
                  const isUserAnswer = opt.id === q.userAnswerId;
                  const isCorrectAnswer = opt.id === q.correctAnswerId;

                  return (
                    <div
                      key={opt.id}
                      className={cn(
                        "p-3 rounded-xl border text-sm flex justify-between items-center",
                        isCorrectAnswer && "border-[#3CCF91] bg-[#3CCF91]/10 text-[#2E9C6D] font-bold",
                        isUserAnswer && !isCorrectAnswer && "border-[#D32F2F] bg-[#D32F2F]/10 text-[#D32F2F]",
                        !isCorrectAnswer && !isUserAnswer && "border-gray-100 text-gray-500"
                      )}
                    >
                      <span>{opt.text}</span>
                      {isCorrectAnswer && <CheckCircle2 className="w-4 h-4 text-[#3CCF91]" />}
                      {isUserAnswer && !isCorrectAnswer && <XCircle className="w-4 h-4 text-[#D32F2F]" />}
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 pl-7">
                <div className="bg-blue-50 text-[#0D367A] p-4 rounded-xl text-sm leading-relaxed">
                  <strong>Explanation:</strong> {q.explanation}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

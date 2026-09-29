import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStartExam, useSubmitExam } from './hooks/useMockExam';
import { ExamTimer } from './components/ExamTimer';
import { QuestionPalette } from './components/QuestionPalette';
import { useNavStore } from '@/lib/store';
import { haptic, showAlert, showConfirm, getTelegramWebApp } from '@/lib/telegram';
import { Flag, Grid, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ExamTakingPage() {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const setNavVisible = useNavStore((state) => state.setNavVisible);
  
  const { data: session, isLoading } = useStartExam(examId || '');
  const { mutate: submitExam, isPending: isSubmitting } = useSubmitExam();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [marked, setMarked] = useState<Record<string, boolean>>({});
  const [showPalette, setShowPalette] = useState(false);

  useEffect(() => {
    setNavVisible(false);
    const tg = getTelegramWebApp();
    if (tg) {
      tg.enableClosingConfirmation();
      tg.MainButton.text = "SUBMIT EXAM";
      tg.MainButton.color = "#0D367A";
      tg.MainButton.onClick(() => handleSubmit());
    }
    return () => {
      setNavVisible(true);
      if (tg) {
        tg.disableClosingConfirmation();
        tg.MainButton.hide();
        tg.MainButton.offClick(() => handleSubmit());
      }
    };
  }, []);

  useEffect(() => {
    const tg = getTelegramWebApp();
    if (tg) {
      if (session && currentIndex === session.questions.length - 1) {
        tg.MainButton.show();
      } else {
        tg.MainButton.hide();
      }
    }
  }, [currentIndex, session]);

  const handleSubmit = () => {
    if (!session) return;
    showConfirm('Are you sure you want to submit your exam?').then((ok) => {
      if (ok) {
        submitExam({ sessionId: session.sessionId, answers }, {
          onSuccess: (result) => {
            navigate(`/mock-exams/results/${session.sessionId}`, { state: { result } });
          }
        });
      }
    });
  };

  const handleTimeUp = () => {
    haptic('error');
    showAlert('Time is up! Submitting your exam...');
    if (session) {
      submitExam({ sessionId: session.sessionId, answers }, {
        onSuccess: (result) => {
          navigate(`/mock-exams/results/${session.sessionId}`, { state: { result } });
        }
      });
    }
  };

  if (isLoading || !session) return <div>Loading exam...</div>;

  const currentQ = session.questions[currentIndex];
  if (!currentQ) return null;

  return (
    <div className="min-h-screen bg-gray-50 font-poppins flex flex-col">
      {/* Header */}
      <div className="bg-[#0D367A] text-white px-4 py-3 flex items-center justify-between sticky top-0 z-20">
        <div className="font-bold truncate max-w-[50%]">Mock Exam</div>
        <div className="flex items-center space-x-3">
          <ExamTimer durationMinutes={session.durationMinutes} onTimeUp={handleTimeUp} />
          <button onClick={() => setShowPalette(!showPalette)} className="p-2 bg-white/10 rounded-lg">
            <Grid className="w-5 h-5" />
          </button>
        </div>
      </div>

      {showPalette && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg z-10 border-b border-gray-200">
          <QuestionPalette
            totalQuestions={session.questions.length}
            currentQuestionIndex={currentIndex}
            answers={answers}
            markedForReview={marked}
            questions={session.questions}
            onSelectQuestion={(idx) => {
              setCurrentIndex(idx);
              setShowPalette(false);
            }}
          />
        </div>
      )}

      {/* Question */}
      <div className="flex-1 overflow-y-auto p-5 pb-24">
        <div className="flex justify-between items-center mb-6">
          <span className="font-bold text-gray-500">Question {currentIndex + 1} of {session.questions.length}</span>
          <button
            onClick={() => setMarked(p => ({ ...p, [currentQ.id]: !p[currentQ.id] }))}
            className={cn("flex items-center text-sm font-bold", marked[currentQ.id] ? "text-amber-500" : "text-gray-400")}
          >
            <Flag className="w-4 h-4 mr-1" />
            Review
          </button>
        </div>

        <div className="text-lg text-[#0F172A] font-medium mb-8 leading-relaxed">
          {currentQ.text}
        </div>

        <div className="space-y-3">
          {currentQ.options.map((opt: any) => (
            <button
              key={opt.id}
              onClick={() => setAnswers(p => ({ ...p, [currentQ.id]: opt.id }))}
              className={cn(
                "w-full text-left p-4 rounded-xl border-2 transition-all",
                answers[currentQ.id] === opt.id
                  ? "border-[#0D367A] bg-[#0D367A]/5 text-[#0D367A] font-bold"
                  : "border-gray-200 bg-white text-gray-700"
              )}
            >
              {opt.text}
            </button>
          ))}
        </div>
      </div>

      {/* Footer Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-between">
        <button
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex(p => p - 1)}
          className="flex items-center px-4 py-2 font-bold text-gray-500 disabled:opacity-30"
        >
          <ChevronLeft className="w-5 h-5 mr-1" /> Prev
        </button>
        
        {currentIndex < session.questions.length - 1 ? (
          <button
            onClick={() => setCurrentIndex(p => p + 1)}
            className="flex items-center px-4 py-2 font-bold text-[#0D367A]"
          >
            Next <ChevronRight className="w-5 h-5 ml-1" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="flex items-center px-6 py-2 font-bold bg-[#0D367A] text-white rounded-xl"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        )}
      </div>
    </div>
  );
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';

// Types
export interface MockSubject {
  id: string;
  title: string;
  examCount: number;
  isFullyLocked: boolean;
}

export interface MockExam {
  id: string;
  title: string;
  questionCount: number;
  durationMinutes: number;
  isPremium: boolean;
}

export interface ExamSession {
  sessionId: string;
  examId: string;
  startTime: string;
  questions: ExamQuestion[];
  durationMinutes: number;
}

export interface ExamQuestion {
  id: string;
  text: string;
  options: ExamOption[];
}

export interface ExamOption {
  id: string;
  text: string;
}

export interface ExamSubmission {
  sessionId: string;
  answers: Record<string, string>; // questionId -> optionId
}

export interface ExamResult {
  id: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unanswered: number;
  passed: boolean;
  breakdown: QuestionReview[];
}

export interface QuestionReview {
  questionId: string;
  questionText: string;
  userAnswerId?: string;
  correctAnswerId: string;
  explanation: string;
  options: ExamOption[];
}

export function useMockSubjects(stream?: string) {
  return useQuery({
    queryKey: ['mock-subjects', stream],
    queryFn: async () => {
      const params = stream ? { stream } : {};
      const data = await apiClient.get<MockSubject[]>('/mocks/subjects', { params });
      return data;
    },
  });
}

export function useMockExams(subjectId: string) {
  return useQuery({
    queryKey: ['mock-exams', subjectId],
    queryFn: async () => {
      const data = await apiClient.get<MockExam[]>(`/mocks/subject/${subjectId}`);
      return data;
    },
    enabled: !!subjectId,
  });
}

export function useStartExam(examId: string) {
  return useQuery({
    queryKey: ['start-exam', examId],
    queryFn: async () => {
      const data = await apiClient.get<ExamSession>(`/mocks/${examId}/start`);
      return data;
    },
    enabled: !!examId,
  });
}

export function useSubmitExam() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ sessionId, answers }: ExamSubmission) => {
      const data = await apiClient.post<ExamResult>(`/mocks/${sessionId}/submit`, { answers });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-results'] });
    },
  });
}

export function useMyResults() {
  return useQuery({
    queryKey: ['my-results'],
    queryFn: async () => {
      const data = await apiClient.get<ExamResult[]>('/mocks/my-results');
      return data;
    },
  });
}

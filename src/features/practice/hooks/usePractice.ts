import { useQuery, useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';

export function useSubjects(stream?: string) {
  return useQuery({
    queryKey: ['practice-subjects', stream],
    queryFn: async () => {
      const response = await apiClient.get('/practice/subjects', {
        params: { stream },
      });
      return response.data;
    },
    enabled: !!stream,
  });
}

export function useTopics(subjectId: string) {
  return useQuery({
    queryKey: ['practice-topics', subjectId],
    queryFn: async () => {
      const response = await apiClient.get(`/practice/subjects/${subjectId}/topics`);
      return response.data;
    },
    enabled: !!subjectId,
  });
}

export function useQuestions(topicId: string) {
  return useQuery({
    queryKey: ['practice-questions', topicId],
    queryFn: async () => {
      const response = await apiClient.get(`/practice/topics/${topicId}/questions`);
      return response.data;
    },
    enabled: !!topicId,
  });
}

export function useAiExplain() {
  return useMutation({
    mutationFn: async (questionId: string) => {
      const response = await apiClient.post('/ai/explain', { questionId });
      return response.data;
    },
  });
}

export function useBookmark() {
  return useMutation({
    mutationFn: async ({ id, isBookmarked }: { id: string; isBookmarked: boolean }) => {
      if (isBookmarked) {
        const response = await apiClient.delete(`/questions/${id}/save`);
        return response.data;
      } else {
        const response = await apiClient.post(`/questions/${id}/save`);
        return response.data;
      }
    },
  });
}

export function useFlagQuestion() {
  return useMutation({
    mutationFn: async ({ id, reason }: { id: string; reason: string }) => {
      const response = await apiClient.post(`/questions/${id}/flag`, { reason });
      return response.data;
    },
  });
}

export function useSubmitAttempt() {
  return useMutation({
    mutationFn: async (attemptData: any) => {
      const response = await apiClient.post('/attempts/sessions', attemptData);
      return response.data;
    },
  });
}

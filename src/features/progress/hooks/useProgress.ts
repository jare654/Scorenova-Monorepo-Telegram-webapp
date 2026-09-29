import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';

export const useProgress = () => {
  return useQuery({
    queryKey: ['progress'],
    queryFn: async () => {
      const data = await apiClient.get('/progress/me');
      return data;
    }
  });
};
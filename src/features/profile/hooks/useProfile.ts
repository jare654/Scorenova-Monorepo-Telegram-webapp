import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const data = await apiClient.get('/accounts/me');
      return data;
    }
  });
};
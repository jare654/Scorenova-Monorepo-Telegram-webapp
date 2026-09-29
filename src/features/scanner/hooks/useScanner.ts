import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { haptic } from '@/lib/telegram';

export interface ScanResult {
  id?: string;
  question: string;
  givenData?: string;
  formula?: string;
  steps: string[];
  answer: string;
  explanation?: string;
  timestamp?: number;
}

export const useScanQuestion = () => {
  return useMutation({
    mutationFn: async (imageFile: File): Promise<ScanResult> => {
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const response = await apiClient.post('/ai/scan-question', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return (response as any).data || response;
    },
    onSuccess: () => {
      haptic('success');
    },
    onError: () => {
      haptic('error');
    },
  });
};

export const useScanHistory = () => {
  const queryClient = useQueryClient();
  
  const query = useQuery({
    queryKey: ['scanHistory'],
    queryFn: async (): Promise<ScanResult[]> => {
      const history = localStorage.getItem('scan_history');
      return history ? JSON.parse(history) : [];
    },
  });

  const saveToHistory = async (result: ScanResult) => {
    const history = localStorage.getItem('scan_history');
    const currentHistory: ScanResult[] = history ? JSON.parse(history) : [];
    
    const newEntry = {
      ...result,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };
    
    const updatedHistory = [newEntry, ...currentHistory];
    localStorage.setItem('scan_history', JSON.stringify(updatedHistory));
    
    queryClient.invalidateQueries({ queryKey: ['scanHistory'] });
  };

  return {
    ...query,
    saveToHistory,
  };
};

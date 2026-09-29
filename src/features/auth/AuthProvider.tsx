import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '@/lib/api';
import { useAuthStore } from '@/lib/store';
import { isTelegramEnvironment, getTelegramWebApp, cloudStorage } from '@/lib/telegram';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    const authenticate = async () => {
      setLoading(true);
      try {
        if (isTelegramEnvironment()) {
          const webApp = getTelegramWebApp();
          const initData = webApp?.initData;
          
          if (initData) {
            const response = await apiClient.post('/telegram/auth', { initData });
            const { accessToken, refreshToken, user, status } = (response as any).data || response;
            
            apiClient.setTokens(accessToken, refreshToken);
            setUser(user);
            
            await cloudStorage.set('accessToken', accessToken);
            await cloudStorage.set('refreshToken', refreshToken);
            
            if (status === 'new_user') {
              navigate('/setup');
            } else {
              // Usually we don't force navigate to '/' if they're on a specific route,
              // but we might if they were on onboarding.
              if (window.location.pathname === '/onboarding') {
                navigate('/');
              }
            }
          } else {
            navigate('/onboarding');
          }
        } else {
          // Dev mode / Not Telegram
          const access = localStorage.getItem('accessToken');
          const refresh = localStorage.getItem('refreshToken');
          
          if (access) {
            apiClient.setTokens(access, refresh || '');
            const response = await apiClient.get('/auth/get-user-info');
            setUser((response as any).data || response);
          } else {
            navigate('/onboarding');
          }
        }
      } catch (error) {
        console.error('Auth error', error);
        navigate('/onboarding');
      } finally {
        setLoading(false);
      }
    };

    authenticate();

    const handleTokenRefreshed = async (e: CustomEvent) => {
      const { accessToken, refreshToken } = e.detail;
      if (isTelegramEnvironment()) {
        await cloudStorage.set('accessToken', accessToken);
        await cloudStorage.set('refreshToken', refreshToken);
      } else {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
      }
    };

    const handleLogout = async () => {
      setUser(null);
      if (isTelegramEnvironment()) {
        // Need to clear cloud storage manually or through a helper
        // assuming cloudStorage.remove exists
      } else {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
      navigate('/onboarding');
    };

    window.addEventListener('auth:token-refreshed', handleTokenRefreshed as unknown as EventListener);
    window.addEventListener('auth:logout', handleLogout as EventListener);

    return () => {
      window.removeEventListener('auth:token-refreshed', handleTokenRefreshed as unknown as EventListener);
      window.removeEventListener('auth:logout', handleLogout as EventListener);
    };
  }, [navigate, setUser, setLoading]);

  return <>{children}</>;
}

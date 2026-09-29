import { create } from 'zustand';
import type { User } from '@/types';

// ===== Auth Store =====
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
  logout: () => set({ user: null, isAuthenticated: false, isLoading: false }),
}));

// ===== Navigation Store =====
interface NavState {
  activeTab: number;
  setActiveTab: (tab: number) => void;
  isNavVisible: boolean;
  setNavVisible: (visible: boolean) => void;
}

export const useNavStore = create<NavState>((set) => ({
  activeTab: 0,
  setActiveTab: (activeTab) => set({ activeTab }),
  isNavVisible: true,
  setNavVisible: (isNavVisible) => set({ isNavVisible }),
}));

// ===== Theme Store =====
interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
  setDark: (dark: boolean) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  isDark: false,
  toggleTheme: () =>
    set((state) => {
      const newDark = !state.isDark;
      document.documentElement.setAttribute('data-theme', newDark ? 'dark' : 'light');
      return { isDark: newDark };
    }),
  setDark: (isDark) => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    set({ isDark });
  },
}));

// ===== Premium Store =====
interface PremiumState {
  isPremium: boolean;
  premiumEndDate: string | null;
  setPremium: (isPremium: boolean, endDate?: string | null) => void;
}

export const usePremiumStore = create<PremiumState>((set) => ({
  isPremium: false,
  premiumEndDate: null,
  setPremium: (isPremium, premiumEndDate = null) => set({ isPremium, premiumEndDate }),
}));

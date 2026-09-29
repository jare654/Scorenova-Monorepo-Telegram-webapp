export const APP_NAME = 'Scorenova';
export const APP_TAGLINE = 'AI-Powered Exam Preparation';
export const APP_VERSION = '1.0.0';

export const SUPPORT_TELEGRAM = '@Scorenova';
export const SUPPORT_EMAIL = 'support@solanovatech.com';

// Academic streams matching the backend enum
export const STREAMS = {
  NATURAL: 'Natural Science',
  SOCIAL: 'Social Science',
} as const;

// Question difficulty levels
export const DIFFICULTY = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
} as const;

// Answer option labels
export const OPTION_LABELS = ['A', 'B', 'C', 'D'] as const;

// Subscription plans
export const PLANS = {
  MONTHLY: { label: 'Monthly', days: 30 },
  QUARTERLY: { label: 'Quarterly', days: 90 },
  ANNUAL: { label: 'Annual', days: 365 },
} as const;

// Mock exam pass threshold
export const PASS_THRESHOLD = 50;

// Animation durations (ms)
export const ANIMATION = {
  FAST: 150,
  NORMAL: 250,
  SLOW: 400,
  PAGE_TRANSITION: 300,
} as const;

// Breakpoints matching Tailwind
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
} as const;

// Storage keys for Telegram CloudStorage
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'sn_access_token',
  REFRESH_TOKEN: 'sn_refresh_token',
  USER_PROFILE: 'sn_user_profile',
  THEME: 'sn_theme',
  LAST_PRACTICE: 'sn_last_practice',
  ONBOARDING_DONE: 'sn_onboarding_done',
} as const;

// Tab indices matching Flutter DashboardScreen
export const TAB_INDEX = {
  HOME: 0,
  PRACTICE: 1,
  SCANNER: 2,
  MOCK_EXAM: 3,
  PROFILE: 4,
} as const;

// Subject icons (emoji mapping for subjects since we don't have custom icons)
export const SUBJECT_ICONS: Record<string, string> = {
  'Biology': '🧬',
  'Chemistry': '⚗️',
  'Physics': '⚛️',
  'Mathematics': '📐',
  'English': '📖',
  'Aptitude': '🧠',
  'Civics': '🏛️',
  'Geography': '🌍',
  'History': '📜',
  'Economics': '📊',
  'default': '📚',
};

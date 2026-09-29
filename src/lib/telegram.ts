/**
 * Telegram Mini App SDK integration.
 * Wraps the @telegram-apps/sdk-react library and provides
 * utility functions for Telegram-native features.
 */

// Re-export the Telegram WebApp global for direct access
declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    query_id?: string;
    user?: TelegramUser;
    auth_date?: number;
    hash?: string;
    start_param?: string;
  };
  version: string;
  platform: string;
  colorScheme: 'light' | 'dark';
  themeParams: TelegramThemeParams;
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  headerColor: string;
  backgroundColor: string;
  isClosingConfirmationEnabled: boolean;
  BackButton: {
    isVisible: boolean;
    show: () => void;
    hide: () => void;
    onClick: (callback: () => void) => void;
    offClick: (callback: () => void) => void;
  };
  MainButton: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isActive: boolean;
    isProgressVisible: boolean;
    setText: (text: string) => void;
    show: () => void;
    hide: () => void;
    enable: () => void;
    disable: () => void;
    showProgress: (leaveActive?: boolean) => void;
    hideProgress: () => void;
    onClick: (callback: () => void) => void;
    offClick: (callback: () => void) => void;
    setParams: (params: {
      text?: string;
      color?: string;
      text_color?: string;
      is_active?: boolean;
      is_visible?: boolean;
    }) => void;
  };
  HapticFeedback: {
    impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
    notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
    selectionChanged: () => void;
  };
  CloudStorage: {
    setItem: (key: string, value: string, callback?: (error: Error | null, stored: boolean) => void) => void;
    getItem: (key: string, callback: (error: Error | null, value: string) => void) => void;
    getItems: (keys: string[], callback: (error: Error | null, values: Record<string, string>) => void) => void;
    removeItem: (key: string, callback?: (error: Error | null, removed: boolean) => void) => void;
    getKeys: (callback: (error: Error | null, keys: string[]) => void) => void;
  };
  ready: () => void;
  expand: () => void;
  close: () => void;
  enableClosingConfirmation: () => void;
  disableClosingConfirmation: () => void;
  setHeaderColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
  showAlert: (message: string, callback?: () => void) => void;
  showConfirm: (message: string, callback: (confirmed: boolean) => void) => void;
  showPopup: (params: {
    title?: string;
    message: string;
    buttons?: Array<{
      id?: string;
      type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive';
      text?: string;
    }>;
  }, callback?: (buttonId: string) => void) => void;
  openLink: (url: string, options?: { try_instant_view?: boolean }) => void;
  openTelegramLink: (url: string) => void;
  sendData: (data: string) => void;
}

interface TelegramUser {
  id: number;
  is_bot?: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  photo_url?: string;
}

interface TelegramThemeParams {
  bg_color?: string;
  text_color?: string;
  hint_color?: string;
  link_color?: string;
  button_color?: string;
  button_text_color?: string;
  secondary_bg_color?: string;
  header_bg_color?: string;
  accent_text_color?: string;
  section_bg_color?: string;
  section_header_text_color?: string;
  subtitle_text_color?: string;
  destructive_text_color?: string;
}

// ===== Utility Functions =====

/**
 * Get the Telegram WebApp instance. Returns null if not running inside Telegram.
 */
export function getTelegramWebApp(): TelegramWebApp | null {
  return window.Telegram?.WebApp ?? null;
}

/**
 * Check if the app is running inside Telegram.
 */
export function isTelegramEnvironment(): boolean {
  return !!window.Telegram?.WebApp?.initData;
}

/**
 * Get the current Telegram user info.
 */
export function getTelegramUser(): TelegramUser | null {
  return window.Telegram?.WebApp?.initDataUnsafe?.user ?? null;
}

/**
 * Get the raw initData string for backend validation.
 */
export function getInitData(): string {
  return window.Telegram?.WebApp?.initData ?? '';
}

/**
 * Initialize the Telegram Mini App - call this on app startup.
 */
export function initTelegramApp(): void {
  const webApp = getTelegramWebApp();
  if (!webApp) return;

  // Signal to Telegram that the app is ready
  webApp.ready();

  // Expand to full viewport
  webApp.expand();

  // Apply color scheme
  applyTelegramTheme(webApp);

  // Set header color to match our primary
  webApp.setHeaderColor('#0D367A');
  webApp.setBackgroundColor(webApp.colorScheme === 'dark' ? '#08101F' : '#F8FAFC');

  // Enable closing confirmation during exams / unsaved data
  // (we'll toggle this contextually)
}

/**
 * Apply Telegram's color scheme to our CSS variables.
 */
function applyTelegramTheme(webApp: TelegramWebApp): void {
  const isDark = webApp.colorScheme === 'dark';
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
}

/**
 * Trigger haptic feedback.
 */
export function haptic(type: 'light' | 'medium' | 'heavy' | 'success' | 'error' | 'warning' | 'selection'): void {
  const webApp = getTelegramWebApp();
  if (!webApp) return;

  switch (type) {
    case 'light':
    case 'medium':
    case 'heavy':
      webApp.HapticFeedback.impactOccurred(type);
      break;
    case 'success':
    case 'error':
    case 'warning':
      webApp.HapticFeedback.notificationOccurred(type);
      break;
    case 'selection':
      webApp.HapticFeedback.selectionChanged();
      break;
  }
}

/**
 * Show a Telegram native alert.
 */
export function showAlert(message: string): Promise<void> {
  return new Promise((resolve) => {
    const webApp = getTelegramWebApp();
    if (webApp) {
      webApp.showAlert(message, resolve);
    } else {
      alert(message);
      resolve();
    }
  });
}

/**
 * Show a Telegram native confirm dialog.
 */
export function showConfirm(message: string): Promise<boolean> {
  return new Promise((resolve) => {
    const webApp = getTelegramWebApp();
    if (webApp) {
      webApp.showConfirm(message, resolve);
    } else {
      resolve(confirm(message));
    }
  });
}

/**
 * Telegram Cloud Storage helpers (promisified).
 */
export const cloudStorage = {
  get(key: string): Promise<string | null> {
    return new Promise((resolve) => {
      const webApp = getTelegramWebApp();
      if (!webApp) {
        resolve(localStorage.getItem(key));
        return;
      }
      webApp.CloudStorage.getItem(key, (err, value) => {
        resolve(err ? null : value || null);
      });
    });
  },

  set(key: string, value: string): Promise<boolean> {
    return new Promise((resolve) => {
      const webApp = getTelegramWebApp();
      if (!webApp) {
        localStorage.setItem(key, value);
        resolve(true);
        return;
      }
      webApp.CloudStorage.setItem(key, value, (err) => {
        resolve(!err);
      });
    });
  },

  remove(key: string): Promise<boolean> {
    return new Promise((resolve) => {
      const webApp = getTelegramWebApp();
      if (!webApp) {
        localStorage.removeItem(key);
        resolve(true);
        return;
      }
      webApp.CloudStorage.removeItem(key, (err) => {
        resolve(!err);
      });
    });
  },
};

export type { TelegramWebApp, TelegramUser, TelegramThemeParams };

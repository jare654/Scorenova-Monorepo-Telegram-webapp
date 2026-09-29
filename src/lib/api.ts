const API_BASE_URL = import.meta.env.VITE_API_URL;

interface ApiOptions {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
  timeout?: number;
  signal?: AbortSignal;
  params?: Record<string, string | undefined>;
}

interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}

class ApiClient {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private isRefreshing = false;
  private refreshPromise: Promise<boolean> | null = null;

  setTokens(access: string, refresh: string) {
    this.accessToken = access;
    this.refreshToken = refresh;
  }

  clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  private async refreshAccessToken(): Promise<boolean> {
    if (!this.refreshToken) return false;

    if (this.isRefreshing && this.refreshPromise) {
      return this.refreshPromise;
    }

    this.isRefreshing = true;
    this.refreshPromise = (async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-refresh-token': this.refreshToken!,
          },
        });

        if (!response.ok) {
          this.clearTokens();
          window.dispatchEvent(new CustomEvent('auth:logout'));
          return false;
        }

        const data = await response.json();
        this.accessToken = data.accessToken;
        this.refreshToken = data.refreshToken;
        window.dispatchEvent(
          new CustomEvent('auth:token-refreshed', {
            detail: { accessToken: data.accessToken, refreshToken: data.refreshToken },
          })
        );
        return true;
      } catch {
        this.clearTokens();
        window.dispatchEvent(new CustomEvent('auth:logout'));
        return false;
      } finally {
        this.isRefreshing = false;
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  async request<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
    const { method = 'GET', body, headers = {}, timeout = 45000, signal, params } = options;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    const mergedSignal = signal ?? controller.signal;

    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers,
    };

    if (this.accessToken) {
      requestHeaders['Authorization'] = `Bearer ${this.accessToken}`;
    }

    try {
      const queryString = params ? "?" + new URLSearchParams(Object.entries(params || {}).filter(([_, v]) => v !== undefined) as string[][]).toString() : "";
      let response = await fetch(`${API_BASE_URL}${endpoint}${queryString}`, {
        method,
        headers: requestHeaders,
        body: body ? JSON.stringify(body) : undefined,
        signal: mergedSignal,
      });

      // Handle 401 - try refresh
      if (response.status === 401 && this.refreshToken) {
        const refreshed = await this.refreshAccessToken();
        if (refreshed) {
          requestHeaders['Authorization'] = `Bearer ${this.accessToken}`;
          response = await fetch(`${API_BASE_URL}${endpoint}${queryString}`, {
            method,
            headers: requestHeaders,
            body: body ? JSON.stringify(body) : undefined,
            signal: mergedSignal,
          });
        } else {
          throw new ApiRequestError('Session expired. Please login again.', 401);
        }
      }

      if (response.status === 403) {
        window.dispatchEvent(new CustomEvent('auth:logout'));
        throw new ApiRequestError('Access denied.', 403);
      }

      if (response.status === 423) {
        throw new ApiRequestError('Account is locked.', 423);
      }

      if (!response.ok) {
        const errorData: ApiError = await response.json().catch(() => ({
          message: 'An unexpected error occurred',
          statusCode: response.status,
        }));
        throw new ApiRequestError(errorData.message, response.status);
      }

      // Handle 204 No Content
      if (response.status === 204) {
        return undefined as T;
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiRequestError) throw error;
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw new ApiRequestError('Request timed out', 408);
      }
      throw new ApiRequestError('Network error. Please check your connection.', 0);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  get<T>(endpoint: string, options?: Omit<ApiOptions, 'method' | 'body'>) {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  post<T>(endpoint: string, body?: unknown, options?: Omit<ApiOptions, 'method' | 'body'>) {
    return this.request<T>(endpoint, { ...options, method: 'POST', body });
  }

  put<T>(endpoint: string, body?: unknown, options?: Omit<ApiOptions, 'method' | 'body'>) {
    return this.request<T>(endpoint, { ...options, method: 'PUT', body });
  }

  patch<T>(endpoint: string, body?: unknown, options?: Omit<ApiOptions, 'method' | 'body'>) {
    return this.request<T>(endpoint, { ...options, method: 'PATCH', body });
  }

  delete<T>(endpoint: string, options?: Omit<ApiOptions, 'method'>) {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

export class ApiRequestError extends Error {
  constructor(
    message: string,
    public statusCode: number
  ) {
    super(message);
    this.name = 'ApiRequestError';
  }
}

export const apiClient = new ApiClient();

import { ApiResponse } from '@forcisos/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://forcisos.com/wp-json/fc/v2';

class ApiClient {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
  }

  clearToken() {
    this.token = null;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_URL}${endpoint}`;
    const headers: HeadersInit = { 'Content-Type': 'application/json', ...options.headers };
    if (this.token) headers.Authorization = `Bearer ${this.token}`;
    try {
      const response = await fetch(url, { ...options, headers });
      const contentType = response.headers.get('content-type');
      const isJson = contentType?.includes('application/json');
      if (!response.ok) {
        if (isJson) { const errorData = await response.json(); throw new ApiError(errorData.error?.message || 'API request failed', response.status, errorData.error?.code, errorData.error?.details); }
        throw new ApiError(`API request failed with status ${response.status}`, response.status);
      }
      if (!isJson) return undefined as T;
      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(error instanceof Error ? error.message : 'Unknown error occurred', 500);
    }
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<T> { return this.request<T>(endpoint, { ...options, method: 'GET' }); }
  async post<T>(endpoint: string, body?: unknown, options?: RequestInit): Promise<T> { return this.request<T>(endpoint, { ...options, method: 'POST', body: body ? JSON.stringify(body) : undefined }); }
  async put<T>(endpoint: string, body?: unknown, options?: RequestInit): Promise<T> { return this.request<T>(endpoint, { ...options, method: 'PUT', body: body ? JSON.stringify(body) : undefined }); }
  async patch<T>(endpoint: string, body?: unknown, options?: RequestInit): Promise<T> { return this.request<T>(endpoint, { ...options, method: 'PATCH', body: body ? JSON.stringify(body) : undefined }); }
  async delete<T>(endpoint: string, options?: RequestInit): Promise<T> { return this.request<T>(endpoint, { ...options, method: 'DELETE' }); }
}

export class ApiError extends Error {
  constructor(message: string, public status: number, public code?: string, public details?: Record<string, unknown>) {
    super(message);
    this.name = 'ApiError';
  }
}

export const apiClient = new ApiClient();

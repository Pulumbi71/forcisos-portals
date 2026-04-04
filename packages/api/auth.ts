import {
  LoginRequest,
  LoginResponse,
  User,
  ApiResponse,
} from '@forcisos/types';
import { apiClient } from './client';

export const authApi = {
  login: async (
    request: LoginRequest
  ): Promise<ApiResponse<LoginResponse>> => {
    // Send both 'username' and 'email' for backend compatibility
    // Backend route expects 'username' param but we authenticate via email
    return apiClient.post<ApiResponse<LoginResponse>>('/auth/login', {
      ...request,
      username: request.email,
    });
  },

  refresh: async (
    refreshToken: string
  ): Promise<ApiResponse<LoginResponse>> => {
    return apiClient.post<ApiResponse<LoginResponse>>('/auth/refresh', {
      refreshToken,
    });
  },

  logout: async (): Promise<ApiResponse<void>> => {
    return apiClient.post<ApiResponse<void>>('/auth/logout');
  },

  getMe: async (): Promise<ApiResponse<User>> => {
    return apiClient.get<ApiResponse<User>>('/auth/me');
  },

  changePassword: async (
    oldPassword: string,
    newPassword: string
  ): Promise<ApiResponse<void>> => {
    return apiClient.post<ApiResponse<void>>('/auth/change-password', {
      oldPassword,
      newPassword,
    });
  },
};

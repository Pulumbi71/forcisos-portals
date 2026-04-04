import {
  User,
  DashboardStats,
  AuditLog,
  ApiResponse,
  PaginatedResponse,
} from '@forcisos/types';
import { apiClient } from './client';

export const adminApi = {
  getDashboardStats: async (): Promise<ApiResponse<DashboardStats>> => {
    return apiClient.get<ApiResponse<DashboardStats>>('/admin/stats');
  },
  getUsers: async (
    page = 1,
    pageSize = 10,
    filters?: Record<string, unknown>
  ): Promise<ApiResponse<PaginatedResponse<User>>> => {
    const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
    Object.entries(filters || {}).forEach(([key, value]) => { if (value !== undefined && value !== null) params.append(key, String(value)); });
    return apiClient.get<ApiResponse<PaginatedResponse<User>>>(`/admin/users?${params}`);
  },
  getUser: async (id: string): Promise<ApiResponse<User>> => apiClient.get<ApiResponse<User>>(`/admin/users/${id}`),
  updateUser: async (id: string, data: Partial<User>): Promise<ApiResponse<User>> => apiClient.put<ApiResponse<User>>(`/admin/users/${id}`, data),
  deleteUser: async (id: string): Promise<ApiResponse<void>> => apiClient.delete<ApiResponse<void>>(`/admin/users/${id}`),
  changeUserRole: async (id: string, role: string): Promise<ApiResponse<User>> => apiClient.patch<ApiResponse<User>>(`/admin/users/${id}/role`, { role }),
  getRegistrations: async (page = 1, pageSize = 10, filters?: Record<string, unknown>): Promise<ApiResponse<PaginatedResponse<unknown>>> => {
    const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
    Object.entries(filters || {}).forEach(([key, value]) => { if (value !== undefined && value !== null) params.append(key, String(value)); });
    return apiClient.get<ApiResponse<PaginatedResponse<unknown>>>(`/admin/registrations?${params}`);
  },
  approveRegistration: async (id: string): Promise<ApiResponse<void>> => apiClient.patch<ApiResponse<void>>(`/admin/registrations/${id}/approve`, {}),
  rejectRegistration: async (id: string, reason: string): Promise<ApiResponse<void>> => apiClient.patch<ApiResponse<void>>(`/admin/registrations/${id}/reject`, { reason }),
  getOrders: async (page = 1, pageSize = 10, filters?: Record<string, unknown>): Promise<ApiResponse<PaginatedResponse<unknown>>> => {
    const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
    Object.entries(filters || {}).forEach(([key, value]) => { if (value !== undefined && value !== null) params.append(key, String(value)); });
    return apiClient.get<ApiResponse<PaginatedResponse<unknown>>>(`/admin/orders?${params}`);
  },
  getOrder: async (id: string): Promise<ApiResponse<unknown>> => apiClient.get<ApiResponse<unknown>>(`/admin/orders/${id}`),
  getCoupons: async (page = 1, pageSize = 10): Promise<ApiResponse<PaginatedResponse<unknown>>> => {
    const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
    return apiClient.get<ApiResponse<PaginatedResponse<unknown>>>(`/admin/coupons?${params}`);
  },
  createCoupon: async (data: unknown): Promise<ApiResponse<unknown>> => apiClient.post<ApiResponse<unknown>>('/admin/coupons', data),
  updateCoupon: async (id: string, data: unknown): Promise<ApiResponse<unknown>> => apiClient.put<ApiResponse<unknown>>(`/admin/coupons/${id}`, data),
  deleteCoupon: async (id: string): Promise<ApiResponse<void>> => apiClient.delete<ApiResponse<void>>(`/admin/coupons/${id}`),
  getBookings: async (page = 1, pageSize = 10, filters?: Record<string, unknown>): Promise<ApiResponse<PaginatedResponse<unknown>>> => {
    const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
    Object.entries(filters || {}).forEach(([key, value]) => { if (value !== undefined && value !== null) params.append(key, String(value)); });
    return apiClient.get<ApiResponse<PaginatedResponse<unknown>>>(`/admin/bookings?${params}`);
  },
  sendAnnouncement: async (title: string, message: string, targetAudience: 'all' | 'students' | 'trainers' | 'partners'): Promise<ApiResponse<void>> => apiClient.post<ApiResponse<void>>('/admin/announcements', { title, message, targetAudience }),
  getAuditLogs: async (page = 1, pageSize = 10, filters?: Record<string, unknown>): Promise<ApiResponse<PaginatedResponse<AuditLog>>> => {
    const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
    Object.entries(filters || {}).forEach(([key, value]) => { if (value !== undefined && value !== null) params.append(key, String(value)); });
    return apiClient.get<ApiResponse<PaginatedResponse<AuditLog>>>(`/admin/audit-logs?${params}`);
  },
  getSettings: async (): Promise<ApiResponse<Record<string, unknown>>> => apiClient.get<ApiResponse<Record<string, unknown>>>('/admin/settings'),
  updateSettings: async (settings: Record<string, unknown>): Promise<ApiResponse<Record<string, unknown>>> => apiClient.put<ApiResponse<Record<string, unknown>>>('/admin/settings', settings),
};

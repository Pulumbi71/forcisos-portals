import { User, Enrollment, Certificate, ApiResponse, PaginatedResponse } from '@forcisos/types';
import { apiClient } from './client';

export const membersApi = {
  getMembers: async (page = 1, pageSize = 10, filters?: Record<string, unknown>): Promise<ApiResponse<PaginatedResponse<User>>> => {
    const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
    Object.entries(filters || {}).forEach(([key, value]) => { if (value !== undefined && value !== null) params.append(key, String(value)); });
    return apiClient.get<ApiResponse<PaginatedResponse<User>>>(`/members?${params}`);
  },
  getMember: async (id: string): Promise<ApiResponse<User>> => apiClient.get<ApiResponse<User>>(`/members/${id}`),
  updateMember: async (id: string, data: Partial<User>): Promise<ApiResponse<User>> => apiClient.put<ApiResponse<User>>(`/members/${id}`, data),
  uploadAvatar: async (id: string, file: File): Promise<ApiResponse<{ url: string }>> => {
    const formData = new FormData(); formData.append('avatar', file);
    return apiClient.post<ApiResponse<{ url: string }>>(`/members/${id}/avatar`, formData);
  },
  getEnrollments: async (userId: string, page = 1, pageSize = 10): Promise<ApiResponse<PaginatedResponse<Enrollment>>> => {
    const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
    return apiClient.get<ApiResponse<PaginatedResponse<Enrollment>>>(`/members/${userId}/enrollments?${params}`);
  },
  getEnrollment: async (userId: string, enrollmentId: string): Promise<ApiResponse<Enrollment>> => apiClient.get<ApiResponse<Enrollment>>(`/members/${userId}/enrollments/${enrollmentId}`),
  enrollCourse: async (userId: string, courseId: string, cohortId: string): Promise<ApiResponse<Enrollment>> => apiClient.post<ApiResponse<Enrollment>>(`/members/${userId}/enrollments`, { courseId, cohortId }),
  updateEnrollment: async (userId: string, enrollmentId: string, data: Partial<Enrollment>): Promise<ApiResponse<Enrollment>> => apiClient.put<ApiResponse<Enrollment>>(`/members/${userId}/enrollments/${enrollmentId}`, data),
  dropCourse: async (userId: string, enrollmentId: string): Promise<ApiResponse<void>> => apiClient.delete<ApiResponse<void>>(`/members/${userId}/enrollments/${enrollmentId}`),
  getCertificates: async (userId: string): Promise<ApiResponse<Certificate[]>> => apiClient.get<ApiResponse<Certificate[]>>(`/members/${userId}/certificates`),
  getCertificate: async (userId: string, certificateId: string): Promise<ApiResponse<Certificate>> => apiClient.get<ApiResponse<Certificate>>(`/members/${userId}/certificates/${certificateId}`),
};

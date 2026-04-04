import { PartnerOrg, PartnerLicense, User, ApiResponse, PaginatedResponse } from '@forcisos/types';
import { apiClient } from './client';

export const partnersApi = {
  getPartners: async (page = 1, pageSize = 10, filters?: Record<string, unknown>): Promise<ApiResponse<PaginatedResponse<PartnerOrg>>> => {
    const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
    Object.entries(filters || {}).forEach(([key, value]) => { if (value !== undefined && value !== null) params.append(key, String(value)); });
    return apiClient.get<ApiResponse<PaginatedResponse<PartnerOrg>>>(`/partners?${params}`);
  },
  getPartner: async (id: string): Promise<ApiResponse<PartnerOrg>> => apiClient.get<ApiResponse<PartnerOrg>>(`/partners/${id}`),
  createPartner: async (data: Omit<PartnerOrg, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<PartnerOrg>> => apiClient.post<ApiResponse<PartnerOrg>>('/partners', data),
  updatePartner: async (id: string, data: Partial<PartnerOrg>): Promise<ApiResponse<PartnerOrg>> => apiClient.put<ApiResponse<PartnerOrg>>(`/partners/${id}`, data),
  deletePartner: async (id: string): Promise<ApiResponse<void>> => apiClient.delete<ApiResponse<void>>(`/partners/${id}`),
  uploadLogo: async (id: string, file: File): Promise<ApiResponse<{ url: string }>> => {
    const formData = new FormData(); formData.append('logo', file);
    return apiClient.post<ApiResponse<{ url: string }>>(`/partners/${id}/logo`, formData);
  },
  getLicenses: async (partnerId: string, page = 1, pageSize = 10): Promise<ApiResponse<PaginatedResponse<PartnerLicense>>> => {
    const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
    return apiClient.get<ApiResponse<PaginatedResponse<PartnerLicense>>>(`/partners/${partnerId}/licenses?${params}`);
  },
  getLicense: async (partnerId: string, licenseId: string): Promise<ApiResponse<PartnerLicense>> => apiClient.get<ApiResponse<PartnerLicense>>(`/partners/${partnerId}/licenses/${licenseId}`),
  issueLicense: async (partnerId: string, courseId: string, licenseCount: number, expirationDate: string): Promise<ApiResponse<PartnerLicense>> => apiClient.post<ApiResponse<PartnerLicense>>(`/partners/${partnerId}/licenses`, { courseId, licenseCount, expirationDate }),
  updateLicense: async (partnerId: string, licenseId: string, data: Partial<PartnerLicense>): Promise<ApiResponse<PartnerLicense>> => apiClient.put<ApiResponse<PartnerLicense>>(`/partners/${partnerId}/licenses/${licenseId}`, data),
  revokeLicense: async (partnerId: string, licenseId: string): Promise<ApiResponse<void>> => apiClient.delete<ApiResponse<void>>(`/partners/${partnerId}/licenses/${licenseId}`),
  getEmployees: async (partnerId: string, page = 1, pageSize = 10): Promise<ApiResponse<PaginatedResponse<User>>> => {
    const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
    return apiClient.get<ApiResponse<PaginatedResponse<User>>>(`/partners/${partnerId}/employees?${params}`);
  },
  addEmployee: async (partnerId: string, email: string): Promise<ApiResponse<User>> => apiClient.post<ApiResponse<User>>(`/partners/${partnerId}/employees`, { email }),
  removeEmployee: async (partnerId: string, employeeId: string): Promise<ApiResponse<void>> => apiClient.delete<ApiResponse<void>>(`/partners/${partnerId}/employees/${employeeId}`),
};

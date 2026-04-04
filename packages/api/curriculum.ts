import { Course, Module, Cohort, ApiResponse, PaginatedResponse } from '@forcisos/types';
import { apiClient } from './client';

export const curriculumApi = {
  getCourses: async (page = 1, pageSize = 10, filters?: Record<string, unknown>): Promise<ApiResponse<PaginatedResponse<Course>>> => {
    const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
    Object.entries(filters || {}).forEach(([key, value]) => { if (value !== undefined && value !== null) params.append(key, String(value)); });
    return apiClient.get<ApiResponse<PaginatedResponse<Course>>>(`/courses?${params}`);
  },
  getCourse: async (id: string): Promise<ApiResponse<Course>> => apiClient.get<ApiResponse<Course>>(`/courses/${id}`),
  createCourse: async (data: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Course>> => apiClient.post<ApiResponse<Course>>('/courses', data),
  updateCourse: async (id: string, data: Partial<Course>): Promise<ApiResponse<Course>> => apiClient.put<ApiResponse<Course>>(`/courses/${id}`, data),
  deleteCourse: async (id: string): Promise<ApiResponse<void>> => apiClient.delete<ApiResponse<void>>(`/courses/${id}`),
  publishCourse: async (id: string): Promise<ApiResponse<Course>> => apiClient.patch<ApiResponse<Course>>(`/courses/${id}/publish`, {}),
  getModules: async (courseId: string): Promise<ApiResponse<Module[]>> => apiClient.get<ApiResponse<Module[]>>(`/courses/${courseId}/modules`),
  getModule: async (courseId: string, moduleId: string): Promise<ApiResponse<Module>> => apiClient.get<ApiResponse<Module>>(`/courses/${courseId}/modules/${moduleId}`),
  createModule: async (courseId: string, data: Omit<Module, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Module>> => apiClient.post<ApiResponse<Module>>(`/courses/${courseId}/modules`, data),
  updateModule: async (courseId: string, moduleId: string, data: Partial<Module>): Promise<ApiResponse<Module>> => apiClient.put<ApiResponse<Module>>(`/courses/${courseId}/modules/${moduleId}`, data),
  deleteModule: async (courseId: string, moduleId: string): Promise<ApiResponse<void>> => apiClient.delete<ApiResponse<void>>(`/courses/${courseId}/modules/${moduleId}`),
  reorderModules: async (courseId: string, moduleOrder: Array<{ id: string; order: number }>): Promise<ApiResponse<Module[]>> => apiClient.post<ApiResponse<Module[]>>(`/courses/${courseId}/modules/reorder`, { modules: moduleOrder }),
  getCohorts: async (page = 1, pageSize = 10, filters?: Record<string, unknown>): Promise<ApiResponse<PaginatedResponse<Cohort>>> => {
    const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
    Object.entries(filters || {}).forEach(([key, value]) => { if (value !== undefined && value !== null) params.append(key, String(value)); });
    return apiClient.get<ApiResponse<PaginatedResponse<Cohort>>>(`/cohorts?${params}`);
  },
  getCourseCohorts: async (courseId: string): Promise<ApiResponse<Cohort[]>> => apiClient.get<ApiResponse<Cohort[]>>(`/courses/${courseId}/cohorts`),
  getCohort: async (id: string): Promise<ApiResponse<Cohort>> => apiClient.get<ApiResponse<Cohort>>(`/cohorts/${id}`),
  createCohort: async (data: Omit<Cohort, 'id' | 'createdAt' | 'updatedAt' | 'enrolledCount'>): Promise<ApiResponse<Cohort>> => apiClient.post<ApiResponse<Cohort>>('/cohorts', data),
  updateCohort: async (id: string, data: Partial<Cohort>): Promise<ApiResponse<Cohort>> => apiClient.put<ApiResponse<Cohort>>(`/cohorts/${id}`, data),
  deleteCohort: async (id: string): Promise<ApiResponse<void>> => apiClient.delete<ApiResponse<void>>(`/cohorts/${id}`),
};

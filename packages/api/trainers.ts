import { User, TrainerAssignment, TrainerNote, ApiResponse, PaginatedResponse } from '@forcisos/types';
import { apiClient } from './client';

export const trainersApi = {
  getTrainers: async (page = 1, pageSize = 10, filters?: Record<string, unknown>): Promise<ApiResponse<PaginatedResponse<User>>> => {
    const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
    Object.entries(filters || {}).forEach(([key, value]) => { if (value !== undefined && value !== null) params.append(key, String(value)); });
    return apiClient.get<ApiResponse<PaginatedResponse<User>>>(`/trainers?${params}`);
  },
  getTrainer: async (id: string): Promise<ApiResponse<User>> => apiClient.get<ApiResponse<User>>(`/trainers/${id}`),
  updateTrainer: async (id: string, data: Partial<User>): Promise<ApiResponse<User>> => apiClient.put<ApiResponse<User>>(`/trainers/${id}`, data),
  getAssignments: async (trainerId: string): Promise<ApiResponse<TrainerAssignment[]>> => apiClient.get<ApiResponse<TrainerAssignment[]>>(`/trainers/${trainerId}/assignments`),
  assignTrainer: async (trainerId: string, courseId: string, cohortId: string, role: 'instructor' | 'assistant' | 'grader'): Promise<ApiResponse<TrainerAssignment>> => apiClient.post<ApiResponse<TrainerAssignment>>(`/trainers/${trainerId}/assignments`, { courseId, cohortId, role }),
  updateAssignment: async (trainerId: string, assignmentId: string, data: Partial<TrainerAssignment>): Promise<ApiResponse<TrainerAssignment>> => apiClient.put<ApiResponse<TrainerAssignment>>(`/trainers/${trainerId}/assignments/${assignmentId}`, data),
  unassignTrainer: async (trainerId: string, assignmentId: string): Promise<ApiResponse<void>> => apiClient.delete<ApiResponse<void>>(`/trainers/${trainerId}/assignments/${assignmentId}`),
  getNotes: async (trainerId: string, page = 1, pageSize = 10): Promise<ApiResponse<PaginatedResponse<TrainerNote>>> => {
    const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
    return apiClient.get<ApiResponse<PaginatedResponse<TrainerNote>>>(`/trainers/${trainerId}/notes?${params}`);
  },
  getModuleNotes: async (trainerId: string, moduleId: string): Promise<ApiResponse<TrainerNote[]>> => apiClient.get<ApiResponse<TrainerNote[]>>(`/trainers/${trainerId}/notes/${moduleId}`),
  createNote: async (trainerId: string, moduleId: string, content: string): Promise<ApiResponse<TrainerNote>> => apiClient.post<ApiResponse<TrainerNote>>(`/trainers/${trainerId}/notes`, { moduleId, content }),
  updateNote: async (trainerId: string, noteId: string, content: string): Promise<ApiResponse<TrainerNote>> => apiClient.put<ApiResponse<TrainerNote>>(`/trainers/${trainerId}/notes/${noteId}`, { content }),
  deleteNote: async (trainerId: string, noteId: string): Promise<ApiResponse<void>> => apiClient.delete<ApiResponse<void>>(`/trainers/${trainerId}/notes/${noteId}`),
};

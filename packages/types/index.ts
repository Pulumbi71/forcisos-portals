export type UserRole = 'administrator' | 'fc_curriculum_mgr' | 'fc_trainer' | 'fc_partner' | 'fc_student';

export interface User { id: string; email: string; firstName: string; lastName: string; role: UserRole; avatar?: string; bio?: string; createdAt: string; updatedAt: string; }
export interface Course { id: string; title: string; description: string; thumbnail?: string; category: string; level: 'beginner' | 'intermediate' | 'advanced'; duration: number; price: number; instructorId: string; status: 'draft' | 'published' | 'archived'; enrollmentCount: number; rating: number; createdAt: string; updatedAt: string; }
export interface Module { id: string; courseId: string; title: string; description: string; duration: number; order: number; createdAt: string; updatedAt: string; }
export interface Cohort { id: string; courseId: string; title: string; startDate: string; endDate: string; maxStudents: number; enrolledCount: number; status: 'upcoming' | 'active' | 'completed' | 'cancelled'; trainerId: string; createdAt: string; updatedAt: string; }
export interface Enrollment { id: string; userId: string; courseId: string; cohortId: string; enrollmentDate: string; completionDate?: string; progress: number; status: 'active' | 'completed' | 'dropped' | 'paused'; certificateId?: string; }
export interface TrainerAssignment { id: string; trainerId: string; courseId: string; cohortId: string; role: 'instructor' | 'assistant' | 'grader'; assignedDate: string; }
export interface TrainerNote { id: string; trainerId: string; moduleId: string; content: string; createdAt: string; updatedAt: string; }
export interface Certificate { id: string; enrollmentId: string; userId: string; courseId: string; issuedDate: string; certificateUrl: string; nftAddress?: string; nftTokenId?: string; }
export interface PartnerOrg { id: string; name: string; logo?: string; website?: string; tier: 'starter' | 'professional' | 'enterprise'; contactEmail: string; contactPhone?: string; createdAt: string; updatedAt: string; }
export interface PartnerLicense { id: string; partnerId: string; courseId: string; licenseCount: number; usedCount: number; expirationDate: string; status: 'active' | 'expired' | 'revoked'; createdAt: string; updatedAt: string; }
export interface CourseReview { id: string; courseId: string; userId: string; rating: number; title: string; content: string; createdAt: string; updatedAt: string; }
export interface Comment { id: string; reviewId: string; userId: string; content: string; createdAt: string; updatedAt: string; }
export interface AuditLog { id: string; userId: string; action: string; resource: string; resourceId: string; changes?: Record<string, unknown>; ipAddress: string; userAgent: string; timestamp: string; }
export interface Notification { id: string; userId: string; title: string; message: string; type: 'info' | 'success' | 'warning' | 'error'; read: boolean; actionUrl?: string; createdAt: string; }
export interface DashboardStats { totalUsers: number; activeUsers: number; totalCourses: number; activeCohorts: number; totalEnrollments: number; completedEnrollments: number; totalRevenue: number; pendingRegistrations: number; }
export interface PaginatedResponse<T> { data: T[]; page: number; pageSize: number; total: number; hasMore: boolean; }
export interface ApiResponse<T> { success: boolean; data?: T; error?: { code: string; message: string; details?: Record<string, unknown>; }; timestamp: string; }
export interface LoginRequest { email: string; password: string; }
export interface LoginResponse { user: User; token: string; refreshToken: string; expiresIn: number; }
export interface Portal { id: string; name: string; slug: string; url: string; description: string; icon: string; requiredRoles: UserRole[]; }

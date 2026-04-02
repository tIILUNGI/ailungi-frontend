import { Course, courses, featuredCourses, getCourseById } from '../data/courses';

const API_BASE_URL = import.meta.env.VITE_API_URL;

type ApiResult<T> = {
  data: T;
  error?: string;
};

const buildUrl = (path: string) => `${API_BASE_URL}${path}`;

const safeJson = async <T>(response: Response): Promise<T> => {
  if (response.status === 204) {
    return {} as T;
  }
  return response.json() as Promise<T>;
};

const toFormData = (payload: Record<string, unknown>) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (value instanceof File) {
      formData.append(key, value);
      return;
    }
    formData.append(key, String(value));
  });
  return formData;
};

const request = async <T>(path: string, options: RequestInit, fallback: T): Promise<ApiResult<T>> => {
  if (!API_BASE_URL) {
    return { data: fallback };
  }

  try {
    const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData;
    const response = await fetch(buildUrl(path), {
      headers: isFormData
        ? options.headers
        : {
            'Content-Type': 'application/json',
            ...options.headers
          },
      ...options
    });

    if (!response.ok) {
      return { data: fallback, error: `HTTP ${response.status}` };
    }

    const data = await safeJson<T>(response);
    return { data };
  } catch (error) {
    return { data: fallback, error: (error as Error).message };
  }
};

export type Certification = {
  id: number;
  name: string;
  description: string;
  level?: string;
  duration?: string;
  exam?: string;
};

export type Enrollment = {
  id: number;
  course: Course;
  status: 'pending' | 'active' | 'blocked';
};

export type StudentCertificate = {
  id: number;
  title: string;
  code: string;
  issuedAt: string;
  status: 'active' | 'expired';
};

export type CertificationApplication = {
  id: number;
  title: string;
  status: string;
  date: string;
};

export type Lesson = {
  id: number;
  title: string;
  duration: string;
  type: 'video' | 'exercise' | 'reading' | 'quiz';
};

export type AdminEnrollment = {
  id: number;
  courseId: number;
  courseName: string;
  courseCode: string;
  fullName: string;
  email: string;
  phone: string;
  nif?: string;
  company?: string;
  jobTitle?: string;
  status: 'pending' | 'approved' | 'rejected';
  enrolledDate: string;
};

export type AdminCertificate = {
  id: number;
  studentName: string;
  studentEmail: string;
  courseName: string;
  courseCode: string;
  issueDate: string;
  status: 'issued' | 'pending' | 'cancelled';
  certificateNumber: string;
};

export type CertificateVerification = {
  name: string;
  course: string;
  date: string;
  code: string;
};

export type AuthPayload = {
  email: string;
  password: string;
  role: 'aluno' | 'admin';
};

export type AuthResponse = {
  email: string;
  role: 'aluno' | 'admin';
  name: string;
  token?: string;
};

export type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  role?: string;
  password: string;
};

export type RegisterResponse = {
  success: boolean;
  message?: string;
};

const fallbackCertifications: Certification[] = [];
const fallbackEnrollments: Enrollment[] = [];
const fallbackCertificates: StudentCertificate[] = [];
const fallbackApplications: CertificationApplication[] = [];
const fallbackLessons: Lesson[] = [];
const fallbackAdminEnrollments: AdminEnrollment[] = [
  {
    id: 1,
    courseId: 1,
    courseName: 'Interpretação e Auditor Interno normas ISO 37001 e ISO 37301',
    courseCode: 'CC-001',
    fullName: 'João Silva',
    email: 'joao@email.com',
    phone: '+244 923 456 789',
    nif: '123456789',
    company: 'Empresa X',
    jobTitle: 'Gerente',
    status: 'pending',
    enrolledDate: '2026-03-01'
  }
];

const fallbackAdminCertificates: AdminCertificate[] = [
  {
    id: 1,
    studentName: 'João Silva',
    studentEmail: 'joao@email.com',
    courseName: 'Compliance Officer',
    courseCode: 'CC-022',
    issueDate: '2026-02-15',
    status: 'issued',
    certificateNumber: 'AILUNGI-2026-001'
  }
];

export const api = {
  async getCourses() {
    return request<Course[]>('/courses', {}, courses);
  },
  async getFeaturedCourses() {
    return request<Course[]>('/courses/featured', {}, featuredCourses);
  },
  async getCourseById(courseId: number) {
    return request<Course | null>(`/courses/${courseId}`, {}, getCourseById(courseId) ?? null);
  },
  async getCertifications() {
    return request<Certification[]>('/certifications', {}, fallbackCertifications);
  },
  async getEnrollments() {
    return request<Enrollment[]>('/students/me/enrollments', {}, fallbackEnrollments);
  },
  async getStudentCertificates() {
    return request<StudentCertificate[]>('/students/me/certificates', {}, fallbackCertificates);
  },
  async getCertificationApplications() {
    return request<CertificationApplication[]>('/students/me/certification-applications', {}, fallbackApplications);
  },
  async getCourseLessons(courseId: number) {
    return request<Lesson[]>(`/courses/${courseId}/lessons`, {}, fallbackLessons);
  },
  async getAdminEnrollments() {
    return request<AdminEnrollment[]>('/admin/enrollments', {}, fallbackAdminEnrollments);
  },
  async updateEnrollmentStatus(id: number, status: AdminEnrollment['status']) {
    return request(`/admin/enrollments/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) }, null);
  },
  async getAdminCertificates() {
    return request<AdminCertificate[]>('/admin/certificates', {}, fallbackAdminCertificates);
  },
  async cancelCertificate(id: number) {
    return request(`/admin/certificates/${id}`, { method: 'PATCH', body: JSON.stringify({ status: 'cancelled' }) }, null);
  },
  async submitEnrollment(payload: unknown) {
    if (payload && typeof payload === 'object') {
      return request('/enrollments', { method: 'POST', body: toFormData(payload as Record<string, unknown>) }, null);
    }
    return request('/enrollments', { method: 'POST', body: JSON.stringify(payload) }, null);
  },
  async createCourse(payload: unknown) {
    return request('/admin/courses', { method: 'POST', body: JSON.stringify(payload) }, null);
  },
  async updateCourse(courseId: number, payload: unknown) {
    return request(`/admin/courses/${courseId}`, { method: 'PATCH', body: JSON.stringify(payload) }, null);
  },
  async deleteCourse(courseId: number) {
    return request(`/admin/courses/${courseId}`, { method: 'DELETE' }, null);
  },
  async issueCertificate(payload: unknown) {
    return request('/admin/certificates', { method: 'POST', body: JSON.stringify(payload) }, null);
  },
  async verifyCertificate(code: string) {
    return request<CertificateVerification | null>(
      `/certificates/verify?code=${encodeURIComponent(code)}`,
      {},
      null
    );
  },
  async login(payload: AuthPayload) {
    return request<AuthResponse>('/auth/login', { method: 'POST', body: JSON.stringify(payload) }, {
      email: payload.email,
      role: payload.role,
      name: payload.email.split('@')[0]
    });
  },
  async register(payload: RegisterPayload) {
    return request<RegisterResponse>(
      '/auth/register',
      { method: 'POST', body: JSON.stringify(payload) },
      { success: true }
    );
  }
};

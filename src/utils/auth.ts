export type UserRole = 'aluno' | 'admin';

export type AuthUser = {
  role: UserRole;
  email: string;
  name?: string;
};

const AUTH_KEY = 'ilungi.auth';

export const setAuth = (user: AuthUser) => {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(AUTH_KEY, JSON.stringify(user));
};

export const getAuth = (): AuthUser | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  const raw = window.localStorage.getItem(AUTH_KEY);
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
};

export const clearAuth = () => {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.removeItem(AUTH_KEY);
};

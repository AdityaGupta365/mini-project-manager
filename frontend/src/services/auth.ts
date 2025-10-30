import api from './api';
import { AuthResponse, User } from '../types';

// Expected response type structure
// interface AuthResponse {
//   token: string;
//   user: User;
// }

export const authService = {
  // ✅ Register new user
  async register(email: string, password: string, name: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', {
      email,
      password,
      name,
    });
    return response.data;
  },

  // ✅ Login existing user
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  // ✅ Logout and clear local storage
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // ✅ Retrieve stored JWT
  getToken(): string | null {
    return localStorage.getItem('token');
  },

  // ✅ Get current user info from localStorage
  getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? (JSON.parse(user) as User) : null;
  },

  // ✅ Check if user is logged in
  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};

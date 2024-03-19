import type { AxiosInstance } from 'axios';
import authAxiosInstance from './authAxiosInstance';
import type { AuthState, BackendAuth, LoginForm } from '../../types/auth';

class AuthService {
  constructor(private client: AxiosInstance) {}

  async login(formData: LoginForm): Promise<AuthState> {
    const res = await this.client.post<BackendAuth>('/auth/login', formData);
    if (res.status !== 200) return Promise.reject(new Error('Failed login'));
    return { ...res.data, user: { ...res.data.user, status: 'logged' } };
  }

  async refresh(): Promise<AuthState> {
    const res = await this.client<BackendAuth>('/tokens/refresh');
    if (res.status !== 200)
      return Promise.reject(new Error('Cannot refresh tokens'));
    return { ...res.data, user: { ...res.data.user, status: 'logged' } };
  }

  async logout(): Promise<void> {
    return this.client('/auth/logout');
  }
}

const authService = new AuthService(authAxiosInstance);

export default authService;

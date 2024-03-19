import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AuthState, LoginForm, SignupForm } from '../../../types/auth';
import authService from '../../../services/auth/authService';

export const loginThunk = createAsyncThunk<AuthState, LoginForm>(
  'auth/loginThunk',
  (formData) => authService.login(formData),
);

export const refreshAuth = createAsyncThunk<AuthState>('auth/refreshAuth', () =>
  authService.refresh(),
);

// Допиши недостающие Thunk actions
export const registerThunk = createAsyncThunk<AuthState, SignupForm>(
  'auth/registerThunk',
  (formData) => authService.register(formData),
);

export const logoutThunk = createAsyncThunk('auth/logoutThunk', () =>
  authService.logout(),
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AuthState, LoginForm } from '../../../types/auth';
import authService from '../../../services/auth/authService';

export const loginThunk = createAsyncThunk<AuthState, LoginForm>(
  'auth/loginThunk',
  (formData) => authService.login(formData),
);

export const refreshAuth = createAsyncThunk<AuthState>('auth/refreshAuth', () =>
  authService.refresh(),
);

// Допиши недостающие Thunk actions
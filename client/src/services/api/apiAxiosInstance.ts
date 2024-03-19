import type { AxiosError } from 'axios';
import axios from 'axios';
import { type StoreT } from '../../redux/store';
import authService from '../auth/authService';

// accessToken
const apiAxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

let store: StoreT | undefined;
export const injectStore = (_store: StoreT): void => {
  store = _store;
};

// Перехватчик запроса
apiAxiosInstance.interceptors.request.use((config) => {
  if (!config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${store?.getState().auth.accessToken}`;
  }
  return config;
});

// Перехватчик ответа

apiAxiosInstance.interceptors.response.use(
  (res) => res,
  async (err: AxiosError & { config: { sent?: boolean; url?: string } }) => {
    const prevRequest = err.config; // необходимо чтобы понять что это второй запрос
    if (err.response?.status === 403 && !prevRequest.sent) {
      prevRequest.sent = true;
      const { accessToken } = await authService.refresh();
      prevRequest.headers.Authorization = `Bearer ${accessToken}`;
      return apiAxiosInstance(prevRequest);
    }
    return Promise.reject(err);
  },
);

export default apiAxiosInstance;

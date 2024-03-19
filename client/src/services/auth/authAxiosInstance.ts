import axios from 'axios';

// refreshToken
const authAxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  withCredentials: true,
});

export default authAxiosInstance;

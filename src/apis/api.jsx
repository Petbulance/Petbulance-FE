import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
});
api.interceptors.request.use(
  (config) => {
    const requestUrl = config.url ?? '';
    const isAdminRequest =
      requestUrl.startsWith('/admin') || requestUrl.includes('/admin/');
    const tokenKey = isAdminRequest ? 'admin_token' : 'access_token';
    const token = localStorage.getItem(tokenKey);

    try {
      if (!config.headers?.Authorization && token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      console.error(error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

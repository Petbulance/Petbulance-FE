import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

const refreshApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

const REFRESH_ENDPOINT =
  import.meta.env.VITE_REFRESH_ENDPOINT || '/auth/refresh';
const ADMIN_REFRESH_ENDPOINT =
  import.meta.env.VITE_ADMIN_REFRESH_ENDPOINT || '/admin/refresh';

let userRefreshPromise = null;
let adminRefreshPromise = null;

const isAdminRequest = (url = '') =>
  url.startsWith('/admin') || url.includes('/admin/');

const getAccessTokenFromResponse = (response) => {
  const payload = response?.data?.data || response?.data || {};
  return (
    payload.finalAccessToken ||
    payload.accessToken ||
    payload.access_token ||
    null
  );
};

const getRefreshTokenFromResponse = (response) => {
  const payload = response?.data?.data || response?.data || {};
  return payload.refreshToken || payload.refresh_token || null;
};

const getUserRefreshToken = () => localStorage.getItem('refresh_token');
const getAdminRefreshToken = () => localStorage.getItem('admin_refresh_token');

const clearUserTokens = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('temp_access_token');
};

const clearAdminTokens = () => {
  localStorage.removeItem('admin_token');
  localStorage.removeItem('admin_refresh_token');
};

const redirectToLoginIfNeeded = () => {
  if (typeof window === 'undefined') return;
  if (window.location.pathname.startsWith('/admin')) return;
  window.location.replace('/index/auth/login');
};

const handleAdminAuthFailure = () => {
  clearAdminTokens();
  if (typeof window === 'undefined') return;

  const isAdminLoginPage = window.location.pathname === '/admin/auth/login';
  if (!isAdminLoginPage) {
    alert('관리자 세션이 만료되었습니다. 다시 로그인해 주세요.');
  }
  window.location.replace('/admin/auth/login');
};

const refreshUserToken = async () => {
  const refreshToken = getUserRefreshToken();
  if (!refreshToken) throw new Error('NO_REFRESH_TOKEN');

  const response = await refreshApi.post(
    REFRESH_ENDPOINT,
    { refreshToken },
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  );

  const nextAccessToken = getAccessTokenFromResponse(response);
  if (!nextAccessToken) throw new Error('INVALID_REFRESH_RESPONSE');

  const nextRefreshToken = getRefreshTokenFromResponse(response);
  localStorage.setItem('access_token', nextAccessToken);
  if (nextRefreshToken) {
    localStorage.setItem('refresh_token', nextRefreshToken);
  }

  return nextAccessToken;
};

const refreshAdminToken = async () => {
  const refreshToken = getAdminRefreshToken();
  if (!refreshToken) throw new Error('NO_ADMIN_REFRESH_TOKEN');

  const response = await refreshApi.post(
    ADMIN_REFRESH_ENDPOINT,
    { refreshToken },
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  );

  const nextAccessToken = getAccessTokenFromResponse(response);
  if (!nextAccessToken) throw new Error('INVALID_ADMIN_REFRESH_RESPONSE');

  const nextRefreshToken = getRefreshTokenFromResponse(response);
  localStorage.setItem('admin_token', nextAccessToken);
  if (nextRefreshToken) {
    localStorage.setItem('admin_refresh_token', nextRefreshToken);
  }

  return nextAccessToken;
};

const getUserRefreshPromise = () => {
  if (!userRefreshPromise) {
    userRefreshPromise = refreshUserToken().finally(() => {
      userRefreshPromise = null;
    });
  }
  return userRefreshPromise;
};

const getAdminRefreshPromise = () => {
  if (!adminRefreshPromise) {
    adminRefreshPromise = refreshAdminToken().finally(() => {
      adminRefreshPromise = null;
    });
  }
  return adminRefreshPromise;
};

api.interceptors.request.use(
  (config) => {
    const requestUrl = config.url ?? '';
    const tokenKey = isAdminRequest(requestUrl)
      ? 'admin_token'
      : 'access_token';
    const token = localStorage.getItem(tokenKey);

    if (!config.headers?.Authorization && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;
    const originalRequest = error?.config;

    if (!originalRequest || status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    const requestUrl = originalRequest.url ?? '';
    if (isAdminRequest(requestUrl)) {
      if (requestUrl.includes(ADMIN_REFRESH_ENDPOINT)) {
        handleAdminAuthFailure();
        return Promise.reject(error);
      }

      originalRequest._retry = true;
      try {
        const nextToken = await getAdminRefreshPromise();
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${nextToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        handleAdminAuthFailure();
        return Promise.reject(refreshError);
      }
    }

    if (requestUrl.includes(REFRESH_ENDPOINT)) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const nextToken = await getUserRefreshPromise();

      originalRequest.headers = originalRequest.headers || {};
      originalRequest.headers.Authorization = `Bearer ${nextToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      clearUserTokens();
      redirectToLoginIfNeeded();
      return Promise.reject(refreshError);
    }
  }
);

export default api;

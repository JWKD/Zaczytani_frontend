import axios from 'axios';
import config from '../../config';
import userApi from '../userApi';

const apiClient = axios.create({
  baseURL: config.API_URL, // Podstawowy URL dla wszystkich żądań
  timeout: 10000, // Maksymalny czas oczekiwania na odpowiedź (10s)
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else if (token) {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

// Dodaj interceptor, aby obsługiwać tokeny lub logować błędy (opcjonalnie)
apiClient.interceptors.request.use(
  (config) => {
    // Możesz dodać token do nagłówków, np.:
    const token = localStorage.getItem('accessToken'); // Pobranie tokena z localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Dodanie tokena do nagłówków
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Jeśli token jest już odświeżany, dodaj żądanie do kolejki
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token available.');
        }

        const response = await userApi.refreshToken(refreshToken);
        const newAccessToken = response.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);

        processQueue(null, newAccessToken);

        isRefreshing = false;

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;

import axios from 'axios';
import config from '../../config';

const apiClient = axios.create({
  baseURL: config.API_URL, // Podstawowy URL dla wszystkich żądań
  timeout: 10000, // Maksymalny czas oczekiwania na odpowiedź (10s)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Dodaj interceptor, aby obsługiwać tokeny lub logować błędy (opcjonalnie)
apiClient.interceptors.request.use(
  (config) => {
    // Możesz dodać token do nagłówków, np.:
    // const token = localStorage.getItem('accessToken'); // Pobranie tokena z localStorage
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`; // Dodanie tokena do nagłówków
    // }
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
  (error) => {
    if (error.response.status === 401) {
      // Obsługa błędu 401 (Brak autoryzacji)
      console.error('Unauthorized access - redirecting to login.');
      // Możesz np. przekierować użytkownika do strony logowania
    }
    return Promise.reject(error);
  }
);

export default apiClient;

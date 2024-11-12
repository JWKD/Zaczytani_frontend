import { User } from '../interfaces/user';
import apiClient from './config/axios';
import endpoints from './config/endpoints';

const dataApi = {
  // Funkcja do wysyłania danych użytkownika za pomocą POST
  createUser: async (payload: User) => {
    const response = await apiClient.post(endpoints.user.create, { email: payload.login, password: payload.password });
    return response;
  },
};

export default dataApi;

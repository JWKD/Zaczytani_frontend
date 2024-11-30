import { LoginRequest } from '../interfaces/login';
import apiClient from './config/axios';
import endpoints from './config/endpoints';

const userApi = {
  login: async (payload: LoginRequest) => {
    const response = await apiClient.post(endpoints.user.login, { email: payload.login, password: payload.password });
    return response;
  },
  refreshToken: async (refreshToken: string) => await apiClient.post(endpoints.user.refreshToken, { refreshToken }),
};

export default userApi;

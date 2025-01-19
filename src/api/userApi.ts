import { LoginRequest } from '../interfaces/login';
import { ChangePasswordPost, UserProfileDetails } from '../interfaces/user';
import apiClient from './config/axios';
import endpoints from './config/endpoints';

const userApi = {
  login: async (payload: LoginRequest) => {
    const response = await apiClient.post(endpoints.user.login, { email: payload.login, password: payload.password });
    return response;
  },
  refreshToken: async (refreshToken: string) => await apiClient.post(endpoints.user.refreshToken, { refreshToken }),
  getDetails: async (): Promise<UserProfileDetails> => {
    const response = await apiClient.get<UserProfileDetails>(endpoints.user.fetchDetails);
    return response.data;
  },
  changePassword: async (payload: ChangePasswordPost) => {
    const response = await apiClient.post(endpoints.user.changePassword, payload);
    return response;
  },
};

export default userApi;

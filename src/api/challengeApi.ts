import { Challenge, NewChallenge, PostChallenge } from '../interfaces/challenge';
import apiClient from './config/axios';
import endpoints from './config/endpoints';

const challengeApi = {
  postChallenge: async (payload: PostChallenge): Promise<void> => {
    return await apiClient.post(endpoints.challenge.create, payload);
  },
  deleteChallenge: async (challengeId: string) => {
    const response = await apiClient.delete(endpoints.challenge.delete(challengeId));
    return response;
  },
  getAllNewChallenges: async (): Promise<NewChallenge[]> => {
    const response = await apiClient.get<NewChallenge[]>(endpoints.challenge.fetch);
    return response.data;
  },
  getAllMyChallenges: async (): Promise<NewChallenge[]> => {
    const response = await apiClient.get<NewChallenge[]>(endpoints.challenge.fetchMyChallenges);
    return response.data;
  },
  joinChallenge: async (challengeId: string) => {
    const response = await apiClient.post(endpoints.challenge.join(challengeId));
    return response;
  },
  detachChallenge: async (challengeId: string) => {
    const response = await apiClient.delete(endpoints.challenge.detach(challengeId));
    return response;
  },
  getAllProgressChallenges: async (): Promise<Challenge[]> => {
    const response = await apiClient.get<Challenge[]>(endpoints.challenge.fetchProgress);
    return response.data;
  },
};

export default challengeApi;

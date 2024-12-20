import { CurrentlyReading } from '../interfaces/review';
import apiClient from './config/axios';
import endpoints from './config/endpoints';

const reviewAPi = {
  getProgress: async (): Promise<CurrentlyReading[]> => {
    const response = await apiClient.get<CurrentlyReading[]>(endpoints.review.fetch);
    return response.data;
  },
};

export default reviewAPi;

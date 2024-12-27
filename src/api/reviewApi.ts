import { CurrentlyReadingBookDetails, CurrentlyReadingBookReview, ReviewPage } from '../interfaces/review';
import apiClient from './config/axios';
import endpoints from './config/endpoints';

const reviewApi = {
  getCurrentlyReadingBookDetails: async (id: string): Promise<CurrentlyReadingBookDetails> => {
    const response = await apiClient.get<CurrentlyReadingBookDetails>(
      endpoints.review.fetchCurrentlyReadingBookDetails(id)
    );
    return response.data;
  },
  postCurrentlyReadingBookReview: async (id: string, payload: CurrentlyReadingBookReview): Promise<void> => {
    return await apiClient.post(endpoints.review.currentlyReadingBookReview(id), payload);
  },
  getReview: async (id: string): Promise<ReviewPage> => {
    const response = await apiClient.get<ReviewPage>(endpoints.review.getReview(id));
    return response.data;
  },
};

export default reviewApi;

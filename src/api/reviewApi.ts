import { CurrentlyReadingBookDetails, CurrentlyReadingBookReview } from '../interfaces/review';
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

  postLike: async (id: string): Promise<void> => {
    return await apiClient.post(endpoints.review.like(id));
  },
  postUnlike: async (id: string): Promise<void> => {
    return await apiClient.post(endpoints.review.unlike(id));
  },
};

export default reviewApi;

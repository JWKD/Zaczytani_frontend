import { Book } from '../interfaces/book';
import apiClient from './config/axios';
import endpoints from './config/endpoints';

const dataApi = {
  getData: async (): Promise<Book[]> => {
    const response = await apiClient.get<Book[]>(endpoints.book.fetch);
    return response.data;
  },

  // postData: async (payload: DataItemRequest): Promise<void> => {
  //   return await apiClient.post(endpoints.data.create, payload);
  // },

  // updateData: async (id: number, payload: DataItemRequest): Promise<void> => {
  //   return await apiClient.put(endpoints.data.update(id), payload);
  // },

  // deleteData: async (id: number): Promise<void> => {
  //   await apiClient.delete(endpoints.data.delete(id));
  // },
};

export default dataApi;

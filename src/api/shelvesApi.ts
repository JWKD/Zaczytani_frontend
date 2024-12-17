import { Book } from '../interfaces/book';
import { CreateShelf, Shelf } from '../interfaces/Shelf';
import apiClient from './config/axios';
import endpoints from './config/endpoints';

const shelfApi = {
  getShelves: async (): Promise<Shelf[]> => {
    const response = await apiClient.get<Shelf[]>(endpoints.shelf.fetch);
    return response.data;
  },
  getShelfBooks: async (id: string): Promise<Book[]> => {
    const response = await apiClient.get<Book[]>(endpoints.shelf.fetchShelfBooks(id));
    return response.data;
  },
  postShelf: async (payload: CreateShelf): Promise<void> => {
    return await apiClient.post(endpoints.shelf.create, payload);
  },
};

export default shelfApi;

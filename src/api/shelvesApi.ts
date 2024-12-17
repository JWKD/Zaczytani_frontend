import { Book } from '../interfaces/book';
import { CreateShelf, DeleteShelf, Shelf, UpdateShelf } from '../interfaces/Shelf';
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
  getShelf: async (id: string): Promise<Shelf> => {
    const response = await apiClient.get<Shelf>(endpoints.shelf.fetchShelf(id));
    return response.data;
  },
  postShelf: async (payload: CreateShelf): Promise<void> => {
    return await apiClient.post(endpoints.shelf.create, payload);
  },
  updateShelf: async (payload: UpdateShelf): Promise<void> => {
    return await apiClient.put(endpoints.shelf.update, payload);
  },
  deleteShelf: async (payload: DeleteShelf): Promise<void> => {
    return await apiClient.delete(endpoints.shelf.delete, { data: payload });
  },
};

export default shelfApi;

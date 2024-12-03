import { Shelf } from '../interfaces/Shelf';
import apiClient from './config/axios';
import endpoints from './config/endpoints';

const dataApi = {
  getShelves: async (): Promise<Shelf[]> => {
    const response = await apiClient.get<Shelf[]>(endpoints.shelf.fetch);
    return response.data;
  },
};

export default dataApi;

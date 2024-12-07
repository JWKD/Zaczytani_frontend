import { AuthorBooks, Author, Book, BookRequest, PublishingHouse, BookRequestPost } from '../interfaces/book';
import apiClient from './config/axios';
import endpoints from './config/endpoints';

const dataApi = {
  getBookDetails: async (id: string): Promise<Book> => {
    const response = await apiClient.get<Book>(endpoints.book.fetchDetails(id));
    return response.data;
  },

  getSearchedBooks: async (searchPhrase: string): Promise<AuthorBooks[]> => {
    const response = await apiClient.get<AuthorBooks[]>(endpoints.book.fetchSearchedBooks, {
      params: { searchPhrase },
    });
    return response.data;
  },

  postRandomBook: async (): Promise<Book> => {
    const response = await apiClient.post(endpoints.book.getRandomBook);
    return response.data;
  },

  gethasDrawn: async (): Promise<Book> => {
    const response = await apiClient.get<Book>(endpoints.book.fetchBookHasDrawn);
    return response.data;
  },

  getAuthors: async (): Promise<Author[]> => {
    const response = await apiClient.get<Author[]>(endpoints.book.fetchAuthors);
    return response.data;
  },

  getGenres: async (): Promise<string[]> => {
    const response = await apiClient.get<string[]>(endpoints.book.fetchGenres);
    return response.data;
  },

  getPublishingHouses: async (): Promise<PublishingHouse[]> => {
    const response = await apiClient.get<PublishingHouse[]>(endpoints.book.fetchPublishingHouses);
    return response.data;
  },

  getBookRequest: async (): Promise<BookRequest[]> => {
    const response = await apiClient.get<BookRequest[]>(endpoints.book.fetchBookRequest);
    return response.data;
  },

  postBookRequest: async (payload: BookRequestPost): Promise<void> => {
    return await apiClient.post(endpoints.book.bookRequest, payload);
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

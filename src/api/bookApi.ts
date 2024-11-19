import { Book } from '../interfaces/book';
import apiClient from './config/axios';
import endpoints from './config/endpoints';

const dataApi = {
  getBookDetails: async (id: string): Promise<Book> => {
    const response = await apiClient.get<Book>(endpoints.book.fetchDetails(id));
    return response.data;
    // return {
    //   id: '46ad6c53-fad3-452b-b3c2-16713fe6a844',
    //   title: 'Harry Potter i Kamień Filozoficzny',
    //   isbn: '978-3-16-148410-0',
    //   description:
    //     'Pierwszy tom cyklu "Harry Potter" w poważnej, "dorosłej" okładce. Harry Potter, sierota i podrzutek, od niemowlęcia wychowywany był przez ciotkę i wuja, którzy traktowali go jak piąte koło u wozu.',
    //   pageNumber: 309,
    //   authors: [{ id: 'dd02469b-2354-4881-9b3f-e31d0a87b31e', name: 'J.K. Rowling' }],
    // };
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

import { Book } from './book';

export interface Shelf {
  id: string;
  title: string;
  books: Book[];
}

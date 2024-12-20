import { Author } from './book';

export interface CurrentlyReading {
  bookId: string;
  title: string;
  authors: Author[];
  progress: number;
  imageUrl: string;
}

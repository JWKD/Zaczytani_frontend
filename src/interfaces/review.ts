import { Author } from './book';

export interface CurrentlyReadingBookDetails {
  id: string;
  title: string;
  imageUrl: string;
  series: string;
  progress: number;
  pageNumber: number;
  authors: Author[];
}

export interface CurrentlyReadingBookReview {
  content: string;
  rating: number;
  progress: number;
  isFinal: boolean;
  containsSpoilers: boolean;
}

import { Author } from './book';
import { UserInfo } from './user';

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

export interface Review {
  id: string;
  content: string;
  rating: number;
  likes: number;
  comments: number;
  notesCount: number;
  user: UserInfo;
}

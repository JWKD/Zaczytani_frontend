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

export interface BookReview {
  id: string;
  title: string;
  imageUrl: string;
  series: string;
  pageNumber: number;
  authors: Author[];
}

export interface Comment {
  id: string;
  content: string;
  user: UserInfo;
}

export interface Note {
  id: string;
  content: string;
  rating: number;
  progress: number;
  containsSpoilers: boolean;
}

export interface ReviewPage {
  id: string;
  content: string;
  rating: number;
  likes: number;
  user: UserInfo;
  book: BookReview;
  notes: Note[];
  comments: Comment[];
}

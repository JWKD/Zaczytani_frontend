import { Book } from './book';

export interface User {
  firstName: string;
  lastName: string;
  isLoggedIn: boolean;
}

export interface UserInfo {
  id: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
}

export interface UserProfileDetails {
  firstName: string;
  lastName: string;
  imageUrl: string;
  totalBooksRead: number;
  favoriteGenres: string[];
  badges: string[];
  readBooks: Book[];
  currentlyReading: Book[];
}

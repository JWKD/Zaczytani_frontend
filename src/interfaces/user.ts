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

export interface ChangePasswordPost {
  newPassword: string;
  oldPassword: string;
}

export interface RegisterPost {
  login: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

export interface ResendEmail {
  email: string;
}

export interface ConfirmEmailPost {
  userId: string;
  code: string;
}

export interface ForgotPasswordEmail {
  email: string;
}

export interface ResetPassword {
  email: string;
  resetCode: string;
  newPassword: string;
}

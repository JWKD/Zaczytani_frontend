import { Book } from './book';

export interface Shelf {
  id: string;
  name: string;
  description: string;
  isDefault: boolean;
}

export interface CreateShelf {
  name: string;
  description: string;
}

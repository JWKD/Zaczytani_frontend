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

export interface DeleteShelf {
  shelfId: string;
}

export interface UpdateShelf {
  shelfId: string;
  name: string;
  description: string;
}

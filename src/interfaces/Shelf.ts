export interface Shelf {
  id: string;
  name: string;
  description: string;
  isDefault: boolean;
  imageUrl: string[];
}

export interface CreateShelf {
  name: string;
  description: string;
}

export interface DeleteShelf {
  shelfId: string;
}

export interface CurrentlyReadingShelf {
  id: string;
}

export interface UpdateShelf {
  shelfId: string;
  name: string;
  description: string;
}

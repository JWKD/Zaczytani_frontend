export interface Book {
  id: string;
  title: string;
  isbn: string;
  description: string;
  pageNumber: number;
  imageUrl: string;
  genre: string;
  rating: number;
  series: string;
  publishingHouse: string;
  authors: Author[];
}

export interface BookRequest {
  title: string;
}
export interface Author {
  id: string;
  name: string;
  imageUrl: string | null;
}

export interface AuthorBooks {
  id: string;
  name: string;
  imageUrl: string | null;
  books: Book[];
}

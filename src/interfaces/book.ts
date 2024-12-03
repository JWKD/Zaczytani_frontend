export interface Book {
  id: string;
  title: string;
  isbn: string;
  description: string;
  pageNumber: number;
  authors: Author[];
  imageUrl: string;
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
export interface BookRequestGet {
  id: string;
  title: string;
  isbn: string | null;
  description: string | null;
  pageNumber: number | null;
  releaseDate: string | null;
  image: string | null;
  authors: string;
  publishingHouse: string | null;
  genre: string[] | null;
  series: string | null;
  status: string;
}

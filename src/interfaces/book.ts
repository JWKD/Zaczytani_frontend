export interface Book {
  id: string;
  title: string;
  isbn: string;
  description: string;
  pageNumber: number;
  authors: Author[];
  imageUrl: string;
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
export interface BookRequestModel {
  id: string;
}

export interface PublishingHouse {
  id: string;
  name: string;
}

export interface BookRequestPost {
  title: string;
  isbn: string | null;
  description: string | null;
  pageNumber: number | null;
  releaseDate: string | null;
  fileName: string | null;
  authors: string;
  publishingHouse: string | null;
  genre: string[] | null;
  series: string | null;
}

export interface BookRequest {
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

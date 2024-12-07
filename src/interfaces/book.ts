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

// interfejs do odpowiedzi z posta
export interface BookRequestModel {
  id: string;
}

export interface PublishingHouse {
  id: string;
  name: string;
}

// interfejs do wysyłania post
export interface BookRequestRequest {
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

// interfejs do pobierania bookRequest
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

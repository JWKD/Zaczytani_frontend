export interface Book {
  id: string;
  title: string;
  isbn: string;
  description: string;
  pageNumber: number;
  realeaseDate: string;
  imageUrl: string;
  genre: string[];
  rating: number;
  ratingCount: number;
  reviews: number;
  readers: number;
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

export interface CurrentlyReading {
  id: string;
  title: string;
  imageUrl: string;
  series: string;
  progress: number;
  pageNumber: number;
  authors: Author[];
}

export interface RecommendedBooksHomeProps {
  pageSize: number;
}

export interface RecommendedBooksBookProps {
  pageSize: number;
  bookGenre: string;
  authorName: string;
}

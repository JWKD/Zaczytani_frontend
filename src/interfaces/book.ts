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
}

export interface AuthorBooks {
  id: string;
  name: string;
  books: Book[];
}

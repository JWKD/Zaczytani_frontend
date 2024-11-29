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

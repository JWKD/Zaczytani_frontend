export interface Book {
  id: string;
  title: string;
  isbn: string;
  description: string;
  pageNumber: number;
  authors: Author[];
}

export interface BookRequest {
  title: string;
}
export interface Author {
  id: string;
  name: string;
}

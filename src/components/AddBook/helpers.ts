import { BookRequestPost } from '../../interfaces/book';
import { BookRequestPre } from './AddBook';

export const validateForm = (bookRequest: BookRequestPre) => {
  const newErrors: { [key: string]: string } = {};

  if (!bookRequest.title.trim() || bookRequest.title.length > 150 || bookRequest.title.length <= 2) {
    newErrors.title = 'Tytuł musić być conajmniej 2 znakowy i krótszy niż 150 znaków!';
  }
  if (bookRequest.authors.length === 0) {
    newErrors.authors = 'Musisz dodać conajmniej jednego autora!';
  }
  if (bookRequest.isbn && (bookRequest.isbn.length < 10 || bookRequest.isbn.length > 13)) {
    newErrors.isbn = 'Numer ISBN musi mieć od 10 do 13 znaków!';
  }
  if (bookRequest.description && (bookRequest.description.length > 1000 || bookRequest.description.length <= 10)) {
    newErrors.description = 'Opis musi być dłuższy niż 10 znaków i krótszy niż 1000 znaków!';
  }
  if (bookRequest.pageNumber && (bookRequest.pageNumber < 0 || bookRequest.pageNumber >= 10000)) {
    newErrors.pageNumber = 'Liczba stron musi być większa od 0 i mniejsza od 10000!';
  }
  if (bookRequest.releaseDate) {
    const releaseDateObj = new Date(bookRequest.releaseDate);
    const currentDate = new Date();
    if (releaseDateObj > currentDate) newErrors.releaseDate = 'Data wydania nie może być z przyszłości!';
  }
  if (bookRequest.series && bookRequest.series.length > 150) {
    newErrors.series = 'Seria nie może być dłuższa niż 150 znaków!';
  }
  if (!bookRequest.genre || bookRequest.genre.length === 0) {
    newErrors.genre = 'Musisz dodać conajmniej jeden gatunek!';
  }

  return {
    isValid: Object.keys(newErrors).length === 0,
    newErrors,
  };
};

export const convertBookRequest = (bookRequest: BookRequestPre) => {
  const authorsString = bookRequest.authors.join(', ');

  const bookRequestPost: BookRequestPost = {
    title: bookRequest.title,
    isbn: bookRequest.isbn,
    description: bookRequest.description,
    pageNumber: bookRequest.pageNumber,
    releaseDate: bookRequest.releaseDate,
    fileName: bookRequest.fileName,
    authors: authorsString,
    publishingHouse: bookRequest.publishingHouse,
    genre: bookRequest.genre,
    series: bookRequest.series,
  };
  return bookRequestPost;
};
